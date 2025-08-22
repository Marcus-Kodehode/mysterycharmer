"use client";

import { useEffect, useRef, useState } from "react";
import { useAppState } from "./AppState";

const LANGS = [
  { code: "no" as const, label: "Norsk", short: "NO", icon: "/images/flags/no.png" },
  { code: "en" as const, label: "English", short: "EN", icon: "/images/flags/en.png" },
];

export default function LanguageMenu() {
  const { lang, setLang } = useAppState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close on outside/Escape
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const current = LANGS.find(l => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        className="btn btn-ghost px-3 py-2 text-sm"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* ikon + short label */}
        <span className="inline-flex items-center gap-2">
          <img src={current.icon} alt="" width={16} height={12} className="rounded-sm" />
          <span>{current.short}</span>
          <span aria-hidden>▾</span>
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 min-w-40 card p-1"
        >
          {LANGS.map(item => (
            <button
              key={item.code}
              role="menuitem"
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2 ${item.code === lang ? "bg-white/10" : ""}`}
              onClick={() => { setLang(item.code); setOpen(false); }}
            >
              <img src={item.icon} alt="" width={18} height={12} className="rounded-sm" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
