"use client";

import {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
} from "react";
import type { Compliment, Lang, Category } from "@/lib/types";
import {
  getFavorites,
  toggleFavorite as toggleFavStorage,
  getHistory,
  pushHistory as pushHistoryStorage,
  clearHistory as clearHistoryStorage,
  type HistoryItem as StorageHistoryItem,
} from "@/lib/storage";

type AppState = {
  lang: Lang; setLang: (l: Lang) => void;
  category: Category; setCategory: (c: Category) => void;

  current: Compliment | null; setCurrent: (c: Compliment | null) => void;

  isFav: boolean; toggleFavorite: () => void;

  history: StorageHistoryItem[]; clearHistory: () => void;

  favCount: number;
};

const Ctx = createContext<AppState | null>(null);
const PREFS_KEY = "mc_prefs_v2";

function readPrefs(): { lang: Lang; category: Category } {
  try { const raw = localStorage.getItem(PREFS_KEY); if (raw) return JSON.parse(raw); } catch {}
  return { lang: "no", category: "classic" };
}
function writePrefs(p: { lang: Lang; category: Category }) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch {}
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");
  const [category, setCategoryState] = useState<Category>("classic");
  const [current, setCurrentState] = useState<Compliment | null>(null);
  const [favKeys, setFavKeys] = useState<string[]>([]);
  const [history, setHistory] = useState<StorageHistoryItem[]>([]);

  useEffect(() => {
    const p = readPrefs();
    setLangState(p.lang);
    setCategoryState(p.category);
    setFavKeys(getFavorites());
    setHistory(getHistory());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    writePrefs({ lang: l, category });
  }, [category]);

  const setCategory = useCallback((c: Category) => {
    setCategoryState(c);
    writePrefs({ lang, category: c });
  }, [lang]);

  const setCurrent = useCallback((c: Compliment | null) => {
    setCurrentState(c);
    if (c) {
      const item: StorageHistoryItem = { key: c.key, text: c.text, lang, ts: Date.now() };
      const updated = pushHistoryStorage(item);
      setHistory(updated);
    }
  }, [lang]);

  const isFav = useMemo(() => (current ? favKeys.includes(current.key) : false), [favKeys, current]);

  const toggleFavorite = useCallback(() => {
    if (!current) return;
    const updated = toggleFavStorage(current.key);
    setFavKeys(updated);
  }, [current]);

  const clearHistory = useCallback(() => {
    clearHistoryStorage();
    setHistory([]);
  }, []);

  const value: AppState = {
    lang, setLang,
    category, setCategory,
    current, setCurrent,
    isFav, toggleFavorite,
    history, clearHistory,
    favCount: favKeys.length,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
