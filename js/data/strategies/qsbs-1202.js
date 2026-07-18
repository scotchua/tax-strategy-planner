/* ============================================================================
 * STRATEGY: QSBS §1202 Exclusion
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'qsbs-1202',
  name: 'QSBS §1202 Exclusion',
  category: 'Income Timing & Character',
  applyOrder: 7,
  modeled: true,

  advisor: {
    summary:
      '§1202 excludes gain on qualified small business stock — C-corporation ' +
      'stock acquired at original issuance while aggregate gross assets are under ' +
      'the ceiling, in an active qualified business. OBBBA (P.L. 119-21) split ' +
      'the regime in two: stock acquired AFTER 7/4/2025 gets tiered exclusion ' +
      '(50% at a 3-year hold, 75% at 4 years, 100% at 5+), a $15M (indexed) or ' +
      '10× basis per-issuer cap, and a $75M gross-asset ceiling; stock acquired ' +
      'BEFORE 7/5/2025 keeps the old rules — a 5-year cliff (no partial tiers), ' +
      '$10M/10× cap, $50M asset ceiling, with 100% exclusion for post-9/27/2010 ' +
      'acquisitions (earlier vintages: 50–75% with the §57(a)(7) AMT preference). ' +
      'For partial-exclusion tiers, 7% of the excluded gain is an AMT preference ' +
      'and the taxable portion is §1202(b) 28%-rate gain. The exclusion is per ' +
      'issuer and per taxpayer — gifting shares (§1202(h) tacks holding period ' +
      'and treats donees as original holders) can multiply caps across family ' +
      'members and non-grantor trusts, an aggressive but recognized play.',
    mechanics: [
      'Qualification at issuance: domestic C corp; aggregate gross assets ≤ ' +
      '$75M (post-OBBBA stock; $50M for pre-7/5/2025 stock) at and immediately ' +
      'after issuance; stock acquired at ORIGINAL issuance for money, property, ' +
      'or services (§1202(c)) — secondary purchases never qualify.',
      'Active business requirement: ≥80% of assets used in a qualified trade ' +
      'or business during substantially all the holding period (§1202(e)); ' +
      'excluded fields include health, law, accounting, consulting, financial ' +
      'services, hospitality, and farming (§1202(e)(3)).',
      'Post-OBBBA tiers (stock acquired after 7/4/2025): 50% exclusion at 3 ' +
      'years, 75% at 4, 100% at 5+. Pre-OBBBA stock: nothing before 5 years, ' +
      'then 100% (acquired after 9/27/2010), 75% (after 2/17/2009), or 50% ' +
      '(§1202(a)(1), earlier vintages).',
      'Per-issuer cap: greater of $15M indexed (post-OBBBA; $10M pre-OBBBA) or ' +
      '10× the aggregate adjusted basis of stock sold that year — the 10× arm ' +
      'rewards high-basis contributions (e.g., appreciated IP or asset ' +
      'contributions at incorporation).',
      'Partial tiers (50%/75%): the excluded portion carries a 7% AMT ' +
      'preference (§57(a)(7)); the included portion is taxed as 28%-rate gain ' +
      '(§1(h)(4)) — the effective saving is smaller than the headline tier.',
      'Cap multiplication: each taxpayer gets a separate per-issuer cap; ' +
      'completed gifts to children or non-grantor trusts before sale multiply ' +
      'the caps (§1202(h) preserves qualification and tacks the holding ' +
      'period). Flag as advanced planning — respect step-transaction risk and ' +
      'genuine donative intent.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1202 (as amended by OBBBA, P.L. 119-21)', note: 'Tiered 50%/75%/100% exclusion at 3/4/5-year holds, $15M (indexed)/10× cap, $75M asset ceiling — for stock acquired after 7/4/2025. Pre-7/5/2025 stock keeps prior law.' },
      { type: 'IRC', cite: 'IRC §1202(a)(4)', note: '100% exclusion for pre-OBBBA stock acquired after 9/27/2010 and held 5+ years (no AMT preference on the 100% tier).' },
      { type: 'IRC', cite: 'IRC §1202(b)', note: 'Per-issuer limitation — greater of the dollar cap or 10× aggregate adjusted basis of the stock disposed of during the year.' },
      { type: 'IRC', cite: 'IRC §1202(c), (d), (e)', note: 'Original-issuance requirement; aggregate gross asset ceiling at issuance; 80% active qualified business requirement and excluded service fields.' },
      { type: 'IRC', cite: 'IRC §57(a)(7)', note: '7% of the excluded gain is an AMT preference for partial (50%/75%) exclusion tiers.' },
      { type: 'IRC', cite: 'IRC §1202(h)', note: 'Transfers by gift or at death: transferee steps into the transferor\'s shoes — holding period tacks and QSBS status carries over (the basis of cap-multiplication planning).' },
      { type: 'IRC', cite: 'IRC §1045', note: 'Rollover of QSBS gain into replacement QSBS within 60 days when the holding period is short of the exclusion tier.' },
      { type: 'IRC', cite: 'IRC §1(h)(4)', note: 'The non-excluded portion of §1202 gain on partial tiers is 28%-rate gain, not regular LTCG.' }
    ],
    requirements: [
      'Original-issuance C-corp stock with contemporaneous documentation: issuance records, a gross-assets balance sheet at issuance, and capitalization history.',
      'The corporation meets the active-business and non-excluded-field tests for substantially all of the holding period.',
      'Holding period met at sale: 3/4/5 years (post-OBBBA stock) or a strict 5 years (pre-OBBBA stock).',
      'Redemption traps avoided: significant redemptions by the issuer around issuance can disqualify the stock (§1202(c)(3)).',
      'Gain, era, and per-issuer cap computed per taxpayer, per issuer, per year.'
    ],
    risks: [
      'Qualification is fact-intensive and tested YEARS before the sale — missing issuance-date evidence of the asset test is the most common failure; build the file at issuance, not at exit.',
      'The excluded-field list (§1202(e)(3)) is broad and litigated at the margins — consulting-adjacent businesses need a hard look.',
      'Partial tiers are not free: 7% AMT preference plus 28%-rate gain on the included portion.',
      'Cap-stacking via gifts/trusts draws step-transaction and economic-substance scrutiny — complete gifts well before a sale is in sight, with real donative intent.',
      'State nonconformity: several states (notably CA) do not conform to §1202 — the state tax may be the whole bill.',
      'Two regimes now coexist: mixing up a client\'s pre- vs. post-7/5/2025 lots misstates both the tier and the cap.'
    ],
    bestFit: [
      'Founders and early employees of C-corp startups acquired at original issuance under the asset ceiling.',
      'Investors choosing entity form now: the tiered 3-year exclusion materially improves the C-corp calculus for high-growth ventures.',
      'Exits under the per-issuer cap, or families willing to do genuine advance gifting to multiply caps.'
    ],
    implementation: [
      'At issuance: obtain the gross-assets balance sheet, board records, and a QSBS representation letter; calendar the 3/4/5-year tier dates by lot.',
      'Annually: monitor the 80% active-business test and any redemptions.',
      'Before a contemplated exit: verify each lot\'s era (acquired before vs. after 7/5/2025), tier, and per-issuer cap; consider §1045 rollover if the hold is short.',
      'For cap multiplication: complete gifts to family/non-grantor trusts well before any sale process starts; file gift tax returns.',
      'At sale: report the exclusion on Form 8949/Schedule D with the §1202 adjustment code; compute the 7% AMT preference for partial tiers.'
    ]
  },

  client: {
    teaser: 'Can make millions of dollars of profit on one investment completely tax-free',
    headline: 'The startup stock break: up to 100% tax-free gain',
    plainEnglish: [
      'The tax law has a powerful reward for people who invest early in small American companies: if you got your shares directly from the company when it was still small, and you hold them long enough, an enormous amount of your profit when you sell can be completely free of federal tax.',
      'For newer shares the break phases in over time — hold three years and half the profit is tax-free, four years gets you three-quarters, and five years makes it fully tax-free, up to a cap of $15 million or more per company. Older shares follow an earlier version of the rule that requires the full five years.',
      'The catch is paperwork and patience: the company had to qualify when you got the shares, and proving it later can be hard. We build that proof file early, track your holding-period dates, and time the sale so you land on the best tier.'
    ],
    analogy: 'It\'s like a savings bond that matures in stages — cash it too early and you leave most of the prize on the table; wait for full maturity and the entire gain can be yours tax-free.',
    benefits: [
      'Up to 100% of the profit on qualifying shares free of federal tax',
      'Caps of $15 million or more per company — this is a life-changing exclusion, not a rounding error',
      'Sale timing planned around the 3-, 4-, and 5-year milestones',
      'Advanced options can multiply the cap across family members'
    ],
    steps: [
      'We confirm whether your shares qualify and assemble the proof file',
      'We calendar your holding-period milestones for every block of shares',
      'Before any sale, we model each timing option so you see the tiers in dollars',
      'We handle the specialized tax reporting when you sell'
    ],
    considerations: [
      'The rules are strict about how and when you got the shares — shares bought from another investor never qualify, and the proof must reach back to the day the company issued them.',
      'Some states don\'t honor this break, so state tax may still apply — we include that in the projection.',
      'Selling before a milestone forfeits the better tier, so patience is a real part of the strategy.'
    ]
  },

  inputs: [
    { key: 'excludedGain', label: 'QSBS gain eligible for exclusion', type: 'currency', default: 2000000 },
    { key: 'acquisitionEra', label: 'Stock acquisition era', type: 'select', default: 'pre',
      options: [{ value: 'pre', label: 'Acquired before 7/5/2025 (old rules)' }, { value: 'post', label: 'Acquired after 7/4/2025 (OBBBA tiers)' }] },
    { key: 'holdYears', label: 'Years held at sale', type: 'number', default: 5 },
    { key: 'stateConforms', label: 'Does the client\'s state conform to §1202?', type: 'select', default: 'conforms',
      options: [{ value: 'conforms', label: 'Yes — state also excludes the gain' },
        { value: 'nonconforms', label: 'No — state taxes the excluded gain (e.g. CA, PA, AL, MS)' }] }
  ],

  appliesTo: function (profile) {
    return true; // validated in apply(): baseline LTCG must include the sale gain
  },

  /**
   * Year-1 sale model. ADVISOR SETUP: include the full QSBS gain in the
   * baseline's LTCG input; this strategy removes the excluded portion.
   * Post-OBBBA tiers come from TSIQ.TABLES_2026.limits.qsbs.exclusionTiers
   * (3yr→50%, 4yr→75%, 5+yr→100%). Pre-OBBBA: 100% only at 5+ years
   * (assumes post-9/27/2010 acquisition — earlier vintages need manual
   * modeling), 0% before 5 years.
   * Not modeled: the 7% AMT preference on partial tiers (engine has no AMT),
   * the 28%-rate character of the included portion, per-issuer caps, and
   * state nonconformity — all flagged in notes where relevant.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (yearIndex !== 0) return { profile: p, notes: notes };

    var tiers = TSIQ.TABLES_2026.limits.qsbs.exclusionTiers;
    var hold = params.holdYears || 0;
    var pct = 0;

    if (params.acquisitionEra === 'post') {
      if (hold >= 5) pct = tiers.yr5plus;
      else if (hold >= 4) pct = tiers.yr4;
      else if (hold >= 3) pct = tiers.yr3;
      if (pct === 0) {
        notes.push('Post-OBBBA stock held under 3 years — no §1202 exclusion yet. ' +
          'First tier (50%) unlocks at 3 years; consider a §1045 rollover if selling now.');
        return { profile: p, notes: notes };
      }
    } else {
      if (hold >= 5) {
        pct = 1.00;
      } else {
        notes.push('Pre-OBBBA stock held under 5 years — §1202 is a 5-year cliff for this era; ' +
          'no partial tiers apply. No exclusion modeled.');
        return { profile: p, notes: notes };
      }
    }

    var eligible = (params.excludedGain || 0) * pct;
    var reduction = Math.min(eligible, Math.max(p.ltcg || 0, 0));
    if (reduction < eligible) {
      notes.push('SETUP: baseline LTCG is less than the computed exclusion — include the full ' +
        'QSBS sale gain in the baseline\'s LTCG input so this strategy can remove the excluded portion.');
    }
    p.ltcg = (p.ltcg || 0) - reduction;
    notes.push(TSIQ.fmt.usd(reduction) + ' of QSBS gain excluded (§1202, ' +
      Math.round(pct * 100) + '% tier at a ' + hold + '-year hold). ' +
      'Verify the per-issuer cap (' +
      (params.acquisitionEra === 'post' ? '$15M indexed' : '$10M') + ' or 10x basis) is not exceeded.');
    if (pct < 1) {
      notes.push('Partial tier: 7% of the excluded gain is an AMT preference (§57(a)(7)) and the ' +
        'included portion is 28%-rate gain — neither is modeled by the engine (no AMT); the shown benefit is slightly overstated.');
    }
    if (params.stateConforms === 'nonconforms') {
      p.stateIncomeAddBack = (p.stateIncomeAddBack || 0) + reduction;
      notes.push('State does not conform to §1202 (e.g. CA, PA, AL, MS) — ' + TSIQ.fmt.usd(reduction) +
        ' of the excluded gain is added back for STATE tax purposes only, at the flat state rate ' +
        'entered. Federal exclusion is unaffected.');
    } else {
      notes.push('Modeled assuming the client\'s state conforms to §1202 and also excludes the gain — ' +
        'set "Does the client\'s state conform" to No for nonconforming states (e.g. CA, PA, AL, MS; ' +
        'NJ conforms starting with tax years beginning 1/1/2026).');
    }
    return { profile: p, notes: notes };
  }
});
