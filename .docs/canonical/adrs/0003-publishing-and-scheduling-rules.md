# ADR 0003: Publishing and scheduling rules

Status: Accepted, 2026-11-03.

## Context

The team wants to queue several entries before committing to 3 a week, and expects backdating to be rare.

## Decision

An entry is live when `status` is `published` and `published` is today or earlier, comparing calendar dates in UTC. Merging an entry dated today or earlier deploys it at once. A future date stays hidden until a scheduled GitHub Actions run redeploys after that date arrives. Editing a live entry redeploys it and shows the `updated` date. A backdated entry sorts by its date, not at the top of the feed.

## Consequences

The site is static, so a future entry appears at the first redeploy after midnight UTC, not at an exact hour. The `published` date should not change after an entry goes live.

## Revisit when

- Entries are expected at a specific hour or time zone: add a time field and a more frequent schedule.
- Scheduled publishing needs a human approval step or frequent same-day edits: move to on-demand revalidation.
- A reader or partner reports a wrong-day publish because of the UTC rule.
