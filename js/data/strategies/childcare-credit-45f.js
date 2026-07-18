/* ============================================================================
 * STRATEGY: Employer-Provided Childcare Credit (§45F)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'childcare-credit-45f',
  name: 'Employer-Provided Childcare Credit (§45F)',
  category: 'Credits & Incentives',
  applyOrder: 83,
  modeled: true,

  advisor: {
    summary:
      'The §45F credit rewards employers that provide childcare for employees. ' +
      'OBBBA (P.L. 119-21) substantially expanded it for amounts paid after ' +
      '2025: the credit is 40% of qualified childcare expenditures (50% for ' +
      'eligible small businesses), capped at $500,000 per year ($600,000 for ' +
      'eligible small businesses), with the caps indexed for inflation, plus ' +
      '10% of qualified childcare resource and referral expenditures. OBBBA ' +
      'also opened the credit to employers that contract with third-party ' +
      'providers or participate in jointly owned or pooled childcare ' +
      'arrangements — an employer no longer needs to build its own facility. ' +
      'Recapture applies if a qualified childcare facility ceases operation ' +
      'or is disposed of within 10 years. Claimed on Form 8882 as part of the ' +
      'general business credit.',
    mechanics: [
      'Qualified childcare expenditures include costs to acquire, construct, ' +
      'rehabilitate, or expand a qualified childcare facility; operating ' +
      'costs (including employee training and scholarship programs); and ' +
      'amounts paid under contract with a qualified childcare facility to ' +
      'provide services to employees.',
      'OBBBA (effective for amounts paid or incurred after 12/31/2025) raised ' +
      'the credit rate from 25% to 40% of qualified childcare expenditures — ' +
      '50% for an eligible small business — and raised the annual cap from ' +
      '$150,000 to $500,000 ($600,000 small business), indexed going forward.',
      'Eligible small business status is measured by a gross receipts test ' +
      'keyed to §448(c) (verify the OBBBA measurement window — a five-year ' +
      'average applies rather than the usual three).',
      'Pooled and intermediary arrangements now qualify: multiple small ' +
      'employers can jointly contract for childcare capacity and share the credit.',
      'No double benefit: deductions and basis must be reduced by the credit ' +
      'claimed; enter the net figure here if you have already netted, or note ' +
      'the deduction interaction in the plan.',
      'Recapture (§45F(d)): a facility that ceases to operate as a qualified ' +
      'childcare facility, or is transferred, within the first 10 years ' +
      'triggers recapture of a declining percentage of the facility credit.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §45F', note: 'Employer-provided childcare credit: credit rates, annual cap, qualified expenditure definitions, and facility requirements.' },
      { type: 'IRC', cite: 'IRC §45F(d)', note: '10-year recapture schedule on cessation of operation or disposition of a qualified childcare facility.' },
      { type: 'Admin', cite: 'OBBBA (P.L. 119-21), July 2025', note: 'Raised the rate to 40% (50% eligible small business), cap to $500,000 ($600,000 small business, indexed), and allowed third-party contract, intermediary, and pooled arrangements — effective for amounts paid after 12/31/2025.' },
      { type: 'IRC', cite: 'IRC §448(c)', note: 'Gross receipts test referenced for eligible small business status (verify the OBBBA five-year averaging window).' },
      { type: 'Admin', cite: 'Form 8882 / Form 3800', note: 'Credit computation and general business credit reporting.' },
      { type: 'IRC', cite: 'IRC §38 / §39', note: 'Nonrefundable general business credit; 1-year carryback, 20-year carryforward for unused amounts.' }
    ],
    requirements: [
      'Childcare provided through a qualified childcare facility — licensed under state/local law and compliant with its requirements — whether employer-operated, contracted, or pooled.',
      'The facility\'s principal use must be childcare (unless it is the principal residence of an in-home operator), and use cannot discriminate in favor of highly compensated employees.',
      'Substantiation of qualified expenditures: contracts with providers, construction/operating cost records, enrollment records for employees\' children.',
      'Deduction/basis reduction coordinated with the credit claimed — no double benefit.'
    ],
    risks: [
      'Recapture exposure for facility owners: selling the building or shutting the center within 10 years claws back part of the credit — calendar the exposure.',
      'Licensing failures disqualify the facility; contract arrangements should warrant the provider\'s licensed status.',
      'Nondiscrimination: a program effectively limited to owners\' or executives\' children fails; document broad employee eligibility.',
      'Nonrefundable — a low-tax year strands the credit in carryforward (carryovers not modeled in this tool).',
      'For owner-employees, childcare provided to the owner\'s own children raises reasonable-compensation and discrimination questions — structure with counsel.'
    ],
    bestFit: [
      'Employers in tight labor markets using childcare as a retention benefit — the after-credit cost of a childcare benefit is now modest.',
      'Small businesses that can join pooled or contracted arrangements without building anything.',
      'Employers with parent-heavy workforces (healthcare, manufacturing shifts, professional services).'
    ],
    implementation: [
      'Choose the delivery model: contract slots with a licensed local provider, join a pooled arrangement, or (for larger employers) build/operate a facility.',
      'Verify the provider\'s state/local license and put the childcare services contract in writing.',
      'Define an employee eligibility policy that does not favor highly compensated employees; communicate the benefit.',
      'Track qualified expenditures separately in the books; coordinate the deduction reduction with the credit.',
      'Claim on Form 8882, carried to Form 3800; retain contracts, licenses, and enrollment records.',
      'If a facility is owned: diarize the 10-year recapture window before any sale or repurposing.'
    ]
  },

  client: {
    teaser: 'Turn a benefit your team will love into a large tax offset',
    headline: 'Help your employees with childcare — the IRS pays most of the bill',
    plainEnglish: [
      'Childcare is one of the biggest headaches your employees face, and one of the biggest reasons good people quit or can\'t take a job. The tax law now gives employers a powerful reward for helping: a credit that covers 40% — for many small businesses, 50% — of what you spend providing childcare for your team, up to very generous limits.',
      'You do not have to build a daycare. Under the new rules, you can simply contract with a licensed local childcare provider to reserve spots for your employees\' kids, or team up with other businesses to share capacity. The credit covers those contract payments.',
      'The result: a benefit that helps you hire and keep parents, at a fraction of its sticker price after the credit and deductions are counted.'
    ],
    analogy: 'It\'s like the government offering to split the bill — roughly half — every time you pick up part of your employees\' childcare costs.',
    benefits: [
      'A credit for 40–50% of what you spend on employee childcare',
      'No facility needed — contracting with a licensed provider counts',
      'A standout recruiting and retention benefit for working parents',
      'Repeats every year you offer the benefit'
    ],
    steps: [
      'We help you pick the right setup — usually a contract with a licensed local provider',
      'We make sure the paperwork and eligibility rules are met',
      'We track the spending and claim the credit on your return',
      'You get the hiring advantage; the IRS shoulders much of the cost'
    ],
    considerations: [
      'The childcare provider must be properly licensed, and the benefit has to be available broadly to employees — not just to owners.',
      'If you ever build your own childcare facility, part of the credit can be clawed back if it stops operating within ten years — we plan around that.'
    ]
  },

  inputs: [
    { key: 'creditAmount', label: '§45F credit (per computed expenditures)', type: 'currency', default: 20000 }
  ],

  appliesTo: function (profile) {
    return true; // depends on benefit facts the advisor computes, not return data
  },

  /**
   * Adds the advisor-computed §45F credit to otherCredits (engine applies it
   * nonrefundably after the child tax credit). The §45F no-double-benefit
   * deduction/basis reduction is not separately modeled — enter the net
   * figure or handle the deduction side in the business income inputs.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = Math.max(0, params.creditAmount || 0);
    p.otherCredits = (p.otherCredits || 0) + amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' §45F employer childcare credit applied ' +
        '(nonrefundable). Deduction/basis reduction for the credited expenses is ' +
        'not separately modeled — enter the net figure.');
      notes.push('Projection assumes the childcare benefit (and credit) recurs ' +
        'annually. OBBBA rates/caps apply to amounts paid after 12/31/2025.');
    }
    return { profile: p, notes: notes };
  }
});
