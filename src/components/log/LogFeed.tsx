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
  const [query, setQuery] = useState("");
  const shown = browse(entries, { query, sort: "newest" });
  return (
    <>
      {filter}
      <div className="lf2-tright">
        <input
          type="search"
          className="lf2-field lf2-search"
          aria-label="Search entries"
          placeholder="Search entries"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className="lf2-status" aria-live="polite">
        <span>{countLabel(shown.length)}</span>
        <span>{sortStatus("newest")}</span>
      </p>
      {shown.length === 0 && <p className="lf2-empty">Nothing matches that search.</p>}
      <div className="lg-grid">
        {shown.map((entry) => (
          <LogCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </>
  );
};
