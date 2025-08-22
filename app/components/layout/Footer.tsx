export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-4xl px-4 py-6 text-xs text-zinc-500 flex items-center justify-between">
        <p>© {year} mysterycharmer</p>
        <p>Tasteful flirting, one line at a time.</p>
      </div>
    </footer>
  );
}
