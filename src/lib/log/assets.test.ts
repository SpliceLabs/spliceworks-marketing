import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { draftAssetDirs } from "./assets";
import { isPublished, loadEntries, logDir, parseEntry } from "./entries";

const draft = parseEntry("quiet", "---\ntype: perspective\ntitle: Quiet\nstatus: draft\n---\n\nBody.");
const scheduled = { ...loadEntries(logDir()).filter(isPublished)[0], slug: "later", published: "2999-01-01" };

describe("draftAssetDirs", () => {
  it("flags a folder that belongs to a draft", () => {
    expect(draftAssetDirs(["quiet"], [draft])).toEqual(["quiet"]);
  });

  it("leaves a signed-off entry's folder alone, even before its date", () => {
    expect(draftAssetDirs(["later"], [scheduled])).toEqual([]);
  });

  it("ignores folders that match no entry", () => {
    expect(draftAssetDirs(["other"], [draft])).toEqual([]);
  });
});

describe("public/log", () => {
  it("holds no folder for a draft, because everything in public/ is served", () => {
    const dirs = readdirSync(path.join(process.cwd(), "public", "log"), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
    expect(draftAssetDirs(dirs, loadEntries(logDir()))).toEqual([]);
  });
});
