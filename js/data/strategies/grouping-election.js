/* ============================================================================
 * STRATEGY: Passive Activity Grouping Elections
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'grouping-election',
  name: 'Passive Activity Grouping Elections',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 56,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Reg. §1.469-4 lets a taxpayer treat multiple trade-or-business or ' +
      'rental activities as a single activity when they form an "appropriate ' +
      'economic unit," judged by five factors (similarities of business, ' +
      'common control, common ownership, geography, and interdependence). ' +
      'Grouping determines WHERE material participation is tested: hours that ' +
      'fall short activity-by-activity can clear the bar for one combined ' +
      'activity. Separately, Reg. §1.469-9(g) lets a real estate professional ' +
      'aggregate ALL rental real estate as one activity. Groupings are ' +
      'binding once made — regrouping is allowed only for material changes or ' +
      'if the original grouping was clearly inappropriate — and Rev. Proc. ' +
      '2010-13 requires disclosure statements for new groupings and changes. ' +
      'This is structural: it changes which losses are usable, not the ' +
      'amounts, so it is advisory in this tool.',
    mechanics: [
      'Five-factor "appropriate economic unit" test (Reg. §1.469-4(c)): no ' +
      'single factor controls; a reasonable, consistently applied grouping ' +
      'generally stands.',
      'Strategic effect: material participation hours are counted per ' +
      'ACTIVITY — grouping three related businesses turns 3 × 200 hours ' +
      '(all failing the 500-hour test) into 600 combined hours (passing).',
      'Limits: rental activities generally cannot be grouped with ' +
      'trade-or-business activities unless one is insubstantial relative to ' +
      'the other or ownership is proportionate (Reg. §1.469-4(d)(1)); real ' +
      'property rentals cannot be grouped with personal property rentals.',
      'REPS aggregation (Reg. §1.469-9(g)) is a DIFFERENT election: it treats ' +
      'all rental real estate interests as one activity so a real estate ' +
      'professional tests material participation once across the portfolio.',
      'Groupings bind future years (Reg. §1.469-4(e)); the IRS can regroup to ' +
      'prevent tax avoidance if the grouping lacks an economic unit (Reg. ' +
      '§1.469-4(f)).',
      'Cut both ways: a grouped activity defers loss recognition on ' +
      'disposition — suspended losses free up only on disposition of ' +
      'SUBSTANTIALLY ALL of the grouped activity (§469(g)).'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.469-4', note: 'The grouping rules: appropriate economic unit standard, five factors, rental/business grouping limits.' },
      { type: 'Reg', cite: 'Reg. §1.469-4(e), (f)', note: 'Consistency requirement — groupings bind future years; Commissioner may regroup to prevent avoidance.' },
      { type: 'Reg', cite: 'Reg. §1.469-9(g)', note: 'Real estate professional election to treat all rental real estate as a single activity for material participation.' },
      { type: 'Admin', cite: 'Rev. Proc. 2010-13', note: 'Written disclosure statements required for new groupings, additions, and regroupings; undisclosed groupings risk being treated as separate activities.' },
      { type: 'IRC', cite: 'IRC §469(g)', note: 'Suspended losses release on disposition of the ENTIRE interest — grouping enlarges what "entire" means.' },
      { type: 'IRC', cite: 'IRC §469(c), (h)', note: 'Passive activity definitions and the material participation standard the grouping determines the testing unit for.' }
    ],
    requirements: [
      'A defensible "appropriate economic unit": common control/ownership, similar operations, geographic or operational interdependence.',
      'Written disclosure per Rev. Proc. 2010-13 filed with the return for new groupings or changes.',
      'Consistency going forward — this is a one-time, binding structural choice, not an annual dial.',
      'For §1.469-9(g): qualification as a real estate professional first; the election statement filed with the timely return.'
    ],
    risks: [
      'Binding nature: a grouping that helps today can trap suspended losses at disposition (no release until substantially all of the group is sold).',
      'Grouping rentals with businesses outside the insubstantiality/proportionate-ownership exceptions invites IRS regrouping.',
      'Failure to file the Rev. Proc. 2010-13 disclosure can forfeit the intended treatment at exam.',
      'The §1.469-9(g) aggregation can complicate per-property loss planning and future disposition timing.',
      'Groupings interact with the self-rental recharacterization rule — grouping the rental with the operating business is often the cleaner fix; analyze together.'
    ],
    bestFit: [
      'Owners of several related entities or locations whose combined hours pass material participation but whose per-activity hours fail.',
      'Real estate professionals with multiple rentals who cannot materially participate in each property separately.',
      'Clients holding an operating business plus its real estate (pairs with self-rental planning).'
    ],
    implementation: [
      'Inventory every activity, its ownership, hours, and current grouping treatment (including groupings implied by past filing positions).',
      'Test material participation under the current structure vs. candidate groupings; model disposition consequences before electing.',
      'Draft the grouping under the five-factor test; document the economic-unit rationale in the file.',
      'File the Rev. Proc. 2010-13 disclosure statement (or the §1.469-9(g) election for REPS aggregation) with the timely return.',
      'Revisit only on material changes in facts — and document any regrouping\'s justification.'
    ]
  },

  client: {
    teaser: 'A one-page filing that can change which of your losses actually count',
    headline: 'Combine related activities so your work hours count once — where they matter',
    plainEnglish: [
      'The tax law sorts your income into "active" and "passive" buckets, and losses in the passive bucket can\'t offset your regular income. Which bucket an activity lands in depends on how many hours you put into it — measured activity by activity.',
      'Here\'s the catch: if you run three related operations and split your time among them, each one alone might fall short of the hour thresholds, making all of them "passive" — even though you obviously work the combined operation full-time. The fix is an election that tells the IRS to treat related activities as one, so your hours are counted together.',
      'It\'s a structural choice, not a deduction by itself — but it can be the difference between losses you can use this year and losses stuck on a shelf. Because the choice is binding in future years, we model the long-term consequences before filing anything.'
    ],
    analogy: 'It\'s like a punch card that only rewards you per store — combining your stores onto one card means every visit finally counts toward the same reward.',
    benefits: [
      'Hours across related activities count together, not separately',
      'Can convert unusable "passive" losses into losses that offset your income',
      'Especially powerful for owners of multiple rentals or related businesses',
      'One filing with your return — no ongoing cost'
    ],
    steps: [
      'We map every activity you own and how your hours are spread across them',
      'We test which combination unlocks the most losses — now and at future sale',
      'We document the business reasons that support the combination',
      'We file the required election and disclosure with your return'
    ],
    considerations: [
      'The choice is binding in future years, and it can delay when losses from a sale are recognized — so we model the exit before we commit.',
      'The activities must genuinely fit together as one economic operation; combinations built purely for tax reasons can be undone by the IRS.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true;
  },

  apply: function (profile, params, yearIndex, state) {
    return { profile: profile, notes: yearIndex === 0
      ? ['Advisory strategy — appears in the plan documents but does not change the scenario math.']
      : [] };
  }
});
