/* ============================================================================
 * STRATEGY: Bad Debt Deduction Review (Accrual)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'bad-debt-review',
  name: 'Bad Debt Deduction Review (Accrual)',
  category: 'Business Expenses',
  applyOrder: 44,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A year-end review of the receivables aging for accrual-method ' +
      'businesses: §166 allows an ordinary deduction for business debts that ' +
      'became wholly worthless during the year, and — for business debts only ' +
      '— partially worthless debts to the extent charged off on the books. ' +
      'The income was already recognized when the receivable was accrued, so ' +
      'writing off the uncollectible balance simply stops the business from ' +
      'paying tax on money it will never see. Cash-method businesses get no ' +
      'deduction for unpaid invoices — the income was never recognized — which ' +
      'is why this review belongs on every accrual client\'s year-end ' +
      'checklist and no cash client\'s.',
    mechanics: [
      '§166(a)(1): wholly worthless business debts are deductible in the year ' +
      'worthlessness occurs — a facts-and-circumstances determination ' +
      '(debtor insolvency/bankruptcy, disappearance, failed collection efforts, ' +
      'lapse of time). No formal charge-off is required for total worthlessness, ' +
      'but booking it is best practice.',
      '§166(a)(2): PARTIALLY worthless business debts are deductible only up ' +
      'to the amount actually charged off on the books during the year — the ' +
      'specific charge-off is a statutory prerequisite (Reg. §1.166-3).',
      'Basis requirement (Reg. §1.166-1(e)): the deduction is limited to basis ' +
      'in the debt. Accrual receivables have basis (the income was recognized); ' +
      'a cash-method taxpayer\'s unbilled or unpaid revenue has none.',
      'Worthlessness is evidenced by objective facts: collection letters, ' +
      'agency referrals, judgments returned unsatisfied, debtor bankruptcy ' +
      'filings. Legal action is NOT required where the surrounding facts show ' +
      'it would not result in collection (Reg. §1.166-2(b)).',
      'Specific charge-off is the only method for most taxpayers — the reserve ' +
      'method was repealed for non-bank taxpayers in 1986. Book reserves for ' +
      'doubtful accounts are not deductible; only identified, charged-off ' +
      'accounts are.',
      'Recovered amounts previously deducted are income in the recovery year ' +
      '(tax-benefit rule) — no amended return.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §166', note: 'Bad debt deduction: wholly worthless debts (a)(1); partially worthless business debts to the extent charged off (a)(2); nonbusiness bad debts of individuals limited to short-term capital loss treatment (d).' },
      { type: 'Reg', cite: 'Reg. §1.166-1(e)', note: 'Basis limitation — worthless debts arising from unpaid wages, rents, or fees are not deductible unless the income was previously included; the cash-method exclusion.' },
      { type: 'Reg', cite: 'Reg. §1.166-2', note: 'Evidence of worthlessness: all pertinent facts; bankruptcy as an indicator; no legal action required where it would be futile.' },
      { type: 'Reg', cite: 'Reg. §1.166-3', note: 'Partial worthlessness — deduction conditioned on a charge-off on the books during the year.' }
    ],
    requirements: [
      'Accrual-method taxpayer with receivables previously included in income (or basis in loaned funds).',
      'Bona fide debt — a true debtor-creditor relationship, not a disguised capital contribution or gift.',
      'Worthlessness established in the deduction year with documented collection efforts.',
      'For partial worthlessness: an actual charge-off entry on the books before year end.'
    ],
    risks: [
      'Timing challenges: the IRS can assert the debt became worthless in an earlier (possibly closed) year or is not yet worthless — contemporaneous documentation of the worthlessness event is the defense.',
      'Cash-method clients (or owners reading about this online) claiming write-offs for unpaid invoices they never recognized — zero basis, zero deduction.',
      'Related-party "loans" (owner to entity, family members) recharacterized as equity or gifts — bona fide debt requires notes, interest, and repayment expectation.',
      'Book reserves are not deductions — only specific identified charge-offs count.',
      'Later recovery is taxable income; clients should expect that, not an amended return.'
    ],
    bestFit: [
      'Accrual-method businesses with meaningful receivables aging (wholesale, professional practices billing on account, contractors).',
      'Years with identifiable customer failures — bankruptcies, closures, disputes gone silent.',
      'Businesses that have never systematically reviewed the aging for tax purposes (catch-up potential).'
    ],
    implementation: [
      'Pull the year-end A/R aging; flag accounts 120+ days with no activity.',
      'For each flagged account, assemble the worthlessness file: collection attempts, correspondence, agency referrals, bankruptcy notices.',
      'Classify wholly vs. partially worthless; book the charge-off entries BEFORE year end for partials.',
      'Deduct on the business return (Schedule C line for bad debts, or the entity return equivalent).',
      'Set up an annual Q4 aging-review cadence so worthlessness is claimed in the right year.',
      'Track written-off accounts for recovery income in later years.'
    ]
  },

  client: {
    teaser: 'Stops you from paying tax on money you will never collect',
    headline: 'Don\'t pay tax on invoices that will never be paid',
    plainEnglish: [
      'If your business reports income when you send the invoice (rather than when the cash arrives), you have a hidden problem: you have already paid tax — or are about to — on every invoice, including the ones that will never be collected. A customer who went out of business, disappeared, or simply will never pay has left you taxed on phantom income.',
      'The tax law has a fix. When a receivable becomes genuinely uncollectible, you can write it off and deduct it, which takes back the income you reported but never received. The key is doing it in the right year, with a paper trail showing you tried to collect.',
      'Our job is a year-end sweep of your outstanding invoices: identify the ones that are truly dead, document why, record the write-offs, and claim the deduction — so your tax bill reflects the money you actually made.'
    ],
    analogy: 'Imagine paying income tax on a paycheck that bounced. This is the process for getting that tax back.',
    benefits: [
      'Deducts income you reported but will never collect',
      'Cleans up your books at the same time',
      'A repeatable year-end routine, not a one-off trick',
      'If a written-off customer ever pays later, you simply report it then — no penalty'
    ],
    steps: [
      'We review your unpaid invoices at year end',
      'We identify which ones are genuinely uncollectible and document why',
      'We record the write-offs before December 31',
      'We claim the deduction on your return'
    ],
    considerations: [
      'This only helps businesses that report income when invoicing. If you report income when cash arrives, unpaid invoices were never taxed — so there is nothing to deduct.',
      'The write-off needs evidence you tried to collect. We will tell you exactly what to keep.',
      'If a written-off customer later pays, that payment counts as income at that time.'
    ]
  },

  inputs: [
    { key: 'writeOffAmount', label: 'Worthless receivables charged off this year', type: 'currency', default: 10000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; accrual-method assumption noted in apply()
  },

  /**
   * One-time deduction in year 0 for the identified charge-offs; projection
   * years are unchanged (future worthlessness is not assumed). The profile has
   * no accounting-method flag, so the accrual-method requirement is surfaced
   * as a note rather than gated.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.writeOffAmount || 0;

    if (yearIndex !== 0) {
      return { profile: p, notes: notes }; // one-time cleanup; no recurring benefit assumed
    }

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
    } else {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
      return { profile: p, notes: notes };
    }

    notes.push(TSIQ.fmt.usd(amt) + ' bad-debt deduction (§166) for receivables charged ' +
      'off as worthless this year — one-time; projection years assume no further write-offs.');
    notes.push('ACCRUAL-METHOD ONLY: cash-method businesses never recognized the unpaid ' +
      'invoice income, so no deduction exists for them — confirm the client\'s method.');
    return { profile: p, notes: notes };
  }
});
