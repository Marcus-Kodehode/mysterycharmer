"use client";

import Hero from "./components/Hero";
import ComplimentMachine from "./components/ComplimentMachine";

export default function Page() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 min-h-[calc(100dvh-120px)] flex flex-col items-center justify-center gap-8">
      <Hero />
      <ComplimentMachine />
    </section>
  );
}
