# Placeholder decisions (2026-10-26)

Every `[TBD]` was filled or removed. The copy follows the founder decisions in
`fix/remove-site-placeholders`; the lines below are what still stands in for a
decision, or was cut until there's evidence.

## Standing in (confirm)
- **Contact:** the founders chose info@spliceworks.ai, but spliceworks.ai has no inbox (no MX records) yet, so the site and the booking form use hello@splicelabs.xyz. Switch by setting `CONTACT_EMAIL` on Vercel (then redeploy) once info@spliceworks.ai receives mail.
- **Booking form:** submissions are emailed to the contact inbox through Resend, sent from `BOOK_FROM` (forms@splicelabs.xyz in production) with reply-to set to the visitor.
- **Session price:** no number shown; "fee agreed with you before you book, credited in full."

## Removed (add back with evidence or a decision)
- "What if we don't go ahead?" and "Do we have to keep paying you?" answers (#3, #19); portfolio and program terms.
- All "confirmed result" lines; startup, small-company and portfolio case slots (#8).
- Station evidence: 24/7 monitoring, SLA-backed uptime, air-gapped self-hosting, the deployment options list (#12).
- Advisory response time (#23); value-vs-AI-spend and portfolio-reporting lines (#17).
- Data-handling extra line (#11); "final list of what's included" (#1); outcome-menu note (#22); "steps in between" on /book.
