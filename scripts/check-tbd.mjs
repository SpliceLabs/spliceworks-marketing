#!/usr/bin/env node
/**
 * Placeholder check for the v5 copy.
 *
 * Lists every `[TBD …]` / `[PROVISIONAL …]` placeholder in the page copy
 * (content/v5/pages, front matter excluded, because it isn't rendered) and
 * every `<Tbd …>` used directly in src/ (e.g. the footer email, A6).
 *
 *   pnpm check:tbd              report; exits 1 if any placeholder remains
 *   node scripts/check-tbd.mjs --build
 *                               used by `pnpm build`: exits 1 if any remain,
 *                               unless a preview build is allowed:
 *                                 ALLOW_TBD=1           (any environment)
 *                                 VERCEL_ENV=preview    (Vercel preview deploys)
 *
 * So a production build cannot ship with a placeholder on the page.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const pagesDir = path.join(root, "content", "v5", "pages");
const srcDir = path.join(root, "src");
const build = process.argv.includes("--build");

function walk(dir, exts) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

const found = [];

// 1. Copy files (body only).
for (const file of walk(pagesDir, [".md"])) {
  const src = fs.readFileSync(file, "utf8");
  const fm = /^---\n[\s\S]*?\n---\n/.exec(src);
  const offset = fm ? fm[0].split("\n").length - 1 : 0;
  const body = fm ? src.slice(fm[0].length) : src;
  body.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/\[(TBD|PROVISIONAL)([^\]]*)\]/g)) {
      const note = m[2].replace(/^[\s:,]+/, "").trim();
      const ids = note.match(/#\d+|\b[A-G]\d+\b/g) ?? [];
      found.push({ where: `${path.relative(root, file)}:${offset + i + 1}`, ids, text: m[0] });
    }
  });
}

// 2. <Tbd> used directly in components (not via the copy renderer).
for (const file of walk(srcDir, [".tsx", ".ts"])) {
  if (file.endsWith(path.join("components", "copy", "Tbd.tsx"))) continue;
  const src = fs.readFileSync(file, "utf8");
  src.split("\n").forEach((line, i) => {
    for (const m of line.matchAll(/<Tbd\b([^>]*)>([^<]*)/g)) {
      const id = /id="([^"]*)"/.exec(m[1])?.[1];
      if (/id=\{n\.ids\}/.test(m[1])) continue; // the copy renderer itself
      found.push({
        where: `${path.relative(root, file)}:${i + 1}`,
        ids: id ? [id] : [],
        text: `<Tbd${m[1]}>${m[2].trim()}`,
      });
    }
  });
}

const byId = new Map();
for (const f of found) {
  const key = f.ids.length ? f.ids.join(" ") : "untracked";
  byId.set(key, (byId.get(key) ?? 0) + 1);
}

if (found.length === 0) {
  console.log("check-tbd: no placeholders left.");
  process.exit(0);
}

// All placeholders filled 2026-10-26 (assumptions listed in content/v5/ASSUMPTIONS.md).
// Production builds refuse placeholders again.
const ALLOW_IN_PRODUCTION = false;

const allowed = ALLOW_IN_PRODUCTION || process.env.ALLOW_TBD === "1" || process.env.VERCEL_ENV === "preview";
console.log(`check-tbd: ${found.length} placeholder(s) remain.`);
const summary = [...byId.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `${k} ×${v}`)
  .join(", ");
console.log(`  by tracker id: ${summary}`);
if (!build || !allowed) {
  for (const f of found) console.log(`  ${f.where}  ${f.text}`);
}

if (build && allowed) {
  console.log(
    "check-tbd: build allowed (ALLOW_IN_PRODUCTION, ALLOW_TBD=1 or VERCEL_ENV=preview); placeholders will render visibly.",
  );
  process.exit(0);
}
if (build) {
  console.error(
    "check-tbd: refusing to build for production with placeholders on the page.\n" +
      "  Fill them in, or build a preview with ALLOW_TBD=1 pnpm build.",
  );
}
process.exit(1);
