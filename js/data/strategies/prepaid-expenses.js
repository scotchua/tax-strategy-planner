/* ============================================================================
 * STRATEGY: Prepaid Expense Safe Harbor (12-Month Rule)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'prepaid-expenses',
  name: 'Prepaid Expense Safe Harbor (12-Month Rule)',
  category: 'Business Expenses',
  applyOrder: 43,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Under the 12-month rule of Reg. §1.263(a)-4(f), a payment creating a ' +
      'right or benefit that does not extend beyond the earlier of 12 months ' +
      'or the end of the following tax year need not be capitalized. A ' +
      'cash-method business that prepays January–December insurance, rent, ' +
      'software subscriptions, or service contracts in December deducts the ' +
      'full payment this year. The benefit is a ONE-TIME acceleration: once ' +
      'adopted, each year\'s prepayment replaces the deduction it pulled ' +
      'forward, so steady-state deductions are unchanged — and unwinding the ' +
      'practice produces a lean year. Accrual-method taxpayers need the ' +
      'recurring-item exception and economic performance analysis; the clean ' +
      'play is cash-method.',
    mechanics: [
      '12-month rule (Reg. §1.263(a)-4(f)): no capitalization required where ' +
      'the right or benefit ends by the EARLIER of (i) 12 months after the ' +
      'first date the taxpayer realizes the benefit or (ii) the end of the ' +
      'tax year following the payment year. A December 2026 payment for ' +
      'coverage through December 2027 qualifies; a payment for an 18-month ' +
      'policy does not.',
      'Cash-method taxpayers deduct when paid (Reg. §1.461-1(a)(1)) — the ' +
      '12-month rule removes the capitalization objection, completing the ' +
      'current-year deduction. The Ninth Circuit blessed prepaid rent within ' +
      'this window in Zaninovich.',
      'Best candidates: business insurance premiums, rent (12 months max), ' +
      'software/SaaS subscriptions, maintenance contracts, professional dues, ' +
      'bonded warehouse/storage contracts. NOT inventory, and not interest ' +
      '(§461(g) requires interest to be spread).',
      'Accrual-method taxpayers must also clear economic performance: the ' +
      'recurring-item exception (§461(h)(3); Reg. §1.461-5) covers recurring ' +
      'items like insurance where economic performance occurs within 8.5 ' +
      'months, paired with the 3.5-month rule for prepaid services in some cases.',
      'The acceleration is one-time: in year one the business deducts ~24 ' +
      'months of these costs (the normal 12 plus next year\'s 12 prepaid). ' +
      'Every later year deducts a normal 12 (each December prepays the next ' +
      'year). Stopping the practice produces a year with ~0 months of ' +
      'deduction for those items — model and disclose that.',
      'Consistent treatment is a method of accounting — adopting prepayment ' +
      'deductions after previously capitalizing may require a Form 3115 ' +
      'automatic change (Rev. Proc. 2015-13 procedures).'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.263(a)-4(f)', note: 'The 12-month rule: no capitalization for rights/benefits not extending beyond the earlier of 12 months or the end of the following tax year.' },
      { type: 'Reg', cite: 'Reg. §1.461-1(a)(1)', note: 'Cash-method timing — deductible when paid, once capitalization is off the table.' },
      { type: 'Case', cite: 'Zaninovich v. Comm\'r, 616 F.2d 429 (9th Cir. 1980)', note: 'Prepaid rent for a period not exceeding 12 months deductible by a cash-method taxpayer — the origin of the one-year rule later codified in the regs.' },
      { type: 'IRC', cite: 'IRC §461(h)(3); Reg. §1.461-5', note: 'Recurring-item exception — the accrual-method path for insurance and similar recurring prepaids.' },
      { type: 'IRC', cite: 'IRC §461(g)', note: 'Prepaid INTEREST must be capitalized and spread — the notable exclusion from this strategy.' },
      { type: 'Admin', cite: 'Rev. Proc. 2015-13', note: 'Automatic accounting-method change procedures if prior practice capitalized these prepayments.' }
    ],
    requirements: [
      'Cash-method taxpayer (or accrual with recurring-item analysis).',
      'Payments actually made — checks mailed/cards charged — by December 31; a mere accrual or promise does not count for cash method.',
      'The benefit period must satisfy the 12-month/following-year test — contract terms in the file.',
      'Cash on hand to prepay without straining operations.',
      'Consistency going forward (this becomes the method).'
    ],
    risks: [
      'This is one-time acceleration, not a recurring saving — clients who expect the year-one savings to repeat will be disappointed; set expectations in writing.',
      'Benefit periods exceeding the 12-month window (multi-year contracts, 13+ month policies) fail entirely and must be capitalized.',
      'Prepaid interest and inventory do not qualify — misclassification invites adjustment.',
      'Unwinding (a cash-poor December with no prepayment) creates a doubled-up income year.',
      'Rate arbitrage can run backwards: pulling deductions into a 24% year that would have offset a 35% year next year destroys value — check the bracket path first.'
    ],
    bestFit: [
      'Cash-method businesses with a high-income year to knock down (income spike, one-time gain).',
      'Businesses with substantial insurance, rent, and subscription spend and healthy December cash.',
      'First-time adopters — the benefit exists only in the adoption year.'
    ],
    implementation: [
      'Inventory the recurring costs eligible for prepayment: insurance, rent (≤12 months), subscriptions, maintenance contracts, dues.',
      'Confirm each contract\'s benefit period satisfies the 12-month rule; exclude interest and inventory.',
      'Verify the bracket path — accelerate only into a year taxed at the same or higher rate than next year.',
      'Cut the checks/charges by December 31; retain proof of payment and the contract terms.',
      'If prior years capitalized these items, file Form 3115 (automatic consent) for the method change.',
      'Diary the steady-state: each subsequent December repeats the prepayment to avoid a lean year.'
    ]
  },

  client: {
    teaser: 'A one-time calendar move that hands this year\'s return an extra year of deductions',
    headline: 'Pay January\'s bills in December — and deduct them a year early',
    plainEnglish: [
      'If your business pays for things like insurance, rent, or software subscriptions, the tax law has a friendly rule: pay up to twelve months in advance, and you can deduct the whole payment now, in the year you paid it. Prepay next year\'s insurance in December, and this year\'s tax return gets the deduction instead of next year\'s.',
      'In the first year you do this, the effect is powerful: you deduct roughly two years\' worth of those costs on one return — the normal year you were paying anyway, plus the year you prepaid. That can meaningfully cut a high-income year\'s tax bill.',
      'Here is the honest part: it works its magic once. After the first year, each December\'s prepayment simply replaces the deduction you moved up, so future years look normal. It is a timing tool — best used in a year when your income, and your tax rate, are unusually high.'
    ],
    analogy: 'It\'s like moving your January grocery run into late December — the December budget takes a bigger hit once, but after that every month looks normal again.',
    benefits: [
      'Deduct next year\'s known costs on this year\'s return',
      'Most powerful in an unusually high-income year',
      'Uses spending you were committed to anyway',
      'No new forms in the simple case — just smart payment timing'
    ],
    steps: [
      'We list which of your regular costs qualify for prepayment',
      'We check that this year is the right year to do it',
      'You make the payments before December 31 — we give you the exact list',
      'We keep the contracts and payment proof with your records'
    ],
    considerations: [
      'This is a one-time boost, not a repeating one — after the first year, deductions return to normal, and we plan for that openly.',
      'It requires having the cash in December to pay ahead. We only recommend it when the savings clearly beat the cost of parting with the cash early.',
      'Payments covering more than twelve months ahead do not qualify.'
    ]
  },

  inputs: [
    { key: 'prepaidAmount', label: 'Qualifying costs prepaid in December (≤12 months)', type: 'currency', default: 15000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Honest timing model: the deduction doubles up ONLY in year 0 (first
   * adoption pulls next year's 12 months into this year). Years 1+ are
   * unchanged versus baseline — each subsequent December's prepayment simply
   * replaces the deduction that was accelerated out of that year. The
   * unwind-year risk (stopping the practice) is disclosed, not modeled.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.prepaidAmount || 0;

    if (yearIndex !== 0) {
      return { profile: p, notes: notes }; // steady state: no change vs. baseline
    }

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
    } else {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
      return { profile: p, notes: notes };
    }

    notes.push(TSIQ.fmt.usd(amt) + ' of next year\'s costs prepaid and deducted this year ' +
      '(12-month rule, Reg. §1.263(a)-4(f)).');
    notes.push('One-time acceleration: later years are unchanged (each year\'s prepayment ' +
      'replaces the deduction pulled forward); stopping the practice would create a ' +
      'lean deduction year — disclosed, not modeled.');
    return { profile: p, notes: notes };
  }
});
