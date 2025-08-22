"use client";

import { useAppState } from "../core/AppState";
import { t } from "@/lib/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useAppState();

  return (
    <footer className="relative z-50 border-t border-white/10 footer-glass">
      <div className="x-auto max-w-4xl px-4 py-6 text-xs text-zinc-500 flex items-center justify-between">
        <p>© {year} mysterycharmer</p>
        <p>{t(lang, "tagline")}</p>
      </div>
    </footer>
  );
}
