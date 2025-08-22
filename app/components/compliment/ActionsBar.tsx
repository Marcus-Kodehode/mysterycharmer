"use client";

type Props = {
  disabled: boolean;
  hasCurrent: boolean;
  isFav: boolean;
  lang: "no" | "en";
  onNext: () => void;
  onCopy: () => void;
  onToggleFavorite: () => void;
};

export default function ActionsBar({
  disabled, hasCurrent, isFav, lang, onNext, onCopy, onToggleFavorite,
}: Props) {
  return (
    <div className="w-full max-w-2xl flex items-center gap-2">
      <button className="btn btn-primary w-full" onClick={onNext} disabled={disabled}>
        {lang === "no" ? "Gi meg et kompliment" : "Give me a compliment"}
      </button>
      <button className="btn btn-ghost" onClick={onCopy} aria-label="Copy" disabled={!hasCurrent}>📋</button>
      <button className="btn btn-ghost" onClick={onToggleFavorite} aria-label="Favorite" disabled={!hasCurrent}>
        {isFav ? "❤️" : "🤍"}
      </button>
    </div>
  );
}
