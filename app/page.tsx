"use client";

import { useCallback, useEffect, useState } from "react";
import type { Compliment } from "@/lib/types";
import { loadCompliments, poolByCategory, pickRandom } from "@/lib/compliments";
import { useAppState } from "./components/core/AppState";
import Hero from "./components/hero/Hero";
import ComplimentCard from "./components/compliment/ComplimentCard";
import { t } from "@/lib/i18n";

export default function Page() {
  const { lang, category, current, setCurrent, isFav, toggleFavorite } = useAppState();
  const [all, setAll] = useState<Compliment[]>([]);
  const [copied, setCopied] = useState(false);

  // Load compliments for the active language
  useEffect(() => {
    let alive = true;
    loadCompliments(lang)
      .then((data) => alive && setAll(data))
      .catch(() => alive && setAll([]));
    return () => {
      alive = false;
    };
  }, [lang]);

  // Pick next line from selected category
  const next = useCallback(() => {
    const pool = poolByCategory(all, category);
    const n = pickRandom(pool);
    if (n) setCurrent(n);
  }, [all, category, setCurrent]);

  // Copy current line
  const copy = useCallback(async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(current.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, [current]);

  // Keyboard shortcuts: Space = next, C = copy, F = favorite
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
        {current?.text ?? t(lang, "ready")}
      </ComplimentCard>

      <div className="w-full max-w-2xl flex items-center gap-2">
        <button className="btn btn-primary w-full" onClick={next} disabled={loading}>
          {t(lang, "cta")}
        </button>

        <button className="btn btn-ghost" onClick={copy} aria-label="Copy" disabled={!current}>
          📋
        </button>

        <button
          className="btn btn-ghost"
          onClick={toggleFavorite}
          aria-label="Favorite"
          disabled={!current}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 card px-3 py-2 text-sm">
          {t(lang, "copied")}
        </div>
      )}
    </section>
  );
}
/*
            .-=========-.
         .-'             '-.
       .'  ONE BUG TO FIND  '.
      /   THEM — ONE FIX TO   \
     ;   BRING THEM ALL — AND  ;
     |    IN THE DARKNESS      |
     ;        BIND THEM        ;
      \                       /
       '.                   .'
         '-.           .-'
            '-========-'
   — Marcus
*/
