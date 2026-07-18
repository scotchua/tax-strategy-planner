# Recommended Improvements, Round 2 — Strategy-Building & Estimation Effectiveness (July 2026)

A second review pass, run after all 66 items in `IMPROVEMENTS.md` were implemented. Different
focus: not correctness bugs, but what would make the app **more effective at building tax
strategies and estimating their tax effect** — modeling gaps that skew estimates, strategy math
that could be more faithful, missing library entries, the CPA's scenario-building workflow,
estimate transparency, and multi-year projection realism.

Method: six parallel dimension reviews of the current code, each recommendation then
adversarially verified against the codebase (not already implemented; feasible under the ES5 /
no-build / `file://` constraints; tax-law claims checked; material rather than polish). 45
candidates survived as the 40 items below after merging duplicates. Verifier corrections
(statute cites, dollar figures, implementation traps) are folded into the item text.

Effort: S = small (≤1 hr), M = medium, L = larger. Checkboxes for review.

**Suggested top priorities** (highest impact-to-effort, in rough order):
1. **PJ1** sunset-aware law schedule (enacted-law fidelity of every multi-year number)
2. **PJ2** one-time income flag (a single year-1 capital gain currently corrupts all 10 years)
3. **EN2 + LB1** modeled Roth conversion (biggest missing mainstream strategy; small engine change)
4. **ET1 + ET2** per-strategy contribution table with zero-effect flags and timing-vs-permanent split
5. **EN1** Social Security §86 taxability (unlocks honest retiree planning; pairs with Roth conversion)
6. **WF2** parameter solver over the pure engine ("what salary/deferral/gift is optimal?")
7. **SF1** state entity-level tax in the S-corp/C-corp strategies (removes phantom state savings)

---

## EN. Engine modeling gaps that skew estimates

- [x] **EN1. Model §86 Social Security taxability (provisional income).** (M/high)
  Retiree returns currently lump taxable SS into `otherIncome` (via the PDF parser) with no
  provisional-income mechanics, so strategies that change other income (Roth conversions,
  harvesting, QCDs) never show their knock-on SS-taxability effect — a first-order term for
  65+ clients. Add `ssBenefitsGross` (form field + parser maps the gross "6a" amount instead of
  folding taxable "6b" into otherIncome), and compute §86 in the engine: base amounts $25,000
  single/HoH, $32,000 MFJ, $0 MFS (statutory, never indexed), 50%/85% tiers, 85%-of-benefits cap.
  Verified example of the current distortion: MFJ, $55k SS + $50k IRA income, a $30k harvest drags
  ~$12.3k of additional SS into income — ~$1,470 of real federal cost the model shows as $0.

- [x] **EN2. Model Roth conversion income as a first-class engine line.** (S/high)
  Add a `rothConversionIncome` profile field (generic name so both IRA and in-plan conversions
  share it): ordinary income in `totalIncome`, **excluded from the NIIT `nii` base**
  (§1411(c)(5) — conversions raise MAGI but are not investment income; folding into `otherIncome`
  would tax them 3.8% wrongly once EN4 lands). This is the enabling change for LB1/SF3.

- [x] **EN3. Promote §461(l) from quantified warning to actual disallowance + NOL carryforward.** (M/high)
  The engine already computes `excessBusinessLoss` and the scenario `state` already carries
  multi-year memory. Do the real thing: add the excess back to income in the disallowance year
  (use `rentalAllowed`, not raw `rentalNet`, so §469 suspension applies first), carry it as
  `state.nolCarryforward`, deduct in later years capped at 80% of pre-NOL taxable income —
  computed **without** the §199A deduction per §172(a)(2)(B)(ii) (i.e. against
  `max(0, agi − deduction)` before `qbiDeduction()`). The add-back legitimately raises AGI-keyed
  phase-outs in the disallowance year — that is real law, not a side effect to suppress.
  Update CLAUDE.md's not-modeled list + the fine print together (repo convention).

- [x] **EN4. Give short-term gains a first-class field.** (M/medium)
  The parser isolates ST gains but dumps them into `otherIncome`, which is excluded from the
  NIIT base — so ST gains escape the 3.8% NIIT entirely and are indistinguishable from pensions.
  Add `shortTermGains`: ordinary-rate, in `nii`, netted with `ltcg` before the §1211(b) clamp.

- [x] **EN5. Carry negative QBI forward per §199A(c)(2).** (S/medium)
  `qbiDeduction()` floors combined QBI at 0 — a loss year's negative QBI simply evaporates
  instead of reducing next year's QBI. Net `state.qbiLossCarryover` before flooring; the
  carryover-reduced figure must also drive the OBBBA $400-minimum floor check
  (`qbiIncome >= qm.floorQBI`), or a loss-carryover year could wrongly claim the minimum.
  Update the not-modeled list + fine print together.

- [x] **EN6. Model the refundable ACTC instead of hard-capping CTC at tax liability.** (S/medium)
  Any scenario that drives income tax to zero silently forfeits the whole CTC today. Add
  `ctc.refundableMax: 1700` (2026, Rev. Proc. 2025-32 §4.05) and compute
  `refundable = min(unusedCTC, 1700 × kidsCTC, 0.15 × max(0, earnedIncome − 2500))`.
  The §24(d)(1)(B)(ii) 3+-child alternative (SS/SE tax over EIC) is acceptable to skip for this
  clientele — note the omission in the tables comment.

- [x] **EN7. IRMAA cliff warnings for Medicare-age clients (notes, not tax math).** (S/medium)
  Follow the §461(l)-note precedent: when `age65Count > 0` (or a "Medicare within 2 years"
  checkbox — IRMAA looks back two years, so it bites 63+ today), compare each projection year's
  MAGI against the 2026 IRMAA tiers (first tier above $109,000 single / $218,000 MFJ; a
  first-tier crossing costs a couple ≈ $2,300/yr in Part B+D surcharges; MFS has its own harsher
  tier structure — model it explicitly). Quantified note: "…$W of income reduction would step
  back below the tier."

## SF. Strategy-math fidelity (existing modeled strategies)

- [ ] **SF1. Model state entity-level tax in c-corp-conversion and s-corp-election.** (M/high)
  Both remove income from the personal state base with no entity-side state tax, showing phantom
  state savings (the C-corp JSDoc even admits it, with no user-facing note). Add a
  `corpStateRatePct` input (default = personal state rate, editable to 0 — WY/SD/NV have no
  corporate income tax; TX/OH/WA use gross-receipts taxes), deductible against the 21% federal
  base, routed into `otherTaxes`/state totals. Label it a starting-point estimate.

- [ ] **SF2. QSBS state-conformity input.** (S/high)
  `qsbs-1202.js` reduces `ltcg` and the flat state rate then shows phantom **state** savings in
  nonconforming states — $200,000 on the default $2M exclusion at a 10% rate. Add a
  `stateConforms` select backed by a generic state add-back field (the exact pattern
  `ptetDeducted` already established). 2026 nonconforming examples: CA, PA, AL, MS.
  (Do **not** cite NJ — it enacted §1202 conformity effective for tax years beginning 1/1/2026.)

- [x] **SF3. Promote in-plan Roth conversion to modeled.** (M/high)
  Its own note tells the advisor to size conversions against the scenario's final bracket
  picture — exactly what the engine can compute. Inputs `conversionAmount` (currency, **not**
  `grows` — a one-time conversion must not compound) + `conversionYear` (1-based, clamped to the
  horizon); apply at applyOrder 89–90 (**88 collides with ptet.js**) so it stacks after every
  deduction strategy; route through EN2's `rothConversionIncome`.

- [ ] **SF4. SECURE 2.0 catch-up fidelity.** (S/medium)
  Three gaps with constants already sitting in the tables: (1) the 60–63 enhanced catch-up
  ($11,250) — solo-401k's binary 50+ select understates 60–63 owners by $3,250 × marginal rate;
  (2) the §414(v)(7) mandatory-Roth catch-up for owners with **prior-year** FICA wages > $150k
  (deferral still counts against the raised §415(c) cap per §414(v)(3) — Roth designation changes
  deductibility only, not limit accounting); (3) the SIMPLE age-50 catch-up ($4,000).

- [ ] **SF5. Track the §1212(b) capital-loss carryforward through the projection.** (M/medium)
  The engine reports `capitalLossDisallowed` then drops it; harvested losses beyond $3k
  evaporate, understating gain-loss-harvesting. Mirror the `state.suspendedRentalLoss` trio.
  Carryforwards retain ST/LT character — either two buckets or one bucket applied LT-first (the
  conservative, benefit-understating order) with a note saying so.

- [ ] **SF6. profit-sharing-new-comparability: cap owner allocation at compensation.** (S/medium)
  §415(c) is the lesser of $72,000 or 100% of comp, and §404(a)(3) limits the deduction to 25%
  of pay — an S-corp owner with $60k wages can currently model an unlawful $72k allocation.
  `ownerComp = ownerWages > 0 ? min(ownerWages, §401(a)(17) $360k) : min(scheduleCNet × .9235, $360k)`;
  warn at ~20% of net SE earnings for the SE case (§404(a)(8) circularity), 25% for W-2; guard
  the zero-comp case with a refusal note.

- [ ] **SF7. bonus-depreciation / section-179: class-life select (5/7/15-year).** (S/low)
  Both hard-code a 7-year SL baseline; for 5-year property year-1 benefit is overstated ≈5.7% of
  basis. Add a `classLife` select; give-back years can read `params.classLife` directly (no state
  needed — apply() receives params every year). Update the year-1 note text to name the class.

## LB. Library additions

- [x] **LB1. Modeled Roth conversion (bracket-fill) strategy.** (M/high)
  Both existing Roth entries are advisory and punt on sizing. Add `roth-conversion.js`
  (modeled) on top of EN2: `conversionAmount`, `yearsToConvert`/every-year toggle. The scenario
  column then shows the TRUE all-in cost including every cascade already modeled (SALT
  phase-down, senior-deduction MAGI phase-out, CTC, QBI phase-in, IRMAA warning once EN7 lands).
  Pair with SF3; advisory pairing notes toward DB/cost-seg/NOL years — do **not** use
  `requiresOneOf` for that (it's validator-enforced and would block the standalone income-valley
  use case).

- [ ] **LB2. Qualified Charitable Distributions (QCD), 70½+.** (S/high)
  Absent from the library, yet the engine models the three post-OBBBA reasons QCDs beat itemized
  gifts: the §170(p) 0.5%-AGI floor, the senior-deduction MAGI phase-out, and the SALT-cap
  phase-down (plus NIIT MAGI). apply() reduces `otherIncome`; 2026 limit **$111,000**/person
  (Rev. Proc. 2025-32); one-time split-interest election $55,000. Gate on `age65Count > 0` with
  a note that true eligibility is 70½ (§408(d)(8)) and RMDs begin at 73 (75 if born 1960+).
  Soft-validate against otherIncome only (it's a lump of IRA+pension+SS after import).

- [ ] **LB3. Donate appreciated stock instead of cash.** (S/medium)
  The gain-avoidance half of charitable giving is praised in daf-bunching prose but modeled
  nowhere. `appreciated-stock-gift.js`: in "replaces a planned sale" mode, reduce `ltcg` by
  (FMV − basis) when the baseline contains the gain; in "replaces planned cash gift" mode the
  avoided gain is future/invisible to the engine — advisory note only, no number.

- [ ] **LB4. Equity-compensation suite: modeled NSO timing + advisory ISO/83(b).** (M/high)
  Zero equity-comp coverage today despite the high-earner clientele. `nso-timing.js` (modeled)
  moves exercise spread between year 0/1 on `wages` (FICA/Additional-Medicare flow automatically),
  sibling of bracket-management.js. Center NSO exercise as the lever — RSU vesting is
  employer-scheduled and deferrable only via a §409A-compliant advance election (say so).
  `iso-amt-83b.js` advisory-only: this engine computes no AMT, and ISO exercise is exactly where
  regular-tax-only numbers mislead.

- [ ] **LB5. 529 / education funding with OBBBA expansions.** (M/medium)
  Advisory federal side (OBBBA: K-12 limit $10k→$20k for tax years beginning after 12/31/2025;
  expanded K-12 categories + postsecondary credentialing effective at enactment 7/4/2025;
  SECURE 2.0 $35k 529→Roth; 5-year gift front-loading $95k/person) + one modelable piece: the
  state-deduction effect via the entered state rate.

- [ ] **LB6. SIMPLE-to-safe-harbor-401(k) mid-year replacement (SECURE 2.0 §332).** (S/medium)
  The library models the two endpoints but not the transition a CPA actually advises an outgrown
  SIMPLE sponsor on. Advisory-only (prorated transition-year limits depend on the exact
  conversion date). Note: safe-harbor-401k is advisory/no-op, so today selecting it alongside
  simple-ira produces **no** conflict warning at all — this strategy fills that guidance void.

- [ ] **LB7. OBBBA "Trump accounts" employer-contribution fringe.** (S/low)
  Advisory; verify details against P.L. 119-21 §70204 + Notice 2025-68 before authoring. Key
  facts to verify: $5,000/yr contribution cap; $1,000 pilot seed (births 2025–2028); employer
  exclusion **$2,500 per employee in aggregate** (not per child), counting against the $5,000 cap.

- [ ] **LB8. Oil & gas working-interest IDCs.** (S/low)
  Advisory, risk-flagged: §263(c) year-1 IDC expensing; §469(c)(3) makes a working interest
  statutorily non-passive. Un-modelable here because of the §57(a)(2) AMT preference — though
  note §57(a)(2)(E) caps the preference for independent producers; honest framing is "AMT
  exposure is real but limited, and this tool computes no AMT at all."

## WF. Builder workflow

- [ ] **WF1. Live per-strategy incremental savings preview in the picker.** (M/high)
  On checkbox/param change (debounced), run the shared `TSIQ.incrementalSavings` and render a
  signed dollar chip per checked row + a running scenario total in the box header. **Fix
  alongside (real bug found in verification): the pitch deck and slideshow currently call
  `incrementalSavings` with the un-overridden `lastRun.profile`, so when per-scenario fact
  overrides are active, per-strategy figures are inconsistent with the scenario totals printed
  beside them.** Pass the override-merged profile everywhere.

- [ ] **WF2. Parameter solver: "Optimize this input" grid sweep.** (M/high)
  The engine is pure and ~0.04 ms per 10-year scenario — a 60-point sweep + refinement is <10 ms.
  Add `TSIQ.optimizeParam(...)` + a Solve button on params flagged `solveable: true`. For
  s-corp-election salary, require an advisor-entered reasonable-comp floor (cite *David E.
  Watson, P.C. v. United States*, 668 F.3d 1008 (8th Cir. 2012) — matching the cite already in
  the strategy). Good first targets: s-corp salary, solo-401k/sep-ira contributions,
  daf-bunching `bunchedContribution`. (Not PTET — its rate is state-law-fixed, not plannable.)

- [ ] **WF3. Threshold-proximity strip ("where this client sits").** (M/high)
  One `computeYear` on Section 1 change; render signed dollar distances to each modeled cliff —
  QBI threshold/phase-in end (SSTB flagged separately), SALT phase-down start, NIIT MAGI, CTC
  phase-out, additional-Medicare, §461(l), senior-deduction MAGI. All constants already in the
  tables. This is what turns the tool from a calculator into a strategy-finder.

- [ ] **WF4. Marginal + effective rate readout.** (S/high)
  Finite differences on the pure engine: Δburden per +$1,000 of ordinary business income, LTCG,
  and above-the-line deduction — captures composite effects no rate table shows (QBI phase-in,
  SALT phase-down band, NIIT, CTC steps). Also add effective-rate and marginal-rate rows per
  scenario column using each year's returned post-strategy `result.profile`.
  **Implementation trap (verified): `computeYear` mutates its `state` argument
  (`state.suspendedRentalLoss`) — every finite-difference call must pass a fresh `{}`.**

- [ ] **WF5. Surface suggest() inside the picker.** (S/medium)
  Suggestions currently render only in the Section 1 panel. Add "★ Suggested" badges on picker
  rows (reason as visible text), auto-open categories containing suggestions with counts, and a
  per-row "use suggested params" affordance.

- [ ] **WF6. Scenario diff strip.** (S/medium)
  Pure function over `readSelections` + overrides: "Scenario 3 = Scenario 2 + Cost Segregation,
  − PTET; salary $80,000 → $110,000; overrides: MFS." Render above Run Comparison and beside the
  results table.

- [ ] **WF7. Undo stack over serializeState/applyState.** (M/medium)
  The round-trip already exists (autosave/import). Bounded snapshot stack; eager snapshot before
  the three destructive bulk operations (client-file import, PDF Apply, Copy Scenario 2→3);
  restore via the reset-first pattern importClientFile already uses.

## ET. Estimate transparency

- [ ] **ET1. Per-strategy contribution table in the advisor panel, with zero-effect flags.** (M/high)
  `incrementalSavings` is computed only inside the deck renderers — the CPA never sees
  per-strategy dollars while building. Render a "what each strategy contributes" table in
  renderResults; badge any modeled strategy contributing ~$0 ("no modeled effect for this client
  — check parameters or remove before generating client documents").

- [ ] **ET2. Timing vs permanent: per-strategy cumulative + a `character` field; split the
  headline.** (M/high)
  Per-strategy figures headline the year-1 delta, which structurally overstates acceleration
  strategies (8 strategies have explicit later-year give-backs), and the cumulative headline
  blends permanent savings (entity/FICA/QBI/credits) with deferral (pre-tax retirement
  contributions that come back out as income beyond the window). Capture each step's cumulative
  delta in `incrementalSavings`; add `character: 'permanent'|'timing'|'deferral'` to strategy
  metadata; split the client-facing cumulative headline into "permanent savings" + "tax
  deferred" lines.

- [ ] **ET3. Disclose order-dependent attribution.** (S/high)
  Incremental attribution telescopes (the plan total is exact) but the per-strategy split
  depends on applyOrder — disclosed today only in a code comment. One visible sentence wherever
  per-strategy figures print. Optionally add an "each-strategy-alone" view with an explicit
  interaction/synergy remainder line (the remainder concept only exists in the alone view).

- [ ] **ET4. Calculation-trace popup (audit trail).** (M/high)
  `computeYear` already returns nearly every intermediate; render a full waterfall per
  scenario-year (income items → §1211 netting → AGI → deduction detail incl. SALT cap/charitable
  floor/2-37 → QBI → TI → per-bracket ordinary tax → LTCG stacking → credits → other taxes) via
  the existing popup plumbing. Lets a CPA tie any number to their tax software — the single
  biggest trust feature for the "accuracy over speed" ethos.

- [ ] **ET5. Near-tie detection in bestScenario + advisor override.** (M/medium)
  A $40 cumulative margin silently drives every client document today. Return the margin; below
  max($1,000, 0.25% of baseline burden), tell the advisor the model can't meaningfully rank the
  scenarios, and let them pick which one drives client outputs.

- [ ] **ET6. Baseline calibration panel: model vs the filed return.** (M/medium)
  The parser's `result.reference` (filed AGI/TI/tax) is discarded after Apply except the two
  safe-harbor fields. Persist it and render model-vs-filed line-by-line with the delta and the
  legitimate reasons they differ (prior-year law vs 2026, lumped otherIncome, flat state rate).

- [ ] **ET7. Precision framing on client-facing headlines.** (S/medium)
  Add `TSIQ.fmt.usdApprox` (nearest $100, "≈" prefix) for client PDF/slideshow/pitch-deck
  headline figures; keep exact dollars in the advisor panel.

## PJ. Projection realism

- [x] **PJ1. Sunset-aware law schedule.** (M/high)
  The tables' own comment says the senior deduction is temporary (2025–2028), yet the engine
  grants it in projection years 2029–2035 — enacted law, not an unknowable CPI assumption, so
  it's different in kind from the disclosed no-indexing simplification. Add
  `sunsetTaxYear`/`effectiveTaxYear` support on table entries, plumb the projection tax year into
  `computeYear`, and audit the tables for every temporary provision — including the SALT cap's
  enacted schedule (rises ~1%/yr through 2029, then **reverts to $10,000 in 2030**, which also
  makes PTET *more* valuable in later years; verify the exact schedule in P.L. 119-21 §70120
  before hardcoding). Note the change in the fine print.

- [x] **PJ2. One-time vs recurring income.** (S/high)
  `grownProfile()` grows and replays every income field — a one-time $400k year-1 gain becomes
  ~$1M+ of phantom gains across a 10-year baseline, and the gain-targeted strategies (OZ, CRT,
  harvesting, installment sales) are priced against that fiction. Add a "one-time (this year
  only)" checkbox for `ltcg` and `otherIncome`; zero them in years 2+ when set.

- [x] **PJ3. Per-stream growth for deductions.** (S/medium)
  Growing `mortgageInterest` at the income rate is directionally wrong (amortizing interest
  declines); by year 10 it's 34%+ overstated, distorting the itemize-vs-standard flip and the
  AGI-keyed phase-outs. Split GROWTH_FIELDS: hold itemized-deduction fields flat (or a separate
  rate); disclose in the fine print.

- [ ] **PJ4. Growth-rate + assumption sensitivity band.** (M/medium)
  Re-run baseline/best at 0% growth (2 extra scenario runs, ~free) and present the cumulative
  claim as a range; optionally a small tornado table perturbing business income ±15%, growth
  ±2pts, state rate ±1pt — "which assumption moves this answer" is the honest framing for a
  single-rate 10-year compound.

- [x] **PJ5. WOTC default to one claimed year.** (S/low)
  wotc.js banks the credit for every projection year (the recurring-hires assumption *is*
  disclosed in a note, and the authorization-lapse warning exists — this is a default-honesty
  tweak, not a bug). Add a "years claimed" input defaulting to 1, matching how energy-credits
  and §179D already behave.

- [ ] **PJ6. Income-transition events ("retires in year N", "sells in year N").** (L/medium)
  The projection can only model smooth compounding — clients within sight of retirement are
  structurally wrong in both columns. Lightest fit: an "income changes" mini-panel (extending
  the F7 overrides pattern) with up to 2 rows of {fromYear, field, set-to/multiply-by, value},
  applied in `grownProfile()` after the growth factor.

---

*45 verified candidates → 40 items after merging duplicates (Roth conversion appeared in three
dimensions; marginal-rate, sensitivity, and timing-split each in two).*
