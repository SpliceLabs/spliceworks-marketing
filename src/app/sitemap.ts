import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/copy/pages";
import type { LogEntry } from "@/lib/log/entries";
import { getLog, getWriteUp } from "@/lib/log/get-log";
import { entryPath } from "@/lib/log/json-ld";

type HasWriteUp = (slug: string) => boolean;
import { absoluteUrl } from "@/lib/site";

const logPaths = (entries: readonly LogEntry[], hasWriteUp: HasWriteUp): readonly string[] => [
  "/log",
  ...entries.flatMap(({ slug }) => [entryPath(slug), ...(hasWriteUp(slug) ? [`${entryPath(slug)}/write-up`] : [])]),
];

const defaultHasWriteUp: HasWriteUp = (slug) => Boolean(getWriteUp(slug));

export default function sitemap(
  entries: readonly LogEntry[] = getLog(),
  hasWriteUp: HasWriteUp = defaultHasWriteUp,
): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...PAGES.map((p) => p.path), ...logPaths(entries, hasWriteUp)].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
