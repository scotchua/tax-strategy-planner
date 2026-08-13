# Findings 2B — strategy coordination defects

Produced by the overstated-savings invariant pass. Every number below was
reproduced directly against the engine, on the linearized test bed described in
`scripts/test-invariants.js` (MFJ, $900,000 Schedule C, $3,000,000 of
`entityW2Wages` so the §199A wage limit never phases in, no capital gains, no
itemized deductions, one year, zero growth). On that bed progressivity is the
only remaining nonlinearity, and progressivity pushes toward sub-additivity, so
a super-additive result there is a real defect rather than an artifact.

**Fixed already** are listed first. **Awaiting a call** are the ones where the
math cannot be changed without deciding what the strategy is supposed to mean,
so they sit in the `KNOWN_DEFECTS` registry in `scripts/test-invariants.js` and
print on every run.

Nothing here is a tax position for a client. It is all internal: what the tool
computes versus what it should compute.

---

## Fixed

### §415(c) tracker never reset between projection years

`state.dcAnnualAdditionsUsed` accumulated for the whole projection. §415(c) is
an **annual** additions limit, so a recurring contribution exhausted its
headroom and then deducted nothing.

Solo 401(k) at default params, MFJ, $900,000 Schedule C:

| Year | Deduction before | After |
|---|---|---|
| 1 | $44,500 | $44,500 |
| 2 | $27,500 | $44,500 |
| 3 | **$0** | $44,500 |
| 4 | **$0** | $44,500 |

One-directional understatement across the whole retirement family, which is the
most commonly recommended group in the library. Fixed in
`js/engine/scenario-engine.js` by resetting that one key at each year boundary.
Only that key: every other state key there is cumulative by design. Pinned by
fixture 35 in `scripts/test-engine.js`, which asserts the full deduction in all
five years AND that the cap still binds across the family within a single year.

### `installment-sale-business` drove `p.ltcg` negative

A `totalGain` larger than the entered LTCG produced a negative capital gain
(`totalGain` 5,000,000 against 500,000 of entered LTCG gave **-3,500,000**),
which the engine then read as a capital loss and turned into a §1211(b)
deduction plus a carryforward. A fabricated benefit out of a data-entry
mistake. All four sibling strategies that reduce `p.ltcg` (`qsbs-1202`,
`like-kind-1031`, `opportunity-zones`, `installment-sale-property`) already
clamp at zero. Fixed to match, and asserted for the whole received-income pool
family by I5.

### OBBBA senior deduction phase-out applied per return instead of per person

Covered in its own commit. Two-senior joint returns kept up to $6,000 of
deduction they were not entitled to, all the way to $350,000 of MAGI instead of
$250,000. Found by the §86 worksheet derivation pass.

---

## Awaiting a call

### 1. `simple-ira` suppresses whichever richer plan it is paired with

The Notice 98-4 exclusive-plan guard arbitrates on **apply order**, not on
amount. `simple-ira` (applyOrder 63) runs first, sets `state.hasSimplePlan`,
and every richer plan then declines to model itself.

| Paired with | That plan alone | simple-ira alone | Both selected |
|---|---|---|---|
| `cash-balance-stack` | $66,000 | $7,260 | **$7,260** |
| `defined-benefit-plan` | $49,500 | $7,260 | **$7,260** |
| `profit-sharing-new-comparability` | $16,085 | $7,260 | **$7,260** |

Adding a second strategy made the plan worse by up to $58,740 than the better
one alone. This understates, so it costs the client an opportunity rather than
exposing them, but it is the same broken coordination.

**The question:** should the guard pick the larger benefit rather than the one
that happens to run first? The exclusivity itself is correct (you cannot
maintain a SIMPLE and another qualified plan in the same year), so this is
about which one survives. My read is that it should arbitrate on amount, but
that changes recommended plan design, so it is your call.

### 2. `cash-balance-stack` and `defined-benefit-plan` stack two DB contributions

A cash balance plan **is** a defined benefit plan (§414(j)). Neither strategy
coordinates a dollar amount with the other and neither declares
`conflictsWith`.

| | Savings |
|---|---|
| `cash-balance-stack` alone | $66,000 |
| `defined-benefit-plan` alone | $49,500 |
| Both selected | **$111,782** |

Overstates by roughly $46,000 of deduction. A correct answer is no greater than
the larger of the two.

**The question:** are these meant to be alternative presentations of the same
plan (in which case they are mutually exclusive and the larger should win), or
does the firm ever model a genuine second DB arrangement? Also unmodeled either
way: the §404(a)(7) combined-plan deduction limit, which caps the employer
deduction when a DB and a DC plan cover the same employees.

### 3. `cash-balance-stack` does not participate in the §415(c) limit

It neither reads nor writes `state.dcAnnualAdditionsUsed`, even though its own
input label describes the contribution as "combined 401(k) + 6% profit sharing"
and therefore already contains the DC layer.

| | Savings |
|---|---|
| `solo-401k` alone | $14,685 |
| `cash-balance-stack` alone | $66,000 |
| Both | **$79,827** |
| `profit-sharing-new-comparability` alone | $16,085 |
| Both | **$81,146** |

Both overstate.

**The question:** does `combinedContribution` include the DC layer, as the label
says? If so, the strategy should register its DC portion in the shared tracker,
and the fix is a few lines. If the input is meant to be the DB layer only, the
label should change instead.

---

## Not asserted, recorded for judgment

### Depreciation write-offs have no basis registry

Seven strategies take first-year write-offs against asset basis
(`bonus-depreciation`, `section-179-expensing`, `heavy-vehicle-179`,
`cost-segregation`, `qip-bonus`, `partial-asset-disposition`,
`repair-vs-capitalization`) and nothing records which asset a write-off was
taken against. An advisor who enters the same $100,000 machine under both §179
and bonus depreciation gets both deductions. The shared
`state.acceleratedDepAccumulated` is only a recapture-materiality tracker, not a
basis ledger.

Not asserted because there is no way to tell from the inputs whether two entries
are the same asset or two different ones, and both are legitimate uses. A real
fix means either a per-asset tag on the inputs or a basis-claimed key. Worth
doing, and larger than a test.

### `s-corp-election` and `c-corp-conversion` silently no-op each other

Both open with `if (p.scheduleCNet <= 0) return unchanged` and both end with
`p.scheduleCNet = 0`. Selecting both means the second one silently contributes
nothing, with no note saying why. The combined result equals the first one
alone, which is arguably right, but the advisor sees a checked box that did
nothing. A note naming the strategy that consumed the income would fix the
transparency without touching the math.

### Health-reimbursement strategies can double-count the same premium dollars

`se-health-insurance`, `ichra`, `qsehra` and `section-105-merp` each carry an
independent dollar input with no shared tracker and no `conflictsWith`. Whether
that is double counting depends on facts the tool does not capture (whose
premiums, which entity, which plan year), so it needs a rule from you before it
can be asserted.

### `conflictsWith` is advisory only

`app.js` renders conflict warnings as non-blocking hint text and nothing
prevents checking both boxes. Several genuine exclusivities (the DB pair above,
the entity pair above) are not declared at all. Two separate decisions: which
exclusivities to declare, and whether declaring one should block selection or
just warn.

### Fourteen strategies carry a `character` label that looks wrong

The audit flagged `defined-benefit-plan`, `cash-balance-stack`, `simple-ira`,
`sep-ira`, `solo-401k` and `profit-sharing-new-comparability` as labelled
`deferral` while behaving as `permanent` in any horizon the tool runs: they
deduct in every year with no recognition event anywhere in the projection.
Also `like-kind-1031`, `land-building-allocation`, `daf-bunching` and
`partial-asset-disposition` labelled `timing` while behaving as permanent.

I did not write convergence assertions for these, and this is worth
understanding rather than just fixing. The obvious invariant — "a deferral's
cumulative savings should converge toward zero" — is **wrong for a recurring
annual deferral**. A solo 401(k) contributed every year genuinely reduces tax
every year; each year brings a fresh contribution, so cumulative savings should
grow. The label alone does not determine the invariant; you also need to know
whether the item is one-time or recurring, and whether the reversal falls inside
the projection horizon at all. For a retirement plan the recognition event is
decades out, past any horizon this tool models.

So the honest reading is that `deferral` here means "the tax comes back
eventually, outside this projection", which is real information for a client
conversation and is not testable as convergence. What would be worth adding is a
second dimension (one-time versus recurring) and a disclosure that a deferral's
cumulative figure excludes a recognition event outside the horizon. That is a
product decision, not a bug fix.

### Stale disclosures found while mapping

The excess-business-loss strategy's note still says the engine does not enforce
the §461(l) cap. It does now (Wave C). One-line correction, but it currently
tells the advisor the tool checked less than it did.

---

## Statutory cap register

A separate pass mapped every modeled strategy with a dollar input to the
statutory limit that governs it, then read the code to see whether the limit is
enforced. **42 caps mapped, 18 not enforced.** The mechanical part of this is now
asserted by I10, which fails when a constant already sitting in
`TABLES_2026.limits` has no arithmetic consumer at all.

### Dead constants: a cap the tables already know and nothing reads

| Constant | Value | Should be enforced by |
|---|---|---|
| `limits.qsbs.perIssuerCap` | $15,000,000 | `qsbs-1202` |
| `limits.qsbs.grossAssetCap` | $75,000,000 | `qsbs-1202` |
| `limits.retirement.dbAnnualBenefit` | $290,000 | `defined-benefit-plan` |

`qsbs-1202` clamps its exclusion to the available LTCG but never to the §1202
per-issuer cap. `defined-benefit-plan` is the least bounded modeled strategy in
the library: the only clamp in the file limits the contribution to Schedule C
profit on the self-employed branch, and the W-2-owner branch has no cap at all.

Six further constants are unread **by design** (IRA limits, §79 group term life,
the kiddie-tax threshold, the gift and estate figures). They support advisory
strategies with no scenario math, and are now listed explicitly as
`REFERENCE_ONLY` in the test with the reason, so "unused" is a stated decision
rather than an oversight.

### Uncapped, and the ceiling is not in the tables yet

Each of these needs a new constant before it can be enforced, which is why none
is asserted:

- `childcare-credit-45f` — the §45F(b) annual cap ($500,000, $600,000 for
  eligible small businesses) is stated in the strategy's own advisor text but
  exists nowhere in the tables or the code.
- `qsehra` — the §9831(d)(2) indexed per-employee cap.
- `energy-179d` — §179D is a per-square-foot deduction and the strategy takes a
  flat dollar amount with no rate, no square footage, and no ceiling.
- `daf-bunching` — the §170(b)(1) AGI percentage ceilings (60% cash, 30%
  appreciated property) are modeled nowhere, and the strategy says so in a note.
- `education-529` — the state deduction is unlimited; `stateOnlyDeduction` flows
  straight into the state base with no ceiling.
- `nol-planning` — the §172(a)(2) 80% limitation genuinely does not reach an
  advisor-entered NOL, because the strategy bypasses the engine's own NOL path.
  The disclosure was corrected to say exactly that.
- `heavy-vehicle-179` — no §179 dollar limit, no SUV cap, no §179(b)(3)
  business-income limitation, no §280F ceiling, and no GVWR input to decide
  which regime applies.
- `section-179-expensing` — half enforced. The dollar limit IS clamped; the
  §179(b)(2) phase-down above `phaseOutStart` is not, and appears only inside a
  note string.
- `profit-sharing-new-comparability` — `ownerAllocation` is correctly capped at
  §415(c) and owner compensation, but `staffCost` has no limit at all.
- `cash-balance-stack` — clamped only to owner earned income; no §415(b), no
  §415(c), no §404(a)(7).
- `spouse-payroll` — FICA is charged at 7.65% on every dollar of spouse salary
  with no Social Security wage base cap, so a large salary is overcharged.

### Suggested order

1. The three dead constants. The ceilings already exist; this is wiring.
2. `spouse-payroll`'s missing wage base cap. Pure arithmetic, no judgment.
3. `section-179-expensing`'s phase-down. The constant exists.
4. The rest, each of which needs a new table constant sourced and cited.

Everything in this section is a *bound* on what an advisor can type, not a
change to what a correct entry produces. None of it affects a plan built with
plausible figures; all of it affects what happens when someone fat-fingers one.
