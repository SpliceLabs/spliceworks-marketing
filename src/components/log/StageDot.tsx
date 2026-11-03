import type { Stage } from "@/lib/log/schema";
import { STAGE_LABELS } from "@/lib/log/types";

const DOT_CLASS: Readonly<Record<Stage, string>> = { absent: "", enabled: " e", native: " n", all: " all" };

export const StageDot = ({ stage }: { stage: Stage }) => (
  <span>
    <i className={`lg-sd${DOT_CLASS[stage]}`} aria-hidden="true" />
    {STAGE_LABELS[stage]}
  </span>
);
