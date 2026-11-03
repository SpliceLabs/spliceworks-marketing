# ADR 0009: Defer the newsletter and author bylines

Status: Accepted, 2026-11-03.

## Context

The newsletter needs a corpus and a decision on provider and cadence. The founders are not yet presenting their names publicly.

## Decision

No newsletter, no subscribe form, no edition type; the Log has an RSS feed. No author byline: entries read "SpliceOps". `author` is an optional field already in the schema; when it is absent the byline and the Article structured data name the organisation.

## Consequences

No email capture yet. Readers who are not ready to book a session can only follow by RSS or social.

## Revisit when

- Newsletter: the Log has a corpus worth sending (about 30 to 40 entries) and the founders agree a provider, cadence and format.
- Bylines: the founders present their names publicly. Then fill `author` and add author pages.
