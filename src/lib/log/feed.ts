import { TYPE_LABELS } from "./types";
import type { LogEntry } from "./entries";

const escapeXml = (text: string): string =>
  text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

const rfc822 = (isoDate: string): string => new Date(`${isoDate}T00:00:00Z`).toUTCString();

const item = (entry: LogEntry, siteUrl: string): string => {
  const link = `${siteUrl}/log/${entry.slug}`;
  return [
    "<item>",
    `<title>${escapeXml(entry.title)}</title>`,
    `<link>${link}</link>`,
    `<guid isPermaLink="true">${link}</guid>`,
    `<pubDate>${rfc822(entry.published)}</pubDate>`,
    `<description>${escapeXml(entry.description)}</description>`,
    `<category>${TYPE_LABELS[entry.type]}</category>`,
    "</item>",
  ].join("");
};

export const rssXml = ({
  entries,
  siteUrl,
}: {
  readonly entries: readonly LogEntry[];
  readonly siteUrl: string;
}): string => {
  const newest = entries
    .map((entry) => entry.published)
    .toSorted()
    .at(-1);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    "<title>SpliceOps Splice Log</title>",
    `<link>${siteUrl}/log</link>`,
    "<description>What we tested, what we built, what we think about putting AI to work. Dated and sourced.</description>",
    "<language>en</language>",
    `<atom:link href="${siteUrl}/log/feed.xml" rel="self" type="application/rss+xml"/>`,
    newest ? `<lastBuildDate>${rfc822(newest)}</lastBuildDate>` : "",
    ...entries.map((entry) => item(entry, siteUrl)),
    "</channel>",
    "</rss>",
  ].join("");
};
