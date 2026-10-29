import { useState, type KeyboardEvent } from "react";
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
  // What's being typed; null shows the committed value.
  const [draft, setDraft] = useState<string | null>(null);
  const commit = () => {
    if (draft !== null) onChange(Number(draft));
    setDraft(null);
  };
  const commitOnEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") commit();
  };

  return (
    <div className={styles.field}>
      <div className={styles.fieldHead}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          type="number"
          className={styles.number}
          aria-label={`${label}, exact value`}
          {...range}
          value={draft ?? value}
          onChange={(e) => setDraft(e.currentTarget.value)}
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
