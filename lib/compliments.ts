import type { Compliment, Lang, Category } from "./types";

export async function loadCompliments(lang: Lang): Promise<Compliment[]> {
  const res = await fetch(`/data/compliments.${lang}.json`, { cache: "no-store" });
  if (!res.ok) throw new Error("Kunne ikke laste komplimenter");
  return (await res.json()) as Compliment[];
}

export function poolByCategory(all: Compliment[], category: Category): Compliment[] {
  return all.filter((c) => (c.categories ?? []).includes(category));
}

export function pickRandom(pool: Compliment[]): Compliment | null {
  if (!pool.length) return null;
  const i = Math.floor(Math.random() * pool.length);
  return pool[i] ?? null;
}
