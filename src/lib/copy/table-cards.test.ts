import { describe, expect, it } from "vitest";
import type { Inline } from "./markdown";
import { tableToCards } from "./table-cards";

const cell = (value: string): Inline[] => [{ t: "text", v: value }];
const text = (c: readonly Inline[]) => JSON.stringify(c);

describe("tableToCards", () => {
  const matrix = {
    head: [[], cell("Step 1"), cell("Step 2")],
    rows: [
      [cell("Today"), cell("a1"), cell("a2")],
      [cell("Build"), cell("b1"), cell("b2")],
    ],
  };

  it("turns each data column of a matrix table into a numbered card", () => {
    const cards = tableToCards(matrix);
    expect(cards.map((c) => c.n)).toEqual(["01", "02"]);
    expect(text(cards[0].title)).toContain("Step 1");
    expect(cards[0].rows.map((r) => text(r.label))).toEqual([
      expect.stringContaining("Today"),
      expect.stringContaining("Build"),
    ]);
    expect(text(cards[1].rows[1].value)).toContain("b2");
  });

  const records = {
    head: [cell("Client"), cell("Built"), cell("Status")],
    rows: [
      [cell("Agency"), cell("Agents"), cell("Live")],
      [cell("Maker"), cell("A brain"), cell("In progress")],
      [cell("Splice"), cell("Delivery"), cell("Live")],
    ],
  };

  it("turns each row of a record table into a card titled by its first cell", () => {
    const cards = tableToCards(records);
    expect(cards).toHaveLength(3);
    expect(text(cards[2].title)).toContain("Splice");
    expect(cards[0].rows.map((r) => text(r.label))).toEqual([
      expect.stringContaining("Built"),
      expect.stringContaining("Status"),
    ]);
  });

  it("pads numbers to two digits", () => {
    expect(tableToCards(records).map((c) => c.n)).toEqual(["01", "02", "03"]);
  });
});
