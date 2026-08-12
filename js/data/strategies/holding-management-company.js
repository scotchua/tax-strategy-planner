/* ============================================================================
 * STRATEGY: Holding / Management Company Fee Structures
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'holding-management-company',
  name: 'Holding / Management Company Fee Structures',
  category: 'Entity Structure',
  applyOrder: 16,
  modeled: false, // advisory-only: value depends on the surrounding structure, not return math
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A holding or management company charges related operating entities ' +
      'arm\'s-length fees for services actually rendered — centralized ' +
      'management, accounting, HR, marketing, treasury. Done properly, the ' +
      'fees are deductible to the payors under §162 and consolidate income in ' +
      'an entity where it can be deployed for group-level planning (owner ' +
      'comp, retirement plans, PTET positioning, succession). Done as a ' +
      'profit-skimming device, the fees get recharacterized: Aspro, Inc. v. ' +
      'Comm\'r, 32 F.4th 673 (8th Cir. 2022), disallowed "management fees" ' +
      'paid to shareholders as disguised dividends where there was no ' +
      'arm\'s-length pricing, no written agreements, and payments tracked ' +
      'ownership rather than services. §482 gives the IRS explicit authority ' +
      'to reallocate income among commonly controlled entities. This is a ' +
      'documentation-first structure: the substance and the paper have to ' +
      'exist before the deduction does.',
    mechanics: [
      'Structure: owners hold ManageCo (often the entity employing shared ' +
      'staff and the owner-executives); each OpCo pays ManageCo a fee under a ' +
      'written services agreement. The fee is a §162 ordinary and necessary ' +
      'expense of each OpCo if — and only if — it is compensation for ' +
      'services actually performed and reasonable in amount.',
      'Pricing must be arm\'s-length: what an unrelated management firm would ' +
      'charge for the same services. Cost-plus a modest markup with a time or ' +
      'usage allocation is the defensible pattern; a fee set to zero out OpCo ' +
      'profit, or split among owners by ownership percentage, is the Aspro ' +
      'fact pattern.',
      '§482 authority: the IRS may distribute, apportion, or allocate income ' +
      'and deductions among commonly controlled trades or businesses to ' +
      'clearly reflect income — the recharacterization backstop even where ' +
      '§162 might arguably be met.',
      'What recharacterization looks like: fee deduction disallowed at OpCo ' +
      '(income comes back), while the recipient may still have reported the ' +
      'receipt — double inclusion until corrected. In a C-corp context the ' +
      'payment becomes a nondeductible dividend (Aspro); in passthrough ' +
      'contexts it becomes a distribution or a reallocation.',
      'Legitimate planning uses once the substance is real: one payroll and ' +
      'benefits platform for the group (retirement plans sized at the ' +
      'management-company level — watch §414(b)/(c)/(m) controlled-group and ' +
      'affiliated-service-group aggregation), a clean home for owner ' +
      'reasonable comp across several ventures, PTET election placement, and ' +
      'a natural vehicle for succession (children/successors employed at ' +
      'ManageCo).',
      'Character caution: management fees are ordinary services income to the ' +
      'recipient — SE/payroll tax applies at ManageCo, and fee income is not ' +
      'QBI-friendly if ManageCo is an SSTB-type consulting operation for ' +
      '§199A purposes. The net group benefit must be modeled, not assumed.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Deductibility standard: ordinary, necessary, reasonable in amount, and paid for services actually rendered — each element is litigated in management-fee cases.' },
      { type: 'IRC', cite: 'IRC §482', note: 'IRS authority to reallocate income and deductions among commonly controlled entities to clearly reflect income — the structural backstop against non-arm\'s-length fees.' },
      { type: 'Case', cite: 'Aspro, Inc. v. Comm\'r, 32 F.4th 673 (8th Cir. 2022)', note: 'Management fees paid to shareholders disallowed and treated as disguised dividends: no written agreements, no arm\'s-length pricing study, payments proportionate to ownership, deducted in lump sums at year-end. The blueprint for what NOT to do.' },
      { type: 'IRC', cite: 'IRC §§301, 316', note: 'The recharacterization destination in a C-corp group: nondeductible dividend to the owner, taxable without a corresponding deduction.' },
      { type: 'Reg', cite: 'Reg. §1.162-7', note: 'Reasonable compensation for services — the measuring stick applied to service fees between related parties.' },
      { type: 'IRC', cite: 'IRC §414(b), (c), (m)', note: 'Controlled-group and affiliated-service-group aggregation — retirement/benefit plans cannot be gamed by splitting employees between related entities.' }
    ],
    requirements: [
      'Services that are REAL: identifiable functions (management, accounting, HR, marketing) performed by ManageCo personnel for each paying entity.',
      'A written intercompany services agreement per payor, in place BEFORE the fees are paid, describing services, pricing methodology, and payment terms.',
      'Arm\'s-length support: cost buildup with markup, comparable third-party pricing, or a time/usage allocation study — retained in the file.',
      'Actual invoicing and payment on a regular schedule (monthly/quarterly), not a year-end true-up that erases OpCo profit.',
      'Consistent books: the fee income, payroll, and expenses actually run through ManageCo.'
    ],
    risks: [
      'Recharacterization (Aspro; §482): deduction denied to the payor while the income may stay taxed at the recipient — the worst of both worlds, plus accuracy penalties.',
      'Fees proportional to ownership rather than services are treated as disguised distributions — the single most damaging fact in the case law.',
      'Year-end lump-sum fees timed to zero out OpCo income signal profit-shifting, not services.',
      'Benefit-plan aggregation (§414) means the management company cannot be used to carve owners into a rich plan while excluding OpCo employees.',
      'Added compliance cost: another entity, payroll, return, and intercompany accounting — the group benefit must exceed the overhead.',
      'State nexus and gross-receipts taxes can attach to intercompany fees.'
    ],
    bestFit: [
      'Owners of MULTIPLE operating entities with genuinely shared management, staff, or back-office functions.',
      'Groups wanting one clean home for owner compensation, group benefits, and retirement plans (with §414 aggregation respected).',
      'Succession situations where the next generation runs a real management layer across the family\'s entities.',
      'Clients disciplined enough to invoice monthly and keep the paper current — this structure fails casual operators.'
    ],
    implementation: [
      'Inventory the shared functions and who performs them; if there are none, stop — there is no fee to charge.',
      'Choose ManageCo\'s form and tax status deliberately (payroll, PTET, and §199A character all follow from it).',
      'Draft written services agreements for each OpCo with a pricing methodology (cost-plus or comparable-based) and document the support.',
      'Move the relevant staff/payroll to ManageCo; set up monthly invoicing and actual payment.',
      'Coordinate benefit plans across the controlled group (§414 testing) before promising plan outcomes.',
      'Review pricing annually against actual costs and services; refresh the file the way a third party would renegotiate.'
    ]
  },

  client: {
    teaser: 'A central company that runs the others — turning overhead into structure, and structure into planning room',
    headline: 'One company to manage them all — cleanly and deliberately',
    plainEnglish: [
      'When you own more than one business, you are usually already sharing things between them — your own time, a bookkeeper, an office, software. A management company makes that official: one central company employs the shared people, does the shared work, and charges each business a fair, documented fee for it.',
      'Those fees are normal deductible expenses for each business, and the income lands in one place, which makes real planning possible: your salary comes from one payroll instead of three, retirement and benefit plans are run once, and the whole group is easier to hand to the next generation or a buyer.',
      'The one rule that matters: the fees must be honest — real services, at prices an outside firm would charge, billed and paid like any vendor. The IRS specifically looks for "management fees" that are really just profit being moved around, so we build this with contracts, invoices, and pricing support from day one.'
    ],
    analogy: 'Think of it as the head office of your own small conglomerate: each store pays head office for the services it actually uses, and head office is where the owners, the payroll, and the long-term plans live.',
    benefits: [
      'Shared staff and overhead organized once, instead of duplicated in every business',
      'One payroll and one benefits program for you and your key people',
      'A natural home base for retirement plans, succession, and state tax planning',
      'Cleaner books in each operating business'
    ],
    steps: [
      'We map what your businesses already share and what a fair fee for it looks like',
      'We set up the central company and put written service agreements in place',
      'We move the shared payroll and set up regular monthly billing between the companies',
      'Each year we re-check the fees against real costs so everything stays defensible'
    ],
    considerations: [
      'The fees must reflect real work at fair prices — this structure is documentation-heavy, and we will tell you honestly if your situation doesn\'t have enough genuine shared services to support it.',
      'It adds an entity, a payroll, and a tax return, so the benefits need to clearly outweigh the added cost.',
      'Retirement plan rules treat commonly owned companies as one group — this structure organizes benefits; it can\'t be used to leave employees out.'
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
