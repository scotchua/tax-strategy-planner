/* ============================================================================
 * STRATEGY: S Corporation Election
 * ==========================================================================*/
window.TSIQ = window.TSIQ || {};
TSIQ.strategyModules = TSIQ.strategyModules || [];

TSIQ.strategyModules.push({
  id: 's-corp-election',
  name: 'S Corporation Election',
  category: 'Entity Structure',
  applyOrder: 10, // restructures income first; PTET and others compose after
  modeled: true,
  character: 'permanent', // ET2

  advisor: {
    summary:
      'Elect S status (§1362, Form 2553) for the client\'s trade or business so ' +
      'profits split into (1) reasonable W-2 compensation subject to FICA and ' +
      '(2) distributions of passthrough profit NOT subject to SE/FICA tax ' +
      '(Rev. Rul. 59-221). Savings = 15.3%/2.9%/3.8% employment tax avoided on ' +
      'the distribution layer, net of payroll costs and the QBI wage interplay. ' +
      'Reasonable compensation is the entire battleground — document it.',
    mechanics: [
      'Schedule C net profit currently bears SE tax on 92.35% of earnings: 12.4% ' +
      'Social Security up to the $184,500 wage base (2026) plus 2.9% Medicare ' +
      '(3.8% with the §3101(b)(2) additional 0.9% above $200k/$250k) — uncapped.',
      'Post-election, only the W-2 salary bears FICA. Remaining profit passes ' +
      'through free of employment tax.',
      'Reasonable comp must reflect what the owner would pay a third party for ' +
      'the services rendered — factors include training, duties, time, comparable ' +
      'salaries, and distributions history (Watson; McAlary).',
      '§199A interplay cuts both ways: salary reduces QBI (shrinks the 20% ' +
      'deduction) but creates W-2 wages that support the deduction above the ' +
      'taxable-income threshold ($403,500 MFJ / $201,750 single, 2026).',
      'Adds real compliance cost: payroll processing, Form 1120-S, W-2/941s, ' +
      'state unemployment, and possibly a state franchise tax.'
    ],
    authority: [
      { type: 'IRC', cite: 'IRC §1362; Form 2553', note: 'Election mechanics; due 2 months + 15 days into the year (late-election relief under Rev. Proc. 2013-30 is routinely available).' },
      { type: 'Admin', cite: 'Rev. Rul. 59-221', note: 'S corporation passthrough income is not self-employment income.' },
      { type: 'Admin', cite: 'Rev. Rul. 74-44', note: 'IRS may recharacterize distributions as wages where salary is unreasonably low.' },
      { type: 'Case', cite: 'David E. Watson, P.C. v. United States, 668 F.3d 1008 (8th Cir. 2012)', note: 'CPA paying himself $24k while distributing $200k+ — court upheld recharacterization to market-rate comp. The leading reasonable-comp case.' },
      { type: 'Case', cite: 'Sean McAlary Ltd. v. Comm\'r, T.C. Summ. Op. 2013-62', note: 'Court set reasonable comp using market data for the services actually performed.' },
      { type: 'Case', cite: 'Glass Blocks Unlimited v. Comm\'r, T.C. Memo 2013-180', note: 'Loan repayments/distributions recharacterized as wages where no salary was paid.' },
      { type: 'IRC', cite: 'IRC §§1401–1402; §3101(b)(2)', note: 'SE tax being avoided; 0.9% additional Medicare tax thresholds.' },
      { type: 'IRC', cite: 'IRC §199A', note: 'QBI deduction interplay — salary shrinks QBI but supplies the W-2 wage limitation above the threshold.' }
    ],
    requirements: [
      'Eligible entity: domestic, ≤100 shareholders, one class of stock, eligible shareholders (individuals, certain trusts/estates — no partnerships or nonresident aliens).',
      'Timely Form 2553 (or late relief under Rev. Proc. 2013-30).',
      'Run actual payroll: W-2, 941s, federal/state withholding, state unemployment.',
      'A defensible reasonable-compensation analysis, documented in the file.'
    ],
    risks: [
      'Unreasonably low salary is the #1 exam issue — recharacterization brings back payroll tax plus penalties and interest.',
      'Not worth it at low profit levels: payroll/compliance costs typically exceed savings below ~$50–60k of net profit.',
      'Social Security earnings history is reduced by lower reported wages (retirement benefit consideration).',
      'Reduced QBI below the threshold — model the net, not the payroll-tax savings alone.',
      'State-level costs: franchise taxes, minimum fees, and states (e.g., NYC) that do not recognize S status.',
      'Appreciated assets inside the entity complicate later exits (no basis step-up flexibility of a partnership).'
    ],
    bestFit: [
      'Consistent Schedule C / SMLLC profit of roughly $75k+ per year.',
      'Services businesses where a market salary is well below total profit.',
      'Owners who also want PTET access (requires an entity) — the two stack.'
    ],
    implementation: [
      'Run a reasonable-compensation study (document comparables and duties).',
      'Form the entity if needed; file Form 2553 (calendar the deadline).',
      'Set up payroll (provider or firm-run) and state accounts.',
      'Set a distribution policy and an accountable plan for owner expenses.',
      'File 1120-S annually; issue K-1 and W-2 to the owner.'
    ]
  },

  client: {
    teaser: 'Changes how your business income is taxed — same business, better math',
    headline: 'Stop paying self-employment tax on every dollar of profit',
    plainEnglish: [
      'Right now, every dollar your business earns gets hit with self-employment tax — about 15.3% — on top of income tax. That is how sole proprietorships and standard LLCs work.',
      'An S corporation changes the math. You become an employee of your own company and take a fair, documented salary for the work you do. That salary is taxed like any paycheck. But the rest of the profit comes to you as a business distribution — and distributions are not subject to self-employment tax at all.',
      'The salary has to be reasonable for the work you do — that is the rule, and we set it carefully and document it. Everything above that fair salary escapes the 15.3% tax, year after year.'
    ],
    analogy: 'Think of your profit as two buckets: a paycheck bucket (taxed like a normal job) and an owner bucket (no payroll tax). Today, everything is in the paycheck bucket. The S corporation lets us split them.',
    benefits: [
      'Roughly 15% tax eliminated on profits above your salary',
      'Savings recur every year the business is profitable',
      'Opens the door to other strategies (entity-level state tax deduction, accountable plan)',
      'You are already doing the work — this changes the paperwork, not the business'
    ],
    steps: [
      'We determine a fair, defensible salary for your role',
      'We file a one-page election with the IRS',
      'We set up simple payroll for you',
      'Each year: one business tax return, one W-2, one K-1 — we handle all of it'
    ],
    considerations: [
      'There are real costs — payroll service and a separate business tax return — so this only makes sense above a certain profit level. The numbers here already subtract those costs.',
      'A slightly lower W-2 wage history can modestly affect future Social Security benefits; we will look at that together.'
    ]
  },

  inputs: [
    { key: 'salary', label: 'Reasonable compensation (W-2 salary)', type: 'currency', default: 80000, grows: true,
      solveable: true, solveFloorKey: 'reasonableCompFloor' },
    { key: 'reasonableCompFloor', label: 'Reasonable-comp floor (comp study minimum — Watson v. US)', type: 'currency', default: 40000 },
    { key: 'adminCost', label: 'Annual payroll + 1120-S compliance cost', type: 'currency', default: 2500, grows: true },
    { key: 'entityStateTaxPct', label: 'Separate state entity-level tax on S-corp income (%) — 0 for most states; e.g. CA 1.5%', type: 'percent', default: 0 }
  ],

  suggest: function (p) {
    if (!(p.scheduleCNet >= 75000)) return null;
    return { reason: TSIQ.fmt.usd(p.scheduleCNet) + ' of Schedule C profit bears SE tax on every dollar — the election typically pencils above ~$75k.',
      params: { salary: Math.round(p.scheduleCNet * 0.4 / 1000) * 1000 } };
  },

  appliesTo: function (profile) {
    return true; // validated in apply(): needs Schedule C income
  },

  /**
   * Converts Schedule C income into W-2 owner wages + S-corp passthrough
   * profit. Employer FICA and admin costs are deducted from entity profit.
   * The engine then charges payroll tax (both halves) on ownerWages instead
   * of SE tax, and gives the profit QBI treatment with W-2 wage support.
   * SF1: the pass-through profit still bears the owner's ordinary personal
   * state tax via passthroughK1 (no change there) — but a handful of states
   * ALSO levy a separate entity-level tax on S-corp income on top of that
   * (CA 1.5% franchise tax, NH BPT/BET, TN excise tax, NYC corporate tax).
   * `entityStateTaxPct` models that add-on cost; it defaults to 0 since most
   * states don't impose one.
   */
  apply: function (profile, params, yearIndex, state) {
    var p = Object.assign({}, profile);
    var notes = [];
    if (p.scheduleCNet <= 0) {
      notes.push('No Schedule C (sole proprietorship) profit found — nothing to convert.');
      return { profile: p, notes: notes };
    }
    if (!(params.salary > 0)) {
      notes.push('No reasonable compensation entered — an S corporation MUST pay its ' +
        'owner-employee a reasonable W-2 salary before any profit passes through ' +
        '(Watson v. United States, 668 F.3d 1008 — the #1 exam issue for this election). ' +
        'Enter a salary to model this strategy; nothing is modeled at $0.');
      return { profile: p, notes: notes };
    }
    var f = TSIQ.TABLES_2026.fica;
    var salary = Math.min(params.salary, p.scheduleCNet); // can't pay more than profit
    if (salary < params.salary) {
      notes.push('Salary capped at business profit of ' + TSIQ.fmt.usd(p.scheduleCNet) + '.');
    }
    var employerFICA = Math.min(salary, f.ssWageBase) * (f.ssRate / 2) +
      salary * (f.medicareRate / 2);
    var entityProfit = p.scheduleCNet - salary - employerFICA - (params.adminCost || 0);
    var entityStateRate = (params.entityStateTaxPct || 0) / 100;
    var entityStateTax = Math.max(0, entityProfit) * entityStateRate;

    p.ownerWages = (p.ownerWages || 0) + salary;
    p.entityW2Wages = (p.entityW2Wages || 0) + salary;
    p.passthroughK1 = (p.passthroughK1 || 0) + entityProfit;
    p.entityStateTax = (p.entityStateTax || 0) + entityStateTax;
    p.scheduleCNet = 0;

    if (yearIndex === 0) {
      notes.push('Reasonable compensation set at ' + TSIQ.fmt.usd(salary) +
        '; ' + TSIQ.fmt.usd(Math.max(0, entityProfit)) +
        ' of profit passes through free of employment tax.');
      if (entityProfit < 0) {
        notes.push('Warning: salary + payroll costs exceed profit — election is not beneficial at this income level.');
      }
      if (salary < 0.25 * profile.scheduleCNet) {
        notes.push('Salary is under 25% of business profit — a low salary relative to profit ' +
          'is the classic reasonable-compensation exam target (Watson). Support the figure ' +
          'with a comp study before relying on these numbers.');
      }
      if (params.reasonableCompFloor > 0 && salary < params.reasonableCompFloor) {
        notes.push('Warning: salary of ' + TSIQ.fmt.usd(salary) + ' is BELOW the entered reasonable-' +
          'comp floor of ' + TSIQ.fmt.usd(params.reasonableCompFloor) + ' — raise the salary or the ' +
          'floor before relying on this figure (Watson v. United States, 668 F.3d 1008).');
      }
      if (entityStateTax > 0) {
        notes.push(TSIQ.fmt.usd(entityStateTax) + ' modeled as a separate state entity-level ' +
          'tax on S-corp income (' + TSIQ.fmt.pct(entityStateRate) + ' of profit) — check whether ' +
          'the client\'s state actually imposes one (e.g. CA 1.5%, NH BPT/BET, TN excise, NYC) ' +
          'before relying on this figure.');
      }
    }
    return { profile: p, notes: notes };
  }
});
