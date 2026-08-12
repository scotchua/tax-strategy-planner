/* ============================================================================
 * STRATEGY: Inventory Method Planning (LIFO/FIFO, UNICAP) (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'inventory-methods',
  name: 'Inventory Method Planning (LIFO/FIFO, UNICAP)',
  category: 'Business Expenses',
  applyOrder: 49,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'For inventory-carrying businesses, the inventory method is a standing ' +
      'tax lever. In a rising-cost environment, LIFO (§472) charges the ' +
      'newest, most expensive purchases to cost of goods sold, deferring the ' +
      'inflation embedded in inventory for as long as levels are maintained — ' +
      'elected on Form 970, subject to the book conformity rule of §472(c). ' +
      'Small-business taxpayers meeting the §448(c) gross-receipts test ' +
      '($32M average for 2026 per Rev. Proc. 2025-32 §4.30) have a different lever: ' +
      '§263A(i) exempts them from UNICAP, and §471(c) lets them treat ' +
      'inventory as non-incidental materials and supplies or follow their ' +
      'books instead of full absorption accounting. Larger taxpayers can ' +
      'still rationalize UNICAP through the simplified methods. Advisory: the ' +
      'benefit depends on inventory levels, cost inflation, and method ' +
      'history — a computation for the inventory workpapers, not this tool.',
    mechanics: [
      'LIFO (§472): last-in, first-out costing moves current (higher) costs ' +
      'into COGS and leaves older (cheaper) layers on the balance sheet. The ' +
      'deferral equals the LIFO reserve and persists while inventory levels ' +
      'hold; liquidating layers recaptures old cheap costs into income.',
      'Election mechanics: Form 970 with the return for the first LIFO year. ' +
      'Book conformity (§472(c), (e)(2)): a LIFO taxpayer may not report ' +
      'income to shareholders/creditors on a non-LIFO basis (supplementary ' +
      'disclosures are permitted within the regs\' limits) — the covenant-' +
      'and-banking conversation belongs BEFORE the election.',
      'Dollar-value LIFO (Reg. §1.472-8) pools inventory by dollars rather ' +
      'than units, and the inventory price index computation (IPIC) method ' +
      'lets taxpayers use published BLS indexes — dramatically simplifying ' +
      'compliance for distributors and retailers.',
      'S-corp note: a C corporation electing S status with LIFO inventory ' +
      'triggers §1363(d) LIFO recapture — the reserve comes into income over ' +
      'four years. Sequence entity and method changes deliberately.',
      'UNICAP (§263A): larger taxpayers must capitalize allocable indirect ' +
      'costs (purchasing, storage, handling, overhead) into inventory. ' +
      'Small-business taxpayers under the §448(c) test are exempt (§263A(i)); ' +
      'exempt taxpayers who have been capitalizing can file an automatic ' +
      'method change and take the favorable §481(a) adjustment.',
      '§471(c) small-business options: treat inventory as non-incidental ' +
      'materials and supplies (deducted when used/consumed in operations) or ' +
      'mirror the inventory treatment in the taxpayer\'s books/applicable ' +
      'financial statements — often far simpler than tax inventory accounting, ' +
      'and sometimes faster.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §472', note: 'The LIFO election; §472(c) and (e)(2) book conformity requirement; elected via Form 970 for the first LIFO year.' },
      { type: 'Reg', cite: 'Reg. §1.472-8', note: 'Dollar-value LIFO pooling and the IPIC method using published BLS price indexes.' },
      { type: 'IRC', cite: 'IRC §473; §472(b)(3) principles', note: 'Layer-liquidation consequences — dipping into old LIFO layers recaptures the deferral (qualified liquidation relief is narrow).' },
      { type: 'IRC', cite: 'IRC §263A; §263A(i)', note: 'UNICAP capitalization of indirect inventory costs; full exemption for taxpayers meeting the §448(c) gross-receipts test.' },
      { type: 'IRC', cite: 'IRC §471(c)', note: 'Small-business inventory methods: non-incidental materials and supplies, or conformity to books/AFS.' },
      { type: 'IRC', cite: 'IRC §1363(d)', note: 'LIFO recapture on C-to-S conversion — the reserve picked up over four years; sequencing trap with entity planning.' },
      { type: 'Admin', cite: 'Rev. Proc. 2015-13 / Form 3115', note: 'Automatic method-change procedures for adopting exempt treatment or changing inventory submethods; §481(a) catch-up.' }
    ],
    requirements: [
      'Material inventory balances — the deferral scales with inventory dollars and cost inflation.',
      'For LIFO: rising costs, stable or growing inventory levels, and financial-statement users who can live with LIFO earnings (conformity).',
      'For the small-business exemptions: three-year average gross receipts at or below the indexed §448(c) ceiling, with aggregation.',
      'Inventory records able to support the chosen method (pools/indexes for dollar-value LIFO; usage tracking for non-incidental M&S).'
    ],
    risks: [
      'LIFO is a deferral that reverses on layer liquidation — supply-chain dips, downsizing, or exit events recapture the reserve as income, often in an inopportune year.',
      'Book conformity puts LIFO\'s lower earnings on the financial statements lenders see — covenant math first, election second.',
      'Deflation or falling replacement costs makes LIFO worthless or harmful; commodity-cost direction is the whole thesis.',
      'C-to-S conversion with a LIFO reserve triggers §1363(d) recapture — coordinate with any entity strategies in this plan.',
      'Growth past the §448(c) ceiling ends the §263A(i)/§471(c) exemptions and forces method changes back (positive §481(a) adjustments).',
      'Compliance cost is real: LIFO pools, indexes, and annual computations must be maintained every year the election lives.'
    ],
    bestFit: [
      'Distributors, dealers, and retailers with large inventories in persistently rising-cost categories (LIFO/IPIC candidates).',
      'Manufacturers under the receipts ceiling still voluntarily applying UNICAP — an automatic change frees trapped costs.',
      'Small inventory-carrying businesses wanting the simplest defensible method (§471(c) book conformity).'
    ],
    implementation: [
      'Quantify the opportunity: inventory balance × observed cost inflation ≈ first-year LIFO deferral; compare against LIFO\'s compliance cost.',
      'Screen the conformity impact with the client\'s lender/surety before electing.',
      'Elect LIFO on Form 970 with the first LIFO-year return; choose pools and adopt IPIC where BLS indexes fit the inventory mix.',
      'For small-business taxpayers: file the automatic Form 3115 changes to exit UNICAP and adopt a §471(c) method; take the favorable §481(a) adjustment.',
      'Monitor year-end inventory levels to protect LIFO layers; flag any planned S election against §1363(d).',
      'Re-test the §448(c) receipts ceiling annually and diary the method exits before growth forces them.'
    ]
  },

  client: {
    teaser: 'The way you count what\'s on your shelves can quietly cut what you owe',
    headline: 'Make your inventory accounting work as hard as your inventory',
    plainEnglish: [
      'If your business carries inventory, the tax law makes you pick a method for deciding which costs count against this year\'s sales. When your costs keep rising — and for most businesses lately, they have — one method (called LIFO) lets you count your newest, most expensive purchases first. Higher costs counted now means lower profit on paper now, which means less tax now. The savings stay parked for as long as you keep normal inventory levels.',
      'Separately, smaller businesses — under $32 million in sales — qualify for a simpler deal entirely: they can skip the most burdensome inventory bookkeeping rules and use methods that match how they already track things. Businesses that never claimed that relief are often owed a catch-up deduction just for making the switch.',
      'The right answer depends on your numbers: how much inventory you hold, how fast your costs are rising, and what your bank needs to see on your financial statements. We run that math before recommending anything.'
    ],
    analogy: 'Think of a stack of identical goods bought at rising prices: when one sells, does the receipt from years ago or last month count against the sale? Choosing the recent, pricier receipt shrinks today\'s taxable profit.',
    benefits: [
      'Tax deferral that grows with inflation in your costs',
      'Simpler bookkeeping options for qualifying businesses',
      'A possible one-time catch-up deduction when switching to a friendlier method',
      'Savings that repeat as long as the method fits'
    ],
    steps: [
      'We measure what each method would save with your actual inventory numbers',
      'We check the fit with your bank and financial statements',
      'We file the elections and IRS forms to make the change official',
      'We review inventory levels each year to protect the benefit'
    ],
    considerations: [
      'These savings are a deferral — if inventory levels drop sharply or the business is sold, some of the postponed tax comes due. We plan for that from day one.',
      'The inflation-driven method also lowers the profit your lender sees on your financial statements — we make sure that is acceptable before electing it.',
      'Some methods carry ongoing calculation work; we only recommend one when the savings clearly outweigh the upkeep.'
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
