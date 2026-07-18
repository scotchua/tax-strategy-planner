/* ============================================================================
 * STRATEGY: Reasonable Compensation Study (S-Corp)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'reasonable-comp-study',
  name: 'Reasonable Compensation Study (S-Corp)',
  category: 'Entity Structure',
  applyOrder: 17,
  modeled: false, // advisory-only: the salary it produces is an INPUT to s-corp-election, not its own dollar effect
  character: 'permanent', // ET2

  advisor: {
    summary:
      'The documentation defense for the S-corp salary. The entire ' +
      'employment-tax benefit of an S election rests on the wage/distribution ' +
      'split, and the IRS\'s attack is always the same: the salary was ' +
      'unreasonably low for the services performed (Rev. Rul. 74-44; Watson; ' +
      'McAlary). A reasonable compensation study builds the number from ' +
      'evidence — the owner\'s actual duties, hours, and skills priced against ' +
      'market wage data — and memorializes it BEFORE the year is filed. ' +
      'Courts decide these cases on many-factor tests and independent ' +
      'market data; a contemporaneous study converts the firm\'s biggest ' +
      'recurring S-corp exam exposure into a documented position. The salary ' +
      'this study produces is exactly what belongs in the S-Corp Election ' +
      'strategy\'s "reasonable compensation" input in this tool.',
    mechanics: [
      'Legal standard: distributions to a shareholder-employee who underpays ' +
      'themselves for services are recharacterized as wages, with back FICA, ' +
      'penalties, and interest (Rev. Rul. 74-44; §3121/§3111 wage base). ' +
      'Watson (8th Cir. 2012) upheld recharacterization where a CPA paid ' +
      'himself $24k while taking $200k+ in distributions.',
      'The factor framework courts apply: training and experience; duties ' +
      'and responsibilities; time and effort devoted; what comparable ' +
      'businesses pay for comparable services; dividend/distribution history; ' +
      'compensation of non-owner employees; and the business\'s size, ' +
      'complexity, and economic conditions. McAlary shows a court building ' +
      'the number bottom-up from market wage data for the work actually done.',
      'Three accepted valuation approaches: the COST approach (decompose the ' +
      'owner\'s time across tasks — admin, sales, technical work — and price ' +
      'each at market); the MARKET approach (price the whole role against ' +
      'salary survey data for comparable positions/companies); the INCOME ' +
      'approach (what would an independent investor accept as owner profit ' +
      'after fair compensation).',
      'Data sources: BLS Occupational Employment and Wage Statistics, ' +
      'commercial survey databases and dedicated reasonable-comp platforms ' +
      '(e.g., RCReports), industry association surveys — cited and retained, ' +
      'not just consulted.',
      'The number is not "as low as possible": it must reflect ALL services ' +
      'the owner performs (including management/admin), scale with hours ' +
      'actually worked, and be revisited as the business grows. Part-time or ' +
      'semi-retired owners legitimately support lower comp — with time ' +
      'records.',
      'Interplay to model, not guess: salary trades 15.3%/2.9% employment tax ' +
      'against §199A effects (salary reduces QBI but creates W-2 wages that ' +
      'support the deduction above the taxable-income threshold) — the ' +
      'S-Corp Election strategy in this tool computes the net.'
    ],
    authority: [
      { type: 'Admin', cite: 'Rev. Rul. 74-44', note: 'The foundational ruling: "dividends" paid in lieu of reasonable compensation to shareholder-employees are wages subject to employment tax.' },
      { type: 'Case', cite: 'David E. Watson, P.C. v. United States, 668 F.3d 1008 (8th Cir. 2012)', note: 'Leading case — $24k salary against $200k+ distributions for an experienced CPA; court sustained recharacterization to a market-based figure built from survey data.' },
      { type: 'Case', cite: 'Sean McAlary Ltd. v. Comm\'r, T.C. Summ. Op. 2013-62', note: 'Court constructed reasonable comp from market wage data for the services actually performed — the methodology a study replicates in advance.' },
      { type: 'Case', cite: 'Glass Blocks Unlimited v. Comm\'r, T.C. Memo 2013-180', note: 'Cash pulled out as purported loan repayments/distributions with NO salary recharacterized as wages — paying zero is the least defensible position.' },
      { type: 'IRC', cite: 'IRC §§3111, 3121(a); §3101(b)(2)', note: 'FICA imposition and the wage definition the recharacterized amounts fall into; additional Medicare tax on the recharacterized wages.' },
      { type: 'Reg', cite: 'Reg. §1.162-7(b)(3)', note: 'The reasonableness benchmark: the amount that would ordinarily be paid for like services by like enterprises under like circumstances.' },
      { type: 'IRC', cite: 'IRC §199A', note: 'The other side of the trade: salary shrinks QBI but supplies W-2 wages for the wage limitation above the threshold — the study\'s number feeds this computation.' }
    ],
    requirements: [
      'An S corporation (or one being elected — pair the study with the election itself).',
      'An honest inventory of the owner\'s functions, hours, and any non-owner staff who absorb duties.',
      'Independent market wage data covering the owner\'s actual mix of duties, geography, and business size.',
      'A written report, dated before (or with) the year\'s payroll decisions, retained in the permanent file and refreshed on material change.'
    ],
    risks: [
      'No study, low salary: recharacterization brings back FICA on the reclassified amount PLUS §6656 deposit penalties, §6662 accuracy penalties, and interest — routinely exceeding the "saved" tax.',
      'A study that prices only part of the owner\'s duties (e.g., technician work but not management) is assailable — the factor tests cover everything the owner does.',
      'Stale studies: comp set in a $200k-profit year does not defend a $700k-profit year; refresh on growth, role change, or acquisition.',
      'Overcorrection costs real money too: an inflated salary wastes employment tax and can needlessly shrink QBI — reasonable means reasonable, not maximal.',
      'The study must match reality — if payroll doesn\'t actually pay the studied amount, the paper is evidence against the client, not for them.'
    ],
    bestFit: [
      'Every S-corp owner-operator taking distributions — this is baseline hygiene, not an aggressive strategy.',
      'High-distribution, low-salary profiles (the Watson fact pattern) — the highest exam exposure.',
      'Owners with unusual facts a study can legitimately capture: part-time involvement, heavy delegation to staff, or multi-entity roles.',
      'New S elections (including late-relief elections), where the first year\'s salary sets the pattern.'
    ],
    implementation: [
      'Interview the owner: duties, hours, credentials, delegation, and how the business actually earns its revenue.',
      'Select the approach (cost approach for wearer-of-many-hats owners; market approach for role-comparable owners) and pull cited wage data (BLS OEWS, survey databases, RCReports-type platforms).',
      'Produce the written report with the factor analysis and the concluded wage; have the owner/board adopt it (minutes for the file).',
      'Set payroll to the studied amount and enter that figure as the salary input in the S-Corp Election strategy in this tool.',
      'Diarize a refresh trigger: material profit change, role change, or every 2–3 years, whichever comes first.',
      'On exam, produce the study FIRST — a contemporaneous, data-based report reframes the entire conversation.'
    ]
  },

  client: {
    teaser: 'The document that protects your biggest recurring tax savings from being unwound',
    headline: 'Put a defensible number — and a paper trail — behind your salary',
    plainEnglish: [
      'If you own an S corporation, your biggest recurring tax savings comes from splitting what you take out of the business between a salary and owner distributions. The IRS accepts that split on one condition: the salary must be fair for the work you actually do. "Fair" is exactly where owners get challenged.',
      'A reasonable compensation study settles the question with evidence instead of a guess. We inventory what you really do — managing, selling, doing the technical work — and price each piece using independent market wage data, the same way a court would look at it. The result is a written report that says: this salary is what the market pays for this work.',
      'That report does two jobs. It sets the right number so you are not overpaying payroll tax out of caution or underpaying and inviting trouble. And if the IRS ever asks, you hand them a dated, data-backed study instead of an explanation made up after the fact.'
    ],
    analogy: 'It\'s like getting a professional appraisal before selling a house: you could guess the price, but a documented appraisal both gets the number right and ends arguments before they start.',
    benefits: [
      'A salary set by market data — not too high, not too low',
      'Strong written protection for the tax savings your S corporation produces',
      'Penalties and back-tax exposure dramatically reduced if you are ever examined',
      'A number we can update as your business grows'
    ],
    steps: [
      'We interview you about what you actually do and how many hours you work',
      'We price your role using independent salary data for your industry and area',
      'You get a written, dated report — and we set your payroll to match it',
      'We refresh the study when your business or role meaningfully changes'
    ],
    considerations: [
      'The study sets an honest number — sometimes that means your salary should go up, which costs some payroll tax; we show the full picture either way.',
      'The report only protects you if your actual payroll matches it, so we align the two as part of the work.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. The studied salary belongs in the S-Corp Election strategy\'s reasonable compensation input.']
      : [] };
  }
});
