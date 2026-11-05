# Outcome-led copy: what survived review

Status: draft for founder review. Nothing here is live except the `/how-it-works` change in the same PR.

Written 2026-11-05 after a read of getsupernal.ai. Two independent reviewers (Opus and Fable) read the first draft against the live pages and `content/VOICE.md` / `VOICE-MEMO.md`. Both said "ship reduced". This file keeps only what they supported.

## 1. On the site (in this PR)

`content/v5/pages/how-it-works.md`:

- Working session deliverable: an outcome sheet for the first workflow. The day ends with the client's decision on whether to go on.
- Two-step table: a "You decide" row.
- "How the engagement runs": the outcome sheet (outcome, where it stands and target, how we measure it, who is accountable and what agents may approve, what is out of scope).

Left out on purpose: FAQ edits (those answers are mirrored from `/faq` onto nine pages, and most do not introduce the outcome sheet yet); weekly-measure promise (no engagement has run one yet; `index.md:65` says "We don't sell what we haven't run"), fee or credit wording for stage gates (open item #3), "tools are our call" (live copy says the client can swap agents, `how-it-works.md:76`).

## 2. For the proposal and SOW template (outside the site, legal reviews before use)

### Outcome clause

> **Outcome [n]: [workflow name].**
> Where it stands today: [baseline]. Target: [target] by [date].
> Measured by [source].
> Accountable at Client: [name, role].
> Agents may approve: [list]. A person decides: [list].
> Out of scope: [list].

### Stage gates

> Each stage ends in a written decision by Client: continue, change scope, or stop.

Fee wording per stage waits for open item #3.

### Method clause

> Splice selects and may change models, agents and tools within the guardrails in Schedule [n]. Each change is logged and shared with Client. Client may bring its own agents.

### Keep-regardless clause

Parked until open item #3 settles what happens if the client does not go on.

## 3. Moved to the audience that already hears it

The headcount goal ("margin without more headcount") already appears on `for/investors.md:22`. Use it on the investor and board pages and in proposals, as the buyer's goal, not as a Splice promise.

## 4. Dropped, with reasons

| Dropped | Why |
| --- | --- |
| Headcount line on the homepage, team page and service pages | Reads as about people next to "Splice, don't replace" (`index.md:57`). No engagement has a revenue or headcount baseline (#8). |
| Hero Option B, gap line, Path row and heading change | Design is locked. Option B would be a third variant in the open hero test. Removes the AI-native destination. |
| Outcome table on the homepage | Third copy of `how-it-works.md:50-56`. Clashes with the workflow picker. |
| Team "what we hold ourselves to" | Generic values list. Closest to Supernal's own ideas. |
| "If your number hasn't moved, we haven't done the job" | Reads as a guarantee. |
| "No net new hires" capacity clause | Ties Splice's success to client hiring. |

## 5. Follow-ups

| Item | Owner |
| --- | --- |
| AI check-up "where is the work stuck" questions: product change, not copy. File a GitHub issue. Could fit the booking form or working session instead. | Founders |
| `content/SOURCE-OF-TRUTH.md` still lists four delivery stages (Discover, Design, Deploy, Operate), not the working session plus two steps. Fix before citing it for new claims. | Content |
| Claims register: add "each workflow gets an outcome sheet, agreed in the working session" (founder-confirmed 2026-11-05). | Content |
| Revisit weekly measure and numeric outcome copy after one engagement has run it for a month. | Founders |
