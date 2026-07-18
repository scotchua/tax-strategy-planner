/* ============================================================================
 * STRATEGY: Kiddie Tax Planning Around Child Wages
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'kiddie-tax-planning',
  name: 'Kiddie Tax Planning Around Child Wages',
  category: 'Payroll & Family',
  applyOrder: 34,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'The kiddie tax under §1(g) taxes a child\'s net UNEARNED income above ' +
      '$2,700 (2026) at the parents\' marginal rates, neutralizing naive ' +
      'income-shifting through gifts of investment assets. It never touches ' +
      'EARNED income: wages from the family business are taxed at the ' +
      'child\'s own rates and sheltered by the child\'s standard deduction. ' +
      'The planning discipline is therefore about what happens to the wages ' +
      'AFTER they are paid — dollars parked in a taxable custodial account ' +
      'generate interest and dividends that ARE unearned and will hit the ' +
      'parents\' rates once they exceed the threshold. Sequencing wages into ' +
      'a Roth IRA, a 401(k), or a 529 keeps the growth from ever becoming ' +
      'kiddie-taxable. This is a guardrail strategy for families running the ' +
      'Hiring Children playbook, not a standalone deduction.',
    mechanics: [
      '§1(g) applies to children under 18 — and to 18-year-olds, and to ' +
      'full-time students 19–23, whose earned income does not exceed half ' +
      'their support. Note the flip side: substantial wages can push a ' +
      '19–23-year-old student OUT of kiddie-tax scope entirely.',
      'Net unearned income = unearned income minus $1,350, minus another ' +
      '$1,350 (or the child\'s investment-expense deductions) — in effect, ' +
      'unearned income above $2,700 (2026) is taxed at the parents\' rates ' +
      'on Form 8615.',
      'Earned income (wages, including wages from a parent\'s business) is ' +
      'never subject to §1(g) and independently enlarges the child\'s ' +
      'standard deduction under §63(c)(5)(B) — earned income plus an ' +
      'inflation-adjusted add-on, up to the full $16,100 (2026).',
      'The trap: wages accumulate in a taxable UTMA/custodial brokerage, ' +
      'and within a few years the account throws off more than $2,700 of ' +
      'dividends and interest — now taxed at the parents\' 32–37%.',
      'The sequence that avoids it: wages → Roth IRA (up to the $7,500 2026 ' +
      'limit, growth never taxable), then 401(k) deferrals if the plan ' +
      'permits, then 529 funding (growth tax-free for education) — leaving ' +
      'little or nothing compounding in taxable accounts.',
      'Where a taxable account is unavoidable, favor assets that defer or ' +
      'minimize current yield (growth equities, index funds with low ' +
      'distributions) and harvest gains deliberately in years the child is ' +
      'outside kiddie-tax scope.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1(g)', note: 'The kiddie tax: net unearned income of a covered child taxed at the parents\' marginal rates.' },
      { type: 'IRC', cite: 'IRC §1(g)(4)', note: 'Definition of net unearned income — the mechanical $2,700 (2026) threshold arises from the two $1,350 layers.' },
      { type: 'IRC', cite: 'IRC §1(g)(2)(A)', note: 'Covered children: under 18, plus 18-year-olds and full-time students 19–23 whose earned income is not more than half their support.' },
      { type: 'IRC', cite: 'IRC §63(c)(5)(B)', note: 'Dependent standard deduction tracks earned income plus an add-on — why wages are doubly protected.' },
      { type: 'Admin', cite: 'Form 8615', note: 'Tax for Certain Children Who Have Unearned Income — the computation attaches to the child\'s return.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32', note: '2026 inflation adjustments, including the kiddie-tax unearned income layers.' }
    ],
    requirements: [
      'A child with earned income from the family business (or elsewhere) and actual or planned investment assets.',
      'Titling discipline: know which accounts are the child\'s (UTMA, custodial Roth, 529) and what income each produces.',
      'Annual monitoring of the child\'s unearned income against the $2,700 threshold.',
      'Coordination with the Hiring Children, Kids\' Roth IRA, and Kids\' 401(k) strategies — this strategy sequences those dollars.'
    ],
    risks: [
      'Ignoring the trap: several years of wages accumulating in a taxable custodial account will eventually generate kiddie-taxable yield at the parents\' top rate.',
      'UTMA assets are irrevocably the child\'s — money moved there for tax reasons cannot be reclaimed, and large UTMA balances hurt financial aid more than parent-owned 529s.',
      'The kiddie tax follows students to age 23 — a "we\'re done at 18" assumption produces surprise Form 8615 filings in college years.',
      'Selling appreciated custodial positions to rebalance can itself trigger kiddie-taxable gains; plan dispositions around the child\'s covered years.'
    ],
    bestFit: [
      'Families paying children through the business who want the earnings invested, not spent.',
      'High-bracket parents (32%+) where the parent-rate override is most expensive.',
      'Families with existing UTMA accounts that need a yield audit before the threshold is breached.'
    ],
    implementation: [
      'Inventory every account in each child\'s name and project its current-year interest, dividends, and expected gains.',
      'Route new wages by priority: custodial Roth IRA first (up to earned income or $7,500 for 2026), then plan deferrals if available, then 529.',
      'Keep taxable custodial holdings in low-distribution assets; set distributions to reinvest only where yield stays safely under $2,700.',
      'For students 19–23, test the earned-income-vs-support condition each year — wages may remove them from §1(g) scope.',
      'Prepare Form 8615 with the child\'s return in any year the threshold is exceeded rather than discovering it on notice.'
    ]
  },

  client: {
    teaser: 'Keeps a little-known family tax trap from quietly clawing back your planning wins',
    headline: 'Keep your kids\' money taxed at their rates — not yours',
    plainEnglish: [
      'There is a rule nicknamed the "kiddie tax" designed to stop parents from dodging tax by putting investments in their children\'s names. When a child\'s investment income — interest, dividends, gains — goes over $2,700 in a year (2026), the excess gets taxed at the parents\' rates instead of the child\'s. For a high-earning family, that can mean over a third of the income going to tax.',
      'Here is the good news: money your child EARNS by working — like wages from the family business — is never touched by this rule. Wages are always taxed at the child\'s own low rates. The trap only springs on investment income.',
      'So the strategy is about where the wages go next. If they pile up in a regular investment account, that account will eventually produce enough interest and dividends to trip the rule. If they go into a Roth IRA, a retirement plan, or a college savings account instead, the growth is never taxed at your rates — often never taxed at all. We map that route for each child.'
    ],
    analogy: 'Think of your child\'s wages as water and the accounts as buckets. Some buckets quietly leak tax back at your rates as they fill; others are sealed. We just make sure the water goes into the sealed buckets first.',
    benefits: [
      'Your kids\' earnings stay taxed at their low rates — or grow tax-free entirely',
      'Avoids surprise tax bills at your top rate on their investment accounts',
      'Turns the family payroll strategy into decades of protected compounding',
      'Simple annual check — no new filings unless a threshold is crossed'
    ],
    steps: [
      'We review every account in your kids\' names and what income it produces',
      'We set the order: Roth IRA first, then retirement plan, then college fund',
      'We keep any leftover investments in low-tax holdings',
      'We re-check the numbers each year as balances grow'
    ],
    considerations: [
      'Money placed in a child\'s custodial account legally belongs to the child — permanently — so we choose account types carefully.',
      'This rule can follow full-time students up to age 23, so the planning does not stop at 18.'
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
