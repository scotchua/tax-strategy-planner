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

console.log('Golden-file engine tests: ' + passCount + ' passed, ' + failures.length + ' failed.');
if (failures.length) {
  console.log('\nFAILURES:');
  failures.forEach(function (f) { console.log('  - ' + f); });
  process.exit(1);
}
