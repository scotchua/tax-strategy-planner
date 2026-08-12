/* ============================================================================
 * STRATEGY: Accident & Health Plans for C-Corp Owner-Employees
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'accident-health-c-corp',
  name: 'Accident & Health Plans for C-Corp Owner-Employees',
  category: 'Health & Fringe',
  applyOrder: 79,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'The C-corporation is the one entity where the owner\'s family health ' +
      'coverage is a genuinely clean fringe benefit: the corporation deducts ' +
      '100% of health insurance premiums for the owner-employee\'s family ' +
      'under §162, the coverage is excluded from the owner\'s income under ' +
      '§106(a), and reimbursements of uninsured §213(d) expenses are excluded ' +
      'under §105(b) — no income tax, no FICA, no §162(l) earned-income cap, ' +
      'no Schedule A floor. This is the umbrella treatment under which the ' +
      'C-corp HRA, MERP, and related designs sit, and it is a genuine factor ' +
      'in entity choice for owners with heavy recurring family medical costs. ' +
      'The two compliance gates: self-insured reimbursement features must ' +
      'pass §105(h) nondiscrimination (insured premium-only coverage is not ' +
      'subject to §105(h)), and any reimbursement arrangement covering 2+ ' +
      'employees must clear the ACA market reforms via integration or an ' +
      'excepted/sanctioned design. Advisory-only: quantification belongs to ' +
      'the specific plan design (see the HRA for C-Corps entry).',
    mechanics: [
      'Premiums: the corporation pays or reimburses family health, dental, ' +
      'and vision premiums for the owner-employee; deductible under §162 as ' +
      'compensation expense, excluded from the owner\'s W-2 under §106(a) — ' +
      'contrast the S-corp, where §1372 pushes >2% shareholder premiums onto ' +
      'the W-2 and through the §162(l) personal deduction instead.',
      'Reimbursements: a written self-insured medical reimbursement feature ' +
      '(MERP/HRA) lets the corporation pay deductibles, copays, dental, ' +
      'vision, and other §213(d) costs, excluded under §105(b).',
      '§105(h) applies only to SELF-INSURED features: eligibility and ' +
      'benefits tests against highly compensated individuals (top-paid 25%, ' +
      '>10% shareholders, five highest-paid officers). A discriminatory plan ' +
      'taxes the HCI\'s "excess reimbursement" — it does not blow up the ' +
      'plan for other employees or the premium-only side.',
      'Fully-insured premium coverage is NOT subject to §105(h) — an insured ' +
      'plan can be owner-favorable as to premiums where employment-law and ' +
      'carrier rules allow, which is why premium-only designs are the ' +
      'low-friction starting point.',
      'ACA market reforms: a reimbursement arrangement with 2+ participants ' +
      'must be integrated with group coverage or fit a sanctioned design ' +
      '(ICHRA, excepted-benefit HRA); a one-participant plan is exempt ' +
      '(§9831(a)(2)).',
      'The FICA layer: none of this runs through wages, so it also avoids ' +
      'both halves of employment tax versus paying the owner more salary to ' +
      'cover the same costs personally.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §106(a)', note: 'Employer-provided accident/health coverage (premiums) excluded from the employee\'s income.' },
      { type: 'IRC', cite: 'IRC §105(b)', note: 'Reimbursements of §213(d) medical expenses of the employee, spouse, and dependents excluded from income.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Corporate deduction for premiums and reimbursements as ordinary compensation expense (reasonable-compensation overall).' },
      { type: 'IRC', cite: 'IRC §105(h)', note: 'Nondiscrimination for self-insured plans: eligibility and benefits tests; excess reimbursements taxable to highly compensated individuals.' },
      { type: 'Reg', cite: 'Reg. §1.105-11', note: 'The §105(h) operating rules: HCI definitions, the 70%/80% eligibility tests, benefits test, excess-reimbursement computation.' },
      { type: 'IRC', cite: 'IRC §1372', note: 'The S-corp contrast — >2% shareholders are treated as partners and lose the exclusions this strategy relies on.' },
      { type: 'Admin', cite: 'Notice 2013-54', note: 'ACA market-reform compliance framework for any reimbursement arrangement covering two or more employees.' },
      { type: 'IRC', cite: 'IRC §9831(a)(2)', note: 'Exemption from the market reforms for plans with fewer than two current-employee participants.' }
    ],
    requirements: [
      'A C-corporation with the owner as a bona fide W-2 employee performing real services for reasonable overall compensation.',
      'Written plan documents (premium payment policy; MERP/HRA document if reimbursing) adopted before benefits are paid.',
      'Self-insured features: §105(h) testing against the employee census — cover a nondiscriminatory class or accept HCI taxation of the excess.',
      'ACA compliance path for any 2+-participant reimbursement feature (integration, ICHRA, excepted-benefit, or the one-participant exemption).',
      'Substantiation of every reimbursed expense; benefits kept off the W-2 only where the exclusions actually apply.'
    ],
    risks: [
      '§105(h) failures tax the owner\'s excess reimbursements — the most common finding when a broad-workforce C-corp runs an owner-rich MERP.',
      'Market-reform failures on standalone reimbursement designs carry the §4980D excise tax ($100/employee/day) — the penalty that dwarfs the benefit.',
      'Choosing or keeping C-corp status FOR this benefit without weighing double taxation on the rest of the earnings is tail-wagging-dog planning; run the full entity comparison.',
      'Informal "the company just pays the family\'s bills" arrangements without a written plan lose §105(b) protection — those payments are constructive dividends or wages.',
      'Employees hired later change the math: what was a clean one-participant plan acquires testing and coverage obligations.'
    ],
    bestFit: [
      'Existing C-corps with owner-employees carrying significant family premiums and out-of-pocket medical costs.',
      'Entity-choice engagements where heavy, recurring family medical spend is a genuine input alongside QBI, payroll, and double-tax considerations.',
      'Owner-only or family-only C-corps that can use the one-participant exemption and skip most of the compliance friction.'
    ],
    implementation: [
      'Confirm C-corp status and the owner\'s W-2 employment; benchmark total compensation for reasonableness.',
      'Start with premium-only: corporate payment of the family policy, documented by board resolution — deductible, excluded, no §105(h).',
      'Layer a reimbursement feature (MERP/HRA) only after choosing the ACA compliance path and running §105(h) against the census.',
      'Adopt written plan documents before the first dollar moves; set annual reimbursement caps.',
      'Substantiate reimbursements (receipts/EOBs) through a consistent process; TPA once non-family employees participate.',
      'Re-test annually as headcount and compensation change; deduct at the entity on Form 1120.'
    ]
  },

  client: {
    teaser: 'One business structure turns your family\'s health costs into a full company write-off',
    headline: 'The C-corporation health benefit most owners never use',
    plainEnglish: [
      'If your business is a regular C-corporation, you hold a benefit that owners of other business types simply do not get: the corporation can pay for your family\'s health coverage — premiums, and with the right plan, out-of-pocket costs too — deduct every dollar, and none of it counts as income to you.',
      'Owners of S-corporations and partnerships have to run these costs through their personal returns, where limits and thresholds shave the benefit down. A C-corp owner on payroll is treated like any employee, and employee health benefits are among the most tax-favored dollars in the entire system: no income tax, no payroll tax, fully deductible to the company.',
      'The requirements are about doing it formally: a written plan set up before the money moves, receipts for anything reimbursed, and fair treatment of other employees if you have them. For families with real, recurring medical costs, this benefit alone sometimes changes which business structure makes sense — so we look at it as part of the whole picture, not in isolation.'
    ],
    analogy: 'Most owners pay medical bills from their own pocket after tax has taken its cut — like shopping with money that shrank on the way to the store. This lets the company shop first, at full value, with dollars that never shrank.',
    benefits: [
      'Family health premiums fully deductible to the company, tax-free to you',
      'Can extend to out-of-pocket costs — deductibles, dental, vision — with the right plan',
      'Skips payroll taxes too, unlike taking extra salary to cover the same bills',
      'Strong enough to factor into which business structure you choose'
    ],
    steps: [
      'We confirm your structure and put the company payment of premiums on a formal footing',
      'We design any reimbursement feature to satisfy the health-plan rules',
      'You submit receipts; the company pays or reimburses the costs',
      'We keep the records, testing, and deductions clean each year'
    ],
    considerations: [
      'This treatment belongs to C-corporations — if your business is an S-corporation or partnership, we use different (smaller) health strategies or evaluate whether a structure change makes overall sense.',
      'If you have employees, the reimbursement rules generally require covering them fairly, which changes the cost-benefit math.',
      'A C-corporation has its own tax trade-offs — we never recommend the structure for this benefit alone.'
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
