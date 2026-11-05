import { cache } from "react";
import {
  allPages,
  liveEntries,
  loadEntries,
  logDir,
  todayUtc,
  topLevelEntries,
  writeUpOf,
  type LogEntry,
} from "./entries";
import { previewEntries, showDrafts } from "./preview";

const visible = (): readonly LogEntry[] => {
  const entries = loadEntries(logDir());
  return showDrafts(process.env) ? previewEntries(entries, todayUtc()) : liveEntries(entries, todayUtc());
};

const getAllLive = cache(visible);

export const getLog = cache((): readonly LogEntry[] => topLevelEntries(getAllLive()));

export const getEntry = (slug: string): LogEntry | undefined => getLog().find((entry) => entry.slug === slug);

export const getWriteUp = (slug: string): LogEntry | undefined => writeUpOf(slug, getAllLive());

export const getLogPages = cache((): readonly LogEntry[] => allPages(visible()));

export const getPage = (slug: string): LogEntry | undefined => getLogPages().find((entry) => entry.slug === slug);
