import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pageFaqIds } from "./faq";
import { llmsTxt } from "./machine";
import { getPage, PAGES } from "./pages";

const SEATS = [
  {
    path: "/services/fractional/chief-ai-officer",
    file: "services/fractional/chief-ai-officer.md",
    h1: "A fractional Chief AI Officer, with outcomes in writing",
  },
  {
    path: "/services/fractional/cpto-cto",
    file: "services/fractional/cpto-cto.md",
    h1: "A fractional CPTO or CTO to make your product AI-native",
  },
];

describe.each(SEATS)("Seat page $path", ({ path: urlPath, file, h1 }) => {
  it("is registered under fractional leadership and leads with its own headline", () => {
    expect(PAGES.find((p) => p.path === urlPath)?.group?.href).toBe("/services/fractional");
    expect(getPage(urlPath).h1Text).toBe(h1);
  });

  it("sends the reader back to the overview and on to the working session", () => {
    const page = getPage(urlPath);
    expect(page.body).toContain("](/services/fractional)");
    expect(page.body).toContain("**Book a working session** → /book");
  });

  it("repeats only answers that exist on /faq", () => {
    expect(pageFaqIds(urlPath).length).toBeGreaterThanOrEqual(3);
  });

  it("is listed for machine readers", () => {
    expect(llmsTxt()).toContain(`https://www.spliceops.ai${urlPath}`);
  });

  it("uses no em or en dashes, no price and no time bands", () => {
    const raw = fs.readFileSync(path.join(process.cwd(), "content/v5/pages", file), "utf8");
    expect(raw).not.toMatch(/[–—]/);
    expect(raw).not.toMatch(/\$\s?\d/);
    expect(raw).not.toMatch(/\b(days?|hours?) (a|per) (week|month)\b/i);
  });
});

describe("Overview links to the seat pages", () => {
  it("links each seat from the overview", () => {
    const body = getPage("/services/fractional").body;
    expect(body).toContain("](/services/fractional/chief-ai-officer)");
    expect(body).toContain("](/services/fractional/cpto-cto)");
  });
});

describe("Chief AI Officer seat page", () => {
  it("sits beside the COO as well as the CIO and CTO", () => {
    const body = getPage("/services/fractional/chief-ai-officer").body;
    expect(body).toContain("## Beside your COO, CIO and CTO");
    expect(body).toContain("Your COO keeps operations");
  });
});
