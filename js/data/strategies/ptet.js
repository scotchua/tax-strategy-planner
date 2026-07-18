/* ============================================================================
 * STRATEGY: Pass-Through Entity Tax (PTET) Election
 * State-level entity tax — the SALT cap workaround blessed by Notice 2020-75.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'ptet',
  name: 'Pass-Through Entity Tax (PTET) Election',
  category: 'Entity Structure',
  // Runs after essentially every other strategy that touches passthroughK1
  // (retirement plans, health strategies, Augusta rent, family management
  // company, etc.) so the PTET base reflects the FINAL K-1 income, not a
  // stale pre-deduction figure.
  applyOrder: 88,
  modeled: true,
  character: 'permanent', // ET2

  // Non-blocking hint only — a client with existing K-1 income doesn't need
  // this paired with an election in the SAME scenario; apply() already warns
  // (and skips) if there's no pass-through income once the scenario runs.
  requiresOneOf: ['s-corp-election'],

  advisor: {
    summary:
      'The partnership or S corporation elects to pay state income tax at the ' +
      'entity level. The entity deducts that tax against ordinary income under ' +
      '§164 with no SALT cap (the §164(b)(6) cap applies only to individuals), and ' +
      'the owner receives a state credit (or income exclusion) for the tax paid. ' +
      'IRS blessed the structure in Notice 2020-75. Post-OBBBA the individual SALT ' +
      'cap is $40,400 (2026) but phases back toward $10,000 once MAGI exceeds ' +
      '$505,000 — so PTET remains highly valuable for high-income owners.',
    mechanics: [
      'Entity makes the state PTET election (annual in most states; some require ' +
      'elections or estimated payments by specific deadlines — calendar them).',
      'Entity pays state tax on its passthrough income and deducts it as a ' +
      'non-separately-stated expense, reducing federal K-1 ordinary income.',
      'Owner claims the state credit (e.g., CA, NY) or excludes the income ' +
      '(e.g., WI approach) on the personal state return — state mechanics vary.',
      'Federal benefit ≈ PTET paid × owner\'s marginal federal rate, net of any ' +
      'QBI interaction (the deduction also reduces §199A qualified business income).',
      'Interplay with the individual SALT cap: below the OBBBA phase-down range, ' +
      'compare against what the owner could deduct personally; above $600k MAGI ' +
      'the personal cap is back at $10,000 and PTET is nearly always favorable.'
    ],
    authority: [
      { type: 'Admin', cite: 'IRS Notice 2020-75', note: 'IRS will respect entity-level state taxes as deductible by the entity, not subject to the individual SALT cap. Proposed regs promised; still the controlling guidance.' },
      { type: 'IRC', cite: 'IRC §164; §164(b)(6)', note: 'State taxes deductible; the SALT cap (as amended by OBBBA — $40,400 for 2026 with MAGI phase-down) applies to individuals, not entities.' },
      { type: 'IRC', cite: 'IRC §§702, 1366', note: 'Passthrough of entity items — PTET reduces the ordinary income passed through on the K-1.' },
      { type: 'IRC', cite: 'IRC §199A', note: 'PTET reduces QBI; the federal benefit is partially offset for QBI-eligible income (~20% haircut on the deduction\'s value).' },
      { type: 'Admin', cite: 'State PTET statutes (36+ states)', note: 'Election deadlines, rates, credit vs. exclusion mechanics, and estimated payment requirements vary by state — verify the specific state each year.' }
    ],
    requirements: [
      'A partnership or S corporation (sole proprietorships and SMLLCs taxed as sole props do NOT qualify — pair with an S-corp election if needed).',
      'A state with a PTET regime and a timely election (deadlines are strict and vary).',
      'Cash to fund entity-level estimated payments on the state\'s schedule.',
      'All-owner consent where the state requires it (some elections bind every owner).'
    ],
    risks: [
      'Missed election or estimated-payment deadlines can forfeit the year\'s benefit.',
      'Nonresident / multistate owners can face credit mismatches — resident-state credit for the PTET may be limited.',
      'Deduction timing: most regimes are deductible when paid — mind the year-end cash date for cash-basis benefit.',
      'QBI reduction claws back roughly 20% of the deduction\'s value for QBI-eligible income.',
      'Notice 2020-75 regs were never finalized; structure remains respected but monitor guidance.'
    ],
    bestFit: [
      'Owners with MAGI above the OBBBA phase-down (~$505k+) where the personal SALT cap is effectively $10k.',
      'Profitable S corps / partnerships in higher-tax states (CA, NY, NJ, MN, etc.).',
      'Owners already itemizing whose SALT is capped even at $40,400.'
    ],
    implementation: [
      'Confirm the state\'s PTET regime, rate, and election deadline.',
      'Model the federal benefit net of the QBI interaction (this tool does that).',
      'Make the election and schedule entity-level estimated payments.',
      'Pay before year-end for cash-basis entities.',
      'Report the deduction on the entity return; claim the owner credit on the personal state return.'
    ]
  },

  client: {
    teaser: 'Restores a deduction Congress capped — through a door most filers never use',
    headline: 'Restore the state-tax deduction Congress capped',
    plainEnglish: [
      'Since 2018, there has been a cap on how much state income tax you can deduct on your federal return. For successful business owners, that cap wipes out a deduction that used to be worth tens of thousands of dollars.',
      'Here is the good news: the cap applies to people, not to businesses. If your business elects to pay your state income tax at the company level, the business deducts every dollar of it — no cap — and the state gives you credit so you are not taxed twice.',
      'The IRS has formally approved this approach. It is not a loophole; most states created these programs specifically so their business owners could keep the full deduction.'
    ],
    analogy: 'Same tax bill to the state, but routed through a door where the federal deduction is unlimited instead of capped.',
    benefits: [
      'Deduct 100% of the state tax on your business income — no federal cap',
      'You pay the state the same amount you already owe; only the federal bill shrinks',
      'IRS-approved structure used by business owners in 36+ states',
      'Savings repeat every single year the election is in place'
    ],
    steps: [
      'We confirm your state\'s program and the election deadline',
      'Your business files a simple annual election',
      'The business pays the state tax it would normally pass to you',
      'We claim your credit on your personal state return — no double tax'
    ],
    considerations: [
      'Deadlines matter — some states require the election or a payment early in the year, so we calendar this together.',
      'The business needs to have the cash on hand to make the state payments on schedule.'
    ]
  },

  inputs: [
    { key: 'ptetRatePct', label: 'State PTET rate (%) — often equals your state rate', type: 'percent', default: 5 }
  ],

  suggest: function (p) {
    if (!(p.passthroughK1 > 0 && p.stateRate > 0)) return null;
    return { reason: TSIQ.fmt.usd(p.passthroughK1) + ' of pass-through income in a state with an income tax — the entity-level deduction is usually free money.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs passthrough entity income
  },

  /**
   * Reduces federal passthrough income by the entity-level tax paid, and
   * credits that tax against the personal state liability. profile.ptetPaid
   * is the state-level credit; profile.ptetDeducted tells the engine how
   * much K-1 income to add back when computing the STATE tax base, so the
   * owner's state bill stays flat (matching the client copy's promise)
   * while the federal K-1 reduction still lowers the federal bill.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (p.passthroughK1 <= 0) {
      notes.push('No pass-through entity income found — PTET requires a partnership ' +
        'or S corporation. Pair with the S-Corp Election strategy, or enter K-1 income.');
      return { profile: p, notes: notes };
    }
    var rate = (params.ptetRatePct !== undefined ? params.ptetRatePct : 5) / 100;
    var ptet = p.passthroughK1 * rate;
    p.passthroughK1 = p.passthroughK1 - ptet;
    p.ptetPaid = (p.ptetPaid || 0) + ptet;
    p.ptetDeducted = (p.ptetDeducted || 0) + ptet;
    if (yearIndex === 0) {
      notes.push('Entity pays ' + TSIQ.fmt.usd(ptet) + ' of state tax, fully deductible ' +
        'federally (Notice 2020-75); owner receives an equal state credit — the state bill ' +
        'stays flat (assuming the PTET rate matches your effective state rate); only the ' +
        'federal bill drops.');
      notes.push('Federal benefit shown is net of the §199A interaction (PTET also reduces QBI).');
      if (rate !== p.stateRate) {
        notes.push('PTET rate (' + TSIQ.fmt.pct(rate) + ') differs from the entered state ' +
          'effective rate (' + TSIQ.fmt.pct(p.stateRate) + ') — the state-neutrality assumption ' +
          'above does not exactly hold; verify against the state\'s actual PTET rate.');
      }
    }
    return { profile: p, notes: notes };
  }
});
