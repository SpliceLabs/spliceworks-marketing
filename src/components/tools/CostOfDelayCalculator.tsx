"use client";

import Link from "next/link";
import { useState, useSyncExternalStore, type FocusEvent, type KeyboardEvent } from "react";
import {
  COST_OF_DELAY_RANGES,
  costOfDelay,
  execLine,
  formatUsd,
  parseCostOfDelayInputs,
  serializeCostOfDelayInputs,
  type CostOfDelayInputs,
} from "@/lib/tools/cost-of-delay";
import styles from "./Calculator.module.css";

type Field = { key: keyof CostOfDelayInputs; label: string; hint: string; format: (n: number) => string };

const FIELDS: Field[] = [
  { key: "opportunities", label: "AI opportunities", hint: "Workflows AI could take on", format: String },
  { key: "monthlyValue", label: "Monthly value of each", hint: "Hours saved, revenue sooner, errors avoided", format: formatUsd },
  { key: "lagMonths", label: "Months until you start", hint: "How long you expect to wait", format: (n) => `${n} mo` },
];

type Copied = "line" | "link" | null;

// The query string holds the inputs, so a shared link reproduces the result.
const URL_CHANGE = "cod:urlchange";

const subscribe = (onChange: () => void) => {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_CHANGE, onChange);
  };
};

const writeUrl = (inputs: CostOfDelayInputs) => {
  window.history.replaceState(null, "", `?${serializeCostOfDelayInputs(inputs)}`);
  window.dispatchEvent(new Event(URL_CHANGE));
};

export function CostOfDelayCalculator() {
  // Server-rendered from an empty query, i.e. the defaults, so the page always shows a worked result.
  const query = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const inputs = parseCostOfDelayInputs(query);
  const [copied, setCopied] = useState<Copied>(null);

  const set = (key: keyof CostOfDelayInputs, value: string) => {
    setCopied(null);
    writeUrl({ ...inputs, [key]: Number(value) });
  };

  // Typed values apply on blur or Enter, so a half-typed number isn't clamped mid-entry.
  const commit = (key: keyof CostOfDelayInputs) => (e: FocusEvent<HTMLInputElement>) => set(key, e.currentTarget.value);
  const commitOnEnter = (key: keyof CostOfDelayInputs) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") set(key, e.currentTarget.value);
  };

  const copy = (what: Exclude<Copied, null>, text: string) =>
    navigator.clipboard.writeText(text).then(
      () => setCopied(what),
      () => setCopied(null),
    );

  const result = costOfDelay(inputs);
  const line = execLine(inputs);

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="Cost of delay inputs" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map(({ key, label, hint, format }) => {
          const range = COST_OF_DELAY_RANGES[key];
          const id = `cod-${key}`;
          return (
            <div key={key} className={styles.field}>
              <div className={styles.fieldHead}>
                <label htmlFor={id} className={styles.label}>
                  {label}
                </label>
                <input
                  key={inputs[key]}
                  type="number"
                  className={styles.number}
                  aria-label={`${label}, exact value`}
                  {...range}
                  defaultValue={inputs[key]}
                  onBlur={commit(key)}
                  onKeyDown={commitOnEnter(key)}
                />
              </div>
              <input
                id={id}
                type="range"
                className={styles.range}
                {...range}
                value={inputs[key]}
                aria-valuetext={format(inputs[key])}
                onChange={(e) => set(key, e.currentTarget.value)}
              />
              <p className={styles.hint}>{hint}</p>
            </div>
          );
        })}
      </form>

      <div className={styles.results} aria-live="polite">
        <dl className={styles.figures}>
          <div className={styles.figure}>
            <dt>Every month you wait</dt>
            <dd className={styles.primary}>{formatUsd(result.monthly)}</dd>
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

        <blockquote className={styles.line}>{line}</blockquote>
        <div className={styles.actions}>
          <button type="button" className="btn btn-secondary" onClick={() => copy("line", line)}>
            {copied === "line" ? "Copied" : "Copy this line"}
          </button>
          <button type="button" className="btn btn-quiet" onClick={() => copy("link", window.location.href)}>
            {copied === "link" ? "Link copied" : "Copy link to these numbers"}
          </button>
        </div>

        <div className={styles.cta}>
          <Link href="/book" className="btn btn-primary">
            Test this number in a working session <span aria-hidden="true">→</span>
          </Link>
          <p className={styles.note}>Estimate only, not financial advice. Runs in your browser; nothing is sent to us.</p>
        </div>
      </div>
    </div>
  );
}
