/* ============================================================================
 * STRATEGY: Accountable Plan
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'accountable-plan',
  name: 'Accountable Plan',
  category: 'Business Expenses',
  applyOrder: 40,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A written reimbursement arrangement meeting Reg. §1.62-2\'s three tests ' +
      '(business connection, substantiation, return of excess). Reimbursements ' +
      'are deductible to the entity and excluded from the owner-employee\'s W-2 ' +
      'income — no income tax, no FICA. Critical for S-corp owners: unreimbursed ' +
      'employee expenses are nondeductible (the 2%-misc itemized deduction is ' +
      'permanently gone post-TCJA/OBBBA), so expenses the owner eats personally ' +
      'produce zero tax benefit. The accountable plan is the only clean path for ' +
      'home office, personal-vehicle, and mixed-use expenses of an S-corp owner.',
    mechanics: [
      'Three requirements (Reg. §1.62-2(d)-(f)): (1) business connection — the ' +
      'expense is deductible under §162 and incurred in service to the employer; ' +
      '(2) substantiation within a reasonable period (60 days is the safe harbor); ' +
      '(3) return of any excess advance within a reasonable period (120 days).',
      'Reimbursements are excluded from wages (§62(a)(2)(A), §62(c)) — they never ' +
      'hit the W-2, avoiding both income tax and both halves of FICA.',
      'Home office: reimburse the business-use percentage of rent/mortgage ' +
      'interest, utilities, insurance, repairs — computed like Form 8829 but paid ' +
      'as a reimbursement. No depreciation recapture issue since the entity ' +
      '(not the owner) takes the deduction as an expense.',
      'Vehicle: standard mileage rate × substantiated business miles (mileage ' +
      'log required under §274(d)), or actual-expense business percentage.',
      'Failure of any test makes the arrangement nonaccountable: everything paid ' +
      'becomes W-2 wages subject to withholding and FICA (Reg. §1.62-2(c)(5)).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §62(a)(2)(A); §62(c)', note: 'Statutory basis — reimbursed employee expenses under a qualifying arrangement are excluded from income.' },
      { type: 'Reg', cite: 'Reg. §1.62-2', note: 'The three tests: business connection, substantiation, return of excess; consequences of a nonaccountable plan.' },
      { type: 'IRC', cite: 'IRC §274(d)', note: 'Strict substantiation for vehicle, travel, and meals — contemporaneous records or the reimbursement fails.' },
      { type: 'IRC', cite: 'IRC §67(g)', note: 'Miscellaneous 2% itemized deductions (incl. unreimbursed employee expenses) eliminated — made permanent by OBBBA. Why reimbursement is the only path.' },
      { type: 'Admin', cite: 'Rev. Rul. 2012-25', note: 'IRS scrutiny of arrangements that recharacterize wages as reimbursements — the plan must reimburse real, substantiated expenses, not restructure pay.' }
    ],
    requirements: [
      'A written plan adopted by the entity (board resolution / consent).',
      'Owner-employee status (works for any employee, but the win is for S-corp owners).',
      'Expense reports with receipts within the safe-harbor windows (60/120 days).',
      'Actual reimbursement payments from the entity account — not journal entries at year-end (sloppy but common; contemporaneous is defensible).'
    ],
    risks: [
      'Blown substantiation converts reimbursements to W-2 wages retroactively — payroll tax, withholding, penalties.',
      'Year-end lump-sum "reimbursements" with no expense reports look like disguised wages (Rev. Rul. 2012-25).',
      'Mileage without a contemporaneous log fails §274(d) — the most commonly lost deduction in exam.',
      'Home-office percentage must reflect exclusive, regular business use.'
    ],
    bestFit: [
      'Every S-corp owner with a home office or personal vehicle used for business — this is near-universal once an entity exists.',
      'Businesses with employees incurring out-of-pocket expenses.',
      'Pairs automatically with the S-Corp Election strategy.'
    ],
    implementation: [
      'Adopt a written accountable plan (template resolution + plan document).',
      'Build the home-office worksheet (square footage %, eligible costs).',
      'Set a monthly or quarterly expense-report cadence with receipt capture.',
      'Reimburse by entity check/ACH; book to expense categories, not owner draws.',
      'Review annually as expenses and business use change.'
    ]
  },

  client: {
    teaser: 'Turns spending you already do into tax-free dollars',
    headline: 'Get paid back for business costs — tax-free',
    plainEnglish: [
      'You already spend personal money on your business: a home office, your car, your cell phone, internet, supplies. Without a formal plan, those dollars come out of your pocket with no tax benefit at all — the tax law no longer lets employees deduct them.',
      'An accountable plan is a simple written policy that lets your business pay you back for those costs. The reimbursement is a deductible expense for the business, and it is completely tax-free money to you — no income tax, no payroll tax.',
      'You were already spending this money. The plan just makes sure it comes back to you tax-free instead of disappearing.'
    ],
    analogy: 'It works exactly like the expense reports at any large company — you submit the expense, the company pays you back, and nobody pays tax on a reimbursement. Your business just needs the policy in place.',
    benefits: [
      'Turn existing personal spending into tax-free reimbursements',
      'Your business deducts every dollar it pays you back',
      'Covers home office, vehicle mileage, phone, internet, travel, and more',
      'Simple monthly habit once it is set up'
    ],
    steps: [
      'We put a written reimbursement plan in place for your business (one-time setup)',
      'We calculate your home office and vehicle amounts with you',
      'You snap receipts and submit a simple expense report each month',
      'Your business reimburses you — tax-free'
    ],
    considerations: [
      'The records matter: receipts and a mileage log are what make the reimbursements audit-proof. We give you the templates and cadence.',
      'Reimbursements must reflect real business costs — the numbers here should match what you actually spend.'
    ]
  },

  inputs: [
    { key: 'annualAmount', label: 'Annual reimbursable expenses (home office, mileage, etc.)', type: 'currency', default: 12000 }
  ],

  suggest: function (p) {
    if (!(p.passthroughK1 > 0)) return null;
    return { reason: 'Entity owners almost always have home-office/vehicle/phone costs worth reimbursing tax-free — near-universal once an entity exists.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs entity income
  },

  /**
   * Deducts reimbursements from entity income; tax-free to the owner, so
   * nothing is added to personal income. Sole proprietors already deduct
   * these costs directly on Schedule C, so no incremental benefit is modeled
   * without an entity.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualAmount || 0;
    if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' of substantiated expenses reimbursed — ' +
          'deductible to the entity, tax-free to the owner (Reg. §1.62-2).');
      }
    } else {
      notes.push('Requires an entity with an owner-employee (typically an S corp). ' +
        'Sole proprietors already deduct these costs on Schedule C, so no incremental ' +
        'benefit is modeled. Pair with the S-Corp Election strategy.');
    }
    return { profile: p, notes: notes };
  }
});
