"use client";

import { useEffect, useMemo, useState } from "react";
import type { Compliment } from "@/lib/types";
import { loadCompliments } from "@/lib/compliments";
import { getFavorites } from "@/lib/storage";
import { useAppState } from "../../components/core/AppState";
import PageSection from "../../components/common/PageSection";
import EmptyState from "../../components/common/EmptyState";
import { t } from "@/lib/i18n";

export default function FavoritesView() {
  const { lang } = useAppState();
  const [all, setAll] = useState<Compliment[]>([]);
  const [favKeys, setFavKeys] = useState<string[]>([]);

  useEffect(() => {
    let alive = true;
    loadCompliments(lang)
      .then((data) => {
        if (!alive) return;
        setAll(data);
        setFavKeys(getFavorites());
      })
      .catch(() => {
        if (!alive) return;
        setAll([]);
        setFavKeys(getFavorites());
      });
    return () => {
      alive = false;
    };
  }, [lang]);

  const byKey = useMemo(() => new Map(all.map((c) => [c.key, c])), [all]);
  const favs = favKeys.map((k) => byKey.get(k)).filter(Boolean) as Compliment[];

  return (
    <PageSection>
      <h2 className="text-xl font-semibold mb-4">
        {t(lang, "favorites_title")}
      </h2>

      {!favs.length ? (
        <EmptyState>{t(lang, "empty_favorites")}</EmptyState>
      ) : (
        <ul className="space-y-3">
          {favs.map((c) => (
            <li key={c.key} className="card">
              <p className="text-sm">{c.text}</p>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
