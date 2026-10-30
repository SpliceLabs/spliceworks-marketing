/**
 * AI check-up: places a company on the path from AI-absent to AI-native.
 * Generalised from the Agentic Operating Maturity model in Adaptive Alchemy's
 * team assessment: each area's claimed rung is capped at what the company's
 * foundations support. Pure functions, shared by the page and its tests.
 */

export type Area = "core" | "customers" | "backOffice" | "management";

export type Foundation =
  "adoption" | "ownership" | "context" | "access" | "checking" | "measurement" | "rules" | "workflowChange";

/** Rungs and foundation scores both run 1 to 5. */
export type CheckUpAnswers = Readonly<{
  areas: Readonly<Record<Area, number>>;
  foundations: Readonly<Partial<Record<Foundation, number>>>;
}>;

export type AreaResult = Readonly<{
  area: Area;
  claimed: number;
  /** The highest rung the foundations back. */
  supported: number;
  level: number;
  gap: boolean;
}>;

export type Stage = "ai-absent" | "ai-enabled" | "ai-native";

export type CheckUpResult = Readonly<{
  areas: readonly AreaResult[];
  /** 1 to 5, weighted across the areas. */
  score: number;
  stage: Stage;
  /** AI-absent, but one area already has AI doing steps of the work. */
  closeToNext: boolean;
  /** Areas that claim more than the foundations support. */
  gaps: number;
}>;

// The team assessment's blend: the main domain carries 45%, then 25/15/15.
const WEIGHTS: Readonly<Record<Area, number>> = { core: 0.45, customers: 0.25, backOffice: 0.15, management: 0.15 };

// Object.keys widens to string[]; WEIGHTS is a Record<Area, number>, so its keys are exactly the areas.
const AREAS = Object.keys(WEIGHTS) as Area[];

// Rung 4 is the site's AI-enabled: a workflow that agents start and run.
const RUNS_THE_WORKFLOW = 4;
const NATIVE_SCORE = 4;

// The answers alone back up to rung 2; higher rungs need the foundations' average.
// Improving from results takes measuring them, so the top rung also needs measurement at 5.
const supportedRung = (average: number | null, measurement: number | undefined): number => {
  if (average === null) return 2;
  if (average >= 4.5 && measurement === 5) return 5;
  if (average >= 4) return 4;
  if (average >= 3.5) return 3;
  return 2;
};

const average = (scores: readonly number[]): number | null =>
  scores.length === 0 ? null : scores.reduce((sum, s) => sum + s, 0) / scores.length;

export const checkUp = (answers: CheckUpAnswers): CheckUpResult => {
  const supported = supportedRung(
    average(Object.values(answers.foundations).filter((s): s is number => s !== undefined)),
    answers.foundations.measurement,
  );
  const areas = AREAS.map((area) => {
    const claimed = answers.areas[area];
    return { area, claimed, supported, level: Math.min(claimed, supported), gap: claimed > supported };
  });
  const score = Number(areas.reduce((sum, a) => sum + WEIGHTS[a.area] * a.level, 0).toFixed(2));
  const best = Math.max(...areas.map((a) => a.level));
  const stage: Stage = score >= NATIVE_SCORE ? "ai-native" : best >= RUNS_THE_WORKFLOW ? "ai-enabled" : "ai-absent";
  return {
    areas,
    score,
    stage,
    closeToNext: stage === "ai-absent" && best === RUNS_THE_WORKFLOW - 1,
    gaps: areas.filter((a) => a.gap).length,
  };
};
