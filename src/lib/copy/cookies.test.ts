import { describe, expect, it } from "vitest";
import { getPage } from "./pages";

const sectionBody = (title: string): string => {
  const { sections } = getPage("/cookies");
  const section = sections.find((s) => s.titleText === title);
  return section ? section.blocks.map((b) => b.raw).join("\n") : "";
};

describe("Cookie Policy", () => {
  it("is a plain policy with the usual sections in order", () => {
    const page = getPage("/cookies");
    expect(page.h1Text).toBe("Cookie Policy");
    expect(page.sections.map((s) => s.titleText)).toEqual([
      "What cookies are",
      "What we use",
      "Visitor identification",
      "Your choices",
      "Changes to this policy",
      "Contact us",
    ]);
  });

  it("states the effective date, company and location for the header", () => {
    const { fm } = getPage("/cookies");
    expect(fm.effective).toBe("4 November 2026");
    expect(fm.company).toBe("Splice Labs Group, Inc.");
    expect(fm.location).toBe("Florida, United States");
  });

  it("explains that cookies and similar browser storage are covered", () => {
    expect(sectionBody("What cookies are")).toContain("local storage");
  });

  it("lists the three items the site keeps in your browser and says they stay on your device", () => {
    const { sections } = getPage("/cookies");
    const rows = sections
      .find((s) => s.titleText === "What we use")
      ?.blocks.flatMap((b) => (b.t === "table" ? b.rows : []))
      .map((row) => row.map((cell) => cell.map((i) => (i.t === "code" ? i.v : "")).join("")).join(""));
    expect(rows).toEqual(["sw-theme", "sw-mode", "sw-consent"]);
    expect(sectionBody("What we use")).toContain("never reach our servers");
  });

  it("says we do not use advertising cookies", () => {
    expect(sectionBody("What we use")).toContain("We do not use advertising cookies.");
  });

  it("says visitor identification waits for Accept and may set cookies, without naming the provider", () => {
    const body = sectionBody("Visitor identification");
    expect(body).toContain("which companies visit");
    expect(body).toContain("until you choose Accept");
    expect(body).toContain("may set cookies or other identifiers");
    expect(getPage("/cookies").body).not.toContain("Gojiberry");
  });

  it("covers the banner, the footer link, Global Privacy Control and browser controls", () => {
    const body = sectionBody("Your choices");
    expect(body).toContain("Cookie settings");
    expect(body).toContain("Global Privacy Control signal, we treat it as Decline");
    expect(body).toContain("browser");
  });

  it("links the privacy policy and keeps the page provisional", () => {
    expect(getPage("/cookies").body).toContain("[Privacy Policy](/privacy)");
    expect(getPage("/cookies").fm.status).toBe("provisional");
  });
});
