import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { imageSize } from "./image-size";

const pngHeader = (width: number, height: number): Buffer => {
  const header = Buffer.alloc(24);
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(header);
  header.write("IHDR", 12, "ascii");
  header.writeUInt32BE(width, 16);
  header.writeUInt32BE(height, 20);
  return header;
};

const publicDir = (files: Record<string, Buffer>) => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "log-img-"));
  Object.entries(files).forEach(([name, bytes]) => {
    fs.mkdirSync(path.dirname(path.join(dir, name)), { recursive: true });
    fs.writeFileSync(path.join(dir, name), bytes);
  });
  return dir;
};

describe("imageSize", () => {
  it("reads the width and height of a png under the public folder", () => {
    const dir = publicDir({ "log/a/one.png": pngHeader(936, 6610) });
    expect(imageSize("/log/a/one.png", dir)).toEqual({ width: 936, height: 6610 });
  });

  it.each([
    ["a file that does not exist", "/log/a/missing.png"],
    ["a remote image", "https://example.com/one.png"],
    ["a protocol-relative image", "//example.com/one.png"],
    ["a path that climbs out of the public folder", "/../secret.png"],
    ["a file type it cannot read", "/log/a/photo.jpg"],
  ])("returns nothing for %s", (_name, src) => {
    const dir = publicDir({ "log/a/photo.jpg": Buffer.from("not a png"), "../secret.png": pngHeader(1, 1) });
    expect(imageSize(src, dir)).toBeUndefined();
  });

  it("returns nothing when the file is not really a png", () => {
    const dir = publicDir({ "log/a/fake.png": Buffer.from("this is not a png file at all") });
    expect(imageSize("/log/a/fake.png", dir)).toBeUndefined();
  });
});
