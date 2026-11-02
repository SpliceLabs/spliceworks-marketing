export type LogEntry = {
  badge: "FREE TOOL" | "OUR TOOL" | "NEW";
  name: string;
  code: string;
  kind: string;
  status: string;
  summary: string;
  cta: string;
  href: string;
  track: number;
  poster?: string;
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
    track: 100,
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
    track: 100,
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
    track: 100,
  },
];
