/* ============================================================================
 * STRATEGY: Multi-Entity Structuring (OpCo / PropCo Split)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'multi-entity-structuring',
  name: 'Multi-Entity Structuring (OpCo / PropCo Split)',
  category: 'Entity Structure',
  applyOrder: 12,
  modeled: false, // advisory-only: structural value, no honest per-return math
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Split the client\'s business into an operating entity (OpCo) and a ' +
      'separate entity holding the real estate or other high-value assets ' +
      '(PropCo), with OpCo paying market-rate rent to PropCo. The rent is ' +
      'deductible to OpCo under §162; the rental income in PropCo is not ' +
      'subject to SE tax. The self-rental rule (Reg. §1.469-2(f)(6)) ' +
      'recharacterizes net rental INCOME from a materially participating ' +
      'tenant business as nonpassive, so it cannot shelter passive losses — ' +
      'but the structure still delivers liability isolation, income-character ' +
      'flexibility (QBI, SALT/PTET placement), and §1031 optionality on the ' +
      'real estate independent of the business. Value is structural; the ' +
      'dollar effect depends on facts entered elsewhere (see Self-Rental ' +
      'Structuring for the rent-flow math).',
    mechanics: [
      'PropCo (typically an LLC taxed as a partnership or disregarded entity) ' +
      'holds the building/equipment; OpCo (S corp, partnership, or C corp) ' +
      'runs operations and pays market-rate rent under a written lease — ' +
      'deductible under §162 as an ordinary and necessary expense.',
      'Liability isolation: a judgment against the operating business does ' +
      'not reach the real estate, and vice versa — the most valuable asset ' +
      'is walled off from operating risk (slip-and-fall, employment claims, ' +
      'contract disputes).',
      'Income character: rental income in PropCo escapes SE tax (§1402(a)(1)); ' +
      'the self-rental rule (Reg. §1.469-2(f)(6)) makes net rental income from ' +
      'the related operating tenant nonpassive, while self-rental LOSSES stay ' +
      'passive — plan which side of that asymmetry the client lands on.',
      'QBI placement: rental to a commonly controlled trade or business is ' +
      'treated as a trade or business for §199A (Reg. §1.199A-1(b)(14)), and ' +
      'entities can be aggregated under Reg. §1.199A-4 to manage the W-2 ' +
      'wage/UBIA limits.',
      'SALT/PTET flexibility: state PTET elections are made entity by entity — ' +
      'the split lets the advisor route income to the entity where the ' +
      'election (or a state\'s rules) works best.',
      '§1031 optionality: PropCo can exchange the building for replacement ' +
      'property without touching or restructuring the operating business, and ' +
      'the business can be sold someday without forcing a real estate sale ' +
      '(or vice versa).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)(3)', note: 'OpCo\'s deduction for rent actually required for continued use of property it does not own — must be market-rate and pursuant to a genuine lease.' },
      { type: 'Reg', cite: 'Reg. §1.469-2(f)(6)', note: 'Self-rental recharacterization: net rental income from property rented to a business in which the taxpayer materially participates is nonpassive; losses remain passive.' },
      { type: 'IRC', cite: 'IRC §1402(a)(1)', note: 'Rentals from real estate are excluded from self-employment income — the rent stream avoids SE tax.' },
      { type: 'Reg', cite: 'Reg. §1.199A-1(b)(14)', note: 'Self-rental to a commonly controlled trade or business is treated as a §199A trade or business, securing QBI treatment for the rent.' },
      { type: 'Reg', cite: 'Reg. §1.199A-4', note: 'Aggregation rules — commonly controlled entities can be aggregated to share W-2 wages/UBIA for the §199A limits.' },
      { type: 'Reg', cite: 'Reg. §1.469-4(d)(1)', note: 'Grouping election: a rental can be grouped with the operating activity as an appropriate economic unit where ownership is proportionate — the standard mitigation for the self-rental trap.' },
      { type: 'IRC', cite: 'IRC §1031', note: 'Like-kind exchange optionality preserved by holding the real property in its own entity.' }
    ],
    requirements: [
      'A written, market-rate lease between OpCo and PropCo, actually paid and enforced.',
      'Real separateness: separate bank accounts, books, insurance, and observance of entity formalities — the liability shield collapses without them.',
      'Clean title transfer of the property into PropCo (watch transfer taxes, lender due-on-sale/consent, and insurance re-titling).',
      'Coordinated ownership if §469 grouping or §199A aggregation is intended — the elections have common-ownership requirements.'
    ],
    risks: [
      'Self-rental asymmetry: net rental income is nonpassive (cannot absorb the client\'s passive losses), but if rent is set to create a loss, that loss is passive and may be trapped — rent-setting is a real planning decision, not a dial.',
      'Non-market rent invites §482-style reallocation and, in a C-corp OpCo, disguised-dividend recharacterization.',
      'Moving an appreciated building OUT of an existing C or S corporation is a taxable event — this structure is far cheaper to build at acquisition than to retrofit.',
      'Transfer frictions: deed transfer taxes, lender consent, property-tax reassessment in some states.',
      'Extra compliance: additional returns, leases, and bookkeeping — the benefit must justify the overhead.'
    ],
    bestFit: [
      'Business owners who own (or are about to buy) the building their business operates from.',
      'Businesses with meaningful liability exposure and a valuable asset worth isolating.',
      'Clients planning an eventual business sale where retaining the real estate as a rental to the buyer is attractive.',
      'Multi-state or PTET-sensitive clients who benefit from routing income between entities.'
    ],
    implementation: [
      'Inventory assets and exposure: decide what belongs in PropCo (real estate, sometimes heavy equipment or IP).',
      'Form PropCo (usually an LLC) BEFORE the property purchase when possible; retrofits need a tax-cost analysis first.',
      'Obtain a market rent study or comparable leases; execute a written lease and set up actual monthly payments.',
      'Re-title insurance, update lender documents, and move property-related contracts to PropCo.',
      'Evaluate the Reg. §1.469-4 grouping election and §199A aggregation on the first return reflecting the structure.',
      'Document everything in the permanent file; revisit rent annually against market.'
    ]
  },

  client: {
    teaser: 'Separates what you own from what you operate — protection and tax flexibility in one move',
    headline: 'Put your building and your business in separate boxes',
    plainEnglish: [
      'If your business owns its building — or you are about to buy one — keeping them in the same legal basket is risky. A lawsuit against the business could take the building with it. Splitting them means the business operates in one company and the property sits safely in another.',
      'The business then pays fair-market rent to the property company, just as it would to any landlord. That rent is a normal deductible expense for the business, and the rental income comes to you without the extra payroll-style tax that hits business profits.',
      'The split also keeps your options open. Someday you might sell the business but keep the building as a rental to the new owner, or trade the building for a bigger one without disturbing the business at all. Separate boxes make both possible.'
    ],
    analogy: 'It\'s like keeping your savings in a different account than your spending money — same owner, but a problem in one account can\'t drain the other.',
    benefits: [
      'Your most valuable asset is shielded from business lawsuits and debts',
      'Rent moves money from the business to you without payroll-style taxes',
      'Freedom to sell, keep, or trade the building separately from the business',
      'More levers for state tax planning and other strategies to build on'
    ],
    steps: [
      'We design the structure — which assets go where, and who owns each company',
      'We set a fair rent backed by real market data and put a proper lease in place',
      'We coordinate the title, insurance, and lender paperwork',
      'Each year we review the rent and filings so everything stays defensible'
    ],
    considerations: [
      'This is easiest and cheapest to set up when you buy the property — moving a building out of an existing corporation can trigger tax, so we check that math first.',
      'The rent must be genuinely market-rate and actually paid — this is a real landlord/tenant relationship, not a paper one.',
      'There is some added paperwork and cost (an extra tax return, a lease, separate accounts) that the benefits need to outweigh.'
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
