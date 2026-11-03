## High

1. **“Cost” is actually gross foregone benefit**
   - Location: `costOfDelay()`, page intro, FAQs, results labels.
   - Problem: `opportunities × monthlyValue × lagMonths` is valid only as a flat, incremental, net benefit stream foregone during an *additional delay to live*. It is not total economic cost: saved hours may not become cash, “revenue sooner” may be a one-off timing benefit, and error avoidance needs expected net loss avoided. Implementation and ongoing operating costs are excluded.
   - Fix: Rename outputs to “estimated benefit foregone” or explicitly define “cost of delay” as net incremental benefit foregone. Require monthly value to be net of recurring AI/operating costs; state one-off implementation cost is excluded and assessed separately.

2. **The delay control measures the wrong milestone**
   - Location: `lagMonths` label “Months until you start”; formula and method say value is lost while not running/live.
   - Problem: A six-month delay to *start* does not necessarily equal six months of foregone value; both “start now” and “wait” paths may have implementation time.
   - Fix: Replace with “Additional months until live” and define it as the extra time until benefits begin versus starting now.

3. **“Conservative case” is an unsupported 50% haircut**
   - Location: `CONSERVATIVE_SHARE = 0.5`, results, method bullets, FAQ.
   - Problem: Half is not inherently conservative. It implies a particular ramp pattern, yet no ramp duration, adoption curve, or evidence is stated. A delayed project could lose nearly all nominal value; a short ramp could lose much less.
   - Fix: Label it “50% scenario over N months,” not “Conservative case.” Prefer an explicit ramp assumption, e.g. monthly benefit by month, and calculate its sum.

4. **The calculator forces a positive answer**
   - Location: input ranges: 1–10 opportunities, $500–$500,000 monthly value, 1–24 months.
   - Problem: Zero addressable workflows, zero monetisable benefit, or no added delay cannot be represented. A tiny team with no releasable capacity is forced to show at least $500/month.
   - Fix: Allow zero for each input, return “No quantified delay cost under these assumptions,” and prompt users to validate whether saved time becomes value.

5. **Opportunity values can be double-counted**
   - Location: “AI opportunities” / “Monthly value of each”; FAQ monthly-value guidance.
   - Problem: Separate workflows may claim the same saved staff hours, revenue, customer cohort, or avoided error. A single uniform value also hides materially different workflows.
   - Fix: Define opportunities as distinct, non-overlapping workflows with incremental value. Best: use workflow rows with separate values. Minimum: request an average only after users remove overlap.

## Medium

6. **Time value and non-flat benefits are omitted**
   - Location: `cumulative = monthly * lagMonths`.
   - Problem: A 12-month horizon assumes the same full monthly benefit every month: no seasonality, churn, contracts ending, capacity ceiling, adoption dip, or discounting. For board use, nominal dollars over 24 months overstate present economic value.
   - Fix: State “nominal, flat monthly estimate.” Offer optional discount rate and monthly/ramp inputs for horizons beyond 12 months.

7. **Defaults and controls strongly anchor the result; sensitivity is hidden**
   - Location: defaults: 3, $10,000, 6.
   - Problem: At defaults, one extra workflow adds $10,000/month and $60,000 over six months; one extra delay month adds $30,000 cumulative; a $500 value change adds $1,500/month and $9,000 cumulative. All three inputs have elasticity of 1%, but their practical increments differ greatly.
   - Fix: Show “what changes this result” beside outputs, including the three default-step impacts. Mark defaults as examples, not benchmarks.

8. **Range design does not fit the scale**
   - Location: `monthlyValue` slider, $500–$500,000 in $500 steps.
   - Problem: A linear slider spanning 1,000 steps is hard to use at low values and implies false precision at high values. The $500 minimum and $500,000 maximum are arbitrary caps.
   - Fix: Use typed currency input plus presets/log-scale slider, and disclose or remove caps. Consider smaller increments below $10,000.

9. **Results do not fully describe their own scope**
   - Location: `CostOfDelayResults.tsx`.
   - Problem: “Over 6 months” scopes only the middle figure. “Conservative case” lacks both timeframe and the fact it is exactly 50% of the nominal cumulative result.
   - Fix: Use “Nominal benefit foregone over 6 months” and “50% scenario over 6 months.”

10. **Several claims are too absolute or uncited**
   - Location: page copy and FAQ.
   - Problem:
     - “Every month … you give up its value” and “That money is gone” are not universally true.
     - “Value usually ramps” does not justify a 50% factor without evidence.
     - “Your team learns nothing” and “The tools will keep improving” are broad assertions.
     - URL privacy copy is incomplete: query values may also appear in browser history, server/proxy logs, analytics, and referrers.
   - Fix: Qualify claims as assumptions, cite a method source for any empirical ramp claim, and expand the privacy disclosure. Verify the “paid day, credited in full” commercial claim against current terms.

## Low

11. **Worked example arithmetic is correct**
   - Location: “A worked example,” formula code, method bullets, FAQ.
   - Check: `3 × $10,000 = $30,000/month`; `× 6 = $180,000`; `× 50% = $90,000`. Code, page, and FAQ agree.
   - Fix: Add an automated test for this fixture and explicitly call the $180,000 a nominal flat-benefit scenario.

## Per-control units

| Control | Current user-facing unit | Unambiguous? | Exact proposed label | Exact proposed hint | Displayed unit |
|---|---|---:|---|---|---|
| `opportunities` | Label: “AI opportunities”; hint says workflows; number box is bare; slider has no visible readout | No — “opportunity” could be a workflow, use case, or portfolio item | `Distinct workflows delayed` | `Count non-overlapping workflows that could be live now. Do not count the same hours, revenue, or avoided loss twice.` | `workflows` |
| `monthlyValue` | Label: “Monthly value of each”; hint lists hours, revenue, errors; number box is bare; dollar formatting exists only in slider accessibility text/output | No — currency, per-workflow basis, gross/net treatment, and whether hours are monetised are unclear | `Net monthly benefit per workflow (USD)` | `Expected incremental benefit once live, in USD per workflow per calendar month. Net of recurring AI and operating costs; count labour only if capacity will be removed or redeployed. Exclude one-off implementation cost.` | `$10,000 / workflow / month` |
| `lagMonths` | Label: “Months until you start”; hint says expected wait; number box is bare; slider accessibility text says `mo` | Unit is clear; milestone is not | `Additional months until live` | `Extra calendar months before these workflows produce value, compared with starting now. Enter added delay to go-live, not total project duration.` | `months` |