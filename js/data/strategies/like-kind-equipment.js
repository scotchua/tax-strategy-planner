/* ============================================================================
 * STRATEGY: Like-Kind Exchanges on Equipment (Post-TCJA Reality)
 * ADVISORY — corrects stale client expectations; no scenario math.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'like-kind-equipment',
  name: 'Like-Kind Exchanges on Equipment (Post-TCJA Reality)',
  category: 'Income Timing & Character',
  applyOrder: 3,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Since TCJA, §1031 applies ONLY to real property — for exchanges completed ' +
      'after 12/31/2017, equipment and vehicle trade-ins are fully taxable ' +
      'dispositions. A trade-in is now a sale at the trade-in allowance: gain ' +
      '(usually §1245 ordinary recapture on depreciated equipment) is recognized ' +
      'in full, and the replacement asset takes a full cost basis. The federal ' +
      'sting is usually neutralized because 100% bonus depreciation (§168(k), ' +
      'permanent under OBBBA) or §179 expenses the replacement in the same year ' +
      '— but the offset is not automatic and fails in specific pockets: states ' +
      'that decouple from bonus/§179, recapture landing as ordinary income while ' +
      'the client expected deferral, and cash purchases late in a loss year. ' +
      'This entry exists to correct stale pre-2018 client expectations and to ' +
      'flag the pockets where the "wash" is not a wash.',
    mechanics: [
      'TCJA (P.L. 115-97) amended §1031(a)(1) to "real property" only, for ' +
      'exchanges completed after 12/31/2017. Equipment, vehicles, machinery, ' +
      'aircraft, and other personal property no longer qualify.',
      'An equipment trade-in is bifurcated: (1) a sale of the old asset at the ' +
      'trade-in allowance — gain up to prior depreciation is §1245 ordinary ' +
      'recapture; and (2) a purchase of the new asset at full invoice price.',
      'The federal offset: the replacement is typically eligible for 100% bonus ' +
      'depreciation (§168(k)) or §179 expensing ($2,560,000 limit / $4,090,000 ' +
      'phase-out, 2026), so the year-one deduction usually equals or exceeds the ' +
      'recognized recapture — net federal effect near zero when the replacement ' +
      'costs at least as much as the trade-in allowance.',
      'The offset FAILS at the state level in nonconformity states: several ' +
      'states disallow or severely limit bonus depreciation (and some cap §179), ' +
      'so the recapture is taxed currently while the replacement deduction ' +
      'spreads over the state depreciation life.',
      'Character mismatch: recapture is ordinary income (no LTCG rates), it ' +
      'increases AGI-driven phase-outs, and for a Schedule C it lands on Form ' +
      '4797 (not subject to SE tax, but fully ordinary).',
      'Real property exchanges still fully qualify — 45-day identification, ' +
      '180-day closing, qualified intermediary. Do not let the equipment rule ' +
      'bleed into real-estate expectations, and note Reg. §1.1031(a)-3 defines ' +
      'real property broadly (including certain inherently permanent structures).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1031(a)(1) (as amended by TCJA, P.L. 115-97)', note: 'Like-kind deferral limited to REAL property for exchanges completed after 12/31/2017 — personal property exchanges are taxable.' },
      { type: 'IRC', cite: 'IRC §1245', note: 'Depreciation recapture — gain on disposed equipment is ordinary income to the extent of prior depreciation, recognized in the trade-in year.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, permanent under OBBBA (P.L. 119-21) for property acquired after 1/19/2025 — the usual federal offset to the recognized recapture.' },
      { type: 'IRC', cite: 'IRC §179', note: 'Election to expense — $2,560,000 limit / $4,090,000 phase-out (2026); the alternative offset, but several states cap it.' },
      { type: 'Reg', cite: 'Reg. §1.1031(a)-3', note: 'Post-TCJA definition of real property for §1031 — what still qualifies (land, buildings, inherently permanent structures, certain structural components).' },
      { type: 'IRC', cite: 'IRC §1001', note: 'A trade-in is a realization event: amount realized equals the trade-in allowance credited against the replacement.' },
      { type: 'Admin', cite: 'Form 4797', note: 'Sales of Business Property — where the trade-in gain and §1245 recapture are reported.' }
    ],
    requirements: [
      'Recognize the disposition on every equipment trade-in — report the sale at the trade-in allowance on Form 4797; do not carry over basis as if pre-2018 law applied.',
      'Confirm the replacement qualifies for bonus/§179 (used property qualifies for bonus if not previously used by the taxpayer — §168(k)(2)(E)(ii)).',
      'Check the state conformity position for BOTH the recapture and the replacement deduction before promising a client the trade is a wash.',
      'For real-property exchanges, all traditional §1031 mechanics still apply (QI, 45/180-day windows).'
    ],
    risks: [
      'Stale expectations: clients (and old software defaults) still assume equipment trades are tax-free — the recapture surprise shows up at filing, not at the dealership.',
      'State nonconformity: recapture taxed now, replacement deducted slowly — a real current-year state cost in decoupled states.',
      'Loss-year mismatch: recognizing recapture in a profitable year but the offsetting bonus deduction being trapped (e.g., contributing to an excess business loss under §461(l)) changes the timing math.',
      'Fleet/heavy-equipment businesses with continuous trade cycles now have annual recapture churn that must be tracked asset by asset.',
      'Mislabeling personal property as real property to force §1031 treatment invites exam adjustment — Reg. §1.1031(a)-3 draws the line, not the invoice description.'
    ],
    bestFit: [
      'Clients with equipment, vehicle, or machinery trade cycles who last looked at the rules before 2018.',
      'Multi-state businesses where the state answer diverges from the federal wash.',
      'Clients planning large fleet turnover who should sequence trades against income years.'
    ],
    implementation: [
      'Inventory upcoming equipment trades and compute expected §1245 recapture on each.',
      'Confirm bonus/§179 eligibility and elect the better of the two for the replacement (state caps considered).',
      'Prepare the state add-back schedule in nonconformity states and quantify the current-year state cost.',
      'Report each trade on Form 4797 in the year of the trade; set the replacement\'s basis at full cost.',
      'For real-property exchanges, engage a qualified intermediary BEFORE closing and calendar the 45/180-day deadlines.'
    ]
  },

  client: {
    teaser: 'Stops an outdated assumption from turning your next equipment trade into a tax surprise',
    headline: 'Equipment trade-ins changed — here\'s the new playbook',
    plainEnglish: [
      'For decades, trading in old equipment for new was tax-free — the old machine\'s value just rolled into the new one. That rule changed in 2018: today, only real estate gets that treatment. A trade-in of equipment, trucks, or machinery now counts as a sale, and any value above what\'s left on your books is taxable income that year.',
      'The good news: current law usually lets you deduct 100% of the new equipment\'s cost in the same year. In most cases that deduction cancels out the tax on the trade-in, so the net federal result is close to zero.',
      'But "usually" isn\'t "always." Some states don\'t allow the instant write-off, and certain situations leave you with real tax due on the trade even though no cash hit your pocket. We check your specific trades and your state before you sign, so nothing surprises you at tax time.'
    ],
    analogy: 'It\'s like a store changing its exchange policy from "even swap" to "we buy your old one, you buy the new one." Most days the two receipts cancel out — but not always, so we read both receipts before you trade.',
    benefits: [
      'No filing-season surprises on equipment and vehicle trades',
      'The new equipment\'s full cost is usually deductible immediately',
      'State-level costs identified before you commit, not after',
      'Trade timing planned around your income years for the best result'
    ],
    steps: [
      'Tell us before you trade equipment or vehicles — a quick review is all it takes',
      'We calculate the taxable piece and the offsetting deduction, federal and state',
      'We time or structure the trade if the numbers say waiting or splitting helps',
      'We handle all the tax reporting on the trade'
    ],
    considerations: [
      'In some states the write-off that offsets the trade is limited, so a trade can create a real state tax bill — we quantify it first.',
      'This is about avoiding a trap and timing trades well, not about generating new savings — real estate is where the old tax-free exchange still lives.'
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
