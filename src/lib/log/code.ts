export type CodedEntry = { readonly slug: string; readonly published: string; readonly code?: string };

export type CodeAssignment = { readonly slug: string; readonly code: string };

export type CodeProblems = {
  readonly missing: readonly string[];
  readonly malformed: readonly string[];
  readonly duplicates: readonly { readonly code: string; readonly slugs: readonly string[] }[];
};

const MAX_CODE_NUMBER = 99999;
const CODE_PATTERN = /^LG-(\d{5})$/;

export const formatCode = (n: number): string => {
  if (!Number.isInteger(n) || n < 1 || n > MAX_CODE_NUMBER) throw new Error(`Entry code number out of range: ${n}`);
  return `LG-${String(n).padStart(5, "0")}`;
};

export const codeNumber = (code: string): number | null => {
  const match = CODE_PATTERN.exec(code);
  return match ? Number(match[1]) : null;
};

const byPublishedThenSlug = (a: CodedEntry, b: CodedEntry): number =>
  a.published.localeCompare(b.published) || a.slug.localeCompare(b.slug);

export const assignCodes = (entries: readonly CodedEntry[]): readonly CodeAssignment[] => {
  const highest = entries.reduce((max, entry) => Math.max(max, (entry.code && codeNumber(entry.code)) || 0), 0);
  return entries
    .filter((entry) => !entry.code)
    .toSorted(byPublishedThenSlug)
    .map((entry, index) => ({ slug: entry.slug, code: formatCode(highest + index + 1) }));
};

type WithCode = CodedEntry & { readonly code: string };

const hasCode = (entry: CodedEntry): entry is WithCode => Boolean(entry.code);

export const codeProblems = (entries: readonly CodedEntry[]): CodeProblems => {
  const coded = entries.filter(hasCode);
  const bySlug = (list: readonly CodedEntry[]) => list.map((entry) => entry.slug);
  const duplicates = [...new Set(coded.map((entry) => entry.code))]
    .map((code) => ({ code, slugs: bySlug(coded.filter((entry) => entry.code === code)) }))
    .filter((group) => group.slugs.length > 1);
  return {
    missing: bySlug(entries.filter((entry) => !entry.code)),
    malformed: bySlug(coded.filter((entry) => codeNumber(entry.code) === null)),
    duplicates,
  };
};
