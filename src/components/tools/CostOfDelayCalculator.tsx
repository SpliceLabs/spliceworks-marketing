"use client";

import { COST_OF_DELAY, formatUsd, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { CostOfDelayResults } from "./CostOfDelayResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

const FIELDS: readonly FieldSpec<keyof CostOfDelayInputs>[] = [
  { key: "opportunities", label: "AI opportunities", hint: "Workflows AI could take on", format: String },
  {
    key: "monthlyValue",
    label: "Monthly value of each",
    hint: "Hours saved, revenue sooner, errors avoided",
    format: formatUsd,
  },
  { key: "lagMonths", label: "Months until you start", hint: "How long you expect to wait", format: (n) => `${n} mo` },
];

export function CostOfDelayCalculator() {
  const { inputs, set } = useUrlInputs(COST_OF_DELAY);

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="Cost of delay inputs" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((field) => (
          <ToolField
            key={field.key}
            field={field}
            range={COST_OF_DELAY.ranges[field.key]}
            value={inputs[field.key]}
            onChange={(v) => set(field.key, v)}
          />
        ))}
      </form>
      <CostOfDelayResults inputs={inputs} />
    </div>
  );
}
