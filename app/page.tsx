"use client";

import { useCallback, useEffect, useState } from "react";
import type { Compliment } from "@/lib/types";
import { loadCompliments, poolByCategory, pickRandom } from "@/lib/compliments"; // if you still use tone, keep your function; if you moved to category-only, use poolByCategory
import { useAppState } from "./components/core/AppState";
import Hero from "./components/hero/Hero";
import ComplimentCard from "./components/compliment/ComplimentCard";

export default function Page() {
  const { lang, category, current, setCurrent, isFav, toggleFavorite } =
    useAppState();
  const [all, setAll] = useState<Compliment[]>([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    loadCompliments(lang)
      .then((data) => alive && setAll(data))
      .catch(() => alive && setAll([]));
    return () => {
      alive = false;
    };
  }, [lang]);

  const next = useCallback(() => {
    const pool = poolByCategory(all, category); // or your tone pool
    const n = pickRandom(pool);
    if (n) setCurrent(n);
  }, [all, category, setCurrent]);

  const copy = useCallback(async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }, [current]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === " ") {
        e.preventDefault();
        next();
      }
      if (k === "c") copy();
      if (k === "f") toggleFavorite();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, copy, toggleFavorite]);

  const loading = all.length === 0;

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 md:py-12 min-h-[calc(100dvh-120px)] flex flex-col items-center justify-start gap-8">
      <Hero />

      <ComplimentCard className="w-full mt-4">
        {current?.text ??
          (lang === "no" ? "Klar for litt sjarm?" : "Ready for some charm?")}
      </ComplimentCard>

      <div className="w-full max-w-2xl flex items-center gap-2">
        <button className="btn btn-primary w-full" onClick={next} disabled={loading}>
          {lang === "no" ? "Gi meg et kompliment" : "Give me a compliment"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={copy}
          aria-label="Copy"
          disabled={!current}
          title="Copy"
        >
          📋
        </button>
        <button
          className="btn btn-ghost"
          onClick={toggleFavorite}
          aria-label="Favorite"
          disabled={!current}
          title="Favorite"
        >
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
