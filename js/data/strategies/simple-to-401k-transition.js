/* ============================================================================
 * STRATEGY: SIMPLE-to-Safe-Harbor-401(k) Mid-Year Replacement
 * Advisory-only: the transition-year math depends on the exact conversion
 * date and a prior-plan-year deferral history this tool does not track.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'simple-to-401k-transition',
  name: 'SIMPLE-to-Safe-Harbor-401(k) Mid-Year Replacement',
  category: 'Retirement',
  applyOrder: 59,
  modeled: false,
  character: 'permanent', // ET2

  requiresOneOf: ['simple-ira'],

  advisor: {
    summary:
      'SECURE 2.0 §332 lets an employer terminate a SIMPLE IRA mid-year and ' +
      'immediately replace it with a safe harbor 401(k) — previously a SIMPLE ' +
      'could only be terminated effective January 1. This is the transition ' +
      'a growing business actually needs (higher deferral limits, profit-' +
      'sharing capacity, and no more 100-employee/exclusive-plan ceiling), ' +
      'but the mechanics are date-driven and this tool\'s two endpoint ' +
      'strategies (SIMPLE IRA and Solo 401(k)/safe-harbor 401(k)) do not ' +
      'model the transition year itself. This strategy exists specifically ' +
      'to fill that guidance gap — including one the app itself has: ' +
      'selecting both a SIMPLE IRA and a safe-harbor 401(k) in the same ' +
      'scenario today produces NO conflict warning (the safe-harbor-401k ' +
      'entry is advisory/no-op), so an advisor could otherwise miss that a ' +
      'real mid-year swap needs deliberate handling, not just checking both boxes.',
    mechanics: [
      'The replacement plan MUST be a safe harbor 401(k) (traditional safe ' +
      'harbor match/nonelective, or QACA) — swapping a SIMPLE mid-year for a ' +
      'plain (non-safe-harbor) 401(k) is not permitted under §332.',
      'Transition-year deferral limit: Notice 2024-02 provides a WEIGHTED-' +
      'AVERAGE limit across the SIMPLE and 401(k) portions of the year, ' +
      'prorated by days each plan was in effect, and reduced by SIMPLE ' +
      'deferrals already made that year — participants do NOT get the full ' +
      'SIMPLE limit plus the full 401(k) limit in the switch year.',
      'Employer contribution obligations run separately for each portion of ' +
      'the year: the SIMPLE\'s mandatory match/nonelective for the pre-switch ' +
      'months, the safe harbor formula for the post-switch months.',
      'Rollover relief: a participant\'s SIMPLE IRA balance can roll into the ' +
      'new safe harbor 401(k) without triggering the 25% early-distribution ' +
      'penalty, even if within the SIMPLE\'s first 2 years of participation — ' +
      'a meaningful improvement over the general SIMPLE-to-non-SIMPLE-plan rules.',
      'The 60-day employee notice requirements still apply — the SIMPLE\'s ' +
      'annual notice and the new safe harbor plan\'s notice both need timely delivery.',
      'This exits the SIMPLE\'s exclusive-plan restriction (Notice 98-4) going ' +
      'forward — the business can layer in profit-sharing, cash balance, or ' +
      'other qualified-plan designs starting the following plan year.'
    ],
    authority: [
      { type: 'Admin', cite: 'SECURE 2.0 Act §332 (P.L. 117-328)', note: 'Permits mid-year termination of a SIMPLE IRA plan when immediately replaced by a safe harbor 401(k) plan, effective for plan years beginning after 12/31/2023.' },
      { type: 'Admin', cite: 'Notice 2024-02', note: 'Guidance on the transition-year prorated/weighted-average deferral limit calculation and related mechanics.' },
      { type: 'IRC', cite: 'IRC §72(t)(6)', note: 'The 25% (vs. 10%) early-distribution penalty during a SIMPLE\'s first 2 years — the §332 rollover relief avoids triggering this on the transition rollover.' },
      { type: 'Admin', cite: 'Notice 98-4, Q&A E-1', note: 'The general exclusive-plan rule this transition ultimately exits — no other qualified plan may be maintained in the same year as a SIMPLE, absent the §332 mid-year exception.' }
    ],
    requirements: [
      'The replacement plan must be a safe harbor 401(k) design (traditional match/nonelective or QACA) — not a standard 401(k).',
      'Timely delivery of both the SIMPLE\'s required notice for the terminated year and the new plan\'s safe harbor notice.',
      'Accurate payroll-system tracking of the exact termination/adoption dates to compute the prorated transition-year limit correctly.',
      'A TPA or recordkeeper comfortable running the Notice 2024-02 weighted-average calculation — this is not a do-it-yourself payroll change.'
    ],
    risks: [
      'Miscalculating the transition-year deferral limit (treating it as the full SIMPLE limit plus the full 401(k) limit) creates an excess deferral that must be corrected.',
      'Switching to a non-safe-harbor 401(k) instead of a safe harbor design does not qualify for the mid-year exception at all.',
      'Missed employee notices (either the SIMPLE\'s or the new plan\'s) can jeopardize the transition\'s validity.',
      'The business loses the SIMPLE\'s minimal-administration simplicity — budget for 401(k)-level compliance costs (Form 5500, nondiscrimination testing considerations even with safe harbor status) going forward.'
    ],
    bestFit: [
      'A business that has outgrown its SIMPLE IRA (profits/participation have grown past what a SIMPLE\'s lower limits support) and does not want to wait until January 1 to upgrade.',
      'Owners who want profit-sharing or cash balance capacity layered on top of a 401(k) as soon as the FOLLOWING plan year.',
      'Any scenario in this tool where both simple-ira and a 401(k)-based strategy are being considered together — this strategy is the bridge between them.'
    ],
    implementation: [
      'Confirm the target replacement plan is a safe harbor design before initiating the SIMPLE termination.',
      'Set the exact SIMPLE termination date and safe harbor 401(k) effective date with the TPA/recordkeeper.',
      'Deliver both the SIMPLE\'s required notice and the new safe harbor plan\'s notice on time.',
      'Have the TPA compute the Notice 2024-02 weighted-average transition-year deferral limit for each participant before year-end payroll changes.',
      'Process the SIMPLE-to-401(k) rollover under the §332 penalty exception, even for participants inside the SIMPLE\'s first 2 years.',
      'Calendar the following plan year for adding profit-sharing/cash-balance design work now that the exclusive-plan restriction is lifted.'
    ]
  },

  client: {
    teaser: 'Outgrown your simple retirement plan? You do not have to wait until January to upgrade',
    headline: 'Switch from a SIMPLE plan to a real 401(k) — without waiting for a new year',
    plainEnglish: [
      'If your business started with the simplest retirement plan available and has since grown, you used to have to wait until January 1 to switch to something better. A newer rule now lets you make the switch mid-year, as long as you move directly into a specific type of 401(k) plan called a "safe harbor" 401(k).',
      'The year you switch is a little more complicated than a normal year — your allowed savings amount for that one year is calculated specially, blending the old plan\'s limit and the new plan\'s limit based on how many months each was in place. We handle that calculation; you do not need to.',
      'Once the switch is made, your business is no longer boxed into the simple plan\'s lower limits, and the following year you can add even more powerful plan designs if it makes sense.'
    ],
    analogy: 'It\'s like upgrading your phone plan mid-contract instead of waiting for renewal — a bit more paperwork in the crossover month, but you get the better plan right away instead of waiting.',
    benefits: [
      'Upgrade to a more powerful retirement plan without waiting for a new calendar year',
      'Your old plan balance rolls over smoothly with no early-withdrawal penalty',
      'Opens the door to bigger contribution limits and more advanced plan designs going forward',
      'We handle the special mid-year calculation so nothing is over- or under-funded'
    ],
    steps: [
      'We confirm the timing and plan design make sense for your business',
      'We coordinate with a plan administrator on the exact switch date',
      'We calculate the special transition-year contribution limits for everyone',
      'We help you plan next year\'s even bigger upgrade if appropriate'
    ],
    considerations: [
      'The new plan has to be a specific type ("safe harbor") — not just any 401(k) qualifies for the mid-year switch.',
      'The switch year has its own special, blended contribution limit — it is not simply the old limit plus the new one.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. ' +
        'The transition year\'s deferral limit is a prorated weighted average (Notice 2024-02), not ' +
        'the sum of both plans\' full limits — have the TPA compute it. Selecting this alongside a ' +
        'SIMPLE IRA strategy in the same scenario signals a mid-year plan swap is being considered, ' +
        'not that both plans run simultaneously for the full year.']
      : [] };
  }
});
