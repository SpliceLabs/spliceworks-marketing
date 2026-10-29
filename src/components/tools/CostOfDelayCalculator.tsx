"use client";

import { formatUsd } from "@/lib/tools/cost-of-delay";
import { CostOfDelayField, type FieldSpec } from "./CostOfDelayField";
import { CostOfDelayResults } from "./CostOfDelayResults";
import { useCostOfDelayInputs } from "./use-cost-of-delay-inputs";
import styles from "./Calculator.module.css";

const FIELDS: readonly FieldSpec[] = [
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
  const { inputs, set } = useCostOfDelayInputs();

  return (
    <div className={styles.calculator}>
      <form className={styles.inputs} aria-label="Cost of delay inputs" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((field) => (
          <CostOfDelayField
            key={field.key}
            field={field}
            value={inputs[field.key]}
            onChange={(v) => set(field.key, v)}
          />
        ))}
      </form>
      <CostOfDelayResults inputs={inputs} />
    </div>
  );
}
