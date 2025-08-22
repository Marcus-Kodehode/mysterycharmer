"use client";
import { ReactNode } from "react";

export default function ComplimentCard({ children }: { children: ReactNode }) {
  return (
    <div className="card max-w-2xl w-full text-center" aria-live="polite">
      <p className="text-2xl sm:text-3xl leading-snug font-semibold">
        {children}
      </p>
    </div>
  );
}
