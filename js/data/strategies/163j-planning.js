/* ============================================================================
 * STRATEGY: Business Interest Limitation (§163(j)) Planning (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: '163j-planning',
  name: 'Business Interest Limitation (§163(j)) Planning',
  category: 'Business Expenses',
  applyOrder: 48,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Section 163(j) caps the deduction for business interest expense at ' +
      'business interest income plus 30% of adjusted taxable income (ATI), ' +
      'with disallowed interest carried forward indefinitely. OBBBA ' +
      'permanently restored the EBITDA-based ATI computation — depreciation, ' +
      'amortization, and depletion are added back — which materially raises ' +
      'the cap for capital-intensive borrowers versus the 2022–2024 EBIT ' +
      'regime. Two structural exits exist: the small-business exemption for ' +
      'taxpayers meeting the §448(c) gross-receipts test ($32 million for 2026 ' +
      'average over three years for 2026, indexed — verify), and the ' +
      'irrevocable electing-real-property-trade-or-business election, which ' +
      'removes the limit at the price of ADS depreciation (and loss of bonus) ' +
      'on the trade\'s real property. Advisory: whether the limit binds — and ' +
      'which exit is cheapest — requires entity-level computation on Form 8990 ' +
      'that this tool does not attempt.',
    mechanics: [
      'The cap (§163(j)(1)): business interest expense is deductible up to ' +
      'business interest income + 30% of ATI (+ floor-plan financing ' +
      'interest). Disallowed interest carries forward indefinitely ' +
      '(§163(j)(2)); for partnerships the excess interest passes to partners ' +
      'and waits for excess taxable income from the same partnership.',
      'ATI (§163(j)(8)): taxable income computed without business interest ' +
      'income/expense, NOLs, the §199A deduction — and, permanently post-' +
      'OBBBA, without depreciation, amortization, or depletion. The EBITDA ' +
      'add-back is the single biggest lever: heavy depreciation no longer ' +
      'shrinks the interest cap.',
      'Small-business exemption (§163(j)(3)): taxpayers (other than tax ' +
      'shelters) meeting the §448(c) test — average annual gross receipts for ' +
      'the prior 3 years at or below the inflation-adjusted ceiling ($32M for ' +
      '2026 — verify against the annual revenue procedure) — are simply outside ' +
      '§163(j). Aggregation rules (§448(c)(2)) combine commonly controlled ' +
      'entities, so receipts cannot be split away.',
      'Tax-shelter trap: a "syndicate" (>35% of losses allocated to limited ' +
      'owners) is a tax shelter regardless of size and CANNOT use the ' +
      'small-business exemption — loss-year LPs/LLCs with passive owners can ' +
      'stumble into §163(j) unexpectedly.',
      'Electing RPTOB (§163(j)(7)(B)): a real property development, rental, ' +
      'management, or brokerage trade may irrevocably elect out of §163(j); ' +
      'the price is ADS depreciation on its nonresidential real, residential ' +
      'rental, and QIP (longer lives, straight-line, and no bonus on that ' +
      'property). For stabilized, heavily leveraged rentals the trade is often ' +
      'worth it; for assets with big cost-seg/bonus potential it is expensive.',
      'Compliance runs through Form 8990 at the entity level; planning levers ' +
      'include capitalizing interest where permitted (§266 elections for ' +
      'unproductive real property), debt placement among aggregated entities, ' +
      'and timing income to generate excess taxable income that releases ' +
      'partner-level carryforwards.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §163(j)(1), (2)', note: 'The 30%-of-ATI limitation and the indefinite carryforward of disallowed business interest.' },
      { type: 'IRC', cite: 'IRC §163(j)(8)', note: 'ATI definition — OBBBA permanently restored the depreciation/amortization/depletion add-back (EBITDA base) beginning with 2025 tax years.' },
      { type: 'IRC', cite: 'IRC §163(j)(3); §448(c)', note: 'Small-business exemption via the gross-receipts test ($32M for 2026, indexed — verify annually); §448(c)(2) aggregation of commonly controlled groups.' },
      { type: 'IRC', cite: 'IRC §163(j)(7)(B); §168(g)(1)(F)', note: 'Electing real property trade or business: irrevocable election out of §163(j); ADS required on nonresidential real, residential rental, and QIP — which also forfeits bonus on that property.' },
      { type: 'IRC', cite: 'IRC §448(d)(3); §461(i)(3)', note: 'Tax-shelter/syndicate definition — entities allocating >35% of losses to limited owners lose the small-business exemption regardless of receipts.' },
      { type: 'Reg', cite: 'Reg. §1.163(j)-1 through -11', note: 'Definitional and computational framework, including the partnership §163(j)(4) mechanics and trading-through rules.' },
      { type: 'Admin', cite: 'Form 8990', note: 'Limitation on Business Interest Expense — required computation and carryforward tracking.' }
    ],
    requirements: [
      'Material business interest expense (leveraged real estate, equipment-heavy operations, acquisition debt).',
      'Gross receipts computed under §448(c) WITH aggregation, tracked against the indexed ceiling annually.',
      'For the RPTOB election: a qualifying real property trade or business and a modeled ADS/no-bonus cost comparison.',
      'Form 8990 workpapers maintained at each entity with interest expense.'
    ],
    risks: [
      'The RPTOB election is IRREVOCABLE — electing out of §163(j) to solve one bad year permanently surrenders bonus depreciation on the trade\'s real property (including future cost segregation value).',
      'Syndicate status in a loss year strips the small-business exemption with no receipts test at all — watch loss allocations to passive members.',
      'Growth or aggregation pushing receipts over the ceiling mid-projection turns previously deductible interest into carryforwards — cash-flow surprise.',
      'Partner-level carryforwards only release against excess taxable income from the SAME partnership — they can be stranded indefinitely.',
      'This tool does not compute the limitation; adding leveraged-business strategies to a scenario assumes interest remains deductible — verify on Form 8990 before promising savings.'
    ],
    bestFit: [
      'Leveraged real estate operators weighing the RPTOB election against bonus/cost-seg plans.',
      'Businesses near the $32M aggregated-receipts line where structure determines exemption.',
      'Loss-allocating partnerships/S corps with passive owners (syndicate-risk screening).'
    ],
    implementation: [
      'Compute 3-year average gross receipts under §448(c) with full aggregation; diary the annual re-test.',
      'If exempt: screen for syndicate status each loss year before relying on the exemption.',
      'If limited: prepare Form 8990; quantify the carryforward and its release path.',
      'For real property trades: model RPTOB (interest freed, ADS + no bonus forever) against staying in (30% EBITDA cap) over the hold period — the answer differs per asset plan.',
      'Consider §266 capitalization elections for interest on unproductive land carried for development.',
      'Coordinate debt placement across aggregated entities so interest sits where ATI capacity exists.'
    ]
  },

  client: {
    teaser: 'A hidden ceiling can cancel part of your loan-interest write-off — unless you plan around it',
    headline: 'Keep your business loan interest fully deductible',
    plainEnglish: [
      'Most owners assume interest on business loans is automatically deductible. Above a certain size — or in certain structures — it is not. The tax law caps the interest deduction based on a percentage of your business earnings, and any interest over the cap gets pushed into future years instead of helping you now. For businesses carrying real debt — buildings, equipment, an acquisition — that cap can quietly cost real money in a down year.',
      'The good news is there are exits. Smaller businesses — $32 million a year in sales or less, counting related companies together — are exempt from the cap entirely. Real estate businesses can make a special one-time election that removes the cap permanently, though it trades away some faster depreciation write-offs, so it deserves careful math. And recent law changes made the cap itself more generous for businesses with heavy equipment or building depreciation.',
      'Our job is to check whether the ceiling touches you, keep you safely under it where possible, and — if an election makes sense — run the numbers both ways before anything irreversible is signed.'
    ],
    analogy: 'It\'s like a height limit on a parking garage: most cars never notice it, but if you drive something big, you want to know the clearance before you are inside.',
    benefits: [
      'Confirms your interest deductions are safe before you borrow',
      'Keeps smaller businesses inside the full exemption',
      'For real estate: a permanent way out of the cap, evaluated with real math',
      'No surprises in a down year, when the cap bites hardest'
    ],
    steps: [
      'We measure your business against the exemption line, counting related companies the way the IRS does',
      'If the cap could apply, we calculate exactly how much interest is at risk',
      'We compare your options — including the real estate election — over the full holding period',
      'We handle the forms and revisit the numbers each year'
    ],
    considerations: [
      'The real estate election is permanent — it cannot be undone, so we model it thoroughly before recommending it.',
      'Interest blocked by the cap is delayed, not lost forever — but a deduction you cannot use this year is worth less.',
      'Companies under common ownership get counted together, so the exemption math covers your whole picture, not one entity.'
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
