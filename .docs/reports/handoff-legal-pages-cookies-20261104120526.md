# Handoff: legal-pages-cookies

## Objective
Plain legal pages on spliceops.ai (LegalDoc layout): Privacy and Terms merged; Cookie Policy plus footer Legal group in PR #50.

## Progress
- In-flight: PR #50 (feat/cookie-policy) open, CI green, NOT merged. Contains /cookies, footer Legal column, so- storage key rename.
- Blocked: user must confirm prefix is `so-` (message was cut off; I assumed so-theme, so-mode, so-consent) and "no advertising cookies" is true.

## Key Anchors
- `content/v5/pages/cookies.md` :: Cookie Policy copy, provisional
- `src/components/copy/LegalPage.tsx` :: LEGAL_PATHS order sets "Legal / NN"
- `src/components/ds/SiteFooter.tsx` :: COLUMNS, new Legal group
- `src/lib/analytics/consent.ts` :: CONSENT_KEY = so-consent

## Decision Rationale
- Renamed keys with no migration: old sw-* values are lost, so returning visitors see the banner and reset theme once (alternative: fallback read of old keys).
- Delaware law and Delaware courts in Terms, flat $100 cap (user decision).

## Next Steps
1. Ask user: confirm so- prefix, then merge PR #50 (merge needs their yes).
2. After deploy, check /privacy, /terms, /cookies in Paper and the footer wrap (Legal lands on row 2).
3. Counsel review (user does it): governing law/venue, indemnification, consent banner and country restriction, booking retention (24 months), Gojiberry DPA, CCPA.
4. Cleanup worktrees: spliceworks-marketing-{consent,hero,legal,terms,cookies,launch}; scratchpad ds clone; server on port 3222.

## Open Questions
- Does `.lgl-table` need bottom margin in the DS (a table directly above a paragraph is tight)? Worked around in copy.
