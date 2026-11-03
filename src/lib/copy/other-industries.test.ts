import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pageFaqIds } from "./faq";
import { getPage, PAGES } from "./pages";
import { capabilities, llmsTxt } from "./machine";

const PATH = "/industries/other";
const link = (page: ReturnType<typeof getPage>, href: string) => page.body.includes(`](${href})`);

describe("Other industries page", () => {
  it("is registered under Industries with a title built for the search result", () => {
    const entry = PAGES.find((p) => p.path === PATH);
    expect(entry?.group?.href).toBe("/industries");
    expect(getPage(PATH).fm.title).toBe("AI for Other Industries: Starting From Your Workflow | SpliceOps");
  });

  it("leads with the method and says plainly that we have not built for their industry yet", () => {
    const page = getPage(PATH);
    expect(page.h1Text).toBe("AI for other industries: we start from your workflow, not your sector");
    expect(page.body).toContain("We haven't built for your industry yet.");
  });

  it("states the two clients and sends the reader to both industry pages and the working session", () => {
    const page = getPage(PATH);
    expect(link(page, "/industries/manufacturing")).toBe(true);
    expect(link(page, "/industries/agencies")).toBe(true);
    expect(page.body).toContain("**Book a working session** → /book");
  });

  it("repeats only questions and answers that exist on /faq", () => {
    expect(pageFaqIds(PATH)).toHaveLength(3);
  });

  it("uses no em or en dashes", () => {
    const raw = fs.readFileSync(path.join(process.cwd(), "content/v5/pages/industries/other.md"), "utf8");
    expect(raw).not.toMatch(/[–—]/);
  });

  it("is linked from the industries index with the card line", () => {
    const index = getPage("/industries");
    expect(link(index, PATH)).toBe(true);
    expect(index.body).toContain("Not on the list? Bring one workflow.");
  });

  it("is listed for machine readers", () => {
    expect(llmsTxt()).toContain("https://www.spliceops.ai/industries/other");
    expect(capabilities().industries.map((i) => i.url)).toContain("https://www.spliceops.ai/industries/other");
  });
});
