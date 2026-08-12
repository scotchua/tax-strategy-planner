/* ============================================================================
 * SCENARIO ENGINE — composes strategies over a multi-year projection.
 * A scenario = a list of {strategyId, params}. Strategies are applied in
 * their declared applyOrder, each receiving the profile produced by the
 * previous one. No strategy-specific logic lives here.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

(function () {
  // Income fields that grow with the client's assumed growth rate. PJ3:
  // itemized-deduction fields (propertyTax, mortgageInterest, charitable,
  // otherItemized) are deliberately NOT in this list — mortgage interest on
  // an amortizing loan actually DECLINES over time, and growing all four at
  // the income rate previously muted the AGI-keyed SALT-phase-down/§170(p)
  // charitable-floor effects (numerator and denominator moved together).
  // They now stay flat at the Section-1 entered value for the whole
  // projection — see CLAUDE.md / the results fine print.
  var GROWTH_FIELDS = ['wages', 'scheduleCNet', 'passthroughK1', 'rentalNet',
    'ltcg', 'qualDiv', 'interest', 'otherIncome'];

  // PJ2: a one-time capital gain or other-income event (a stock/business
  // sale, a single bonus) must not be replayed and grown in every later
  // projection year — that turns a single-year event into phantom recurring
  // income. The advisor flags the field as one-time (ltcgOneTime/
  // otherIncomeOneTime checkboxes) and it zeroes out for yearIndex > 0.
  var ONE_TIME_FIELDS = { ltcg: 'ltcgOneTime', otherIncome: 'otherIncomeOneTime' };

  function grownProfile(base, growthRate, yearIndex) {
    var p = Object.assign({}, base);
    var factor = Math.pow(1 + growthRate, yearIndex);
    GROWTH_FIELDS.forEach(function (k) {
      if (typeof p[k] === 'number') p[k] = p[k] * factor;
    });
    if (yearIndex > 0) {
      Object.keys(ONE_TIME_FIELDS).forEach(function (k) {
        if (base[ONE_TIME_FIELDS[k]]) p[k] = 0;
      });
    }
    // Withholding/estimates are year-to-date payments for the CURRENT year —
    // they don't apply to projection years 2+.
    if (yearIndex > 0) {
      p.fedWithholding = 0; p.fedEstimates = 0;
      p.stateWithholding = 0; p.stateEstimates = 0;
    }
    // PJ1: the projected calendar tax year, so the engine can apply
    // sunset-aware law (e.g. the OBBBA senior deduction and the enhanced
    // SALT cap both expire on enacted dates within a long projection) rather
    // than replaying every 2026 provision unchanged for 30 years.
    p.projTaxYear = TSIQ.TABLES_2026.taxYear + yearIndex;
    // PJ6: income-transition events ("retires in year N", "sells the
    // business in year N") — applied AFTER the smooth growth factor above,
    // since they represent a real step change in the client's facts, not a
    // continuation of compounding. fromYear is 1-based (1 = this year) and
    // the change persists in every later year too. Independently
    // recomputed off THIS year's already-grown value each time (not
    // chained from a prior year's transitioned value), so 'multiply-by'
    // still compounds naturally at the same growth rate after the step,
    // and 'set-to' stays flat at that exact dollar figure from fromYear on.
    (base.incomeTransitions || []).forEach(function (t) {
      if (yearIndex < t.fromYear - 1 || typeof p[t.field] !== 'number') return;
      p[t.field] = (t.mode === 'multiply-by') ? p[t.field] * t.value : t.value;
    });
    return p;
  }

  // EN7: annual Medicare IRMAA surcharge (Part B+D, per enrollee) for a
  // given MAGI — see the `irmaa` table comment in tax-tables-2026.js.
  function irmaaTierSurcharge(fs, magi) {
    var irmaa = TSIQ.TABLES_2026.irmaa;
    if (fs === 'mfs') return magi > irmaa.mfsThreshold ? irmaa.mfsSurcharge : 0;
    var tiers = (fs === 'mfj') ? irmaa.mfjTiers : irmaa.singleTiers; // hoh uses single
    var surcharge = 0;
    for (var i = 0; i < tiers.length; i++) {
      if (magi > tiers[i][0]) surcharge = tiers[i][1]; else break;
    }
    return surcharge;
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

      // §461(l) excess business loss (EN3): now actually disallowed and
      // carried forward as an NOL (see tax-engine.js) — quantify it anyway
      // so the advisor can see WHY a loss year's benefit was capped.
      if (result.excessBusinessLoss > 0) {
        allNotes.push('Tax year ' + result.taxYear + ': aggregate business loss exceeds the ' +
          '§461(l) threshold by ' + TSIQ.fmt.usd(result.excessBusinessLoss) + ' — that excess is ' +
          'disallowed this year (added back to income) and carried forward as an NOL, usable in ' +
          'future years up to 80% of that year\'s taxable income before the NOL/QBI deductions.');
      }

      // IRMAA (EN7): a note only — Medicare premiums, not tax liability.
      // Flat 2026 CMS tier table applied to every projection year (same
      // simplification as unindexed brackets elsewhere) against THIS
      // year's own MAGI (the real 2-year lookback is not modeled).
      if ((profile.age65Count || 0) > 0) {
        var irmaaSurcharge = irmaaTierSurcharge(profile.filingStatus, result.agi);
        if (irmaaSurcharge > 0) {
          var irmaaTotal = irmaaSurcharge * profile.age65Count;
          allNotes.push('Tax year ' + result.taxYear + ': MAGI of ' + TSIQ.fmt.usd(result.agi) +
            ' crosses an IRMAA tier — roughly ' + TSIQ.fmt.usd(irmaaTotal) + '/yr in added Medicare ' +
            'Part B/D premiums per enrollee, billed two years later (2026 CMS brackets; verify the ' +
            'brackets in effect for that future year). Not a tax and not included in the totals above.');
        }
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
   * ET5: `forcedLabel` (optional) lets the advisor override a near-tie pick
   * — if it matches a scenario's `.label` exactly, that scenario wins
   * outright regardless of totalBurden. Every call site accepts and passes
   * through `data.forcedWinnerLabel` (undefined is a no-op, so this is
   * fully backward compatible with any caller that omits it).
   */
  TSIQ.bestScenario = function (scenarios, forcedLabel) {
    if (forcedLabel) {
      var forced = scenarios.filter(function (sc) { return sc.label === forcedLabel; })[0];
      if (forced) return forced;
    }
    return scenarios.reduce(function (a, b) {
      return b.result.totals.totalBurden < a.result.totals.totalBurden ? b : a;
    }, scenarios[0]);
  };

  /**
   * ET5: cumulative-burden margin between the best and second-best
   * scenario — Infinity when there's nothing to compare against (0 or 1
   * scenarios). A small margin means the model can't meaningfully rank the
   * scenarios; the caller decides what "small" means for its context.
   */
  TSIQ.scenarioMargin = function (scenarios) {
    if (scenarios.length < 2) return Infinity;
    var sorted = scenarios.slice().sort(function (a, b) {
      return a.result.totals.totalBurden - b.result.totals.totalBurden;
    });
    return sorted[1].result.totals.totalBurden - sorted[0].result.totals.totalBurden;
  };

  /**
   * Incremental first-year (and, if `startingCumulativeBurden` is passed,
   * cumulative multi-year — ET2) savings per strategy, added one at a time
   * in applyOrder — used by the pitch deck (per-strategy reveal slides),
   * the client slideshow (per-strategy savings callouts), and the advisor
   * per-strategy contribution table (ET1). Returns an ordered array; each
   * caller derives whatever shape it needs (a map keyed by strategy id,
   * etc.) from that. `startingCumulativeBurden` is OPTIONAL and backward-
   * compatible — omit it (as the pitch deck/slideshow do) to get only the
   * year-1 `incremental` field; pass `run.baseline.totals.totalBurden` to
   * also get `cumulativeIncremental` per step.
   */
  TSIQ.incrementalSavings = function (baseProfile, selections, years, growthRate, startingBurden, startingCumulativeBurden) {
    var ordered = selections.slice().sort(function (a, b) {
      return a.strategy.applyOrder - b.strategy.applyOrder;
    });
    var steps = [], running = [], prevBurden = startingBurden;
    var trackCumulative = startingCumulativeBurden !== undefined;
    var prevCum = startingCumulativeBurden;
    ordered.forEach(function (sel) {
      running.push(sel);
      var r = TSIQ.computeScenario(baseProfile, running, years, growthRate);
      var burden = r.years[0].totalBurden;
      var step = { strategy: sel.strategy, incremental: prevBurden - burden };
      if (trackCumulative) {
        step.cumulativeIncremental = prevCum - r.totals.totalBurden;
        prevCum = r.totals.totalBurden;
      }
      steps.push(step);
      prevBurden = burden;
    });
    return steps;
  };

  /**
   * WF2: grid-search solver for a single strategy's `solveable: true`
   * currency param — finds the value in [minVal, maxVal] that minimizes
   * year-1 totalBurden, holding every OTHER selection (and every OTHER
   * param on the target strategy itself) fixed at its current value.
   * Two passes (coarse grid, then a fine grid over the coarse winner's
   * neighborhood) rather than a unimodal-assuming method (ternary search) —
   * bracket cliffs and QBI phase-ins can create local wiggles a strictly
   * unimodal search could jump past.
   * target: { strategy, params } — params is a snapshot; paramKey is swept.
   * fixedSelections: every OTHER checked selection in the same scenario.
   */
  TSIQ.optimizeParam = function (baseProfile, fixedSelections, target, paramKey, minVal, maxVal, years, growthRate) {
    function burdenAt(v) {
      var params = Object.assign({}, target.params);
      params[paramKey] = v;
      var sel = fixedSelections.concat([{ strategy: target.strategy, params: params }]);
      return TSIQ.computeScenario(baseProfile, sel, years, growthRate).years[0].totalBurden;
    }
    var lo = Math.min(minVal, maxVal), hi = Math.max(minVal, maxVal);
    if (!(hi > lo)) return { value: lo, totalBurden: burdenAt(lo) };
    var GRID = 40;
    function sweep(a, b) {
      var bestV = a, bestB = burdenAt(a);
      for (var i = 1; i <= GRID; i++) {
        var v = a + (b - a) * (i / GRID);
        var burden = burdenAt(v);
        if (burden < bestB) { bestB = burden; bestV = v; }
      }
      return { value: bestV, totalBurden: bestB };
    }
    var coarse = sweep(lo, hi);
    var step = (hi - lo) / GRID;
    var fine = sweep(Math.max(lo, coarse.value - step), Math.min(hi, coarse.value + step));
    return fine.totalBurden <= coarse.totalBurden ? fine : coarse;
  };
})();
