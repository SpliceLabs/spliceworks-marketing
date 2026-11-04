---
type: tool
code: LG-00127
title: A sponsorship desk in your DMs
description: Manychat to Supabase, built to survive a leaked key.
lede_em: leaked key
published: 2026-11-04
status: published
stage: enabled
tool_status: testing
checked: 2026-10-31
sources:
  - title: "Full write-up with code (LARGE FORMAT Lab)"
    url: https://www.lrgfrmt.com/lab/manychat-brand-intake
  - title: "Manychat: Dev Tools, External request"
    url: https://help.manychat.com/hc/en-us/articles/14281285374364-Dev-Tools-External-request
  - title: "Manychat: Dev Tools, Basics"
    url: https://help.manychat.com/hc/en-us/articles/14281252007580-Dev-Tools-Basics
  - title: "Manychat: Pro plan"
    url: https://help.manychat.com/hc/en-us/articles/25800228332572-Pro-plan
  - title: "Manychat: messaging windows"
    url: https://help.manychat.com/hc/en-us/articles/23358636027932-Understanding-messaging-windows
  - title: "Supabase: Edge Function auth headers"
    url: https://supabase.com/docs/guides/functions/auth-headers
  - title: "Supabase: secrets"
    url: https://supabase.com/docs/guides/functions/secrets
  - title: "Supabase: background tasks"
    url: https://supabase.com/docs/guides/functions/background-tasks
  - title: "Deno: timing-safe comparison"
    url: https://docs.deno.com/examples/timing_safe_comparison/
  - title: "Meta: Instagram messaging"
    url: https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/messaging-api
  - title: "Meta: private replies"
    url: https://developers.facebook.com/docs/instagram-platform/private-replies
  - title: "Meta: rate limits"
    url: https://developers.facebook.com/docs/messenger-platform/overview/rate-limiting
related:
  - jev
  - supadata
hero:
  src: /log/E10-launch-poster.jpg
  video: /log/E10-launch.mp4
  alt: "A dark sphere glowing pink, orange and yellow on paper"
---

Tutorial by the team at LARGE FORMAT; searches and sources checked 31 October 2026. Tested on a local Supabase stack with invented data, not inside a live Manychat account.

## Overview

### Why it's in the log

Brand deals usually start in the DMs, where a brand manager's message lands next to hundreds of fan replies and someone copies the useful bits into a spreadsheet by hand, if they spot it at all. In our searches on 31 October 2026 we found people connecting Manychat to Supabase in private builds, but no published connector, nothing on securing Manychat's requests, and no one using Manychat as a sponsorship desk.

### What we found

Manychat's External Request step is the only way data leaves a flow, and the only proof a request came from your flow is a static string in a header. So the endpoint has to be harmless: a dedicated Edge Function, a constant-time key check with two key slots, a strict schema with an 8 KB body cap, rate limits, a kill switch, and a database role that can insert into one table and do nothing else. The worst a stolen key can do is drop a rate-limited lead into a review queue a person reads anyway.

### How it fits

The flow says it is a bot, asks brand or fan with one tap, collects the brand's details and a work email, asks for consent, and sends the answers. If the send fails, a fallback tags the contact for a human and sends the same holding reply, so no lead is stranded.

### What it means for your team

It runs on tools you may already pay for, Manychat and Supabase. Inquiries land in one table instead of a DM pile, and a person on your team still reviews every lead.

## Specifications

| Spec | Detail |
| --- | --- |
| Built by | The team at LARGE FORMAT |
| Tools | Manychat (External Request step), Supabase (Edge Function and Postgres) |
| Manychat plan | External Request needs a paid plan; Pro is the first plan page that lists API access |
| Endpoint | One dedicated Supabase Edge Function; JWT check turned off for it, key checked in code |
| Authentication | x-intake-key header, compared in constant time; two key slots for rotation |
| Database access | Its own role, manychat_intake: insert into one table, nothing else |
| Reply | Always 200 {"ok":true,"status":"received"}; 503 only when the desk is closed or the database is down or slow |
| Code | MIT licensed; the repository is private for now, ask us for access |

## What we measured

| Request (local test, invented data) | Reply | Logged outcome | Rows |
| --- | --- | --- | --- |
| Accepted | HTTP 200, received | accepted | 1 |
| Wrong key | HTTP 200, received | bad_key | 1 |
| Duplicate | HTTP 200, received | duplicate | 1 |
| Missing consent | HTTP 200, received | invalid_fields | 1 |

### How to read it

Four requests from scripts/test-intake.sh against the local function: four identical replies, four different outcomes, one row. Someone probing the URL learns nothing about your keys or your leads; the real outcome goes to the function log, which never records anything the person typed.

### Meta's rules shape the flow

A business can message someone only after that person has messaged it. One private reply per comment, within 7 days. After 24 hours only a person can reply, for up to 7 days. 750 private replies an hour per account, so give brands their own way in, such as a DM keyword or a bio link.

### Speed

Manychat's External Request times out at 10 seconds. In our local tests a reply took milliseconds; slow work, such as pinging a reviewer, runs after the reply.

## Limits and caveats

- A stolen key still adds fake leads. They are rate limited and marked for review, but a person has to decline them.
- Rate limits live in memory, per function instance. For a hard project-wide cap, back them with a Postgres or Redis counter.
- A broken template fails quietly, because a rejection looks exactly like a success to Manychat. Check the function log when you set the flow up.
- One row per contact per flow. To take fresh inquiries from returning brands, bump the flow ID.
- Not tested inside a live Manychat account; everything ran against the local Supabase stack with invented data.
- Search results are what our searches on 31 October 2026 turned up, not a claim about everything that exists.

## How we tested it

1. **Search.** Looked for an existing Manychat to Supabase setup on X and GitHub on 31 October 2026 before writing one.
2. **Build.** An Edge Function, a migration with the insert-only role, a Manychat body template and setup docs; 14 unit tests.
3. **Test.** Ran the desk on the Supabase CLI local stack with invented data, including every request a thief might try.

## Questions people ask

### Can Manychat sign its requests?

Not according to its help center: data leaves a flow through External Request with headers and a JSON body, and neither help article mentions request signing or published source IP ranges.

### What happens if the key leaks?

The worst it can do is add rate-limited leads to a review queue a person reads anyway. The database role can't read, change or delete anything.

### Does a person still review the leads?

Yes. Every lead waits in the table for a person to review.

### Where is the code?

MIT licensed; the repository is private for now. Ask us for access.
