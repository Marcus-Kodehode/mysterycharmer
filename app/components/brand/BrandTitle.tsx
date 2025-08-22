"use client";

type Props = {
  className?: string;
  gradient?: boolean;
};

export default function BrandTitle({ className, gradient = true }: Props) {
  return (
    <h1
      className={[
        "font-bold tracking-tight",
        "text-3xl sm:text-4xl md:text-5xl",
        gradient
          ? "bg-gradient-to-r from-rose-200 via-fuchsia-200 to-amber-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,140,170,.15)]"
          : "",
        className,
      ].join(" ")}
    >
      Mystery<span className="text-rose-300">Charmer</span>
    </h1>
  );
}
