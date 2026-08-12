# Client File Format (`*.tsiq.json`)

The interchange format between Claude (reading a prior-year tax return) and the
app's **Import Client File** button. One file per client.

## Rules for producing a client file from a tax return

1. **Never invent numbers.** Extract only what the return shows. If a value is
   not determinable, omit the key (the app keeps its default) and add a
   question to `notes` (e.g., "Could not find K-1 ordinary income — confirm").
2. Map to **the profile keys below** — they match the app's Section 1 fields.
3. All dollar amounts are plain numbers (no strings, no commas).
4. `suggestedStrategies` is a shortlist (typically 3–8) of strategy `id`s from
   `js/data/strategies/` that plausibly apply, each with a one-sentence
   `reason` grounded in the return data ("$210k Schedule C profit with no
   entity — SE tax exposure"). Optionally include `params` (matching the
   strategy's `inputs` keys) when the return supports an estimate.
5. Suggestions are leads for the CPA to evaluate — never present them as
   conclusions. The advisor validates every one.
6. Prior-year returns use prior-year law; the app computes 2026. Flag any
   figure that is likely to change materially in `notes`.
7. `priorYearTax`/`priorYearAGI` come from the SAME return's own total-tax
   (Form 1040 line 24) and AGI (line 11) — the return you are reading to
   populate everything else IS the prior year for §6654 safe-harbor
   purposes.

## Schema

```json
{
  "format": "tsiq-client-v1",
  "clientName": "Jane & John Sample",
  "sourceReturn": "2025 Form 1040",
  "profile": {
    "filingStatus": "mfj",          // single | mfj | mfs | hoh
    "wages": 0,                      // W-2 wages from outside jobs
    "scheduleCNet": 0,               // Schedule C net profit
    "passthroughK1": 0,              // S-corp/partnership ordinary income
    "entityW2Wages": 0,              // W-2 wages paid by the entity (§199A)
    "ownerWages": 0,                 // client's OWN W-2 wages from that entity (existing S-corp owner)
    "isSSTB": false,
    "rentalNet": 0,                  // Schedule E net rental
    "rentalLossesUsable": true,
    "reNonPassive": false,           // real-estate professional / materially participates
    "ltcg": 0, "qualDiv": 0, "interest": 0, "otherIncome": 0,
    "propertyTax": 0, "mortgageInterest": 0, "charitable": 0, "otherItemized": 0,
    "kidsCTC": 0,                    // qualifying children under 17
    "otherDeps": 0,
    "age65Count": 0,                 // count (0-2) of filer/spouse age 65+
    "fedWithholding": 0, "fedEstimates": 0,
    "stateWithholding": 0, "stateEstimates": 0,
    "priorYearTax": 0,               // prior-year Form 1040 total tax (§6654 safe-harbor input)
    "priorYearAGI": 0,               // prior-year AGI (§6654 100%/110% test)
    "stateRatePct": 5,               // percent, not decimal
    "years": 10, "growthPct": 3
  },
  "suggestedStrategies": [
    {
      "id": "s-corp-election",
      "reason": "$210k Schedule C profit, no entity — every dollar bears SE tax.",
      "params": { "salary": 95000 }
    }
  ],
  "notes": [
    "Rental depreciation on Sch E looked like straight-line only — cost seg candidate.",
    "Confirm whether either spouse has an employer 401(k)."
  ]
}
```

## Confidentiality

Do not include SSNs, EINs, addresses, or account numbers in the client file —
the app never needs them. When asking Claude to read a return, redacting the
SSN first is good practice.
