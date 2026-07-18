/* ============================================================================
 * SUGGESTION ENGINE — deterministic strategy screening (no AI).
 * Any strategy may define suggest(profile) → { reason, params? } | null on its
 * source object; this collector runs them all against the entered client data.
 * Suggestions are leads for the CPA to evaluate, never conclusions — the same
 * rule as Claude-generated client files, and they render in the same panel.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

TSIQ.suggestStrategies = function (profile) {
  var out = [];
  TSIQ.STRATEGIES.forEach(function (s) {
    if (typeof s.suggest !== 'function') return;
    var r = null;
    try { r = s.suggest(profile); }
    catch (e) { console.warn('suggest() failed for ' + s.id + ' — a bad rule never blocks the list', e); }
    if (r && r.reason) out.push({ id: s.id, reason: r.reason, params: r.params });
  });
  return out;
};
