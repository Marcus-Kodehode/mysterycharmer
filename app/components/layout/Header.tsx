"use client";

import Link from "next/link";
import { useState } from "react";
import { useAppState } from "../core/AppState";
import LanguageMenu from "../menus/LanguageMenu";
import CategoryMenu from "../menus/CategoryMenu";
import MobileMenu from "./MobileMenu";
import Logo from "../brand/Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favCount, history } = useAppState();

  return (
    <header className="relative z-50 border-b border-white/10 bg-black/10 backdrop-blur header-glass">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        <Link href="/" aria-label="Home" className="mr-auto">
        <Logo variant="wordmark" className="text-lg" />
        </Link>
        <Link href="/" className="text-lg tracking-wide" aria-label="Home">
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-3">
          <CategoryMenu />
          <LanguageMenu />
          <Link href="/history" className="btn btn-ghost px-3 py-2 text-sm">
            🕘{history.length > 0 && <span className="ml-1 text-xs text-zinc-400">{history.length}</span>}
          </Link>
          <Link href="/favorites" className="btn btn-ghost px-3 py-2 text-sm">
            ⭐{favCount > 0 && <span className="ml-1 text-xs text-zinc-400">{favCount}</span>}
          </Link>
        </div>

        <button
          className="md:hidden btn btn-ghost px-3 py-2 text-sm"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(v => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
