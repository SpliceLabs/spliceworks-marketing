import { describe, expect, it } from "vitest";
import { entryMetadata } from "./metadata";
import { makeEntry } from "./test-support";

describe("entryMetadata for a write-up", () => {
  const meta = entryMetadata(makeEntry({ slug: "a-tool-write-up", parent: "a-tool", title: "A tool, the write-up" }));

  it("is canonical at its own address and titled after itself", () => {
    expect(meta.alternates?.canonical).toBe("/log/a-tool-write-up");
    expect(meta.title).toEqual({ absolute: "A tool, the write-up | Splice Log" });
    expect(meta.openGraph?.url).toBe("https://www.spliceops.ai/log/a-tool-write-up");
  });
});
