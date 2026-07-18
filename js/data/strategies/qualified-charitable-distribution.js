/* ============================================================================
 * STRATEGY: Qualified Charitable Distribution (QCD)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'qualified-charitable-distribution',
  name: 'Qualified Charitable Distribution (QCD)',
  category: 'Business Expenses',
  applyOrder: 27,
  modeled: true,

  advisor: {
    summary:
      'A direct transfer from a traditional IRA to a qualifying charity, ' +
      'available once the IRA owner reaches age 70½ (§408(d)(8)) — a full ' +
      'two-plus years before RMDs themselves begin at 73 (75 for those born ' +
      '1960 or later, SECURE 2.0 §107). Up to $111,000 per person for 2026 ' +
      '(indexed, Rev. Proc. 2025-32) is excluded from gross income entirely, ' +
      'rather than claimed as an itemized deduction — a materially better ' +
      'result post-OBBBA than writing a check from taxable savings, because ' +
      'a QCD never touches AGI in the first place: it sidesteps the new ' +
      '§170(p) 0.5%-of-AGI floor on itemized cash gifts, the OBBBA senior-' +
      'deduction MAGI phase-out, the SALT-cap phase-down, the NIIT MAGI ' +
      'threshold, and (once the client is Medicare-age) IRMAA tier crossings ' +
      '— all of which key off AGI/MAGI, none of which an itemized deduction ' +
      'can help with. If the client has an RMD due, a QCD also counts toward ' +
      'satisfying it dollar-for-dollar.',
    mechanics: [
      'Must be a DIRECT trustee-to-trustee transfer from a traditional IRA ' +
      '(or an inactive SEP/SIMPLE) to an eligible §170(c) charity — a check ' +
      'made payable to the charity and simply delivered by the owner still ' +
      'counts; a distribution paid to the owner first, even if regifted, ' +
      'does not.',
      'Excluded charities: donor-advised funds, private foundations, and ' +
      'supporting organizations do NOT qualify as QCD recipients — a common ' +
      'trap for advisors used to DAF-bunching.',
      'Reported on Form 1099-R as an ordinary distribution; the taxpayer ' +
      'excludes it on Form 1040 line 4b with the notation "QCD" — it is an ' +
      'income EXCLUSION, not an itemized deduction, so it helps even a ' +
      'client taking the standard deduction.',
      'Counts toward the current year\'s RMD once RMDs are required (age 73, ' +
      'or 75 for those born 1960+, SECURE 2.0 §107) — order QCDs before other ' +
      'withdrawals in the RMD sequence to get the offset.',
      'A one-time-only election under §408(d)(8)(F) (SECURE 2.0 §307) allows ' +
      'up to $55,000 (2026, indexed from a $50,000 2023 base) of QCD capacity ' +
      'to instead fund a charitable gift annuity or CRAT/CRUT — a niche move ' +
      'for a client who wants income back.',
      'Both spouses with their own IRAs each get a separate $111,000 annual ' +
      'limit — a couple can direct up to $222,000 in a single year.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §408(d)(8)', note: 'QCD exclusion; age 70½ eligibility (§408(d)(8)(B)(ii)); direct-transfer requirement; excludes DAFs/private foundations/supporting orgs as recipients.' },
      { type: 'IRC', cite: 'IRC §408(d)(8)(F) (SECURE 2.0 §307)', note: 'One-time election to fund a split-interest entity (CGA/CRAT/CRUT) from QCD capacity — $55,000 for 2026.' },
      { type: 'Admin', cite: 'Rev. Proc. 2025-32', note: '2026 QCD annual limit: $111,000 per person.' },
      { type: 'IRC', cite: 'IRC §401(a)(9); SECURE 2.0 §107', note: 'RMD age 73 (75 for those born 1960 or later) — the QCD eligibility age (70½) is materially earlier.' },
      { type: 'IRC', cite: 'IRC §170(p) (OBBBA, P.L. 119-21 §70425)', note: 'New 0.5%-of-AGI floor on itemized cash charitable contributions, effective tax years beginning after 12/31/2025 — a QCD is not an itemized deduction and is unaffected by this floor.' },
      { type: 'IRC', cite: 'IRC §1411', note: 'NIIT MAGI threshold — a QCD lowers AGI/MAGI directly, unlike an itemized deduction claimed after AGI is computed.' }
    ],
    requirements: [
      'IRA owner (or the specific spouse whose IRA is used) is at least age 70½ on the date of the distribution.',
      'Direct trustee-to-trustee transfer, or a check made payable to the charity — never routed through the owner\'s hands as cash.',
      'Recipient is an eligible §170(c) public charity — NOT a donor-advised fund, private foundation, or supporting organization.',
      'Distribution comes from a traditional IRA (Roth IRA QCDs are technically allowed but rarely useful since qualified Roth withdrawals are already tax-free).'
    ],
    risks: [
      'Missing the direct-transfer requirement (owner receives the funds first) converts the whole distribution to ordinary taxable income with no fix after the fact.',
      'Using a DAF, private foundation, or supporting organization as the recipient disqualifies the QCD entirely.',
      'A QCD claimed from an IRA that also received a deductible contribution after age 70½ has an anti-abuse offset (§408(d)(8)(A) flush language) — coordinate with any post-70½ traditional IRA contributions.',
      'Overstating the exclusion beyond the $111,000 (2026) per-person annual cap, or beyond the actual IRA distribution taken.',
      'The client must actually itemize-or-not analysis correctly: a QCD helps even standard-deduction filers, which is exactly the case advisors used to itemized-only thinking can miss.'
    ],
    bestFit: [
      'IRA owners 70½+ who give to charity annually regardless — this is close to a free lunch for that client.',
      'Clients near or over the OBBBA senior-deduction MAGI phase-out, the SALT-cap phase-down threshold, an IRMAA tier, or the NIIT threshold, where lowering AGI (not just claiming a deduction) has real additional value.',
      'RMD-age clients who want the RMD satisfied without the income ever landing on the return.'
    ],
    implementation: [
      'Confirm the IRA owner\'s exact age (70½, not just "65+") and which spouse\'s IRA to use.',
      'Contact the IRA custodian to process a direct transfer to the named charity — many custodians have a QCD-specific check-writing feature.',
      'Verify the recipient is not a DAF, private foundation, or supporting organization before initiating the transfer.',
      'Sequence QCDs BEFORE other RMD withdrawals in the year so the QCD amount counts toward satisfying the RMD.',
      'Confirm the custodian\'s 1099-R and code the Form 1040 line 4b exclusion with the "QCD" notation at filing.',
      'Track cumulative QCDs against the $111,000 (2026) annual per-person cap across all of the owner\'s IRAs.'
    ]
  },

  client: {
    teaser: 'A way to give from your retirement account that keeps the gift off your tax return entirely',
    headline: 'Give directly from your IRA — and keep it off your return completely',
    plainEnglish: [
      'If you are 70½ or older and have a traditional IRA, there is a special way to give to charity that beats writing a check from your bank account: send the money straight from your IRA to the charity. Because it never passes through your hands, it never counts as income on your tax return at all — not even as a deduction you have to claim, just money that was never taxed to begin with.',
      'That matters even if you already take the standard deduction and get no benefit from itemizing charitable gifts. It also helps keep your income lower for several other things that key off your total income — deductions and credits that phase out as your income rises, and even Medicare premium surcharges. A gift from your checkbook cannot do any of that; this can.',
      'If you are old enough that the IRS requires you to take money out of your IRA each year, a gift made this way can count toward that required amount too — so the charity gets the gift, and the withdrawal you had to take anyway does double duty.'
    ],
    analogy: 'It\'s like paying for something at wholesale instead of retail — the same gift, delivered a smarter way, quietly removes a cost that a regular check would have carried.',
    benefits: [
      'Up to $111,000 per person (2026) sent to charity completely tax-free',
      'Helps even if you take the standard deduction — no itemizing required',
      'Can satisfy your IRA\'s required withdrawal for the year',
      'Keeps your income lower for other tax breaks and Medicare costs that depend on it'
    ],
    steps: [
      'We confirm you qualify by age and identify which IRA to use',
      'We contact your IRA company to send the gift directly to the charity',
      'We make sure the charity you have in mind is eligible for this treatment',
      'We report it correctly on your return so the exclusion is claimed properly'
    ],
    considerations: [
      'The money has to go directly from the IRA to the charity — if it touches your hands first, even briefly, the tax benefit is lost.',
      'Not every organization qualifies — donor-advised funds and certain foundations are excluded, so we confirm the recipient first.',
      'There is an annual dollar limit per person, so we track it if you plan to give this way for multiple years.'
    ]
  },

  inputs: [
    { key: 'amount', label: 'Amount transferred directly to charity', type: 'currency', default: 20000 }
  ],

  suggest: function (p) {
    if (!(p.age65Count > 0 && (p.otherIncome || 0) >= 20000)) return null;
    return { reason: 'Filer(s) flagged 65+ with ' + TSIQ.fmt.usd(p.otherIncome) +
      ' of IRA/pension/other income — confirm actual age (QCDs require 70½) and check for charitable giving that could route through the IRA instead of the checkbook.' };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs age65Count and otherIncome
  },

  /**
   * Reduces otherIncome (where the PDF importer and Section 1 fold IRA/
   * pension distributions) dollar-for-dollar, capped at the 2026 §408(d)(8)
   * annual limit and at the otherIncome actually present (a QCD can't
   * exclude more than the IRA distribution taken). Gated on age65Count > 0
   * as a proxy for the true 70½ eligibility test, which this tool's age
   * field doesn't capture precisely — flagged in the note.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (!(p.age65Count > 0)) {
      if (yearIndex === 0) {
        notes.push('No filer/spouse flagged 65+ — QCDs require the IRA owner to be at least age ' +
          '70½ (§408(d)(8)(B)(ii)), a slightly older threshold than this tool\'s 65+ flag. ' +
          'Confirm the actual age before relying on this. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }
    if (!(p.otherIncome > 0)) {
      if (yearIndex === 0) {
        notes.push('No IRA/pension/other income entered — a QCD excludes an amount up to the ' +
          'actual IRA distribution taken; nothing to model without it. No benefit modeled.');
      }
      return { profile: p, notes: notes };
    }
    var tb = TSIQ.TABLES_2026;
    var cap = tb.limits.qcd.annualLimit;
    var requested = params.amount || 0;
    var qcd = Math.min(requested, cap, p.otherIncome);
    p.otherIncome = p.otherIncome - qcd;
    if (yearIndex === 0) {
      if (requested > cap) {
        notes.push('Capped at the 2026 QCD annual limit of ' + TSIQ.fmt.usd(cap) + ' per person ' +
          '(each spouse with their own IRA gets a separate limit).');
      }
      if (qcd < requested && requested <= cap) {
        notes.push('Capped at ' + TSIQ.fmt.usd(p.otherIncome + qcd) + ' of entered IRA/other income ' +
          '— a QCD cannot exclude more than the IRA distribution actually taken.');
      }
      notes.push(TSIQ.fmt.usd(qcd) + ' excluded from income via a direct IRA-to-charity transfer ' +
        '(§408(d)(8)) — never touches AGI, so it also helps a standard-deduction filer and avoids ' +
        'the new §170(p) 0.5%-of-AGI floor on itemized cash gifts. Must be a direct custodian-to-' +
        'charity transfer to a non-DAF, non-private-foundation recipient.');
    }
    return { profile: p, notes: notes };
  }
});
