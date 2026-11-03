# Handoff: splice-log-entries

## Objective
Add Supadata, Jev x ManyChat, Jev image checks to the Splice Log. Spec: `.docs/reports/log-spec-20261103.md`.

## Progress
- PR #25 (Log UI) merged to main. DS #1/#2/#3 merged. PR #27 open: contact email hello@spliceops.ai.
- Branch `feat/log-supadata-jev` pushed, no PR yet: fenced code blocks (parser, LogBlocks, reading time) + 3 entries converted from spliceops.lrgfrmt.com/log/{supadata,jev,jev-image-checks}. Tests 296 pass, build ok. Codes: Jev 118, Supadata 119, image checks 123 (assigned; prototype's 120 was taken).
- No Beads workspace here; bd fails.

## Key Anchors
- `content/log/supadata.md`, `jev.md`, `jev-image-checks.md` :: converted entries
- `src/lib/copy/markdown.ts` :: new `code` block type
- `src/components/log/LogBlocks.tsx` :: pre/code render

## Decision Rationale
- Left out: prototype banners, sign-in gated Splice fork, "How does Splice Labs use Supadata" (marked to confirm).
- Slugs kept as the user's URLs (`jev` is the ManyChat one).

## Next Steps
1. Open PR for `feat/log-supadata-jev` into main; browser-check the three entries (code blocks, tables).
2. Confirm with user: stage guesses (Supadata enabled, Jevs native), disclosures (none written), Angelo byline kept as text only.
3. Merge #27 when user says; uncommitted hook line in `.docs/canonical/tdd-violations.log` is not mine.

## Open Questions
- Any maker or client affiliation needing a `disclosure`? UNKNOWN.
- Supadata "Splice fork" install and Splice usage answer: add once confirmed?
