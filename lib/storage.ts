import type { Lang } from "./types";

const FAV_KEY = "mc_favs_v1";
const HISTORY_KEY = "mc_history_v1";

/* ---------- helpers ---------- */
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

/* ---------- favorites ---------- */
export function getFavorites(): string[] {
  return read<string[]>(FAV_KEY, []);
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): string[] {
  const favs = new Set(getFavorites());
  if (favs.has(id)) {
    favs.delete(id);
  } else {
    favs.add(id);
  }
  const arr = Array.from(favs);
  write(FAV_KEY, arr);
  return arr;
}

/* ---------- history ---------- */
export type HistoryItem = {
  id: string;
  text: string;
  lang: Lang;
  ts: number;
};

export function getHistory(): HistoryItem[] {
  return read<HistoryItem[]>(HISTORY_KEY, []);
}

export function pushHistory(item: HistoryItem, max = 30): HistoryItem[] {
  const list = getHistory();

  // unngå direkte duplikat (samme som sist)
  if (list.length && list[0].id === item.id && list[0].text === item.text) {
    return list;
  }

  const deduped = [item, ...list.filter((x) => x.id !== item.id)];
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

// (eksplicit re-eksport for å gjøre TS/ESLint happy hvis den cachet feil)
export { clearHistory as _clearHistoryExportGuard };
