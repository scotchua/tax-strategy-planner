/* ============================================================================
 * STRATEGY: Repair vs. Capitalization (Tangible Property Regs)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'repair-vs-capitalization',
  name: 'Repair vs. Capitalization (Tangible Property Regs)',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 58,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      'The tangible property regulations (Reg. §§1.162-3, 1.263(a)-1 through ' +
      '-3) decide whether property spending is deducted THIS year under §162 ' +
      'or capitalized and depreciated over 27.5/39 years under §263(a). ' +
      'Three safe harbors do most of the planning work: the de minimis safe ' +
      'harbor (expense items up to $2,500 per invoice/item without an ' +
      'applicable financial statement, $5,000 with one — annual election, ' +
      'requires a written capitalization policy in place at year start for ' +
      'the AFS tier); the routine maintenance safe harbor (recurring upkeep ' +
      'expected more than once in 10 years for buildings); and the small ' +
      'taxpayer safe harbor (buildings with unadjusted basis ≤ $1M, total ' +
      'repairs/improvements ≤ the LESSER of $10,000 or 2% of building ' +
      'basis). Everything else runs through the BAR test — capitalize if ' +
      'the work is a Betterment, Adaptation, or Restoration of a building ' +
      'system or the structure; otherwise deduct. Invoice wording and ' +
      'project structuring legitimately move real dollars between "now" ' +
      'and "over 39 years."',
    mechanics: [
      'De minimis safe harbor (Reg. §1.263(a)-1(f)): expense any item ' +
      'costing ≤ $2,500 (per invoice or per item as substantiated) without ' +
      'an AFS, ≤ $5,000 with an audited AFS and a written policy as of the ' +
      'first day of the year. Elected annually by attaching a statement to ' +
      'the return. Notice 2015-82 set the $2,500 non-AFS threshold.',
      'Routine maintenance safe harbor (Reg. §1.263(a)-3(i)): recurring work ' +
      'that keeps property in ordinarily efficient operating condition — ' +
      'for buildings, activities reasonably expected more than once in 10 ' +
      'years (HVAC servicing, resealing, repainting cycles) — deductible ' +
      'even if it would otherwise look like an improvement.',
      'Small taxpayer safe harbor (Reg. §1.263(a)-3(h)): gross receipts ≤ ' +
      '$10M and building unadjusted basis ≤ $1M — deduct ALL repairs and ' +
      'improvements on the building if the year\'s total is ≤ the lesser of ' +
      '$10,000 or 2% of the building\'s basis. Annual, per-building election.',
      'The BAR standard (Reg. §1.263(a)-3(j)/(k)/(l)): capitalize ' +
      'Betterments (fixing a pre-existing defect, material addition or ' +
      'increase in capacity/quality), Restorations (replacing a major ' +
      'component or substantially all of a building system, rebuilding to ' +
      'like-new after class life), and Adaptations (new or different use). ' +
      'Applied to each building SYSTEM (HVAC, plumbing, electrical, roof/' +
      'structure, etc.) — replacing 30% of a roof membrane is analyzed ' +
      'against the roof, not the whole building.',
      'Planning levers: separately invoiced components under the de minimis ' +
      'ceiling; splitting genuine repair scopes from improvement scopes in ' +
      'contracts; timing partial replacements below the "major component" ' +
      'line; pairing any forced capitalization with the partial disposition ' +
      'election on what was removed.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.263(a)-1(f)', note: 'De minimis safe harbor: $2,500/item without an AFS, $5,000 with; annual election statement; written policy requirement for the AFS tier.' },
      { type: 'Admin', cite: 'Notice 2015-82', note: 'Raised the non-AFS de minimis threshold from $500 to $2,500 (tax years beginning on/after 1/1/2016).' },
      { type: 'Reg', cite: 'Reg. §1.263(a)-3(i)', note: 'Routine maintenance safe harbor; for buildings, maintenance expected more than once in 10 years.' },
      { type: 'Reg', cite: 'Reg. §1.263(a)-3(h)', note: 'Small taxpayer safe harbor: building basis ≤ $1M; deduct if annual repairs+improvements ≤ lesser of $10,000 or 2% of basis.' },
      { type: 'Reg', cite: 'Reg. §1.263(a)-3(j), (k), (l)', note: 'The BAR capitalization standards — betterments, restorations, adaptations — applied per building system.' },
      { type: 'IRC', cite: 'IRC §162(a); §263(a)', note: 'The deduct-now vs. capitalize divide the entire framework administers.' },
      { type: 'Reg', cite: 'Reg. §1.162-3', note: 'Materials and supplies: incidental supplies deducted when paid; non-incidental when used.' }
    ],
    requirements: [
      'Invoice-level detail: the safe harbors are applied per item/invoice, so contractors must bill in a way that shows the components.',
      'De minimis: a capitalization policy in place at the start of the year (written policy required for the $5,000 AFS tier) and the annual election statement with the return.',
      'Small taxpayer safe harbor: building unadjusted basis ≤ $1M and the year\'s building spending within the lesser-of-$10k/2% ceiling.',
      'Honest BAR analysis for anything outside the safe harbors — documented per building system.'
    ],
    risks: [
      'Deducting true improvements (major component replacements, capacity upgrades) is a classic exam adjustment with accuracy-penalty exposure — the safe harbors do not launder betterments.',
      'The de minimis election covers ALL qualifying items — it is all-or-nothing for the year, and it also FORFEITS depreciation/§179 on those items (rarely matters, occasionally does).',
      'Splitting one improvement project into artificial invoices to duck the thresholds is a substance-over-form loser; splitting genuinely distinct scopes is fine.',
      'Missed election statements (de minimis and small-taxpayer are ANNUAL) quietly cost the safe harbor for the year.',
      'Rental losses created by heavy repair years remain subject to §469 gating.'
    ],
    bestFit: [
      'Landlords and building owners with recurring maintenance and mid-size repair projects (the $2,500–$50,000 zone where classification is genuinely in play).',
      'Small-building owners (≤ $1M basis) who can clear whole years of spending through the small taxpayer safe harbor.',
      'Clients planning renovations, where scoping contracts up front preserves repair treatment for the repair portion.'
    ],
    implementation: [
      'Adopt/refresh a written capitalization policy BEFORE January 1 (required for the $5,000 AFS tier; good hygiene at any size).',
      'Instruct contractors to invoice by component and scope — separate repair line items from improvement line items.',
      'Attach the annual de minimis election (and small-taxpayer election, per building, if eligible) to the return.',
      'Run the BAR analysis on anything above the safe harbors; document the building-system reasoning.',
      'When capitalization is unavoidable, pair it with the partial asset disposition election on the replaced component.'
    ]
  },

  client: {
    teaser: 'Same dollars spent on your property — dramatically different deduction timing',
    headline: 'Deduct property spending now instead of over 39 years',
    plainEnglish: [
      'When you spend money on a building, the tax law sorts it into two piles: "repairs," which you deduct right away, and "improvements," which you deduct over as long as 39 years. The line between the piles is blurrier than most people think — and where a dollar lands can matter more than the dollar itself.',
      'The IRS actually gives you several friendly shortcuts. Items under $2,500 on an invoice can simply be expensed. Routine upkeep — servicing the HVAC, repainting, resealing the lot — is deductible even when it\'s substantial. And owners of smaller buildings can often deduct an entire year\'s worth of work if it stays under a cap.',
      'The planning happens before the work does: how contracts are written, how invoices are itemized, and which elections we attach to your return. Same projects, same spending — but a repair deducted today is worth far more than the same dollars dripping out over four decades.'
    ],
    analogy: 'It\'s the difference between being repaid today or in monthly installments through 2065 — the amount is the same, but you\'d much rather have it now.',
    benefits: [
      'Immediate deductions for spending that others put on a 39-year schedule',
      'Simple annual elections capture the IRS\'s own safe harbors',
      'Smarter contractor invoices — no change in the actual work',
      'Fewer gray areas and better audit protection, because the rules are followed on purpose'
    ],
    steps: [
      'We put the right written policy in place before the year starts',
      'We coach you (and your contractors) on how work should be scoped and billed',
      'We attach the annual elections to your return — every year they help',
      'For bigger projects, we analyze the right treatment before you sign the contract'
    ],
    considerations: [
      'Genuine improvements — a full roof replacement, an addition — must still be spread over time; the planning maximizes what legitimately counts as repairs, it doesn\'t relabel everything.',
      'Two of the shortcuts require an election with each year\'s return, so consistency matters.'
    ]
  },

  inputs: [
    { key: 'expensedAmount', label: 'Spending treated as currently deductible', type: 'currency', default: 20000 },
    { key: 'targetIncome', label: 'Where the property is used', type: 'select', default: 'rental',
      options: [{ value: 'rental', label: 'Rental (Sch E)' }, { value: 'business', label: 'Business (Sch C / K-1)' }] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs the selected income stream
  },

  /**
   * Model vs. baseline: the baseline is assumed to CAPITALIZE these dollars
   * into the building and depreciate straight-line (27.5-yr rental / 39-yr
   * business-commercial — a simplification; some capitalized items would be
   * shorter-lived). Repair treatment deducts them now:
   *   Year 1: extra deduction = amount − (amount / recovery)
   *   Years 2+: income HIGHER than baseline by amount / recovery (the
   *   baseline's depreciation slice was used up). Recovery exceeds the
   *   projection window, so the give-back runs every later year.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var amt = params.expensedAmount || 0;

    if (yearIndex === 0) {
      var route, recovery;
      if (params.targetIncome === 'business') {
        route = p.scheduleCNet > 0 ? 'scheduleCNet' : (p.passthroughK1 > 0 ? 'passthroughK1' : 'none');
        recovery = tb.commercialRecoveryYears;
      } else {
        route = 'rentalNet';
        recovery = tb.residentialRentalRecoveryYears;
      }
      state.repairRoute = route;
      state.repairRecovery = recovery;
      if (route === 'none') {
        notes.push('No positive business income (Schedule C or K-1) to deduct against — ' +
          'select the rental stream or correct the profile. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      var sl = amt / recovery;
      p[route] = (p[route] || 0) - (amt - sl);
      notes.push(TSIQ.fmt.usd(amt) + ' expensed under the tangible property regs (de ' +
        'minimis / routine maintenance / small-taxpayer safe harbors and BAR analysis), ' +
        'modeled net of the ' + TSIQ.fmt.usd(sl) + ' straight-line slice the baseline ' +
        'would have deducted by capitalizing over ' + recovery + ' years.');
      notes.push('De minimis and small-taxpayer safe harbors are ANNUAL elections — ' +
        'attach the statements to each year\'s return.');
      if (route === 'rentalNet' && !p.rentalLossesUsable && (p.rentalNet || 0) < 0) {
        notes.push('Rental losses flagged NOT currently usable (§469) — the excess is ' +
          'suspended and carried forward in the projection.');
      }
    } else if (state.repairRoute && state.repairRoute !== 'none') {
      // Baseline still deducts its straight-line slice; expensing used it up.
      p[state.repairRoute] = (p[state.repairRoute] || 0) + amt / state.repairRecovery;
    }
    return { profile: p, notes: notes };
  }
});
