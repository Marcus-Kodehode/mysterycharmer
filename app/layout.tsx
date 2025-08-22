import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "mysterycharmer",
  description: "Tasteful, flirty compliments at the tap of a button.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh font-sans bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
