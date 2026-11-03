# Measurement review

This is a maturity conversation starter, not a defensible company measure. It produces
precise-looking stages and decimal scores from ordinal, self-reported, highly compressed
judgements.

## 1. Middled and muted signals

The model collapses materially different companies.

- `ownership` skips 3: “a named person, alongside their main job” scores 4. That
  pushes the foundation average sharply upward despite limited capacity.
- `context`, `checking`, `measurement` and `rules` use 1, 3 and 5 only. A respondent
  cannot express a genuine middle position. “Some notes or documents” (`context: 3`)
  and a fully current business knowledge base (`context: 5`) have no intermediate
  state.
- `access` has two qualitatively different answers at value 1: no connection and a
  dangerously over-privileged shared login. The latter is a risk signal, not merely
  low maturity. It is also placed last, after the apparent progression, which makes
  it conspicuous and socially undesirable.
- Foundations average eight unlike things. A company with good controls but no
  measurement can receive the same support as one with weak rules and unsafe access.

For example, both foundation profiles below average 4.0 and support rung 4:

| Foundation profile | Values | Operational meaning |
|---|---:|---|
| Balanced | `adoption 4, ownership 4, context 3, access 4, checking 5, measurement 3, rules 5, workflowChange 4` | Reasonable, incomplete operating base |
| Polarised | `adoption 5, ownership 5, context 5, access 5, checking 5, measurement 1, rules 1, workflowChange 5` | Strong use with no measurement or rules |

The scorer treats both as equally able to support every area at rung 4. That is not a
credible equivalence.

The cap also hides information. With the balanced profile above:

- Claims `{core: 4, customers: 1, backOffice: 1, management: 1}` produce score
  `2.35`, AI-enabled, zero gaps.
- Claims `{core: 2, customers: 4, backOffice: 2, management: 1}` also produce
  score `2.35`, AI-enabled, zero gaps.

The result screen shows both as “AI-enabled”, “2.4 out of 5”, identical generic copy
and identical gap copy. One says the core business runs on an agent workflow; the
other says customer work does. Those are not interchangeable business positions.

A more severe flattening:

- All areas claim 4; the balanced foundations support 4. Result: `4.0`,
  AI-native, zero gaps.
- All areas claim 5; the same foundations still support only 4. Result: `4.0`,
  AI-native, four gaps.

The screen tells the user only that four areas are ahead, not how far ahead or which
ones. It erases the distinction between “runs” and “improves”.

There is a structural pull to rung 2. Foundations averaging below 3.5 all support 2.
Thus these profiles both score 2.0 if all area claims are 2:

- Every foundation is 1.
- `adoption 3, ownership 2, context 3, access 3, checking 3, measurement 3,
  rules 3, workflowChange 4` averages 3.0.

The latter reports meaningful use and one changed workflow, yet its claimed area
maturity is treated exactly like a company with universally minimal foundations.

The weighted score creates further false precision. The inputs are ordinal categories,
not equal intervals, so `2.35` does not mean more than `2.25` by a known amount.
Weighting core work at 45% is a commercial judgement, not evidence that it is 45% of
company AI maturity. A single rung-4 area triggers AI-enabled regardless of the
weighted score; score and stage therefore express competing definitions.

## 2. Ambiguity and response bias built into items

The four area questions use “on a normal week” without a reference period, named
workflow, unit of analysis, volume, criticality or definition of “normal”. A leader
can answer for the best workflow, the most common one, a pilot, or an aspirational
future state.

“Core work”, `core`, is especially broad for a 20-person services firm or a
500-person manufacturer. The questions do not establish whether areas are distinct:
sales activity may be counted under `customers`, management reporting, and core
delivery.

Specific item problems:

- `adoption`: “people whose work is mostly documents, email or a computer” is a
  subjective denominator. “Every week” and “beyond the odd chat” are vague.
  Leaders often cannot estimate these percentages.
- `ownership`: role, authority, time and budget are bundled. A named leader with
  budget but no time cannot answer accurately.
- `context`: documents, data, expert knowledge and freshness are four constructs.
- `access`: integration, least privilege and auditability are separate constructs.
  Companies commonly have different answers by system.
- `checking`: “before it’s used” ignores risk level, exception handling, sampling,
  and whether checking actually catches errors.
- `measurement`: “rough estimates” versus workflow baselines omits actual outcomes,
  frequency and attribution.
- `rules`: approved tools, data rules, spend controls and agent shutdown are bundled.
- `workflowChange`: “one workflow” does not establish importance, recurrence,
  reliability, or whether AI actually starts it.

Options visibly run from immature to mature. That invites self-flattery and
acquiescence. The risky `access` option is an exception, but placing it last makes
the intended answer obvious.

## 3. Method threats

One senior respondent is asked to represent an entire company. This invites
key-informant bias, selective visibility and executive optimism. There is no
“don’t know”, no confidence rating, no prompt to consult evidence, and no way to
say “this varies by team”.

The identical area scale creates halo effects: a respondent who sees the company as
advanced can mark all four areas similarly. The four area items have no behavioural
anchors specific to their domains, so discriminant validity between `core`,
`customers`, `backOffice` and `management` is weak.

The area questions come first, then the foundations. This anchors later answers:
having claimed “it runs the workflow”, a respondent is nudged to choose foundations
that justify it. There are no contradiction checks. For example, `core: 5` is allowed
with `measurement: 1`, then quietly capped instead of asking which claim is wrong.

Every foundation caps every area. Weak customer-data access should not necessarily
cap a finance workflow; poor finance controls should not necessarily cap support.
The global cap creates false dependencies and masks local strengths and risks.

Everything is technically used, but most foundations are used only as ingredients in
one average. `rules: 1` and `rules: 5` matter only insofar as they move the mean,
except indirectly through a possible rung-5 condition for `measurement`. The model
does not ask about workflow criticality, reliability, exception rates, data quality,
actual outcomes, human decision rights, incident history, or evidence behind the
respondent’s claims.

## 4. Fixes, ranked

| Rank | Change | Accuracy impact / burden |
|---|---|---|
| 1 | Replace each area stem with: “Think of one recurring **[area]** workflow that matters to the company. In the last 30 days, which description best matches that workflow?” Add “I cannot name one workflow” and “I don’t know”. | High / low. Quick win. |
| 2 | Add triggered checks. If an area is 4 or 5, ask: “Name the workflow in a few words. Has it run in normal business use in the last 30 days? Yes / No / Don’t know.” If 5, ask whether results are measured against a pre-AI baseline. Score unverified 4 or 5 as at most 3. | High / low-to-medium. Quick win. |
| 3 | Replace the global average with gates: `support 4` only where the named workflow has approved access, defined checking, a named owner, and evidence of changed recurring work; `support 5` only where it also has workflow-level baseline measurement and improvement review. Report failed gates by area. | High / medium. Founder call: defines the operating standard. |
| 4 | Rewrite bundled foundations into single constructs and offer five ordered anchors plus “don’t know”. For `rules`, split into “Are approved AI tools and data-use rules written down?” and “Can an agent be paused or switched off?” Do not convert “don’t know” to a low score; label the result provisional. | High / medium. |
| 5 | Stop presenting the weighted decimal as a measurement scale. Show four area levels, named evidence and constraints. If retaining an index, call it an “internal summary index”, round to a whole rung, and publish the weighting rationale. | High / low. Founder call. |
| 6 | Add contradiction prompts: `area >= 4` with `workflowChange <= 2`; `area = 5` with `measurement < 5`; or `access = 1` with `area >= 4`. Ask the respondent to revise either answer before scoring. | Medium / very low. Quick win. |
| 7 | Ask respondent role, direct knowledge by area, and confidence. Where confidence is low, state that a second operational respondent should complete those items. | Medium / low. |
| 8 | Randomise foundation-item order, keep response options ordered where inherently numeric, and use neutral labels rather than visible maturity language. | Low-to-medium / low. Quick win. |

## Top 5 changes

1. Anchor every area to one named, recurring workflow and a 30-day period.
2. Require behavioural verification for rung 4 and workflow-level measurement for rung 5.
3. Replace the eight-item average with area-relevant prerequisite gates.
4. Add “don’t know”, confidence, and contradiction checks.
5. Remove the decimal maturity score; report an evidence-backed area profile instead.