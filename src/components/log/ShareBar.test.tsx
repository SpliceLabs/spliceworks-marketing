// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShareBar } from "./ShareBar";

const props = { url: "https://spliceops.com/log/supadata", title: "Supadata" };

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("ShareBar", () => {
  it("links to LinkedIn, X and Bluesky share pages in a new tab", () => {
    render(<ShareBar {...props} />);
    ["Share on LinkedIn", "Share on X", "Share on Bluesky"].forEach((name) => {
      const link = screen.getByRole("link", { name });
      expect(link.getAttribute("href")).toContain(encodeURIComponent(props.url));
      expect(link.getAttribute("target")).toBe("_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
    });
  });

  it("has an icon-only copy button with a tooltip and an accessible name", () => {
    render(<ShareBar {...props} />);
    const button = screen.getByRole("button", { name: "Copy link" });
    expect(button.textContent).toBe("");
    expect(button.getAttribute("data-tip")).toBe("Copy link");
  });

  it("copies the link and confirms with Copied", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", { clipboard: { writeText } });
    render(<ShareBar {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy link" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Link copied" })).toBeTruthy());
    expect(writeText).toHaveBeenCalledWith(props.url);
    expect(screen.getByRole("button", { name: "Link copied" }).getAttribute("data-tip")).toBe("Copied");
  });

  it("shows the native share button only when the browser can share", () => {
    vi.stubGlobal("navigator", { share: vi.fn() });
    render(<ShareBar {...props} />);
    expect(screen.getByRole("button", { name: "Share" }).className).toContain("native");
    expect(document.querySelector(".lg-share")?.className).toContain("force-native");
  });
});
