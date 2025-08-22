"use client";

export default function BrandTitle({ className = "" }: { className?: string }) {
  return (
    <span
      className={[
        "inline-flex items-baseline gap-0.5 font-extrabold tracking-tight leading-none select-none",
        "wordmark", // valgfritt navn hvis du vil style i CSS senere
        className,
      ].join(" ")}
    >
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-200 to-rose-300 drop-shadow-[0_1px_8px_rgba(255,120,150,.25)]">
        Mystery
      </span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-400 to-rose-600">
        Charmer
      </span>
    </span>
  );
}
