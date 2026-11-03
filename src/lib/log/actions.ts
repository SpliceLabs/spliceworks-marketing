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

export const entryActions = (entry: LogEntry): readonly EntryAction[] => {
  if (entry.type === "tool") return toolActions(entry);
  if (entry.type === "launch") return launchActions(entry);
  return [];
};
