"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import type { Block } from "@/lib/copy/markdown";
import { inlineText } from "@/lib/copy/markdown";
import { fieldsFromItem, HONEYPOT, type BookState } from "@/lib/copy/bookForm";
import { submitBooking } from "@/app/(marketing)/book/actions";
import { InlineLines, InlineNodes } from "./Inline";
import styles from "./Copy.module.css";

function Hint({ text }: { text: string }) {
  if (!text) return null;
  return <span className={styles.hint}> {text}</span>;
}

export function BookForm({
  questions,
  submit,
}: {
  questions: Extract<Block, { t: "list" }>;
  submit: Extract<Block, { t: "cta" }>;
}) {
  // Submissions are emailed to BOOK_TO by the server action.
  const [state, action, pending] = useActionState<BookState, FormData>(submitBooking, { status: "idle" });

  // Called from onSubmit rather than <form action> so a failed send doesn't
  // reset the form and lose the visitor's answers.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  }

  if (state.status === "sent") {
    return (
      <div className={styles.formDone} role="status">
        <p className={styles.formDoneTitle}>Thanks. We have your answers.</p>
        <p>We usually reply within 24 hours, from a real person, to the work email you gave us.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {questions.items.map((item, qi) => {
        const fields = fieldsFromItem(item);
        const num = <span className={styles.qNum}>{String(qi + 1).padStart(2, "0")}</span>;

        if (fields.length === 1 && fields[0].options.length) {
          const f = fields[0];
          return (
            <fieldset key={qi} className={styles.fieldset}>
              <legend className={styles.legend}>
                {num}
                <InlineNodes nodes={f.label} />
                <Hint text={f.hint} />
              </legend>
              <div className={styles.options}>
                {f.options.map((opt, oi) => (
                  <label key={oi} className={styles.option}>
                    <input
                      type={f.kind === "checkbox" ? "checkbox" : "radio"}
                      name={f.name}
                      value={inlineText(opt)}
                      required={f.kind === "radio" && f.required}
                    />
                    <span>
                      <InlineNodes nodes={opt} />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          );
        }

        return (
          <fieldset key={qi} className={styles.fieldset}>
            {fields.length > 1 && <legend className={styles.legend}>{num}</legend>}
            <div className={styles.inputs}>
              {fields.map((f) => (
                <label key={f.name} className={styles.inputLabel}>
                  <span>
                    {fields.length === 1 && num}
                    <InlineNodes nodes={f.label} />
                    <Hint text={f.hint} />
                  </span>
                  {f.kind === "textarea" ? (
                    <textarea name={f.name} required={f.required} className={`field ${styles.textarea}`} />
                  ) : (
                    <input
                      name={f.name}
                      type={f.kind}
                      required={f.required}
                      className={`field ${styles.input}`}
                      autoComplete={f.kind === "email" ? "email" : f.kind === "url" ? "url" : undefined}
                    />
                  )}
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}

      <input
        type="text"
        name={HONEYPOT}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={styles.honeypot}
      />

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Sending…" : submit.label} <span aria-hidden="true">→</span>
        </button>
        {state.status === "error" && (
          <p className={styles.formError} role="alert">
            {state.message}
          </p>
        )}
        {submit.sub.length > 0 && (
          <p className={styles.ctaSub}>
            <InlineLines lines={submit.sub} />
          </p>
        )}
      </div>
    </form>
  );
}
