/* ============================================================================
 * STRATEGY: Donate Appreciated Stock Instead of Cash
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'appreciated-stock-gift',
  name: 'Donate Appreciated Stock Instead of Cash',
  category: 'Business Expenses',
  applyOrder: 28,
  modeled: true,

  advisor: {
    summary:
      'Give long-term-held appreciated securities directly to a public ' +
      'charity instead of selling them and writing a check. The client ' +
      'still gets a charitable deduction for the shares\' full fair market ' +
      'value, but the built-in gain is never recognized — no §1001 sale ' +
      'event ever happens for donated shares. Two distinct scenarios drive ' +
      'the sizing: (1) the client already planned to SELL a position and ' +
      'give the cash proceeds — donating the stock instead avoids the sale\'s ' +
      'gain entirely, a today-dollar benefit; or (2) the client already ' +
      'planned to give CASH from other funds — swapping in stock of equal ' +
      'value for that gift keeps the cash for other uses and avoids a gain ' +
      'the client would otherwise have recognized whenever they eventually ' +
      'sold that position (or never, with a basis step-up at death).',
    mechanics: [
      'Deduction: the shares\' fair market value on the gift date, provided ' +
      'they have been held more than one year (§170(e)(1)(A) reduces the ' +
      'deduction to basis for short-term or ordinary-income property — never ' +
      'gift a loser or a short-term holding this way).',
      'Gain avoidance: no §1001 disposition occurs on a gift, so the built-in ' +
      'appreciation is never taxed to the donor — the single biggest reason ' +
      'this beats selling and then donating the cash.',
      '§170(b)(1)(C) AGI ceiling: deductions for appreciated capital gain ' +
      'property to public charities are limited to 30% of AGI (vs. 60% for ' +
      'cash), with a 5-year carryforward for any excess (§170(d)(1)) — this ' +
      'tool does not enforce that percentage ceiling (see the Not Modeled ' +
      'note in the strategy output), so verify large gifts by hand.',
      'The charity should be told to sell the shares itself, not the donor — ' +
      'the charity is generally exempt and pays no tax on the sale either way.',
      'Never donate a LOSS position this way: selling first to realize the ' +
      'loss (then donating the cash) captures the loss AND the deduction; ' +
      'donating a losing position outright wastes the loss forever.',
      'Basis and holding period carry over to the charity for its own ' +
      'purposes only — irrelevant once the charity, an exempt organization, ' +
      'sells; the donor\'s basis simply disappears with no tax consequence.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §170(e)(1)(A)', note: 'Deduction for long-term capital gain property is full fair market value; short-term or ordinary-income property is limited to basis.' },
      { type: 'IRC', cite: 'IRC §170(b)(1)(C)', note: '30%-of-AGI ceiling on appreciated capital gain property gifts to public charities (vs. 60% for cash under §170(b)(1)(G)).' },
      { type: 'IRC', cite: 'IRC §170(d)(1)', note: '5-year carryforward for charitable contributions disallowed by the AGI percentage limitations.' },
      { type: 'IRC', cite: 'IRC §1001', note: 'Gain/loss is recognized only on a sale or exchange — a gift is neither, so no gain is ever recognized on donated appreciated stock.' },
      { type: 'IRC', cite: 'IRC §170(p) (OBBBA, P.L. 119-21 §70425)', note: 'New 0.5%-of-AGI floor on itemized charitable contributions generally, effective tax years beginning after 12/31/2025 — applies to this gift\'s deduction like any other.' }
    ],
    requirements: [
      'Shares held more than one year (long-term) with meaningful unrealized appreciation.',
      'Direct transfer of the shares themselves to the charity — the donor must not sell first.',
      'A qualified public charity recipient (donor-advised funds and private foundations have their own, generally less favorable, AGI ceilings for appreciated property under §170(b)(1)(D)).',
      'A qualified appraisal for gifts of non-publicly-traded stock over $10,000 (publicly traded securities are exempt from the appraisal requirement).'
    ],
    risks: [
      'Donating a position with a built-in LOSS wastes the loss — sell it first, harvest the loss, then donate the cash instead.',
      'Short-term holdings only generate a basis deduction, not FMV — check the holding period before selecting shares to give.',
      'The 30%-of-AGI ceiling on appreciated property (vs. 60% for cash) can defer part of a very large gift\'s deduction to future years — this tool does not model that ceiling, so verify by hand for gifts sized near or above 30% of AGI.',
      'Illiquid or restricted stock complicates the charity\'s ability to actually receive and sell the shares — confirm the charity can accept the specific security before committing.'
    ],
    bestFit: [
      'Clients with concentrated, long-held, highly appreciated brokerage positions who also give to charity.',
      'A client already planning to sell a position and donate the proceeds — redirect the shares themselves instead.',
      'A client already planning a cash gift who also holds appreciated stock they were not otherwise planning to sell soon.'
    ],
    implementation: [
      'Identify long-term, appreciated (never loss) positions as the funding source for the planned gift.',
      'Confirm the charity can accept a stock transfer and obtain their brokerage account details.',
      'Initiate the transfer directly from the client\'s brokerage to the charity\'s account — never route through the client\'s cash.',
      'Obtain a qualified appraisal if required (non-publicly-traded stock over $10,000); publicly traded securities need only the closing price on the gift date.',
      'Confirm the charity\'s receipt letter shows share count and date, not a dollar value (the donor values the gift, not the charity).',
      'Track any 30%-of-AGI carryforward on the permanent file for large gifts.'
    ]
  },

  client: {
    teaser: 'A smarter way to give from your investment account — the same gift, without the tax bill',
    headline: 'Give the stock, not the cash — and skip the tax on the gain',
    plainEnglish: [
      'If you own an investment that has grown a lot in value and you also give to charity, there is a better way to make that gift than writing a check. Instead of selling the stock (which triggers tax on the growth) and then donating the cash, give the stock itself directly to the charity.',
      'You still get credit for the full current value of the shares on your tax return — nothing changes there. What changes is that the growth in that stock is never taxed to you at all, because you never sold it. The charity, which does not pay tax, can sell the shares itself with no tax consequence.',
      'This works two ways: if you were already planning to sell something and give the proceeds, redirect the shares instead and skip that tax entirely. If you were already planning to give cash from your bank account, consider giving appreciated stock instead and keeping the cash — you avoid ever having to pay tax on that stock\'s growth, today or down the road.'
    ],
    analogy: 'It\'s like re-gifting a present still in its box instead of returning it for cash and buying something else — the charity gets the same value, and you skip a step that would have cost you something.',
    benefits: [
      'Full credit for the stock\'s current value, same as a cash gift',
      'The growth in the stock\'s value is never taxed to you',
      'Works whether you were planning to sell the stock or give cash',
      'The charity keeps 100% of the value — nothing is lost to taxes along the way'
    ],
    steps: [
      'We identify which of your long-held, grown investments makes the best gift',
      'We confirm your chosen charity can accept a stock transfer',
      'We coordinate the transfer directly between your brokerage and theirs',
      'We document everything correctly for your tax return'
    ],
    considerations: [
      'This only makes sense for investments that have grown in value and that you have owned over a year — a losing position should be sold first instead, so we check that before choosing shares.',
      'Very large gifts relative to your income can have part of the deduction carry into future years — we flag that when it applies.'
    ]
  },

  inputs: [
    { key: 'mode', label: 'This gift replaces...', type: 'select', default: 'replaces-sale',
      options: [
        { value: 'replaces-sale', label: 'A planned SALE (baseline LTCG already includes this gain)' },
        { value: 'replaces-cash-gift', label: 'A planned CASH gift (gain was never in the baseline)' }
      ] },
    { key: 'fmv', label: 'Fair market value of shares donated', type: 'currency', default: 50000 },
    { key: 'basis', label: 'Cost basis of shares donated', type: 'currency', default: 10000 }
  ],

  suggest: function (p) {
    if (!((p.ltcg || 0) >= 20000 && (p.charitable || 0) >= 2000)) return null;
    return { reason: TSIQ.fmt.usd(p.ltcg) + ' of capital gains alongside ' + TSIQ.fmt.usd(p.charitable) +
      ' of charitable giving — check whether appreciated stock could fund the gift instead of cash.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs a positive built-in gain
  },

  /**
   * Year 1 only (a discrete gift). 'replaces-sale' mode assumes the
   * baseline's ltcg ALREADY includes this stock's gain from a planned sale
   * (SETUP, mirroring qsbs-1202.js) and removes it — no sale, no
   * recognition. 'replaces-cash-gift' mode has no ltcg to remove (the gain
   * was never going to be recognized in this baseline) — advisory note
   * only, since the avoided FUTURE sale is invisible to a static
   * projection. Neither mode touches p.charitable — the deduction (same
   * FMV either way) is assumed already entered in Section 1.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) return { profile: p, notes: notes };

    var fmv = params.fmv || 0;
    var basis = Math.min(params.basis || 0, fmv);
    var gain = Math.max(0, fmv - basis);
    if (gain <= 0) {
      notes.push('No built-in gain entered (FMV at or below basis) — donating shares with no ' +
        'appreciation has no gain-avoidance benefit over giving cash directly. No benefit modeled.');
      return { profile: p, notes: notes };
    }

    if (params.mode === 'replaces-cash-gift') {
      notes.push(TSIQ.fmt.usd(gain) + ' of built-in long-term gain on the donated shares is never ' +
        'recognized (no §1001 sale event) — but since this replaces a planned CASH gift, that gain ' +
        'was never in this scenario\'s baseline LTCG to begin with, so there is no dollar figure to ' +
        'remove here. The real benefit is a FUTURE sale avoided entirely (or eliminated at death via ' +
        'the §1014 basis step-up) — not visible in this or any projection year\'s math. SETUP: the ' +
        'charitable deduction itself should already be entered as the same ' + TSIQ.fmt.usd(fmv) +
        ' FMV in Section 1\'s charitable field.');
      return { profile: p, notes: notes };
    }

    var reduction = Math.min(gain, Math.max(p.ltcg || 0, 0));
    if (reduction < gain) {
      notes.push('SETUP: baseline LTCG is less than the computed built-in gain — include the ' +
        'planned sale\'s full gain in the baseline\'s LTCG input so this strategy can remove the ' +
        'portion avoided by donating the stock instead of selling it.');
    }
    p.ltcg = (p.ltcg || 0) - reduction;
    notes.push(TSIQ.fmt.usd(reduction) + ' of long-term gain removed from taxable income — ' +
      'donating the appreciated stock directly instead of selling it and giving the cash proceeds ' +
      'means no §1001 sale ever happens. The charitable deduction (the same ' + TSIQ.fmt.usd(fmv) +
      ' FMV either way) should already be reflected in Section 1\'s charitable field.');
    notes.push('Not modeled: the §170(b)(1)(C) 30%-of-AGI ceiling on appreciated-property gifts to ' +
      'public charities (60% applies to cash instead) — this tool\'s charitable deduction has no ' +
      'AGI-percentage ceiling (only the OBBBA 0.5% floor), so an especially large gift relative to ' +
      'AGI could show as more immediately deductible than the law allows; any disallowed excess ' +
      'carries forward 5 years under §170(d)(1) — verify by hand for large gifts.');
    return { profile: p, notes: notes };
  }
});
