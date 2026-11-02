export type LogEntry = {
  badge: "FREE TOOL" | "OUR TOOL" | "NEW";
  name: string;
  code: string;
  kind: string;
  status: string;
  summary: string;
  cta: string;
  href: string;
};

export const SPLICE_LOG: readonly LogEntry[] = [
  {
    badge: "FREE TOOL",
    name: "Cost of delay",
    code: "LG-120",
    kind: "Calculator",
    status: "Live · free",
    summary:
      "The value you don’t get for each month you wait on AI, plus a line you can paste into your next board deck.",
    cta: "Open the tool",
    href: "/tools/ai-cost-of-delay",
  },
  {
    badge: "FREE TOOL",
    name: "AI ROI",
    code: "LG-121",
    kind: "Calculator",
    status: "Live · free",
    summary:
      "Whether rolling AI out to your team pays for itself in year one: cost, value of time saved, ROI and payback.",
    cta: "Open the tool",
    href: "/tools/ai-roi-calculator",
  },
  {
    badge: "FREE TOOL",
    name: "AI check-up",
    code: "LG-122",
    kind: "Assessment",
    status: "Live · free",
    summary:
      "Sixteen questions on where your company is on the path from AI-absent to AI-native, and whether the basics are in place to support it.",
    cta: "Take the check-up",
    href: "/tools/ai-check-up",
  },
  {
    badge: "OUR TOOL",
    name: "Station",
    code: "ST-01",
    kind: "Workspace",
    status: "In use · runs daily",
    summary:
      "The governed AI workspace behind our work: spend caps, a kill switch, full logging, and an accountable person behind every decision that matters.",
    cta: "Read the entry",
    href: "/station",
  },
  {
    badge: "OUR TOOL",
    name: "Brain",
    code: "BR-02",
    kind: "Memory",
    status: "In use · used daily",
    summary:
      "Your company’s shared brain: your prompts, skills and knowledge in one place, checked against your policies.",
    cta: "Read the entry",
    href: "#log",
  },
  {
    badge: "NEW",
    name: "Supadata",
    code: "LG-119",
    kind: "Transcript API",
    status: "Added · 01.11.2026",
    summary:
      "Turns the spoken audio of a public video into text in one call. Paired with on-screen text, it makes searchable notes.",
    cta: "Read the entry",
    href: "#log",
  },
];
