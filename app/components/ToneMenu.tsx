"use client";

import { useEffect, useRef, useState } from "react";
import { useAppState } from "./AppState";
import type { Tone } from "@/lib/types";

// Plan for PNG-ikoner (legg disse når du har):
// /public/images/tone/0.png ... /public/images/tone/3.png
const TONES: { value: Tone; label: string; icon?: string; emoji: string }[] = [
  { value: 0, label: "Søt",    icon: "/images/tone/0.png", emoji: "🌸" },
  { value: 1, label: "Lekent", icon: "/images/tone/1.png", emoji: "🙂" },
  { value: 2, label: "Vittig",  icon: "/images/tone/2.png", emoji: "🧠" },
  { value: 3, label: "Cheeky", icon: "/images/tone/3.png", emoji: "😉" },
];

export default function ToneMenu() {
  const { tone, setTone } = useAppState();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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

  const current = TONES.find(t => t.value === tone) ?? TONES[1];

  return (
    <div ref={ref} className="relative">
      <button
        className="btn btn-ghost px-3 py-2 text-sm"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="Tone"
      >
        <span className="inline-flex items-center gap-2">
          {/* viser emoji alltid – PNG kan legges til uten å endre kode */}
          <span aria-hidden>{current.emoji}</span>
          <span className="hidden md:inline">{current.label}</span>
          <span className="text-xs">({tone})</span>
          <span aria-hidden>▾</span>
        </span>
      </button>

      {open && (
        <div role="menu" className="absolute left-0 mt-2 min-w-48 card p-1">
          {TONES.map(item => (
            <button
              key={item.value}
              role="menuitem"
              className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white/10 flex items-center gap-2 ${item.value === tone ? "bg-white/10" : ""}`}
              onClick={() => { setTone(item.value); setOpen(false); }}
            >
              <span aria-hidden>{item.emoji}</span>
              <span className="text-sm">{item.label}</span>
              <span className="ml-auto text-xs opacity-70">{item.value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
