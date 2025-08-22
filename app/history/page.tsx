"use client";

import { useAppState } from "../components/AppState";

export default function HistoryPage() {
  const { history, lang, clearHistory } = useAppState();
  const emptyText = lang === "no" ? "Ingen historikk ennå." : "No history yet.";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">{lang === "no" ? "Historikk" : "History"}</h2>
        <button className="btn btn-ghost" onClick={clearHistory}>
          {lang === "no" ? "Tøm" : "Clear"}
        </button>
      </div>

      {!history.length ? (
        <p className="text-zinc-400">{emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {history.map((h) => (
            <li key={`${h.id}-${h.ts}`} className="card flex items-center justify-between">
              <span className="text-sm">{h.text}</span>
              <span className="text-xs text-zinc-500">
                {new Date(h.ts).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
