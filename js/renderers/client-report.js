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

  var REPORT_CSS = '' +
    '*{box-sizing:border-box;margin:0;padding:0}' +
    'body{font-family:Georgia,"Times New Roman",serif;color:#1a2332;line-height:1.55;font-size:12pt}' +
    '.page{padding:0.9in 0.85in;page-break-after:always}' +
    '.page:last-child{page-break-after:auto}' +
    '.cover{display:flex;flex-direction:column;justify-content:center;min-height:9in;text-align:center}' +
    '.cover .firm{font-size:13pt;letter-spacing:3px;text-transform:uppercase;color:#8a6d3b;margin-bottom:24px}' +
    '.cover h1{font-size:30pt;font-weight:normal;margin-bottom:12px}' +
    '.cover .client{font-size:17pt;color:#445;margin-bottom:40px}' +
    '.cover .date{color:#667;font-size:11pt}' +
    'h2{font-size:18pt;font-weight:normal;border-bottom:2px solid #8a6d3b;padding-bottom:6px;margin-bottom:16px}' +
    'h3{font-size:13pt;margin:16px 0 8px;color:#2c3e50}' +
    'p{margin-bottom:10px}' +
    'ul{margin:6px 0 12px 22px}li{margin-bottom:5px}' +
    '.headline{font-size:15pt;color:#8a6d3b;font-style:italic;margin-bottom:12px}' +
    '.analogy{background:#f7f4ee;border-left:4px solid #8a6d3b;padding:12px 16px;margin:14px 0;font-style:italic}' +
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
    '@media print{.page{padding:0.25in 0.15in}}';

  function scenarioLabel(sc) { return sc.label; }

  // Brand-aware print CSS + logo block (Brand Settings flow through here).
  // Sink-side validation/escaping — defense-in-depth on top of the
  // brand-settings load/save validation in app.js (sanitizeBrand).
  function safeBrandColor() {
    var color = TSIQ.brand && TSIQ.brand.color;
    return (typeof color === 'string' && /^#[0-9a-fA-F]{6}$/.test(color)) ? color : '#8a6d3b';
  }
  function brandCss() {
    return REPORT_CSS.split('#8a6d3b').join(safeBrandColor());
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
      ((TSIQ.brand && TSIQ.brand.color) || '#8a6d3b') + '">' +
      esc(firmName) + '</div></div>' +
      strategyPage(strategy).replace('<div class="page">', '<div>') +
      '<div class="disclaimer">This overview is educational and describes a strategy in general terms. ' +
      'Whether it fits your situation — and what it is worth — depends on your full tax picture, which ' +
      'we evaluate as part of your plan. ' + esc(firmName) + ' handles eligibility, implementation, and ' +
      'documentation requirements with you.</div>' +
      '</div></body></html>';

    var w = window.open('', '_blank');
    if (!w) { alert('Pop-up blocked — please allow pop-ups for this page.'); return; }
    w.document.write(html);
    w.document.close();
    try { w.opener = null; } catch (e) { /* some browsers make this read-only; harmless */ }
    w.focus();
    setTimeout(function () { w.print(); }, 400);
  };

  /**
   * data: { clientName, firmName, baseline, scenarios: [{label, result, strategies:[strategyObj]}], years }
   */
  TSIQ.render.clientReport = function (data) {
    var best = data.scenarios.reduce(function (a, b) {
      return b.result.totals.totalBurden < a.result.totals.totalBurden ? b : a;
    }, data.scenarios[0]);
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
      '<div class="big-number"><div class="amount">' + usd(firstYearSavings) + '</div>' +
      '<div class="label">Estimated first-year tax savings</div></div>' +
      '<div class="big-number"><div class="amount">' + usd(cumSavings) + '</div>' +
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
      '</div>' +

      '</body></html>';

    var w = window.open('', '_blank');
    if (!w) { alert('Pop-up blocked — please allow pop-ups for this page.'); return; }
    w.document.write(html);
    w.document.close();
    try { w.opener = null; } catch (e) { /* some browsers make this read-only; harmless */ }
    w.focus();
    setTimeout(function () { w.print(); }, 400);
  };
})();
