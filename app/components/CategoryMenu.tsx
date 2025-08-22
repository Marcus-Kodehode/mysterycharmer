"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useAppState } from "./AppState";
import type { Category } from "@/lib/types";

// Legg PNG’er i /public/images/icons/
//  - cat-classic.png
//  - cat-nerdy.png
//  - cat-cheeky.png
//  - cat-spicy.png
const CATS: { value: Category; label: string; emoji: string; icon: string }[] = [
  { value: "classic", label: "Classic", emoji: "💌", icon: "/images/icons/cat-classic.png" },
  { value: "nerdy",   label: "Nerdy",   emoji: "🧠", icon: "/images/icons/cat-nerdy.png" },
  { value: "cheeky",  label: "Cheeky",  emoji: "😉", icon: "/images/icons/cat-cheeky.png" },
  { value: "spicy",   label: "Spicy 18+", emoji: "🌶️", icon: "/images/icons/cat-spicy.png" },
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
          <Image src={current.icon} alt="" width={16} height={16} />
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
              <Image src={item.icon} alt="" width={18} height={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
