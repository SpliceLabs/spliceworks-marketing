You are a senior quantitative survey and measurement designer who also builds financial models for business cases. Review the AI cost of delay calculator on a B2B marketing site (spliceworks.ai/tools/ai-cost-of-delay). The reader is a CEO, founder or technology leader deciding whether to start on AI now or wait, and making that case to a CEO or board. The full source (controls, formulas, results copy, page copy, FAQ answers) is in the bundle below.

Review critically for:
1. Validity: do the formulas measure what the labels claim? Hidden assumptions, double counting, missing terms, boundary cases (0 time saved, 12-month dip, tiny team), whether every result is computed and described consistently.
2. Coherence: do the controls, results, worked example, method bullets and FAQ agree with each other and with the code? Check the worked example's arithmetic against the formulas.
3. Signal quality: which inputs will respondents misreport or misunderstand (e.g. unit confusion, per workflow vs total, per month vs per year, gross vs net value, how to put a monthly value on a workflow)? Where do defaults anchor? Which inputs dominate the answer (sensitivity), and is that surfaced? Are slider ranges and steps sensible?
4. Units: for EACH control, state what unit it is in today as shown to the user (label, hint, slider readout, number box), whether that is unambiguous, and propose an exact label + hint + displayed unit. Note the number box shows a bare number with no unit.
5. Claims: flag any claim that looks uncited or wrong.

Output markdown: findings ranked by severity (High/Medium/Low), each with location, problem, concrete fix. Then a per-control units table. Be specific and terse. Do not rewrite the whole page.
# AI cost of delay calculator: source bundle

## src/components/tools/CostOfDelayCalculator.tsx
```
"use client";

import { COST_OF_DELAY, formatUsd, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { CostOfDelayResults } from "./CostOfDelayResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

const FIELDS: readonly FieldSpec<keyof CostOfDelayInputs>[] = [
  { key: "opportunities", label: "AI opportunities", hint: "Workflows AI could take on", format: String },
  {
    key: "monthlyValue",
    label: "Monthly value of each",
    hint: "Hours saved, revenue sooner, errors avoided",
    format: formatUsd,
  },
  { key: "lagMonths", label: "Months until you start", hint: "How long you expect to wait", format: (n) => `${n} mo` },
];

export function CostOfDelayCalculator() {
  const { inputs, set } = useUrlInputs(COST_OF_DELAY);

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="Cost of delay inputs" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((field) => (
          <ToolField
            key={field.key}
            field={field}
            range={COST_OF_DELAY.ranges[field.key]}
            value={inputs[field.key]}
            onChange={(v) => set(field.key, v)}
          />
        ))}
      </form>
      <CostOfDelayResults inputs={inputs} />
    </div>
  );
}
```

## src/components/tools/CostOfDelayResults.tsx
```
import { costOfDelay, execLine, formatUsd, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { ShareActions } from "./ShareActions";
import styles from "./Calculator.module.css";

/** The three figures, the line to paste, and the next step. */
export function CostOfDelayResults({ inputs }: Readonly<{ inputs: CostOfDelayInputs }>) {
  const result = costOfDelay(inputs);

  return (
    <div className={styles.results}>
      <dl className={styles.figures}>
        <div className={styles.figure}>
          <dt>Every month you wait</dt>
          <dd className={styles.primary} aria-live="polite">
            {formatUsd(result.monthly)}
          </dd>
        </div>
        <div className={styles.figure}>
          <dt>Over {inputs.lagMonths} months</dt>
          <dd>{formatUsd(result.cumulative)}</dd>
        </div>
        <div className={styles.figure}>
          <dt>Conservative case</dt>
          <dd>{formatUsd(result.conservative)}</dd>
        </div>
      </dl>
      <ShareActions line={execLine(inputs)} cta="Test this number in a working session" />
    </div>
  );
}
```

## src/components/tools/ToolField.tsx
```
import { useId, useState, type KeyboardEvent } from "react";
import type { Range } from "@/lib/tools/inputs";
import styles from "./Calculator.module.css";

/** Shown either side of the number box, e.g. "$" and "per person a year". */
export type Unit = Readonly<{ dollars?: boolean; after: string }>;

export type FieldSpec<K extends string> = Readonly<{
  key: K;
  label: string;
  hint: string;
  format: (n: number) => string;
  unit?: Unit;
}>;

const spoken = (unit: Unit) => `in ${unit.dollars ? "dollars " : ""}${unit.after}`;

type Props = Readonly<{ field: FieldSpec<string>; range: Range; value: number; onChange: (value: number) => void }>;

/** A slider plus an exact-value box. Typed values apply on blur or Enter, so a half-typed number isn't clamped mid-entry. */
export function ToolField({ field: { label, hint, format, unit }, range, value, onChange }: Props) {
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
        <span className={styles.entry}>
          {unit?.dollars && <span aria-hidden="true">$</span>}
          <input
            type="number"
            className={styles.number}
            aria-label={`${label}, ${unit ? spoken(unit) : "exact value"}`}
            {...range}
            value={draft ?? value}
            onChange={(e) => setDraft(e.currentTarget.value)}
            onBlur={commit}
            onKeyDown={commitOnEnter}
          />
          {unit && (
            <span className={styles.unit} aria-hidden="true">
              {unit.after}
            </span>
          )}
        </span>
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
          Estimate only, not financial advice. Your numbers are saved in this page&rsquo;s web address, so anyone you
          send the link to can see them.
        </p>
      </div>
    </>
  );
}
```

## src/lib/tools/cost-of-delay.ts
```
/**
 * AI cost of delay: what each month of waiting on AI costs, before any
 * implementation spend. Pure functions, shared by the calculator, its
 * server-rendered default result and the shareable link.
 */

import { formatUsd } from "./format";
import { inputCodec, type ToolInputs } from "./inputs";

export type CostOfDelayInputs = ToolInputs<"opportunities" | "monthlyValue" | "lagMonths">;

export type CostOfDelayResult = Readonly<{
  monthly: number;
  cumulative: number;
  conservative: number;
}>;

export const COST_OF_DELAY = inputCodec({
  ranges: {
    opportunities: { min: 1, max: 10, step: 1 },
    monthlyValue: { min: 500, max: 500_000, step: 500 },
    lagMonths: { min: 1, max: 24, step: 1 },
  },
  defaults: { opportunities: 3, monthlyValue: 10_000, lagMonths: 6 },
  queryKeys: { opportunities: "o", monthlyValue: "v", lagMonths: "l" },
});

export const COST_OF_DELAY_RANGES = COST_OF_DELAY.ranges;
export const COST_OF_DELAY_DEFAULTS: CostOfDelayInputs = COST_OF_DELAY.defaults;
export const sanitizeCostOfDelayInputs = COST_OF_DELAY.sanitize;
export const serializeCostOfDelayInputs = COST_OF_DELAY.serialize;
export const parseCostOfDelayInputs = COST_OF_DELAY.parse;

/** Share of the full estimate we show as the conservative case. */
export const CONSERVATIVE_SHARE = 0.5;

export const costOfDelay = (inputs: CostOfDelayInputs): CostOfDelayResult => {
  const { opportunities, monthlyValue, lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const monthly = opportunities * monthlyValue;
  const cumulative = monthly * lagMonths;
  return { monthly, cumulative, conservative: cumulative * CONSERVATIVE_SHARE };
};

export { formatUsd };

export const execLine = (inputs: CostOfDelayInputs): string => {
  const { lagMonths } = sanitizeCostOfDelayInputs(inputs);
  const { monthly, cumulative } = costOfDelay(inputs);
  return `Every month we wait on AI costs us about ${formatUsd(monthly)}. A ${lagMonths}-month delay costs about ${formatUsd(cumulative)} before we spend a dollar on implementation.`;
};
```

## src/lib/tools/format.ts
```
export const formatUsd = (n: number): string =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** A minus sign is easy to miss, so say which way it went. */
export const formatNet = (n: number): string => (n < 0 ? `${formatUsd(-n)} behind` : `${formatUsd(n)} ahead`);

export const formatPercent = (fraction: number): string => `${Math.round(fraction * 100)}%`;

/** Whole months, at least one. */
export const formatMonths = (n: number): string => {
  const whole = Math.max(1, Math.round(n));
  return `${whole} month${whole === 1 ? "" : "s"}`;
};
```

## content/v5/pages/tools/ai-cost-of-delay.md
```
---
url: /tools/ai-cost-of-delay
title: "AI Cost of Delay Calculator: What Waiting on AI Costs | Splice Works"
description: "Work out what each month of waiting on AI costs your company. Free calculator, the formula behind it, and a line you can paste into your next board deck."
reader: "A CEO, founder or technology leader deciding whether to start on AI now or later"
job: "Put a dollar figure on waiting, then test it in a working session"
decision: "Can we afford to wait on AI?"
prompts: ["what does delaying AI adoption cost", "cost of delay AI calculator", "how to calculate the cost of not adopting AI", "should we wait for AI to mature before investing", "how to make the business case for AI to the board"]
primary_cta: "Book a working session → /book"
status: approved (founders, 2026-10-29)
sources: ["Lead-magnet tools assessment 2026-10-29 (Tool B, Mode A)", "FAQ: The cost of waiting on AI"]
open: ["Named reviewer for the method (authority line)"]
---

# What does waiting on AI cost you?

Every month an AI opportunity isn't running, you give up its value. Add up what your opportunities would be worth each month and multiply by the months you'll wait. That's your cost of delay, and it's gone before you spend a dollar on implementation.

## How the number is built

- **Monthly cost of delay** = number of AI opportunities × monthly value of each
- **Cumulative cost** = monthly cost of delay × months of delay
- **Conservative case** = half the cumulative cost, because value usually ramps up rather than arriving on day one

The calculator takes 1 to 10 opportunities, $500 to $500,000 a month each, and a delay of 1 to 24 months. The math runs in your browser. Your inputs are kept in the page link so you can share the result, which means anyone who opens that link, including the site's host, can see them.

Updated 29 Oct 2026 · Splice Works

## A worked example

A company has 3 AI opportunities worth $10,000 a month each. Waiting costs it $30,000 a month. A 6-month delay costs $180,000, or $90,000 in the conservative case, before anything is spent on implementation.

## What the number leaves out

It's an estimate, not financial advice. It doesn't include:

- what implementation will cost ([the ROI calculator](/tools/ai-roi-calculator) adds that up)
- value that compounds once a workflow is running
- ground competitors gain while you wait

It also depends on your monthly values being right. That's the part worth testing: in a working session we measure one of your real workflows with you.

## Questions about the cost of delay

### What is the cost of delay for AI?

It's the value you give up each month an AI opportunity isn't running. Add up what each opportunity would be worth per month, then multiply by the months you wait. That money is gone before you spend anything on implementation. [Work out yours](/tools/ai-cost-of-delay).

### How do you calculate the cost of delaying AI adoption?

Multiply the number of AI opportunities by the monthly value of each one. That's your monthly cost of delay. Multiply it by the months until you'd go live to get the cumulative cost. We also show half of that as a conservative case, because value usually ramps up rather than arriving on day one. [Run the numbers](/tools/ai-cost-of-delay).

### How do I estimate the monthly value of an AI opportunity?

Start with one workflow. Count the hours your people spend on it each month and multiply by what those hours cost you. Add any revenue it would bring in sooner or errors it would stop. If you can't defend a number, use the low end.

### Isn't it cheaper to wait until AI matures?

Waiting has a cost too, it's just harder to see. Every month you wait, the value of that work goes unclaimed and your team learns nothing. The tools will keep improving either way. Start on one real workflow now and build it so you can swap tools later without starting over.

### How do I make the case for AI to my CEO or board?

Show them what waiting costs, in dollars, on work they recognize. Pick one to three workflows, put a monthly value on each and state the cost of a 6-month delay. Then name who is accountable for each one. [The calculator](/tools/ai-cost-of-delay) writes a line you can paste into the deck.

More answers in the [FAQ](/faq).

## Bring your number to a working session

We'll test it on one of your real workflows and show you what it takes to stop paying it.

**Book a working session** → /book
A paid day, credited in full if you go on to work with us.
```

## FAQ answers (content/v5/pages/faq.md)
## The cost of waiting on AI

### What is the cost of delay for AI?

It's the value you give up each month an AI opportunity isn't running. Add up what each opportunity would be worth per month, then multiply by the months you wait. That money is gone before you spend anything on implementation. [Work out yours](/tools/ai-cost-of-delay).

### How do you calculate the cost of delaying AI adoption?

Multiply the number of AI opportunities by the monthly value of each one. That's your monthly cost of delay. Multiply it by the months until you'd go live to get the cumulative cost. We also show half of that as a conservative case, because value usually ramps up rather than arriving on day one. [Run the numbers](/tools/ai-cost-of-delay).

### How do I estimate the monthly value of an AI opportunity?

Start with one workflow. Count the hours your people spend on it each month and multiply by what those hours cost you. Add any revenue it would bring in sooner or errors it would stop. If you can't defend a number, use the low end.

### Isn't it cheaper to wait until AI matures?

Waiting has a cost too, it's just harder to see. Every month you wait, the value of that work goes unclaimed and your team learns nothing. The tools will keep improving either way. Start on one real workflow now and build it so you can swap tools later without starting over.

### How do I make the case for AI to my CEO or board?

Show them what waiting costs, in dollars, on work they recognize. Pick one to three workflows, put a monthly value on each and state the cost of a 6-month delay. Then name who is accountable for each one. [The calculator](/tools/ai-cost-of-delay) writes a line you can paste into the deck.

