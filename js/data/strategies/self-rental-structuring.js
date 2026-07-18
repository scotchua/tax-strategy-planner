/* ============================================================================
 * STRATEGY: Self-Rental Structuring (Real Estate Held Separately)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'self-rental-structuring',
  name: 'Self-Rental Structuring (Real Estate Held Separately)',
  category: 'Entity Structure',
  applyOrder: 18,
  modeled: false, // advisory-only: character/structure play; rent level and entity facts vary too much to model honestly
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Hold the business\'s real estate personally or in a separate LLC and ' +
      'rent it to the operating entity at market rate. The rent is deductible ' +
      'to OpCo under §162; the rental income on the owner\'s side is excluded ' +
      'from self-employment income under §1402(a)(1) — converting dollars that ' +
      'would otherwise emerge as SE/FICA-taxed business profit into rent that ' +
      'bears income tax only. The catch is the self-rental recharacterization ' +
      'rule, Reg. §1.469-2(f)(6): net rental INCOME from property leased to a ' +
      'business in which the taxpayer materially participates is treated as ' +
      'NONPASSIVE — so it cannot absorb the client\'s passive losses — while ' +
      'net rental LOSSES from the same property remain passive and can be ' +
      'trapped. The Reg. §1.469-4 grouping election is the standard ' +
      'mitigation, and market-rate rent is the non-negotiable foundation.',
    mechanics: [
      'Structure: owner (or an LLC, often disregarded or husband-wife) holds ' +
      'the building; OpCo leases it under a written market-rate lease. OpCo ' +
      'deducts rent under §162(a)(3); owner reports the rental on Schedule E.',
      'Employment-tax character: rentals from real estate are excluded from ' +
      'SE income by §1402(a)(1). Rent paid instead of additional passthrough ' +
      'profit (sole prop or GP share) avoids the 15.3%/2.9%/0.9% stack; note ' +
      'that S-corp distributions already avoid SE tax, so for S-corp owners ' +
      'the value is liability isolation, exit flexibility, and basis/QBI ' +
      'placement more than employment tax.',
      'Self-rental rule, Reg. §1.469-2(f)(6): if the tenant is a trade or ' +
      'business in which the taxpayer MATERIALLY participates, net rental ' +
      'income is recharacterized as nonpassive. It cannot shelter passive ' +
      'losses from other activities (the "PIG" play fails against a ' +
      'self-rental). Courts have consistently sustained the rule.',
      'The asymmetry: recharacterization applies only to net INCOME years. A ' +
      'net LOSS on the self-rental stays passive under the normal §469 rules ' +
      'and is usable only against passive income or on disposition (§469(g)) ' +
      '— so financing/depreciation that drives the rental negative can strand ' +
      'deductions.',
      'Mitigation — grouping: Reg. §1.469-4(d)(1) permits grouping the rental ' +
      'with the operating activity as one economic unit where they are under ' +
      'common control/ownership (each owner has the same proportionate ' +
      'interest). Grouped, the rental loses separate passive character and ' +
      'losses are not trapped; the election is disclosed, binding, and should ' +
      'be made deliberately.',
      'QBI: rental to a commonly controlled trade or business is treated as a ' +
      '§199A trade or business (Reg. §1.199A-1(b)(14)), so market rent ' +
      'generally keeps QBI character; §199A aggregation (Reg. §1.199A-4) can ' +
      'coordinate the wage/UBIA limits across the pair.',
      'Rent must be MARKET-RATE and paid under a real lease: above-market ' +
      'rent invites recharacterization/§482-style reallocation and (with a ' +
      'C-corp tenant) constructive-dividend exposure; below-market rent ' +
      'wastes the character benefit and distorts both entities\' economics.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)(3)', note: 'OpCo\'s rent deduction — for property used in the trade or business in which the taxpayer has no equity/title, under a genuine lease at a reasonable amount.' },
      { type: 'IRC', cite: 'IRC §1402(a)(1)', note: 'Real estate rentals excluded from self-employment income — the character conversion at the heart of the strategy.' },
      { type: 'Reg', cite: 'Reg. §1.469-2(f)(6)', note: 'Self-rental recharacterization: net rental income from property rented to an activity in which the taxpayer materially participates is nonpassive; it cannot absorb passive losses.' },
      { type: 'Case', cite: 'Krukowski v. Comm\'r, 279 F.3d 547 (7th Cir. 2002)', note: 'Self-rental rule sustained as a valid exercise of regulatory authority — attorney\'s rental income from his own law firm tenant recharacterized as nonpassive.' },
      { type: 'Case', cite: 'Fransen v. United States, 191 F.3d 599 (5th Cir. 1999)', note: 'Same result — the recharacterization regulation upheld against a validity challenge.' },
      { type: 'Reg', cite: 'Reg. §1.469-4(d)(1)', note: 'Grouping election: rental and operating activities may be treated as one appropriate economic unit where ownership is proportionate — the standard mitigation for trapped self-rental losses.' },
      { type: 'Reg', cite: 'Reg. §1.199A-1(b)(14)', note: 'Self-rental to a commonly controlled trade or business is a §199A trade or business — preserves QBI treatment of the rent.' },
      { type: 'IRC', cite: 'IRC §469(g)', note: 'Suspended passive losses release in full on a fully taxable disposition of the activity — the eventual exit valve for trapped self-rental losses.' }
    ],
    requirements: [
      'A separate operating entity as tenant, and the real estate titled outside it (personally or in its own LLC).',
      'A written lease at documented market rent (appraisal or comparable leases in the file), actually invoiced and paid.',
      'Separate books, bank account, and insurance for the rental — the liability shield and the tax character both depend on real separateness.',
      'Deliberate §469 posture: decide up front whether to live with the recharacterization asymmetry or make the Reg. §1.469-4 grouping election (disclosure statement with the return).'
    ],
    risks: [
      'The self-rental trap: clients (and prior preparers) often plan to use self-rental income to absorb passive losses — Reg. §1.469-2(f)(6) forecloses it, and Krukowski/Fransen make the rule effectively unchallengeable.',
      'Loss stranding: heavy depreciation (e.g., a cost segregation study on the building) can drive the self-rental negative, and those losses are passive unless grouped — coordinate BEFORE commissioning the study.',
      'The grouping election is sticky: it binds future years and changes how material participation and dispositions are tested — model both postures before electing.',
      'Non-market rent is the exam wedge: above-market invites reallocation and constructive-dividend treatment; there is no safe harbor, only documentation.',
      'Moving a building OUT of an existing corporation to create this structure is a taxable event — the structure is for acquisitions and already-separate property, not corporate retrofits without a tax-cost analysis.',
      'State/local frictions: transfer taxes, reassessment, lender consent on re-titling.'
    ],
    bestFit: [
      'Sole proprietors and general partners about to buy a business building — the SE-tax character benefit is largest for them.',
      'S-corp and partnership owners who want the building out of the operating entity for liability and exit-flexibility reasons.',
      'Clients pairing the building with cost segregation, where grouping analysis determines whether accelerated losses are usable.',
      'Owners planning to sell the business someday but keep the real estate as a rental income stream.'
    ],
    implementation: [
      'Title the property personally or in a new LLC at acquisition (retrofits from a corporation need a tax-cost analysis first).',
      'Obtain market-rent support (appraisal or 2–3 comparable leases); execute a written lease with normal terms and actual monthly payment.',
      'Set up separate books, banking, and insurance for the rental activity.',
      'Run the §469 analysis both ways — recharacterization asymmetry vs. grouping — and if grouping wins, attach the Reg. §1.469-4 disclosure statement to the return for the first grouped year.',
      'Evaluate §199A aggregation for the wage/UBIA limits where relevant.',
      'Revisit rent against market annually and re-document; keep the lease renewed, not lapsed.'
    ]
  },

  client: {
    teaser: 'Restructures one of your biggest business expenses into lightly-taxed personal income',
    headline: 'Own your business\'s building the smart way',
    plainEnglish: [
      'Your business needs a place to operate, and someone is going to collect rent for that — it might as well be you. Instead of the business owning its building, you own the building personally (or in its own simple company) and lease it to your business at the going market rate.',
      'The rent is a normal deductible expense for the business. On your side, rental income is not hit with the extra 15% self-employment tax that business profits carry — so the same dollars reach you with a lighter tax load. The building is also protected: if the business is ever sued, your real estate is not sitting inside it as a target.',
      'There is a technical wrinkle we manage for you: special IRS rules control how rental income and losses from your own building interact with the rest of your tax picture, and the right setup choice depends on your situation. We make that choice deliberately at the start — it is much easier to get right on day one than to fix later.'
    ],
    analogy: 'You become your business\'s landlord. The rent check it was always going to write just gets written to you — and it arrives with less tax taken out of it than a paycheck or profit would.',
    benefits: [
      'Rent reaches you without the extra self-employment tax on business profits',
      'Your building is shielded from business lawsuits and debts',
      'Keep the building — and its rent — even if you sell the business someday',
      'Sets up cleanly alongside depreciation strategies on the property'
    ],
    steps: [
      'We structure the ownership before (or as) you buy the property',
      'We document a fair market rent and put a real lease in place',
      'We make the technical elections that keep your deductions usable',
      'Each year we review the rent and records so it all stays defensible'
    ],
    considerations: [
      'The rent must be genuinely market-rate, with real payments and paperwork — this is an actual landlord relationship, not a label.',
      'If your building is already inside a corporation, moving it out can trigger tax — we check that math before recommending any change.',
      'The IRS has special rules for renting to your own business; done casually they can trap deductions, which is exactly why we set the structure and elections deliberately.'
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
