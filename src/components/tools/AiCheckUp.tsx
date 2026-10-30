"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { checkUp, type CheckUpResult, type Stage } from "@/lib/tools/ai-check-up";
import { CHECK_UP_QUESTIONS, toCheckUpAnswers } from "@/lib/tools/ai-check-up-questions";
import calculator from "./Calculator.module.css";
import styles from "./CheckUp.module.css";

/** Picked option index, keyed by question id. */
type Picks = Readonly<Record<string, number>>;

const STAGE_NAMES: Readonly<Record<Stage, string>> = {
  "ai-absent": "AI-absent",
  "ai-enabled": "AI-enabled",
  "ai-native": "AI-native",
};

const MEANINGS: Readonly<Record<Stage, string>> = {
  "ai-absent":
    "You have AI tools, or a mandate to get them, but the work hasn't changed yet: no workflow is started and run by agents.",
  "ai-enabled":
    "At least one workflow is started and run by agents, with your people deciding at the points that matter. Next is making that how the company runs.",
  "ai-native": "Agents run the workflows that run your business, and your foundations back that up.",
};

const nextStep = (r: CheckUpResult): string => {
  if (r.stage === "ai-native")
    return "Bring the workflow you most want to improve. In one focused day we'll test how far it can go.";
  if (r.stage === "ai-enabled")
    return "Bring the next workflow you want agents to run. In one focused day we'll build a working prototype of it.";
  if (r.closeToNext)
    return "You're one workflow away from AI-enabled. In one focused day we'll pick it with you and build a working prototype.";
  return "Start with one workflow. In one focused day we'll pick it with you and build a working prototype.";
};

const gapsLine = (gaps: number, areas: number): string => {
  if (gaps === 0) return "Your answers and your foundations agree.";
  return `${gaps} of your ${areas} areas ${gaps === 1 ? "claims" : "claim"} more than your foundations support.`;
};

function Result({ result, onRestart }: Readonly<{ result: CheckUpResult; onRestart: () => void }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  const stage = STAGE_NAMES[result.stage];

  return (
    <div className={styles.result}>
      <p className={styles.eyebrow}>Where you are</p>
      <h3 ref={heading} tabIndex={-1} className={styles.stage}>
        {result.closeToNext ? `${stage}, close to AI-enabled` : stage}
      </h3>
      <p className={styles.score}>{result.score.toFixed(1)} out of 5</p>
      <p>{MEANINGS[result.stage]}</p>
      <p>{gapsLine(result.gaps, result.areas.length)}</p>
      <div className={calculator.cta}>
        <p>{nextStep(result)}</p>
        <Link href="/book" className="btn btn-primary">
          Book a working session <span aria-hidden="true">→</span>
        </Link>
        <p className={calculator.note}>Credited in full against your engagement.</p>
      </div>
      <button type="button" className="btn btn-quiet" onClick={onRestart}>
        Start over
      </button>
    </div>
  );
}

export function AiCheckUp() {
  const [picks, setPicks] = useState<Picks>({});
  const [index, setIndex] = useState(0);
  const heading = useRef<HTMLLegendElement>(null);
  const total = CHECK_UP_QUESTIONS.length;

  useEffect(() => {
    if (index > 0 && index < total) heading.current?.focus();
  }, [index, total]);

  if (index >= total) {
    const values = Object.fromEntries(
      CHECK_UP_QUESTIONS.map((q) => [q.id, q.options[picks[q.id] ?? 0].value] as const),
    );
    const restart = () => {
      setPicks({});
      setIndex(0);
    };
    return (
      <div className={styles.panel}>
        <Result result={checkUp(toCheckUpAnswers(values))} onRestart={restart} />
      </div>
    );
  }

  const question = CHECK_UP_QUESTIONS[index];
  const picked = picks[question.id];
  const last = index === total - 1;

  return (
    <form
      className={styles.panel}
      aria-label="AI check-up"
      onSubmit={(e) => {
        e.preventDefault();
        if (picked !== undefined) setIndex(index + 1);
      }}
    >
      <p className={styles.progress}>
        Question {index + 1} of {total}
      </p>
      <fieldset className={styles.question}>
        <legend ref={heading} tabIndex={-1} className={styles.text}>
          {question.text}
        </legend>
        {question.options.map((option, i) => {
          const id = `${question.id}-${i}`;
          return (
            <label key={option.label} className={styles.option}>
              <input
                type="radio"
                name={question.id}
                checked={picked === i}
                onChange={() => setPicks({ ...picks, [question.id]: i })}
                aria-labelledby={`${id}-label`}
                aria-describedby={option.detail ? `${id}-detail` : undefined}
              />
              <span>
                <span id={`${id}-label`} className={styles.optionLabel}>
                  {option.label}
                </span>
                {option.detail && (
                  <span id={`${id}-detail`} className={styles.detail}>
                    {option.detail}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </fieldset>
      <div className={styles.nav}>
        {index > 0 && (
          <button type="button" className="btn btn-quiet" onClick={() => setIndex(index - 1)}>
            Back
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={picked === undefined}>
          {last ? "See your result" : "Next"}
        </button>
      </div>
    </form>
  );
}
