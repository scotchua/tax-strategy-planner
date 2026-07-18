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

// ---- index.html drift check: the <script> tags between the STRATEGIES
// markers must exactly match the files on disk (same set, same order) —
// otherwise validate-strategies.js can pass while the browser app is
// silently missing (or 404s on a deleted) strategy. ----
(function checkIndexHtmlDrift() {
  var htmlPath = path.join(root, 'index.html');
  var html = fs.readFileSync(htmlPath, 'utf8');
  var begin = '<!-- STRATEGIES:BEGIN — auto-generated; run `node scripts/build-index.js` after adding a strategy file -->';
  var end = '<!-- STRATEGIES:END -->';
  var i = html.indexOf(begin), j = html.indexOf(end);
  if (i === -1 || j === -1 || j < i) {
    failures.push('index.html: STRATEGIES:BEGIN/END markers missing or out of order — run node scripts/build-index.js');
    return;
  }
  var block = html.slice(i + begin.length, j);
  var htmlFiles = [];
  var re = /<script src="js\/data\/strategies\/([^"]+)"><\/script>/g;
  var m;
  while ((m = re.exec(block))) { htmlFiles.push(m[1]); }
  if (htmlFiles.join('\n') !== files.join('\n')) {
    var htmlSet = {}; htmlFiles.forEach(function (f) { htmlSet[f] = true; });
    var fileSet = {}; files.forEach(function (f) { fileSet[f] = true; });
    var missingFromHtml = files.filter(function (f) { return !htmlSet[f]; });
    var staleInHtml = htmlFiles.filter(function (f) { return !fileSet[f]; });
    var msg = 'index.html is out of sync with js/data/strategies/ — run node scripts/build-index.js.';
    if (missingFromHtml.length) msg += ' Missing from index.html: ' + missingFromHtml.join(', ') + '.';
    if (staleInHtml.length) msg += ' Stale tags in index.html (file no longer exists): ' + staleInHtml.join(', ') + '.';
    if (!missingFromHtml.length && !staleInHtml.length) msg += ' (same files, different order)';
    failures.push(msg);
  }
})();

var REQUIRED = ['id', 'name', 'category', 'applyOrder', 'modeled', 'advisor', 'client', 'inputs', 'appliesTo', 'apply'];
var ADVISOR_KEYS = ['summary', 'mechanics', 'authority', 'requirements', 'risks', 'bestFit', 'implementation'];
var CLIENT_KEYS = ['teaser', 'headline', 'plainEnglish', 'analogy', 'benefits', 'steps', 'considerations'];

// Multiple smoke profiles: the original rich MFJ profile, plus edge cases
// the original single-profile smoke test could never exercise (loss year,
// W-2-only single filer, high-income SSTB near the QBI phase-out).
var SMOKE_PROFILE = {
  filingStatus: 'mfj', wages: 100000, scheduleCNet: 250000, passthroughK1: 150000,
  entityW2Wages: 60000, ownerWages: 60000, isSSTB: false,
  rentalNet: 20000, rentalLossesUsable: false,
  ltcg: 100000, qualDiv: 10000, interest: 5000, otherIncome: 0,
  propertyTax: 8000, mortgageInterest: 12000, charitable: 10000, otherItemized: 0,
  kidsCTC: 2, otherDeps: 0, stateRate: 0.058
};
var SMOKE_PROFILES = [
  { name: 'rich-mfj', profile: SMOKE_PROFILE },
  {
    name: 'w2-only-single', profile: {
      filingStatus: 'single', wages: 90000, scheduleCNet: 0, passthroughK1: 0,
      entityW2Wages: 0, ownerWages: 0, isSSTB: false, rentalNet: 0, rentalLossesUsable: true,
      ltcg: 0, qualDiv: 0, interest: 0, otherIncome: 0,
      propertyTax: 0, mortgageInterest: 0, charitable: 0, otherItemized: 0,
      kidsCTC: 0, otherDeps: 0, stateRate: 0.05
    }
  },
  {
    name: 'loss-year', profile: {
      filingStatus: 'mfj', wages: 40000, scheduleCNet: -60000, passthroughK1: 0,
      entityW2Wages: 0, ownerWages: 0, isSSTB: false, rentalNet: -20000, rentalLossesUsable: false,
      ltcg: -10000, qualDiv: 0, interest: 500, otherIncome: 0,
      propertyTax: 4000, mortgageInterest: 6000, charitable: 1000, otherItemized: 0,
      kidsCTC: 1, otherDeps: 0, stateRate: 0.05
    }
  },
  {
    name: 'high-income-sstb', profile: {
      filingStatus: 'single', wages: 0, scheduleCNet: 600000, passthroughK1: 0,
      entityW2Wages: 200000, ownerWages: 0, isSSTB: true, rentalNet: 0, rentalLossesUsable: true,
      ltcg: 50000, qualDiv: 20000, interest: 10000, otherIncome: 0,
      propertyTax: 20000, mortgageInterest: 30000, charitable: 15000, otherItemized: 0,
      kidsCTC: 0, otherDeps: 0, stateRate: 0.09
    }
  }
];

var filenameSet = {};
files.forEach(function (f) { filenameSet[f.slice(0, -3)] = true; });

var seenIds = {};
var warnings = [];
TSIQ.STRATEGIES.forEach(function (s) {
  var errs = [];
  REQUIRED.forEach(function (k) { if (s[k] === undefined) errs.push('missing ' + k); });
  if (seenIds[s.id]) errs.push('DUPLICATE id');
  seenIds[s.id] = true;
  if (typeof s.id !== 'string' || !/^[a-z0-9-]+$/.test(s.id)) {
    errs.push('id must be kebab-case [a-z0-9-] — got ' + JSON.stringify(s.id));
  } else if (!filenameSet[s.id]) {
    errs.push('id "' + s.id + '" does not match any filename in js/data/strategies/');
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
  if (s.appliesTo !== undefined && typeof s.appliesTo !== 'function') {
    errs.push('appliesTo must be a function');
  }
  (s.inputs || []).forEach(function (inp, i) {
    var loc = 'inputs[' + i + ']';
    if (!inp.key) errs.push(loc + ' missing key');
    if (!inp.label) errs.push(loc + ' missing label');
    if (!inp.type) errs.push(loc + ' missing type');
    if (inp.default === undefined) errs.push(loc + ' missing default');
    if (inp.type === 'select') {
      if (!Array.isArray(inp.options) || !inp.options.length) {
        errs.push(loc + ' type=select requires a non-empty options array');
      } else {
        inp.options.forEach(function (o, oi) {
          if (o.value === undefined || o.label === undefined) {
            errs.push(loc + '.options[' + oi + '] missing value/label');
          }
        });
      }
    }
  });

  // suggest() must never throw and, when it fires, its params keys must be
  // real declared inputs (suggest.js silently swallows a throw at runtime,
  // which would otherwise hide a broken screening rule indefinitely).
  if (typeof s.suggest === 'function') {
    var inputKeys = {};
    (s.inputs || []).forEach(function (inp) { inputKeys[inp.key] = true; });
    SMOKE_PROFILES.forEach(function (sp) {
      try {
        var suggestion = s.suggest(sp.profile);
        if (suggestion && suggestion.params) {
          Object.keys(suggestion.params).forEach(function (k) {
            if (!inputKeys[k]) errs.push('suggest() on ' + sp.name + ' returned params.' + k + ' — not a declared input');
          });
        }
      } catch (e) { errs.push('suggest() THROWS on ' + sp.name + ' profile: ' + e.message); }
    });
  }

  // Smoke test across several profiles (rich MFJ, W-2-only single, a loss
  // year, and a high-income SSTB) with BOTH default params and a 10x-scaled
  // stress pass (percent/select inputs untouched) — the stress pass is what
  // catches a missing legal-limit cap that the defaults-only test cannot
  // (e.g. an uncapped per-unit amount that only misbehaves at a larger
  // value). A modeled strategy is also expected to move the number on at
  // least one profile; if it never does, warn (not fail — some strategies
  // legitimately no-op on every one of these specific profiles).
  var everChangedResult = false;
  SMOKE_PROFILES.forEach(function (sp) {
    [1, 10].forEach(function (scale) {
      try {
        var params = {};
        (s.inputs || []).forEach(function (inp) {
          if (inp.type === 'select' || inp.type === 'percent') { params[inp.key] = inp.default; }
          else { params[inp.key] = (typeof inp.default === 'number') ? inp.default * scale : inp.default; }
        });
        var r = TSIQ.computeScenario(sp.profile, [{ strategy: s, params: params }], 3, 0.03);
        r.years.forEach(function (y, i) {
          if (!isFinite(y.totalBurden)) errs.push(sp.name + '/x' + scale + ' year ' + i + ' totalBurden is ' + y.totalBurden);
          if (y.totalBurden < 0) errs.push(sp.name + '/x' + scale + ' year ' + i + ' NEGATIVE total burden');
        });
        var base = TSIQ.computeBaseline(sp.profile, 3, 0.03);
        if (s.modeled === false) {
          if (Math.abs(base.totals.totalBurden - r.totals.totalBurden) > 1) {
            errs.push(sp.name + '/x' + scale + ': advisory strategy CHANGES the math (must be a no-op)');
          }
        } else if (Math.abs(base.totals.totalBurden - r.totals.totalBurden) > 1) {
          everChangedResult = true;
        }
      } catch (e) { errs.push(sp.name + '/x' + scale + ' apply() THROWS: ' + e.message); }
    });
  });
  if (s.modeled !== false && !everChangedResult) {
    warnings.push(s.id + ': modeled strategy never changed totalBurden on any smoke profile (x1 or x10) — confirm appliesTo()/apply() actually fire for a realistic client.');
  }

  if (errs.length) failures.push(s.id + ': ' + errs.join('; '));
});

console.log('Strategies loaded: ' + TSIQ.STRATEGIES.length);
console.log('Modeled: ' + TSIQ.STRATEGIES.filter(function (s) { return s.modeled !== false; }).length +
  '  Advisory: ' + TSIQ.STRATEGIES.filter(function (s) { return s.modeled === false; }).length);
if (warnings.length) {
  console.log('\nWARNINGS (' + warnings.length + '):');
  warnings.forEach(function (w) { console.log('  - ' + w); });
}
if (failures.length) {
  console.log('\nFAILURES (' + failures.length + '):');
  failures.forEach(function (f) { console.log('  - ' + f); });
  process.exit(1);
} else {
  console.log('All strategies pass schema + smoke tests.');
}
