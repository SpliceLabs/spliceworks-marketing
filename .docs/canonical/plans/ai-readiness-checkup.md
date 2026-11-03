---
title: Free AI readiness check-up — plan
status: draft for founder review
date: 2026-10-30
sources:
  - ~/Downloads/agentic-engineering-assessment (Technology & Product Strategy Assessment v2.3, schema 4.0): scoring.json `agentic`, score.js `agenticDomain()` / `agentic()`
  - Lead-magnet tools assessment 2026-10-29 (§4.3, AC-READY-FREE)
  - Site path language: index.md, how-it-works.md, services/ai-enabled.md
decisions:
  - Company-wide, new questions, generalised from the engineering assessment (founder, 2026-10-30)
  - Reuse the method, not Adaptive Alchemy's Fluency Check questions (founder, 2026-10-30)
  - Result first in summary form; full breakdown after email (founder, 2026-10-30)
---

# Free AI readiness check-up

## What it answers

"Where is my company on the path to AI-native, and what's holding us back?" A leader answers 14 questions in about five minutes. The page places the company on the site's path: **AI-absent → AI-enabled → AI-native**. A work email unlocks the full breakdown.

## Method: generalised from the team assessment

The paid assessment's Agentic Operating Maturity model asks, for four domains of a software org, how far AI goes (a gate question). It then checks that claim against depth questions. The check-up keeps that machinery and swaps the domains for areas any company has.

| Engineering assessment | Check-up | Weight |
|---|---|---|
| A: AI in engineering | **Core work**: what you make or deliver | 45% |
| D: AI in deployment and ops | **Customers**: sales, marketing and support | 25% |
| C: AI in delivery management | **Back office**: finance, people and admin | 15% |
| B: AI in product decisions | **Management**: reporting, planning and decisions | 15% |

The weights mirror the assessment's 0.45 / 0.25 / 0.15 / 0.15 blend.

### The same five rungs in every area (gate questions, Q1–Q4)

| Level | Rung | What it looks like |
|---|---|---|
| 100 | Not in the work | Not used, or people chat with AI on their own |
| 200 | Helps people | AI drafts, summarises and researches for people doing the work |
| 300 | Does steps | AI does steps inside the workflow; people start and finish it |
| 400 | Runs the workflow | Agents start and run it; people decide at set points |
| 500 | Improves it | Agents run it end to end and improve it from results; people set goals |

Rung 400 is the site's definition of AI-enabled: "your first critical workflow is started and run by agents".

### Evidence: eight foundations (Q5–Q12), scored 1 to 5

| # | Foundation | Generalised from | 5 | 3–4 | 1–2 |
|---|---|---|---|---|---|
| F1 | **Adoption**: share of people using AI in real work every week | Q94 (% using agents daily) | over 80% | 40–80% | under 40% |
| F2 | **Ownership**: who owns AI | Q96 (named owner for tooling) | a leader or team with a budget | someone part-time | informal champions, or nobody |
| F3 | **Context**: what AI knows about your business | harness context questions; the site's "shared brain" | connected to docs, systems and expert know-how, kept current | some documents connected | whatever someone pastes in |
| F4 | **Access**: how AI reaches your systems | Q101 (agent data access) | scoped, with permissions and an audit trail | approved integrations | shared accounts, or copy and paste |
| F5 | **Checking**: how AI's work is checked before it counts | Q105 (completion verification) | automatic checks, with people at set points | a person reviews everything | each person decides |
| F6 | **Measurement**: whether you measure what AI changes | Q110 / Q94 (measured, not assumed) | tracked per workflow against a baseline | rough estimates | not measured |
| F7 | **Rules**: what governs AI use | pillars 11–12 (security, governance); the site's spend caps and kill switch | approved tools, data rules, spend limits, a way to switch an agent off | a written policy | none |
| F8 | **Workflow change**: has AI changed how a recurring workflow runs | the site's "the work hasn't changed" | several workflows redesigned around agents | one | pilots that didn't reach production, or none |

Context questions (not scored): Q13 company size, and Q14 what your core work is (it labels the "core work" area in the result).

### Scoring

The same rules as `score.js`, with one simplification.

- **Claimed level** per area = that area's gate answer (100–500).
- **Evidence average** = the mean of answered foundations (1–5). *Simplification:* the paid assessment has separate depth questions for each domain. The check-up uses the eight shared foundations as evidence for every area, to keep it to five minutes.
- **Evidence level:** the gate alone supports up to 200. An average of 3.5 or more supports 300, 4.0 supports 400, and 4.5 plus F6 = 5 supports 500. The last condition mirrors the assessment's extra condition for level 500: you can't improve from results you don't measure.
- **Area level** = min(claimed, max(evidence, claimed ≤ 200 ? claimed : 200)). That's `agenticDomain()` exactly.
- **Gap** is flagged when claimed > evidence: "you say agents run it; the foundations support about 'does steps'".
- **Overall score** = Σ weight × area level ÷ 100, which gives 1.0 to 5.0.
- **Place on the path:**
  - **AI-native:** overall ≥ 4.0
  - **AI-enabled:** any area at level 400 or higher
  - **AI-absent:** otherwise. If the best area is at 300, the result says "close to AI-enabled".
- **Fix first:** the foundation furthest below the evidence threshold for the next level. This is the Fluency Check's "binding constraint", applied to foundations.

## Free vs after email

| On the page, no email | After work email and consent |
|---|---|
| Your place on the path, with one sentence on what it means | Each area's claimed vs supported level, with gaps flagged |
| Overall score out of 5 | The eight foundations as bars |
| "N areas claim more than your foundations support" (count only) | Fix first, and why, plus the next two foundations to work on |
| "Get your full breakdown" (email form) | A suggested first workflow, from your strongest area and core work |
| Book a working session | The same report emailed to you; book a working session |

The summary is deliberately not actionable on its own. The breakdown is what the email buys.

## How it works

- **Scoring:** a pure function `readinessCheckup(answers)` with fixture tests: rungs, evidence thresholds, the 500 rule, gaps, path placement and fix first. It's shared by the page and the server.
- **Page:** `/tools/ai-readiness-assessment`, one question at a time with a progress count, keyboard-friendly. The worked example is rendered on the server for crawlers, like the calculators.
- **Email:** a server action re-scores the posted answers on the server, so the client can't fake a report. It sends the report to the visitor through the existing Resend setup and a copy to the contact inbox, then returns the breakdown to show on the page. It has consent and honeypot fields, like `/book`. Answers never go in the URL.
- **Copy:** the page, a FAQ section "Getting ready for AI" (4–5 answers, word for word in `faq.md`), a hub card, the `capabilities.json` entry, and `llms.txt`.
- **Not in v1:** storing results, CRM, and analytics (measurement after launch, per earlier decision).

## Decisions for the founders

1. **Area weights:** mirror the assessment's 45/25/15/15, or choose your own.
2. **Name and URL:** "AI readiness assessment" (the term people search for) vs "check-up". The proposed URL is `/tools/ai-readiness-assessment`.
3. **Where the CTA points:** working session only, or also the paid team assessment. It has no page on the site yet.
4. **The question wording above:** approve it, or edit it.
