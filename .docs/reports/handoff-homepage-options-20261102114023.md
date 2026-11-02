# Handoff: homepage-options

## Objective
Choose and refine a spliceops.ai homepage redesign (Angelo's proposal as base). Domain migration done: spliceops.ai live, spliceworks.ai redirects. Repo untouched; no code changes yet.

## Progress
- Done: 5-seat panel vs flowscope, foaster, soren, tenex.co (not .com/.ai), codos.ai; 3-seat panel (visual, brand, buyer) on Angelo's proposal https://spliceops.lrgfrmt.com/
- Done: Design canvas, private, 8 boards: 3 options, mix-and-match, seams, themes+contrast, journey. Nothing rendered or verified.
- In-flight: waiting on user pick of theme, seam, copy.
- Blocked: Beads DB absent (`bd list` errors), no bd tasks created.

## Key Anchors
- https://claude.ai/artifact/GVmG4zV2XrCXFozdPYybd5 :: canvas, read project/*.dc.html (Home, Seam are core)
- `design-system/tokens/colors.css` :: real Paper/Ink tokens (theme 1)
- `src/lib/site.ts` :: SITE_URL still `https://spliceworks.ai`, stale after migration
- scratchpad `proposal-brand.md`, `proposal-buyer.md` :: panel notes, ephemeral /private/tmp, may be gone

## Decision Rationale
- Splice, don't replace = H1 in all options: brand seat, strongest ownable line (alt: Integrating AI into your world)
- Peach dropped: codos.ai territory; tenex.co uses the same AI-absent to AI-native ladder
- Build-it-yourself table: confident tone, only claims the site already makes, no stats

## Next Steps
1. Get user pick: theme (Operator, Cobalt, Human Magenta), seam (stitch, splice, flow), copy (c1-c3); user wants Paper/Ink toggle kept
2. Run axe + keyboard + mobile check; audit Angelo's live prototype too if asked
3. Test claude.ai and Gemini prefill links; only ChatGPT ?q= likely works
4. Update SITE_URL, sitemap/robots tests, project.yaml, BOOK_FROM to spliceops.ai (TDD)
5. Fill [PRICE], [YOUR ESTIMATE], confirm contact email (hello@splicelabs.xyz is the repo default)

## Open Questions
- Which tenex is intended: tenex.co assumed from user
- Canvas is private; Angelo needs a Share-menu invite
