import type { LogEntry } from "@/lib/log/entries";
import { formatLogDate } from "@/lib/log/format-date";
import type { LogSection } from "@/lib/log/sections";
import { KeyTakeaways, LogBlocks } from "./LogBlocks";
import { STAGE_LABELS, TYPE_LABELS } from "@/lib/log/types";

const subline = (entry: LogEntry): readonly string[] => [
  `Kind / ${TYPE_LABELS[entry.type]}`,
  `Stage / ${STAGE_LABELS[entry.stage]}`,
  ...(entry.tool_status ? [`Status / ${entry.tool_status}`] : []),
  ...(entry.checked ? [`Checked / ${formatLogDate(entry.checked)}`] : []),
];

const number = (index: number): string => String(index + 1).padStart(2, "0");

export const SpecSheet = ({ entry, sections }: { entry: LogEntry; sections: readonly LogSection[] }) => (
  <div id="spec" className="lf2-entry lf2-spec">
    <div className="spec-bar">
      <span>Spec sheet · {entry.title}</span>
      <span>{entry.code}</span>
    </div>
    <div className="spec-sub">
      {subline(entry).map((part) => (
        <span key={part}>{part}</span>
      ))}
    </div>
    <div className="lf2-spec-title">
      <p className="lf2-spec-name">
        {entry.title} <span className="serif-i">technical specification</span>
      </p>
    </div>
    <nav className="lf2-toc" aria-label="Contents">
      <span>Contents</span>
      {sections.map((section, index) => (
        <a key={section.slug} href={`#${section.slug}`}>
          <span>{number(index)}</span>
          {section.heading}
        </a>
      ))}
    </nav>
    {sections.map((section, index) => (
      <section key={section.slug} id={section.slug} className="lf2-sec">
        <div className="lf2-sec-h">
          <span className="lf2-sec-n">{number(index)}</span>
          <h2>{section.heading}</h2>
        </div>
        <div className="lf2-sec-b">
          {section.heading === "In short" ? (
            <KeyTakeaways blocks={section.blocks} />
          ) : (
            <LogBlocks blocks={section.blocks} />
          )}
        </div>
      </section>
    ))}
  </div>
);
