/* ============================================================================
 * APP — wires the form, the strategy library, the scenario builders, and the
 * results view together. Fully data-driven: iterates TSIQ.STRATEGIES; adding
 * a strategy file requires no changes here.
 * ==========================================================================*/
(function () {
  var esc = function (s) { return TSIQ.esc(s); };
  var usd = function (n) { return TSIQ.fmt.usd(n); };
  var $ = function (id) { return document.getElementById(id); };

  var lastRun = null; // cache of the latest computation for the renderers
  var resultsStale = false;   // form changed since lastRun was computed
  var formDirty = false;      // unsaved changes exist (beforeunload + import-confirm gate)
  var autosaveTimer = null;
  var FORM_DEFAULTS = null;   // captured once at load; used to reset the form on import
  var SESSION_KEY = 'tsiq-session';

  function toFiniteNumber(v) {
    if (typeof v === 'number' && isFinite(v)) return v;
    if (typeof v === 'string' && v.trim() !== '') {
      var n = Number(v.replace(/,/g, ''));
      if (isFinite(n)) return n;
    }
    return null;
  }

  function markResultsStale() {
    if (!lastRun || resultsStale) return;
    resultsStale = true;
    $('results-section').classList.add('stale');
    var banner = $('stale-banner');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'stale-banner';
      banner.className = 'stale-banner';
      banner.textContent = 'Inputs changed — re-run the comparison to update these numbers.';
      $('results').parentNode.insertBefore(banner, $('results'));
    }
    ['btn-pdf', 'btn-slides', 'btn-pitch'].forEach(function (id) { if ($(id)) $(id).disabled = true; });
  }

  function clearResultsStale() {
    resultsStale = false;
    $('results-section').classList.remove('stale');
    var banner = $('stale-banner');
    if (banner) banner.parentNode.removeChild(banner);
    ['btn-pdf', 'btn-slides', 'btn-pitch'].forEach(function (id) { if ($(id)) $(id).disabled = false; });
  }

  function scheduleAutosave() {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(function () {
      try { localStorage.setItem(SESSION_KEY, JSON.stringify(serializeState())); }
      catch (e) { /* storage full/unavailable — autosave is best-effort */ }
    }, 800);
  }

  // Ignore changes inside the Results panel (e.g. pitch-deck fee inputs) —
  // those don't affect the comparison itself, so they shouldn't gate the
  // PDF/slideshow buttons or trigger the unsaved-changes warning.
  function markFormChanged(e) {
    if (e.target && e.target.closest && e.target.closest('#results-section')) return;
    formDirty = true;
    markResultsStale();
    scheduleAutosave();
  }

  function captureFormDefaults() {
    FORM_DEFAULTS = { profile: {}, checkboxes: {} };
    PROFILE_FIELD_IDS.forEach(function (id) {
      var el = $(id);
      if (el) FORM_DEFAULTS.profile[id] = el.value;
    });
    PROFILE_CHECKBOX_IDS.forEach(function (id) {
      var el = $(id);
      if (el) FORM_DEFAULTS.checkboxes[id] = el.checked;
    });
  }

  // Resets Section 1 + both scenario builders to their as-loaded defaults —
  // used before importing a client file so a field the incoming file doesn't
  // mention can't silently inherit whatever the PREVIOUS client left behind.
  function resetClientForm() {
    $('clientName').value = '';
    if (FORM_DEFAULTS) {
      PROFILE_FIELD_IDS.forEach(function (id) {
        var el = $(id);
        if (el && FORM_DEFAULTS.profile[id] !== undefined) el.value = FORM_DEFAULTS.profile[id];
      });
      PROFILE_CHECKBOX_IDS.forEach(function (id) {
        var el = $(id);
        if (el && FORM_DEFAULTS.checkboxes[id] !== undefined) el.checked = FORM_DEFAULTS.checkboxes[id];
      });
    }
    ['sc2', 'sc3'].forEach(function (scKey) {
      TSIQ.STRATEGIES.forEach(function (s) {
        var box = $(scKey + '-' + s.id);
        if (box && box.checked) box.click();
      });
    });
  }

  /* ------------------- brand / white-label settings ---------------------- */
  var DEFAULT_BRAND = { name: 'Your Firm', color: '#8a6d3b', logo: '' };

  // Validate shape/format rather than trusting localStorage blindly — on
  // file://, all local HTML files share one origin's localStorage, so any
  // other local file the advisor ever opens could plant a payload here that
  // would otherwise detonate in every generated client document.
  function sanitizeBrand(b) {
    var out = Object.assign({}, DEFAULT_BRAND);
    if (b && typeof b.name === 'string' && b.name.trim()) out.name = b.name.slice(0, 120);
    if (b && typeof b.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(b.color)) out.color = b.color;
    if (b && typeof b.logo === 'string' &&
        /^data:image\/(png|jpe?g|gif|webp);base64,[A-Za-z0-9+/]+=*$/.test(b.logo)) {
      out.logo = b.logo;
    }
    return out;
  }

  function loadBrand() {
    try {
      return sanitizeBrand(JSON.parse(localStorage.getItem('tsiq-brand') || '{}'));
    } catch (e) { return Object.assign({}, DEFAULT_BRAND); }
  }

  function applyBrand(b) {
    TSIQ.brand = b; // renderers read this for PDFs, decks, handouts
    document.documentElement.style.setProperty('--accent', b.color);
    $('brand-name-display').textContent = b.name;
    document.title = b.name + ' — Tax Strategy Planner';
    var logo = $('brand-logo');
    if (b.logo) { logo.src = b.logo; logo.classList.add('show'); }
    else { logo.removeAttribute('src'); logo.classList.remove('show'); }
    if ($('firmName')) $('firmName').value = b.name;
  }

  function initBrand() {
    applyBrand(loadBrand());
    var pendingLogo = null;

    $('brand-settings-btn').addEventListener('click', function () {
      var b = TSIQ.brand;
      $('brand-name-input').value = b.name;
      $('brand-color-input').value = b.color;
      pendingLogo = b.logo || null;
      var prev = $('brand-logo-preview');
      if (b.logo) { prev.src = b.logo; prev.classList.add('show'); }
      else { prev.removeAttribute('src'); prev.classList.remove('show'); }
      $('brand-modal').classList.add('open');
    });
    $('brand-close').addEventListener('click', function () { $('brand-modal').classList.remove('open'); });
    $('brand-modal').addEventListener('click', function (e) {
      if (e.target === $('brand-modal')) $('brand-modal').classList.remove('open');
    });
    var swatches = document.querySelectorAll('.swatch');
    for (var i = 0; i < swatches.length; i++) {
      swatches[i].addEventListener('click', function (e) {
        $('brand-color-input').value = e.currentTarget.getAttribute('data-color');
      });
    }
    $('brand-logo-input').addEventListener('change', function (e) {
      var file = e.target.files && e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        pendingLogo = reader.result;
        var prev = $('brand-logo-preview');
        prev.src = pendingLogo; prev.classList.add('show');
      };
      reader.readAsDataURL(file);
    });
    $('brand-save').addEventListener('click', function () {
      var b = sanitizeBrand({
        name: $('brand-name-input').value.trim() || DEFAULT_BRAND.name,
        color: $('brand-color-input').value || DEFAULT_BRAND.color,
        logo: pendingLogo || ''
      });
      if (pendingLogo && !b.logo) {
        alert('That logo file couldn\'t be saved — use a PNG, JPEG, GIF, or WebP image.');
        return;
      }
      try { localStorage.setItem('tsiq-brand', JSON.stringify(b)); }
      catch (e) { alert('Logo image is too large to save — try a smaller file (under ~2MB).'); return; }
      applyBrand(b);
      $('brand-modal').classList.remove('open');
    });
    $('brand-reset').addEventListener('click', function () {
      localStorage.removeItem('tsiq-brand');
      pendingLogo = null;
      applyBrand(Object.assign({}, DEFAULT_BRAND));
      $('brand-modal').classList.remove('open');
    });
  }

  /* ------------------------- strategy library UI ------------------------- */
  // Canonical display order; any unlisted category appends at the end.
  var CATEGORY_ORDER = [
    'Entity Structure', 'QBI Optimization', 'Payroll & Family',
    'Retirement', 'Health & Fringe', 'Real Estate & Cost Recovery',
    'Business Expenses', 'Income Timing & Character',
    'Credits & Incentives', 'Succession & Exit'
  ];

  function categories() {
    var out = [];
    TSIQ.STRATEGIES.forEach(function (s) {
      if (out.indexOf(s.category) === -1) out.push(s.category);
    });
    out.sort(function (a, b) {
      var ia = CATEGORY_ORDER.indexOf(a), ib = CATEGORY_ORDER.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });
    return out;
  }

  function card(s) {
    return '<div class="strategy-card" data-id="' + esc(s.id) + '" data-search="' +
      esc((s.name + ' ' + s.category + ' ' + s.advisor.summary).toLowerCase()) + '">' +
      '<span class="category-badge">' + esc(s.category) + '</span>' +
      (s.modeled === false ? '<span class="advisory-badge">Advisory</span>' : '') +
      '<h4>' + esc(s.name) + '</h4>' +
      '<p>' + esc(s.advisor.summary.slice(0, 150)) + '&hellip;</p>' +
      '<div class="card-actions">' +
      '<span class="link card-detail">Technical detail &rarr;</span>' +
      '<span class="link card-pdf">Client handout (PDF)</span>' +
      '</div></div>';
  }

  function buildLibrary() {
    var host = $('library-cards');
    host.innerHTML = categories().map(function (cat) {
      var inCat = TSIQ.STRATEGIES.filter(function (s) { return s.category === cat; });
      return '<div class="lib-category" data-cat="' + esc(cat) + '">' +
        '<h3 class="lib-cat-title">' + esc(cat) + ' <span class="count">(' + inCat.length + ')</span></h3>' +
        '<div class="lib-cat-cards">' + inCat.map(card).join('') + '</div></div>';
    }).join('');

    $('library-search').addEventListener('input', function (e) {
      var q = e.target.value.trim().toLowerCase();
      var cards = host.querySelectorAll('.strategy-card');
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.display = (!q || cards[i].getAttribute('data-search').indexOf(q) > -1) ? '' : 'none';
      }
      var groups = host.querySelectorAll('.lib-category');
      for (var g = 0; g < groups.length; g++) {
        var visible = groups[g].querySelectorAll('.strategy-card:not([style*="none"])').length;
        groups[g].style.display = visible ? '' : 'none';
      }
    });

    host.addEventListener('click', function (e) {
      var card = e.target.closest('.strategy-card');
      if (!card) return;
      var strategy = TSIQ.getStrategy(card.getAttribute('data-id'));
      if (e.target.closest('.card-pdf')) {
        TSIQ.render.strategyHandout(strategy, $('firmName').value || TSIQ.brand.name);
        return;
      }
      $('detail-body').innerHTML = TSIQ.render.advisorDetail(strategy);
      $('detail-modal').classList.add('open');
    });
    $('detail-close').addEventListener('click', function () {
      $('detail-modal').classList.remove('open');
    });
    $('detail-modal').addEventListener('click', function (e) {
      if (e.target === $('detail-modal')) $('detail-modal').classList.remove('open');
    });
  }

  /* ------------------------ scenario builders UI ------------------------- */
  function paramInput(scKey, strategy, inp) {
    var id = scKey + '-' + strategy.id + '-' + inp.key;
    var label = '<label for="' + esc(id) + '">' + esc(inp.label) + '</label>';
    if (inp.type === 'select') {
      return '<div class="param">' + label + '<select id="' + esc(id) + '">' +
        inp.options.map(function (o) {
          return '<option value="' + esc(o.value) + '"' +
            (o.value === inp.default ? ' selected' : '') + '>' + esc(o.label) + '</option>';
        }).join('') + '</select></div>';
    }
    return '<div class="param">' + label +
      '<input id="' + esc(id) + '" type="number" value="' + esc(inp.default) + '" min="' +
      esc(inp.min !== undefined ? inp.min : 0) + '"' +
      (inp.max !== undefined ? ' max="' + esc(inp.max) + '"' : '') + '></div>';
  }

  function buildScenarioPicker(scKey, hostId) {
    $(hostId).innerHTML = categories().map(function (cat) {
      var inCat = TSIQ.STRATEGIES.filter(function (s) { return s.category === cat; });
      return '<details class="pick-category"><summary>' + esc(cat) +
        ' <span class="count">(' + inCat.length + ')</span></summary>' +
        inCat.map(function (s) {
          return '<div class="strategy-pick">' +
            '<label class="pick-label"><input type="checkbox" id="' + esc(scKey + '-' + s.id) + '"> ' +
            esc(s.name) +
            (s.modeled === false ? ' <span class="advisory-badge" title="Included in plan documents; does not change scenario math">Advisory</span>' : '') +
            '</label>' +
            '<div class="params" id="' + esc(scKey + '-' + s.id + '-params') + '" style="display:none">' +
            s.inputs.map(function (inp) { return paramInput(scKey, s, inp); }).join('') +
            '</div></div>';
        }).join('') + '</details>';
    }).join('');
    TSIQ.STRATEGIES.forEach(function (s) {
      $(scKey + '-' + s.id).addEventListener('change', function (e) {
        $(scKey + '-' + s.id + '-params').style.display = e.target.checked ? 'grid' : 'none';
      });
    });
  }

  function readSelections(scKey) {
    var out = [];
    TSIQ.STRATEGIES.forEach(function (s) {
      if (!$(scKey + '-' + s.id).checked) return;
      var params = {};
      s.inputs.forEach(function (inp) {
        var el = $(scKey + '-' + s.id + '-' + inp.key);
        if (inp.type === 'select') {
          params[inp.key] = el.value;
        } else {
          var v = parseFloat(el.value) || 0;
          var floor = inp.min !== undefined ? inp.min : 0;
          params[inp.key] = Math.max(floor, v);
        }
      });
      out.push({ strategy: s, params: params });
    });
    return out;
  }

  /* ----------------------------- profile IO ------------------------------ */
  function num(id) { return parseFloat($(id).value) || 0; }

  function readProfile() {
    return {
      filingStatus: $('filingStatus').value,
      wages: num('wages'),
      scheduleCNet: num('scheduleCNet'),
      passthroughK1: num('passthroughK1'),
      entityW2Wages: num('entityW2Wages'),
      isSSTB: $('isSSTB').checked,
      rentalNet: num('rentalNet'),
      rentalLossesUsable: $('rentalLossesUsable').checked,
      reNonPassive: $('reNonPassive').checked,
      ltcg: num('ltcg'), qualDiv: num('qualDiv'),
      interest: num('interest'), otherIncome: num('otherIncome'),
      propertyTax: num('propertyTax'), mortgageInterest: num('mortgageInterest'),
      charitable: num('charitable'), otherItemized: num('otherItemized'),
      kidsCTC: num('kidsCTC'), otherDeps: num('otherDeps'),
      age65Count: num('age65Count'),
      fedWithholding: num('fedWithholding'), fedEstimates: num('fedEstimates'),
      stateWithholding: num('stateWithholding'), stateEstimates: num('stateEstimates'),
      stateRate: num('stateRatePct') / 100
    };
  }

  /* ------------------------------ results -------------------------------- */
  function detailRows(cols) {
    var lines = [
      ['Adjusted gross income', function (r) { return r.agi; }],
      ['Deduction (std/itemized)', function (r) { return -r.deduction; }],
      ['QBI deduction (§199A)', function (r) { return -r.qbiDeduction; }],
      ['Taxable income', function (r) { return r.taxableIncome; }],
      ['Federal income tax (before credits)', function (r) { return r.incomeTaxBeforeCredits; }],
      ['Child tax credit / ODC', function (r) { return -r.ctcAllowed; }],
      ['Other credits (R&D, WOTC, etc.)', function (r) { return -r.otherCreditsAllowed; }],
      ['C-corp tax (entity level)', function (r) { return r.corpTaxPaid; }],
      ['Other payroll taxes (family wages)', function (r) { return r.otherTaxes; }],
      ['SE tax', function (r) { return r.seTax; }],
      ['Payroll tax (owner W-2)', function (r) { return r.ownerPayrollTax; }],
      ['Additional Medicare (0.9%)', function (r) { return r.addlMedicare; }],
      ['NIIT (3.8%)', function (r) { return r.niit; }],
      ['Total federal', function (r) { return r.totalFederal; }],
      ['State tax (personal)', function (r) { return r.personalStateTax; }],
      ['PTET (entity-level state)', function (r) { return r.ptetPaid; }]
    ];
    var html = '';
    lines.forEach(function (line) {
      html += '<tr><td>' + esc(line[0]) + '</td>' + cols.map(function (c) {
        return '<td>' + usd(line[1](c.r)) + '</td>';
      }).join('') + '</tr>';
    });
    return html;
  }

  function renderResults(run) {
    var base = run.baseline.years[0];
    var cols = [{ label: 'Baseline', r: base }].concat(run.scenarios.map(function (sc) {
      return { label: sc.label, r: sc.result.years[0] };
    }));

    // Headline KPIs from the best scenario
    var best = run.scenarios.reduce(function (a, b) {
      return b.result.totals.totalBurden < a.result.totals.totalBurden ? b : a;
    }, run.scenarios[0]);
    var yr1Savings = base.totalBurden - best.result.years[0].totalBurden;
    var cumSavings = run.baseline.totals.totalBurden - best.result.totals.totalBurden;

    var yr1Pct = base.totalBurden > 0 ? Math.round(yr1Savings / base.totalBurden * 100) : 0;
    var strategyCount = best.strategies.length;

    // Presentation context line: whose numbers these are
    var html = '<div class="results-context">' +
      '<span class="rc-client">' + esc(run.clientName) + '</span>' +
      '<span class="rc-meta">' + esc(TSIQ.FILING_STATUS_LABELS[run.profile.filingStatus]) +
      ' &middot; ' + strategyCount + (strategyCount === 1 ? ' strategy' : ' strategies') +
      ' &middot; ' + run.years + '-year projection &middot; Tax Year ' + TSIQ.TABLES_2026.taxYear +
      '</span></div>';

    // KPI cards — savings are the hero (count-up animated after render)
    html += '<div class="kpi-row">' +
      '<div class="kpi bad"><div class="kpi-label">Baseline ' + TSIQ.TABLES_2026.taxYear + ' tax</div>' +
      '<div class="kpi-value" data-target="' + Math.round(base.totalBurden) + '">' + usd(base.totalBurden) + '</div></div>' +
      '<div class="kpi"><div class="kpi-label">With plan (' + esc(best.label) + ')</div>' +
      '<div class="kpi-value" data-target="' + Math.round(best.result.years[0].totalBurden) + '">' + usd(best.result.years[0].totalBurden) + '</div></div>' +
      '<div class="kpi ' + (yr1Savings >= 0 ? 'good' : 'bad') + '"><div class="kpi-label">First-year ' +
      (yr1Savings >= 0 ? 'savings' : 'cost') + ' (' + esc(best.label) + ')</div>' +
      '<div class="kpi-value" data-target="' + Math.round(yr1Savings) + '">' + usd(yr1Savings) + '</div>' +
      (yr1Pct > 0 ? '<span class="kpi-chip">&#9660; ' + yr1Pct + '% less tax</span>' : '') + '</div>' +
      '<div class="kpi ' + (cumSavings >= 0 ? 'good' : 'bad') + '"><div class="kpi-label">' + run.years +
      '-year ' + (cumSavings >= 0 ? 'savings' : 'cost') + '</div>' +
      '<div class="kpi-value" data-target="' + Math.round(cumSavings) + '">' + usd(cumSavings) + '</div></div>' +
      '</div>';

    // Cumulative-burden bar chart — bars animate from 0 (width set post-render)
    var chartRows = [{ label: 'Baseline', total: run.baseline.totals.totalBurden, scenario: false }]
      .concat(run.scenarios.map(function (sc) {
        return { label: sc.label, total: sc.result.totals.totalBurden, scenario: true };
      }));
    var maxTotal = Math.max.apply(null, chartRows.map(function (r) { return r.total; })) || 1;
    var baseCum = run.baseline.totals.totalBurden;
    html += '<h3>' + run.years + '-Year Cumulative Tax</h3><div class="bar-chart">' +
      chartRows.map(function (r) {
        var deltaPct = (r.scenario && baseCum > 0)
          ? Math.round((baseCum - r.total) / baseCum * 100) : 0;
        return '<div class="bar-row' + (r.scenario ? ' scenario' : '') + '">' +
          '<div class="bar-label">' + esc(r.label) + '</div>' +
          '<div class="bar-track"><div class="bar-fill" data-width="' +
          Math.max(2, Math.round(r.total / maxTotal * 100)) + '"></div></div>' +
          '<div class="bar-value">' + usd(r.total) +
          (deltaPct > 0 ? '<span class="bar-delta">&minus;' + deltaPct + '%</span>' : '') +
          '</div></div>';
      }).join('') + '</div>';

    html += '<h3>First-Year Comparison (Tax Year ' + TSIQ.TABLES_2026.taxYear + ')</h3>' +
      '<table class="results-table"><thead><tr><th></th>' +
      cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + detailRows(cols) +
      '<tr class="total-row"><td>Total tax burden</td>' + cols.map(function (c) {
        return '<td>' + usd(c.r.totalBurden) + '</td>';
      }).join('') + '</tr>' +
      '<tr class="savings-row"><td>Savings vs. baseline</td>' + cols.map(function (c, i) {
        return '<td>' + (i === 0 ? '—' : usd(base.totalBurden - c.r.totalBurden)) + '</td>';
      }).join('') + '</tr>' +
      '<tr><td>Payments to date (W/H + estimates)</td>' + cols.map(function (c) {
        return '<td>' + usd(-c.r.totalPayments) + '</td>';
      }).join('') + '</tr>' +
      '<tr class="due-row"><td>Estimated remaining balance due</td>' + cols.map(function (c) {
        return '<td>' + usd(c.r.totalBalanceDue) + '</td>';
      }).join('') + '</tr></tbody></table>';

    // multi-year projection
    html += '<h3>' + run.years + '-Year Projection (' + (run.growthRate * 100).toFixed(1) +
      '% annual income growth)</h3>' +
      '<table class="results-table"><thead><tr><th>Year</th><th>Baseline</th>' +
      run.scenarios.map(function (sc) {
        return '<th>' + esc(sc.label) + '</th><th class="sav">Savings</th>';
      }).join('') + '</tr></thead><tbody>';
    var cum = run.scenarios.map(function () { return 0; });
    for (var y = 0; y < run.years; y++) {
      var b = run.baseline.years[y].totalBurden;
      html += '<tr><td>' + run.baseline.years[y].taxYear + '</td><td>' + usd(b) + '</td>';
      run.scenarios.forEach(function (sc, i) {
        var v = sc.result.years[y].totalBurden;
        cum[i] += b - v;
        html += '<td>' + usd(v) + '</td><td class="sav">' + usd(b - v) + '</td>';
      });
      html += '</tr>';
    }
    html += '<tr class="total-row"><td>Cumulative</td><td>' +
      usd(run.baseline.totals.totalBurden) + '</td>';
    run.scenarios.forEach(function (sc, i) {
      html += '<td>' + usd(sc.result.totals.totalBurden) + '</td><td class="sav">' + usd(cum[i]) + '</td>';
    });
    html += '</tr></tbody></table>';

    // planning notes from the strategies + engine
    var allNotes = [];
    run.scenarios.forEach(function (sc) {
      sc.result.notes.forEach(function (n) {
        var tagged = sc.label + ': ' + n;
        if (allNotes.indexOf(tagged) === -1) allNotes.push(tagged);
      });
    });
    if (allNotes.length) {
      html += '<h3>Planning Notes</h3><ul class="notes">' +
        allNotes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>';
    }
    html += '<p class="fine-print">2026 federal figures per Rev. Proc. 2025-32 as amended by OBBBA. ' +
      'Projection years apply 2026 law AND 2026 dollar thresholds/brackets to every year shown ' +
      '(not inflation-indexed) — later-year figures are illustrative, not indexed projections. ' +
      'State tax modeled at a flat effective rate. Rental income does not enter the §199A QBI ' +
      'calculation. AMT, depreciation recapture on sale, and §461(l) excess business loss are not ' +
      'modeled — see the README Scope Notes.</p>';

    $('results').innerHTML = html;
    $('output-actions').style.display = 'flex';
    animateResults();
  }

  // Count-up on KPI values + grow-in on chart bars. Pure presentation —
  // the final numbers are already in the DOM as fallback text.
  function animateResults() {
    var values = document.querySelectorAll('#results .kpi-value[data-target]');
    var start = null, DURATION = 800;
    function frame(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / DURATION);
      var ease = 1 - Math.pow(1 - t, 3);
      for (var i = 0; i < values.length; i++) {
        var target = parseFloat(values[i].getAttribute('data-target'));
        values[i].textContent = TSIQ.fmt.usd(target * ease);
      }
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    var bars = document.querySelectorAll('#results .bar-fill[data-width]');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        for (var i = 0; i < bars.length; i++) {
          bars[i].style.width = bars[i].getAttribute('data-width') + '%';
        }
      });
    });
  }

  // Returns a list of human-readable field labels for any number input in
  // Section 1 the browser flagged as badInput (e.g. "1,200,000" or "450k")
  // — these silently parse to 0 via parseFloat and must not run un-flagged.
  function findInvalidInputs() {
    var invalid = [];
    var inputs = document.querySelectorAll('#tab-builder input[type=number]');
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i];
      el.classList.remove('invalid');
      if (el.validity && el.validity.badInput) {
        el.classList.add('invalid');
        var label = document.querySelector('label[for="' + el.id + '"]');
        invalid.push(label ? label.textContent : el.id);
      }
    }
    return invalid;
  }

  function compute() {
    var invalid = findInvalidInputs();
    if (invalid.length) {
      alert('These fields have a value the browser can\'t read as a number — fix them ' +
        'before running the comparison:\n\n' + invalid.join('\n'));
      return;
    }
    var profile = readProfile();
    var rawYears = Math.round(num('years'));
    var years = (rawYears >= 1) ? Math.min(rawYears, 30) : 10;
    var growthRate = num('growthPct') / 100;

    var scenarios = [];
    var selA = readSelections('sc2');
    if (selA.length) {
      scenarios.push({
        label: $('sc2-label').value || 'Scenario 2',
        selections: selA,
        strategies: selA.map(function (s) { return s.strategy; }),
        result: TSIQ.computeScenario(profile, selA, years, growthRate)
      });
    }
    var selB = readSelections('sc3');
    if (selB.length) {
      scenarios.push({
        label: $('sc3-label').value || 'Scenario 3',
        selections: selB,
        strategies: selB.map(function (s) { return s.strategy; }),
        result: TSIQ.computeScenario(profile, selB, years, growthRate)
      });
    }
    if (!scenarios.length) {
      alert('Select at least one strategy in Scenario 2.');
      return;
    }

    lastRun = {
      clientName: $('clientName').value || 'Client',
      firmName: $('firmName').value || TSIQ.brand.name,
      profile: profile,
      baseline: TSIQ.computeBaseline(profile, years, growthRate),
      scenarios: scenarios,
      years: years,
      growthRate: growthRate
    };
    clearResultsStale();
    renderResults(lastRun);
    $('results-section').scrollIntoView({ behavior: 'smooth' });
  }

  /* --------------------- client file import / export --------------------- */
  // Format documented in docs/client-file-format.md (tsiq-client-v1). Also
  // used as the autosave/restore payload (SESSION_KEY) — same serialize/
  // apply pair, so the two stay consistent.
  var PROFILE_FIELD_IDS = ['filingStatus', 'wages', 'scheduleCNet', 'passthroughK1',
    'entityW2Wages', 'rentalNet', 'ltcg', 'qualDiv', 'interest', 'otherIncome',
    'propertyTax', 'mortgageInterest', 'charitable', 'otherItemized',
    'kidsCTC', 'otherDeps', 'age65Count', 'fedWithholding', 'fedEstimates',
    'stateWithholding', 'stateEstimates', 'stateRatePct', 'years', 'growthPct'];
  var PROFILE_CHECKBOX_IDS = ['isSSTB', 'rentalLossesUsable', 'reNonPassive'];
  var VALID_FILING_STATUSES = ['single', 'mfj', 'mfs', 'hoh'];

  // Carried through from the last .tsiq.json import (e.g. a Claude review
  // workflow file) so a subsequent Export doesn't silently drop it.
  var lastImportedExtras = null;

  function serializeState() {
    var data = { format: 'tsiq-client-v1', clientName: $('clientName').value || 'Client', profile: {} };
    PROFILE_FIELD_IDS.forEach(function (id) {
      var el = $(id);
      data.profile[id] = (el.type === 'number') ? (parseFloat(el.value) || 0) : el.value;
    });
    PROFILE_CHECKBOX_IDS.forEach(function (id) { data.profile[id] = $(id).checked; });
    data.scenarios = ['sc2', 'sc3'].map(function (scKey) {
      return {
        key: scKey,
        label: $(scKey + '-label') ? $(scKey + '-label').value : '',
        strategies: readSelections(scKey).map(function (sel) {
          return { id: sel.strategy.id, params: sel.params };
        })
      };
    });
    data.fees = { planning: num('feePlanning'), annual: num('feeAnnual') };
    if (lastImportedExtras) {
      if (lastImportedExtras.suggestedStrategies) data.suggestedStrategies = lastImportedExtras.suggestedStrategies;
      if (lastImportedExtras.notes) data.notes = lastImportedExtras.notes;
    }
    return data;
  }

  // Applies a tsiq-client-v1 payload to the form. Validates as it goes —
  // an invalid filingStatus or non-numeric field is skipped (left at
  // whatever the form currently holds) rather than corrupting the form or
  // silently coercing to 0. Returns the list of field ids that were skipped.
  function applyState(data) {
    var skipped = [];
    if (data.clientName) $('clientName').value = data.clientName;
    var p = data.profile || {};
    PROFILE_FIELD_IDS.forEach(function (id) {
      if (p[id] === undefined) return;
      var el = $(id);
      if (!el) return;
      if (id === 'filingStatus') {
        if (VALID_FILING_STATUSES.indexOf(p[id]) === -1) { skipped.push(id); return; }
        el.value = p[id];
      } else if (el.tagName === 'SELECT') {
        el.value = String(p[id]);
      } else {
        var n = toFiniteNumber(p[id]);
        if (n === null) { skipped.push(id); } else { el.value = n; }
      }
    });
    PROFILE_CHECKBOX_IDS.forEach(function (id) { if (p[id] !== undefined) $(id).checked = !!p[id]; });
    (data.scenarios || []).forEach(function (sc) {
      if (!sc || !sc.key) return;
      if ($(sc.key + '-label') && sc.label) $(sc.key + '-label').value = sc.label;
      (sc.strategies || []).forEach(function (s) {
        var box = $(sc.key + '-' + s.id);
        if (!box) { skipped.push(sc.key + ':' + s.id); return; }
        if (!box.checked) box.click();
        Object.keys(s.params || {}).forEach(function (k) {
          var input = $(sc.key + '-' + s.id + '-' + k);
          if (input) input.value = s.params[k];
        });
        var det = box.closest('details'); if (det) det.open = true;
      });
    });
    if (data.fees) {
      var fp = toFiniteNumber(data.fees.planning), fa = toFiniteNumber(data.fees.annual);
      if ($('feePlanning') && fp !== null) $('feePlanning').value = fp;
      if ($('feeAnnual') && fa !== null) $('feeAnnual').value = fa;
    }
    lastImportedExtras = (data.suggestedStrategies || data.notes)
      ? { suggestedStrategies: data.suggestedStrategies, notes: data.notes } : null;
    return skipped;
  }

  function exportClientFile() {
    var data = serializeState();
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (data.clientName.replace(/[^a-z0-9 _-]/gi, '') || 'client') + '.tsiq.json';
    a.click();
    URL.revokeObjectURL(a.href);
    formDirty = false;
  }

  function renderSuggestions(suggestions, notes) {
    var host = $('suggestions');
    if ((!suggestions || !suggestions.length) && (!notes || !notes.length)) {
      host.style.display = 'none'; host.innerHTML = ''; return;
    }
    var known = (suggestions || []).filter(function (s) { return TSIQ.getStrategy(s.id); });
    var html = '<div class="suggest-box">';
    if (known.length) {
      html += '<h3>Suggested strategies from the return review</h3>' +
        '<p class="hint">Leads to evaluate — not conclusions. Loading them checks the boxes in Scenario 2 with any suggested parameters; you confirm every one.</p><ul>' +
        known.map(function (s) {
          var st = TSIQ.getStrategy(s.id);
          return '<li><strong>' + esc(st.name) + '</strong>' +
            (st.modeled === false ? ' <span class="advisory-badge">Advisory</span>' : '') +
            (s.reason ? ' — ' + esc(s.reason) : '') + '</li>';
        }).join('') + '</ul>' +
        '<button class="secondary" id="load-suggestions">Load into Scenario 2</button>';
    }
    if (notes && notes.length) {
      html += '<h3 style="margin-top:14px">Review notes</h3><ul>' +
        notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>';
    }
    host.innerHTML = html + '</div>';
    host.style.display = '';
    if (known.length) {
      $('load-suggestions').addEventListener('click', function () {
        known.forEach(function (s) {
          var box = $('sc2-' + s.id);
          if (!box) return;
          if (!box.checked) box.click();
          Object.keys(s.params || {}).forEach(function (k) {
            var input = $('sc2-' + s.id + '-' + k);
            if (input) input.value = s.params[k];
          });
          var det = box.closest('details'); if (det) det.open = true;
        });
        $('sc2-strategies').scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  function clearLastRunForNewClient() {
    lastRun = null;
    resultsStale = false;
    $('output-actions').style.display = 'none';
    $('results').innerHTML = '<p class="hint">Run a comparison to see the baseline vs. scenario columns and the multi-year projection.</p>';
    var banner = $('stale-banner');
    if (banner) banner.parentNode.removeChild(banner);
    $('results-section').classList.remove('stale');
  }

  function importClientFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try { data = JSON.parse(reader.result); }
      catch (e) { alert('That file is not valid JSON.'); return; }
      if (!data || data.format !== 'tsiq-client-v1') {
        alert('Not a recognized client file (expected format "tsiq-client-v1").'); return;
      }
      if (formDirty && !confirm('Replace the current client data (' +
          ($('clientName').value || 'unsaved entries') + ') with "' +
          (data.clientName || 'this file') + '"?')) {
        return;
      }
      // Reset first so a field this file doesn't mention can't silently
      // inherit whatever the PREVIOUS client left in the form.
      resetClientForm();
      var skipped = applyState(data);
      clearLastRunForNewClient();
      var notes = (data.notes || []).slice();
      if (skipped.length) {
        notes.push('Could not read ' + skipped.length + ' field(s) from this file — left at default: ' + skipped.join(', '));
      }
      renderSuggestions(data.suggestedStrategies, notes);
      formDirty = false;
      window.scrollTo(0, 0);
    };
    reader.readAsText(file);
  }

  /* ---------------------- PDF return import + review --------------------- */
  var PDF_FIELD_LABELS = {
    filingStatus: 'Filing status', wages: 'W-2 wages',
    interest: 'Interest / ordinary dividends', qualDiv: 'Qualified dividends',
    scheduleCNet: 'Schedule C net profit', rentalNet: 'Rental net income / (loss)',
    passthroughK1: 'K-1 ordinary income', ltcg: 'Long-term capital gains',
    otherIncome: 'Other income', propertyTax: 'Property tax',
    mortgageInterest: 'Mortgage interest', charitable: 'Charitable contributions'
  };

  function renderPdfReview(result, fileName) {
    var f = result.fields;
    var html = '<h2 style="font-weight:500;margin-bottom:4px">Review parsed return</h2>' +
      '<p class="hint" style="color:var(--muted);font-size:13px;margin-bottom:16px">' +
      esc(fileName) + (result.formYear ? ' &middot; tax year ' + result.formYear : '') +
      ' &middot; read directly from the PDF (no AI). Verify each figure against the return, ' +
      'then Apply — nothing touches the form until you do.</p>';

    html += '<div class="grid" style="margin-bottom:18px">';
    Object.keys(PDF_FIELD_LABELS).forEach(function (k) {
      if (f[k] === undefined) return;
      if (k === 'filingStatus') {
        html += '<div class="field"><label>' + PDF_FIELD_LABELS[k] + '</label>' +
          '<select id="pdfr-filingStatus">' +
          ['mfj', 'single', 'hoh', 'mfs'].map(function (s) {
            return '<option value="' + s + '"' + (f.filingStatus === s ? ' selected' : '') + '>' +
              esc(TSIQ.FILING_STATUS_LABELS[s]) + '</option>';
          }).join('') + '</select></div>';
      } else {
        html += '<div class="field"><label>' + PDF_FIELD_LABELS[k] + '</label>' +
          '<input type="number" id="pdfr-' + k + '" value="' + Math.round(f[k]) + '"></div>';
      }
    });
    html += '</div>';

    // Cross-check block: the return's own summary lines, for tie-out.
    var ref = result.reference;
    var refRows = [
      ['Total income (line 9)', ref.totalIncome], ['AGI (line 11)', ref.agi],
      ['Deduction (line 12)', ref.deduction], ['QBI deduction (line 13)', ref.qbiDeduction],
      ['Taxable income (line 15)', ref.taxableIncome], ['Total tax (line 24)', ref.totalTax],
      ['SE tax (Sch 2)', ref.seTax]
    ].filter(function (r) { return r[1] !== null && r[1] !== undefined; });
    if (refRows.length) {
      html += '<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:var(--accent);margin-bottom:8px">Cross-check — what the return itself says</h3>' +
        '<table class="results-table" style="margin-bottom:16px"><tbody>' +
        refRows.map(function (r) {
          return '<tr><td>' + esc(r[0]) + '</td><td>' + usd(r[1]) + '</td></tr>';
        }).join('') + '</tbody></table>';
    }

    // Tie-out: sum the parsed income fields and compare against the
    // return's own line 9 (total income) — the one arithmetic check that
    // would catch most mis-mapped or dropped values automatically.
    if (ref.totalIncome !== null && ref.totalIncome !== undefined) {
      var parsedTotal = (f.wages || 0) + (f.interest || 0) + (f.qualDiv || 0) +
        (f.scheduleCNet || 0) + (f.rentalNet || 0) + (f.passthroughK1 || 0) +
        (f.ltcg || 0) + (f.otherIncome || 0);
      var diff = parsedTotal - ref.totalIncome;
      var tieTolerance = 2;
      html += '<div style="margin-bottom:16px;padding:10px 14px;border-radius:8px;' +
        (Math.abs(diff) > tieTolerance ? 'background:color-mix(in srgb, var(--red) 10%, transparent);color:var(--red);'
          : 'background:var(--green-soft);color:var(--green);') +
        'font-size:13px;font-weight:600">' +
        'Parsed income total: ' + usd(parsedTotal) + ' vs. return line 9: ' + usd(ref.totalIncome) +
        ' — difference ' + usd(diff) +
        (Math.abs(diff) > tieTolerance
          ? ' (does not tie — some income (adjustments, un-mapped Schedule 1 lines) may not be captured; review before applying)'
          : ' (ties out)') +
        '</div>';
    }

    if (result.warnings.length) {
      html += '<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:var(--accent);margin-bottom:8px">Review notes</h3>' +
        '<ul class="notes" style="margin-bottom:18px">' +
        result.warnings.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>';
    }

    html += '<div class="actions"><button class="primary" id="pdfr-apply">Apply to Client Data</button></div>';

    $('pdf-review-body').innerHTML = html;
    $('pdf-review-modal').classList.add('open');
    $('pdfr-apply').addEventListener('click', function () {
      // Reset every field this importer is responsible for FIRST (except
      // filingStatus, which has no safe "reset" value) — a field this PDF
      // doesn't have (e.g. no Schedule E on this return) must not silently
      // keep a PRIOR client's number.
      Object.keys(PDF_FIELD_LABELS).forEach(function (k) {
        if (k === 'filingStatus') return;
        var target = $(k);
        if (target) target.value = 0;
      });
      Object.keys(PDF_FIELD_LABELS).forEach(function (k) {
        var el = $('pdfr-' + k);
        if (!el) return;
        var target = $(k);
        if (target) target.value = el.value;
      });
      $('pdf-review-modal').classList.remove('open');
      clearLastRunForNewClient();
      formDirty = true;
      runSuggestions(result.warnings);
      window.scrollTo(0, 0);
    });
  }

  // Deterministic strategy screening over whatever is in the form now.
  function runSuggestions(extraNotes) {
    var suggestions = TSIQ.suggestStrategies(readProfile());
    var notes = (extraNotes || []).concat(suggestions.length
      ? ['Suggestions come from rule-of-thumb screens on the entered data — leads to evaluate, not conclusions.']
      : ['No rule-based screens fired on this data — browse the library for situational strategies.']);
    renderSuggestions(suggestions, notes);
  }

  function importReturnPdf(file) {
    var reader = new FileReader();
    reader.onerror = function () {
      alert('Could not read that file from disk — try again, or a different file.');
    };
    reader.onload = function () {
      TSIQ.parseReturnPdf(new Uint8Array(reader.result))
        .then(function (result) { renderPdfReview(result, file.name); })
        .catch(function (e) {
          if (e && e.name === 'PasswordException') {
            alert('This PDF is password-protected. Remove the password (e.g. "Print to PDF" ' +
              'from a viewer that already has it unlocked) and try importing again.');
          } else {
            alert('Could not read that PDF: ' + e.message);
          }
        });
    };
    reader.readAsArrayBuffer(file);
  }

  /* -------------------------------- init --------------------------------- */
  function initTabs() {
    var btns = document.querySelectorAll('.tab-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (e) {
        for (var b = 0; b < btns.length; b++) btns[b].classList.remove('active');
        e.currentTarget.classList.add('active');
        var pages = document.querySelectorAll('.tab-page');
        for (var p = 0; p < pages.length; p++) pages[p].style.display = 'none';
        $(e.currentTarget.getAttribute('data-tab')).style.display = '';
        window.scrollTo(0, 0);
      });
    }
    $('lib-count').textContent = '(' + TSIQ.STRATEGIES.length + ')';
  }

  document.addEventListener('DOMContentLoaded', function () {
    initBrand();
    initTabs();
    buildLibrary();
    buildScenarioPicker('sc2', 'sc2-strategies');
    buildScenarioPicker('sc3', 'sc3-strategies');
    captureFormDefaults();

    $('tab-builder').addEventListener('input', markFormChanged);
    $('tab-builder').addEventListener('change', markFormChanged);
    window.addEventListener('beforeunload', function (e) {
      if (formDirty) { e.preventDefault(); e.returnValue = ''; }
    });

    try {
      var draftRaw = localStorage.getItem(SESSION_KEY);
      if (draftRaw) {
        var draft = JSON.parse(draftRaw);
        var draftName = (draft && draft.clientName) || 'a client';
        if (confirm('Restore your unsaved session for ' + draftName +
            '? Choose Cancel to start fresh (this discards the saved draft).')) {
          applyState(draft);
        } else {
          localStorage.removeItem(SESSION_KEY);
        }
      }
    } catch (e) { /* corrupt draft — leave the form as-is */ }

    $('compute').addEventListener('click', compute);
    $('btn-pdf').addEventListener('click', function () {
      if (lastRun) TSIQ.render.clientReport(lastRun);
    });
    $('btn-slides').addEventListener('click', function () {
      if (lastRun) TSIQ.render.slideshow(lastRun);
    });
    if (window.pdfjsLib && pdfjsLib.GlobalWorkerOptions) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
    }
    $('btn-import-pdf').addEventListener('click', function () { $('import-pdf-file').click(); });
    $('import-pdf-file').addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) importReturnPdf(e.target.files[0]);
      e.target.value = '';
    });
    $('pdf-review-close').addEventListener('click', function () { $('pdf-review-modal').classList.remove('open'); });
    $('pdf-review-modal').addEventListener('click', function (e) {
      if (e.target === $('pdf-review-modal')) $('pdf-review-modal').classList.remove('open');
    });
    $('btn-suggest').addEventListener('click', function () { runSuggestions(); });
    $('btn-export').addEventListener('click', exportClientFile);
    $('btn-import').addEventListener('click', function () { $('import-file').click(); });
    $('import-file').addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) importClientFile(e.target.files[0]);
      e.target.value = '';
    });
    $('btn-pitch').addEventListener('click', function () {
      if (!lastRun) return;
      lastRun.fees = { planning: num('feePlanning'), annual: num('feeAnnual') };
      TSIQ.render.pitchDeck(lastRun);
    });
  });
})();
