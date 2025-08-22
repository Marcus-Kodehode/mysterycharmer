const FAV_KEY = "mc_favs_v1";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function getFavorites(): string[] {
  return read<string[]>(FAV_KEY, []);
}

export function isFavorite(id: string): boolean {
  return getFavorites().includes(id);
}

export function toggleFavorite(id: string): string[] {
  const favs = new Set(getFavorites());
  favs.has(id) ? favs.delete(id) : favs.add(id);
  const arr = Array.from(favs);
  write(FAV_KEY, arr);
  return arr;
}
