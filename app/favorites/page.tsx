"use client";

import { useEffect, useMemo, useState } from "react";
import type { Compliment } from "@/lib/types";
import { useAppState } from "../components/AppState";
import { loadCompliments } from "@/lib/compliments";
import { getFavorites } from "@/lib/storage";

export default function FavoritesPage() {
  const { lang } = useAppState();
  const [allNo, setAllNo] = useState<Compliment[]>([]);
  const [allEn, setAllEn] = useState<Compliment[]>([]);
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    loadCompliments("no").then(setAllNo).catch(() => setAllNo([]));
    loadCompliments("en").then(setAllEn).catch(() => setAllEn([]));
    setFavIds(getFavorites());
  }, []);

  const allMap = useMemo(() => {
    const m = new Map<string, Compliment>();
    [...allNo, ...allEn].forEach((c) => m.set(c.id, c));
    return m;
  }, [allNo, allEn]);

  const favs = favIds.map((id) => allMap.get(id)).filter(Boolean) as Compliment[];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h2 className="text-xl font-semibold mb-4">{lang === "no" ? "Favoritter" : "Favorites"}</h2>

      {!favs.length ? (
        <p className="text-zinc-400">
          {lang === "no" ? "Ingen favoritter ennå." : "No favorites yet."}
        </p>
      ) : (
        <ul className="space-y-3">
          {favs.map((c) => (
            <li key={c.id} className="card">
              <p className="text-sm">{c.text}</p>
              <p className="text-xs text-zinc-500 mt-1">{c.lang.toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
