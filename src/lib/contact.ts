export const CONTACT_EMAIL = "info@spliceworks.ai";

export function bookingMailto(entries: [string, string][]): string {
  const answers = entries
    .filter(([, value]) => value.trim() !== "")
    .reduce<Map<string, string[]>>(
      (acc, [name, value]) => new Map([...acc, [name, [...(acc.get(name) ?? []), value.trim()]]]),
      new Map(),
    );
  const body = [...answers].map(([name, values]) => `${name.replace(/-/g, " ")}: ${values.join(", ")}`).join("\n");
  const company = answers.get("company")?.[0];
  const subject = company ? `Working session request: ${company}` : "Working session request";
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
