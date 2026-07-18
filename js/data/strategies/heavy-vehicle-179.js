/* ============================================================================
 * STRATEGY: Heavy Vehicle §179 (>6,000 lbs GVWR)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'heavy-vehicle-179',
  name: 'Heavy Vehicle §179 (>6,000 lbs GVWR)',
  category: 'Business Expenses',
  applyOrder: 42,
  modeled: true,

  advisor: {
    summary:
      'Vehicles with a gross vehicle weight rating above 6,000 lbs are not ' +
      '"passenger automobiles" under §280F(d)(5), so the luxury-auto ' +
      'depreciation caps do not apply. A heavy SUV, pickup, or van used more ' +
      'than 50% in business can be expensed in year one: §179 up to the ' +
      'SUV-specific cap of §179(b)(5) (roughly $32,000 for 2026, indexed — ' +
      'verify), with 100% bonus depreciation under §168(k) (permanent post-' +
      'OBBBA) absorbing the remaining business-use basis. The result is a full ' +
      'first-year write-off of the business percentage of the vehicle\'s cost. ' +
      'The benefit is timing: depreciation is used up in year one, and §280F ' +
      'recapture bites if business use later drops to 50% or below.',
    mechanics: [
      'GVWR above 6,000 lbs (check the door-jamb sticker, not curb weight) ' +
      'takes the vehicle outside the §280F(d)(5) passenger-auto definition — ' +
      'no luxury-auto annual caps.',
      '§179(b)(5) imposes a special cap on heavy SUVs ($25,000 base, indexed — ' +
      'approximately $32,000 for 2026); pickups with a 6-ft+ bed and certain ' +
      'vans (seating 9+ behind the driver / cargo configuration) escape the ' +
      'SUV cap entirely.',
      'In practice the SUV cap rarely matters now: 100% bonus depreciation ' +
      '(§168(k), permanent for property acquired after 1/19/2025) covers ' +
      'whatever §179 does not, so the full business-use share of cost is ' +
      'deductible in year one either way. The §179/bonus mix still matters for ' +
      'states that decouple from bonus.',
      'Deduction = cost × business-use percentage, which must EXCEED 50% ' +
      '(§280F(b)) to use §179 or accelerated MACRS at all. Business use is ' +
      'proven by a §274(d) contemporaneous mileage log.',
      'The acceleration is versus 5-year MACRS (autos/light trucks are 5-year ' +
      'property): later years have no depreciation left, so taxable income is ' +
      'higher than baseline in years 2–6.',
      'If business use drops to 50% or below during the recovery period, §280F(b)(2) ' +
      'recaptures the excess of accelerated depreciation over ADS straight-line ' +
      'as ordinary income; sale also triggers §1245 recapture of all depreciation.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §179; §179(b)(5)', note: 'Election to expense; the SUV cap ($25,000 indexed, ~$32,000 for 2026 — verify against the annual revenue procedure) for heavy SUVs exempt from §280F caps.' },
      { type: 'IRC', cite: 'IRC §168(k)', note: '100% bonus depreciation, permanent post-OBBBA (P.L. 119-21) for qualified property acquired and placed in service after 1/19/2025 — no SUV cap applies to bonus.' },
      { type: 'IRC', cite: 'IRC §280F(d)(5)', note: '"Passenger automobile" limited to GVW rating of 6,000 lbs or less — heavy vehicles escape the luxury-auto caps.' },
      { type: 'IRC', cite: 'IRC §280F(b); §274(d)', note: 'Listed-property rules: >50% qualified business use required for §179/accelerated MACRS; recapture if use drops; strict contemporaneous substantiation.' },
      { type: 'IRC', cite: 'IRC §1245', note: 'All depreciation taken is recaptured as ordinary income on sale or trade-in to the extent of gain.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32 / TSIQ 2026 tables', note: '2026 §179 limits: $2,560,000 maximum, $4,090,000 phase-out threshold; indexed §179(b)(5) SUV cap.' }
    ],
    requirements: [
      'GVWR above 6,000 lbs, documented (manufacturer\'s label) in the file.',
      'More than 50% qualified business use, supported by a contemporaneous mileage log.',
      'Placed in service (not just ordered or paid for) by year end.',
      '§179 requires sufficient aggregate business taxable income (§179(b)(3)); bonus does not.'
    ],
    risks: [
      'Business use dropping to 50% or below triggers §280F recapture of the excess over straight-line — a real risk when the "work truck" becomes the family vehicle.',
      'The entire deduction is timing: years 2–6 have no depreciation, and §1245 recaptures everything on sale or non-like-kind trade-in.',
      'No mileage log means no defensible business-use percentage — the deduction fails §274(d) in exam.',
      'Buying a vehicle "for the deduction" that the business does not need spends $1 to save ~$0.35–0.45.',
      'Many states decouple from bonus depreciation and/or cap §179 — state benefit may lag federal significantly.'
    ],
    bestFit: [
      'Businesses with a genuine need for a heavy truck, van, or SUV (contractors, real estate, field service).',
      'High-bracket years where a large one-time deduction has maximum rate value.',
      'Owners disciplined about maintaining business-use percentage and the mileage log.'
    ],
    implementation: [
      'Verify GVWR > 6,000 lbs from the manufacturer label before purchase; photograph it.',
      'Confirm >50% business use is realistic and start the mileage log on day one.',
      'Place the vehicle in service by December 31 — delivery and business availability, not the order date.',
      'Elect §179 on Form 4562 up to the SUV cap if applicable; claim bonus on the balance (or rely fully on bonus — model the state impact of the mix).',
      'Calendar the recapture exposure: track business-use percentage annually during the 5-year recovery period.',
      'Plan the disposition — trade-ins are taxable post-TCJA (no §1031 for vehicles), so gain to the extent of depreciation is ordinary income.'
    ]
  },

  client: {
    teaser: 'The right equipment purchase can pay for a big slice of itself in year one',
    headline: 'Write off a work vehicle in the year you buy it',
    plainEnglish: [
      'Normally, when a business buys a vehicle, the tax deduction dribbles out over five or six years — and for regular cars, annual IRS caps stretch it out even longer. But vehicles rated over 6,000 pounds — many full-size trucks, vans, and large SUVs — play by different rules. If the vehicle is used mostly for business, the business share of the entire purchase price can usually be deducted in the first year.',
      'On a $90,000 truck used fully for business, that is a $90,000 deduction this year instead of small pieces spread over many years. In a high tax bracket, that can put $30,000 or more back in your pocket at tax time.',
      'Two honest catches. First, this is an acceleration — you are using up future years\' deductions now, so later years show more taxable income. Second, the "mostly for business" part is a real requirement with real recordkeeping: a mileage log, and business use that stays above half. We help you keep both airtight.'
    ],
    analogy: 'It\'s like getting your whole punch card stamped on the first visit — the reward comes now instead of over years, but the card is used up.',
    benefits: [
      'Deduct the business share of the full purchase price in year one',
      'Works for many trucks, vans, and large SUVs your business already needs',
      'Biggest impact in high-income years',
      'We handle the elections and forms'
    ],
    steps: [
      'We confirm the vehicle qualifies before you sign the paperwork',
      'You take delivery and start using it for business before year end',
      'We set up simple mileage tracking to protect the deduction',
      'We claim the write-off and plan the later years with you'
    ],
    considerations: [
      'This speeds up deductions rather than creating new ones — later years have less to deduct, and selling the vehicle brings some of it back as income. We map that out in advance.',
      'Business use must stay above 50%. If the vehicle becomes mostly personal, part of the deduction gets clawed back.',
      'Only buy it if the business genuinely needs it — a deduction never makes an unnecessary purchase free.'
    ]
  },

  inputs: [
    { key: 'vehicleCost', label: 'Vehicle cost (>6,000 lbs GVWR)', type: 'currency', default: 90000 },
    { key: 'businessUsePct', label: 'Business-use %', type: 'percent', default: 100 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income and >50% use; validated in apply()
  },

  /**
   * Model vs. baseline: baseline is assumed to depreciate the business share
   * straight-line over the 5-year MACRS class (conventions not modeled —
   * immaterial to the comparison, same simplification as cost-segregation.js).
   * Year 0: extra deduction = businessShare − businessShare/5.
   * Years 1–4: income HIGHER than baseline by businessShare/5 (used up).
   * §1245/§280F recapture on sale or use-drop is NOT modeled (flagged in note).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var usePct = (params.businessUsePct || 0) / 100;

    if (usePct <= 0.5) {
      notes.push('Business use must EXCEED 50% (§280F) for §179/bonus on a vehicle — ' +
        'no benefit modeled at ' + Math.round(usePct * 100) + '%.');
      return { profile: p, notes: notes };
    }
    if (!(p.scheduleCNet > 0) && !(p.passthroughK1 > 0)) {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
      return { profile: p, notes: notes };
    }

    var businessShare = (params.vehicleCost || 0) * usePct;
    var slPerYear = businessShare / 5; // 5-year MACRS class, SL baseline
    var delta = 0;

    if (yearIndex === 0) {
      delta = -(businessShare - slPerYear);
      // Tracked for the plan-level "accelerated depreciation accumulating"
      // materiality note (scenario-engine.js) — quantifies future §1245/§280F
      // recapture-on-sale exposure this tool does not model.
      state.acceleratedDepAccumulated = (state.acceleratedDepAccumulated || 0) + (businessShare - slPerYear);
      notes.push(TSIQ.fmt.usd(businessShare) + ' first-year write-off (§179 up to the ' +
        'indexed SUV cap, 100% bonus under §168(k) on the balance) on ' +
        TSIQ.fmt.usd(params.vehicleCost || 0) + ' × ' + Math.round(usePct * 100) + '% business use.');
      notes.push('Timing benefit: years 2–6 show the give-back vs. straight-line. ' +
        '§1245/§280F recapture on sale or if business use drops ≤50% is not modeled.');
    } else if (yearIndex <= 4) {
      delta = slPerYear; // baseline still deducting SL; this scenario used it up
    }

    if (delta !== 0) {
      if (p.scheduleCNet > 0) {
        p.scheduleCNet = p.scheduleCNet + delta;
      } else {
        p.passthroughK1 = p.passthroughK1 + delta;
      }
    }
    return { profile: p, notes: notes };
  }
});
