import { describe, expect, it } from "vitest";
import { entryActions, writeUpActions } from "./actions";
import { makeEntry } from "./test-support";

const tool = (body: string) => makeEntry({ type: "tool", checked: "2026-11-01", body });

describe("entryActions", () => {
  it("gives a tool with an install section an Install button and a Read the full spec button", () => {
    const actions = entryActions(tool("## Overview\n\nA.\n\n## Install and connect\n\nB."));
    expect(actions).toEqual([
      { label: "Install and connect", href: "#install-and-connect", style: "primary", down: true },
      { label: "Read the full spec", href: "#spec", style: "ghost", down: false },
    ]);
  });

  it("leaves out Install when a tool has no install section", () => {
    expect(entryActions(tool("## Overview\n\nA.")).map((action) => action.label)).toEqual(["Read the full spec"]);
  });

  it("gives a launch one button that opens its tool, and other types none", () => {
    const launch = makeEntry({
      type: "launch",
      disclosure: "Splice built this.",
      cta: { label: "Open the check-up", href: "/tools/check-up" },
    });
    expect(entryActions(launch)).toEqual([
      { label: "Open the check-up", href: "/tools/check-up", style: "primary", down: false },
    ]);
    expect(entryActions(makeEntry({ type: "launch", disclosure: "x" }))).toEqual([]);
    expect(entryActions(makeEntry({ type: "guide" }))).toEqual([]);
  });
});

describe("write-up buttons", () => {
  it("adds Read the full write-up to a parent that has one", () => {
    const entry = makeEntry({ type: "guide" });
    expect(entryActions(entry, "/log/a-guide-write-up")).toEqual([
      { label: "Read the full write-up", href: "/log/a-guide-write-up", style: "ghost", down: false },
    ]);
  });

  it("gives a write-up a way back to its entry, and a jump to its examples when it has them", () => {
    const writeUp = makeEntry({ slug: "a-guide-write-up", parent: "a-guide", body: "## Examples of the output\n\nA." });
    expect(writeUpActions(writeUp)).toEqual([
      { label: "Back to the entry", href: "/log/a-guide", style: "primary", down: false },
      { label: "See the examples", href: "#examples-of-the-output", style: "ghost", down: true },
    ]);
    expect(writeUpActions({ ...writeUp, body: "## Limits\n\nA." }).map((action) => action.label)).toEqual([
      "Back to the entry",
    ]);
  });
});
