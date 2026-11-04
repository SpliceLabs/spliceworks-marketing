import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import manifest from "./manifest";

describe("web app manifest", () => {
  it("offers the design system 192 and 512 app icons, and both files exist", () => {
    const icons = manifest().icons ?? [];
    expect(icons.map((i) => i.src)).toEqual(["/icons/icon-192.png", "/icons/icon-512.png"]);
    icons.forEach((i) => expect(fs.existsSync(path.join(process.cwd(), "public", i.src))).toBe(true));
  });

  it("uses the brand ink, the same dark as the app icon, for its background and theme", () => {
    expect(manifest()).toMatchObject({ background_color: "#16161A", theme_color: "#16161A" });
  });
});
