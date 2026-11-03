import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { LogArchive } from "./LogArchive";

const props = { title: "Tools", lead: "Tools in the log.", filter: null };

describe("LogArchive", () => {
  it("gives the archive search, sort and the entry count", () => {
    const out = renderToStaticMarkup(
      <LogArchive {...props} entries={[makeEntry({ slug: "a" }), makeEntry({ slug: "b", code: "LG-00002" })]} />,
    );
    expect(out).toContain('type="search"');
    expect(out).toContain("Showing 2 entries");
  });

  it("says so when there is nothing yet, without the controls", () => {
    const out = renderToStaticMarkup(<LogArchive {...props} entries={[]} />);
    expect(out).toContain("Nothing here yet.");
    expect(out).not.toContain('type="search"');
  });
});
