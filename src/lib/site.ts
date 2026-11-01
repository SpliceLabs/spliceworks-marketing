/** The site's origin and absolute URLs. No imports, so client and layout code can use it too. */
export const SITE_URL = "https://spliceworks.ai";

export const OG_IMAGE = {
  url: "/og/splice-ops.png",
  width: 1200,
  height: 630,
  alt: "Splice Ops: AI in production, with a named human accountable at every gate.",
};

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const absoluteUrl = (urlPath: string): string => `${SITE_URL}${urlPath === "/" ? "" : urlPath}`;
