/* ============================================================================
 * STRATEGY: Section 105 Medical Reimbursement Plan (Spouse Employee)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'section-105-merp',
  name: 'Section 105 Medical Reimbursement Plan (Spouse Employee)',
  category: 'Health & Fringe',
  applyOrder: 75,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'The classic sole-proprietor play: the Schedule C owner hires their ' +
      'spouse as a bona fide employee and adopts a written §105 medical ' +
      'reimbursement plan covering employees and their FAMILIES. The ' +
      'employee-spouse\'s family coverage sweeps in the owner (as the ' +
      'employee\'s spouse) and the children — so the household\'s medical ' +
      'costs (premiums, deductibles, dental, vision, out-of-pockets) become ' +
      '§162 business deductions on Schedule C, saving both income tax AND ' +
      'SE tax. That SE-tax layer is what elevates this over the §162(l) ' +
      'self-employed health insurance deduction, which saves income tax only. ' +
      'Rev. Rul. 71-588 blesses the structure; the audit battleground is ' +
      'whether the spouse\'s employment is bona fide. A one-employee plan is ' +
      'exempt from the ACA market reforms (§9831(a)(2)), keeping compliance ' +
      'simple as long as the spouse is the only participant.',
    mechanics: [
      'Spouse performs real services (bookkeeping, scheduling, administration) ' +
      'for the Schedule C business as a W-2 employee; the written §105 plan ' +
      'provides medical expense reimbursement for employees, their spouses, ' +
      'and dependents.',
      'Reimbursements of §213(d) expenses are excluded from the spouse\'s ' +
      'income under §105(b) and are not FICA wages; the business deducts them ' +
      'as employee benefits on Schedule C — reducing net SE earnings.',
      'Because the plan covers the employee\'s FAMILY, the owner\'s own medical ' +
      'costs ride through as the spouse of the employee — this is the ' +
      'Rev. Rul. 71-588 architecture.',
      'Stacks against §162(l): the SE health insurance deduction is ' +
      'above-the-line only (no SE tax savings) and covers premiums only; the ' +
      '§105 plan converts premiums AND out-of-pockets into Schedule C ' +
      'deductions with SE tax savings. Do not double-count premiums under both.',
      'With only the spouse participating, the plan has fewer than two ' +
      'current-employee participants and is exempt from the ACA market ' +
      'reforms under §9831(a)(2) — no integration issue.',
      'Spouse wages must be reasonable for the services; total compensation ' +
      '(wages + benefits) must be defensible against hours and duties.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §105(b)', note: 'Exclusion for employer reimbursements of medical expenses of the employee, spouse, and dependents — the family sweep that carries the owner.' },
      { type: 'IRC', cite: 'IRC §106(a)', note: 'Exclusion for employer-provided accident/health coverage.' },
      { type: 'Reg', cite: 'Reg. §1.105-5', note: 'Definition of an accident or health plan — a written plan for employees is required; the plan need not be insured.' },
      { type: 'Admin', cite: 'Rev. Rul. 71-588', note: 'The controlling ruling: sole proprietor\'s spouse-employee covered by the business medical plan; reimbursements (including for the owner as family member) excludable and deductible.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Business deduction for the reimbursements as compensation/employee-benefit expense.' },
      { type: 'IRC', cite: 'IRC §9831(a)(2)', note: 'Plans with fewer than two current-employee participants are exempt from the ACA group-market reforms.' },
      { type: 'IRC', cite: 'IRC §105(h)', note: 'Self-insured plan nondiscrimination — becomes live if the business has other employees who are excluded.' }
    ],
    requirements: [
      'A Schedule C business (or farm) — the structure fails for S-corps as to >2% shareholders\' families (§1372 attribution).',
      'Bona fide employment: real services, contemporaneous time records, reasonable W-2 wages actually paid (payroll filings: 941/940/W-2).',
      'A written §105 plan document adopted BEFORE expenses are reimbursed, covering employees and family.',
      'Actual reimbursement mechanics: spouse submits receipts; business pays from the business account; records retained.',
      'If other employees exist, the plan must cover them per its eligibility terms — §105(h) discrimination testing applies.'
    ],
    risks: [
      'Bona fide employment is THE exam issue: no time records, no real duties, or wages never actually paid have sunk these plans in Tax Court repeatedly. Paper the employment like you would for a stranger.',
      'Adopting the plan document after the fact — reimbursements before adoption are not made under a plan and are taxable.',
      'Other employees: excluding them invites §105(h) discrimination taxation and morale/legal issues; covering them changes the economics.',
      'Owner cannot be the employee: reimbursing the owner directly (not as the employee-spouse\'s family member) fails — the sole proprietor is not their own employee.',
      'Overlap error: deducting the same premiums under both §162(l) and the §105 plan.'
    ],
    bestFit: [
      'Married sole proprietors with no (or few) other employees and meaningful family medical costs — high-deductible years, orthodontics, therapy, fertility, etc.',
      'A spouse who genuinely works in the business (or credibly can).',
      'High-SE-income households where the 15.3%/2.9% SE layer makes the incremental savings material.'
    ],
    implementation: [
      'Document the spouse\'s role: written job description, hours log, reasonable wage; run real payroll (Forms 941, 940, W-2).',
      'Adopt the written §105 plan (effective date BEFORE any reimbursements) covering employees and their families; set an annual reimbursement cap.',
      'Have the spouse submit receipts/EOBs; reimburse by check or transfer from the business account; keep a reimbursement log.',
      'Deduct reimbursements on Schedule C (employee benefit programs); do not also claim the same premiums under §162(l).',
      'If the business has other employees, run §105(h) eligibility analysis before adopting.',
      'Review annually: wages still reasonable, plan cap still appropriate, participant count still under the market-reform exemption.'
    ]
  },

  client: {
    teaser: 'Turns your family\'s medical bills into business deductions — including the payroll-tax layer most deductions miss',
    headline: 'Make your family\'s medical costs a business expense',
    plainEnglish: [
      'If you run your own unincorporated business and your spouse works in it — handling the books, scheduling, paperwork — the tax law offers something powerful: the business can adopt a formal medical plan for its employees and their families. Your spouse is the employee. Their family is you and your kids.',
      'That means the medical bills your family already pays — insurance premiums, deductibles, dental, vision, glasses, copays — can be reimbursed by the business and deducted as a business expense. And because this deduction comes off your business profit, it saves not just income tax but self-employment tax too, which most health-cost deductions cannot do.',
      'The catch is that this must be real: your spouse genuinely working, real paychecks, a written plan set up before the reimbursements start, and receipts for everything. Done properly, it has been approved by the IRS for over fifty years. Done sloppily, it is one of the first things an auditor picks apart — so we do the paperwork right.'
    ],
    analogy: 'Normally, medical bills are paid with money the tax collector has already taken a bite of. This plan lets the business pay them first — before that bite happens, and before the self-employment tax bite too.',
    benefits: [
      'Family medical costs become business deductions',
      'Saves self-employment tax on top of income tax — a layer most strategies miss',
      'Covers what insurance does not: deductibles, dental, vision, out-of-pockets',
      'IRS-recognized structure with decades of history'
    ],
    steps: [
      'We confirm your spouse\'s role in the business and set up proper payroll',
      'We put the written medical plan in place before any money moves',
      'Your spouse submits the family\'s medical receipts; the business reimburses them',
      'We take the deduction and keep the records audit-ready'
    ],
    considerations: [
      'Your spouse\'s job must be genuine — real work, real hours, real paychecks. This is the single thing auditors test, so we document it thoroughly.',
      'If the business has other employees, the plan generally has to include them, which changes the math — we check that first.',
      'This structure fits unincorporated businesses; if yours is an S-corporation, we use different strategies instead.'
    ]
  },

  inputs: [
    { key: 'annualMedicalReimbursed', label: 'Annual family medical costs reimbursed', type: 'currency', default: 15000 }
  ],

  appliesTo: function (profile) {
    return true; // needs Schedule C income; validated with a note in apply()
  },

  /**
   * Deducts reimbursed family medical costs against scheduleCNet — capturing
   * both income tax and SE tax savings (the point of the strategy). Requires
   * Schedule C income; the spouse's W-2 wage cost is assumed already
   * reflected or de minimis (not separately modeled). Do not stack the same
   * premiums with the SE health insurance strategy.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualMedicalReimbursed || 0;
    if (!(p.scheduleCNet > 0)) {
      notes.push('Requires a Schedule C (sole proprietorship) with net profit — the spouse-employee §105 plan does not work for S-corp >2% shareholders. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    p.scheduleCNet = p.scheduleCNet - amt;
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' family medical costs reimbursed under the §105 plan and deducted on Schedule C — saves income tax AND SE tax.');
      notes.push('Requires bona fide spouse employment (payroll, time records) and a written plan adopted before reimbursements. Do not also model the same premiums under SE Health Insurance.');
    }
    return { profile: p, notes: notes };
  }
});
