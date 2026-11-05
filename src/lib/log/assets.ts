import type { AnyEntry } from "./entries";

export const draftAssetDirs = (dirs: readonly string[], entries: readonly AnyEntry[]): readonly string[] => {
  const drafts = new Set(entries.filter((entry) => entry.status === "draft").map((entry) => entry.slug));
  return dirs.filter((dir) => drafts.has(dir));
};
