import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "mysterycharmer",
  description: "Tasteful, flirty compliments at the tap of a button.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={inter.className}>
      <body className="min-h-dvh bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 antialiased">
        {/* Skip link for tastatur/leselist */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn btn-primary"
        >
          Hopp til innhold
        </a>

        <div className="min-h-dvh flex flex-col">
          <Header />
          <main id="content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
