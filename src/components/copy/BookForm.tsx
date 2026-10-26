"use client";

import type { FormEvent } from "react";
import type { Block, Inline, ListItem } from "@/lib/copy/markdown";
import { inlineText, slugify } from "@/lib/copy/markdown";
import { InlineLines, InlineNodes } from "./Inline";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "./Copy.module.css";

type Kind = "radio" | "checkbox" | "text" | "textarea" | "email" | "url";

interface Field {
  name: string;
  label: Inline[];
  /** What the copy says after the label: "*", "Pick any.", "(optional)" … */
  hint: string;
  required: boolean;
  kind: Kind;
  options: Inline[][];
}

/**
 * Turns one numbered question from book.md ("Tell us where you are") into
 * form fields. Each **bold** run is a field label; the text after it is its
 * hint; nested bullets (or "a / b / c") are its options.
 */
function fieldsFromItem(item: ListItem): Field[] {
  const segs: { label: Inline[]; hint: string }[] = [];
  for (const n of item.c) {
    if (n.t === "strong") segs.push({ label: n.c, hint: "" });
    else if (segs.length) segs[segs.length - 1].hint += n.t === "text" ? n.v : inlineText([n]);
  }
  const nested = item.children.find((b) => b.t === "list") as Extract<Block, { t: "list" }> | undefined;
  return segs.map(({ label, hint }) => {
    const labelText = inlineText(label);
    const h = hint.trim().replace(/,$/, "").trim();
    let options: Inline[][] = nested ? nested.items.map((it) => it.c) : [];
    let shownHint = h;
    if (!options.length && h.includes(" / ")) {
      options = h.split(" / ").map((o) => [{ t: "text", v: o.trim() }]);
      shownHint = "";
    }
    let kind: Kind;
    if (options.length) kind = /Pick any/i.test(h) ? "checkbox" : "radio";
    else if (/email/i.test(labelText)) kind = "email";
    else if (/website/i.test(labelText)) kind = "url";
    else if (/one line/i.test(h) || segs.length > 1) kind = "text";
    else kind = "textarea";
    return { name: slugify(labelText), label, hint: shownHint, required: h.includes("*"), kind, options };
  });
}

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
  // No form backend yet: submitting opens the visitor's email app with their
  // answers filled in, addressed to CONTACT_EMAIL.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines: string[] = [];
    for (const key of new Set(data.keys())) {
      const vals = data.getAll(key).map(String).map((v) => v.trim()).filter(Boolean);
      if (vals.length) lines.push(`${key.replace(/-/g, " ")}: ${vals.join(", ")}`);
    }
    const company = String(data.get("company") ?? "").trim();
    const subject = `Working session request${company ? ` · ${company}` : ""}`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
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

      <div className={styles.submitRow}>
        <button type="submit" className="btn btn-primary">
          {submit.label} <span aria-hidden="true">→</span>
        </button>
        {submit.sub.length > 0 && (
          <p className={styles.ctaSub}>
            <InlineLines lines={submit.sub} />
          </p>
        )}
        <p className={styles.ctaSub}>Opens your email app, addressed to {CONTACT_EMAIL}.</p>
      </div>
    </form>
  );
}
