import type { Lang } from "./types";
import type { Category } from "./types";

type Keys =
  | "ready"
  | "tagline"
  | "cta"
  | "copied"
  | "history_title"
  | "favorites_title"
  | "clear"
  | "empty_history"
  | "empty_favorites"
  | "category"
  | "history_nav"
  | "favorites_nav"
  | "fav_add"
  | "fav_remove"
  | "no_current"
  | "cat_classic"
  | "cat_nerdy"
  | "cat_cheeky"
  | "cat_spicy"
  | "language"
  | "close"; // ⬅️ legg til disse

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

    category: "Kategori",
    history_nav: "Historikk",
    favorites_nav: "Favoritter",
    fav_add: "Legg til favoritt",
    fav_remove: "Fjern favoritt",
    no_current: "Ingen linje ennå",

    cat_classic: "Klassisk",
    cat_nerdy: "Nerdy",
    cat_cheeky: "Frekk",
    cat_spicy: "Spicy 18+",
    language: "Språk",
    close: "Lukk",
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

    category: "Category",
    history_nav: "History",
    favorites_nav: "Favorites",
    fav_add: "Add to favorites",
    fav_remove: "Remove favorite",
    no_current: "No compliment yet",

    cat_classic: "Classic",
    cat_nerdy: "Nerdy",
    cat_cheeky: "Cheeky",
    cat_spicy: "Spicy 18+",
    language: "Language",
    close: "Close",
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

    category: "Categoría",
    history_nav: "Historial",
    favorites_nav: "Favoritos",
    fav_add: "Añadir a favoritos",
    fav_remove: "Quitar de favoritos",
    no_current: "Aún no hay frase",

    cat_classic: "Clásico",
    cat_nerdy: "Nerdy",
    cat_cheeky: "Pícaro",
    cat_spicy: "Picante 18+",
    language: "Idioma",
    close: "Cerrar",
  },
  sw: {
    ready: "Uko tayari kwa mvuto kidogo?",
    tagline: "Flirting yenye ustaarabu, sentensi moja kwa wakati.",
    cta: "Nipe sifa",
    copied: "Imenakiliwa!",

    history_title: "Historia",
    favorites_title: "Vipendwa",
    clear: "Futa",
    empty_history: "Bado hakuna historia.",
    empty_favorites: "Bado hakuna vipendwa.",

    category: "Aina",
    history_nav: "Historia",
    favorites_nav: "Vipendwa",
    fav_add: "Ongeza kwenye vipendwa",
    fav_remove: "Ondoa kutoka vipendwa",
    no_current: "Bado hakuna sifa",

    cat_classic: "Klasiki",
    cat_nerdy: "Nerdy",
    cat_cheeky: "Kichokozi",
    cat_spicy: "Kali 18+",
    language: "Lugha",
    close: "Funga",
  },
  zh: {
    ready: "準備好來點魅力了嗎？",
    tagline: "有品味的曖昧，一次一句。",
    cta: "給我一句稱讚",
    copied: "已複製！",

    history_title: "歷史紀錄",
    favorites_title: "收藏",
    clear: "清除",
    empty_history: "目前沒有紀錄。",
    empty_favorites: "目前沒有收藏。",

    category: "分類",
    history_nav: "歷史",
    favorites_nav: "收藏",
    fav_add: "加入收藏",
    fav_remove: "從收藏移除",
    no_current: "目前沒有句子",

    cat_classic: "經典",
    cat_nerdy: "極客",
    cat_cheeky: "俏皮",
    cat_spicy: "火辣 18+",
    language: "語言",
    close: "關閉",
  },
};

export function t(lang: Lang, key: Keys): string {
  return UI[lang]?.[key] ?? UI.en[key];
}

export function catLabel(lang: Lang, cat: Category): string {
  switch (cat) {
    case "classic":
      return t(lang, "cat_classic");
    case "nerdy":
      return t(lang, "cat_nerdy");
    case "cheeky":
      return t(lang, "cat_cheeky");
    case "spicy":
      return t(lang, "cat_spicy");
  }
}
