/**
 * Server-only access to the vendored v5 copy package (content/v5/pages).
 * Pages are statically prerendered, so these files are read at build time.
 */
import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/contact";
import { parsePage, type ParsedPage } from "./markdown";

export const SITE_URL = "https://spliceworks.ai";

export interface PageEntry {
  /** URL path on the site. */
  path: string;
  /** Copy file, relative to content/v5/pages. */
  file: string;
  /** Section label for the page eyebrow (the sitemap's nav label for the parent). */
  group?: { label: string; href: string };
}

const SERVICES = { label: "Services", href: "/services" };
const FOR = { label: "Who it's for", href: "/for" };
const INDUSTRIES = { label: "Industries", href: "/industries" };
const TOOLS = { label: "Free tools", href: "/tools" };

/** Every page on the site, in sitemap order (03-sitemap/works-site-sitemap.md). */
export const PAGES: PageEntry[] = [
  { path: "/", file: "index.md" },
  { path: "/services", file: "services/index.md" },
  { path: "/services/ai-enabled", file: "services/ai-enabled.md", group: SERVICES },
  { path: "/services/ai-native", file: "services/ai-native.md", group: SERVICES },
  { path: "/services/fractional", file: "services/fractional.md", group: SERVICES },
  { path: "/for", file: "for/index.md" },
  { path: "/for/ceos-and-boards", file: "for/ceos-and-boards.md", group: FOR },
  { path: "/for/technology-leaders", file: "for/technology-leaders.md", group: FOR },
  { path: "/for/founders", file: "for/founders.md", group: FOR },
  { path: "/for/accelerators", file: "for/accelerators.md", group: FOR },
  { path: "/for/investors", file: "for/investors.md", group: FOR },
  { path: "/industries", file: "industries/index.md" },
  { path: "/industries/manufacturing", file: "industries/manufacturing.md", group: INDUSTRIES },
  { path: "/industries/agencies", file: "industries/agencies.md", group: INDUSTRIES },
  { path: "/how-it-works", file: "how-it-works.md" },
  { path: "/team", file: "team.md" },
  { path: "/work", file: "work.md" },
  { path: "/book", file: "book.md" },
  { path: "/faq", file: "faq.md" },
  { path: "/station", file: "station.md" },
  { path: "/tools", file: "tools/index.md" },
  { path: "/tools/ai-cost-of-delay", file: "tools/ai-cost-of-delay.md", group: TOOLS },
];

const COPY_DIR = path.join(process.cwd(), "content", "v5", "pages");
const cache = new Map<string, ParsedPage>();

export function getEntry(urlPath: string): PageEntry {
  const entry = PAGES.find((p) => p.path === urlPath);
  if (!entry) throw new Error(`No copy registered for ${urlPath}`);
  return entry;
}

/** Copy source with `{{contact_email}}` filled in from the env-configured inbox. */
export function readCopySource(file: string): string {
  return fs.readFileSync(path.join(COPY_DIR, file), "utf8").replaceAll("{{contact_email}}", CONTACT_EMAIL);
}

export function getPage(urlPath: string): ParsedPage {
  const cached = cache.get(urlPath);
  if (cached) return cached;
  const entry = getEntry(urlPath);
  const page = parsePage(readCopySource(entry.file));
  if (page.fm.url !== urlPath) {
    throw new Error(`${entry.file} declares url ${page.fm.url}, registered at ${urlPath}`);
  }
  cache.set(urlPath, page);
  return page;
}

/** Title and description come straight from the copy file's front matter. */
export function pageMetadata(urlPath: string): Metadata {
  const { fm } = getPage(urlPath);
  const url = `${SITE_URL}${urlPath === "/" ? "" : urlPath}`;
  return {
    title: { absolute: fm.title },
    description: fm.description,
    alternates: { canonical: urlPath },
    openGraph: { title: fm.title, description: fm.description, url, siteName: "Splice Works", type: "website" },
    twitter: { card: "summary_large_image", title: fm.title, description: fm.description },
  };
}
