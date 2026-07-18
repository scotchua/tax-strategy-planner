/* ============================================================================
 * STRATEGY: ICHRA
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'ichra',
  name: 'ICHRA',
  category: 'Health & Fringe',
  applyOrder: 74,
  modeled: true,

  advisor: {
    summary:
      'An Individual Coverage HRA — created by the 2019 tri-agency final ' +
      'regulations (Treasury/DOL/HHS) — lets an employer of ANY size reimburse ' +
      'employees for individual-market health insurance premiums and §213(d) ' +
      'medical expenses, tax-free to the employee and deductible to the ' +
      'business, with NO statutory dollar cap. The ACA integration problem is ' +
      'solved by requiring each covered employee to actually be enrolled in ' +
      'individual-market coverage (or Medicare). Employers may vary the ' +
      'benefit across defined employee classes (full-time/part-time, salaried/ ' +
      'hourly, geographic rating area, seasonal, etc.), but within a class the ' +
      'offer must be on the same terms, and no employee may be offered a ' +
      'choice between the ICHRA and a traditional group plan. As with all ' +
      '§105/§106 arrangements, self-employed individuals, partners, and >2% ' +
      'S-corp shareholders cannot participate tax-free — C-corp owner-employees ' +
      'can. Modeled benefit here is the employer\'s deduction for reimbursements.',
    mechanics: [
      'Employer sets a monthly/annual reimbursement allowance per class; ' +
      'employees substantiate individual-market enrollment and expenses; ' +
      'reimbursements are excluded under §106/§105(b) and deductible under §162.',
      'No dollar cap (unlike QSEHRA) and no employer-size limit — an ICHRA ' +
      'can even satisfy an applicable large employer\'s §4980H offer-of-coverage ' +
      'obligation if the allowance makes individual coverage "affordable."',
      'Permitted classes come from the regulations (Reg. §54.9802-4): e.g., ' +
      'full-time, part-time, seasonal, salaried, non-salaried, geographic ' +
      'rating area, waiting-period employees. Minimum class sizes apply to ' +
      'certain classes when a traditional group plan is offered to another ' +
      'class, to prevent risk-shifting to the exchanges.',
      'Employees offered an affordable ICHRA lose premium tax credit ' +
      'eligibility; employees must be allowed to opt out annually to preserve ' +
      'a PTC claim if the offer is unaffordable.',
      'Amounts vary within a class only by age (up to a 3:1 ratio, tracking ' +
      'individual-market pricing) and family size.',
      'Owner participation: C-corp owner-employees participate tax-free like ' +
      'any employee; >2% S-corp shareholders (§1372 partner treatment) and ' +
      'Schedule C owners/partners cannot — their side routes through §162(l) ' +
      'instead.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §54.9802-4', note: 'The ICHRA regulation: permitted employee classes, same-terms rule, individual-coverage enrollment requirement, opt-out right (2019 tri-agency final rule).' },
      { type: 'IRC', cite: 'IRC §106; §105(b)', note: 'Exclusion of employer-provided coverage and medical reimbursements from employee income.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Employer deduction for reimbursements.' },
      { type: 'IRC', cite: 'IRC §36B', note: 'PTC coordination — an affordable ICHRA offer bars the employee\'s premium tax credit; unaffordable offers permit opt-out and PTC.' },
      { type: 'IRC', cite: 'IRC §1372', note: '>2% S-corp shareholders treated as partners — excluded from tax-free participation.' },
      { type: 'Admin', cite: 'Notice 2018-88', note: 'Early IRS guidance on ICHRA interaction with §4980H employer mandate and §105(h) nondiscrimination.' }
    ],
    requirements: [
      'Every participating employee (and covered dependents) must actually be enrolled in individual-market coverage or Medicare — substantiated at enrollment and per reimbursement.',
      'Written plan document; classes drawn only from the regulation\'s permitted list; same terms within each class (age/family-size variation only).',
      'No employee class may be offered both the ICHRA and a traditional group plan as a choice.',
      '90-day advance annual notice to eligible employees (PTC interaction and opt-out disclosures).',
      'Minimum class sizes where a group plan covers another class.'
    ],
    risks: [
      'Substantiation failures (reimbursing employees who dropped their individual coverage) make reimbursements taxable and threaten plan status.',
      'Class design that flunks the regulation — improvised classes, or minimum-class-size violations — exposes the plan to group-health-plan failures (§4980D, $100/employee/day).',
      'For ALEs, an unaffordable ICHRA allowance can trigger §4980H(b) penalties when employees decline and take the PTC.',
      'Employees lose premium tax credits under an affordable offer — for low-wage workforces the ICHRA can be worth less to employees than the subsidies they give up. Model the workforce before switching.',
      'Owner-side expectations: no tax-free self-reimbursement for S-corp >2% shareholders or Schedule C owners.'
    ],
    bestFit: [
      'Employers of any size replacing (or declining to start) a group plan while keeping benefits budget-controlled.',
      'Workforces spread across states or rating areas where one group policy fits badly.',
      'Employers wanting different benefit levels for defined classes (e.g., full-time vs. seasonal).',
      'C-corps whose owner-employees also want tax-free participation.'
    ],
    implementation: [
      'Survey the workforce: current coverage, wage levels, and PTC exposure — decide whether an ICHRA beats group coverage or a QSEHRA.',
      'Design classes strictly from the permitted list; set allowances (age/family-size curves permitted); check minimum class sizes if any group plan remains.',
      'Adopt the plan document; deliver the 90-day notice; engage a TPA for enrollment substantiation and reimbursements.',
      'For ALEs: run the affordability calculation so the ICHRA satisfies §4980H.',
      'Deduct reimbursements on the business return; monitor substantiation monthly.',
      'Revisit allowances annually against individual-market premium changes.'
    ]
  },

  client: {
    teaser: 'Set a health-benefits budget you control — and let every employee pick the coverage that fits',
    headline: 'A health benefit with a fixed budget and no group plan',
    plainEnglish: [
      'Traditional group health insurance means one plan for everyone, premiums that jump every year, and a renewal negotiation you always lose. There is a newer alternative: your business gives each employee a set monthly allowance, tax-free, to spend on the health plan they choose for themselves on the individual market.',
      'For the business, every dollar is deductible and the budget is fixed — you decide the allowance, so there are no surprise renewal increases. For employees, the money is tax-free and they keep coverage that is theirs, not tied to the job.',
      'The rules let you set different allowance levels for different groups of employees — full-time versus part-time, for example — as long as everyone in a group is treated the same. Larger companies can use it too; there is no size limit and no cap on the allowance.'
    ],
    analogy: 'Instead of buying one bus everyone has to ride, you give each person a transportation allowance and let them pick the ride that actually gets them where they live.',
    benefits: [
      'Fully deductible to the business, tax-free to employees',
      'You set the budget — no more group-plan renewal shock',
      'Works for a business of any size, with no cap on the benefit',
      'Different benefit levels allowed for different employee groups'
    ],
    steps: [
      'We compare this against your current coverage costs and your team\'s situation',
      'We design the employee groups and allowance levels',
      'We put the plan documents and required notices in place, with a simple administration system',
      'Employees enroll in their own coverage and get reimbursed each month'
    ],
    considerations: [
      'Every participating employee must carry their own individual health policy — the reimbursement depends on it.',
      'For lower-wage employees, government premium subsidies can be worth more than the allowance — we run that math before recommending a switch.',
      'Owner participation depends on how your business is structured; S-corporation owners generally cannot use it for themselves, and we plan around that.'
    ]
  },

  inputs: [
    { key: 'annualReimbursement', label: 'Total annual reimbursements to employees', type: 'currency', default: 8000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Models the EMPLOYER deduction only: reimbursements reduce business income.
   * Against scheduleCNet this also saves SE tax; against passthroughK1 it
   * does not. Owner-side tax-free participation (C-corp only) is not modeled.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var amt = params.annualReimbursement || 0;
    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' ICHRA reimbursements deducted against Schedule C income (also reduces SE tax).');
      }
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' ICHRA reimbursements deducted against pass-through income.');
      }
    } else {
      notes.push('ICHRA requires an operating business with employees — no business income found in this profile. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    if (yearIndex === 0) {
      notes.push('Employees must maintain individual-market coverage; >2% S-corp shareholders cannot participate tax-free. Employer deduction only is modeled.');
    }
    return { profile: p, notes: notes };
  }
});
