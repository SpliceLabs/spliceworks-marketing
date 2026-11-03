## Arithmetic check

Worked example matches code: investment **$926,500**, year-one capacity **$825,000**,
net benefit **−$101,500**, stated payback **13 months**, year-two benefit
**$983,500**, break-even **14.0%**.

## High

- **`ai-roi.ts` results; results panel — capacity is presented as financial return.**  
  “Net benefit,” “ROI,” and “payback” assume 100% of saved time becomes
  salary-equivalent value. Capacity does not become cash unless hiring, contractor
  spend, backlog, or revenue is actually displaced. The note qualifies this after
  showing definitive financial outputs.  
  **Fix:** add a `Capacity converted to value (%)` / realization-rate input and
  multiply capacity by it; alternatively rename outputs to “potential capacity
  value,” “capacity ROI,” and “capacity payback.”

- **`ai-roi.ts: paybackMonths` — payback is mathematically invalid after month 12.**  
  It repays all first-year investment using *gross* monthly capacity forever:
  `dipMonths + investment / valuePerMonth`. From year two, tools and
  infrastructure recur. A case with positive time saved but negative
  `yearTwoBenefit` still receives a finite payback, though it never pays back.  
  **Fix:** calculate monthly cash/capacity flows. After month 12, subtract monthly
  recurring tools and infrastructure; return “does not pay back under these
  assumptions” when ongoing net monthly benefit is ≤0. With defaults, this changes
  payback slightly from 13.1 to about 13.2 months.

- **`ai-roi.ts`; “How we keep the dip small” — model contradicts recommended rollout.**  
  The model applies the full dip, training, tooling, and savings assumptions to all
  people simultaneously. The page recommends a small staged pilot and says it does
  not roll out that way. A CEO cannot model the recommended business case.  
  **Fix:** add rollout cohorts/adoption timing, or explicitly label this “big-bang
  full-rollout scenario” and provide a separate pilot calculator.

- **`AiRoiResults.tsx`; method copy — “net benefit” conflates cash costs and a
  contingent opportunity value.**  
  Tools/training/infrastructure are cash or budget costs; saved labour is valued at
  fully loaded cost regardless of utilisation, demand, or whether the team can
  redeploy it. This is valid as an opportunity-cost model, not a conventional ROI
  without a realization assumption.  
  **Fix:** separate “cash spend,” “productivity dip cost,” “potential capacity
  value,” and “realized financial value.”

## Medium

- **`ai-roi.ts`; results — break-even may be impossible within the control range.**  
  `breakEvenTimeSaved` can greatly exceed the 50% slider maximum, yet copy says
  “breaks even if AI saves about X%.” For a small team with high shared
  infrastructure, the target may be unreachable in the UI.  
  **Fix:** when required saving exceeds 50%, state “not achievable within this
  model’s 0–50% range”; also handle zero investment as immediate break-even and
  12-month dip plus zero costs as break-even, not “can’t break even.”

- **`ai-roi.ts`; “How the number is built” — dip is a hard cliff, not an adoption
  curve.**  
  The model charges the dip during every dip month and recognizes zero AI saving;
  then it switches instantly to full steady-state saving. It is deliberately
  conservative in one direction but may be wrong in either direction.  
  **Fix:** state this explicitly beside the dip controls, or support a ramped
  adoption/value curve.

- **“What the number leaves out” — key omitted costs are acknowledged but still
  material to the claimed business case.**  
  Change management, governance, review/rework, integration, support, procurement,
  security, and ongoing training can be substantial. “Net of reviewing AI output”
  relies on users remembering to fold these into time saved.  
  **Fix:** add an annual shared “implementation and ongoing operating cost” input,
  or label the outputs “partial ROI excluding governance/change costs.”

- **“What the number leaves out” — sensitivity claim is overbroad.**  
  “Time-saved figure, the one that moves the answer most” is not generally true.
  At defaults: +1 percentage point saved changes year-one benefit by **+$66,000**;
  one additional dip month changes it by about **−$201,667**. For tiny teams,
  shared infrastructure dominates.  
  **Fix:** show a small sensitivity panel or tornado chart for time saved, dip
  months, dip percentage, realization rate, and shared infrastructure.

- **Defaults/source framing — strong anchoring without an uncertainty range.**  
  The starting case anchors users at 50 people, $176k salary, 12.5% saved, $9.6k
  training per person, and $100k infrastructure. These are scenario assumptions,
  not benchmarks. DORA itself describes its calculator as a high-uncertainty
  conversation starter; its current control is specifically “Technical staff size
  (FTE),” not a general workforce measure. [DORA calculator](https://dora.dev/ai/roi/calculator/)  
  **Fix:** label defaults “illustrative software-engineering scenario, not
  benchmark”; offer conservative/base/upside presets and ranges.

- **FAQ “How do you calculate…” — incomplete relative to code.**  
  It describes capacity as `people × cost × time saved` but omits the
  post-dip-month restriction; readers can infer a full-year benefit.  
  **Fix:** add “for months after the initial dip only” and distinguish capacity
  value from realized cash value.

- **“DORA cites 40 to 150 minutes a day” — unsupported and dimensionally vague.**  
  I could not substantiate this exact range in the current official calculator,
  which names the input “Net time saved per developer (%)”; it does not establish
  that daily-minute claim. [DORA calculator](https://dora.dev/ai/roi/calculator/)  
  **Fix:** remove it, or cite the exact report/version/page and specify assumed
  working hours and whether minutes are gross or net of verification.

## Low

- **`format.ts`; results — rounding hides decision-relevant precision.**  
  ROI and break-even round to whole percentages; payback rounds to nearest whole
  month. A result near a funding threshold can be overstated.  
  **Fix:** display one decimal for ROI/break-even and “≈ 13.1 months” for payback.

- **`ToolField.tsx` — no visible unit accompanies the editable number.**  
  Slider accessibility text has formatting, but the user-facing number box is bare.
  This invites entering total annual tool spend into a per-person field or a
  fraction instead of a percentage.  
  **Fix:** add a non-editable suffix/prefix inside each number control and repeat
  the unit in the label.

- **Ranges/steps — broadly usable, but weak at edges.**  
  Integer team size prevents fractional pilot FTEs; monthly dip steps are coarse;
  0–50% time saved permits highly optimistic assumptions without warning; $40k–
  $400k silently imposes a USD salary frame.  
  **Fix:** retain ranges but flag values above, for example, 25% as “evidence
  required,” allow 0.5 FTE or label team as whole people, and expose USD/year.

## Per-control units

| Control today | Current unit / ambiguity | Exact proposed label | Exact proposed hint | Displayed unit |
|---|---|---|---|---|
| People using AI | Bare whole number; “people” inferred. Ambiguous between headcount, FTE, licensed users, and pilot cohort. | AI-enabled FTEs | “Whole people whose recurring work is in scope. Use the same population for salary, licences, training and the dip.” | `50 people` |
| Cost per person | Hint establishes annual fully loaded cost; number box is bare and currency is only implied by formatted slider accessibility text. | Fully loaded annual cost per AI-enabled FTE | “Weighted-average annual payroll, employer taxes, benefits and allocated overhead. Do not use bill rate or revenue.” | `$176,000 / person / year` |
| Time AI saves | Slider/ARIA shows `%`; unclear whether it means gross task speed, annual time, output, or usable capacity. | Net steady-state time saved per person | “Share of annual working time eliminated after review, correction and ongoing AI work. Exclude the initial rollout dip.” | `12.5% of time` |
| AI tools per person | Hint says annual and per person; number box is bare. Easy to enter total contract cost. | Annual AI tools and usage cost per FTE | “Expected annual licences and usage for one covered person. Allocate pooled licences across the team; exclude shared infrastructure.” | `$330 / person / year` |
| Training per person | Hint implies a first-year spend but does not explicitly say one-off; risk of double-counting learning time. | One-time rollout training cost per FTE | “External courses, coaching and materials for the initial rollout only. Exclude employee learning time; that belongs in the dip.” | `$9,600 / person, one-time` |
| Infrastructure | Hint says per year but not that this is a total shared cost, not per person. | Shared annual AI infrastructure cost | “Total annual platform, data, security and governance spend for this rollout. Enter the whole-team amount; do not multiply by people.” | `$100,000 / year` |
| Productivity dip | `%` shown only semantically; unclear whether it is gross output loss, time lost, or incremental loss after AI gains. | Temporary productivity reduction during rollout | “Percentage below normal output during the dip. Applied to every in-scope person for every dip month; no AI savings are counted then.” | `15% below baseline` |
| Months the dip lasts | Hint says no saving before it ends; number box is bare. Assumes all users share the same start/end date. | Duration of initial productivity dip | “Whole months until steady-state savings begin. This model assumes the entire in-scope team follows the same timeline.” | `3 months` |