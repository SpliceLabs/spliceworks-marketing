import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { WeaveDiagram } from "./WeaveDiagram";

const html = renderToStaticMarkup(<WeaveDiagram />);

const rectFor = (label: string) => {
  const rects = [...html.matchAll(/<rect[^>]*>/g)].map((m) => m[0]);
  const text = html.indexOf(`>${label}<`);
  const before = html.slice(0, text);
  const lastRect = before.lastIndexOf("<rect");
  return rects.find((r) => html.indexOf(r, lastRect) === lastRect) ?? "";
};

describe("WeaveDiagram", () => {
  it("fills the agent step pills so the track does not show through", () => {
    ["Agents draft", "Ship"].forEach((label) => {
      const rect = rectFor(label);
      expect(rect).toContain("fs-dark");
      expect(rect).not.toContain('fill="none"');
    });
  });

  it("has a redraft dot that turns orange and rides the approved flow", () => {
    expect(html).toContain("pt-retry");
    expect(html).toMatch(/H330 V196[^"]*820 126 V100 H1000[^"]*H330 V360/);
  });

  it("describes the redraft in the accessible label", () => {
    expect(html).toMatch(/aria-label="[^"]*redraft/i);
  });
});
