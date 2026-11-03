# Handoff: splice-log-build

## Objective
See `.docs/reports/log-spec-20261103.md` and ADRs `.docs/canonical/adrs/0001` to `0010`. Build the Splice Log on this site, on design system v0.3.0.

## Progress
- Done, committed on `feat/splice-log` (off main, last `d05c2b1`): `src/lib/log/*` (reading-time ceil words/250, format-date, code, code-file, schema zod, entries loader, share, feed, views, next-step, test-support), `scripts/log-codes.ts` + pre-commit + predev, `content/log` seeds (3 free tools, LG-00120 to 122), DS v0.3.0 vendored (`ink.css` removed), ADRs. Not pushed, no PR yet.
- DS PR open: lrgfrmt/spliceops-design-system #2 (base `feat/ink-theme`, stacked on #1 Ink PR). Both unmerged.
- In-flight: UI not started. Had just read DS preview markup. New classes: `lg-card`, `lg-feature`, `lg-row`, `lg-stages`, `lg-share`, `lg-top`, `lg-body`, `lg-art`; renamed vs mocks: `lg-sd`, `lg-w-<type>`, `lg-hero-cap`, `lg-mk`, `lg-og-*`, `lgrail`.
- Blocked: nothing. No Beads workspace here (GH issues instead); `bd` fails.

## Key Anchors
- `.docs/reports/log-spec-20261103.md` :: whole spec of record
- `src/lib/log/entries.ts` :: loadEntries, liveEntries, todayUtc, logDir (add a memoized getLog)
- `src/lib/copy/markdown.ts` :: parseBlocks, parseInline, parsePage (no blockquote block type)
- `src/lib/copy/machine.ts` and `src/app/sitemap.ts` :: add Log entries (sitemap.test expects length = PAGES.length, update it)
- DS previews: `project/components/*/preview.html` in the DS repo (branch `feat/log-components`)

## Decision Rationale
- Bodies render through our own LogBlocks (reuse InlineNodes, parseBlocks), not CopyPage: conventions are an `In short` section and a paragraph starting `**Our read:**`.
- Type filter chips are links to `/log/type/<t>` (`aria-current`), no Stage or Sort selects in v1.
- Production build only verifies codes (loader throws); the assigner runs in pre-commit and predev.

## Next Steps
1. Components in `src/components/log/` with static-render tests (TDD): LogCard, LogFeature, LogRow, StagePicker, TypeFilter, FollowStrip, HowWeLog, ShareBar (client: copy link, native share), LogBlocks, EntryArticle, mark SVGs.
2. Routes in `src/app/(marketing)/log`: page, `[slug]` (generateStaticParams, metadata, Article JSON-LD, hero img or generated default OG), `type/[type]`, `stage/[stage]`, `feed.xml` route (rssXml). getLog = liveEntries(loadEntries(logDir()), todayUtc()).
3. Wire: nav Splice Log to `/log` (SiteHeader NAV plus its tests), footer, sitemap, llms.txt, llms-full, capabilities.json; add `.lg-hero img` and card `img` rules to `site.css` if missing.
4. `.github/workflows/scheduled-publish.yml`: daily cron runs `gh workflow run deploy.yml` (needs `actions: write`).
5. `pnpm build`; browser check with sample fixtures via `LOG_CONTENT_DIR` (never ship samples in `content/log`); screenshots; open PR into main, noting it depends on DS PR #2.
6. Dev server on :3000 is stale: kill it, `rm -rf .next`, restart.

## Open Questions
- After DS #1 merges: retarget #2 to main, then re-vendor from main.
- Deferred from v1 (say so in the PR): Tool spec-sheet template, per-entry `.md` copies, Stage and Sort selects, Case stats and Research method modules (need authoring conventions), brand font in the default share image.
