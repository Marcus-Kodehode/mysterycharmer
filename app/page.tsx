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
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadCompliments(lang)
      .then((data) => setAll(data))
      .catch(() => setAll([]));
  }, [lang]);

  useEffect(() => {
    const pool = poolByTone(all, tone);
    setCurrent(pickRandom(pool));
  }, [all, tone]);

  useEffect(() => {
    setFavs(() => JSON.parse(localStorage.getItem("mc_favs_v1") || "[]"));
  }, []);

  // Tastatursnarveier
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === " ") { e.preventDefault(); next(); }
      if (k === "c") { copy(); }
      if (k === "f") { fav(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const isFav = useMemo(() => (current ? isFavorite(current.id) : false), [current]);

  function next() {
    const pool = poolByTone(all, tone);
    setCurrent(pickRandom(pool));
  }

  async function copy() {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  function fav() {
    if (!current) return;
    const updated = toggleFavorite(current.id);
    setFavs(updated);
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl sm:text-3xl tracking-wide">
        mystery<span className="text-brand-400">charmer</span>
      </h1>
      <p className="text-zinc-400 text-sm -mt-2">
        Tasteful flirting, one line at a time.
      </p>

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

      <p className="text-xs text-zinc-500 pt-4">
        {favs.length} {lang === "no" ? "favoritter" : "favorites"}
      </p>

      {/* Kopi-toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 card px-3 py-2 text-sm">
          {lang === "no" ? "Kopiert!" : "Copied!"}
        </div>
      )}
    </section>
  );
}
