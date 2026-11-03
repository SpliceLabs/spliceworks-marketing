import { cache } from "react";
import { liveEntries, loadEntries, logDir, todayUtc, type LogEntry } from "./entries";

export const getLog = cache((): readonly LogEntry[] => liveEntries(loadEntries(logDir()), todayUtc()));

export const getEntry = (slug: string): LogEntry | undefined => getLog().find((entry) => entry.slug === slug);
