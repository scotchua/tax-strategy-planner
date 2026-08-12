/* ============================================================================
 * STRATEGY: Business Travel Optimization (Mixed Trips) (ADVISORY)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'travel-documentation',
  name: 'Business Travel Optimization (Mixed Trips)',
  category: 'Business Expenses',
  applyOrder: 46,
  modeled: false,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Planning and documentation rules that determine how much of a mixed ' +
      'business/personal trip is deductible. For domestic travel, the ' +
      'transportation cost is all-or-nothing on the PRIMARY PURPOSE of the ' +
      'trip (Reg. §1.162-2(b)) — primarily business means the full airfare ' +
      'deducts even with personal days attached; primarily personal means zero ' +
      'airfare even if some business occurs. Lodging and meals deduct only for ' +
      'the business days either way. Business-day counting therefore drives ' +
      'everything: travel days count, weekend days sandwiched between business ' +
      'days count when staying is reasonable, and standby days required by the ' +
      'client count. Foreign trips have a harder allocation regime (§274(c); ' +
      'Reg. §1.274-4), and a spouse\'s costs are nondeductible unless the ' +
      'spouse is an employee traveling for a bona fide business purpose ' +
      '(§274(m)(3)). Advisory — the value is trip design and records, not a ' +
      'number this tool can honestly compute.',
    mechanics: [
      'Domestic primary-purpose test (Reg. §1.162-2(b)): whether a trip is ' +
      'primarily business or primarily personal is a facts question in which ' +
      'the TIME devoted to each is the most important factor. Win the day ' +
      'count and the round-trip transportation is 100% deductible; lose it and ' +
      'the transportation is 100% personal.',
      'On-site costs allocate regardless of the transportation answer: lodging, ' +
      '50% of meals, and local costs deduct for business days only; personal ' +
      'days are personal.',
      'Business-day counting: days whose principal activity is business; ' +
      'travel days to and from; days where presence is required by the client ' +
      'even if little work occurs; and intervening weekend/holiday days when ' +
      'returning home and coming back is impractical (the "sandwich" — a ' +
      'Friday-and-Monday meeting schedule makes Saturday and Sunday business ' +
      'days for lodging/meal purposes).',
      'Foreign travel (§274(c); Reg. §1.274-4): transportation must be ' +
      'ALLOCATED between business and personal days unless the trip is ≤1 week ' +
      'or personal time is <25% of the trip — deliberately scheduling within ' +
      'those safe harbors preserves the full deduction.',
      'Spouse/dependent travel (§274(m)(3)): nondeductible unless the spouse is ' +
      'a bona fide EMPLOYEE of the payor, travels for a genuine business ' +
      'purpose, and the costs would otherwise be deductible. Note the ' +
      'single-room economics: deduct what the room would have cost for the ' +
      'taxpayer alone (single rate), not half the double rate.',
      'Substantiation (§274(d)): travel is listed-category — records of amount, ' +
      'dates, destination, and business purpose, kept contemporaneously. An ' +
      'itinerary with the business calendar attached is the practical standard.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)(2)', note: 'Traveling expenses (transportation, lodging, meals) while away from home in pursuit of a trade or business.' },
      { type: 'Reg', cite: 'Reg. §1.162-2(b)', note: 'The domestic primary-purpose test — all-or-nothing transportation based on facts and circumstances, with time devoted to each purpose the key factor.' },
      { type: 'IRC', cite: 'IRC §274(c)', note: 'Foreign travel allocation requirement, with the one-week and less-than-25%-personal exceptions.' },
      { type: 'Reg', cite: 'Reg. §1.274-4', note: 'Mechanics of the foreign-travel allocation and the business-day counting rules used by analogy in practice.' },
      { type: 'IRC', cite: 'IRC §274(m)(3)', note: 'Spouse, dependent, or companion travel nondeductible unless an employee with a bona fide business purpose whose expenses are otherwise deductible.' },
      { type: 'IRC', cite: 'IRC §274(d)', note: 'Strict substantiation for travel: amount, time, place, business purpose — contemporaneous records.' },
      { type: 'IRC', cite: 'IRC §274(n)', note: '50% limitation on meals while traveling.' }
    ],
    requirements: [
      'Genuine business reason for the destination — client, conference, property, vendor — documented before the trip.',
      'A day-by-day itinerary distinguishing business days from personal days, retained with the calendar entries and meeting confirmations.',
      'Receipts for transportation and lodging; the trip file built contemporaneously, not at tax time.',
      'For spouse costs: employee status and a bona fide business role on the trip, or exclusion of those costs.'
    ],
    risks: [
      'A trip that is really a vacation with a token meeting fails the primary-purpose test — zero transportation deduction and exam credibility damage.',
      'Reconstructed itineraries fail §274(d); this deduction is won or lost on contemporaneous records.',
      'Foreign trips outside the safe harbors require allocation many preparers miss — an automatic adjustment when examined.',
      'Deducting a spouse\'s airfare and the double-room premium without employee status is a recurring, easily-spotted adjustment.',
      'Aggressive "business" day counts (an hour of email does not make a business day) invite recharacterization of the whole trip.'
    ],
    bestFit: [
      'Owners who travel to clients, conferences, or properties and extend trips personally.',
      'Businesses with recurring multi-city or international travel.',
      'Couples working in the business together (spouse-employee planning makes both tickets deductible).'
    ],
    implementation: [
      'Before booking, design the trip: schedule business on both ends of a weekend where sensible, and keep foreign trips within the ≤1 week or <25% personal safe harbors.',
      'Create a per-trip file: purpose memo, itinerary, meeting confirmations, receipts — assembled during the trip.',
      'Count and record business days per the rules (travel days, required-presence days, sandwiched weekends).',
      'If the spouse genuinely works in the business, formalize employment BEFORE the travel year and document the spouse\'s role on each trip.',
      'At year end, deduct transportation per the primary-purpose result and on-site costs per the day count; apply 50% to travel meals.'
    ]
  },

  client: {
    teaser: 'A few smart scheduling habits that turn more of each trip into a write-off',
    headline: 'Plan trips so the business part actually gets deducted',
    plainEnglish: [
      'When a trip mixes business and pleasure, the tax result depends less on what you spent and more on how the trip was structured. Here is the surprising rule for domestic trips: if the trip is mainly business, the entire airfare is deductible — even if you tack on a few beach days. If it is mainly personal, none of the airfare counts, even if you took a meeting. The hotel and meals follow the days themselves: business days count, personal days do not.',
      'That means the calendar is a planning tool. Meetings on Friday and Monday can make the weekend in between count as business days for your hotel. Keeping an overseas trip inside certain time limits protects the whole airfare. Small scheduling choices, made before you book, change the math.',
      'The other half is simple paperwork: a trip file with your itinerary, meeting confirmations, and receipts, kept as you go. It takes minutes and it is the difference between deductions that survive questions and deductions that vanish.'
    ],
    analogy: 'It\'s like airline seat selection — the flight costs the same either way, but the person who plans ahead gets far more out of it.',
    benefits: [
      'Full airfare deductions on properly structured trips',
      'More hotel nights counted as business, including some weekends',
      'Clear rules for bringing your spouse along',
      'Records that hold up if anyone ever asks'
    ],
    steps: [
      'Before you book a mixed trip, we help you structure the schedule',
      'We give you a simple per-trip checklist for the records',
      'You keep the itinerary and receipts as you travel',
      'We apply the day-count rules at tax time to claim the maximum'
    ],
    considerations: [
      'The trip has to genuinely be about business — a vacation with one meeting sprinkled in does not qualify, and we will tell you so.',
      'A spouse\'s travel costs only count if they truly work for the business and have a real role on the trip.',
      'Meals on the road are only ever half deductible — that is the law, not a choice.'
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
