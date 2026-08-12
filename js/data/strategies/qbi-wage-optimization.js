/* ============================================================================
 * STRATEGY: §199A W-2 Wage / UBIA Optimization
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'qbi-wage-optimization',
  name: '§199A W-2 Wage / UBIA Optimization',
  category: 'QBI Optimization',
  applyOrder: 21, // after S-corp election (10) restructures income
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'For taxpayers above the §199A taxable-income threshold ($403,500 MFJ / ' +
      '$201,750 single, 2026), the QBI deduction is capped at the greater of ' +
      '50% of the business\'s W-2 wages or 25% of W-2 wages plus 2.5% of UBIA ' +
      'of qualified property (§199A(b)(2)(B)). When the deduction is ' +
      'wage-limited, raising owner salary is counterintuitively accretive: each ' +
      'added wage dollar shrinks QBI by ~$1.08 (wage + employer FICA) but ' +
      'raises the wage cap by $0.50, and the net deduction can INCREASE until ' +
      'the two prongs cross. The optimum sits where the marginal QBI benefit ' +
      'equals the marginal payroll-tax cost — roughly the classic 2/7 ' +
      '(≈28.6%) wages-to-QBI ratio before payroll-tax drag. This is inseparable ' +
      'from the S-corp reasonable-compensation analysis: the same salary number ' +
      'drives payroll tax, reasonable-comp exposure, and the wage limit.',
    mechanics: [
      'Above the threshold plus the OBBBA-widened phase-in range ($75k single / ' +
      '$150k MFJ starting 2026), the deduction for a non-SSTB is ' +
      'min(20% × QBI, greater of 50% × W-2 wages or 25% × W-2 wages + 2.5% × UBIA).',
      'With only the 50%-of-wages prong, the crossover is where 20% × (profit − ' +
      '1.0765 × wages) = 50% × wages — wages ≈ 27.5–28.6% of pre-wage profit. ' +
      'Below that ratio, added salary grows the total deduction despite reducing QBI.',
      'The wage dollar is not free: employer FICA (6.2% Social Security up to the ' +
      '$184,500 base + 1.45% Medicare) plus the employee half charged on the W-2. ' +
      'The optimum is where marginal QBI-deduction benefit × marginal rate = ' +
      'marginal payroll-tax cost — run the model, not the heuristic.',
      'W-2 wages counted are those properly allocable to QBI and reported on ' +
      'Forms W-2/941 (Rev. Proc. 2019-11 gives three computation methods). Wages ' +
      'to non-owner employees count too — accelerating a planned hire or bonus ' +
      'into the tax year raises the cap without owner payroll-tax exposure to ' +
      'the additional Medicare tax stacking on owner wages.',
      'Guaranteed payments to partners are NOT W-2 wages and do not support the ' +
      'limit (§199A(b)(4); Reg. §1.199A-2) — this lever belongs to S corporations ' +
      'and entities with genuine employees, not to partnerships paying partners.',
      'Capital-heavy businesses with low payroll (e.g., real estate) usually do ' +
      'better under the 25% + 2.5% UBIA prong. THIS ENGINE MODELS ONLY THE 50% ' +
      'WAGE PRONG — where UBIA is material, compute the alternative prong ' +
      'off-model before recommending added salary.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §199A(b)(2)(B)', note: 'The limitation: greater of 50% of W-2 wages, or 25% of W-2 wages plus 2.5% of UBIA of qualified property.' },
      { type: 'IRC', cite: 'IRC §199A(b)(3)', note: 'Phase-in of the limitation over the range above the threshold — OBBBA (P.L. 119-21) widened the range to $75k/$150k beginning 2026 and made §199A permanent.' },
      { type: 'Reg', cite: 'Reg. §1.199A-2', note: 'Determination of W-2 wages (must be properly allocable to QBI and timely reported) and UBIA of qualified property.' },
      { type: 'Admin', cite: 'Rev. Proc. 2019-11', note: 'Three permitted methods for calculating W-2 wages for §199A (unmodified box method, modified box 1, tracking wages).' },
      { type: 'IRC', cite: 'IRC §162(a); Rev. Rul. 74-44', note: 'Compensation must be for services actually rendered; the same salary figure sits inside the S-corp reasonable-compensation framework — document the analysis once, use it for both.' },
      { type: 'IRC', cite: 'IRC §§3111, 3101(b)(2)', note: 'Employer FICA cost of each added wage dollar; 0.9% additional Medicare tax on owner wages above $200k/$250k enters the marginal-cost side.' }
    ],
    requirements: [
      'Taxable income above the §199A threshold with a wage-limited (not income-limited) deduction — verify which constraint binds before adding salary.',
      'An entity that can pay W-2 wages counted for §199A (S corporation or an entity with common-law employees; partner guaranteed payments do not count).',
      'Wages timely reported on Forms W-2/941 and properly allocable to QBI (Reg. §1.199A-2).',
      'A reasonable-compensation file that supports the salary level chosen — the QBI motive does not suspend the comp analysis.'
    ],
    risks: [
      'Payroll tax is a real, permanent cost — if the deduction is income-limited (20% of QBI is the binding cap), added salary only destroys benefit. Model first.',
      'The engine models only the 50%-of-wages prong; for capital-heavy businesses the 25% + 2.5% UBIA prong may already remove the limit, making added salary pure cost.',
      'Owner wages above $200k/$250k pick up the 0.9% additional Medicare tax, steepening the marginal cost curve.',
      'SSTBs above the phase-in range get no deduction regardless of wages — wage optimization is dead there; manage the threshold instead.',
      'State payroll costs (unemployment, disability funds) and benefit-plan definitions keyed to salary move with the number.'
    ],
    bestFit: [
      'Non-SSTB S corporation owners with taxable income above $403,500 MFJ / $201,750 single whose deduction is visibly wage-capped.',
      'Businesses with high profit but thin payroll — the classic wage-limited fact pattern.',
      'Owners already near the top of the reasonable-comp range, where added salary is defensible.'
    ],
    implementation: [
      'Compute the current binding constraint: 20% of QBI vs. 50% of W-2 wages (and the 25% + 2.5% UBIA prong off-model if qualified property is material).',
      'Solve for the wage level where marginal QBI benefit equals marginal payroll-tax cost; sanity-check against the reasonable-compensation study.',
      'Adjust salary via a Q4 payroll run or bonus before December 31 — W-2 wages must be paid and reported within the calendar year.',
      'Confirm Rev. Proc. 2019-11 wage computation ties to the W-3/941 filings.',
      'Re-run annually: profit, thresholds, and the phase-in range (indexed) move the optimum every year.'
    ]
  },

  client: {
    teaser: 'One counterintuitive adjustment to a number you already control can grow a five-figure deduction',
    headline: 'Tune your payroll to unlock the full 20% business deduction',
    plainEnglish: [
      'Business owners get one of the best deductions in the tax law: up to 20% of business profit, deducted before tax is calculated. But for higher-income owners there is a catch — the deduction gets capped based on how much W-2 payroll the business pays.',
      'Here is the surprising part: if your deduction is being capped, paying yourself a somewhat larger salary can actually RAISE the cap faster than it shrinks the deduction. Done right, the deduction grows even though salary went up.',
      'There is a sweet spot — too little salary and the cap chokes the deduction, too much and payroll taxes eat the benefit. We calculate exactly where that sweet spot is for your numbers and set your payroll there.'
    ],
    analogy: 'Think of the deduction as water flowing through a valve, and your payroll as the hand on the valve. Right now the valve is partly closed. We open it to exactly the right point — enough to let the full deduction flow, without paying more payroll tax than the extra deduction is worth.',
    benefits: [
      'A larger 20% business-income deduction, often worth thousands per year',
      'Uses payroll you control — no new spending, just smarter calibration',
      'Repeats every year once the target salary is set',
      'Doubles as documentation for your salary if the IRS ever asks'
    ],
    steps: [
      'We test whether your deduction is currently being capped',
      'We calculate the exact salary level that maximizes your net benefit',
      'We adjust your payroll before year-end',
      'We recheck the math every year as your profit changes'
    ],
    considerations: [
      'A higher salary means more payroll tax — our target already nets that cost against the bigger deduction, and we only recommend it when you come out ahead.',
      'For businesses with lots of equipment or buildings, a different version of the cap may apply; we check that path before changing anything.'
    ]
  },

  inputs: [
    { key: 'additionalW2Wages', label: 'Additional W-2 wages (owner salary increase)', type: 'currency', default: 50000 }
  ],

  appliesTo: function (profile) {
    return true; // needs passthrough entity income; validated with a note in apply()
  },

  /**
   * Shifts entity profit into owner W-2 wages: passthroughK1 falls by the
   * wages plus employer FICA (the entity deducts both), ownerWages rises (the
   * engine charges both FICA halves there), and entityW2Wages rises so the
   * §199A 50%-of-wages limit sees the new payroll. The engine shows the
   * crossover: whether the bigger wage cap beats the payroll-tax cost.
   * The 25% + 2.5% UBIA alternative prong is NOT modeled (engine limitation).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var f = TSIQ.TABLES_2026.fica;

    if ((p.passthroughK1 || 0) <= 0) {
      notes.push('Requires S-corp/partnership passthrough profit to convert into W-2 ' +
        'wages — none found. Pair with the S Corporation Election strategy. No benefit modeled.');
      return { profile: p, notes: notes };
    }

    var w = Math.min(params.additionalW2Wages || 0, p.passthroughK1);
    if (w < (params.additionalW2Wages || 0)) {
      notes.push('Additional wages capped at available entity profit of ' +
        TSIQ.fmt.usd(p.passthroughK1) + '.');
    }

    // Employer FICA on the added wages: SS 6.2% only up to the remaining wage
    // base (existing owner wages count against it), Medicare 1.45% uncapped.
    var priorWages = p.ownerWages || 0;
    var ssRoom = Math.max(0, f.ssWageBase - Math.min(priorWages, f.ssWageBase));
    var employerFICA = Math.min(w, ssRoom) * (f.ssRate / 2) + w * (f.medicareRate / 2);

    p.ownerWages = priorWages + w;
    p.entityW2Wages = (p.entityW2Wages || 0) + w;
    p.passthroughK1 = p.passthroughK1 - w - employerFICA;

    if (yearIndex === 0) {
      notes.push(TSIQ.fmt.usd(w) + ' additional W-2 wages raise the §199A wage limit by ' +
        TSIQ.fmt.usd(w * 0.5) + '; entity profit reduced by wages plus ' +
        TSIQ.fmt.usd(employerFICA) + ' employer payroll tax.');
      notes.push('Engine models the 50%-of-W-2-wages prong only. If the business holds ' +
        'substantial depreciable property, check the 25% wages + 2.5% UBIA prong ' +
        '(§199A(b)(2)(B)(ii)) off-model — it may already remove the limit.');
      if (p.isSSTB) {
        notes.push('Profile is flagged SSTB — above the phase-in range an SSTB gets no ' +
          'QBI deduction regardless of wages. Added salary is likely pure payroll-tax cost here.');
      }
    }
    return { profile: p, notes: notes };
  }
});
