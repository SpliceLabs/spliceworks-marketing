# Outcome-led copy drafts

Status: draft for founder review. Nothing here is live. No route reads this file.

Written 2026-11-05 after a read of getsupernal.ai (see the research summary in the PR description). The aim is to lead with the work and the result, and keep AI in the "how". Every draft follows `content/VOICE.md` and `content/VOICE-MEMO.md`.

## Rules these drafts follow

- No numbers about results until they are confirmed (open item #8). Brackets mark every gap.
- Nothing promises headcount cuts. The goal line says revenue grows faster than headcount, never "fewer people". That keeps it consistent with "Splice, don't replace".
- No named AI staff, no unsourced multipliers, one timeline per claim (open item #5 still decides the ranges).
- Wording is ours. Where an idea came from their site, the sentence is new.

---

## 1. The headcount line

The goal behind every engagement, in one sentence.

**Primary:** Revenue that grows faster than headcount.

**Longer:** Grow revenue without growing headcount at the same rate.

**Guardrail:** Pair it with the accountability line wherever it appears, so it never reads as a layoff pitch: "People stay accountable for every decision that matters."

Where it goes (each draft below uses it once, so it never repeats on one page):

| Page | Use |
| --- | --- |
| Homepage hero subline | Option B |
| Homepage gap section | Closing line |
| Step 2 page | Summary of what changes |
| Team page | Mission statement |
| SOW template | "Capacity outcome" clause |

---

## 2. Homepage (`/`)

H1 stays: **Splice, don't replace.**

### Hero subline

Current:

> Your CEO said "become an AI company." We build AI into the work you already do. Agents run it. You stay in control.

Option A (work first):

> The work that waits on your best people, running on its own. You stay in control.

Option B (headcount first):

> Grow revenue without growing headcount at the same rate. We build AI into the work you already do. Agents run it. You stay in control.

Recommendation: B. It names the goal and keeps the current sentence nearly intact. It fits the hero A-vs-E test already open on the page.

### Gap section (`Gap.tsx`)

Keep the three rows and the closing line "That's the gap between using AI and running on AI." Add one line under it:

> The goal is revenue that grows faster than headcount.

### Path section: milestone row

Add a row to the two-step table, above "The milestone":

| | AI-absent → AI-enabled | AI-enabled → AI-native |
| --- | --- | --- |
| **What changes for the business** | One critical workflow stops waiting on a person to start it | Output grows without hiring to match |

Heading: change "Two steps to AI-native, starting where you are" to **Two steps, starting where you are**. The destination moves to the table, where it can be a result.

### One-workflow section: outcome table

Lead the section with the result in each row. This is the table from `/how-it-works`, retitled. It needs no new claims, because it describes what runs, not how well.

| Work | What runs | A person decides at |
| --- | --- | --- |
| Inbound lead to meeting booked | Agents research the lead, draft the reply and book the meeting | Outreach to strategic accounts |
| Ticket to resolution | Agents triage, resolve tier-1 from the brain, draft the rest | Refunds or credits above a set amount |
| Invoice to payment queue | Agents match each invoice to its purchase order and flag exceptions | Payments and write-offs |
| New hire to first day | Agents set up accounts, training and a schedule | Access to sensitive systems |
| Monday numbers to Monday report | Agents pull the numbers, draft the report and post it | Anything going outside the company |

Intro line above it: **Pick the work that always waits on the same few people.**

### Proof section: entry template

Use only once the result is confirmed (#8). Until then the "In progress" entries stay as they are.

> **[Client type]. [Live / In progress].**
> **Before:** [workflow] took [baseline] and waited on [role].
> **After:** [result, with the number and how it was measured].
> **Who decides:** [accountable role] approves [what]. Agents handle [what].
> **Said by [role]:** "[quote]"

---

## 3. How it works (`/how-it-works`)

Replace the section "How the engagement runs" in full.

> ## How the engagement runs
>
> Every engagement runs on an outcome sheet. For each workflow we write down:
>
> - The outcome, in business terms
> - Where it stands today, and the target
> - How we measure it, and how often you see it
> - Who is accountable, and what agents may approve
> - What is out of scope
>
> We agree the sheet in the working session. Everything after it answers to it.
>
> **Each stage ends in a decision.**
>
> | Stage | Ends when | You decide |
> | --- | --- | --- |
> | Working session (1 day) | You hold a working prototype and the outcome sheet | Whether to go on |
> | Step 1 | Your first critical workflow is started and run by agents, and you can see the change against the baseline | Whether to go to step 2 |
> | Step 2 | The workflows that run your business are started and run by agents | What to run next, and who runs it |
>
> Duration: [range in weeks, pending #5]. Once we have seen your workflow, we tell you the number for yours.
>
> **Every week you see one measure against the baseline.**
>
> **Tools are our call, inside the guardrails you set.** Any change to a model, agent or tool is logged and shared with you.
>
> **New work.** If the agreed outcome needs it, it goes into the plan. A new outcome gets its own sheet, scoped with you in the open.
>
> **You keep the outcome sheet, the workflow map and the prototype, whether or not you go on with us.**

Also add to "What does it cost?": unchanged ("Talk to us. We scope the work with you during the working session...").

---

## 4. Service pages

### `/services/ai-enabled`

Under the H1, add one sentence:

> Step 1 ends when one workflow stops waiting on a person to start it, and you can see the difference in a number.

Section "Step 1 ends when your first critical workflow runs on agents": add a line before the table.

> Each one gets an outcome sheet before it runs: the baseline, the target and who is accountable.

### `/services/ai-native`

Under the H1 summary, add:

> The result: output grows without hiring to match, and people stay at the gates that matter.

---

## 5. Team page (`/team`): the About equivalent

Their About page leads with what they hold themselves to. This draft does the same, with our own commitments. Founder bios and the wider-team block stay as they are (open item #6).

### Opening (replaces the H1 subline)

H1 stays: **Teams that run it, not consultants.**

> We count finished work, not AI deployed. If your number hasn't moved, we haven't done the job. The people who build your system stay on to run it, and we use the same methods on Splice itself. [See how](/work).

### New section, above "Who you'll work with"

> ## What we're here to do
>
> Help companies grow revenue without growing headcount at the same rate. We do it by changing how the work runs, not by replacing the people who run it.
>
> ## What we hold ourselves to
>
> - **Outcomes.** Every workflow has a number we agreed on, and you see it each week.
> - **Candor.** We tell you what AI can't do yet, including when the answer for a workflow is "not this one."
> - **Accountability.** A named person behind every decision that matters.
> - **Ownership.** You can run it without us.

Rules check: "AI can't do yet" and "not this one" are plain limits, as `VOICE.md` asks ("name permissions, evidence, and limits").

---

## 6. AI check-up (`/tools/ai-check-up`) and the working session

### Frame

The check-up measures how far AI has reached. Add a front section that finds where the work is stuck, then uses it to pick a starting workflow.

**New opening paragraph** (after the existing "Most companies have AI tools by now..."):

> Ready here means clear, not technical. Do you know which workflows take the most hours, and who owns them?

**New section, before the level questions: Where the work gets stuck (3 questions)**

Each is a single choice from the same list: Sales follow-up, Support, Finance (invoices, close), Reporting, People (hiring, onboarding), Core delivery, Other.

1. Which regular workflow takes the most hours?
2. Which one waits on the same few people?
3. Where does a mistake cost the most?

Page copy: **These three answers don't change your level. They tell us where to start.**

**Result block, added under the level**

> **Your first workflow to look at: [answer 1, or the one that appears most often].** It takes the most hours [and waits on the same few people]. Bring it to a working session.

Counts and time update: 19 questions, about 8 minutes (currently 16 and 7).

**Engineering note:** the three questions feed a recommendation only. Scoring in `src/lib/tools/ai-check-up*.ts` is unchanged, and answers still stay in the browser.

### Working session deliverables

Add two lines to "What you walk away with":

- A shortlist of workflows, ranked on impact, effort and risk
- An outcome sheet for the first one: baseline, target, measure, who is accountable

---

## 7. SOW language bank

For proposals that lead with outcomes. Legal reviews before use.

### Outcome clause

> **Outcome [n]: [workflow name].**
> Reduce [measure, e.g. cycle time] from [baseline] to [target] by [date].
> Measured by [source], reported [weekly].
> Accountable at Client: [name, role].
> Agents may approve: [list]. A person decides: [list].
> Out of scope: [list].

### Capacity outcome

> **Capacity outcome.** [Workflow] volume grows from [X] to [Y] per [period] with no net new hires in [function] during the term. This is a target, not a guarantee, and depends on the assumptions in Schedule [n].

### Method clause

> Splice selects and may change models, agents and tools within the guardrails in Schedule [n]. Each change is logged and shared with Client within [2] business days. Client may bring its own agents.

### Stage gates

> Each stage ends in a written decision by Client: continue, change scope, or stop. Fees for later stages are due only on a "continue" decision.

### Keep-regardless clause

> On termination, Client keeps the outcome sheets, the workflow maps, the prototype and the documentation, and the working-session fee is credited as described in Section [n].

---

## 8. Open items and risks

| Item | Why it matters |
| --- | --- |
| #8 proof results | The proof template stays empty until a result is confirmed and sourced |
| #5 duration ranges | Brackets stay in the engagement table until set |
| #3 working-session price and terms | The SOW credit line cites them |
| #6 bios | The team page change leaves them untouched |
| "Splice, don't replace" next to a headcount line | Reads fine if it says "grow without hiring to match." Reads badly if it says "do more with fewer people." Avoid the second form everywhere |
| Idea overlap | Two lines are the same idea as their site ("grow without proportionally more headcount", "count finished work"). The wording is ours. Founders should decide whether that overlap is acceptable |
| Claims register | New sentences about outcomes and limits need an entry before they ship |
| Hero test | Option B needs to go through the open hero test, not replace it |
