import { ORGANIZATION_ID, absoluteUrl } from "@/lib/site";
import type { LogEntry } from "./entries";

export const entryPath = (slug: string): string => `/log/${slug}`;

export const pagePath = (entry: LogEntry): string =>
  entry.parent ? `${entryPath(entry.parent)}/write-up` : entryPath(entry.slug);

export const entryImagePath = (entry: LogEntry): string =>
  entry.hero?.src ?? `${entryPath(entry.parent ?? entry.slug)}/og.png`;

export const articleJsonLd = (entry: LogEntry) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: entry.title,
  description: entry.description,
  datePublished: entry.published,
  dateModified: entry.updated ?? entry.published,
  mainEntityOfPage: absoluteUrl(pagePath(entry)),
  image: absoluteUrl(entryImagePath(entry)),
  author: entry.author ? { "@type": "Person", name: entry.author } : { "@id": ORGANIZATION_ID },
  publisher: { "@id": ORGANIZATION_ID },
});
