# Sitemap

## Brand architecture

> Authoritative language from Ariel's Sept 17, 2026 Splice working session.

**Corporate hierarchy:**

```
Splice Labs Group                    (owns shared infrastructure)
├── Splice Labs                      (venture studio — creates new AI-native companies)
│   └── runs Helios on Station
└── Splice Works                     (AI-transformation firm — converts existing
    │                                 companies into AI-native ones)
    └── runs Hermes on Station, deploys Hestia to clients

Splice Station                       (governed platform underneath everything —
                                       by itself it does nothing)
```

**Non-technical summary (usable as hero/about copy verbatim):**
> Splice Works helps you become AI-native. Hestia is what you run on afterward. Splice Station is the governed infrastructure making it possible.

| Layer | What it is | Where it lives on this site |
|-------|-----------|-----------------|
| **Splice Works** | The AI-transformation firm. Converts *existing* companies into AI-native ones. This site. | `/`, `/services`, `/how-we-work`, `/about` |
| **Splice Station** | The governed platform underneath — by itself it does nothing. Permissioning, audit trails, telemetry, security, SSO, integrations. Needs a configuration/runtime plugged in to do work. | Own primary nav page: `/station` |
| **Hermes** | Splice Works' proprietary transformation system for moving a client from AI-naive to AI-advanced. Runs on Station. **Not handed to clients.** | Named explicitly in `/how-we-work` ("we use AI to deliver AI" commitment) — internal capability only, never a sold product |
| **Hestia** | The customer-facing product — "the backbone/spine" of the AI-native company that remains after the engagement. Runs on Station. | Introduced on `/station` ("what gets deployed becomes your Hestia"), paid off in `/how-we-work`'s Operate & Scale phase ("what you keep") |
| **Helios** *(out of scope for this site)* | Splice Labs' (venture studio, sibling to Splice Works) runtime for venture formation — generation, validation, creation of new companies. | Not part of Splice Works' IA. Worth a one-line corporate-structure mention on `/about` only, since it clarifies Splice Works is one of several things built on Station. |

Security/audit/SSO is folded into `/station` as a section (it's literally what Station does) rather than kept as a separate primary nav item. A deeper compliance page remains at `/security` for procurement audiences, linked from `/station`'s footer, not the primary nav.

## Primary Routes (P0)

| Route | Job | Priority |
|-------|-----|----------|
| `/` | Problem → methodology → Station/Hestia teaser → proof → CTA | P0 |
| `/services` | Overview of the 4 transformation surfaces (Build, Embed, Operate, Decide), links to sub-pages | P0 |
| `/station` | The platform: what it does, why it's intentionally thin, becomes-your-Hestia framing | P0 |
| `/how-we-work` | Diagnose → Deploy → Operate & Scale methodology, six commitments (Hermes named here), what's left behind (Hestia) | P0 |

## Secondary Routes (P1)

| Route | Job | Priority |
|-------|-----|----------|
| `/services/ai-development` | Build surface — software delivery with AI | P1 |
| `/services/ai-product` | Embed surface — AI inside the client's product | P1 |
| `/services/ai-operations` | Operate surface — AI inside business workflows | P1 |
| `/services/ai-decision-systems` | Decide surface — AI for repeatable decisions | P1 |
| `/work` | Case studies (placeholder until real client work clears approval) | P1 |
| `/about` | Firm identity, relationship to Splice Labs, beliefs | P1 |
| `/contact` | Engagement intake form | P1 |

Note: Lovable's separate "AI Enablement" and "AI Infrastructure" surfaces are intentionally not carried forward as sellable services — Enablement folds into the Diagnose phase of `/how-we-work`, and Infrastructure folds into `/station`/Hestia.

## Tertiary Routes (P2 — built but not linked in nav)

| Route | Job | Priority |
|-------|-----|----------|
| `/security` | Deep compliance detail (SOC2, data handling) for procurement | P2 |
| `/faq` | Common questions answered | P2 |
| `/industries` | Vertical-specific framing | P2 |

## Machine Routes

| Route | Purpose |
|-------|---------|
| `/llms.txt` | AI-readable site summary |
| `/llms-full.txt` | Complete AI-readable content |
| `/capabilities.json` | Machine-readable service manifest |
| `/api/contact-schema` | Structured intake for agents |

## Homepage Sections

1. Hero with Habitat visualization — subhead: "Splice Works helps you become AI-native. Hestia is what you run on afterward. Splice Station is the governed infrastructure making it possible."
2. Methodology overview: Diagnose → Deploy → Operate & Scale (3 cards)
3. Services teaser: 4 surfaces (Build, Embed, Operate, Decide)
4. Station introduction + "what you keep is Hestia" hook
5. Proof / evidence section
6. Contact CTA

## Navigation

**Header:**
- Logo (link to /)
- Services
- Station
- How We Work
- Work
- About
- Contact
- Human/Agent toggle
- Paper/Ink theme toggle

**Footer:**
- Logo with endorsement
- About
- FAQ
- Security
- Contact
- Legal (Privacy, Terms)
