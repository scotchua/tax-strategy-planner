/* ============================================================================
 * STRATEGY: Cash vs. Accrual Method Analysis (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'cash-vs-accrual',
  name: 'Cash vs. Accrual Method Analysis',
  category: 'Business Expenses',
  applyOrder: 48,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'The TCJA (made workable and indexed since) opened the cash method to ' +
      'nearly every small business: any taxpayer meeting the §448(c) ' +
      'gross-receipts test — three-year average gross receipts at or below ' +
      'the indexed ceiling, $32 million for 2026 (Rev. Proc. 2025-32 §4.30; verify against the ' +
      'annual revenue procedure) — may use the cash method regardless of ' +
      'entity type or inventories, and is simultaneously exempt from §263A ' +
      'UNICAP and from full §471 inventory accounting (inventories may be ' +
      'treated as non-incidental materials and supplies, or follow the books). ' +
      'For an accrual business with receivables that outrun payables — the ' +
      'typical service or B2B profile — switching to cash defers the entire ' +
      'net receivable position: a one-time favorable §481(a) adjustment, fully ' +
      'deducted in the year of change via an automatic Form 3115. Advisory: ' +
      'the deferral equals net A/R minus A/P at the switch date, a balance-' +
      'sheet fact this tool does not hold.',
    mechanics: [
      'Eligibility (§448(b)(3), (c)): average annual gross receipts for the ' +
      'three prior years at or below the indexed ceiling ($32M for 2026), ' +
      'computed WITH aggregation of commonly controlled entities (§448(c)(2)). ' +
      'Tax shelters/syndicates (>35% of losses to limited owners) are excluded ' +
      'regardless of size.',
      'Cash method mechanics: income when actually or constructively received; ' +
      'deductions when paid (subject to capitalization and the 12-month ' +
      'prepaid rule). Receivables sit untaxed until collected.',
      'Inventory relief (§471(c)): small-business taxpayers may treat ' +
      'inventory as non-incidental materials and supplies (deducted when used ' +
      'or consumed) or conform to the method in their books (AFS or internal ' +
      'records) — no full absorption inventory accounting.',
      'UNICAP exemption (§263A(i)): the same receipts test exempts the ' +
      'taxpayer from capitalizing indirect costs into inventory and ' +
      'self-constructed property.',
      'The switch is an automatic accounting-method change: Form 3115 filed ' +
      'with the return under the Rev. Proc. 2015-13 procedures (no user fee, ' +
      'audit protection for the prior treatment). The §481(a) adjustment ' +
      'captures the cumulative difference: a NEGATIVE (favorable, income-' +
      'reducing) adjustment deducts entirely in the year of change; a POSITIVE ' +
      'adjustment spreads over four years.',
      'Direction matters: cash beats accrual when A/R exceeds A/P + accrued ' +
      'liabilities (services, B2B, wholesale on terms). Accrual can win where ' +
      'payables and accrued expenses dominate, or where large customer ' +
      'deposits would be taxed immediately on cash (§451 advance-payment ' +
      'deferral is an accrual-method benefit).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §448(b)(3), (c)', note: 'Cash-method eligibility via the gross-receipts test ($32M for 2026 per Rev. Proc. 2025-32 §4.30, indexed); aggregation under §448(c)(2); tax-shelter exclusion under §448(d)(3).' },
      { type: 'IRC', cite: 'IRC §471(c)', note: 'Small-business inventory relief: non-incidental materials and supplies, or book-conformity method, instead of full inventory accounting.' },
      { type: 'IRC', cite: 'IRC §263A(i)', note: 'UNICAP exemption for taxpayers meeting the gross-receipts test.' },
      { type: 'IRC', cite: 'IRC §481(a)', note: 'The one-time cumulative catch-up adjustment on a method change — the mechanism that delivers the deferral in year one.' },
      { type: 'Admin', cite: 'Rev. Proc. 2015-13', note: 'Automatic method-change procedures: Form 3115 with the timely return, audit protection, negative §481(a) taken fully in the change year, positive spread over four years.' },
      { type: 'Reg', cite: 'Reg. §1.451-1(a); §1.461-1(a)(1)', note: 'Timing rules under accrual (all-events test) and cash (paid/received) methods — the baseline being compared.' }
    ],
    requirements: [
      'Three-year average gross receipts at or below the indexed §448(c) ceiling, computed with aggregation.',
      'Not a tax shelter/syndicate (screen loss allocations to passive owners).',
      'A balance-sheet snapshot: A/R, A/P, accrued liabilities, customer deposits, and inventory at the proposed change date.',
      'Book/management-reporting tolerance for cash-basis tax numbers (lenders may still want accrual financials — the two can coexist).'
    ],
    risks: [
      'The benefit is DEFERRAL, not permanent savings — the receivables are taxed when collected; growth compounds the benefit, contraction reverses it.',
      'Crossing the receipts ceiling later forces a change BACK to accrual with a positive §481(a) adjustment (spread over four years) — growth clients need the exit modeled.',
      'Customer deposits are income immediately on the cash method — deposit-heavy businesses can be worse off.',
      'Aggregation mistakes (related entities counted separately) invalidate eligibility.',
      'The change is a method: adopted consistently, changed only with consent — no year-by-year cherry-picking.'
    ],
    bestFit: [
      'Accrual-method service and B2B businesses with receivables well in excess of payables.',
      'Businesses under the receipts ceiling carrying inventory who also want out of UNICAP and full inventory accounting.',
      'A high-income change year where the one-time §481(a) deduction lands against top-bracket income.'
    ],
    implementation: [
      'Confirm eligibility: 3-year average receipts with aggregation; syndicate screen.',
      'Quantify the §481(a) adjustment from the balance sheet: (A/R + unbilled revenue) − (A/P + accrued expenses), plus any inventory-method component.',
      'Time the change to a high-bracket year — the one-time deduction is worth most there.',
      'File Form 3115 (automatic consent) in duplicate: with the timely filed return and to the IRS in Ogden.',
      'Decide the inventory approach under §471(c) (non-incidental M&S vs. book conformity) and document it.',
      'Diary the annual receipts test; model the forced flip-back before the ceiling is crossed.'
    ]
  },

  client: {
    teaser: 'One accounting election could push a full year of uncollected sales off your tax bill',
    headline: 'Stop paying tax on invoices before the cash arrives',
    plainEnglish: [
      'There are two ways to keep score for taxes. The "accrual" way counts income the moment you send an invoice — even if the customer pays you months later. The "cash" way counts income only when the money actually lands. If your business uses accrual and customers owe you a lot at any given time, you are permanently paying tax ahead of your own cash flow.',
      'Most businesses under $32 million in sales are now allowed to switch to the cash method. And the switch comes with a one-time bonus: all the invoices you have already been taxed on but have not collected get subtracted from income in the year you change. If customers owe you $200,000 more than you owe suppliers, that is roughly a $200,000 deduction in the switch year — and from then on, you are taxed only on money you have actually received.',
      'To be clear, this is a deferral: those dollars get taxed when collected. But it is like a permanent, interest-free loan from the IRS that grows as your business grows — and we can time the switch to a high-income year, when the one-time deduction is worth the most.'
    ],
    analogy: 'It\'s the difference between being taxed on your menu and being taxed on your cash register. The register is the honest measure of what you can actually spend.',
    benefits: [
      'A potentially large one-time deduction in the year you switch',
      'Never again taxed on money customers have not paid you',
      'Often eliminates burdensome inventory accounting at the same time',
      'Simpler bookkeeping year-round'
    ],
    steps: [
      'We confirm your business qualifies (including related companies)',
      'We calculate exactly what the switch is worth from your balance sheet',
      'We pick the best year and file the one IRS form that makes it official',
      'We monitor your growth so the method keeps working for you'
    ],
    considerations: [
      'This delays tax rather than erasing it — the deferred income is taxed as it is collected. The advantage lives in the timing and grows with your receivables.',
      'If your business grows past the size limit someday, the switch reverses — we watch for that and plan the exit in advance.',
      'Businesses that collect big customer deposits up front can actually do worse on the cash method — we check before recommending anything.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
