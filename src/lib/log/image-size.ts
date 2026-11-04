import fs from "node:fs";
import path from "node:path";

export type ImageSize = { readonly width: number; readonly height: number };

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const HEADER_BYTES = 24;

const readHeader = (file: string): Buffer | undefined => {
  try {
    const fd = fs.openSync(file, "r");
    try {
      const header = Buffer.alloc(HEADER_BYTES);
      const read = fs.readSync(fd, header, 0, HEADER_BYTES, 0);
      return read === HEADER_BYTES ? header : undefined;
    } finally {
      fs.closeSync(fd);
    }
  } catch {
    return undefined;
  }
};

const defaultPublicDir = (): string => path.join(process.cwd(), "public");

export const imageSize = (src: string, publicDir: string = defaultPublicDir()): ImageSize | undefined => {
  if (!src.startsWith("/") || src.startsWith("//") || !src.endsWith(".png")) return undefined;
  const root = path.resolve(publicDir);
  const file = path.resolve(root, `.${src}`);
  if (!file.startsWith(`${root}${path.sep}`)) return undefined;
  const header = readHeader(file);
  if (!header || !header.subarray(0, 8).equals(PNG_SIGNATURE) || header.toString("ascii", 12, 16) !== "IHDR") {
    return undefined;
  }
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
};
