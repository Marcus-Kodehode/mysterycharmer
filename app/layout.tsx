import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AppStateProvider } from "./components/core/AppState";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={inter.className}>
      {/* Lås høyde til viewport, og la KUN main scrolle */}
      <body className="h-dvh overflow-hidden bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn btn-primary">
          Hopp til innhold
        </a>

        <AppStateProvider>
          {/* 3-raders grid: header / main / footer */}
          <div className="grid h-full grid-rows-[auto_1fr_auto]">
            <Header />
            {/* min-h-0 er VIKTIG for at overflow skal fungere i grid */}
            <main id="content" className="min-h-0 overflow-y-auto">
              {children}
            </main>
            <Footer />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
