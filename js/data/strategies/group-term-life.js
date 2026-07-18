/* ============================================================================
 * STRATEGY: Group Term Life (First $50k)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'group-term-life',
  name: 'Group Term Life (First $50k)',
  category: 'Health & Fringe',
  applyOrder: 79,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Under §79, the cost of the first $50,000 of employer-provided group ' +
      'term life insurance is excluded from the employee\'s income; coverage ' +
      'above $50,000 generates imputed income at the Table I rates of ' +
      'Reg. §1.79-3(d)(2) (typically far below actual premium cost for older ' +
      'employees), and the imputed amount is FICA wages. The employer deducts ' +
      'the premiums under §162 provided it is not the beneficiary. This is a ' +
      'fringe CLEANUP item, not a headline strategy — the dollars are small ' +
      '(a few hundred dollars of premium excluded per employee) — but it is ' +
      'cheap, clean, and commonly done wrong: >2% S-corp shareholders do not ' +
      'qualify for the exclusion (§1372 partner treatment — their premiums ' +
      'belong on the W-2), and discriminatory plans strip key employees of ' +
      'the $50k exclusion entirely under §79(d). Advisory-only: the per-owner ' +
      'benefit is too small and too structure-dependent to model honestly ' +
      'from return inputs.',
    mechanics: [
      'Exclusion applies to GROUP term coverage under a policy carried ' +
      'directly or indirectly by the employer, generally requiring 10+ ' +
      'full-time employees or a Reg. §1.79-1 alternative for smaller groups ' +
      '(coverage for all eligible employees on a formula basis).',
      'Coverage over $50,000: imputed income = Table I uniform premium per ' +
      '$1,000 per month (age-banded) minus employee after-tax contributions; ' +
      'reported on the W-2 (Box 12 code C) and subject to FICA.',
      'Table I cost is usually well below actual premium for employees 50+, ' +
      'so even taxable excess coverage is a rate arbitrage versus buying ' +
      'term personally at those ages.',
      '§79(d) nondiscrimination: if the plan favors key employees as to ' +
      'eligibility or benefit amounts, key employees lose the $50k exclusion ' +
      'and impute income at the GREATER of Table I or actual cost.',
      'Entity mapping: C-corp owner-employees qualify like any employee; ' +
      '>2% S-corp shareholders do not (premiums are W-2 wages, though not ' +
      'FICA wages, and are not eligible for §162(l) since life insurance is ' +
      'not health insurance); partners/sole proprietors are not employees.',
      'Employer premiums are deductible under §162; §264(a) denies the ' +
      'deduction if the employer is directly or indirectly a beneficiary.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §79', note: 'Exclusion for the cost of the first $50,000 of employer-provided group term life; imputed income above.' },
      { type: 'Reg', cite: 'Reg. §1.79-3(d)(2)', note: 'Table I uniform premiums — the age-banded rates used to impute income on coverage over $50,000.' },
      { type: 'Reg', cite: 'Reg. §1.79-1', note: 'What qualifies as group term life, including the under-10-employee alternative rules.' },
      { type: 'IRC', cite: 'IRC §79(d)', note: 'Nondiscrimination: discriminatory plans cost key employees the exclusion; imputation at greater of Table I or actual cost.' },
      { type: 'IRC', cite: 'IRC §1372', note: '>2% S-corp shareholders treated as partners — no §79 exclusion; premiums are W-2 wages.' },
      { type: 'IRC', cite: 'IRC §264(a)(1)', note: 'No employer deduction where the employer is a beneficiary of the policy.' }
    ],
    requirements: [
      'A true group term policy carried by the employer covering an eligible employee class (10+ employees, or the small-group alternative on a nondiscriminatory formula).',
      'Employees as the insureds with beneficiaries of their choosing; employer not a beneficiary.',
      'W-2 imputation (Box 12 code C) and FICA on coverage over $50,000, computed at Table I.',
      '§79(d) nondiscrimination compliance if key employees participate.'
    ],
    risks: [
      'S-corp misclassification is the most common error: >2% shareholders given the exclusion that §1372 denies — a payroll correction, not a planning idea.',
      'Discriminatory small-group designs (owner-only or owner-tilted coverage) forfeit the key-employee exclusion under §79(d).',
      'Missed imputation on coverage above $50k accrues quiet W-2/FICA errors for years.',
      'The dollars are small — presenting this as a marquee strategy erodes credibility. It is a hygiene item bundled with a broader fringe redesign.'
    ],
    bestFit: [
      'C-corps and businesses with a real employee group adding low-cost benefits.',
      'Older owner-employees (C-corp) for whom Table I imputation beats personal term rates on coverage above $50k.',
      'Fringe-benefit cleanups where W-2 treatment of life premiums has been wrong.'
    ],
    implementation: [
      'Inventory existing life coverage and how premiums are being run through payroll today.',
      'Verify group status under Reg. §1.79-1 (or design to the small-group alternative) and check §79(d) discrimination.',
      'Correct entity mapping: exclude only where §79 actually applies; put >2% S-corp shareholder premiums on the W-2.',
      'Set up Table I imputation for coverage over $50,000 (payroll systems automate this — confirm the age bands).',
      'Deduct premiums at the entity; confirm the employer is not a beneficiary.'
    ]
  },

  client: {
    teaser: 'A small benefit your company can hand every employee — free of tax and often already half-built',
    headline: 'Free life insurance, the tax-smart way',
    plainEnglish: [
      'The tax law lets your company provide each employee up to $50,000 of term life insurance without the employee paying any tax on it — and the premiums are a deductible business expense. It is one of the simplest benefits that exists.',
      'To be straight with you: this is a small-dollar item. The tax saved is the tax on a modest premium — real, but not life-changing. We include it because it is nearly free to do, employees value it more than it costs, and it is very commonly set up wrong — especially for owners of S-corporations, where the rules treat owners differently and mistakes sit on payroll records for years.',
      'Coverage above $50,000 is taxed using an IRS rate table that is often cheaper than what an older person would pay for term insurance on their own — a quiet bonus if you want more coverage through the company.'
    ],
    analogy: 'It is the tax-planning equivalent of tightening a loose screw — quick, cheap, worth doing while we are already working on the bigger machine.',
    benefits: [
      'Up to $50,000 of life coverage per employee, tax-free to them',
      'Premiums are deductible to the business',
      'Above $50,000, the IRS rate table often beats retail term prices for older insureds',
      'A morale benefit that costs the company very little'
    ],
    steps: [
      'We review how any current life coverage runs through your payroll',
      'We fix owner treatment if it has been handled wrong — a common finding',
      'We set up (or clean up) the group coverage and the payroll reporting',
      'The deduction and W-2 handling run automatically after that'
    ],
    considerations: [
      'This is a small, tidy benefit — we position it as part of an overall benefits cleanup, not a headline saving.',
      'Owners of S-corporations do not get the tax-free treatment on their own coverage — we will show you exactly how yours must be reported.',
      'The plan has to cover employees fairly; a plan designed only for the owner loses the tax break.'
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
