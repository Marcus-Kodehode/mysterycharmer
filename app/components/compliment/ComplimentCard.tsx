"use client";
import { ReactNode } from "react";

export default function ComplimentCard({ children }: { children: ReactNode }) {
  return (
    <div className="card quote-card w-full max-w-3xl">
      <p className="quote-text text-center text-2xl sm:text-3xl leading-snug font-semibold tracking-tight">
        “{children}”
      </p>
    </div>
  );
}
