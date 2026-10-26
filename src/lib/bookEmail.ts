/**
 * The email we receive for each /book submission: who they are up top, then
 * their answers under the questions as the page asks them.
 */
import { inlineText } from "./copy/markdown";
import type { Field } from "./copy/bookForm";

export interface Answer {
  field: Field;
  values: string[];
}

/** Who they are: shown as the header rather than as questions. */
const CONTACT = new Set(["your-name", "your-role", "work-email", "company", "website"]);

/** Only asked of portfolio and program bookings. */
const PORTFOLIO_SIZE = "for-a-portfolio-or-program-roughly-how-many-companies";

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export function bookingEmail(answers: Answer[], pageUrl: string) {
  const get = (name: string) => answers.find((a) => a.field.name === name)?.values[0] ?? "";
  const name = get("your-name");
  const email = get("work-email");
  const company = get("company");
  const website = get("website");
  const role = get("your-role");
  const sessionFor = get("this-session-is-for");

  const questions = answers.filter(
    (a) =>
      !CONTACT.has(a.field.name) &&
      a.values.length &&
      (a.field.name !== PORTFOLIO_SIZE || /portfolio|program/i.test(sessionFor)),
  );

  const subject = `Working session request: ${company || name}${role ? ` (${role})` : ""}`;

  const text = [
    `New working session request from ${pageUrl}`,
    "",
    `Name:     ${name}`,
    `Role:     ${role}`,
    `Company:  ${company}${website ? ` (${website})` : ""}`,
    `Email:    ${email}`,
    "",
    ...questions.flatMap((a) => [
      inlineText(a.field.label),
      ...(a.values.length > 1 ? a.values.map((v) => `  - ${v}`) : [`  ${a.values[0]}`]),
      "",
    ]),
    `Reply to this email to reach ${name || "them"} directly.`,
  ].join("\n");

  const row = (k: string, v: string) =>
    `<tr><td style="padding:4px 16px 4px 0;color:#6b7280;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:4px 0;color:#111827">${v}</td></tr>`;
  const answerHtml = (a: Answer) =>
    a.values.length > 1
      ? `<ul style="margin:4px 0 0;padding-left:20px">${a.values.map((v) => `<li style="margin:2px 0">${escape(v)}</li>`).join("")}</ul>`
      : `<p style="margin:4px 0 0;white-space:pre-wrap">${escape(a.values[0])}</p>`;

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#111827">
<div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden">
<div style="padding:20px 24px;border-bottom:3px solid #2447E8">
<div style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#2447E8;font-weight:600">Working session request</div>
<div style="font-size:20px;font-weight:600;margin-top:4px">${escape(name)}${company ? ` · ${escape(company)}` : ""}</div>
</div>
<div style="padding:16px 24px;background:#fafbfc;border-bottom:1px solid #e5e7eb">
<table style="border-collapse:collapse;font-size:14px">
${row("Role", escape(role))}
${row("Company", escape(company) + (website ? ` · <a href="${escape(website)}" style="color:#2447E8">${escape(website)}</a>` : ""))}
${row("Email", `<a href="mailto:${escape(email)}" style="color:#2447E8">${escape(email)}</a>`)}
</table>
</div>
<div style="padding:8px 24px 16px">
${questions
  .map(
    (a) =>
      `<div style="padding:12px 0;border-bottom:1px solid #f0f1f3"><div style="font-size:13px;font-weight:600;color:#6b7280">${escape(inlineText(a.field.label))}</div>${answerHtml(a)}</div>`,
  )
  .join("\n")}
</div>
<div style="padding:14px 24px;background:#fafbfc;border-top:1px solid #e5e7eb;font-size:13px;color:#6b7280">Sent from the form at <a href="${escape(pageUrl)}" style="color:#6b7280">${escape(pageUrl)}</a>. Reply to reach ${escape(name || "them")} directly.</div>
</div></body></html>`;

  return { subject, text, html };
}
