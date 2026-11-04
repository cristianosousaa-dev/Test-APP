"use client";

import { useState } from "react";
import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import LogoLoop from "@/components/react-bits/LogoLoop";
import { Container } from "@/components/ui/Container";

const BRANDS: Brand[] = [
  "excel",
  "googleSheets",
  "outlook",
  "gmail",
  "whatsapp",
  "googleCalendar",
  "googleDrive",
  "stripe",
  "hubspot",
  "shopify",
  "slack",
  "teams",
  "notion",
  "calendly",
];
/* Portuguese tools without an open-licence logo: shown by name. */
const LOCAL = ["Moloni", "InvoiceXpress", "PHC", "Primavera", "MB WAY"];

const LOGOS = [
  ...BRANDS.map((b) => ({
    title: brandLabel(b),
    node: (
      <span className="tool-chip">
        <span className="grid size-8 place-items-center bg-white">
          <BrandIcon brand={b} className="size-[18px]" />
        </span>
        {brandLabel(b)}
      </span>
    ),
  })),
  ...LOCAL.map((l) => ({
    title: l,
    node: (
      <span className="tool-chip">
        <span className="grid size-8 place-items-center bg-nfill font-mono text-[9.5px] text-strong">
          {l.slice(0, 2).toUpperCase()}
        </span>
        {l}
      </span>
    ),
  })),
];

/** Proof of fit: the programs the application connects to. Stoppable (WCAG 2.2.2). */
export function Tools() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      aria-labelledby="tools-title"
      className="night relative overflow-x-clip border-t border-nline pt-10 pb-16"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)] lg:gap-10">
          <div>
            <p id="tools-title" className="kicker-n max-w-[18rem] text-[10.5px] leading-[1.7]">
              Liga-se aos programas que a sua empresa já utiliza
            </p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              className="kicker-n mt-3 inline-flex h-11 items-center gap-2 text-[10.5px] text-ntext transition-colors hover:text-strong motion-reduce:hidden"
            >
              {paused ? "Continuar movimento" : "Pausar movimento"}
            </button>
          </div>
          <LogoLoop
            logos={LOGOS}
            speed={paused ? 0 : 42}
            gap={10}
            logoHeight={44}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--stage-base)"
            fadeOutWidth={80}
            ariaLabel="Programas e serviços com que a Orchestr se liga"
          />
        </div>
      </Container>
    </section>
  );
}
