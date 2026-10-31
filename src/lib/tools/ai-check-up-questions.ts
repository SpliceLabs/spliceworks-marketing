/**
 * The AI check-up's questions. Each area question climbs the same five levels;
 * each foundation question scores 1 to 5. Options run lowest to highest, except that
 * a risky answer is listed after the ladder so it doesn't read as progress, and
 * "I don't know" (no score) comes last.
 */
import type { Area, CheckUpAnswers, Foundation } from "./ai-check-up";

/** `value: null` is "I don't know". */
export type Option = Readonly<{ label: string; detail?: string; value: number | null }>;

export type Question = Readonly<{
  id: string;
  text: string;
  /** A line under the question that says how to answer it. */
  hint?: string;
  /** A line shown above the question, to open a new section. */
  intro?: string;
  options: readonly Option[];
}> &
  (Readonly<{ kind: "area"; key: Area }> | Readonly<{ kind: "foundation"; key: Foundation }>);

const LEVELS: readonly Option[] = [
  {
    label: "It isn't part of the work",
    detail: "Not used, or a few people try ChatGPT or similar now and then",
    value: 1,
  },
  { label: "It helps people", detail: "Most weeks, people use AI to draft, summarise or look things up", value: 2 },
  {
    label: "It does some steps",
    detail: "AI does some steps by itself. People still start and finish the work.",
    value: 3,
  },
  {
    label: "It runs the workflow",
    detail: "AI starts the work and sees it through. People make the key decisions.",
    value: 4,
  },
  {
    label: "It runs and improves the workflow",
    detail: "AI runs it from start to finish and improves it based on results. People set the goals.",
    value: 5,
  },
];

const DONT_KNOW: Option = { label: "I don't know", value: null };

export const AREA_NAMES: Readonly<Record<Area, string>> = {
  core: "your core work, the things you make or deliver",
  customers: "sales, marketing and support",
  backOffice: "finance, people and admin",
  management: "reporting, planning and decisions",
};

const area = (key: Area): Question => ({
  id: key,
  kind: "area",
  key,
  text: `Over the last month, how far did AI go in ${AREA_NAMES[key]}?`,
  hint: "Think of regular work, not one-off trials. Pick the furthest it goes.",
  options: LEVELS,
});

const foundation = (
  key: Foundation,
  text: string,
  options: readonly Option[],
  extra: Readonly<{ hint?: string; intro?: string }> = {},
): Question => ({ id: key, kind: "foundation", key, text, ...extra, options: [...options, DONT_KNOW] });

export const CHECK_UP_QUESTIONS: readonly Question[] = [
  area("core"),
  area("customers"),
  area("backOffice"),
  area("management"),
  foundation(
    "adoption",
    "Think of your people who work mostly at a computer. Roughly what share use AI in their work every week?",
    [
      { label: "Under 20%", value: 1 },
      { label: "20 to 39%", value: 2 },
      { label: "40 to 59%", value: 3 },
      { label: "60 to 79%", value: 4 },
      { label: "80% or more", value: 5 },
    ],
    { intro: "Next, 12 questions on your foundations: the basics that let AI take on more." },
  ),
  foundation("inCharge", "Who is in charge of AI at your company?", [
    { label: "Nobody yet", value: 1 },
    { label: "Some keen people, but nobody is in charge", value: 2 },
    { label: "One person, on top of their main job", value: 3 },
    { label: "A leader or team whose job includes it", value: 5 },
  ]),
  foundation("resourcing", "Is money and time set aside for AI?", [
    { label: "No", value: 1 },
    { label: "Money for tools, but nobody's time", value: 3 },
    { label: "Yes, money and someone's time", value: 5 },
  ]),
  foundation("knows", "When AI helps with your work, what does it know about your business?", [
    { label: "Only what someone pastes in each time", value: 1 },
    { label: "Some documents we've given it", value: 3 },
    { label: "Our documents and data, and what our best people know", value: 5 },
  ]),
  foundation("upkeep", "Is what AI knows about your business kept up to date?", [
    { label: "No, or we haven't given it anything", value: 1 },
    { label: "When someone remembers", value: 3 },
    { label: "Yes, it's someone's job to keep it current", value: 5 },
  ]),
  foundation(
    "reach",
    "How does AI reach your company's software and data?",
    [
      { label: "It doesn't: people copy and paste", value: 1 },
      { label: "Through AI built into tools we already use, like Copilot in Microsoft 365", value: 3 },
      { label: "Through links to our systems that we've set up and approved", value: 5 },
      {
        label: "Through a shared password, or an account that can see far more than it needs",
        detail: "This is riskier than copy and paste.",
        value: 1,
      },
    ],
    { hint: "If more than one fits, pick the one that covers most of your AI use." },
  ),
  foundation("limits", "Can you limit what AI can open, and see what it did?", [
    { label: "No", value: 1 },
    { label: "Partly", value: 3 },
    { label: "Yes: each task opens only what it needs, and we keep a log", value: 5 },
  ]),
  foundation("checking", "How do you check AI's work before anyone relies on it?", [
    { label: "Each person checks their own, if they check at all", value: 1 },
    { label: "Someone else checks it first", value: 3 },
    { label: "Software checks it automatically, and a person signs off key decisions", value: 5 },
  ]),
  foundation("measurement", "How do you measure the difference AI makes?", [
    { label: "We don't", value: 1 },
    { label: "We estimate it roughly", value: 3 },
    { label: "We measure each workflow against how it ran before", value: 5 },
  ]),
  foundation("policy", "What rules do you have for using AI?", [
    { label: "None, or only informal advice", value: 1 },
    { label: "A written policy", value: 3 },
    { label: "A written policy, plus approved tools and data rules", value: 5 },
  ]),
  foundation("control", "Could you cap AI's spending, or switch it off, if you needed to?", [
    { label: "No", value: 1 },
    { label: "For some of it", value: 3 },
    { label: "Yes, for all of it", value: 5 },
  ]),
  foundation("workflowChange", "Has AI changed the steps of any regular workflow, not just made people faster?", [
    { label: "Not yet", value: 1 },
    { label: "We've run trials, but none is in daily use", value: 2 },
    { label: "Yes, one workflow now runs differently", value: 4 },
    { label: "Yes, several workflows now run differently", value: 5 },
  ]),
];

const YES = 1;

/** The id of the follow-up that checks a claim that AI runs an area's workflow. */
export const confirmId = (key: Area): string => `${key}-confirm`;

/** Turns answers keyed by question id into the scorer's input. A null or missing foundation is "I don't know". */
export const toCheckUpAnswers = (byId: Readonly<Record<string, number | null>>): CheckUpAnswers => ({
  areas: {
    core: byId.core ?? 1,
    customers: byId.customers ?? 1,
    backOffice: byId.backOffice ?? 1,
    management: byId.management ?? 1,
  },
  confirmed: {
    core: byId[confirmId("core")] === YES,
    customers: byId[confirmId("customers")] === YES,
    backOffice: byId[confirmId("backOffice")] === YES,
    management: byId[confirmId("management")] === YES,
  },
  foundations: Object.fromEntries(
    CHECK_UP_QUESTIONS.flatMap((q) => {
      const value = byId[q.id];
      return q.kind === "foundation" && typeof value === "number" ? [[q.key, value] as const] : [];
    }),
  ),
});
