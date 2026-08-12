/* ============================================================================
 * STRATEGY: Section 127 Educational Assistance
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'section-127-education',
  name: 'Section 127 Educational Assistance',
  category: 'Health & Fringe',
  applyOrder: 78,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A written §127 educational assistance program lets an employer pay up ' +
      'to $5,250 per employee per year for tuition, fees, books, and supplies ' +
      '— excluded from the employee\'s income and FICA wages, deductible to ' +
      'the business. The education need not be job-related (contrast §132(d) ' +
      'working-condition fringe). Since 2020 the exclusion also covers ' +
      'payments of principal and interest on the employee\'s qualified ' +
      'education LOANS — OBBBA made that permanent and indexes the $5,250 ' +
      'after 2026. The honest limitation for owner clients: §127(b)(3) caps ' +
      'benefits to the >5%-owner class — including their spouses AND ' +
      'dependents — at 5% of total benefits paid, so owners generally cannot ' +
      'run their own (or their dependent children\'s) education through the ' +
      'plan. The clean owner-family play is an adult child on payroll who is ' +
      'NOT a dependent and owns no stock: they are outside the restricted ' +
      'class, and their tuition or student-loan payments qualify.',
    mechanics: [
      'Written plan; exclusive benefit of employees; no more than 5% of ' +
      'benefits to >5% shareholders/owners or their spouses or dependents; ' +
      'no choice between benefits and other taxable compensation; reasonable ' +
      'notice to eligible employees (§127(b)).',
      'Covers tuition, fees, books, supplies, and equipment for education at ' +
      'any level — undergraduate, graduate, courses unrelated to the job. ' +
      'Excludes meals/lodging/transportation, tools the employee keeps, and ' +
      'most sports/hobby courses.',
      'Student loan payments (principal AND interest) on the employee\'s ' +
      'qualified education loans count toward the same $5,250 — made ' +
      'permanent by OBBBA; the cap is inflation-indexed after 2026.',
      'Excluded amounts escape income tax and FICA (both halves) — for the ' +
      'business, roughly a 7.65% employer-payroll-tax saving versus paying ' +
      'the same amount as wages.',
      'Who benefits in an owner-family plan: rank-and-file employees, and ' +
      'owner\'s adult children on payroll ONLY IF the child is not a ' +
      'dependent and holds no ownership (the §127(b)(3) restricted class is ' +
      'owners plus their spouses and dependents). A dependent child on ' +
      'payroll is inside the restricted class — do not promise this for ' +
      'college-age dependents.',
      'Employer deducts the payments as ordinary compensation-type expense; ' +
      'amounts within §127 do not appear in W-2 Boxes 1/3/5.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §127', note: 'The exclusion: $5,250/employee/year; written-plan and notice requirements; benefits, not job-related-ness, define eligibility.' },
      { type: 'IRC', cite: 'IRC §127(b)(3)', note: 'The owner limitation: no more than 5% of benefits paid may go to >5% shareholders/owners, their spouses, or dependents.' },
      { type: 'IRC', cite: 'IRC §127(c)(1)(B)', note: 'Student loan payments (principal and interest) as educational assistance — made permanent by OBBBA (P.L. 119-21), with the $5,250 indexed after 2026.' },
      { type: 'IRC', cite: 'IRC §3121(a)(18)', note: 'FICA wage exclusion for §127 amounts — the payroll-tax layer of the benefit.' },
      { type: 'IRC', cite: 'IRC §132(d); §162', note: 'Fallback for job-related education beyond $5,250: working-condition fringe with no dollar cap, but a strict job-relatedness standard.' },
      { type: 'IRC', cite: 'IRC §221(e)(1)', note: 'No student loan interest deduction for interest paid by the employer under §127 — no double benefit.' }
    ],
    requirements: [
      'A separate written plan document adopted before benefits are paid, with reasonable notification to eligible employees.',
      'Benefits limited to $5,250 per employee per year (2026; indexed thereafter); excess is taxable wages.',
      'The 5% concentration test: benefits to >5% owners, their spouses, and dependents must not exceed 5% of total benefits paid for the year.',
      'No cash-or-benefit choice — the program cannot be offered as an alternative to taxable compensation.',
      'For owner-family use: the employed child must be a bona fide employee, a non-dependent, and hold no equity (watch attribution).'
    ],
    risks: [
      'The owner-concentration test is fractional: if the ONLY user of the plan is an owner-class person, 100% of benefits went to the restricted class and the exclusion fails for them. Solo owners cannot self-fund an MBA this way.',
      'Dependent children are inside the restricted class — a plan pitched as "pay your college kid\'s tuition tax-free" fails if the child is still a dependent.',
      'Bona fide employment of the child is the exam companion issue: real duties, reasonable wages, payroll filings.',
      'Payments above $5,250 are W-2 wages unless independently excludable as §132(d) job-related education.',
      'Employer-paid loan interest under §127 kills the employee\'s §221 interest deduction for the same dollars — small, but do not double-count.'
    ],
    bestFit: [
      'Businesses with non-owner employees pursuing degrees or carrying student loans — a high-perceived-value benefit at modest cost.',
      'Owner clients with adult, non-dependent children legitimately working in the business who have tuition or student loans.',
      'Employers competing for younger staff where a student-loan-payment benefit is a differentiator.'
    ],
    implementation: [
      'Adopt the written §127 plan (define eligible class, annual cap, covered benefits including loan payments); notify employees.',
      'For owner-family use: confirm the child is a non-dependent, equity-free, bona fide employee with reasonable wages and payroll records.',
      'Collect substantiation (tuition bills, registrar records, loan statements) before each payment.',
      'Track per-employee benefits against the $5,250 cap; run the 5% owner-concentration test at year-end.',
      'Deduct payments on the business return; keep §127 amounts out of W-2 wage boxes.',
      'After 2026, update the plan cap for indexing.'
    ]
  },

  client: {
    teaser: 'Turn education bills into a business deduction — without the recipient paying a dime of tax',
    headline: 'Let the business pay for education, tax-free',
    plainEnglish: [
      'The tax law lets a business set up a formal education benefit: up to $5,250 per employee, per year, for tuition, books, fees — and now student loan payments too. The business deducts it, and the employee pays no tax on it. It even skips payroll taxes, which a normal raise would not.',
      'Here is the honest part: the rules are deliberately written so owners cannot funnel this benefit to themselves, their spouses, or the children they claim on their tax return. So if you were hoping to run your own dependent college student\'s tuition through the business — this is not the tool for that.',
      'Where it shines: employees you already want to help with school or student debt, and adult children who genuinely work in your business and are no longer your dependents. For them, tuition or student loan payments become a clean business deduction and tax-free money to them — a real family win when the facts fit.'
    ],
    analogy: 'A $5,250 raise gets taxed before it can touch a tuition bill. This benefit sends the same dollars straight to the school — no tax toll on the way.',
    benefits: [
      'Up to $5,250 per employee, per year — deductible to the business, tax-free to them',
      'Now covers student loan payments, not just tuition — permanently',
      'Skips payroll taxes on both sides, unlike a raise',
      'A standout perk for hiring and keeping good people'
    ],
    steps: [
      'We check who in your situation can actually benefit — honestly, before promising numbers',
      'We put the required written plan in place',
      'The business pays the school or loan servicer and keeps the records',
      'We handle the deduction and the payroll treatment at year-end'
    ],
    considerations: [
      'The rules block owners, spouses, and dependent children from taking this benefit themselves in almost every case — we will tell you plainly if that is you.',
      'An adult child using this must be a real employee doing real work, no longer claimed as your dependent.',
      'The benefit caps at $5,250 per person per year; amounts above that are taxable wages.'
    ]
  },

  inputs: [
    { key: 'annualAssistance', label: 'Annual §127 assistance paid (per plan)', type: 'currency', default: 5250, max: 5250 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Models the EMPLOYER deduction: payments reduce business income (SE tax
   * saved when Schedule C). The recipient-side exclusion is not modeled —
   * consistent with the §127(b)(3) reality that the benefit flows to
   * non-owner-class employees, whose returns this engine does not compute.
   * Capped at the per-employee 2026 limit from the tables (single-recipient
   * assumption; a multi-employee plan can exceed this in aggregate — the
   * advisor should enter total plan cost and note it).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var fr = TSIQ.TABLES_2026.limits.fringe;
    var amt = Math.min(params.annualAssistance || 0, fr.educationAssistance);
    if ((params.annualAssistance || 0) > fr.educationAssistance) {
      notes.push('Capped at the §127 per-employee limit of ' + TSIQ.fmt.usd(fr.educationAssistance) + ' (2026; indexed after 2026).');
    }
    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' §127 educational assistance deducted against Schedule C income (also reduces SE tax).');
      }
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' §127 educational assistance deducted against pass-through income.');
      }
    } else {
      notes.push('Requires an operating business with an eligible employee — no business income found in this profile. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    if (yearIndex === 0) {
      notes.push('§127(b)(3): owners, spouses, and DEPENDENTS are effectively excluded from receiving benefits — the recipient must be a non-owner-class employee (e.g., non-dependent adult child on payroll).');
    }
    return { profile: p, notes: notes };
  }
});
