# ADR 0008: An optional hero, with a generated default image

Status: Accepted, 2026-11-03.

## Context

Cards, entry pages and shared links should all carry the same image when an entry has one.

## Decision

`hero: { src, alt }` is optional and `alt` is required when `src` is set. One 1200 by 630 asset feeds the card, the top of the entry page and the share image. With no hero, each entry gets a generated default (type mark on the type's wash, plus code and title in the share image).

## Consequences

The default share image is generated at build time and uses the default font until a brand font is bundled. Hero files live in `public/log/<slug>/`.

## Revisit when

- Generated defaults start to look repetitive in feeds: commission a wider set of marks.
- Hero volume needs image optimization or a pipeline.
- Video heroes are introduced.
