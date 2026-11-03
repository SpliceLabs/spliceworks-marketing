// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { makeEntry } from "@/lib/log/test-support";
import { LogFeed } from "./LogFeed";

afterEach(cleanup);

const entries = [
  makeEntry({ slug: "b", title: "Beta tool", description: "Sorts DMs.", published: "2026-11-02", code: "LG-00002" }),
  makeEntry({
    slug: "a",
    title: "Alpha check",
    description: "Checks images.",
    published: "2026-11-03",
    code: "LG-00001",
  }),
  makeEntry({
    slug: "c",
    title: "Gamma",
    description: "Beta testing notes.",
    published: "2026-11-01",
    code: "LG-00003",
  }),
];

const titles = () => screen.getAllByRole("link").map((link) => link.querySelector(".title")?.textContent);

describe("LogFeed", () => {
  it("lists the entries newest first with the count and the sorted line", () => {
    render(<LogFeed entries={entries} filter={null} />);
    expect(screen.getByText("Showing 3 entries")).toBeTruthy();
    expect(screen.getByText("Sorted newest first")).toBeTruthy();
    expect(titles()).toEqual(["Alpha check", "Beta tool", "Gamma"]);
  });
});
