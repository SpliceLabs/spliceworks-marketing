import { describe, expect, it } from "vitest";
import type { LogEntry } from "@/lib/log/entries";
import { latestTickets, toTicket } from "./splice-log";

const entryFactory = (overrides: Partial<LogEntry> = {}): LogEntry => ({
  type: "tool",
  title: "Cost of delay",
  description: "The value you don’t get for each month you wait on AI.",
  published: "2026-11-04",
  status: "published",
  stage: "native",
  code: "LG-00120",
  slug: "ai-cost-of-delay",
  body: "body",
  readingMinutes: 3,
  ...overrides,
});

describe("toTicket", () => {
  it("links the ticket to its log entry and carries its code, title and description", () => {
    const ticket = toTicket(entryFactory());
    expect(ticket).toMatchObject({
      name: "Cost of delay",
      code: "LG-00120",
      summary: "The value you don’t get for each month you wait on AI.",
      href: "/log/ai-cost-of-delay",
    });
  });

  it("labels the ticket with the entry type and its publish date", () => {
    const ticket = toTicket(entryFactory({ type: "research", published: "2026-11-04" }));
    expect(ticket.kind).toBe("Research");
    expect(ticket.status).toBe("4 Nov 2026");
  });

  it("uses the entry hero as the poster when it has one", () => {
    const hero = { src: "/log/deepseek.jpg", alt: "alt" };
    expect(toTicket(entryFactory({ hero })).poster).toBe("/log/deepseek.jpg");
    expect(toTicket(entryFactory()).poster).toBeUndefined();
  });

  it("places the ticket on the track by the stage it speaks to", () => {
    const tracks = (["absent", "enabled", "native", "all"] as const).map(
      (stage) => toTicket(entryFactory({ stage })).track,
    );
    expect(tracks).toEqual([0, 34, 67, 100]);
  });
});

describe("latestTickets", () => {
  it("returns the newest entries first, capped at the requested count", () => {
    const entries = [
      entryFactory({ slug: "old", code: "LG-00001", published: "2026-01-01" }),
      entryFactory({ slug: "newest", code: "LG-00003", published: "2026-11-04" }),
      entryFactory({ slug: "mid", code: "LG-00002", published: "2026-06-01" }),
    ];
    expect(latestTickets(entries, 2).map((t) => t.href)).toEqual(["/log/newest", "/log/mid"]);
  });

  it("orders entries published on the same day by slug", () => {
    const entries = [
      entryFactory({ slug: "zeta", published: "2026-11-04" }),
      entryFactory({ slug: "alpha", published: "2026-11-04" }),
    ];
    expect(latestTickets(entries, 2).map((t) => t.href)).toEqual(["/log/alpha", "/log/zeta"]);
  });

  it("does not mutate the entries it is given", () => {
    const entries = [
      entryFactory({ slug: "a", published: "2026-01-01" }),
      entryFactory({ slug: "b", published: "2026-02-01" }),
    ];
    latestTickets(entries, 3);
    expect(entries.map((e) => e.slug)).toEqual(["a", "b"]);
  });
});
