"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAppState } from "../core/AppState";
import { t, catLabel } from "@/lib/i18n";
import type { Category, Lang } from "@/lib/types";

const CATS: { value: Category; emoji: string }[] = [
  { value: "classic", emoji: "💌" },
  { value: "nerdy", emoji: "🧠" },
  { value: "cheeky", emoji: "😉" },
  { value: "spicy", emoji: "🌶️" },
];

const LANGS: { code: Lang; label: string; icon: string }[] = [
  { code: "no", label: "Norsk", icon: "/images/icons/no.png" },
  { code: "en", label: "English", icon: "/images/icons/en.png" },
  { code: "es", label: "Español (MX)", icon: "/images/icons/es.png" },
  { code: "sw", label: "Kiswahili", icon: "/images/icons/tz.png" },
  { code: "zh", label: "繁體中文", icon: "/images/icons/tw.png" },
];

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const {
    lang,
    setLang,
    category,
    setCategory,
    favCount,
    history,
    isFav,
    toggleFavorite,
    current,
  } = useAppState();

  const [mounted, setMounted] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lås scroll når menyen er åpen
  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  // ESC for å lukke
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Rydd dropdowns når menyen lukkes
  useEffect(() => {
    if (!open) setOpenCat(false);
  }, [open]);

  if (!open || !mounted) return null;

  const activeCat = CATS.find((c) => c.value === category)!;

  const overlay = (
    <div
      className="fixed inset-0 z-40 md:hidden"
      aria-modal="true"
      role="dialog"
    >
      {/* Bakgrunn – solid + subtil brand-gradient (klikk bakgrunn lukker) */}
      <button
        onClick={onClose}
        aria-label={t(lang, "close")}
        className="absolute inset-0 bg-rose-950"
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(900px_600px_at_50%_-10%,hsl(var(--brand-600)/.28),transparent_50%)]" />

      {/* Innhold */}
      <div className="relative h-full pointer-events-none">
        {/* Close-knapp oppe til høyre */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-end p-4">
          <button
            className="pointer-events-auto btn btn-ghost px-4 py-2 text-sm"
            onClick={onClose}
          >
            ✕ {t(lang, "close")}
          </button>
        </div>

        {/* Meny-stack */}
        <div className="h-full max-w-sm mx-auto px-6 pt-16 pb-28 flex flex-col items-stretch justify-center gap-4 pointer-events-auto">
          {/* LOGO2 over knappene */}
          <div className="flex flex-col items-center -mt-2 mb-2">
            <Image
              src="/images/icons/logo2.png"
              alt="mysterycharmer"
              width={168}
              height={168}
              className="rounded-2xl ring-1 ring-white/10 shadow-2xl"
              priority
            />
          </div>

          {/* KATEGORI – trigger + dropdown */}
          <div className="relative">
            <button
              className="relative w-full px-4 py-3 rounded-xl text-base font-medium bg-rose-800/70 hover:bg-rose-800 transition flex items-center justify-center"
              onClick={() => setOpenCat((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={openCat}
              title={t(lang, "category")}
            >
              <span className="inline-flex items-center gap-2">
                <span aria-hidden>{activeCat.emoji}</span>
                {catLabel(lang, activeCat.value)}
              </span>
              <span className="absolute right-4" aria-hidden>
                ▾
              </span>
            </button>

            {openCat && (
              <div
                role="menu"
                className="mt-2 rounded-xl border border-white/10 bg-rose-900/60 backdrop-blur p-1"
              >
                {CATS.map((item) => (
                  <button
                    key={item.value}
                    role="menuitem"
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2 ${item.value === category ? "bg-white/10" : ""}`}
                    onClick={() => {
                      setCategory(item.value);
                      onClose();
                    }}
                  >
                    <span aria-hidden>{item.emoji}</span>
                    <span className="text-sm">
                      {catLabel(lang, item.value)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Historikk */}
          <Link
            href="/history"
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-base font-medium text-center bg-rose-800/70 hover:bg-rose-800 transition"
          >
            🕘 <span className="ml-1">{t(lang, "history_nav")}</span>
            {/* teller */}
          </Link>

          {/* Favoritter (liste) */}
          <Link
            href="/favorites"
            onClick={onClose}
            className="px-4 py-3 rounded-xl text-base font-medium text-center bg-rose-800/70 hover:bg-rose-800 transition"
          >
            ⭐ <span className="ml-1">{t(lang, "favorites_nav")}</span>
          </Link>

          {/* Favoritt-toggle for gjeldende linje */}
          <button
            onClick={() => {
              toggleFavorite();
              onClose();
            }}
            disabled={!current}
            className="px-4 py-3 rounded-xl text-base font-medium text-center bg-white/10 hover:bg-white/15 disabled:opacity-50 transition"
            title={
              current
                ? isFav
                  ? t(lang, "fav_remove")
                  : t(lang, "fav_add")
                : t(lang, "no_current")
            }
          >
            {isFav ? "❤️" : "🤍"}{" "}
            {current
              ? isFav
                ? t(lang, "fav_remove")
                : t(lang, "fav_add")
              : t(lang, "no_current")}
          </button>

          {/* SPRÅK – kompakt flagg-toggle (ikke dropdown) */}
          <div className="mt-2">
            <div
              className="mx-auto w-full max-w-xs rounded-full bg-white/5 ring-1 ring-white/10 p-1
               flex items-center justify-center gap-1 overflow-x-auto"
            >
              {LANGS.map((L) => {
                const active = L.code === lang;
                return (
                  <button
                    key={L.code}
                    type="button"
                    onClick={() => setLang(L.code)} // menyen forblir åpen
                    aria-pressed={active}
                    aria-label={L.label}
                    className={[
                      "h-8 w-8 rounded-full overflow-hidden flex items-center justify-center",
                      "ring-1 transition",
                      active
                        ? "ring-rose-300/60 bg-rose-800/40"
                        : "ring-white/10 hover:bg-white/10 opacity-70 hover:opacity-100",
                    ].join(" ")}
                  >
                    <Image
                      src={L.icon}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-full"
                      priority={false}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* LOGO1 nederst */}
          <div className="flex justify-center mt-4">
            <Image
              src="/images/icons/logo1.png"
              alt="mysterycharmer"
              width={60}
              height={60}
              className="rounded-full ring-1 ring-white/10 shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
