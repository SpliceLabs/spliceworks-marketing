import type { Metadata } from "next";
import { OG_IMAGE, absoluteUrl } from "@/lib/site";
import type { LogEntry } from "./entries";
import { entryImagePath, entryPath } from "./json-ld";

export const logMetadata = ({
  title,
  description,
  path,
}: {
  readonly title: string;
  readonly description: string;
  readonly path: string;
}): Metadata => ({
  title: { absolute: title },
  description,
  alternates: { canonical: path, types: { "application/rss+xml": "/log/feed.xml" } },
  openGraph: {
    title,
    description,
    url: absoluteUrl(path),
    siteName: "SpliceOps",
    locale: "en_US",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
});

export const entryMetadata = (entry: LogEntry): Metadata => {
  const image = {
    url: entryImagePath(entry),
    width: 1200,
    height: 630,
    alt: entry.hero?.alt ?? `${entry.title}, ${entry.code}`,
  };
  const title = `${entry.title} | Splice Log`;
  return {
    title: { absolute: title },
    description: entry.description,
    alternates: { canonical: entryPath(entry.slug) },
    openGraph: {
      title,
      description: entry.description,
      url: absoluteUrl(entryPath(entry.slug)),
      siteName: "SpliceOps",
      locale: "en_US",
      type: "article",
      publishedTime: entry.published,
      modifiedTime: entry.updated,
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: entry.description, images: [image.url] },
  };
};
