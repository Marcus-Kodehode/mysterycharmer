"use client";

import Link from "next/link";
import { useAppState } from "../core/AppState";
import LanguageMenu from "../menus/LanguageMenu";
import CategoryMenu from "../menus/CategoryMenu";
import { t } from "@/lib/i18n";

export default function Header() {
  const { lang, isFav, toggleFavorite, favCount, current, history } =
    useAppState();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <Link
          href="/"
          className="text-lg tracking-wide mr-auto"
          aria-label="Home"
        >
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        <CategoryMenu />
        <LanguageMenu />

        <button
          className="btn btn-ghost px-3 py-2 text-sm"
          onClick={toggleFavorite}
          disabled={!current}
          title={
            current
              ? isFav
                ? t(lang, "fav_remove")
                : t(lang, "fav_add")
              : t(lang, "no_current")
          }
          aria-label={
            current
              ? isFav
                ? t(lang, "fav_remove")
                : t(lang, "fav_add")
              : t(lang, "no_current")
          }
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        <Link
          href="/history"
          className="btn btn-ghost px-3 py-2 text-sm"
          title={t(lang, "history_nav")}
          aria-label={t(lang, "history_nav")}
        >
          🕘{" "}
          {history.length > 0 && (
            <span className="ml-1 text-xs text-zinc-400">{history.length}</span>
          )}
        </Link>
        <Link
          href="/favorites"
          className="btn btn-ghost px-3 py-2 text-sm"
          title={t(lang, "favorites_nav")}
          aria-label={t(lang, "favorites_nav")}
        >
          ⭐{" "}
          {favCount > 0 && (
            <span className="ml-1 text-xs text-zinc-400">{favCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
