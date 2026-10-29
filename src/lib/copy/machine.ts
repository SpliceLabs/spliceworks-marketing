/**
 * Builders for /llms.txt, /llms-full.txt and /capabilities.json. All three are
 * generated from the same copy files and page registry as the HTML pages, so
 * they mirror the site.
 */
import { inlineText, type Block, type Inline } from "./markdown";
import { absoluteUrl as absUrl, SITE_URL } from "@/lib/site";
import { PAGES, getPage } from "./pages";
import { getFaq } from "./faq";
import {
  CONSERVATIVE_SHARE,
  COST_OF_DELAY_DEFAULTS,
  COST_OF_DELAY_RANGES,
  costOfDelay,
  serializeCostOfDelayInputs,
} from "@/lib/tools/cost-of-delay";
import { AI_ROI, aiRoi } from "@/lib/tools/ai-roi";

/** SEO title without the " | Splice Works" suffix, for link text. */
export function shortTitle(urlPath: string): string {
  return getPage(urlPath).fm.title.replace(/\s*\|\s*Splice Works$/, "");
}

/** Markdown with site-relative links made absolute, for agents reading it off-site. */
export function absolutizeLinks(md: string): string {
  return md.replace(/\]\(\//g, `](${SITE_URL}/`).replace(/→ \/([a-z0-9/-]*)/g, (_, p) => `→ ${SITE_URL}/${p}`);
}

const GROUPS: { title: string; paths: string[] }[] = [
  { title: "Start here", paths: ["/", "/how-it-works", "/book"] },
  { title: "Services", paths: ["/services", "/services/ai-enabled", "/services/ai-native", "/services/fractional"] },
  {
    title: "Who it's for",
    paths: [
      "/for",
      "/for/ceos-and-boards",
      "/for/technology-leaders",
      "/for/founders",
      "/for/accelerators",
      "/for/investors",
    ],
  },
  { title: "Industries", paths: ["/industries", "/industries/manufacturing", "/industries/agencies"] },
  { title: "Free tools", paths: ["/tools", "/tools/ai-cost-of-delay", "/tools/ai-roi-calculator"] },
  { title: "Proof and reference", paths: ["/team", "/work", "/faq", "/station"] },
];

export function llmsTxt(): string {
  const home = getPage("/");
  const covered = new Set(GROUPS.flatMap((g) => g.paths));
  const missing = PAGES.filter((p) => !covered.has(p.path));
  if (missing.length) throw new Error(`llms.txt is missing ${missing.map((p) => p.path).join(", ")}`);

  const lines = [
    "# Splice Works",
    "",
    `> ${home.fm.description}`,
    "",
    "Put AI to work. Keep people accountable.",
    "",
    `The one next step everywhere: Book a working session (${absUrl("/book")}). Credited in full against your engagement.`,
    "",
  ];
  for (const g of GROUPS) {
    lines.push(`## ${g.title}`, "");
    for (const p of g.paths) {
      const { fm } = getPage(p);
      lines.push(`- [${shortTitle(p)}](${absUrl(p)}): ${fm.description}`);
    }
    lines.push("");
  }
  lines.push(
    "## Machine-readable",
    "",
    `- [llms-full.txt](${absUrl("/llms-full.txt")}): the full text of every page, including every FAQ answer`,
    `- [capabilities.json](${absUrl("/capabilities.json")}): services, pages and audiences as JSON`,
    "",
    "Splice Works is part of Splice Labs Group.",
    "",
  );
  return lines.join("\n");
}

export function llmsFullTxt(): string {
  const parts = [
    "# Splice Works: full site content",
    "",
    `> ${getPage("/").fm.description}`,
    "",
    `Every page of ${SITE_URL}, in site order. Each page's copy appears as published. Page index: ${absUrl("/llms.txt")}`,
    "",
  ];
  for (const entry of PAGES) {
    const page = getPage(entry.path);
    parts.push(
      "---",
      "",
      `URL: ${absUrl(entry.path)}`,
      `Title: ${page.fm.title}`,
      `Description: ${page.fm.description}`,
      "",
      absolutizeLinks(page.body.trim()),
      "",
    );
  }
  return parts.join("\n");
}

/* -------------------------------------------------------------------------- */
/* capabilities.json                                                           */
/* -------------------------------------------------------------------------- */

type Table = Extract<Block, { t: "table" }>;

function findTable(urlPath: string, sectionSlug: string): Table {
  const sec = getPage(urlPath).sections.find((s) => s.slug === sectionSlug);
  const table = sec?.blocks.find((b): b is Table => b.t === "table");
  if (!table) throw new Error(`capabilities.json: no table in ${urlPath}#${sectionSlug}`);
  return table;
}

const txt = (c: Inline[]) => inlineText(c).trim();
const camel = (s: string) =>
  s
    .replace(/[^A-Za-z0-9 ]/g, "")
    .trim()
    .split(/\s+/)
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("");

/** Column-per-item table → [{ name, url, <row label>: value }]. */
function columnsOf(table: Table) {
  return table.head.slice(1).map((head, col) => {
    const link = head.find((n) => n.t === "link");
    const item: Record<string, string> = { name: txt(head) };
    if (link && link.t === "link") item.url = absUrl(link.href);
    for (const row of table.rows) item[camel(txt(row[0]))] = txt(row[col + 1]);
    return item;
  });
}

const pageRef = (p: string) => ({ url: absUrl(p), title: getPage(p).fm.title, description: getPage(p).fm.description });

export function capabilities() {
  const home = getPage("/");
  const steps = columnsOf(findTable("/services", "pick-the-step-that-fits"));
  const seats = columnsOf(findTable("/services/fractional", "two-seats-and-an-advisory-option"));
  const { categories } = getFaq();

  return {
    name: "Splice Works",
    description: home.fm.description,
    tagline: "Put AI to work. Keep people accountable.",
    url: SITE_URL,
    company: "Splice Labs Group",
    primaryAction: {
      label: "Book a working session",
      url: absUrl("/book"),
      note: "Credited in full against your engagement.",
    },
    services: [
      { id: "ai-enabled", step: 1, ...steps[0], page: pageRef("/services/ai-enabled") },
      { id: "ai-native", step: 2, ...steps[1], page: pageRef("/services/ai-native") },
      {
        id: "fractional",
        name: "Fractional leadership",
        url: absUrl("/services/fractional"),
        status: "provisional",
        seats,
        page: pageRef("/services/fractional"),
      },
    ],
    audiences: [
      "/for/ceos-and-boards",
      "/for/technology-leaders",
      "/for/founders",
      "/for/accelerators",
      "/for/investors",
    ].map(pageRef),
    industries: ["/industries/manufacturing", "/industries/agencies"].map(pageRef),
    station: pageRef("/station"),
    tools: [costOfDelayTool(), aiRoiTool()],
    faq: {
      url: absUrl("/faq"),
      categories: categories.map((c) => ({
        name: c.title,
        questions: c.entries.map((e) => ({ question: e.question, url: `${absUrl("/faq")}#${e.id}` })),
      })),
    },
    pages: PAGES.map((p) => pageRef(p.path)),
    contact: { book: absUrl("/book") },
    machineReadable: {
      llmsTxt: absUrl("/llms.txt"),
      llmsFullTxt: absUrl("/llms-full.txt"),
      capabilities: absUrl("/capabilities.json"),
    },
  };
}

type ToolInput = Readonly<{ id: string; label: string; unit: string; min: number; max: number; step: number }>;

type MachineTool = Readonly<{
  id: string;
  name: string;
  url: string;
  description: string;
  inputs: readonly ToolInput[];
  formula: string;
  basedOn?: string;
  example: Readonly<{ inputs: object; outputs: object }>;
  shareUrl: string;
}>;

function costOfDelayTool(): MachineTool {
  const r = COST_OF_DELAY_RANGES;
  const url = absUrl("/tools/ai-cost-of-delay");
  return {
    id: "ai-cost-of-delay",
    name: "AI cost of delay calculator",
    url,
    description: getPage("/tools/ai-cost-of-delay").fm.description,
    inputs: [
      { id: "opportunities", label: "AI opportunities", unit: "count", ...r.opportunities },
      { id: "monthlyValue", label: "Monthly value of each opportunity", unit: "USD per month", ...r.monthlyValue },
      { id: "lagMonths", label: "Months of delay", unit: "months", ...r.lagMonths },
    ],
    formula: [
      "monthly = opportunities * monthlyValue",
      "cumulative = monthly * lagMonths",
      `conservative = ${CONSERVATIVE_SHARE} * cumulative`,
    ].join("\n"),
    example: { inputs: COST_OF_DELAY_DEFAULTS, outputs: costOfDelay(COST_OF_DELAY_DEFAULTS) },
    shareUrl: `${url}?${serializeCostOfDelayInputs(COST_OF_DELAY_DEFAULTS)}`,
  };
}

function aiRoiTool(): MachineTool {
  const r = AI_ROI.ranges;
  const url = absUrl("/tools/ai-roi-calculator");
  return {
    id: "ai-roi-calculator",
    name: "AI ROI calculator",
    url,
    description: getPage("/tools/ai-roi-calculator").fm.description,
    inputs: [
      { id: "team", label: "People using AI", unit: "count", ...r.team },
      { id: "salary", label: "Fully loaded cost per person", unit: "USD per year", ...r.salary },
      { id: "timeSaved", label: "Share of time AI saves", unit: "percent", ...r.timeSaved },
      { id: "toolsPerPerson", label: "AI tools per person", unit: "USD per year", ...r.toolsPerPerson },
      { id: "trainingPerPerson", label: "Training per person", unit: "USD per year", ...r.trainingPerPerson },
      { id: "infrastructure", label: "Infrastructure", unit: "USD per year", ...r.infrastructure },
      { id: "dipPercent", label: "Productivity dip while learning", unit: "percent", ...r.dipPercent },
      { id: "dipMonths", label: "Months the dip lasts", unit: "months", ...r.dipMonths },
    ],
    formula: [
      "hardCosts = (toolsPerPerson + trainingPerPerson) * team + infrastructure",
      "dipCost = team * salary * (dipPercent / 100) * (dipMonths / 12)",
      "investment = hardCosts + dipCost",
      "value = team * salary * (timeSaved / 100)",
      "benefit = value - investment",
      "roi = benefit / investment",
      "paybackMonths = investment / value * 12",
    ].join("\n"),
    basedOn: "https://dora.dev/ai/roi/calculator/",
    example: { inputs: AI_ROI.defaults, outputs: aiRoi(AI_ROI.defaults) },
    shareUrl: `${url}?${AI_ROI.serialize(AI_ROI.defaults)}`,
  };
}
