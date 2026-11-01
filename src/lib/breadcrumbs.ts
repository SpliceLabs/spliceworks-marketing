import type { PageEntry } from "@/lib/copy/pages";
import { absoluteUrl } from "@/lib/site";

export function breadcrumbJsonLd(entry: PageEntry, title: string) {
  const crumbs = [
    { name: "Home", url: absoluteUrl("/") },
    ...(entry.group ? [{ name: entry.group.label, url: absoluteUrl(entry.group.href) }] : []),
    { name: title, url: absoluteUrl(entry.path) },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}
