import type { LogEntry } from "./entries";

export const makeEntry = (over: Partial<LogEntry> = {}): LogEntry => ({
  type: "guide",
  title: "A guide",
  description: "One sentence.",
  published: "2026-11-04",
  status: "published",
  stage: "absent",
  code: "LG-00001",
  sources: [{ title: "A source", url: "https://example.com/a" }],
  slug: "a-guide",
  body: "Body.",
  readingMinutes: 1,
  ...over,
});
