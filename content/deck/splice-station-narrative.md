# Splice Station — Deck Narrative (Canonical Copy Deck)

*Matches `splice-station-deck.html`. Visual system: same `sw-` design tokens as `splice-works-investor-deck.html` (this is Splice Labs IP, deployed by Splice Works — same family, own deck).*

*Framing: reference material, not a pitch. "Know about Station" — what it is, how it's built, where it stands today. Aspirational language is limited to the roadmap slide, and marked as such.*

---

## Canonical one-paragraph narrative

> Splice Station is Splice Labs' governed harness runtime — the control plane that lets AI agents execute inside real business systems without unchecked access. Every harness runs through approval gates, connector brokering, and a permanent audit trail before it earns write access. Splice Works installs Station at every client engagement; each harness built for a client becomes reusable IP that hardens the platform for the next deployment.

**Reference line** (used as the close, slide 8):

> Anyone can wire an agent to an API. Station is what makes that safe enough to run in production — and portable enough to reuse.

---

## Slide 1 — Cover

**Eyebrow:** Splice Labs

**Headline:** Splice Station — the governed runtime underneath every deployment.

**Subhead:** What it is, how it's built, and where it stands today.

**Footer:** A Splice Labs product

---

## Slide 2 — Why it exists

**Eyebrow:** The problem it solves

**Headline:** Agents fail in production for one reason: nobody trusts them with real systems.

**Body:** A model that can read a database and misread it once is a demo. The same model with no audit trail, no approval gate, and no scoped access is a liability. Governance isn't a feature bolted on after the fact — it has to be the substrate agents run on.

**Diagram — two columns:**

| Ungoverned agent | Station-governed harness |
|---|---|
| Direct API / DB access | Broker-mediated, scoped per harness |
| No record of what changed or why | Every mutation logged: actor, harness, run, step |
| All-or-nothing trust | Sandbox → shadow mode → gated production |
| Rebuilt from scratch per client | Packaged as a portable harness |

---

## Slide 3 — The architecture

**Eyebrow:** What it's made of

**Headline:** Four primitives. One runtime.

**Body:** Every harness Splice Labs or Splice Works builds runs on the same governed spine.

**Diagram — hub and spoke (Station at center, 4 nodes):**
- **Approval Gates** — harnesses declare gates in `gates/*.yaml`; nothing proceeds past a gate without explicit sign-off; resume tokens pick execution back up after approval.
- **Audit Trail** — every mutation is logged with actor, harness, run, unit, and step — a permanent record, not a log line that rotates away.
- **Connector Broker** — the only path to a real system; brokers read / write / approve / pay-mode access per declared scope, with dry-run built in.
- **Bounded Execution** — harness code runs Deno-confined; it can only reach the outside world through declared connectors, never raw network or filesystem access.

---

## Slide 4 — How a harness earns trust

**Eyebrow:** The pipeline

**Headline:** Nothing gets write access until it's proven.

**Diagram — pipeline:**
Harness declared (`station-pack.yaml`) → Sandbox (dry-run on real data) → Shadow mode (proposes, doesn't act) → Gated production (write access granted) → Maintained (harness improves in place)

**Line:** The gates don't come off after go-live. They stay on, permanently — that's what makes the audit trail mean something.

---

## Slide 5 — Where it runs

**Eyebrow:** Deployment motions

**Headline:** One runtime, three operating contexts.

**Diagram — 3 cards:**
- **Internal operations** — Splice Labs and Splice Works run Station on their own workflows first.
- **PE & portfolio operations** — one Station instance, harnesses repeated across portfolio companies.
- **Enterprise workflow automation** — deployed inside the client's environment; the client supplies its own systems of record, Station supplies the governance layer.

**Line:** Self-hosted by design. Station runs inside the customer's environment — not a shared multi-tenant control plane holding everyone's data.

---

## Slide 6 — How Splice Works deploys it

**Eyebrow:** Labs builds, Works deploys

**Headline:** Station is the control plane underneath every Splice Works engagement.

**Body:** Splice Works installs three things at every client: Splice Station, a scoped harness, and a client-specific brain. Station is the one layer that never gets rebuilt — it's Splice Labs IP, licensed into the deployment, not reinvented per client.

**Diagram — bidirectional:**
**Splice Labs** (builds Station + harness IP) ⇄ **Splice Works** (deploys it under governance, into real client operations)

---

## Slide 7 — Where it stands today

**Eyebrow:** Current state, stated plainly

**Headline:** The governance spine is solid. The interfaces around it are still being built.

**Body:** Station is a working runtime today — harnesses run, gates hold, the audit trail records every mutation. What's still ahead: a live MCP server as the primary agent interface, verified live connector integrations beyond the reference adapters, durable persistence, and production-grade auth.

**Diagram — two rows:**
- Live today: harness runtime · approval gates · audit trail · connector broker · bounded execution
- In build: MCP server · live integrations (beyond reference adapters) · durable persistence · pack signing

**Footnote:** This is a v0.2 runtime under active development, not a shipped product. This slide reflects the actual build plan, not aspirational marketing — re-verify against `docs/architecture/station-build-plan.md` before any external use.

---

## Slide 8 — Close

**Headline:** Anyone can wire an agent to an API. Station is what makes that safe enough to run — and reusable enough to compound.

**Body:** Splice Station is Splice Labs' governed harness runtime, deployed into every Splice Works engagement. Built once, hardened continuously, running everywhere Splice Works ships.

**Line:** Individual harnesses may commoditize. The moat is the governance substrate, the portable harness library, and the compounding vertical intelligence underneath them.

---

## Open items before this becomes final external copy

- Confirm the version marker ("v0.2", "prototype runtime") is the current disclosable status before this is shown outside Splice Labs/Works.
- Confirm no specific client/harness names are attached to slide 6 or the closing moat line without separate sign-off — mirrors the same open item on the Splice Works narrative.
- Slide 7's "Live today / In build" split should be re-verified against `docs/architecture/station-build-plan.md` immediately before any external use, since it will drift as the runtime ships.
- This deck is scoped as internal/Labs-Works reference material, not an investor-facing artifact — confirm audience before any external distribution.
