/**
 * AI check-up: places a company on the path from AI-absent to AI-native.
 * Generalised from the Agentic Operating Maturity model in Adaptive Alchemy's
 * team assessment: each area's claimed level is capped at what the company's
 * foundations support. Pure functions, shared by the page and its tests.
 */

export type Area = "core" | "customers" | "backOffice" | "management";

export const FOUNDATIONS = [
  "adoption",
  "inCharge",
  "resourcing",
  "knows",
  "upkeep",
  "reach",
  "limits",
  "checking",
  "measurement",
  "policy",
  "control",
  "workflowChange",
] as const;

export type Foundation = (typeof FOUNDATIONS)[number];

/** Levels and foundation scores both run 1 to 5. A missing foundation was answered "I don't know". */
export type CheckUpAnswers = Readonly<{
  areas: Readonly<Record<Area, number>>;
  foundations: Readonly<Partial<Record<Foundation, number>>>;
}>;

export type AreaResult = Readonly<{
  area: Area;
  claimed: number;
  /** The highest level the foundations back. */
  supported: number;
  level: number;
  /** Why the area sits below its claim, if it does. */
  heldBy: "foundations" | null;
}>;

export type Stage = "ai-absent" | "ai-enabled" | "ai-native";

export type CheckUpResult = Readonly<{
  areas: readonly AreaResult[];
  stage: Stage;
  /** AI-absent, but one area already has AI doing steps of the work. */
  closeToNext: boolean;
  /** The highest level the foundations back. */
  supported: number;
  /** Basics the next level needs that aren't in place yet. */
  missingForNext: number;
  /** Areas held below their claim by the foundations. */
  foundationGaps: number;
  /** Foundation questions answered "I don't know". */
  unknowns: number;
}>;

const AREAS: readonly Area[] = ["core", "customers", "backOffice", "management"];

type Gate = Readonly<{ foundation: Foundation; atLeast: number }>;

// What each level needs on top of the level below. Every gate must pass, so one strength
// can't make up for a missing basic. "I don't know" never passes a gate.
const GATES: Readonly<Record<3 | 4 | 5, readonly Gate[]>> = {
  // Does some steps: AI has the business's documents, someone else checks its work, and there's a written policy.
  3: [
    { foundation: "knows", atLeast: 3 },
    { foundation: "checking", atLeast: 3 },
    { foundation: "policy", atLeast: 3 },
  ],
  // Runs the workflow: someone is in charge, AI reaches systems through approved links,
  // it can be switched off, and a workflow already runs differently.
  4: [
    { foundation: "inCharge", atLeast: 3 },
    { foundation: "reach", atLeast: 5 },
    { foundation: "control", atLeast: 3 },
    { foundation: "workflowChange", atLeast: 4 },
  ],
  // Runs and improves the workflow: the top answer on everything that keeps an improving workflow safe and honest.
  5: [
    { foundation: "inCharge", atLeast: 5 },
    { foundation: "resourcing", atLeast: 5 },
    { foundation: "knows", atLeast: 5 },
    { foundation: "upkeep", atLeast: 5 },
    { foundation: "limits", atLeast: 5 },
    { foundation: "checking", atLeast: 5 },
    { foundation: "measurement", atLeast: 5 },
    { foundation: "control", atLeast: 5 },
  ],
};

const GATED_LEVELS = [3, 4, 5] as const;
// The answers alone back up to "helps people".
const UNGATED_LEVEL = 2;
const RUNS_THE_WORKFLOW = 4;
const DOES_SOME_STEPS = 3;

const unmet = (foundations: CheckUpAnswers["foundations"], gates: readonly Gate[]): number =>
  gates.filter((g) => (foundations[g.foundation] ?? 0) < g.atLeast).length;

const supportedLevel = (foundations: CheckUpAnswers["foundations"]): number => {
  const firstUnmet = GATED_LEVELS.find((level) => unmet(foundations, GATES[level]) > 0);
  return firstUnmet === undefined ? 5 : Math.max(firstUnmet - 1, UNGATED_LEVEL);
};

// AI-native: AI runs the workflow in the core work and with customers, and does at least some steps everywhere else.
const isNative = (areas: readonly AreaResult[]): boolean =>
  areas.every((a) => a.level >= (a.area === "core" || a.area === "customers" ? RUNS_THE_WORKFLOW : DOES_SOME_STEPS));

const missingForNext = (foundations: CheckUpAnswers["foundations"], supported: number): number => {
  const next = GATED_LEVELS.find((level) => level === supported + 1);
  return next === undefined ? 0 : unmet(foundations, GATES[next]);
};

export const checkUp = (answers: CheckUpAnswers): CheckUpResult => {
  const supported = supportedLevel(answers.foundations);
  const areas = AREAS.map((area): AreaResult => {
    const claimed = answers.areas[area];
    return {
      area,
      claimed,
      supported,
      level: Math.min(claimed, supported),
      heldBy: claimed > supported ? "foundations" : null,
    };
  });
  const best = Math.max(...areas.map((a) => a.level));
  const stage: Stage = isNative(areas) ? "ai-native" : best >= RUNS_THE_WORKFLOW ? "ai-enabled" : "ai-absent";
  return {
    areas,
    stage,
    closeToNext: stage === "ai-absent" && best === DOES_SOME_STEPS,
    supported,
    missingForNext: missingForNext(answers.foundations, supported),
    foundationGaps: areas.filter((a) => a.heldBy === "foundations").length,
    unknowns: FOUNDATIONS.filter((f) => answers.foundations[f] === undefined).length,
  };
};
