# AI ROI calculator: plain-language and units review

Reviewer: Claude (copywriter agent). Source: `bundle.md` in `.docs/canonical/reviews/ai-roi-panel/`.
Reader: a CEO, founder or technology leader building a business case, often not a finance person.

I checked the defaults against the formulas in `ai-roi.ts`. The worked example figures match: costs $596,500, dip $330,000, investment $926,500, value $825,000, year one -$101,500, payback 13.1 months, year two $983,500, break-even 14.04%.

---

## High

### H1. "Investment" and "costs" include lost output, but they read as cash spend
- **Location:** result "First-year investment"; share line ("costs about $926,500 in year one"); worked example ("Year one costs $926,500"); "How we keep the dip small" ("The default case spends $926,500").
- **Problem:** $330,000 of the $926,500 is the dip. That is output lost to slower work, not money paid out. A CEO will read "spends $926,500" as budget and take that figure to the CFO. The CFO will then find that only $596,500 is cash. That costs the tool its credibility.
- **Proposed:**
  - Result label: "Year-one cost (spend + lost output)". Better still, show two lines under it: "Spend on tools, training and platform: $596,500" and "Output lost while learning: $330,000". The formula already has `hardCosts` and `dipCost`.
  - Worked example: "Year one costs $926,500: $596,500 of spend and $330,000 of output lost while people learn."
  - Dip section: "The default case commits $596,500 of spend, and gives up $330,000 of output, before anyone knows whether 12.5% is true for your work."
  - Share line: "...costs about $926,500 in year one, including $330,000 of output lost while people learn, and..."

### H2. The "Time AI saves" hint uses a different unit from the control
- **Location:** control `timeSaved`, hint "Net of reviewing AI output. DORA cites 40 to 150 minutes a day".
- **Problem:** The control is a % of work time, but the hint gives minutes a day. The reader has to convert in their head. They may also type "40" and get 40% instead of about 8%. "Net of" is finance jargon. The DORA figure has no link or source on the control, which breaks the no-uncited-numbers rule.
- **Proposed:** label "Time AI saves each person". Hint: "% of work time, after checking AI's work. 1 hour a day is about 12%." The 12% assumes an 8-hour day (60 ÷ 480 = 12.5%). If the DORA range stays, convert it and cite it on the page, not in the hint: "DORA reports 40 to 150 minutes a day, about 8% to 31% of an 8-hour day [link]."

### H3. Every number box shows a bare number with no unit
- **Location:** `ToolField.tsx`, the number input next to each label. Its aria-label is "<label>, exact value".
- **Problem:** "176000", "12.5", "330", "100000" and "3" all look alike. The reader can't tell dollars from percent from months, or a per-person figure from a whole-team one. Screen readers get no unit from the box either, and the slider readout for team size is a bare "50".
- **Proposed:** add a `unit` field to `FieldSpec`. Show it as visible text next to the box ("$" before the box, "per person / year" after it). Add it to the box's aria-label, for example "Cost per person, in dollars per year". Set team's `format` to `` (n) => `${n} people` ``. The table at the end lists the exact text for each control.

### H4. "Capacity freed" is jargon, and it is the number the whole result rests on
- **Location:** result "Capacity freed in year one"; share line "frees about $825,000 of capacity"; page formula list; worked example; page description.
- **Problem:** "Capacity" is ops language. A founder won't know it means "the value of the time saved, priced at what those people cost". The note under the results then says "capacity, not cash", which brings in a second abstract idea.
- **Proposed:** use "Value of time saved" everywhere. Result: "Value of time saved in year one". Share line: "...and saves time worth about $825,000". Formula: "**Value of time saved** = people × cost per person × % of time saved, for the months after the dip only."

---

## Medium

### M1. Year one and year two are named four different ways
- **Location:** results ("First-year net benefit", "First-year investment", "Capacity freed in year one", "Year-two net benefit"); share line and page ("year one", "year two").
- **Problem:** "First-year" and "year one" mean the same thing, so the change of wording makes the reader wonder whether they differ. The order is also odd: year two sits between the year-one headline and the year-one parts it is built from.
- **Proposed:** use "Year one" and "Year two" only. Order the results like this: "Year one: net gain or loss" (primary), "Year-one cost", "Value of time saved in year one", "Year-one return", "Payback time", then "Year two: net gain or loss".

### M2. A negative headline number shows only as a minus sign
- **Location:** primary result. It shows "-$101,500" with the default inputs.
- **Problem:** A small minus sign in front of a big number is easy to miss. With the defaults it is the first thing the reader sees.
- **Proposed:** call it "Year one: net gain or loss" and show "$101,500 behind" or "$101,500 ahead" as the value. That matches the share line's wording.

### M3. "n/a" covers different cases and explains none of them
- **Location:** results "Return on investment" and "Payback"; method paragraph ("we show n/a").
- **Problem:** "n/a" is jargon, and it appears for different reasons: no cost, or no time saved. The reader can't tell which input caused it.
- **Proposed:** ROI with zero cost: "No cost entered". Payback with zero time saved: "Never: no time saved". Payback with zero cost: "Nothing to pay back". Method paragraph: "If there is nothing to divide by, such as zero cost, we say so instead of showing a number."

### M4. The "Productivity dip" controls don't say what the % is a share of, or why it costs money
- **Location:** controls `dipPercent` and `dipMonths`; formula list; worked example ("Output dips 15%").
- **Problem:** The reader can't tell whether 15% is of output, of time, or of team size. "Dip" is never defined on the control. The months hint ("No time counts as saved until it ends") is accurate but reads like a rule, not a description. The slider readout "3 mo" is an abbreviation.
- **Proposed:** see the units table. Define the dip once on the page: "The dip is the output a team loses while it learns new tools. We price it at what those people cost." Change the readout to "3 months".

### M5. The training and infrastructure units are unclear (one-off or yearly, per person or whole team)
- **Location:** controls `trainingPerPerson` and `infrastructure`.
- **Problem:** Training is year one only, because year two drops it, but the hint doesn't say so. Infrastructure is a yearly cost for the whole team, while the two controls next to it are per person. "Infrastructure" is vague. "Time spent learning is in the dip" is shorthand the reader can't decode.
- **Proposed:** see the units table. Training hint: "Courses and coaching, paid once. Learning time goes in the dip below." Infrastructure label: "Platform and security".

### M6. "Fully loaded" is finance jargon
- **Location:** `salary` hint; worked example ("$176,000 a person, fully loaded").
- **Proposed:** hint "Pay plus taxes, benefits and overhead". Worked example: "Each person costs $176,000 a year, counting pay, taxes, benefits and overhead."

### M7. The note under the results has an unclear "this" and a colon-joined sentence
- **Location:** "Freed time is capacity, not cash: it's worth this only if it goes to work you'd otherwise pay for."
- **Problem:** "this" could refer to the headline, the investment or the capacity figure. The colon makes it hard to read.
- **Proposed:** "Year one breaks even if AI saves about 14% of each person's time. Time saved is not cash. It is worth this much only if you put it into work you would otherwise pay for."

### M8. The FAQ's ROI answer leaves out the dip-months rule that the method uses
- **Location:** FAQ "How do you calculate the ROI of AI?"
- **Problem:** The FAQ says capacity = "people × cost per person × the share of time AI saves", with no mention of the months after the dip. That contradicts the method section and the calculator's own result. A reader who checks it by hand will get $1,100,000, not $825,000.
- **Proposed:** "Then work out what the time saved is worth: people × cost per person × % of time saved, counted only for the months after the dip."

### M9. The share line's positive case piles up phrases
- **Location:** `aiRoiLine`, positive branch: "...frees about $X of capacity: a net $Y, a Z% return, paid back in about N months."
- **Problem:** That is three phrases in a row after a colon, with no verb. It reads poorly when pasted into a slide.
- **Proposed:** "Rolling AI out to our 50-person team costs about $X in year one and saves time worth about $V. Year one comes out about $Y ahead, a Z% return, and it pays back in about N months."

---

## Low

### L1. The team hint says "in scope" and "Defaults fit a software team"
- **Proposed:** "Everyone who will use AI. Starting values assume a software team."

### L2. The CTA wording doesn't match the page
- **Location:** results CTA "Get a validated business case"; page CTA "Book a working session".
- **Problem:** "Validated" is vague, and two names for the same next step make it look like two offers.
- **Proposed:** "Test these numbers in a working session".

### L3. The privacy note says inputs are "kept in this page's link"
- **Location:** `ShareActions` footer note; method paragraph.
- **Proposed:** "Estimate only, not financial advice. Your numbers are saved in this page's web address, so anyone you send the link to can see them."

### L4. The method paragraph is long and mixes three topics
- **Location:** "The costs and the starting values follow DORA's..." paragraph.
- **Proposed:** split it into three short paragraphs: (1) the source, DORA, and the 50 vs 500 team size; (2) how we differ from DORA, with time saved counted only after the dip and year two added; (3) privacy, where the math runs in your browser and the link holds your numbers.

### L5. The dip section's "Most of the year-one loss comes from that" is not quantified
- **Problem:** It is a superlative claim with no number next to it. The page already has the number.
- **Proposed:** "With the defaults, the dip costs $330,000, more than three times the $101,500 year-one shortfall."

### L6. The break-even note can say "0%" in an edge case
- **Location:** `breakEven` when the investment is $0.
- **Proposed:** if `breakEvenTimeSaved === 0`, show "With no costs, any time saved is a gain." The 12-month dip message is fine, but simpler: "The dip lasts all year, so year one can't break even."

### L7. "Payback" doesn't say when the clock starts
- **Proposed:** result label "Payback time (from rollout)". This matters because payback includes the dip months.

---

## Per-control units table

"Unit clear at a glance?" judges the label, the hint and the bare number box together, as they appear today.

| # | Control (key) | Actual unit | Clear at a glance today? | Proposed label | Proposed hint (one line) | Visible unit text | Slider readout (`format`) |
|---|---|---|---|---|---|---|---|
| 1 | `team` | people (count) | Mostly. "People" is in the label, but the box shows a bare "50". | People using AI | Everyone who will use AI. Starting values assume a software team. | suffix "people" | `50 people` |
| 2 | `salary` | US dollars per person per year, fully loaded | No. "Per year" is buried at the end of the hint, and the box shows "176000". | Yearly cost per person | Pay plus taxes, benefits and overhead. | prefix "$", suffix "per person / year" | `$176,000 per person a year` |
| 3 | `timeSaved` | % of each person's work time, after the dip | No. **The hint contradicts the unit** by giving minutes a day. | Time AI saves each person | % of work time, after checking AI's work. 1 hour a day is about 12%. | suffix "% of work time" | `12.5% of work time` |
| 4 | `toolsPerPerson` | US dollars per person per year (repeats in year two) | Partly. "Per person" is in the label and "per year" in the hint, but the box shows "330". | AI tools per person | Seats and usage fees. Paid every year. | prefix "$", suffix "per person / year" | `$330 per person a year` |
| 5 | `trainingPerPerson` | US dollars per person, one-off in year one | No. The hint doesn't say it is one-off, and "is in the dip" is unclear. | Training per person | Courses and coaching, paid once. Learning time goes in the dip below. | prefix "$", suffix "per person, one-off" | `$9,600 per person, one-off` |
| 6 | `infrastructure` | US dollars per year, whole team (repeats in year two) | No. Next to two per-person controls, a reader may assume this is per person too. | Platform and security | Data, hosting and security for the whole team. | prefix "$", suffix "per year, whole team" | `$100,000 a year, whole team` |
| 7 | `dipPercent` | % of each person's output lost during the dip months | No. It doesn't say what it is a % of, and "dip" is undefined. | Output lost while learning | How much slower people work at first. | suffix "% of output" | `15% of output` |
| 8 | `dipMonths` | months (whole, 0 to 12) | Partly. "Months" is in the label, but the readout says "mo" and the box is bare. | How long the slowdown lasts | No time saved is counted until it ends. | suffix "months" | `3 months` |

### Notes on the table
- Control 3 is the only hint that **contradicts** its unit. Controls 5 and 6 don't contradict theirs, but they leave out whether the cost is one-off or yearly and whether it is per person or for the whole team. That changes how a reader fills them in.
- If the term "dip" stays, use it in exactly one control label and define it there. Use the same word on the page and in the share line. If the labels change to "Output lost while learning" and "How long the slowdown lasts", rename the page heading and FAQ to "learning slowdown" too, so the reader sees one name for one idea.
- Put the unit in the number box's aria-label as well, for example "Yearly cost per person, in dollars", so screen-reader users get it from the box and not only from the slider.
