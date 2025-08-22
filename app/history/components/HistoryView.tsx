"use client";

import { useAppState } from "../../components/core/AppState";
import PageSection from "../../components/common/PageSection";
import EmptyState from "../../components/common/EmptyState";
import { t } from "@/lib/i18n";

export default function HistoryView() {
  const { history, lang, clearHistory } = useAppState();

  return (
    <PageSection>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{t(lang, "history_title")}</h2>
        {history.length > 0 && (
          <button className="btn btn-ghost" onClick={clearHistory}>{t(lang, "clear")}</button>)}
      </div>

      {!history.length ? (
        <EmptyState>{t(lang, "empty_history")}</EmptyState>
      ) : (
        <ul className="space-y-3">
          {history.map(h => (
            <li key={`${h.key}-${h.ts}`} className="card">
              <p className="text-sm">{h.text}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-zinc-500">
                <span>{h.lang.toUpperCase()}</span>
                <time dateTime={new Date(h.ts).toISOString()}>
                  {new Date(h.ts).toLocaleString()}
                </time>
              </div>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}
