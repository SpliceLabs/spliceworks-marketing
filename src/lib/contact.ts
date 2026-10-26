/**
 * Contact addresses, read on the server at build time (pages are prerendered,
 * so changing them on Vercel takes a redeploy). Server-only: these env vars
 * aren't NEXT_PUBLIC_, so don't import this from a client component.
 *
 * CONTACT_EMAIL  shown on the site (footer, /book) and in `{{contact_email}}` in the copy
 * BOOK_TO        where /book submissions are sent (defaults to CONTACT_EMAIL)
 *
 * The founders chose info@spliceworks.ai; switch CONTACT_EMAIL to it once that
 * domain receives mail.
 */
export const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hello@splicelabs.xyz";

export const BOOK_TO = process.env.BOOK_TO || CONTACT_EMAIL;
