# ADR 0005: Reading time is derived, rounded up

Status: Accepted, 2026-11-03.

## Context

The Adaptive Alchemist stores an optional reading time. A stored value drifts from the text.

## Decision

Reading time is computed at build time from the entry body and never stored or overridden. Count the words of the body only (front matter excluded; markdown markup and link targets stripped), divide by 250 and round up, shown as "4 min read". Rounding up needs no separate minimum.

## Consequences

A short entry reads "1 min read". Code samples count as words, so a code-heavy tool entry reads longer than it feels. Rounding up overstates by up to a minute.

## Revisit when

- Readers or the team say the times feel wrong: tune the 250 words a minute.
- Entries are written in a language where words are not space-separated.
- Code or table heavy entries distort the number: exclude those blocks from the count.
