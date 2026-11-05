import fs from "node:fs";
import path from "node:path";
import { assignCodes } from "./code";
import { codable, loadEntries } from "./entries";

export const withCode = (source: string, code: string): string => {
  const lines = source.split("\n");
  const end = lines[0] === "---" ? lines.indexOf("---", 1) : -1;
  if (end < 0) throw new Error("The file must start with a frontmatter block between --- lines");
  const front = lines.slice(1, end);
  if (front.some((line) => /^code:/.test(line))) return source;
  const typeIndex = front.findIndex((line) => /^type:/.test(line));
  if (typeIndex < 0) throw new Error("The frontmatter has no type line to place the code after");
  return [
    lines[0],
    ...front.slice(0, typeIndex + 1),
    `code: ${code}`,
    ...front.slice(typeIndex + 1),
    ...lines.slice(end),
  ].join("\n");
};

export const writeMissingCodes = (dir: string): readonly string[] =>
  assignCodes(codable(loadEntries(dir, { requireCodes: false }))).map(({ slug, code }) => {
    const file = path.join(dir, `${slug}.md`);
    const temporary = `${file}.tmp`;
    fs.writeFileSync(temporary, withCode(fs.readFileSync(file, "utf8"), code));
    fs.renameSync(temporary, file);
    return `${slug}.md`;
  });
