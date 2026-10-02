import { NextResponse } from "next/server";

const llmsContent = `# Splice Works

> A forward-deployed team inside Splice Labs Group for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.

## What We Do

Splice Works turns existing companies AI-native in two steps. First, AI-absent to AI-enabled: everything a company knows feeds one shared Brain its people use every day, live early in the engagement. Second, AI-enabled to AI-native: that Brain drives the work through Splice Station, governed agents running inside the systems the client already runs. After the engagement, we keep running the Brain and Station as a managed service — and the client is never locked into us, so they can always run it themselves.

## Services

Four surfaces where AI changes a company:

1. **Build** (AI development) - Redesign how software moves from intent to production, with deterministic quality gates.
2. **Embed** (AI product) - Design and build customer-facing AI inside existing product flows: copilots, retrieval, search, recommendations.
3. **Operate** (AI operations) - Separate the predictable path from work that needs judgment, then build governed AI into the systems already responsible for execution.
4. **Decide** (AI decision systems) - Build systems around the questions teams repeatedly need to answer, producing evidence-backed, defensible conclusions.

## The Brain and Station

The Brain is the shared knowledge layer we build first: everything a company knows, in one place its people use every day.

Station is the governed platform that puts the Brain to work. It:
- Orchestrates harness execution
- Enforces approval gates
- Tracks decisions and artifacts
- Provides Human/Agent mode views

By itself, Station does nothing — it needs a configuration built for the work. You're never locked in: managed by default, portable by design.

Deployment options: Cloud (hosted), bring your own cloud, Self-hosted, or Hybrid.

## Our Process

Every engagement follows 3 stages:

1. **Diagnose** (1-2 weeks) - Map how work actually moves across people, systems, data, and decisions. Score opportunities and recommend architecture.
2. **Deploy** (4-12 weeks) - Brain live early in the engagement; build the production system with real integrations, an evaluation harness, and governance controls designed in from the start.
3. **Operate and scale** (Ongoing) - Stay embedded to measure what works, improve the system, and find the next opportunity worth transforming.

## Security Principles

- Role-based access controls
- Complete audit trails
- Compliance alignment with your requirements (GDPR and custom frameworks)
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
