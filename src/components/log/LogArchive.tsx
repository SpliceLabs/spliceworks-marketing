import type { ReactNode } from "react";
import type { LogEntry } from "@/lib/log/entries";
import { LogCard } from "./LogCard";

export const LogArchive = ({
  title,
  lead,
  entries,
  filter,
}: {
  readonly title: string;
  readonly lead: string;
  readonly entries: readonly LogEntry[];
  readonly filter: ReactNode;
}) => (
  <>
    <section className="wrap pagehead">
      <p className="kicker kd" style={{ margin: "0 0 20px" }}>
        Splice Log
      </p>
      <h1 className="display">{title}</h1>
      <p className="lg-lead">{lead}</p>
    </section>
    <section className="wrap sec" style={{ paddingTop: 0 }}>
      {filter}
      {entries.length === 0 ? (
        <p>Nothing here yet. New entries land in the log first.</p>
      ) : (
        <div className="lg-grid">
          {entries.map((entry) => (
            <LogCard key={entry.slug} entry={entry} />
          ))}
        </div>
      )}
    </section>
  </>
);
