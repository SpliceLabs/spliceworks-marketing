import { describe, expect, it } from "vitest";
import { inlineText } from "./markdown";
import { getPage } from "./pages";

const home = () => getPage("/");

describe("home copy", () => {
  it("leads with the Eclipse headline", () => {
    expect(inlineText(home().h1)).toBe("Splice, don't replace.");
  });

  it("opens with the CEO line before the call to action", () => {
    const [first] = home().intro;
    expect(first.t).toBe("para");
    expect(JSON.stringify(first)).toContain("Your CEO said");
    expect(JSON.stringify(first)).toContain("Agents run it. You stay in control.");
  });

  it("states the pricing promise without a number", () => {
    const text = JSON.stringify(home());
    expect(text).toContain("A paid day, credited in full if you go on to work with us.");
    expect(text).not.toMatch(/\[PRICE\]|\$\d/);
  });
});
