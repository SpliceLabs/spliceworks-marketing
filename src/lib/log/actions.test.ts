import { describe, expect, it } from "vitest";
import { entryActions } from "./actions";
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
