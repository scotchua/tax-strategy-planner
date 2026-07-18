/* ============================================================================
 * STRATEGY: OBBBA "Trump Account" Employer-Contribution Fringe
 * Advisory-only: a new, narrow fringe benefit whose value depends on the
 * employer adopting a formal contribution program — not a return-line item.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'trump-accounts-employer-contribution',
  name: 'Trump Account Employer Contributions',
  category: 'Payroll & Family',
  applyOrder: 60,
  modeled: false,

  advisor: {
    summary:
      'OBBBA (P.L. 119-21) created "Trump accounts" (new IRC §530A) — a tax-' +
      'advantaged account an employer can establish for the benefit of an ' +
      'employee\'s (or the employee\'s dependent\'s) child under a written ' +
      '"Trump account contribution program." An employer may contribute up ' +
      'to $2,500 per employee, per calendar year (indexed after 2027), ' +
      'excluded from the employee\'s gross income — Treasury/IRS confirmed ' +
      'in Notice 2025-68 (issued 12/2/2025) that the $2,500 cap is PER ' +
      'EMPLOYEE in the aggregate, not per child, so an employee with several ' +
      'eligible children still only unlocks one $2,500 employer-exclusion ' +
      'bucket. The account itself is a federal pilot program (new IRC §6434) ' +
      'seeding $1,000 for children born 2025–2028, with a total annual ' +
      'contribution cap (all sources combined — family, employer, other) of ' +
      '$5,000; the employer contribution counts against that same $5,000 cap.',
    mechanics: [
      'Employer contribution program: must be a separate written plan for the ' +
      'exclusive benefit of employees (or their dependents\' Trump accounts), ' +
      'meeting nondiscrimination, eligibility, notification, and statement ' +
      'requirements modeled on the existing §129 dependent care assistance ' +
      'program framework.',
      '$2,500/year exclusion is PER EMPLOYEE, aggregated across however many ' +
      'eligible children that employee has — not a separate $2,500 for each child.',
      'The $2,500 employer exclusion counts against the account\'s overall ' +
      '$5,000/year total contribution cap from ALL sources (family gifts, ' +
      'the employer, and any other contributor) — an employer contribution ' +
      'crowds out room for other contributions in the same year.',
      '$1,000 federal pilot seed (§6434) applies only to eligible children ' +
      'born in calendar years 2025 through 2028 — this is separate from, and ' +
      'does not reduce, the annual $5,000 contribution capacity.',
      'Requires the EMPLOYER to actually adopt a formal contribution program ' +
      '— an individual employee cannot simply direct payroll deductions into ' +
      'a Trump account and call it an employer contribution.',
      'Interacts with other family gifting: contributions from parents/' +
      'grandparents into the same account share the same $5,000/year total ' +
      'cap, so employer, family, and any other contributions must be ' +
      'coordinated to avoid an excess contribution.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §530A (OBBBA, P.L. 119-21)', note: 'Establishes Trump accounts as a new tax-advantaged account type for children under 18 with a Social Security number.' },
      { type: 'IRC', cite: 'IRC §6434 (OBBBA, P.L. 119-21)', note: 'Federal pilot program: $1,000 government seed contribution for eligible children born 2025-2028.' },
      { type: 'Admin', cite: 'Notice 2025-68 (Dec. 2, 2025)', note: 'Initial IRS guidance: confirms the $2,500 employer contribution exclusion is PER EMPLOYEE (not per dependent/child), and previews forthcoming regulations on the contribution-program requirements.' },
      { type: 'IRC', cite: 'IRC §129', note: 'Dependent care assistance program framework the Trump account employer-program eligibility/nondiscrimination/notice rules are modeled on.' }
    ],
    requirements: [
      'The EMPLOYER must adopt a formal, written Trump account contribution program meeting the nondiscrimination and notice requirements — an ad hoc or informal contribution does not qualify for the exclusion.',
      'The child beneficiary must be under 18 with a valid Social Security number.',
      'Total contributions to the account from ALL sources in a year (family, employer, other) must stay within the $5,000 annual cap.',
      'Coordination with any family (parent/grandparent) contributions planned for the same account and year, to avoid inadvertently exceeding the $5,000 cap once the employer contribution is added.'
    ],
    risks: [
      'This is brand-new law with only initial IRS guidance (Notice 2025-68) as of this writing — final regulations may refine program-design requirements; treat implementation details as provisional.',
      'Employers must actually set up a compliant written program before any contribution qualifies for the income exclusion — there is real administrative lift here, not a simple payroll code.',
      'Family and employer contributions can easily blow past the $5,000/year aggregate cap if not coordinated — track all contributors to the same account.',
      'The $1,000 pilot seed is birth-year-limited (2025-2028 only) — do not assume it applies to older or younger children.'
    ],
    bestFit: [
      'Employers wanting to add a modest, tax-advantaged family benefit alongside more traditional fringe benefits.',
      'Employees with young children (especially those born 2025-2028, eligible for the pilot seed) whose employer is willing to adopt a contribution program.',
      'Families already planning to contribute to a Trump account who want to coordinate employer contributions into the same $5,000 annual capacity rather than exceed it.'
    ],
    implementation: [
      'Confirm the employer is willing to adopt a written Trump account contribution program meeting the (forthcoming, Notice 2025-68-previewed) nondiscrimination and notice requirements.',
      'Verify each eligible employee\'s children (Social Security number, under 18) and whether any were born 2025-2028 for the pilot seed.',
      'Coordinate the employer\'s $2,500/employee contribution against any family contributions planned for the same account and year to stay under the $5,000 aggregate cap.',
      'Monitor for final Treasury regulations, which may add detail beyond Notice 2025-68\'s initial guidance.',
      'Document the program in the employer\'s benefits materials and deliver required employee notices.'
    ]
  },

  client: {
    teaser: 'A new employer benefit that can seed a tax-advantaged account for your child',
    headline: 'A new kind of employer benefit for your kids\' financial future',
    plainEnglish: [
      'A brand-new type of savings account for children was created by recent federal law, and employers now have the option to contribute to it on an employee\'s behalf — up to $2,500 a year, tax-free to you, if your employer sets up the right kind of program.',
      'That $2,500 limit applies to you as an employee overall, not per child, so it does not multiply if you have more than one eligible kid. It also shares space with an overall yearly limit on how much can go into the account from all sources combined — your employer, you, grandparents, anyone — so contributions need to be coordinated rather than stacked on top of each other without a plan.',
      'If your child was born between 2025 and 2028, the government also seeds the account with an initial $1,000 automatically — a separate, one-time boost on top of whatever else goes in each year.'
    ],
    analogy: 'Think of the account like a bucket with a yearly fill line — your employer, you, and any other family member can all pour something in, but once the bucket hits its yearly line, nothing more fits until next year.',
    benefits: [
      'Up to $2,500 a year from your employer, tax-free to you',
      'A possible extra $1,000 government seed if your child was born 2025-2028',
      'One more tool for building your child\'s financial head start',
      'Coordinated properly, it stacks smoothly with family contributions to the same account'
    ],
    steps: [
      'We check whether your employer is willing to set up this type of program',
      'We confirm which of your children are eligible and whether the pilot seed applies',
      'We coordinate any family contributions so the account never exceeds its yearly limit',
      'We keep an eye on new federal guidance as this brand-new benefit gets finalized'
    ],
    considerations: [
      'This is very new — the government has only released initial guidance so far, and further details may still be refined.',
      'Your employer has to formally set up a qualifying program; you cannot simply direct extra pay into the account yourself and call it an employer contribution.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
        'Requires the EMPLOYER to adopt a formal Trump account contribution program; the $2,500 ' +
        'exclusion is per employee (not per child) and counts against the account\'s overall ' +
        '$5,000/year cap from all contributors combined. Based on initial guidance (Notice ' +
        '2025-68) — revisit as final regulations are issued.']
      : [] };
  }
});
