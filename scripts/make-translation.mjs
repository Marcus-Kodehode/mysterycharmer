// scripts/make-translation.mjs
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.resolve("public", "data");
const SRC_LANG = "no";
const TARGET = (process.argv[2] || "en").toLowerCase(); // ex: en, es, de

const srcFile = path.join(DATA_DIR, `compliments.${SRC_LANG}.json`);
const dstFile = path.join(DATA_DIR, `compliments.${TARGET}.json`);

function readJSON(p, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8"));
  } catch {
    return fallback;
  }
}

function ensureUniqueKeys(list, label) {
  const seen = new Set();
  const dupes = [];
  for (const it of list) {
    if (seen.has(it.key)) dupes.push(it.key);
    seen.add(it.key);
  }
  if (dupes.length) {
    console.warn(`⚠ Duplicate keys in ${label}:`, dupes.join(", "));
  }
}

const master = readJSON(srcFile);
if (!Array.isArray(master)) {
  console.error(`❌ Could not read master file: ${srcFile}`);
  process.exit(1);
}

ensureUniqueKeys(master, `${SRC_LANG}`);

const existing = readJSON(dstFile, []);
ensureUniqueKeys(existing, TARGET);

// Lag oppslagskart for eksisterende måltekster
const existingByKey = new Map(existing.map((x) => [x.key, x]));

// Bygg ny målfil – behold eksisterende oversettelser
const out = master.map((it) => {
  const prev = existingByKey.get(it.key);
  return {
    key: it.key,
    text: prev?.text ?? "",
    categories: it.categories ?? [],
  };
});

// Sortér etter key for stabil diff
out.sort((a, b) => a.key.localeCompare(b.key));

fs.writeFileSync(dstFile, JSON.stringify(out, null, 2), "utf8");

const filled = out.filter((x) => x.text && x.text.trim()).length;
console.log(`✔ Wrote ${dstFile} (${filled}/${out.length} translated)`);
