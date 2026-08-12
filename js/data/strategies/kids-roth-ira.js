/* ============================================================================
 * STRATEGY: Roth IRA Funded by Kids' Earned Income
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'kids-roth-ira',
  name: 'Roth IRA Funded by Kids\' Earned Income',
  category: 'Payroll & Family',
  applyOrder: 36,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A child with earned income can contribute to a Roth IRA up to the ' +
      'lesser of compensation or the annual limit — $7,500 for 2026. There ' +
      'is no minimum age in §408A; the constraint is compensation, which the ' +
      'family payroll strategy supplies. Because the child\'s wages are ' +
      'already income-tax-free under the standard deduction, the Roth costs ' +
      'nothing in foregone deduction, and qualified distributions are ' +
      'tax-free after five years and age 59½ — a 50-plus-year tax-free ' +
      'compounding runway. The contribution CASH need not be the wage ' +
      'dollars themselves: a parent may gift the contribution amount (well ' +
      'inside the $19,000 annual gift exclusion) while the child\'s wages ' +
      'are spent or saved elsewhere — the law only requires that the child ' +
      'HAVE compensation at least equal to the contribution. Held as a ' +
      'custodial (guardian) Roth IRA until majority.',
    mechanics: [
      'Contribution limit: lesser of the child\'s includible compensation ' +
      'or $7,500 (2026). W-2 wages from the family business are ' +
      'compensation; the FICA exemption for under-18 children does not ' +
      'change that.',
      'No age floor: §408A imposes none. Brokerages require a custodial ' +
      '(UTMA-style guardian) Roth IRA for minors — parent as custodian, ' +
      'control passing at state majority age.',
      'Funding source flexibility: the statute tests compensation, not ' +
      'traceable dollars. A parent can gift $7,500 in cash for the ' +
      'contribution (within the §2503(b) $19,000 annual exclusion) while ' +
      'the child keeps their actual paycheck.',
      'Tax profile: contributions are after-tax, but at a 0% bracket that ' +
      'costs nothing; qualified distributions (5-year clock + age 59½) are ' +
      'wholly tax-free under §408A(d). Contributions (basis) remain ' +
      'withdrawable tax- and penalty-free at any time.',
      'The Roth wrapper also solves the kiddie-tax problem: growth inside ' +
      'the IRA is never current-year unearned income (see the Kiddie Tax ' +
      'Planning strategy).',
      'Income phase-outs on Roth contributions are the CHILD\'s MAGI, which ' +
      'is trivially low — never a practical constraint here.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408A', note: 'Roth IRA rules — no minimum age; contribution limited to compensation; qualified distributions excluded from income.' },
      { type: 'IRC', cite: 'IRC §219(b)(1)', note: 'Contribution ceiling incorporated for Roths via §408A(c)(2) — lesser of the dollar limit ($7,500 for 2026) or compensation.' },
      { type: 'IRC', cite: 'IRC §408A(d)(2)', note: 'Qualified distribution definition — the 5-taxable-year clock plus age 59½ (or death/disability/first home) for fully tax-free withdrawal.' },
      { type: 'IRC', cite: 'IRC §2503(b)', note: 'Annual gift exclusion ($19,000 for 2026) — a parent gifting the contribution cash has no gift tax consequence.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 IRA limit: $7,500 (catch-up $1,100, not relevant to minors).' }
    ],
    requirements: [
      'The child has bona fide earned income at least equal to the contribution — the family payroll documentation carries this.',
      'A custodial Roth IRA opened with a provider that accepts minor accounts (parent/guardian as custodian).',
      'Contribution made by the return due date (April 15 following the tax year) and tracked against the child\'s actual compensation.',
      'Recognition that the account becomes the child\'s outright at the state age of majority.'
    ],
    risks: [
      'Contributions exceeding the child\'s actual compensation are excess contributions — 6% excise per year under §4973 until corrected. Reconcile to the W-2 every year.',
      'If the underlying wages fail exam (not bona fide), the compensation supporting the Roth fails with them — the payroll substance is the foundation.',
      'Control transfers at majority: an 18-to-21-year-old can drain the account (tax and penalty apply to earnings, not basis). Family governance, not tax law, is the mitigation.',
      'Retirement accounts owned by the student are treated favorably in federal aid formulas, but withdrawals during college count as income — sequence around FAFSA years if funds will be tapped.'
    ],
    bestFit: [
      'Every family running the kids-on-payroll strategy — this is the default destination for the first $7,500 of each child\'s wages.',
      'Parents who want to seed the contribution by gift while the child keeps spending money.',
      'Long-horizon families: the value is the 50-year runway, not a current deduction.'
    ],
    implementation: [
      'Confirm the child\'s W-2 wages for the year (Hiring Children strategy) — the contribution ceiling is the lesser of wages or $7,500.',
      'Open a custodial Roth IRA (parent as custodian) with a provider that supports minors.',
      'Fund by the April 15 deadline — from the child\'s account or a parent gift; keep the gift within the annual exclusion (automatic at these amounts).',
      'Invest for the horizon (broad equity funds typical at 50 years out).',
      'Log the contribution against the W-2 in the client\'s permanent file annually; repeat every year the child has wages.'
    ]
  },

  client: {
    teaser: 'A modest annual move today that can quietly become a seven-figure tax-free asset',
    headline: 'Turn your kids\' paychecks into a lifetime of tax-free growth',
    plainEnglish: [
      'Once your child earns real wages — for example, from working in the family business — they qualify for one of the best deals in the tax code: a Roth IRA. They can put in up to $7,500 a year (2026), or their total wages if less. The money grows for decades, and when it comes out in retirement, every dollar — all the growth included — is completely tax-free.',
      'It gets better. Your child does not have to give up their paycheck to do this. The rule only requires that they EARNED at least as much as goes in. So your child can keep their wages, and you can gift them the money for the contribution. Same result, and the gift is far below any gift-tax concern.',
      'Time is what makes this extraordinary. Money invested at 12 or 15 has half a century to compound. A few years of contributions in the early teens, left alone, can grow into a very large tax-free nest egg by retirement — started with wages that were barely taxed at all.'
    ],
    analogy: 'Planting a tree at your child\'s age versus yours is the whole difference — same seed, same soil, but theirs gets fifty growing seasons head to head with your fifteen.',
    benefits: [
      'Up to $7,500 a year (2026) per working child',
      'All growth is 100% tax-free in retirement — potentially 50+ years of it',
      'You can gift the contribution money; the child keeps their paycheck',
      'The original contributions stay accessible if truly needed'
    ],
    steps: [
      'We confirm your child\'s wages for the year set the contribution limit',
      'We help you open a custodial Roth IRA with the right provider',
      'Fund it any time up to the April tax deadline',
      'We track it against the W-2 each year and repeat'
    ],
    considerations: [
      'The account legally becomes your child\'s to control when they reach adulthood — worth knowing as balances grow.',
      'This works only as long as the underlying wages are real and documented; the payroll strategy comes first.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The Roth grows on the child\'s side; the parents\' wage deduction is modeled by the Hiring Children strategy.']
      : [] };
  }
});
