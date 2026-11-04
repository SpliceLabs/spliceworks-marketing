import { SITE_URL } from "@/lib/site";

/** Markdown with site-relative links made absolute, for agents reading it off-site. */
export const absolutizeLinks = (md: string): string =>
  md.replace(/\]\(\//g, `](${SITE_URL}/`).replace(/→ \/([a-z0-9/-]*)/g, (_, p) => `→ ${SITE_URL}/${p}`);

/** A log entry body for plain-text readers: absolute links, and no display-only image markers. */
export const machineBody = (md: string): string => absolutizeLinks(md).replace(/\)\{scroll\}/g, ")");
