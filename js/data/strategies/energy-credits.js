/* ============================================================================
 * STRATEGY: Business Energy Credits (Solar, EV Charging)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'energy-credits',
  name: 'Business Energy Credits (Solar, EV Charging)',
  category: 'Credits & Incentives',
  applyOrder: 85,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'OBBBA (P.L. 119-21) terminated or accelerated the phase-out of most ' +
      'IRA-era clean energy credits — this strategy is now a DEADLINE play, ' +
      'not an evergreen one. Residential clean energy (§25D) is dead for ' +
      'expenditures after 2025; the clean vehicle credits (§30D, §25E, §45W) ' +
      'ended for vehicles acquired after 9/30/2025; §48E/§45Y wind and solar ' +
      'projects must begin construction by 7/4/2026 or be placed in service ' +
      'by 12/31/2027 (VERIFY exact deadlines — they are the whole ballgame); ' +
      '§30C alternative fuel refueling property ends for property placed in ' +
      'service after 6/30/2026. Where a business project still qualifies, the ' +
      'base §48E investment credit is 6%, rising to 30% with prevailing wage ' +
      'and apprenticeship compliance (or for small projects under the ' +
      'exception), plus domestic-content and energy-community bonuses; basis ' +
      'is reduced by 50% of the credit (§50(c)).',
    mechanics: [
      'TERMINATIONS FIRST: §25D (residential solar/battery for the owner\'s ' +
      'home) — no credit for expenditures after 12/31/2025. Clean vehicle ' +
      'credits (§30D new, §25E used, §45W commercial) — no credit for ' +
      'vehicles acquired after 9/30/2025. §30C EV charging / alternative ' +
      'fuel refueling — property must be placed in service by 6/30/2026 and ' +
      'must sit in an eligible (low-income or non-urban) census tract.',
      '§48E clean electricity investment credit (solar/wind focus of OBBBA ' +
      'cuts): projects must either begin construction by 7/4/2026 (12 months ' +
      'after enactment, with continuity requirements) or be placed in service ' +
      'by 12/31/2027 — VERIFY both dates and the begun-construction standard ' +
      'before advising; Treasury guidance has tightened physical-work and ' +
      '5%-safe-harbor tests.',
      'Credit math where still available: 6% base × 5 multiplier = 30% with ' +
      'prevailing wage and apprenticeship (PWA) compliance; projects under ' +
      '1 MW are exempt from PWA and get 30% outright. Domestic content bonus ' +
      '+10 points; energy community bonus +10 points.',
      'Basis reduction: depreciable basis is reduced by 50% of the energy ' +
      'credit (§50(c)(3)) — the remaining basis is 5-year MACRS and ' +
      'bonus-eligible. Recapture applies if the property is disposed of ' +
      'within 5 years (20%/year vesting).',
      'Foreign entity of concern (FEOC) restrictions added by OBBBA deny ' +
      'credits for projects with prohibited foreign involvement or material ' +
      'assistance — screen the supply chain for 2026+ construction starts.',
      'Credit monetization: §6418 transferability (sale of credits for cash) ' +
      'and §6417 elective pay for exempt entities survive for credits that ' +
      'still exist — relevant for clients with insufficient tax appetite.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §48E / §45Y', note: 'Clean electricity investment/production credits. OBBBA: wind and solar facilities must begin construction within 12 months of enactment (by 7/4/2026) or be placed in service by 12/31/2027 — VERIFY exact dates and begun-construction guidance before committing a client.' },
      { type: 'IRC', cite: 'IRC §25D', note: 'Residential clean energy credit TERMINATED — no credit for expenditures made after 12/31/2025 (OBBBA).' },
      { type: 'IRC', cite: 'IRC §30D / §25E / §45W', note: 'Clean vehicle credits TERMINATED for vehicles acquired after 9/30/2025 (OBBBA).' },
      { type: 'IRC', cite: 'IRC §30C', note: 'Alternative fuel vehicle refueling property credit (EV charging): 6%/30% business credit up to $100,000 per item, eligible-census-tract requirement; TERMINATED for property placed in service after 6/30/2026 (OBBBA).' },
      { type: 'IRC', cite: 'IRC §50(c)', note: 'Basis reduction equal to 50% of the energy credit; §50(a) recapture on early disposition (5-year vesting).' },
      { type: 'IRC', cite: 'IRC §6417 / §6418', note: 'Elective pay (exempt entities) and credit transferability for surviving credits.' },
      { type: 'Admin', cite: 'OBBBA (P.L. 119-21), July 2025', note: 'The termination/phase-out framework and FEOC (prohibited foreign entity) restrictions.' },
      { type: 'Admin', cite: 'Form 3468', note: 'Investment credit computation (energy property), carried to Form 3800.' }
    ],
    requirements: [
      'A project that still fits inside the surviving deadlines — verified against current statute and Treasury begun-construction guidance, not marketing materials.',
      'For 30% on 1 MW+ projects: prevailing wage and apprenticeship compliance documented from the start of construction.',
      'For §30C: the charging property must be in an eligible census tract and placed in service by the deadline.',
      'Ownership with tax appetite (nonrefundable credit) or a §6418 transfer plan; basis-reduction and recapture tracking.',
      'FEOC supply-chain screening for projects starting construction in 2026 or later.'
    ],
    risks: [
      'DEADLINE RISK DOMINATES: a project that slips past the begun-construction or placed-in-service date gets ZERO credit. Interconnection queues, permitting, and equipment lead times are the real constraint — build slack into the schedule.',
      'Begun-construction standards (physical work of a significant nature / 5% cost safe harbor, with continuity) have been tightened by post-OBBBA guidance — do not rely on a token deposit to lock the date.',
      'PWA foot-faults on 1 MW+ projects drop the credit from 30% to 6% — a five-fold haircut; use contractors with documented compliance programs.',
      'Recapture if the property is sold or ceases to qualify within 5 years; basis reduction (50% of credit) trims the depreciation benefit clients expect.',
      'FEOC rules can disqualify otherwise-eligible projects based on panel/battery sourcing.',
      'Vendor hype: expect aggressive "act now" sales pitches — verify every deadline claim against the statute before the client signs.'
    ],
    bestFit: [
      'Businesses already planning rooftop solar or on-site generation that can realistically start construction or be in service inside the windows.',
      'Fleet operators needing charging infrastructure in eligible census tracts before the §30C cutoff.',
      'Clients with steady tax liability to absorb a nonrefundable credit (or willing to sell it under §6418).'
    ],
    implementation: [
      'Date-check the project first: can it genuinely begin construction by the §48E deadline (or be placed in service by end-2027)? If not, stop — do not model a credit.',
      'Lock begun-construction status properly: significant physical work or the 5% cost safe harbor, with a continuity plan, documented contemporaneously.',
      'For 1 MW+ projects, put PWA compliance in the EPC contract with audit rights; for <1 MW, document the exemption.',
      'Screen equipment sourcing against FEOC restrictions for 2026+ starts.',
      'Compute the credit on Form 3468; reduce depreciable basis by 50% of the credit; model 5-year MACRS/bonus on the remainder.',
      'Calendar the 5-year recapture period and the placed-in-service deadline with margin for slippage.'
    ]
  },

  client: {
    teaser: 'A closing window to have the government fund a big piece of your next upgrade',
    headline: 'The energy credit window is closing — move or skip it',
    plainEnglish: [
      'For years, the government paid businesses back up to 30% of the cost of solar panels, EV chargers, and similar energy projects. In 2025, Congress decided to wind most of that down. Some credits are already gone; the ones that remain now come with hard deadlines.',
      'If you were already thinking about solar for your building or chargers for your fleet, this changes the math from "someday" to "now or never." A project that starts construction in time can still capture the full credit; the same project started a few months late gets nothing.',
      'Our job is to give you the honest version: we verify the actual deadlines, whether your project can realistically meet them, and what the credit is worth after all the fine print — before you sign anything a salesperson put in front of you.'
    ],
    analogy: 'It\'s like a store closing sale: the discount is real, but only on what\'s still on the shelf — and the doors lock on a set date whether you\'re ready or not.',
    benefits: [
      'Up to 30% of a qualifying project\'s cost back as a tax credit',
      'Plus faster depreciation write-offs on most of the remaining cost',
      'Lower operating costs (energy bills) on top of the tax benefits',
      'Clear go/no-go answer before you commit money'
    ],
    steps: [
      'We check your project against the current deadlines — the rules changed in 2025',
      'We calculate the real after-tax cost, including the fine print',
      'We make sure the construction timeline locks in your eligibility',
      'We claim the credit and set up the depreciation correctly'
    ],
    considerations: [
      'The deadlines are absolute — a project that slips past them earns no credit, so we only count it when the timeline is realistic.',
      'These credits shrink your depreciation somewhat and can be partly clawed back if you sell the equipment within five years — we factor both in.',
      'Be wary of high-pressure sales pitches around these deadlines; we verify every claim against the law itself.'
    ]
  },

  inputs: [
    { key: 'creditAmount', label: 'Energy credit (verified project, year 1)', type: 'currency', default: 30000 }
  ],

  appliesTo: function (profile) {
    return true; // deadline eligibility certified by the advisor, not return data
  },

  /**
   * Adds the advisor-verified energy credit to otherCredits in YEAR 1 ONLY
   * (investment credits are placed-in-service-year events, unlike the other
   * credits in this category). Engine applies it nonrefundably after the
   * child tax credit. The §50(c) basis reduction and the depreciation on the
   * energy property are not modeled here — handle depreciation via the
   * bonus-depreciation strategy or business income inputs.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex === 0) {
      var amt = Math.max(0, params.creditAmount || 0);
      p.otherCredits = (p.otherCredits || 0) + amt;
      notes.push(TSIQ.fmt.usd(amt) + ' energy investment credit applied in year 1 only ' +
        '(placed-in-service year; nonrefundable).');
      notes.push('VERIFY DEADLINES before relying on this: §48E wind/solar requires ' +
        'construction begun by 7/4/2026 or placed in service by 12/31/2027; §30C ends ' +
        '6/30/2026; §25D and EV credits are already terminated. Basis reduction (50% of ' +
        'credit, §50(c)) and equipment depreciation are not modeled here.');
    }
    return { profile: p, notes: notes };
  }
});
