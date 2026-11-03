import { describe, expect, it } from "vitest";
import { getPage } from "./pages";

describe("Privacy notice", () => {
  it("discloses Gojiberry, the data it collects, why we use it and how to opt out", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("Gojiberry");
    expect(body).toContain("IP address");
    expect(body).toContain("which companies visit");
    expect(body).toContain("https://gojiberry.ai/optout");
  });

  it("discloses what the booking form collects and who it goes through", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("working session on [/book](/book)");
    expect(body).toContain("your name, work email and company");
    expect(body).toContain("Resend");
    expect(body).not.toContain("no forms");
  });

  it("names Google Workspace and says how Resend's US transfers are protected", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("Google Workspace");
    expect(body).toContain("Data Privacy Framework");
    expect(body).toContain("https://resend.com/legal/dpa");
  });

  it("warns that calculator inputs in the page URL may be visible to service providers and anyone given the link", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain(
      "Those inputs may be visible to our hosting and website service providers or to anyone with whom you share the link. Do not enter confidential or sensitive personal information.",
    );
  });

  it("says a company visit may lead to outreach to other business contacts at that company", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("relevant business contacts at that company, who may not be the person who visited");
  });

  it("keeps rights, retention and age language to what we can stand behind", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("We reply within the time the law requires.");
    expect(body).toContain("Residents of some US states may have additional rights under applicable law.");
    expect(body).not.toContain("We will honour Global Privacy Control");
    expect(body).toContain("up to 24 months after our last substantive contact");
    expect(body).toContain(
      "We retain visitor-identification and business-contact data only for as long as reasonably necessary for relevant business outreach, subject to applicable legal requirements. If you opt out of our marketing, we maintain suppression records to prevent further contact. You can contact us to request access, deletion or other applicable privacy rights, including requests involving our service providers.",
    );
    expect(body).not.toContain("Gojiberry sets its own retention");
    expect(body).toContain("we will stop contacting you across our systems, keep you on our suppression list");
    expect(body).toContain("https://gojiberry.ai/optout");
    expect(body).toContain("not meant for anyone under 18");
  });

  it("names the legal entity and its postal address", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("Splice Labs Group, Inc., 19120 Sweet Clover Ln, Tampa, FL 33647");
  });

  it("does not memorialise the missing consent banner", () => {
    const { body } = getPage("/privacy");
    expect(body).not.toContain("We don't yet ask for consent");
  });

  it("relies on legitimate interests for business enquiries and reserves contractual necessity for the individual", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain(
      "we rely on our legitimate interests to respond to business enquiries, maintain and secure the website, and conduct relevant business outreach",
    );
    expect(body).toContain(
      "Where we take steps toward a contract with you personally, we may rely on contractual necessity.",
    );
    expect(body).not.toContain("you asked us to take steps before a contract");
  });

  it("describes the cookie banner, Global Privacy Control and how to change the choice", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("doesn't start identifying visits until you choose Accept in our cookie banner");
    expect(body).toContain("Cookie settings");
    expect(body).toContain("If your browser sends a Global Privacy Control signal, we treat it as a Decline.");
  });
});
