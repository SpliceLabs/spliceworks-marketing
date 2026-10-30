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

export type CheckUpResult = Readonly<{
  areas: readonly AreaResult[];
}>;

const AREAS: readonly Area[] = ["core", "customers", "backOffice", "management"];

// The answers alone back up to rung 2; higher rungs need the foundations' average.
const supportedRung = (average: number | null): number => {
  if (average === null) return 2;
  if (average >= 4) return 4;
  if (average >= 3.5) return 3;
  return 2;
};

const average = (scores: readonly number[]): number | null =>
  scores.length === 0 ? null : scores.reduce((sum, s) => sum + s, 0) / scores.length;

export const checkUp = (answers: CheckUpAnswers): CheckUpResult => {
  const supported = supportedRung(
    average(Object.values(answers.foundations).filter((s): s is number => s !== undefined)),
  );
  const areas = AREAS.map((area) => {
    const claimed = answers.areas[area];
    return { area, claimed, supported, level: Math.min(claimed, supported), gap: claimed > supported };
  });
  return { areas };
};
