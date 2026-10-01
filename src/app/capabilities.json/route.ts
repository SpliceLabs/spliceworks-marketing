import { NextResponse } from "next/server";

const capabilities = {
  name: "Splice Works",
  description:
    "A forward-deployed team inside Splice Labs Group for knowledge-heavy companies with an AI mandate and no path to production. We put AI to work and keep a named human accountable at every gate.",
  url: "https://spliceworks.ai",
  company: "Splice Labs Group",

  services: [
    {
      id: "build",
      name: "Build",
      tagline: "AI development",
      description:
        "Redesign how software moves from intent to production, with deterministic quality gates.",
      deliverables: [
        "Codebase and architecture review",
        "Redesigned path from intent to production",
        "Deterministic quality gates",
      ],
    },
    {
      id: "embed",
      name: "Embed",
      tagline: "AI product",
      description:
        "Design and build customer-facing AI inside the product flows people already use.",
      deliverables: [
        "Copilots, retrieval, search, recommendations",
        "Grounded in your data",
        "Instrumented against real usage",
      ],
    },
    {
      id: "operate",
      name: "Operate",
      tagline: "AI operations",
      description:
        "Separate the predictable path from work that needs judgment, then build governed AI into the systems already responsible for execution.",
      deliverables: [
        "Predictable path separated from judgment work",
        "Governed AI built into existing systems",
        "Execution stays in systems you already run",
      ],
    },
    {
      id: "decide",
      name: "Decide",
      tagline: "AI decision systems",
      description:
        "Build systems around the questions teams repeatedly need to answer.",
      deliverables: [
        "Evidence gathering",
        "Internal and external research",
        "Defensible conclusions",
      ],
    },
  ],

  station: {
    name: "Splice Station",
    description:
      "The governed platform that puts the Brain to work through agents. By itself, Station does nothing — it needs a configuration built for the work. Never locked in: managed by default, portable by design.",
    capabilities: [
      "Harness orchestration",
      "Approval gate enforcement",
      "Decision and artifact tracking",
      "Human/Agent mode views",
    ],
    deploymentOptions: [
      {
        id: "cloud",
        name: "Cloud",
        description: "We run Station for you on managed cloud infrastructure. No infrastructure to manage.",
      },
      {
        id: "byoc",
        name: "Bring your own cloud",
        description: "Station deploys inside your own cloud account. You keep the infrastructure boundary, we still operate the platform.",
      },
      {
        id: "self-hosted",
        name: "Self-hosted",
        description: "You run Station entirely on your own infrastructure — we don't operate it. Full control, never locked in.",
      },
      {
        id: "hybrid",
        name: "Hybrid",
        description: "Split between hosted and self-hosted components. We run the control plane, you keep the agents and data on your own infrastructure.",
      },
    ],
  },

  brain: {
    name: "The Brain",
    description:
      "The shared knowledge layer we build first: everything a company knows, in one place its people use every day. The AI-enabled step, live early in the engagement, before Station and agents take on the work.",
  },

  process: {
    stages: [
      {
        number: 1,
        name: "Diagnose",
        description:
          "Map how work actually moves across people, systems, data, and decisions. Score opportunities and recommend architecture.",
        duration: "1-2 weeks",
      },
      {
        number: 2,
        name: "Deploy",
        description:
          "Build the production system with real integrations, an evaluation harness, and governance controls designed in from the start.",
        duration: "4-12 weeks",
      },
      {
        number: 3,
        name: "Operate and scale",
        description:
          "Stay embedded to measure what works, improve the system, and find the next opportunity worth transforming.",
        duration: "Ongoing",
      },
    ],
  },

  security: {
    principles: [
      "Role-based access controls",
      "Complete audit trails",
      "Compliance alignment",
      "Data boundary definition",
      "Gate enforcement",
      "Evidence requirements",
    ],
    compliance: ["GDPR", "Custom frameworks"],
  },

  contact: {
    website: "https://spliceworks.ai",
    form: "https://spliceworks.ai/contact",
  },

  machineReadable: {
    llmsTxt: "https://spliceworks.ai/llms.txt",
    capabilities: "https://spliceworks.ai/capabilities.json",
  },
};

export async function GET() {
  return NextResponse.json(capabilities, {
    headers: {
      "Cache-Control": "public, max-age=86400",
    },
  });
}
