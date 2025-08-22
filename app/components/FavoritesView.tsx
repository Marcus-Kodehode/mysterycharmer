"use client";

import { useEffect, useMemo, useState } from "react";
import type { Compliment } from "@/lib/types";
import { loadCompliments } from "@/lib/compliments";
import { getFavorites } from "@/lib/storage";
import { useAppState } from "./AppState";
import PageSection from "./PageSection";
import EmptyState from "./EmptyState";

export default function FavoritesView() {
  const { lang } = useAppState();
  const [allNo, setAllNo] = useState<Compliment[]>([]);
  const [allEn, setAllEn] = useState<Compliment[]>([]);
  const [favIds, setFavIds] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    Promise.all([
      loadCompliments("no").catch(() => [] as Compliment[]),
      loadCompliments("en").catch(() => [] as Compliment[]),
    ]).then(([no, en]) => {
      if (!alive) return;
      setAllNo(no);
      setAllEn(en);
      setFavIds(getFavorites());
    });
    return () => { alive = false; };
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Compliment>();
    [...allNo, ...allEn].forEach(c => m.set(c.id, c));
    return m;
  }, [allNo, allEn]);

  const favs = favIds
    .map(id => byId.get(id))
    .filter(Boolean) as Compliment[];

  return (
    <PageSection>
      <h2 className="text-xl font-semibold mb-4">
        {lang === "no" ? "Favoritter" : "Favorites"}
      </h2>

      {!favs.length ? (
        <EmptyState>{lang === "no" ? "Ingen favoritter ennå." : "No favorites yet."}</EmptyState>
      ) : (
        <ul className="space-y-3">
          {favs.map(c => (
            <li key={c.id} className="card">
              <p className="text-sm">{c.text}</p>
              <p className="mt-2 text-xs text-zinc-500">{c.lang.toUpperCase()}</p>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
