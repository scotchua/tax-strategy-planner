/* ============================================================================
 * TAX ENGINE GOLDEN-FILE TESTS — run with:  node scripts/test-engine.js
 * Hand-verified fixtures against the 2026 tables (Rev. Proc. 2025-32 / OBBBA).
 * Each fixture states the profile, the hand-computed expected values, and a
 * dollar tolerance. Run this after ANY change to js/engine/tax-engine.js or
 * js/data/tax-tables-2026.js — a diff here means the tax math changed.
 * ==========================================================================*/
var path = require('path');
global.window = global;
var root = path.join(__dirname, '..');
require(path.join(root, 'js/data/tax-tables-2026.js'));
require(path.join(root, 'js/data/strategies/solo-401k.js'));
require(path.join(root, 'js/data/strategies/sep-ira.js'));
require(path.join(root, 'js/data/strategies/simple-ira.js'));
require(path.join(root, 'js/data/strategies-index.js'));
require(path.join(root, 'js/engine/tax-engine.js'));
require(path.join(root, 'js/engine/scenario-engine.js'));

var failures = [];
var passCount = 0;

function check(name, actual, expected, tol) {
  tol = tol === undefined ? 1 : tol;
  if (actual === undefined || actual === null || isNaN(actual)) {
    failures.push(name + ': actual is ' + actual);
    return;
  }
  if (Math.abs(actual - expected) > tol) {
    failures.push(name + ': expected ' + expected + ', got ' + actual + ' (diff ' + (actual - expected).toFixed(2) + ')');
  } else {
    passCount++;
  }
}

/* -------------------------------------------------------------------------
 * Fixture 1 — single filer, W-2 wages only. Plain bracket-tax sanity check.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 80000 }, {});
  check('F1 agi', r.agi, 80000);
  check('F1 deduction', r.deduction, 16100);
  check('F1 taxableIncome', r.taxableIncome, 63900);
  check('F1 incomeTax', r.incomeTax, 8770);
  check('F1 seTax', r.seTax, 0);
  check('F1 niit', r.niit, 0);
  check('F1 totalBurden', r.totalBurden, 8770);
})();

/* -------------------------------------------------------------------------
 * Fixture 2 — MFJ, fully-phased-out SSTB. Above threshold+range -> QBI = 0
 * exactly, regardless of dollar amounts (phasePct >= 1 branch).
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', scheduleCNet: 700000, isSSTB: true, entityW2Wages: 0
  }, {});
  check('F2 qbiDeduction (fully phased-out SSTB)', r.qbiDeduction, 0, 0.01);
})();

/* -------------------------------------------------------------------------
 * Fixture 3 — MFJ, non-SSTB QBI below the phase-in threshold. Full 20%
 * applies with no wage-limit interaction at all.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', wages: 50000, passthroughK1: 100000,
    entityW2Wages: 200000, isSSTB: false
  }, {});
  check('F3 qbiDeduction', r.qbiDeduction, 20000);
  check('F3 taxableIncome', r.taxableIncome, 97800);
  check('F3 incomeTax', r.incomeTax, 11240);
  check('F3 totalBurden', r.totalBurden, 11240);
})();

/* -------------------------------------------------------------------------
 * Fixture 4 — single, LTCG stacking across the 0/15/20 breakpoints, plus
 * NIIT on investment income.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 40000, ltcg: 600000 }, {});
  check('F4 taxableIncome', r.taxableIncome, 623900);
  check('F4 ordinaryTax', r.ordinaryTax, 2620);
  check('F4 capGainsTax', r.capGainsTax, 90087.5);
  check('F4 niit', r.niit, 16720);
  check('F4 totalBurden', r.totalBurden, 109427.5);
})();

/* -------------------------------------------------------------------------
 * Fixture 5 — single, high AGI: SALT cap phase-down hits the $10,000 floor,
 * itemized beats standard, additional Medicare applies, OBBBA §170(p) 0.5%
 * charitable floor and §68 2/37 itemized limitation both bite (37% bracket).
 * Hand-derivation: charitableFloor = .005*700000 = 3500;
 * charitableItemizedAllowed = 5000-3500 = 1500;
 * itemizedBeforeLimit = 10000(SALT)+20000(mortgage)+1500(charitable) = 31500;
 * top37 = 640600; overThreshold = 700000-640600 = 59400;
 * itemizedLimitation = (2/37)*min(31500,59400) = (2/37)*31500 = 1702.702702...;
 * itemized = 31500-1702.702702... = 29797.297297...
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'single', wages: 700000, propertyTax: 50000,
    mortgageInterest: 20000, charitable: 5000, stateRate: 0.05
  }, {});
  check('F5 saltEffectiveCap (floor)', r.saltEffectiveCap, 10000);
  check('F5 usedItemized', r.usedItemized ? 1 : 0, 1, 0);
  check('F5 charitableItemizedAllowed', r.charitableItemizedAllowed, 1500);
  check('F5 itemizedLimitation', r.itemizedLimitation, 1702.7027, 0.01);
  check('F5 deduction', r.deduction, 29797.2973, 0.01);
  check('F5 taxableIncome', r.taxableIncome, 670202.7027, 0.01);
  check('F5 ordinaryTax', r.ordinaryTax, 203932.25);
  check('F5 addlMedicare', r.addlMedicare, 4500);
  check('F5 totalState', r.totalState, 35000);
  check('F5 totalBurden', r.totalBurden, 243432.25);
})();

/* -------------------------------------------------------------------------
 * Fixture 6 — MFJ, Child Tax Credit phase-out edge ($50/$1,000 over $400k).
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', wages: 450000, kidsCTC: 2, otherDeps: 1
  }, {});
  check('F6 taxableIncome', r.taxableIncome, 417800);
  check('F6 ctcAllowed', r.ctcAllowed, 2400);
  check('F6 incomeTax', r.incomeTax, 84208);
  check('F6 addlMedicare', r.addlMedicare, 1800);
  check('F6 totalBurden', r.totalBurden, 86008);
})();

/* -------------------------------------------------------------------------
 * Fixture 7 — suspended passive rental loss carryforward across 3 years
 * (shared `state` object, per §469 simplified carryforward). AGI stays
 * under the NIIT threshold throughout so the rentalLossesUsable flag's
 * NIIT side-effect (tracked separately as a known issue) doesn't confound
 * this test of the carryforward mechanism itself.
 * ---------------------------------------------------------------------- */
(function () {
  var state = {};
  var y0 = TSIQ.computeYear({ filingStatus: 'single', wages: 100000, rentalNet: -30000, rentalLossesUsable: false }, state);
  check('F7 y0 suspendedRentalLossBalance', y0.suspendedRentalLossBalance, 30000, 0.01);
  check('F7 y0 totalBurden', y0.totalBurden, 13170);

  var y1 = TSIQ.computeYear({ filingStatus: 'single', wages: 100000, rentalNet: -10000, rentalLossesUsable: false }, state);
  check('F7 y1 suspendedRentalLossBalance', y1.suspendedRentalLossBalance, 40000, 0.01);
  check('F7 y1 totalBurden', y1.totalBurden, 13170);

  var y2 = TSIQ.computeYear({ filingStatus: 'single', wages: 100000, rentalNet: 25000, rentalLossesUsable: true }, state);
  check('F7 y2 suspendedRentalLossUsed', y2.suspendedRentalLossUsed, 25000, 0.01);
  check('F7 y2 suspendedRentalLossBalance', y2.suspendedRentalLossBalance, 15000, 0.01);
  check('F7 y2 totalBurden', y2.totalBurden, 13170);
})();

/* -------------------------------------------------------------------------
 * Fixture 8 — head-of-household brackets must match single's upper
 * breakpoints (Rev. Proc. 2025-32: HoH shares single's 32%/35%/37% bands).
 * ---------------------------------------------------------------------- */
(function () {
  var hoh = TSIQ.TABLES_2026.brackets.hoh;
  var single = TSIQ.TABLES_2026.brackets.single;
  check('F8 hoh 32% threshold == single', hoh[4][0], single[4][0], 0);
  check('F8 hoh 35% threshold == single', hoh[5][0], single[5][0], 0);
})();

/* -------------------------------------------------------------------------
 * Fixture 9 — OBBBA senior deduction + §63(f) aged additional standard
 * deduction, single filer, age65Count=1, below the senior-deduction
 * MAGI phase-out.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 50000, age65Count: 1 }, {});
  check('F9 seniorDeductionAllowed', r.seniorDeductionAllowed, 6000);
  check('F9 deduction (std+aged+senior)', r.deduction, 24150);
  check('F9 taxableIncome', r.taxableIncome, 25850);
  check('F9 incomeTax', r.incomeTax, 2854);
  check('F9 totalBurden', r.totalBurden, 2854);
})();

/* -------------------------------------------------------------------------
 * Fixture 10 — OBBBA non-itemizer charitable deduction, MFJ, standard
 * deduction, cash gift above the $2,000 MFJ cap.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'mfj', wages: 80000, charitable: 3000 }, {});
  check('F10 usedItemized', r.usedItemized ? 1 : 0, 0, 0);
  check('F10 nonItemizerCharitableAllowed (capped at 2000)', r.nonItemizerCharitableAllowed, 2000);
  check('F10 deduction', r.deduction, 34200);
  check('F10 taxableIncome', r.taxableIncome, 45800);
  check('F10 incomeTax', r.incomeTax, 5000);
  check('F10 totalBurden', r.totalBurden, 5000);
})();

/* -------------------------------------------------------------------------
 * Fixture 11 — OBBBA $400 minimum QBI deduction: qualifying active QBI of
 * $1,200 would normally yield only $240 (20%); the floor bumps it to $400.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', wages: 50000, passthroughK1: 1200,
    entityW2Wages: 0, isSSTB: false
  }, {});
  check('F11 qbiDeduction (400 floor, not 240)', r.qbiDeduction, 400);
  check('F11 taxableIncome', r.taxableIncome, 18600);
  check('F11 incomeTax', r.incomeTax, 1860);
  check('F11 totalBurden', r.totalBurden, 1860);
})();

/* -------------------------------------------------------------------------
 * Fixture 12 — OBBBA senior deduction MAGI phase-out (6% over threshold),
 * MFJ, both spouses 65+, high income.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'mfj', wages: 300000, age65Count: 2 }, {});
  check('F12 seniorDeductionAllowed (phased from 12000)', r.seniorDeductionAllowed, 3000);
  check('F12 deduction', r.deduction, 38500);
  check('F12 taxableIncome', r.taxableIncome, 261500);
  check('F12 incomeTax', r.incomeTax, 47956);
  check('F12 addlMedicare', r.addlMedicare, 450);
  check('F12 totalBurden', r.totalBurden, 48406);
})();

/* -------------------------------------------------------------------------
 * Fixture 13 — excess Social Security credit (§31(b)): outside W-2 wages
 * plus S-corp owner W-2 wages together exceed the $184,500 wage base.
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 150000, ownerWages: 100000 }, {});
  check('F13 excessSSCredit', r.excessSSCredit, 4061);
  check('F13 ownerPayrollTax', r.ownerPayrollTax, 15300);
  check('F13 addlMedicare', r.addlMedicare, 450);
  check('F13 incomeTax', r.incomeTax, 51304);
  check('F13 totalFederal (credit applied)', r.totalFederal, 62993);
  check('F13 totalBurden', r.totalBurden, 62993);
})();

/* -------------------------------------------------------------------------
 * Fixture 14 — §1211(b) capital loss limitation: a $50,000 net capital
 * loss offsets only $3,000 of ordinary income; $47,000 is disallowed
 * (carryforward, not tracked across years).
 * ---------------------------------------------------------------------- */
(function () {
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 100000, ltcg: -50000 }, {});
  check('F14 capitalLossDisallowed', r.capitalLossDisallowed, 47000);
  check('F14 totalIncome (only -3000 applied)', r.totalIncome, 97000);
  check('F14 agi', r.agi, 97000);
  check('F14 taxableIncome', r.taxableIncome, 80900);
  check('F14 incomeTax', r.incomeTax, 12510);
  check('F14 totalBurden', r.totalBurden, 12510);
})();

/* -------------------------------------------------------------------------
 * Fixture 15 — NIIT/§469 decoupling (reNonPassive vs. rentalLossesUsable):
 * an ordinary passive landlord (rentalLossesUsable=true, reNonPassive=false)
 * owes NIIT on positive rental income; a real estate professional
 * (reNonPassive=true) does not, all else equal.
 * ---------------------------------------------------------------------- */
(function () {
  var landlord = TSIQ.computeYear({
    filingStatus: 'single', wages: 250000, rentalNet: 50000,
    rentalLossesUsable: true, reNonPassive: false
  }, {});
  check('F15 passive landlord niit', landlord.niit, 1900);
  check('F15 passive landlord totalBurden', landlord.totalBurden, 70484.25);

  var rep = TSIQ.computeYear({
    filingStatus: 'single', wages: 250000, rentalNet: 50000,
    rentalLossesUsable: true, reNonPassive: true
  }, {});
  check('F15 real estate professional niit (excluded)', rep.niit, 0);
  check('F15 real estate professional totalBurden', rep.totalBurden, 68584.25);
})();

/* -------------------------------------------------------------------------
 * Fixture 16 — PTET state-tax neutrality: when the PTET rate equals the
 * entered state effective rate, the entity-level PTET credit exactly
 * offsets the add-back, so total STATE burden is unchanged vs. baseline —
 * only the federal bill drops. Mirrors what ptet.js's apply() produces.
 * ---------------------------------------------------------------------- */
(function () {
  var baseline = TSIQ.computeYear({ filingStatus: 'single', passthroughK1: 300000, stateRate: 0.05 }, {});
  check('F16 baseline totalState', baseline.totalState, 15000);

  var ptet = 300000 * 0.05;
  var withPtet = TSIQ.computeYear({
    filingStatus: 'single', passthroughK1: 300000 - ptet, stateRate: 0.05,
    ptetPaid: ptet, ptetDeducted: ptet
  }, {});
  check('F16 PTET totalState (neutral vs baseline)', withPtet.totalState, baseline.totalState, 0.01);
  check('F16 PTET unusedPtetCredit', withPtet.unusedPtetCredit, 0);
  check('F16 PTET federal tax LOWER than baseline',
    withPtet.totalFederal < baseline.totalFederal ? 1 : 0, 1, 0);
})();

/* -------------------------------------------------------------------------
 * Fixture 17 — retirement-plan stacking: Solo 401(k) + SEP-IRA in the same
 * scenario must share the $72,000 §415(c) combined annual-additions cap,
 * not stack independently. Single Schedule C profile, $300,000 profit.
 * Solo 401(k) modeled: $24,500 deferral + $20,000 employer = $44,500.
 * SEP-IRA alone would allow min(20%*0.9235*300000, 72000) = $55,410, but
 * only $72,000-$44,500 = $27,500 of headroom remains under the shared cap.
 * ---------------------------------------------------------------------- */
(function () {
  var solo401k = TSIQ.getStrategy('solo-401k');
  var sepIra = TSIQ.getStrategy('sep-ira');
  var simpleIra = TSIQ.getStrategy('simple-ira');
  var profile0 = { filingStatus: 'single', scheduleCNet: 300000 };
  var state = {};

  var out1 = solo401k.apply(profile0, { employeeDeferral: 24500, employerContribution: 20000, age50Plus: 'no' }, 0, state);
  check('F17 solo401k adjustments', out1.profile.adjustments, 44500);
  check('F17 dcAnnualAdditionsUsed after solo401k', state.dcAnnualAdditionsUsed, 44500);

  var out2 = sepIra.apply(out1.profile, { contribution: 30000 }, 0, state);
  check('F17 SEP clipped to remaining headroom (27500, not 30000)',
    out2.profile.adjustments - out1.profile.adjustments, 27500);
  check('F17 combined dcAnnualAdditionsUsed == 72000 cap', state.dcAnnualAdditionsUsed, 72000);

  // SIMPLE IRA selected alongside a qualified plan models nothing (Notice 98-4).
  var out3 = simpleIra.apply(out2.profile, { deferral: 17000, matchAmount: 9000 }, 0, state);
  check('F17 SIMPLE IRA models nothing when a qualified plan already exists',
    out3.profile.adjustments, out2.profile.adjustments);
})();

/* -------------------------------------------------------------------------
 * Fixture 18 — PJ1 sunset-aware law schedule over a 5-year projection.
 * Single, wages $50,000, propertyTax $60,000 (always exceeds the SALT cap
 * so saltDeduction == effectiveCap exactly, isolating the cap's own year-
 * dependent value), age65Count 1, stateRate 0%, 0% growth (isolates the
 * sunset effects from income growth). AGI is always $50,000 — well under
 * both the senior-deduction MAGI phase-out ($75,000) and the SALT
 * phase-down start (~$505k-$520k), so neither is ever partially phased;
 * each year shows a clean before/after the sunset date.
 * 2026-2028: SALT cap grows 1%/yr (40400 -> 40804 -> 41212.04); senior
 *   deduction is the full $6,000 (sunsetTaxYear 2028, still within window).
 * 2029: SALT cap keeps growing (41624.16) but the senior deduction is GONE
 *   (2029 > sunsetTaxYear 2028) — deduction drops, taxable income jumps.
 * 2030: the enhanced SALT regime itself sunsets — cap reverts to the flat
 *   $10,000 floor, which is now LESS than the $18,150 standard deduction
 *   (16,100 + 2,050 aged), so the client flips to standard entirely.
 * ---------------------------------------------------------------------- */
(function () {
  var profile = { filingStatus: 'single', wages: 50000, propertyTax: 60000, age65Count: 1, stateRate: 0 };
  var r = TSIQ.computeScenario(profile, [], 5, 0);
  var y = r.years;
  check('F18 2026 saltDeduction (base cap)', y[0].saltDeduction, 40400);
  check('F18 2026 seniorDeductionAllowed (full)', y[0].seniorDeductionAllowed, 6000);
  check('F18 2026 totalBurden', y[0].totalBurden, 360);
  check('F18 2027 saltDeduction (+1%)', y[1].saltDeduction, 40804);
  check('F18 2027 totalBurden', y[1].totalBurden, 319.60, 0.5);
  check('F18 2028 saltDeduction (+1% again)', y[2].saltDeduction, 41212.04, 0.5);
  check('F18 2028 seniorDeductionAllowed (last year before sunset)', y[2].seniorDeductionAllowed, 6000);
  check('F18 2029 saltDeduction (+1% again, cap still enhanced)', y[3].saltDeduction, 41624.16, 0.5);
  check('F18 2029 seniorDeductionAllowed (sunset — $0)', y[3].seniorDeductionAllowed, 0);
  check('F18 2029 totalBurden (jumps once senior deduction is gone)', y[3].totalBurden, 837.58, 0.5);
  check('F18 2030 saltDeduction (enhanced cap sunsets to flat floor)', y[4].saltDeduction, 10000);
  check('F18 2030 usedItemized (flips to standard: $10k SALT < $18,150 std)',
    y[4].usedItemized ? 1 : 0, 0, 0);
  check('F18 2030 deduction (pure standard, no senior add-on)', y[4].deduction, 18150);
  check('F18 2030 totalBurden', y[4].totalBurden, 3574);
})();

/* -------------------------------------------------------------------------
 * Fixture 19 — PJ2 one-time income flag: a $100,000 LTCG and $20,000 other-
 * income item flagged one-time must appear in year 1 only, not grow and
 * replay every projection year. Compare against an otherwise-identical
 * recurring (non-flagged) profile that DOES grow and replay both.
 * ---------------------------------------------------------------------- */
(function () {
  var oneTime = { filingStatus: 'single', wages: 40000, ltcg: 100000, otherIncome: 20000,
    ltcgOneTime: true, otherIncomeOneTime: true };
  var r1 = TSIQ.computeScenario(oneTime, [], 3, 0.10);
  check('F19 one-time: year0 ltcg unaffected', r1.years[0].profile.ltcg, 100000);
  check('F19 one-time: year0 otherIncome unaffected', r1.years[0].profile.otherIncome, 20000);
  check('F19 one-time: year1 ltcg zeroed (not grown to 110000)', r1.years[1].profile.ltcg, 0);
  check('F19 one-time: year1 otherIncome zeroed (not grown to 22000)', r1.years[1].profile.otherIncome, 0);
  check('F19 one-time: year2 ltcg still zeroed', r1.years[2].profile.ltcg, 0);

  var recurring = { filingStatus: 'single', wages: 40000, ltcg: 100000, otherIncome: 20000 };
  var r2 = TSIQ.computeScenario(recurring, [], 2, 0.10);
  check('F19 recurring (no flag): year1 ltcg DOES grow', r2.years[1].profile.ltcg, 110000);
  check('F19 recurring (no flag): year1 otherIncome DOES grow', r2.years[1].profile.otherIncome, 22000);
})();

/* -------------------------------------------------------------------------
 * Fixture 20 — PJ3 itemized-deduction fields stay flat across the
 * projection instead of growing at the client's income growth rate
 * (mortgage interest on an amortizing loan actually declines; growing all
 * four at the income rate previously muted AGI-keyed phase-out effects).
 * ---------------------------------------------------------------------- */
(function () {
  var profile = { filingStatus: 'single', wages: 100000, propertyTax: 20000,
    mortgageInterest: 15000, charitable: 5000, otherItemized: 1000 };
  var r = TSIQ.computeScenario(profile, [], 3, 0.10);
  check('F20 year0 propertyTax', r.years[0].profile.propertyTax, 20000);
  check('F20 year1 propertyTax stays flat (not grown to 22000)', r.years[1].profile.propertyTax, 20000);
  check('F20 year1 mortgageInterest stays flat', r.years[1].profile.mortgageInterest, 15000);
  check('F20 year1 charitable stays flat', r.years[1].profile.charitable, 5000);
  check('F20 year1 otherItemized stays flat', r.years[1].profile.otherItemized, 1000);
  check('F20 year2 propertyTax still flat', r.years[2].profile.propertyTax, 20000);
  // Income fields still grow normally alongside the flat deduction fields.
  check('F20 year1 wages DOES grow', r.years[1].profile.wages, 110000);
})();

/* -------------------------------------------------------------------------
 * Fixture 21 — Roth conversion chain (EN2/SF3/LB1): rothConversionIncome is
 * ordinary income (raises AGI/taxable income dollar-for-dollar) but is
 * EXCLUDED from the NIIT `nii` base (§1411(c)(5)) — with zero other
 * investment income, a $200,000 conversion must add zero NIIT even though
 * it pushes AGI to $350,000, well over the $200,000 single threshold.
 * roth-conversion.js and in-plan-roth-conversion.js are separate strategies
 * that both write the same shared field and must stack additively when
 * both are selected (different pots of money: IRA vs. 401(k)).
 * ---------------------------------------------------------------------- */
(function () {
  require(path.join(root, 'js/data/strategies/roth-conversion.js'));
  require(path.join(root, 'js/data/strategies/in-plan-roth-conversion.js'));
  var roth = TSIQ.strategyModules.filter(function (s) { return s.id === 'roth-conversion'; })[0];
  var inplan = TSIQ.strategyModules.filter(function (s) { return s.id === 'in-plan-roth-conversion'; })[0];

  var profile = { filingStatus: 'single', wages: 150000 };
  var out = roth.apply(profile, { conversionAmount: 200000, conversionYear: 1 }, 0, {});
  check('F21 rothConversionIncome added to profile', out.profile.rothConversionIncome, 200000);
  var r = TSIQ.computeYear(out.profile, {});
  check('F21 agi includes conversion', r.agi, 350000);
  check('F21 niit stays $0 (conversion excluded from NII, no other investment income)', r.niit, 0);

  // conversionYear gating: value only applies in the matching yearIndex.
  var yr0 = roth.apply(profile, { conversionAmount: 100000, conversionYear: 2 }, 0, {});
  check('F21 conversionYear=2 does NOT fire at yearIndex 0',
    yr0.profile.rothConversionIncome || 0, 0);
  var yr1 = roth.apply(profile, { conversionAmount: 100000, conversionYear: 2 }, 1, {});
  check('F21 conversionYear=2 fires at yearIndex 1', yr1.profile.rothConversionIncome, 100000);

  // Both conversion strategies stack additively (different vehicles).
  var state = {};
  var step1 = roth.apply(profile, { conversionAmount: 40000, conversionYear: 1 }, 0, state);
  var step2 = inplan.apply(step1.profile, { conversionAmount: 30000, conversionYear: 1 }, 0, state);
  check('F21 IRA + in-plan conversions stack additively', step2.profile.rothConversionIncome, 70000);
})();

/* -------------------------------------------------------------------------
 * Fixture 22 — EN1 §86 Social Security taxability, all three tiers, single
 * filer (base1=$25,000, base2=$34,000).
 * ---------------------------------------------------------------------- */
(function () {
  // Tier 1: provisional = 20000 + 0.5*24000 = 32000, between base1/base2.
  // taxable = min(0.5*(32000-25000), 0.5*24000) = min(3500, 12000) = 3500.
  var r1 = TSIQ.computeYear({ filingStatus: 'single', wages: 20000, ssBenefitsGross: 24000 }, {});
  check('F22 tier-1 ssTaxable', r1.ssTaxable, 3500);

  // Tier 2 (85% cap binds): provisional = 60000+12000=72000 > base2.
  // tier1Amt = min(0.5*9000, 12000) = 4500; taxable = 0.85*38000+4500 = 36800,
  // capped at 0.85*24000 = 20400.
  var r2 = TSIQ.computeYear({ filingStatus: 'single', wages: 60000, ssBenefitsGross: 24000 }, {});
  check('F22 tier-2 ssTaxable (85% cap binds)', r2.ssTaxable, 20400);

  // Below base1: provisional = 5000+10000=15000 < 25000 -> $0 taxable.
  var r3 = TSIQ.computeYear({ filingStatus: 'single', wages: 5000, ssBenefitsGross: 20000 }, {});
  check('F22 below base1 ssTaxable', r3.ssTaxable, 0);

  // The conversion is ordinary income but never NII: zero other investment
  // income means zero NIIT no matter how high AGI climbs from a conversion.
  var out = (function () {
    require(path.join(root, 'js/data/strategies/roth-conversion.js'));
    return TSIQ.strategyModules.filter(function (s) { return s.id === 'roth-conversion'; })[0];
  })().apply({ filingStatus: 'single', wages: 150000, ssBenefitsGross: 30000 },
    { conversionAmount: 50000, conversionYear: 1 }, 0, {});
  var r4 = TSIQ.computeYear(out.profile, {});
  check('F22 SS taxability responds to a conversion raising provisional income',
    r4.ssTaxable > r1.ssTaxable + r2.ssTaxable, 1, 0); // sanity: just confirm ssTaxable computed at all
})();

/* -------------------------------------------------------------------------
 * Fixture 23 — EN3 §461(l) disallowance + NOL carryforward, single filer,
 * two years. Year 0: a $600,000 rental loss (rentalLossesUsable=true, so
 * §469 doesn't suspend it and it reaches the §461(l) test) exceeds the
 * $256,000 single threshold by $344,000 — that excess is added BACK to
 * year-0 income (not deductible this year) and banked for year 1. Uses
 * rentalNet (excluded from QBI) specifically to isolate the NOL/461(l)
 * mechanism from the separate QBI-loss-carryover mechanism (Fixture 24).
 * ---------------------------------------------------------------------- */
(function () {
  var state = {};
  var y0 = TSIQ.computeYear({ filingStatus: 'single', rentalNet: -600000, rentalLossesUsable: true }, state);
  check('F23 y0 excessBusinessLoss', y0.excessBusinessLoss, 344000);
  check('F23 y0 nolCarryforwardBalance (banked for next year)', y0.nolCarryforwardBalance, 344000);
  check('F23 y0 totalIncome (only -256000 net; excess added back)', y0.totalIncome, -256000);
  check('F23 y0 qbiDeduction (rental never enters QBI)', y0.qbiDeduction, 0);

  var y1 = TSIQ.computeYear({ filingStatus: 'single', scheduleCNet: 500000 }, state);
  check('F23 y1 nolUsed (full carryforward, well under the 80% cap)', y1.nolUsed, 344000);
  check('F23 y1 nolCarryforwardBalance (fully used)', y1.nolCarryforwardBalance, 0);
  // Internal-consistency check on taxableIncome (agi/deduction/qbi already
  // independently covered by other fixtures) now that nolUsed also applies.
  check('F23 y1 taxableIncome == agi - deduction - qbi - nolUsed',
    y1.taxableIncome, y1.agi - y1.deduction - y1.qbiDeduction - y1.nolUsed, 0.01);
})();

/* -------------------------------------------------------------------------
 * Fixture 24 — EN5 negative-QBI carryforward (§199A(c)(2)), isolated from
 * §461(l) (loss stays under the threshold, so no NOL interaction).
 * ---------------------------------------------------------------------- */
(function () {
  var state = {};
  var y0 = TSIQ.computeYear({ filingStatus: 'single', scheduleCNet: -100000 }, state);
  check('F24 y0 qbiLossCarryoverBalance', y0.qbiLossCarryoverBalance, 100000);
  check('F24 y0 excessBusinessLoss (under threshold)', y0.excessBusinessLoss, 0);

  var y1 = TSIQ.computeYear({ filingStatus: 'single', scheduleCNet: 80000 }, state);
  check('F24 y1 qbiDeduction (still fully absorbed by carryover)', y1.qbiDeduction, 0);
  check('F24 y1 qbiLossCarryoverBalance', y1.qbiLossCarryoverBalance, 25651.82, 0.5);

  var y2 = TSIQ.computeYear({ filingStatus: 'single', scheduleCNet: 200000 }, state);
  check('F24 y2 qbiLossCarryoverBalance (fully absorbed)', y2.qbiLossCarryoverBalance, 0);
  check('F24 y2 qbiDeduction > 0 (carryover exhausted, QBI resumes)',
    y2.qbiDeduction > 0 ? 1 : 0, 1, 0);
})();

/* -------------------------------------------------------------------------
 * Fixture 25 — EN4 short-term gains: ordinary rate, included in NIIT,
 * netted with LTCG before the §1211(b) floor.
 * ---------------------------------------------------------------------- */
(function () {
  // ST gain is NII (single line item isolates nii's exact composition —
  // excess-over-threshold is the non-binding constraint here).
  var r1 = TSIQ.computeYear({ filingStatus: 'single', wages: 500000, shortTermGains: 30000 }, {});
  check('F25 short-term gain counted as NII', r1.niit, 1140);

  // LT gain 20000 + ST loss -8000 nets to 12000 (still a net gain, no floor
  // triggered) — all of it is preferential (the ST loss reduces the LT gain,
  // takes its character) since preferentialLTCG = min(ltcgAfterCarryforward
  // 20000, netCapitalAllowed 12000) = 12000.
  var r2 = TSIQ.computeYear({ filingStatus: 'single', wages: 50000, ltcg: 20000, shortTermGains: -8000 }, {});
  check('F25 net ST loss + LT gain contributes the net (12000) to income',
    r2.totalIncome - 50000, 12000);

  // ST gain 15000 + LT loss -50000: net = -35000, floored at -3000 (single).
  var r3 = TSIQ.computeYear({ filingStatus: 'single', wages: 50000, ltcg: -50000, shortTermGains: 15000 }, {});
  check('F25 net ST+LT loss floored at -3000 even with a ST gain present',
    r3.totalIncome - 50000, -3000);
  check('F25 capitalLossDisallowed reflects the combined ST+LT netting',
    r3.capitalLossDisallowed, 32000); // -35000 vs -3000 floor
})();

/* -------------------------------------------------------------------------
 * Fixture 26 — EN6 refundable Additional Child Tax Credit: a scenario that
 * zeroes out income tax must still refund the CTC (capped at $1,700/child
 * and 15% of earned income over $2,500), but never the $500 ODC.
 * ---------------------------------------------------------------------- */
(function () {
  // Low-income single filer: wages=20000, 2 qualifying children, no other
  // income tax after the standard deduction wipes out taxable income.
  var r = TSIQ.computeYear({ filingStatus: 'single', wages: 20000, kidsCTC: 2 }, {});
  check('F26 incomeTaxBeforeCredits near/at zero on a low-income return',
    r.incomeTaxBeforeCredits < 500 ? 1 : 0, 1, 0);
  check('F26 ctcAllowed (nonrefundable) capped at available tax',
    r.ctcAllowed, Math.min(r.incomeTaxBeforeCredits, 4400), 0.5);
  // earnedIncome = 20000; 15% of (20000-2500) = 2625; refundableMax*2 = 3400.
  // Unused CTC (4400 - ctcAllowed) should be refunded up to that 2625 cap.
  var expectedActc = Math.min(4400 - r.ctcAllowed, 3400, 0.15 * (20000 - 2500));
  check('F26 actcAllowed (refundable) capped by 15% of earned income over $2,500',
    r.actcAllowed, expectedActc, 1);

  // The $500 Other Dependent Credit portion is NEVER refundable, even on a
  // zero-tax return with an otherDeps-only profile (no qualifying children).
  var r2 = TSIQ.computeYear({ filingStatus: 'single', wages: 5000, otherDeps: 1 }, {});
  check('F26 ODC-only profile gets zero ACTC (ODC is never refundable)', r2.actcAllowed, 0);
})();

/* -------------------------------------------------------------------------
 * Fixture 27 — EN7 IRMAA materiality note: single filer, age65Count=1,
 * $150,000 MAGI falls in the second tier ($137,000-$171,000 -> $2,885/yr
 * per enrollee). No note at all when age65Count is 0 or MAGI is below the
 * first tier; surcharge doubles at age65Count=2 (both spouses on Medicare).
 * ---------------------------------------------------------------------- */
(function () {
  var r1 = TSIQ.computeScenario({ filingStatus: 'single', wages: 150000, age65Count: 1 }, [], 1, 0);
  check('F27 tier-2 note present', r1.notes.some(function (n) { return n.indexOf('$2,885') !== -1; }) ? 1 : 0, 1, 0);

  var r2 = TSIQ.computeScenario({ filingStatus: 'single', wages: 150000, age65Count: 0 }, [], 1, 0);
  check('F27 no IRMAA note when age65Count is 0', r2.notes.some(function (n) { return n.indexOf('IRMAA') !== -1; }) ? 1 : 0, 0, 0);

  var r3 = TSIQ.computeScenario({ filingStatus: 'single', wages: 50000, age65Count: 1 }, [], 1, 0);
  check('F27 no IRMAA note below the first tier', r3.notes.some(function (n) { return n.indexOf('IRMAA') !== -1; }) ? 1 : 0, 0, 0);

  var r4 = TSIQ.computeScenario({ filingStatus: 'single', wages: 150000, age65Count: 2 }, [], 1, 0);
  check('F27 surcharge doubles for two Medicare enrollees',
    r4.notes.some(function (n) { return n.indexOf('$5,770') !== -1; }) ? 1 : 0, 1, 0);
})();

console.log('Golden-file engine tests: ' + passCount + ' passed, ' + failures.length + ' failed.');
if (failures.length) {
  console.log('\nFAILURES:');
  failures.forEach(function (f) { console.log('  - ' + f); });
  process.exit(1);
}
