"use client";

import { useState, type ReactNode } from "react";
import type { CardEntry } from "@/lib/log/card-entry";
import { browse, countLabel, sortStatus } from "@/lib/log/browse";
import { LogCard } from "./LogCard";

export const LogFeed = ({
  entries,
  filter,
}: {
  readonly entries: readonly CardEntry[];
  readonly filter: ReactNode;
}) => {
  const shown = browse(entries, { query: "", sort: "newest" });
  return (
    <>
      {filter}
      <p className="lf2-status" aria-live="polite">
        <span>{countLabel(shown.length)}</span>
        <span>{sortStatus("newest")}</span>
      </p>
      <div className="lg-grid">
        {shown.map((entry) => (
          <LogCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </>
  );
};
