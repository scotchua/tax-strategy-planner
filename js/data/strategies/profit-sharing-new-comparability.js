/* ============================================================================
 * STRATEGY: New Comparability Profit Sharing
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'profit-sharing-new-comparability',
  name: 'New Comparability Profit Sharing',
  category: 'Retirement',
  applyOrder: 67,
  modeled: true,

  // Notice 98-4 bars pairing a qualified plan with a SIMPLE for the same year.
  conflictsWith: ['simple-ira'],

  advisor: {
    summary:
      'A cross-tested profit sharing design under Reg. §1.401(a)(4)-8: instead ' +
      'of allocating a uniform percentage of pay, each participant (or class) ' +
      'gets its own rate, and nondiscrimination is tested on the BENEFIT the ' +
      'allocation projects to at retirement rather than the contribution itself. ' +
      'Because a dollar for a 55-year-old owner has far less time to compound ' +
      'than a dollar for a 30-year-old employee, the owner can receive an ' +
      'allocation approaching the $72,000 §415(c) limit while staff receive the ' +
      'gateway minimum — typically 5% of pay. The standard result for an older ' +
      'owner with a young workforce: 85–90%+ of total plan dollars land in the ' +
      'owner\'s account, with the staff cost fully deductible.',
    mechanics: [
      'Participants are grouped into allocation classes (owner, managers, staff ' +
      '— or even one class per person); each class gets its own contribution ' +
      'rate set annually.',
      'Cross-testing converts allocations to equivalent benefit accrual rates ' +
      'at testing age using standard interest/mortality assumptions; the plan ' +
      'passes §401(a)(4) if projected benefits, not contributions, are ' +
      'nondiscriminatory — the age-leverage engine of the design.',
      'Minimum allocation gateway (Reg. §1.401(a)(4)-8(b)): before cross-' +
      'testing is allowed, each NHCE must receive at least the lesser of 5% of ' +
      'compensation or one-third of the highest HCE allocation rate. Budget 5% ' +
      'of staff payroll as the practical price of admission.',
      'Owner allocation is capped by §415(c) annual additions ($72,000 for ' +
      '2026, less any deferrals and other employer contributions) on ' +
      'compensation up to $360,000 (§401(a)(17)).',
      'Employer deduction capped at 25% of aggregate eligible payroll ' +
      '(§404(a)(3)) — rarely binding in owner-weighted designs but check it.',
      'Usually bolted onto a 401(k): deferral + safe harbor + new comparability ' +
      'profit sharing is the standard small-plan max-the-owner stack, and the ' +
      'chassis a cash balance plan later stacks on.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.401(a)(4)-8', note: 'Cross-testing: allocations tested as equivalent benefits; includes the minimum allocation gateway for new comparability designs.' },
      { type: 'IRC', cite: 'IRC §401(a)(4)', note: 'The underlying nondiscrimination requirement contributions-or-benefits testing satisfies.' },
      { type: 'IRC', cite: 'IRC §415(c)', note: 'Per-participant annual additions cap — $72,000 (2026) including deferrals and all employer money.' },
      { type: 'IRC', cite: 'IRC §404(a)(3)', note: 'Employer deduction limit — 25% of aggregate participant compensation.' },
      { type: 'IRC', cite: 'IRC §401(a)(17)', note: 'Compensation counted per participant capped at $360,000 (2026).' },
      { type: 'Admin', cite: 'Notice 2025-67', note: '2026 COLA figures for the §415(c) and §401(a)(17) limits.' }
    ],
    requirements: [
      'A TPA-administered plan document with class-based allocation language and annual cross-testing.',
      'Favorable demographics: the owner meaningfully older than the average staff member — the design lives on that age gap.',
      'Cash flow for the gateway contribution (typically 5% of eligible staff pay) every year the owner takes an allocation.',
      'An annual census delivered to the TPA on time — testing runs on real hire dates, ages, and compensation.'
    ],
    risks: [
      'Demographics drift: hire a 60-year-old employee or lose a key young one and this year\'s passing design can fail next year — testing is annual, not set-and-forget.',
      'Gateway is unconditional once cross-testing is used: skipping the staff contribution in a tight year while funding the owner is a qualification failure.',
      'The §415(c) cap counts ALL annual additions — an owner maxing deferrals plus safe harbor has less profit-sharing headroom than the raw $72,000 suggests.',
      'Cross-tested plans draw IRS attention when allocations are extreme — use a reputable TPA and keep the testing file.',
      'Late or sloppy census data produces failed tests discovered after funding — corrections are expensive.'
    ],
    bestFit: [
      'Owners 45+ with a workforce averaging 15+ years younger.',
      'Businesses already running a 401(k) that want owner-weighted employer dollars without a pension commitment.',
      'Profitable practices (medical, dental, professional services) with 2–20 employees and stable payroll.'
    ],
    implementation: [
      'Send the TPA a census (ages, hire dates, compensation, ownership) for a design study — get the owner-vs-staff dollar split in writing before committing.',
      'Adopt or amend the plan document with class-based allocation language by the deadline the TPA specifies.',
      'Fund the gateway minimum for NHCEs and the owner allocation by the return due date including extensions.',
      'Run cross-testing on final census data BEFORE funding the owner\'s full allocation.',
      'Deduct staff cost on the business return; owner allocation per entity type (above-the-line for self-employed, entity deduction for an S corp).',
      'Re-run the design annually — demographics, not the document, determine whether it still works.'
    ]
  },

  client: {
    teaser: 'A legal way to point most of the company retirement money at you',
    headline: 'Reward your team — while most of the plan dollars build your retirement',
    plainEnglish: [
      'Most company retirement plans spread contributions evenly — everyone gets the same percentage of pay. But the law allows a smarter design based on a simple fact: a dollar saved at 55 has only ten years to grow, while a dollar saved at 30 has thirty-five. So an older owner is allowed a much bigger contribution today, because it produces a comparable retirement benefit down the road.',
      'In practice, your employees receive a solid, fully deductible contribution — typically five percent of their pay — and the design directs the large remainder to you, often up to the legal maximum of $72,000 a year. For an owner with a younger team, it is common for the vast majority of every plan dollar to land in the owner\'s own account.',
      'Your team still gets a real benefit they can see, which helps you hire and keep good people. A plan specialist tests the design every year to keep it fully within the rules.'
    ],
    analogy: 'If two people need to fill the same size retirement bucket, the one starting later gets to use the bigger hose. This design simply gives the bigger hose to you.',
    benefits: [
      'Direct up to $72,000 a year (2026) into your own retirement account',
      'Typically 85%+ of plan dollars go to the owner in the right demographics',
      'Staff contributions are a visible benefit — and fully deductible',
      'Flexible: the contribution amounts can change every year'
    ],
    steps: [
      'We collect your employee roster and have a specialist design the split',
      'You see exactly how many dollars go to you versus the team before committing',
      'The plan is set up or amended, and contributions are funded by your filing deadline',
      'The design is re-tested every year as your team changes'
    ],
    considerations: [
      'The design works best when you are meaningfully older than most of your team — if your workforce ages or changes, the split can shift, so it is re-checked annually.',
      'The staff contribution (about 5% of their pay) is required in any year you take your big allocation — that cost is part of the deal.'
    ]
  },

  inputs: [
    { key: 'ownerAllocation', label: 'Owner profit-sharing allocation', type: 'currency', default: 40000 },
    { key: 'staffCost', label: 'Required staff contribution (gateway)', type: 'currency', default: 8000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Owner allocation: above-the-line deduction that also reduces QBI
   * (adjustments + qbiReduction), capped at the LESSER of §415(c) $72,000 or
   * 100% of owner compensation (SF6) — a cross-tested plan cannot allocate
   * more to a participant than that participant earned. Staff gateway cost:
   * a business expense — routed against scheduleCNet if present (also saves
   * SE tax) else passthroughK1. Interaction with deferrals/other employer
   * money inside the same §415(c) limit is the TPA's math — flagged, not
   * modeled. The §404(a)(3) deduction-limit warning below is a simplified
   * single-participant check against the OWNER's own compensation (SE
   * earnings use ~20% per the §404(a)(8) circularity already established in
   * solo-401k.js, W-2 owners 25%) — it is not the real aggregate-payroll
   * test, which needs full staff compensation data the profile doesn't carry.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var lim = TSIQ.TABLES_2026.limits.retirement;

    var hasBusiness = p.scheduleCNet > 0 || p.passthroughK1 > 0;
    if (!hasBusiness) {
      if (yearIndex === 0) {
        notes.push('Requires business income (Schedule C or pass-through K-1) — none present. ' +
          'No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }
    if (state.hasSimplePlan) {
      if (yearIndex === 0) {
        notes.push('A SIMPLE IRA is also selected in this scenario — an employer generally ' +
          'cannot maintain both a SIMPLE IRA and a profit-sharing plan in the same year ' +
          '(Notice 98-4). No benefit modeled here; choose one plan type.');
      }
      return { profile: p, notes: notes };
    }

    // SF6: compensation basis for the owner's own allocation — W-2 wages take
    // priority (S-corp owner), else net SE earnings (§1402(a)(12) 0.9235
    // factor); a K-1-only owner with no wages has no compensation figure to
    // test against and gets a refusal note instead of an unlawful allocation.
    var isW2Owner = p.ownerWages > 0;
    var isSE = !isW2Owner && p.scheduleCNet > 0;
    var ownerComp = isW2Owner ? Math.min(p.ownerWages, lim.compensationLimit)
      : (isSE ? Math.min(p.scheduleCNet * 0.9235, lim.compensationLimit) : 0);
    if (ownerComp <= 0) {
      if (yearIndex === 0) {
        notes.push('No owner W-2 wages or Schedule C earnings found — a cross-tested plan needs a ' +
          'compensation figure to test the owner\'s allocation against (§415(c)/§404(a)(3)). ' +
          'K-1 pass-through income alone, with no owner wages or Schedule C earnings, does not ' +
          'support an allocation here. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }

    var owner = Math.min(params.ownerAllocation || 0, lim.dcAnnualAdditions, ownerComp);
    if ((params.ownerAllocation || 0) > Math.min(lim.dcAnnualAdditions, ownerComp) && yearIndex === 0) {
      if (ownerComp < lim.dcAnnualAdditions) {
        notes.push('Owner allocation capped at ' + TSIQ.fmt.usd(ownerComp) +
          ' — §415(c) allows the LESSER of ' + TSIQ.fmt.usd(lim.dcAnnualAdditions) +
          ' or 100% of owner compensation, and compensation is the binding limit here.');
      } else {
        notes.push('Owner allocation capped at ' + TSIQ.fmt.usd(lim.dcAnnualAdditions) +
          ' (§415(c) annual additions, 2026). The cap includes any 401(k) deferrals and ' +
          'other employer contributions — the TPA computes the real headroom.');
      }
    }
    var deductLimitPct = isSE ? 0.20 : 0.25;
    if (owner > deductLimitPct * ownerComp && yearIndex === 0) {
      notes.push('Warning: the owner allocation alone is ' + TSIQ.fmt.pct(owner / ownerComp) +
        ' of the owner\'s own compensation, above the simplified ' + TSIQ.fmt.pct(deductLimitPct) +
        ' single-participant proxy for the §404(a)(3) 25%-of-pay deduction limit' +
        (isSE ? ' (~20% net of the SE circularity adjustment, §404(a)(8))' : '') +
        ' — have the TPA run the real test against AGGREGATE eligible payroll (owner + staff), ' +
        'which is usually far less binding than this single-participant check suggests.');
    }

    // §415(c) is shared across every DC plan (Solo 401(k), SEP-IRA,
    // profit-sharing) the same business maintains in the same year.
    state.dcAnnualAdditionsUsed = state.dcAnnualAdditionsUsed || 0;
    var headroom = Math.max(0, lim.dcAnnualAdditions - state.dcAnnualAdditionsUsed);
    if (owner > headroom) {
      owner = headroom;
      if (yearIndex === 0) {
        notes.push('Reduced further because another defined-contribution plan (Solo 401(k) / ' +
          'SEP-IRA) in this scenario already used ' + TSIQ.fmt.usd(state.dcAnnualAdditionsUsed) +
          ' of the shared §415(c) limit.');
      }
    }
    state.dcAnnualAdditionsUsed += owner;
    state.hasQualifiedPlan = true;

    var staff = params.staffCost || 0;

    p.adjustments = (p.adjustments || 0) + owner;
    p.qbiReduction = (p.qbiReduction || 0) + owner; // owner retirement deduction reduces §199A QBI
    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - staff; // staff cost is a business expense (also saves SE tax)
    } else {
      p.passthroughK1 = p.passthroughK1 - staff;
    }
    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(owner) + ' owner allocation + ' + TSIQ.fmt.usd(staff) +
        ' staff gateway contribution modeled. Cross-testing (Reg. §1.401(a)(4)-8) must be ' +
        'run on the actual census annually — the gateway minimum (lesser of 5% of pay or ' +
        '1/3 of the highest HCE rate) is mandatory in any year the owner is funded.');
    }
    return { profile: p, notes: notes };
  }
});
