/* ============================================================================
 * CLIENT REPORT RENDERER — plain-language, print-to-PDF document.
 * Opens a print-optimized window; the user saves it as PDF from the browser
 * print dialog. Reads client-facing content from the same strategy objects.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.render = TSIQ.render || {};

(function () {
  var esc = function (s) { return TSIQ.esc(s); };
  var usd = function (n) { return TSIQ.fmt.usd(n); };
  var usdApprox = function (n) { return TSIQ.fmt.usdApprox(n); }; // ET7 — headline figures only

  var REPORT_CSS = '' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    'body{font-family:Georgia,"Times New Roman",serif;color:#1a2332;line-height:1.55;font-size:12pt}' +
    '.page{padding:0.9in 0.85in;page-break-after:always}' +
    '.page:last-child{page-break-after:auto}' +
    '.cover{display:flex;flex-direction:column;justify-content:center;min-height:9in;text-align:center}' +
    '.cover .firm{font-size:13pt;letter-spacing:3px;text-transform:uppercase;color:%ACCENT_TEXT%;margin-bottom:24px}' +
    '.cover h1{font-size:30pt;font-weight:normal;margin-bottom:12px}' +
    '.cover .client{font-size:17pt;color:#445;margin-bottom:40px}' +
    '.cover .date{color:#667;font-size:11pt}' +
    'h2{font-size:18pt;font-weight:normal;border-bottom:2px solid ' + TSIQ.DEFAULT_BRAND_COLOR + ';padding-bottom:6px;margin-bottom:16px}' +
    'h3{font-size:13pt;margin:16px 0 8px;color:#2c3e50}' +
    'p{margin-bottom:10px}' +
    'ul{margin:6px 0 12px 22px}li{margin-bottom:5px}' +
    '.headline{font-size:15pt;color:%ACCENT_TEXT%;font-style:italic;margin-bottom:12px}' +
    '.analogy{background:#f7f4ee;border-left:4px solid ' + TSIQ.DEFAULT_BRAND_COLOR + ';padding:12px 16px;margin:14px 0;font-style:italic}' +
    'table{width:100%;border-collapse:collapse;margin:12px 0;font-size:10.5pt}' +
    'th,td{padding:7px 10px;border-bottom:1px solid #d8d8d8;text-align:right}' +
    'th:first-child,td:first-child{text-align:left}' +
    'thead th{border-bottom:2px solid #1a2332;font-family:Arial,sans-serif;font-size:9.5pt;text-transform:uppercase;letter-spacing:0.5px}' +
    '.total-row td{border-top:2px solid #1a2332;border-bottom:none;font-weight:bold}' +
    '.savings{color:#1e7e34;font-weight:bold}' +
    '.due-row td{color:#a3372b;font-weight:bold}' +
    '.big-number{text-align:center;margin:26px 0}' +
    '.big-number .amount{font-size:34pt;color:#1e7e34}' +
    '.big-number .label{font-family:Arial,sans-serif;font-size:10pt;text-transform:uppercase;letter-spacing:1.5px;color:#667}' +
    '.disclaimer{font-size:9pt;color:#778;border-top:1px solid #ccc;padding-top:10px;margin-top:26px}' +
    // @page sets the sheet margin explicitly so the deliverable doesn't
    // depend on whatever margin setting the browser's print dialog happens
    // to have (commonly "None" when saving to PDF, which previously left
    // only 0.15in of margin); table/tr avoid breaking mid-row across pages.
    '@page{size:letter;margin:0.75in}' +
    '@media print{.page{padding:0}' +
    'table{page-break-inside:auto;break-inside:auto}' +
    'tr{page-break-inside:avoid;break-inside:avoid}}';

  // Brand-aware print CSS + logo block (Brand Settings flow through here).
  // Sink-side validation/escaping — defense-in-depth on top of the
  // brand-settings load/save validation in app.js (sanitizeBrand).
  function safeBrandColor() {
    var color = TSIQ.brand && TSIQ.brand.color;
    return (typeof color === 'string' && /^#[0-9a-fA-F]{6}$/.test(color)) ? color : TSIQ.DEFAULT_BRAND_COLOR;
  }
  // WCAG relative luminance -> darken a too-light brand color until it
  // reads at roughly 4.5:1 contrast as TEXT on this report's white page.
  // Mirrors app.js's readableAccentText(); duplicated because this renderer
  // runs in its own popup window with no shared module to import from.
  function readableAccentText(hex) {
    function lin(c) { return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }
    function luminance(r, g, b) { return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }
    var r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255,
      b = parseInt(hex.slice(5, 7), 16) / 255;
    var THRESHOLD = 0.18;
    for (var i = 0; i < 12 && luminance(r, g, b) > THRESHOLD; i++) { r *= 0.88; g *= 0.88; b *= 0.88; }
    function toHex(c) {
      var h = Math.round(Math.max(0, Math.min(1, c)) * 255).toString(16);
      return h.length < 2 ? '0' + h : h;
    }
    return '#' + toHex(r) + toHex(g) + toHex(b);
  }
  function brandCss() {
    var color = safeBrandColor();
    return REPORT_CSS.split(TSIQ.DEFAULT_BRAND_COLOR).join(color).split('%ACCENT_TEXT%').join(readableAccentText(color));
  }
  function brandLogoBlock(marginBottom) {
    var logo = TSIQ.brand && TSIQ.brand.logo;
    if (typeof logo !== 'string' || !/^data:image\/(png|jpe?g|gif|webp);base64,/.test(logo)) return '';
    return '<img src="' + esc(logo) + '" style="max-height:64px;max-width:220px;display:block;margin:0 auto ' +
      (marginBottom || '18px') + '" alt="">';
  }

  function comparisonTable(baseline, scenarios) {
    var cols = [{ label: 'Baseline (No Strategies)', r: baseline.years[0] }]
      .concat(scenarios.map(function (sc) { return { label: sc.label, r: sc.result.years[0] }; }));
    var rows = [
      ['Federal income tax', 'incomeTax'],
      ['Self-employment / payroll tax', function (r) {
        return r.seTax + r.ownerPayrollTax + r.addlMedicare + r.otherTaxes - r.excessSSCredit;
      }],
      ['Net investment income tax', 'niit'],
      ['Business entity-level tax', 'corpTaxPaid'],
      ['State tax (incl. entity-level)', 'totalState']
    ];
    var html = '<table><thead><tr><th>First-Year Tax (2026)</th>' +
      cols.map(function (c) { return '<th>' + esc(c.label) + '</th>'; }).join('') +
      '</tr></thead><tbody>';
    rows.forEach(function (row) {
      html += '<tr><td>' + esc(row[0]) + '</td>' + cols.map(function (c) {
        var v = typeof row[1] === 'function' ? row[1](c.r) : c.r[row[1]];
        return '<td>' + usd(v) + '</td>';
      }).join('') + '</tr>';
    });
    html += '<tr class="total-row"><td>Total tax</td>' + cols.map(function (c) {
      return '<td>' + usd(c.r.totalBurden) + '</td>';
    }).join('') + '</tr>';
    html += '<tr><td class="savings">Your savings vs. baseline</td>' + cols.map(function (c, i) {
      return '<td class="savings">' + (i === 0 ? '—' : usd(baseline.years[0].totalBurden - c.r.totalBurden)) + '</td>';
    }).join('') + '</tr>';
    // Payments already made & what's left to pay — so the client always knows
    // what to expect for the current year, plan or no plan.
    var anyPayments = cols.some(function (c) { return c.r.totalPayments > 0; });
    if (anyPayments) {
      html += '<tr><td>Payments you’ve already made</td>' + cols.map(function (c) {
        return '<td>' + usd(-c.r.totalPayments) + '</td>';
      }).join('') + '</tr>';
    }
    html += '<tr class="due-row"><td>Estimated remaining to pay</td>' + cols.map(function (c) {
      return '<td>' + usd(c.r.totalBalanceDue) + '</td>';
    }).join('') + '</tr>';
    return html + '</tbody></table>';
  }

  function projectionTable(baseline, scenarios, years) {
    var html = '<table><thead><tr><th>Year</th><th>Baseline</th>' +
      scenarios.map(function (sc) {
        return '<th>' + esc(sc.label) + '</th><th>Savings</th>';
      }).join('') + '</tr></thead><tbody>';
    var cum = scenarios.map(function () { return 0; });
    for (var y = 0; y < years; y++) {
      var b = baseline.years[y].totalBurden;
      html += '<tr><td>' + baseline.years[y].taxYear + '</td><td>' + usd(b) + '</td>';
      scenarios.forEach(function (sc, i) {
        var v = sc.result.years[y].totalBurden;
        cum[i] += (b - v);
        html += '<td>' + usd(v) + '</td><td class="savings">' + usd(b - v) + '</td>';
      });
      html += '</tr>';
    }
    html += '<tr class="total-row"><td>Cumulative</td><td>' + usd(baseline.totals.totalBurden) + '</td>';
    scenarios.forEach(function (sc, i) {
      html += '<td>' + usd(sc.result.totals.totalBurden) + '</td><td class="savings">' + usd(cum[i]) + '</td>';
    });
    return html + '</tr></tbody></table>';
  }

  function formatParamValue(input, value) {
    if (input.type === 'currency') return usd(value);
    if (input.type === 'percent') return value + '%';
    if (input.type === 'select' && input.options) {
      var opt = input.options.filter(function (o) { return o.value === value; })[0];
      return opt ? opt.label : value;
    }
    return value;
  }

  // Reproduces every number in this report from its own inputs — the client's
  // data as entered, plus the exact parameters behind each recommended
  // strategy in the plan (workpaper defensibility; nothing here is derived).
  function assumptionsPage(data, best) {
    var p = data.profile;
    // This page goes to the client. A profile field that is absent (an older
    // client file, a programmatically built profile) must print as $0, the way
    // the engine itself treats it via computeYear()'s defaults — never as
    // "$NaN" or "undefined" in a document with the firm's name on it.
    var n = function (v) { return (typeof v === 'number' && isFinite(v)) ? v : 0; };
    var usdSafe = function (v) { return usd(n(v)); };
    var pctSafe = function (v) { return TSIQ.fmt.pct(n(v)); };
    var profileRows = [
      ['Filing status', TSIQ.FILING_STATUS_LABELS[p.filingStatus] || p.filingStatus || '—'],
      ['W-2 wages', usdSafe(p.wages)],
      ['Schedule C net profit', usdSafe(p.scheduleCNet)],
      ['K-1 ordinary income (pass-through)', usdSafe(p.passthroughK1)],
      ['Specified service trade or business (SSTB)', p.isSSTB ? 'Yes' : 'No'],
      ['Rental net income / (loss)', usdSafe(p.rentalNet)],
      ['Real estate professional / non-passive', p.reNonPassive ? 'Yes' : 'No'],
      ['Long-term capital gains', usdSafe(p.ltcg)],
      ['Qualified dividends', usdSafe(p.qualDiv)],
      ['Interest income', usdSafe(p.interest)],
      ['Other income', usdSafe(p.otherIncome)],
      ['Property tax', usdSafe(p.propertyTax)],
      ['Mortgage interest', usdSafe(p.mortgageInterest)],
      ['Charitable contributions', usdSafe(p.charitable)],
      ['Other itemized deductions', usdSafe(p.otherItemized)],
      ['Qualifying children (Child Tax Credit)', n(p.kidsCTC)],
      ['Other dependents', n(p.otherDeps)],
      ['Filer/spouse age 65+ (count)', n(p.age65Count)],
      ['State effective tax rate', pctSafe(p.stateRate)],
      ['Assumed annual income growth', pctSafe(data.growthRate)],
      ['Projection horizon', n(data.years) + ' years']
    ];
    if (p.priorYearTax) profileRows.push(['Prior-year total tax (safe-harbor basis)', usd(p.priorYearTax)]);
    if (p.priorYearAGI) profileRows.push(['Prior-year AGI (safe-harbor basis)', usd(p.priorYearAGI)]);

    var stratRows = best.selections.map(function (sel) {
      // Resolve through the same defaulting the scenario engine applied, so a
      // param the caller omitted (and the engine therefore supplied from the
      // strategy's declared default) still appears here. Omitting it would
      // leave an input that DID move the numbers off the workpaper page.
      var used = TSIQ.resolveStrategyParams
        ? TSIQ.resolveStrategyParams(sel.strategy, sel.params)
        : (sel.params || {});
      var paramStrs = (sel.strategy.inputs || []).map(function (inp) {
        if (used[inp.key] === undefined) return null;
        return esc(inp.label) + ': ' + esc(String(formatParamValue(inp, used[inp.key])));
      }).filter(function (s) { return s !== null; });
      return '<tr><td>' + esc(sel.strategy.name) + '</td><td>' + (paramStrs.join('; ') || '&mdash;') + '</td></tr>';
    }).join('');

    return '<div class="page">' +
      '<h2>Data &amp; Assumptions</h2>' +
      '<p>For your records and ours — the figures behind every number in this report, so it can always ' +
      'be reproduced or checked against the numbers on file.</p>' +
      '<h3>Client data as entered</h3><table><tbody>' +
      profileRows.map(function (r) {
        return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(String(r[1])) + '</td></tr>';
      }).join('') + '</tbody></table>' +
      (best.selections.length
        ? '<h3>Strategy parameters (' + esc(best.label) + ')</h3><table><tbody>' + stratRows + '</tbody></table>'
        : '') +
      '<div class="disclaimer">Tax Strategy Planner v' + TSIQ.APP_VERSION + '</div>' +
      '</div>';
  }

  function strategyPage(strategy) {
    var c = strategy.client;
    return '<div class="page">' +
      '<h2>' + esc(strategy.name) + '</h2>' +
      '<p class="headline">' + esc(c.headline) + '</p>' +
      c.plainEnglish.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') +
      (c.analogy ? '<div class="analogy">' + esc(c.analogy) + '</div>' : '') +
      '<h3>What this means for you</h3><ul>' +
      c.benefits.map(function (b) { return '<li>' + esc(b) + '</li>'; }).join('') + '</ul>' +
      '<h3>How we make it happen</h3><ul>' +
      c.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
      '<h3>Things to know</h3><ul>' +
      c.considerations.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ul>' +
      '</div>';
  }

  /**
   * Single-strategy client handout — opened from a library card. Same
   * client-facing content the full report uses, as a standalone one-pager
   * the advisor can print to PDF and hand out (no client numbers required).
   */
  TSIQ.render.strategyHandout = function (strategy, firmName) {
    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<title>' + esc(strategy.name) + ' — Client Handout</title>' +
      '<style>' + brandCss() + '</style></head><body>' +
      '<div class="page">' +
      '<div style="text-align:center;margin-bottom:22px">' + brandLogoBlock('10px') +
      '<div style="font-size:11pt;letter-spacing:3px;text-transform:uppercase;color:' +
      readableAccentText(safeBrandColor()) + '">' +
      esc(firmName) + '</div></div>' +
      strategyPage(strategy).replace('<div class="page">', '<div>') +
      '<div class="disclaimer">This overview is educational and describes a strategy in general terms. ' +
      'Whether it fits your situation — and what it is worth — depends on your full tax picture, which ' +
      'we evaluate as part of your plan. ' + esc(firmName) + ' handles eligibility, implementation, and ' +
      'documentation requirements with you.</div>' +
      '</div></body></html>';

    TSIQ.render.openWindow(html, { print: true });
  };

  /**
   * data: { clientName, firmName, baseline, scenarios: [{label, result, strategies:[strategyObj]}], years }
   */
  TSIQ.render.clientReport = function (data) {
    var best = TSIQ.bestScenario(data.scenarios, data.forcedWinnerLabel);
    var firstYearSavings = data.baseline.years[0].totalBurden - best.result.years[0].totalBurden;
    var cumSavings = data.baseline.totals.totalBurden - best.result.totals.totalBurden;

    // Strategy pages must match the BEST scenario only — the headline dollar
    // figures above come from `best`, so including strategies from OTHER
    // scenarios here would print recommendation pages for moves that aren't
    // in the plan the numbers describe.
    var uniqueStrategies = best.strategies.slice();

    var html = '<!DOCTYPE html><html><head><meta charset="utf-8">' +
      '<title>Tax Strategy Plan — ' + esc(data.clientName) + '</title>' +
      '<style>' + brandCss() + '</style></head><body>' +

      '<div class="page cover">' + brandLogoBlock('20px') +
      '<div class="firm">' + esc(data.firmName) + '</div>' +
      '<h1>Your Tax Strategy Plan</h1>' +
      '<div class="client">Prepared for ' + esc(data.clientName) + '</div>' +
      '<div class="date">Tax Year ' + TSIQ.TABLES_2026.taxYear + ' &middot; Prepared ' +
      new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) + '</div>' +
      '</div>' +

      '<div class="page">' +
      '<h2>The Bottom Line</h2>' +
      '<div class="big-number"><div class="amount">' + usdApprox(firstYearSavings) + '</div>' +
      '<div class="label">Estimated first-year tax savings</div></div>' +
      '<div class="big-number"><div class="amount">' + usdApprox(cumSavings) + '</div>' +
      '<div class="label">Estimated savings over ' + data.years + ' years</div></div>' +
      '<p>Without a plan, taxes are simply what happens to you. With a plan, they become a number we manage. ' +
      'The pages that follow show where you stand today, the specific strategies we recommend, and exactly ' +
      'what each one is worth to you.</p>' +
      comparisonTable(data.baseline, data.scenarios) +
      '</div>' +

      uniqueStrategies.map(strategyPage).join('') +

      '<div class="page">' +
      '<h2>Your ' + data.years + '-Year Outlook</h2>' +
      '<p>Projected tax with and without your strategy plan, assuming your income grows as discussed:</p>' +
      projectionTable(data.baseline, data.scenarios, data.years) +
      '<div class="disclaimer">These projections are estimates based on 2026 federal tax law (as adjusted ' +
      'annually for the figures then in effect), the information you provided, and stated assumptions. They are ' +
      'planning illustrations, not a guarantee of results or a substitute for the advice engagement. State tax is ' +
      'modeled at a flat effective rate. Strategies require proper implementation and documentation to deliver ' +
      'the benefits shown. ' + esc(data.firmName) + ' will confirm final figures on your filed returns.</div>' +
      (TSIQ.isLawStale && TSIQ.isLawStale() ? '<div class="disclaimer" style="color:#a3372b;font-weight:bold">' +
        'This plan was modeled using ' + TSIQ.TABLES_2026.taxYear + ' tax law, which is no longer the ' +
        'current tax year — ' + esc(data.firmName) + ' will re-run this plan against current-year figures ' +
        'before you rely on it.</div>' : '') +
      '</div>' +

      assumptionsPage(data, best) +

      '</body></html>';

    TSIQ.render.openWindow(html, { print: true });
  };
})();
