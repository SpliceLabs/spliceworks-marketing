---
type: tool
code: LG-00119
title: Supadata
description: Turns what is said in a public video into clean, timestamped text with one API call.
lede_em: timestamped
published: 2026-11-01
status: published
stage: enabled
tool_status: added
checked: 2026-11-01
sources:
  - title: "Supadata pricing"
    url: https://supadata.ai/pricing
  - title: "Transcript guide"
    url: https://docs.supadata.ai/get-transcript
  - title: "API introduction and errors"
    url: https://docs.supadata.ai/api-reference/introduction
  - title: "MCP server"
    url: https://docs.supadata.ai/integrations/mcp
  - title: "Python SDK"
    url: https://docs.supadata.ai/integrations/python
  - title: "Node SDK"
    url: https://docs.supadata.ai/integrations/node
related:
  - jev
  - jev-image-checks
hero:
  src: /log/E21-supadata-poster.jpg
  video: /log/E21-supadata.mp4
  alt: "A dark ribbon drifting across paper, edged with orange light"
---

## Overview

### Why it's in the log

A lot of what a company knows lives in video: training clips, recorded demos, webinars and walkthroughs. It is hard to search and easy to lose. Supadata is the listening half of turning those videos into notes a team can find later.

### What we found

Neither half is enough on its own. In the sample video the captions heard a name as “JJ Lair”. The title card on screen spells it right: JJ Allaire. Code, prices, links and product names are usually shown, not said. Put the spoken and on-screen tracks on one clock and the note becomes usable. An 86-second video took about 25 seconds end to end.

| Track | Text |
| --- | --- |
| Spoken (captions) | “JJ Lair” |
| On screen (title card) | JJ Allaire |

### What it means for your team

Recorded training and walkthrough videos can become searchable notes in the places your team already keeps what it knows. A person still decides what gets filed and shared. We look at how it fits your own workflows in the working session.

## Specifications

| Spec | Detail |
| --- | --- |
| Maker | Supadata (supadata.ai) |
| Category | Transcript and web-data API |
| Base URL | https://api.supadata.ai/v1 |
| Authentication | Header x-api-key |
| Video sources | YouTube, TikTok, Instagram Reels, X, Facebook, public file URLs |
| File formats | MP4, WEBM, MP3, FLAC, MPEG, MPGA, M4A, OGG, WAV |
| File limits | 750 MB and 12 hours per file |
| Transcript modes | native (existing captions), generate (AI), auto (native, then generate). Default auto |
| Long videos | Over 20 minutes returns a job ID (HTTP 202) to poll |
| Job results | Kept for 1 hour after completion |
| SDKs | Python: supadata. Node: @supadata/js |
| MCP server | Hosted at https://api.supadata.ai/mcp (OAuth), or local @supadata/mcp |
| No-code | n8n, Zapier, Make, Activepieces |
| Not supported | Private, login-only, age-restricted or heavily geoblocked videos, and live streams |

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| GET | /v1/transcript | Transcript for a video or file URL |
| GET | /v1/transcript/{jobId} | Result of a long or generated transcript |
| GET | /v1/metadata | Post and video metadata |
| POST | /v1/extract | Structured data from a video, using AI |
| GET | /v1/web/scrape | A web page as markdown |
| GET | /v1/web/map | All links on a site |
| POST | /v1/web/crawl | Crawl a site (Pro plan and up) |
| GET | /v1/youtube/… | Search, channel, playlist, batch and translation |


Paths for metadata, extract, web and YouTube follow the docs' structure; check the API reference before building against them.

## Pricing

| Plan | Price a month | Credits a month | Requests a second |
| --- | --- | --- | --- |
| Free | $0 | 100 | 1 |
| Basic | $5 a month, billed yearly | 300 | 10 |
| Pro | $17 | 3,000 | 10 |
| Mega | $47 | 30,000 | 50 |
| Giga | $297 | 300,000 | 100 |
| Supa | $897 | 1,000,000 | 100 |
| Enterprise | Custom | Any | Custom |

## What a credit buys

| Action | Cost |
| --- | --- |
| Transcript (existing captions) | 1 credit |
| Generated transcript | 2 credits per minute |
| Web scrape | 1 credit per page |
| Translation | 30 credits per minute |
| Extract | 5 credits per minute, 5 minimum |
| Unused credits | Do not roll over |

## Error codes

| Code | Meaning |
| --- | --- |
| 206 | Transcript unavailable for this video |
| 400 | Check the request |
| 401 | API key missing or invalid |
| 402 | Endpoint not on your plan |
| 403 | Private or restricted content |
| 404 | Not found, or job result expired |
| 429 | Rate or usage limit reached |
| 5xx | Error on Supadata's side |

## Limits and caveats

- Live streams are not supported.
- Requests that detect no speech still bill by media duration.
- Generated transcripts can take up to about 100 seconds before a job ID is returned.
- The free plan allows 1 request per second and no advanced endpoints.
- On-screen text reading in video2notes can misread stylised fonts, motion blur and busy backgrounds.

## How we tested it

1. **Listen.** Supadata's Python SDK fetches the transcript. Generated transcripts come back as a job, polled until done.
2. **Read.** ffmpeg keeps a frame at every scene change, Tesseract reads it, and only lines at least 75% certain are kept: 573 lines became 220.
3. **Merge.** Spoken and on-screen text sit on one clock in one markdown note. Repeats appear once, when they first show.

## Questions people ask

### What is Supadata?

Supadata is an API that returns transcripts and metadata for videos on YouTube, TikTok, Instagram, X and Facebook, and for public video or audio files. It can also scrape, map and crawl websites as markdown.

### Can Supadata transcribe videos that have no captions?

Yes. In generate or auto mode it creates a transcript with AI, billed at 2 credits per minute of video. Native mode only returns captions that already exist.

### How much does Supadata cost?

There is a free plan with 100 credits a month. Paid plans start at $5 a month billed yearly (300 credits) and $17 a month for 3,000 credits. One existing transcript costs 1 credit.

### Does Supadata work with Claude and ChatGPT?

Yes. Its hosted MCP server at https://api.supadata.ai/mcp can be added as a custom connector in Claude and ChatGPT, and signs in with OAuth.

## Install and connect

### Python SDK

```python
pip install supadata

from supadata import Supadata
supadata = Supadata(api_key="YOUR_API_KEY")
t = supadata.transcript(url="https://youtu.be/_20US068pzk", text=True, mode="auto")
```

Job status checks need supadata 1.7.0 or newer.

### MCP

```bash
# Claude or ChatGPT: add a custom connector with this URL
https://api.supadata.ai/mcp

# Cursor, Windsurf, VS Code (local)
env SUPADATA_API_KEY=your-key npx -y @supadata/mcp
```

The hosted server signs in with OAuth; the local one reads `SUPADATA_API_KEY`.
