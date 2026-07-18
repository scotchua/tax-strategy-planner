/* ============================================================================
 * STRATEGY: Disabled Access Credit (§44)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'disabled-access-credit',
  name: 'Disabled Access Credit (§44)',
  category: 'Credits & Incentives',
  applyOrder: 84,
  modeled: true,

  advisor: {
    summary:
      'The §44 disabled access credit gives an eligible small business a ' +
      'credit equal to 50% of eligible access expenditures that exceed $250 ' +
      'but do not exceed $10,250 — a maximum credit of $5,000 per year. ' +
      'Eligible small business: gross receipts of $1,000,000 or less in the ' +
      'preceding year, OR no more than 30 full-time employees. Eligible ' +
      'expenditures are amounts paid to comply with the Americans with ' +
      'Disabilities Act — removing barriers, providing interpreters or ' +
      'readers, acquiring or modifying equipment, or making materials ' +
      'accessible. §44(d)(7) denies any deduction or other credit for the ' +
      'amount taken as credit. For larger projects, pair with the §190 ' +
      'architectural barrier removal deduction (up to $15,000/year) on the ' +
      'expenditures above the credit band.',
    mechanics: [
      'Credit = 50% × (eligible access expenditures − $250), with ' +
      'expenditures counted only up to $10,250 — maximum credit $5,000 per ' +
      'year. The band resets annually, so multi-year projects can capture the ' +
      'credit repeatedly.',
      'Eligible small business test (§44(b)): prior-year gross receipts ' +
      '≤ $1,000,000 OR ≤ 30 full-time employees (30+ hours/week for 20+ ' +
      'weeks). Not indexed — the receipts test has been $1M since enactment.',
      'Eligible access expenditures (§44(c)): removing architectural, ' +
      'communication, physical, or transportation barriers; qualified ' +
      'interpreters, readers, and similar services; acquiring or modifying ' +
      'equipment or devices for individuals with disabilities; accessible ' +
      'formats (braille, audio, large print). Must be reasonable and meet ADA ' +
      'accessibility standards. New construction does NOT qualify — the ' +
      'credit targets modifications to existing facilities.',
      'No double benefit (§44(d)(7)): the credited amount cannot also be ' +
      'deducted, depreciated, or claimed under another credit — reduce the ' +
      'deduction/basis by the credit taken.',
      'Stacking: §44 credit on the first $10,250 band; §190 deduction (up to ' +
      '$15,000/year) for qualifying barrier-removal costs beyond it; remaining ' +
      'costs capitalized and depreciated (bonus-eligible where applicable).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §44', note: 'The credit: 50% of eligible access expenditures between $250 and $10,250; eligible small business definition; ADA compliance standard.' },
      { type: 'IRC', cite: 'IRC §44(d)(7)', note: 'No double benefit — no deduction or other credit for amounts taken as the §44 credit.' },
      { type: 'IRC', cite: 'IRC §190', note: 'Companion deduction: up to $15,000/year of qualified architectural and transportation barrier removal expenses — usable alongside §44 on the excess.' },
      { type: 'Admin', cite: 'Form 8826', note: 'Disabled Access Credit computation; flows to Form 3800 general business credit.' },
      { type: 'IRC', cite: 'IRC §38 / §39', note: 'Nonrefundable general business credit; 1-year carryback, 20-year carryforward.' }
    ],
    requirements: [
      'Eligible small business status in the year claimed: prior-year gross receipts ≤ $1M or ≤ 30 full-time employees.',
      'Expenditures made to comply with the ADA for an existing facility or service — not new construction.',
      'Costs must be reasonable and the modifications must meet applicable accessibility standards.',
      'Records: invoices, before/after documentation of the barrier removed or accommodation provided, and the deduction reduction for the credited amount.'
    ],
    risks: [
      'New construction and general remodeling do not qualify — the expenditure must remove a barrier or provide access in an existing facility.',
      'The IRS has litigated abusive prepackaged schemes (e.g., pay-phone and ATM "accessibility" investments marketed purely for the credit) — the expenditure must serve the taxpayer\'s actual business and customers.',
      'Forgetting the §44(d)(7) deduction reduction is a common exam adjustment — the same dollars cannot be credited and depreciated.',
      'Nonrefundable; a no-tax year strands the credit in carryforward (carryovers not modeled in this tool).'
    ],
    bestFit: [
      'Small practices and storefronts (medical/dental offices, restaurants, retail) making ADA improvements — ramps, restrooms, door hardware, signage.',
      'Businesses buying accessibility equipment or software (hearing loops, screen readers, accessible websites for customer use — confirm facts).',
      'Multi-year renovation plans that can spread eligible costs across years to reuse the $5,000 annual band.'
    ],
    implementation: [
      'Confirm eligible small business status (prior-year receipts ≤ $1M or ≤ 30 FTEs) before the spend.',
      'Identify the specific barrier or access need and document the ADA basis for the modification.',
      'Time the spending: costs up to $10,250 this year capture the full $5,000; defer additional eligible work to next year\'s band where practical.',
      'Reduce the related deduction/basis by the credit claimed (§44(d)(7)); apply §190 to qualifying excess up to $15,000.',
      'File Form 8826 with the return; retain invoices and before/after documentation.'
    ]
  },

  client: {
    teaser: 'A building upgrade where the government picks up half the tab',
    headline: 'Make your business accessible — at half price',
    plainEnglish: [
      'If your business spends money making itself accessible to people with disabilities — a ramp, an accessible restroom, wider doorways, better signage, hearing or vision equipment, even sign-language interpreters — the tax law reimburses half of it, up to $5,000 of credit each year.',
      'This is a credit, not a deduction: it comes straight off your tax bill, dollar for dollar. It is designed for small businesses, and the qualifying work is usually something you needed to do anyway to serve customers and comply with accessibility law.',
      'The limit resets every year. If you have a bigger accessibility project, we can plan the work across more than one year so you capture the credit more than once, and use a companion deduction for the larger costs.'
    ],
    analogy: 'It\'s like a 50%-off coupon on accessibility improvements — and you get a fresh coupon every year.',
    benefits: [
      'Half of your accessibility spending back, up to $5,000 off your taxes each year',
      'Covers equipment and services, not just construction',
      'The annual limit resets — bigger projects can be phased to claim it repeatedly',
      'Pairs with a separate deduction for larger renovation costs'
    ],
    steps: [
      'We confirm your business qualifies under the small-business rules',
      'We identify which of your planned improvements count',
      'We time the spending to make the most of the yearly limit',
      'We claim the credit and keep the records that support it'
    ],
    considerations: [
      'Brand-new construction does not qualify — this is for improving existing spaces and services.',
      'The same dollars cannot be both credited and deducted, so we do the coordination to keep the return clean.'
    ]
  },

  inputs: [
    { key: 'creditAmount', label: '§44 credit (max $5,000)', type: 'currency', default: 5000, max: 5000 }
  ],

  appliesTo: function (profile) {
    return true; // eligible-small-business status certified by the advisor
  },

  /**
   * Adds the advisor-computed §44 credit (capped at the $5,000 statutory
   * maximum) to otherCredits; engine applies it nonrefundably after the
   * child tax credit. The §44(d)(7) deduction reduction is not separately
   * modeled — coordinate it in the business income inputs.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = Math.max(0, params.creditAmount || 0);
    if (amt > 5000) {
      amt = 5000;
      notes.push('§44 credit capped at the $5,000 statutory maximum (50% of expenditures between $250 and $10,250).');
    }
    p.otherCredits = (p.otherCredits || 0) + amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' disabled access credit applied (nonrefundable). ' +
        'No deduction for the credited amount (§44(d)(7)) — coordinate the deduction ' +
        'reduction outside this model.');
      notes.push('Projection repeats the credit each year — appropriate only if ' +
        'eligible access spending recurs (the annual band resets); otherwise zero it after year 1.');
    }
    return { profile: p, notes: notes };
  }
});
