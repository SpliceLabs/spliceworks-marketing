import type { LogEntry } from "@/lib/log/entries";
import { formatLogDate } from "@/lib/log/format-date";
import type { LogSection } from "@/lib/log/sections";
import { STAGE_LABELS, TYPE_LABELS } from "@/lib/log/types";

const subline = (entry: LogEntry): readonly string[] => [
  `Kind / ${TYPE_LABELS[entry.type]}`,
  `Stage / ${STAGE_LABELS[entry.stage]}`,
  ...(entry.tool_status ? [`Status / ${entry.tool_status}`] : []),
  ...(entry.checked ? [`Checked / ${formatLogDate(entry.checked)}`] : []),
];

export const SpecSheet = ({ entry }: { entry: LogEntry; sections: readonly LogSection[] }) => (
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
  </div>
);
