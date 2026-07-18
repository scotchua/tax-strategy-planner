# Changelog

All notable changes to the Tax Strategy Planner are recorded here. Format
follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this app
does not publish releases, so each entry below corresponds to a batch of
commits rather than a tagged version — `TSIQ.APP_VERSION` (in
`js/renderers/common.js`) tracks the same number and is printed in the
client PDF, slideshow, and pitch deck footers so an output can be traced
back to the app version that produced it.

## 1.0.0 — 2026-07

First versioned release. Consolidates an app-wide correctness and hardening
pass on top of the original tool (see `IMPROVEMENTS.md` for the full,
itemized list this release worked through).

### Accuracy
- Fixed Head-of-Household bracket thresholds and several stacking-order bugs
  (QBI phase-in/SSTB/`$400` minimum, LTCG stacking, SALT cap and the OBBBA
  2/37 itemized limitation, CTC phase-out, senior deduction, non-itemizer
  charitable deduction, excess Social Security credit, the §1211(b) capital
  loss floor, NIIT vs. §469 passive-loss treatment, PTET state-neutrality).
- Retirement-plan strategies (Solo 401(k), SEP-IRA, SIMPLE IRA, cash balance,
  defined benefit, new-comparability profit sharing) now coordinate through
  a shared multi-year cap so combinations that are not legally stackable
  (e.g. a SIMPLE IRA alongside a qualified plan) are refused or capped
  correctly instead of double-counting the benefit.
- Client PDF report, slideshow, and pitch deck now always show figures from
  the single best-performing scenario, computed one shared way
  (`TSIQ.bestScenario`/`TSIQ.incrementalSavings`), instead of each renderer
  computing "best" and "incremental savings" independently.

### Data safety & security
- Brand settings (name, color, logo) are validated on load and on save —
  malformed or unexpected `localStorage` content (shared across every local
  HTML file under `file://`) can no longer inject unexpected markup or an
  unreadable logo format.
- Unsaved-work protections: a dirty-form warning before navigating away,
  session autosave/restore, and a confirmation prompt before importing a
  new client file over unsaved changes.

### PDF import
- Return-parser fixes for gross-vs-taxable ("a"/"b") line pairs, negative
  numbers, and several disclosure gaps; added a tie-out banner comparing
  parsed line items against the return's own reported totals.

### UX & accessibility
- Brand color now gets a WCAG-contrast-checked text color instead of always
  rendering as-entered, so an unreadable brand color can no longer make
  headers illegible in the app, PDF report, or slideshow.
- Modals converted to native `<dialog>` elements (focus trapping and Escape
  handling come from the browser instead of hand-rolled JS); tab navigation
  and strategy-swatch pickers gained proper ARIA roles/labels.
- Number inputs blur on mouse-wheel scroll so scrolling the page can no
  longer silently change a focused field's value.
- Invalid number-input values are now caught and listed before Compute runs,
  instead of silently computing with `NaN`/zero.

### Tooling
- `scripts/test-engine.js`: a golden-file regression suite (87 hand-verified
  assertions) covering the tax engine and multi-year strategy stacking.
- `scripts/validate-strategies.js`: validates every strategy's schema and
  `inputs[]` shape, checks `index.html`'s generated strategy list against
  the `js/data/strategies/` directory, and exercises every strategy's
  `suggest()` against four synthetic client profiles.
- `scripts/build-index.js`: guards against out-of-order markers and writes
  the generated file atomically.
- Added `js/renderers/common.js` — a shared popup-window helper and the
  `TSIQ.DEFAULT_BRAND_COLOR`/`TSIQ.APP_VERSION` constants, removing three
  near-duplicate popup implementations across the renderers.
