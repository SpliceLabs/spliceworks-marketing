---
url: /tools/ai-roi-calculator
title: "AI ROI Calculator: Will AI Pay for Itself in Year One? | Splice Works"
description: "Work out the first-year return on rolling AI out to your team: cost, capacity freed, ROI and payback. Free calculator built on DORA's open method."
reader: "A CEO, founder or technology leader building the business case for an AI rollout"
job: "Get a defensible first-year number, then test it in a working session"
decision: "Will AI pay for itself in year one?"
prompts: ["AI ROI calculator", "how to calculate the ROI of AI", "is AI worth the investment for my team", "how long does AI take to pay back", "how much time does AI save developers", "business case for AI rollout"]
primary_cta: "Book a working session → /book"
status: draft
sources: ["Lead-magnet tools assessment 2026-10-29 (Tool A, teaser scope)", "DORA AI ROI calculator, calculations.js (cost and capacity terms, defaults)", "FAQ: Working out the ROI of AI"]
open: ["New page: founders confirm the copy and the FAQ answers", "Named reviewer for the method (authority line)"]
---

# Will AI pay for itself in year one?

Rolling AI out costs money before it saves any: tools, training, and a dip in output while people learn. Put those costs next to the time AI frees and you get a first-year return you can defend.

## How the number is built

- **Investment** = (AI tools + training per person) × people + infrastructure + the productivity dip
- **Productivity dip** = people × cost per person × dip % × (months it lasts ÷ 12)
- **Capacity freed** = people × cost per person × share of time saved, counted only for the months after the dip
- **Net benefit** = capacity freed − investment
- **ROI** = net benefit ÷ investment, and **payback** = the dip's months + investment ÷ monthly capacity freed
- **Year two** = a full year of capacity freed − AI tools − infrastructure, with no training and no dip
- **Break-even** = the share of time AI must save for year one to come out even

The costs and the starting values follow [DORA's AI ROI calculator](https://dora.dev/ai/roi/calculator/), which publishes its formulas in the open. We start from a team of 50 rather than DORA's 500. The biggest difference: DORA counts a full year of time saved on top of the dip, while we count time saved only once the dip is over, because a team can't be slower and faster in the same months. That makes year one lower and payback later than DORA's, so we add year two to show where the return comes from. Two smaller differences: time saved can't go below zero, and where there's nothing to divide by we show n/a rather than a number. The math runs in your browser. Your inputs are kept in the page link so you can share the result, which means anyone who opens that link, including the site's host, can see them.

Updated 29 Oct 2026 · Splice Works

## A worked example

A 50-person team costs $176,000 a person, fully loaded. AI tools run $330 a person a year, training $9,600 a person, and infrastructure $100,000. Output dips 15% for 3 months. Year one costs $926,500. Saving 12.5% of each person's time frees $825,000 of capacity in the nine months after the dip, so year one comes out $101,500 behind. Payback comes in about 13 months, and year two nets about $983,500, because the training and the dip don't repeat. Year one would break even at about 14% time saved.

## What the number leaves out

It's an estimate, not financial advice. It counts freed capacity only, and it holds every rate flat into year two. It doesn't include:

- revenue from shipping more, sooner
- fewer outages and faster recovery
- the cost of managing the change, governing AI use and reviewing more code
- tool prices or time saved that change after year one

DORA's full calculator models the first two. Capacity is also only worth money if you put it to work, so decide where the time goes. Then test the time-saved figure, the one that moves the answer most, on one of your real workflows.

## How we keep the dip small

The calculator puts your whole team through the dip at once, for three months. That's a big-bang rollout: everyone gets new tools on the same day and works out alone what to do with them. Most of the year-one loss comes from that. We don't roll AI out that way.

- **Start in one place.** We pick one workflow and the few people who own it. Only they go through the dip. Everyone else keeps working as they do today.
- **See it working on day one.** In one focused day we build a working prototype of that workflow with you, so the learning starts right away and the dip stays short.
- **Learn while it's cheap.** The first workflow is an experiment. We measure the time it really saves and fix what doesn't work while the stakes are small. Your measured number replaces the calculator's default.
- **Then speed up.** Each next workflow lands faster, because the setup is in place and your people have seen one work. Confidence comes from a result, not a training course.

There's a trade-off, and a CFO will spot it: starting small means the rest of the team gets its gains later. What you get in return is a dip that costs a fraction of the default, and a real time-saved number before you commit the full budget. The default case spends $926,500 before anyone knows whether 12.5% is true for your work. We'd rather you find out on one workflow first.

We don't model this in the calculator. We'll publish the numbers once we can show them from client work. [How it works](/how-it-works)

## Questions about AI ROI

### How do you calculate the ROI of AI?

Add up what the rollout costs in year one: tools, training, infrastructure and the dip in output while people learn. Then work out the capacity it frees: people × cost per person × the share of time AI saves. Net benefit is that capacity minus the cost, and ROI is net benefit divided by the cost. [Run the numbers](/tools/ai-roi-calculator).

### Is time saved by AI real money?

Only if you use it. Freed hours become money when they go into work you'd otherwise hire for, ship later or not do at all. If nobody decides where the time goes, it disappears into the week. Name the work it goes to before you count it.

### How much time does AI really save?

It depends on the work, so measure one workflow before you commit. Our calculator starts at 12.5% of each person's time, the default in DORA's AI ROI calculator. Treat that as a starting point, not a promise, and use your own number once you have it.

### Why does AI make teams slower before they get faster?

People need time to learn new tools and change how they work, so output dips first. That dip is a real cost, and it belongs in the business case. Keep it short by starting with one workflow and the people who own it.

### How do you keep the productivity dip small?

Don't put everyone through it at once. Start with one workflow and the few people who own it, build a working prototype of it in one focused day, and measure what it really saves. Then roll out to the next team, faster each time. The rest of the team gets its gains later, but you find out what AI saves before you commit the full budget.

### How long does AI take to pay back?

Divide the first-year cost by the monthly value of the time it frees, then add the months the dip lasts, since nothing is saved until it ends. With our calculator's defaults, a 50-person team pays back in about 13 months. Your own numbers will move that a lot, which is why we test them on a real workflow.

More answers in the [FAQ](/faq).

## Bring your business case to a working session

We'll test your numbers on one of your real workflows and tell you what it would take to hit them.

**Book a working session** → /book
Credited in full against your engagement.
