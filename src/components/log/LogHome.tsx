import type { ReactNode } from "react";
import { Strip } from "@/components/ds/parts";
import type { LogEntry } from "@/lib/log/entries";
import { pinnedEntry } from "@/lib/log/views";
import { FollowStrip } from "./FollowStrip";
import { HowWeLog } from "./HowWeLog";
import { toCardEntry } from "@/lib/log/card-entry";
import { LogCard } from "./LogCard";
import { LogFeature } from "./LogFeature";
import { LogFeed } from "./LogFeed";
import { NextStepCard } from "./NextStepCard";
import { StagePicker } from "./StagePicker";
import { TypeFilter } from "./TypeFilter";

const TOTAL = "04";

const Section = ({ n, label, title, children }: { n: string; label: string; title: string; children: ReactNode }) => (
  <section className="sec wrap" aria-labelledby={`log-${n}`}>
    <Strip n={n} total={TOTAL} label={label} />
    <h2 className="h2" id={`log-${n}`} style={{ marginBottom: 32 }}>
      {title}
    </h2>
    {children}
  </section>
);

export const LogHome = ({ entries }: { entries: readonly LogEntry[] }) => {
  const pinned = pinnedEntry(entries);
  const feed = entries.filter((entry) => entry !== pinned);
  const tools = entries.filter((entry) => entry.type === "tool");
  return (
    <>
      <section className="wrap pagehead">
        <p className="kicker kd" style={{ margin: "0 0 20px" }}>
          Splice Log
        </p>
        <h1 className="display">
          What we <span className="serif-i">tested, built and think</span> about AI at work
        </h1>
        <p className="lg-lead">
          A dated record you can check. Every entry has a code, a date, its sources, and a note on who we are tied to.
        </p>
      </section>
      <Section n="01" label="Start where you are" title="Start where you are">
        <StagePicker entries={entries} />
      </Section>
      <Section n="02" label="Latest" title="Latest">
        {pinned && (
          <div style={{ marginBottom: 32 }}>
            <LogFeature entry={pinned} />
          </div>
        )}
        <LogFeed entries={feed.map(toCardEntry)} filter={<TypeFilter entries={entries} active="all" />} />
      </Section>
      {tools.length > 0 && (
        <Section n="03" label="Tested tools" title="Tested tools">
          <div className="lg-grid">
            {tools.map((entry) => (
              <LogCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </Section>
      )}
      <Section n="04" label="How we log" title="How we log">
        <HowWeLog />
      </Section>
      <div className="wrap" style={{ paddingBlock: "0 var(--space-32)" }}>
        <FollowStrip />
      </div>
      <NextStepCard stage="all" />
    </>
  );
};
