import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/10 border-b border-white/10">
      <div className="mx-auto max-w-4xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-wide">
          mystery<span className="text-brand-400">charmer</span>
        </Link>

        <nav className="text-sm text-zinc-400">
          <span className="hidden sm:inline">
            Classy&nbsp;&gt;&nbsp;Cringy
          </span>
        </nav>
      </div>
    </header>
  );
}
