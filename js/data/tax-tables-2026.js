/* ============================================================================
 * 2026 FEDERAL TAX TABLES — single source of truth for all tax constants.
 * Source: Rev. Proc. 2025-32 (released Oct 2025), as amended by the One Big
 * Beautiful Bill Act (OBBBA, P.L. 119-21, July 4, 2025).
 * Verified against IRS.gov and Tax Foundation, July 2026.
 * The tax engine reads ONLY from this file. No tax constants elsewhere.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};

TSIQ.TABLES_2026 = {
  taxYear: 2026,

  // Ordinary income brackets: [lowerBound, rate]. Upper bound = next lower bound.
  brackets: {
    single: [
      [0, 0.10], [12400, 0.12], [50400, 0.22], [105700, 0.24],
      [201775, 0.32], [256225, 0.35], [640600, 0.37]
    ],
    mfj: [
      [0, 0.10], [24800, 0.12], [100800, 0.22], [211400, 0.24],
      [403550, 0.32], [512450, 0.35], [768700, 0.37]
    ],
    mfs: [
      [0, 0.10], [12400, 0.12], [50400, 0.22], [105700, 0.24],
      [201775, 0.32], [256225, 0.35], [384350, 0.37]
    ],
    hoh: [
      [0, 0.10], [17700, 0.12], [67450, 0.22], [105700, 0.24],
      [201775, 0.32], [256225, 0.35], [640600, 0.37]
    ]
  },

  standardDeduction: { single: 16100, mfj: 32200, mfs: 16100, hoh: 24150 },

  // Long-term capital gains / qualified dividends breakpoints (0% up to first
  // number, 15% up to second, 20% above). Applied to taxable income stacking.
  ltcgBreakpoints: {
    single: [49450, 545500],
    mfj:    [98900, 613700],
    mfs:    [49450, 306850],
    hoh:    [66200, 579600]
  },

  // §199A Qualified Business Income deduction (made permanent by OBBBA).
  qbi: {
    rate: 0.20,
    // Taxable-income threshold where W-2 wage limit / SSTB phase-out begins.
    // Rev. Proc. 2025-32 §4.26: $403,500 MFJ / $201,775 MFS / $201,750 all others.
    threshold: { single: 201750, mfj: 403500, mfs: 201775, hoh: 201750 },
    // OBBBA widened the phase-in range starting 2026: $75k single / $150k joint.
    phaseInRange: { single: 75000, mfj: 150000, mfs: 75000, hoh: 75000 }
  },

  // Self-employment tax (§1401) and payroll taxes.
  fica: {
    ssWageBase: 184500,        // 2026 Social Security wage base (SSA)
    ssRate: 0.124,             // combined employer+employee (or SE)
    medicareRate: 0.029,       // combined
    seNetEarningsFactor: 0.9235,
    additionalMedicareRate: 0.009,
    additionalMedicareThreshold: { single: 200000, mfj: 250000, mfs: 125000, hoh: 200000 }
  },

  // Child Tax Credit (§24, as amended by OBBBA): $2,200 per qualifying child
  // (under 17) for 2026, $500 other-dependent credit. Phase-out: $50 per
  // $1,000 (or fraction) of MAGI over the threshold. Refundable portion
  // ($1,700 ACTC) not modeled in v1 — credit applied as nonrefundable.
  ctc: {
    perChild: 2200,
    perOtherDependent: 500,
    phaseOutThreshold: { single: 200000, mfj: 400000, mfs: 200000, hoh: 200000 },
    phaseOutPer1000: 50
  },

  // 3.8% Net Investment Income Tax (§1411). Thresholds are not inflation-indexed.
  niit: {
    rate: 0.038,
    magiThreshold: { single: 200000, mfj: 250000, mfs: 125000, hoh: 200000 }
  },

  // SALT cap under OBBBA for 2026: $40,400 cap ($20,200 MFS), phased down by
  // 30% of MAGI over $505,000 ($252,500 MFS), but never below the $10,000 floor.
  salt: {
    cap: { single: 40400, mfj: 40400, mfs: 20200, hoh: 40400 },
    floor: { single: 10000, mfj: 10000, mfs: 5000, hoh: 10000 },
    phaseDownStart: { single: 505000, mfj: 505000, mfs: 252500, hoh: 505000 },
    phaseDownRate: 0.30
  },

  // OBBBA §70103 "senior deduction": $6,000 per qualifying individual age 65+
  // (2026 figure; indexed 2027+), on top of the regular/aged standard
  // deduction, available whether itemizing or not. Phases out 6% of MAGI
  // over the threshold. Temporary (2025-2028) per current law.
  seniorDeduction: {
    amount: 6000,
    magiPhaseOutStart: { single: 75000, mfj: 150000, mfs: 75000, hoh: 75000 },
    phaseOutRate: 0.06
  },

  // §63(f) additional standard deduction for age 65+ (or blind) — added to
  // the base standard deduction only (itemizers don't receive it separately;
  // it's baked into the standard-vs-itemized comparison). 2026 figures.
  additionalStdDedAged: { single: 2050, mfj: 1650, mfs: 1650, hoh: 2050 },

  // OBBBA §70425, new IRC §170(p): itemizers may deduct charitable cash
  // contributions only above 0.5% of AGI, effective for tax years beginning
  // after 12/31/2025.
  charitableAGIFloor: 0.005,

  // OBBBA §70111, new IRC §68: overall limitation on itemized deductions for
  // taxpayers in the 37% bracket — reduced by 2/37 of the lesser of total
  // itemized deductions or the amount by which AGI exceeds the 37% bracket
  // threshold for the filing status (approximates the "taxable income plus
  // itemized deductions" test using AGI, consistent with how this engine
  // keys its other AGI-based phase-outs).
  itemizedLimitation: { factor: 2 / 37 },

  // OBBBA §70424: non-itemizers may deduct up to this much of CASH charitable
  // contributions in addition to the standard deduction (permanent, 2026+).
  nonItemizerCharitable: { single: 1000, mfj: 2000, mfs: 1000, hoh: 1000 },

  // OBBBA §70105, new §199A(b)(7): $400 (2026; indexed after 2026) minimum
  // QBI deduction for taxpayers with at least $1,000 of aggregate QBI from a
  // qualified trade or business in which they materially participate.
  qbiMinimum: { amount: 400, floorQBI: 1000 },

  // Bonus depreciation: OBBBA restored permanent 100% bonus for qualified
  // property acquired and placed in service after Jan 19, 2025 (§168(k)).
  bonusDepreciationRate: 1.00,

  // Residential rental real property recovery period (§168(c)) — used to model
  // the straight-line baseline a cost segregation study accelerates against.
  residentialRentalRecoveryYears: 27.5,
  commercialRecoveryYears: 39,

  // AMT exemptions (2026) — engine does not compute AMT in v1; kept here so the
  // data file is complete when AMT support is added.
  amtExemption: { single: 90100, mfj: 140200, mfs: 70100, hoh: 90100 },

  // Flat corporate rate (§11, TCJA permanent).
  corporateRate: 0.21,

  // ---- 2026 limits used by strategy library entries. Verified July 2026. ----
  limits: {
    // Notice 2025-67 (retirement plan COLAs for 2026)
    retirement: {
      electiveDeferral401k: 24500,       // §402(g)
      catchUp50: 8000,                   // age 50+ (must be Roth if prior-yr FICA wages > $150k)
      catchUp60to63: 11250,              // SECURE 2.0 enhanced catch-up
      dcAnnualAdditions: 72000,          // §415(c) — also the SEP cap
      dbAnnualBenefit: 290000,           // §415(b) defined benefit limit
      compensationLimit: 360000,         // §401(a)(17)
      simpleDeferral: 17000,
      simpleCatchUp50: 4000,
      iraLimit: 7500,
      iraCatchUp: 1100
    },
    // Rev. Proc. 2025-19 (HSA) and related fringe limits
    fringe: {
      hsaSelf: 4400, hsaFamily: 8750, hsaCatchUp55: 1000,
      dcfsaLimit: 7500,                  // §129, raised by OBBBA effective 2026
      educationAssistance: 5250,         // §127 (OBBBA made loan-payment use permanent)
      groupTermLifeExclusion: 50000      // §79
    },
    // Rev. Proc. 2025-32 / OBBBA §70301
    sec179: { max: 2560000, phaseOutStart: 4090000 },
    mileageRateBusiness: 0.725,          // 2026 standard business mileage rate
    kiddieTaxUnearnedThreshold: 2700,    // above this, taxed at parents' rate
    gift: { annualExclusion: 19000, estateExemption: 15000000 }, // OBBBA permanent
    // §1202 QSBS for stock acquired AFTER 7/4/2025 (OBBBA)
    qsbs: {
      grossAssetCap: 75000000,
      perIssuerCap: 15000000,
      exclusionTiers: { yr3: 0.50, yr4: 0.75, yr5plus: 1.00 }
    }
  }
};

TSIQ.FILING_STATUS_LABELS = {
  single: 'Single',
  mfj: 'Married Filing Jointly',
  mfs: 'Married Filing Separately',
  hoh: 'Head of Household'
};

// Shared formatting helpers — round only at display, never in the engine.
TSIQ.fmt = {
  usd: function (n) {
    var sign = n < 0 ? '-' : '';
    return sign + '$' + Math.abs(Math.round(n)).toLocaleString('en-US');
  },
  usd0: function (n) { return TSIQ.fmt.usd(n); },
  pct: function (n, dp) {
    return (n * 100).toFixed(dp === undefined ? 1 : dp) + '%';
  }
};

// Shared HTML-escaping helper — lives here (not in a renderer file) so every
// consumer (app.js, all four renderers) has no load-order dependency on
// which renderer happens to load first.
TSIQ.esc = function (s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
