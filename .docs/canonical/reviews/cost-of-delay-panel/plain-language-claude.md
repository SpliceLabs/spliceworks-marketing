# AI cost of delay calculator: plain-language and units review

Source: `.docs/canonical/reviews/cost-of-delay-panel/bundle.md`. Reader: a CEO, founder or tech leader, often not a finance person, deciding whether to start now and making that case to a board.

Arithmetic check: the worked example is correct against `costOfDelay`. 3 x $10,000 = $30,000 a month (`monthly`). $30,000 x 6 = $180,000 (`cumulative`). $180,000 x 0.5 = $90,000 (`conservative`, `CONSERVATIVE_SHARE = 0.5`). These are also the defaults (`o=3, v=10000, l=6`), so the example matches what a first-time visitor sees.

## High

### H1. "Monthly value of each" has no visible unit, and its hint invites a number that isn't dollars
- **Location:** `CostOfDelayCalculator.tsx` FIELDS `monthlyValue`. No `unit`, hint "Hours saved, revenue sooner, errors avoided".
- **Problem:** The number box shows a bare `10000`: no `$`, no "a month". The dollar formatting only reaches screen readers, through the slider's `aria-valuetext`. The hint opens with "Hours saved", so a reader may type 40 (hours) where the tool wants dollars. "Revenue sooner" is hard to parse. "Each" relies on the reader linking it back to the label above.
- **Proposed:**
  - Label: `Value of each workflow`
  - unit: `{ dollars: true, after: "per workflow a month" }` (screen reader: "Value of each workflow, in dollars per workflow a month")
  - Hint: `Your average, in dollars. Count hours saved times what they cost, plus revenue or errors.`
  - Slider readout: `` (n) => `${formatUsd(n)} per workflow a month` ``

### H2. The tool asks for one value per workflow, but the page and FAQ say "add up"
- **Location:** page intro ("Add up what your opportunities would be worth each month"), FAQ "What is the cost of delay for AI?" ("Add up what each opportunity would be worth per month").
- **Problem:** The calculator multiplies a count by one per-workflow value, so it assumes every workflow is worth the same. A reader with workflows worth $5,000, $10,000 and $40,000 who reads "add up" may enter the $55,000 total as "each" and get 3x the real number. That's the worst misread on the page, and it's the figure that goes to the board.
- **Proposed:** In the hint, say "Your average" (H1). Page intro: `Count the workflows AI could take on and estimate what one is worth each month, on average. Multiply the two, then multiply by the months you'll wait.` FAQ: `Estimate what each opportunity would be worth per month and take the average. Multiply it by the number of opportunities, then by the months you wait.`

### H3. One idea, the delay, has four names, and two of them mean different things
- **Location:** control "Months until you start", hint "How long you expect to wait", formula "months of delay", page "months you'll wait", FAQ "the months until you'd go live", result "Over N months".
- **Problem:** "Until you start" and "until you'd go live" are different periods. Going live comes after a build. A reader who counts to go-live enters a bigger number than one who counts to the start. The model counts value lost to waiting, so the extra months of waiting are what matter.
- **Proposed:** Use "months you wait" everywhere.
  - Label: `Months you wait to start`
  - Hint: `Each month you wait pushes back the value by a month.`
  - Formula bullet: `Cumulative cost = monthly cost of delay x months you wait`
  - FAQ: `Multiply it by the months you wait to get the cumulative cost.`

### H4. The result label reads "Over 1 months" at the minimum
- **Location:** `CostOfDelayResults.tsx`, `<dt>Over {inputs.lagMonths} months</dt>`.
- **Problem:** At 1 month it renders "Over 1 months". It also uses the raw input rather than the sanitized value the share line uses, so a malformed link could show a label that doesn't match the figure.
- **Proposed:** `` <dt>Total if you wait {formatMonths(lagMonths)}</dt> ``, where `lagMonths` comes from `sanitizeCostOfDelayInputs(inputs)`. `formatMonths` already exists in `format.ts`.

## Medium

### M1. "Conservative case" doesn't say what it's a case of
- **Location:** third result.
- **Problem:** Read on its own it could be a monthly figure or a different scenario. Nothing under the results says it's half the total, or why.
- **Proposed:** Label `Total, conservative case`. Add a note under the results: `The conservative case is half the total, since value usually builds up over the first months rather than arriving on day one.`

### M2. "Costs" and "spend" blur two different things
- **Location:** page intro ("it's gone before you spend a dollar on implementation"), share line, FAQ ("That money is gone before you spend anything").
- **Problem:** The ROI calculator now keeps "spend" separate from "lost output". Here the cost of delay is value you don't get, not cash out the door, yet "costs us" and "that money is gone" read like spending. A board member may ask where the $180,000 was spent. "Gone before you spend a dollar" also reads as a sequence in time, when it means "this leaves out implementation cost".
- **Proposed:** Page intro: `That's your cost of delay: value you don't get. It doesn't count anything you'd spend on implementation.` FAQ: `That's value lost, on top of anything you'd later spend on implementation.`

### M3. The share line leaves out the conservative figure and blurs spend
- **Location:** `execLine`.
- **Problem:** A board will push back on the headline number first. Giving them the low figure up front makes the line more credible. "Costs us" has the problem from M2.
- **Proposed:** `Every month we wait on AI, we give up about $30,000 in value. Waiting 6 months gives up about $180,000, or $90,000 if value builds up slowly. That's before any implementation cost.` Use `formatMonths` for the month count ("6 months", "1 month").

### M4. The slider readouts use an abbreviation and a bare number
- **Location:** FIELDS `format`: `String` for opportunities, `` `${n} mo` `` for lagMonths.
- **Problem:** Screen readers say "6 mo" or "3" with no unit. The ROI calculator now spells these out.
- **Proposed:** opportunities `` (n) => `${n} workflow${n === 1 ? "" : "s"}` ``, lagMonths `formatMonths`.

### M5. "AI opportunities" and "workflows" are used for the same thing
- **Location:** label "AI opportunities", hint "Workflows AI could take on", FAQ uses both, results don't say either.
- **Problem:** The reader has to work out that the two words mean the same thing. The unit after the box (below) is "workflows", so define the term once.
- **Proposed:** Keep the label "AI opportunities". Set the hint to `Workflows AI could take on. Count each one once.` On the page, after the first "AI opportunity", add `(a workflow AI could take on)`.

### M6. The first result doesn't say it is a cost
- **Location:** `<dt>Every month you wait</dt>`.
- **Problem:** The label names a period, not a quantity. That's fine next to the page heading, but in a screenshot it's unclear.
- **Proposed:** `Lost each month you wait`.

## Low

- **L1. FAQ "Isn't it cheaper to wait".** "Waiting has a cost too, it's just harder to see." is a comma splice: use `Waiting has a cost too. It's just harder to see.` "Your team learns nothing" is absolute and close to hype: use `your team doesn't build experience`.
- **L2. Conservative-case rationale.** "Usually ramps up" is a general claim with no source. Present it as the tool's assumption: `We show half, on the assumption that value builds up over time.` "Ramps up" is mild jargon: use "builds up".
- **L3. Number box step.** `monthlyValue` has `step: 500`. Check what happens when someone types $12,345. If the value is silently rounded or rejected, say so in the hint, or allow step 1 in the box.
- **L4. Worked example.** It's correct, but it doesn't use the result names. Use them so readers can match it to the screen: `...worth $10,000 a month each. Lost each month you wait: $30,000. Total if you wait 6 months: $180,000. Conservative case: $90,000.`
- **L5. Range sentence.** "$500 to $500,000 a month each" should match the unit wording: `$500 to $500,000 per workflow a month`.
- **L6. CTA.** "Test this number in a working session" doesn't say which of the three numbers. Use `Test your monthly value in a working session`, which matches the "What the number leaves out" paragraph.
- **L7. FAQ duplication.** The tool page and `faq.md` answers are copied word for word. Apply every FAQ edit above in both files, or they will drift apart.

## Per-control units

| Control | Unit today | Clear at a glance? | Proposed label | Proposed hint | `unit` | Slider readout (`format`) |
|---|---|---|---|---|---|---|
| `opportunities` | None. Bare number; readout `String` ("3") | Mostly. The hint says workflows, but the box shows just "3" | `AI opportunities` | `Workflows AI could take on. Count each one once.` | `{ after: "workflows" }`, spoken "AI opportunities, in workflows" | `` (n) => `${n} workflow${n === 1 ? "" : "s"}` `` |
| `monthlyValue` | None visible. Bare "10000"; dollars only in `aria-valuetext` | No. No $, no time period, and "Hours saved" in the hint points to hours | `Value of each workflow` | `Your average, in dollars. Count hours saved times what they cost, plus revenue or errors.` | `{ dollars: true, after: "per workflow a month" }`, spoken "Value of each workflow, in dollars per workflow a month" | `` (n) => `${formatUsd(n)} per workflow a month` `` |
| `lagMonths` | None visible. Readout "6 mo" | Partly. The label says months; the readout is abbreviated | `Months you wait to start` | `Each month you wait pushes back the value by a month.` | `{ after: "months" }`, spoken "Months you wait to start, in months" (redundant but harmless; or keep the label as `Wait before you start`) | `formatMonths` ("1 month", "6 months") |

Hint conflicts with the unit:
- `monthlyValue`: "Hours saved" conflicts with dollars. Nothing says per month or per workflow, and nothing says average versus total (H1, H2).
- `lagMonths`: the hint is fine ("How long you expect to wait"), but it conflicts with the FAQ's "until you'd go live" (H3).
- `opportunities`: no conflict.
