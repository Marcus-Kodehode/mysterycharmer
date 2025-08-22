"use client";

import Link from "next/link";
import { useAppState } from "./AppState";

export default function Header() {
  const { lang, setLang, tone, setTone, isFav, toggleFavorite, favCount, current } = useAppState();

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <Link href="/" className="text-lg tracking-wide mr-auto">
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        {/* Tone slider (kompakt) */}
        <div className="hidden md:flex items-center gap-2 card py-2 px-3">
          <span className="text-xs text-zinc-400">Tone</span>
          <input
            aria-label="Tone"
            type="range"
            min={0}
            max={3}
            value={tone}
            onChange={(e) => setTone(Number(e.target.value) as 0 | 1 | 2 | 3)}
            className="w-36"
          />
          <span className="text-xs tabular-nums">{tone}</span>
        </div>

        {/* Språk */}
        <div className="flex items-center gap-2">
          <button
            className={`btn ${lang === "no" ? "btn-primary" : "btn-ghost"} px-3 py-2 text-xs`}
            onClick={() => setLang("no")}
          >
            NO
          </button>
          <button
            className={`btn ${lang === "en" ? "btn-primary" : "btn-ghost"} px-3 py-2 text-xs`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>

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
