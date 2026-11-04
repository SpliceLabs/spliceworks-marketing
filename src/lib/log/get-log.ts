import { cache } from "react";
import {
  liveEntries,
  livePages,
  loadEntries,
  logDir,
  todayUtc,
  topLevelEntries,
  writeUpOf,
  type LogEntry,
} from "./entries";

const getAllLive = cache((): readonly LogEntry[] => liveEntries(loadEntries(logDir()), todayUtc()));

export const getLog = cache((): readonly LogEntry[] => topLevelEntries(getAllLive()));

export const getEntry = (slug: string): LogEntry | undefined => getLog().find((entry) => entry.slug === slug);

export const getWriteUp = (slug: string): LogEntry | undefined => writeUpOf(slug, getAllLive());

export const getLogPages = cache((): readonly LogEntry[] => livePages(loadEntries(logDir()), todayUtc()));

export const getPage = (slug: string): LogEntry | undefined => getLogPages().find((entry) => entry.slug === slug);
