/* ============================================================================
 * TAX ENGINE — computes a single tax year from a profile object.
 * Reads all constants from TSIQ.TABLES_2026. No strategy-specific logic here.
 *
 * Profile shape (the "return data" for one year):
 * {
 *   filingStatus: 'single'|'mfj'|'mfs'|'hoh',
 *   wages,            // outside W-2 wages (jobs other than the client's entity)
 *   ownerWages,       // W-2 wages the client's own entity pays them (S-corp)
 *   scheduleCNet,     // sole proprietorship net profit (SE income)
 *   passthroughK1,    // S-corp / partnership ordinary income (QBI, not SE)
 *   entityW2Wages,    // total W-2 wages the entity pays (for §199A wage limit)
 *   isSSTB,           // specified service trade or business flag
 *   rentalNet,        // Schedule E rental net (after current depreciation)
 *   rentalLossesUsable, // §469 ONLY: true = current-year losses usable (passive
 *                     // income available, or the $25k active-participation allowance)
 *   reNonPassive,     // §1411 ONLY: true = real estate professional / material
 *                     // participation makes rental a non-passive trade or business,
 *                     // excluding it from net investment income. Independent of
 *                     // rentalLossesUsable — a passive investor can have usable
 *                     // losses (via the $25k allowance) without being a REP.
 *   ltcg, qualDiv, interest, otherIncome,
 *   propertyTax, mortgageInterest, charitable, otherItemized,
 *   age65Count,       // 0-2: filer/spouse age 65+ (aged std deduction + OBBBA senior deduction)
 *   stateRate,        // flat effective state rate, decimal (simplification)
 *   ptetPaid          // entity-level state tax paid (PTET strategy)
 * }
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

(function () {
  var T = function () { return TSIQ.TABLES_2026; };

  function bracketTax(taxable, brackets) {
    var tax = 0;
    for (var i = 0; i < brackets.length; i++) {
      var lower = brackets[i][0];
      var rate = brackets[i][1];
      var upper = (i + 1 < brackets.length) ? brackets[i + 1][0] : Infinity;
      if (taxable <= lower) break;
      tax += (Math.min(taxable, upper) - lower) * rate;
    }
    return tax;
  }

  // Preferential-rate tax on LTCG + qualified dividends, stacked on top of
  // ordinary taxable income against the 0/15/20 breakpoints.
  function prefRateTax(ordinaryTaxable, prefIncome, fs) {
    var bp = T().ltcgBreakpoints[fs];
    var tax = 0, remaining = prefIncome, stackTop = ordinaryTaxable;
    // 0% band
    var room0 = Math.max(0, bp[0] - stackTop);
    var in0 = Math.min(remaining, room0);
    remaining -= in0; stackTop += in0;
    // 15% band
    var room15 = Math.max(0, bp[1] - Math.max(stackTop, bp[0]));
    var in15 = Math.min(remaining, room15);
    tax += in15 * 0.15; remaining -= in15; stackTop += in15;
    // 20% band
    tax += remaining * 0.20;
    return tax;
  }

  // §86 Social Security benefit taxability (the tiered 50%/85% "provisional
  // income" test). otherMAGI is every other income item that would count
  // toward AGI/MAGI EXCLUDING Social Security itself (tax-exempt interest
  // is not a modeled field, so it is omitted from provisional income — a
  // minor, documented simplification for municipal-bond-heavy retirees).
  // Exposed on TSIQ (not just this closure) so app.js's PDF-import tie-out
  // preview can estimate the same figure the engine will compute.
  TSIQ.taxableSocialSecurity = function (fs, otherMAGI, ssGross) {
    if (!ssGross) return 0;
    var t = T().socialSecurity;
    var base1 = t.base1[fs], base2 = t.base2[fs];
    var provisional = Math.max(0, otherMAGI) + 0.5 * ssGross;
    if (provisional <= base1) return 0;
    if (provisional <= base2) {
      return Math.min(0.5 * (provisional - base1), 0.5 * ssGross);
    }
    var tier1Amount = Math.min(0.5 * (base2 - base1), 0.5 * ssGross);
    var taxable = 0.85 * (provisional - base2) + tier1Amount;
    return Math.min(taxable, 0.85 * ssGross);
  };

  // §199A QBI deduction — simplified but structurally correct:
  // - full 20% below the taxable-income threshold
  // - W-2 wage limit (50% of wages; UBIA prong not modeled) phased in above it
  // - SSTB benefit phased out entirely across the phase-in range
  // - overall cap: 20% of (taxable income before QBI − net capital gain)
  // - OBBBA §70105 $400 minimum for qualifying active QBI (not applied when
  //   the SSTB phase-out has fully excluded the income from QBI altogether)
  function qbiDeduction(p, agi, deduction, seDeduction, state) {
    var t = T().qbi, fs = p.filingStatus;
    // NOTE: rentalNet is intentionally excluded from qbiIncome. Rental rising
    // to a §162 trade/business (or the Rev. Proc. 2019-38 safe harbor) can
    // generate QBI in reality — not modeled in v1 (see README scope notes).
    // The 25%-wage/2.5%-UBIA alternative wage limit is likewise not modeled;
    // only the 50%-of-wages prong applies below.
    var qbiIncomeRaw = (p.scheduleCNet - seDeduction) + p.passthroughK1 - (p.qbiReduction || 0);

    // ---- §199A(c)(2): a NEGATIVE combined QBI amount is treated as a loss
    // from a separate qualified business and carries forward to reduce NEXT
    // year's QBI — it does not simply evaporate at the zero floor. ----
    state.qbiLossCarryover = state.qbiLossCarryover || 0;
    var qbiIncome = qbiIncomeRaw - state.qbiLossCarryover;
    if (qbiIncome <= 0) {
      state.qbiLossCarryover = -qbiIncome;
      return 0;
    }
    state.qbiLossCarryover = 0;

    var tiBeforeQBI = Math.max(0, agi - deduction);
    var tentative = t.rate * qbiIncome;
    var wageLimit = 0.50 * (p.entityW2Wages || 0);

    var threshold = t.threshold[fs];
    var range = t.phaseInRange[fs];
    var excess = tiBeforeQBI - threshold;
    var applicable;
    var sstbFullyExcluded = false;

    if (excess <= 0) {
      applicable = tentative;
    } else {
      var phasePct = Math.min(1, excess / range);
      if (p.isSSTB) {
        // SSTB: the whole deduction phases out across the range.
        var reducedTentative = tentative * (1 - phasePct);
        var reducedWageLimit = wageLimit * (1 - phasePct);
        sstbFullyExcluded = phasePct >= 1;
        applicable = sstbFullyExcluded ? 0
          : Math.min(reducedTentative,
              reducedTentative - (reducedTentative - reducedWageLimit) * phasePct);
        applicable = Math.max(0, applicable);
      } else {
        // Non-SSTB: phase in the wage limitation.
        if (tentative <= wageLimit) {
          applicable = tentative;
        } else {
          applicable = tentative - (tentative - wageLimit) * phasePct;
        }
        applicable = Math.max(0, applicable);
      }
    }
    var netCapGain = Math.max(0, (p.ltcg || 0)) + Math.max(0, (p.qualDiv || 0));
    var overallCap = t.rate * Math.max(0, tiBeforeQBI - netCapGain);
    var result = Math.max(0, Math.min(applicable, overallCap));

    var qm = T().qbiMinimum;
    if (!sstbFullyExcluded && qbiIncome >= qm.floorQBI) {
      result = Math.max(result, Math.min(qm.amount, overallCap));
    }
    return result;
  }

  // SALT cap for a given projected calendar tax year (PJ1: enacted-law
  // fidelity, not the disclosed unindexed-thresholds simplification). 2026
  // through the enhanced-cap sunset year: cap/phase-down threshold both grow
  // enhancedCapGrowthRate per year from the 2026 baseline. After the sunset
  // year: flat cap (the `floor` table — already equal to the reverted TCJA
  // amount) with NO income phase-down.
  function saltCapForYear(fs, taxYear) {
    var s = T().salt, base = T().taxYear;
    if (taxYear > s.enhancedCapSunsetYear) {
      return { cap: s.floor[fs], phaseDownStart: Infinity, phaseDownRate: 0 };
    }
    var factor = Math.pow(1 + s.enhancedCapGrowthRate, Math.max(0, taxYear - base));
    return {
      cap: s.cap[fs] * factor,
      phaseDownStart: s.phaseDownStart[fs] * factor,
      phaseDownRate: s.phaseDownRate
    };
  }

  /**
   * Compute one tax year. `state` carries multi-year memory (suspended
   * passive losses) and belongs to the scenario, not the profile.
   * Returns a detailed breakdown object.
   */
  TSIQ.computeYear = function (profile, state) {
    var p = Object.assign({
      wages: 0, ownerWages: 0, scheduleCNet: 0, passthroughK1: 0,
      entityW2Wages: 0, isSSTB: false, rentalNet: 0, rentalLossesUsable: true,
      reNonPassive: false, age65Count: 0,
      ltcg: 0, qualDiv: 0, interest: 0, otherIncome: 0, ssBenefitsGross: 0,
      shortTermGains: 0,
      propertyTax: 0, mortgageInterest: 0, charitable: 0, otherItemized: 0,
      stateRate: 0, ptetPaid: 0,
      kidsCTC: 0, otherDeps: 0,
      fedWithholding: 0, fedEstimates: 0, stateWithholding: 0, stateEstimates: 0,
      // Generic hooks set by strategies:
      adjustments: 0,    // above-the-line deductions (retirement, SE health, HSA…)
      qbiReduction: 0,   // amounts that also reduce §199A qualified business income
      ptetDeducted: 0,   // K-1 income reduced federally by a PTET election — added
                         // back for STATE tax purposes (states require the owner's
                         // state taxable income to reflect PRE-PTET income; the
                         // entity-level credit, not a second deduction, is what
                         // keeps the owner's state bill flat)
      otherCredits: 0,   // nonrefundable credits other than CTC (R&D, WOTC, 45F…)
      corpTaxPaid: 0,    // entity-level federal tax (C-corp conversion strategy)
      otherTaxes: 0,     // additional payroll/other federal taxes strategies create
                         // (e.g., FICA on kids' S-corp wages)
      entityStateTax: 0, // SF1: entity-level STATE tax strategies create — a
                         // C-corp's retained profit owes state corporate
                         // income tax same as federal, and some states levy a
                         // separate S-corp entity tax (CA 1.5%, NH BPT/BET,
                         // TN excise, NYC) on top of the owner's personal
                         // pass-through state tax already captured above.
      stateIncomeAddBack: 0, // SF2: generic hook for income a strategy
                         // excludes/reduces federally but that a nonconforming
                         // STATE still taxes (e.g. QSBS §1202 gain in CA/PA/
                         // AL/MS) — same "federal deduction, state add-back"
                         // pattern as ptetDeducted, just not PTET-specific.
      stateOnlyDeduction: 0, // LB5: the mirror image of stateIncomeAddBack —
                         // an amount some states let a taxpayer deduct from
                         // STATE taxable income with no federal counterpart
                         // (e.g. a 529 contribution deduction). Zero federal
                         // effect; reduces the state tax base only.
      rothConversionIncome: 0  // Roth conversion amount (§408A(d)(3)/§402A(c)(4)):
                         // ordinary income, but excluded from the NIIT `nii` base
                         // (§1411(c)(5) — a conversion raises MAGI but is not
                         // investment income) and from FICA/QBI (it's neither
                         // wages/SE earnings nor qualified business income).
    }, profile);
    state = state || {};
    var tb = T(), fs = p.filingStatus, f = tb.fica;
    // The projected calendar tax year for THIS computation — set by
    // scenario-engine.js per projection year (2026, 2027, 2028, ...).
    // Direct computeYear() callers that never set this get tb.taxYear
    // (the 2026 baseline), so nothing changes for them.
    var projYear = p.projTaxYear || tb.taxYear;

    // ---- Self-employment tax (§1401/1402), coordinated with W-2 SS wages ----
    var seNetEarnings = Math.max(0, p.scheduleCNet) * f.seNetEarningsFactor;
    var ficaWages = p.wages + p.ownerWages;
    var ssRoomLeft = Math.max(0, f.ssWageBase - ficaWages);
    var seSS = Math.min(seNetEarnings, ssRoomLeft) * f.ssRate;
    var seMedicare = seNetEarnings * f.medicareRate;
    var seTax = seSS + seMedicare;
    var seDeduction = seTax / 2;

    // ---- Payroll tax on owner W-2 wages (both halves — a real cost of the
    // S-corp structure; the employer half is already deducted from entity
    // profit by the strategy, and is also deductible here economically) ----
    var ownerSS = Math.min(p.ownerWages, f.ssWageBase) * f.ssRate;
    var ownerMedicare = p.ownerWages * f.medicareRate;
    var ownerPayrollTax = ownerSS + ownerMedicare;

    // ---- Excess Social Security credit (§31(b)) — when outside W-2 wages and
    // owner W-2 wages are withheld against separately but together exceed the
    // wage base, the employee's 6.2% over-withholding is refunded on Schedule 3.
    var excessSSCredit = 0.5 * f.ssRate * Math.max(0,
      Math.min(p.wages, f.ssWageBase) + Math.min(p.ownerWages, f.ssWageBase) - f.ssWageBase);

    // ---- Additional Medicare (0.9% over threshold, wages + SE earnings) ----
    var medicareBase = p.wages + p.ownerWages + seNetEarnings;
    var addlMedicare = f.additionalMedicareRate *
      Math.max(0, medicareBase - f.additionalMedicareThreshold[fs]);

    // ---- Passive rental loss suspension (§469, simplified carryforward) ----
    var rentalAllowed = p.rentalNet;
    var suspendedUsed = 0, suspendedAdded = 0;
    state.suspendedRentalLoss = state.suspendedRentalLoss || 0;
    if (p.rentalNet < 0 && !p.rentalLossesUsable) {
      suspendedAdded = -p.rentalNet;
      state.suspendedRentalLoss += suspendedAdded;
      rentalAllowed = 0;
    } else if (p.rentalNet > 0 && state.suspendedRentalLoss > 0) {
      suspendedUsed = Math.min(p.rentalNet, state.suspendedRentalLoss);
      state.suspendedRentalLoss -= suspendedUsed;
      rentalAllowed = p.rentalNet - suspendedUsed;
    }

    // ---- Capital loss limitation (§1211(b)): short-term and long-term
    // results net against each other FIRST (Schedule D Part III), and only
    // THEN does the combined net loss get floored at $3,000/$1,500 MFS
    // (the disallowed excess is tracked forward — see state.capitalLossCarryforward
    // below). The portion taxed at PREFERENTIAL rates is the net LT gain,
    // reduced by any ST loss that nets against it, and never more than the
    // overall allowed net capital result (mirrors the Qualified Dividends
    // and Capital Gain Tax Worksheet's line 15-vs-line-16 comparison). ----
    var capLossFloor = (fs === 'mfs') ? -1500 : -3000;
    var stGain = p.shortTermGains || 0;
    var netCapital = p.ltcg + stGain;
    state.capitalLossCarryforward = state.capitalLossCarryforward || 0;
    // Use last year's carryforward against this year's net gain BEFORE the
    // current-year floor applies (§1212(b)) — long-term carryforward offsets
    // long-term gain first per §1212(b)(1)(B), so net it against p.ltcg only.
    var carryforwardAvailable = state.capitalLossCarryforward;
    var carryforwardUsed = 0;
    var ltcgAfterCarryforward = p.ltcg;
    if (carryforwardAvailable > 0 && p.ltcg > 0) {
      carryforwardUsed = Math.min(carryforwardAvailable, p.ltcg);
      ltcgAfterCarryforward = p.ltcg - carryforwardUsed;
      state.capitalLossCarryforward -= carryforwardUsed;
    }
    var netCapitalAfterCarryforward = ltcgAfterCarryforward + stGain;
    var netCapitalAllowed = Math.max(netCapitalAfterCarryforward, capLossFloor);
    var capitalLossDisallowed = netCapitalAfterCarryforward < capLossFloor
      ? (capLossFloor - netCapitalAfterCarryforward) : 0;
    state.capitalLossCarryforward += capitalLossDisallowed;
    // Preferential-RATE amount only (for prefIncome below) — distinct from
    // netCapitalAllowed, which is the actual dollar contribution to income
    // (and can be negative, e.g. the floored $3,000 loss deduction).
    var preferentialLTCG = Math.max(0, Math.min(ltcgAfterCarryforward, netCapitalAllowed));

    // ---- §461(l) excess business loss (Rev. Proc. 2025-32 §4.31 threshold).
    // NOW actually disallowed and carried forward as an NOL (not merely
    // flagged): uses rentalAllowed (post-§469 suspension), not raw
    // rentalNet — a suspended rental loss isn't even usable this year, so
    // it can't be part of the aggregate business result §461(l) tests. The
    // disallowed excess is added BACK to this year's income (Form 461 flows
    // it to Schedule 1 as other income) and banked in state.nolCarryforward
    // for FUTURE years only (an NOL generated this year cannot offset this
    // year's own income). ----
    var netBusinessResult = p.scheduleCNet + p.passthroughK1 + rentalAllowed;
    var excessBusinessLoss = Math.max(0, -netBusinessResult - tb.excessBusinessLoss.threshold[fs]);

    // ---- AGI (Social Security taxability computed against MAGI BEFORE
    // Social Security itself, per §86's "provisional income" test) ----
    var totalIncomeExclSS = p.wages + p.ownerWages + p.scheduleCNet + p.passthroughK1 +
      rentalAllowed + netCapitalAllowed + p.qualDiv + p.interest + p.otherIncome +
      (p.rothConversionIncome || 0) + excessBusinessLoss;
    var agiExclSS = totalIncomeExclSS - seDeduction - p.adjustments;
    var ssTaxable = TSIQ.taxableSocialSecurity(fs, agiExclSS, p.ssBenefitsGross || 0);
    var totalIncome = totalIncomeExclSS + ssTaxable;
    var agi = agiExclSS + ssTaxable;

    // ---- State tax (flat effective rate — documented simplification). The
    // state base adds back any PTET-deducted K-1 income (states tax the
    // owner on PRE-PTET income and credit the entity-level tax paid, rather
    // than allowing a second personal deduction) — PTET paid then credits
    // against that gross liability, so the owner's state bill stays flat
    // when the PTET rate matches the state rate, exactly as advertised. ----
    var stateTaxGross = Math.max(0, agi + p.ptetDeducted + p.stateIncomeAddBack - p.stateOnlyDeduction) * p.stateRate;
    var personalStateTax = Math.max(0, stateTaxGross - p.ptetPaid);
    // Most states don't refund PTET credit beyond the liability it offsets —
    // surface any over-remittance instead of silently discarding it.
    var unusedPtetCredit = Math.max(0, p.ptetPaid - stateTaxGross);

    // ---- Itemized vs standard, with OBBBA SALT cap phase-down (schedule is
    // year-dependent — see saltCapForYear() and the `salt` table comment:
    // the enhanced cap sunsets after 2029) and the OBBBA §170(p) 0.5%-of-AGI
    // floor on itemized charitable contributions ----
    var saltPaid = personalStateTax + p.propertyTax;
    var s = tb.salt;
    var saltNow = saltCapForYear(fs, projYear);
    var effectiveCap = Math.max(
      s.floor[fs],
      saltNow.cap - saltNow.phaseDownRate * Math.max(0, agi - saltNow.phaseDownStart)
    );
    var saltDeduction = Math.min(saltPaid, effectiveCap);
    var charitableFloor = tb.charitableAGIFloor * Math.max(0, agi);
    var charitableItemizedAllowed = Math.max(0, p.charitable - charitableFloor);
    var itemizedBeforeLimit = saltDeduction + p.mortgageInterest +
      charitableItemizedAllowed + p.otherItemized;

    // ---- OBBBA §68 overall limitation on itemized deductions (37%-bracket
    // taxpayers): reduced by 2/37 of the lesser of itemized or the excess of
    // AGI over the 37% bracket threshold (AGI used as the engine's standard
    // proxy for "taxable income + itemized deductions" over that threshold) ----
    var il = tb.itemizedLimitation;
    var top37 = tb.brackets[fs][tb.brackets[fs].length - 1][0];
    var itemizedOverThreshold = Math.max(0, agi - top37);
    var itemizedLimitation = il.factor * Math.min(itemizedBeforeLimit, itemizedOverThreshold);
    var itemized = Math.max(0, itemizedBeforeLimit - itemizedLimitation);

    var standardDed = tb.standardDeduction[fs] + (p.age65Count || 0) * tb.additionalStdDedAged[fs];
    var usedItemized = itemized > standardDed;
    var deductionBase = Math.max(standardDed, itemized);

    // ---- OBBBA §70424 non-itemizer charitable deduction (cash only, capped;
    // simplification: all of p.charitable is treated as cash) ----
    var nonItemizerCharitableAllowed = usedItemized ? 0
      : Math.min(Math.max(0, p.charitable), tb.nonItemizerCharitable[fs]);

    // ---- OBBBA §70103 senior deduction ($6,000/qualifying 65+ individual,
    // MAGI-phased-out, available whether itemizing or not). Sunsets after
    // sd.sunsetTaxYear (2028) per enacted law — see PJ1 / tables comment. ----
    var sd = tb.seniorDeduction;
    var seniorApplies = !sd.sunsetTaxYear || projYear <= sd.sunsetTaxYear;
    // The statute reduces "the $6,000 amount" — i.e. EACH qualifying
    // individual's own $6,000 — by 6% of the MAGI excess, floored at zero per
    // person. It does not reduce the couple's aggregate once. The difference
    // only shows up on a joint return where BOTH spouses are 65+: applied per
    // person the $12,000 is gone at $250,000 of MAGI ($150,000 + $6,000/6%),
    // which is the full-phase-out figure the published guidance states;
    // applied once to the aggregate it would survive to $350,000 and hand a
    // two-senior couple up to $6,000 of deduction they are not entitled to.
    var perPersonReduction = sd.phaseOutRate * Math.max(0, agi - sd.magiPhaseOutStart[fs]);
    var perPersonAllowed = Math.max(0, sd.amount - perPersonReduction);
    var seniorDeductionAllowed = seniorApplies ? (p.age65Count || 0) * perPersonAllowed : 0;

    var deduction = deductionBase + nonItemizerCharitableAllowed + seniorDeductionAllowed;
    var tiBeforeQBI = Math.max(0, agi - deduction);

    // ---- §461(l)/§172(a)(2) NOL carryforward usage, from PRIOR years'
    // banked excess business loss only (this year's own excessBusinessLoss
    // is banked below for FUTURE years — an NOL cannot offset the year it
    // arose). Capped at 80% of taxable income computed WITHOUT the NOL
    // deduction AND WITHOUT §199A (§172(a)(2)(B)(ii)) — exactly tiBeforeQBI. ----
    state.nolCarryforward = state.nolCarryforward || 0;
    var nolUsed = Math.min(state.nolCarryforward, 0.80 * tiBeforeQBI);
    state.nolCarryforward -= nolUsed;

    // ---- QBI, taxable income, income tax ----
    var qbi = qbiDeduction(p, agi, deduction, seDeduction, state);
    var taxableIncome = Math.max(0, tiBeforeQBI - qbi - nolUsed);
    state.nolCarryforward += excessBusinessLoss; // banked for FUTURE years only
    var prefIncome = Math.min(taxableIncome, preferentialLTCG + Math.max(0, p.qualDiv));
    var ordinaryTaxable = taxableIncome - prefIncome;
    var ordinaryTax = bracketTax(ordinaryTaxable, tb.brackets[fs]);
    var capGainsTax = prefRateTax(ordinaryTaxable, prefIncome, fs);
    var incomeTaxBeforeCredits = ordinaryTax + capGainsTax;

    // ---- Child tax credit / other-dependent credit (§24, OBBBA amounts).
    // Phase-out: $50 per $1,000 (or fraction) of MAGI over the threshold.
    // The CHILD portion (never the $500 Other Dependent Credit — §24(h)(5)
    // only refunds the child credit) that can't be used nonrefundably is
    // still refundable as the Additional CTC, capped at refundableMax per
    // child and 15% of earned income over $2,500. The phase-out reduction
    // is allocated proportionally between CTC and ODC to isolate the
    // child-only share (the engine's simplification of the real worksheet;
    // acceptable for this clientele). ----
    var c = tb.ctc;
    var ctcOnly = p.kidsCTC * c.perChild;
    var odcOnly = p.otherDeps * c.perOtherDependent;
    var grossCTC = ctcOnly + odcOnly;
    var ctcExcess = Math.max(0, agi - c.phaseOutThreshold[fs]);
    var ctcReduction = Math.ceil(ctcExcess / 1000) * c.phaseOutPer1000;
    var netCredit = Math.max(0, grossCTC - ctcReduction);
    var ctcOnlyNet = grossCTC > 0 ? netCredit * (ctcOnly / grossCTC) : 0;
    var ctcAllowed = Math.min(netCredit, incomeTaxBeforeCredits);
    var ctcUnused = Math.max(0, netCredit - ctcAllowed);
    var earnedIncome = p.wages + p.ownerWages + Math.max(0, p.scheduleCNet - seDeduction);
    var actcAllowed = Math.min(Math.min(ctcUnused, ctcOnlyNet),
      c.refundableMax * p.kidsCTC, 0.15 * Math.max(0, earnedIncome - 2500));
    // Other nonrefundable credits (strategy hook) — applied after CTC.
    var otherCreditsAllowed = Math.min(p.otherCredits, incomeTaxBeforeCredits - ctcAllowed);
    var incomeTax = incomeTaxBeforeCredits - ctcAllowed - otherCreditsAllowed;

    // ---- NIIT (§1411) — net gain from disposition of property is NII
    // regardless of ST/LT character, so use the combined, carryforward- and
    // §1211(b)-floor-adjusted netCapitalAllowed (not raw p.ltcg alone).
    // Rental is passive NII unless the taxpayer is a real estate
    // professional / materially participates (reNonPassive), which is
    // independent of whether current-year §469 losses happen to be usable ----
    var nii = Math.max(0, netCapitalAllowed) + Math.max(0, p.qualDiv) + Math.max(0, p.interest) +
      (p.reNonPassive ? 0 : Math.max(0, rentalAllowed));
    var niit = tb.niit.rate * Math.max(0, Math.min(nii,
      Math.max(0, agi - tb.niit.magiThreshold[fs])));

    var totalFederal = incomeTax + seTax + addlMedicare + niit + ownerPayrollTax +
      p.corpTaxPaid + p.otherTaxes - excessSSCredit - actcAllowed;
    var totalState = personalStateTax + p.ptetPaid + p.entityStateTax;
    var totalBurden = totalFederal + totalState;

    // ---- Payments to date → remaining balance due (current year only;
    // the scenario engine zeroes payments for projection years 2+). ----
    var fedPayments = p.fedWithholding + p.fedEstimates;
    var statePayments = p.stateWithholding + p.stateEstimates;
    var fedBalanceDue = totalFederal - fedPayments;
    var stateBalanceDue = personalStateTax - statePayments;

    return {
      profile: p,
      totalIncome: totalIncome, agi: agi, capitalLossDisallowed: capitalLossDisallowed,
      deduction: deduction, usedItemized: usedItemized,
      saltDeduction: saltDeduction, saltEffectiveCap: effectiveCap,
      charitableItemizedAllowed: charitableItemizedAllowed,
      itemizedLimitation: itemizedLimitation,
      nonItemizerCharitableAllowed: nonItemizerCharitableAllowed,
      seniorDeductionAllowed: seniorDeductionAllowed,
      qbiDeduction: qbi, taxableIncome: taxableIncome,
      ordinaryTax: ordinaryTax, capGainsTax: capGainsTax,
      prefIncome: prefIncome, ordinaryTaxable: ordinaryTaxable, // ET4 calculation-trace popup
      seNetEarnings: seNetEarnings, tiBeforeQBI: tiBeforeQBI, // ET4
      netCapitalAllowed: netCapitalAllowed, rentalAllowed: rentalAllowed, // ET4
      incomeTaxBeforeCredits: incomeTaxBeforeCredits,
      ctcAllowed: ctcAllowed, actcAllowed: actcAllowed, otherCreditsAllowed: otherCreditsAllowed,
      corpTaxPaid: p.corpTaxPaid, otherTaxes: p.otherTaxes, incomeTax: incomeTax,
      entityStateTax: p.entityStateTax, stateOnlyDeduction: p.stateOnlyDeduction,
      fedPayments: fedPayments, statePayments: statePayments,
      totalPayments: fedPayments + statePayments,
      fedBalanceDue: fedBalanceDue, stateBalanceDue: stateBalanceDue,
      totalBalanceDue: fedBalanceDue + stateBalanceDue,
      seTax: seTax, ownerPayrollTax: ownerPayrollTax, excessSSCredit: excessSSCredit,
      addlMedicare: addlMedicare, niit: niit,
      totalFederal: totalFederal,
      personalStateTax: personalStateTax, ptetPaid: p.ptetPaid,
      unusedPtetCredit: unusedPtetCredit,
      excessBusinessLoss: excessBusinessLoss, ssTaxable: ssTaxable,
      netBusinessResult: netBusinessResult, // WF3: the pre-§461(l) aggregate
                                             // business result (scheduleCNet +
                                             // passthroughK1 + rentalAllowed) —
                                             // exposed so the UI can show
                                             // proximity to the threshold
                                             // without recomputing §469 itself.
      totalState: totalState, totalBurden: totalBurden,
      suspendedRentalLossAdded: suspendedAdded,
      suspendedRentalLossUsed: suspendedUsed,
      suspendedRentalLossBalance: state.suspendedRentalLoss,
      nolUsed: nolUsed, nolCarryforwardBalance: state.nolCarryforward,
      capitalLossCarryforwardUsed: carryforwardUsed,
      capitalLossCarryforwardBalance: state.capitalLossCarryforward,
      qbiLossCarryoverBalance: state.qbiLossCarryover
    };
  };
})();
