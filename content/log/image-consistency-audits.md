---
type: tool
code: LG-00126
title: Image consistency audits
description: "Three ways to check AI product images, scored against the judge that counts: a person."
lede_em: a person
published: 2026-11-04
status: published
stage: native
tool_status: testing
checked: 2026-11-03
sources:
  - title: "Full write-up with code (LARGE FORMAT Lab)"
    url: https://www.lrgfrmt.com/lab/refsheet-consistency-audit
  - title: "TypeSafe AI home page (Jev price)"
    url: https://typesafe.ai/
  - title: "Jev images guide"
    url: https://docs.typesafe.ai/images
  - title: "Jev API reference"
    url: https://docs.typesafe.ai/api/system-one.md
related:
  - jev-image-checks
  - jev
hero:
  src: /log/E18-jev-poster.jpg
  video: /log/E18-jev.mp4
  alt: "A dark ring with a small window onto green and blue light"
---

Field test by Angelo Pullen, checked 3 November 2026. Every figure comes from saved records; the brand is not named.

## Overview

### Why it's in the log

A reference sheet only works if every image shows the real product: the right controls on the right side, the headlight facing forward, the real proportions, no metal that is not there. An AI checklist audit is fast. We tested how far it can be trusted against the marks of the person who approves the images.

### What we found

In the pilot round the audit passed 15 images, and the person rejected all 15. Rebuilt around the person's own criteria, the audit matched 50 of the 74 images the person approved or rejected; marking everything approved would have matched 44. Approved images sent back as references came back as near-copies 23 times. Jev, the yes/no model, flagged something on every image, so it cannot be a gate.

### How it fits

The audit finds and names flaws, Jev's kickstand answer is logged beside it, and a person makes every call. The image model mattered more than the platform: with near-copies left out, Nano Banana 2.1 had 26 of 63 images approved and GPT Image 2.5 had 6 of 40.

### What it means for your team

You keep the image tools you already use. The checks run beside them, flaws come back named, and a person on your team still approves every image.

## Specifications

| Spec | Detail |
| --- | --- |
| Category | Process: blind checklist audit, yes/no model, a person's review |
| Image models | Nano Banana 2.1, Nano Banana Pro, GPT Image 2.5 |
| Platforms | fal, Higgsfield, Runway |
| Images | 221 over three rounds: 29, 66 and 126 |
| Answer key | A person's approve, hold or reject marks on our review board |
| Audit | Blind Claude vision auditors; 43 checks per image, 29 or 30 in the rebuilt round 3 checklist |
| Yes/no model | Jev 1.14 (jev-1.14.0), rounds 2 and 3 |
| Jev cost, round 3 | $0.052 for 126 images at the published price |

## What we measured

| Round 3, platform and model | Images | Approved | Held | Rejected |
| --- | --- | --- | --- | --- |
| fal, Nano Banana 2.1 | 24 | 12 | 9 | 3 |
| Higgsfield, Nano Banana 2.1 | 40 | 14 | 20 | 6 |
| Runway, Nano Banana 2.1 | 22 | 12 | 8 | 2 |
| fal, GPT Image 2.5 | 40 | 6 | 15 | 19 |

### The pilot

The audit passed an image with no serious failure and at least 95% of checks matching. It passed 15, all from GPT Image 2.5. The person rejected all 15, and across the pilot approved 1, held 4 and rejected 61.

### The rebuilt checklist

Proportions measured on two approved images became pass or fail ranges: wheelbase 1.8 to 2.0 tyre diameters, seat 0.9 to 1.1, battery 0.55 to 0.67. 12 criteria came from the person's notes. It matched 50 of 74 decided images, but still failed 15 images the person approved and let 9 of 30 rejected images through.

### Near-copies

For five views, approved renders went back in as references. 23 Nano Banana 2.1 images came back nearly unchanged, with a mean pixel difference of 4.2 out of 255 at most. The person approved 12, held 11 and rejected none: those approvals are mostly inherited, not new work.

### Model versus platform

With near-copies left out, Nano Banana 2.1 had 26 of 63 images approved and GPT Image 2.5 had 6 of 40. On the 6 views all three platforms completed, Nano Banana 2.1 approvals were level: 8 of 18 on fal, 8 of 20 on Higgsfield, 4 of 9 on Runway.

### Jev

In round 3 it caught 25 of the 29 kickstands the auditors found down. It caught 1 of 18 display failures and 3 of 18 controls failures, agreed on invented emblems only 23 of 110 times, and flagged at least one item on every image, including all 44 the person approved.

## What it costs

| Item | Cost |
| --- | --- |
| Higgsfield, round 1 (read from the balance) | 2 credits per image |
| Runway, round 1 (read from the balance) | 6 credits per image |
| Higgsfield, pilot (read from the balance) | 228 credits for 24 images |
| Runway, pilot (read from the balance) | 628 credits for 18 images |
| Higgsfield, round 3 (quoted and matched) | 120 credits for 40 images |
| Runway, round 3 (read from the balance) | 264 credits for 22 images, 12 per 4K image |
| fal, all rounds | Not observable from a balance |
| Jev, round 3 (published price) | $0.052 for 126 images; about $0.41 per 1,000 |

## Limits and caveats

- The auditors are AI. Only the person's marks are ground truth, and held images count as neither approved nor rejected.
- One reviewer, one product, three rounds. The numbers describe this sheet, not image models in general.
- Platform cost was read in each platform's own credits. Credits are not dollars, fal's cost was not observable, and other work was spending on the Higgsfield account during round 3.
- fal's Nano Banana 2.1 failed 4 of 10 views in round 3 with no reason given; GPT Image 2.5 on fal completed all 10.
- Review time per image is not in the round records we kept.
- Jev's price is TypeSafe's published price on 3 November 2026.

## How we tested it

1. **Generate.** The same prompt and the brand's studio photos on fal, Higgsfield and Runway: one image per view in round 1, a 66-image pilot in round 2, all ten views at 4K in round 3.
2. **Audit.** Blind auditors scored every image against the studio photos. Jev answered yes/no questions beside them in rounds 2 and 3, and decided nothing.
3. **Score.** Scripts compared both with the person's marks on our review board, image by image.

## Questions people ask

### Can an AI checklist approve product images on its own?

Not in this test. In the pilot it passed 15 images, and a person rejected all 15.

### Which platform was best?

With the same model, no clear winner. On the 6 views all three platforms completed, approvals were 8 of 18 on fal, 8 of 20 on Higgsfield and 4 of 9 on Runway.

### Is Jev useful for image checks?

As a cheap second opinion on the kickstand, yes. As a gate, no: it flagged something on every image.

### Why did approved references come back unchanged?

Our read: when an approved render of the same view is sent as a reference, the model treats it as the answer. 23 Nano Banana 2.1 images were near-copies.

### Does a person still check the images?

Yes. The audit and Jev are advice only; a person approves every image.
