/* ============================================================================
 * STRATEGY: Capital Gain & Loss Harvesting
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'gain-loss-harvesting',
  name: 'Capital Gain & Loss Harvesting',
  category: 'Income Timing & Character',
  applyOrder: 6,
  modeled: true,

  advisor: {
    summary:
      'Two mirror-image year-end moves on the taxable portfolio. Loss harvesting: ' +
      'realize unrealized losses to offset recognized gains (and up to $3,000 of ' +
      'ordinary income under §1211(b), excess carried forward under §1212(b)), ' +
      'then re-establish exposure with a non-substantially-identical position to ' +
      'avoid the §1091 wash sale (30 days before and after). Gain harvesting: in ' +
      'low-income years, realize long-term gains inside the 0% LTCG bracket ' +
      '(taxable income up to $98,900 MFJ / $49,450 single for 2026) — tax-free ' +
      'gain recognition that resets basis higher, permanently removing that ' +
      'appreciation from future tax. The two are used in different years, not ' +
      'together: losses in high-income years, gains in gap years (retirement ' +
      'before RMDs, sabbaticals, loss years).',
    mechanics: [
      'Netting order: ST losses net against ST gains, LT against LT, then ' +
      'cross-net; a net capital loss offsets up to $3,000 of ordinary income ' +
      'per year (§1211(b)) with indefinite carryforward retaining character ' +
      '(§1212(b)). ST losses that absorb ST gains save ordinary rates — the ' +
      'highest-value harvest.',
      '§1091 wash sale: a loss is disallowed if substantially identical ' +
      'securities are acquired within 30 days before or after the sale ' +
      '(61-day window, including IRA purchases and DRIP reinvestments); the ' +
      'disallowed loss adds to the replacement\'s basis. Swap into a similar ' +
      'but not substantially identical fund to stay invested.',
      'Gain harvesting: LTCG stacking on top of ordinary income means gain is ' +
      'taxed at 0% only up to the breakpoint ($98,900 MFJ 2026 taxable income); ' +
      'gain above it spills into 15%. Sell and immediately repurchase — §1091 ' +
      'applies only to LOSSES, so there is no wash-sale problem on harvesting ' +
      'gains — and basis resets to market.',
      'Cliff interactions: harvested gains raise AGI even at a 0% rate — ' +
      'watch ACA premium credits, IRMAA (two-year lookback), the CTC phase-out, ' +
      'and state tax (most states have no 0% bracket).',
      'Stacking play: harvest losses against gains, and separately donate the ' +
      'most-appreciated long-term positions to charity (§170 FMV deduction, ' +
      'gain never recognized) — donate winners, harvest losers, never donate ' +
      'losers (sell them and take the loss first).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1211(b)', note: 'Capital losses allowed against capital gains plus up to $3,000 of ordinary income per year ($1,500 MFS).' },
      { type: 'IRC', cite: 'IRC §1212(b)', note: 'Indefinite carryforward of unused capital losses, retaining short/long character.' },
      { type: 'IRC', cite: 'IRC §1091', note: 'Wash sale — loss disallowed if substantially identical stock or securities are acquired within 30 days before or after; disallowed loss added to replacement basis.' },
      { type: 'IRC', cite: 'IRC §1(h)', note: 'LTCG rate stacking — 0%/15%/20% breakpoints; 2026 0% bracket tops out at $98,900 MFJ / $49,450 single taxable income (Rev. Proc. 2025-32).' },
      { type: 'IRC', cite: 'IRC §1411', note: 'NIIT — harvested gains count toward the $200k/$250k MAGI threshold even when in the 0% LTCG bracket.' },
      { type: 'IRC', cite: 'IRC §170(e)/(b)', note: 'FMV deduction for donated long-term appreciated stock with no gain recognition — the pairing for the harvest-then-donate stack.' },
      { type: 'IRC', cite: 'IRC §1012; §1014', note: 'Basis reset on repurchase after gain harvesting; step-up at death — the alternative for positions the client will never sell.' }
    ],
    requirements: [
      'A taxable brokerage account with realized or unrealized positions — none of this applies inside IRAs/401(k)s.',
      'Lot-level basis records and specific-identification elections with the broker (not average cost) so the right lots are sold.',
      'For loss harvesting: a replacement security that is similar but not substantially identical, and discipline across ALL accounts (including spouse and IRA) for the 61-day window.',
      'For gain harvesting: a reliable projection of taxable income showing room under the 0% breakpoint.'
    ],
    risks: [
      'Wash-sale foot-faults: dividend reinvestment, an IRA purchase, or a spouse\'s account buying the same security inside the window disallows the loss (an IRA wash permanently destroys it).',
      'Tracking error: the replacement position may not perform like the original during the holding window.',
      'Gain harvesting past the 0% breakpoint spills into 15% and can trip AGI-based cliffs (ACA subsidies, IRMAA) — size it to the projection, not the account balance.',
      'Most states tax harvested gains at ordinary state rates — the federal 0% is not a state 0%.',
      'Short-term thinking: harvesting a loss on a position about to rebound sacrifices more than the tax saved; the tax tail should not wag the investment dog.'
    ],
    bestFit: [
      'Loss harvesting: high-income years with realized gains, or volatile portfolios with harvestable lots.',
      'Gain harvesting: retirees before Social Security/RMDs, gap-year clients, and business owners in a down year.',
      'Clients with concentrated appreciated positions who also give to charity (the donate-winners stack).'
    ],
    implementation: [
      'Pull lot-level unrealized gain/loss reports in November; identify harvestable lots and their holding periods.',
      'Project taxable income to find the 0% LTCG headroom (or the gains needing loss offset).',
      'Execute sales with specific-lot identification; place replacement trades outside the 61-day window or in non-identical funds.',
      'For the charitable stack: transfer the most-appreciated LT lots to the donor-advised fund or charity BEFORE year-end instead of selling them.',
      'Reconcile every Form 1099-B lot at filing; report carryforwards on Schedule D and track them in the permanent file.'
    ]
  },

  client: {
    teaser: 'Mines your investment account for tax savings the market already created',
    headline: 'Let your portfolio\'s ups and downs cut your tax bill',
    plainEnglish: [
      'In any investment account, some holdings are up and some are down. The tax law lets you use both — deliberately — to lower your taxes, without changing what you\'re actually invested in.',
      'When markets dip, selling a losing position "captures" the loss for tax purposes. That loss cancels out gains elsewhere, plus up to $3,000 of regular income each year, and anything left over rolls forward. You immediately buy a similar investment, so your money stays in the market the whole time.',
      'In a low-income year — early retirement, a career break, a slow business year — the reverse move works: you can sell winners and pay zero federal tax on the profit, up to a generous limit. Then you buy them right back at the new, higher price, which permanently erases that tax on those gains.'
    ],
    analogy: 'It\'s like clipping coupons the market prints for you all year — down days print one kind, low-income years print another. They expire only if you never clip them.',
    benefits: [
      'Investment losses turned into real tax savings while you stay fully invested',
      'In low-income years, investment profits can be locked in completely tax-free',
      'Unused losses bank automatically for future years',
      'Pairs with charitable giving for a double benefit on your biggest winners'
    ],
    steps: [
      'We review your accounts each fall for positions worth harvesting',
      'We calculate exactly how much to sell for the best tax result',
      'You (or your advisor) place the trades — we provide the precise list and timing rules',
      'We report everything at tax time and track what carries forward'
    ],
    considerations: [
      'There\'s a 30-day rule about buying back the identical investment after selling at a loss — we give you the exact do\'s and don\'ts so a paperwork mistake doesn\'t cancel the benefit.',
      'The zero-tax window on gains has a hard ceiling based on your income, and most states still charge their own tax — we size everything to your actual numbers.'
    ]
  },

  inputs: [
    { key: 'lossesHarvested', label: 'Capital losses harvested', type: 'currency', default: 25000 },
    { key: 'gainsHarvested', label: 'Gains harvested at 0% (low-income years)', type: 'currency', default: 0 }
  ],

  suggest: function (p) {
    if (!((p.ltcg || 0) >= 50000)) return null;
    return { reason: TSIQ.fmt.usd(p.ltcg) + ' of capital gains — check the portfolio for harvestable losses and 0%-bracket gain-harvesting room.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs LTCG or 0% headroom
  },

  /**
   * Year 1 only (harvesting is a discrete year-end action). Losses reduce
   * ltcg; the engine itself floors the AGI effect of a net capital loss at
   * −3,000 (−1,500 MFS) per §1211(b) and reports the disallowed excess as
   * capitalLossDisallowed (carryforward years not modeled). Harvested gains
   * ADD to ltcg — genuinely tax-free only within the 0% bracket; the
   * engine's stacking shows any spillover into 15% honestly. The basis-reset
   * benefit of gain harvesting (lower FUTURE gains) is not modeled — the
   * shown cost is the conservative view.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) return { profile: p, notes: notes };

    var tb = TSIQ.TABLES_2026;
    var losses = params.lossesHarvested || 0;
    var gains = params.gainsHarvested || 0;

    if (losses > 0) {
      var newLtcg = (p.ltcg || 0) - losses;
      var floor = (p.filingStatus === 'mfs') ? -1500 : -3000;
      if (newLtcg < floor) {
        notes.push('Net capital loss limited to ' + TSIQ.fmt.usd(-floor) +
          ' against ordinary income (§1211(b)); ' + TSIQ.fmt.usd(floor - newLtcg) +
          ' carries forward (carryforward years not modeled).');
      }
      p.ltcg = newLtcg;
      notes.push(TSIQ.fmt.usd(losses) + ' of losses harvested against capital gains. ' +
        'Observe §1091: no substantially identical repurchase within 30 days before/after.');
    }

    if (gains > 0) {
      p.ltcg = (p.ltcg || 0) + gains;
      var zeroBp = (tb.ltcgBreakpoints[p.filingStatus] || tb.ltcgBreakpoints.mfj)[0];
      notes.push(TSIQ.fmt.usd(gains) + ' of gains harvested. Tax-free ONLY within the 0% LTCG bracket ' +
        '(taxable income up to ' + TSIQ.fmt.usd(zeroBp) + ' for this filing status, 2026) — ' +
        'the columns show any spillover into 15%. Basis resets to market (future-gain benefit not modeled); ' +
        'most states still tax the gain.');
    }
    return { profile: p, notes: notes };
  }
});
