import { describe, expect, it } from "vitest";
import { emphasize } from "./emphasis";

describe("emphasize", () => {
  it("splits text around the first match of the phrase", () => {
    expect(emphasize("We tested a fast model.", "fast")).toEqual([
      { text: "We tested a ", em: false },
      { text: "fast", em: true },
      { text: " model.", em: false },
    ]);
  });

  it("returns the text whole when there is no phrase or it is not found", () => {
    expect(emphasize("Plain text.", undefined)).toEqual([{ text: "Plain text.", em: false }]);
    expect(emphasize("Plain text.", "missing")).toEqual([{ text: "Plain text.", em: false }]);
  });
});
