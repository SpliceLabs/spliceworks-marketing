export type SortKey = "newest";

type Browsable = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly published: string;
};

type BrowseOptions = { readonly query: string; readonly sort: SortKey };

const newestFirst = (a: Browsable, b: Browsable): number =>
  b.published.localeCompare(a.published) || a.slug.localeCompare(b.slug);

export const browse = <T extends Browsable>(entries: readonly T[], { sort }: BrowseOptions): readonly T[] =>
  sort === "newest" ? entries.toSorted(newestFirst) : entries;
