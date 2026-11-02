/**
 * Contact addresses, read on the server at build time (pages are prerendered,
 * so changing them on Vercel takes a redeploy). Server-only: these env vars
 * aren't NEXT_PUBLIC_, so don't import this from a client component.
 *
 * CONTACT_EMAIL  shown on the site (footer, /book) and in `{{contact_email}}` in the copy
 * BOOK_TO        where /book submissions are sent (defaults to CONTACT_EMAIL)
 *
 * The site uses hello@splicelabs.xyz until a spliceops.ai address is confirmed to
 * receive mail; then switch CONTACT_EMAIL to it.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@splicelabs.xyz";

export const BOOK_TO = process.env.BOOK_TO || CONTACT_EMAIL;
