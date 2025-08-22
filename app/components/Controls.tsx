"use client";

type Props = {
  onNext: () => void;
  onCopy: () => void;
  onFav: () => void;
  isFav: boolean;
  lang: "no" | "en";
  tone: number;
  onTone: (t: number) => void;
  onLang: (l: "no" | "en") => void;
};

export default function Controls({
  onNext, onCopy, onFav, isFav, lang, tone, onTone, onLang,
}: Props) {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button className="btn btn-primary w-full" onClick={onNext}>
          {lang === "no" ? "Gi meg et kompliment" : "Give me a compliment"}
        </button>
        <button className="btn btn-ghost" onClick={onCopy} aria-label="Copy">
          📋
        </button>
        <button className="btn btn-ghost" onClick={onFav} aria-label="Favorite">
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="card flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3 grow">
          <label className="text-sm text-zinc-300">
            {lang === "no" ? "Tone" : "Tone"}
          </label>
          <input
            type="range"
            min={0}
            max={3}
            value={tone}
            onChange={(e) => onTone(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm tabular-nums">{tone}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`btn ${lang === "no" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => onLang("no")}
          >
            NO
          </button>
          <button
            className={`btn ${lang === "en" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => onLang("en")}
          >
            EN
          </button>
        </div>
      </div>
    </div>
  );
}
