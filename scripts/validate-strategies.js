/* ============================================================================
 * STRATEGY LIBRARY VALIDATOR — run with:  node scripts/validate-strategies.js
 * Loads every strategy file, checks the schema, and smoke-tests apply() on
 * modeled strategies across a 3-year projection. Run after adding strategies.
 * ==========================================================================*/
var fs = require('fs');
var path = require('path');

global.window = global;
var root = path.join(__dirname, '..');
require(path.join(root, 'js/data/tax-tables-2026.js'));

var dir = path.join(root, 'js/data/strategies');
var files = fs.readdirSync(dir).filter(function (f) { return f.slice(-3) === '.js'; }).sort();
var failures = [];

files.forEach(function (f) {
  try { require(path.join(dir, f)); }
  catch (e) { failures.push(f + ': LOAD ERROR — ' + e.message); }
});
require(path.join(root, 'js/data/strategies-index.js'));
require(path.join(root, 'js/engine/tax-engine.js'));
require(path.join(root, 'js/engine/scenario-engine.js'));

var REQUIRED = ['id', 'name', 'category', 'applyOrder', 'advisor', 'client', 'inputs', 'apply'];
var ADVISOR_KEYS = ['summary', 'mechanics', 'authority', 'requirements', 'risks', 'bestFit', 'implementation'];
var CLIENT_KEYS = ['teaser', 'headline', 'plainEnglish', 'benefits', 'steps', 'considerations'];

// A profile rich enough that most modeled strategies find something to act on.
var SMOKE_PROFILE = {
  filingStatus: 'mfj', wages: 100000, scheduleCNet: 250000, passthroughK1: 150000,
  entityW2Wages: 60000, ownerWages: 60000, isSSTB: false,
  rentalNet: 20000, rentalLossesUsable: false,
  ltcg: 100000, qualDiv: 10000, interest: 5000, otherIncome: 0,
  propertyTax: 8000, mortgageInterest: 12000, charitable: 10000, otherItemized: 0,
  kidsCTC: 2, otherDeps: 0, stateRate: 0.058
};

var seenIds = {};
TSIQ.STRATEGIES.forEach(function (s) {
  var errs = [];
  REQUIRED.forEach(function (k) { if (s[k] === undefined) errs.push('missing ' + k); });
  if (seenIds[s.id]) errs.push('DUPLICATE id');
  seenIds[s.id] = true;
  if (typeof s.id !== 'string' || !/^[a-z0-9-]+$/.test(s.id)) {
    errs.push('id must be kebab-case [a-z0-9-] — got ' + JSON.stringify(s.id));
  }
  if (s.advisor) ADVISOR_KEYS.forEach(function (k) {
    if (s.advisor[k] === undefined || (Array.isArray(s.advisor[k]) && !s.advisor[k].length))
      errs.push('advisor.' + k + ' missing/empty');
  });
  if (s.client) CLIENT_KEYS.forEach(function (k) {
    if (s.client[k] === undefined || (Array.isArray(s.client[k]) && !s.client[k].length))
      errs.push('client.' + k + ' missing/empty');
  });
  if (s.advisor && s.advisor.authority) s.advisor.authority.forEach(function (a, i) {
    if (!a.type || !a.cite || !a.note) errs.push('authority[' + i + '] incomplete');
  });

  // Smoke test: default params through a 3-year scenario.
  try {
    var params = {};
    (s.inputs || []).forEach(function (inp) { params[inp.key] = inp.default; });
    var r = TSIQ.computeScenario(SMOKE_PROFILE, [{ strategy: s, params: params }], 3, 0.03);
    r.years.forEach(function (y, i) {
      if (!isFinite(y.totalBurden)) errs.push('year ' + i + ' totalBurden is ' + y.totalBurden);
      if (y.totalBurden < 0) errs.push('year ' + i + ' NEGATIVE total burden');
    });
    if (s.modeled === false) {
      var base = TSIQ.computeBaseline(SMOKE_PROFILE, 3, 0.03);
      if (Math.abs(base.totals.totalBurden - r.totals.totalBurden) > 1)
        errs.push('advisory strategy CHANGES the math (must be a no-op)');
    }
  } catch (e) { errs.push('apply() THROWS: ' + e.message); }

  if (errs.length) failures.push(s.id + ': ' + errs.join('; '));
});

console.log('Strategies loaded: ' + TSIQ.STRATEGIES.length);
console.log('Modeled: ' + TSIQ.STRATEGIES.filter(function (s) { return s.modeled !== false; }).length +
  '  Advisory: ' + TSIQ.STRATEGIES.filter(function (s) { return s.modeled === false; }).length);
if (failures.length) {
  console.log('\nFAILURES (' + failures.length + '):');
  failures.forEach(function (f) { console.log('  - ' + f); });
  process.exit(1);
} else {
  console.log('All strategies pass schema + smoke tests.');
}
