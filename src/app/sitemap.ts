import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/copy/pages";
import type { LogEntry } from "@/lib/log/entries";
import { getLog } from "@/lib/log/get-log";
import { entryPath } from "@/lib/log/json-ld";
import { absoluteUrl } from "@/lib/site";

const logPaths = (entries: readonly LogEntry[]): readonly string[] => [
  "/log",
  ...entries.map((entry) => entryPath(entry.slug)),
];

export default function sitemap(entries: readonly LogEntry[] = getLog()): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...PAGES.map((p) => p.path), ...logPaths(entries)].map((path) => ({ url: absoluteUrl(path), lastModified }));
}
