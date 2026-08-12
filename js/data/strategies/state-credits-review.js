/* ============================================================================
 * STRATEGY: State Credits Review (incl. Idaho PTE Credit)
 * Advisory-only — appears in plan documents; does not change scenario math.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'state-credits-review',
  name: 'State Credits Review (incl. Idaho PTE Credit)',
  category: 'Credits & Incentives',
  applyOrder: 86,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A systematic annual sweep of state-level credits and incentives the ' +
      'client is entitled to but frequently leaves unclaimed: pass-through ' +
      'entity tax credits, investment tax credits, jobs and training credits, ' +
      'and negotiated incentives. For Idaho clients, the anchor is the PTE ' +
      'regime: an Affected Business Entity (ABE) election lets the S corp or ' +
      'partnership pay Idaho tax at the entity level (flat 5.3% — cut from 5.695% by H.B. 40 (2025), retroactive to 1/1/2025 — ' +
      'VERIFY the current-year rate; Idaho has cut rates repeatedly), the ' +
      'owners claim the corresponding credit via Form PTE-12 reporting, and ' +
      'the entity-level tax is a federal deduction outside the SALT cap. ' +
      'Idaho also offers a 3% investment tax credit on qualifying tangible ' +
      'property. Because state regimes vary and change annually, this is an ' +
      'advisory checklist item — the PTET strategy module models the federal ' +
      'math when an election is quantified.',
    mechanics: [
      'PTE credits: the entity elects to pay state income tax at the entity ' +
      'level; owners receive a credit (or exclusion) on their personal state ' +
      'return. Federally, the entity-level tax deducts against pass-through ' +
      'income without running through the personal SALT cap — the workaround ' +
      'blessed by IRS Notice 2020-75 and preserved post-OBBBA.',
      'Idaho specifics: the ABE election is made on the entity return; ' +
      'entity pays the flat individual rate (5.3% — verify ' +
      'current); members\' shares of the entity-paid tax are reported to them ' +
      'on Form PTE-12 and claimed as a credit on their Idaho Form 40/43.',
      'Idaho investment tax credit: 3% of qualifying depreciable tangible ' +
      'personal property placed in service in Idaho, with carryforward — ' +
      'routinely missed on equipment-heavy returns (verify current form and ' +
      'limitations).',
      'Common cross-state finds: jobs/new-employee credits, workforce ' +
      'training reimbursement grants, R&D credits piggybacking the federal ' +
      '§41 computation, manufacturing/data-center sales-tax exemptions, and ' +
      'negotiated incentives that require pre-approval BEFORE the hire or ' +
      'investment.',
      'Federal interaction: state credits received can reduce the state tax ' +
      'deduction; refundable state credits in excess of tax may be federal ' +
      'income; PTET paid reduces the federal pass-through deduction dollar ' +
      'for dollar — sequence the analysis with the PTET module.'
    ],
    authority: [
      { type: 'Admin', cite: 'IRS Notice 2020-75', note: 'Entity-level state taxes imposed on pass-throughs are deductible in computing non-separately-stated income — the federal foundation for every state PTET credit regime.' },
      { type: 'Admin', cite: 'Idaho Code §63-3026B (Affected Business Entity election)', note: 'Idaho\'s PTET: electing entity pays tax at the entity level; members claim the credit. Verify current-year mechanics and rate with the Idaho State Tax Commission.' },
      { type: 'Admin', cite: 'Idaho Form PTE-12', note: 'Pass-through owner schedule reporting each member\'s share of entity-paid Idaho tax / withholding for the member-level credit.' },
      { type: 'Admin', cite: 'Idaho Code §63-3029B (investment tax credit)', note: '3% credit on qualifying new depreciable tangible personal property placed in service in Idaho — verify current limitations and carryforward before claiming.' },
      { type: 'IRC', cite: 'IRC §164', note: 'SALT deduction framework; OBBBA set the personal cap at $40,400 (2026) with a high-income phase-down — the reason entity-level state tax deductions matter.' }
    ],
    requirements: [
      'A current-year inventory of every state where the client has nexus, payroll, property, or credits carrying forward.',
      'PTE elections made on time — many states require the election (and sometimes estimated payments) during the tax year, not at filing.',
      'Pre-approval applications filed BEFORE hiring/investment for credits that require certification in advance.',
      'Owner-level coordination: resident-state credit for taxes paid elsewhere, and correct PTE-12-style reporting to each member.'
    ],
    risks: [
      'Rates and regimes move annually — Idaho\'s flat rate (5.3% since 2025, cut from 5.695% by H.B. 40) has been reduced repeatedly by the legislature; using last year\'s rate misprices the election. Verify each year.',
      'A PTET election can hurt owners in credit-mismatch situations (nonresident owners, resident-credit limitations in their home state) — model per-owner before electing.',
      'Missed procedural deadlines (election dates, pre-approval, certification filings) are the leading cause of forfeited state credits; they are rarely recoverable.',
      'Refundable or transferable state credits can create federal taxable income — coordinate the federal return.',
      'Incentive clawbacks: negotiated jobs/investment deals often carry employment or investment maintenance covenants.'
    ],
    bestFit: [
      'Pass-through owners in PTET states (including Idaho ABE candidates) with meaningful state income tax.',
      'Equipment-intensive or hiring-intensive businesses in states with investment/jobs credits.',
      'Multi-state clients who have never had a formal credits-and-incentives sweep.'
    ],
    implementation: [
      'Each fall, inventory nexus states and pull each state\'s current credit list and PTE election calendar.',
      'For Idaho: confirm the current flat rate and ABE election mechanics; run the per-owner benefit; make the election and required payments on time; issue Form PTE-12 detail with the K-1s.',
      'Screen the fixed-asset additions for state investment credits (e.g., Idaho\'s 3% ITC) and the payroll for jobs/training credits.',
      'File pre-approval applications before the qualifying hire or investment where the state requires certification in advance.',
      'Quantify any PTET election in the PTET strategy module so the federal benefit shows in the scenario math.',
      'Document carryforwards in the permanent file so they survive preparer transitions.'
    ]
  },

  client: {
    teaser: 'Money your state may already owe you — most businesses never collect it',
    headline: 'Stop leaving state tax money on the table',
    plainEnglish: [
      'Most business owners focus on federal taxes and treat the state return as an afterthought. But states hand out real money — credits for buying equipment, hiring, training workers, and more — and most of it goes unclaimed simply because nobody looked.',
      'There is also a powerful election available to many business owners: having your company pay your state income tax for you. Done correctly, you get full credit for the payment on your state return, and the business gets a federal deduction that you could not have taken personally because of federal limits on state tax deductions.',
      'This strategy is a yearly sweep: we review every state you touch, catch the credits you qualify for, and make the elections on time. Some of these require paperwork before you hire or buy — which is exactly why the review happens every year, not at tax time.'
    ],
    analogy: 'It\'s like checking every coat pocket at the start of winter — the money was always yours; someone just has to go look for it.',
    benefits: [
      'Captures state credits that go unclaimed by default',
      'The company-pays-your-state-tax election can create a federal deduction you\'d otherwise lose',
      'Catches deadline-driven opportunities before they expire',
      'Repeats and compounds every year'
    ],
    steps: [
      'We map every state your business touches',
      'We match your hiring, equipment, and operations against each state\'s credit list',
      'We make the elections and file the applications on time',
      'We track any unused credits so they carry into future years'
    ],
    considerations: [
      'State rules change nearly every year, so the review has to be redone annually — last year\'s answer may be wrong this year.',
      'A few of these elections can backfire in specific situations (for example, owners living in a different state), so we run your numbers before electing anything.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Quantify a PTET election with the PTET strategy module.']
      : [] };
  }
});
