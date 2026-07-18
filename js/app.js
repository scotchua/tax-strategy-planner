/* ============================================================================
 * APP — wires the form, the strategy library, the scenario builders, and the
 * results view together. Fully data-driven: iterates TSIQ.STRATEGIES; adding
 * a strategy file requires no changes here.
 * ==========================================================================*/
(function () {
  var esc = function (s) { return TSIQ.esc(s); };
  var usd = function (n) { return TSIQ.fmt.usd(n); };
  var $ = function (id) { return document.getElementById(id); };
  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function scrollTo(el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  }

  var lastRun = null; // cache of the latest computation for the renderers
  var resultsStale = false;   // form changed since lastRun was computed
  var formDirty = false;      // unsaved changes exist (beforeunload + import-confirm gate)
  var autosaveTimer = null;
  var FORM_DEFAULTS = null;   // captured once at load; used to reset the form on import
  var SESSION_KEY = 'tsiq-session';

  // WF7: bounded undo stack over serializeState()/applyState() — snapshotted
  // just before each of the three destructive bulk operations (client-file
  // import, PDF Apply, Copy Scenario 2 -> 3) so a wrong click is recoverable.
  var UNDO_STACK_LIMIT = 10;
  var undoStack = [];

  function pushUndoSnapshot() {
    try {
      undoStack.push(JSON.stringify(serializeState()));
      if (undoStack.length > UNDO_STACK_LIMIT) undoStack.shift();
      updateUndoButton();
    } catch (e) { /* serialization failure shouldn't block the operation itself */ }
  }
  function updateUndoButton() {
    var btn = $('btn-undo');
    if (btn) btn.disabled = !undoStack.length;
  }
  // Same reset-first pattern importClientFile already uses — a field the
  // restored snapshot doesn't mention (or never had) can't silently keep
  // whatever the operation-that's-being-undone left in the form.
  function undoLast() {
    if (!undoStack.length) return;
    var snapshot;
    try { snapshot = JSON.parse(undoStack.pop()); }
    catch (e) { updateUndoButton(); return; }
    resetClientForm();
    applyState(snapshot);
    clearLastRunForNewClient();
    formDirty = true;
    updateUndoButton();
    window.scrollTo(0, 0);
  }

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
      if ($(scKey + '-ov-filingStatus')) $(scKey + '-ov-filingStatus').value = '';
      if ($(scKey + '-ov-stateRatePct')) $(scKey + '-ov-stateRatePct').value = '';
      if ($(scKey + '-ov-incomeMultiplier')) $(scKey + '-ov-incomeMultiplier').value = '';
    });
  }

  /* ------------------- brand / white-label settings ---------------------- */
  var DEFAULT_BRAND = { name: 'Your Firm', color: TSIQ.DEFAULT_BRAND_COLOR, logo: '' };

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

  // WCAG relative luminance -> darken a too-light brand color until it
  // reads at roughly 4.5:1 contrast as TEXT on a white background. Fills/
  // borders/outlines keep using the raw --accent; only text usages
  // (--accent-text) get this treatment.
  function readableAccentText(hex) {
    if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
    function lin(c) { return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function luminance(r, g, b) { return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }
    var r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255,
      b = parseInt(hex.slice(5, 7), 16) / 255;
    var THRESHOLD = 0.18; // luminance ceiling for >=4.5:1 contrast against white
    for (var i = 0; i < 12 && luminance(r, g, b) > THRESHOLD; i++) {
      r *= 0.88; g *= 0.88; b *= 0.88;
    }
    function toHex(c) {
      var h = Math.round(Math.max(0, Math.min(1, c)) * 255).toString(16);
      return h.length < 2 ? '0' + h : h;
    }
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }

  function applyBrand(b) {
    TSIQ.brand = b; // renderers read this for PDFs, decks, handouts
    document.documentElement.style.setProperty('--accent', b.color);
    document.documentElement.style.setProperty('--accent-text', readableAccentText(b.color));
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
      $('brand-modal').showModal();
    });
    $('brand-close').addEventListener('click', function () { $('brand-modal').close(); });
    $('brand-modal').addEventListener('click', function (e) {
      if (e.target === $('brand-modal')) $('brand-modal').close();
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
      $('brand-modal').close();
    });
    $('brand-reset').addEventListener('click', function () {
      localStorage.removeItem('tsiq-brand');
      pendingLogo = null;
      applyBrand(Object.assign({}, DEFAULT_BRAND));
      $('brand-modal').close();
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
      '<button type="button" class="link card-detail">Technical detail &rarr;</button>' +
      '<button type="button" class="link card-pdf">Client handout (PDF)</button>' +
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
      var totalVisible = 0;
      for (var i = 0; i < cards.length; i++) {
        var show = !q || cards[i].getAttribute('data-search').indexOf(q) > -1;
        cards[i].style.display = show ? '' : 'none';
        if (show) totalVisible++;
      }
      var groups = host.querySelectorAll('.lib-category');
      for (var g = 0; g < groups.length; g++) {
        var visible = groups[g].querySelectorAll('.strategy-card:not([style*="none"])').length;
        groups[g].style.display = visible ? '' : 'none';
      }
      $('library-empty').style.display = totalVisible ? 'none' : '';
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
      $('detail-modal').showModal();
    });
    $('detail-close').addEventListener('click', function () {
      $('detail-modal').close();
    });
    $('detail-modal').addEventListener('click', function (e) {
      if (e.target === $('detail-modal')) $('detail-modal').close();
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
    // WF2: a `solveable: true` currency param gets a Solve button that runs
    // TSIQ.optimizeParam and writes the result back into this field.
    var solveBtn = inp.solveable
      ? '<button type="button" class="link wf-solve-btn" data-sckey="' + esc(scKey) +
        '" data-strategy="' + esc(strategy.id) + '" data-param="' + esc(inp.key) +
        '" data-floorkey="' + esc(inp.solveFloorKey || '') + '" title="Search for the value that minimizes year-1 tax">Solve</button>'
      : '';
    return '<div class="param">' + label +
      '<input id="' + esc(id) + '" type="number" value="' + esc(inp.default) + '" min="' +
      esc(inp.min !== undefined ? inp.min : 0) + '"' +
      (inp.max !== undefined ? ' max="' + esc(inp.max) + '"' : '') + '>' + solveBtn + '</div>';
  }

  function buildScenarioPicker(scKey, hostId) {
    $(hostId).innerHTML = categories().map(function (cat) {
      var inCat = TSIQ.STRATEGIES.filter(function (s) { return s.category === cat; });
      return '<details class="pick-category" data-cat="' + esc(cat) + '"><summary>' + esc(cat) +
        ' <span class="count">(' + inCat.length + ')</span>' +
        '<span class="suggest-count" style="display:none"></span></summary>' +
        inCat.map(function (s) {
          return '<div class="strategy-pick" data-id="' + esc(s.id) + '">' +
            '<label class="pick-label"><input type="checkbox" id="' + esc(scKey + '-' + s.id) + '"> ' +
            esc(s.name) +
            (s.modeled === false ? ' <span class="advisory-badge" title="Included in plan documents; does not change scenario math">Advisory</span>' : '') +
            ' <span class="wf-savings-chip" id="' + esc(scKey + '-' + s.id + '-chip') + '"></span>' +
            '</label>' +
            '<div class="suggest-badge" id="' + esc(scKey + '-' + s.id + '-suggest') + '" style="display:none"></div>' +
            '<div class="conflict-warn" id="' + esc(scKey + '-' + s.id + '-warn') + '" style="display:none"></div>' +
            '<div class="params" id="' + esc(scKey + '-' + s.id + '-params') + '" style="display:none">' +
            s.inputs.map(function (inp) { return paramInput(scKey, s, inp); }).join('') +
            '</div></div>';
        }).join('') + '</details>';
    }).join('');
    TSIQ.STRATEGIES.forEach(function (s) {
      $(scKey + '-' + s.id).addEventListener('change', function (e) {
        $(scKey + '-' + s.id + '-params').style.display = e.target.checked ? 'grid' : 'none';
        updateConflictBadges(scKey);
        scheduleLivePreview(scKey);
      });
    });
    $(hostId).addEventListener('click', function (e) {
      var btn = e.target.closest('.wf-solve-btn');
      if (btn) { runSolve(btn); return; }
      var useBtn = e.target.closest('.suggest-use-btn');
      if (useBtn) { applySuggestedParams(scKey, useBtn.getAttribute('data-id'), useBtn.getAttribute('data-params')); }
    });
  }

  /* --------------- WF5: surface suggest() inside the picker -------------- */
  function applySuggestedParams(scKey, id, paramsJson) {
    var box = $(scKey + '-' + id);
    if (!box) return;
    if (!box.checked) box.click();
    var params = {};
    try { params = JSON.parse(paramsJson || '{}'); } catch (e) { /* no params on this suggestion */ }
    Object.keys(params).forEach(function (k) {
      var input = $(scKey + '-' + id + '-' + k);
      if (input) input.value = params[k];
    });
    var det = box.closest('details'); if (det) det.open = true;
    markFormChanged({});
    scheduleLivePreview(scKey);
    scrollTo(box.closest('.strategy-pick'));
  }

  function updatePickerSuggestions(scKey) {
    var invalid = findInvalidInputs();
    var suggestions = invalid.length ? [] : TSIQ.suggestStrategies(readProfile());
    var byId = {};
    suggestions.forEach(function (s) { if (TSIQ.getStrategy(s.id)) byId[s.id] = s; });
    var openCats = {};
    TSIQ.STRATEGIES.forEach(function (s) {
      var badge = $(scKey + '-' + s.id + '-suggest');
      if (!badge) return;
      var sug = byId[s.id];
      if (!sug) { badge.style.display = 'none'; badge.innerHTML = ''; return; }
      openCats[s.category] = (openCats[s.category] || 0) + 1;
      badge.style.display = 'block';
      badge.innerHTML = '<span class="suggest-star">&#9733; Suggested</span> ' + esc(sug.reason) +
        (sug.params ? ' <button type="button" class="link suggest-use-btn" data-id="' + esc(s.id) +
          '" data-params=\'' + esc(JSON.stringify(sug.params)) + '\'>Use suggested params</button>' : '');
    });
    document.querySelectorAll('#' + hostIdFor(scKey) + ' .pick-category').forEach(function (det) {
      var cat = det.getAttribute('data-cat');
      var countEl = det.querySelector('.suggest-count');
      if (openCats[cat]) {
        countEl.style.display = '';
        countEl.textContent = ' — ' + openCats[cat] + ' suggested';
        det.open = true;
      } else if (countEl) {
        countEl.style.display = 'none';
        countEl.textContent = '';
      }
    });
  }
  function hostIdFor(scKey) { return scKey + '-strategies'; }

  var pickerSuggestTimer = null;
  function schedulePickerSuggestions() {
    if (pickerSuggestTimer) clearTimeout(pickerSuggestTimer);
    pickerSuggestTimer = setTimeout(function () {
      updatePickerSuggestions('sc2'); updatePickerSuggestions('sc3');
    }, 250);
  }

  /* -------------------- WF6: scenario diff strip -------------------------- */
  // Pure over readSelections()/readScenarioOverrides() — "Scenario 3 =
  // Scenario 2 + Cost Segregation, − PTET; salary $80,000 → $110,000;
  // overrides: MFS." Returns '' when there's nothing in Scenario 3 to diff.
  function paramDisplay(inp, v) {
    if (inp.type === 'currency') return usd(v);
    if (inp.type === 'select') {
      var o = (inp.options || []).filter(function (opt) { return opt.value === v; })[0];
      return o ? o.label : v;
    }
    return v;
  }
  function scenarioDiffText() {
    var selA = readSelections('sc2'), selB = readSelections('sc3');
    if (!selB.length) return '';
    var byIdA = {}; selA.forEach(function (s) { byIdA[s.strategy.id] = s; });
    var byIdB = {}; selB.forEach(function (s) { byIdB[s.strategy.id] = s; });
    var deltaBits = [];
    selB.forEach(function (s) { if (!byIdA[s.strategy.id]) deltaBits.push('+ ' + s.strategy.name); });
    selA.forEach(function (s) { if (!byIdB[s.strategy.id]) deltaBits.push('− ' + s.strategy.name); });

    var paramChanges = [];
    selB.forEach(function (s) {
      var other = byIdA[s.strategy.id];
      if (!other) return;
      (s.strategy.inputs || []).forEach(function (inp) {
        var vA = other.params[inp.key], vB = s.params[inp.key];
        if (vA !== vB) {
          paramChanges.push(s.strategy.name + ' ' + inp.label + ': ' +
            paramDisplay(inp, vA) + ' → ' + paramDisplay(inp, vB));
        }
      });
    });

    var ovA = readScenarioOverrides('sc2'), ovB = readScenarioOverrides('sc3');
    var overrideDiffs = [];
    if ((ovA.filingStatus || '') !== (ovB.filingStatus || '')) {
      overrideDiffs.push(ovB.filingStatus ? TSIQ.FILING_STATUS_LABELS[ovB.filingStatus] : 'filing status: same as Section 1');
    }
    if (ovA.stateRatePct !== ovB.stateRatePct) {
      overrideDiffs.push('state rate ' + (ovB.stateRatePct !== null ? ovB.stateRatePct + '%' : 'same as Section 1'));
    }
    if (ovA.incomeMultiplier !== ovB.incomeMultiplier) {
      overrideDiffs.push('income ×' + (ovB.incomeMultiplier !== null ? ovB.incomeMultiplier : '1.0'));
    }

    var label2 = $('sc2-label').value || 'Scenario 2', label3 = $('sc3-label').value || 'Scenario 3';
    var line = label3 + ' = ' + label2 + (deltaBits.length ? ' ' + deltaBits.join(', ') : ' (same strategies)');
    var trailer = [];
    if (paramChanges.length) trailer.push(paramChanges.join('; '));
    if (overrideDiffs.length) trailer.push('overrides: ' + overrideDiffs.join(', '));
    return line + (trailer.length ? '; ' + trailer.join('; ') : '');
  }

  var diffStripTimer = null;
  function renderScenarioDiff() {
    var host = $('scenario-diff');
    var invalid = findInvalidInputs();
    var text = invalid.length ? '' : scenarioDiffText();
    if (!text) { host.style.display = 'none'; host.textContent = ''; return; }
    host.textContent = text;
    host.style.display = '';
  }
  function scheduleScenarioDiff() {
    if (diffStripTimer) clearTimeout(diffStripTimer);
    diffStripTimer = setTimeout(renderScenarioDiff, 250);
  }

  /* ---------------- WF2: parameter solver ("Solve" button) --------------- */
  function runSolve(btn) {
    var scKey = btn.getAttribute('data-sckey'), stratId = btn.getAttribute('data-strategy'),
      paramKey = btn.getAttribute('data-param'), floorKey = btn.getAttribute('data-floorkey');
    var strategy = TSIQ.getStrategy(stratId);
    if (!strategy) return;
    var invalid = findInvalidInputs();
    if (invalid.length) {
      alert('Fix the invalid number field(s) before solving:\n\n' + invalid.join('\n'));
      return;
    }
    var box = $(scKey + '-' + stratId);
    if (!box.checked) box.click(); // solving implies including the strategy
    var inp = (strategy.inputs || []).filter(function (i) { return i.key === paramKey; })[0];
    if (!inp) return;

    var profile;
    try {
      profile = applyScenarioOverrides(readProfile(), readScenarioOverrides(scKey));
    } catch (e) { return; }

    var allSelections = readSelections(scKey);
    var target = allSelections.filter(function (s) { return s.strategy.id === stratId; })[0];
    var fixed = allSelections.filter(function (s) { return s.strategy.id !== stratId; });
    if (!target) return;

    var minVal = inp.min !== undefined ? inp.min : 0;
    if (floorKey) {
      var floorEl = $(scKey + '-' + stratId + '-' + floorKey);
      if (floorEl) minVal = Math.max(minVal, parseFloat(floorEl.value) || 0);
    }
    var maxVal = inp.max !== undefined ? inp.max : Math.max(inp.default * 5, 300000);

    var origText = btn.textContent;
    btn.textContent = 'Solving…'; btn.disabled = true;
    // Synchronous — the engine is pure and a ~80-point sweep is well under
    // a second even for a multi-strategy scenario; setTimeout(0) just lets
    // the "Solving…" label paint before the sweep blocks the main thread.
    setTimeout(function () {
      var result;
      try {
        result = TSIQ.optimizeParam(profile, fixed, target, paramKey, minVal, maxVal, 1, 0);
      } catch (e) {
        btn.textContent = origText; btn.disabled = false;
        alert('Could not solve this parameter: ' + e.message);
        return;
      }
      var field = $(scKey + '-' + stratId + '-' + paramKey);
      if (field) field.value = Math.round(result.value / 100) * 100;
      btn.textContent = origText; btn.disabled = false;
      markFormChanged({});
      scheduleLivePreview(scKey);
    }, 0);
  }

  /* ------------------ WF1: live per-strategy savings preview ------------- */
  // Debounced so typing in a param field doesn't recompute on every
  // keystroke — incrementalSavings runs one computeScenario per checked
  // strategy, cheap individually but not free to run on every input event.
  var livePreviewTimers = { sc2: null, sc3: null };

  function clearLivePreview(scKey) {
    TSIQ.STRATEGIES.forEach(function (s) {
      var chip = $(scKey + '-' + s.id + '-chip');
      if (chip) { chip.textContent = ''; chip.className = 'wf-savings-chip'; }
    });
    var total = $(scKey + '-live-total');
    if (total) total.textContent = '';
  }

  function runLivePreview(scKey) {
    var selections = readSelections(scKey);
    if (!selections.length) { clearLivePreview(scKey); return; }
    var invalid = findInvalidInputs();
    if (invalid.length) return; // don't compute against unparseable inputs mid-edit
    var baseProfile;
    try {
      baseProfile = applyScenarioOverrides(readProfile(), readScenarioOverrides(scKey));
    } catch (e) { return; }
    // Year-1 snapshot only (years=1, growthRate=0) — mathematically identical
    // to year 0 of any longer projection (growth factor is 1^0 either way),
    // and far cheaper to recompute on every debounced edit.
    var startingBurden = TSIQ.computeBaseline(baseProfile, 1, 0).years[0].totalBurden;
    var steps = TSIQ.incrementalSavings(baseProfile, selections, 1, 0, startingBurden);
    var runningTotal = 0;
    steps.forEach(function (step) {
      runningTotal += step.incremental;
      var chip = $(scKey + '-' + step.strategy.id + '-chip');
      if (!chip) return;
      var sign = step.incremental >= 0 ? '−' : '+';
      chip.textContent = sign + usd(Math.abs(step.incremental));
      chip.className = 'wf-savings-chip ' + (step.incremental >= 0 ? 'good' : 'bad');
    });
    var total = $(scKey + '-live-total');
    if (total) {
      total.textContent = (runningTotal >= 0 ? 'Saves ' : 'Costs ') + usd(Math.abs(runningTotal)) + ' (yr 1)';
      total.className = 'live-total ' + (runningTotal >= 0 ? 'good' : 'bad');
    }
  }

  function scheduleLivePreview(scKey) {
    if (livePreviewTimers[scKey]) clearTimeout(livePreviewTimers[scKey]);
    livePreviewTimers[scKey] = setTimeout(function () { runLivePreview(scKey); }, 350);
  }

  /* --------------- WF3: threshold-proximity strip ("where this client
   * sits") — one computeYear off Section 1's raw entries (no strategies,
   * no overrides), rendered as signed distances to every modeled cliff. */
  function thresholdCliffs(profile) {
    var tb = TSIQ.TABLES_2026, fs = profile.filingStatus;
    var r = TSIQ.computeYear(profile, {});
    var medicareBase = (profile.wages || 0) + (profile.ownerWages || 0) +
      Math.max(0, profile.scheduleCNet || 0) * tb.fica.seNetEarningsFactor;
    var businessLossMagnitude = Math.max(0, -(r.netBusinessResult));

    var cliffs = [
      { label: 'QBI phase-in starts (taxable income)', metric: r.taxableIncome, threshold: tb.qbi.threshold[fs] },
      { label: profile.isSSTB ? 'QBI fully phased out — SSTB (taxable income)' :
          'QBI wage/UBIA limit fully phased in (taxable income)',
        metric: r.taxableIncome, threshold: tb.qbi.threshold[fs] + tb.qbi.phaseInRange[fs] },
      { label: 'SALT cap phase-down starts (AGI)', metric: r.agi, threshold: tb.salt.phaseDownStart[fs] },
      { label: 'NIIT (3.8%) applies (MAGI)', metric: r.agi, threshold: tb.niit.magiThreshold[fs] },
      { label: 'Additional Medicare (0.9%) applies (wages + SE)', metric: medicareBase,
        threshold: tb.fica.additionalMedicareThreshold[fs] },
      { label: '§461(l) excess business loss limit', metric: businessLossMagnitude,
        threshold: tb.excessBusinessLoss.threshold[fs] }
    ];
    if ((profile.kidsCTC || 0) + (profile.otherDeps || 0) > 0) {
      cliffs.push({ label: 'CTC phase-out starts (MAGI)', metric: r.agi, threshold: tb.ctc.phaseOutThreshold[fs] });
    }
    if ((profile.age65Count || 0) > 0) {
      cliffs.push({ label: 'Senior deduction phase-out starts (MAGI)', metric: r.agi,
        threshold: tb.seniorDeduction.magiPhaseOutStart[fs] });
    }
    return cliffs.map(function (c) {
      var distance = c.threshold - c.metric; // + = room before the cliff; − = already crossed
      return { label: c.label, distance: distance };
    });
  }

  var thresholdStripTimer = null;
  function renderThresholdStrip() {
    var host = $('threshold-strip'), panel = $('threshold-panel');
    var invalid = findInvalidInputs();
    if (invalid.length) return; // leave the last good strip up mid-edit
    var profile;
    try { profile = readProfile(); } catch (e) { return; }
    var cliffs = thresholdCliffs(profile);
    host.innerHTML = cliffs.map(function (c) {
      var over = c.distance < 0;
      var near = !over && c.distance < 15000;
      var cls = over ? 'over' : (near ? 'near' : 'clear');
      return '<div class="cliff-chip ' + cls + '"><span class="cliff-label">' + esc(c.label) + '</span>' +
        '<span class="cliff-value">' + (over ? '−' : '') + usd(Math.abs(c.distance)) +
        (over ? ' OVER' : ' away') + '</span></div>';
    }).join('');
    panel.style.display = '';
  }
  function scheduleThresholdStrip() {
    if (thresholdStripTimer) clearTimeout(thresholdStripTimer);
    thresholdStripTimer = setTimeout(renderThresholdStrip, 250);
  }

  function strategyName(id) {
    var s = TSIQ.STRATEGIES.filter(function (x) { return x.id === id; })[0];
    return s ? s.name : id;
  }

  // Non-blocking hints from declarative conflictsWith/requiresOneOf metadata
  // (see e.g. simple-ira.js, ptet.js) — surfaced at selection time instead of
  // buried in a post-run note, but never blocks Compute.
  function updateConflictBadges(scKey) {
    var checkedIds = TSIQ.STRATEGIES.filter(function (s) {
      return $(scKey + '-' + s.id).checked;
    }).map(function (s) { return s.id; });
    TSIQ.STRATEGIES.forEach(function (s) {
      var badge = $(scKey + '-' + s.id + '-warn');
      if (!$(scKey + '-' + s.id).checked) { badge.style.display = 'none'; return; }
      var msgs = [];
      (s.conflictsWith || []).forEach(function (id) {
        if (checkedIds.indexOf(id) !== -1) msgs.push('Conflicts with ' + strategyName(id) + '.');
      });
      if (s.requiresOneOf && s.requiresOneOf.length &&
          !s.requiresOneOf.some(function (id) { return checkedIds.indexOf(id) !== -1; })) {
        msgs.push('Usually paired with ' + s.requiresOneOf.map(strategyName).join(' or ') +
          ' (skip this if the client already has that income/entity in place).');
      }
      if (msgs.length) {
        badge.textContent = '⚠ ' + msgs.join(' ');
        badge.style.display = 'block';
      } else {
        badge.style.display = 'none';
      }
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

  // Fact overrides let a single scenario model a what-if (different filing
  // status, state, or income level) WITHOUT touching Section 1 or the
  // baseline — the other scenario and the baseline keep the client's actual
  // facts. Blank/empty fields mean "inherit from Section 1".
  var INCOME_OVERRIDE_FIELDS = ['wages', 'scheduleCNet', 'passthroughK1', 'rentalNet',
    'ltcg', 'qualDiv', 'interest', 'otherIncome'];

  function readScenarioOverrides(scKey) {
    var fsEl = $(scKey + '-ov-filingStatus'), rateEl = $(scKey + '-ov-stateRatePct'),
      multEl = $(scKey + '-ov-incomeMultiplier');
    return {
      filingStatus: (fsEl && fsEl.value) || null,
      stateRatePct: (rateEl && rateEl.value !== '') ? parseFloat(rateEl.value) : null,
      incomeMultiplier: (multEl && multEl.value !== '') ? parseFloat(multEl.value) : null
    };
  }

  function applyScenarioOverrides(baseProfile, overrides) {
    if (!overrides.filingStatus && overrides.stateRatePct === null && overrides.incomeMultiplier === null) {
      return baseProfile;
    }
    var p = Object.assign({}, baseProfile);
    if (overrides.filingStatus) p.filingStatus = overrides.filingStatus;
    if (overrides.stateRatePct !== null && isFinite(overrides.stateRatePct)) {
      p.stateRate = overrides.stateRatePct / 100;
    }
    if (overrides.incomeMultiplier !== null && isFinite(overrides.incomeMultiplier)) {
      INCOME_OVERRIDE_FIELDS.forEach(function (k) { p[k] = p[k] * overrides.incomeMultiplier; });
    }
    return p;
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
      ownerWages: num('ownerWages'),
      isSSTB: $('isSSTB').checked,
      rentalNet: num('rentalNet'),
      rentalLossesUsable: $('rentalLossesUsable').checked,
      reNonPassive: $('reNonPassive').checked,
      ltcg: num('ltcg'), shortTermGains: num('shortTermGains'), qualDiv: num('qualDiv'),
      interest: num('interest'), otherIncome: num('otherIncome'),
      ssBenefitsGross: num('ssBenefitsGross'),
      ltcgOneTime: $('ltcgOneTime').checked, otherIncomeOneTime: $('otherIncomeOneTime').checked,
      propertyTax: num('propertyTax'), mortgageInterest: num('mortgageInterest'),
      charitable: num('charitable'), otherItemized: num('otherItemized'),
      kidsCTC: num('kidsCTC'), otherDeps: num('otherDeps'),
      age65Count: num('age65Count'),
      fedWithholding: num('fedWithholding'), fedEstimates: num('fedEstimates'),
      stateWithholding: num('stateWithholding'), stateEstimates: num('stateEstimates'),
      priorYearTax: num('priorYearTax'), priorYearAGI: num('priorYearAGI'),
      stateRate: num('stateRatePct') / 100
    };
  }

  /* ------------------------------ results -------------------------------- */
  // WF4: finite-difference marginal rate on the pure engine. IMPLEMENTATION
  // TRAP (verified): computeYear MUTATES its `state` argument
  // (state.suspendedRentalLoss, etc.) — every call here gets its OWN fresh
  // {} so the "before" computation never leaks into the "after" one.
  function marginalDelta(profile, field, delta) {
    var before = TSIQ.computeYear(profile, {}).totalBurden;
    var bumped = Object.assign({}, profile);
    bumped[field] = (bumped[field] || 0) + delta;
    var after = TSIQ.computeYear(bumped, {}).totalBurden;
    return (after - before) / delta;
  }
  // Effective + marginal rate row values for one result column. Marginal
  // rates are computed off `r.profile` — the POST-strategy profile computeYear
  // itself returns — so a scenario that (say) converts scheduleCNet into
  // passthroughK1 via an S-corp election shows the marginal rate on ITS
  // actual resulting income mix, not the pre-strategy Section 1 entries.
  function rateReadout(r) {
    var p = r.profile;
    var effRate = r.totalIncome > 0 ? r.totalBurden / r.totalIncome : 0;
    var bizRate = marginalDelta(p, 'scheduleCNet', 1000);
    var ltcgRate = marginalDelta(p, 'ltcg', 1000);
    var dedRate = -marginalDelta(p, 'adjustments', 1000); // deduction: negative burden delta -> positive "rate saved"
    return { effRate: effRate, bizRate: bizRate, ltcgRate: ltcgRate, dedRate: dedRate };
  }

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

  // §6654 individual estimated-tax safe harbor: the required annual payment
  // is the SMALLER of 90% of the current year's tax or 100% (110% if prior-
  // year AGI exceeded the high-income threshold) of the prior year's tax —
  // whichever the client can actually use (prior-year figures are optional).
  // Entity-level tax (corpTaxPaid) is excluded — it isn't the individual's
  // liability under §6654.
  var ES_DUE_DATES = [
    { label: 'Apr 15', month: 3, day: 15, yearOffset: 0 },
    { label: 'Jun 15', month: 5, day: 15, yearOffset: 0 },
    { label: 'Sep 15', month: 8, day: 15, yearOffset: 0 },
    { label: 'Jan 15', month: 0, day: 15, yearOffset: 1 }
  ];
  function remainingEsDueDates(taxYear) {
    var today = new Date();
    return ES_DUE_DATES.filter(function (q) {
      return new Date(taxYear + q.yearOffset, q.month, q.day) >= today;
    });
  }
  function computeSafeHarbor(profile, yr1) {
    var currentYearFedTax = Math.max(0, yr1.totalFederal - (yr1.corpTaxPaid || 0));
    var priorYearTax = profile.priorYearTax || 0;
    var highIncomeThreshold = (profile.filingStatus === 'mfs') ? 75000 : 150000;
    var priorYearFactor = (profile.priorYearAGI || 0) > highIncomeThreshold ? 1.10 : 1.00;
    var ninetyCurrent = 0.90 * currentYearFedTax;
    var priorYearSafeHarbor = priorYearTax > 0 ? priorYearFactor * priorYearTax : Infinity;
    var required = Math.max(0, Math.min(ninetyCurrent, priorYearSafeHarbor));
    var method = (priorYearSafeHarbor <= ninetyCurrent)
      ? (priorYearFactor === 1.10 ? '110% of prior-year tax' : '100% of prior-year tax')
      : '90% of current-year tax';
    var alreadyPaid = (profile.fedWithholding || 0) + (profile.fedEstimates || 0);
    var remaining = Math.max(0, required - alreadyPaid);
    var dueDates = remainingEsDueDates(TSIQ.TABLES_2026.taxYear);
    return {
      required: required, method: method, alreadyPaid: alreadyPaid, remaining: remaining,
      dueDates: dueDates, perInstallment: dueDates.length ? remaining / dueDates.length : 0
    };
  }

  function renderResults(run) {
    var base = run.baseline.years[0];
    var cols = [{ label: 'Baseline', r: base }].concat(run.scenarios.map(function (sc) {
      return { label: sc.label, r: sc.result.years[0] };
    }));

    // Headline KPIs from the best scenario
    var best = TSIQ.bestScenario(run.scenarios);
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

    // WF6: scenario diff strip, beside the results table too (not just above
    // Run Comparison) — computed fresh off the CURRENT builder selections,
    // which is safe here since renderResults always runs immediately after
    // compute() reads those same selections into `run`.
    var diffText = run.scenarios.length > 1 ? scenarioDiffText() : '';
    if (diffText) {
      html += '<div class="scenario-diff results-diff">' + esc(diffText) + '</div>';
    }

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
      '<div class="table-scroll"><table class="results-table"><thead><tr><th></th>' +
      cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + detailRows(cols) +
      '<tr class="total-row"><td>Total tax burden</td>' + cols.map(function (c) {
        return '<td>' + usd(c.r.totalBurden) + '</td>';
      }).join('') + '</tr>' +
      '<tr><td>Effective rate (burden &divide; total income)</td>' + cols.map(function (c) {
        return '<td>' + TSIQ.fmt.pct(rateReadout(c.r).effRate) + '</td>';
      }).join('') + '</tr>' +
      '<tr title="Finite-difference &Delta;burden per +$1,000, off this column\'s own resulting income mix"><td>Marginal rate (next $1,000: biz / LTCG / deduction)</td>' + cols.map(function (c) {
        var rr = rateReadout(c.r);
        return '<td style="white-space:nowrap">' + TSIQ.fmt.pct(rr.bizRate) + ' / ' +
          TSIQ.fmt.pct(rr.ltcgRate) + ' / ' + TSIQ.fmt.pct(rr.dedRate) + '</td>';
      }).join('') + '</tr>' +
      '<tr class="savings-row"><td>Savings vs. baseline</td>' + cols.map(function (c, i) {
        return '<td>' + (i === 0 ? '—' : usd(base.totalBurden - c.r.totalBurden)) + '</td>';
      }).join('') + '</tr>' +
      '<tr><td>Payments to date (W/H + estimates)</td>' + cols.map(function (c) {
        return '<td>' + usd(-c.r.totalPayments) + '</td>';
      }).join('') + '</tr>' +
      '<tr class="due-row"><td>Estimated remaining balance due</td>' + cols.map(function (c) {
        return '<td>' + usd(c.r.totalBalanceDue) + '</td>';
      }).join('') + '</tr></tbody></table></div>';

    // §6654 safe-harbor quarterly estimates — one column per scenario, same
    // "Baseline / Scenario N" layout as the comparison table above.
    var esDueDates = remainingEsDueDates(TSIQ.TABLES_2026.taxYear);
    html += '<h3>Federal Quarterly Estimates (§6654 Safe Harbor)</h3>' +
      '<div class="table-scroll"><table class="results-table"><thead><tr><th></th>' +
      cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>' +
      [
        ['Required annual payment', function (sh) { return usd(sh.required); }],
        ['Safe-harbor method used', function (sh) { return sh.method; }],
        ['Less: withholding + estimates paid', function (sh) { return usd(-sh.alreadyPaid); }],
        ['Remaining to pay via estimates', function (sh) { return usd(sh.remaining); }],
        [esDueDates.length
          ? 'Per remaining installment (&times;' + esDueDates.length + ': ' +
            esDueDates.map(function (q) { return q.label; }).join(', ') + ')'
          : 'Per remaining installment (no installments left this tax year)',
          function (sh) { return usd(sh.perInstallment); }]
      ].map(function (line) {
        return '<tr><td>' + line[0] + '</td>' + cols.map(function (c) {
          return '<td>' + line[1](computeSafeHarbor(run.profile, c.r)) + '</td>';
        }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>' +
      '<p class="hint" style="color:var(--muted);font-size:13px;margin:-8px 0 20px">' +
      'Federal only (IRC §6654); ignores any withholding/estimates already reflected above as ' +
      'paid mid-quarter. Enter prior-year total tax and AGI above to unlock the 100%/110% test — ' +
      'without it, only the 90%-of-current-year test applies.</p>';

    // multi-year projection
    html += '<h3>' + run.years + '-Year Projection (' + (run.growthRate * 100).toFixed(1) +
      '% annual income growth)</h3>' +
      '<div class="table-scroll"><table class="results-table"><thead><tr><th>Year</th><th>Baseline</th>' +
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
    html += '</tr></tbody></table></div>';

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
    html += '<p class="fine-print">' + (isLawStale() ? '<strong>This tool models ' +
      TSIQ.TABLES_2026.taxYear + ' tax law, which is no longer the current tax year — every ' +
      'figure below needs new tables before it can be relied on.</strong> ' : '') +
      '2026 federal figures per Rev. Proc. 2025-32 as amended by OBBBA. ' +
      'Projection years apply enacted sunset-dated law as it actually expires (e.g. the OBBBA ' +
      'senior deduction after 2028, the enhanced SALT cap after 2029) but every bracket, ' +
      'threshold, and breakpoint stays at its 2026 DOLLAR figure — none of it is inflation-' +
      'indexed forward, so later-year figures are illustrative, not indexed projections. ' +
      'State tax modeled at a flat effective rate (an optional entity-level rate can be added on ' +
      'top for the C-corp/S-corp strategies, and a nonconforming-state add-back for QSBS — both ' +
      'still simplified, not apportioned multi-state computations). Rental income does not enter ' +
      'the §199A QBI calculation, and QBI\'s 25%-wage/2.5%-UBIA alternative limitation is not ' +
      'modeled (only the 50%-of-wages prong). AMT and depreciation recapture on sale are not ' +
      'modeled — see the README Scope Notes. §461(l) excess business loss IS modeled as a real ' +
      'disallowance and NOL carryforward (flagged above in Planning Notes whenever it applies); ' +
      'Medicare IRMAA surcharges for 65+ clients are flagged as a note only (a premium impact, ' +
      'not a tax, and not included in the totals above).</p>';

    $('results').innerHTML = html;
    $('output-actions').style.display = 'flex';
    animateResults();
  }

  // Count-up on KPI values + grow-in on chart bars. Pure presentation —
  // the final numbers are already in the DOM as fallback text.
  function animateResults() {
    var values = document.querySelectorAll('#results .kpi-value[data-target]');
    var bars = document.querySelectorAll('#results .bar-fill[data-width]');
    if (prefersReducedMotion()) {
      for (var vi = 0; vi < values.length; vi++) {
        values[vi].textContent = TSIQ.fmt.usd(parseFloat(values[vi].getAttribute('data-target')));
      }
      for (var bi = 0; bi < bars.length; bi++) {
        bars[bi].style.width = bars[bi].getAttribute('data-width') + '%';
      }
      return;
    }
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
      var profileA = applyScenarioOverrides(profile, readScenarioOverrides('sc2'));
      scenarios.push({
        label: $('sc2-label').value || 'Scenario 2',
        selections: selA,
        strategies: selA.map(function (s) { return s.strategy; }),
        profile: profileA,
        result: TSIQ.computeScenario(profileA, selA, years, growthRate)
      });
    }
    var selB = readSelections('sc3');
    if (selB.length) {
      var profileB = applyScenarioOverrides(profile, readScenarioOverrides('sc3'));
      scenarios.push({
        label: $('sc3-label').value || 'Scenario 3',
        selections: selB,
        strategies: selB.map(function (s) { return s.strategy; }),
        profile: profileB,
        result: TSIQ.computeScenario(profileB, selB, years, growthRate)
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
    scrollTo($('results-section'));
  }

  /* --------------------- client file import / export --------------------- */
  // Format documented in docs/client-file-format.md (tsiq-client-v1). Also
  // used as the autosave/restore payload (SESSION_KEY) — same serialize/
  // apply pair, so the two stay consistent.
  var PROFILE_FIELD_IDS = ['filingStatus', 'wages', 'scheduleCNet', 'passthroughK1',
    'entityW2Wages', 'ownerWages', 'rentalNet', 'ltcg', 'shortTermGains', 'qualDiv',
    'interest', 'otherIncome', 'ssBenefitsGross',
    'propertyTax', 'mortgageInterest', 'charitable', 'otherItemized',
    'kidsCTC', 'otherDeps', 'age65Count', 'fedWithholding', 'fedEstimates',
    'stateWithholding', 'stateEstimates', 'priorYearTax', 'priorYearAGI',
    'stateRatePct', 'years', 'growthPct'];
  var PROFILE_CHECKBOX_IDS = ['isSSTB', 'rentalLossesUsable', 'reNonPassive',
    'ltcgOneTime', 'otherIncomeOneTime'];
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
        overrides: readScenarioOverrides(scKey),
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
      var ov = sc.overrides;
      if (ov) {
        if ($(sc.key + '-ov-filingStatus') && ov.filingStatus) {
          $(sc.key + '-ov-filingStatus').value = ov.filingStatus;
        }
        if ($(sc.key + '-ov-stateRatePct') && ov.stateRatePct !== null && ov.stateRatePct !== undefined) {
          $(sc.key + '-ov-stateRatePct').value = ov.stateRatePct;
        }
        if ($(sc.key + '-ov-incomeMultiplier') && ov.incomeMultiplier !== null && ov.incomeMultiplier !== undefined) {
          $(sc.key + '-ov-incomeMultiplier').value = ov.incomeMultiplier;
        }
      }
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
        scrollTo($('sc2-strategies'));
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
      // WF7: snapshot before this destructive bulk operation so it's undoable.
      pushUndoSnapshot();
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
    otherIncome: 'Other income', ssBenefitsGross: 'Social Security benefits (gross)',
    propertyTax: 'Property tax',
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
        html += '<div class="field"><label for="pdfr-filingStatus">' + PDF_FIELD_LABELS[k] + '</label>' +
          '<select id="pdfr-filingStatus">' +
          ['mfj', 'single', 'hoh', 'mfs'].map(function (s) {
            return '<option value="' + s + '"' + (f.filingStatus === s ? ' selected' : '') + '>' +
              esc(TSIQ.FILING_STATUS_LABELS[s]) + '</option>';
          }).join('') + '</select></div>';
      } else {
        html += '<div class="field"><label for="pdfr-' + k + '">' + PDF_FIELD_LABELS[k] + '</label>' +
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
      html += '<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:var(--accent-text);margin-bottom:8px">Cross-check — what the return itself says</h3>' +
        '<table class="results-table" style="margin-bottom:16px"><tbody>' +
        refRows.map(function (r) {
          return '<tr><td>' + esc(r[0]) + '</td><td>' + usd(r[1]) + '</td></tr>';
        }).join('') + '</tbody></table>';
    }

    // Tie-out: sum the parsed income fields and compare against the
    // return's own line 9 (total income) — the one arithmetic check that
    // would catch most mis-mapped or dropped values automatically. Social
    // Security is imported as a GROSS amount (see EN1/ssBenefitsGross), so
    // its taxable share is ESTIMATED here the same way the engine will
    // compute it, rather than the return's own (possibly prior-year-law)
    // taxable figure — a source of small, expected drift when SS is present.
    if (ref.totalIncome !== null && ref.totalIncome !== undefined) {
      var parsedTotalExclSS = (f.wages || 0) + (f.interest || 0) + (f.qualDiv || 0) +
        (f.scheduleCNet || 0) + (f.rentalNet || 0) + (f.passthroughK1 || 0) +
        (f.ltcg || 0) + (f.otherIncome || 0);
      var estimatedSSTaxable = TSIQ.taxableSocialSecurity(
        f.filingStatus, parsedTotalExclSS, f.ssBenefitsGross || 0);
      var parsedTotal = parsedTotalExclSS + estimatedSSTaxable;
      var diff = parsedTotal - ref.totalIncome;
      var tieTolerance = 2;
      html += '<div style="margin-bottom:16px;padding:10px 14px;border-radius:8px;' +
        (Math.abs(diff) > tieTolerance ? 'background:color-mix(in srgb, var(--red) 10%, transparent);color:var(--red);'
          : 'background:var(--green-soft);color:var(--green);') +
        'font-size:13px;font-weight:600">' +
        'Parsed income total: ' + usd(parsedTotal) + ' vs. return line 9: ' + usd(ref.totalIncome) +
        ' — difference ' + usd(diff) +
        (Math.abs(diff) > tieTolerance
          ? ' (does not tie — some income (adjustments, un-mapped Schedule 1 lines) may not be ' +
            'captured; review before applying' +
            (f.ssBenefitsGross ? '; Social Security\'s taxable share here is an ESTIMATE and can ' +
              'differ slightly from the return\'s own figure' : '') + ')'
          : ' (ties out)') +
        '</div>';
    }

    if (result.warnings.length) {
      html += '<h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.8px;color:var(--accent-text);margin-bottom:8px">Review notes</h3>' +
        '<ul class="notes" style="margin-bottom:18px">' +
        result.warnings.map(function (w) { return '<li>' + esc(w) + '</li>'; }).join('') + '</ul>';
    }

    html += '<div class="actions"><button class="primary" id="pdfr-apply">Apply to Client Data</button></div>';

    $('pdf-review-body').innerHTML = html;
    $('pdf-review-modal').showModal();
    $('pdfr-apply').addEventListener('click', function () {
      // WF7: snapshot before this destructive bulk operation so it's undoable.
      pushUndoSnapshot();
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
      // This imported return IS the prior year's filed return — its own
      // reported total tax / AGI (already used above for the tie-out) are
      // exactly the §6654 safe-harbor inputs, so carry them over too.
      var ref = result.reference;
      if (ref.totalTax !== null && ref.totalTax !== undefined) $('priorYearTax').value = Math.round(ref.totalTax);
      if (ref.agi !== null && ref.agi !== undefined) $('priorYearAGI').value = Math.round(ref.agi);
      $('pdf-review-modal').close();
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

  // Lazy-load the vendored pdf.js — it's the largest asset in the app and
  // most sessions never import a PDF. Injected as plain <script> tags (not
  // a Worker thread) so file:// use keeps working; cached so repeat imports
  // in the same session don't re-inject.
  var pdfJsLoadPromise = null;
  function loadPdfJs() {
    if (pdfJsLoadPromise) return pdfJsLoadPromise;
    if (window.pdfjsLib) { pdfJsLoadPromise = Promise.resolve(); return pdfJsLoadPromise; }
    pdfJsLoadPromise = new Promise(function (resolve, reject) {
      var libScript = document.createElement('script');
      libScript.src = 'js/vendor/pdf.min.js';
      libScript.onload = function () {
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'js/vendor/pdf.worker.min.js';
        var workerScript = document.createElement('script');
        workerScript.src = 'js/vendor/pdf.worker.min.js';
        workerScript.onload = resolve;
        workerScript.onerror = function () { reject(new Error('Could not load pdf.worker.min.js')); };
        document.body.appendChild(workerScript);
      };
      libScript.onerror = function () { reject(new Error('Could not load pdf.min.js')); };
      document.body.appendChild(libScript);
    });
    return pdfJsLoadPromise;
  }

  function importReturnPdf(file) {
    var reader = new FileReader();
    reader.onerror = function () {
      alert('Could not read that file from disk — try again, or a different file.');
    };
    reader.onload = function () {
      loadPdfJs()
        .then(function () { return TSIQ.parseReturnPdf(new Uint8Array(reader.result)); })
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
        for (var b = 0; b < btns.length; b++) {
          btns[b].classList.remove('active');
          btns[b].setAttribute('aria-selected', 'false');
        }
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        var pages = document.querySelectorAll('.tab-page');
        for (var p = 0; p < pages.length; p++) pages[p].style.display = 'none';
        $(e.currentTarget.getAttribute('data-tab')).style.display = '';
        window.scrollTo(0, 0);
      });
    }
    $('lib-count').textContent = '(' + TSIQ.STRATEGIES.length + ')';
  }

  // TSIQ.STRATEGIES is a load-time snapshot of TSIQ.strategyModules taken by
  // strategies-index.js — any strategy <script> tag placed after that point
  // in index.html would push to strategyModules but never appear in
  // STRATEGIES, silently vanishing from the library with no error. Catch
  // that class of load-order mistake immediately instead of a quiet gap.
  function checkStrategySnapshotDrift() {
    var pushed = (TSIQ.strategyModules || []).length;
    var loaded = (TSIQ.STRATEGIES || []).length;
    if (pushed !== loaded) {
      console.error('TSIQ.STRATEGIES (' + loaded + ') does not match TSIQ.strategyModules (' +
        pushed + ') — a strategy <script> tag likely loads after js/data/strategies-index.js ' +
        'in index.html and is silently missing from the app. Run node scripts/build-index.js.');
    }
  }

  // If the calendar year has moved past the tax year these tables model,
  // every figure this app produces is silently wrong (2026 law/brackets
  // applied to what should be a 2027+ return). isLawStale() is exported so
  // renderers can append the same warning to their own disclaimers.
  function isLawStale() {
    return new Date().getFullYear() > TSIQ.TABLES_2026.taxYear;
  }
  TSIQ.isLawStale = isLawStale;
  function checkLawStaleness() {
    if (!isLawStale()) return;
    var banner = $('law-staleness-banner');
    banner.textContent = 'This tool models ' + TSIQ.TABLES_2026.taxYear + ' tax law. It is now ' +
      new Date().getFullYear() + ' — confirm js/data/tax-tables-2026.js has been updated for the ' +
      'current tax year before relying on any figure below.';
    banner.style.display = 'block';
  }

  // Number inputs change value on mouse-wheel scroll while focused — a
  // real hazard on a long form the advisor scrolls with the mouse over
  // fields. Blur on wheel (delegated so it covers dynamically-built
  // scenario param inputs too) so scrolling the page never silently
  // changes a number.
  document.addEventListener('wheel', function (e) {
    if (e.target && e.target.matches && e.target.matches('input[type=number]') &&
        document.activeElement === e.target) {
      e.target.blur();
    }
  }, { passive: true });

  document.addEventListener('DOMContentLoaded', function () {
    initBrand();
    checkStrategySnapshotDrift();
    checkLawStaleness();
    initTabs();
    buildLibrary();
    buildScenarioPicker('sc2', 'sc2-strategies');
    buildScenarioPicker('sc3', 'sc3-strategies');
    captureFormDefaults();

    $('tab-builder').addEventListener('input', markFormChanged);
    $('tab-builder').addEventListener('change', markFormChanged);
    // WF1: any Section 1 or scenario-builder edit can change the live
    // per-strategy savings preview — re-run it (debounced) for both boxes.
    // Param-field edits inside a scenario box only affect that one scenario,
    // but Section 1 edits affect both, so keep this simple and refresh both.
    $('tab-builder').addEventListener('input', function () {
      scheduleLivePreview('sc2'); scheduleLivePreview('sc3');
    });
    $('tab-builder').addEventListener('change', function () {
      scheduleLivePreview('sc2'); scheduleLivePreview('sc3');
    });
    // WF3: threshold-proximity strip — refresh on any Section 1 (or
    // scenario-builder — harmless, just redundant) edit, and render once at
    // load against whatever Section 1 already has (its own defaults).
    $('tab-builder').addEventListener('input', scheduleThresholdStrip);
    $('tab-builder').addEventListener('change', scheduleThresholdStrip);
    renderThresholdStrip();
    // WF5: surface suggest() inside the picker itself (badges + auto-open
    // categories), not just the Section-1-level suggestions panel.
    $('tab-builder').addEventListener('input', schedulePickerSuggestions);
    $('tab-builder').addEventListener('change', schedulePickerSuggestions);
    updatePickerSuggestions('sc2'); updatePickerSuggestions('sc3');
    // WF6: scenario diff strip — refresh on any builder edit.
    $('tab-builder').addEventListener('input', scheduleScenarioDiff);
    $('tab-builder').addEventListener('change', scheduleScenarioDiff);
    renderScenarioDiff();
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
    $('copy-sc2-to-sc3').addEventListener('click', function () {
      // WF7: snapshot before this destructive bulk operation (it wipes out
      // whatever was already in Scenario 3) so it's undoable.
      pushUndoSnapshot();
      TSIQ.STRATEGIES.forEach(function (s) {
        var box = $('sc3-' + s.id);
        if (box && box.checked) box.click();
      });
      readSelections('sc2').forEach(function (sel) {
        var box = $('sc3-' + sel.strategy.id);
        if (!box) return;
        if (!box.checked) box.click();
        Object.keys(sel.params).forEach(function (k) {
          var input = $('sc3-' + sel.strategy.id + '-' + k);
          if (input) input.value = sel.params[k];
        });
        var det = box.closest('details'); if (det) det.open = true;
      });
      $('sc3-ov-filingStatus').value = $('sc2-ov-filingStatus').value;
      $('sc3-ov-stateRatePct').value = $('sc2-ov-stateRatePct').value;
      $('sc3-ov-incomeMultiplier').value = $('sc2-ov-incomeMultiplier').value;
      markFormChanged({});
      scrollTo($('sc3-strategies'));
    });
    $('btn-pdf').addEventListener('click', function () {
      if (lastRun) TSIQ.render.clientReport(lastRun);
    });
    $('btn-slides').addEventListener('click', function () {
      if (lastRun) TSIQ.render.slideshow(lastRun);
    });
    $('btn-import-pdf').addEventListener('click', function () {
      // Kick off the (cached) load now so it's ready by the time a file is
      // picked; a failure here surfaces properly via importReturnPdf's own
      // catch once a file is actually chosen — swallow it here to avoid a
      // duplicate unhandled-rejection warning for this speculative call.
      loadPdfJs().catch(function () {});
      $('import-pdf-file').click();
    });
    $('import-pdf-file').addEventListener('change', function (e) {
      if (e.target.files && e.target.files[0]) importReturnPdf(e.target.files[0]);
      e.target.value = '';
    });
    $('pdf-review-close').addEventListener('click', function () { $('pdf-review-modal').close(); });
    $('pdf-review-modal').addEventListener('click', function (e) {
      if (e.target === $('pdf-review-modal')) $('pdf-review-modal').close();
    });
    $('btn-suggest').addEventListener('click', function () { runSuggestions(); });
    $('btn-undo').addEventListener('click', undoLast);
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
