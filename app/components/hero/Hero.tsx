import { t } from "@/lib/i18n";
import { useAppState } from "../core/AppState";

export default function Hero() {
  const { lang } = useAppState();
  return (
    <>
      <h1 className="text-2xl sm:text-3xl tracking-wide">
        mystery<span className="text-brand-400">charmer</span>
      </h1>
      <p className="text-zinc-400 text-sm -mt-2">{t(lang, "tagline")}</p>
    </>
  );
}
