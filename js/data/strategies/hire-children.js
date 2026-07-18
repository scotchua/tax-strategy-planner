/* ============================================================================
 * STRATEGY: Hiring Children Under 18 (Sole Prop / Parent Partnership)
 * One source object → advisor view, client PDF, client slideshow.
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 'hire-children',
  name: 'Hiring Children Under 18',
  category: 'Payroll & Family',
  applyOrder: 31,
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Wages paid to the owner\'s child under age 18 by a parent\'s sole ' +
      'proprietorship (or a partnership in which each partner is a parent of ' +
      'the child) are exempt from FICA under §3121(b)(3)(A), and exempt from ' +
      'FUTA until age 21 under §3306(c)(5). The wages are deductible under ' +
      '§162 against Schedule C profit — which simultaneously removes the same ' +
      'dollars from the parent\'s SE tax base — while the child reports the ' +
      'wages as earned income sheltered by their own standard deduction ' +
      '($16,100 in 2026 under §63(c)(5)(B), since the standard deduction for a ' +
      'dependent extends to earned income plus a small add-on). Wages up to ' +
      'that amount produce zero income tax to the child and zero payroll tax ' +
      'on either side. The entire structure depends on the work being bona ' +
      'fide, age-appropriate, documented, and paid at market rate.',
    mechanics: [
      'Deduction side: wages are an ordinary and necessary §162 expense of ' +
      'the Schedule C business, reducing both income tax and — because they ' +
      'reduce net SE earnings — the parent\'s §1401 SE tax. That double ' +
      'effect is the core of the arithmetic.',
      'Payroll tax side: §3121(b)(3)(A) excludes from FICA "employment" the ' +
      'services of a child under 18 in the employ of a parent (sole prop, or ' +
      'a partnership where every partner is a parent of the child). ' +
      '§3306(c)(5) gives the parallel FUTA exemption through age 20.',
      'Child\'s side: §73(a) taxes compensation for a child\'s services to ' +
      'the child, not the parent. Because wages are EARNED income, the ' +
      'dependent standard deduction under §63(c)(5)(B) covers them up to the ' +
      'full $16,100 (2026) — the child owes no income tax at or below that.',
      'The kiddie tax is irrelevant here: §1(g) applies only to net UNEARNED ' +
      'income; wages are never kiddie-taxed.',
      'The entity form is the gate: an S corporation (or any corporation, or ' +
      'a partnership with a non-parent partner) does NOT qualify for the ' +
      'FICA exemption — the corporation is the employer, not the parent. A ' +
      'Family Management Company structure can restore the exemption for ' +
      'S-corp owners (see that strategy).',
      'The wages fund follow-on planning: the child now has compensation ' +
      'supporting a Roth IRA contribution and, if the plan permits, 401(k) ' +
      'deferrals (see the companion advisory strategies).'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §3121(b)(3)(A)', note: 'FICA exemption: services of a child under 18 employed by a parent (sole proprietorship, or partnership in which each partner is a parent of the child).' },
      { type: 'IRC', cite: 'IRC §3306(c)(5)', note: 'FUTA exemption for a child under 21 employed by a parent.' },
      { type: 'IRC', cite: 'IRC §162(a)', note: 'Deductibility of wages — must be reasonable in amount for services actually rendered.' },
      { type: 'IRC', cite: 'IRC §73(a)', note: 'Amounts received for a child\'s services are gross income of the child, not the parent, regardless of who receives payment.' },
      { type: 'IRC', cite: 'IRC §63(c)(5)(B)', note: 'Dependent\'s standard deduction extends to earned income plus an inflation-adjusted add-on — wages up to the full standard deduction ($16,100 in 2026) are sheltered.' },
      { type: 'Case', cite: 'Eller v. Comm\'r, 77 T.C. 934 (1981)', note: 'Wages paid to the taxpayers\' minor children were deductible to the extent reasonable for services actually performed — the court allowed the structure while trimming amounts not supported by the work.' }
    ],
    requirements: [
      'Employer must be a parent\'s sole proprietorship or a partnership owned solely by the child\'s parents — not a corporation.',
      'Real, age-appropriate work the business would otherwise pay someone for (filing, cleaning, social media content, modeling for ads, deliveries).',
      'Contemporaneous timesheets and a written job description; pay at a defensible market rate for the task.',
      'Actual payment into an account in the child\'s name, on a payroll cadence — W-2 issued, Form 941/944 filed (wages reported, FICA-exempt), state child-labor rules observed.'
    ],
    risks: [
      'Wages disproportionate to the work performed are the classic exam adjustment — Eller allowed the concept but cut inflated amounts.',
      'No timesheets, no job description, round-number December payments: the fact pattern that loses. Documentation is the whole defense.',
      'Running the wages through an S corporation by mistake forfeits the FICA exemption — entity form must be checked first.',
      'Money routed back to the parent (child\'s "wages" spent by the parent) undermines the bona fides; the child must actually receive and own the funds.',
      'State child-labor and payroll registration requirements still apply even for a parent\'s business.'
    ],
    bestFit: [
      'Schedule C owners (or parent-only partnerships) with profit and children roughly 7–17 who can do genuine work.',
      'Parents in high brackets (24%+ plus SE tax) — the rate spread between parent and child drives the benefit.',
      'Families who will redirect the wages into Roth IRAs or 529s, compounding the planning value.'
    ],
    implementation: [
      'Confirm the employer entity qualifies (sole prop / parent-only partnership); if S corp, set up a Family Management Company first.',
      'Write a job description per child; set an hourly market rate with support for it.',
      'Add the child to payroll: W-4, I-9, state new-hire reporting; mark wages FICA-exempt under §3121(b)(3)(A) in the payroll system.',
      'Pay on a regular cadence into the child\'s own account; keep timesheets signed contemporaneously.',
      'Issue a W-2 in January; keep total wages at or below the child\'s standard deduction unless there is a reason to exceed it.',
      'Coordinate follow-on moves: custodial Roth IRA funding and, where available, plan deferrals.'
    ]
  },

  client: {
    teaser: 'Converts money your family already spends into a business deduction — taxed at 0% on the other side',
    headline: 'Put your kids on the payroll — legally, and nearly tax-free',
    plainEnglish: [
      'If your children do real work for your business — filing, cleaning the shop, running your social media, appearing in your ads — the business can pay them a fair wage for it, just like any other worker. That wage is a business deduction for you.',
      'Here is what makes it special: because of how the tax law treats a parent employing their own child, wages paid to your under-18 child by your business skip Social Security and Medicare taxes entirely. And the child can earn up to $16,100 in 2026 before owing any income tax at all. So the same dollars that were taxed at your highest rate become deductible to you and tax-free to them.',
      'The catch is that it has to be real: real work, real hours written down, and a paycheck that matches what the job is worth. We set all of that up so it holds up.'
    ],
    analogy: 'You were going to give your kids money anyway — allowance, savings, spending money. This lets the business pay them for real work instead, so the IRS helps fund it.',
    benefits: [
      'A full business deduction for you — cutting income tax AND self-employment tax',
      'Up to $16,100 per child in 2026 with zero income tax on the child\'s side',
      'No Social Security or Medicare tax on the wages, on either side',
      'The wages can seed a Roth IRA or college fund in the child\'s name'
    ],
    steps: [
      'We confirm your business structure qualifies and set a fair pay rate',
      'We create a simple job description and timesheet system for each child',
      'Your child gets paid into their own account, on a normal schedule',
      'We handle the payroll forms and the year-end W-2'
    ],
    considerations: [
      'The work must be real and the pay must match the job — this is not a paper transaction, and we document everything.',
      'If your business is an S corporation, we route the wages through a small family management company so the payroll-tax exemption still applies — a one-time setup we handle.'
    ]
  },

  inputs: [
    { key: 'numChildren', label: 'Number of children employed', type: 'number', default: 1 },
    { key: 'wagesPerChild', label: 'Annual wages per child', type: 'currency', default: 16100, grows: true },
    { key: 'payer', label: 'Who pays the kids', type: 'select', default: 'fmc',
      options: [
        { value: 'fmc', label: 'Sole prop / Family Mgmt Co (no FICA)' },
        { value: 'scorp', label: 'S-corp direct payroll (FICA applies)' }
      ] }
  ],

  suggest: function (p) {
    if (!(p.kidsCTC > 0 && (p.scheduleCNet > 0 || p.passthroughK1 > 0))) return null;
    return { reason: p.kidsCTC + ' child(ren) under 17 and business income — wages to the kids convert parent-rate dollars to 0% dollars.',
      params: { numChildren: p.kidsCTC } };
  },

  appliesTo: function (profile) {
    return true; // needs business income; validated with a note in apply()
  },

  /**
   * Two payer modes. Kids are always assumed at 0% income tax, so the
   * MODELED wage per child is capped at the single standard deduction
   * ($16,100, 2026) — any amount entered above that is not deducted from the
   * parent's income (a note flags it as taxable to the child, not modeled).
   *
   * 'fmc' — Sole prop / Family Management Company (FICA-EXEMPT wages,
   *   §3121(b)(3)(A)):
   *   • If Schedule C profit exists, the sole prop employs the kids directly:
   *     wages deducted from scheduleCNet, saving income tax AND SE tax.
   *   • Otherwise, if S-corp/K-1 income exists, the FMC flow: the S corp pays
   *     the parents' FMC (a sole prop) a management fee, the FMC pays the
   *     kids, and the FMC's Schedule C nets to ~zero (fee in = wages out).
   *     Modeled as a deduction against passthroughK1 — income shifted out of
   *     the S corp to the kids with NO payroll tax anywhere. Savings = wages
   *     × the parents' marginal rate (the engine computes it exactly,
   *     including the QBI interaction).
   *
   * 'scorp' — the S corporation employs the kids directly. No under-18
   *   exemption inside a corporation: FICA applies. The entity deducts wages
   *   plus its employer FICA half; the kids' employee half is added to the
   *   family's burden via otherTaxes. Net savings = deduction at the parents'
   *   marginal rates minus the 15.3% payroll cost.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    var tb = TSIQ.TABLES_2026;
    var f = tb.fica;

    var kids = Math.max(0, Math.round(params.numChildren || 0));
    var perChildEntered = params.wagesPerChild || 0;
    var wageCap = tb.standardDeduction.single;
    var perChild = Math.min(perChildEntered, wageCap);
    var totalWages = kids * perChild;
    var payer = params.payer || 'fmc';
    if (totalWages <= 0) return { profile: p, notes: notes };

    if (payer === 'scorp') {
      // ---- S-corp direct payroll: FICA applies (kids' wages are far below
      // the SS wage base, so both halves are a flat 7.65% each) ----
      if (!(p.passthroughK1 > 0)) {
        if (yearIndex === 0) {
          notes.push('S-corp payroll selected but no S-corp/K-1 income found — pair with ' +
            'the S-Corp Election strategy or switch the payer to Sole prop / FMC. No benefit modeled.');
        }
        return { profile: p, notes: notes };
      }
      // Both FICA halves count in the family's tax burden (same convention
      // as owner wages in the S-corp election); the employer half is also
      // deductible by the entity.
      var half = (f.ssRate + f.medicareRate) / 2; // 7.65%
      var employerFICA = totalWages * half;
      var employeeFICA = totalWages * half;
      p.passthroughK1 = p.passthroughK1 - totalWages - employerFICA;
      p.otherTaxes = (p.otherTaxes || 0) + employerFICA + employeeFICA;
      p.entityW2Wages = (p.entityW2Wages || 0) + totalWages;
      if (yearIndex === 0) {
        notes.push(TSIQ.fmt.usd(totalWages) + ' of S-corp wages to ' + kids +
          ' child(ren): deductible to the entity, but the under-18 FICA exemption does ' +
          'NOT apply inside a corporation — ' + TSIQ.fmt.usd(employerFICA + employeeFICA) +
          ' of payroll tax (15.3%) is included in the math. Compare against the ' +
          'Sole prop / FMC option, which avoids it entirely.');
      }
    } else {
      // ---- Sole prop / FMC: FICA-exempt under §3121(b)(3)(A) ----
      if (p.scheduleCNet > 0) {
        // Parent's existing sole prop employs the kids directly.
        p.scheduleCNet = p.scheduleCNet - totalWages;
        p.entityW2Wages = (p.entityW2Wages || 0) + totalWages;
        if (yearIndex === 0) {
          notes.push(TSIQ.fmt.usd(totalWages) + ' of wages to ' + kids +
            ' child(ren) deducted from Schedule C — saves income tax AND self-employment ' +
            'tax; wages are FICA-exempt under §3121(b)(3)(A).');
          if (totalWages > profile.scheduleCNet) {
            notes.push('Total wages exceed Schedule C profit, creating a loss — confirm ' +
              'the wage level is supportable by actual services.');
          }
        }
      } else if (p.passthroughK1 > 0) {
        // FMC flow: S corp → management fee → FMC (Schedule C nets ~zero) →
        // kids. Income leaves the S corp; no FICA anywhere in the chain.
        p.passthroughK1 = p.passthroughK1 - totalWages;
        if (yearIndex === 0) {
          notes.push('Family Management Company flow: the S corp pays the parents\' FMC a ' +
            TSIQ.fmt.usd(totalWages) + ' management fee, the FMC pays the kids, and the ' +
            'FMC\'s Schedule C nets to zero (fee in = wages out). Income shifts out of ' +
            'the S corp to the kids with no payroll tax — savings run at the parents\' ' +
            'marginal rate. The fee must be arm\'s-length for real family-payroll ' +
            'services, with an FMC management agreement in the file.');
        }
      } else {
        if (yearIndex === 0) {
          notes.push('No business income found (Schedule C or K-1) — nothing to deduct ' +
            'the kids\' wages against. No benefit modeled.');
        }
        return { profile: p, notes: notes };
      }
    }

    if (yearIndex === 0) {
      notes.push('Kids assumed at 0% income tax: wages up to the ' +
        TSIQ.fmt.usd(wageCap) + ' standard deduction are income-tax-free ' +
        'to the child. Work must be real, age-appropriate, documented (timesheets), and ' +
        'paid at market rate.');
      if (perChildEntered > wageCap) {
        var excessPerChild = perChildEntered - wageCap;
        notes.push(TSIQ.fmt.usd(excessPerChild) + ' per child entered above the ' +
          TSIQ.fmt.usd(wageCap) + ' standard deduction is NOT deducted from the parent\'s ' +
          'income here — it would be taxable on the child\'s own return at the child\'s rate, ' +
          'which this tool does not model. Only ' + TSIQ.fmt.usd(perChild) + '/child is reflected ' +
          'in the numbers above.');
      }
    }
    return { profile: p, notes: notes };
  }
});
