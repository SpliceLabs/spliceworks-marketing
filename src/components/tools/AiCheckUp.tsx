"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { checkUp, contradictions, type Contradiction, type CheckUpResult, type Stage } from "@/lib/tools/ai-check-up";
import {
  AREA_NAMES,
  CHECK_UP_QUESTIONS,
  questionsFor,
  toCheckUpAnswers,
  type Question,
} from "@/lib/tools/ai-check-up-questions";
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
    "AI already does steps of the work in at least one area. What's missing is a workflow that agents start and run, with your people deciding at set points.",
  "ai-enabled":
    "At least one workflow is started and run by agents, with your people deciding at the points that matter. Next is making that how the company runs.",
  "ai-native": "Agents run the workflows that run your business, and your foundations back that up.",
};

// Below "does steps", AI-absent means people barely use AI yet, so the advice starts with the basics.
const EARLY_MEANINGS: Readonly<Record<number, string>> = {
  1: "AI isn't part of how your people work yet. At most, some use a chat tool now and then, much like a search engine.",
  2: "People use AI to help with parts of their work, but it doesn't do steps of the work yet.",
};

const bestLevel = (r: CheckUpResult) => Math.max(...r.areas.map((a) => a.level));

const meaning = (r: CheckUpResult): string =>
  r.stage === "ai-absent" && !r.closeToNext ? EARLY_MEANINGS[Math.min(bestLevel(r), 2)] : MEANINGS[r.stage];

const nextStep = (r: CheckUpResult): string => {
  if (r.stage === "ai-native")
    return "Bring the workflow you most want to improve. In one focused day we'll test how far it can go.";
  if (r.stage === "ai-enabled")
    return "Bring the next workflow you want agents to run. In one focused day we'll build a working prototype of it.";
  if (r.closeToNext)
    return "You're one workflow away from AI-enabled. In one focused day we'll choose it with you and build a working prototype.";
  return "Start with the basics. In one focused day we'll get your people briefing AI well, writing down the context it needs, and organising their work so it builds up over time.";
};

const gapsLine = (gaps: number, areas: number): string => {
  if (gaps === 0) return "Your answers match what your foundations can support.";
  return `In ${gaps} of your ${areas} areas, your answers are ahead of what your foundations can support, so we've counted the lower rung.`;
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
      <p>{meaning(result)}</p>
      <p>{gapsLine(result.foundationGaps, result.areas.length)}</p>
      <div className={calculator.cta}>
        <p>{nextStep(result)}</p>
        <Link href="/book" className="btn btn-primary">
          Book a working session <span aria-hidden="true">→</span>
        </Link>
        <p className={calculator.note}>A paid day, credited in full if you go on to work with us.</p>
      </div>
      <button type="button" className="btn btn-quiet" onClick={onRestart}>
        Start over
      </button>
    </div>
  );
}

const valuesOf = (picks: Picks, questions: readonly Question[]): Readonly<Record<string, number | null>> =>
  Object.fromEntries(
    questions.flatMap((q) => {
      const pick = picks[q.id];
      return pick === undefined ? [] : [[q.id, q.options[pick].value] as const];
    }),
  );

// Follow-ups depend only on the area answers, which are always in the base list.
const questionsFrom = (picks: Picks): readonly Question[] => questionsFor(valuesOf(picks, CHECK_UP_QUESTIONS));

function WordsWeUse() {
  return (
    <div className={styles.words}>
      <p className={styles.eyebrow}>Words we use</p>
      <dl>
        <dt>Workflow</dt>
        <dd>A piece of work your company does again and again, like handling a new order or closing the month.</dd>
        <dt>Foundations</dt>
        <dd>The basics that let AI take on more: someone in charge, checks, rules and measurement.</dd>
      </dl>
    </div>
  );
}

const CONTRADICTIONS: Readonly<Record<Contradiction["kind"], (where: string) => string>> = {
  noChangedWorkflow: (where) =>
    `You said AI runs the workflow in ${where}, but also that no workflow runs differently yet.`,
  notMeasured: (where) =>
    `You said AI improves the workflow in ${where}, but you don't measure each workflow against how it ran before.`,
};

function Review({
  found,
  onChange,
  onKeep,
}: Readonly<{ found: readonly Contradiction[]; onChange: () => void; onKeep: () => void }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  return (
    <div className={styles.result}>
      <h3 ref={heading} tabIndex={-1} className={styles.text}>
        Some answers don&apos;t fit together
      </h3>
      <ul>
        {found.map((c) => (
          <li key={`${c.area}-${c.kind}`}>{CONTRADICTIONS[c.kind](AREA_NAMES[c.area])}</li>
        ))}
      </ul>
      <p>Check them before we show your result. If you keep them, we&apos;ll place those areas lower.</p>
      <div className={styles.nav}>
        <button type="button" className="btn btn-primary" onClick={onChange}>
          Change my answers
        </button>
        <button type="button" className="btn btn-quiet" onClick={onKeep}>
          Keep my answers
        </button>
      </div>
    </div>
  );
}

export function AiCheckUp() {
  const [picks, setPicks] = useState<Picks>({});
  const [index, setIndex] = useState(0);
  const [kept, setKept] = useState(false);
  const heading = useRef<HTMLLegendElement>(null);
  const questions = questionsFrom(picks);
  const total = questions.length;

  useEffect(() => {
    if (index > 0 && index < total) heading.current?.focus();
  }, [index, total]);

  if (index >= total) {
    const answers = toCheckUpAnswers(valuesOf(picks, questions));
    const found = contradictions(answers);
    const restart = () => {
      setPicks({});
      setKept(false);
      setIndex(0);
    };
    return (
      <div className={styles.panel}>
        {found.length > 0 && !kept ? (
          <Review
            found={found}
            onChange={() => setIndex(questions.findIndex((q) => q.id === found[0].area))}
            onKeep={() => setKept(true)}
          />
        ) : (
          <Result result={checkUp(answers)} onRestart={restart} />
        )}
      </div>
    );
  }

  const question = questions[index];
  const picked = picks[question.id];
  const last = index === total - 1;
  const hintId = `${question.id}-hint`;

  return (
    <form
      className={styles.panel}
      aria-label="AI check-up"
      onSubmit={(e) => {
        e.preventDefault();
        if (picked !== undefined) setIndex(index + 1);
      }}
    >
      {index === 0 && <WordsWeUse />}
      {question.intro && <p className={styles.intro}>{question.intro}</p>}
      <p className={styles.progress}>
        Question {index + 1} of {total}
      </p>
      <fieldset className={styles.question} aria-describedby={question.hint ? hintId : undefined}>
        <legend ref={heading} tabIndex={-1} className={styles.text}>
          {question.text}
        </legend>
        {question.hint && (
          <p id={hintId} className={styles.hint}>
            {question.hint}
          </p>
        )}
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
