# Review: feat/log-writeup-child (story tier, diff scope, 2026-11-04)

Range ad8c141..97b5ed6. Pass 1 only (risk low, 0 sensitive paths), all Claude, merged by hand (no bucket script). Evidence: story, fix_required 3.

## Fix Required (test-quality-reviewer) — all fixed in 12f57fb
- F1 no test that future/draft write-up or non-live parent stays hidden -> `livePages` + 4 tests
- F2 no write-up case in sitemap, JSON-LD, metadata tests -> added
- F3 facts block unpinned; empty `Code:` -> order tests, Code omitted when absent

## Overlapping suggestions — fixed in ddf29ab
- `{scroll}` leaked into .md/llms when caption had `)` -> regex strips `){scroll}` anywhere
- back-link hard-coded, examples heading coupled to content -> `entryPath`, exported heading, content test

## Not addressed (suggestions)
- parent not live drops write-up silently (no build warning); write-up `published` not checked against parent's; `related` may name a write-up slug
- scroll frame focusable without role/aria-label; `<img>` has no width/height (CLS)
- `/log/:slug.md` rewrite untested, `/log/<slug>/md` also publicly reachable; no `nosniff` header site-wide
- image `src` scheme not validated (React blocks javascript:, //host and https: pass)
- IMAGE_RE negative tests missing; scroll-row grouping and loader-error assertions loose
- unrelated reformat in sitemap.ts

## Security: pass. Confirm: founder name in email mockups cleared by client; DeepSeek entry quotes literal injection strings that reach llms-full.txt and .md copies.
## Tooling gaps: prefilter-markdown.ts missing `unist-util-visit` in the skill's node_modules; select-review-panel.ts blocks on stdin unless paths are piped.
