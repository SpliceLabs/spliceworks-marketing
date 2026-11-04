import { describe, expect, it } from "vitest";
import { getPage } from "./pages";

const sectionBody = (title: string): string => {
  const { sections } = getPage("/privacy");
  const section = sections.find((s) => s.titleText === title);
  return section ? section.blocks.map((b) => b.raw).join("\n") : "";
};

describe("Privacy Policy", () => {
  it("is a plain policy with the usual sections in order", () => {
    const page = getPage("/privacy");
    expect(page.h1Text).toBe("Privacy Policy");
    expect(page.sections.map((s) => s.titleText)).toEqual([
      "Who we are",
      "Information we collect",
      "How we use information",
      "Cookies and visitor identification",
      "Who we share it with",
      "How long we keep it",
      "Security",
      "International transfers",
      "Your privacy rights",
      "Children",
      "Third-party links",
      "Changes to this policy",
      "Contact us",
    ]);
  });

  it("states the effective date, company and location for the header", () => {
    const { fm } = getPage("/privacy");
    expect(fm.effective).toBe("3 November 2026");
    expect(fm.company).toBe("Splice Labs Group, Inc.");
    expect(fm.location).toBe("Florida, United States");
  });

  it("names the brand, the legal entity and its postal address as responsible for the data", () => {
    expect(sectionBody("Who we are")).toContain(
      "SpliceOps is a brand owned and operated by Splice Labs Group, Inc., a Delaware corporation headquartered at 19120 Sweet Clover Ln, Tampa, FL 33647, which is responsible for your data on this site.",
    );
  });

  it("collects booking answers, device data, cookies and calculator inputs and asks for nothing sensitive", () => {
    const body = sectionBody("Information we collect");
    expect(body).toContain("working session on [/book](/book)");
    expect(body).toContain("IP address");
    expect(body).toContain("page URL");
    expect(body).toContain("do not submit sensitive personal information");
  });

  it("mentions Gojiberry only as one provider bullet, never as a section of its own", () => {
    const { body, sections } = getPage("/privacy");
    expect(sections.some((s) => s.titleText.includes("Gojiberry"))).toBe(false);
    expect(body.match(/Gojiberry/g)).toHaveLength(1);
    expect(sectionBody("Who we share it with")).toContain("Gojiberry");
  });

  it("names the other providers in brackets next to what they do", () => {
    const body = sectionBody("Who we share it with");
    expect(body).toContain("(Vercel)");
    expect(body).toContain("Resend");
    expect(body).toContain("Google Workspace");
  });

  it("runs visitor identification only after Accept, honours Global Privacy Control and says how to change the choice", () => {
    const body = sectionBody("Cookies and visitor identification");
    expect(body).toContain("which companies visit");
    expect(body).toContain("only after you choose Accept");
    expect(body).toContain("Global Privacy Control signal, we treat it as Decline");
    expect(body).toContain("Cookie settings");
  });

  it("says we do not sell personal information, under sharing rather than cookies", () => {
    const line = "We do not sell personal information or share it for cross-context behavioral advertising.";
    expect(sectionBody("Who we share it with")).toContain(line);
    expect(sectionBody("Cookies and visitor identification")).not.toContain(line);
  });

  it("keeps retention, rights and age language to what we can stand behind", () => {
    expect(sectionBody("How long we keep it")).toContain("up to 24 months after our last substantive contact");
    expect(sectionBody("How long we keep it")).toContain("suppression record");
    expect(sectionBody("Your privacy rights")).toContain("We reply within the time the law requires");
    expect(sectionBody("Children")).toContain("not meant for anyone under 18");
  });

  it("says outside links are not covered", () => {
    expect(sectionBody("Third-party links")).toContain("links to other sites we don’t control");
  });

  it("keeps the provisional status and the open counsel items", () => {
    const { fm } = getPage("/privacy");
    expect(fm.status).toBe("provisional");
    expect(fm.open).toContain("Booking data retention period");
  });
});
