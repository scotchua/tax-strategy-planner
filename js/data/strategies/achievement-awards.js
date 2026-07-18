/* ============================================================================
 * STRATEGY: Employee Achievement Awards (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'achievement-awards',
  name: 'Employee Achievement Awards',
  category: 'Business Expenses',
  applyOrder: 47,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'One of the few remaining double benefits in compensation: a qualifying ' +
      'employee achievement award is deductible to the employer under §274(j) ' +
      'AND excluded from the employee\'s income under §74(c) — no income tax, ' +
      'no FICA on either side. The rules are narrow and mechanical: TANGIBLE ' +
      'PERSONAL PROPERTY (never cash, gift cards, or their equivalents — the ' +
      'TCJA wrote that into §274(j)(3)(A)(ii)) awarded for LENGTH OF SERVICE ' +
      'or SAFETY ACHIEVEMENT as part of a meaningful presentation. The ' +
      'deduction/exclusion cap is $400 per employee per year for nonqualified ' +
      'awards, $1,600 where the awards are made under a written qualified plan ' +
      'that does not discriminate in favor of highly compensated employees. ' +
      'Advisory: the dollars are small per employee, but across a workforce it ' +
      'beats a taxable bonus dollar-for-dollar and builds retention structure.',
    mechanics: [
      'Definition (§274(j)(3)(A)): an item of tangible personal property, ' +
      'awarded for length of service or safety achievement, given as part of a ' +
      'meaningful presentation, and not disguised compensation.',
      'TCJA codified the exclusions: cash, cash equivalents, gift cards/' +
      'coupons/certificates (except arrangements limited to selecting from ' +
      'employer-preselected tangible items), vacations, meals, lodging, ' +
      'tickets, and securities do NOT qualify.',
      'Limits: $400/employee/year for nonqualified awards; $1,600 aggregate ' +
      '(qualified + nonqualified) when paid under a QUALIFIED PLAN — a written, ' +
      'established program that does not discriminate in favor of highly ' +
      'compensated employees and whose average award cost does not exceed $400.',
      'Length-of-service timing rules (§274(j)(4)(B)): no award within the ' +
      'employee\'s first 5 years, and not more often than every 5 years for ' +
      'the same employee.',
      'Safety-achievement limits (§274(j)(4)(C)): fails if awarded to a ' +
      'manager, administrator, clerical, or other professional employee, or if ' +
      'more than 10% of eligible employees receive safety awards in the year.',
      'Employment-tax alignment: amounts excludable under §74(c) are also ' +
      'excluded from FICA wages (§3121(a)(20)) — the exclusion is complete, ' +
      'not just income-tax.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §274(j)', note: 'Employer deduction limits: $400 nonqualified / $1,600 qualified-plan; definition of employee achievement award and qualified plan; the (j)(3)(A)(ii) tangible-property rule excluding cash, gift cards, vacations, tickets, securities.' },
      { type: 'IRC', cite: 'IRC §74(c)', note: 'Employee-side exclusion from gross income, tied to the employer\'s §274(j) deduction limits; excess over the deductible amount is taxable.' },
      { type: 'IRC', cite: 'IRC §274(j)(4)', note: 'Length-of-service (5-year minimum, once per 5 years) and safety-achievement (no managers/professionals; 10% of eligible employees) qualification rules.' },
      { type: 'IRC', cite: 'IRC §3121(a)(20)', note: 'FICA wage exclusion for benefits reasonably believed excludable under §74(c) — completes the payroll-tax-free result.' }
    ],
    requirements: [
      'Tangible personal property only — a watch, tool set, plaque-plus-item; never cash, gift cards, or points redeemable broadly.',
      'A genuine length-of-service or safety-achievement occasion meeting the §274(j)(4) timing/eligibility rules.',
      'A meaningful presentation (recognition event, all-hands announcement) — not an item dropped in a paycheck envelope.',
      'For the $1,600 limit: a written qualified plan with nondiscriminatory eligibility and an average award cost of $400 or less.'
    ],
    risks: [
      'Gift cards are the classic failure: they are cash equivalents, fully taxable W-2 wages, and reclassification in a payroll exam brings back-taxes and penalties across every recipient.',
      'Awards exceeding the deductible limit make the EXCESS taxable to the employee (§74(c)(2)) — the clean design stays inside the caps.',
      'Length-of-service awards inside the first 5 years, or more often than every 5 years, fail entirely.',
      '"Safety awards" to owners, managers, or office staff fail by statute — this prong is for the field workforce.',
      'The dollars are modest — position this as compensation hygiene and retention structure, not a headline tax play.'
    ],
    bestFit: [
      'Businesses with 5+ employees and meaningful tenure milestones to recognize.',
      'Field, trade, and manufacturing workforces where safety programs are genuine.',
      'Employers already spending on holiday gifts or bonuses who can redirect part of it into the tax-free channel.'
    ],
    implementation: [
      'Adopt a written achievement-award plan: eligibility, service milestones (5/10/15 years), safety criteria, award catalog, and dollar limits.',
      'Keep eligibility broad — the qualified plan fails if it favors highly compensated employees.',
      'Build the award catalog from tangible items (average cost ≤ $400 to protect the qualified plan).',
      'Present awards at a real recognition moment; document date, recipient, milestone, and item cost.',
      'Coordinate with payroll so qualifying awards stay OFF the W-2 — and non-qualifying gifts (any cash/gift cards) go ON it.',
      'Review the program annually against the 5-year and 10% limits.'
    ]
  },

  client: {
    teaser: 'A way to reward loyal employees where nobody owes tax on the reward',
    headline: 'Recognize your team — tax-free for them, deductible for you',
    plainEnglish: [
      'Almost anything you give an employee is taxable to them — bonuses, gift cards, even a turkey certificate. There is one carve-out the tax law still allows: real, physical gifts given to recognize years of service or safety milestones. Done right, the business deducts the cost, and the employee owes nothing. Not even payroll tax.',
      'The rules are picky but easy to follow once set up. The gift must be an actual item — a watch, quality tools, equipment they would love — never cash or a gift card. It has to mark a real milestone, like five or ten years with you. And it should be presented properly, at a team lunch or company meeting, not slipped into a paycheck.',
      'With a simple written plan, you can give each honoree up to $1,600 of value this way. Compare that to a bonus, where a $1,600 gesture costs you payroll taxes and leaves the employee with maybe $1,100 after withholding. Same generosity, better math, and honestly — a watch presented in front of the team beats a line on a paystub.'
    ],
    analogy: 'It\'s the difference between a gold watch presented at the company dinner and the same amount tucked into a paycheck — one is a moment nobody taxes, the other is just more taxable pay.',
    benefits: [
      'Fully deductible to the business',
      'Completely tax-free to the employee — no income tax, no payroll tax',
      'Up to $1,600 per honoree with a simple written plan',
      'Builds the kind of recognition program that keeps good people'
    ],
    steps: [
      'We set up the written award plan and milestone schedule',
      'We help you pick a catalog of qualifying gifts',
      'You present the awards at real recognition moments',
      'We make sure payroll treats everything correctly'
    ],
    considerations: [
      'Cash and gift cards never qualify — they are taxable pay no matter the occasion. The gift must be a real item.',
      'Awards have to mark genuine milestones — service anniversaries of five years or more, or real safety achievements.',
      'The per-person dollar limits are firm; we design the program to stay inside them.'
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
