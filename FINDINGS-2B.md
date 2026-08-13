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
