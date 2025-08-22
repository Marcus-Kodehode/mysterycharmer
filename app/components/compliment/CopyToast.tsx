"use client";

export default function CopyToast({ show, lang }: { show: boolean; lang: "no" | "en" }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 card px-3 py-2 text-sm">
      {lang === "no" ? "Kopiert!" : "Copied!"}
    </div>
  );
}
