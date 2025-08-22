// lib/storage.ts
import type { Lang } from "./types";

const FAV_KEY = "mc_favs_keys_v1";
const HISTORY_KEY = "mc_history_v2";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/* -------- Favorites (by key) -------- */
export function getFavorites(): string[] {
  return read<string[]>(FAV_KEY, []);
}
export function toggleFavorite(key: string): string[] {
  const set = new Set(getFavorites());
  set.has(key) ? set.delete(key) : set.add(key);
  const arr = Array.from(set);
  write(FAV_KEY, arr);
  return arr;
}

/* -------- History (by key) -------- */
export type HistoryItem = { key: string; text: string; lang: Lang; ts: number };

export function getHistory(): HistoryItem[] {
  return read<HistoryItem[]>(HISTORY_KEY, []);
}
export function pushHistory(item: HistoryItem, max = 50): HistoryItem[] {
  const list = getHistory();

  // unngå direkte duplikat (samme som sist)
  if (list.length && list[0].key === item.key && list[0].text === item.text) {
    return list;
  }

  const deduped = [item, ...list.filter((x) => x.key !== item.key)];
  const trimmed = deduped.slice(0, max);
  write(HISTORY_KEY, trimmed);
  return trimmed;
}
export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
