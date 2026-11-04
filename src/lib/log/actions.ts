import type { LogEntry } from "./entries";
import { splitSections } from "./sections";

export type EntryAction = {
  readonly label: string;
  readonly href: string;
  readonly style: "primary" | "ghost";
  readonly down: boolean;
};

const INSTALL_HEADING = "Install and connect";

const toolActions = (entry: LogEntry): readonly EntryAction[] => {
  const { sections } = splitSections(entry.body);
  const install = sections.find((section) => section.heading === INSTALL_HEADING);
  return [
    ...(install ? [{ label: INSTALL_HEADING, href: `#${install.slug}`, style: "primary" as const, down: true }] : []),
    { label: "Read the full spec", href: "#spec", style: "ghost", down: false },
  ];
};

const launchActions = (entry: LogEntry): readonly EntryAction[] =>
  entry.cta ? [{ label: entry.cta.label, href: entry.cta.href, style: "primary", down: false }] : [];

const typeActions = (entry: LogEntry): readonly EntryAction[] => {
  if (entry.type === "tool") return toolActions(entry);
  if (entry.type === "launch") return launchActions(entry);
  return [];
};

export const entryActions = (entry: LogEntry, writeUpHref?: string): readonly EntryAction[] => [
  ...typeActions(entry),
  ...(writeUpHref
    ? [{ label: "Read the full write-up", href: writeUpHref, style: "ghost" as const, down: false }]
    : []),
];

const EXAMPLES_HEADING = "Examples of the output";

export const writeUpActions = (writeUp: LogEntry): readonly EntryAction[] => {
  const examples = splitSections(writeUp.body).sections.find((section) => section.heading === EXAMPLES_HEADING);
  return [
    { label: "Back to the entry", href: `/log/${writeUp.parent}`, style: "primary", down: false },
    ...(examples
      ? [{ label: "See the examples", href: `#${examples.slug}`, style: "ghost" as const, down: true }]
      : []),
  ];
};
