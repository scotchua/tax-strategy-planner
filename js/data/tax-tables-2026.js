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

  // §86 Social Security benefit taxability. base1/base2 are the "base
  // amount"/"adjusted base amount" thresholds — PERMANENT, NEVER indexed
  // for inflation since enacted (1983/1993). MFS uses $0/$0 UNLESS the
  // taxpayer lived apart from their spouse the entire year, in which case
  // the single thresholds apply instead (§86(c)(1)(C)/(2)(C)) — not
  // modeled as a separate flag here; this app assumes the harsher
  // living-with-spouse case for any MFS profile (see CLAUDE.md).
  socialSecurity: {
    base1: { single: 25000, mfj: 32000, mfs: 0, hoh: 25000 },
    base2: { single: 34000, mfj: 44000, mfs: 0, hoh: 34000 }
  },

  // Child Tax Credit (§24, as amended by OBBBA): $2,200 per qualifying child
  // (under 17) for 2026, $500 other-dependent credit. Phase-out: $50 per
  // $1,000 (or fraction) of MAGI over the threshold. Refundable portion
  // (Additional CTC, §24(h)(5)): $1,700 per child for 2026 (Rev. Proc.
  // 2025-32 §4.05; unchanged from 2025, now inflation-indexed under OBBBA),
  // limited to 15% of earned income over $2,500. The §24(d)(1)(B)(ii)
  // alternative for 3+ qualifying children (excess SS/SE tax over EIC) is
  // NOT modeled — acceptable for this clientele; flag if it ever matters.
  ctc: {
    refundableMax: 1700,
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

  // Medicare IRMAA surcharge tiers (Part B + Part D combined, PER PERSON per
  // year). NOT a tax the engine computes — surfaced only as an advisory
  // materiality note (see scenario-engine.js) when age65Count > 0, since
  // IRMAA sets Medicare premiums, not federal/state liability. Uses a
  // 2-year MAGI lookback in reality (this year's MAGI sets the premium TWO
  // YEARS from now); simplified here to flag each projection year's own
  // MAGI against this SAME flat 2026 tier table for every year shown (the
  // existing "2026 dollar thresholds, not inflation-indexed" simplification
  // — CMS announces each year's brackets separately; there is no fixed
  // statutory schedule to project forward the way the SALT cap has).
  // Source: CMS 2026 Medicare Part B/D premium announcement (Nov 2025) —
  // VERIFY the current-year CMS brackets before relying on this for an
  // actual premium estimate; this is a planning flag, not a bill.
  irmaa: {
    // [MAGI threshold, annual Part B+D surcharge PER Medicare enrollee].
    singleTiers: [
      [109000, 1148], [137000, 2885], [171000, 4620], [205000, 6355], [500000, 6936]
    ],
    mfjTiers: [
      [218000, 1148], [274000, 2885], [342000, 4620], [410000, 6355], [750000, 6936]
    ],
    // MFS (living with spouse anytime during the year) skips the graduated
    // tiers entirely: $0 below the first threshold, then jumps straight to
    // the tier-4 surcharge level (a deliberate anti-income-splitting design).
    mfsThreshold: 109000,
    mfsSurcharge: 6355
  },

  // §461(l) excess business loss limitation threshold — NOT modeled (the
  // engine does not disallow/carry forward the excess as an NOL), but used
  // to raise a quantified materiality warning when aggregate business loss
  // crosses it (see scenario-engine.js). OBBBA made §461(l) permanent AND
  // reset the inflation base back to the original TCJA amount starting 2026,
  // so the 2026 threshold is LOWER than 2025's: $256,000 single/HoH/MFS,
  // $512,000 MFJ (Rev. Proc. 2025-32 §4.31; MFS/HoH take the "other than
  // joint" figure, not half of the MFJ figure).
  excessBusinessLoss: {
    threshold: { single: 256000, mfj: 512000, mfs: 256000, hoh: 256000 }
  },

  // SALT cap under OBBBA for 2026: $40,400 cap ($20,200 MFS), phased down by
  // 30% of MAGI over $505,000 ($252,500 MFS), but never below the $10,000 floor.
  // P.L. 119-21 §70120: the cap and phase-down threshold both grow 1%/year
  // through 2029, then the ENTIRE enhanced-cap regime sunsets on 1/1/2030 and
  // reverts to the permanent flat cap in `floor` below with NO income
  // phase-down at all. Verified schedule: $40,400 (2026) -> $40,804 (2027)
  // -> $41,212 (2028) -> $41,624 (2029) -> $10,000 flat, no phase-down (2030+).
  // tax-engine.js's saltCapForYear() applies this using profile.projTaxYear
  // (set by scenario-engine.js per projection year); direct computeYear()
  // callers that never set projTaxYear get the 2026 baseline unchanged.
  salt: {
    cap: { single: 40400, mfj: 40400, mfs: 20200, hoh: 40400 },
    floor: { single: 10000, mfj: 10000, mfs: 5000, hoh: 10000 },
    phaseDownStart: { single: 505000, mfj: 505000, mfs: 252500, hoh: 505000 },
    phaseDownRate: 0.30,
    enhancedCapGrowthRate: 0.01,
    enhancedCapSunsetYear: 2029
  },

  // OBBBA §70103 "senior deduction": $6,000 per qualifying individual age 65+
  // (2026 figure; indexed 2027+), on top of the regular/aged standard
  // deduction, available whether itemizing or not. Phases out 6% of MAGI
  // over the threshold. Temporary (2025-2028) per current law — sunsetTaxYear
  // below is enforced in tax-engine.js against profile.projTaxYear; this is
  // enacted-law fidelity, not the unindexed-thresholds simplification
  // disclosed elsewhere (see CLAUDE.md).
  seniorDeduction: {
    amount: 6000,
    sunsetTaxYear: 2028,
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
      rothCatchupWageThreshold: 150000,  // SECURE 2.0 §603 (§414(v)(7)): catch-up must be
                                          // designated Roth if the participant's PRIOR-YEAR
                                          // FICA wages from this employer exceeded this
                                          // (indexed) threshold — 2026 figure per Notice 2025-67
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
    // suvCap: §179(b)(5)(A) heavy-SUV-specific cap (GVWR 6,001-14,000 lbs),
    // separate from and lower than the main §179 dollar limit above; does NOT
    // apply to §168(k) bonus depreciation. Inflation trend: $28,900 (2023),
    // $30,500 (2024), $31,300 (2025), $32,000 (2026 — Rev. Proc. 2025-32).
    sec179: { max: 2560000, phaseOutStart: 4090000, suvCap: 32000 },
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
