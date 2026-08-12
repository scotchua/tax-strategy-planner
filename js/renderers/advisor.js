/* ============================================================================
 * ADVISOR RENDERER — technical detail view of a strategy (in-app panel).
 * Reads only from the strategy source object. No strategy-specific logic.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.render = TSIQ.render || {};

// TSIQ.esc lives in js/data/tax-tables-2026.js (loaded before this file).

(function () {
  var esc = TSIQ.esc;

  function list(items) {
    if (!items || !items.length) return '';
    return '<ul>' + items.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
  }

  function authorityTable(rows) {
    if (!rows || !rows.length) return '';
    return '<table class="authority-table"><thead><tr>' +
      '<th>Type</th><th>Authority</th><th>Relevance</th></tr></thead><tbody>' +
      rows.map(function (a) {
        return '<tr><td class="auth-type">' + esc(a.type) + '</td>' +
          '<td class="auth-cite">' + esc(a.cite) + '</td>' +
          '<td>' + esc(a.note) + '</td></tr>';
      }).join('') + '</tbody></table>';
  }

  TSIQ.render.advisorDetail = function (strategy) {
    var a = strategy.advisor;
    return '' +
      '<div class="advisor-detail">' +
      '<div class="detail-header"><span class="category-badge">' + esc(strategy.category) + '</span>' +
      '<h2>' + esc(strategy.name) + '</h2></div>' +
      '<section><h3>Summary</h3><p>' + esc(a.summary) + '</p></section>' +
      '<section><h3>How It Works (Technical)</h3>' + list(a.mechanics) + '</section>' +
      '<section><h3>Authority</h3>' + authorityTable(a.authority) + '</section>' +
      '<section class="cols-2">' +
      '<div><h3>Requirements</h3>' + list(a.requirements) + '</div>' +
      '<div><h3>Risks &amp; Exam Issues</h3>' + list(a.risks) + '</div>' +
      '</section>' +
      '<section class="cols-2">' +
      '<div><h3>Best-Fit Client Profile</h3>' + list(a.bestFit) + '</div>' +
      '<div><h3>Implementation Steps</h3>' + list(a.implementation) + '</div>' +
      '</section>' +
      '</div>';
  };
})();
