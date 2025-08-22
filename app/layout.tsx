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
      <body className="h-dvh overflow-hidden text-[hsl(var(--text))] antialiased">
        <AppStateProvider>
          <div className="grid h-full grid-rows-[auto_1fr_auto]">
            <Header />
            <main id="content" className="min-h-0 overflow-y-auto">{children}</main>
            <Footer />
          </div>
        </AppStateProvider>
      </body>
    </html>
  );
}
