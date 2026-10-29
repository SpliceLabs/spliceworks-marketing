/** The site's origin and absolute URLs. No imports, so client and layout code can use it too. */
export const SITE_URL = "https://spliceworks.ai";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export const absoluteUrl = (urlPath: string): string => `${SITE_URL}${urlPath === "/" ? "" : urlPath}`;
