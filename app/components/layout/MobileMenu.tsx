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
  { code: "no", label: "Norsk",    icon: "/images/icons/no.png" },
  { code: "en", label: "English",  icon: "/images/icons/en.png" },
  { code: "es", label: "Español",  icon: "/images/icons/es.png" },
  { code: "sw", label: "Kiswahili",icon: "/images/icons/tz.png" },
];

export default function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang, setLang, category, setCategory, favCount, history } = useAppState();

  // Lås bakgrunnsrulling når menyen er åpen (safety selv om body allerede er hidden)
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* backdrop */}
      <button onClick={onClose} aria-label={t(lang, "close")} className="absolute inset-0 bg-black/50" />
      {/* panel */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-zinc-950/95 border-l border-white/10 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-zinc-400">mystery<span className="text-brand-400">charmer</span></span>
          <button className="btn btn-ghost px-3 py-2 text-sm" onClick={onClose}>{t(lang, "close")}</button>
        </div>

        {/* Kategori */}
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500 mb-2">{t(lang, "category")}</div>
          <div className="grid grid-cols-1 gap-1">
            {CATS.map(item => (
              <button
                key={item.value}
                className={`w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-2 ${item.value === category ? "bg-white/10" : ""}`}
                onClick={() => { setCategory(item.value); onClose(); }}
              >
                <span aria-hidden>{item.emoji}</span>
                <span className="text-sm">{catLabel(lang, item.value)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Språk */}
        <div className="mb-4">
          <div className="text-xs uppercase tracking-wide text-zinc-500 mb-2">{t(lang, "language")}</div>
          <div className="grid grid-cols-1 gap-1">
            {LANGS.map(L => (
              <button
                key={L.code}
                className={`w-full px-3 py-2 rounded-lg text-left hover:bg-white/10 flex items-center gap-3 ${L.code === lang ? "bg-white/10" : ""}`}
                onClick={() => { setLang(L.code); onClose(); }}
              >
                <Image src={L.icon} alt={L.label} width={18} height={12} className="rounded-sm" />
                <span className="text-sm">{L.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lenker */}
        <div className="grid grid-cols-1 gap-2">
          <Link href="/history" className="btn btn-ghost justify-start">
            🕘 <span className="ml-2">{t(lang, "history_nav")}</span>
            {history.length > 0 && <span className="ml-auto text-xs text-zinc-400">{history.length}</span>}
          </Link>
          <Link href="/favorites" className="btn btn-ghost justify-start">
            ⭐ <span className="ml-2">{t(lang, "favorites_nav")}</span>
            {favCount > 0 && <span className="ml-auto text-xs text-zinc-400">{favCount}</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}
