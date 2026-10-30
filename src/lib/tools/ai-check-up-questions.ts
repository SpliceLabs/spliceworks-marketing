/**
 * The AI check-up's questions. Each area question climbs the same five rungs;
 * each foundation question scores 1 to 5. Options run lowest to highest.
 */
import type { Area, CheckUpAnswers, Foundation } from "./ai-check-up";

export type Option = Readonly<{ label: string; detail?: string; value: number }>;

export type Question = Readonly<{ id: string; text: string; options: readonly Option[] }> &
  (Readonly<{ kind: "area"; key: Area }> | Readonly<{ kind: "foundation"; key: Foundation }>);

const RUNGS: readonly Option[] = [
  { label: "It isn't part of the work", detail: "Not used, or people chat with AI on their own", value: 1 },
  { label: "It helps people", detail: "AI drafts, summarises and researches for the people doing the work", value: 2 },
  { label: "It does steps", detail: "AI does steps inside the workflow; people start and finish it", value: 3 },
  { label: "It runs the workflow", detail: "Agents start and run it; people decide at set points", value: 4 },
  {
    label: "It improves the workflow",
    detail: "Agents run it end to end and improve it from results; people set the goals",
    value: 5,
  },
];

const area = (key: Area, where: string): Question => ({
  id: key,
  kind: "area",
  key,
  text: `How far does AI go in ${where}?`,
  options: RUNGS,
});

export const CHECK_UP_QUESTIONS: readonly Question[] = [
  area("core", "your core work: what you make or deliver"),
  area("customers", "sales, marketing and support"),
  area("backOffice", "finance, people and admin"),
  area("management", "reporting, planning and decisions"),
  {
    id: "adoption",
    kind: "foundation",
    key: "adoption",
    text: "How many of your people use AI in their real work every week, beyond the odd chat?",
    options: [
      { label: "Under 20%", value: 1 },
      { label: "20 to 40%", value: 2 },
      { label: "40 to 60%", value: 3 },
      { label: "60 to 80%", value: 4 },
      { label: "Over 80%", value: 5 },
    ],
  },
  {
    id: "ownership",
    kind: "foundation",
    key: "ownership",
    text: "Who owns AI at your company?",
    options: [
      { label: "Nobody yet", value: 1 },
      { label: "Informal champions", value: 2 },
      { label: "Someone, part-time", value: 4 },
      { label: "A leader or team, with a budget", value: 5 },
    ],
  },
  {
    id: "context",
    kind: "foundation",
    key: "context",
    text: "When AI helps with your work, what does it know about your business?",
    options: [
      { label: "Whatever someone pastes in", value: 1 },
      { label: "Some documents we've connected", value: 3 },
      { label: "Our documents, systems and experts' know-how, kept current", value: 5 },
    ],
  },
  {
    id: "access",
    kind: "foundation",
    key: "access",
    text: "How does AI reach your systems and data?",
    options: [
      { label: "It doesn't: people copy and paste", value: 1 },
      { label: "Through shared accounts or broad keys", value: 1 },
      { label: "Through approved integrations", value: 4 },
      { label: "Through scoped access, with permissions and an audit trail", value: 5 },
    ],
  },
  {
    id: "checking",
    kind: "foundation",
    key: "checking",
    text: "How is AI's work checked before it counts?",
    options: [
      { label: "Each person decides", value: 1 },
      { label: "A person reviews everything", value: 3 },
      { label: "Automatic checks, with people approving at set points", value: 5 },
    ],
  },
  {
    id: "measurement",
    kind: "foundation",
    key: "measurement",
    text: "Do you measure what AI changes?",
    options: [
      { label: "Not measured", value: 1 },
      { label: "Rough estimates", value: 3 },
      { label: "Yes, per workflow, against a baseline", value: 5 },
    ],
  },
  {
    id: "rules",
    kind: "foundation",
    key: "rules",
    text: "What rules cover AI use?",
    options: [
      { label: "None yet", value: 1 },
      { label: "A written policy", value: 3 },
      { label: "Approved tools, data rules, spend limits and a way to switch an agent off", value: 5 },
    ],
  },
  {
    id: "workflowChange",
    kind: "foundation",
    key: "workflowChange",
    text: "Has AI changed how a recurring workflow runs, not just how fast people do tasks?",
    options: [
      { label: "Not yet", value: 1 },
      { label: "We ran pilots that didn't reach production", value: 2 },
      { label: "Yes, one workflow", value: 4 },
      { label: "Yes, several workflows run differently now", value: 5 },
    ],
  },
];

/** Turns answers keyed by question id into the scorer's input. */
export const toCheckUpAnswers = (byId: Readonly<Record<string, number>>): CheckUpAnswers => ({
  areas: {
    core: byId.core ?? 1,
    customers: byId.customers ?? 1,
    backOffice: byId.backOffice ?? 1,
    management: byId.management ?? 1,
  },
  foundations: Object.fromEntries(
    CHECK_UP_QUESTIONS.filter((q) => q.kind === "foundation" && byId[q.id] !== undefined).map((q) => [
      q.key,
      byId[q.id],
    ]),
  ),
});
