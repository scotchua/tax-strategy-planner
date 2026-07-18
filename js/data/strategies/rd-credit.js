/* ============================================================================
 * STRATEGY: R&D Tax Credit (§41)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'rd-credit',
  name: 'R&D Tax Credit (§41)',
  category: 'Credits & Incentives',
  applyOrder: 81,
  modeled: true,

  advisor: {
    summary:
      'The §41 credit for increasing research activities is a permanent, ' +
      'dollar-for-dollar general business credit for qualified research ' +
      'expenses (QREs) — wages, supplies, and 65% of contract research — that ' +
      'satisfy the §41(d) four-part test. Computed on Form 6765 under the ' +
      'regular method or the 14% alternative simplified credit (ASC). §280C(c) ' +
      'requires either adding the credit back to income or electing the ' +
      'reduced credit (credit × (1 − 21%)); the advisor enters the NET credit ' +
      'here. OBBBA (P.L. 119-21) enacted §174A restoring immediate expensing ' +
      'of domestic research costs from 2025, ending the TCJA-era 5-year ' +
      'domestic amortization — foreign research remains 15-year. Qualified ' +
      'small businesses may elect to apply up to $500,000 of the credit ' +
      'against payroll tax under §41(h).',
    mechanics: [
      'QREs are in-house research wages, supplies used in research, and 65% ' +
      'of contract research amounts (75% for qualified research consortia) — ' +
      'domestic activities only.',
      '§41(d) four-part test: (1) expenditures eligible for §174/§174A ' +
      'treatment, (2) undertaken to discover information technological in ' +
      'nature, (3) intended to develop a new or improved business component ' +
      '(function, performance, reliability, quality), and (4) substantially ' +
      'all activities constitute a process of experimentation.',
      'Two computation methods on Form 6765: regular (20% of QREs over a ' +
      'base amount) or the alternative simplified credit (14% of QREs over ' +
      '50% of the prior-3-year average QREs). Most established claimants use ASC.',
      '§280C(c): the deduction attributable to credited expenses must be ' +
      'reduced by the credit, OR elect the reduced credit — a timely-filed ' +
      '(including extensions) election on Form 6765. Enter the post-§280C net ' +
      'figure in this tool; the model does not separately un-deduct wages.',
      '§41(h) qualified small business payroll offset: under $5M gross ' +
      'receipts in the credit year and no gross receipts before the 5-year ' +
      'period ending with the credit year — elect up to $500,000 against ' +
      'payroll taxes, valuable for pre-profit startups with no income tax to offset.',
      'OBBBA §174A: domestic research costs are again immediately deductible ' +
      'beginning in 2025 (with transition options for 2022–2024 capitalized ' +
      'amounts); foreign research is still amortized over 15 years under §174.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §41', note: 'Credit for increasing research activities — permanent; regular and ASC computation methods.' },
      { type: 'IRC', cite: 'IRC §41(d)', note: 'The four-part test defining qualified research; exclusions for research after commercial production, adaptation, duplication, surveys, foreign research, and funded research.' },
      { type: 'IRC', cite: 'IRC §41(h)', note: 'Qualified small business election to apply the credit against payroll tax — up to $500,000 (as increased by the Inflation Reduction Act for tax years beginning after 2022).' },
      { type: 'IRC', cite: 'IRC §280C(c)', note: 'No double benefit: reduce the deduction by the credit or elect the reduced credit (credit × (1 − corporate rate)); election due on a timely-filed original return.' },
      { type: 'IRC', cite: 'IRC §174A', note: 'OBBBA (P.L. 119-21): immediate expensing of domestic research or experimental expenditures restored for tax years beginning after 12/31/2024; foreign R&E remains 15-year under §174.' },
      { type: 'Reg', cite: 'Reg. §1.41-4', note: 'Qualified research requirements, process-of-experimentation standard, and recordkeeping — contemporaneous documentation is expected.' },
      { type: 'Case', cite: 'Siemer Milling Co. v. Comm\'r, T.C. Memo 2019-37', note: 'Credit denied for failure to document a process of experimentation — activities described only in general terms. The documentation cautionary tale.' },
      { type: 'Admin', cite: 'Form 6765 (and instructions)', note: 'Credit computation, ASC and §280C elections, and expanded qualitative reporting requirements for business components on recent revisions of the form.' }
    ],
    requirements: [
      'Domestic research activities that satisfy all four prongs of §41(d) — documented at the business-component level.',
      'Contemporaneous documentation: project lists, wage allocations by employee, experimentation records (design iterations, test logs, versions).',
      'A credible credit study (in-house or third party) mapping expenses to qualified activities — not a percentage-of-payroll guess.',
      '§280C(c) reduced-credit election made on a timely-filed original return, or the deduction add-back computed.',
      'For the payroll offset: qualified small business status under §41(h) and the election on Form 6765 attached to the income tax return.'
    ],
    risks: [
      'The IRS actively targets credit mills that sell studies claiming inflated wage percentages with no experimentation evidence — R&D claims have appeared in IRS Dirty Dozen warnings. Exam risk is documentation risk.',
      'Recent Form 6765 revisions demand more granular business-component reporting; thin studies that could hide behind a single number no longer can.',
      'The credit is nonrefundable against income tax (this tool applies it after the child tax credit); unused amounts carry back 1 year and forward 20 under §39 — carryovers are not modeled here.',
      'Funded research (paid by a customer or grant with rights/payment contingencies) and research after commercial production do not qualify — common overclaim areas.',
      'Missing the §280C(c) election on the original return forces the deduction add-back, which is generally worse for pass-through owners in top brackets.'
    ],
    bestFit: [
      'Businesses developing or materially improving products, software, processes, or formulas with U.S.-based technical staff.',
      'Pre-revenue or low-income startups (under $5M receipts) that can monetize the credit against payroll tax immediately.',
      'Owners already paying for engineering, development, or lab work who have never had a formal credit study.'
    ],
    implementation: [
      'Scope qualified activities against the §41(d) four-part test; rule out funded research and post-commercial-production work.',
      'Commission or prepare a credit study: identify business components, allocate W-2 wages, supplies, and contract research (65%).',
      'Choose regular vs. ASC method; run both in the study and pick the larger sustainable credit.',
      'Make the §280C(c) reduced-credit election on Form 6765 with the timely-filed original return (do not miss this deadline).',
      'If a qualified small business, elect the §41(h) payroll offset on Form 6765 and claim it on Form 8974 with Form 941.',
      'Retain the study, wage allocations, and experimentation records in the permanent file for exam support.'
    ]
  },

  client: {
    teaser: 'A dollar-for-dollar reward for work your business may already be doing',
    headline: 'Get paid back for innovating',
    plainEnglish: [
      'If your business spends money making its products, software, or processes better — designing, prototyping, testing, improving — the tax law rewards that work with a credit. A credit is better than a deduction: it reduces your tax bill dollar for dollar.',
      'You do not need a laboratory or people in white coats. Manufacturers refining a production process, contractors engineering solutions to site problems, and companies building software all commonly qualify. What matters is that your team is solving technical problems by testing and refining, and that we can document it.',
      'The key is a proper study: we identify which projects qualify, how much of your payroll and supplies went into them, and we build the paper trail that supports the number. Done right, this credit can come back year after year.'
    ],
    analogy: 'Think of it as a rebate on your problem-solving payroll — the government reimburses part of what you already pay your team to figure things out.',
    benefits: [
      'Cuts your tax bill dollar for dollar — not just a deduction',
      'Rewards work you are likely already paying for',
      'Newer businesses can even use it against payroll taxes before they owe income tax',
      'Repeats every year you keep innovating'
    ],
    steps: [
      'We interview you about your projects and identify what qualifies',
      'We (or a specialist firm we work with) build the study and the documentation',
      'We claim the credit on your return and make the right elections',
      'You keep the study — it is your audit support'
    ],
    considerations: [
      'This credit gets IRS attention, so the documentation has to be real — we only claim what we can support.',
      'The benefit depends on how much qualifying work you actually do; we quantify it before you pay for a study.'
    ]
  },

  inputs: [
    { key: 'creditAmount', label: 'Net R&D credit (after §280C, per study)', type: 'currency', default: 25000 }
  ],

  appliesTo: function (profile) {
    return true; // credit amount comes from the advisor's study; validated by entry
  },

  /**
   * Adds the advisor-entered NET credit (after the §280C(c) reduced-credit
   * election or deduction add-back — computed in the credit study, not here)
   * to otherCredits. The engine applies otherCredits nonrefundably after the
   * child tax credit. §39 carryback/carryforward of unused credit not modeled.
   * The same credit is applied in each projection year — reduce or zero it
   * if the research spend is not expected to recur.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = Math.max(0, params.creditAmount || 0);
    p.otherCredits = (p.otherCredits || 0) + amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' R&D credit applied (nonrefundable). ' +
        'Enter the NET figure after the §280C(c) reduced-credit election or ' +
        'deduction add-back — the model does not separately adjust the wage deduction.');
      notes.push('Projection applies the same credit each year — adjust if the ' +
        'qualified research spend is one-time or variable. Unused credit ' +
        'carryovers (§39) are not modeled.');
    }
    return { profile: p, notes: notes };
  }
});
