export const SORT_KEYS = ["newest", "oldest", "az"] as const;

export type SortKey = (typeof SORT_KEYS)[number];

export const SORT_LABELS: Readonly<Record<SortKey, string>> = {
  newest: "Newest first",
  oldest: "Oldest first",
  az: "A to Z",
};

type Browsable = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly published: string;
};

type BrowseOptions = { readonly query: string; readonly sort: SortKey };

const newestFirst = (a: Browsable, b: Browsable): number =>
  b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug);

const COMPARATORS: Readonly<Record<SortKey, (a: Browsable, b: Browsable) => number>> = {
  newest: newestFirst,
  oldest: (a, b) => a.published.localeCompare(b.published) || a.slug.localeCompare(b.slug),
  az: (a, b) => a.title.localeCompare(b.title) || a.slug.localeCompare(b.slug),
};

const matches = (entry: Browsable, query: string): boolean => {
  const haystack = `${entry.title} ${entry.description}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
};

export const browse = <T extends Browsable>(entries: readonly T[], { query, sort }: BrowseOptions): readonly T[] =>
  entries.toSorted(COMPARATORS[sort]).filter((entry) => matches(entry, query));

const SORT_STATUS: Readonly<Record<SortKey, string>> = {
  newest: "Sorted newest first",
  oldest: "Sorted oldest first",
  az: "Sorted A to Z",
};

export const sortStatus = (sort: SortKey): string => SORT_STATUS[sort];

export const countLabel = (count: number): string => `Showing ${count} ${count === 1 ? "entry" : "entries"}`;
