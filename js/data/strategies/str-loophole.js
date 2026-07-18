/* ============================================================================
 * STRATEGY: Short-Term Rental Strategy (the "STR Loophole")
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'str-loophole',
  name: 'Short-Term Rental Strategy',
  category: 'Real Estate & Cost Recovery',
  applyOrder: 53,
  modeled: true,

  advisor: {
    summary:
      'Under Reg. §1.469-1T(e)(3)(ii)(A), a property whose average period of ' +
      'customer use is 7 days or less is NOT a "rental activity" for §469 — ' +
      'so the per-se passive rule never attaches. The activity is then tested ' +
      'like any business: if the owner materially participates under Reg. ' +
      '§1.469-5T(a), losses are nonpassive and offset W-2 and business income ' +
      'currently — no real estate professional status required. This is the ' +
      'high-W-2 earner\'s doorway to using cost segregation and 100% bonus ' +
      'depreciation on a short-term rental. The trade-off: providing hotel-' +
      'like substantial services can push the activity to Schedule C and ' +
      'self-employment tax.',
    mechanics: [
      'Average-stay math: total guest-occupied days ÷ number of stays. ≤7 ' +
      'days average (typical Airbnb/VRBO) means the activity is excepted from ' +
      'the rental definition under Reg. §1.469-1T(e)(3)(ii)(A); a ≤30-day ' +
      'average with significant personal services is a second doorway.',
      'Once outside the rental definition, ordinary material participation ' +
      'tests apply (Reg. §1.469-5T(a)): 500 hours; substantially all the ' +
      'participation; or >100 hours and more than any other individual ' +
      '(including cleaners, co-hosts, and property managers — count THEIR ' +
      'hours too).',
      'Self-management is the practical requirement: a full-service ' +
      'management company usually out-participates the owner and kills the ' +
      '>100-hours-and-most test.',
      'Pairs with cost segregation: STR building components (5/7/15-year) get ' +
      '100% bonus under §168(k), producing a large first-year nonpassive loss ' +
      'against high W-2 income.',
      'Absent SUBSTANTIAL services (daily cleaning during stays, meals, ' +
      'concierge), the income stays on Schedule E with no SE tax (Reg. ' +
      '§1.1402(a)-4); hotel-like services move it to Schedule C and §1402 SE ' +
      'tax — usually worth avoiding.',
      'Personal-use days matter: §280A vacation-home limits can cap losses if ' +
      'personal use exceeds the greater of 14 days or 10% of rental days.'
    ],
    authority: [
      { type: 'Reg', cite: 'Reg. §1.469-1T(e)(3)(ii)(A)', note: 'Average customer use of 7 days or less takes the activity outside the per-se rental definition — the doorway.' },
      { type: 'Reg', cite: 'Reg. §1.469-5T(a)', note: 'Material participation tests; most STR owners rely on 500 hours, substantially-all, or >100 hours and more than anyone else.' },
      { type: 'IRC', cite: 'IRC §469(c)(1), (c)(2)', note: 'The passive loss regime and the per-se rental rule being sidestepped.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation (permanent, OBBBA) on reclassified 5/7/15-year STR components — the engine of the first-year loss.' },
      { type: 'Reg', cite: 'Reg. §1.1402(a)-4', note: 'Rental real estate excluded from self-employment income UNLESS substantial services are rendered to occupants — the Schedule C/SE-tax tripwire.' },
      { type: 'IRC', cite: 'IRC §280A', note: 'Vacation-home rules: excess personal use caps deductions regardless of §469.' },
      { type: 'Admin', cite: 'IRS Passive Activity Loss Audit Technique Guide', note: 'Exam framework for average-stay computation and participation-hour scrutiny.' }
    ],
    requirements: [
      'Average guest stay of 7 days or less, computed and documented from booking records.',
      'Material participation by the owner (or spouse) under a specific §1.469-5T(a) test — with contemporaneous hour logs for the owner AND service providers.',
      'Substantially self-managed: guest communication, pricing, turnovers arranged by the owner.',
      'Personal use kept within §280A limits (≤ greater of 14 days / 10% of rental days) to avoid a second loss cap.'
    ],
    risks: [
      'Hour inflation is the exam target: the IRS counts cleaners\' and co-hosts\' hours against the owner under the >100-and-most test.',
      'Substantial services convert the activity to Schedule C — SE tax of up to ~15.3% can erode the benefit.',
      'The average-stay test is annual; one year of month-long winter tenants can flip the property back to per-se passive.',
      'Recapture and lower later-year depreciation follow the accelerated deductions — timing benefit, not free money.',
      'Local STR ordinances, permits, and lodging taxes are a compliance layer outside the income tax analysis.',
      'Losses only matter at high marginal rates — mind the study cost and effort against the bracket.'
    ],
    bestFit: [
      'High-W-2 households who cannot reach REPS but can self-manage a vacation rental.',
      'Clients acquiring an STR-suitable property with meaningful depreciable basis (pairs with a cost segregation study).',
      'Owners willing to log hours and handle guest operations for at least the first year (the loss year).'
    ],
    implementation: [
      'Confirm the average-stay profile from platform booking data; set listing rules (e.g., 7-night max is not required — the AVERAGE governs).',
      'Structure operations so the owner materially participates: self-manage, document owner hours and all vendor hours contemporaneously.',
      'Commission the cost segregation study for the placed-in-service year; claim 100% bonus on reclassified components.',
      'Keep services below the "substantial services" line (no daily cleaning during stays, meals, or concierge) unless the Schedule C trade-off is deliberate.',
      'Track personal-use days against the §280A limits; report on Schedule E.'
    ]
  },

  client: {
    teaser: 'A property niche where big first-year losses count against your paycheck',
    headline: 'Short-term rentals: deductions that offset your W-2 income',
    plainEnglish: [
      'Rental losses are normally locked away — they can\'t reduce the tax on your salary. And the main exception requires you to work in real estate more than anything else you do, which rules out most people with careers.',
      'Short-term rentals play by different rules. If your guests stay an average of a week or less — the typical Airbnb pattern — the tax law doesn\'t treat the property as a "rental" at all. It\'s treated like a business, and if you genuinely run it yourself, its losses count against your regular income. No career change required.',
      'Combine that with an engineering study that front-loads the property\'s depreciation, and a new short-term rental can produce a very large first-year deduction against a very large salary. You do have to actually run the property — handling bookings, guests, and turnovers — and keep a log of your hours.'
    ],
    analogy: 'It\'s a side door into the same room the full-time real estate pros use — open to you as long as your guests check out within about a week and you\'re the one running the show.',
    benefits: [
      'Rental losses offset your salary and business income — no real estate career required',
      'Pairs with accelerated depreciation for a large first-year deduction',
      'Works with a single property',
      'The property can still be a genuine income-producing investment'
    ],
    steps: [
      'We confirm your property and booking pattern qualify (average stay of 7 days or less)',
      'We set up simple hour-tracking so your involvement is provable',
      'We coordinate the depreciation study and claim the first-year write-off',
      'We watch the details — guest services, personal use — that could change the treatment'
    ],
    considerations: [
      'You must genuinely run the property yourself — a full-service manager doing everything usually breaks the strategy.',
      'Offering hotel-style services (daily cleaning, meals) can trigger self-employment tax, so we keep the service level deliberately simple.',
      'The big deduction is an acceleration: later years have less depreciation, and we plan for that.'
    ]
  },

  inputs: [],

  appliesTo: function (profile) {
    return true; // the unlock is meaningful whenever rental losses exist or are planned
  },

  /**
   * Same engine effect as REPS — flips the §469 gate AND the §1411 non-passive
   * gate — but through the short-term-rental doorway (avg stay ≤ 7 days +
   * material participation), so no real-estate-professional hour tests are
   * needed: with material participation the activity is a non-passive trade
   * or business, excluded from NII under §1411(c)(2) as well. Both flags set
   * every projection year; notes only in year 1.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var alreadyUsable = !!p.rentalLossesUsable;
    p.rentalLossesUsable = true;
    p.reNonPassive = true;
    if (yearIndex === 0) {
      if (alreadyUsable) {
        notes.push('Rental losses were already flagged usable — short-term rental ' +
          'treatment documented as the supporting position (avg stay ≤ 7 days, Reg. ' +
          '§1.469-1T(e)(3)(ii)(A), plus material participation).');
      } else {
        notes.push('Short-term rental treatment unlocks the losses: avg guest stay ≤ 7 ' +
          'days means the activity is NOT per-se passive (Reg. §1.469-1T(e)(3)(ii)(A)); ' +
          'with material participation (100-hr/most or 500-hr tests), losses from this ' +
          'and paired depreciation strategies offset nonpassive income. No REPS needed. ' +
          'Keep services below the substantial-services line to stay off Schedule C/SE tax.');
      }
    }
    return { profile: p, notes: notes };
  }
});
