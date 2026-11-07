import type { Metadata, Viewport } from "next";
import { Martian_Mono, Mona_Sans } from "next/font/google";
import localFont from "next/font/local";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { isLive, site } from "@/lib/site";
import "./globals.css";
import "./refinements.css";
import "./themes.css";
import "./polish.css";
import "./safira.css";

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

const TITLE = `${site.name} | Software à medida e automação para empresas`;

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
  themeColor: "#0a0f18",
  colorScheme: "light dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Keep rendering per request: Next must stamp its scripts with the proxy's CSP nonce.
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html
      lang="pt-PT"
      data-theme="dark"
      suppressHydrationWarning
      className={`${mona.variable} ${mono.variable} ${nohemi.variable}`}
    >
      <head>
        <script nonce={nonce}>
          {
            "try{var t=localStorage.getItem('orchestr-theme')||localStorage.getItem('theme');document.documentElement.dataset.theme=t==='light'||t==='dark'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.theme='dark'}"
          }
        </script>
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
