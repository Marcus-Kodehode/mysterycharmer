"use client";

import { useCallback, useEffect, useState } from "react";
import ComplimentCard from "./components/ComplimentCard";
import type { Compliment } from "@/lib/types";
import { loadCompliments, poolByTone, pickRandom } from "@/lib/compliments";
import { useAppState } from "./components/AppState";

export default function Page() {
  const { lang, tone, current, setCurrent, isFav, toggleFavorite } = useAppState();
  const [all, setAll] = useState<Compliment[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCompliments(lang)
      .then((data) => alive && setAll(data))
      .catch(() => alive && setAll([]));
    return () => { alive = false; };
  }, [lang]);

  const next = useCallback(() => {
    const pool = poolByTone(all, tone);
    const n = pickRandom(pool);
    if (n) setCurrent(n);
  }, [all, tone, setCurrent]);

  const copy = useCallback(async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }, [current]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === " ") { e.preventDefault(); next(); }
      if (k === "c") { copy(); }
      if (k === "f") { toggleFavorite(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, copy, toggleFavorite]);

  const loading = all.length === 0;

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

      <div className="w-full max-w-2xl flex items-center gap-2">
        <button className="btn btn-primary w-full" onClick={next} disabled={loading}>
          {lang === "no" ? "Gi meg et kompliment" : "Give me a compliment"}
        </button>
        <button className="btn btn-ghost" onClick={copy} aria-label="Copy" disabled={!current}>📋</button>
        <button className="btn btn-ghost" onClick={toggleFavorite} aria-label="Favorite" disabled={!current}>
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 card px-3 py-2 text-sm">
          {lang === "no" ? "Kopiert!" : "Copied!"}
        </div>
      )}
    </section>
  );
}
