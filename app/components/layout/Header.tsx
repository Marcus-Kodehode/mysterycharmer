"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppState } from "../core/AppState";
import LanguageMenu from "../menus/LanguageMenu";
import CategoryMenu from "../menus/CategoryMenu";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favCount, history } = useAppState();

  // Lås scroll når mobilmeny er åpen
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = open ? "hidden" : prev || "";
    return () => {
      root.style.overflow = prev || "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/10 backdrop-blur header-glass">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        {/* Logo/brand */}
        <Link href="/" aria-label="mysterycharmer" className="mr-auto block">
          {/* Mobil: mark */}
          <Image
            src="/images/icons/logo1.png"
            alt="mysterycharmer"
            width={28}
            height={28}
            priority
            className="h-7 w-7 sm:hidden select-none"
          />
          {/* Desktop: ordmerke */}
          <Image
            src="/images/icons/logo2.png"
            alt="mysterycharmer"
            width={180}
            height={40}
            priority
            className="hidden sm:block h-8 w-auto select-none"
          />
        </Link>

        {/* Desktop-nav */}
        <nav className="hidden md:flex items-center gap-2">
          <CategoryMenu />
          <LanguageMenu />

          <Link href="/history" className="btn btn-ghost px-3 py-2 text-sm">
            🕘
            {history.length > 0 && (
              <span className="ml-1 text-xs text-zinc-400">{history.length}</span>
            )}
          </Link>

          <Link href="/favorites" className="btn btn-ghost px-3 py-2 text-sm">
            ⭐
            {favCount > 0 && (
              <span className="ml-1 text-xs text-zinc-400">{favCount}</span>
            )}
          </Link>
        </nav>

        {/* Mobil: hamburger */}
        <button
          className="md:hidden btn btn-ghost px-3 py-2 text-sm"
          aria-label={open ? "Lukk meny" : "Åpne meny"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Fullskjerms mobilmeny */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
