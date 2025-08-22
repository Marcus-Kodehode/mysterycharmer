import type { Compliment, Lang, Tone } from "./types";

/** Henter lokalt JSON fra /public/data */
export async function loadCompliments(lang: Lang): Promise<Compliment[]> {
  const res = await fetch(`/data/compliments.${lang}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kunne ikke laste komplimenter");
  const data = (await res.json()) as Compliment[];
  return data;
}

/** Filtrerer på tone (inkluderer alt ≤ valgt tone) */
export function poolByTone(all: Compliment[], tone: Tone): Compliment[] {
  return all.filter((c) => c.tone <= tone);
}

export function pickRandom(pool: Compliment[]): Compliment | null {
  if (!pool.length) return null;
  const i = Math.floor(Math.random() * pool.length);
  return pool[i] ?? null;
}
