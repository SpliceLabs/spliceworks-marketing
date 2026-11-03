import { describe, expect, it } from "vitest";
import { getPage } from "./pages";

describe("Privacy notice", () => {
  it("discloses Gojiberry, the data it collects, why we use it and how to opt out", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("Gojiberry");
    expect(body).toContain("IP address");
    expect(body).toContain("which companies visit");
    expect(body).toContain("https://gojiberry.ai/optout");
  });
});
