# ADR 0007: Sharing is share links and Copy link, with no API posting

Status: Accepted, 2026-11-03.

## Context

The team publishes on the site first, then posts by hand to Bluesky, X and LinkedIn; Instagram comes later with video.

## Decision

Each entry has a share bar: LinkedIn, X and Bluesky share links, a native Share icon on phones (how Instagram is reached), and an icon-only Copy link button with a tooltip, an aria-label and a "Copied" state. No keys, no posting scripts, no draft text stored in entries.

## Consequences

Posts to the team's own accounts remain manual. The accounts do not exist yet except LinkedIn; the Follow strip lists RSS and LinkedIn until the others are supplied.

## Revisit when

- The accounts exist and posting is a daily chore: look at automation (check each platform's API terms first).
- Video entries start: add a video asset and an Instagram path.
- Share counts or referral data are wanted: add tagged share links.
