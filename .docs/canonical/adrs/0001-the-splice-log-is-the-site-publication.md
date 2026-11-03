# ADR 0001: The Splice Log is the site's publication

Status: Accepted, 2026-11-03.

## Context

The Splice Log started as a tools catalogue. Competitors we reviewed (Tenex, Flowscope, Foaster, Codos, Soren AI) run sales blogs that end every post on one demo button; none mixes tested tools, cases, research and analysis, and none segments readers by AI maturity. Research digest: `.docs/reports/log-competitor-research-20261103.md`.

## Decision

The Log becomes the publication for the whole site. Six entry types: Tool, Case, Research, Analysis, Perspective, Guide. Readers enter by stage (AI-absent, AI-enabled, AI-native) and by type. Each entry ends on a next step chosen for its stage, not one button everywhere. Entries are dated and sourced, and state when facts were checked and any affiliation. Full spec: `.docs/reports/log-spec-20261103.md`.

## Consequences

A wider remit than tools means more content to source and check. Cases stay empty until results are confirmed (GH #8). The existing Tool pages are the first entries.

## Revisit when

- 25 live entries or 90 days after launch, whichever comes first: review which types and stages readers actually use (needs analytics) and merge or drop types nobody reads.
- Two types start to blur in practice (for example Case and Research), or the same new type is wanted twice (for example Video or Event recap).
- The stage entry points (stage picker, stage archives) go unused: replace them with a simpler topic list.
