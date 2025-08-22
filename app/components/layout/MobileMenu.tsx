"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppState } from "../core/AppState";
import { t, catLabel } from "@/lib/i18n";
import type { Category, Lang } from "@/lib/types";

const CATS: { value: Category; emoji: string }[] = [
  { value: "classic", emoji: "💌" },
  { value: "nerdy",   emoji: "🧠" },
  { value: "cheeky",  emoji: "😉" },
  { value: "spicy",   emoji: "🌶️" },
];

const LANGS: { code: Lang; label: string; icon: string }[] = [
  { code: "no", label: "Norsk",     icon: "/images/icons/no.png" },
  { code: "en", label: "English",   icon: "/images/icons/en.png" },
  { code: "es", label: "Español",   icon: "/images/icons/es.png" },
  { code: "sw", label: "Kiswahili", icon: "/images/icons/tz.png" } // sørg for at tz.png finnes
];

function nextLang(current: Lang): Lang {
  const idx = LANGS.findIndex(l => l.code === current);
  return LANGS[(idx + 1) % LANGS.length].code;
}

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    lang, setLang,
    category, setCategory,
    favCount, history,
    isFav, toggleFavorite, current,
  } = useAppState();

  // Lås bakgrunnsrulling når åpen
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  // ESC lukker
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const activeLang = LANGS.find(l => l.code === lang)!;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-zinc-900"
    >
      {/* Close øverst til høyre */}
      <div className="absolute top-4 right-4">
        <button className="btn btn-ghost px-4 py-2 text-sm" onClick={onClose}>
          ✕ {t(lang, "close")}
        </button>
      </div>

      {/* Vertikal knappe-stabel (midt på skjermen) */}
      <div className="h-full max-w-sm mx-auto px-6 flex flex-col items-stretch justify-center gap-3">
        {/* Brand liten tittel øverst i stacken (valgfritt) */}
        <div className="text-center mb-2 text-sm text-zinc-400">
          mystery<span className="text-brand-400">charmer</span>
        </div>

        {/* KATEGORIER – fire store knapper */}
        {CATS.map(item => (
          <button
            key={item.value}
            className={`px-4 py-3 rounded-xl text-base font-medium transition
                        ${item.value === category ? "bg-white/15" : "bg-teal-700/70 hover:bg-teal-700"}`}
            onClick={() => { setCategory(item.value); onClose(); }}
          >
            <span className="mr-2" aria-hidden>{item.emoji}</span>
            {catLabel(lang, item.value)}
          </button>
        ))}

        {/* HISTORIKK */}
        <Link
          href="/history"
          onClick={onClose}
          className="px-4 py-3 rounded-xl text-base font-medium text-center bg-teal-700/70 hover:bg-teal-700"
        >
          🕘 <span className="ml-1">{t(lang, "history_nav")}</span>
          {history.length > 0 && <span className="ml-2 text-xs text-zinc-200">({history.length})</span>}
        </Link>

        {/* FAVORITTER (liste-side) */}
        <Link
          href="/favorites"
          onClick={onClose}
          className="px-4 py-3 rounded-xl text-base font-medium text-center bg-teal-700/70 hover:bg-teal-700"
        >
          ⭐ <span className="ml-1">{t(lang, "favorites_nav")}</span>
          {favCount > 0 && <span className="ml-2 text-xs text-zinc-200">({favCount})</span>}
        </Link>

        {/* FAVORITT-TOGGLE (for aktuell linje) */}
        <button
          onClick={() => { toggleFavorite(); onClose(); }}
          disabled={!current}
          className="px-4 py-3 rounded-xl text-base font-medium text-center bg-white/15 hover:bg-white/20 disabled:opacity-50"
          title={current ? (isFav ? t(lang, "fav_remove") : t(lang, "fav_add")) : t(lang, "no_current")}
        >
          {isFav ? "❤️" : "🤍"}{" "}
          {current ? (isFav ? t(lang, "fav_remove") : t(lang, "fav_add")) : t(lang, "no_current")}
        </button>

        {/* SPRÅK (enkelt – trykk for å sykle) */}
        <button
          onClick={() => { setLang(nextLang(lang)); onClose(); }}
          className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10"
          title={t(lang, "language")}
        >
          <Image src={activeLang.icon} alt={activeLang.label} width={20} height={14} className="rounded-sm" />
          <span className="text-sm">{activeLang.label}</span>
        </button>
      </div>
    </div>
  );
}
