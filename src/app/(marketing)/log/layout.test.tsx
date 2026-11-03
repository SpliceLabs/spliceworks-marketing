import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import LogLayout from "./layout";

describe("Log layout", () => {
  it("marks every Log page so the glow can be turned up for them", () => {
    expect(renderToStaticMarkup(<LogLayout>Inside</LogLayout>)).toBe('<div class="lg-page">Inside</div>');
  });
});
