# ADR 0002: Entries are markdown with validated frontmatter, read by one loader

Status: Accepted, 2026-11-03.

## Context

The Adaptive Alchemist keeps posts as markdown with a typed schema and one route that generates every page, the archives and the feed. This site already reads copy from `content/v5` at build time.

## Decision

Entries live in `content/log/<slug>.md`. Frontmatter is parsed as YAML and validated with a `zod` schema; a bad entry fails the build. One loader feeds the home, entry pages, archives, RSS, llms.txt, llms-full.txt, capabilities.json and the sitemap. Bodies render through the existing markdown renderer so tables and lists use design system blocks.

## Consequences

Two dependencies are added (`zod`, `yaml`). Anything the renderer cannot express (blockquotes, embeds) needs a convention or a renderer change; the "Our read" aside is a paragraph that starts with `**Our read:**`. Publishing needs a pull request.

## Revisit when

- Someone who does not use git must publish: look at a headless CMS that still writes these files.
- Entries pass about 500, or the build gets slow enough to hurt deploys: move to incremental builds.
- Entries need images or interactive modules markdown cannot carry: adopt MDX.
