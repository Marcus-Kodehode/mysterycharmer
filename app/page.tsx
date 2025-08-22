"use client";

import { useEffect, useMemo, useState } from "react";
import ComplimentCard from "./components/ComplimentCard";
import Controls from "./components/Controls";
import type { Compliment, Lang, Tone } from "@/lib/types";
import { loadCompliments, poolByTone, pickRandom } from "@/lib/compliments";
import { isFavorite, toggleFavorite } from "@/lib/storage";

export default function Page() {
  const [lang, setLang] = useState<Lang>("no");
  const [tone, setTone] = useState<Tone>(1);
  const [all, setAll] = useState<Compliment[]>([]);
  const [current, setCurrent] = useState<Compliment | null>(null);
  const [favs, setFavs] = useState<string[]>([]);

  // last inn ved språkbytte
  useEffect(() => {
    loadCompliments(lang)
      .then((data) => setAll(data))
      .catch(() => setAll([]));
  }, [lang]);

  // plukk første når all endrer
  useEffect(() => {
    const pool = poolByTone(all, tone);
    setCurrent(pickRandom(pool));
  }, [all, tone]);

  // sync favoritter
  useEffect(() => {
    setFavs(() => JSON.parse(localStorage.getItem("mc_favs_v1") || "[]"));
  }, []);

  const isFav = useMemo(() => (current ? isFavorite(current.id) : false), [current]);

  function next() {
    const pool = poolByTone(all, tone);
    const nextOne = pickRandom(pool);
    setCurrent(nextOne);
  }

  async function copy() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
    } catch {
      // noop
    }
  }

  function fav() {
    if (!current) return;
    const updated = toggleFavorite(current.id);
    setFavs(updated);
  }

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 gap-8">
      <header className="text-center">
        <h1 className="text-2xl sm:text-3xl font-display tracking-wide">
          mystery<span className="text-brand-400">charmer</span>
        </h1>
        <p className="text-zinc-400 text-sm">
          Tasteful flirting, one line at a time.
        </p>
      </header>

      <ComplimentCard>
        {current?.text ?? (lang === "no" ? "Klar for litt sjarm?" : "Ready for some charm?")}
      </ComplimentCard>

      <Controls
        onNext={next}
        onCopy={copy}
        onFav={fav}
        isFav={isFav}
        lang={lang}
        tone={tone}
        onTone={(t) => setTone(t as Tone)}
        onLang={(l) => setLang(l)}
      />

      <footer className="text-xs text-zinc-500 pt-4">
        {favs.length} {lang === "no" ? "favoritter" : "favorites"}
      </footer>
    </main>
  );
}
