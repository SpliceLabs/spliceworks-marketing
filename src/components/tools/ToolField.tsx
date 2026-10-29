import { useId, useState, type KeyboardEvent } from "react";
import type { Range } from "@/lib/tools/inputs";
import styles from "./Calculator.module.css";

export type FieldSpec<K extends string> = Readonly<{
  key: K;
  label: string;
  hint: string;
  format: (n: number) => string;
}>;

type Props = Readonly<{ field: FieldSpec<string>; range: Range; value: number; onChange: (value: number) => void }>;

/** A slider plus an exact-value box. Typed values apply on blur or Enter, so a half-typed number isn't clamped mid-entry. */
export function ToolField({ field: { label, hint, format }, range, value, onChange }: Props) {
  const id = useId();
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
