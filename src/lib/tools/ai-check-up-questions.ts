/**
 * The AI check-up's questions. Each area question climbs the same five rungs;
 * each foundation question scores 1 to 5. Options run lowest to highest, except that
 * a risky answer is listed last so it doesn't read as progress.
 */
import type { Area, CheckUpAnswers, Foundation } from "./ai-check-up";

export type Option = Readonly<{ label: string; detail?: string; value: number }>;

export type Question = Readonly<{ id: string; text: string; options: readonly Option[] }> &
  (Readonly<{ kind: "area"; key: Area }> | Readonly<{ kind: "foundation"; key: Foundation }>);

const RUNGS: readonly Option[] = [
  { label: "It isn't part of the work", detail: "Not used, or a few people try a chat tool now and then", value: 1 },
  { label: "It helps people", detail: "People routinely use AI to draft, summarise and research", value: 2 },
  { label: "It does steps", detail: "AI does set steps of the work; people start and finish it", value: 3 },
  {
    label: "It runs the workflow",
    detail: "AI agents, software that acts on its own, start and run it; people decide at set points",
    value: 4,
  },
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
  text: `How far does AI go in ${where} on a normal week?`,
  options: RUNGS,
});

export const CHECK_UP_QUESTIONS: readonly Question[] = [
  area("core", "your core work (what you make or deliver)"),
  area("customers", "sales, marketing and support"),
  area("backOffice", "finance, people and admin"),
  area("management", "reporting, planning and decisions"),
  {
    id: "adoption",
    kind: "foundation",
    key: "adoption",
    text: "Of the people whose work is mostly documents, email or a computer, how many use AI in that work every week, beyond the odd chat?",
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
      { label: "Keen people, but it's nobody's job", value: 2 },
      { label: "A named person, alongside their main job", value: 4 },
      { label: "A named leader or team, with time and a budget", value: 5 },
    ],
  },
  {
    id: "context",
    kind: "foundation",
    key: "context",
    text: "When AI helps with your work, what does it know about your business?",
    options: [
      { label: "Only what someone pastes in each time", value: 1 },
      { label: "Some notes or documents we've uploaded or connected", value: 3 },
      { label: "Our documents, data and experts' know-how, kept up to date", value: 5 },
    ],
  },
  {
    id: "access",
    kind: "foundation",
    key: "access",
    text: "How does AI get at your systems and data?",
    options: [
      { label: "It doesn't: people copy and paste", value: 1 },
      { label: "Through AI built into tools we already use", value: 3 },
      { label: "Through connections we've set up and approved", value: 4 },
      { label: "Through connections that reach only what each task needs, with a record of what AI did", value: 5 },
      {
        label: "Through a shared login, or one that can see far too much",
        detail: "Riskier than copy and paste, not further along",
        value: 1,
      },
    ],
  },
  {
    id: "checking",
    kind: "foundation",
    key: "checking",
    text: "How is AI's work checked before it's used?",
    options: [
      { label: "Each person checks their own, or doesn't", value: 1 },
      { label: "Someone reviews it before it's used", value: 3 },
      { label: "Automatic checks, with people signing off at set points", value: 5 },
    ],
  },
  {
    id: "measurement",
    kind: "foundation",
    key: "measurement",
    text: "How do you measure what AI changes?",
    options: [
      { label: "We don't", value: 1 },
      { label: "Rough estimates", value: 3 },
      { label: "Per workflow, compared with how it ran before", value: 5 },
    ],
  },
  {
    id: "rules",
    kind: "foundation",
    key: "rules",
    text: "What rules cover AI use?",
    options: [
      { label: "None, or informal guidance", value: 1 },
      { label: "A written policy", value: 3 },
      { label: "Approved tools, data rules, spend limits and a way to switch an agent off", value: 5 },
    ],
  },
  {
    id: "workflowChange",
    kind: "foundation",
    key: "workflowChange",
    text: "Has AI changed how any recurring work runs, not just how fast people do it?",
    options: [
      { label: "Not yet", value: 1 },
      { label: "We've tried pilots, but none is in daily use", value: 2 },
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
