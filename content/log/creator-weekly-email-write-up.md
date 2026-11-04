---
type: research
title: "Creator videos to a weekly family email: a field test"
description: "A creator-founded toothpaste brand asked whether our field-test workflow could turn its founder's YouTube videos into a weekly informational email for subscribers, add oral-care tips beyond the videos, and find its own sources."
parent: creator-weekly-email
published: 2026-11-04
status: published
stage: enabled
checked: 2026-11-04
sources:
  - title: "ADA MouthHealthy, Halloween Survival Guide"
    url: https://www.mouthhealthy.org/all-topics-a-z/halloween-tips
  - title: "ADA MouthHealthy, Chewing Gum"
    url: https://www.mouthhealthy.org/all-topics-a-z/chewing-gum
  - title: "ADA MouthHealthy, Fluoride"
    url: https://www.mouthhealthy.org/all-topics-a-z/fluoride
  - title: "ADA MouthHealthy, Toothbrushes"
    url: https://www.mouthhealthy.org/all-topics-a-z/toothbrushes
  - title: "NIDCR (NIH), Tooth Decay"
    url: https://www.nidcr.nih.gov/health-info/tooth-decay
  - title: "FTC, Health Products Compliance Guidance"
    url: https://www.ftc.gov/business-guidance/resources/health-products-compliance-guidance
  - title: "FTC Endorsement Guides, 16 CFR 255.5"
    url: https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-255/section-255.5
  - title: "FTC, CAN-SPAM Act compliance guide"
    url: https://www.ftc.gov/business-guidance/resources/can-spam-act-compliance-guide-business
  - title: "FDA, Is it a cosmetic, a drug, or both?"
    url: https://www.fda.gov/cosmetics/cosmetics-laws-regulations/it-cosmetic-drug-or-both-or-it-soap
  - title: "Gmail sender guidelines"
    url: https://support.google.com/a/answer/81126?hl=en
hero:
  src: /log/E21-supadata-poster.jpg
  video: /log/E21-supadata.mp4
  alt: "A dark ribbon drifting across paper, edged with orange light"
---

Field test by Angelo Pullen, checked 4 November 2026. The examples show the brand's concept mockups.

## The short version

### It can draft the email

It built a cited sample issue from three of the founder's recent videos, and two independent reviewers cleared the subscriber copy after five rounds of fixes.

### It finds its own sources

It was given only the channel and the brand's site, and found the ADA, NIH, FTC, FDA and email-rules pages itself.

### The blocker was outside the copy

Two of the three videos ended with product pitches in disease-type wording, and the brand's site made gum and enamel claims, so the sample holds every link until counsel clears them.

### Honest tips can cut against the product

The toothpaste is fluoride-free, and the ADA and NIH recommend fluoride toothpaste, so the email says so.

### A person still signs off

An editor, a separate compliance checker and the brand's approver clear every issue, and counsel clears the approach once.

## The problem

The brand's founder is a dentist who makes videos for families on YouTube, and he posts often. The brand wanted a regular email that turns those videos into something useful for parents, adds tips the videos do not cover, and stays inside the rules for health claims in marketing email.

We wanted plain answers to three questions:

1. Can our field-test workflow be pointed at the founder's videos to make the email?
2. Can it add tips beyond what is in the videos?
3. Does it find sources on its own, or only use what it is given?

## What we tested

The workflow is the one we use for Splice Log field tests: research with cited sources, a written plan, a draft, then independent reviewers who did not write the draft check every claim, and fixes until the reviewers find nothing left in the copy.

We ran it once, on one real week in early November 2026. Nothing was sent, scheduled or posted, and no email platform, social account or site was touched.

## How it ran

1. **Ground.** It read the team's earlier research on the brand, then the channel's latest uploads.
2. **Pick.** It chose three recent videos by a stated rule: recency, views, topic fit and length. It passed over a newer video whose title was not about teeth and a very long video.
3. **Pull.** It pulled each video's captions and kept the founder's words exactly. A script matched 248 of 248 extracted quotes against the transcript files.
4. **Research.** It found the brand's own product facts, the FTC's guidance on health claims and endorsements, the FDA's line between cosmetic and drug claims, the CAN-SPAM rules, the Gmail and Yahoo sender rules, and ADA and NIH consumer pages for the tips.
5. **Draft.** It wrote one sample issue: a subject line, preview text, a short intro, one section per video with a quote and a plain-English takeaway, four cited habits and a labelled product block.
6. **Review.** Two reviewers that had not seen the drafting checked it. One re-fetched every source and checked every quote. The other read it as a skeptical dentist and as a compliance reviewer.

## What we measured

| Round | Claims checked | Claims passed | Blockers in the copy | Blockers outside the copy |
| --- | --- | --- | --- | --- |
| 1 | 45 | 38 | 3 | 0 |
| 2 | 51 | 48 | 2 | 0 |
| 3 | 53 | 52 | 1 | 3 |
| 4 | 66 | 64 | 0 | 4 |
| 5 (changed lines only) | 19 | 18 | 0 | 4 |

In round 4 the subscriber copy passed 57 of 57 claim checks. The two misses that round, and the one miss in round 5, were in a reviewer appendix that is never sent, and each was fixed. After round 5, a script found all 14 quoted strings in the final draft word for word in the transcripts.

### The fluoride line

The brand's toothpaste is fluoride-free, and the ADA and NIH pages the workflow cited recommend fluoride toothpaste. The first draft left fluoride out. The dentist reviewer blocked that, so the final issue's first habit is to brush with a fluoride toothpaste, and the product block says the toothpaste has none and points readers to their dentist.

### The videos

All three videos end with the founder pitching his own toothpaste. Two of the pitches use disease-type wording, and none says aloud that the segment is an ad. The reviewer ruled that linking the videos would make those claims part of the email, so the sample quotes and summarizes the videos and holds the links.

### The website

The brand's landing page made gum and enamel claims. The product link is held until counsel clears one page with cosmetic-only wording.

### Where it needed help

- **The video list.** A plain web fetch of the channel's Videos tab returned only the header, and the channel's feed was refused. The built-in browser on the operator's computer read the list without signing in.
- **Captions.** The captions are YouTube's automatic ones and spelled the brand's name at least nine different ways, so every quote needs one listen before sending.
- **Brand facts.** List size, the email platform, the postal address for the footer and how the founder's role should be described have to come from the brand.

## What we would ship

A short informational email from the brand to subscribers who opt in, every other Thursday to start. Each issue has:

- a subject line and preview text that say plainly what is inside
- a one-line intro naming the founder as the dentist behind the channel and the founder of the brand
- up to three recent videos, each with the founder's own words and a plain-English takeaway backed by the ADA or NIH
- 2 to 4 cited habits for families
- a clearly labelled product block with plain facts only and no health claims
- a footer with the ad notice, the founder disclosure, the postal address and an unsubscribe link

The weekly rhythm:

1. **Monday:** the workflow reads the latest uploads, screens five candidates and pulls their transcripts. An editor confirms the shortlist.
2. **Tuesday:** the workflow checks what each video says, picks up to three, finds the tips and sources, drafts the issue and runs its own independent review. The editor listens to each quoted moment and edits.
3. **Wednesday:** a compliance checker clears or blocks the draft, and the brand's approver gives a written go. No go means the issue is skipped, never sent late.
4. **Thursday:** a test send to staff inboxes, then the release.

## Examples of the output

Concept mockups built from the reviewed sample issue, in the brand's own look, one video per piece. The brand asked for live video links after the test, so these show a working Watch the video button marked for counsel review. Nothing was sent or posted.

### Emails

![Email mockup: FatGlob issue on which Halloween candy is kinder to teeth, with a studio photo, the video thumbnail, quotes and three cited habits](/log/creator-weekly-email/email-e1-halloween.png "E1 · Halloween candy video"){scroll}

![Email mockup: FatGlob issue on why sticky sugar is the real problem, with the video thumbnail and cited habits](/log/creator-weekly-email/email-e2-simpsons.png "E2 · Simpsons foods video"){scroll}

![Email mockup: FatGlob issue on changing your toothbrush, with the video thumbnail and cited habits](/log/creator-weekly-email/email-e3-tiktok-shop.png "E3 · TikTok Shop snacks video"){scroll}

![Email mockup: FatGlob welcome email explaining what the every-other-Thursday note contains](/log/creator-weekly-email/email-e0-welcome.png "E0 · Welcome email"){scroll}

### Instagram posts · 3:4

![Instagram post mockup: Sour, sticky or chocolate, with a studio photo](/log/creator-weekly-email/instagram-post-1.png "Candy bowl, slide 1")

![Instagram post mockup: four habits for the leftover candy bowl](/log/creator-weekly-email/instagram-post-2.png "Four habits")

![Instagram post mockup: replace your toothbrush every three to four months](/log/creator-weekly-email/instagram-post-3.png "Brush check")

### Instagram stories · 9:16

![Instagram story mockup: poll asking which candy is kinder to teeth](/log/creator-weekly-email/instagram-story-1.png "Poll")

![Instagram story mockup: candy with dinner, not all day](/log/creator-weekly-email/instagram-story-2.png "Snack timing")

![Instagram story mockup: the Halloween candy video with a Watch the video link sticker](/log/creator-weekly-email/instagram-story-3.png "New this week")

### X posts

![X post mockup: have candy with a meal, not as an all-day snack](/log/creator-weekly-email/x-post-1.png "Candy timing")

![X post mockup: when did you last swap your toothbrush](/log/creator-weekly-email/x-post-2.png "Brush check")

### Facebook posts

![Facebook post mockup: four habits for the week after Halloween](/log/creator-weekly-email/facebook-post-1.png "Candy bowl guide")

![Facebook post mockup: sign up for the every-other-Thursday FatGlob note](/log/creator-weekly-email/facebook-post-2.png "Email sign-up")

### Long-form article

![Article mockup: a FatGlob Learn page with a short answer, the featured video, a sources table, four habits, questions and sources](/log/creator-weekly-email/learn-article.png "FatGlob Learn article: The leftover candy bowl")

## Limits

1. One week, one issue, one run. It is not a measure of how the workflow does over many weeks.
2. Nothing was sent, so there is no open, click or unsubscribe data.
3. Quotes were checked against automatic captions, not audio.
4. The reviewers are AI. A person and counsel still have to clear the email before any send.
5. The rules research is not legal advice.
6. Model usage cost was not measured in this run.
