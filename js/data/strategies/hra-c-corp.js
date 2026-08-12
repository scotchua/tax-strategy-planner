/* ============================================================================
 * STRATEGY: HRA for C-Corps
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'hra-c-corp',
  name: 'HRA for C-Corps',
  category: 'Health & Fringe',
  applyOrder: 72,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A Health Reimbursement Arrangement is an employer-funded plan that ' +
      'reimburses employees for medical care: the corporation deducts the ' +
      'reimbursements under §162, and the employee excludes them under §105(b) ' +
      'and §106(a) — no income tax, no FICA. The C-corp is the uniquely clean ' +
      'chassis: a C-corp owner-employee is simply an employee and participates ' +
      'tax-free, whereas a >2% S-corp shareholder is treated as a partner under ' +
      '§1372 and cannot exclude the benefit (their premiums land on the W-2 and ' +
      'route through §162(l) instead). The compliance gate is the ACA market ' +
      'reforms (Notice 2013-54): a standalone HRA covering two or more ' +
      'employees generally must be integrated with group coverage or fit a ' +
      'sanctioned design (QSEHRA, ICHRA, excepted-benefit HRA) — the exposure ' +
      'for getting this wrong is the §4980D excise tax of $100 per employee ' +
      'per day. Advisory-only: the dollar benefit depends on entity structure ' +
      'and actual medical spend, so it is quantified in the entity design, not ' +
      'modeled from return inputs here.',
    mechanics: [
      'Corporation adopts a written §105 plan; reimbursements of §213(d) ' +
      'medical expenses (and, if designed in, individual premiums where the ' +
      'HRA type permits) are deductible to the corporation and excluded from ' +
      'the employee\'s income and FICA wages.',
      'C-corp owner-employees participate on the same footing as any employee ' +
      '— the double-tax structure that usually penalizes C-corps works FOR the ' +
      'owner here: family medical costs become corporate deductions with no ' +
      'shareholder-level income.',
      'Contrast: >2% S-corp shareholders (and their spouses/dependents via ' +
      'attribution) are barred from tax-free participation by §1372; partners ' +
      'are barred as self-employed persons. This strategy is a reason clients ' +
      'with heavy family medical costs sometimes keep or create a C-corp.',
      'ACA market reforms (PHSA §2711 annual-limit ban and §2713 preventive ' +
      'mandate, imported into the Code): a standalone HRA covering 2+ ' +
      'employees violates them unless integrated with a group health plan or ' +
      'structured as a QSEHRA, ICHRA, or excepted-benefit HRA. A one-employee ' +
      'plan is exempt (§9831(a)(2)).',
      'Self-insured plan nondiscrimination under §105(h): if the HRA favors ' +
      'highly compensated individuals as to eligibility or benefits, the HCI\'s ' +
      'excess reimbursements become taxable — cover a nondiscriminatory class ' +
      'or accept taxation of the discriminatory excess.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §105(b)', note: 'Exclusion for employer reimbursements of medical care expenses of the employee, spouse, and dependents.' },
      { type: 'IRC', cite: 'IRC §106(a)', note: 'Exclusion for employer-provided accident and health coverage — the plan itself is tax-free.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Corporate deduction for reimbursements and plan costs as ordinary and necessary compensation expense.' },
      { type: 'IRC', cite: 'IRC §105(h)', note: 'Nondiscrimination rules for self-insured medical reimbursement plans; discriminatory excess is taxable to highly compensated individuals.' },
      { type: 'IRC', cite: 'IRC §1372', note: 'Why S-corps fail here: >2% shareholders are treated as partners for fringe benefit purposes.' },
      { type: 'Admin', cite: 'Notice 2013-54', note: 'ACA market-reform analysis: standalone HRAs (2+ employees) must be integrated with group coverage or fit an excepted design.' },
      { type: 'IRC', cite: 'IRC §4980D', note: 'Excise tax — $100 per affected employee per day — for group health plan failures, the penalty behind the market-reform rules.' },
      { type: 'IRC', cite: 'IRC §9831(a)(2)', note: 'Plans with fewer than two current-employee participants are exempt from the market reforms.' }
    ],
    requirements: [
      'A C-corporation with the owner on payroll as a bona fide W-2 employee.',
      'A written plan document adopted before expenses are reimbursed, with a defined employee class and reimbursement limits.',
      'ACA compliance path: one-employee exemption, integration with group coverage, or a sanctioned HRA design (QSEHRA/ICHRA/excepted-benefit).',
      'Substantiation of every reimbursement (receipts/EOBs) before payment.',
      '§105(h) nondiscrimination testing if self-insured and covering a broader workforce.'
    ],
    risks: [
      'Market-reform failure is the big one: §4980D at $100/employee/day — $36,500 per employee per year — dwarfs any tax benefit. Design the compliance path first.',
      '§105(h) discrimination converts the owner\'s excess reimbursements to taxable income.',
      'Reimbursing without substantiation, or reimbursing non-§213(d) items, collapses the exclusion for amounts paid.',
      'If the corporation exists mostly to launder personal medical costs with no business substance, §162 deductibility itself is exposed.',
      'C-corp double taxation on other earnings — do not let the HRA tail wag the entity-choice dog.'
    ],
    bestFit: [
      'Existing C-corps with owner-employees and significant recurring family medical costs.',
      'Clients weighing entity choice where heavy medical spend tilts the C-corp math.',
      'Small C-corps whose only participant is the owner (one-employee exemption) or that already sponsor group coverage to integrate with.'
    ],
    implementation: [
      'Confirm entity type and the owner\'s W-2 employee status; verify reasonable compensation overall.',
      'Choose the ACA compliance path: one-employee plan, integration with the group policy, or a QSEHRA/ICHRA/excepted-benefit design.',
      'Adopt the written plan document and corporate resolution before the first reimbursement; set the annual limit and covered class.',
      'Run reimbursements through a substantiation process (third-party administrator recommended once non-owner employees participate).',
      'Deduct on Form 1120; keep reimbursements off the W-2; retain substantiation for exam.',
      'Re-test §105(h) annually as headcount changes.'
    ]
  },

  client: {
    teaser: 'A way for your company to pay the medical bills you were paying anyway — with pre-tax dollars',
    headline: 'Let your corporation pay your family\'s medical bills — deductibly',
    plainEnglish: [
      'If your business is set up as a regular corporation, there is a benefit available to you that most business owners never use: the corporation can adopt a formal plan to reimburse its employees for medical costs — doctor visits, prescriptions, dental, vision, deductibles. Those reimbursements are a deductible business expense for the company, and the employee pays no tax on them.',
      'Here is the part that matters: as the owner working in your own corporation, YOU are one of those employees. Medical bills your family was going to pay anyway, with money that had already been taxed, can instead be paid by the company with money that never gets taxed at all.',
      'The rules about how the plan is set up matter a great deal — health-care law limits how these plans can be designed, and the penalties for a sloppy plan are severe. Done properly, with the right paperwork in place first, it is a clean and well-established benefit.'
    ],
    analogy: 'It is like getting a permanent discount on every medical bill equal to your tax rate — because the money used to pay it never passes through your taxable income.',
    benefits: [
      'Family medical costs become deductible business expenses',
      'Reimbursements come to you free of income tax and payroll tax',
      'Covers costs insurance does not — deductibles, dental, vision, prescriptions',
      'Repeats every year for as long as the plan is in place'
    ],
    steps: [
      'We confirm your business structure qualifies and design the compliant plan type',
      'We put the written plan documents in place before any money moves',
      'You submit receipts; the company reimburses you',
      'We handle the deduction and records at tax time'
    ],
    considerations: [
      'This works cleanly for regular corporations — if your business is an S-corporation, the rules treat owners differently and we would use other strategies instead.',
      'The plan must be in writing, in place first, and every reimbursement backed by a receipt — the penalties for informal arrangements are large, so we do not cut corners.',
      'If you have other employees, the plan generally has to include them fairly, which changes the cost-benefit math.'
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
