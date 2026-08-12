/* ============================================================================
 * STRATEGY: Charitable Bunching via Donor-Advised Fund
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'daf-bunching',
  name: 'Charitable Bunching via Donor-Advised Fund',
  category: 'Business Expenses',
  applyOrder: 45,
  modeled: true,
  character: 'timing', // ET2

  advisor: {
    summary:
      'Concentrate several years of planned giving into a single contribution ' +
      'to a donor-advised fund (DAF): the full deduction lands in the bunch ' +
      'year — clearing the standard-deduction hurdle that swallows modest ' +
      'annual gifts — while grants to operating charities continue on the ' +
      'donor\'s normal schedule from the DAF. Funding with long-term ' +
      'appreciated stock deducts fair market value AND permanently avoids the ' +
      'built-in gain (subject to the 30% AGI limit for capital-gain property). ' +
      'Two OBBBA changes shape the 2026 math: the cash-to-public-charity 60% ' +
      'AGI limit is permanent, and — critically — a floor now disallows ' +
      'itemized charitable deductions up to 0.5% of AGI for tax years ' +
      'beginning after 2025, which further rewards concentrating gifts into ' +
      'fewer years (one floor instead of many).',
    mechanics: [
      'Bunching mechanics: with a $32,200 MFJ standard deduction (2026), a ' +
      'couple giving $10k/yr with $20k of other itemized deductions gets ' +
      'little or no marginal benefit annually. Bunching 3 years ($30k) into ' +
      'one DAF gift itemizes decisively in the bunch year and takes the ' +
      'standard deduction in the off years — more total deduction over the cycle.',
      'The DAF (a §4966(d)(2) fund at a sponsoring public charity — community ' +
      'foundations, Fidelity/Schwab/Vanguard Charitable) completes the GIFT at ' +
      'contribution: the deduction is immediate even though grants to end ' +
      'charities are advised out over years.',
      'Appreciated long-term stock: deduct FMV under §170(e) rules without ' +
      'recognizing the gain — a double benefit versus selling and giving cash. ' +
      'AGI limits: 60% for cash to public charities (OBBBA permanent), 30% for ' +
      'long-term capital-gain property; 5-year carryforward for the excess (§170(d)).',
      'OBBBA floor (tax years beginning after 12/31/2025): itemized charitable ' +
      'deductions are reduced by 0.5% of AGI. At $400k AGI that is the first ' +
      '$2,000 of gifts each year — an annual haircut that bunching pays only ' +
      'once per cycle instead of every year.',
      'Substantiation: contemporaneous written acknowledgment for gifts ≥$250 ' +
      '(§170(f)(8)); Form 8283 for noncash gifts over $500; qualified appraisal ' +
      'over $5,000 (publicly traded securities exempt from the appraisal requirement).',
      'DAF grants cannot satisfy legally binding pledges or return any benefit ' +
      'to the donor (event tickets, memberships with value) — §4967 excise ' +
      'taxes police prohibited benefits.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §170(b)(1)', note: 'AGI percentage limits — 60% for cash to public charities (made permanent by OBBBA), 30% for long-term capital-gain property; DAF sponsors are public charities.' },
      { type: 'IRC', cite: 'IRC §170(d)(1)', note: 'Five-year carryforward of contributions exceeding the AGI limits.' },
      { type: 'Admin', cite: 'OBBBA (P.L. 119-21) — 0.5% AGI floor', note: 'Itemized charitable deductions reduced by 0.5% of the contribution base for tax years beginning after 2025 — verify the operative subsection when finalizing plan documents.' },
      { type: 'IRC', cite: 'IRC §4966(d)(2)', note: 'Donor-advised fund definition — separately identified fund owned by a sponsoring organization over which the donor retains advisory privileges.' },
      { type: 'IRC', cite: 'IRC §170(f)(8)', note: 'Contemporaneous written acknowledgment required for any contribution of $250 or more — strictly enforced.' },
      { type: 'IRC', cite: 'IRC §4967', note: 'Excise tax on prohibited benefits from DAF grants (pledges, tickets, more-than-incidental benefits).' },
      { type: 'Admin', cite: 'Form 8283 / Reg. §1.170A-13', note: 'Noncash reporting over $500; qualified appraisal over $5,000 with the publicly-traded-securities exception.' }
    ],
    requirements: [
      'A genuine multi-year giving intention — bunching rearranges gifts the client already plans to make.',
      'Cash flow or an appreciated-securities position sufficient to fund several years at once.',
      'A DAF account at a sponsoring organization (same-week setup at the major custodians).',
      'Discipline to take the standard deduction in off years rather than leaking extra itemized gifts.'
    ],
    risks: [
      'DAF contributions are IRREVOCABLE — the money is permanently committed to charity even though grant timing is advised.',
      'The 0.5%-of-AGI floor (2026+) shaves every itemizing year\'s deduction; in high-AGI years the haircut is material and belongs in the projection.',
      '30% AGI limit on appreciated stock can defer part of a large gift to carryforward years — model the AGI headroom before funding.',
      'Missing the §170(f)(8) acknowledgment letter kills the deduction regardless of proof of payment.',
      'Donating stock held ≤1 year limits the deduction to basis — verify holding periods before transfer.'
    ],
    bestFit: [
      'Consistent annual givers whose itemized deductions hover near the standard deduction.',
      'Clients with highly appreciated public securities (double benefit: FMV deduction, gain never taxed).',
      'High-income spike years (business sale, bonus) where a large deduction has maximum rate value.'
    ],
    implementation: [
      'Quantify the cycle: annual giving × bunch period, checked against AGI limits (60% cash / 30% appreciated stock) and the 0.5% floor.',
      'Open the DAF account; for stock funding, initiate the in-kind transfer well before December 31 (custodian cutoffs are early).',
      'Contribute the bunched amount in the target year; obtain the sponsoring organization\'s acknowledgment letter.',
      'File Form 8283 for noncash contributions over $500 with the return.',
      'Advise grants from the DAF to the client\'s charities on the normal annual schedule.',
      'Diary the next bunch year; take the standard deduction in between.'
    ]
  },

  client: {
    teaser: 'Same generosity, bigger tax break — just by changing the calendar',
    headline: 'Give the same amount to charity — and deduct more of it',
    plainEnglish: [
      'Here is a quiet problem with charitable deductions: they only help to the extent all your deductions beat the standard deduction the IRS gives everyone automatically. If you give $10,000 a year, much of that generosity may be doing nothing for your taxes, because you would have gotten nearly the same deduction without giving a dime.',
      'The fix is timing. Instead of giving $10,000 a year for three years, you put three years of gifts — $30,000 — into a special charitable account called a donor-advised fund in a single year. That big number blows past the standard deduction and gets fully counted. In the two off years, you take the standard deduction. Your favorite charities notice nothing: the account sends them their usual gift every year, on your instructions.',
      'There is a bonus move: fund the account with stock that has grown in value instead of cash. You deduct the full current value, and the tax on all that growth simply never comes due — for you or the charity.'
    ],
    analogy: 'It\'s like a punch card that only rewards big visits: three medium trips earn nothing, but the same total spent in one visit earns the reward — so you shop once and stock the pantry.',
    benefits: [
      'More total deductions for exactly the same giving',
      'Your charities still receive their gift every year, uninterrupted',
      'Donating winning stock skips the tax on its growth entirely',
      'One simple account handles all the receipts and paperwork'
    ],
    steps: [
      'We calculate your ideal bunch size and the best year to do it',
      'We help open the charitable account (it takes about a week)',
      'You fund it once — with cash or appreciated stock we help you pick',
      'The account sends your usual gifts to your charities each year'
    ],
    considerations: [
      'Money put into the fund is committed to charity for good — you choose which charities and when, but it cannot come back.',
      'Starting in 2026, a small slice of charitable gifts (half a percent of your income) no longer counts toward the deduction each year — one more reason bunching into fewer years works.',
      'This works best when your giving is steady and planned — it rearranges gifts you already intend to make.'
    ]
  },

  inputs: [
    { key: 'bunchedContribution', label: 'Bunched DAF contribution (bunch years)', type: 'currency', default: 30000, solveable: true },
    { key: 'bunchEveryNYears', label: 'Bunch every N years', type: 'number', default: 3 }
  ],

  suggest: function (p) {
    if (!((p.charitable || 0) >= 5000)) return null;
    return { reason: TSIQ.fmt.usd(p.charitable) + ' of annual giving — bunching via a donor-advised fund may beat the standard-deduction line, especially with the new 0.5%-of-AGI floor.' };
  },

  appliesTo: function (profile) {
    return true; // works off baseline charitable giving; noted in apply()
  },

  /**
   * REPLACES baseline charitable giving with the bunched pattern: in bunch
   * years (yearIndex % N === 0) charitable = bunchedContribution; in off
   * years charitable = 0 (the baseline annual gift is redirected through the
   * DAF cycle instead). The engine's standard-vs-itemized comparison (now
   * including the OBBBA 0.5%-of-AGI charitable floor and the §68 2/37
   * itemized limitation) then produces the benefit. AGI percentage limits
   * (60% cash / 30% appreciated stock) are still not modeled — flagged below.
   * NOTE: the baseline's charitable field grows with the scenario's income
   * growth rate each year while the bunched amount here is static (a per-
   * cycle nominal figure the advisor enters), so if the bunched amount is
   * less than N years of (growing) baseline giving, part of the shown
   * savings reflects giving LESS overall, not giving more efficiently —
   * flagged explicitly below so the advisor can separate the two effects.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var n = Math.max(1, Math.round(params.bunchEveryNYears || 1));
    var bunched = params.bunchedContribution || 0;
    var isBunchYear = (yearIndex % n) === 0;
    var baselineGiving = p.charitable || 0;

    p.charitable = isBunchYear ? bunched : 0;

    if (yearIndex === 0) {
      notes.push('Bunching replaces the baseline ' + TSIQ.fmt.usd(baselineGiving) +
        '/yr of giving: ' + TSIQ.fmt.usd(bunched) + ' to the DAF every ' + n +
        ' year(s), $0 itemized in off years (standard deduction taken instead). ' +
        'Charities still receive grants annually from the DAF.');
      notes.push('Not modeled: AGI percentage limits (60% cash / 30% appreciated stock) — ' +
        'verify headroom for the bunched amount in a single year.');
      if (bunched < baselineGiving * n) {
        notes.push('This bunched amount (' + TSIQ.fmt.usd(bunched) + ') is LESS than ' + n +
          ' years of baseline giving (' + TSIQ.fmt.usd(baselineGiving * n) +
          ', before accounting for income growth) — part of the projected savings reflects ' +
          'giving less overall, not just bunching more efficiently. Set the bunched amount ' +
          'to roughly N years of intended giving to isolate the pure tax-timing benefit.');
      }
    }
    return { profile: p, notes: notes };
  }
});
