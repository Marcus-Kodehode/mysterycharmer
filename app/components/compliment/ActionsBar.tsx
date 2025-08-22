"use client";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

type Props = {
  disabled: boolean;
  hasCurrent: boolean;
  isFav: boolean;
  lang: Lang;
  onNext: () => void;
  onCopy: () => void;
  onToggleFavorite: () => void;
};

export default function ActionsBar({
  disabled,
  hasCurrent,
  isFav,
  lang,
  onNext,
  onCopy,
  onToggleFavorite,
}: Props) {
  return (
    <div className="w-full max-w-2xl flex items-center gap-2">
      <button
        className="btn btn-primary w-full"
        onClick={onNext}
        disabled={disabled}
      >
        {t(lang, "cta")}
      </button>
      <button
        className="btn btn-ghost"
        onClick={onCopy}
        aria-label="Copy"
        disabled={!hasCurrent}
      >
        📋
      </button>
      <button
        className="btn btn-ghost"
        onClick={onToggleFavorite}
        aria-label="Favorite"
        disabled={!hasCurrent}
      >
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
