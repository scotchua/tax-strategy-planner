/* ============================================================================
 * STRATEGY: Installment Sale (Property Dispositions)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'installment-sale-property',
  name: 'Installment Sale (Property Dispositions)',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 55,
  modeled: true,

  advisor: {
    summary:
      'Under §453, gain from a sale with at least one payment after the year ' +
      'of sale is recognized proportionally as payments are received — gross ' +
      'profit ratio × each payment. Spreading a large property gain across ' +
      'several years keeps more of it inside the 0%/15% capital-gain ' +
      'brackets, below the NIIT MAGI threshold, and away from bracket-driven ' +
      'phase-outs, rather than stacking the whole gain into one top-rate ' +
      'year. Two hard exceptions drive planning: §1245 depreciation recapture ' +
      'is recognized IN FULL in the year of sale regardless of payments ' +
      '(§453(i)), and large installment balances (> $5M per person) accrue a ' +
      '§453A interest charge on the deferred tax. Installment treatment is ' +
      'automatic; electing OUT under §453(d) is the affirmative choice.',
    mechanics: [
      'Gross profit ratio = gross profit ÷ total contract price; each ' +
      'principal payment recognizes that fraction as gain. Interest on the ' +
      'note is ordinary income (and adequate stated interest is required, or ' +
      '§483/§1274 impute it).',
      'Bracket smoothing is the engine of value: five $60k gain slices can ' +
      'ride the 15% bracket (and stay under the $200k/$250k NIIT threshold) ' +
      'where one $300k slice would push into 20% + 3.8% NIIT.',
      '§453(i): ALL §1245 recapture (e.g., from cost segregation or expensed ' +
      'personalty) is ordinary income in the year of sale even if no cash is ' +
      'received — size the down payment to cover this tax.',
      'Unrecaptured §1250 gain (25% rate) CAN be spread, and under the regs ' +
      'is recognized before the residual capital gain as payments arrive.',
      '§453A: if aggregate installment obligations from sales over $150k ' +
      'exceed $5M outstanding at year-end (per person), interest is charged ' +
      'on the deferred tax liability — the deferral stops being free.',
      'Ineligible: dealer property/inventory, publicly traded securities, and ' +
      'gain cannot be spread to related-party buyers who resell within 2 ' +
      'years (§453(e)). Pledging the note can accelerate gain (§453A(d)).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §453', note: 'Installment method: gain recognized as payments are received, via the gross profit ratio; automatic unless elected out.' },
      { type: 'IRC', cite: 'IRC §453(i)', note: 'Depreciation recapture (§1245/§1250 amounts treated as ordinary) recognized in FULL in the year of disposition, regardless of payment schedule.' },
      { type: 'IRC', cite: 'IRC §453A', note: 'Interest charge on deferred tax for large installment balances (aggregate obligations > $5M per person, from sales > $150k); pledge rule accelerates gain.' },
      { type: 'IRC', cite: 'IRC §453(e)', note: 'Related-party resale rule: buyer\'s disposition within 2 years accelerates the seller\'s deferred gain.' },
      { type: 'IRC', cite: 'IRC §453(d)', note: 'Election OUT of installment treatment — recognize everything in the sale year when that is the better bracket play.' },
      { type: 'Admin', cite: 'Form 6252', note: 'Installment sale reporting: filed for the year of sale and every year a payment is received.' },
      { type: 'IRC', cite: 'IRC §§483, 1274', note: 'Imputed interest / OID rules — the note must carry adequate stated interest or part of each payment is recharacterized.' }
    ],
    requirements: [
      'A non-dealer sale of property (real estate qualifies; inventory and publicly traded securities do not) with at least one payment after the year of sale.',
      'A written note with adequate stated interest (AFR minimum) and a real payment schedule.',
      'Creditworthy buyer — the seller is the bank; security (deed of trust, standby letter of credit that is not "payment") matters.',
      'Down payment sized to cover the year-one tax on §1245 recapture recognized up front.'
    ],
    risks: [
      'Buyer default: the remedy is repossession under §1038, but the economics of a failed note can swamp the tax savings.',
      'All recapture tax is due in year one even if little cash arrived — a thin down payment creates a liquidity trap.',
      'Future rate risk: gain recognized in later years is taxed at THOSE years\' rates and thresholds.',
      '§453A interest charge erodes the benefit for balances above $5M.',
      'Related-party sales carry the 2-year resale tripwire and heightened scrutiny.',
      'Death holds no rescue here: unlike appreciated property, an installment note gets NO basis step-up — the deferred gain is income in respect of a decedent to the heirs.'
    ],
    bestFit: [
      'Sellers of appreciated rentals, land, or business property whose gain would otherwise stack into the 20% + NIIT range in a single year.',
      'Clients who value ongoing interest income and can tolerate carrying the buyer\'s credit.',
      'Sales where the buyer needs seller financing anyway — the tax benefit rides a deal term that was already on the table.'
    ],
    implementation: [
      'Model the gain both ways — one-year recognition vs. the proposed payment schedule — including NIIT thresholds and the 0/15/20 breakpoints.',
      'Compute §1245 recapture separately and set the down payment to cover the year-one tax.',
      'Paper the note: AFR-compliant interest, amortization schedule, security instrument.',
      'File Form 6252 for the sale year and each collection year; report interest separately.',
      'Calendar the §453A test if balances approach $5M, and the 2-year rule for any related-party buyer.'
    ]
  },

  client: {
    teaser: 'Spread a big gain across several years so less of it lands in the top bracket',
    headline: 'Sell now, spread the tax over the years you collect',
    plainEnglish: [
      'When you sell a property for a large profit and take the whole price up front, the entire gain lands in one tax year — often pushing you into the highest capital-gain rate plus an extra investment-income surtax. The tax system punishes lumpy income.',
      'An installment sale means the buyer pays you over several years, and you pay tax only as the money arrives. Each year\'s slice of gain is smaller, so more of it is taxed at lower rates — sometimes dramatically lower. You also collect interest from the buyer along the way, like being the bank.',
      'There are two things to plan around: any portion of your past depreciation that the IRS "recaptures" is taxed in the first year no matter what, and you\'re trusting the buyer to keep paying. We structure the down payment and the security so both risks are covered before you sign.'
    ],
    analogy: 'Think of your gain as water and tax brackets as a set of measuring cups — pour it all at once and it overflows into the expensive cup; pour it over five years and each cup stays in the cheap range.',
    benefits: [
      'More of your gain taxed at lower capital-gain rates',
      'Can keep you under the threshold for the 3.8% investment surtax',
      'Steady payments plus interest income — you\'re the bank',
      'You choose the schedule: the payment terms are a deal term we design'
    ],
    steps: [
      'We model your sale both ways and show you the exact savings from spreading it',
      'We size the down payment to cover the first-year tax with cash to spare',
      'Your attorney papers the note and security; we make sure the interest rate satisfies the IRS',
      'We handle the special tax form in the sale year and every collection year'
    ],
    considerations: [
      'You\'re extending credit to your buyer — if they stop paying, getting the property back is possible but messy, so buyer quality matters more than tax math.',
      'Tax on any depreciation recapture is due in full the first year, even though most of your cash hasn\'t arrived yet.',
      'Future years\' tax rates apply to future payments — rates could be higher (or lower) than today\'s.'
    ]
  },

  inputs: [
    { key: 'totalGain', label: 'Total gain on the sale', type: 'currency', default: 300000 },
    { key: 'spreadYears', label: 'Years payments are spread over', type: 'number', default: 5 }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): needs LTCG in the sale year
  },

  /**
   * Model vs. baseline: the baseline profile is assumed to include the FULL
   * gain in ltcg in year 1 (the sale year). The installment sale recognizes
   * totalGain / spreadYears each year, so:
   *   Year 1: ltcg reduced by the deferred portion, totalGain × (1 − 1/n),
   *           capped at the profile's LTCG (if less, the cap is noted).
   *   Years 2..n: ltcg increased by an equal slice of the actually-deferred
   *           amount (actualDeferred / (n − 1)) so the totals balance.
   * Simplifications, commented: §1245 recapture (all-in-year-one) and note
   * interest income are not modeled — enter interest as `interest` if
   * material; §453A does not apply at modeled default sizes.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var n = Math.max(2, Math.round(params.spreadYears || 5));

    if (yearIndex === 0) {
      var totalGain = params.totalGain || 0;
      var deferredTarget = totalGain * (1 - 1 / n);
      var actual = Math.min(deferredTarget, Math.max(p.ltcg || 0, 0));
      state.instSaleDeferred = actual;
      state.instSaleYears = n;
      if (actual <= 0) {
        notes.push('No long-term capital gain in the profile — enter the property gain ' +
          'as LTCG in the year of sale for the installment spread to apply. No benefit modeled.');
        return { profile: p, notes: notes };
      }
      p.ltcg = p.ltcg - actual;
      notes.push('Installment sale (§453): ' + TSIQ.fmt.usd(totalGain) + ' gain spread over ' +
        n + ' years — ' + TSIQ.fmt.usd(totalGain / n) + ' recognized per year. Year 1 defers ' +
        TSIQ.fmt.usd(actual) + ' to later years (shown in the projection).');
      if (deferredTarget > actual) {
        notes.push('Deferral capped at the profile\'s available LTCG of ' + TSIQ.fmt.usd(actual) +
          ' — enter the full sale gain as LTCG for complete modeling.');
      }
      notes.push('Not modeled: §1245 depreciation recapture is ordinary income IN FULL in ' +
        'the year of sale regardless of payments (§453(i)); note interest is ordinary ' +
        'income; §453A interest charge applies to balances over $5M.');
    } else if (yearIndex >= 1 && yearIndex <= n - 1 && state.instSaleDeferred > 0) {
      // Later installments: recognize an equal slice of the deferred gain.
      p.ltcg = (p.ltcg || 0) + state.instSaleDeferred / (n - 1);
    }
    return { profile: p, notes: notes };
  }
});
