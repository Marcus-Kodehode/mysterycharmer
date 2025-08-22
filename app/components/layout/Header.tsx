"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAppState } from "../core/AppState";
import LanguageMenu from "../menus/LanguageMenu";
import CategoryMenu from "../menus/CategoryMenu";
import MobileMenu from "./MobileMenu";
import BrandTitle from "../brand/BrandTitle";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { favCount, history } = useAppState();

  return (
    <header className="relative z-50 border-b border-white/10 bg-black/10 backdrop-blur header-glass">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
        {/* Logo + wordmark */}
        <Link href="/" aria-label="Home" className="flex items-center gap-2 mr-auto">
          <Image
            src="/images/icons/logo1.png" // favicon/ikonet ditt
            alt="mysterycharmer"
            width={40}
            height={40}
            className="w-9 h-9 md:w-10 md:h-10 rounded-2xl ring-1 ring-white/10 shadow-[0_6px_24px_rgba(255,80,120,.25)]"
            priority
          />
          {/* Vis wordmark også på mobil – men i litt mindre størrelse */}
          <BrandTitle className="text-[15px] sm:text-[17px] md:text-[18px]" />
        </Link>

        {/* Desktop-nav */}
        <nav className="hidden md:flex items-center gap-3">
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

        {/* Hamburger – KUN mobil */}
        <div className="md:hidden">
          <button
            type="button"
            className="btn btn-ghost px-3 py-2 text-sm"
            aria-label={open ? "Lukk meny" : "Åpne meny"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
