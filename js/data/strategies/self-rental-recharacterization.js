/* ============================================================================
 * STRATEGY: Self-Rental Recharacterization Planning
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'self-rental-recharacterization',
  name: 'Self-Rental Recharacterization Planning',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 56,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Reg. §1.469-2(f)(6) recharacterizes NET INCOME from renting property ' +
      'to a trade or business in which the taxpayer materially participates ' +
      'as NONPASSIVE — while net LOSSES from the same arrangement stay ' +
      'passive. The asymmetry is deliberate and one-directional: a client ' +
      'who owns the building their S corp operates from cannot use ' +
      'self-rental income to absorb passive losses from other investments, ' +
      'but a loss on the same building is trapped in the passive bucket. ' +
      'Courts have uniformly upheld the rule (Krukowski, 7th Cir. 2002). ' +
      'Planning is therefore about structure and rent-setting within ' +
      'arm\'s-length bounds: grouping the rental with the operating business ' +
      'under Reg. §1.469-4(d)(1), calibrating rent so the rental neither ' +
      'strands losses nor manufactures phantom nonpassive income, and ' +
      'sequencing depreciation strategies (cost segregation on a self-rented ' +
      'building creates a PASSIVE loss unless grouped). Advisory: the value ' +
      'is avoiding mispriced structures, not a computable deduction.',
    mechanics: [
      'The rule: rent property to a business in which you (or your spouse) ' +
      'materially participate → net rental INCOME is recharacterized ' +
      'nonpassive; net rental LOSS remains passive (Reg. §1.469-2(f)(6), ' +
      'the "self-rental rule").',
      'Why it exists: without it, owners would set above-market rent to ' +
      'their own company to generate passive income absorbing unrelated ' +
      'passive losses. The recharacterization closes that door in one ' +
      'direction only.',
      'The trap: cost segregation or heavy repairs on a self-rented building ' +
      'produce a passive loss that cannot offset the owner\'s (nonpassive) ' +
      'business income — unless the rental and the business are properly ' +
      'grouped as one activity under Reg. §1.469-4(d)(1) (allowed where the ' +
      'ownership of the rental and the business is proportionate, or one is ' +
      'insubstantial).',
      'Rent-setting levers (within arm\'s-length bounds, supported by ' +
      'comparables): lower rent shifts income into the operating business ' +
      '(QBI-eligible, but SE/payroll-relevant); higher rent shifts income to ' +
      'the rental side where it is nonpassive but escapes SE tax. §482-style ' +
      'reasonableness discipline applies practically at exam.',
      'A self-rental with net income generally still qualifies for §199A QBI ' +
      'via the common-ownership aggregation/trade-or-business analysis (Reg. ' +
      '§1.199A-1(b)(14) treats rentals to a 50%-commonly-controlled business ' +
      'as a trade or business).',
      'Written leases, market-rate documentation, and consistent treatment ' +
      'year to year are the exam defense.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.469-2(f)(6)', note: 'The self-rental rule: net income from property rented to a materially-participated business is nonpassive; losses stay passive.' },
      { type: 'IRC', cite: 'IRC §469(l)', note: 'Grant of regulatory authority under which the recharacterization rules were issued.' },
      { type: 'Case', cite: 'Krukowski v. Comm\'r, 279 F.3d 547 (7th Cir. 2002)', note: 'Upheld the self-rental recharacterization regulation against a validity challenge — attorney renting an office building to his own firm.' },
      { type: 'Reg', cite: 'Reg. §1.469-4(d)(1)', note: 'When a rental may be grouped with a trade-or-business activity (insubstantiality or proportionate ownership) — the main structural fix.' },
      { type: 'Reg', cite: 'Reg. §1.199A-1(b)(14)', note: 'Self-rented property leased to a 50%-commonly-controlled business is treated as a trade or business for QBI purposes.' },
      { type: 'Admin', cite: 'Rev. Proc. 2010-13', note: 'Disclosure requirements if the grouping fix is elected.' }
    ],
    requirements: [
      'Identify every arrangement where the client (or spouse) rents property to an entity in which they materially participate.',
      'A written, arm\'s-length lease with rent supported by market comparables.',
      'If grouping is the fix: proportionate ownership between rental and business (or insubstantiality) plus the Rev. Proc. 2010-13 disclosure.',
      'Annual review of rent level whenever depreciation strategies or major repairs will swing the rental between income and loss.'
    ],
    risks: [
      'The asymmetry bites silently: advisors who treat self-rental income as passive at exam face recharacterization, lost loss offsets, and penalties.',
      'Cost segregation on an ungrouped self-rented building strands the loss in the passive bucket — sequencing error, common and expensive.',
      'Aggressive rent manipulation (far above or below market) invites recharacterization of the arrangement itself and state payroll/SE scrutiny.',
      'Grouping is binding and affects disposition-year loss recognition — model the exit first.',
      'Terminating material participation (e.g., semi-retirement) flips the analysis; the plan must be revisited on role changes.'
    ],
    bestFit: [
      'Business owners holding their operating real estate in a separate LLC (the standard liability structure) — which is exactly when the rule applies.',
      'Clients planning cost segregation or major improvements on a building rented to their own company.',
      'Owners with other passive losses hoping (incorrectly) to absorb them with self-rental income — they need this analysis before filing.'
    ],
    implementation: [
      'Map the ownership of the operating entity and the real estate entity; confirm material participation in the operating business.',
      'Test the current rent against market comparables; document with a broker opinion or comparable leases.',
      'Decide the structure: group rental + business under Reg. §1.469-4(d)(1) (file the disclosure) or keep them separate with rent calibrated to the plan.',
      'Sequence depreciation strategies AFTER the grouping decision so accelerated losses land in a usable bucket.',
      'Recheck on any change in ownership percentages, participation, or lease terms.'
    ]
  },

  client: {
    teaser: 'Own the building your business runs from? One-way tax rules apply to you',
    headline: 'Renting to your own business: plan around the one-way rule',
    plainEnglish: [
      'Many business owners own their building personally and rent it to their company — smart for liability protection. But a special tax rule applies: if the building makes money, the IRS counts that profit as "active" income; if it loses money, the loss is "passive" and usually can\'t offset your other income. Heads they win, tails you lose.',
      'This one-way rule catches owners by surprise in two situations. First, if you were counting on the rent income to soak up losses from other investments — it can\'t. Second, if you spend big on the building (renovations, accelerated depreciation), the resulting loss can get stuck in a bucket where it does you no good.',
      'The good news: with the right setup — often a simple election that treats the building and the business as one — and rent set at a documented market rate, the rule stops working against you. The key is arranging things before the big deductions happen, not after.'
    ],
    analogy: 'It\'s like a valve in your plumbing that only lets water flow one direction — we can\'t remove the valve, but we can re-route the pipes so it never works against you.',
    benefits: [
      'Keeps big building deductions usable instead of stranded',
      'Rent set at the level that saves the most across both your business and the building',
      'Protects you from a common and expensive audit surprise',
      'Preserves the liability protection of keeping the building separate'
    ],
    steps: [
      'We review your building lease, ownership, and rent level',
      'We check whether the one-way rule is currently costing you anything',
      'We set the structure and elections so future deductions land where they count',
      'We document the market rent so the arrangement stands up to scrutiny'
    ],
    considerations: [
      'This is preventive planning — its value shows up as losses that stay usable and audits that go nowhere, not as a line-item deduction.',
      'The structural election involved is binding in future years, so we model your eventual exit from the building before filing it.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
