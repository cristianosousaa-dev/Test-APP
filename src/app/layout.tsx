import type { Metadata, Viewport } from "next";
import { Martian_Mono, Mona_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

/* Mona Sans: one variable family. Expanded width for display, normal width for reading. */
const mona = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

/* Martian Mono: technical labels only (kickers, statuses, step counters). */
const mono = Martian_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Automação de processos para PME`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${mona.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Scroll reveals hide content only when JS is available to show it again. */}
        <script>{"document.documentElement.classList.add('js')"}</script>
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:text-accent-ink"
        >
          Saltar para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
