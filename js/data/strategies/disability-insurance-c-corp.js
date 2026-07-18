/* ============================================================================
 * STRATEGY: C-Corp Paid Disability (Tax-Free Benefits)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'disability-insurance-c-corp',
  name: 'C-Corp Paid Disability (Tax-Free Benefits)',
  category: 'Health & Fringe',
  applyOrder: 79,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Disability insurance presents a binary design choice the Code makes ' +
      'explicit: if the employer pays the premiums (excluded from the ' +
      'employee\'s income under §106), any disability benefits are TAXABLE ' +
      'under §105(a); if the employee pays with after-tax dollars (or is ' +
      'imputed the premium as income), benefits are TAX-FREE under ' +
      '§104(a)(3). The premium is small and the potential benefit stream is ' +
      'large — often 60% of salary for years — so the arbitrage almost always ' +
      'favors taxing the premium, not the benefit. For a C-corp ' +
      'owner-employee the clean play is either (a) the corporation pays the ' +
      'premium but reports it as W-2 income to the owner, or (b) an executive ' +
      'bonus (§162 double-bonus) arrangement grossing up the owner to buy the ' +
      'policy personally. Employer-paid group plans can also let employees ' +
      'elect annually between pre-tax and after-tax premium treatment ' +
      '(Rev. Rul. 2004-55). Advisory-only: the value is contingent insurance ' +
      'design, not a computable current-year tax change.',
    mechanics: [
      'The taxation follows the premium: §105(a) taxes benefits attributable ' +
      'to employer contributions not included in the employee\'s income; ' +
      '§104(a)(3) excludes benefits from a policy the employee paid for with ' +
      'after-tax dollars (including employer-paid premiums imputed as W-2 ' +
      'income).',
      'The arbitrage: taxing a ~$3,000 premium costs a high-bracket owner ' +
      '~$1,100/year; NOT doing so puts a potential $150,000/year benefit ' +
      'stream in the taxable column. Insure the disaster, not the premium.',
      'Group policies with mixed employer/employee contributions allocate ' +
      'benefits between taxable and tax-free based on the premium split — ' +
      'for group plans, using a three-year averaging of policy-year ' +
      'contributions under the §105 regulations.',
      'Rev. Rul. 2004-55 blesses plan designs letting each employee elect ' +
      'annually, before the plan year, whether their coverage is employer-paid ' +
      '(pre-tax, taxable benefits) or employee-paid via imputed income ' +
      '(tax-free benefits) — the election controls that year\'s benefit taxation.',
      'Sole proprietors and partners cannot deduct their own disability ' +
      'premiums at all (§262 personal expense; §162(l) covers health, not ' +
      'disability) — but their benefits are correspondingly tax-free under ' +
      '§104(a)(3). The C-corp adds the design choice, plus deductible ' +
      'premiums for rank-and-file coverage.',
      'Benefits paid within FICA\'s six-month rule: employer-funded sick pay ' +
      'is FICA wages for the first six full months after work stops (§3121(a)(4) ' +
      'excludes payments after six months) — factor into net-benefit design.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §104(a)(3)', note: 'Benefits from accident/health policies are excluded — except amounts attributable to employer contributions that were not taxed to the employee.' },
      { type: 'IRC', cite: 'IRC §105(a)', note: 'Benefits attributable to untaxed employer contributions are includible in income — the other half of the design choice.' },
      { type: 'IRC', cite: 'IRC §106(a)', note: 'Employer-paid premiums are excluded from employee income (which is precisely what makes the benefits taxable).' },
      { type: 'Admin', cite: 'Rev. Rul. 2004-55', note: 'Annual irrevocable employee election between pre-tax premiums/taxable benefits and after-tax premiums/tax-free benefits is respected.' },
      { type: 'Reg', cite: 'Reg. §1.105-1', note: 'Allocation of benefits between employer- and employee-funded portions of a plan, including contribution averaging for group policies.' },
      { type: 'IRC', cite: 'IRC §3121(a)(4)', note: 'Sick pay after six calendar months following the month work stopped is excluded from FICA wages.' }
    ],
    requirements: [
      'A C-corp (or any employer) with the owner as a W-2 employee and an individual or group disability policy in place or being designed.',
      'A deliberate, documented premium-taxation choice: W-2 inclusion of employer-paid premiums, an executive bonus arrangement, or a Rev. Rul. 2004-55 election design — made BEFORE the plan year/benefit event.',
      'Consistency: the W-2 treatment, plan documents, and insurer records must all tell the same story about who paid the premium.',
      'For group plans: written plan terms establishing the contribution structure the benefit-taxation follows.'
    ],
    risks: [
      'The default drift: corporation quietly deducts and excludes the premium for years, then a disability claim arrives and every benefit check is taxable at exactly the moment income has collapsed.',
      'Inconsistent records — deducted premiums but a claimed §104(a)(3) exclusion at benefit time — is an easy IRS win; the exclusion follows what actually happened, not what is convenient later.',
      'Election designs must be adopted before the plan year (Rev. Rul. 2004-55); retroactive recharacterization after a claim fails.',
      'The imputed premium is a real (small) annual tax cost with no visible payoff unless disability strikes — clients need the framing to stick with it.',
      'Benefit taxation also drives coverage adequacy: a taxable 60%-of-salary benefit nets ~45% or less — size coverage for the after-tax need.'
    ],
    bestFit: [
      'C-corp owner-employees whose income the household actually depends on — the classic overlooked risk for profitable owner-operators.',
      'Professionals with high, hard-to-replace earned income (the benefit stream at stake is large relative to the premium tax).',
      'Employers adding group disability who can bake the Rev. Rul. 2004-55 election into the plan from day one.'
    ],
    implementation: [
      'Inventory existing disability coverage: who pays, how it is deducted/reported, and what the benefit taxation would be today.',
      'Choose the design: W-2 imputation of corporate-paid premiums, an executive bonus (gross-up) for a personally owned policy, or an annual-election group design.',
      'Paper it: board resolution/plan amendment, payroll coding of the premium, insurer records matching.',
      'Size the benefit to the AFTER-tax need under the chosen design.',
      'Re-verify the payroll treatment each January — this is the strategy a payroll change silently breaks.'
    ]
  },

  client: {
    teaser: 'One paperwork choice today decides whether a six-figure safety net arrives taxed or tax-free',
    headline: 'Make your disability benefits tax-free — before you ever need them',
    plainEnglish: [
      'Disability insurance replaces your paycheck if illness or injury stops you from working. Buried in the tax rules is a simple trade: if the company pays the premium and nobody pays tax on that premium, then any benefit checks are taxable. If the premium is taxed to you now — a small amount — the benefit checks arrive completely tax-free.',
      'Think about the sizes involved. The premium might be a few thousand dollars a year; the tax on it, a few hundred to a thousand. The benefits, if you ever need them, could be tens of thousands of dollars a year for many years — arriving at the exact moment your income has stopped. Paying a little tax on the small number to make the big number tax-free is almost always the right trade.',
      'The catch is that this is decided by how the paperwork is set up before anything happens — how the premium runs through payroll, what the records say. Companies drift into the wrong setup by default because deducting the premium feels like the win. We set it up deliberately, the right way around.'
    ],
    analogy: 'It is like choosing to pay the tax on a seed instead of the harvest. Nobody should pay tax on the harvest — especially a harvest you only collect in a bad year.',
    benefits: [
      'Benefit checks arrive tax-free when you can least afford a tax bill',
      'The cost of getting this right is small — tax on a premium, not on years of benefits',
      'Works through your corporation with a simple payroll adjustment',
      'Also fixes coverage sizing — tax-free benefits mean you may need less coverage'
    ],
    steps: [
      'We review your current disability coverage and how the premiums flow today',
      'We pick the setup that makes your benefits tax-free',
      'We adjust the payroll treatment and document the choice',
      'We re-check it each year so a payroll change never quietly undoes it'
    ],
    considerations: [
      'This means paying a small amount of tax every year on the premium — the cost of making the big number tax-free.',
      'The choice has to be made before a claim ever happens; it cannot be fixed after the fact.',
      'If employees are covered under a group plan, the design has to handle their side of the same choice fairly.'
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
