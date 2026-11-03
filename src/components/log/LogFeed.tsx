"use client";

import { useState, type ReactNode } from "react";
import type { CardEntry } from "@/lib/log/card-entry";
import { browse, countLabel, SORT_KEYS, SORT_LABELS, sortStatus, type SortKey } from "@/lib/log/browse";
import { LogCard } from "./LogCard";

export const LogFeed = ({
  entries,
  filter,
}: {
  readonly entries: readonly CardEntry[];
  readonly filter: ReactNode;
}) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");
  const shown = browse(entries, { query, sort });
  return (
    <>
      <div className="lg-tools">
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
          <label className="lf2-sort">
            Sort
            <select
              className="lf2-field"
              value={sort}
              onChange={(event) => setSort(SORT_KEYS.find((key) => key === event.target.value) ?? "newest")}
            >
              {SORT_KEYS.map((key) => (
                <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <p className="lf2-status" aria-live="polite">
        <span>{countLabel(shown.length)}</span>
        <span>{sortStatus(sort)}</span>
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
