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

  // §199A QBI deduction — simplified but structurally correct:
  // - full 20% below the taxable-income threshold
  // - W-2 wage limit (50% of wages; UBIA prong not modeled) phased in above it
  // - SSTB benefit phased out entirely across the phase-in range
  // - overall cap: 20% of (taxable income before QBI − net capital gain)
  // - OBBBA §70105 $400 minimum for qualifying active QBI (not applied when
  //   the SSTB phase-out has fully excluded the income from QBI altogether)
  function qbiDeduction(p, agi, deduction, seDeduction) {
    var t = T().qbi, fs = p.filingStatus;
    // NOTE: rentalNet is intentionally excluded from qbiIncome. Rental rising
    // to a §162 trade/business (or the Rev. Proc. 2019-38 safe harbor) can
    // generate QBI in reality — not modeled in v1 (see README scope notes).
    // The 25%-wage/2.5%-UBIA alternative wage limit is likewise not modeled;
    // only the 50%-of-wages prong applies below.
    var qbiIncome = Math.max(0,
      (p.scheduleCNet - seDeduction) + p.passthroughK1 - (p.qbiReduction || 0));
    if (qbiIncome <= 0) return 0;

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
      ltcg: 0, qualDiv: 0, interest: 0, otherIncome: 0,
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
      otherTaxes: 0      // additional payroll/other federal taxes strategies create
                         // (e.g., FICA on kids' S-corp wages)
    }, profile);
    state = state || {};
    var tb = T(), fs = p.filingStatus, f = tb.fica;

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

    // ---- Capital loss limitation (§1211(b)): a net capital loss offsets
    // ordinary income only up to $3,000 ($1,500 MFS) per year; the disallowed
    // excess is a capital loss carryforward (not tracked across years here) ----
    var capLossFloor = (fs === 'mfs') ? -1500 : -3000;
    var ltcgAllowed = Math.max(p.ltcg, capLossFloor);
    var capitalLossDisallowed = p.ltcg < capLossFloor ? (capLossFloor - p.ltcg) : 0;

    // ---- AGI ----
    var totalIncome = p.wages + p.ownerWages + p.scheduleCNet + p.passthroughK1 +
      rentalAllowed + ltcgAllowed + p.qualDiv + p.interest + p.otherIncome;
    var agi = totalIncome - seDeduction - p.adjustments;

    // ---- State tax (flat effective rate — documented simplification). The
    // state base adds back any PTET-deducted K-1 income (states tax the
    // owner on PRE-PTET income and credit the entity-level tax paid, rather
    // than allowing a second personal deduction) — PTET paid then credits
    // against that gross liability, so the owner's state bill stays flat
    // when the PTET rate matches the state rate, exactly as advertised. ----
    var stateTaxGross = Math.max(0, agi + p.ptetDeducted) * p.stateRate;
    var personalStateTax = Math.max(0, stateTaxGross - p.ptetPaid);
    // Most states don't refund PTET credit beyond the liability it offsets —
    // surface any over-remittance instead of silently discarding it.
    var unusedPtetCredit = Math.max(0, p.ptetPaid - stateTaxGross);

    // ---- Itemized vs standard, with OBBBA SALT cap phase-down and the
    // OBBBA §170(p) 0.5%-of-AGI floor on itemized charitable contributions ----
    var saltPaid = personalStateTax + p.propertyTax;
    var s = tb.salt;
    var effectiveCap = Math.max(
      s.floor[fs],
      s.cap[fs] - s.phaseDownRate * Math.max(0, agi - s.phaseDownStart[fs])
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
    // MAGI-phased-out, available whether itemizing or not) ----
    var sd = tb.seniorDeduction;
    var seniorGross = (p.age65Count || 0) * sd.amount;
    var seniorReduction = sd.phaseOutRate * Math.max(0, agi - sd.magiPhaseOutStart[fs]);
    var seniorDeductionAllowed = Math.max(0, seniorGross - seniorReduction);

    var deduction = deductionBase + nonItemizerCharitableAllowed + seniorDeductionAllowed;

    // ---- QBI, taxable income, income tax ----
    var qbi = qbiDeduction(p, agi, deduction, seDeduction);
    var taxableIncome = Math.max(0, agi - deduction - qbi);
    var prefIncome = Math.min(taxableIncome, Math.max(0, p.ltcg) + Math.max(0, p.qualDiv));
    var ordinaryTaxable = taxableIncome - prefIncome;
    var ordinaryTax = bracketTax(ordinaryTaxable, tb.brackets[fs]);
    var capGainsTax = prefRateTax(ordinaryTaxable, prefIncome, fs);
    var incomeTaxBeforeCredits = ordinaryTax + capGainsTax;

    // ---- Child tax credit / other-dependent credit (§24, OBBBA amounts).
    // Phase-out: $50 per $1,000 (or fraction) of MAGI over the threshold.
    // Applied as nonrefundable (ACTC refundable portion not modeled in v1). ----
    var c = tb.ctc;
    var grossCTC = p.kidsCTC * c.perChild + p.otherDeps * c.perOtherDependent;
    var ctcExcess = Math.max(0, agi - c.phaseOutThreshold[fs]);
    var ctcReduction = Math.ceil(ctcExcess / 1000) * c.phaseOutPer1000;
    var ctcAllowed = Math.min(Math.max(0, grossCTC - ctcReduction), incomeTaxBeforeCredits);
    // Other nonrefundable credits (strategy hook) — applied after CTC.
    var otherCreditsAllowed = Math.min(p.otherCredits, incomeTaxBeforeCredits - ctcAllowed);
    var incomeTax = incomeTaxBeforeCredits - ctcAllowed - otherCreditsAllowed;

    // ---- NIIT (§1411) — rental is passive NII unless the taxpayer is a real
    // estate professional / materially participates (reNonPassive), which is
    // independent of whether current-year §469 losses happen to be usable ----
    var nii = Math.max(0, p.ltcg) + Math.max(0, p.qualDiv) + Math.max(0, p.interest) +
      (p.reNonPassive ? 0 : Math.max(0, rentalAllowed));
    var niit = tb.niit.rate * Math.max(0, Math.min(nii,
      Math.max(0, agi - tb.niit.magiThreshold[fs])));

    var totalFederal = incomeTax + seTax + addlMedicare + niit + ownerPayrollTax +
      p.corpTaxPaid + p.otherTaxes - excessSSCredit;
    var totalState = personalStateTax + p.ptetPaid;
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
      incomeTaxBeforeCredits: incomeTaxBeforeCredits,
      ctcAllowed: ctcAllowed, otherCreditsAllowed: otherCreditsAllowed,
      corpTaxPaid: p.corpTaxPaid, otherTaxes: p.otherTaxes, incomeTax: incomeTax,
      fedPayments: fedPayments, statePayments: statePayments,
      totalPayments: fedPayments + statePayments,
      fedBalanceDue: fedBalanceDue, stateBalanceDue: stateBalanceDue,
      totalBalanceDue: fedBalanceDue + stateBalanceDue,
      seTax: seTax, ownerPayrollTax: ownerPayrollTax, excessSSCredit: excessSSCredit,
      addlMedicare: addlMedicare, niit: niit,
      totalFederal: totalFederal,
      personalStateTax: personalStateTax, ptetPaid: p.ptetPaid,
      unusedPtetCredit: unusedPtetCredit,
      totalState: totalState, totalBurden: totalBurden,
      suspendedRentalLossAdded: suspendedAdded,
      suspendedRentalLossUsed: suspendedUsed,
      suspendedRentalLossBalance: state.suspendedRentalLoss
    };
  };
})();
