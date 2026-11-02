import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TableCards } from "./TableCards";

const out = renderToStaticMarkup(
  <TableCards
    cards={[
      { n: "01", title: "Build it yourself", rows: [{ label: "Time", value: "Months" }] },
      { n: "02", title: <a href="/x">With Splice</a>, rows: [{ label: "Time", value: "A day" }] },
    ]}
  />,
);

describe("TableCards", () => {
  it("renders the system comparison cards with each label and value as a term and its definition", () => {
    expect(out).toContain('class="tcards"');
    expect(out.match(/class="tcard"/g)).toHaveLength(2);
    expect(out).toContain('class="tcard-n"');
    expect(out).toContain('class="tcard-row"');
    expect(out).toContain("<dt>Time</dt>");
    expect(out).toContain("<dd>A day</dd>");
  });
});
