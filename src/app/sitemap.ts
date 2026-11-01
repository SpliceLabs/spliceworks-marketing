import type { MetadataRoute } from "next";
import { PAGES } from "@/lib/copy/pages";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map((p) => ({ url: absoluteUrl(p.path), lastModified }));
}
