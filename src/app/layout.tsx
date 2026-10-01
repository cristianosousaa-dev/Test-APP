import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { MotionPreferenceProvider } from "@/lib/motion-preference";
import { site } from "@/lib/site";
import "./globals.css";

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
  themeColor: "#fbfbfc",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-PT" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <noscript>
          <style>{".reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[14px] focus:text-white"
        >
          Saltar para o conteúdo
        </a>
        <MotionPreferenceProvider>{children}</MotionPreferenceProvider>
      </body>
    </html>
  );
}
