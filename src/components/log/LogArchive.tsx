import type { ReactNode } from "react";
import type { LogEntry } from "@/lib/log/entries";
import { toCardEntry } from "@/lib/log/card-entry";
import { LogFeed } from "./LogFeed";

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
      <h1 className="display">
        {title} <span className="serif-i">in the log</span>
      </h1>
      <p className="lg-lead">{lead}</p>
    </section>
    <section className="wrap sec" style={{ paddingTop: 0 }}>
      {entries.length === 0 ? (
        <>
          {filter}
          <p>Nothing here yet. New entries land in the log first.</p>
        </>
      ) : (
        <LogFeed entries={entries.map(toCardEntry)} filter={filter} />
      )}
    </section>
  </>
);
