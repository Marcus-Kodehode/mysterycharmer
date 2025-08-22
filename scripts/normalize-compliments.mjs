import fs from "node:fs";

const src = "public/data/compliments.no.json";
const raw = JSON.parse(fs.readFileSync(src, "utf8"));

function pad3(n) {
  return String(n).padStart(3, "0");
}
function toKey(id) {
  const num = (id.match(/\d+/) || [""])[0];
  return pad3(Number(num));
}

const cleaned = raw.map((it) => ({
  key: toKey(it.id),
  text: it.text,
  categories: it.categories ?? [],
}));

fs.writeFileSync(src, JSON.stringify(cleaned, null, 2), "utf8");

// Lag en EN-mal med tom tekst (klar for oversettelse):
const en = cleaned.map((it) => ({ ...it, text: "" }));
fs.writeFileSync(
  "public/data/compliments.en.json",
  JSON.stringify(en, null, 2),
  "utf8"
);

console.log("✔ Normalized NO and created EN skeleton.");
