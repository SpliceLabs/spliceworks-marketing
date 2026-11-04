import { describe, expect, it } from "vitest";
import { getPage } from "./pages";

const sectionBody = (title: string): string => {
  const { sections } = getPage("/terms");
  const section = sections.find((s) => s.titleText === title);
  return section ? section.blocks.map((b) => b.raw).join("\n") : "";
};

describe("Website Terms of Use", () => {
  it("are plain website terms with the usual sections in order", () => {
    const page = getPage("/terms");
    expect(page.h1Text).toBe("Website Terms of Use");
    expect(page.sections.map((s) => s.titleText)).toEqual([
      "About SpliceOps",
      "Website only",
      "Eligibility",
      "Permitted use",
      "Intellectual property",
      "Submissions and feedback",
      "Tools, results and estimates",
      "Third-party services and links",
      "Disclaimer",
      "Limitation of liability",
      "Indemnification",
      "Changes and availability",
      "Governing law and disputes",
      "General terms",
      "Contact",
    ]);
  });

  it("states the effective date, company and location for the header", () => {
    const { fm } = getPage("/terms");
    expect(fm.effective).toBe("4 November 2026");
    expect(fm.company).toBe("Splice Labs Group, Inc.");
    expect(fm.location).toBe("Florida, United States");
  });

  it("names the brand and the legal entity that operates the site", () => {
    expect(sectionBody("About SpliceOps")).toContain(
      "SpliceOps is a brand owned and operated by Splice Labs Group, Inc., 19120 Sweet Clover Ln, Tampa, FL 33647.",
    );
  });

  it("covers the website only and leaves engagements to their own agreements", () => {
    const body = sectionBody("Website only");
    expect(body).toContain("statement of work");
    expect(body).toContain("the separate agreement controls");
  });

  it("says a booking request is not an engagement and asks for nothing confidential", () => {
    const body = sectionBody("Submissions and feedback");
    expect(body).toContain("Requesting a working session does not create an engagement");
    expect(body).toContain("Do not submit confidential or proprietary information");
  });

  it("treats the calculators and check-up as informational estimates, not advice", () => {
    const body = sectionBody("Tools, results and estimates");
    expect(body).toContain("AI cost of delay");
    expect(body).toContain("AI ROI");
    expect(body).toContain("AI check-up");
    expect(body).toContain("do not guarantee");
    expect(sectionBody("Disclaimer")).toContain("does not constitute legal, financial");
  });

  it("caps liability at the greater of $100 and what you paid for the website", () => {
    const body = sectionBody("Limitation of liability");
    expect(body).toContain("$100");
    expect(body).toContain("12 months");
  });

  it("is governed by Florida law with Hillsborough County courts", () => {
    const body = sectionBody("Governing law and disputes");
    expect(body).toContain("State of Florida");
    expect(body).toContain("Hillsborough County");
  });

  it("links the privacy policy and keeps the open items for counsel", () => {
    expect(sectionBody("General terms")).toContain("[Privacy Policy](/privacy)");
    const { fm } = getPage("/terms");
    expect(fm.status).toBe("provisional");
    expect(fm.open).toContain("Governing law and venue");
  });
});
