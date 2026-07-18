/* ============================================================================
 * STRATEGY: Adding Spouse to Payroll
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'spouse-payroll',
  name: 'Adding Spouse to Payroll',
  category: 'Payroll & Family',
  applyOrder: 32,
  modeled: true,

  advisor: {
    summary:
      'Putting a working spouse on the business payroll is NOT an income-tax ' +
      'play on a joint return — the salary is deductible to the business and ' +
      'taxable as wages on the same 1040, a wash — and it affirmatively COSTS ' +
      'FICA (spouse wages are fully subject to Social Security and Medicare, ' +
      'though exempt from FUTA under §3306(c)(5)). The real value is what a ' +
      'W-2 unlocks: the spouse becomes eligible to defer up to $24,500 (2026, ' +
      'Notice 2025-67) into the company 401(k), doubling the household\'s ' +
      'tax-deferred capacity, plus employee fringe benefits, Social Security ' +
      'earnings credits, and dependent care FSA access. Model it honestly: ' +
      'the benefit is the deferral and the fringe access, net of the payroll ' +
      'tax cost — never the salary itself.',
    mechanics: [
      'Income-tax mechanics on MFJ: business income falls by the salary (plus ' +
      'the employer\'s 7.65% FICA share, also deductible under §162); wages ' +
      'rise by the same salary. Pre-deferral, taxable income barely moves.',
      'FICA cost is real and two-sided: 7.65% employer + 7.65% employee on ' +
      'the full salary (spouse below the wage base). Against this, deducting ' +
      'the salary from Schedule C also shrinks the owner\'s own SE base — a ' +
      'partial offset when the owner is under the Social Security wage base.',
      'The unlock: with W-2 compensation the spouse can make elective ' +
      'deferrals under §402(g) — $24,500 in 2026, plus the $8,000 age-50 ' +
      'catch-up — capped at their actual compensation. A $30,000 salary can ' +
      'shelter $24,500 of it.',
      'Secondary benefits: the spouse accrues Social Security quarters and ' +
      'earnings history in their own right, can receive employee fringe ' +
      'benefits, and W-2 comp supports dependent care FSA elections ($7,500 ' +
      'household limit, 2026).',
      'The salary must be reasonable for services actually rendered (§162) — ' +
      'a no-show salary fails the deduction and still owes the payroll tax.',
      'Traditional (pre-tax) deferrals are modeled here as an above-the-line ' +
      'reduction; Roth deferrals trade the current deduction for tax-free ' +
      'growth and may be preferable at lower marginal rates.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Salary and employer payroll taxes deductible only if reasonable compensation for services actually performed.' },
      { type: 'IRC', cite: 'IRC §3306(c)(5)', note: 'Wages paid to one\'s spouse are exempt from FUTA — but NOT from FICA; Social Security and Medicare apply in full.' },
      { type: 'IRC', cite: 'IRC §402(g)', note: 'Elective deferral limit — $24,500 for 2026 per Notice 2025-67 — available only to employees with compensation, which the W-2 creates.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 retirement plan COLAs: $24,500 elective deferral, $8,000 age-50 catch-up, $72,000 §415(c) annual additions.' },
      { type: 'IRC', cite: 'IRC §129', note: 'Dependent care assistance / DCFSA — requires earned income of both spouses; the W-2 supplies the spouse\'s earned income ($7,500 limit, 2026).' }
    ],
    requirements: [
      'The spouse performs genuine, documented services (bookkeeping, admin, scheduling, marketing) commensurate with the salary.',
      'Real payroll: W-4, withholding, Form 941 deposits, W-2 — not a year-end journal entry.',
      'A 401(k) or similar plan whose terms cover the spouse (check eligibility and coverage provisions).',
      'Salary set at a defensible market rate for the role and hours.'
    ],
    risks: [
      'Modeling the salary itself as savings is the classic error — on a joint return it is income-tax neutral and FICA-negative. The deferral is the benefit.',
      'Unreasonable compensation for minimal services risks deduction disallowance while the payroll taxes stick.',
      'Payroll compliance overhead (deposits, filings, state registration) has real cost — weigh against benefit at small salaries.',
      'If the spouse already has outside W-2 wages near the Social Security wage base, stacking another salary multiplies FICA cost with less marginal benefit — coordinate the §402(g) limit across all employers (it is per person, not per plan).',
      'Retirement plan nondiscrimination and coverage rules apply if there are other employees.'
    ],
    bestFit: [
      'Owners with a profitable business, a spouse doing real work, and a company retirement plan (or willingness to adopt one).',
      'Households maxing the owner\'s deferral and wanting a second $24,500 of tax-deferred room.',
      'Spouses with thin Social Security earnings histories who benefit from credited quarters.'
    ],
    implementation: [
      'Document the spouse\'s role: job description, hours, market-rate salary support.',
      'Onboard through payroll (W-4, I-9, state new-hire report); flag FUTA exemption for spouse wages in the payroll system.',
      'Confirm or adopt the retirement plan; execute the spouse\'s deferral election before the compensation is earned.',
      'Run salary evenly through the year; deposit 941 taxes on schedule.',
      'Issue the W-2; report deferrals in Box 12.',
      'Revisit annually: salary level vs. services, deferral limits (COLA updates), and whether Roth deferrals beat pre-tax at the household\'s bracket.'
    ]
  },

  client: {
    teaser: 'Doubles your household\'s access to one of the best tax shelters available',
    headline: 'Put your spouse on payroll — and double your retirement tax break',
    plainEnglish: [
      'If your spouse already helps in the business — books, scheduling, admin, marketing — putting them officially on payroll opens a door: only employees with a paycheck can contribute to the company retirement plan. With a W-2, your spouse can put up to $24,500 a year (2026) into the 401(k), on top of what you contribute for yourself.',
      'We want to be straight with you about the math: the salary by itself does not save income tax on a joint return — the business deducts it, but you report it as wages, so it cancels out. And payroll taxes apply to it. The win comes from what the paycheck unlocks: a second large retirement contribution, spouse benefits like Social Security credits, and other employee perks.',
      'For most couples who use this, sheltering an extra $24,500 a year — every year — far outweighs the payroll tax cost. We run the numbers for your situation before you commit.'
    ],
    analogy: 'Think of the salary as a ticket, not a prize. The ticket costs a little in payroll tax — but it admits your spouse to a retirement plan that shelters far more.',
    benefits: [
      'Up to $24,500 more per year (2026) into tax-deferred retirement savings',
      'Your spouse earns Social Security credits in their own name',
      'Access to employee benefits like dependent care accounts',
      'Decades of tax-deferred compounding on the extra contributions'
    ],
    steps: [
      'We define your spouse\'s role and set a fair, defensible salary',
      'We set up payroll properly — forms, withholding, W-2',
      'Your spouse signs up for the retirement plan and picks a contribution amount',
      'We check the numbers each year as limits change'
    ],
    considerations: [
      'Payroll taxes on the salary are a real cost — we only recommend this when the retirement and benefit value clearly beats it.',
      'The work must be real and the pay must match it; we document both.'
    ]
  },

  inputs: [
    { key: 'spouseSalary', label: 'Annual spouse salary', type: 'currency', default: 30000, grows: true },
    { key: 'spouse401kDeferral', label: 'Spouse 401(k) deferral', type: 'currency', default: 24500 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Honest MFJ modeling: salary is income-tax neutral (deducted from business
   * income, added to wages) and COSTS FICA — BOTH halves. Business income is
   * reduced by salary + the employer FICA share (deductible); salary is
   * added to wages; the modeled benefit is the 401(k) deferral, capped at
   * min(election, salary, §402(g) limit), added to adjustments. The
   * employee-side FICA (7.65% withheld from the spouse's pay) is a real,
   * unavoidable family cash cost — added to otherTaxes so it shows in the
   * comparison, matching the convention used elsewhere in this library
   * (e.g., the hire-children S-corp payroll route).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;

    if (!(p.scheduleCNet > 0) && !(p.passthroughK1 > 0)) {
      if (yearIndex === 0) {
        notes.push('No business income (Schedule C or pass-through K-1) found to pay a ' +
          'spouse salary from. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    var salary = params.spouseSalary || 0;
    // Employer AND employee shares of FICA: half of the combined SS + Medicare rates each.
    var ficaHalf = salary * ((tb.fica.ssRate + tb.fica.medicareRate) / 2);
    var employerFica = ficaHalf;
    var employeeFica = ficaHalf;
    var totalCost = salary + employerFica;

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - totalCost;
    } else {
      p.passthroughK1 = p.passthroughK1 - totalCost;
    }
    p.wages = (p.wages || 0) + salary;
    p.otherTaxes = (p.otherTaxes || 0) + employeeFica;

    var deferral = Math.min(
      params.spouse401kDeferral || 0,
      salary,
      tb.limits.retirement.electiveDeferral401k
    );
    p.adjustments = (p.adjustments || 0) + deferral;

    if (yearIndex === 0) {
      notes.push('Spouse salary of ' + TSIQ.fmt.usd(salary) + ' is income-tax neutral on a ' +
        'joint return (deducted from the business, added to wages) and COSTS FICA: ' +
        TSIQ.fmt.usd(employerFica) + ' employer share is deducted here, and a matching ' +
        TSIQ.fmt.usd(employeeFica) + ' employee share (withheld from the spouse\'s pay) is ' +
        'included in the numbers above via otherTaxes.');
      notes.push('Modeled benefit: ' + TSIQ.fmt.usd(deferral) + ' 401(k) deferral (capped at ' +
        'salary and the ' + TSIQ.fmt.usd(tb.limits.retirement.electiveDeferral401k) +
        ' §402(g) limit) plus unmodeled value — Social Security credits and fringe access.');
      if ((params.spouse401kDeferral || 0) > deferral) {
        notes.push('Deferral entry reduced to ' + TSIQ.fmt.usd(deferral) +
          ' — it cannot exceed the salary or the §402(g) limit.');
      }
    }
    return { profile: p, notes: notes };
  }
});
