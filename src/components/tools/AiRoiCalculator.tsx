"use client";

import { AI_ROI, type AiRoiInputs } from "@/lib/tools/ai-roi";
import { formatUsd } from "@/lib/tools/format";
import { AiRoiResults } from "./AiRoiResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

type Field = FieldSpec<keyof AiRoiInputs>;

const percent = (n: number) => `${n}%`;

const PER_PERSON_A_YEAR = { dollars: true, after: "per person a year" } as const;

const GROUPS: readonly (readonly [string, readonly Field[]])[] = [
  [
    "Your team",
    [
      {
        key: "team",
        label: "People using AI",
        hint: "Everyone who will use AI. The starting values assume a software team.",
        format: (n) => `${n} ${n === 1 ? "person" : "people"}`,
        unit: { after: "people" },
      },
      {
        key: "salary",
        label: "Cost per person",
        hint: "Pay plus taxes, benefits and overhead, not salary alone.",
        format: formatUsd,
        unit: PER_PERSON_A_YEAR,
      },
      {
        key: "timeSaved",
        label: "Time AI saves each person",
        hint: "After checking AI's work. One hour of an 8-hour day is 12.5%.",
        format: (n) => `${n}% of work time`,
        unit: { after: "% of work time" },
      },
    ],
  ],
  [
    "What it costs",
    [
      {
        key: "toolsPerPerson",
        label: "AI tools",
        hint: "Seats and usage fees.",
        format: formatUsd,
        unit: PER_PERSON_A_YEAR,
      },
      {
        key: "trainingPerPerson",
        label: "Training",
        hint: "Courses and coaching. Learning time goes in the dip below.",
        format: formatUsd,
        unit: { dollars: true, after: "per person, once" },
      },
      {
        key: "infrastructure",
        label: "Platform and security",
        hint: "Data, hosting and security. Enter the total, not per person.",
        format: formatUsd,
        unit: { dollars: true, after: "a year, whole team" },
      },
      {
        key: "dipPercent",
        label: "Output lost while learning",
        hint: "How much slower people work at first, while they learn new ways of working.",
        format: (n) => `${percent(n)} of output`,
        unit: { after: "% of output" },
      },
      {
        key: "dipMonths",
        label: "How long it lasts",
        hint: "AI saves no time until this ends.",
        format: (n) => `${n} ${n === 1 ? "month" : "months"}`,
        unit: { after: "months" },
      },
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
