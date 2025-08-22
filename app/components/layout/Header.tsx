"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppState } from "../core/AppState";
import LanguageMenu from "../menus/LanguageMenu";
import CategoryMenu from "../menus/CategoryMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favCount, history } = useAppState();

  return (
    <header className="border-b border-white/10 bg-black/10 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        {/* Hamburger kun på mobil */}
        <button
          className="md:hidden btn btn-ghost px-3 py-2 text-sm"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Logo / tittel alltid synlig */}
        <Link href="/" className="text-lg tracking-wide mr-auto" aria-label="Home">
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        {/* Alt av kontroller i header kun på DESKTOP */}
        <div className="hidden md:flex items-center gap-3">
          <CategoryMenu />
          <LanguageMenu />
          <Link href="/history" className="btn btn-ghost px-3 py-2 text-sm">🕘{history.length > 0 && <span className="ml-1 text-xs text-zinc-400">{history.length}</span>}</Link>
          <Link href="/favorites" className="btn btn-ghost px-3 py-2 text-sm">⭐{favCount > 0 && <span className="ml-1 text-xs text-zinc-400">{favCount}</span>}</Link>
        </div>
      </div>

      {/* Fullscreen mobilmeny */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
