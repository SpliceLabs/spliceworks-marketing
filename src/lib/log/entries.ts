import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { codeProblems } from "./code";
import { readingMinutes } from "./reading-time";
import { parseFrontmatter, type LogFrontmatter } from "./schema";

export type LogEntry = LogFrontmatter & {
  readonly slug: string;
  readonly body: string;
  readonly readingMinutes: number;
};

const RESERVED_SLUGS = ["type", "stage", "feed"];
const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const FRONTMATTER_BLOCK = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export const isWriteUp = (entry: LogEntry): boolean => Boolean(entry.parent);

export const todayUtc = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

const fail = (slug: string, problems: readonly string[]): never => {
  throw new Error(`Log entry "${slug}": ${problems.join("; ")}`);
};

export const parseEntry = (slug: string, source: string): LogEntry => {
  if (!SLUG_PATTERN.test(slug) || RESERVED_SLUGS.includes(slug)) {
    return fail(slug, ["the slug must be lowercase words joined by hyphens and cannot be type, stage or feed"]);
  }
  const block = FRONTMATTER_BLOCK.exec(source);
  if (!block) return fail(slug, ["the file must start with a frontmatter block between --- lines"]);
  const parsed = parseFrontmatter(parse(block[1]));
  if (!parsed.ok) return fail(slug, parsed.errors);
  const body = block[2].trim();
  return { ...parsed.data, slug, body, readingMinutes: readingMinutes(body) };
};

export const isLive = (entry: LogEntry, today: string): boolean =>
  entry.status === "published" && entry.published <= today;

export const sortNewestFirst = (entries: readonly LogEntry[]): readonly LogEntry[] =>
  entries.toSorted((a, b) => b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug));

export const liveEntries = (entries: readonly LogEntry[], today: string): readonly LogEntry[] =>
  entries.filter((entry) => isLive(entry, today));

type LoadOptions = { readonly requireCodes?: boolean };

const verifyCodes = (entries: readonly LogEntry[]): void => {
  const { missing, malformed, duplicates } = codeProblems(entries.filter((entry) => !isWriteUp(entry)));
  const problems = [
    ...missing.map((slug) => `missing code in ${slug} (run pnpm log:codes)`),
    ...malformed.map((slug) => `malformed code in ${slug}`),
    ...duplicates.map((d) => `${d.code} is used by ${d.slugs.join(" and ")}`),
  ];
  if (problems.length) throw new Error(`Log codes: ${problems.join("; ")}`);
};

const verifyRelated = (entries: readonly LogEntry[]): void => {
  const slugs = new Set(entries.map((entry) => entry.slug));
  const unknown = entries.flatMap((entry) =>
    (entry.related ?? []).filter((slug) => !slugs.has(slug)).map((slug) => `${entry.slug} -> ${slug}`),
  );
  if (unknown.length) throw new Error(`Log related entries that do not exist: ${unknown.join("; ")}`);
};

const verifyParents = (entries: readonly LogEntry[]): void => {
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const writeUps = entries.filter(isWriteUp);
  const problems = [
    ...writeUps.flatMap(({ slug, parent = "" }) => {
      const target = bySlug.get(parent);
      if (!target) return [`${slug} names a parent that does not exist: ${parent}`];
      return isWriteUp(target) ? [`${slug} hangs off ${parent}, which is itself a write-up`] : [];
    }),
    ...[...new Set(writeUps.map((entry) => entry.parent))].flatMap((parent) => {
      const slugs = writeUps.filter((entry) => entry.parent === parent).map((entry) => entry.slug);
      return slugs.length > 1 ? [`${parent} has more than one write-up: ${slugs.join(" and ")}`] : [];
    }),
  ];
  if (problems.length) throw new Error(`Log write-ups: ${problems.join("; ")}`);
};

export const loadEntries = (dir: string, options: LoadOptions = {}): readonly LogEntry[] => {
  const { requireCodes = true } = options;
  const entries = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => parseEntry(file.slice(0, -3), fs.readFileSync(path.join(dir, file), "utf8")));
  if (requireCodes) verifyCodes(entries);
  verifyRelated(entries);
  verifyParents(entries);
  return sortNewestFirst(entries);
};

export const logDir = (): string => process.env.LOG_CONTENT_DIR ?? path.join(process.cwd(), "content", "log");
