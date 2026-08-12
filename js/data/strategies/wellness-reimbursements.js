/* ============================================================================
 * STRATEGY: Wellness Program Reimbursements
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'wellness-reimbursements',
  name: 'Wellness Program Reimbursements',
  category: 'Health & Fringe',
  applyOrder: 79,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Two very different things travel under the "wellness" label, and this ' +
      'entry exists mostly to keep clients on the right side of the line. ' +
      'LEGITIMATE: employer wellness benefits that qualify as §105/§106 ' +
      'medical care (biometric screenings, flu shots, smoking-cessation and ' +
      'disease-management programs, EAP counseling) or as de minimis fringes ' +
      '— excludable, deductible, unglamorous, and small. ILLEGITIMATE: the ' +
      'heavily promoted "wellness indemnity" or "fixed-indemnity wellness" ' +
      'schemes claiming employers can slash FICA by running employee pay ' +
      'through pre-tax premiums that boomerang back as untaxed "wellness ' +
      'payments." The IRS addressed these directly in CCA 202323006: cash ' +
      'benefits paid regardless of unreimbursed medical expense are WAGES, ' +
      'fully subject to income and employment tax, and the IRS and its Office ' +
      'of Professional Responsibility have warned promoters and preparers. ' +
      'Position: caution-first. There is a modest legitimate benefit here and ' +
      'a marketed trap next to it. Advisory-only — the legitimate dollars are ' +
      'too small and facts-dependent to model.',
    mechanics: [
      'Legitimate exclusions: employer-provided medical care under ' +
      '§105(b)/§106 includes preventive screenings, immunizations, ' +
      'smoking-cessation, and similar §213(d) care delivered through a ' +
      'compliant plan (integrated with group coverage or fitting an excepted/ ' +
      'HRA design — the same ACA market-reform analysis as any reimbursement ' +
      'arrangement).',
      'De minimis fringes (§132(e)) cover trivial wellness perks; but gym ' +
      'memberships, fitness trackers, and wellness stipends are TAXABLE wages ' +
      'in the general case — general good health is not §213(d) medical care.',
      'The scheme anatomy: employee "buys" a wellness indemnity policy by ' +
      'pre-tax salary reduction, then receives fixed cash "benefit" payments ' +
      '(often ~equal to the premium) for activities like watching a health ' +
      'video — promoters claim the round trip erases FICA on that slice ' +
      'of payroll.',
      'CCA 202323006: fixed-indemnity payments made without regard to actual ' +
      'unreimbursed §213(d) expenses are not excludable under §105(b) — they ' +
      'are wages subject to income tax withholding and FICA. The claimed ' +
      'savings are simply unpaid employment tax.',
      'Exposure for participating employers: back employment taxes, §6656 ' +
      'deposit penalties, accuracy penalties, W-2c corrections — plus ' +
      'promoter-reliance is weak protection when the promoter\'s own ' +
      'materials advertise the tax dodge.',
      'What honest wellness design looks like: benefits tied to actual ' +
      'medical care or unreimbursed expenses, run through a compliant plan, ' +
      'with taxable perks (gym stipends) simply put on the W-2.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §105(b); §106', note: 'The legitimate exclusion: employer-provided medical care, including preventive and wellness services that are §213(d) care under a compliant plan.' },
      { type: 'IRC', cite: 'IRC §213(d)', note: 'Definition of medical care — the line that gym memberships and general-wellness stipends fail.' },
      { type: 'Admin', cite: 'IRS CCA 202323006', note: 'Fixed-indemnity wellness payments made without regard to unreimbursed medical expenses are wages subject to income and employment taxes — the direct answer to the marketed schemes.' },
      { type: 'IRC', cite: 'IRC §132(e)', note: 'De minimis fringe — the narrow home for trivial wellness perks.' },
      { type: 'Admin', cite: 'Notice 2013-54', note: 'Market-reform framework any wellness reimbursement arrangement must clear if it is a group health plan.' },
      { type: 'IRC', cite: 'IRC §3121(a)(2)', note: 'FICA exclusion reaches only genuine accident/health plan payments — the boundary the schemes claim and fail.' }
    ],
    requirements: [
      'For excludable wellness benefits: actual §213(d) medical care (screenings, immunizations, cessation programs) delivered under a written, ACA-compliant plan.',
      'Taxable wellness perks (gym stipends, fitness gear) properly included in W-2 wages — legitimate, just not tax-free.',
      'No arrangement whose economics depend on pre-tax premiums returning to employees as untaxed cash.',
      'Documentation connecting any reimbursement to a specific medical service or unreimbursed expense.'
    ],
    risks: [
      'The marketed wellness-indemnity schemes are the whole risk story: participating employers owe back FICA/withholding, penalties, and interest, and the IRS has these programs squarely in view (CCA 202323006; OPR guidance to practitioners).',
      '"Everyone gets $1,000/month tax-free wellness benefits" pitches often arrive through payroll vendors or associations — clients hear "IRS-approved." It is not.',
      'Even legitimate reimbursement arrangements are group health plans — an uncompliant standalone design walks into the §4980D excise tax ($100/employee/day).',
      'Misclassified taxable perks (gym stipends excluded from W-2s) create small but pervasive payroll errors.',
      'Preparer exposure: signing returns reflecting a known indemnity scheme implicates preparer penalty and OPR standards.'
    ],
    bestFit: [
      'Employers who want genuine, modest wellness benefits (screenings, flu shots, EAP, cessation programs) inside a compliant health plan.',
      'Clients being pitched a wellness-indemnity FICA-savings program RIGHT NOW who need a documented reason to walk away.',
      'Fringe-benefit audits: cleaning up gym stipends and wellness cash sitting off the W-2.'
    ],
    implementation: [
      'Inventory every wellness dollar: what is medical care under §213(d), what is a taxable perk, and what (if anything) resembles an indemnity scheme.',
      'Route genuine medical wellness through the group plan or a compliant HRA design; document the medical-care character.',
      'Put taxable perks on the W-2 prospectively; correct open years if material.',
      'If an indemnity scheme is in place: stop new deferrals, quantify the employment-tax exposure, and correct via W-2c/941-X with counsel as needed.',
      'Give the client a one-page "how to spot the pitch" memo — the schemes re-approach every renewal season.'
    ]
  },

  client: {
    teaser: 'The benefit everyone is pitching your business right now — and the version of it that actually holds up',
    headline: 'Wellness benefits: the real version, not the pitch',
    plainEnglish: [
      'You may have been approached — by a payroll company, an association, a "benefits consultant" — with a program that sounds magical: employees join a wellness plan, complete a few easy activities, and both you and they save big on payroll taxes, at no real cost to anyone. That specific pitch is a scheme the IRS has publicly rejected. The "savings" are just unpaid payroll tax, and employers who join are on the hook for it later, with penalties.',
      'We want you to hear that from us before you hear it from an auditor. When something promises free money through payroll paperwork, it is not a strategy — it is a liability with a sales brochure.',
      'The honest version does exist, and it is worth doing at the right size: your business can provide real health-related benefits — screenings, flu shots, counseling programs, help quitting smoking — tax-free through a properly set up plan. Perks like gym memberships are great for your team too; they are simply taxable pay, and we report them correctly so they never become a problem.'
    ],
    analogy: 'If a stranger offers you a machine that turns payroll taxes into free cash, the machine is not broken — it is borrowing from a future audit. Real wellness benefits are more like a good pair of shoes: modest, useful, and they will not fall apart on you.',
    benefits: [
      'Genuine health benefits — screenings, shots, counseling — delivered tax-free the right way',
      'A clear, documented reason to decline the schemes being marketed to you',
      'Clean payroll treatment of perks like gym memberships, so no surprises later',
      'Protection of your bigger tax plan — one bad scheme can taint good strategies'
    ],
    steps: [
      'We review every wellness dollar your business spends — and any pitch you have received',
      'We separate the tax-free benefits from the taxable perks and set up each correctly',
      'If a problematic program is already in place, we unwind it before it grows',
      'We give you a simple test for evaluating the next pitch that lands in your inbox'
    ],
    considerations: [
      'The tax-free version of wellness benefits is modest — real, but small. Anyone promising large payroll-tax savings from wellness is selling the scheme.',
      'Gym memberships and wellness stipends are taxable pay under the rules — still a fine benefit, just an honest one.',
      'If your business already joined one of these programs, unwinding it sooner is far cheaper than being found in it.'
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
