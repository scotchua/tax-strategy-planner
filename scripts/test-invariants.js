/* ============================================================================
 * OVERSTATED-SAVINGS INVARIANT TESTS — node scripts/test-invariants.js
 *
 * The other suites ask "is this number right?". This one asks "can the tool
 * promise a client more than the law allows?" — the failure mode that actually
 * costs a firm credibility, and the one no golden fixture catches, because a
 * fixture only ever tests the strategies it names.
 *
 * ---------------------------------------------------------------------------
 * A METHOD WARNING, because the obvious invariant is wrong.
 *
 * "Combined savings must not exceed the sum of the individual savings" is NOT a
 * valid general rule. Strategies legitimately compound: an S-corp election
 * creates entityW2Wages, which unlocks the §199A 50%-of-wages prong, so S-corp
 * plus a QBI strategy genuinely beats the sum of the two. That is real synergy,
 * not double counting.
 *
 * Super-additivity is only a defect between strategies that draw on the SAME
 * statutory limit or the SAME dollars. So every assertion here is scoped to a
 * named shared resource, and the assertion is written against that resource
 * (the §415(c) annual-additions total, the asset basis, the LTCG pool) rather
 * than against savings in the abstract.
 *
 * Assertions that DO compare savings run on a linearized profile: enough
 * entityW2Wages that the §199A wage limit never phases in, no capital gains, no
 * itemized deductions, one year, zero growth. On that bed progressivity is the
 * only remaining nonlinearity, and progressivity biases toward SUB-additivity,
 * so a super-additive result there is meaningful rather than an artifact.
 *
 * ---------------------------------------------------------------------------
 * KNOWN DEFECTS. Some invariants below currently FAIL against real defects
 * that need a licensed reviewer's call on intended behaviour before the math is
 * changed (see FINDINGS-2B.md). Those are listed in KNOWN_DEFECTS with the
 * measured numbers. The suite exits 0 only when the set of failures is EXACTLY
 * that list:
 *   - a NEW invariant breaking fails the run (a regression)
 *   - a KNOWN defect that starts passing ALSO fails the run, so the registry
 *     cannot rot and silently keep excusing something already fixed
 * Nothing is suppressed: every known defect is printed on every run.
 * ==========================================================================*/
var path = require('path');
var fs = require('fs');
global.window = global;
var root = path.join(__dirname, '..');
require(path.join(root, 'js/data/tax-tables-2026.js'));
var stratDir = path.join(root, 'js/data/strategies');
fs.readdirSync(stratDir).filter(function (f) { return /\.js$/.test(f); }).sort()
  .forEach(function (f) { require(path.join(stratDir, f)); });
require(path.join(root, 'js/data/strategies-index.js'));
require(path.join(root, 'js/engine/tax-engine.js'));
require(path.join(root, 'js/engine/scenario-engine.js'));

var T = TSIQ.TABLES_2026;

/* --------------------------------------------------------------------------
 * Each entry is a substring of the assertion name that is currently expected
 * to fail. Keep the measured numbers here: they are the regression baseline,
 * and they are what a reviewer needs in order to judge the fix.
 * ----------------------------------------------------------------------- */
var KNOWN_DEFECTS = [
  {
    match: 'I10 no statutory limit',
    why: 'Three statutory caps sit in TABLES_2026.limits and nothing reads them, so an advisor ' +
      'can type past a ceiling the tables already know about. limits.qsbs.perIssuerCap ' +
      '($15,000,000) and limits.qsbs.grossAssetCap ($75,000,000): qsbs-1202 clamps its exclusion ' +
      'to the available LTCG but never to the §1202 per-issuer cap. ' +
      'limits.retirement.dbAnnualBenefit ($290,000): defined-benefit-plan applies NO cap at all on ' +
      'its W-2-owner branch (the only clamp in the file is the SE branch limiting the ' +
      'contribution to Schedule C profit), which makes it the least bounded modeled strategy in ' +
      'the library. Fixing these needs a decision per strategy about which ceiling applies to ' +
      'which input, and for the DB plan the real limit is actuarial rather than a flat constant, ' +
      'so it is a judgment call rather than a one-line clamp. Fifteen further uncapped params are ' +
      'catalogued in FINDINGS-2B.md; they need new table constants that do not exist yet ' +
      '(§45F, QSEHRA, §179D per-square-foot rates, the §170(b)(1) AGI ceilings).'
  },
  {
    match: 'I2 simple-ira + ',
    why: 'The Notice 98-4 exclusive-plan guard is applyOrder-based, so it suppresses whichever ' +
      'plan happens to run second rather than the smaller one. simple-ira (applyOrder 63) is ' +
      'applied first and sets state.hasSimplePlan, which then blocks cash-balance-stack (64). ' +
      'Measured on the linearized bed, simple-ira alone saves $7,260 and it suppresses every ' +
      'richer plan it is paired with: cash-balance-stack ($66,000 alone), defined-benefit-plan ' +
      '($49,500 alone) and profit-sharing-new-comparability ($16,085 alone) all collapse to ' +
      '$7,260 when simple-ira is also selected. Selecting a second strategy made the plan WORSE ' +
      'than the better one alone, by up to $58,740. Understates, so it costs the client an ' +
      'opportunity rather than exposing them, but it is the same broken coordination. The fix ' +
      'is to arbitrate on AMOUNT rather than on apply order.'
  },
  {
    match: 'I3 cash-balance-stack + defined-benefit-plan',
    why: 'A cash balance plan IS a defined benefit plan (§414(j)), so these two model the same ' +
      'actuarial contribution twice. Neither coordinates a dollar amount with the other and ' +
      'neither declares conflictsWith. Measured: $66,000 and $49,500 individually, $111,782 ' +
      'combined, against a correct answer no greater than the larger of the two. OVERSTATES ' +
      'savings by roughly $46,000 of deduction.'
  },
  {
    match: ' + cash-balance-stack share the §415(c) DC limit',
    why: 'cash-balance-stack neither reads nor writes state.dcAnnualAdditionsUsed, so the ' +
      '§415(c) $72,000 defined-contribution limit is not shared with it, even though its own ' +
      'input label describes the contribution as "combined 401(k) + 6% profit sharing" and ' +
      'therefore already includes the DC layer. Measured: $14,685 and $66,000 individually, ' +
      '$79,827 combined. profit-sharing-new-comparability + cash-balance-stack is the same ' +
      'defect: $16,085 and $66,000 alone, $81,146 combined. Both OVERSTATE.'
  }
];

var failures = [];
var passCount = 0;

function record(name, ok, detail) {
  if (ok) { passCount++; return; }
  failures.push({ name: name, detail: detail || '' });
}
function assertTrue(name, cond, detail) { record(name, !!cond, detail); }
function assertNear(name, actual, expected, tol) {
  tol = tol === undefined ? 1 : tol;
  if (actual === undefined || actual === null || isNaN(actual)) {
    record(name, false, 'actual is ' + actual);
    return;
  }
  record(name, Math.abs(actual - expected) <= tol,
    'expected ' + expected + ', got ' + actual);
}

/* ---------------------------- shared helpers --------------------------- */

// A selection with every declared default filled in, exactly as the UI builds
// it. (scenario-engine.js resolves defaults itself now, but being explicit here
// keeps the test readable and independent of that behaviour.)
function sel(id, overrides) {
  var s = TSIQ.getStrategy(id);
  if (!s) throw new Error('no such strategy: ' + id);
  var p = {};
  (s.inputs || []).forEach(function (i) { if (i.default !== undefined) p[i.key] = i.default; });
  Object.keys(overrides || {}).forEach(function (k) { p[k] = overrides[k]; });
  return { strategy: s, params: p };
}

// The linearized bed described in the header comment.
var BED = {
  filingStatus: 'mfj', scheduleCNet: 900000, ownerWages: 0, passthroughK1: 0,
  entityW2Wages: 3000000, isSSTB: false,
  rentalNet: 0, rentalLossesUsable: true, ltcg: 0, shortTermGains: 0,
  qualDiv: 0, interest: 5000, otherIncome: 0, ssBenefitsGross: 0,
  propertyTax: 0, mortgageInterest: 0, charitable: 0, otherItemized: 0,
  kidsCTC: 0, otherDeps: 0, age65Count: 0, stateRate: 0.05
};

function burdenOn(profile, ids, years, growth) {
  return TSIQ.computeScenario(profile, ids.map(function (id) { return sel(id); }),
    years || 1, growth || 0).totals.totalBurden;
}
function savingsOn(profile, ids, years, growth) {
  return burdenOn(profile, [], years, growth) - burdenOn(profile, ids, years, growth);
}
function savings(ids) { return savingsOn(BED, ids, 1, 0); }

/* =========================================================================
 * I1 — §415(c): the shared defined-contribution annual-additions limit can
 * never be exceeded, whatever combination is selected. This is the
 * resource-level assertion, which is stronger than any savings comparison
 * because it does not depend on the tax rate at all.
 * ====================================================================== */
(function () {
  var cap = T.limits.retirement.dcAnnualAdditions;
  var dcFamily = ['solo-401k', 'sep-ira', 'profit-sharing-new-comparability'];
  // Every subset of the DC family, at 1x and at 10x the default params.
  [1, 10].forEach(function (scale) {
    [[0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]].forEach(function (combo) {
      var ids = combo.map(function (i) { return dcFamily[i]; });
      var state = {};
      var profile = Object.assign({}, BED);
      ids.forEach(function (id) {
        var s = sel(id);
        if (scale !== 1) {
          Object.keys(s.params).forEach(function (k) {
            if (typeof s.params[k] === 'number') s.params[k] = s.params[k] * scale;
          });
        }
        profile = s.strategy.apply(profile, s.params, 0, state).profile;
      });
      assertTrue('I1 §415(c) total never exceeds the cap [' + ids.join('+') + ' @' + scale + 'x]',
        (state.dcAnnualAdditionsUsed || 0) <= cap + 0.01,
        'dcAnnualAdditionsUsed = ' + (state.dcAnnualAdditionsUsed || 0) + ' vs cap ' + cap);
    });
  });
  // And the tracker must actually be doing something: at 10x, the full family
  // should be pinned AT the cap, not comfortably under it. A tracker that is
  // never binding is a tracker that is not being consulted.
  var st = {};
  var pr = Object.assign({}, BED);
  dcFamily.forEach(function (id) {
    var s = sel(id);
    Object.keys(s.params).forEach(function (k) {
      if (typeof s.params[k] === 'number') s.params[k] = s.params[k] * 10;
    });
    pr = s.strategy.apply(pr, s.params, 0, st).profile;
  });
  assertNear('I1 the §415(c) cap actually binds at 10x the defaults',
    st.dcAnnualAdditionsUsed, cap, 0.01);
})();

/* =========================================================================
 * I2 — mutually exclusive plan families: selecting a SECOND strategy must
 * never make the plan worse than the better one alone. Whatever coordination
 * rule fires, it has to suppress the smaller benefit, not whichever one the
 * apply order happens to reach second.
 *
 * This is the understating direction. It still matters: the tool would talk a
 * client out of the better plan.
 * ====================================================================== */
(function () {
  var exclusivePairs = [
    ['simple-ira', 'cash-balance-stack'],
    ['simple-ira', 'defined-benefit-plan'],
    ['simple-ira', 'solo-401k'],
    ['simple-ira', 'profit-sharing-new-comparability']
  ];
  exclusivePairs.forEach(function (pair) {
    var a = savings([pair[0]]);
    var b = savings([pair[1]]);
    var both = savings(pair);
    var best = Math.max(a, b);
    assertTrue('I2 ' + pair[0] + ' + ' + pair[1] + ' is never worse than the better one alone',
      both >= best - 1,
      'combined ' + both.toFixed(0) + ' vs better-alone ' + best.toFixed(0) +
        ' (' + pair[0] + ' ' + a.toFixed(0) + ', ' + pair[1] + ' ' + b.toFixed(0) + ')');
  });
})();

/* =========================================================================
 * I3 — the defined-benefit family: a cash balance plan IS a defined benefit
 * plan, so the two must not stack into two separate actuarial contributions.
 * Combined savings must not exceed the larger of the two alone.
 * ====================================================================== */
(function () {
  var a = savings(['cash-balance-stack']);
  var b = savings(['defined-benefit-plan']);
  var both = savings(['cash-balance-stack', 'defined-benefit-plan']);
  assertTrue('I3 cash-balance-stack + defined-benefit-plan do not stack two DB contributions',
    both <= Math.max(a, b) + 1,
    'combined ' + both.toFixed(0) + ' exceeds max-alone ' + Math.max(a, b).toFixed(0) +
      ' (cash-balance ' + a.toFixed(0) + ', DB ' + b.toFixed(0) + ', sum ' + (a + b).toFixed(0) + ')');
})();

/* =========================================================================
 * I4 — a DC plan stacked on the cash balance plan must respect §415(c).
 * cash-balance-stack's own input label describes its contribution as the
 * combined 401(k) plus profit-sharing amount, so the DC layer is already
 * inside it and a separate DC plan cannot be added on top at full value.
 * ====================================================================== */
(function () {
  [['solo-401k', 'cash-balance-stack'],
    ['profit-sharing-new-comparability', 'cash-balance-stack']].forEach(function (pair) {
    var a = savings([pair[0]]);
    var b = savings([pair[1]]);
    var both = savings(pair);
    assertTrue('I4 ' + pair[0] + ' + ' + pair[1] + ' share the §415(c) DC limit',
      both <= Math.max(a, b) + 1,
      'combined ' + both.toFixed(0) + ' exceeds max-alone ' + Math.max(a, b).toFixed(0) +
        ' (' + pair[0] + ' ' + a.toFixed(0) + ', ' + pair[1] + ' ' + b.toFixed(0) + ')');
  });
})();

/* =========================================================================
 * I5 — no strategy may drive a capital-gain or income field NEGATIVE. A
 * strategy that removes more gain than exists hands the engine a synthetic
 * capital LOSS, which becomes a §1211(b) deduction plus a carryforward: a
 * fabricated benefit conjured out of a data-entry mistake.
 *
 * Run at 10x every default, which is what a mistyped figure looks like.
 * ====================================================================== */
(function () {
  // RECEIVED-INCOME pools only. A strategy can only ever reduce these down to
  // zero: the client either received the gain, the dividend, the interest, or
  // they did not. Driving one negative fabricates a loss out of nothing, and
  // for the capital fields the engine then turns it into a §1211(b) deduction
  // plus a carryforward — a tax benefit conjured from a data-entry mistake.
  //
  // Deliberately EXCLUDED: scheduleCNet and passthroughK1. A deduction larger
  // than business profit is a legitimate business LOSS, not fabrication, and
  // the engine models exactly that through §461(l) and the NOL carryforward.
  // At 10x defaults seven strategies do push those fields negative
  // (bonus-depreciation, heavy-vehicle-179, personal-aircraft, spouse-payroll,
  // accountable-plan, augusta-rule, qbi-wage-optimization). That is worth an
  // advisor-facing plausibility warning, which is a product decision rather
  // than an invariant, so it is recorded in FINDINGS-2B.md instead of asserted
  // here. Widening this list to include them would be asserting something that
  // is not actually a defect.
  var GUARD_FIELDS = ['ltcg', 'shortTermGains', 'qualDiv', 'interest', 'otherIncome'];
  var probe = {
    filingStatus: 'mfj', wages: 300000, scheduleCNet: 200000, passthroughK1: 100000,
    entityW2Wages: 150000, ownerWages: 80000, isSSTB: false,
    rentalNet: 50000, rentalLossesUsable: true,
    ltcg: 500000, shortTermGains: 20000, qualDiv: 30000, interest: 10000,
    otherIncome: 40000, ssBenefitsGross: 0, age65Count: 0,
    propertyTax: 10000, mortgageInterest: 15000, charitable: 10000, otherItemized: 0,
    kidsCTC: 0, otherDeps: 0, stateRate: 0.05
  };
  var negatives = [];
  TSIQ.STRATEGIES.filter(function (s) { return s.modeled !== false; }).forEach(function (s) {
    [1, 10].forEach(function (scale) {
      var params = {};
      (s.inputs || []).forEach(function (i) {
        params[i.key] = (typeof i.default === 'number' && scale !== 1)
          ? i.default * scale : i.default;
      });
      var out;
      try { out = s.apply(Object.assign({}, probe), params, 0, {}); }
      catch (e) { negatives.push(s.id + ' @' + scale + 'x THREW ' + e.message); return; }
      GUARD_FIELDS.forEach(function (f) {
        // A field the profile itself starts negative is not this test's business;
        // only a strategy pushing a non-negative field below zero is.
        if (probe[f] >= 0 && out.profile[f] < -0.01) {
          negatives.push(s.id + ' @' + scale + 'x drove ' + f + ' to ' + out.profile[f].toFixed(0));
        }
      });
    });
  });
  assertTrue('I5 no modeled strategy drives an income field negative at 1x or 10x defaults',
    negatives.length === 0, negatives.join(' | '));
})();

/* =========================================================================
 * I6 — POSITIVE CONTROL: the general business credit family. Six strategies
 * write p.otherCredits and the engine caps the total at the tax before
 * credits, so credits can never exceed the liability they offset. If this
 * assertion ever breaks, the containment mechanism the whole credit family
 * relies on has gone, and every credit strategy is suspect at once.
 * ====================================================================== */
(function () {
  var creditFamily = ['rd-credit', 'wotc', 'childcare-credit-45f',
    'disabled-access-credit', 'energy-credits', 'pfml-credit-45s'];
  var present = creditFamily.filter(function (id) { return !!TSIQ.getStrategy(id); });
  assertTrue('I6 the credit family is present in the library', present.length === creditFamily.length,
    'found ' + present.length + ' of ' + creditFamily.length + ': ' + present.join(','));

  // A small-income profile so the credits would swamp the liability if uncapped.
  var small = Object.assign({}, BED, { scheduleCNet: 60000, interest: 0, entityW2Wages: 200000 });
  var r = TSIQ.computeScenario(small, present.map(function (id) { return sel(id, {}); }), 1, 0);
  var y = r.years[0];
  assertTrue('I6 nonrefundable credits never exceed the tax before credits',
    y.ctcAllowed + y.otherCreditsAllowed <= y.incomeTaxBeforeCredits + 0.01,
    'credits ' + (y.ctcAllowed + y.otherCreditsAllowed).toFixed(2) +
      ' vs tax before credits ' + y.incomeTaxBeforeCredits.toFixed(2));
  assertTrue('I6 income tax after credits never goes negative', y.incomeTax >= -0.01,
    'incomeTax = ' + y.incomeTax);
  assertTrue('I6 the credit family genuinely reduces the bill on this profile',
    savingsOn(small, present, 1, 0) > 0,
    'no savings, so the positive control proves nothing');
})();

/* =========================================================================
 * I7 — total burden can never go negative, and no combination of strategies
 * can produce a refund the engine has no basis for. Refundable credits (the
 * ACTC) are the only legitimate route below zero, so exclude the profiles that
 * carry children and assert the floor everywhere else.
 * ====================================================================== */
(function () {
  var beds = [
    ['linearized', BED],
    ['modest', Object.assign({}, BED, { scheduleCNet: 90000, interest: 0, entityW2Wages: 50000 })],
    ['w2-only', { filingStatus: 'single', wages: 120000, stateRate: 0.05, entityW2Wages: 0 }]
  ];
  var families = [
    ['retirement', ['solo-401k', 'sep-ira', 'profit-sharing-new-comparability',
      'defined-benefit-plan', 'cash-balance-stack']],
    ['depreciation', ['bonus-depreciation', 'section-179-expensing', 'cost-segregation',
      'qip-bonus', 'heavy-vehicle-179', 'energy-179d']],
    ['health', ['se-health-insurance', 'hsa-contributions', 'ichra', 'qsehra', 'section-105-merp']]
  ];
  beds.forEach(function (bed) {
    families.forEach(function (fam) {
      var ids = fam[1].filter(function (id) { return !!TSIQ.getStrategy(id); });
      var b = burdenOn(bed[1], ids, 3, 0);
      assertTrue('I7 total burden stays non-negative [' + bed[0] + ' / ' + fam[0] + ' family]',
        b >= -0.01, 'totalBurden = ' + b.toFixed(2));
      assertTrue('I7 no NaN in the projection [' + bed[0] + ' / ' + fam[0] + ' family]',
        !isNaN(b), 'totalBurden = ' + b);
    });
  });
})();

/* =========================================================================
 * I8 — §179 has an aggregate annual dollar limit, and section-179-expensing is
 * the only file in the library that reads it. Assert the limit holds across the
 * strategies that elect §179 together, at 1x and pushed well past the cap.
 * ====================================================================== */
(function () {
  var cap = T.limits.sec179.max;
  var rich = Object.assign({}, BED, { scheduleCNet: 6000000 });
  // Pushed past the cap on its own, the §179 strategy must clamp.
  var s = sel('section-179-expensing', { amount: cap * 2 });
  var out = s.strategy.apply(Object.assign({}, rich), s.params, 0, {});
  var deducted = (rich.scheduleCNet - out.profile.scheduleCNet) + (out.profile.adjustments || 0);
  assertTrue('I8 §179 elected at 2x the cap is clamped to the cap',
    deducted <= cap + 0.01, 'deducted ' + deducted.toFixed(0) + ' vs cap ' + cap);
  // The heavy-vehicle route has its own, much lower, SUV-specific cap.
  var suvCap = T.limits.sec179.suvCap;
  var hv = sel('heavy-vehicle-179', { vehicleCost: suvCap * 20 });
  var hvOut = hv.strategy.apply(Object.assign({}, rich), hv.params, 0, {});
  var hvDeducted = rich.scheduleCNet - hvOut.profile.scheduleCNet;
  assertTrue('I8 the heavy-vehicle §179 write-off is bounded by the vehicle cost entered',
    hvDeducted <= suvCap * 20 + 0.01,
    'deducted ' + hvDeducted.toFixed(0) + ' exceeds the cost entered');
})();

/* =========================================================================
 * I9 — the accelerated-depreciation tracker must account for every claim. It
 * feeds the recapture materiality note, so a strategy that accelerates without
 * registering makes the warning understate the exposure it exists to flag.
 * ====================================================================== */
(function () {
  var depFamily = ['bonus-depreciation', 'section-179-expensing', 'cost-segregation',
    'qip-bonus', 'heavy-vehicle-179', 'energy-179d'];
  var rich = Object.assign({}, BED, { scheduleCNet: 4000000, rentalNet: 500000 });
  depFamily.forEach(function (id) {
    if (!TSIQ.getStrategy(id)) { failures.push({ name: 'I9 missing ' + id, detail: '' }); return; }
    var state = {};
    var s = sel(id);
    s.strategy.apply(Object.assign({}, rich), s.params, 0, state);
    assertTrue('I9 ' + id + ' registers its acceleration in the shared tracker',
      (state.acceleratedDepAccumulated || 0) > 0,
      'acceleratedDepAccumulated stayed at ' + (state.acceleratedDepAccumulated || 0));
  });
  // Selected together, the tracker must be the SUM of the individual claims —
  // no double counting and no dropped claims.
  var combinedState = {};
  var p = Object.assign({}, rich);
  var individualTotal = 0;
  depFamily.forEach(function (id) {
    var one = {};
    var s1 = sel(id);
    s1.strategy.apply(Object.assign({}, rich), s1.params, 0, one);
    individualTotal += (one.acceleratedDepAccumulated || 0);
    var s2 = sel(id);
    p = s2.strategy.apply(p, s2.params, 0, combinedState).profile;
  });
  assertNear('I9 the tracker totals the family exactly (no double count, no dropped claim)',
    combinedState.acceleratedDepAccumulated, individualTotal, 1);
})();

/* =========================================================================
 * I10 — DEAD CONSTANTS. Every numeric limit in TABLES_2026.limits was put
 * there on purpose. One that nothing in js/ ever reads is a cap somebody
 * intended to enforce and did not, which means an advisor can type a figure
 * past a statutory ceiling the tables already know about and get the full
 * deduction. This needs no tax judgment to detect: it is a reference check.
 *
 * The tables ARE the single source of truth for tax constants (see CLAUDE.md),
 * so this also guards the reverse direction — a constant that goes unread
 * because its consumer was refactored away.
 * ====================================================================== */
(function () {
  // Every .js under js/, concatenated. Cheap, and the tree is small.
  var sources = '';
  (function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach(function (e) {
      var full = path.join(dir, e.name);
      if (e.isDirectory()) { walk(full); return; }
      if (/\.js$/.test(e.name)) sources += fs.readFileSync(full, 'utf8');
    });
  })(path.join(root, 'js'));

  // Constants that exist for the ADVISOR's reference, quoted in a strategy's
  // prose or used by a human reading the tables, with no arithmetic consumer by
  // design. Listed explicitly with the reason, so "unused" is a deliberate
  // statement rather than a gap nobody noticed.
  var REFERENCE_ONLY = {
    'limits.retirement.iraLimit': 'IRA contributions are not a modeled strategy; the figure is here for the advisor',
    'limits.retirement.iraCatchUp': 'same as iraLimit',
    'limits.fringe.groupTermLifeExclusion': '§79 exclusion is advisory-only in the library',
    'limits.kiddieTaxUnearnedThreshold': 'kiddie tax is not computed; the figure supports the hire-children advisory text',
    'limits.gift.annualExclusion': 'gifting strategies are advisory; no scenario math consumes it',
    'limits.gift.estateExemption': 'estate planning is advisory; no scenario math consumes it'
  };

  var dead = [];
  (function scan(obj, trail) {
    Object.keys(obj).forEach(function (k) {
      var v = obj[k];
      var here = trail.concat([k]);
      if (v && typeof v === 'object' && !Array.isArray(v)) { scan(v, here); return; }
      if (typeof v !== 'number') return;
      // A leaf is "reached" if its own key name appears anywhere in js/ other
      // than the tables file itself. Key names in this library are distinctive
      // enough (perIssuerCap, phaseOutStart, dbAnnualBenefit) that a bare name
      // match is a fair proxy for "something consults it".
      var uses = sources.split(k).length - 1;
      // 1 occurrence is the definition in tax-tables-2026.js and nothing else.
      var pathKey = here.join('.');
      if (uses <= 1 && !REFERENCE_ONLY[pathKey]) dead.push(pathKey + ' = ' + v);
    });
  })(T.limits, ['limits']);

  assertTrue('I10 no statutory limit in TABLES_2026.limits is a dead constant',
    dead.length === 0, dead.join(' | '));
})();

/* ------------------------------- report -------------------------------- */
var known = [];
var unexpected = [];
failures.forEach(function (f) {
  var hit = null;
  for (var i = 0; i < KNOWN_DEFECTS.length; i++) {
    if (f.name.indexOf(KNOWN_DEFECTS[i].match) === 0 ||
        f.name.indexOf(KNOWN_DEFECTS[i].match) > -1) { hit = KNOWN_DEFECTS[i]; break; }
  }
  (hit ? known : unexpected).push({ f: f, d: hit });
});
var fixed = KNOWN_DEFECTS.filter(function (k) {
  return !known.some(function (x) { return x.d === k; });
});

console.log('Overstated-savings invariant tests: ' + passCount + ' passed, ' +
  unexpected.length + ' failed, ' + known.length + ' known defects.');

if (known.length) {
  console.log('\nKNOWN DEFECTS (real, awaiting a licensed-review call — see FINDINGS-2B.md):');
  known.forEach(function (x) {
    console.log('  - ' + x.f.name);
    console.log('      measured: ' + x.f.detail);
    console.log('      ' + x.d.why.replace(/\s+/g, ' '));
  });
}
if (fixed.length) {
  console.log('\nREGISTRY IS STALE — these known defects now PASS. Delete them from');
  console.log('KNOWN_DEFECTS so the invariant starts being enforced:');
  fixed.forEach(function (k) { console.log('  - ' + k.match); });
}
if (unexpected.length) {
  console.log('\nUNEXPECTED FAILURES:');
  unexpected.forEach(function (x) { console.log('  - ' + x.f.name + ': ' + x.f.detail); });
}
if (unexpected.length || fixed.length) process.exit(1);
