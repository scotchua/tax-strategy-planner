/* ============================================================================
 * STRATEGY: Excess Business Loss (§461(l)) Planning
 * ADVISORY — the engine does not model §461(l); this entry plans around it.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'excess-business-loss',
  name: 'Excess Business Loss (§461(l)) Planning',
  category: 'Income Timing & Character',
  applyOrder: 5,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      '§461(l) — made permanent by OBBBA — caps the aggregate business loss a ' +
      'noncorporate taxpayer can deduct against nonbusiness income in one year: ' +
      '$256,000 single / $512,000 MFJ for 2026 (OBBBA reverted the thresholds to the original TCJA base; Rev. Proc. 2025-32; verify ' +
      'against the final Rev. Proc. figure). The disallowed excess business loss ' +
      'becomes an NOL carryover to the following year (§461(l)(2)) — so the ' +
      'limitation is a one-year timing toll, but the carryover then inherits the ' +
      '§172 80% cap and loses the ability to offset the CURRENT year\'s wages ' +
      'and portfolio income. Critically, W-2 wages are NOT business income for ' +
      'this computation (CARES Act clarification), so a high-wage spouse plus a ' +
      'big loss business is the classic trapped-loss fact pattern. Planning ' +
      'levers: manage the wage/business income mix, aggregate business income ' +
      'and gains correctly, and time discretionary deductions and income so ' +
      'losses land where they are usable. The engine DOES enforce §461(l): a ' +
      'disallowed excess is added back to the year it arose and banked as an ' +
      'NOL for future years only, used at up to 80% of taxable income under ' +
      '§172(a)(2). This entry exists to surface the planning levers, not to ' +
      'compensate for a missing cap.',
    mechanics: [
      'Compute aggregate business deductions minus aggregate business income ' +
      'and gains across ALL trades or businesses; the excess over the threshold ' +
      '($256k/$512k for 2026, indexed under §461(l)(3)(B)) is disallowed for ' +
      'the year and reported on Form 461.',
      'Employee wages are NOT attributable to a trade or business for this ' +
      'computation (§461(l)(3), as clarified by the CARES Act) — a $700k-wage ' +
      'household cannot use wages as "business income" to absorb a $900k loss.',
      'Business capital gains count toward business income only to a limited ' +
      'extent (gains from the trade or business, e.g., §1231 gains); portfolio ' +
      'gains do not help.',
      'The disallowed EBL converts to an NOL carryover next year (§461(l)(2)) ' +
      '— then subject to the §172 80% limitation. The cost is deferral plus the ' +
      'possible rate differential, not permanent disallowance.',
      'Ordering: §461(l) applies AFTER basis, at-risk (§465), and passive ' +
      'activity (§469) limits — a loss must clear all three gates before the ' +
      'EBL cap even matters.',
      'Levers: shift owner compensation between W-2 wages and pass-through ' +
      'income where legitimate (S-corp reasonable comp still required); time ' +
      'elective deductions (bonus depreciation elections, §179) so they do not ' +
      'create a trapped loss; accelerate income into the loss year to absorb ' +
      'the loss currently rather than carry it.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §461(l)', note: 'Excess business loss limitation for noncorporate taxpayers — made permanent by OBBBA (P.L. 119-21).' },
      { type: 'IRC', cite: 'IRC §461(l)(2)', note: 'Disallowed excess business loss treated as an NOL carryover to the following taxable year.' },
      { type: 'IRC', cite: 'IRC §461(l)(3)', note: 'Definition of excess business loss; thresholds indexed for inflation; employee wages excluded from business income (CARES Act, P.L. 116-136, clarification).' },
      { type: 'IRC', cite: 'IRC §§465, 469', note: 'At-risk and passive-loss limits apply BEFORE §461(l) — the ordering that determines which gate actually traps the loss.' },
      { type: 'IRC', cite: 'IRC §172', note: 'The converted carryover enters the NOL regime — 80% limitation, no carryback, indefinite carryforward.' },
      { type: 'Admin', cite: 'Form 461', note: 'Limitation on Business Losses — computation and reporting of the disallowed amount.' }
    ],
    requirements: [
      'A projected aggregate business loss near or above $256k single / $512k MFJ (2026, per Rev. Proc. 2025-32 — OBBBA reset the thresholds DOWN to the TCJA base).',
      'Losses that have already cleared basis, at-risk, and §469 passive gates — otherwise those limits control, not §461(l).',
      'Accurate classification of every income item as business vs. nonbusiness (wages are nonbusiness; §1231 business gains count).',
      'A multi-year projection, since the planning is about WHERE the loss lands, not whether it exists.'
    ],
    risks: [
      'This tool\'s engine does NOT enforce §461(l) (documented v1 simplification) — a modeled loss above the threshold overstates the current-year benefit; the advisor must adjust.',
      'The trapped loss becomes next year\'s NOL and then hits the §172 80% cap — stacking limitations can stretch recovery over several years.',
      'Misclassifying wages or portfolio gains as business income to absorb losses is a computational error the IRS catches on Form 461 matching.',
      'Recharacterizing owner comp purely to manage §461(l) collides with S-corp reasonable-compensation requirements.',
      'The threshold is per-year: a loss deliberately split across two years by delaying deductions must survive economic-substance and elective-timing rules (deduction elections like bonus/§179 are the safe levers).'
    ],
    bestFit: [
      'High-wage households with a large actively-managed business or STR loss (the classic W-2-plus-loss trap).',
      'Owners planning a bonus-depreciation-heavy year (cost segregation, fleet purchases) whose modeled loss exceeds the cap.',
      'Multi-entity owners who can time income and elective deductions across entities and years.'
    ],
    implementation: [
      'Project the aggregate business loss for the year; compare against the 2026 threshold ($256k/$512k per Rev. Proc. 2025-32).',
      'Sequence elective deductions: elect out of bonus by class, or moderate §179, so the usable loss lands at (not over) the cap when the excess would be trapped.',
      'Where legitimate, accelerate business income (billing timing, §1231 gain recognition) into the loss year to absorb the loss currently.',
      'File Form 461 with the return; carry the disallowed amount into the following year\'s NOL schedule.',
      'Re-run this tool\'s projection with the loss manually capped to see the honest current-year number.'
    ]
  },

  client: {
    teaser: 'Keeps a big write-off year from getting stuck behind an IRS ceiling',
    headline: 'Plan around the ceiling on business losses',
    plainEnglish: [
      'When a business has a very large loss year — often on purpose, from big equipment or property write-offs — there\'s a ceiling on how much of that loss can offset your other income, like wages and investments, in a single year. For 2026 the ceiling is $256,000 for singles and $512,000 for married couples — notably LOWER than 2025, because the 2025 tax law reset the starting point.',
      'Losses above the ceiling aren\'t gone — they roll into future years — but rolling forward is slower and usually less valuable than using them now. And one common surprise: a spouse\'s salary doesn\'t count as business income here, so high-salary households hit this ceiling more easily than they expect.',
      'The fix is planning the size and timing of the loss. We can dial big write-offs up or down between years, or bring more business income into the loss year, so your losses do their work now instead of waiting in line.'
    ],
    analogy: 'It\'s like a drain that can only handle so much water per hour — pour faster and the rest pools and waits. We pour at the rate the drain can take, so nothing sits around losing value.',
    benefits: [
      'Big write-off years planned so the deductions actually land now',
      'No surprise at filing time when a loss gets partially benched',
      'Leftover losses tracked and pointed at your best future years',
      'Write-off elections sized year by year to stay under the ceiling'
    ],
    steps: [
      'Before any big write-off year, we project the total loss against the ceiling',
      'We size and time the write-offs — or shift income — so the loss is fully usable',
      'We file the required IRS form and track anything that carries forward',
      'We re-check every year as the ceiling adjusts for inflation'
    ],
    considerations: [
      'Losses over the ceiling are delayed, not lost — but a delayed deduction is worth less than one you use today, which is exactly why we plan around it.',
      'The comparison numbers in this tool don\'t apply the ceiling automatically — where it matters for you, we adjust the projections by hand and tell you.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
         'The engine enforces the §461(l) cap ($256k/$512k for 2026) directly: the excess is ' +
         'disallowed in the year it arises and carried forward as an NOL, and the results panel ' +
         'raises a quantified note when it bites. Nothing needs capping by hand.']
      : [] };
  }
});
