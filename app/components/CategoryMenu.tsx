"use client";

import { useEffect, useRef, useState } from "react";
import { useAppState } from "./AppState";
import type { Category } from "@/lib/types";

const CATS: { value: Category; label: string; emoji: string }[] = [
  { value: "classic", label: "Classic",   emoji: "💌" },
  { value: "nerdy",   label: "Nerdy",     emoji: "🧠" },
  { value: "cheeky",  label: "Cheeky",    emoji: "😉" },
  { value: "spicy",   label: "Spicy 18+", emoji: "🌶️" },
];

export default function CategoryMenu() {
  const { category, setCategory } = useAppState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("click", onDoc); document.removeEventListener("keydown", onKey); };
  }, []);

  const current = CATS.find(c => c.value === category)!;

  return (
    <div ref={ref} className="relative">
      <button
        className="btn btn-ghost px-3 py-2 text-sm"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Category"
      >
        <span className="inline-flex items-center gap-2">
          <span aria-hidden>{current.emoji}</span>
          <span className="hidden md:inline">{current.label}</span>
          <span aria-hidden>▾</span>
        </span>
      </button>

      {open && (
        <div role="menu" className="absolute left-0 mt-2 min-w-48 card p-1">
          {CATS.map(item => (
            <button
              key={item.value}
              role="menuitem"
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2 ${item.value === category ? "bg-white/10" : ""}`}
              onClick={() => { setCategory(item.value); setOpen(false); }}
            >
              <span aria-hidden>{item.emoji}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
