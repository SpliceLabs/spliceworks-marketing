# ADR 0006: Dates are written D MMM YYYY

Status: Accepted, 2026-11-03.

## Context

The design system wrote dotted DD.MM.YYYY dates (03.11.2026), which a US reader takes as 11 March. `content/VOICE.md` already gives "6 Sep 2026 · 4 min" for meta lines.

## Decision

All dates read as D MMM YYYY ("4 Nov 2026"), with uppercase added by CSS in kickers. Frontmatter stays ISO (2026-11-04); pages use `<time datetime>` and structured data uses ISO. The design system README and previews change to match.

## Consequences

English month abbreviations ("Sep", not "Sept"). No dotted dates exist elsewhere in this repo, so nothing else migrates.

## Revisit when

- The site is localized or most readers read in another language: format by locale.
- The design system and `VOICE.md` disagree again.
