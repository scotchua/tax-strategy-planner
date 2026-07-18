/* ============================================================================
 * STRATEGY: Dependent Care FSA
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'dependent-care-fsa',
  name: 'Dependent Care FSA',
  category: 'Health & Fringe',
  applyOrder: 77,
  modeled: true,

  advisor: {
    summary:
      'A §129 dependent care assistance program funded through a §125 ' +
      'cafeteria plan lets an employee pay child/dependent care with pre-tax ' +
      'salary reductions — excluded from income AND from FICA wages. OBBBA ' +
      'raised the exclusion to $7,500 ($3,750 MFS) effective 2026, the first ' +
      'increase since 1986 outside the temporary 2021 ARPA bump. The exclusion ' +
      'requires earned income of both spouses (or one full-time student/ ' +
      'incapacitated spouse), care that enables gainful employment for a ' +
      'qualifying individual (child under 13 or incapable dependent/spouse), ' +
      'and coordination with the §21 credit — dollars excluded under §129 ' +
      'reduce the §21 expense base, so for most clients above the lowest ' +
      'brackets the FSA beats the 20% credit. Business owners can sponsor a ' +
      'DCAP, but §129(d) nondiscrimination testing — including the 25% ' +
      'shareholder-concentration limit — constrains how much owners can take ' +
      'through their own plan.',
    mechanics: [
      'Employee elects up to $7,500 (2026) of salary reduction; amounts are ' +
      'excluded from Box 1 wages and from Social Security/Medicare wages — ' +
      'the FICA layer is what a simple deduction would miss.',
      'Qualifying expenses mirror §21: care for a child under 13 or a ' +
      'spouse/dependent incapable of self-care, incurred to enable the ' +
      'taxpayer (and spouse) to work — daycare, preschool, before/after ' +
      'school care, day camps. Overnight camps and K-12 tuition do not count.',
      'Exclusion is capped at the LOWER of the limit or either spouse\'s ' +
      'earned income; both spouses must work (or one be a full-time student ' +
      'or incapable of self-care).',
      '§21 coordination: excluded DCAP dollars reduce the §21 credit expense ' +
      'cap dollar-for-dollar ($3,000 one child / $6,000 two+). A $7,500 ' +
      'exclusion fully displaces the credit for one child and leaves nothing ' +
      'of the two-child cap — run the comparison, but above ~22% marginal ' +
      'rates the exclusion (income tax + FICA) beats the 20% credit.',
      'Use-it-or-lose-it: unspent balances forfeit (limited grace period if ' +
      'the plan adopts one). Election is fixed for the year absent a ' +
      'qualifying status change.',
      'Owner sponsorship: §129(d)(4) limits benefits for >5% owners (and ' +
      'spouses/dependents) to 25% of total DCAP benefits, and eligibility/ ' +
      'benefits tests apply — a solo owner with no participating employees ' +
      'generally cannot concentrate the benefit on themselves.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §129', note: 'Dependent care assistance exclusion — $7,500 limit for 2026 (raised by OBBBA, P.L. 119-21); earned-income caps; nondiscrimination rules in §129(d).' },
      { type: 'IRC', cite: 'IRC §125', note: 'Cafeteria plan salary-reduction mechanism; irrevocable annual elections absent status changes.' },
      { type: 'IRC', cite: 'IRC §21', note: 'Child and dependent care credit — expense base reduced by §129 exclusions; the comparison every client needs run.' },
      { type: 'IRC', cite: 'IRC §129(d)(4)', note: '25% concentration limit: no more than 25% of DCAP benefits may go to >5% owners, their spouses, and dependents.' },
      { type: 'IRC', cite: 'IRC §3121(a)(18)', note: 'FICA wage exclusion for §129 benefits — the payroll-tax savings layer.' },
      { type: 'Admin', cite: 'Form 2441 and instructions', note: 'Reporting of DCAP benefits and the §21 coordination; provider name/EIN substantiation.' }
    ],
    requirements: [
      'Employer-sponsored §125 cafeteria plan with a DCAP feature (W-2 employees) — election made before the plan year.',
      'Qualifying individual: child under 13, or spouse/dependent incapable of self-care living with the taxpayer over half the year.',
      'Care enables employment: both spouses working, or one a full-time student/incapable of self-care; exclusion capped at the lower earned income.',
      'Provider identification (name, address, TIN) reported on Form 2441.',
      'For owner-sponsored plans: §129(d) testing, including the 25% owner-concentration limit.'
    ],
    risks: [
      'Forfeiture: over-electing loses real dollars — set the election from documented, predictable care costs.',
      'MFS filers are capped at $3,750; both-spouses-working requirement trips single-earner households (student/incapacity exceptions aside).',
      'Claiming both the full exclusion and the §21 credit on the same dollars — Form 2441 catches it; the credit base is reduced first.',
      'Owner-heavy plans that flunk §129(d) testing convert highly-compensated/owner benefits to taxable wages.',
      'Care paid to the taxpayer\'s own under-19 child or a claimed dependent does not qualify.'
    ],
    bestFit: [
      'Two-earner W-2 households with kids under 13 in paid care — the default answer for daycare-age families.',
      'Clients above roughly the 22% bracket, where exclusion + FICA savings clearly beats the 20% §21 credit.',
      'Business-owner clients with employees who want a low-cost, high-visibility benefit (owners take what testing allows).'
    ],
    implementation: [
      'Confirm qualifying individuals and both-spouse earned income; gather actual annual care costs.',
      'Run the §129-vs-§21 comparison on marginal rates; elect the better path (usually the FSA at $7,500 for 2026).',
      'Enroll during open enrollment; set the election no higher than predictable costs.',
      'Collect provider TIN documentation as expenses are incurred; file Form 2441 with the return.',
      'Owner-sponsored plans: adopt/amend the §125 plan for the $7,500 limit and run §129(d) tests before year-end.'
    ]
  },

  client: {
    teaser: 'Pay one of your family\'s biggest bills with money the IRS never touches',
    headline: 'Pay for childcare with pre-tax dollars',
    plainEnglish: [
      'If you pay for daycare, preschool, after-school care, or summer day camp so you can work, there is a benefit that lets you pay those bills with money taken out of your paycheck before any tax is calculated — no income tax, and no Social Security or Medicare tax either.',
      'Starting in 2026 the limit is $7,500 a year — double what it used to be. For a family in a middle or upper tax bracket, running childcare money through this account instead of paying with taxed dollars can put well over $2,000 a year back in your pocket.',
      'The one thing to get right is the election: you choose the amount once a year, and money you set aside but do not spend on care is forfeited. We set the number from your actual childcare costs so nothing is left on the table — and we compare it against the childcare tax credit to make sure this route wins for you.'
    ],
    analogy: 'It is like a toll lane for your childcare money: same destination, but it skips the tax booth on the way there.',
    benefits: [
      'Up to $7,500 of childcare paid with never-taxed dollars (new higher limit for 2026)',
      'Skips Social Security and Medicare tax too — savings a normal deduction misses',
      'Covers daycare, preschool, after-school programs, and day camps',
      'Simple payroll setup — no receipts to file with your tax return'
    ],
    steps: [
      'We total your real childcare costs for the coming year',
      'We compare this account against the childcare credit and pick the winner',
      'You enroll through payroll at your (or your company\'s) open enrollment',
      'We handle the year-end tax form that keeps everything matched up'
    ],
    considerations: [
      'Money you elect but do not spend on care is forfeited — we size the election conservatively from your actual costs.',
      'Both spouses generally need to be working (or in school full-time) for the care to qualify.',
      'If you own the business sponsoring the plan, the rules limit how much of the benefit can flow to owners — we test that before promising numbers.'
    ]
  },

  inputs: [
    { key: 'annualElection', label: 'Annual DCFSA election', type: 'currency', default: 7500, max: 7500 }
  ],

  appliesTo: function (profile) {
    return true; // needs wages; validated with a note in apply()
  },

  /**
   * Modeling approximation: the actual mechanism is a §129 WAGE EXCLUSION
   * that also avoids FICA. The engine has no pre-tax payroll hook, so the
   * election is routed to `adjustments` — this captures the income-tax
   * savings but NOT the FICA savings, making the model conservative.
   * Capped at the 2026 §129 limit from the tables and at available wages.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var fr = TSIQ.TABLES_2026.limits.fringe;
    var wages = Math.max(0, p.wages || 0) + Math.max(0, p.ownerWages || 0);
    if (wages <= 0) {
      notes.push('Dependent Care FSA requires W-2 wages (outside employer or your own entity\'s payroll) — none found in this profile. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    var election = Math.min(params.annualElection || 0, fr.dcfsaLimit, wages);
    if ((params.annualElection || 0) > fr.dcfsaLimit) {
      notes.push('Election capped at the 2026 §129 limit of ' + TSIQ.fmt.usd(fr.dcfsaLimit) + '.');
    }
    p.adjustments = (p.adjustments || 0) + election;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(election) + ' dependent care election modeled as a deduction (§129, $7,500 limit per OBBBA for 2026). Actual mechanism is a pre-tax wage exclusion that ALSO avoids FICA — model is conservative.');
      notes.push('Excluded dollars reduce the §21 dependent care credit base — do not claim both on the same expenses.');
    }
    return { profile: p, notes: notes };
  }
});
