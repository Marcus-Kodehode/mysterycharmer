// lib/compliments.ts
import type { Compliment, Category, Lang } from "./types";

// Load language JSON
export async function loadCompliments(lang: Lang): Promise<Compliment[]> {
  try {
    const map: Record<Lang, () => Promise<Compliment[]>> = {
      no: () => import("@/public/data/compliments.no.json").then(m => m.default as Compliment[]),
      en: () => import("@/public/data/compliments.en.json").then(m => m.default as Compliment[]),
      es: () => import("@/public/data/compliments.es.json").then(m => m.default as Compliment[]),
      sw: () => import("@/public/data/compliments.sw.json").then(m => m.default as Compliment[]),
      zh: () => import("@/public/data/compliments.zh.json").then(m => m.default as Compliment[]),
    };
    return await map[lang]();
  } catch {
    return [];
  }
}

export function poolByCategory(list: Compliment[], cat: Category): Compliment[] {
  return list.filter((c) => c.categories?.includes(cat));
}

export function pickRandom<T>(arr: T[]): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}
