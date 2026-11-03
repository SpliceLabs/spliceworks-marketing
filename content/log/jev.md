---
type: tool
code: LG-00118
title: Jev x ManyChat
description: We tested a fast yes/no model on 80 invented Instagram DMs from a Python script and compared it with a plain keyword list, then sent 12 more through a live ManyChat flow.
published: 2026-11-03
status: published
stage: native
tool_status: testing
checked: 2026-11-03
sources:
  - title: "TypeSafe docs index"
    url: https://docs.typesafe.ai/llms.txt
  - title: "TypeSafe full docs"
    url: https://docs.typesafe.ai/llms-full.txt
  - title: "Jev quickstart"
    url: https://docs.typesafe.ai/introduction/quickstart.md
  - title: "Jev for coding agents"
    url: https://docs.typesafe.ai/introduction/coding-agents.md
  - title: "Jev introduction"
    url: https://docs.typesafe.ai/introduction.md
  - title: "System One models"
    url: https://docs.typesafe.ai/concepts/system-one.md
  - title: "Models, pricing and rate limits"
    url: https://docs.typesafe.ai/models.md
  - title: "API reference: System One"
    url: https://docs.typesafe.ai/api/system-one.md
  - title: "Request rules and errors"
    url: https://docs.typesafe.ai/api/errors.md
  - title: "Confidence and thresholds"
    url: https://docs.typesafe.ai/confidence.md
  - title: "Noul questions"
    url: https://docs.typesafe.ai/primitives/noul.md
  - title: "Use-case map"
    url: https://docs.typesafe.ai/concepts/use-case-map.md
  - title: "How to build with System One"
    url: https://docs.typesafe.ai/concepts/how-to-build-with-system-one.md
  - title: "Jev 1.13 known weak spots"
    url: https://docs.typesafe.ai/model-jaggedness/jev-1.13.md
  - title: "TypeSafe legal overview"
    url: https://docs.typesafe.ai/legal.md
  - title: "TypeSafe integration guide (agent skill)"
    url: https://raw.githubusercontent.com/typesafe-ai/skills/main/skills/typesafe-ai/SKILL.md
  - title: "TypeSafe home page"
    url: https://typesafe.ai/
  - title: "TypeSafe enterprise page"
    url: https://typesafe.ai/enterprise
  - title: "TypeSafe Master Customer Agreement"
    url: https://typesafe.ai/legal/mca
  - title: "TypeSafe Data Processing Agreement"
    url: https://typesafe.ai/legal/data-processing
  - title: "TypeSafe status page"
    url: https://status.typesafe.ai/
  - title: "ManyChat: External Request"
    url: https://help.manychat.com/hc/en-us/articles/14281285374364-Dev-Tools-External-request
  - title: "ManyChat: Dev Tools basics"
    url: https://help.manychat.com/hc/en-us/articles/14281252007580-Dev-Tools-Basics
  - title: "ManyChat: Condition block"
    url: https://help.manychat.com/hc/en-us/articles/14281142518556-Condition-Block
  - title: "ManyChat: custom user fields"
    url: https://help.manychat.com/hc/en-us/articles/14281167138588-Custom-User-Fields-and-Bot-Fields
  - title: "ManyChat: Data Collection block"
    url: https://help.manychat.com/en/articles/17741967
  - title: "ManyChat: ChatGPT integration"
    url: https://help.manychat.com/hc/en-us/articles/14281251371164-ChatGPT-integration
  - title: "ManyChat: Claude integration"
    url: https://help.manychat.com/hc/en-us/articles/19689792833180-Claude-integration
  - title: "ManyChat: AI Step"
    url: https://help.manychat.com/hc/en-us/articles/14281187288860-Manychat-AI-Step
  - title: "ManyChat pricing (checked 2026-11-03)"
    url: https://manychat.com/pricing
  - title: "Meta: Instagram messaging API"
    url: https://developers.facebook.com/documentation/instagram-platform/instagram-api-with-instagram-login/messaging-api
  - title: "Meta: Instagram private replies"
    url: https://developers.facebook.com/documentation/instagram-platform/private-replies
  - title: "RFC 2606: reserved example domains"
    url: https://www.rfc-editor.org/rfc/rfc2606
related:
  - jev-image-checks
  - supadata
---

## Overview

### The problem

Picture a creator media company whose Instagram inbox mixes brand inquiries with fan comments and spam, and which does not only wait for brands to write first. In the funnel we modelled, a comment on one of its posts triggers one automated DM to that commenter, which delivers what the comment asked for, if anything, and ends with an optional question: brand or agency, creator, or fan. ManyChat is a tool for building automated conversations in Instagram DMs, and its Data Collection step can save a typed answer into a field on the contact.

### Why it's in the log

Buttons cannot read a typed reply such as "who handles collabs?", so something has to sort typed replies: a keyword rule, ManyChat's own AI, or an outside classifier. In our judgment the mistakes are not equal: a lead marked not qualified loses a paying brand, while a fan marked qualified costs a few minutes of review. So each reply goes to qualified, not qualified or unclear, unclear goes to a person, and a person promotes every lead.

### What Jev is

You send it content, called the state, plus typed questions, and get typed answers back. We used Noul questions, yes/no questions answered with the probability, from 0 to 1, that the answer is yes. Each question is judged separately against the same state, in one call.

### What we found

We called it from a Python script on a test machine, not from ManyChat, on 80 invented messages that our team wrote to cover a funnel's main message types. On the 70 messages held back from tuning, it put no non-lead in the qualified pile, caught 28 of 33 leads, and answered in about 90 ms at the median. A naive keyword list caught 27 of 33, with 3 false positives. We then built the flow in ManyChat and sent 12 more invented messages through it: ManyChat gave the same verdict as our script on all 12 and matched our labels on 10.

### What it means for your team

Who stays accountable: the partnerships lead, who owns the qualify / disqualify rule and promotes every lead. Jev only sorts the queue. If you want to map this onto your own funnel, [book a session](/book).

## Specifications

| Spec | Detail |
| --- | --- |
| Maker | TypeSafe AI, Inc. (typesafe.ai) |
| Category | Decision model: typed answers with probabilities, no text generation |
| What it does | Answers typed questions about a piece of text, called the state |
| Model or engine | jev-1.14.0, pinned by version |
| Endpoint | POST https://api.typesafe.ai/v1/systemone |
| Pricing model | $0.042 per million input tokens; output tokens currently free |
| Speed | Median 90 ms, slowest 214 ms, measured from our test machine |
| Data handling | Processed in the US; not trained on customer requests, but Telemetry, which includes classifications, may be processed without restriction; zero data retention for enterprise customers only |
| Best for | Sorting typed DM replies into a review queue; tested from a script on 80 invented messages and inside a ManyChat flow on 12 |
| Not for | Writing replies, or deciding alone who gets a deal |
| Status | Testing |

## Endpoints

| Method | Path | What it does |
| --- | --- | --- |
| POST | /v1/systemone | Answer a set of typed questions about one state |
| GET | /v1/models | List the model names your account can send |

## Pricing

| Item | Detail |
| --- | --- |
| Plan | Pay as you go, prepaid credits |
| Price | $0.042 per million input tokens |
| Credits | Credits expire 12 months after purchase |
| Rate limits | Rate limits set per organization, shown in the console |

## What a check costs

| What | Cost |
| --- | --- |
| One DM checked, six questions, measured average | about 875 input tokens |
| 1,000 DMs checked, Jev usage only (the ManyChat plan costs far more) | $0.037 |
| Our whole 80-message run | $0.0029 |

## Error codes

| Code | Meaning |
| --- | --- |
| 401 | Missing or invalid API key |
| 422 | The request body failed validation |
| 429 | Rate limit reached: back off and retry |
| 529 | TypeSafe is overloaded: retry after a short delay |
| Not 200, in ManyChat | Nothing is mapped and the old field values stay; connect a fallback and reset the fields (we have not tested the fallback) |

## Limits and caveats

- The 80-message test ran from a Python script on a test machine; the ManyChat flow was tested on only 12 invented messages.
- In ManyChat, with no fallback connected, a failed call left the previous message's scores in place until we reset them after each verdict.
- Instagram DM text goes to an outside processor, and TypeSafe processes data in the US.
- Zero data retention is offered to enterprise customers only; standard accounts get no fixed retention period.
- The API key sits in ManyChat's External Request header, so anyone who can edit the flow can reach it.
- TypeSafe lists lead routing as a use but publishes no recipe or accuracy figure for it.
- ManyChat's External Request has a fixed 10 second timeout and maps fields only on HTTP 200.
- A naive keyword list came close on this set: 27 of 33 leads with 3 false positives, against Jev's 28 with none.
- Half the test set are leads; real inboxes have far fewer, so real precision would likely be lower.
- One labeller, who also set the rule; no hard negatives; precision's 95 percent lower bound is about 0.88.
- Jev caught every explicit lead but only 6 of 11 ambiguous ones.

## How we tested it

1. **Write and label.** Our team wrote 80 invented messages to cover a funnel's main message types; half are leads. A person on our team labelled each one before Jev saw any of them.
2. **Check the wording.** The first 10 messages ran once. We reworded the spam question, which changed no verdict, and added one rule: a clash between spam and clear intent goes to a person.
3. **Run.** A standard-library Python script on a test machine sent all 80 messages to jev-1.14.0 with six yes/no questions and saved every answer, reply time and token count.
4. **Score.** Precision, recall, reply times and cost were computed by script on the 70 messages not used in the wording check, along with a naive keyword baseline.
5. **Run inside ManyChat.** We built the flow in ManyChat and sent 12 more invented messages through it from a test account. Its verdicts matched our script's on all 12, and a deliberate failure test led to a reset step that worked in one retest.

## Questions people ask

### Can ManyChat qualify leads with AI?

Yes. ManyChat sells AI Step to "qualify leads", has ChatGPT, Claude and DeepSeek actions, and can call an outside classifier such as Jev through External Request. We tested only Jev, from a script, on 70 held-out invented messages: it put no non-lead in the qualified pile and caught 28 of 33 leads. A naive keyword list caught 27, with 3 false positives. Inside a ManyChat flow, 12 more invented messages got the same verdicts as from our script, and 10 matched our labels.

### What happens in ManyChat if the Jev call fails?

In our test, with no fallback branch connected, the flow carried on: the fields kept the previous message's scores, and a clear lead got the not-qualified reply. In one retest after we added a reset after each verdict, a failed call sent the lead to a person instead. We have not tested a timeout or a failed call on a contact's first message.

### Is it safe to send Instagram DMs to an AI API?

It is a transfer of personal data to an outside processor, so it needs care. TypeSafe processes data in the US and offers zero data retention to enterprise customers only. Send only the reply text, say so in your privacy notice, and keep a person in charge of every lead.

### How accurate is Jev at spotting brand deals in DMs?

On 70 held-out invented messages, precision was 1.0 and recall was 0.848 (28 of 33). It missed vague asks and a Spanish message, and in the wording check a one-word keyword comment. The precision rests on 28 flags, from a set with no hard negatives. On 69 real comments, none of them a brand inquiry, it raised no false alarms, though the true rate could still be up to about 4 percent.

## Install and connect

### One call with curl

```bash
: "${TYPESAFE_API_KEY:?Set TYPESAFE_API_KEY first.}"

curl --fail-with-body --silent --show-error \
https://api.typesafe.ai/v1/systemone \
-H "Authorization: Bearer $TYPESAFE_API_KEY" \
-H "Content-Type: application/json" \
--data-binary @- <<'JSON'
{
"model": "jev-1.14.0",
"state": {"lead": {
"channel": "Instagram direct message to a creator media company's account",
"message": "Hi, I represent a brand, what are your rates?",
"note": "Web and email addresses ending in .example stand in for real company addresses in this test."}},
"questions": {
"wants_paid_partnership": {
"type": "noul",
"instructions": "Does `lead.message` ask about paying the creator to promote something?",
"criteria": {
"true": "The sender wants to pay the creator for promotion, such as a sponsorship, ad read, sponsored post, integration, brand deal or paid campaign.",
"false": "The sender wants something else, such as praise, a shoutout swap, a free collab between creators, a job, help with an order, or to sell the creator a service."
}
}
}
}
JSON
```

Reads the key from `TYPESAFE_API_KEY`. Requires curl 7.76 or later. The state carries the same note line as our test.

### The ManyChat setup

```text
Step: Dev Tools > External Request
Method: POST
URL: https://api.typesafe.ai/v1/systemone
Headers: Authorization Bearer <your TypeSafe key, pasted into ManyChat; never in a shared doc>
Content-Type application/json
Body: the JSON below, with Encode to JSON turned on. {{lead_text}} is a text custom field that
holds the person's typed reply. Insert it with ManyChat's field picker, with no quote
marks around it, and check that it shows as a variable chip after any edit.

{
"model": "jev-1.14.0",
"state": {"lead": {
"channel": "Instagram direct message to a creator media company's account",
"message": {{lead_text}},
"note": "Web and email addresses ending in .example stand in for real company addresses in this test."}},
"questions": {
"acts_for_company": {"type": "noul",
"instructions": "Is the sender of `lead.message` writing on behalf of a brand, company or agency?",
"criteria": {"true": "The sender says they work for, own or represent a brand, company or agency, for example \"I run partnerships at a furniture brand\" or \"our agency represents a client\".",
"false": "The sender writes as an individual: a fan, a follower, a creator promoting their own account, or someone with a personal question."}},
"wants_paid_partnership": {"type": "noul",
"instructions": "Does `lead.message` ask about paying the creator to promote something?",
"criteria": {"true": "The sender wants to pay the creator for promotion, such as a sponsorship, ad read, sponsored post, integration, brand deal or paid campaign.",
"false": "The sender wants something else, such as praise, a shoutout swap, a free collab between creators, a job, help with an order, or to sell the creator a service."}},
"gives_company_website": {"type": "noul",
"instructions": "Does `lead.message` include a website for the sender's company?",
"criteria": {"true": "The message contains a company web address, such as brandname.example or www.brandname.example.",
"false": "The message contains no web address, or only a link with no company behind it."}},
"gives_company_email": {"type": "noul",
"instructions": "Does `lead.message` include an email address on the sender's company domain?",
"criteria": {"true": "The message contains an email address at a company domain, such as maya@brandname.example.",
"false": "The message contains no email address, or only one on a personal email service such as gmail, yahoo, icloud, outlook or hotmail."}},
"is_spam_or_scam": {"type": "noul",
"instructions": "Is `lead.message` spam, a scam or phishing?",
"criteria": {"true": "The message is a scam, phishing, a fake prize or fake account warning, a mass-sent promotion, or asks the creator to pay to take part.",
"false": "The message is a real person writing about something they actually want, even if it is short or the first time they have written."}},
"sells_to_creator": {"type": "noul",
"instructions": "Is the sender of `lead.message` trying to sell a service to the creator?",
"criteria": {"true": "The sender offers the creator something to buy, such as followers, growth, editing, design, account management or paid shoutouts.",
"false": "The sender is not selling anything to the creator."}}
}
}

Response mapping (JSONPath > number custom field, with the names we used):
$.answers.acts_for_company.noul > j_acts
$.answers.wants_paid_partnership.noul > j_paid
$.answers.gives_company_website.noul > j_site
$.answers.gives_company_email.noul > j_email
$.answers.is_spam_or_scam.noul > j_spam
$.answers.sells_to_creator.noul > j_sells

Condition chain (0.7 is yes, 0.3 is no):
j_spam >= 0.7 or j_sells >= 0.7: j_paid >= 0.7 > unclear, else > not qualified
otherwise: j_paid >= 0.7 > qualified
j_paid <= 0.3 > not qualified
else > unclear

After each verdict reply (added after our failure test):
set j_paid to 0.5, j_spam to 0 and j_sells to 0,
so if the next call fails, the chain lands on unclear and a person decides.

Fallback branch (no HTTP 200, or no reply within 10 seconds):
add tag "needs_person" and notify the partnerships lead.
With no fallback connected, our failed call did not stop the flow.
We have not tested whether this branch catches a failed call.
```

The setup we tested on 12 invented messages. Mapping runs only on HTTP 200. ManyChat advises against building automation logic on fallback, and in our test, with no fallback connected, a failed call left the old scores in place, so reset them after each verdict.
