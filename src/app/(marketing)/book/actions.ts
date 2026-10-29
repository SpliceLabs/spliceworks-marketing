"use server";

import { getPage } from "@/lib/copy/pages";
import { SITE_URL } from "@/lib/site";
import { fieldsFromItem, formBlocks, HONEYPOT, type BookState } from "@/lib/copy/bookForm";
import { inlineText } from "@/lib/copy/markdown";
import { bookingEmail, type Answer } from "@/lib/bookEmail";
import { BOOK_TO, CONTACT_EMAIL } from "@/lib/contact";

/** Must be on a domain verified in the same Resend team as RESEND_API_KEY. */
const FROM = process.env.BOOK_FROM ?? "Splice Works <forms@spliceworks.ai>";

export async function submitBooking(_prev: BookState, data: FormData): Promise<BookState> {
  if (String(data.get(HONEYPOT) ?? "")) return { status: "sent" };

  // Only fields the copy defines are read, in the order the page asks them.
  const section = getPage("/book").sections.find((s) => formBlocks(s));
  const fields = section ? formBlocks(section)!.questions.items.flatMap(fieldsFromItem) : [];
  const answers: Answer[] = [];
  for (const field of fields) {
    const allowed = field.options.map(inlineText);
    const values = data
      .getAll(field.name)
      .map((v) => String(v).trim().slice(0, 4000))
      .filter((v) => v && (!allowed.length || allowed.includes(v)));
    if (field.required && !values.length) {
      return { status: "error", message: `Please answer “${inlineText(field.label)}”.` };
    }
    answers.push({ field, values });
  }

  const email = answers.find((a) => a.field.kind === "email")?.values[0] ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid work email." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("submitBooking: RESEND_API_KEY is not set");
    return { status: "error", message: `We couldn't send that. Please email us at ${CONTACT_EMAIL}.` };
  }

  const { subject, text, html } = bookingEmail(answers, `${SITE_URL}/book`);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, to: [BOOK_TO], reply_to: email, subject, text, html }),
  });
  if (!res.ok) {
    console.error("submitBooking: Resend returned", res.status, await res.text());
    return { status: "error", message: `We couldn't send that. Please email us at ${CONTACT_EMAIL}.` };
  }
  return { status: "sent" };
}
