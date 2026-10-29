"use client";

import { AI_ROI, type AiRoiInputs } from "@/lib/tools/ai-roi";
import { formatUsd } from "@/lib/tools/format";
import { AiRoiResults } from "./AiRoiResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

type Field = FieldSpec<keyof AiRoiInputs>;

const percent = (n: number) => `${n}%`;

const GROUPS: readonly (readonly [string, readonly Field[]])[] = [
  [
    "Your team",
    [
      { key: "team", label: "People using AI", hint: "Everyone in scope for the rollout", format: String },
      { key: "salary", label: "Cost per person", hint: "Fully loaded, per year", format: formatUsd },
      { key: "timeSaved", label: "Time AI saves", hint: "Net share of each person's week", format: percent },
    ],
  ],
  [
    "What it costs",
    [
      { key: "toolsPerPerson", label: "AI tools per person", hint: "Licences and usage, per year", format: formatUsd },
      {
        key: "trainingPerPerson",
        label: "Training per person",
        hint: "Including time spent learning",
        format: formatUsd,
      },
      {
        key: "infrastructure",
        label: "Infrastructure",
        hint: "Platform, data and security, per year",
        format: formatUsd,
      },
      { key: "dipPercent", label: "Productivity dip", hint: "While people learn new ways of working", format: percent },
      { key: "dipMonths", label: "Months the dip lasts", hint: "Before the gains show", format: (n) => `${n} mo` },
    ],
  ],
];

export function AiRoiCalculator() {
  const { inputs, set } = useUrlInputs(AI_ROI);

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="AI ROI inputs" onSubmit={(e) => e.preventDefault()}>
        {GROUPS.map(([legend, fields]) => (
          <fieldset key={legend} className={styles.group}>
            <legend className={styles.legend}>{legend}</legend>
            {fields.map((field) => (
              <ToolField
                key={field.key}
                field={field}
                range={AI_ROI.ranges[field.key]}
                value={inputs[field.key]}
                onChange={(v) => set(field.key, v)}
              />
            ))}
          </fieldset>
        ))}
      </form>
      <AiRoiResults inputs={inputs} />
    </div>
  );
}
