import type { Lang } from "./types";

type Keys =
  | "ready"
  | "tagline"
  | "cta"
  | "copied"
  | "history_title"
  | "favorites_title"
  | "clear"
  | "empty_history"
  | "empty_favorites";

const UI: Record<Lang, Record<Keys, string>> = {
  no: {
    ready: "Klar for litt sjarm?",
    tagline: "Smakfull flørting, én linje av gangen.",
    cta: "Gi meg et kompliment",
    copied: "Kopiert!",
    history_title: "Historikk",
    favorites_title: "Favoritter",
    clear: "Tøm",
    empty_history: "Ingen historikk ennå.",
    empty_favorites: "Ingen favoritter ennå.",
  },
  en: {
    ready: "Ready for some charm?",
    tagline: "Tasteful flirting, one line at a time.",
    cta: "Give me a compliment",
    copied: "Copied!",
    history_title: "History",
    favorites_title: "Favorites",
    clear: "Clear",
    empty_history: "No history yet.",
    empty_favorites: "No favorites yet.",
  },
  es: {
    ready: "¿Listo/a para un poco de encanto?",
    tagline: "Coqueteo con gusto, una línea a la vez.",
    cta: "Dame un cumplido",
    copied: "¡Copiado!",
    history_title: "Historial",
    favorites_title: "Favoritos",
    clear: "Borrar",
    empty_history: "Sin historial por ahora.",
    empty_favorites: "Sin favoritos por ahora.",
  },
};

export function t(lang: Lang, key: Keys): string {
  return UI[lang]?.[key] ?? UI.en[key];
}
