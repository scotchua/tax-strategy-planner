/* ============================================================================
 * STRATEGY: 1031 Like-Kind Exchange
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'like-kind-1031',
  name: '1031 Like-Kind Exchange',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 54,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      '§1031 defers gain (and depreciation recapture, to the extent rolled ' +
      'into replacement real property) when real property held for productive ' +
      'use in a trade or business or for investment is exchanged for ' +
      'like-kind real property. Post-TCJA, §1031 is REAL PROPERTY ONLY. In a ' +
      'deferred exchange the taxpayer must never touch the proceeds — a ' +
      'qualified intermediary holds them — and must identify replacement ' +
      'property within 45 days and close within 180 days (or the return due ' +
      'date, if earlier). Basis carries over reduced by deferred gain: this ' +
      'is deferral, not elimination — unless the client holds until death, ' +
      'where §1014 step-up erases the deferred gain entirely ("swap till you ' +
      'drop").',
    mechanics: [
      'Deferral mechanics: realized gain is recognized only to the extent of ' +
      'boot (cash or non-like-kind property received, including net debt ' +
      'relief). Fully deferring requires equal-or-greater value AND ' +
      'equal-or-greater equity/debt in the replacement.',
      '45-day identification window (max 3 properties, or the 200%-of-value ' +
      'rule) and 180-day exchange period run from the transfer of the ' +
      'relinquished property — both are hard statutory deadlines under ' +
      '§1031(a)(3) with no extensions except federally declared disasters.',
      'Constructive receipt kills the exchange: proceeds must sit with a ' +
      'qualified intermediary under the Reg. §1.1031(k)-1(g) safe harbors, ' +
      'engaged BEFORE closing on the sale.',
      'Replacement basis = cost minus deferred gain (§1031(d)) — depreciation ' +
      'restarts on the carryover portion\'s old schedule, so serial ' +
      'exchangers accumulate low basis and high recapture exposure.',
      'Real property only post-TCJA (§1031(a)(1)); like-kind is broad within ' +
      'real estate (raw land for apartments, farm for retail all qualify).',
      'Endgame options: keep exchanging and hold until death for a §1014 ' +
      'step-up (heirs take FMV basis, deferred gain never taxed), or plan a ' +
      'taxable exit in a low-bracket year.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1031(a)', note: 'Nonrecognition for like-kind exchanges of real property held for business or investment; TCJA limited §1031 to real property.' },
      { type: 'IRC', cite: 'IRC §1031(a)(3)', note: 'The 45-day identification and 180-day receipt deadlines for deferred exchanges — statutory and unforgiving.' },
      { type: 'IRC', cite: 'IRC §1031(b), (d)', note: 'Boot recognition; carryover basis reduced by deferred gain — deferral, not forgiveness.' },
      { type: 'Reg', cite: 'Reg. §1.1031(k)-1', note: 'Deferred exchange rules: qualified intermediary and other safe harbors that avoid constructive receipt of proceeds.' },
      { type: 'Case', cite: 'Starker v. United States, 602 F.2d 1341 (9th Cir. 1979)', note: 'Validated non-simultaneous (deferred) exchanges — the origin of the modern "Starker" exchange, later codified with the 45/180-day limits.' },
      { type: 'IRC', cite: 'IRC §1014', note: 'Basis step-up at death — the "swap till you drop" endgame that converts deferral into permanent elimination.' },
      { type: 'Admin', cite: 'Form 8824', note: 'Like-kind exchange reporting: filed for the year of the exchange, computing realized vs. recognized gain and replacement basis.' }
    ],
    requirements: [
      'Both relinquished and replacement properties are REAL property held for business or investment (no personal residences, no flips held primarily for sale).',
      'A qualified intermediary engaged before the relinquished-property closing; taxpayer never receives or controls proceeds.',
      'Identification in writing within 45 days; acquisition within 180 days (or the return due date with extension, if earlier).',
      'To defer fully: replacement value, equity, and debt each equal or exceed the relinquished amounts (or added cash covers debt shortfall).'
    ],
    risks: [
      'Blown deadlines or constructive receipt = fully taxable sale; there is no "close enough" in a deferred exchange.',
      'QI failure/insolvency risk — use a bonded, reputable intermediary with segregated accounts.',
      'Boot surprises: net debt relief and closing-cost mismatches recognize gain unexpectedly.',
      'Low carryover basis means less depreciation going forward and a larger recapture bomb on a future taxable sale.',
      'Related-party exchanges carry a 2-year holding rule (§1031(f)) — dispositions within 2 years unwind the deferral.',
      'The engine does not model the eventual recognition on a later taxable sale — the deferred gain remains embedded in the replacement property.'
    ],
    bestFit: [
      'Landlords trading up: consolidating small properties into larger ones, or relocating equity to better markets.',
      'Clients with large built-in gains and no near-term cash need from the sale.',
      'Estate-planning-minded owners intending to hold replacement property until death (§1014 step-up).'
    ],
    implementation: [
      'Engage the qualified intermediary and exchange counsel BEFORE listing/closing the relinquished property.',
      'Calendar day 45 and day 180 from the closing date; identify up to 3 candidates in writing to the QI.',
      'Match value, equity, and debt on the replacement to defer fully; price any intentional boot.',
      'Close through the QI; never route funds through the client\'s accounts.',
      'File Form 8824 with the year-of-exchange return; track carryover basis and recapture exposure in the permanent file.'
    ]
  },

  client: {
    teaser: 'Sell a property and keep 100% of the gain working for you',
    headline: 'Trade properties without paying tax on the way',
    plainEnglish: [
      'Normally, selling an investment property with a large gain means handing a big slice to the IRS before you can reinvest. A like-kind exchange lets you sell one investment property and buy another while deferring the entire tax bill — every dollar of your equity keeps compounding in the new property.',
      'The rules are strict but manageable: a neutral middleman holds the sale money (you never touch it), you name your replacement property within 45 days, and you close within 180 days. Miss a step and the whole sale becomes taxable, so this is a planned maneuver, not an afterthought.',
      'The tax isn\'t forgiven — it\'s postponed, and it rides along inside the new property. But you can exchange again and again, and under current law, property held until death passes to your heirs with the old gains wiped out entirely. Deferred long enough, the tax may simply never come due.'
    ],
    analogy: 'It\'s like moving your chips from one table to another without the house taking its cut in between — the whole stack stays in play.',
    benefits: [
      'Defer the full tax bill on a property sale — often hundreds of thousands of dollars',
      'All of your equity moves into the next property and keeps growing',
      'Repeatable: exchange as many times as your strategy calls for',
      'Held until death, the deferred gains can be erased for your heirs'
    ],
    steps: [
      'We line up the exchange team before your sale closes — timing is everything',
      'We help you plan the replacement purchase so the numbers fully defer the tax',
      'We watch the 45-day and 180-day deadlines like hawks',
      'We handle the tax reporting and track the numbers for your future planning'
    ],
    considerations: [
      'This postpones tax rather than eliminating it — unless the property is held until death, the deferred gain resurfaces when you eventually sell for cash.',
      'The deadlines are absolute and the sale money must stay with a neutral intermediary — one misstep makes the whole gain taxable.'
    ]
  },

  inputs: [
    { key: 'deferredGain', label: 'Gain deferred via exchange', type: 'currency', default: 200000 }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs LTCG in the profile for the sale year
  },

  /**
   * Models the year-of-sale deferral only: reduces ltcg by the deferred gain,
   * capped at the profile's LTCG. The eventual recognition on a later taxable
   * sale of the replacement property is outside the projection (indefinite
   * deferral / possible §1014 step-up) — noted, not modeled. NIIT savings
   * flow automatically from the lower ltcg.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) {
      return { profile: p, notes: notes };
    }
    var deferred = Math.min(params.deferredGain || 0, Math.max(p.ltcg || 0, 0));
    if (deferred <= 0) {
      notes.push('No long-term capital gain in the profile — enter the property gain ' +
        'as LTCG in the year of sale for this exchange to defer. No benefit modeled.');
      return { profile: p, notes: notes };
    }
    p.ltcg = p.ltcg - deferred;
    notes.push(TSIQ.fmt.usd(deferred) + ' of gain deferred via §1031 exchange (45/180-day ' +
      'deadlines, qualified intermediary). Deferral, not elimination: the gain carries ' +
      'over into the replacement property\'s basis and is recognized on a future taxable ' +
      'sale — or eliminated at death via the §1014 step-up.');
    if ((params.deferredGain || 0) > deferred) {
      notes.push('Deferral capped at the profile\'s ' + TSIQ.fmt.usd(deferred) +
        ' of LTCG — the exchange cannot defer more gain than the sale produces.');
    }
    return { profile: p, notes: notes };
  }
});
