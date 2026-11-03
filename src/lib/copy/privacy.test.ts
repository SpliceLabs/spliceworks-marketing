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

  it("says calculator inputs travel with the page address when a link is opened", () => {
    const { body } = getPage("/privacy");
    expect(body).not.toContain("We don't send them to a server");
    expect(body).toContain(
      "When someone opens a shared link, the address, including those inputs, reaches our host and Gojiberry",
    );
  });

  it("says a company visit may lead to outreach to other business contacts at that company", () => {
    const { body } = getPage("/privacy");
    expect(body).toContain("relevant business contacts at that company, who may not be the person who visited");
  });
});
