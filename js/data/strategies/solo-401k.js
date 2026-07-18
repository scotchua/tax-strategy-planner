/* ============================================================================
 * STRATEGY: Solo 401(k)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'solo-401k',
  name: 'Solo 401(k)',
  category: 'Retirement',
  applyOrder: 61,

  advisor: {
    summary:
      'A one-participant 401(k) for an owner (and spouse) with no common-law ' +
      'employees. The owner contributes in two capacities: elective deferrals up ' +
      'to $24,500 (2026, §402(g); +$8,000 catch-up at 50+, $11,250 at 60–63 under ' +
      'SECURE 2.0), plus an employer contribution of up to 25% of W-2 compensation ' +
      '(S corp) or ~20% of net self-employment earnings (Schedule C). Combined ' +
      'annual additions are capped at $72,000 under §415(c) — catch-up rides on ' +
      'top. For self-employed owners the deduction is above-the-line and also ' +
      'reduces §199A QBI; for S corp owners the deferral reduces Box 1 wages and ' +
      'the employer piece is an entity deduction. Beats a SEP at the same income ' +
      'because the deferral layer does not depend on the 25%/20% math.',
    mechanics: [
      'Employee deferral: $24,500 (2026), dollar-for-dollar against compensation ' +
      '— available even at modest income, unlike the SEP\'s percentage-only formula.',
      'Catch-up: $8,000 at age 50+; $11,250 in the years the owner is 60–63 ' +
      '(SECURE 2.0 enhanced catch-up). If prior-year FICA wages exceeded $150,000, ' +
      'catch-up must be designated Roth (SECURE 2.0 §603).',
      'Employer profit-sharing: 25% of W-2 wages for an S corp owner-employee; for ' +
      'a sole proprietor, effectively ~20% of net SE earnings (the 25% limit applied ' +
      'to earnings net of the contribution itself and half of SE tax).',
      'Total annual additions (deferral + employer, excluding catch-up) capped at ' +
      '$72,000 under §415(c); compensation counted up to $360,000 (§401(a)(17)).',
      'Deferrals do NOT reduce FICA/SE tax — the income tax deduction is the whole ' +
      'benefit; do not promise payroll tax savings.',
      'Once plan assets exceed $250,000, Form 5500-EZ is required annually — a ' +
      'commonly missed filing with steep late penalties (delinquent filers use the ' +
      'IRS penalty relief program).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §401(k); §402(g)', note: 'Cash-or-deferred arrangement; elective deferral limit — $24,500 for 2026.' },
      { type: 'IRC', cite: 'IRC §414(v)', note: 'Catch-up contributions: $8,000 at 50+, $11,250 at ages 60–63 (SECURE 2.0 enhancement) for 2026.' },
      { type: 'IRC', cite: 'IRC §415(c)', note: 'Annual additions limit — $72,000 for 2026; catch-up contributions are excluded from the limit.' },
      { type: 'IRC', cite: 'IRC §404(a)(8); §401(a)(17)', note: 'Deduction rules for self-employed individuals; $360,000 compensation cap (2026).' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 cost-of-living adjustments for qualified plan limits.' },
      { type: 'Admin', cite: 'SECURE 2.0 Act §317 (P.L. 117-328)', note: 'First-year sole proprietors may make retroactive elective deferrals up to the filing deadline (without extensions) for the plan\'s first year.' },
      { type: 'Admin', cite: 'SECURE 2.0 Act §603 (P.L. 117-328)', note: 'Catch-up contributions must be Roth if prior-year FICA wages exceeded the indexed threshold ($150,000 for 2026).' },
      { type: 'Admin', cite: 'Form 5500-EZ', note: 'Required annually once one-participant plan assets exceed $250,000.' }
    ],
    requirements: [
      'Self-employment income or owner W-2 wages from the client\'s own entity — no benefit without compensation to defer against.',
      'No common-law employees other than a spouse (a single 1,000-hour employee, or 500+ hours in consecutive years under SECURE 2.0 long-term part-time rules, blows up the "solo" design).',
      'Plan adopted by the employer\'s tax filing deadline (SECURE Act retroactive adoption); deferral elections generally in place by 12/31 except the §317 first-year sole-proprietor exception.',
      'W-2 owners: the deferral must actually run through payroll in the calendar year.'
    ],
    risks: [
      'Hiring an eligible employee converts the plan into a full 401(k) with nondiscrimination testing and coverage obligations — monitor headcount and part-time hours annually.',
      'Missed Form 5500-EZ once assets pass $250,000 — penalties accrue per day.',
      'S corp owners often set wages too low to support the desired employer contribution (25% of a $50,000 salary is only $12,500) — coordinate with reasonable-compensation planning.',
      'Deferrals save income tax only, not SE/FICA tax — overstating the benefit is a credibility risk.',
      'Contributions in excess of §415(c)/§402(g) limits require corrective distributions with earnings.'
    ],
    bestFit: [
      'Owner-only businesses (or owner + spouse) with consistent profit above ~$50,000.',
      'S corp owners who want to maximize deductions on top of an already-optimized salary.',
      'Clients who may later want Roth or mega-backdoor features — solo plans can be documented to allow them.'
    ],
    implementation: [
      'Confirm no common-law employees (including long-term part-time eligibility under SECURE 2.0).',
      'Adopt a plan document through a brokerage or TPA prototype by the filing deadline; elect Roth and after-tax features if wanted later.',
      'Set the deferral election in writing; for S corp owners, code the deferral through payroll before 12/31.',
      'Compute the employer contribution with the 25%/20% worksheet (Pub. 560); fund by the return due date including extensions.',
      'Deduct: self-employed owner on Schedule 1 (also reducing QBI); S corp employer contribution on the 1120-S.',
      'Calendar the Form 5500-EZ threshold check each year.'
    ]
  },

  client: {
    teaser: 'Turns business profit into personal wealth — with a deduction most owners only half-use',
    headline: 'Your own 401(k) — with you on both sides of the match',
    plainEnglish: [
      'Employees of big companies get a 401(k) with a company match. When you own the business, you can have something better: a retirement plan where you are both the employee AND the company. You contribute once as the worker, and your business contributes again on top as the employer.',
      'For 2026 the two layers together can reach $72,000 a year — more if you are 50 or older. Every dollar you put in is deducted from your taxable income now, and the money grows for your retirement instead of going to the IRS.',
      'Unlike other small-business retirement plans, the first layer does not depend on a percentage of your income, so even in a moderate-profit year you can shelter a meaningful amount.'
    ],
    analogy: 'It\'s like getting the big-company 401(k) match — except you own the company doing the matching, so the "match" is really you paying your future self instead of the IRS.',
    benefits: [
      'Deduct up to $72,000 per year (2026) — more if you are 50 or older',
      'Two contribution layers: one as employee, one as employer',
      'You choose the amount each year — contribute a lot in good years, less in lean ones',
      'Money grows tax-deferred until retirement'
    ],
    steps: [
      'We confirm your business qualifies and pick the right plan provider',
      'We calculate your exact maximum for the year — both layers',
      'You fund the account; we handle the deduction on the returns',
      'Each year we re-run the numbers so you never over- or under-contribute'
    ],
    considerations: [
      'This works only while the business has no employees other than you (and your spouse) — if you plan to hire, we design around that first.',
      'The money is for retirement: pulling it out early generally means tax plus a penalty.'
    ]
  },

  inputs: [
    { key: 'employeeDeferral', label: 'Employee deferral', type: 'currency', default: 24500 },
    { key: 'employerContribution', label: 'Employer contribution', type: 'currency', default: 20000 },
    { key: 'age50Plus', label: 'Owner age 50 or older?', type: 'select', default: 'no',
      options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes (50+)' }] }
  ],

  suggest: function (p) {
    var biz = (p.scheduleCNet || 0) + (p.passthroughK1 || 0);
    if (!(biz >= 60000)) return null;
    return { reason: TSIQ.fmt.usd(biz) + ' of business income supports meaningful owner retirement deductions — confirm no plan already exists.' };
  },

  appliesTo: function (profile) {
    return true; // needs scheduleCNet or ownerWages; validated with a note in apply()
  },

  /**
   * Self-employed owner (scheduleCNet): deferral + employer contribution are
   * above-the-line deductions that also reduce QBI (adjustments + qbiReduction).
   * S corp owner (ownerWages): deferral reduces Box 1 wages — modeled via
   * adjustments so FICA (which still applies to deferrals) is untouched; the
   * employer contribution is an entity deduction against passthroughK1.
   * Caps: deferral at §402(g) (+catch-up if 50+); employer at the 25%/~20%
   * compensation-based max; combined at §415(c) $72,000 (+catch-up on top).
   * 60–63 enhanced catch-up not modeled (no age detail beyond 50+).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var lim = TSIQ.TABLES_2026.limits.retirement;
    var is50 = params.age50Plus === 'yes';
    var catchUp = is50 ? lim.catchUp50 : 0;

    var isSE = p.scheduleCNet > 0;
    var isW2Owner = !isSE && p.ownerWages > 0;
    if (!isSE && !isW2Owner) {
      if (yearIndex === 0) {
        notes.push('Requires self-employment income (Schedule C) or W-2 wages from the ' +
          'client\'s own entity — neither is present. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    // Compensation base. SE: net earnings ≈ scheduleCNet × 0.9235 (§1402(a)(12));
    // the ½-SE-tax refinement is immaterial to this comparison and slightly conservative.
    var comp = isSE
      ? p.scheduleCNet * 0.9235
      : Math.min(p.ownerWages, lim.compensationLimit);
    var employerMax = isSE ? comp * 0.20 : comp * 0.25;

    var deferral = Math.min(params.employeeDeferral || 0, lim.electiveDeferral401k + catchUp, comp);
    if ((params.employeeDeferral || 0) > lim.electiveDeferral401k + catchUp && yearIndex === 0) {
      notes.push('Employee deferral capped at ' + TSIQ.fmt.usd(lim.electiveDeferral401k + catchUp) +
        ' (§402(g)' + (is50 ? ' + age-50 catch-up' : '') + ', 2026). Ages 60–63 allow ' +
        TSIQ.fmt.usd(lim.catchUp60to63) + ' of catch-up — tell us if that applies.');
    }

    var employer = Math.min(params.employerContribution || 0, employerMax);
    if ((params.employerContribution || 0) > employerMax && yearIndex === 0) {
      notes.push('Employer contribution capped at ' + TSIQ.fmt.usd(employerMax) + ' — roughly ' +
        (isSE ? '20% of net self-employment earnings' : '25% of owner W-2 wages') +
        '. The input exceeded what current compensation supports' +
        (isW2Owner ? ' (consider raising owner salary if defensible as reasonable compensation)' : '') + '.');
    }

    // §415(c) combined cap — catch-up sits on top of the $72,000.
    var totalCap = lim.dcAnnualAdditions + catchUp;
    if (deferral + employer > totalCap) {
      employer = Math.max(0, totalCap - deferral);
      if (yearIndex === 0) {
        notes.push('Combined contributions capped at ' + TSIQ.fmt.usd(totalCap) +
          ' (§415(c) annual additions' + (is50 ? ' + catch-up' : '') + ', 2026).');
      }
    }

    // §415(c) is a per-employer cap SHARED across every defined-contribution
    // plan (Solo 401(k), SEP-IRA, profit-sharing) the same business maintains
    // in the same year — track the running total across strategies via `state`.
    state.dcAnnualAdditionsUsed = state.dcAnnualAdditionsUsed || 0;
    var headroom = Math.max(0, totalCap - state.dcAnnualAdditionsUsed);
    if (deferral + employer > headroom) {
      employer = Math.max(0, headroom - deferral);
      if (deferral > headroom) deferral = headroom;
      if (yearIndex === 0) {
        notes.push('Reduced further because another defined-contribution plan (SEP-IRA / ' +
          'profit-sharing) in this scenario already used ' +
          TSIQ.fmt.usd(state.dcAnnualAdditionsUsed) + ' of the shared §415(c) limit — ' +
          'these plans do not stack independently.');
      }
    }
    state.dcAnnualAdditionsUsed += deferral + employer;
    state.hasQualifiedPlan = true;

    var total = deferral + employer;
    if (isSE) {
      p.adjustments = (p.adjustments || 0) + total;
      p.qbiReduction = (p.qbiReduction || 0) + total; // SE retirement deduction reduces §199A QBI
    } else {
      p.adjustments = (p.adjustments || 0) + deferral;      // Box 1 reduction; FICA unchanged
      p.passthroughK1 = p.passthroughK1 - employer;          // entity deduction (also reduces QBI)
    }
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(total) + ' total Solo 401(k) contribution modeled (' +
        TSIQ.fmt.usd(deferral) + ' deferral + ' + TSIQ.fmt.usd(employer) + ' employer). ' +
        'Deferrals do not reduce SE/FICA tax.');
    }
    return { profile: p, notes: notes };
  }
});
