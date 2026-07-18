/* ============================================================================
 * STRATEGY: SIMPLE IRA
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'simple-ira',
  name: 'SIMPLE IRA',
  category: 'Retirement',
  applyOrder: 63,
  modeled: true,

  // Notice 98-4: an employer with a SIMPLE for a year can't maintain any
  // other qualified plan for that year — same restriction apply() already
  // enforces via state.hasQualifiedPlan, surfaced here for the picker UI.
  conflictsWith: ['solo-401k', 'sep-ira', 'cash-balance-stack',
    'defined-benefit-plan', 'profit-sharing-new-comparability'],

  advisor: {
    summary:
      'A §408(p) Savings Incentive Match Plan for employers with 100 or fewer ' +
      'employees: employee deferrals up to $17,000 (2026; +$4,000 catch-up at ' +
      '50+) plus a mandatory employer contribution — either a dollar-for-dollar ' +
      'match up to 3% of compensation or a 2% nonelective for all eligibles. ' +
      'No discrimination testing, no Form 5500, IRA-level administration. The ' +
      'trade-offs: lower limits than a 401(k), the exclusive-plan rule (no other ' +
      'plan in the same year), and a brutal 25% early-withdrawal penalty during ' +
      'a participant\'s first two years. For an owner-only business a Solo ' +
      '401(k) usually dominates; the SIMPLE shines when there is real staff and ' +
      'the owner wants a cheap, predictable plan.',
    mechanics: [
      'Employee deferrals: $17,000 (2026), plus $4,000 catch-up at 50+. SECURE ' +
      '2.0 §117 allows an additional ~10% higher deferral limit for employers ' +
      'with 25 or fewer employees.',
      'Employer funding is mandatory: 3% match (reducible to 1% in 2 of any 5 ' +
      'years) or 2% nonelective on compensation for every eligible employee.',
      'Eligibility: employees earning $5,000 in any 2 prior years and expected ' +
      'to earn $5,000 currently — broader than 401(k) eligibility; plan for it.',
      'Exclusive-plan rule (§408(p)(2)(D)): the employer may not maintain any ' +
      'other qualified plan for the same year — no stacking a SIMPLE with a ' +
      '401(k), SEP, or cash balance plan.',
      '25% early-withdrawal penalty (§72(t)(6)) instead of 10% during the ' +
      'participant\'s first 2 years, measured from first contribution.',
      'Self-employed owner: deferral + match are above-the-line deductions that ' +
      'also reduce QBI; deferrals do not reduce SE tax.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408(p)', note: 'SIMPLE IRA rules: 100-employee limit (§408(p)(2)(C)(i)), match/nonelective formulas, exclusive-plan rule (§408(p)(2)(D)).' },
      { type: 'IRC', cite: 'IRC §72(t)(6)', note: 'Early-distribution penalty increased from 10% to 25% during the first 2 years of participation.' },
      { type: 'IRC', cite: 'IRC §404(m)', note: 'Employer deduction for SIMPLE contributions.' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 limits: $17,000 deferral, $4,000 age-50 catch-up.' },
      { type: 'Admin', cite: 'SECURE 2.0 Act §117 (P.L. 117-328)', note: 'Higher deferral limits for employers with 25 or fewer employees; mid-size employers can elect in with a 4%/3% employer contribution.' },
      { type: 'Admin', cite: 'Forms 5304-SIMPLE / 5305-SIMPLE', note: 'Model documents; new plans generally must be established by October 1 of the year. Annual 60-day notice to employees required.' }
    ],
    requirements: [
      '100 or fewer employees who earned $5,000+ in the prior year.',
      'No other employer-sponsored plan in the same calendar year (exclusive-plan rule).',
      'Plan in place by October 1 (new plans) and the 60-day employee notice delivered each year.',
      'Payroll capability to remit deferrals promptly and fund the required match/nonelective.'
    ],
    risks: [
      'The exclusive-plan rule forecloses better designs: a SIMPLE in place blocks adopting a 401(k)/cash balance combo for that year — plan the transition (SECURE 2.0 permits a mid-year conversion to a safe harbor 401(k)).',
      '25% penalty on any distribution or rollover to a non-SIMPLE IRA within the first 2 years — clients who "consolidate accounts" on their own get burned.',
      'Mandatory employer funding continues in bad years (the 1% match reduction helps only 2 years in 5).',
      'Lower ceilings: an owner who could fund $72,000 in a 401(k)-based design is capped near $21,000–$25,000 here — check the opportunity cost annually.',
      'Growing past 100 employees ends eligibility after a 2-year grace period.'
    ],
    bestFit: [
      'Businesses with staff (roughly 5–100 employees) wanting the cheapest compliant plan — no testing, no 5500.',
      'Owners whose personal shelter target is modest (~$20k) and who value predictable, low employer cost (3% match only for participants).',
      'A stepping-stone plan: start a SIMPLE now, graduate to a 401(k)/profit-sharing design as profits grow.'
    ],
    implementation: [
      'Confirm headcount (≤100 earning $5,000+) and that no other plan exists this year.',
      'Adopt Form 5304-SIMPLE (employee picks custodian) or 5305-SIMPLE (employer picks) by October 1.',
      'Deliver the 60-day notice with the match election before the plan year.',
      'Run deferrals through payroll; remit within the DOL timeframe; fund the match by the return due date including extensions.',
      'Deduct: Schedule 1 for a self-employed owner\'s own amounts (also reduces QBI); business return for staff cost.',
      'Diary a graduation check each fall: if the owner is maxing the SIMPLE, price the 401(k) upgrade.'
    ]
  },

  client: {
    teaser: 'A retirement plan so low-maintenance it practically runs itself — and every dollar is deductible',
    headline: 'The no-headache retirement plan for businesses with a team',
    plainEnglish: [
      'Big-company retirement plans come with lawyers, annual government filings, and compliance tests. This plan skips nearly all of that. It is built specifically for smaller businesses: you and your employees put money in from each paycheck, the business adds a modest match, and everything is deductible.',
      'For 2026 you can set aside up to $17,000 of your own pay — more if you are 50 or older — plus the match on top. Your employees get the same opportunity, which makes this an affordable benefit that helps you keep good people.',
      'The main trade-off is that the yearly limits are lower than fancier plans. For many business owners that is fine; when your profits outgrow it, we upgrade you to the next plan up.'
    ],
    analogy: 'It\'s the reliable pickup truck of retirement plans — not the fastest thing on the road, but cheap to run, hard to break, and it gets the job done every year.',
    benefits: [
      'Deduct up to $17,000 of your own pay (2026), more if 50+, plus the business match',
      'Almost zero administration — no annual government filings or compliance testing',
      'An affordable, real benefit for your employees',
      'Predictable cost: the match is a small, known percentage of pay'
    ],
    steps: [
      'We confirm this is the right plan size for your business and profit level',
      'We set it up with a one-page form before the October deadline',
      'Contributions run automatically through payroll',
      'Each year we check whether you have outgrown it and should upgrade'
    ],
    considerations: [
      'Money taken out in your first two years in the plan carries an extra-steep penalty — this is strictly long-term savings.',
      'The business cannot run this alongside another retirement plan in the same year, and the limits are lower than a 401(k) — we time the upgrade when your income justifies it.'
    ]
  },

  inputs: [
    { key: 'deferral', label: 'Owner deferral', type: 'currency', default: 17000 },
    { key: 'matchAmount', label: 'Employer match (owner)', type: 'currency', default: 5000 },
    { key: 'age50Plus', label: 'Owner age 50 or older?', type: 'select', default: 'no',
      options: [{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes (50+)' }] }
  ],

  appliesTo: function (profile) {
    return true; // needs scheduleCNet or ownerWages; validated with a note in apply()
  },

  /**
   * Owner amounts only — staff match cost is flagged, not modeled. Self-employed:
   * deferral + match are above-the-line and reduce QBI. S corp owner: deferral
   * reduces Box 1 wages (modeled via adjustments; FICA unchanged), match is an
   * entity deduction against passthroughK1. Deferral capped at $17,000 + $4,000
   * age-50 catch-up (SF4). Match capped at 3% of compensation.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var lim = TSIQ.TABLES_2026.limits.retirement;

    var isSE = p.scheduleCNet > 0;
    var isW2Owner = !isSE && p.ownerWages > 0;
    if (!isSE && !isW2Owner) {
      if (yearIndex === 0) {
        notes.push('Requires self-employment income (Schedule C) or W-2 wages from the ' +
          'client\'s own entity — neither is present. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    // An employer generally cannot maintain a SIMPLE IRA in the same year it
    // maintains another qualified retirement plan (Notice 98-4, Q&A E-1) —
    // if a Solo 401(k) / SEP-IRA / profit-sharing / cash balance / DB
    // strategy already ran in this scenario, no SIMPLE benefit is modeled.
    if (state.hasQualifiedPlan) {
      if (yearIndex === 0) {
        notes.push('Another qualified plan (Solo 401(k) / SEP-IRA / profit-sharing / cash ' +
          'balance / defined benefit) is also selected in this scenario — an employer ' +
          'generally cannot maintain a SIMPLE IRA in the same year as another qualified ' +
          'plan (Notice 98-4). No SIMPLE benefit modeled; choose one plan type.');
      }
      state.hasSimplePlan = true;
      return { profile: p, notes: notes };
    }
    state.hasSimplePlan = true;

    // Compensation base: net SE earnings (0.9235 factor) or owner W-2 wages.
    var comp = isSE ? p.scheduleCNet * 0.9235 : p.ownerWages;
    var is50 = params.age50Plus === 'yes';
    var catchUp = is50 ? lim.simpleCatchUp50 : 0;

    var deferral = Math.min(params.deferral || 0, lim.simpleDeferral + catchUp, comp);
    if ((params.deferral || 0) > lim.simpleDeferral + catchUp && yearIndex === 0) {
      notes.push('Deferral capped at ' + TSIQ.fmt.usd(lim.simpleDeferral + catchUp) +
        ' (2026 SIMPLE limit' + (is50 ? ' + age-50 catch-up' : '') + ').');
    }

    var matchCap = comp * 0.03; // 3% match formula
    var match = Math.min(params.matchAmount || 0, matchCap, deferral); // match cannot exceed the deferral
    if ((params.matchAmount || 0) > match && yearIndex === 0) {
      notes.push('Employer match capped at ' + TSIQ.fmt.usd(match) +
        ' — the match is dollar-for-dollar up to 3% of compensation and cannot exceed the deferral.');
    }

    if (isSE) {
      p.adjustments = (p.adjustments || 0) + deferral + match;
      p.qbiReduction = (p.qbiReduction || 0) + deferral + match; // SE retirement deduction reduces QBI
    } else {
      p.adjustments = (p.adjustments || 0) + deferral;  // Box 1 reduction; FICA unchanged
      p.passthroughK1 = p.passthroughK1 - match;        // entity deduction (also reduces QBI)
    }
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(deferral + match) + ' SIMPLE IRA modeled for the owner (' +
        TSIQ.fmt.usd(deferral) + ' deferral + ' + TSIQ.fmt.usd(match) + ' match). ' +
        'Required match for eligible EMPLOYEES is not modeled. Reminders: 25% penalty on ' +
        'withdrawals in the first 2 years, no other plan allowed in the same year, ' +
        '100-employee limit.');
    }
    return { profile: p, notes: notes };
  }
});
