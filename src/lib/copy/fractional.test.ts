import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getFaq, pageFaqIds } from "./faq";
import { capabilities } from "./machine";
import { mentionsPriceOrTimeBand } from "./test-support";
import { inlineText, type Inline } from "./markdown";
import { getPage } from "./pages";

const PATH = "/services/fractional";
const raw = fs.readFileSync(path.join(process.cwd(), "content/v5/pages/services/fractional.md"), "utf8");
const slugs = () => getPage(PATH).sections.map((s) => s.slug);

describe("Fractional leadership overview", () => {
  it("explains the problem and the role before it sells the seats", () => {
    expect(slugs().slice(0, 3)).toEqual([
      "where-ai-stalls-without-an-owner",
      "two-seats-and-an-advisory-option",
      "what-the-seat-owns-and-what-stays-with-you",
    ]);
  });

  it("closes with how the seat ends and when to hire full-time instead", () => {
    const all = slugs();
    expect(all).toContain("how-the-time-works");
    expect(all).toContain("how-it-ends");
    expect(all).toContain("when-you-need-a-full-time-hire-instead");
  });

  it("keeps the seats table that capabilities.json reads", () => {
    const service = capabilities().services.find((s) => s.id === "fractional");
    const seats = service && "seats" in service ? (service.seats ?? []) : [];
    expect(seats.map((s) => s.name)).toEqual(["Fractional Chief AI Officer", "Fractional CPTO or CTO", "Advisory"]);
  });

  it("maps decision rights between the seat and the client", () => {
    const section = getPage(PATH).sections.find((s) => s.slug === "what-the-seat-owns-and-what-stays-with-you");
    const table = section?.blocks.find((b) => b.t === "table");
    const cells = (nodes: readonly Inline[]) => inlineText([...nodes]).trim();
    const head = table?.t === "table" ? table.head.map(cells) : [];
    const rows = table?.t === "table" ? table.rows.map((row) => row.map(cells)) : [];
    expect(head).toEqual(["Area", "The seat", "You"]);
    expect(rows.map((row) => row[0])).toEqual([
      "AI direction",
      "AI spend",
      "Tools and vendors",
      "Accountability",
      "First results",
      "Board and investors",
    ]);
    rows.forEach(([, seat, you]) => {
      expect(seat).not.toEqual("");
      expect(you).not.toEqual("");
      expect(seat).not.toEqual(you);
    });
  });

  it("describes advisory as a standing weekly or twice-weekly call in the seats table", () => {
    const service = capabilities().services.find((s) => s.id === "fractional");
    const seats = service && "seats" in service ? (service.seats ?? []) : [];
    expect(seats.find((seat) => seat.name === "Advisory")?.usually).toContain("weekly or twice a week");
  });

  it("publishes no price and no time bands", () => {
    expect(mentionsPriceOrTimeBand(raw)).toBe(false);
  });

  it("uses no em or en dashes", () => {
    expect(raw).not.toMatch(/[–—]/);
  });

  it("answers the questions buyers ask about the seat in a Fractional leadership FAQ category", () => {
    const category = getFaq().categories.find((c) => c.id === "fractional-leadership");
    expect(category?.entries.map((e) => e.question)).toEqual([
      "What is the difference between the seat and an AI consultant?",
      "Does the seat replace our COO, CIO or CTO?",
      "How much time do we get?",
      "Can we start with advisory?",
      "How does a fractional seat end?",
      "When should we hire a full-time AI executive instead?",
    ]);
  });

  it("repeats those answers on the page, word for word", () => {
    expect(pageFaqIds(PATH)).toHaveLength(9);
  });
});
