/* ============================================================================
 * STRATEGY: Defined Benefit / Cash Balance Plan
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'defined-benefit-plan',
  name: 'Defined Benefit / Cash Balance Plan',
  category: 'Retirement',
  applyOrder: 64,
  modeled: true,

  advisor: {
    summary:
      'A qualified plan that promises a future benefit — up to a $290,000 annual ' +
      'life annuity at 2026 limits (§415(b)) — and deducts whatever an actuary ' +
      'certifies is needed to fund it (§404(o)). Because the funding target is a ' +
      'benefit, not a contribution cap, older owners with fewer years to ' +
      'retirement can deduct amounts far beyond any defined-contribution limit: ' +
      'owners in their 50s with high, stable income routinely support $150,000– ' +
      '$300,000+ of annual deductions. The cash balance variant states the ' +
      'benefit as a hypothetical account (pay credit + interest credit), which ' +
      'is easier to communicate and to split among partners. The price of ' +
      'admission is commitment: minimum funding is mandatory each year (§412/' +
      '§430), and the plan needs an enrolled actuary, a TPA, and a multi-year ' +
      'horizon.',
    mechanics: [
      'The actuary works backward from the promised benefit (capped at a ' +
      '$290,000/year annuity at retirement, §415(b)) to a required annual ' +
      'contribution. Less time to retirement = larger required contribution — ' +
      'the design structurally favors owners 45–62.',
      'The deduction follows the actuarial funding math under §404(o), not a ' +
      'percentage-of-compensation cap — this is how deductions exceed the ' +
      '$72,000 DC world by multiples.',
      'Cash balance form: each participant gets a stated pay credit (e.g., ' +
      '$150,000 for the owner, 5% of pay for staff) plus a guaranteed interest ' +
      'credit — a DB plan legally, an "account" visually.',
      'Minimum funding is compulsory (§412/§430): a bad revenue year does not ' +
      'excuse the contribution. Design the pay credit at a level sustainable ' +
      'across the commitment period (typically 3–5+ years to show permanency).',
      'Compensation counted up to $360,000 (§401(a)(17)); benefits above the ' +
      'insured limits of a one-participant plan need PBGC analysis — plans ' +
      'covering only an owner (and spouse) are PBGC-exempt; plans with staff ' +
      'generally pay PBGC premiums.',
      'Self-employed owner: the deduction is above-the-line and reduces §199A ' +
      'QBI — often the point, since it can pull a high earner back under the ' +
      'QBI phase-out threshold.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §415(b)', note: 'Maximum annual benefit — $290,000 for 2026 (Notice 2025-67); the ceiling the actuary funds toward.' },
      { type: 'IRC', cite: 'IRC §404(o)', note: 'Deduction limit for defined benefit plans — follows the actuarially determined funding target, not a percent-of-pay cap.' },
      { type: 'IRC', cite: 'IRC §412; §430', note: 'Minimum funding standards — the annual contribution is mandatory once the plan exists.' },
      { type: 'IRC', cite: 'IRC §401(a)(17)', note: 'Compensation limit $360,000 (2026).' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 COLA figures for the §415(b) and §401(a)(17) limits.' },
      { type: 'Admin', cite: 'Form 5500 / Schedule SB', note: 'Annual filing with enrolled-actuary certification of the funding target and minimum required contribution.' }
    ],
    requirements: [
      'High, stable income sufficient to sustain the contribution for several consecutive years — this is a commitment, not an annual election.',
      'An enrolled actuary and TPA engagement (design study, annual valuation, Schedule SB).',
      'Owner age generally 45+ for the math to dominate DC alternatives; W-2 or SE compensation to support the benefit formula.',
      'If there are employees: nondiscrimination testing will require meaningful staff benefits — get the census priced in the design study.'
    ],
    risks: [
      'Mandatory funding in down years — underfunding triggers excise taxes; freezing or terminating early undermines the permanency requirement and invites disqualification arguments.',
      'Actuarial, TPA, and (with staff) PBGC costs typically run $2,000–$5,000+ per year — priced against six-figure deductions this is small, but it is not zero.',
      'Investment risk stays with the employer: returns above the interest-credit assumption create overfunding; poor returns increase required contributions.',
      'Staff cost in covered-employee designs can be substantial — cross-tested combos (see the cash balance stack strategy) manage but do not eliminate it.',
      'Distributions are ordinary income later — the strategy is bracket arbitrage plus deferral, not permanent exclusion.'
    ],
    bestFit: [
      'Owners roughly 45–65 with $300,000+ of consistent business income who have already maxed DC options.',
      'Professionals (medical, legal, consulting) with few or no employees, or partner groups where each partner funds their own credit.',
      'Clients within sight of the §199A phase-out whom a large above-the-line deduction can pull back under the threshold.'
    ],
    implementation: [
      'Commission a design study from an actuary/TPA: census, target deduction, DB-alone vs. combo comparison.',
      'Adopt the plan document by the employer\'s tax filing deadline (SECURE Act retroactive adoption) — but deferral-combo features need calendar-year lead time.',
      'Fund the actuarially certified contribution by the return due date including extensions (no later than 8½ months after year-end for minimum funding).',
      'File Form 5500 with Schedule SB annually; pay PBGC premiums if the plan covers staff.',
      'Deduct: Schedule 1 for a self-employed owner (also reduces QBI); entity return otherwise.',
      'Revisit the design every 2–3 years; plan the endgame — typically terminate near retirement and roll the balance to an IRA.'
    ]
  },

  client: {
    teaser: 'The six-figure deduction most business owners have never been told about',
    headline: 'A pension for your own business — and a deduction that can top $150,000 a year',
    plainEnglish: [
      'Remember pensions — the retirement plans that promised a guaranteed monthly check for life? Big companies mostly dropped them, but the law still allows them, and a business owner can set one up for themselves. Here is why that matters: the closer you are to retirement, the more the IRS lets you put in to fund that promised benefit — and every dollar is deductible.',
      'While ordinary retirement accounts stop you at $72,000 a year, a pension plan is based on the benefit you are promised at retirement. For an owner in their 50s with strong income, that math often supports putting away $150,000 to $300,000 or more every single year, all deducted from your taxable income.',
      'The trade-off is commitment. This is not an account you fund when you feel like it — the contribution is required every year for several years, and a professional called an actuary calculates the exact amount. That is why we only recommend it when your income is strong and steady.'
    ],
    analogy: 'Filling a retirement bucket by age 65 is easy to picture: start at 30 and a slow trickle fills it. Start at 55 and you are allowed to pour much faster — and the IRS lets you deduct every gallon.',
    benefits: [
      'Deductions that can exceed $150,000–$300,000 per year, far beyond normal limits',
      'The older you are, the more you can put away',
      'Builds a genuinely large retirement fund in a compressed number of years',
      'Can stack with a 401(k) for even more (we model that separately)'
    ],
    steps: [
      'We run a design study with a pension specialist to find your exact number',
      'We confirm your income can comfortably support the commitment',
      'The plan is set up and funded before your filing deadline',
      'Specialists handle the annual certification; we handle the deduction'
    ],
    considerations: [
      'The contribution is mandatory each year once the plan starts — this only fits businesses with strong, steady profits, and we stress-test that with you first.',
      'It comes with real professional fees (actuary and administrator) — small next to the tax savings at this scale, but part of the plan.',
      'The money is taxed later in retirement — the win is deducting at your highest-rate years and building wealth in between.'
    ]
  },

  inputs: [
    { key: 'annualContribution', label: 'Actuarially determined contribution', type: 'currency', default: 150000 }
  ],

  suggest: function (p) {
    var biz = (p.scheduleCNet || 0) + (p.passthroughK1 || 0);
    if (!(biz >= 250000)) return null;
    return { reason: TSIQ.fmt.usd(biz) + ' of business income — a DB/cash-balance plan can support six-figure deductions for an older owner.' };
  },

  appliesTo: function (profile) {
    return true; // needs scheduleCNet or ownerWages; validated with a note in apply()
  },

  /**
   * Contribution is advisor-entered (the real number comes from an actuary —
   * we never invent it). Self-employed: above-the-line deduction that also
   * reduces QBI, sanity-capped at scheduleCNet (a SE owner's DB deduction
   * cannot exceed earned income). S corp owner: entity deduction against
   * passthroughK1 (can drive it negative — a real possibility with DB funding,
   * flagged in a note). Staff benefit cost, if any, must be included by the
   * advisor in the entered amount.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];

    var isSE = p.scheduleCNet > 0;
    var isW2Owner = !isSE && p.ownerWages > 0;
    if (!isSE && !isW2Owner) {
      if (yearIndex === 0) {
        notes.push('Requires self-employment income (Schedule C) or W-2 wages from the ' +
          'client\'s own entity — neither is present. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }
    if (state.hasSimplePlan) {
      if (yearIndex === 0) {
        notes.push('A SIMPLE IRA is also selected in this scenario — an employer generally ' +
          'cannot maintain both a SIMPLE IRA and a defined benefit plan in the same year ' +
          '(Notice 98-4). No benefit modeled here; choose one plan type.');
      }
      return { profile: p, notes: notes };
    }

    var amt = params.annualContribution || 0;
    if (isSE && amt > p.scheduleCNet) {
      amt = p.scheduleCNet; // SE owner's deduction limited to earned income
      if (yearIndex === 0) {
        notes.push('Contribution capped at ' + TSIQ.fmt.usd(amt) +
          ' — a self-employed owner\'s DB deduction cannot exceed net earned income.');
      }
    }

    if (isSE) {
      p.adjustments = (p.adjustments || 0) + amt;
      p.qbiReduction = (p.qbiReduction || 0) + amt; // SE retirement deduction reduces §199A QBI
    } else {
      p.passthroughK1 = p.passthroughK1 - amt; // entity deduction (also reduces QBI)
      if (yearIndex === 0 && p.passthroughK1 < 0) {
        notes.push('DB funding drives the entity below zero — confirm basis and ' +
          'reasonable-compensation support for a deduction of this size.');
      }
    }
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(amt) + ' defined benefit contribution modeled. This amount ' +
        'MUST come from an actuarial design study (§404(o)) — the tool does not compute it. ' +
        'Funding is mandatory each year (§412/§430); treat this as a multi-year commitment.');
      notes.push('Projection assumes the same contribution every year — the actuary will ' +
        'recertify annually and the real number will drift.');
      if (state.hasQualifiedPlan) {
        notes.push('Another qualified plan (Solo 401(k) / SEP-IRA / profit-sharing / cash ' +
          'balance) is also selected in this scenario — a real design combines these, but ' +
          'this tool does not net the §404(a)(7) combined-plan deduction limit across them.');
      }
    }
    state.hasQualifiedPlan = true;
    return { profile: p, notes: notes };
  }
});
