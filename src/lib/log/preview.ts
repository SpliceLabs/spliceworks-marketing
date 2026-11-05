import { isPublished, type AnyEntry, type DraftEntry, type LogEntry } from "./entries";

type Env = { readonly NODE_ENV?: string; readonly LOG_SHOW_DRAFTS?: string };

export const showDrafts = (env: Env): boolean => env.NODE_ENV === "development" && env.LOG_SHOW_DRAFTS === "1";

const promote = (draft: DraftEntry, today: string): LogEntry => ({
  ...draft,
  status: "published",
  title: `[Draft] ${draft.title}`,
  description: draft.description ?? "Draft: no description yet.",
  published: draft.published ?? today,
  stage: draft.stage ?? "absent",
});

export const previewEntries = (entries: readonly AnyEntry[], today: string): readonly LogEntry[] =>
  entries.map((entry) => (isPublished(entry) ? entry : promote(entry, today)));
