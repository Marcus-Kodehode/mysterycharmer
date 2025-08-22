"use client";

type Variant = "wordmark" | "mark" | "lockup";

export default function Logo({
  variant = "wordmark",
  size = 24,
  className = "",
}: {
  variant?: Variant;
  size?: number;          // px for marken
  className?: string;     // ekstra klasser på wrapper
}) {
  const Mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      className="shrink-0"
    >
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff6b9e" />
          <stop offset="1" stopColor="#e32d6b" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#lg)" />
      <path
        d="M32 44c-6-4-14-10-14-17 0-4 3-8 8-8 3 0 5 1 6 3 1-2 3-3 6-3 5 0 8 4 8 8 0 7-8 13-14 17z"
        fill="#fff"
      />
      <path
        d="M46 17l1.2 3.2L50 21.4l-2.8 1.2L46 26l-1.2-3.4-2.8-1.2 2.8-1.2L46 17z"
        fill="#fff"
      />
    </svg>
  );

  const Word = (
    <span className="inline-flex items-baseline gap-0.5 font-semibold tracking-wide">
      <span>mystery</span>
      <span className="text-brand">charmer</span>
    </span>
  );

  if (variant === "mark") return Mark;

  if (variant === "lockup") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        {Mark}
        {Word}
      </span>
    );
  }

  // wordmark (default)
  return <span className={className}>{Word}</span>;
}
