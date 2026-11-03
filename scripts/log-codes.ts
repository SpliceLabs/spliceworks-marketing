import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { writeMissingCodes } from "../src/lib/log/code-file";
import { logDir } from "../src/lib/log/entries";

const dir = logDir();
const changed = fs.existsSync(dir) ? writeMissingCodes(dir) : [];

changed.forEach((file) => console.log(`log:codes assigned a code in ${file}`));

if (process.argv.includes("--stage") && changed.length) {
  execFileSync("git", ["add", "--", ...changed.map((file) => path.join(dir, file))]);
}
