/* ============================================================================
 * SCENARIO ENGINE — composes strategies over a multi-year projection.
 * A scenario = a list of {strategyId, params}. Strategies are applied in
 * their declared applyOrder, each receiving the profile produced by the
 * previous one. No strategy-specific logic lives here.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

(function () {
  // Income fields that grow with the client's assumed growth rate.
  var GROWTH_FIELDS = ['wages', 'scheduleCNet', 'passthroughK1', 'rentalNet',
    'ltcg', 'qualDiv', 'interest', 'otherIncome',
    'propertyTax', 'mortgageInterest', 'charitable', 'otherItemized'];

  function grownProfile(base, growthRate, yearIndex) {
    var p = Object.assign({}, base);
    var factor = Math.pow(1 + growthRate, yearIndex);
    GROWTH_FIELDS.forEach(function (k) {
      if (typeof p[k] === 'number') p[k] = p[k] * factor;
    });
    // Withholding/estimates are year-to-date payments for the CURRENT year —
    // they don't apply to projection years 2+.
    if (yearIndex > 0) {
      p.fedWithholding = 0; p.fedEstimates = 0;
      p.stateWithholding = 0; p.stateEstimates = 0;
    }
    return p;
  }

  // Opt-in nominal-dollar scaling for currency params flagged `grows: true`
  // (e.g. a spouse/owner salary) — without this, a strategy's dollar inputs
  // stay flat at their year-1 value for the whole projection while the
  // client's income compounds, understating the strategy's benefit in later
  // years. Params with no `grows` inputs are returned unchanged (year 0 is
  // always unchanged either way, since the factor is 1).
  function growParams(sel, yearIndex, growthRate) {
    var growable = (sel.strategy.inputs || []).filter(function (inp) { return inp.grows; });
    if (!growable.length || yearIndex === 0) return sel.params;
    var factor = Math.pow(1 + growthRate, yearIndex);
    var params = Object.assign({}, sel.params);
    growable.forEach(function (inp) {
      if (typeof params[inp.key] === 'number') params[inp.key] = params[inp.key] * factor;
    });
    return params;
  }

  /**
   * Run one scenario across `years` years.
   * selections: [{ strategy, params }] — strategy is the library object.
   * Returns { years: [yearResult...], totals: {...}, notes: [...] }.
   */
  TSIQ.computeScenario = function (baseProfile, selections, years, growthRate) {
    var ordered = selections.slice().sort(function (a, b) {
      return a.strategy.applyOrder - b.strategy.applyOrder;
    });
    var state = {};           // multi-year memory shared by engine + strategies
    var allNotes = [];
    var yearResults = [];

    for (var y = 0; y < years; y++) {
      var profile = grownProfile(baseProfile, growthRate, y);
      profile.ptetPaid = 0;
      profile.ownerWages = profile.ownerWages || 0;
      profile.entityW2Wages = profile.entityW2Wages || 0;

      ordered.forEach(function (sel) {
        var out = sel.strategy.apply(profile, growParams(sel, y, growthRate), y, state);
        profile = out.profile;
        (out.notes || []).forEach(function (n) {
          var tagged = '[' + sel.strategy.name + '] ' + n;
          if (allNotes.indexOf(tagged) === -1) allNotes.push(tagged);
        });
      });

      var result = TSIQ.computeYear(profile, state);
      result.yearIndex = y;
      result.taxYear = TSIQ.TABLES_2026.taxYear + y;
      yearResults.push(result);

      // §461(l) is not modeled (no NOL carryforward, no add-back) — quantify
      // the exposure instead of relying on a generic disclaimer.
      if (result.excessBusinessLoss > 0) {
        allNotes.push('Tax year ' + result.taxYear + ': aggregate business loss exceeds the ' +
          '§461(l) threshold by ' + TSIQ.fmt.usd(result.excessBusinessLoss) + ' — not modeled ' +
          'here (no benefit from the excess this year; it is generally carried forward as an ' +
          'NOL instead). Confirm treatment before relying on this year\'s projected liability.');
      }
    }

    // Cumulative accelerated depreciation (bonus/§179/cost seg/§179D/heavy
    // vehicle) this plan claims — not modeled: a sale of the underlying
    // property generally recaptures some or all of it as ordinary income.
    var DEP_MATERIALITY = 50000;
    if ((state.acceleratedDepAccumulated || 0) > DEP_MATERIALITY) {
      allNotes.push('This plan claims ' + TSIQ.fmt.usd(state.acceleratedDepAccumulated) +
        ' of accelerated depreciation (bonus/§179/cost segregation/§179D/heavy vehicle) over ' +
        'the projection — not modeled: selling the underlying property generally recaptures ' +
        'some or all of this as ordinary income (§1245/§1250/§280F). Build recapture into the ' +
        'exit-year projection separately.');
    }

    var totals = { totalFederal: 0, totalState: 0, totalBurden: 0 };
    yearResults.forEach(function (r) {
      totals.totalFederal += r.totalFederal;
      totals.totalState += r.totalState;
      totals.totalBurden += r.totalBurden;
    });

    return { years: yearResults, totals: totals, notes: allNotes };
  };

  /** Convenience: baseline is a scenario with no strategies. */
  TSIQ.computeBaseline = function (baseProfile, years, growthRate) {
    return TSIQ.computeScenario(baseProfile, [], years, growthRate);
  };

  /**
   * The scenario with the lowest total burden — the "with plan" figures in
   * every output (app.js results panel, client PDF, slideshow, pitch deck)
   * come from whichever scenario this picks. Shared so the four call sites
   * can't drift out of sync with each other.
   */
  TSIQ.bestScenario = function (scenarios) {
    return scenarios.reduce(function (a, b) {
      return b.result.totals.totalBurden < a.result.totals.totalBurden ? b : a;
    }, scenarios[0]);
  };

  /**
   * Incremental first-year savings per strategy, added one at a time in
   * applyOrder — used by the pitch deck (per-strategy reveal slides) and
   * the client slideshow (per-strategy savings callouts). Returns an
   * ordered array; each caller derives whatever shape it needs (a map
   * keyed by strategy id, etc.) from that.
   */
  TSIQ.incrementalSavings = function (baseProfile, selections, years, growthRate, startingBurden) {
    var ordered = selections.slice().sort(function (a, b) {
      return a.strategy.applyOrder - b.strategy.applyOrder;
    });
    var steps = [], running = [], prevBurden = startingBurden;
    ordered.forEach(function (sel) {
      running.push(sel);
      var r = TSIQ.computeScenario(baseProfile, running, years, growthRate);
      var burden = r.years[0].totalBurden;
      steps.push({ strategy: sel.strategy, incremental: prevBurden - burden });
      prevBurden = burden;
    });
    return steps;
  };
})();
