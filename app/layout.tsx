import { Inter } from "next/font/google";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { AppStateProvider } from "./components/core/AppState";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={inter.className}>
      <body className="min-h-dvh bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 antialiased">
        <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 btn btn-primary">
          Hopp til innhold
        </a>

        <AppStateProvider>
          <div className="min-h-dvh flex flex-col">
            <Header />
            <main id="content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
