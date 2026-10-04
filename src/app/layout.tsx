import type { Metadata, Viewport } from "next";
import { Martian_Mono, Mona_Sans } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { isLive, site } from "@/lib/site";
import "./globals.css";

/* Mona Sans: one variable family. Light display weights, regular for reading, semibold labels. */
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

/* Nohemi (variable, 100–900): headlines only. Supplied by the client; licence: verify before launch. */
const nohemi = localFont({
  src: "./fonts/Nohemi-VF.ttf",
  weight: "100 900",
  variable: "--font-nohemi",
  display: "swap",
});

const TITLE = `${site.name} | Automação de processos para PME em Portugal`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: TITLE, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // Preview deploys (no real domain yet) stay out of search results.
  robots: isLive ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: TITLE,
    description: site.description,
    url: "/",
    siteName: site.name,
    locale: "pt_PT",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: TITLE, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Set by src/proxy.ts; the CSP only lets scripts carrying this nonce run.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html
      lang="pt-PT"
      className={`${mona.variable} ${mono.variable} ${nohemi.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Scroll reveals hide content only when JS is available to show it again. */}
        <script nonce={nonce}>{"document.documentElement.classList.add('js')"}</script>
      </head>
      <body className="min-h-dvh">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-accent focus:px-4 focus:py-2 focus:text-[14px] focus:text-white"
        >
          Saltar para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
