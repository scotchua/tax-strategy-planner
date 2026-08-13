/* ============================================================================
 * AUTHORITY CROSS-CHECK TESTS — run with:  node scripts/test-authority.js
 *
 * scripts/test-engine.js proves the engine is INTERNALLY consistent: its 200+
 * fixtures were hand-derived against the same reading of the law the engine
 * implements, so a systematic misreading would be baked into the fixture that
 * "verifies" it. This suite exists to close that gap. Every expected value
 * below was derived line-by-line from the governing IRS worksheet BEFORE
 * anyone looked at what the engine returns, then independently re-derived from
 * scratch by a second pass whose job was to prove the first one wrong. Only
 * values both passes reproduced are here.
 *
 * That process paid for itself immediately: it found the OBBBA senior-deduction
 * phase-out bug (applied once to a couple's aggregate $12,000 instead of to
 * each qualifying individual's $6,000), which had a golden fixture asserting
 * the wrong answer. See fixture 12/12b in test-engine.js.
 *
 * ---------------------------------------------------------------------------
 * On tax years. This app's tables are 2026 (Rev. Proc. 2025-32 as amended by
 * OBBBA). The latest FINAL published IRS forms are an earlier year, so what
 * these derivations take from an IRS document is the worksheet STRUCTURE and
 * ORDERING — which line does what, what nets against what, in what sequence.
 * Dollar thresholds come from js/data/tax-tables-2026.js, except where the
 * amount is statutory and has never been indexed, in which case the IRS
 * document's own figure transfers verbatim. Each fixture says which of its
 * inputs are statutory and which are indexed, because that determines what has
 * to be re-derived when the 2027 tables land.
 *
 * Provenance caveat, recorded honestly: the research pass could not open IRS
 * PDFs directly from this environment (the network egress proxy blocks
 * irs.gov PDF fetches), so it worked from search-index extraction of those
 * documents. The ORDERING and substance were corroborated across multiple
 * independent sources and then re-derived twice; specific line NUMBERS cited
 * in comments carry that caveat and should be spot-checked against a real form
 * before being quoted in a client working paper.
 * ==========================================================================*/
var path = require('path');
global.window = global;
var root = path.join(__dirname, '..');
require(path.join(root, 'js/data/tax-tables-2026.js'));
require(path.join(root, 'js/engine/tax-engine.js'));

var failures = [];
var passCount = 0;

function check(name, actual, expected, tol) {
  tol = tol === undefined ? 1 : tol;
  if (actual === undefined || actual === null || isNaN(actual)) {
    failures.push(name + ': actual is ' + actual);
    return;
  }
  if (Math.abs(actual - expected) > tol) {
    failures.push(name + ': expected ' + expected + ', got ' + actual +
      ' (diff ' + (actual - expected).toFixed(2) + ')');
  } else {
    passCount++;
  }
}

// Assert a whole derived column at once. `expected` is [field, value, tol].
function checkAll(label, result, expected) {
  expected.forEach(function (e) {
    check(label + ' ' + e[0], result[e[0]], e[1], e[2]);
  });
}

/* ===========================================================================
 * W1 — §86 Social Security benefits, 85% tier, below the senior-deduction
 * phase-out. MFJ retiree, both spouses 65+.
 *
 * Worksheet: Social Security Benefits Worksheet (Form 1040 instructions) /
 * Pub 915 Worksheet 1.
 *
 * Note the fixture NAME. This was commissioned as a "50% tier" case and is
 * not one: provisional income is 40,000 + 6,000 + 24,000 = 70,000, which is
 * above the $44,000 adjusted base amount, so tier 2 governs. The derivation
 * pass caught the mislabel; the numbers are correct for what the profile
 * actually is, so the profile is kept and the name is honest. W2 below covers
 * the same statute where the 85%-of-gross ceiling binds, and W1b covers the
 * genuine 50% tier.
 *
 * Derivation:
 *   provisional income   = 40,000 other + 6,000 interest + 0.5 * 48,000
 *                        = 70,000                          (§86(b)(2))
 *   tier-1 component     = min(0.5 * (44,000 - 32,000), 0.5 * 48,000) = 6,000
 *   tier-2 component     = 0.85 * (70,000 - 44,000)        = 22,100
 *   taxable SS           = min(6,000 + 22,100, 0.85 * 48,000)
 *                        = min(28,100, 40,800)              = 28,100
 *   AGI                  = 40,000 + 6,000 + 28,100         = 74,100
 *   deduction            = 32,200 std + 2 * 1,650 aged + 2 * 6,000 senior
 *                        = 47,500  (AGI is under the $150,000 phase-out start)
 *   taxable income       = 74,100 - 47,500                 = 26,600
 *   income tax           = 24,800 * 0.10 + 1,800 * 0.12    = 2,696
 *
 * Statutory and unindexed: 32,000 / 44,000 base amounts, the 50% and 85%
 * rates, the 85%-of-gross ceiling. Indexed (re-derive for 2027): the 32,200
 * standard deduction, the 1,650 aged add-on, the 6,000 senior amount, the
 * brackets.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', otherIncome: 40000, interest: 6000,
    ssBenefitsGross: 48000, age65Count: 2, stateRate: 0
  }, {});
  checkAll('W1', r, [
    ['ssTaxable', 28100, 0.01],
    ['agi', 74100, 0.01],
    ['seniorDeductionAllowed', 12000, 0.01],
    ['deduction', 47500, 0.01],
    ['taxableIncome', 26600, 0.01],
    ['qbiDeduction', 0, 0.01],
    ['incomeTax', 2696, 1],
    ['niit', 0, 0.01],
    ['totalBurden', 2696, 1]
  ]);
})();

/* ===========================================================================
 * W1b — §86 Social Security benefits, the genuine 50% tier.
 *
 * Provisional income deliberately lands strictly between the base amount and
 * the adjusted base amount, which is the only way to exercise the tier-1
 * branch on its own. With $48,000 of gross benefits, half of benefits alone is
 * $24,000, so other income has to stay at or below $20,000 for provisional
 * income to clear $44,000 — the constraint the original profile missed.
 *
 * Derivation:
 *   provisional income = 12,000 other + 6,000 interest + 24,000 = 42,000
 *   42,000 is above 32,000 and at or below 44,000 -> tier 1 only
 *   taxable SS         = min(0.5 * (42,000 - 32,000), 0.5 * 48,000)
 *                      = min(5,000, 24,000)                = 5,000
 *   AGI                = 12,000 + 6,000 + 5,000           = 23,000
 *   deduction          = 32,200 + 3,300 aged + 12,000 senior = 47,500
 *   taxable income     = max(0, 23,000 - 47,500)          = 0
 *
 * Every §86 amount here is statutory and unindexed, so the ssTaxable and
 * provisional-income assertions survive a table refresh untouched. The
 * deduction assertion is indexed.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', otherIncome: 12000, interest: 6000,
    ssBenefitsGross: 48000, age65Count: 2, stateRate: 0
  }, {});
  checkAll('W1b', r, [
    ['ssTaxable', 5000, 0.01],
    ['agi', 23000, 0.01],
    ['deduction', 47500, 0.01],
    ['taxableIncome', 0, 0.01],
    ['incomeTax', 0, 0.01],
    ['totalBurden', 0, 0.01]
  ]);
  // The 50% tier must never exceed half of gross benefits, and must never
  // reach the 85% tier's arithmetic. Both are statutory ceilings.
  check('W1b tier-1 result stays at or below half of gross benefits',
    r.ssTaxable <= 0.5 * 48000 ? 1 : 0, 1, 0);
  check('W1b tier-1 result is strictly below the 85% ceiling',
    r.ssTaxable < 0.85 * 48000 ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W2 — §86 tier 2 with the 85%-of-gross CEILING binding, and the senior
 * deduction mid-phase-out. MFJ retiree, both spouses 65+.
 *
 * This is the fixture that found the senior-deduction bug. §86 itself was
 * clean; the engine reproduced ssTaxable and agi exactly. The disagreement was
 * entirely in the senior-deduction line, and it traced through deduction,
 * taxable income and tax as pure arithmetic consequences. The engine has since
 * been corrected, so this now ties.
 *
 * Derivation:
 *   provisional income = 150,000 + 20,000 + 0.5 * 60,000   = 200,000
 *   tier-1 component   = min(0.5 * 12,000, 0.5 * 60,000)   = 6,000
 *   tier-2 component   = 0.85 * (200,000 - 44,000)         = 132,600
 *   sum before ceiling = 138,600
 *   85%-of-gross ceiling = 0.85 * 60,000 = 51,000 -> CEILING BINDS
 *   taxable SS         = 51,000
 *   AGI                = 150,000 + 20,000 + 51,000         = 221,000
 *   senior deduction   = 2 * max(0, 6,000 - 0.06 * (221,000 - 150,000))
 *                      = 2 * max(0, 6,000 - 4,260) = 2 * 1,740 = 3,480
 *   deduction          = 32,200 + 3,300 aged + 3,480       = 38,980
 *   taxable income     = 221,000 - 38,980                  = 182,020
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', otherIncome: 150000, interest: 20000,
    ssBenefitsGross: 60000, age65Count: 2, stateRate: 0
  }, {});
  checkAll('W2', r, [
    ['ssTaxable', 51000, 0.01],
    ['agi', 221000, 1],
    ['seniorDeductionAllowed', 3480, 0.01],
    ['deduction', 38980, 1],
    ['taxableIncome', 182020, 1],
    ['incomeTax', 29468.4, 1],
    ['niit', 0, 0.01],
    ['totalBurden', 29468.4, 1]
  ]);
  // The ceiling is the point of this fixture: assert it directly, not just via
  // the resulting dollar figure, so a formula change that happened to land on
  // 51,000 by another route still gets caught.
  check('W2 taxable SS equals exactly 85% of gross (ceiling binds)',
    r.ssTaxable, 0.85 * 60000, 0.01);
  check('W2 the uncapped tier arithmetic would have exceeded the ceiling',
    (6000 + 0.85 * (200000 - 44000)) > 0.85 * 60000 ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W3 — Schedule D netting with a short-term LOSS against a long-term GAIN,
 * then the Qualified Dividends and Capital Gain Tax Worksheet. Single.
 *
 * The question this exists to answer: when a short-term loss partly offsets a
 * long-term gain, how much gets the preferential rate? The worksheet answer is
 * NOT the gross long-term gain. QD&CG line 3 takes the SMALLER of the
 * Schedule D line 15 net long-term gain and the line 16 overall net gain, so
 * the short-term loss reduces the preferentially-taxed amount.
 *
 * Derivation:
 *   Sch D line 7  (net short-term)      = -60,000
 *   Sch D line 15 (net long-term)       = +500,000
 *   Sch D line 16 (overall net)         = 440,000  -> positive, no §1211(b)
 *                                          floor, nothing carries forward
 *   QD&CG line 2  qualified dividends   = 30,000
 *   QD&CG line 3  min(500,000, 440,000) = 440,000  <- the whole point
 *   QD&CG line 4  preferential income   = 470,000
 *   AGI                                 = 70,000 + 440,000 + 30,000 = 540,000
 *   taxable income                      = 540,000 - 16,100 = 523,900
 *   ordinary taxable  = 523,900 - 470,000 = 53,900
 *   0% band: 53,900 already exceeds the 49,450 breakpoint, so no 0% room
 *   15% band: 545,500 - 53,900 = 491,600 of room, all 470,000 fits
 *   preferential tax  = 470,000 * 0.15                     = 70,500
 *   ordinary tax      = 12,400*.10 + 38,000*.12 + 3,500*.22 = 6,570
 *   NIIT = 0.038 * min(470,000 NII, 540,000 - 200,000)     = 12,920
 *
 * An implementation that fed the gross 500,000 to the preferential worksheet
 * (skipping the line 3 min) would report 9,000 too little tax here.
 *
 * NOT COVERED, and it is the more dangerous direction: a net long-term LOSS
 * with an overall net GAIN from short-term. There the min() binds the other
 * way. Worth a fixture of its own.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'single', wages: 70000, ltcg: 500000,
    shortTermGains: -60000, qualDiv: 30000, stateRate: 0
  }, {});
  checkAll('W3', r, [
    ['agi', 540000, 1],
    ['deduction', 16100, 1],
    ['taxableIncome', 523900, 1],
    ['netCapitalAllowed', 440000, 0.01],
    ['capitalLossDisallowed', 0, 0.01],
    ['capitalLossCarryforwardBalance', 0, 0.01],
    ['prefIncome', 470000, 0.01],
    ['ordinaryTaxable', 53900, 1],
    ['ordinaryTax', 6570, 0.01],
    ['capGainsTax', 70500, 0.01],
    ['incomeTaxBeforeCredits', 77070, 0.01],
    ['niit', 12920, 0.01],
    ['addlMedicare', 0, 0.01],
    ['totalBurden', 89990, 1]
  ]);
  // State the trap directly: the preferential amount must be the NET, and must
  // be strictly less than the gross long-term gain.
  check('W3 preferential amount is the net (440k + 30k), not the gross (500k + 30k)',
    r.prefIncome, 470000, 0.01);
  check('W3 preferential amount is strictly below the gross-LTCG reading',
    r.prefIncome < 530000 ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W3b — the same short-term-loss netting, but with preferential income spanning
 * ALL THREE bands (0%, 15% and 20%). W3 only reaches the 15% band, because its
 * ordinary taxable income already exceeds the 0% breakpoint. Spanning all three
 * requires ordinary taxable income BELOW the 0% breakpoint and total taxable
 * income ABOVE the 20% breakpoint at the same time.
 *
 * Derivation:
 *   Sch D line 16 overall net = 600,000 - 60,000 = 540,000
 *   QD&CG line 3 min(600,000, 540,000) = 540,000
 *   QD&CG line 4 preferential = 540,000 + 30,000 = 570,000
 *   AGI                       = 40,000 + 540,000 + 30,000 = 610,000
 *   taxable income            = 610,000 - 16,100 = 593,900
 *   ordinary taxable          = 593,900 - 570,000 = 23,900
 *   0% band  room = 49,450 - 23,900 = 25,550    -> 25,550 taxed at 0%
 *   15% band room = 545,500 - 49,450 = 496,050  -> 496,050 taxed at 15%
 *   20% band                                    -> 570,000 - 25,550 - 496,050
 *                                                = 48,400 taxed at 20%
 *   preferential tax = 496,050 * 0.15 + 48,400 * 0.20 = 84,087.50
 *   ordinary tax     = 12,400 * 0.10 + 11,500 * 0.12  = 2,620
 *   NIIT             = 0.038 * min(570,000, 610,000 - 200,000) = 15,580
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'single', wages: 40000, ltcg: 600000,
    shortTermGains: -60000, qualDiv: 30000, stateRate: 0
  }, {});
  checkAll('W3b', r, [
    ['agi', 610000, 1],
    ['taxableIncome', 593900, 1],
    ['netCapitalAllowed', 540000, 0.01],
    ['prefIncome', 570000, 0.01],
    ['ordinaryTaxable', 23900, 1],
    ['ordinaryTax', 2620, 0.01],
    ['capGainsTax', 84087.5, 0.01],
    ['niit', 15580, 0.01],
    ['totalBurden', 102287.5, 1]
  ]);
  // Reconstruct the three bands independently and assert the total is the sum,
  // so a stacking error that happens to land on the right grand total by
  // shifting dollars between bands still fails.
  var ord = 23900, bp0 = 49450, bp1 = 545500, pref = 570000;
  var in0 = Math.min(pref, Math.max(0, bp0 - ord));
  var in15 = Math.min(pref - in0, Math.max(0, bp1 - Math.max(ord + in0, bp0)));
  var in20 = pref - in0 - in15;
  check('W3b all three preferential bands carry income (0% band)', in0 > 0 ? 1 : 0, 1, 0);
  check('W3b all three preferential bands carry income (15% band)', in15 > 0 ? 1 : 0, 1, 0);
  check('W3b all three preferential bands carry income (20% band)', in20 > 0 ? 1 : 0, 1, 0);
  check('W3b preferential tax is the band-by-band sum',
    r.capGainsTax, in15 * 0.15 + in20 * 0.20, 0.01);
  check('W3b the 0% band really is taxed at zero',
    r.capGainsTax < pref * 0.15 ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W4 — §199A above the phase-in range: the 50%-of-W-2-wages prong as a hard
 * cap, with Form 8995-A Part III skipped entirely. MFJ non-SSTB.
 *
 * Also a corrected label. This was commissioned as a phase-in case, but
 * taxable income before QBI is 567,800, which is above the top of the MFJ
 * range (403,500 + 150,000 = 553,500). Above the range the phase-in
 * percentage is 1 and the wage limit applies flat, so Part III never runs.
 * Both readings happen to produce 75,000 here — above the range because
 * min(120,000, 75,000) = 75,000, and at exactly 100% phase-in because the
 * Part III result collapses to the wage-limited amount. Landing on the same
 * number by two different routes is exactly why the label matters: this
 * fixture cannot distinguish them. W5 exercises a genuinely partial phase-in.
 *
 * Derivation:
 *   AGI                        = 600,000 K-1 (no SE tax on K-1 income)
 *   taxable income before QBI  = 600,000 - 32,200 = 567,800
 *   567,800 > 553,500          -> above the range, wage limit is a hard cap
 *   tentative 20%              = 0.20 * 600,000 = 120,000
 *   50% of W-2 wages           = 0.50 * 150,000 = 75,000
 *   §199A deduction            = min(120,000, 75,000) = 75,000
 *   overall cap                = 0.20 * (567,800 - 0 net capital gain)
 *                              = 113,560, not binding
 *   taxable income             = 567,800 - 75,000 = 492,800
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', passthroughK1: 600000, entityW2Wages: 150000,
    isSSTB: false, wages: 0, stateRate: 0
  }, {});
  checkAll('W4', r, [
    ['agi', 600000, 1],
    ['deduction', 32200, 0.01],
    ['tiBeforeQBI', 567800, 1],
    ['qbiDeduction', 75000, 0.01],
    ['taxableIncome', 492800, 1],
    ['ordinaryTax', 110608, 1],
    ['capGainsTax', 0, 0.01],
    ['niit', 0, 0.01],
    ['seTax', 0, 0.01],
    ['totalBurden', 110608, 1]
  ]);
  check('W4 taxable income before QBI is genuinely above the top of the range',
    r.tiBeforeQBI > 403500 + 150000 ? 1 : 0, 1, 0);
  check('W4 the wage prong binds (it is below the tentative 20%)',
    r.qbiDeduction < 0.20 * 600000 ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W4b — §199A non-SSTB GENUINELY inside the phase-in range, where Form 8995-A
 * Part III's excess-amount reduction actually runs and the overall
 * 20%-of-taxable-income cap does NOT mask it. This is the case W4 cannot
 * distinguish, so it is the one that proves the Part III arithmetic.
 *
 * Derivation:
 *   AGI                       = 500,000 K-1
 *   TI before QBI             = 500,000 - 32,200 = 467,800
 *   inside 403,500 .. 553,500 -> partial phase-in
 *   phase-in pct r            = (467,800 - 403,500) / 150,000 = 0.42866667
 *   tentative 20%             = 0.20 * 500,000 = 100,000
 *   50% of W-2 wages          = 0.50 * 150,000 = 75,000
 *   excess amount             = 100,000 - 75,000 = 25,000
 *   reduction                 = 25,000 * 0.42866667 = 10,716.667
 *   §199A deduction           = 100,000 - 10,716.667 = 89,283.333
 *   overall cap               = 0.20 * 467,800 = 93,560  -> NOT binding, which
 *                               is what makes this fixture load-bearing
 *   taxable income            = 467,800 - 89,283.333 = 378,516.667
 *   ordinary tax              = 2,480 + 9,120 + 24,332 + 40,108 = 76,040
 *
 * The reduction applies to the EXCESS, not to the tentative amount and not to
 * the wage limit. An implementation that reduced the tentative amount directly
 * would report 100,000 * (1 - r) = 57,133 here, understating the deduction by
 * over 32,000.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', passthroughK1: 500000, entityW2Wages: 150000,
    isSSTB: false, stateRate: 0
  }, {});
  checkAll('W4b', r, [
    ['agi', 500000, 1],
    ['tiBeforeQBI', 467800, 1],
    ['qbiDeduction', 89283.3333, 0.01],
    ['taxableIncome', 378516.6667, 0.01],
    ['ordinaryTax', 76040, 0.01],
    ['totalBurden', 76040, 1]
  ]);
  var pct = (467800 - 403500) / 150000;
  check('W4b deduction equals tentative minus (excess x phase-in pct)',
    r.qbiDeduction, 100000 - 25000 * pct, 0.01);
  check('W4b it is NOT the wrong "reduce the tentative directly" reading',
    Math.abs(r.qbiDeduction - 100000 * (1 - pct)) > 1000 ? 1 : 0, 1, 0);
  check('W4b the overall 20%-of-taxable-income cap is not what is binding',
    r.qbiDeduction < 0.20 * 467800 ? 1 : 0, 1, 0);
  // Shape of the deduction across the range: it must peak and then fall, since
  // below the threshold the overall cap grows with income while inside the
  // range the wage-limit reduction eventually dominates. A monotonic result
  // would mean one of the two regimes is not being applied.
  function qbiAt(k1) {
    return TSIQ.computeYear({
      filingStatus: 'mfj', passthroughK1: k1, entityW2Wages: 150000,
      isSSTB: false, stateRate: 0
    }, {}).qbiDeduction;
  }
  check('W4b deduction rises approaching the threshold', qbiAt(460000) > qbiAt(420000) ? 1 : 0, 1, 0);
  check('W4b deduction falls deeper into the range', qbiAt(540000) < qbiAt(500000) ? 1 : 0, 1, 0);
  check('W4b deduction keeps falling toward the top of the range',
    qbiAt(580000) < qbiAt(540000) ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W5 — §199A SSTB PARTIALLY inside the phase-in range: the Form 8995-A
 * Schedule A applicable-percentage haircut, and then Part III's phased-in
 * reduction applied on top of the already-reduced figures. Single.
 *
 * The double reduction is the hardest path in the whole deduction and the one
 * most likely to be implemented wrong, so it is derived here in full. The
 * engine reproduces it exactly, including the fact that the result is
 * QUADRATIC in the phase-in percentage.
 *
 * Derivation:
 *   SE tax           = 300,000 * 0.9235 = 277,050 net earnings
 *                      min(277,050, 184,500) * 0.124 = 22,878
 *                      277,050 * 0.029 = 8,034.45
 *                      total 30,912.45; half = 15,456.225
 *   Addl Medicare    = (277,050 - 200,000) * 0.009 = 693.45
 *   AGI              = 300,000 - 15,456.225 = 284,543.775
 *   TI before QBI    = 284,543.775 - 16,100 = 268,443.775
 *   QBI              = 300,000 - 15,456.225 = 284,543.775  (§164(f) reduces QBI)
 *   phase-in pct r   = (268,443.775 - 201,750) / 75,000 = 0.88925033
 *   applicable pct a = 1 - r = 0.11074967
 *   SSTB haircut:      QBI      -> 284,543.775 * a = 31,513.1282
 *                      W-2 wages -> 80,000 * a      =  8,859.9733
 *   tentative        = 0.20 * 31,513.1282 = 6,302.6256
 *   wage prong       = 0.50 * 8,859.9733  = 4,429.9867
 *   (the 25%-wages + 2.5%-UBIA alternative is 2,214.99 with zero UBIA, so the
 *    50% prong wins and this fixture is deliberately insensitive to the
 *    engine's documented omission of that alternative prong)
 *   excess           = 6,302.6256 - 4,429.9867 = 1,872.639
 *   reduction        = 1,872.639 * r = 1,665.2448
 *   §199A deduction  = 6,302.6256 - 1,665.2448 = 4,637.3808
 *   overall cap      = 0.20 * 268,443.775 = 53,688.755, not binding
 *
 * Closed-form cross-check, which is what makes this fixture strong: the whole
 * Part III result collapses to a * (a * 0.20 * QBI + r * 0.50 * W2), and that
 * identity returns the same 4,637.3808 to full float precision.
 *
 * FULLY year-dependent. Four indexed inputs drive it (standard deduction,
 * §199A threshold, Social Security wage base, brackets), so every assertion
 * here needs re-deriving when the tables move.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'single', scheduleCNet: 300000, entityW2Wages: 80000,
    isSSTB: true, stateRate: 0
  }, {});
  checkAll('W5', r, [
    ['seNetEarnings', 277050, 0.01],
    ['seTax', 30912.45, 0.01],
    ['addlMedicare', 693.45, 0.01],
    ['agi', 284543.775, 0.01],
    ['deduction', 16100, 0.01],
    ['tiBeforeQBI', 268443.775, 0.01],
    ['qbiDeduction', 4637.38, 1],
    ['taxableIncome', 263806.39, 1],
    ['incomeTax', 61101.49, 1],
    ['totalBurden', 92707.39, 1]
  ]);
  // The closed form, asserted independently of the engine's step-by-step path.
  var r_ = (268443.775 - 201750) / 75000;
  var a_ = 1 - r_;
  var closedForm = a_ * (a_ * 0.20 * 284543.775 + r_ * 0.50 * 80000);
  check('W5 §199A ties to the closed-form a*(a*0.20*QBI + r*0.50*W2)',
    r.qbiDeduction, closedForm, 0.01);
  check('W5 the SSTB haircut genuinely bites (deduction is far below 20% of QBI)',
    r.qbiDeduction < 0.05 * 0.20 * 284543.775 ? 0 : 1, 1, 0);
  check('W5 taxable income before QBI is inside the phase-in range',
    (r.tiBeforeQBI > 201750 && r.tiBeforeQBI <= 276750) ? 1 : 0, 1, 0);
})();

/* ===========================================================================
 * W6 — Schedule SE wage-base coordination, Form 8959, and Form 8960 together.
 * MFJ with both W-2 wages and Schedule C profit above the wage base, plus
 * portfolio income and passive rental.
 *
 * Three separate worksheets interlocking, which is where ordering errors hide.
 *
 * Derivation:
 *   SE net earnings   = 250,000 * 0.9235 = 230,875
 *   wage base room    = max(0, 184,500 - 120,000 W-2 wages) = 64,500
 *                       W-2 wages consume the base FIRST
 *   SE Social Security= min(230,875, 64,500) * 0.124 = 7,998
 *   SE Medicare       = 230,875 * 0.029 = 6,695.375   (uncapped)
 *   SE tax            = 14,693.375; half = 7,346.6875
 *   Addl Medicare     = (120,000 + 230,875 - 250,000) * 0.009 = 907.875
 *                       applied to the COMBINED wages-plus-SE base
 *   NII               = 15,000 interest + 90,000 gains + 10,000 qual div
 *                       + 40,000 rental (passive: reNonPassive is false)
 *                     = 155,000
 *   NIIT              = 0.038 * min(155,000, AGI - 250,000) = 5,890
 *
 * FIXTURE-DESIGN CAVEAT, recorded because it constrains how this may be
 * changed: Schedule SE is PER TAXPAYER, not per return. This profile carries a
 * single `wages` field on an MFJ status, and the derivation only ties out if
 * those 120,000 of W-2 wages belong to the SAME spouse who has the Schedule C.
 * If they belonged to the other spouse, that spouse's wages would not consume
 * the SE taxpayer's wage base and the SE Social Security component would be
 * larger. The engine models one combined taxpayer, which is the documented
 * simplification; do not "fix" this fixture by splitting the wages.
 * ======================================================================== */
(function () {
  var r = TSIQ.computeYear({
    filingStatus: 'mfj', wages: 120000, scheduleCNet: 250000,
    interest: 15000, ltcg: 90000, qualDiv: 10000,
    rentalNet: 40000, reNonPassive: false, stateRate: 0
  }, {});
  checkAll('W6', r, [
    ['seNetEarnings', 230875, 0.01],
    ['seTax', 14693.375, 0.01],
    ['addlMedicare', 907.875, 0.01],
    ['niit', 5890, 0.01],
    ['agi', 517653.3125, 1],
    ['tiBeforeQBI', 485453.3125, 1],
    ['qbiDeduction', 22015.67, 1],
    ['taxableIncome', 463437.64, 1],
    ['ordinaryTaxable', 363437.64, 1],
    ['capGainsTax', 15000, 0.01],
    ['incomeTax', 87421.03, 1],
    ['excessSSCredit', 0, 0.01],
    ['totalBurden', 108912.28, 1]
  ]);
  // The wage-base coordination is the substance here, so assert it as a
  // relation rather than only as a dollar total: the SE Social Security
  // component must reflect only the REMAINING room, not the full base.
  var ssComponent = Math.min(230875, Math.max(0, 184500 - 120000)) * 0.124;
  check('W6 SE Social Security uses only the wage-base room left after W-2 wages',
    r.seTax - 230875 * 0.029, ssComponent, 0.01);
  check('W6 SE Social Security is strictly less than a full uncoordinated base',
    ssComponent < Math.min(230875, 184500) * 0.124 ? 1 : 0, 1, 0);
  // Passive rental IS net investment income; the real-estate-professional flag
  // is what removes it. Prove the flag matters rather than assuming it.
  var nonPassive = TSIQ.computeYear({
    filingStatus: 'mfj', wages: 120000, scheduleCNet: 250000,
    interest: 15000, ltcg: 90000, qualDiv: 10000,
    rentalNet: 40000, reNonPassive: true, stateRate: 0
  }, {});
  check('W6 the real-estate-professional flag removes rental from NII',
    nonPassive.niit < r.niit ? 1 : 0, 1, 0);
})();

console.log('Authority cross-check tests: ' + passCount + ' passed, ' + failures.length + ' failed.');
if (failures.length) {
  console.log('\nFAILURES:');
  failures.forEach(function (f) { console.log('  - ' + f); });
  process.exit(1);
}
