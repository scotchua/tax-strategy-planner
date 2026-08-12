/* ============================================================================
 * STRATEGY: Series LLC for Multi-Property Holders
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'series-llc',
  name: 'Series LLC for Multi-Property Holders',
  category: 'Entity Structure',
  applyOrder: 13,
  modeled: false, // advisory-only: liability/structure play, no federal tax delta
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A series LLC is a single state-law LLC that establishes internal ' +
      '"series," each with its own assets, members, and liability shield — one ' +
      'formation filing instead of a separate LLC per property. Under Prop. ' +
      'Reg. §301.7701-1(a)(5), each series is treated as a separate entity for ' +
      'federal tax purposes, classified under the normal check-the-box rules ' +
      'based on its own ownership. In the common case (same owner(s) across ' +
      'all series), each series is a disregarded entity or the series ' +
      'collectively mirror what separate LLCs would file — so the draw is ' +
      'liability segregation and administrative economy, not a federal tax ' +
      'rate play. State recognition of the internal shields varies, and ' +
      'title, insurance, and lender practice lag the statutes — the caveats ' +
      'are the substance of this advisory.',
    mechanics: [
      'One master LLC is formed under a series-enabling statute (Delaware ' +
      'pioneered the form; Texas, Illinois, Nevada, and a number of other ' +
      'states have followed); the operating agreement establishes protected ' +
      'series, each holding one property.',
      'If statutory formalities are met — separate records for each series\'s ' +
      'assets, notice in the certificate of formation — the debts of one ' +
      'series are enforceable only against that series\'s assets, replicating ' +
      'a per-property LLC stack with one formation and (in many states) one ' +
      'franchise/annual fee.',
      'Federal classification: Prop. Reg. §301.7701-1(a)(5) treats each ' +
      'series as a separate local-law entity, then applies §7701 ' +
      'check-the-box. A series wholly owned by one person is disregarded; a ' +
      'series with two or more owners defaults to a partnership (its own Form ' +
      '1065) unless it elects otherwise on Form 8832.',
      'Practical upshot for a single owner: all series typically land on the ' +
      'same Schedule E, so the FEDERAL filing burden can be no worse than ' +
      'owning the properties directly — while multi-owner or mixed-ownership ' +
      'series each generate their own return.',
      'The proposed regulation has never been finalized — practice has ' +
      'coalesced around it, but positions should acknowledge its proposed ' +
      'status.',
      'The §469 passive activity rules, cost segregation, and 1031 planning ' +
      'all operate at the activity/property level and are unaffected by the ' +
      'wrapper — this structure composes cleanly with the real estate ' +
      'strategies in this library.'
    ],
    authority: [
      { type: 'Reg', cite: 'Prop. Reg. §301.7701-1(a)(5) (REG-119921-09, 2010)', note: 'Each series of a domestic series LLC is treated as a separate entity for federal tax purposes, classified under the check-the-box rules based on its own ownership. Still proposed — never finalized.' },
      { type: 'Reg', cite: 'Reg. §§301.7701-1 through -3', note: 'Entity classification (check-the-box): single-owner series are disregarded; multi-owner series default to partnership status.' },
      { type: 'Admin', cite: 'Form 8832', note: 'Entity classification election, available series by series if a non-default classification is wanted.' },
      { type: 'IRC', cite: 'IRC §7701(a)(2)–(3)', note: 'Definitions of partnership and corporation that the classification analysis feeds into.' },
      { type: 'IRC', cite: 'IRC §469', note: 'Passive activity rules apply per activity regardless of the series wrapper — the wrapper neither helps nor hurts loss usability.' }
    ],
    requirements: [
      'Formation in (or qualification analysis for) a state with a series-enabling statute; properties in non-series states need local-counsel review before relying on the internal shields.',
      'Strict statutory bookkeeping: separate bank accounts, separate books, and asset records maintained series by series — commingling is the #1 way the shields fail.',
      'Deeds titled in the name of the specific series (not just the master LLC) so the asset segregation is real.',
      'Insurance and lender documents aligned to the series structure — carriers and lenders must name the right insured/borrower.'
    ],
    risks: [
      'Cross-state uncertainty: a state without a series statute may decline to respect the internal liability walls for property or torts located there — the core promise of the structure is not portable everywhere.',
      'Thin case law: the internal shields have limited litigation history compared to ordinary LLCs; bankruptcy treatment of a single series is unsettled.',
      'Federal guidance is a PROPOSED regulation — longstanding and widely followed, but not final.',
      'Operational fragility: sloppy records, shared bank accounts, or deeds left in the master LLC\'s name collapse the segregation.',
      'Title companies and lenders are inconsistent about series — expect friction (or refusal) on financing and closings in some markets.',
      'Some states charge per-series fees or registration (e.g., registered series regimes), eroding the cost advantage.'
    ],
    bestFit: [
      'Clients holding (or accumulating) several rental properties in a state with a robust series statute.',
      'Owners currently holding multiple properties in ONE ordinary LLC — a series structure is a large risk upgrade from that baseline.',
      'Cost-sensitive investors for whom a full per-property LLC stack (formation + annual fees + registered agents) is prohibitive.',
      'Disciplined record-keepers — this structure punishes commingling.'
    ],
    implementation: [
      'Confirm the property states: series-enabling statute or a local-counsel opinion on shield recognition before committing.',
      'Form the master LLC with series-enabling language in the certificate and a series-aware operating agreement; establish each series in writing.',
      'Deed each property into its specific series; open a bank account per series; set up per-series books.',
      'Confirm federal classification series by series (disregarded vs. partnership) and calendar the resulting return obligations.',
      'Notify insurers and lenders; obtain endorsements naming the correct series.',
      'Annual maintenance: verify no commingling, records current, and any newly acquired property is deeded to a new series.'
    ]
  },

  client: {
    teaser: 'One legal umbrella that keeps each of your properties from putting the others at risk',
    headline: 'Protect each property from the others — without a stack of LLCs',
    plainEnglish: [
      'If you own several rental properties, a lawsuit involving one of them — say, an injury at Property A — can put every property you own on the table. The standard fix is a separate LLC for each property, but that means paying formation costs and annual fees several times over, every year.',
      'A series LLC does the same job with one company. Inside it, each property lives in its own protected compartment with its own records and bank account. If something goes wrong at one property, the claim is walled off from the others.',
      'For most single owners, this does not add federal tax paperwork — your rentals are reported much like they are today. The win is protection and lower ongoing cost, with the flexibility to add a new compartment each time you buy another property.'
    ],
    analogy: 'It\'s like a ship built with watertight compartments: one flooded compartment doesn\'t sink the whole vessel.',
    benefits: [
      'Each property is shielded from problems at the others',
      'One company to form and maintain instead of many',
      'Usually no extra federal tax filings for a single owner',
      'Easy to add a new compartment for each new purchase'
    ],
    steps: [
      'We confirm your state (and your properties\' states) support this structure',
      'We set up the company and a compartment for each property, and coordinate re-titling the deeds',
      'We help you open the right bank accounts and set up clean per-property records',
      'Each year we check that the walls between compartments stay intact'
    ],
    considerations: [
      'Not every state recognizes the internal walls — if you own property in a state that doesn\'t, we may recommend a different structure there.',
      'The protection only holds if each compartment keeps its own money and records — mixing funds between properties can undo it.',
      'Some banks, lenders, and title companies are less familiar with this structure, which can add friction when financing or selling.'
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
