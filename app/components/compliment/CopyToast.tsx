"use client";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/types";

export default function CopyToast({
  show,
  lang,
}: {
  show: boolean;
  lang: Lang;
}) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 card px-3 py-2 text-sm">
      {t(lang, "copied")}
    </div>
  );
}
