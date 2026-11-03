---
type: tool
code: LG-00123
title: Jev for image checks
description: A cheap yes/no model, tested as a first-pass checker on AI-generated product images.
published: 2026-11-03
status: published
stage: native
tool_status: testing
checked: 2026-11-03
sources:
  - title: "TypeSafe AI home page (price)"
    url: https://typesafe.ai/
  - title: "Jev images guide"
    url: https://docs.typesafe.ai/images
  - title: "Jev models and versions"
    url: https://docs.typesafe.ai/models.md
  - title: "Confidence guide"
    url: https://docs.typesafe.ai/confidence.md
  - title: "API reference"
    url: https://docs.typesafe.ai/api/system-one.md
  - title: "Jev 1.14 release note"
    url: https://typesafe.ai/blog/jev-1-14
  - title: "Full write-up with code (LARGE FORMAT Lab)"
    url: https://www.lrgfrmt.com/lab/jev-image-checks
  - title: "Code, labels and saved results, MIT licensed"
    url: https://github.com/lrgfrmt/jev-image-checks
related:
  - jev
  - supadata
---

Field test by Angelo Pullen, checked 3 November 2026. Every figure comes from saved test logs; the brand is not named.

## Overview

### Why it's in the log

A generated product image has to match the real product part by part: the chain on the bike's right side, the kickstand folded up, the right headlight cage, no stray text. A full vision audit checks 43 items per image and is the slow, expensive step. We tested whether Jev, a cheap yes/no model, could take the first pass.

### What we found

As a gate on every check it lets too much through: at the suggested setting, 11 of 91 known problems (12%) would have skipped the audit, one of them serious. But two plain kickstand questions together caught 12 of 12 kickstands left down, with 1 false alarm in 16, and a single kickstand question agreed with the audit 49 of 49 times on 66 new images. Sorting studio photos by camera angle, it was right on all 33 answers it gave at 0.8 confidence or higher.

### How it fits

We do not let known problems skip the audit, so Jev gets one narrow job beside it: the kickstand check, before the audit, so a retouch can start sooner. The audit still runs on every image, and a person checks the kickstand on every top-down view.

### What it means for your team

Checks like this run inside the tools you already use, at about $0.51 per 1,000 images with 129 questions each. You do not need to learn it, and a person on your team still approves every image.

## Specifications

| Spec | Detail |
| --- | --- |
| Maker | TypeSafe AI (typesafe.ai) |
| Category | Decision model: typed answers with probabilities, no text |
| Model | jev-1.14.0, pinned by version |
| Endpoint | POST https://api.typesafe.ai/v1/systemone |
| Images | Experimental; each request needs the header TypeSafe-Danger-Zone-Images: true |
| Image size | 280 to 1,568 pixels per side; never resized for you |
| Pricing | $42 per billion input tokens; output tokens currently free |
| Test set | 29 AI-generated product images, one run, 87 calls |
| Labels | A Claude vision audit: 1,247 verdicts, of which 98 problems |
| Median speed | 290 ms per image with 129 questions |

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| POST | /v1/systemone | Answers typed questions about a state, which can include images |
Images go in an assets map and are referred to by name from the state. Requests with images need the TypeSafe-Danger-Zone-Images header.

## What we measured

| Questions and gate setting | Problems caught | Let through | Checks sent on |
| --- | --- | --- | --- |
| 52 core questions, 0.3 (suggested) | 80 of 91 | 11 | 48% |
| 52 core questions, 0.5 | 59 of 91 | 32 | 25% |
| 52 core questions, 0.7 | 34 of 91 | 57 | 9% |
| Core plus 77 detail questions, 0.3 | 87 of 91 | 4 | 66% |
| Core plus detail, 0.3, with close-ups | 89 of 91 | 2 | 64% |

### How to read it

26 held-out images, labels from a Claude vision audit. The gate setting is how sure Jev must be that a check is clean before it skips the audit. Let through means a check the audit failed that Jev passed. Every held-out image had at least one known problem, so passing a clean image was never tested.

### The kickstand

The kickstand item has two core questions: is the stand down, and is the bike tipped over. Together, on 28 images with a clear verdict, they caught 12 of 12, with 1 false alarm in 16. The stand-down question alone caught 9 of 12: it missed all 3 top-down images, and the tipped-over question flagged those instead, which looks like luck. Adding detail questions raised the false alarms to 10.

### Checks to never trust it with

It flagged all 26 held-out images as looking like a render, though the audit failed none. It scored a wrongly drawn handlebar display at 0.02. It caught 17 of 20 stray-text problems but flagged all 3 images whose text was fine, so its text flags are hints, not verdicts.

### Sorting by camera angle

On the 29 generated images it named the right view on 20: all 20 images of 7 kinds of view, none of the 3 top-down images (each called a right-side view at 0.81 to 0.91 confidence) and none of the 6 rear three-quarter images. On real studio photos with a simpler four-way question it got 60 of 76 right, and all 33 answers at 0.8 confidence or higher were correct.

### Text versus images

In our earlier test on Instagram brand-lead messages, the same model caught 28 of 33 held-out leads with no false alarms, at a median 90 ms. One image with a single question used about 6.3 times the input tokens of a text message. It did far better on that text task, which fits TypeSafe's own warning about images; the two tests asked different kinds of questions.

## What it costs

| Item | Cost |
| --- | --- |
| Input tokens (published) | $42 per billion |
| Output tokens (published) | Currently free |
| One image, 129 questions (measured) | About 12,100 tokens; $0.51 per 1,000 images |
| Same, with four close-ups (measured) | $1.13 per 1,000 images; median 525 ms |
| One image, one camera-angle question (measured) | About 5,500 tokens |
| Whole test, 87 calls (measured) | About 5.4 cents, plus 0.55 cents for 9 wiring calls |

## Limits and caveats

- Image support is experimental; TypeSafe says it is not yet ready for production.
- The labels are a Claude vision audit, not a person; 34 of 35 of its reported problems held on a second Claude check.
- 29 images, one call per image for each way of asking. Nothing was sent twice, so answer stability on images is untested.
- The detail questions were written after reading the audit's findings, so they may flatter themselves on those faults.
- The audit's own cost was not recorded, so we claim no saving against it.
- Prices are TypeSafe's published prices on 3 November 2026.

## How we tested it

1. **Prepare.** 29 generated images, each resized to 1,568 pixels on the long side, the API's limit. A filter refused any file not on the prepared list.
2. **Ask.** One call per image with 129 yes/no questions, worded so yes means a problem. Two more passes: with four close-ups, and with one camera-angle question.
3. **Score.** A script compared every answer with the audit's 1,247 verdicts. Three images checked the wiring; the other 26 were held out.

## Questions people ask

### Can Jev replace a vision audit of generated product images?

No. At the suggested setting it let 11 of 91 known problems skip the audit, and stricter settings let more through.

### What is Jev good at on images?

Large, obvious states. Two kickstand questions together caught 12 of 12 kickstands left down with 1 false alarm, and a single kickstand question agreed with the audit 49 of 49 times on new images.

### How much does it cost?

About $0.51 per 1,000 images with 129 questions each, at $42 per billion input tokens. Output tokens are currently free.

### Is its confidence useful?

For sorting photos by angle, mostly: 33 of 33 right at 0.8 confidence or higher on studio photos. But it called top-down images a right-side view with up to 0.91 confidence.

### Does a person still check the images?

Yes. Jev is advice only; a person approves every image.

## Install and connect

### One call with curl

```bash
# Pin the version; images need the danger-zone header
curl https://api.typesafe.ai/v1/systemone \
-H "Authorization: Bearer $JEV_API_KEY" \
-H "Content-Type: application/json" \
-H "TypeSafe-Danger-Zone-Images: true" \
--data-binary @request.json
```

Keep the key in your environment; never paste it into a file you share.

### request.json

```json
{
  "model": "jev-1.14.0",
  "state": {
    "rule": "Judge only what is visible.",
    "photo": "img-1"
  },
  "questions": {
    "kickstand_down": {
      "type": "noul",
      "instructions": "Is the bike's kickstand down, reaching the ground, in `photo`?"
    },
    "tipped_over": {
      "type": "noul",
      "instructions": "Is the bike in `photo` tipped over or lying down rather than standing on its wheels?"
    }
  },
  "assets": {
    "img-1": {
      "type": "image",
      "format": "jpg",
      "data_base64": "..."
    }
  }
}
```

Abridged. `noul` is Jev's yes/no question type; each answer is a probability from 0 to 1.
