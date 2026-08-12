/* ============================================================================
 * STRATEGY: Equipment Purchase Timing (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'equipment-timing',
  name: 'Equipment Purchase Timing',
  category: 'Business Expenses',
  applyOrder: 43,
  modeled: false,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Depreciation (including §179 and 100% bonus) begins when property is ' +
      'PLACED IN SERVICE — ready and available for its assigned function — not ' +
      'when ordered, paid for, or delivered in a crate. That makes year-end ' +
      'equipment decisions a pure timing lever: accelerate a planned Q1 ' +
      'purchase into December to deduct it a year earlier, or push a purchase ' +
      'into January when next year\'s expected bracket is higher (rate ' +
      'arbitrage). Watch the traps: placing more than 40% of the year\'s ' +
      'personalty in service in Q4 triggers the mid-quarter convention for ' +
      'MACRS, and §179 is limited to business taxable income. This strategy is ' +
      'advisory — the deduction itself is modeled through the §179/bonus and ' +
      'heavy-vehicle strategies; this entry drives the WHEN.',
    mechanics: [
      'Placed-in-service standard: the asset is in a condition or state of ' +
      'readiness and availability for its specifically assigned function ' +
      '(Reg. §1.46-3(d) standard, carried into MACRS practice). Installed and ' +
      'operable by 12/31 counts; sitting on a loading dock does not.',
      'Acceleration play: a purchase planned for early next year, placed in ' +
      'service by December 31, moves the entire §179/bonus deduction into the ' +
      'current year — one year of time value on the whole write-off.',
      'Deferral play: when next year\'s marginal rate will be materially higher ' +
      '(income spike, expiring losses, bracket changes), deferring the ' +
      'placed-in-service date to January makes each deduction dollar worth more.',
      'Mid-quarter trap (§168(d)(3)): if more than 40% of the aggregate basis ' +
      'of MACRS personalty placed in service during the year lands in Q4, ALL ' +
      'personalty for the year uses the mid-quarter convention, shrinking ' +
      'first-year MACRS. With 100% bonus covering most personalty this bites ' +
      'less often, but it still matters for non-bonus property and states that ' +
      'decouple from bonus.',
      '§179 income limit (§179(b)(3)): the expensing deduction cannot exceed ' +
      'aggregate business taxable income; the excess carries forward. Bonus has ' +
      'no such limit — sequencing §179 vs. bonus at year end matters for ' +
      'loss-year purchases.',
      '2026 capacity is generous: §179 maximum $2,560,000 with phase-out ' +
      'beginning at $4,090,000 of additions, plus permanent 100% bonus — the ' +
      'constraint is almost never capacity, it is the calendar and the rate differential.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.46-3(d)', note: 'Placed-in-service standard: readiness and availability for the specifically assigned function — the operative test for when depreciation begins.' },
      { type: 'IRC', cite: 'IRC §168(d)(3)', note: 'Mid-quarter convention required when >40% of the year\'s MACRS personalty (by basis) is placed in service in the fourth quarter.' },
      { type: 'IRC', cite: 'IRC §179(b)(3)', note: 'Taxable-income limitation on §179 expensing; disallowed amounts carry forward.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, permanent post-OBBBA for property acquired after 1/19/2025 — no income limitation, making it the loss-year tool.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32 / TSIQ 2026 tables', note: '2026 §179 limits: $2,560,000 max, $4,090,000 phase-out start.' },
      { type: 'IRC', cite: 'IRC §168(d)(4)', note: 'Half-year vs. mid-quarter convention definitions — what the 40% test changes.' }
    ],
    requirements: [
      'A planned equipment purchase with flexibility on the in-service date.',
      'A reasonable projection of this year\'s vs. next year\'s marginal rate.',
      'Operational readiness by the target date — installed, tested, available (documentation: delivery/installation records).',
      'Awareness of the year\'s Q4 personalty concentration before December buying sprees.'
    ],
    risks: [
      'Equipment ordered in December but not operable until January deducts NOTHING this year — placed in service is a facts test, not an invoice date.',
      'A December buying spree can trip the >40% mid-quarter convention and shrink first-year MACRS on non-bonus property.',
      '§179 in a low-income year wastes the deduction against a 12% bracket (or carries forward) when next year\'s 32%+ income was the better target.',
      'Buying unneeded equipment for a deduction spends a dollar to save a fraction of one — timing only adds value to purchases the business already needs.'
    ],
    bestFit: [
      'Businesses with planned equipment purchases straddling year end.',
      'Clients with a predictable income swing between this year and next (contract timing, one-time gains, expiring losses).',
      'Capital-intensive operations where in-service dates are controllable.'
    ],
    implementation: [
      'In Q4 planning, list every planned purchase for the next 6 months with expected in-service dates.',
      'Project both years\' marginal rates; decide accelerate vs. defer for each item.',
      'For accelerated items: contract for delivery AND installation/commissioning by December 31; retain proof of operational readiness.',
      'Check the mid-quarter math: if Q4 additions will exceed 40% of the year\'s personalty basis, consider pulling an item into Q3 or pushing one to January.',
      'Sequence §179 vs. bonus with the income limitation in mind (bonus for loss years; §179 where state conformity favors it).',
      'Document the placed-in-service evidence in the depreciation workpapers.'
    ]
  },

  client: {
    teaser: 'When you buy can be worth almost as much as what you buy',
    headline: 'Time your equipment purchases so the tax savings land where they help most',
    plainEnglish: [
      'Big equipment purchases usually come with big deductions — often the entire cost in the first year. What most business owners miss is that the deduction lands in the year the equipment is up and running, not the year you order it or pay for it. That gives you a lever: a purchase you were planning for February can, if it is delivered and working by New Year\'s Eve, cut this year\'s tax bill instead of next year\'s.',
      'Sometimes the smart move is the opposite. If next year\'s income — and tax bracket — will be higher, waiting a few weeks to put the equipment in service makes the same deduction worth more, because it cancels income that would have been taxed at a higher rate.',
      'This is a planning conversation, not a form we file. Around October or November, we look at what your business plans to buy, compare this year and next, and pick the in-service dates that squeeze the most value out of purchases you were already going to make.'
    ],
    analogy: 'It\'s like a coupon that\'s worth more on certain days — same purchase, same coupon, but redeeming it on the right day gets you more back.',
    benefits: [
      'More value from equipment you were buying anyway',
      'Deductions land in your highest-tax year',
      'Avoids year-end depreciation traps most owners never see',
      'Costs nothing but a planning conversation'
    ],
    steps: [
      'Each fall, we review your planned purchases for the next six months',
      'We compare this year\'s and next year\'s expected tax picture',
      'We recommend which purchases to speed up and which to wait on',
      'You keep the delivery and installation records — we tell you exactly what to save'
    ],
    considerations: [
      'The equipment must actually be installed and working by year end to count — a December invoice alone does nothing.',
      'This only creates value on purchases your business genuinely needs. We will never suggest buying something just for a deduction.'
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
