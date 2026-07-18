# Tax Strategy Planner

A tax planning tool: input client return data, apply strategies from the library,
and compare **Baseline vs. Scenario 2 vs. Scenario 3** with a 10-year savings
projection. Produces an advisor technical view, a client-facing PDF, and a
client-facing slideshow — all from the same strategy library.

## How to run it

**As a desktop app (recommended):** double-click **`Add Desktop Shortcut.cmd`**
once — it puts a "Tax Strategy Planner" icon on your Desktop and Start Menu.
From then on, launch it like any program: a standalone window with its own
taskbar icon, no browser tabs or address bar. (Under the hood it uses the
Edge/Chrome app mode already on every Windows machine — nothing to install,
no security warnings, and it travels with the folder when shared.)

**Or in a browser:** double-click **`index.html`**. Same app either way.

## White-labeling (sharing with other firms)

Click **Brand Settings** in the header to set the firm name, brand color, and
logo. The branding flows through the whole app plus every client output
(PDF report, per-strategy handouts, slideshow, pitch deck) and is saved on
that computer. To give the tool to another firm, copy the whole
`tax-strategy-planner` folder — they open `index.html`, set their brand once,
and everything is theirs.

## Importing a prior-year return

Two ways to get a return into the app:

- **Import Return (PDF)** — reads a software-generated return PDF directly in
  your browser (nothing leaves your computer, no AI involved). Parsed figures
  appear in a review screen with the return's own AGI/taxable-income/total-tax
  lines for tie-out; nothing fills in until you click Apply. Scanned returns
  aren't supported (no text layer) — use the Claude workflow below for those.
- **Import Client File** — loads a `.tsiq.json` produced by the Claude review
  workflow (which also suggests strategies with reasons) or by Export.

### The Claude review workflow

For a scanned return (or any case where you'd rather have Claude read the
return and pre-fill the client file): open a Claude session, attach the
return PDF, and ask it to produce a `.tsiq.json` file per
`docs/client-file-format.md` — that doc is both the schema Claude follows
and the full spec of what "the Claude workflow" means (never-invent-numbers
rule, the `suggestedStrategies` shortlist format, confidentiality rules for
what NOT to put in the file). Save Claude's output next to this app and
load it with **Import Client File**.

## How to use it

1. **Section 1** — enter the client's tax return data (2026 figures or projections).
2. **Section 2** — browse the strategy library. Click any card for the full
   technical detail: mechanics, IRC citations, case law, risks, implementation.
3. **Section 3** — check the strategies for Scenario 2 (and optionally a different
   mix in Scenario 3), adjust each strategy's parameters (salary, building basis,
   PTET rate, etc.).
4. **Run Comparison** — see the side-by-side first-year columns and the
   multi-year projection with cumulative savings.
5. **Generate Client PDF Report** — opens a print window; choose "Save as PDF"
   in the print dialog.
6. **Launch Client Slideshow** — full-screen deck for presenting; navigate with
   arrow keys or the on-screen buttons.
7. **Launch Pitch Deck (strategies hidden)** — pre-engagement sales deck. Shows
   the baseline, each strategy anonymized as "Strategy #1, #2, …" with its
   incremental savings, the 10-year total, and your fee with the net benefit.
   Set the one-time plan fee and optional annual fee next to the button first.
   Strategy names are only revealed in the PDF/slideshow after they sign.

> Both outputs open in a new window — allow pop-ups for this page the first time.

## The strategy library

100 strategies across 10 categories (Entity Structure, QBI Optimization,
Payroll & Family, Retirement, Health & Fringe, Real Estate & Cost Recovery,
Business Expenses, Income Timing & Character, Credits & Incentives,
Succession & Exit). 56 are **modeled** (they change the scenario math);
44 are **advisory** (structural/planning items shown in the library and plan
documents without pretending to have computable savings). Use the search box
in Section 2 to find anything fast.

## Adding a strategy

1. Copy any file in `js/data/strategies/` as a template (see
   `docs/strategy-authoring-spec.md` for the full authoring rules).
2. Fill in the advisor content, client content, inputs, and the `apply()` math.
3. Run `node scripts/build-index.js` (registers it in index.html), then
   `node scripts/validate-strategies.js` (schema + math smoke tests).

The library cards, scenario checkboxes, PDF, slideshow, and pitch deck all
pick it up automatically.

## Working on this with Claude Code

`CLAUDE.md` in this folder is read automatically at the start of every session —
it carries the project context (architecture rules, 2026 tables, accuracy-first).
Just open a session in this folder and ask for what you want, e.g.:

- "Add a Solo 401(k) strategy to the library"
- "Add a QSBS §1202 strategy"
- "Show effective tax rate in the comparison table"
- "Update the tables for 2027 when Rev. Proc. drops"

## Scope notes (v1)

Federal 2026 law per Rev. Proc. 2025-32 / OBBBA. State tax uses a flat effective
rate (with optional entity-level add-ons for a couple of strategies). Not yet
modeled: AMT, depreciation recapture on sale (though the app flags the dollar
exposure when it applies), rental income in the §199A QBI calculation, QBI's
25%-wage/2.5%-UBIA alternative limitation, Medicare IRMAA as an actual cost
(flagged as a note only), and inflation-indexing of brackets/thresholds in
projection years 2+ (enacted sunset dates DO apply per year; dollar thresholds
stay at 2026 figures). §461(l) excess business loss IS modeled as a real
disallowance + NOL carryforward. See `CLAUDE.md` for the full list and why
each remaining item is out of scope.
