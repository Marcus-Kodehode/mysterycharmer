"use client";

import {
  createContext, useContext, useEffect, useMemo, useState, useCallback,
} from "react";
import type { Compliment, Lang, Category } from "@/lib/types";
import {
  getFavorites, toggleFavorite as toggleFavStorage,
  getHistory, pushHistory as pushHistoryStorage, clearHistory as clearHistoryStorage,
} from "@/lib/storage";

type HistoryItem = { id: string; text: string; lang: Lang; ts: number };

type AppState = {
  lang: Lang; setLang: (l: Lang) => void;
  category: Category; setCategory: (c: Category) => void;

  current: Compliment | null; setCurrent: (c: Compliment | null) => void;

  isFav: boolean; toggleFavorite: () => void;

  history: HistoryItem[]; pushHistory: (item: HistoryItem) => void; clearHistory: () => void;

  favCount: number;
};

const Ctx = createContext<AppState | null>(null);

// Ny nøkkel for prefs etter migrering til category
const PREFS_KEY = "mc_prefs_v2";

function readPrefs(): { lang: Lang; category: Category } {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lang: "no", category: "classic" };
}
function writePrefs(p: { lang: Lang; category: Category }) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)); } catch {}
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");
  const [category, setCategoryState] = useState<Category>("classic");
  const [current, setCurrentState] = useState<Compliment | null>(null);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const p = readPrefs();
    setLangState(p.lang);
    setCategoryState(p.category);
    setFavIds(getFavorites());
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
      const item = { id: c.id, text: c.text, lang: c.lang, ts: Date.now() };
      const updated = pushHistoryStorage(item);
      setHistory(updated);
    }
  }, []);

  const isFav = useMemo(() => (current ? favIds.includes(current.id) : false), [favIds, current]);

  const toggleFavorite = useCallback(() => {
    if (!current) return;
    const updated = toggleFavStorage(current.id);
    setFavIds(updated);
  }, [current]);

  const pushHistory = useCallback((item: HistoryItem) => {
    const updated = pushHistoryStorage(item);
    setHistory(updated);
  }, []);

  const clearHistory = useCallback(() => {
    clearHistoryStorage();
    setHistory([]);
  }, []);

  const value: AppState = {
    lang, setLang,
    category, setCategory,
    current, setCurrent,
    isFav, toggleFavorite,
    history, pushHistory, clearHistory,
    favCount: favIds.length,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
