"use client";

import BrandTitle from "../brand/BrandTitle";
import { useAppState } from "../core/AppState";
import { t } from "@/lib/i18n";

export default function Hero() {
  const { lang } = useAppState();
  return (
    <div className="text-center space-y-3 pt-2 sm:pt-4">
      <BrandTitle className="mx-auto" />
      <p className="text-zinc-300/85 text-sm sm:text-base">
        {t(lang, "tagline")}
      </p>
    </div>
  );
}
