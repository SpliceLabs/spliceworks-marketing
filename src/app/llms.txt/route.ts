import { NextResponse } from "next/server";

const llmsContent = `# Splice Works

> The AI-transformation firm inside Splice Labs Group. We find where AI creates real leverage, build the systems that capture it, and stay accountable through production.

## What We Do

Splice Works turns existing companies AI-native. We run Hermes, our internal engagement toolkit, to diagnose and deploy production AI systems. Hestia is what we leave behind: the reusable, governed backbone the client runs afterward. Splice Station is the governed infrastructure that makes Hestia possible.

## Services

Four surfaces where AI changes a company:

1. **Build** (AI development) - Redesign how software moves from intent to production, with deterministic quality gates.
2. **Embed** (AI product) - Design and build customer-facing AI inside existing product flows: copilots, retrieval, search, recommendations.
3. **Operate** (AI operations) - Separate the predictable path from work that needs judgment, then build governed AI into the systems already responsible for execution.
4. **Decide** (AI decision systems) - Build systems around the questions teams repeatedly need to answer, producing evidence-backed, defensible conclusions.

## Station and Hestia

Station is the governed platform underneath everything we build. It:
- Orchestrates harness execution
- Enforces approval gates
- Tracks decisions and artifacts
- Provides Human/Agent mode views

By itself, Station does nothing — it needs a configuration built for the work. What gets deployed on Station during an engagement becomes Hestia: the client's own operating backbone.

Deployment options: Hosted, Self-hosted, or Hybrid.

## Our Process

Every engagement follows 3 stages:

1. **Diagnose** (2-4 weeks) - Map how work actually moves across people, systems, data, and decisions. Score opportunities and recommend architecture.
2. **Deploy** (4-12 weeks) - Build the production system with real integrations, an evaluation harness, and governance controls designed in from the start.
3. **Operate and scale** (Ongoing) - Stay embedded to measure what works, improve the system, and find the next opportunity worth transforming.

## Security Principles

- Role-based access controls
- Complete audit trails
- Compliance alignment (SOC 2, GDPR, HIPAA)
- Data boundaries defined before work begins
- Gate enforcement for critical operations
- Evidence requirements for decisions

## Contact

Website: https://spliceworks.ai
Contact: https://spliceworks.ai/contact

Splice Works is part of Splice Labs Group.
`;

export async function GET() {
  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
