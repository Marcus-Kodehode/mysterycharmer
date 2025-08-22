"use client";

import { cn } from "@/lib/utils"; // if you don't have a cn helper, just remove cn() and pass strings directly

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function ComplimentCard({ children, className }: Props) {
  return (
    <div
      className={cn(
        // gradient edge via outer padding + inner panel
        "relative p-[2px] rounded-2xl bg-gradient-to-br from-rose-400/40 via-fuchsia-400/40 to-amber-300/40 shadow-[0_0_80px_rgba(255,90,150,.12)]",
        className
      )}
    >
      <div
        className={cn(
          "relative rounded-[1rem] bg-zinc-950/60 backdrop-blur-xl",
          "ring-1 ring-white/10",
          "px-6 sm:px-8 py-8 sm:py-10 min-h-[96px]",
          "flex items-center justify-center text-center"
        )}
      >
        {/* watermark quote marks */}
        <span
          aria-hidden
          className="ppointer-events-none select-none absolute top-2 left-3 text-5xl sm:text-7xl font-serif text-rose-300/10"
        >
          “
        </span>
        <span
          aria-hidden
          className="pointer-events-none select-none absolute right-3 bottom-0 translate-y-2 sm:translate-y-8 text-5xl sm:text-7xl font-serif text-rose-300/10"
        >
          ”
        </span>

        {/* sheen overlay */}
        <div className="sheen pointer-events-none absolute inset-0 rounded-[1rem]"></div>

        <p className="max-w-2xl text-lg sm:text-xl md:text-2xl font-semibold leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
}
