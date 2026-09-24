import { NextResponse } from "next/server";

const capabilities = {
  name: "Splice Works",
  description:
    "The AI-transformation firm inside Splice Labs Group. We find where AI creates real leverage, build the systems that capture it, and stay accountable through production.",
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
      "The governed platform underneath everything we build. By itself, Station does nothing — it needs a configuration built for the work.",
    capabilities: [
      "Harness orchestration",
      "Approval gate enforcement",
      "Decision and artifact tracking",
      "Human/Agent mode views",
    ],
    deploymentOptions: [
      {
        id: "hosted",
        name: "Hosted",
        description: "We run Station for you. No infrastructure to manage.",
      },
      {
        id: "self-hosted",
        name: "Self-hosted",
        description: "You run Station on your infrastructure. Full control.",
      },
      {
        id: "hybrid",
        name: "Hybrid",
        description: "Split between hosted and self-hosted components.",
      },
    ],
  },

  hestia: {
    name: "Hestia",
    description:
      "What Station becomes once configured for a client. The reusable, permissioned, audited operating backbone left behind after an engagement — not a one-off project.",
  },

  process: {
    stages: [
      {
        number: 1,
        name: "Diagnose",
        description:
          "Map how work actually moves across people, systems, data, and decisions. Score opportunities and recommend architecture.",
        duration: "2-4 weeks",
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
    compliance: ["SOC 2 Type II", "GDPR", "HIPAA-aligned"],
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
