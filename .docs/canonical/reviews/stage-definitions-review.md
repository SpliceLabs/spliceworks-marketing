---
title: AI-absent / AI-enabled / AI-native — definitions review
date: 2026-10-30
scope: content/v5/pages on main, plus the AI check-up on feat/tools-ai-check-up (PR #11)
---

# Stage definitions review

## The definitions the site uses today

| Stage | Canonical wording (services/index.md) | Repeated on |
|---|---|---|
| AI-absent | "tools, maybe, but nothing about how the work gets done has changed" | services/ai-enabled ("you may have the tools, but the work runs the way it always has"), investors, manufacturing, agencies |
| AI-enabled | "your people work from one shared brain, and your first critical workflow is started and run by agents" | services/ai-enabled, ai-native, investors, ceos-and-boards, technology-leaders |
| AI-native | "that brain drives the work, and agent-run workflows are how the company operates" | ai-native, how-it-works, ceos-and-boards, investors |

Step 1 (AI-absent → AI-enabled) already includes the basics: "Short training in plain language: what a prompt is, what a skill is, and how to write both", plus a prompt and skills library (services/ai-enabled.md).

## Where the site contradicts itself

The question is where a company whose people **use AI daily but haven't changed any work** belongs.

| Says AI-absent | Says AI-enabled |
|---|---|
| services/index.md: "You have the tools, maybe even daily users, but the work hasn't changed" | index.md (homepage), step 2 "Today": "Your people use AI every day, but it waits to be asked" |
| how-it-works.md: same "maybe even daily users" line | for/founders.md: "If you already run on AI every day, start at AI-enabled → AI-native" |
| for/ceos-and-boards.md: same line | |
| faq.md, "Which service is right for us?": "even if people use them daily, start with AI-absent → AI-enabled" | |

The homepage and the founders page conflict with the definition every other page uses. AI-enabled requires an agent-run workflow, not daily use.

## The new founder definition (2026-10-30)

> AI-absent is someone who isn't even using Claude/ChatGPT regularly and at best uses it like a search engine.

Under this definition, the "daily users, work unchanged" company is no longer AI-absent. It isn't AI-enabled either, because no workflow runs on agents. The three-stage model has no name for it.

## Options

| | What changes | Pros | Cons |
|---|---|---|---|
| **A. Four stages, two steps (recommended)** | Add **AI-equipped** between absent and enabled: people have AI tools and use them, some daily, but the work runs the way it always has. AI-absent narrows to the founder definition. Step 1 becomes "AI-absent or AI-equipped → AI-enabled"; step 2 is unchanged. | Matches the founder definition. Fixes the homepage and founders contradiction. The offer stays two steps. "AI-equipped" is already an open founder label test (index.md open items). The check-up maps onto it cleanly. | Touches about 12 pages. Adds a fourth label for buyers to learn. |
| B. Three stages, broad AI-absent (status quo) | Keep "AI-absent = the work hasn't changed", including daily users. Fix only the homepage and founders contradiction. The check-up varies its advice within AI-absent (as built in PR #11). | Smallest change. | The label contradicts the founder definition: a team using AI daily gets called "absent", which may read as an insult to the buyers most likely to convert. |
| C. Three stages, narrow AI-absent | Move daily users into AI-enabled. | No new label. | Breaks AI-enabled's milestone (an agent-run workflow), which step 1's whole offer is built on. Not recommended. |

## Option A: proposed wording

- **AI-absent:** AI isn't part of how your people work. At most, some use a chat tool now and then, like a search engine.
- **AI-equipped:** your people have AI tools and use them, some every day, but the work runs the way it always has.
- **AI-enabled:** your people work from one shared brain, and your first critical workflow is started and run by agents. *(unchanged)*
- **AI-native:** that brain drives the work, and agent-run workflows are how the company operates. *(unchanged)*

Step 1 "You're here if…": "Your people barely use AI yet, or they use it daily but the work hasn't changed." Step 1 starts with the basics for AI-absent teams (prompting, skills, context, the governed workspace) and with the shared brain for AI-equipped ones. Both end at the same milestone.

### AI check-up mapping under A

| Check-up result | Stage |
|---|---|
| Best area at "isn't part of the work" | AI-absent |
| Best area at "helps people" | AI-equipped |
| Best area at "does steps" | AI-equipped, close to AI-enabled |
| Any area at "runs the workflow" | AI-enabled |
| Score ≥ 4 | AI-native |

Also worth deciding: the site's AI-enabled includes "one shared brain". The check-up places AI-enabled on an agent-run workflow alone. Requiring the **context** foundation (what AI knows about your business) at 3 or more for AI-enabled would match the site.

## Pages to change under A

- services/index.md: the three-stages list (becomes four), the step table
- services/ai-enabled.md: H1/intro, "You're here if", the "That's AI-absent" line, description and reader frontmatter
- index.md: the step table "Today" cells (also fixes the contradiction); close the "AI-absent vs AI-equipped" open item
- how-it-works.md: session outcome list, the step table
- for/ceos-and-boards.md: the step table
- for/investors.md: the path table (add a row)
- for/founders.md: "If you already run on AI every day" (fixes the contradiction)
- faq.md: "Which service is right for us?"
- industries/manufacturing.md, industries/agencies.md: the "start with" lines
- for/technology-leaders.md, book.md, for/index.md, for/accelerators.md, work.md: the path lists
- tools/ai-check-up.md and the check-up component (PR #11)

## Separate issue: what the working session covers

Every page describes the working session as "pick one workflow, build a working prototype". The check-up's AI-absent line (PR #11) says the session covers prompting, markdown and projects. Either:

- the session flexes for AI-absent teams (say so on /book and how-it-works), or
- the check-up line points to step 1's training and keeps the session as the way in: "That's where step 1 starts; a working session shows your team what good looks like on its own work."

## Decision (founder, 2026-10-30)

- **Three stages, broad AI-absent.** AI-absent stays "the work hasn't changed", even with daily users. Only the homepage step table and For founders were fixed: they now place a company in step 2 by an agent-run workflow, not by daily use. The AI check-up keeps varying its advice within AI-absent: the basics below "does steps", a first workflow when close to AI-enabled.
- **The working session flexes.** For teams new to AI, the session starts with the basics on their own work: prompting, context in markdown and organising work in projects. That's now stated on /book, How it works, and the "What is a working session?" FAQ answer (also on For accelerators).
