/* ============================================================================
 * STRATEGY: Late S-Election Relief (Rev. Proc. 2013-30)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'late-s-election-relief',
  name: 'Late S-Election Relief (Rev. Proc. 2013-30)',
  category: 'Entity Structure',
  applyOrder: 15,
  modeled: false, // advisory-only: enables the S-corp election; the math lives in s-corp-election
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Rev. Proc. 2013-30 provides a streamlined, no-user-fee path to ' +
      'retroactive S corporation status when Form 2553 was filed late (or ' +
      'never filed) — generally available up to 3 years and 75 days after the ' +
      'intended effective date. The corporation must show it intended S status ' +
      'as of that date, failed to qualify solely because the election was not ' +
      'timely filed, has reasonable cause, and that the entity and all ' +
      'shareholders reported consistently with S status for every affected ' +
      'year. Relief is claimed by filing Form 2553 with the required ' +
      'statements — either attached to Form 1120-S or filed separately — with ' +
      '"FILED PURSUANT TO REV. PROC. 2013-30" across the top. This strategy ' +
      'rescues the client who has been operating "as an S corp" without a ' +
      'valid election; the S-Corp Election strategy in this library models ' +
      'the dollar benefit.',
    mechanics: [
      'Normal deadline: §1362(b) requires Form 2553 by the 15th day of the ' +
      '3rd month of the year the election is to take effect (2 months + 15 ' +
      'days in). Miss it and the election defaults to the following year — ' +
      'unless relief applies.',
      'Statutory hook: §1362(b)(5) authorizes the IRS to treat a late ' +
      'election as timely where reasonable cause is shown; Rev. Proc. 2013-30 ' +
      'is the streamlined administrative implementation (consolidating and ' +
      'superseding Rev. Procs. 2003-43, 2004-48, and 2007-62).',
      'General window: the completed Form 2553 must be filed within 3 years ' +
      'and 75 days of the intended effective date. (A narrow exception with ' +
      'no time limit exists for corporations meeting additional consistency ' +
      'tests where no year at issue is open.)',
      'Substantive tests: (1) the entity intended to be an S corporation as ' +
      'of the effective date and failed solely because the election was not ' +
      'filed timely; (2) reasonable cause for the failure and diligent action ' +
      'once discovered, stated under penalties of perjury; (3) the entity and ' +
      'ALL shareholders reported income consistently with S status for every ' +
      'year since the intended effective date; (4) shareholder statements to ' +
      'that effect are attached.',
      'Same procedure also covers late entity-classification elections that ' +
      'ride with an S election (an LLC intending S status files only Form ' +
      '2553 — the Form 8832 election is deemed made), plus late ESBT/QSST ' +
      'and QSub elections.',
      'Outside the rev proc (window blown, consistency broken), the fallback ' +
      'is a private letter ruling under §1362(b)(5) — slow and with a ' +
      'substantial user fee, which is why catching this within the window ' +
      'matters.'
    ],
    authority: [
      { type: 'Admin', cite: 'Rev. Proc. 2013-30', note: 'The streamlined relief: eligibility tests, the 3-year-75-day window, required reasonable-cause and shareholder-consistency statements, no user fee. Supersedes Rev. Procs. 2003-43, 2004-48, 2007-62.' },
      { type: 'IRC', cite: 'IRC §1362(b)(5)', note: 'Statutory authority for the IRS to treat a late S election as timely upon a showing of reasonable cause.' },
      { type: 'IRC', cite: 'IRC §1362(a)–(b)', note: 'Election mechanics and the 2-month-15-day deadline the client missed.' },
      { type: 'Admin', cite: 'Form 2553', note: 'The election form; for relief, completed with the Rev. Proc. 2013-30 legend, reasonable-cause statement, and shareholder consistency statements.' },
      { type: 'IRC', cite: 'IRC §1361', note: 'Eligibility requirements that must have been continuously satisfied from the intended effective date (eligible shareholders, one class of stock, ≤100 shareholders).' }
    ],
    requirements: [
      'The entity was ELIGIBLE for S status continuously from the intended effective date (§1361 tests) — relief cures the paperwork, not eligibility defects.',
      'Failure to qualify is solely the late/missing Form 2553 (or companion classification election).',
      'Reasonable cause and diligent correction, stated under penalties of perjury.',
      'The entity and every shareholder filed all affected returns consistently with S status (e.g., 1120-S filed or no C-corp return filed; shareholders picked up passthrough income).',
      'Filing within 3 years and 75 days of the intended effective date (limited exceptions).'
    ],
    risks: [
      'Consistency is the usual deal-breaker: if any year was filed as a C corporation, or a shareholder reported inconsistently, streamlined relief is unavailable — the PLR route is the only fallback.',
      'Relief validates the election, not the compensation: retroactive S years still need reasonable comp — expect to address unpaid-payroll exposure for those years (see the Reasonable Compensation Study strategy).',
      'A weak reasonable-cause narrative invites rejection; "we forgot" needs surrounding diligence facts.',
      'Eligibility defects in ANY covered year (ineligible shareholder, second class of stock) sink the whole retroactive period.',
      'State S-status conformity is separate — some states require their own election or notification, and late-relief practice varies.'
    ],
    bestFit: [
      'Clients who formed an entity, intended S status, and discover at tax time (or in an exam) that Form 2553 was never filed or was filed late.',
      'Clients who have been filing 1120-S and issuing K-1s in good faith without a valid election on file.',
      'Onboarding reviews of new clients — a missing S election is one of the most common inherited defects.'
    ],
    implementation: [
      'Pull the IRS record: request the entity\'s account transcript or call the Business & Specialty line to confirm no valid election exists and identify the intended effective date.',
      'Verify the window: within 3 years + 75 days of the intended effective date, and confirm every year\'s filings (entity and all shareholders) are consistent with S status.',
      'Draft the reasonable-cause statement and collect shareholder consistency statements signed under penalties of perjury.',
      'Complete Form 2553 with "FILED PURSUANT TO REV. PROC. 2013-30" at the top; attach to the current 1120-S or file separately with the service center.',
      'Address the retroactive years\' reasonable compensation and any payroll cleanup in parallel.',
      'Once accepted, pair with the S-Corp Election strategy in this tool to model the ongoing benefit, and check state election requirements.'
    ]
  },

  client: {
    teaser: 'A missed piece of paperwork that could be costing you thousands may still be fixable — retroactively',
    headline: 'Missed the S corporation deadline? It can often be fixed — backdated',
    plainEnglish: [
      'The S corporation tax status that saves business owners thousands each year requires a short form filed with the IRS by a strict early-in-the-year deadline. It is one of the most commonly missed filings in small business — sometimes the form was never sent, sometimes it was sent and lost, and the owner has no idea.',
      'The good news: the IRS has an official forgiveness program. If you always intended to be an S corporation, have a reasonable explanation, and you and the company filed your taxes as if the election were in place, the IRS will generally honor the election retroactively — up to about three years back. No penalty, no fee for the request.',
      'This matters because without the fix, the IRS could treat those years under much worse tax rules. We check whether you qualify, prepare the explanation, and file the paperwork so your intended tax treatment actually sticks.'
    ],
    analogy: 'It\'s like realizing your warranty registration card was never mailed — and finding out the manufacturer will still honor it, backdated, because you clearly bought the product and acted in good faith all along.',
    benefits: [
      'Locks in the tax status you thought you already had — retroactively',
      'Avoids the IRS re-doing past years under costlier rules',
      'No IRS filing fee under the forgiveness program',
      'Clears the path for the yearly savings the structure was chosen for'
    ],
    steps: [
      'We confirm with the IRS whether a valid election is actually on file',
      'We check that you qualify for the forgiveness program',
      'We prepare the explanation and signed statements and file the fix',
      'We tidy up any related payroll items so the past years hold up'
    ],
    considerations: [
      'The program has a time window — roughly three years — so this is worth checking now, not later.',
      'It only works if your tax filings were consistent with the S corporation choice; if a year was filed differently, a slower, costlier request is the backup route.',
      'Fixing the election can also mean cleaning up owner payroll for the covered years — we will scope that honestly before filing.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math. Pair with the S-Corp Election strategy to model the dollar benefit once relief is secured.']
      : [] };
  }
});
