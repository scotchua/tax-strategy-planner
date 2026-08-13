/* ============================================================================
 * STRATEGY: Installment Sale on Business Sale (§453)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'installment-sale-business',
  name: 'Installment Sale on Business Sale',
  category: 'Income Timing & Character',
  applyOrder: 2,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      'When a business or other capital asset is sold with at least one payment ' +
      'received after the year of sale, §453 spreads gain recognition across the ' +
      'payment years in proportion to the gross profit ratio. Instead of stacking ' +
      'the entire gain into one year — pushing it through the 20% bracket, NIIT, ' +
      'and the OBBBA SALT phase-down all at once — the seller recognizes gain as ' +
      'payments arrive, keeping each year in lower LTCG brackets and potentially ' +
      'under the NIIT threshold. §1245/§1250 depreciation recapture is recognized ' +
      'in full in the year of sale regardless of payments (§453(i)), and large ' +
      'obligations carry a §453A interest charge. Installment treatment is ' +
      'automatic; electing out (§453(d)) is the affirmative choice when a ' +
      'lump-sum year is actually cheaper.',
    mechanics: [
      'Gross profit ratio (gross profit ÷ total contract price) determines the ' +
      'taxable slice of each payment (§453(c)); the rest is basis recovery. ' +
      'Interest on the note is ordinary income, stated or imputed (§483/§1274).',
      'Bracket arbitrage: 2026 LTCG breakpoints put the 20% rate above roughly ' +
      '$613,700 taxable (MFJ) — a $5M gain in one year is mostly 20% + 3.8% NIIT, ' +
      'while $1M/year over five years keeps much of it at 15%.',
      '§453(i): all §1245 and §1250 recapture is recognized in the year of sale, ' +
      'even if no cash is received — model the year-1 cash need for asset sales ' +
      'with heavy depreciation.',
      '§453A: if deferred obligations from sales over $150k exceed $5M ' +
      'outstanding at year end, an interest charge applies to the deferred tax ' +
      'liability — large deals sacrifice part of the deferral benefit.',
      'Ineligible property: inventory, dealer property, and publicly traded ' +
      'securities cannot use §453. Related-party resales within two years can ' +
      'accelerate the gain (§453(e)).',
      'Electing out (§453(d)) on a timely return recognizes everything in year ' +
      'one — worth modeling when the sale year is unusually low-rate or the ' +
      'seller expects rates to rise.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §453', note: 'Installment method — gain recognized proportionally as payments are received; automatic unless the taxpayer elects out.' },
      { type: 'IRC', cite: 'IRC §453(i)', note: 'Depreciation recapture (§1245/§1250 amounts) recognized in full in the year of disposition regardless of payment schedule.' },
      { type: 'IRC', cite: 'IRC §453A', note: 'Interest charge on the deferred tax liability where obligations from >$150k sales exceed $5M outstanding.' },
      { type: 'IRC', cite: 'IRC §453(d)', note: 'Election out of installment treatment on a timely filed return (irrevocable without IRS consent).' },
      { type: 'IRC', cite: 'IRC §453(e)', note: 'Related-party resale rule — a second disposition within two years accelerates the first seller\'s gain.' },
      { type: 'Reg', cite: 'Temp. Reg. §15a.453-1', note: 'Operating rules for the installment method: contract price, gross profit ratio, contingent-payment sales.' },
      { type: 'IRC', cite: 'IRC §§483, 1274', note: 'Imputed/unstated interest — a portion of deferred payments is recharacterized as ordinary interest if the note rate is below AFR.' },
      { type: 'Admin', cite: 'Form 6252', note: 'Installment Sale Income — filed in the sale year and each year a payment is received.' }
    ],
    requirements: [
      'A sale with at least one payment after the close of the sale year, evidenced by a written note with market-rate stated interest (AFR or better).',
      'Eligible property — not inventory, dealer property, or marketable securities.',
      'Asset-by-asset allocation for a business sale (§1060): the installment method applies to the capital-gain assets; recapture is year-one income.',
      'Seller comfort with buyer credit risk, usually via security interest, personal guarantee, or standby letter of credit.'
    ],
    risks: [
      'Buyer default: the seller may repossess a damaged business after paying tax on early installments — collateral and covenants matter more than tax math.',
      '§453A interest charge erodes the benefit above $5M of outstanding obligations.',
      'Recapture surprise: heavily depreciated assets create year-one ordinary income with no matching cash (§453(i)).',
      'Rate risk: future LTCG rates could rise; the spread bets that they will not.',
      'Pledging the note or receiving a demand note/readily tradable note triggers gain (§453A(d), §453(f)).',
      'Death during the term: the note is income in respect of a decedent — no basis step-up on the deferred gain (§691; §1014(c)).'
    ],
    bestFit: [
      'Business or real-estate sales of roughly $1M+ of gain where a lump sum would ride the 20% bracket and NIIT for most of the gain.',
      'Sellers who do not need all cash at closing and can hold a secured note.',
      'Sellers whose other income will drop after the sale (retirement) — spreading lands gain in low-bracket years.'
    ],
    implementation: [
      'Model lump-sum vs. spread in this tool before the LOI is signed — payment terms are negotiated, not retrofitted.',
      'Draft the note: term, market-rate stated interest (at least AFR), security, and default remedies.',
      'Allocate purchase price among asset classes (Form 8594, §1060); identify recapture recognized in year one.',
      'File Form 6252 with the sale-year return and each collection year; report note interest as ordinary income.',
      'Track outstanding obligations against the $5M §453A threshold each December.',
      'Calendar the related-party two-year resale window if the buyer is related.'
    ]
  },

  client: {
    teaser: 'Turns one giant tax bill from a sale into several much smaller ones',
    headline: 'Sell your business, spread the tax',
    plainEnglish: [
      'When you sell a business in one lump sum, the entire profit lands on a single tax return. A big number in one year gets pushed into the highest tax rates — you can lose a noticeably bigger slice than if the same profit had arrived over several years.',
      'An installment sale means the buyer pays you over time — say, five annual payments — and you pay tax only as the money actually arrives. Each year\'s slice is smaller, so more of it is taxed at lower rates, and some extra surcharges may not apply at all.',
      'You also earn interest on the unpaid balance, so the buyer is paying you for the privilege of paying over time. We structure the note so you are protected if the buyer runs into trouble.'
    ],
    analogy: 'Pouring a gallon of water into a small funnel all at once makes a mess; pouring it in steadily gets every drop through. Spreading the payments gets more of your sale price through the low-tax funnel.',
    benefits: [
      'More of your sale profit taxed at lower rates instead of the top rate',
      'Tax is due only as cash actually arrives — no giant year-one bill',
      'You collect interest on the unpaid balance',
      'Steady income stream, useful if you\'re stepping back or retiring'
    ],
    steps: [
      'We model the lump-sum tax bill next to several payment schedules so you see the difference before you negotiate',
      'Your attorney and we structure the note — payment schedule, interest rate, and security protecting you',
      'We handle the tax filings in the sale year and each payment year',
      'We monitor the plan yearly and adjust if your situation changes'
    ],
    considerations: [
      'You are trusting the buyer to keep paying — we insist on collateral and guarantees, but there is real risk if the business struggles under new ownership.',
      'Some parts of a sale (like previously written-off equipment) are taxed in year one no matter what — we identify those up front.',
      'Very large deals (over $5 million carried) owe interest to the IRS on the deferred tax, which trims the benefit.'
    ]
  },

  inputs: [
    { key: 'totalGain', label: 'Total capital gain on the sale', type: 'currency', default: 1000000 },
    { key: 'spreadYears', label: 'Years the payments are spread over', type: 'number', default: 5, max: 20 }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): baseline LTCG must include the lump-sum gain
  },

  /**
   * ADVISOR SETUP (critical): enter the FULL lump-sum gain in the baseline's
   * LTCG input. This strategy replaces the year-1 lump with gain/N and adds
   * gain/N in years 2..N — the honest cost-seg-style delta (deferral is never
   * shown as free money).
   * Known engine caveat: the projection repeats baseline income (with growth)
   * every year, so baseline years 2+ also carry the one-time gain. It appears
   * in BOTH columns (via the += slice on top of it here), so the
   * scenario-minus-baseline delta remains the meaningful number; absolute
   * projection-year figures overstate both scenarios equally.
   * Not modeled: §453A interest charge, note interest income, recapture.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var gain = params.totalGain || 0;
    var n = Math.max(1, Math.round(params.spreadYears || 1));
    var slice = gain / n;

    if (yearIndex === 0) {
      if (p.ltcg < gain) {
        notes.push('SETUP: the baseline LTCG input (' + TSIQ.fmt.usd(p.ltcg) +
          ') is less than the modeled gain (' + TSIQ.fmt.usd(gain) +
          '). Enter the FULL lump-sum gain in the baseline\'s LTCG field — this strategy ' +
          'replaces the lump with the installment spread. Results are not meaningful until then.');
      }
      // Remove no more lump-sum gain than the profile actually has. Without the
      // clamp, a totalGain larger than the entered LTCG drove p.ltcg NEGATIVE
      // (a $5,000,000 gain against $500,000 of entered LTCG produced
      // -$3,500,000), which the engine then reads as a capital LOSS and turns
      // into a §1211(b) deduction plus a carryforward — a fabricated tax
      // benefit out of a data-entry mistake, on top of the note above. Every
      // other strategy that reduces p.ltcg (qsbs-1202, like-kind-1031,
      // opportunity-zones, installment-sale-property) already clamps this way.
      p.ltcg = Math.max(0, (p.ltcg || 0) - gain) + slice;
      notes.push('Year 1: lump-sum gain of ' + TSIQ.fmt.usd(gain) +
        ' replaced with installment slice of ' + TSIQ.fmt.usd(slice) + ' (' + n +
        '-year spread, §453). Years 2–' + n + ' each recognize another ' +
        TSIQ.fmt.usd(slice) + ' — compare scenario vs. baseline year by year.');
      notes.push('Not modeled: §1245/§1250 recapture (taxed in full in year 1 regardless of payments), ' +
        'note interest income, and the §453A interest charge on obligations over $5M.');
    } else if (yearIndex < n) {
      p.ltcg = p.ltcg + slice;
    }
    return { profile: p, notes: notes };
  }
});
