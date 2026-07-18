/* ============================================================================
 * STRATEGY: Work Opportunity Tax Credit (§51)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'wotc',
  name: 'Work Opportunity Tax Credit',
  category: 'Credits & Incentives',
  applyOrder: 82,
  modeled: true,

  advisor: {
    summary:
      'The §51 Work Opportunity Tax Credit rewards hiring from targeted groups ' +
      '— qualified veterans, SNAP recipients, long-term unemployed, ' +
      'ex-felons, designated community residents, vocational-rehab referrals, ' +
      'SSI recipients, and long-term family assistance recipients. Generally ' +
      '40% of first-year wages up to $6,000 ($2,400 per hire), rising to ' +
      '$9,600 for certain qualified veterans (40% of up to $24,000) and up to ' +
      '$9,000 over two years for long-term family assistance hires. The ' +
      'make-or-break step is Form 8850 pre-screening submitted to the state ' +
      'workforce agency within 28 days of the start date — miss it and the ' +
      'credit is gone. §280C(a) reduces the wage deduction by the credit; ' +
      'enter the net benefit accordingly. VERIFY AUTHORIZATION: WOTC was ' +
      'authorized through hires beginning work by 12/31/2025 (Consolidated ' +
      'Appropriations Act, 2021) — confirm extension status before modeling ' +
      '2026+ hires.',
    mechanics: [
      'Credit is 40% of qualified first-year wages if the employee works at ' +
      'least 400 hours; 25% if 120–399 hours; no credit under 120 hours.',
      'Wage caps by group: $6,000 general (max $2,400); qualified veteran ' +
      'categories up to $24,000 of wages (max $9,600 for a veteran with a ' +
      'service-connected disability unemployed 6+ months); summer youth ' +
      '$3,000 of wages (max $1,200).',
      'Long-term family assistance recipients (§51(e)): 40% of up to $10,000 ' +
      'of first-year wages plus 50% of up to $10,000 of second-year wages — ' +
      'up to $9,000 over two years.',
      'Form 8850 (Pre-Screening Notice) must be signed by employer and ' +
      'applicant on or before the job-offer date and submitted to the state ' +
      'workforce agency within 28 calendar days after the employee starts; ' +
      'ETA Form 9061/9062 supplies the eligibility documentation. The state ' +
      'agency certification is the credit.',
      '§280C(a): the employer\'s wage deduction is reduced by the credit ' +
      'claimed. If you enter the net-of-deduction-loss benefit here, no ' +
      'further income adjustment is needed; the model does not separately ' +
      'reduce business income.',
      'Claimed on Form 5884, flowing into the §38 general business credit ' +
      '(Form 3800); nonrefundable, with §39 carryback 1 / carryforward 20.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §51', note: 'The credit: targeted groups, wage caps, 400/120-hour tiers, and certification requirement.' },
      { type: 'IRC', cite: 'IRC §51(d)(13)', note: 'Pre-screening and certification: Form 8850 must go to the designated local (state workforce) agency within 28 days of the start date.' },
      { type: 'IRC', cite: 'IRC §51(e)', note: 'Long-term family assistance recipients — two-year credit up to $9,000.' },
      { type: 'IRC', cite: 'IRC §280C(a)', note: 'Wage deduction reduced by the credit — no double benefit.' },
      { type: 'Admin', cite: 'Form 8850; ETA Forms 9061/9062', note: 'IRS pre-screening notice plus DOL conditional certification/individual characteristics forms filed with the state workforce agency.' },
      { type: 'Admin', cite: 'Form 5884 / Form 3800', note: 'Credit computation and general business credit reporting.' },
      { type: 'Admin', cite: 'Consolidated Appropriations Act, 2021 (P.L. 116-260)', note: 'Extended WOTC through 12/31/2025. VERIFY current authorization for employees beginning work after that date — WOTC has historically lapsed and been extended retroactively.' }
    ],
    requirements: [
      'Hires certified by the state workforce agency as members of a targeted group — self-attestation alone is not enough.',
      'Form 8850 signed by offer date and submitted within 28 days of the start date (hard deadline, no reasonable-cause relief).',
      'Employee works at least 120 hours (25% tier) or 400 hours (40% tier).',
      'The employee must be a new hire — rehires and related parties (§51(i)) do not qualify.',
      'Payroll records isolating qualified first-year wages per certified employee.'
    ],
    risks: [
      'AUTHORIZATION STATUS: statutory hiring deadline was 12/31/2025 — for employees beginning work in 2026, confirm Congress extended §51 before claiming or modeling the credit. Extension has historically been routine but retroactive.',
      'The 28-day Form 8850 window is the leading cause of lost credits; without a process embedded in onboarding, eligible hires slip through unscreened.',
      'Certifications can take months; credits may need to be claimed on amended returns or held until certification arrives.',
      'Wages counted for WOTC cannot double-count with certain other employment credits for the same employee.',
      'Nonrefundable: a low-tax year strands the credit in carryforward (this tool applies it after the child tax credit; carryovers not modeled).'
    ],
    bestFit: [
      'Employers with steady hiring volume in hourly, entry-level, food service, healthcare, warehouse, or trades roles — where targeted-group density is highest.',
      'Businesses willing to add a two-minute screening questionnaire to their onboarding packet (or use payroll-provider WOTC screening).',
      'Veteran-focused hiring programs — the veteran categories carry the largest per-hire credits.'
    ],
    implementation: [
      'Embed WOTC screening in onboarding: applicant completes Form 8850 page 1 by the offer date, employer completes page 2 at hire.',
      'Submit Form 8850 plus ETA 9061 (or 9062) to the state workforce agency within 28 calendar days of the start date — calendar this per hire.',
      'Track hours to the 120/400-hour thresholds and isolate first-year qualified wages in payroll.',
      'On certification, compute the credit on Form 5884 and carry to Form 3800; coordinate the §280C(a) wage-deduction reduction.',
      'Consider payroll-provider or specialist WOTC administration for volume hiring — screening compliance drives the entire benefit.'
    ]
  },

  client: {
    teaser: 'Get paid back for hires you were probably going to make anyway',
    headline: 'Turn your hiring into tax credits',
    plainEnglish: [
      'The government offers employers a reward for hiring people from groups that often face barriers to work — for example, veterans, people who have been unemployed a long time, or people receiving government assistance. The reward is a tax credit: a dollar-for-dollar cut in your tax bill, typically $2,400 per qualifying hire and up to $9,600 for certain veterans.',
      'Many employers already hire people who qualify and never collect a dime, because the credit has one strict rule: a short screening form must be filed within 28 days of the person\'s start date. Miss the window, lose the credit.',
      'The fix is simple — a quick questionnaire added to your new-hire paperwork. From there, we handle the filings and claim the credit for every hire who qualifies.'
    ],
    analogy: 'It\'s like a coupon the government hands you for certain new hires — but the coupon expires 28 days after their first day, so the trick is having a system that never forgets to redeem it.',
    benefits: [
      'Typically $2,400 per qualifying hire — up to $9,600 for certain veterans',
      'Reduces your tax bill dollar for dollar',
      'No change to who you hire — just a screening step added to onboarding',
      'Scales with your hiring: more qualifying hires, more credit'
    ],
    steps: [
      'We add a short screening form to your new-hire paperwork',
      'We file the required forms with the state within the deadline',
      'The state certifies which hires qualify',
      'We claim the credit on your tax return'
    ],
    considerations: [
      'The program\'s authorization is renewed by Congress in cycles — we confirm it is in effect for your hire dates before counting on it.',
      'The 28-day filing deadline is absolute, so the screening step has to be built into onboarding, not done after the fact.'
    ]
  },

  inputs: [
    { key: 'creditAmount', label: 'Total WOTC for the year (net)', type: 'currency', default: 9600 },
    { key: 'yearsClaimed', label: 'Years to project this credit (hiring pace may not repeat)', type: 'number', default: 1, min: 1 }
  ],

  appliesTo: function (profile) {
    return true; // depends on hiring facts the advisor certifies, not return data
  },

  /**
   * Adds the advisor-entered credit to otherCredits (engine applies it
   * nonrefundably after the child tax credit). §280C(a) reduces the wage
   * deduction by the credit — enter the net benefit; the model does not
   * separately reduce business income. §39 carryovers not modeled.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var yearsClaimed = Math.max(1, Math.round(params.yearsClaimed || 1));
    if (yearIndex >= yearsClaimed) return { profile: p, notes: notes };
    var amt = Math.max(0, params.creditAmount || 0);
    p.otherCredits = (p.otherCredits || 0) + amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' WOTC applied (nonrefundable) for ' + yearsClaimed +
        (yearsClaimed === 1 ? ' year' : ' years') + ' of the projection. Wage deduction ' +
        'is reduced by the credit under §280C(a) — enter the net figure; the model ' +
        'does not separately reduce business income.');
      notes.push('VERIFY: WOTC statutory authorization ran through hires beginning ' +
        'work by 12/31/2025 — confirm extension before relying on this for later hires. ' +
        'Defaults to year 1 only rather than assuming this hiring pace repeats every ' +
        'projection year — raise "years to project" if the client hires at this ' +
        'certified-group pace consistently.');
    }
    return { profile: p, notes: notes };
  }
});
