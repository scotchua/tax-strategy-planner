/* ============================================================================
 * STRATEGY: Vehicle Expense Method (Standard vs. Actual)
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'vehicle-expense-method',
  name: 'Vehicle Expense Method (Standard vs. Actual)',
  category: 'Business Expenses',
  applyOrder: 41,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'A Schedule C proprietor deducts business use of a personal vehicle under ' +
      '§162 using either the standard mileage rate ($0.725/mile for 2026) or ' +
      'actual expenses (fuel, insurance, repairs, depreciation) multiplied by ' +
      'the business-use percentage. The election matters: standard mileage must ' +
      'be chosen in the FIRST year the vehicle is available for business use to ' +
      'preserve the option to alternate later (Rev. Proc. 2019-46); claiming ' +
      'MACRS or §179 in year one locks the vehicle into actual expenses for ' +
      'life. Either way, §274(d) strict substantiation — a contemporaneous ' +
      'mileage log — is non-negotiable. This is the sole-proprietor version; ' +
      'an entity owner should be reimbursed through an accountable plan rather ' +
      'than deducting vehicle costs personally.',
    mechanics: [
      'Standard mileage: business miles × the IRS rate ($0.725/mi for 2026). ' +
      'The rate bundles depreciation, fuel, insurance, and repairs; parking and ' +
      'tolls are deductible on top. Not available if 5+ vehicles are used ' +
      'simultaneously (fleet), or after MACRS/§179/bonus was claimed on the vehicle.',
      'Actual expenses: total operating costs plus depreciation (subject to the ' +
      '§280F luxury-auto caps for passenger autos ≤6,000 lbs GVWR) × the ' +
      'business-use percentage (business miles ÷ total miles).',
      'First-year election rule (Rev. Proc. 2019-46): using standard mileage in ' +
      'year one deems straight-line depreciation and preserves the right to ' +
      'switch to actual (straight-line only) later; starting with actual + ' +
      'accelerated depreciation forecloses standard mileage for that vehicle permanently.',
      'A per-mile depreciation component of the standard rate (set annually by ' +
      'IRS notice; roughly $0.33–$0.35/mi in recent years — verify the 2026 ' +
      'figure) reduces the vehicle\'s basis and can generate gain on sale or ' +
      'trade-in once basis is exhausted.',
      '§274(d) strict substantiation: date, mileage, destination, and business ' +
      'purpose of each trip, recorded at or near the time. Estimates and ' +
      'year-end reconstructions are disallowed on exam — the Cohan rule does ' +
      'not apply to listed property.',
      'Commuting between home and a regular work location is personal and never ' +
      'deductible; a qualifying home office (principal place of business) ' +
      'converts trips from home to client sites into business miles.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Ordinary and necessary business expense — the deduction\'s statutory home.' },
      { type: 'IRC', cite: 'IRC §274(d)', note: 'Strict substantiation for listed property including autos: contemporaneous records of amount, time, place, and business purpose; no deduction without them.' },
      { type: 'Reg', cite: 'Reg. §1.274-5T', note: 'Adequate-records standard — account book/log/app maintained at or near the time of use.' },
      { type: 'Admin', cite: 'Rev. Proc. 2019-46', note: 'Rules for the standard mileage rate: first-year election requirement, straight-line deemed depreciation, fleet (5+ vehicles) exclusion, switching rules.' },
      { type: 'Admin', cite: 'Annual IRS notice (2026 rate)', note: '2026 business standard mileage rate of $0.725/mi and the per-mile depreciation component used to reduce basis.' },
      { type: 'IRC', cite: 'IRC §280F', note: 'Luxury-auto depreciation caps for passenger automobiles and listed-property rules, including the >50% business-use requirement for accelerated methods.' }
    ],
    requirements: [
      'A contemporaneous mileage log (paper, spreadsheet, or tracking app) — every method depends on it.',
      'Business use of a vehicle the taxpayer owns or leases.',
      'Standard mileage: elected in the vehicle\'s first year of business use; fewer than 5 vehicles in simultaneous use.',
      'Actual method: receipts for all operating costs and a defensible business-use percentage.'
    ],
    risks: [
      'No log, no deduction — §274(d) mileage is among the most commonly disallowed items in exam, and courts cannot estimate around it.',
      'Choosing actual + accelerated depreciation in year one permanently forecloses the standard rate for that vehicle; the year-one choice should be modeled, not defaulted.',
      'Standard-rate depreciation silently reduces basis — clients are surprised by gain on trade-in or sale.',
      'Business-use percentage claims near 100% on a household\'s only vehicle draw scrutiny; commuting miscounted as business use is a recurring adjustment.',
      'If business use of a vehicle depreciated under MACRS drops to 50% or below, §280F recaptures the excess over straight-line.'
    ],
    bestFit: [
      'Schedule C proprietors with meaningful business mileage (client sites, deliveries, job sites).',
      'High-mileage, low-cost vehicles (standard rate usually wins); expensive, low-mileage vehicles favor actual.',
      'Clients with a qualifying home office, which converts home-to-client trips into business miles.'
    ],
    implementation: [
      'Start (or clean up) the mileage log NOW — an app with automatic trip detection is the practical fix for §274(d).',
      'In the vehicle\'s first business year, model both methods over the expected holding period before filing — the year-one choice controls future flexibility.',
      'Standard: multiply logged business miles by the 2026 rate ($0.725); add parking and tolls.',
      'Actual: accumulate cost records, compute business-use %, apply §280F caps to depreciation.',
      'Track the cumulative depreciation component against basis each year in the permanent file.',
      'If the client forms an S corp later, move the vehicle deduction into an accountable-plan reimbursement at the standard rate.'
    ]
  },

  client: {
    teaser: 'Two ways to claim the same costs — we pick the one that pays you more',
    headline: 'Make every business mile count on your tax return',
    plainEnglish: [
      'When you use your own car for business — driving to clients, job sites, suppliers — the IRS lets you deduct it two different ways. The simple way pays you a flat 72.5 cents for every business mile in 2026. The detailed way deducts the business share of what the car actually costs you: gas, insurance, repairs, and wear-and-tear.',
      'Which one wins depends on your car and your driving. Lots of miles in an economical car? The flat rate usually pays more. An expensive vehicle driven fewer miles? The actual-cost method often wins. The catch is that the choice you make in the first year can lock you in, so it pays to do the math up front rather than guess.',
      'One thing every option requires: a record of your business trips. A simple phone app does it automatically, and it is the difference between a deduction that survives IRS questions and one that disappears.'
    ],
    analogy: 'Think of it like choosing between a flat per-mile reimbursement and an expense report — same trips, two math methods, and we simply run both and hand you the bigger number.',
    benefits: [
      'Turns driving you already do into a real deduction',
      'Saves both income tax and self-employment tax',
      'We do the method comparison so nothing is left on the table',
      'A phone app makes the recordkeeping nearly effortless'
    ],
    steps: [
      'We set you up with an easy mileage-tracking app',
      'We calculate your deduction both ways and choose the better one',
      'We handle the election and forms with your return',
      'We revisit the math each year as your driving changes'
    ],
    considerations: [
      'The mileage log is not optional — without it, the IRS can deny the whole deduction. We make the tracking painless.',
      'Trips between home and a regular workplace count as commuting, not business. We will map out which of your trips qualify.',
      'The first-year choice of method can lock you in, so we decide it deliberately.'
    ]
  },

  inputs: [
    { key: 'businessMiles', label: 'Substantiated business miles per year', type: 'number', default: 12000 },
    { key: 'method', label: 'Method', type: 'select', default: 'standard',
      options: [{ value: 'standard', label: 'Standard mileage rate' }, { value: 'actual', label: 'Actual expenses × business %' }] },
    { key: 'actualAmount', label: 'Actual-method deduction (if actual)', type: 'currency', default: 10000 }
  ],

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Standard: miles × TABLES_2026.limits.mileageRateBusiness. Actual: advisor-
   * entered amount. Reduces scheduleCNet (income + SE tax savings). If there is
   * only passthroughK1, the deduction is modeled there with a note that the
   * proper mechanism is an accountable-plan reimbursement (same math).
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var amt;
    if (params.method === 'actual') {
      amt = params.actualAmount || 0;
    } else {
      amt = (params.businessMiles || 0) * tb.limits.mileageRateBusiness;
    }

    if (p.scheduleCNet > 0) {
      p.scheduleCNet = p.scheduleCNet - amt;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(amt) + ' vehicle deduction (' +
          (params.method === 'actual'
            ? 'actual expenses'
            : (params.businessMiles || 0).toLocaleString('en-US') + ' mi × $' + tb.limits.mileageRateBusiness + '/mi standard rate') +
          ') reduces Schedule C profit — requires a §274(d) contemporaneous mileage log.');
      }
    } else if (p.passthroughK1 > 0) {
      p.passthroughK1 = p.passthroughK1 - amt;
      notes.push('Entity income detected — vehicle costs of an owner should be reimbursed ' +
        'through an accountable plan (see Accountable Plan strategy); modeled here as an ' +
        'entity-level deduction with the same effect.');
    } else {
      notes.push('Requires business income (Schedule C or entity). No benefit modeled.');
    }
    return { profile: p, notes: notes };
  }
});
