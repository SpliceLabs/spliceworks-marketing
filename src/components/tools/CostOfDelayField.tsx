import type { FocusEvent, KeyboardEvent } from "react";
import { COST_OF_DELAY_RANGES, type CostOfDelayInputs } from "@/lib/tools/cost-of-delay";
import styles from "./Calculator.module.css";

export type FieldSpec = Readonly<{
  key: keyof CostOfDelayInputs;
  label: string;
  hint: string;
  format: (n: number) => string;
}>;

type Props = Readonly<{ field: FieldSpec; value: number; onChange: (value: number) => void }>;

/** A slider plus an exact-value box. Typed values apply on blur or Enter, so a half-typed number isn't clamped mid-entry. */
export function CostOfDelayField({ field: { key, label, hint, format }, value, onChange }: Props) {
  const range = COST_OF_DELAY_RANGES[key];
  const id = `cod-${key}`;
  const commit = (e: FocusEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value));
  const commitOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onChange(Number(e.currentTarget.value));
  };

  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          key={value}
          type="number"
          className={styles.number}
          aria-label={`${label}, exact value`}
          {...range}
          defaultValue={value}
          onBlur={commit}
          onKeyDown={commitOnEnter}
        />
      </div>
      <input
        id={id}
        type="range"
        className={styles.range}
        {...range}
        value={value}
        aria-valuetext={format(value)}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
      />
      <p className={styles.hint}>{hint}</p>
    </div>
  );
}
