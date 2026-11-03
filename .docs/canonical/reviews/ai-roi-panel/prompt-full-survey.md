You are a senior quantitative survey and measurement designer who also builds financial models for business cases. Review the AI ROI calculator on a B2B marketing site (spliceworks.ai/tools/ai-roi-calculator). The reader is a CEO, founder or technology leader building a business case for an AI rollout. The full source (controls, formulas, results copy, page copy) is in the bundle below.

Review critically for:
1. Validity: do the formulas measure what the labels claim? Hidden assumptions, double counting, missing terms, boundary cases (0 time saved, 12-month dip, tiny team), whether ROI/payback/year-two/break-even are computed and described consistently.
2. Coherence: do the controls, results, worked example, method bullets and FAQ agree with each other and with the code? Check the worked example's arithmetic against the formulas.
3. Signal quality: which inputs will respondents misreport or misunderstand (e.g. unit confusion, fully loaded cost, net vs gross time saved, per person vs total, per year vs one-off)? Where do defaults anchor? Which inputs dominate the answer (sensitivity), and is that surfaced? Are slider ranges and steps sensible?
4. Units: for EACH control, state what unit it is in today as shown to the user (label, hint, slider readout, number box), whether that is unambiguous, and propose an exact label + hint + displayed unit. Note the number box shows a bare number with no unit.
5. Claims: flag any claim that looks uncited or wrong (e.g. the DORA "40 to 150 minutes a day" hint).

Output markdown: findings ranked by severity (High/Medium/Low), each with location, problem, concrete fix. Then a per-control units table. Be specific and terse. Do not rewrite the whole page.
# AI ROI calculator: source bundle

## src/components/tools/AiRoiCalculator.tsx
```
"use client";

import { AI_ROI, type AiRoiInputs } from "@/lib/tools/ai-roi";
import { formatUsd } from "@/lib/tools/format";
import { AiRoiResults } from "./AiRoiResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

type Field = FieldSpec<keyof AiRoiInputs>;

const percent = (n: number) => `${n}%`;

const GROUPS: readonly (readonly [string, readonly Field[]])[] = [
  [
    "Your team",
    [
      {
        key: "team",
        label: "People using AI",
        hint: "Everyone in scope. Defaults fit a software team",
        format: String,
      },
      {
        key: "salary",
        label: "Cost per person",
        hint: "Fully loaded: pay plus tax, benefits and overhead, per year",
        format: formatUsd,
      },
      {
        key: "timeSaved",
        label: "Time AI saves",
        hint: "Net of reviewing AI output. DORA cites 40 to 150 minutes a day",
        format: percent,
      },
    ],
  ],
  [
    "What it costs",
    [
      {
        key: "toolsPerPerson",
        label: "AI tools per person",
        hint: "Seats plus usage-based fees, per year",
        format: formatUsd,
      },
      {
        key: "trainingPerPerson",
        label: "Training per person",
        hint: "Courses and coaching. Time spent learning is in the dip",
        format: formatUsd,
      },
      {
        key: "infrastructure",
        label: "Infrastructure",
        hint: "Platform, data and security, per year",
        format: formatUsd,
      },
      {
        key: "dipPercent",
        label: "Productivity dip",
        hint: "Output lost while people learn new ways of working",
        format: percent,
      },
      {
        key: "dipMonths",
        label: "Months the dip lasts",
        hint: "No time counts as saved until it ends",
        format: (n) => `${n} mo`,
      },
    ],
  ],
];

export function AiRoiCalculator() {
  const { inputs, set } = useUrlInputs(AI_ROI);

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="AI ROI inputs" onSubmit={(e) => e.preventDefault()}>
        {GROUPS.map(([legend, fields]) => (
          <fieldset key={legend} className={styles.group}>
            <legend className={styles.legend}>{legend}</legend>
            {fields.map((field) => (
              <ToolField
                key={field.key}
                field={field}
                range={AI_ROI.ranges[field.key]}
                value={inputs[field.key]}
                onChange={(v) => set(field.key, v)}
              />
            ))}
          </fieldset>
        ))}
      </form>
      <AiRoiResults inputs={inputs} />
    </div>
  );
}
```

## src/components/tools/AiRoiResults.tsx
```
import { aiRoi, aiRoiLine, type AiRoiInputs } from "@/lib/tools/ai-roi";
import { formatMonths, formatPercent, formatUsd } from "@/lib/tools/format";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

const breakEven = (timeSaved: number | null) =>
  timeSaved === null
    ? "The dip lasts the whole year, so year one can't break even."
    : `Year one breaks even if AI saves about ${formatPercent(timeSaved / 100)} of each person's time.`;

/** Net benefit up front, then the parts it's built from. */
export function AiRoiResults({ inputs }: Readonly<{ inputs: AiRoiInputs }>) {
  const r = aiRoi(inputs);
  const figures: readonly (readonly [string, string])[] = [
    ["Year-two net benefit", formatUsd(r.yearTwoBenefit)],
    ["First-year investment", formatUsd(r.investment)],
    ["Capacity freed in year one", formatUsd(r.value)],
    ["Return on investment", r.roi === null ? "n/a" : formatPercent(r.roi)],
    ["Payback", r.paybackMonths === null ? "n/a" : formatMonths(r.paybackMonths)],
  ];

  return (
    <div className={styles.results}>
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>First-year net benefit</dt>
          <dd className={styles.primary} aria-live="polite">
            {formatUsd(r.benefit)}
          </dd>
        </div>
        {figures.map(([term, value]) => (
          <div key={term} className={styles.figure}>
            <dt>{term}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      <p className={styles.note}>
        {breakEven(r.breakEvenTimeSaved)} Freed time is capacity, not cash: it&rsquo;s worth this only if it goes to
        work you&rsquo;d otherwise pay for.
      </p>
      <ShareActions line={aiRoiLine(inputs)} cta="Get a validated business case" />
    </div>
  );
}
```

## src/components/tools/ToolField.tsx
```
import { useId, useState, type KeyboardEvent } from "react";
import type { Range } from "@/lib/tools/inputs";
import styles from "./Calculator.module.css";

export type FieldSpec<K extends string> = Readonly<{
  key: K;
  label: string;
  hint: string;
  format: (n: number) => string;
}>;

type Props = Readonly<{ field: FieldSpec<string>; range: Range; value: number; onChange: (value: number) => void }>;

/** A slider plus an exact-value box. Typed values apply on blur or Enter, so a half-typed number isn't clamped mid-entry. */
export function ToolField({ field: { label, hint, format }, range, value, onChange }: Props) {
  const id = useId();
  // What's being typed; null shows the committed value.
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft !== null) onChange(Number(draft));
    setDraft(null);
  };
  const commitOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commit();
  };

  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          type="number"
          className={styles.number}
          aria-label={`${label}, exact value`}
          {...range}
          value={draft ?? value}
          onChange={(e) => setDraft(e.currentTarget.value)}
          onBlur={commit}
          onKeyDown={commitOnEnter}
        />
      </div>
      <input
        id={id}
        type="range"
        className={styles.range}
        {...range}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
      <p className={styles.hint}>{hint}</p>
    </div>
  );
}
```

## src/components/tools/ShareActions.tsx
```
import Link from "next/link";
import { useState } from "react";
import styles from "./Calculator.module.css";

type Copied = Readonly<{ what: "line" | "link"; line: string }> | null;

/** The line to paste, buttons to copy it or the link, and the next step. */
export function ShareActions({ line, cta }: Readonly<{ line: string; cta: string }>) {
  const [copied, setCopied] = useState<Copied>(null);
  // "Copied" holds only while the numbers it was copied for are still showing.
  const shown = copied?.line === line ? copied.what : null;
  const copy = (what: "line" | "link", text: string) =>
    navigator.clipboard.writeText(text).then(
      () => setCopied({ what, line }),
      () => setCopied(null),
    );

  return (
    <>
      <blockquote className={styles.line}>{line}</blockquote>
      <div className={styles.actions}>
        <button type="button" className="btn btn-secondary" onClick={() => copy("line", line)}>
          {shown === "line" ? "Copied" : "Copy this line"}
        </button>
        <button type="button" className="btn btn-quiet" onClick={() => copy("link", window.location.href)}>
          {shown === "link" ? "Link copied" : "Copy link to these numbers"}
        </button>
      </div>

      <div className={styles.cta}>
        <Link href="/book" className="btn btn-primary">
          {cta} <span aria-hidden="true">→</span>
        </Link>
        <p className={styles.note}>
          Estimate only, not financial advice. Your inputs are kept in this page&rsquo;s link.
        </p>
      </div>
    </>
  );
}
```

## src/lib/tools/ai-roi.ts
```
/**
 * AI ROI: first-year return on rolling AI out to a team. Costs follow DORA's
 * open AI ROI calculator (dora.dev/ai/roi/calculator). Unlike DORA, time saved
 * only counts once the productivity dip is over.
 * Pure functions, shared by the calculator, its server-rendered default
 * result and the shareable link.
 */
import { formatMonths, formatPercent, formatUsd } from "./format";
import { inputCodec, type ToolInputs } from "./inputs";

export type AiRoiInputs = ToolInputs<
  | "team"
  | "salary"
  | "timeSaved"
  | "toolsPerPerson"
  | "trainingPerPerson"
  | "infrastructure"
  | "dipPercent"
  | "dipMonths"
>;

export type AiRoiResult = Readonly<{
  hardCosts: number;
  dipCost: number;
  investment: number;
  /** Capacity freed in year one, after the dip. */
  value: number;
  benefit: number;
  /** null when there is no investment to divide by. */
  roi: number | null;
  /** null when the rollout returns no value or costs nothing. */
  paybackMonths: number | null;
  /** A full year of time saved, less tools and infrastructure: no training, no dip. */
  yearTwoBenefit: number;
  /** Time saved, in percent, at which year one breaks even. null when the dip fills the year. */
  breakEvenTimeSaved: number | null;
}>;

export const AI_ROI = inputCodec({
  ranges: {
    team: { min: 1, max: 2_000, step: 1 },
    salary: { min: 40_000, max: 400_000, step: 1_000 },
    timeSaved: { min: 0, max: 50, step: 0.5 },
    toolsPerPerson: { min: 0, max: 10_000, step: 10 },
    trainingPerPerson: { min: 0, max: 20_000, step: 100 },
    infrastructure: { min: 0, max: 2_000_000, step: 5_000 },
    dipPercent: { min: 0, max: 50, step: 1 },
    dipMonths: { min: 0, max: 12, step: 1 },
  },
  defaults: {
    team: 50,
    salary: 176_000,
    timeSaved: 12.5,
    toolsPerPerson: 330,
    trainingPerPerson: 9_600,
    infrastructure: 100_000,
    dipPercent: 15,
    dipMonths: 3,
  },
  queryKeys: {
    team: "t",
    salary: "s",
    timeSaved: "p",
    toolsPerPerson: "a",
    trainingPerPerson: "r",
    infrastructure: "i",
    dipPercent: "d",
    dipMonths: "m",
  },
});

export const aiRoi = (raw: AiRoiInputs): AiRoiResult => {
  const i = AI_ROI.sanitize(raw);
  const hardCosts = (i.toolsPerPerson + i.trainingPerPerson) * i.team + i.infrastructure;
  const dipCost = i.team * i.salary * (i.dipPercent / 100) * (i.dipMonths / 12);
  const investment = hardCosts + dipCost;
  const valuePerMonth = (i.team * i.salary * (i.timeSaved / 100)) / 12;
  const gainMonths = 12 - i.dipMonths;
  const value = valuePerMonth * gainMonths;
  const benefit = value - investment;
  return {
    hardCosts,
    dipCost,
    investment,
    value,
    benefit,
    roi: investment > 0 ? benefit / investment : null,
    paybackMonths: valuePerMonth > 0 && investment > 0 ? i.dipMonths + investment / valuePerMonth : null,
    yearTwoBenefit: valuePerMonth * 12 - (i.toolsPerPerson * i.team + i.infrastructure),
    breakEvenTimeSaved: gainMonths > 0 ? (investment / (i.team * i.salary * (gainMonths / 12))) * 100 : null,
  };
};

/** One sentence for a board deck. */
export const aiRoiLine = (inputs: AiRoiInputs): string => {
  const { team } = AI_ROI.sanitize(inputs);
  const { investment, value, benefit, roi, paybackMonths, yearTwoBenefit } = aiRoi(inputs);
  const opening = `Rolling AI out to our ${team}-person team costs about ${formatUsd(investment)} in year one and frees about ${formatUsd(value)} of capacity`;
  if (benefit < 0) {
    const yearTwo = (year: "Year" | "year") =>
      yearTwoBenefit < 0
        ? `${year} two is still about ${formatUsd(-yearTwoBenefit)} behind`
        : `${year} two nets about ${formatUsd(yearTwoBenefit)}`;
    const later =
      paybackMonths === null
        ? `${yearTwo("Year")}.`
        : `Payback comes in about ${formatMonths(paybackMonths)}, and ${yearTwo("year")}.`;
    return `${opening}, so year one comes out about ${formatUsd(-benefit)} behind. ${later}`;
  }
  const payback = paybackMonths === null ? "" : `, paid back in about ${formatMonths(paybackMonths)}`;
  const pct = roi === null ? "" : `, a ${formatPercent(roi)} return`;
  return `${opening}: a net ${formatUsd(benefit)}${pct}${payback}.`;
};
```

## src/lib/tools/format.ts
```
export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const formatPercent = (fraction: number): string => `${Math.round(fraction * 100)}%`;

/** Whole months, at least one. */
export const formatMonths = (n: number): string => {
  const whole = Math.max(1, Math.round(n));
  return `${whole} month${whole === 1 ? "" : "s"}`;
};
```

## content/v5/pages/tools/ai-roi-calculator.md
```
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
A paid day, credited in full if you go on to work with us.
```
