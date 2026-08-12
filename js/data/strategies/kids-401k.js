/* ============================================================================
 * STRATEGY: 401(k) Contributions for Working Children
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'kids-401k',
  name: '401(k) Contributions for Working Children',
  category: 'Payroll & Family',
  applyOrder: 35,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A child legitimately employed by the family business is an employee, ' +
      'and if the company\'s 401(k) eligibility terms cover them, they can ' +
      'make elective deferrals up to the full §402(g) limit — $24,500 for ' +
      '2026 (Notice 2025-67) — capped at their actual compensation. At a ' +
      'child\'s effective 0% bracket (wages under the $16,100 standard ' +
      'deduction), a pre-tax deferral deducts against income that was never ' +
      'going to be taxed, so Roth deferrals under §402A are almost always ' +
      'the right election: no deduction given up, and five-plus decades of ' +
      'tax-free compounding. The gating question is plan eligibility — ' +
      '§410(a) only caps how RESTRICTIVE a plan may be (age 21, one year of ' +
      'service); a plan must affirmatively be written (or amended) to let ' +
      'younger, part-time family employees in, and whatever terms admit the ' +
      'owner\'s children admit similarly situated other employees too. This ' +
      'is advisory: the child\'s deferral does not change the parents\' ' +
      'return, so there is nothing to model in the parents\' scenario.',
    mechanics: [
      'Eligibility: §410(a)(1) sets the MAXIMUM conditions a plan may impose ' +
      '(age 21 and one year of service) — plans are free to be more liberal. ' +
      'A solo-401(k) or small plan can be drafted with immediate eligibility, ' +
      'which is what lets a 14-year-old participate.',
      'Deferral limit: §402(g) — $24,500 for 2026 — but never more than ' +
      'actual compensation. A child earning $16,100 can defer all $16,100.',
      'Roth vs. pre-tax: with wages fully sheltered by the standard ' +
      'deduction, a traditional deferral produces no current tax benefit; ' +
      'a §402A Roth deferral costs the same $0 today and exits tax-free. ' +
      'Roth is the default recommendation at a 0% bracket.',
      'Employer contributions are also possible — profit-sharing on the ' +
      'child\'s comp within the §415(c) annual-additions limit ($72,000 for ' +
      '2026) — but nondiscrimination and coverage rules apply across all ' +
      'eligible employees.',
      'Coverage spillover is the real design constraint: eligibility terms ' +
      'generous enough to admit the owner\'s children apply to every ' +
      'employee meeting them. In a family-only business this is free; with ' +
      'outside staff it has a cost that must be priced.',
      'Time horizon is the payoff: deferrals made at 15 compound roughly ' +
      '50 years before retirement age — at 7%, a single $16,000 Roth ' +
      'contribution is on the order of $470,000 tax-free.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §402(g)', note: 'Elective deferral limit — $24,500 for 2026 — applies per individual, capped at compensation.' },
      { type: 'IRC', cite: 'IRC §402A', note: 'Designated Roth deferrals — the optimal election at a child\'s 0% bracket.' },
      { type: 'IRC', cite: 'IRC §410(a)(1)', note: 'Statutory ceiling on eligibility conditions (age 21 / 1 year of service); plans may be MORE liberal — the plan document controls whether a minor can participate.' },
      { type: 'IRC', cite: 'IRC §415(c)', note: 'Annual additions limit ($72,000 for 2026) governing combined deferrals plus employer contributions.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 retirement plan COLAs: $24,500 elective deferral, $72,000 annual additions.' },
      { type: 'IRC', cite: 'IRC §401(a)(4)', note: 'Nondiscrimination — employer contributions favoring the owner\'s children must pass testing when there are other eligible employees.' }
    ],
    requirements: [
      'The child is a bona fide W-2 employee with real wages (see the Hiring Children strategy — deferrals require compensation).',
      'Plan document terms that make the child eligible — check age/service conditions and amend if needed.',
      'A deferral election executed BEFORE the compensation is earned, signed by the participant (and parent/guardian where the provider requires it).',
      'If the business has non-family employees, coverage and nondiscrimination testing that tolerates the liberalized eligibility.'
    ],
    risks: [
      'Deferrals without real compensation collapse with the wage strategy itself — the payroll must be defensible first.',
      'Liberal eligibility written to admit the kids also admits part-time outside staff, with real matching/testing cost — price it before amending.',
      'Custodians vary on minor participants; some require guardian signatures or refuse minors — confirm provider mechanics early.',
      'Pre-tax deferrals at a 0% bracket waste the deduction and build future taxable income — an unforced error; elect Roth.',
      'Money in the plan is the child\'s, subject to distribution restrictions — this is retirement money, not a college fund.'
    ],
    bestFit: [
      'Family businesses already running the kids-on-payroll strategy with wages above the Roth IRA limit — the 401(k) adds deferral room beyond $7,500.',
      'Solo/family-only plans where liberal eligibility has no spillover cost.',
      'Parents focused on multi-decade wealth transfer at zero tax cost.'
    ],
    implementation: [
      'Verify the child\'s employment and wage level are established and documented.',
      'Review the plan\'s eligibility provisions; amend age/service conditions if needed (coordinate with the TPA/provider).',
      'Have the child execute a Roth deferral election before year-start (or before the next payroll once eligible).',
      'Set payroll to withhold the deferral each pay period; report in W-2 Box 12 (code AA for Roth).',
      'Coordinate with the Roth IRA strategy — the 401(k) deferral does not reduce IRA eligibility; both can be funded from the same wages.',
      'Revisit the election annually as the child\'s wages and the COLA limits change.'
    ]
  },

  client: {
    teaser: 'Gives a head start most people never get — measured in decades, not dollars',
    headline: 'A retirement account for your working kids — started 40 years early',
    plainEnglish: [
      'Once your child is legitimately working for the family business and earning a paycheck, they are an employee — and if the company retirement plan allows it, they can contribute to the 401(k) just like any other worker. In 2026 the law allows contributions up to $24,500, though a child can never put in more than they actually earned.',
      'Here is the powerful part: a child earning under $16,100 pays no income tax anyway. So the smart move is usually the Roth version of the 401(k) — they give up nothing today, and every dollar grows completely tax-free for the rest of their life.',
      'The head start is hard to overstate. Money invested at 15 has about 50 years to grow before retirement. A single year of contributions at that age can become hundreds of thousands of tax-free dollars — from wages that were barely taxed in the first place.'
    ],
    analogy: 'Compound growth is a snowball rolling downhill. Most people start pushing at 35. This starts your child\'s snowball at 15 — same hill, forty extra years of rolling.',
    benefits: [
      'Contributions of up to $24,500 a year (2026), limited only by what they earn',
      'The Roth option means the money is never taxed again — at all',
      'Roughly 50 years of compounding before retirement',
      'Teaches saving habits with real, visible money'
    ],
    steps: [
      'We confirm the plan\'s rules let your child join — and update them if needed',
      'Your child signs a simple contribution election',
      'Payroll routes part of each paycheck into their account automatically',
      'We review the amount each year as wages and limits change'
    ],
    considerations: [
      'This is genuinely retirement money — early withdrawals face restrictions and penalties, so we size contributions to what the family will not need.',
      'If the business has non-family employees, opening the plan to young workers applies to them too — we check that cost first.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The deferral happens on the child\'s side; the parents\' wage deduction is modeled by the Hiring Children strategy.']
      : [] };
  }
});
