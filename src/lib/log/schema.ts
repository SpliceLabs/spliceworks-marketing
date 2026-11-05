import { z } from "zod";
import { isIsoDate } from "./format-date";

export const ENTRY_TYPES = ["tool", "case", "research", "analysis", "perspective", "guide", "launch"] as const;
export const STAGES = ["absent", "enabled", "native", "all"] as const;
export const ROLES = ["ceo", "tech", "founder", "accelerator", "investor"] as const;
export const TOOL_STATUSES = ["added", "testing", "watching", "in-use", "live"] as const;
export const ENTRY_STATUSES = ["draft", "published"] as const;

export type EntryType = (typeof ENTRY_TYPES)[number];
export type Stage = (typeof STAGES)[number];

const isoDate = z.string().refine(isIsoDate, "must be a calendar date written YYYY-MM-DD");
const text = z.string().trim().min(1, "must not be empty");
const sitePath = z
  .string()
  .regex(/^\/(?![/\\])\S*$/, "must be a path on this site: a single leading /, no backslash after it, no whitespace");

const TYPES_NEEDING_SOURCES: readonly EntryType[] = ["analysis", "research", "guide"];
const TYPES_NEEDING_DISCLOSURE: readonly EntryType[] = ["launch"];
const TYPES_NEEDING_CHECKED: readonly EntryType[] = ["tool", "research"];

const shared = {
  type: z.enum(ENTRY_TYPES),
  title: text,
  lede_em: text.optional(),
  updated: isoDate.optional(),
  roles: z.array(z.enum(ROLES)).optional(),
  code: z
    .string()
    .regex(/^LG-\d{5}$/, "must be LG- followed by 5 digits")
    .optional(),
  tool_status: z.enum(TOOL_STATUSES).optional(),
  checked: isoDate.optional(),
  sources: z.array(z.strictObject({ title: text, url: z.url() })).optional(),
  disclosure: text.optional(),
  series: text.optional(),
  author: text.optional(),
  client: text.optional(),
  hero: z
    .strictObject({
      src: sitePath,
      alt: text,
      video: sitePath.optional(),
    })
    .optional(),
  related: z.array(text).optional(),
  parent: text.optional(),
  pinned: z.boolean().optional(),
  cta: z.strictObject({ label: text, href: sitePath }).optional(),
};

type Rules = {
  readonly type: EntryType;
  readonly description?: string;
  readonly published?: string;
  readonly updated?: string;
  readonly lede_em?: string;
  readonly tool_status?: string;
  readonly parent?: string;
  readonly code?: string;
};

type Check = (path: string, message: string) => void;

const checkWhenPresent = (value: Rules, issue: Check): void => {
  if (value.lede_em && value.description && !value.description.includes(value.lede_em)) {
    issue("lede_em", "must be a phrase that appears in the description");
  }
  if (value.tool_status && value.type !== "tool") issue("tool_status", "only allowed on tool entries");
  if (value.parent && value.code)
    issue("code", "a write-up shares the code of its parent, so it must not carry its own");
  if (value.updated && value.published && value.updated < value.published) {
    issue("updated", "must not be before published");
  }
};

const publishedSchema = z
  .strictObject({
    ...shared,
    status: z.literal("published"),
    description: text,
    published: isoDate,
    stage: z.enum(STAGES),
  })
  .superRefine((value, ctx) => {
    const issue: Check = (path, message) => ctx.addIssue({ code: "custom", path: [path], message });
    if (TYPES_NEEDING_SOURCES.includes(value.type) && !value.sources?.length) {
      issue("sources", `required for ${value.type} entries: list at least one source`);
    }
    if (TYPES_NEEDING_CHECKED.includes(value.type) && !value.checked) {
      issue("checked", `required for ${value.type} entries: the date the facts were checked`);
    }
    if (TYPES_NEEDING_DISCLOSURE.includes(value.type) && !value.disclosure) {
      issue("disclosure", `required for ${value.type} entries: say who built the product`);
    }
    checkWhenPresent(value, issue);
  });

const draftSchema = z
  .strictObject({
    ...shared,
    status: z.literal("draft"),
    description: text.optional(),
    published: isoDate.optional(),
    stage: z.enum(STAGES).optional(),
  })
  .superRefine((value, ctx) =>
    checkWhenPresent(value, (path, message) => ctx.addIssue({ code: "custom", path: [path], message })),
  );

const schema = z.discriminatedUnion("status", [publishedSchema, draftSchema]);

export type PublishedFrontmatter = z.infer<typeof publishedSchema>;
export type DraftFrontmatter = z.infer<typeof draftSchema>;
export type LogFrontmatter = z.infer<typeof schema>;

export type ParsedFrontmatter =
  { readonly ok: true; readonly data: LogFrontmatter } | { readonly ok: false; readonly errors: readonly string[] };

export const parseFrontmatter = (input: unknown): ParsedFrontmatter => {
  const result = schema.safeParse(input);
  if (result.success) return { ok: true, data: result.data };
  return {
    ok: false,
    errors: result.error.issues.map((issue) => {
      const unknownKeys = issue.code === "unrecognized_keys" ? issue.keys.join(", ") : "";
      const path = unknownKeys || issue.path.join(".");
      return `${path}: ${issue.message}`;
    }),
  };
};
