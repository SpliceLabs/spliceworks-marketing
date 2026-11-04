---
type: tool
code: LG-00124
title: Creator videos to weekly email
description: "Our field-test workflow pointed at a creator brand's weekly subscriber email, with two independent reviewers checking every line."
lede_em: two independent reviewers
published: 2026-11-04
status: published
stage: enabled
tool_status: testing
checked: 2026-11-04
sources:
  - title: "ADA MouthHealthy, Halloween Survival Guide"
    url: https://www.mouthhealthy.org/all-topics-a-z/halloween-tips
  - title: "ADA MouthHealthy, Fluoride"
    url: https://www.mouthhealthy.org/all-topics-a-z/fluoride
  - title: "NIDCR (NIH), Tooth Decay"
    url: https://www.nidcr.nih.gov/health-info/tooth-decay
  - title: "FTC, Health Products Compliance Guidance"
    url: https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance
  - title: "FTC Endorsement Guides, 16 CFR 255.5"
    url: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255/section-255.5
  - title: "FTC, CAN-SPAM Act compliance guide"
    url: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
related:
  - supadata
  - jev-image-checks
hero:
  src: /log/E21-supadata-poster.jpg
  video: /log/E21-supadata.mp4
  alt: "A dark ribbon drifting across paper, edged with orange light"
---

Field test by Angelo Pullen, checked 4 November 2026. Nothing was sent.

## Overview

### Why it's in the log

Creator brands want to turn the founder's videos into email without spreading claims they cannot support. We tested whether our research workflow can do it on a real week, and where a person still has to step in.

### What we found

The workflow found its own sources and drafted a cited issue. Reviewers raised 10 problems in the first draft; by round 4 the subscriber copy passed 57 of 57 claim checks. The blocker was outside the copy: two of the three videos ended with product pitches in disease-type wording, and the brand's site made gum and enamel claims, so every link was held.

### How it fits

The workflow researches, drafts and runs the first review. An editor listens to every quote, a separate compliance checker clears or blocks, and the brand's approver gives a written go. Counsel clears the approach once.

### What it means for your team

You keep your email platform and your creator's channel. The research and checks run beside them, and a person on your team still approves every send.

## Specifications

| Spec | Detail |
| --- | --- |
| Category | Process: research workflow, two independent reviewers, a person's approval |
| Subject | A weekly subscriber email for a creator-founded toothpaste brand |
| Input | 3 recent videos from the founder's YouTube channel, picked by recency, views, topic and length |
| Transcripts | YouTube's automatic captions; 248 of 248 extracted quotes matched by script |
| Sources found | ADA, NIH, FTC, FDA and the Gmail and Yahoo sender rules, all found by the workflow |
| Output | One sample issue: 3 video sections, 5 verbatim quotes, 4 cited habits, 8 sources |
| Review | 2 independent reviewers over 5 rounds: a claim check, and a dentist and compliance read |
| Sent | Nothing. No email platform, account or site was touched |

## What we measured

| Review round | Claims checked | Claims passed | Blockers in the copy | Blockers outside the copy |
| --- | --- | --- | --- | --- |
| 1 | 45 | 38 | 3 | 0 |
| 2 | 51 | 48 | 2 | 0 |
| 3 | 53 | 52 | 1 | 3 |
| 4 | 66 | 64 | 0 | 4 |
| 5, changed lines only | 19 | 18 | 0 | 4 |

### The fluoride line

The toothpaste is fluoride-free, and the ADA and NIH pages the workflow cited recommend fluoride toothpaste. The first draft left fluoride out. The dentist reviewer blocked that, so the final issue's first habit is to brush with a fluoride toothpaste, and the product block says the toothpaste has none.

### The videos

All three videos end with the founder pitching his own toothpaste. Two pitches use disease-type wording, and none says aloud that the segment is an ad. Linking them would make those claims the email's, so the sample quotes the videos and holds the links.

### The website

The landing page made gum and enamel claims, so the product link is held until counsel clears one page with cosmetic-only wording.

### Where it needed help

A plain fetch could not read the channel's video list; the built-in browser on the operator's computer could. The captions spelled the brand's name at least nine ways, so every quote needs one listen before sending.

## What it costs

| Item | Cost |
| --- | --- |
| Model usage | Not measured in this run |
| Transcripts and video facts | A transcript API on our existing plan; per-call cost not recorded |
| Email platform | None used; nothing was sent |

## Limits and caveats

- One week, one issue, one run. It is not a measure of how the workflow does over many weeks.
- Nothing was sent, so there is no open, click or unsubscribe data.
- Quotes were checked against automatic captions, not audio.
- The reviewers are AI. A person and counsel still have to clear the email before any send.
- The rules research is not legal advice.

## How we tested it

1. **Ground and pick.** Read the team's earlier research, then the channel's latest uploads in a real browser, and picked three videos by a stated rule.
2. **Pull and research.** Pulled the captions and kept the founder's words exactly. Found the brand facts, the FTC, FDA and email rules, and ADA and NIH pages for the tips.
3. **Draft and review.** Wrote the sample issue with a source for every claim. Two reviewers who did not write it checked every line over five rounds until the copy was clean.

## Questions people ask

### Can it turn a creator's videos into an email on its own?

It drafted a cited issue on its own. It needed a real browser to read the video list, and a person must listen to the quotes and approve every send.

### Does it find its own sources?

Yes. It was given only the channel and the brand's site, and found the ADA, NIH, FTC, FDA and email-rules pages itself.

### Why were the video links held?

Two of the three videos ended with product pitches in disease-type wording. Linking them would make those claims part of the email.

### Does a person still check the email?

Yes. An editor, a separate compliance checker and the brand's approver sign off on every issue, and counsel clears the approach once.
