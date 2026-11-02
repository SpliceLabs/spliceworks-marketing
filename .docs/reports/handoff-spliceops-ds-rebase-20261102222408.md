# Handoff: spliceops-ds-rebase

## Objective
Rebase site on SpliceOps design system (github.com/lrgfrmt/spliceops-design-system v0.1.0) + own compatible Ink theme; fix weave animation (opaque agent pills, orange redraft loop). Branch chore/spliceops-domain, nothing pushed.

## Progress
- Done+committed: animations; vendored DS (src/styles/spliceops); ink.css + parity/contrast test; site.css layer; DS nav/footer/.bg shell; tcards for tables/subsections/home; AskBox; ticket strip.
- In-flight: visual pass. Not yet checked: Paper/Ink on /team /station /for /faq /tools /book /industries; mobile 390px (window cannot narrow; try playwright/REA capture); animation seen only statically.
- Blocked: none. Beads absent; no bd tasks.

## Key Anchors
- `src/styles/site.css` :: site layer (fonts to next/font, legacy --color-* remap, weave tokens, layout engine, ec-* keyframes)
- `src/styles/ink.css` :: Ink role overrides; `ink.test.ts` guards parity+4.5:1
- `src/lib/home/weave-timing.ts` :: redraft path, turn %, speed (ds css keyframe ec-retry-turn 29.07%)
- `src/components/copy/CopyPage.tsx` :: section rhythm, pagehead, AskBox
- `src/components/eclipse/sections/SpliceLog.tsx` :: ticket strip

## Decision Rationale
- Weave diagram keeps teal --person and violet --retry (not DS colours): user wants retry dot to turn orange.
- Kept Eclipse H1 "Splice, don't replace." (DS hero uses "Integrating AI into your world." + serif accent line).
- Did not edit content/: founder-owned copy says "Splice Ops", has en dashes (book.md 1–5 options may be matched in code).

## Next Steps
1. Finish screenshot pass (both themes) + mobile check; verify weave animation live.
2. Cleanup: dead CSS (.pillars,.logrow,.lcard,.ht in site.css), dead components (HabitatHero, HomeHero, HomeCta, TwoStepPath, ModeToggle, ThemeToggle, ModeProvider), old design-system/ folder.
3. Known gaps: empty left column beside check cards; orb repeats across pages; .g3/.g4 legacy; EntryLayout (services-only) unused; Hero/Fold/StagePath/PromptCard not DS markup; E-videos not used.
4. GH #19 Any team industries page.
5. Ask user: push + PR?

## Open Questions
- SpliceOps vs "Splice Ops" naming and dash rule: founders to decide; metadata/JSON-LD untouched (SEO).
- TDD guard: ≤1 net new test per commit, measured on whole working tree (stash to split).
