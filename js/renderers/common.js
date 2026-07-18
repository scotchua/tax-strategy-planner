/* ============================================================================
 * RENDERER COMMON — shared helpers used by all four output renderers
 * (advisor detail, client PDF report, slideshow, pitch deck). Loaded first
 * among the renderers so the others can rely on it unconditionally.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.render = TSIQ.render || {};

// Single source of truth for the app's default brand color — was
// independently hardcoded as the literal '#8a6d3b' in several renderer files.
TSIQ.DEFAULT_BRAND_COLOR = '#8a6d3b';

// Bump on every release; see CHANGELOG.md. Printed in report/deck footers so
// a client-facing PDF or slideshow can be traced back to the app version
// that produced it.
TSIQ.APP_VERSION = '1.0.0';

/**
 * Opens a new window, writes `html` into it, and severs window.opener (the
 * popup would otherwise keep same-origin access back into the app). When
 * opts.print is set, triggers print once the window has actually finished
 * loading (images/fonts) rather than guessing with a fixed delay that can
 * race slow assets — falls back to a short delay only if the window is
 * somehow already both open and never fires 'load' (defensive; should not
 * normally happen for a document.write'd page).
 * Returns the new window, or null if the popup was blocked.
 */
TSIQ.render.openWindow = function (html, opts) {
  opts = opts || {};
  var w = window.open('', '_blank');
  if (!w) { alert('Pop-up blocked — please allow pop-ups for this page.'); return null; }
  w.document.write(html);
  w.document.close();
  try { w.opener = null; } catch (e) { /* some browsers make this read-only; harmless */ }
  w.focus();
  if (opts.print) {
    var printed = false;
    var doPrint = function () { if (!printed) { printed = true; w.print(); } };
    if (w.document.readyState === 'complete') {
      doPrint();
    } else {
      w.addEventListener('load', doPrint);
      setTimeout(doPrint, 1500); // defensive fallback if 'load' never fires
    }
  }
  return w;
};
