"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  checkUp,
  contradictions,
  type Area,
  type AreaResult,
  type CheckUpResult,
  type Contradiction,
  type Stage,
} from "@/lib/tools/ai-check-up";
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
    "In at least one area, AI already does some steps. Next is one workflow that AI runs from start to finish, with your people making the key decisions.",
  "ai-enabled":
    "In at least one area, AI runs a workflow, with your people making the key decisions. Next, make that the normal way your company works.",
  "ai-native": "AI runs the main workflows in your business, and the basics are in place to support it.",
};

// Below "does some steps", AI-absent means people barely use AI yet, so the advice starts with the basics.
const EARLY_MEANINGS: Readonly<Record<number, string>> = {
  1: "AI isn't part of how your people work yet. At most, some use ChatGPT or similar now and then, much like a search engine.",
  2: "People use AI to help with their work, but it doesn't yet do any steps by itself.",
};

const AREA_LABELS: Readonly<Record<Area, string>> = {
  core: "Core work",
  customers: "Sales, marketing and support",
  backOffice: "Finance, people and admin",
  management: "Reporting, planning and decisions",
};

// "It does some steps" becomes "Does some steps"; the area questions share one ladder.
const LEVEL_NAMES: readonly string[] = CHECK_UP_QUESTIONS[0].options.map((o) => {
  const name = o.label.replace(/^It /, "");
  return name.charAt(0).toUpperCase() + name.slice(1);
});

const levelName = (level: number): string => LEVEL_NAMES[level - 1];

const bestLevel = (r: CheckUpResult) => Math.max(...r.areas.map((a) => a.level));

const meaning = (r: CheckUpResult): string =>
  r.stage === "ai-absent" && !r.closeToNext ? EARLY_MEANINGS[Math.min(bestLevel(r), 2)] : MEANINGS[r.stage];

const nextStep = (r: CheckUpResult): string => {
  if (r.stage === "ai-native")
    return "Bring the workflow you most want to improve. In one focused day we'll test how much further AI can take it.";
  if (r.stage === "ai-enabled")
    return "Bring the next workflow you want AI to run. In one focused day we'll build a working prototype of it.";
  if (r.closeToNext)
    return "You're one workflow away from AI-enabled. In one focused day we'll choose it with you and build a working prototype.";
  return "Start with the basics. In one focused day, your people will learn to give AI clear instructions, write down what it needs to know about your business, and organise their work so AI's help builds up over time.";
};

const areaNote = (a: AreaResult): string | null => {
  const said = `You said "${levelName(a.claimed).toLowerCase()}"`;
  if (a.heldBy === "unconfirmed") return `${said}, but not that it ran in normal use in the last month.`;
  if (a.heldBy === "foundations") return `${said}, but your foundations don't support that yet.`;
  return null;
};

const supportLine = (r: CheckUpResult): string => {
  if (r.supported === 5) return "Your foundations support every level.";
  const missing =
    r.missingForNext === 1
      ? "1 of the basics for the next level isn't"
      : `${r.missingForNext} of the basics for the next level aren't`;
  return `Your foundations support up to "${levelName(r.supported).toLowerCase()}". ${missing} in place yet.`;
};

const provisionalLine = (unknowns: number): string | null =>
  unknowns === 0
    ? null
    : `You answered "I don't know" to ${unknowns} ${unknowns === 1 ? "question" : "questions"}, so treat this result as provisional. We count an unknown as not yet in place.`;

function Result({ result, onRestart }: Readonly<{ result: CheckUpResult; onRestart: () => void }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => heading.current?.focus(), []);
  const stage = STAGE_NAMES[result.stage];
  const provisional = provisionalLine(result.unknowns);

  return (
    <div className={styles.result}>
      <p className={styles.eyebrow}>Where you are</p>
      <h3 ref={heading} tabIndex={-1} className={styles.stage}>
        {result.closeToNext ? `${stage}, but close to AI-enabled` : stage}
      </h3>
      <p>{meaning(result)}</p>
      <ul className={styles.areas}>
        {result.areas.map((a) => {
          const note = areaNote(a);
          return (
            <li key={a.area}>
              <span className={styles.areaName}>{AREA_LABELS[a.area]}</span>
              <span className={styles.areaLevel}>{levelName(a.level)}</span>
              {note && <span className={styles.detail}>{note}</span>}
            </li>
          );
        })}
      </ul>
      <p>{supportLine(result)}</p>
      {provisional && <p>{provisional}</p>}
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
