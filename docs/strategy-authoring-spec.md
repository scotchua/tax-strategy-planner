# Strategy Authoring Spec

Read this fully, plus `CLAUDE.md`, `js/data/strategies/cost-segregation.js` (a
MODELED example) and `js/data/strategies/augusta-rule.js` (note its validation
pattern) before writing any strategy file. Follow the existing files' style
exactly: same header comment format, same `TSIQ.strategyModules.push({...})`
registration, plain ES5 JavaScript (no arrow functions, no template literals,
no `const`/`let`).

## File location and naming

One strategy per file in `js/data/strategies/<id>.js`. The `id` is kebab-case
and matches the filename. Do NOT edit any shared file (index.html, engine,
app.js, other strategies) — your files are picked up by a registry rebuild.

## Required schema

```js
{
  id, name, category, applyOrder,          // category and applyOrder assigned in your task
  modeled: true|false,                     // false = advisory-only (see below)
  advisor: {
    summary,                               // 3-6 sentence technical summary
    mechanics: [...],                      // 4-6 bullets, full technical depth
    authority: [{type, cite, note}, ...],  // 4-8 entries — see citation discipline
    requirements: [...],                   // 3-5 bullets
    risks: [...],                          // 3-6 bullets incl. exam issues
    bestFit: [...],                        // 2-4 bullets
    implementation: [...]                  // 4-6 concrete steps with forms/deadlines
  },
  client: {
    teaser,                                // ONE line, enticing but must NOT identify
                                           // the strategy (used in anonymized pitch deck)
    headline,                              // one line
    plainEnglish: [...],                   // 2-3 paragraphs, 8th-grade level, no jargon/cites
    analogy,                               // one relatable sentence or two
    benefits: [...],                       // 3-4 bullets
    steps: [...],                          // 3-4 bullets ("we handle it" tone)
    considerations: [...]                  // 1-3 honest caveats in plain language
  },
  inputs: [...],                           // [] for advisory strategies
  appliesTo: function (profile) { return true; },
  apply: function (profile, params, yearIndex, state) { ... },
  suggest: function (profile) { ... },      // OPTIONAL — see "Suggestion screening" below
  conflictsWith: ['other-strategy-id'],     // OPTIONAL — see "Conflict/prerequisite metadata"
  requiresOneOf: ['other-strategy-id']      // OPTIONAL — see "Conflict/prerequisite metadata"
}
```

`authority.type` is one of: `'IRC'`, `'Reg'`, `'Case'`, `'Admin'` (rev procs,
rev ruls, notices, forms, IRS guides).

## Citation discipline (non-negotiable — built by a CPA, accuracy over speed)

- Cite ONLY authorities you are highly confident exist and say what you claim.
  IRC sections and major regs are usually safe; court cases are where
  hallucinations happen. If you are not certain of a case name + citation,
  OMIT IT — an entry list without a case is fine; a fabricated case is not.
- OBBBA (P.L. 119-21, July 2025) changed many provisions. Use the 2026 figures
  in `js/data/tax-tables-2026.js` (`TSIQ.TABLES_2026.limits`) — reference them
  in code via the tables object where used in `apply()`, and you may state them
  in advisor text.
- Post-OBBBA facts to respect where relevant: 100% bonus depreciation permanent
  (§168(k), property acquired after 1/19/25); §179 max $2,560,000 / phase-out
  $4,090,000 (2026); QBI permanent with widened phase-in; SALT cap $40,400 with
  phase-down; estate/gift exemption $15M PERMANENT (no sunset — do not say
  "before the sunset"); §1202 QSBS tiered 50/75/100% at 3/4/5 years with $15M
  cap for stock acquired after 7/4/25; residential clean energy credit (§25D)
  terminated after 2025; §174 domestic R&D expensing restored; misc 2% itemized
  deductions permanently gone; kiddie-tax threshold $2,700 (2026); DCFSA $7,500
  (2026); business mileage $0.725/mi (2026).

## MODELED vs ADVISORY strategies

**Modeled (`modeled: true`)**: has `inputs` and an `apply()` that transforms the
profile so the engine can quantify it. Never invent precision — model the
mechanical tax effect of advisor-entered amounts, and validate applicability
(see augusta-rule.js: if the profile lacks what the strategy needs, return the
profile unchanged with an explanatory note telling the advisor what's missing).

**Advisory (`modeled: false`)**: structural/planning strategies whose value
can't be honestly computed from return inputs (e.g., buy-sell agreements,
series LLCs). Full advisor + client content, `inputs: []`, and:

```js
apply: function (profile, params, yearIndex, state) {
  return { profile: profile, notes: yearIndex === 0
    ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
    : [] };
}
```

## Suggestion screening — `suggest(profile)`

Optional. `TSIQ.suggestStrategies(profile)` (`js/engine/suggest.js`) calls
every strategy's `suggest()` against whatever is currently in Section 1 (on
page load with defaults, and again whenever a client file/PDF is imported)
to build the "Suggested Strategies" panel. It is deterministic rule-of-thumb
screening, not AI — a plain `if` on profile fields.

```js
suggest: function (p) {
  if (!(p.scheduleCNet >= 75000)) return null;   // null = does not fire
  return {
    reason: TSIQ.fmt.usd(p.scheduleCNet) + ' of Schedule C profit bears SE tax on every dollar.',
    params: { salary: Math.round(p.scheduleCNet * 0.4 / 1000) * 1000 }  // OPTIONAL
  };
}
```

- Return `null` (or falsy) when the rule doesn't apply — don't throw. A
  throw is caught by the collector (a bad rule never blocks the rest of the
  list) but is still a bug; `scripts/validate-strategies.js` calls
  `suggest()` against 4 synthetic profiles specifically to catch this.
- `reason` is a single sentence, grounded in the actual numbers in `p`
  (interpolate real values — see the example above), shown next to the
  strategy name in the suggestions panel.
- `params` is optional — a starting-point guess for the strategy's `inputs`
  keys (the advisor can still change every value before running the
  comparison). If you include it, every key must be a real declared input
  key — the validator checks this.
- Keep the condition genuinely rule-of-thumb (a single dollar threshold or
  simple boolean combination) — this is a screening pass over ~100
  strategies, not a place to reimplement `apply()`'s math.

## Conflict/prerequisite metadata

Optional. Two arrays of OTHER strategies' `id`s, shown as a non-blocking
warning badge next to the strategy's checkbox in the scenario picker the
moment both are checked (or the prerequisite is missing) — see
`updateConflictBadges()` in `app.js`. Neither ever blocks Compute; they are
a hint for the advisor, not a validation rule.

- `conflictsWith: ['other-id', ...]` — for strategies that are mutually
  exclusive by rule (e.g. a SIMPLE IRA and any other qualified plan for the
  same year under Notice 98-4). **Must be reciprocal** — if A lists B, B
  must list A back; `scripts/validate-strategies.js` fails the build
  otherwise (a one-sided entry is a missed reciprocal add, not a legitimate
  asymmetric relationship).
- `requiresOneOf: ['other-id', ...]` — for a strategy that's usually only
  meaningful alongside one of the strategies listed (e.g. PTET usually
  wants an S-Corp Election in the same scenario). This is a soft hint only:
  a client who already has the relevant income/entity from their existing
  facts (not from checking that other strategy in THIS scenario) won't need
  it, so word the strategy's own notes/badge text to acknowledge that
  rather than treating the badge as an error state.

## `grows: true` on a currency input

Optional, on an `inputs[]` entry with `type: 'currency'` only (the validator
rejects it on any other type). Without it, a strategy's dollar param (e.g. a
spouse's salary) stays flat in nominal dollars for the whole projection while
the client's income compounds via the assumed growth rate — set `grows: true`
on any input that represents a RECURRING amount that would realistically
scale with the business/client's income (a salary, a recurring admin cost).
Do NOT set it on a one-time amount (an asset's purchase price/basis,
a building's cost) — those are correctly modeled once, in year one, not
scaled up every later year. `scenario-engine.js`'s `growParams()` applies
the scaling before calling `apply()`; nothing else needs to change.

## Profile fields available to apply()

Never mutate — copy with `var p = Object.assign({}, profile);` and return
`{ profile: p, notes: [...] }`. Push user-facing notes only in `yearIndex === 0`
unless the note is year-specific.

| Field | Meaning |
|---|---|
| `wages` | outside W-2 wages |
| `ownerWages` | W-2 wages from client's own entity (engine charges both FICA halves) |
| `scheduleCNet` | sole-prop net profit (SE tax + QBI) |
| `passthroughK1` | S-corp/partnership ordinary income (QBI, no SE) |
| `entityW2Wages` | entity W-2 wages, drives §199A wage limit |
| `isSSTB` | SSTB flag |
| `rentalNet` | Schedule E net; `rentalLossesUsable` gates §469 losses |
| `reNonPassive` | real-estate professional / materially participates — rental treated as non-passive for NIIT (independent of `rentalLossesUsable`, which is a separate §469 current-usability flag) |
| `ltcg`, `qualDiv`, `interest`, `otherIncome` | investment/other income |
| `propertyTax`, `mortgageInterest`, `charitable`, `otherItemized` | itemized |
| `age65Count` | count (0-2) of filer/spouse age 65+, drives the senior deduction and additional standard deduction |
| `adjustments` | ADD above-the-line deductions here (retirement, SE health, HSA) |
| `qbiReduction` | ADD amounts that also reduce §199A QBI (e.g., SE retirement contributions) |
| `otherCredits` | ADD nonrefundable federal credits (R&D, WOTC, 45F, §44, 45S) |
| `corpTaxPaid` | ADD entity-level federal tax (C-corp modeling, 21% via `TSIQ.TABLES_2026.corporateRate`) |
| `ptetPaid` | entity-level STATE tax (PTET pattern) |
| `ptetDeducted` | ADD the K-1 income a PTET election reduced federally — added back for the STATE tax base only (see ptet.js) |
| `kidsCTC`, `otherDeps` | dependents |
| `stateRate` | flat state rate (decimal) |
| `priorYearTax`, `priorYearAGI` | prior-year Form 1040 total tax / AGI — §6654 safe-harbor inputs only; not read by `apply()` |

Multi-year memory: use the shared `state` object (see cost-segregation.js's
suspended-loss pattern) — namespace your keys (`state.myStrategyThing`).

`inputs[]` entries: `{ key, label, type: 'currency'|'percent'|'number'|'select',
default, max?, options? }`.

## Modeling honesty rules

- If a benefit is TIMING (acceleration/deferral), model the give-back in later
  years like cost-segregation.js does — never show acceleration as free money.
- If a strategy merely enables another (e.g., late S-election), be advisory and
  say so in notes.
- If the client-side of an income shift isn't modeled (e.g., a child's own
  return), cap defaults so the unmodeled side is ~zero tax and say so in a note.
- Deductions against `scheduleCNet` also save SE tax; against `passthroughK1`
  they don't; via `adjustments` they save neither SE tax nor state-SALT quirks.
  Route the dollars to the correct field.

## Tone

Advisor content: written CPA-to-CPA, full depth, forms and deadlines named.
Client content: plain English, no section numbers, honest about caveats.
Teasers must not name the mechanism (see existing files for calibration).

## Output

Create exactly the files assigned to you, then reply with: the list of file
paths created, which are modeled vs advisory, and any point where you were
uncertain about a figure or authority (so it can be verified).
