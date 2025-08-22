"use client";

import { useAppState } from "./AppState";
import PageSection from "./PageSection";
import EmptyState from "./EmptyState";

export default function HistoryView() {
  const { history, lang, clearHistory } = useAppState();

  return (
    <PageSection>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">
          {lang === "no" ? "Historikk" : "History"}
        </h2>
        {history.length > 0 && (
          <button className="btn btn-ghost" onClick={clearHistory}>
            {lang === "no" ? "Tøm" : "Clear"}
          </button>
        )}
      </div>

      {!history.length ? (
        <EmptyState>{lang === "no" ? "Ingen historikk ennå." : "No history yet."}</EmptyState>
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
