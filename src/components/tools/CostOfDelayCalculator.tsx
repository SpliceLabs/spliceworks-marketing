"use client";

import { COST_OF_DELAY, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import { formatCount, formatUsd } from "@/lib/tools/format";
import { CostOfDelayResults } from "./CostOfDelayResults";
import { ToolField, type FieldSpec } from "./ToolField";
import { useUrlInputs } from "./use-url-inputs";
import styles from "./Calculator.module.css";

const PER_WORKFLOW_A_MONTH = "per workflow a month";

const FIELDS: readonly FieldSpec<keyof CostOfDelayInputs>[] = [
  {
    key: "opportunities",
    label: "AI opportunities",
    hint: "Workflows AI could take on. Count each one once.",
    format: (n) => formatCount(n, "workflow"),
    unit: { after: "workflows" },
  },
  {
    key: "monthlyValue",
    label: "Value of each workflow",
    hint: "Your average, after what AI costs to run. Count hours saved at what those hours cost.",
    format: (n) => `${formatUsd(n)} ${PER_WORKFLOW_A_MONTH}`,
    unit: { dollars: true, after: PER_WORKFLOW_A_MONTH },
  },
  {
    key: "lagMonths",
    label: "Months you wait",
    hint: "Extra months before AI adds value, compared with starting now.",
    format: (n) => formatCount(n, "month"),
    unit: { after: "months" },
  },
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
