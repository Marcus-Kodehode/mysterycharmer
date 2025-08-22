"use client";

import Link from "next/link";
import { useAppState } from "./AppState";
import LanguageMenu from "./LanguageMenu";
import ToneMenu from "./ToneMenu";

export default function Header() {
  const { isFav, toggleFavorite, favCount, current } = useAppState();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-lg tracking-wide mr-auto">
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        {/* Dropdowns */}
        <ToneMenu />
        <LanguageMenu />

        {/* Toggle favoritt for nåværende */}
        <button
          className="btn btn-ghost px-3 py-2 text-sm"
          onClick={toggleFavorite}
          disabled={!current}
          title={current ? (isFav ? "Remove favorite" : "Add to favorites") : "No compliment yet"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {/* Links */}
        <Link href="/history" className="btn btn-ghost px-3 py-2 text-sm" title="History">
          🕘
        </Link>
        <Link href="/favorites" className="btn btn-ghost px-3 py-2 text-sm" title="Favorites">
          ⭐ <span className="ml-1 text-xs text-zinc-400">{favCount}</span>
        </Link>
      </div>
    </header>
  );
}
