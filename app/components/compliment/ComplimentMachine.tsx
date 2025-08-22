"use client";

import { useCallback, useEffect, useState } from "react";
import type { Compliment } from "@/lib/types";
import { useAppState } from "../core/AppState";
import { loadCompliments, poolByCategory, pickRandom } from "@/lib/compliments";
import ComplimentCard from "./ComplimentCard";
import ActionsBar from "./ActionsBar";
import CopyToast from "./CopyToast";

export default function ComplimentMachine() {
  const { lang, category, current, setCurrent, isFav, toggleFavorite } = useAppState();
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
    const pool = poolByCategory(all, category);
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
    function onKey(e: KeyboardEvent) {
      const k = e.key.toLowerCase();
      if (k === " ") { e.preventDefault(); next(); }
      if (k === "c") { copy(); }
      if (k === "f") { toggleFavorite(); }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, copy, toggleFavorite]);

  const hasCategory = all.some(c => (c.categories ?? []).includes(category));
  const disabled = all.length === 0 || !hasCategory;

  return (
    <>
      <ComplimentCard>
        {current?.text ?? (lang === "no" ? "Klar for litt sjarm?" : "Ready for some charm?")}
      </ComplimentCard>

      <ActionsBar
        disabled={disabled}
        hasCurrent={!!current}
        isFav={isFav}
        lang={lang}
        onNext={next}
        onCopy={copy}
        onToggleFavorite={toggleFavorite}
      />

      <CopyToast show={copied} lang={lang} />
    </>
  );
}
