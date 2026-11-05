import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import { stringify } from "yaml";
import { getLog, getLogPages } from "./get-log";
import { loadEntries } from "./entries";
import { previewEntries, showDrafts } from "./preview";

const entrySource = (over: Record<string, unknown> = {}) =>
  `---\n${stringify({
    type: "guide",
    title: "A guide",
    description: "One sentence.",
    published: "2026-11-01",
    status: "published",
    stage: "absent",
    code: "LG-00001",
    sources: [{ title: "A source", url: "https://example.com/a" }],
    ...over,
  })}---\n\nBody.\n`;

const draftSource = (over: Record<string, unknown> = {}) =>
  `---\n${stringify({ type: "analysis", title: "Half written", status: "draft", ...over })}---\n\nNotes.\n`;

const folder = (files: Record<string, string>) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "log-preview-"));
  Object.entries(files).forEach(([name, text]) => fs.writeFileSync(path.join(dir, name), text));
  return dir;
};

describe("showDrafts", () => {
  it("is on only in development with LOG_SHOW_DRAFTS set to 1", () => {
    expect(showDrafts({ NODE_ENV: "development", LOG_SHOW_DRAFTS: "1" })).toBe(true);
  });

  it.each([
    ["production", { NODE_ENV: "production", LOG_SHOW_DRAFTS: "1" }],
    ["test", { NODE_ENV: "test", LOG_SHOW_DRAFTS: "1" }],
    ["an unset NODE_ENV", { LOG_SHOW_DRAFTS: "1" }],
    ["development without the flag", { NODE_ENV: "development" }],
    ["development with the flag off", { NODE_ENV: "development", LOG_SHOW_DRAFTS: "0" }],
    ["development with a loose value", { NODE_ENV: "development", LOG_SHOW_DRAFTS: "true" }],
  ])("is off in %s", (_name, env) => {
    expect(showDrafts(env)).toBe(false);
  });
});

describe("previewEntries", () => {
  const dir = folder({
    "live.md": entrySource(),
    "future.md": entrySource({ code: "LG-00002", published: "2027-01-01" }),
    "bare.md": draftSource(),
    "dated.md": draftSource({ published: "2026-10-01", description: "Has one.", stage: "enabled" }),
  });
  const preview = previewEntries(loadEntries(dir), "2026-11-04");
  const bySlug = (slug: string) => preview.find((entry) => entry.slug === slug);

  it("shows every entry, live or not", () => {
    expect(preview.map((entry) => entry.slug).toSorted()).toEqual(["bare", "dated", "future", "live"]);
  });

  it("marks a draft in its title so it cannot be mistaken for a published entry", () => {
    expect(bySlug("bare")?.title).toBe("[Draft] Half written");
    expect(bySlug("live")?.title).toBe("A guide");
  });

  it("fills in what a draft lacks, and keeps what it has", () => {
    expect(bySlug("bare")).toMatchObject({ published: "2026-11-04", stage: "absent" });
    expect(bySlug("bare")?.description).toBeTruthy();
    expect(bySlug("dated")).toMatchObject({ published: "2026-10-01", stage: "enabled", description: "Has one." });
  });
});

describe("the log pages in development and in production", () => {
  afterEach(() => vi.unstubAllEnvs());

  const withContent = (files: Record<string, string>, env: Record<string, string>) => {
    vi.stubEnv("LOG_CONTENT_DIR", folder(files));
    Object.entries(env).forEach(([key, value]) => vi.stubEnv(key, value));
  };
  const files = { "live.md": entrySource(), "half.md": draftSource() };

  it("lists drafts when previewing in development", () => {
    withContent(files, { NODE_ENV: "development", LOG_SHOW_DRAFTS: "1" });
    expect(
      getLog()
        .map((entry) => entry.slug)
        .toSorted(),
    ).toEqual(["half", "live"]);
    expect(
      getLogPages()
        .map((entry) => entry.slug)
        .toSorted(),
    ).toEqual(["half", "live"]);
  });

  it("never lists drafts in production, even with the flag set", () => {
    withContent(files, { NODE_ENV: "production", LOG_SHOW_DRAFTS: "1" });
    expect(getLog().map((entry) => entry.slug)).toEqual(["live"]);
    expect(getLogPages().map((entry) => entry.slug)).toEqual(["live"]);
  });

  it("never lists drafts without the flag", () => {
    withContent(files, { NODE_ENV: "development" });
    expect(getLog().map((entry) => entry.slug)).toEqual(["live"]);
  });
});
