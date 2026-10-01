import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

const mona = Mona_Sans({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-mona",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Automações à medida para o seu negócio`,
  description: site.description,
  openGraph: {
    title: `${site.name} — Automações à medida para o seu negócio`,
    description: site.description,
    locale: "pt_PT",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f4ef",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={mona.variable} suppressHydrationWarning>
      <head>
        {/* Scroll reveals hide content only when JS is available to show it again. */}
        <script>{"document.documentElement.classList.add('js')"}</script>
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-white"
        >
          Saltar para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
