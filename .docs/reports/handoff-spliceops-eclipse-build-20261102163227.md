# Handoff: spliceops-eclipse-build

## Objective
Build design canvas Option A v4 (Eclipse system) into this repo as the home page. Canvas: https://claude.ai/artifact/GVmG4zV2XrCXFozdPYybd5 (boards OptionA4, StyleLock). Decisions: memory homepage-redesign-decisions.

## Progress
- Done: branch chore/spliceops-domain, commits 698c5c0 (SITE_URL=https://www.spliceops.ai) and 6e34015 (BOOK_FROM, project.yaml, content). Tests green. Not pushed.
- In-flight: nothing uncommitted. Dev server on :3000 (old design). Read repo only; no Eclipse code written.
- Blocked: Beads DB absent (`bd list` errors); no bd tasks.

## Key Anchors
- `content/v5/pages/index.md` :: home copy; H1 must become "Splice, don't replace." + "Your CEO said..." sub-line
- `src/app/(marketing)/page.tsx` :: home maps getPage("/") sections (expects 6)
- `src/lib/copy/pages.ts` :: getPage, PAGES registry
- `src/providers/ThemeProvider.tsx` :: data-theme paper/ink, localStorage sw-theme
- `src/app/layout.tsx` :: root fonts, theme script, JSON-LD

## Decision Rationale
- New route group src/app/(eclipse) with own layout, home moved there: other pages keep old design (alt: reskin globals, high blast radius)
- Eclipse tokens scoped to an .eclipse wrapper keyed on [data-theme=ink]; fonts via next/font in that layout only
- Pricing: "A paid day, credited in full if you go on to work with us." No number. Estimate row: "After the pilot, if it reaches production". Keep hello@splicelabs.xyz.

## Next Steps
1. Read node_modules/next/dist/docs (Next 16.3.4), then TDD: update index.md copy, build (eclipse) layout + sections, commit per cycle
2. Sections: Weave hero (pause, reduced motion), gap pilots, path thread + step cards, picker + heat bar, Flow 5, Splice Log (6 entries, temp typed data), proof rows, build-it-yourself table, prompt card, CTA, tools strip
3. Then: check-up agent markdown route (fragment-prefilled link), src/content/log markdown pipeline
4. Generator scripts were in scratchpad gen/build*.py (ephemeral); canvas OptionA4.dc.html is the source of truth

## Open Questions
- Push branch and open PR now, or after the home page lands?
- Ink-mode orange text #FF8A55 unmeasured for contrast
