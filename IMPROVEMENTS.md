# Recommended Improvements — Full App Review (July 2026)

Findings from a comprehensive multi-dimensional review (tax math, scenario engine,
strategy library, PDF parser, security, UX/accessibility, architecture, product).
Every item below was independently verified against the code — 104 findings survived
adversarial verification; 1 was refuted and dropped. **No code has been changed.**

Each item has a checkbox for review. Effort: S = small (≤1 hr), M = medium, L = larger.
File references are exact as of commit `bc4524d`.

**Suggested implementation waves** (after review):
1. **Wave 1 — Accuracy** (A-items): these change client-facing dollar figures; do first, behind the new test harness (T1).
2. **Wave 2 — Data safety** (D-items) and **Security** (S-items).
3. **Wave 3 — Parser** (P-items) and **UX/a11y** (U-items).
4. **Wave 4 — Tooling** (T-items), **Features** (F-items), **Docs** (X-items).

---

## A. Tax-math & scenario correctness — these change numbers shown to clients

- [ ] **A1. Fix head-of-household 32%/35% bracket thresholds ($25 off).** (S)
  `js/data/tax-tables-2026.js:29` has HoH `[201750, 0.32], [256200, 0.35]`; Rev. Proc. 2025-32 HoH shares single's breakpoints: `201775` / `256225` (the wrong figures were copied from the §199A threshold). Pure data fix.

- [ ] **A2. PTET shows phantom *state* savings — no state add-back.** (S)
  `js/data/strategies/ptet.js:126-127` reduces federal K-1; `js/engine/tax-engine.js:171` then computes state tax on the already-reduced AGI, so scenarios show ≈ `PTET × stateRate` of state savings per year that don't exist (every PTET state adds the deduction back). Contradicts the strategy's own client copy ("only the federal bill shrinks"). Fix: compute state base as `Math.max(0, agi + ptetDeducted) × stateRate` (track the deducted amount in a profile field). Add a regression check: at equal PTET/state rates, scenario state tax should equal baseline.

- [ ] **A3. PTET runs too early in the apply order and over-remits silently.** (S)
  `ptet.js` has `applyOrder: 20`, but solo-401k (61), SEP (62), Augusta rent, etc. reduce K-1 afterwards, so PTET is computed on a stale base; excess credit is silently floored at `tax-engine.js:172`. Move PTET to applyOrder ~85 and surface an `unusedPtetCredit` note instead of flooring silently.

- [ ] **A4. Passive rental income escapes NIIT by default.** (S)
  `tax-engine.js:210-211` includes rental in NII only when `rentalLossesUsable` is false — but that flag defaults to true and conflates §469 loss usability with §1411 non-passive (RE-pro) status. Any client with positive rental and MAGI over the threshold is undertaxed by 3.8% of net rental income. Fix: separate `rentalNonPassiveREPro` flag (default false, new checkbox) used only in the NII line; keep `rentalLossesUsable` solely for the §469 suspension logic.

- [ ] **A5. No §1211(b) capital-loss limitation.** (S)
  `tax-engine.js:165-166` adds `p.ltcg` unbounded — a manually entered -$50,000 net capital loss reduces AGI in full instead of the $3,000 ($1,500 MFS) cap, also inflating SALT/QBI/CTC phase-out headroom. `gain-loss-harvesting.js` floors its own output at -3,000 precisely because the engine doesn't. Clamp in the engine (`Math.max(p.ltcg, fs==='mfs' ? -1500 : -3000)`), surface the disallowed excess as a carryforward note, and remove the per-strategy workaround.

- [ ] **A6. hire-children: wages per child uncapped → phantom savings.** (S)
  `js/data/strategies/hire-children.js` deducts `kids × wagesPerChild` at the parent's rate with the child side "assumed 0% tax" at *any* wage level (3 kids × $60k shows ~$47k of savings while ~$15k of the kids' real tax is omitted). Violates the repo's own authoring rule ("cap defaults so the unmodeled side is ~zero tax"); augusta-rule hard-caps `days` at 14 as the model to follow. Cap the modeled deduction at the single standard deduction per child ($16,100, from the tables), or model the child-side tax on the excess into `p.otherTaxes`.

- [ ] **A7. Blank/zero salary silently models a $0-reasonable-comp S-corp.** (S)
  A blank param coerces to 0 (`app.js:208`), so `s-corp-election.js` converts the *entire* Schedule C profit to FICA-free K-1 — the exact Watson v. Commissioner fact pattern its own risks section calls the #1 exam issue. Same for c-corp-conversion's ownerSalary. Refuse to model at $0 (or warn prominently below ~25% of profit), and add `min="0"` to param inputs.

- [ ] **A8. Retirement strategies stack past the §415(c) limit.** (M)
  Solo-401k + SEP + SIMPLE + profit-sharing each enforce only their own cap; all four are checkable in one scenario, modeling up to ~2× the $72,000 annual-additions limit (and SEP+Solo-401k both compute off the same SE base). Accumulate `state.annualAdditionsUsed` / employer-contribution base across strategies and clip with a note; zero-out (with a note) a second plan when SIMPLE is selected.

- [ ] **A9. Client report & slideshow mix strategies from ALL scenarios with best-scenario-only savings.** (M)
  `client-report.js:167-177` and `slideshow.js:184-206` build the strategy list as the union across Scenario 2 *and* 3 but take dollar figures from the best scenario only — when scenarios are alternatives (S-corp path vs. sole-prop path), the client PDF shows strategy pages that aren't in the plan whose numbers headline the report. Derive the list from the best scenario only, or render one clearly-labeled section per scenario; assert per-strategy amounts tie to the displayed total.

- [ ] **A10. Client PDF comparison rows don't sum to the printed total.** (S)
  `client-report.js:57-93` shows four component rows but the Total row is `totalBurden`, which also includes `corpTaxPaid` and `otherTaxes` (family payroll) — scenarios using those strategies produce a client PDF whose lines visibly don't add up. Add the two rows (as `app.js` detailRows already does) or fold them into the payroll row.

- [ ] **A11. Pitch deck labels money-losing strategies "Foundation — powers the strategies that follow".** (S)
  `pitch-deck.js:79-83` (and the same threshold in slideshow) branch on `incremental >= 500` only, so a strategy with *negative* year-1 impact gets the flattering label. Branch on sign: reserve "Foundation" for advisory/near-zero items; show signed figures ("year-one investment") for negative ones.

- [ ] **A12. Negative savings render in green "good" KPI cards.** (S)
  `app.js:293-303` hardcodes `kpi good` regardless of sign; also the year-1 headline comes from the best-*cumulative* scenario. Toggle class by sign and label the KPI with its scenario.

- [ ] **A13. se-health-insurance earned-income cap wrongly includes K-1.** (S)
  `se-health-insurance.js:142-144` includes `passthroughK1` in the §162(l) earned-income cap; K-1 ordinary income is not earned income (the file's own mechanics text says the limit is S-corp W-2 wages). Restrict to Schedule C + owner wages; when only K-1 exists, note that premiums must run through owner W-2 (pair with S-corp election).

- [ ] **A14. spouse-payroll omits the employee half of FICA from the burden.** (S)
  `spouse-payroll.js:144-152` deducts only the employer half and routes salary to `p.wages` where no FICA is charged — the employee 7.65% (~$2,295 at the default) is a real family cash cost that appears only in a text note. Add it to `p.otherTaxes`, matching the hire-children convention.

- [ ] **A15. spouse-health-s-corp doesn't reduce QBI; sibling se-health-insurance does.** (S)
  Same §162(l) deduction, inconsistent treatment (`spouse-health-s-corp.js:148` only adds to adjustments). Add the `p.qbiReduction` line to match.

- [ ] **A16. Missing excess-Social-Security credit when outside wages + owner wages exceed the $184,500 base.** (S)
  `tax-engine.js:141` caps owner SS in isolation; the employee 6.2% over the combined base is recovered on Schedule 3 in reality (e.g., $150k outside + $100k owner wages → $4,061 overstated burden). This biases S-corp comparisons against moonlighting clients — and is inconsistent with the SE-tax coordination three lines up. Compute and subtract the credit.

- [ ] **A17. 2026-law completeness (OBBBA items effective 2026 that are silently missing).** (M, can be split)
  - **Senior deduction** ($6,000/person, MAGI phase-out) and age-65+ additional standard deduction — no age input exists at all (`tax-engine.js:183`).
  - **0.5%-of-AGI floor on itemized charitable** (§170(p)) — engine deducts gifts in full (`tax-engine.js:182`); the charitable strategies (DAF bunching, CRT) inherit the overstatement.
  - **2/37 overall itemized limitation** for 37%-bracket taxpayers (`tax-engine.js:184`).
  - **Non-itemizer charitable deduction** ($1,000/$2,000 MFJ) — `p.charitable` has zero effect for standard-deduction clients.
  - **$400 minimum QBI deduction** for ≥$1,000 active QBI.
  Each is a small, self-contained engine + tables change. At minimum, add any deliberately-skipped ones to the scope-notes list.

- [ ] **A18. QBI: rental never enters QBI; 25%-wage/2.5%-UBIA alternative limit absent.** (M)
  `tax-engine.js:64-65`. Add a `rentalIsQBI` flag and optional `ubia` field, or at minimum document both omissions in the scope notes (they're not there today).

- [ ] **A19. Projection years 2027+ computed at unindexed 2026 thresholds while income grows.** (M/L)
  Bracket creep (~12.5% at 3%/5yr) is pure model artifact, overstating later-year taxes and triggering threshold cliffs early. Either apply a single chained-CPI assumption to bracket bounds/deductions/breakpoints per projection year, or disclose "all years computed at 2026 law *and 2026 dollar thresholds*" everywhere the projection prints (current disclaimer says only "2026 law").

- [ ] **A20. daf-bunching savings partly reflect donating *more money*, not tax efficiency.** (S)
  Baseline charitable grows with the growth rate while the bunched amount is static, and partial cycles misalign at odd projection lengths. Report total scenario giving vs. baseline giving in the notes so the advisor sees the cash asymmetry.

## D. Data-loss & workflow safety

- [ ] **D1. Session autosave + unsaved-changes warning.** (M) — *the single highest-impact UX item*
  No `beforeunload` handler and nothing but brand settings is persisted: an accidental F5/close discards ~30 fields plus two built scenarios. Debounce-save the full working state to localStorage (`tsiq-session`), offer restore on load, and add a dirty-flag beforeunload guard.

- [ ] **D2. Client-file export can't round-trip work-in-progress.** (M)
  `exportClientFile` (`app.js:465`) saves only Section 1 fields — checked strategies, tuned params, scenario labels, and pitch fees are all lost; imported `suggestedStrategies`/notes are also dropped on re-export. Extend to a v2 format (`scenarios: [{label, strategies: [{id, params}]}], fees`), accept both versions on import, restore using the existing load-suggestions plumbing, update `docs/client-file-format.md`.

- [ ] **D3. Stale outputs: PDF/slideshow/pitch generate from outdated `lastRun`.** (S)
  After editing the form (or importing a different client!), the output buttons still render the previous computation — potentially the wrong client's name on a deliverable. Mark results stale on any input change, dim + banner, disable output buttons until re-run; clear `lastRun` on import.

- [ ] **D4. PDF import silently keeps the previous client's values.** (S)
  "Apply to Client Data" writes only fields the parser found (`app.js:560,603`) — Client A's rental loss and charitable survive into Client B's plan. Render every field in the review modal (parsed value or 0) and reset unparsed fields on Apply.

- [ ] **D5. Import overwrites the form without confirmation.** (S)
  `importClientFile` writes instantly on file pick; combined with no autosave this is irreversible. Confirm when the form is non-default, or reuse the PDF-review preview pattern. Also reset unlisted fields to defaults (the docs *claim* omitted keys "keep the app's default" but they actually keep the current form's values — `docs/client-file-format.md:9` vs `app.js:532`).

- [ ] **D6. Input validation overhaul.** (S)
  - `num()` coerces browser `badInput` (e.g. "1,200,000", "450k") to $0 silently → block compute and highlight invalid fields (`app.js:216,414`).
  - Clearing "Projection years" yields a 1-year projection: `Math.max(1, …) || 10` — the `|| 10` is dead code (`app.js:416`). Also clamp to 30 in JS (a crafted .tsiq.json bypasses the HTML max and can freeze the app with `years: 1e9`).
  - `.tsiq.json` import validates nothing beyond the format string: whitelist filingStatus (an invalid value currently makes compute throw an uncaught TypeError), isFinite-check numerics, report skipped keys (`app.js:521-538`).
  - Strategy param inputs get `min="0"` (negative salary currently produces negative payroll tax).

## S. Security (client tax data on CPA workstations)

- [ ] **S1. Escape brand fields at the document sinks.** (S)
  Brand logo and color are interpolated raw into `document.write` HTML/CSS in all client outputs (`slideshow.js:65,71,209,212`, `client-report.js:46-52`): a logo of `x" onerror="…` or color of `#8a6d3b}</style><script>…` executes in windows holding full client tax data. `TSIQ.esc()` the logo, validate color against `/^#[0-9a-fA-F]{6}$/`, require `data:image/` logos.

- [ ] **S2. Validate brand settings on *load*, not just save.** (S)
  On `file://`, all local HTML files share one localStorage origin in Chromium — any malicious HTML file ever opened locally can plant a persistent payload in `tsiq-brand` that detonates on every report generation. Validate name/color/logo shape in `loadBrand()` (`app.js:16`), falling back to defaults.

- [ ] **S3. Upgrade vendored pdf.js (3.11.174, Aug 2023 → ≥ 4.2.67).** (M)
  Within the CVE-2024-4367 vulnerable range (arbitrary JS via crafted PDF font matrix); current safety rests on a single `isEvalSupported:false` flag at `return-parser.js:74`. Upgrade, keep the flag, and comment it as security-load-bearing.

- [ ] **S4. Sever `window.opener` on generated popups.** (S)
  All four generators use `window.open('', '_blank')` + `document.write` — the popup keeps same-origin access back into the app. `w.opener = null` after `document.close()` at the four call sites.

- [ ] **S5. Defense-in-depth escaping.** (S)
  Strategy `id`/`inputs.default` interpolated unescaped into markup (`app.js:109,174`); `TSIQ.esc` doesn't escape single quotes. Escape or validate ids in the validator (`/^[a-z0-9-]+$/`), add `&#39;` to esc.

## P. PDF return parser

- [ ] **P1. Gross retirement/SS/interest amounts imported as taxable.** (M)
  When the taxable "b" column is blank (nontaxable rollover, SS below the floor, tax-exempt interest), the right-most number in the row is the *gross* "a" amount and imports as fully taxable (`return-parser.js:149-161`) — a $200k rollover becomes $200k of taxable income with a plausible-looking review screen. Disambiguate by column x-position; when only the "a" column has a number, import 0 + warning.

- [ ] **P2. Leading-minus negatives silently dropped — losses become $0.** (S)
  `isNumericItem` (`return-parser.js:63`) accepts only parenthesized negatives; several packages print `-12,345`. An $80k Schedule C loss imports as $0 with no flag. Accept an optional leading `-`, and warn when an anchor matches but no value parses (instead of mapping 0).

- [ ] **P3. The "tie-out" screen never computes the tie-out.** (S)
  It shows the return's own summary lines but never compares the sum of parsed fields against line 9/11 — the one arithmetic check that would catch P1/P2 automatically. Compute and display the difference, red when over tolerance.

- [ ] **P4. Smaller parser items.** (S/M each)
  - Schedule E line 26 includes royalties; wholly mapped to rentalNet with no warning.
  - Password-protected PDFs surface raw pdf.js internals; `FileReader` errors silently swallowed (no `onerror`).
  - Hard-coded x-thresholds (200/520) assume exact letter-size layout — calibrate from a known row instead.
  - No anchors for 2025 Schedule 1-A deductions (tips/overtime/senior) → unexplained tie-out gaps on 2025 returns; detect and warn.
  - `saltIncomeTax` anchor parsed but never used — use it to sanity-check the state-rate field, or delete it.

## U. UX & accessibility

- [ ] **U1. Strategy library is mouse-only.** (S) Cards/action links are divs+spans with click handlers only — an entire tab is keyboard-inaccessible (WCAG 2.1.1). Make the two actions real `<button>`s.
- [ ] **U2. Convert the three modals to native `<dialog>`.** (M) No dialog semantics, no focus trap, no Escape-to-close, focus never restored (`index.html:172-213`). `showModal()` gives all of it for free.
- [ ] **U3. Currency inputs: `type=text inputmode=numeric` with comma formatting on blur.** (M) Raw `type=number` gives no thousands grouping on 7-digit entries, and scroll-wheel changes focused values silently. At minimum add a wheel-blur guard.
- [ ] **U4. Brand-color contrast guard.** (M) Any light brand color is used directly as text color on white (`--accent` in ~6 text rules) → illegible UI and outputs. Derive a darkened `--accent-text` when luminance is high.
- [ ] **U5. Lazy-load pdf.js.** (S) The worker bundle — the largest file in the app — is parsed on the main thread at every launch (`index.html:325-326`); the `workerSrc` assignment is dead code in fake-worker mode. Load both scripts on first click of Import Return.
- [ ] **U6. Smaller a11y/UX items.** (S each) Swatches keyboard-accessible with selected state; tab bar `role=tablist` wiring; search input label; `prefers-reduced-motion` for the KPI count-up/smooth scroll; "no results" state for library search; wrap results tables in `overflow-x:auto`; PDF-review modal `label for=`; pitch-fee inputs discoverability + disabled (not silent no-op) output buttons.
- [ ] **U7. Client-report print CSS.** (S) Only print rule is near-zero page padding with no `@page` margin — with print-dialog margins "None" the deliverable prints edge-to-edge; projection tables can split mid-row. Add `@page { margin: 0.75in }`, `break-inside: avoid`.

## T. Testing & tooling

- [ ] **T1. Golden-file test harness for the tax engine.** (M) — *prerequisite for Wave 1*
  Zero assertions on computed dollars exist anywhere. The engine is already pure and Node-loadable. Add `scripts/test-engine.js` with hand-verified fixtures: each filing status; QBI below/inside/above phase-in, SSTB and not; SALT floor & phase-down edges; CTC phase-out; LTCG 0/15/20 breakpoints; suspended-loss carryforward across years; PTET state-neutrality (per A2).
- [ ] **T2. Validator: fail on index.html drift.** (S) Validator reads the directory; nothing checks the `<script>` tags — a validated strategy can silently not exist in the browser (and deleted files leave 404 tags). Compare the marker block against the directory and fail on any diff.
- [ ] **T3. Validator: stress passes beyond defaults.** (M) Only default params on one profile are smoke-tested — the hire-children defect (A6) is invisible to it. Add a 10× params pass, 2-3 more profiles (W-2-only, loss year, high-income SSTB), a modeled-strategy-changes-something warning, and exercise `suggest()` (currently silently swallowed everywhere — add `console.warn` in `suggest.js` too).
- [ ] **T4. Validator: schema completeness.** (S) Check `modeled` (32 files omit it — backfill `modeled: true`), id-matches-filename, inputs shape, `appliesTo`, `client.analogy`; validate id charset (feeds S5).
- [ ] **T5. build-index.js robustness.** (S) Inverted/duplicated markers corrupt index.html (only `-1` is checked); write non-atomic. Guard `j < i`, write temp+rename.
- [ ] **T6. Runtime guard for the STRATEGIES snapshot.** (S) A strategy `<script>` after strategies-index.js silently vanishes. Assert `strategyModules.length === STRATEGIES.length` at boot.
- [ ] **T7. Deduplicate renderer logic.** (M) `bestScenario` reduce ×4, uniqueStrategies ×3, incremental-savings loop ×2, popup-open/print boilerplate ×4, brand theming by string-replacing `#8a6d3b` (default color hardcoded in 5+ places). Extract shared helpers (`TSIQ.bestScenario`, `TSIQ.incrementalSavings`, `TSIQ.render.openWindow`, one DEFAULT_BRAND_COLOR); move `TSIQ.esc` out of `advisor.js` into a shared module; trigger print from popup `onload` instead of a 400ms timeout; delete dead `scenarioLabel()`/no-op ternary.
- [ ] **T8. Windows launchers.** (S) Shortcut script breaks on apostrophes in the path (PS single-quote interpolation); launcher URL not percent-encoded (`#`/`%` in path breaks). Pass paths via env vars; encode the URL.
- [ ] **T9. Repo hygiene.** (S) Delete root `.gitkeep` (contains prose); add `TSIQ.APP_VERSION` + CHANGELOG.md, print version in report/deck footers; meaningful commit messages going forward. Optional: have build-index also emit a concatenated strategies bundle (~100 sequential script tags today).

## F. Product features

- [ ] **F1. Quarterly-estimate / safe-harbor output.** (M) The engine already computes balance due; nothing produces the deliverable a CPA needs after a mid-year plan change: remaining 1040-ES amounts under the §6654 safe harbor (100/110% prior-year). The PDF importer already extracts prior-year total tax and then discards it. Add a prior-year-tax field (auto-filled from import) + a per-scenario payment block.
- [ ] **F2. "Data & Assumptions" appendix in the client PDF.** (S) The report can't be reproduced from itself — no inputs, growth/state rates, or per-strategy parameters are printed. Everything needed is already in `lastRun`. Add a final appendix page (also fixes workpaper defensibility).
- [ ] **F3. Strategy conflict/prerequisite warnings.** (M) SEP + Solo-401k (same base), SIMPLE + Safe-Harbor 401(k), PTET with no entity are all freely combinable today with signals buried in post-run notes. Add declarative `conflictsWith`/`requiresOneOf` metadata + inline warning badges at selection time (non-blocking).
- [ ] **F4. Materiality warnings for un-modeled items.** (S) When aggregate business loss exceeds the §461(l) threshold (2026: ~$320k/$640k — take exact figures from Rev. Proc. 2025-32) or accelerated depreciation accumulates, push a specific note quantifying the exposure instead of the one-line generic disclaimer.
- [ ] **F5. Staleness banner.** (S) In January 2027 the app will silently keep producing 2026-law plans. If `currentYear > TABLES.taxYear`, show a persistent banner and append to output disclaimers.
- [ ] **F6. Owner W-2 wages input.** (M) Existing S-corp owners can't model owner-retirement strategies: `ownerWages` is only ever set by the S-corp-election strategy; there's no form field. Add the field (engine already handles it).
- [ ] **F7. Per-scenario fact overrides.** (M) Scenarios can only vary strategies — MFS-vs-MFJ, state-move, or income-sensitivity what-ifs are impossible. Add an optional overrides mini-panel (filing status, state rate, income multiplier) merged before compute.
- [ ] **F8. "Copy Scenario 2 → 3" button.** (S) Variant scenarios currently require re-checking boxes across ~100 strategies by hand.
- [ ] **F9. Optional `grows: true` flag on currency params.** (M) Contributions/salaries stay at year-1 nominal for 10 years while income compounds — long-projection savings drift. Opt-in scaling per input.

## X. Documentation

- [ ] **X1. CLAUDE.md doesn't exist but is load-bearing.** (M) README (twice), the authoring spec's first instruction, and the *user-visible results fine print* all reference it. Author it (architecture rules, ES5 constraint, load order, table provenance, full not-modeled list) — or remove all references. Fix the fine print regardless: it currently tells CPAs to "see CLAUDE.md scope notes" (`app.js:381`).
- [ ] **X2. README cleanup.** (S) Line 1 is a stray GitHub attachment link; "copy the `tax-strategy-tool` folder" names the wrong folder; the referenced "Claude review workflow" that produces `.tsiq.json` files has no documentation anywhere — add a short doc or README subsection.
- [ ] **X3. Authoring spec: document `suggest()`.** (S) 14 strategies implement it, `suggest.js` consumes it, the spec never mentions it (and the validator never runs it — see T3).
- [ ] **X4. client-file-format.md: fix the omitted-keys claim.** (S) See D5.
- [ ] **X5. heavy-vehicle-179 cites a `sec179.suvCap` tables entry that doesn't exist.** (S) Add the verified 2026 SUV cap to the tables and replace the three "roughly $32,000 — verify" hedges.
- [ ] **X6. Scope-notes accuracy.** (S) Add to the disclosed not-modeled list: threshold indexing in projections (A19), rental-QBI/UBIA (A18), and any A17 items deliberately deferred.

---

*Generated by a multi-agent review (8 specialized reviewers, per-finding adversarial
verification, completeness critic — 109 agents total). One finding was refuted during
verification and excluded. Full machine-readable findings retained in session records.*
