"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import type { Compliment, Lang, Tone } from "@/lib/types";
import {
  getFavorites,
  toggleFavorite as toggleFavStorage,
  getHistory,
  pushHistory as pushHistoryStorage,
  clearHistory as clearHistoryStorage,
} from "@/lib/storage";

type HistoryItem = {
  id: string;
  text: string;
  lang: Lang;
  ts: number;
};

type AppState = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tone: Tone;
  setTone: (t: Tone) => void;

  current: Compliment | null;
  setCurrent: (c: Compliment | null) => void;

  isFav: boolean;
  toggleFavorite: () => void;

  history: HistoryItem[];
  pushHistory: (item: HistoryItem) => void;
  clearHistory: () => void;

  favCount: number;
};

const Ctx = createContext<AppState | null>(null);

const PREFS_KEY = "mc_prefs_v1";

function readPrefs(): { lang: Lang; tone: Tone } {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { lang: "no", tone: 1 };
}
function writePrefs(p: { lang: Lang; tone: Tone }) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p));
  } catch {}
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("no");
  const [tone, setToneState] = useState<Tone>(1);
  const [current, setCurrentState] = useState<Compliment | null>(null);
  const [favIds, setFavIds] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Hydrate on mount
  useEffect(() => {
    const p = readPrefs();
    setLangState(p.lang);
    setToneState(p.tone);
    setFavIds(getFavorites());
    setHistory(getHistory());
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      writePrefs({ lang: l, tone });
    },
    [tone]
  );

  const setTone = useCallback(
    (t: Tone) => {
      setToneState(t);
      writePrefs({ lang, tone: t });
    },
    [lang]
  );

  // Stabil versjon av setCurrent som også pusher til historikk
  const setCurrent = useCallback((c: Compliment | null) => {
    setCurrentState(c);
    if (c) {
      const item: HistoryItem = {
        id: c.id,
        text: c.text,
        lang: c.lang,
        ts: Date.now(),
      };
      const updated = pushHistoryStorage(item);
      setHistory(updated);
    }
  }, []);

  const isFav = useMemo(
    () => (current ? favIds.includes(current.id) : false),
    [favIds, current]
  );

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

  const favCount = favIds.length;

  const value: AppState = {
    lang,
    setLang,
    tone,
    setTone,
    current,
    setCurrent,
    isFav,
    toggleFavorite,
    history,
    pushHistory,
    clearHistory,
    favCount,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
