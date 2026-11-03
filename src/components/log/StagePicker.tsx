import Link from "next/link";
import type { LogEntry } from "@/lib/log/entries";
import type { Stage } from "@/lib/log/schema";
import { TYPE_LABELS } from "@/lib/log/types";
import { stagePicks } from "@/lib/log/views";

type PickerStage = Exclude<Stage, "all">;

const STAGES: readonly {
  readonly stage: PickerStage;
  readonly name: string;
  readonly accent: string;
  readonly ask: string;
}[] = [
  { stage: "absent", name: "AI-absent", accent: "absent", ask: "what is this, what does waiting cost" },
  { stage: "enabled", name: "AI-enabled", accent: "enabled", ask: "how do we make it stick and govern it" },
  { stage: "native", name: "AI-native", accent: "native", ask: "what is proven, what is worth adopting" },
];

const PICKS_PER_STAGE = 3;

export const StagePicker = ({ entries }: { entries: readonly LogEntry[] }) => (
  <div className="lg-stages">
    {STAGES.map(({ stage, name, accent, ask }, index) => (
      <div key={stage} className="lg-sw">
        <div className="lgrail" aria-hidden="true">
          <i />
        </div>
        <section className="lg-stage" aria-label={name}>
          <span className="n">{String(index + 1).padStart(2, "0")} · Stage</span>
          <h3>
            AI-<em>{accent}</em>
          </h3>
          <p className="ask">They ask: {ask}</p>
          <ol>
            {stagePicks(entries, stage, PICKS_PER_STAGE).map((entry) => (
              <li key={entry.slug}>
                <Link href={`/log/${entry.slug}`}>
                  <span className="kicker">{TYPE_LABELS[entry.type]}</span>
                  <span>{entry.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <Link href={`/log/stage/${stage}`} className="read" style={{ marginTop: 16 }}>
            All {name} entries <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>
    ))}
  </div>
);
