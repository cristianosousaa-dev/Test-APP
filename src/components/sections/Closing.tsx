"use client";

import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { Magnetic } from "@/components/ui/Magnetic";
import { useMotionPreference } from "@/lib/motion-preference";
import { contactHref, nav, site, whatsappHref } from "@/lib/site";

/** Dark card that widens to the screen edges as it scrolls in: the page's last move. */
export function Closing() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 25%"] });
  // Clip instead of resizing: no layout work per frame.
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 5% 0% 5% round 48px)", "inset(0% 0% 0% 0% round 32px)"],
  );
  const textY = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const whatsapp = whatsappHref();

  return (
    <section id="contacto" aria-labelledby="contacto-title">
      <div ref={ref} className="px-3 sm:px-4">
        <motion.div
          data-nav-dark
          className="relative isolate overflow-hidden bg-ink text-white"
          style={enabled ? { clipPath: clip } : { borderRadius: 32 }}
        >
          {/* Slow coloured light inside the dark card. */}
          <div aria-hidden className="absolute inset-0 -z-10">
            <div className="absolute -top-1/3 left-[8%] size-[70vmax] max-w-none animate-drift-a rounded-full bg-[radial-gradient(closest-side,rgb(96_120_220/0.38),transparent)] motion-reduce:animate-none" />
            <div className="absolute -right-1/4 -bottom-1/2 size-[64vmax] animate-drift-b rounded-full bg-[radial-gradient(closest-side,rgb(70_170_130/0.28),transparent)] motion-reduce:animate-none" />
            <div className="grain absolute inset-0 opacity-[0.12] mix-blend-overlay" />
          </div>
          <Container>
            <motion.div
              className="max-w-[48rem] py-24 sm:py-36"
              style={enabled ? { y: textY } : undefined}
            >
              <h2
                id="contacto-title"
                className="text-[40px] leading-[1.04] font-medium tracking-[-0.035em] sm:text-[68px]"
              >
                Que tarefa gostava de nunca mais fazer?
              </h2>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.6] text-white/70 sm:text-[18px]">
                Diga-nos qual é. Numa conversa de 30 minutos mostramos-lhe como a automatizar e por
                onde faz sentido começar.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <LinkButton href={contactHref()} variant="light" size="lg" arrow>
                    {site.cta}
                  </LinkButton>
                </Magnetic>
                {whatsapp && (
                  <LinkButton
                    href={whatsapp}
                    variant="text"
                    className="h-14 px-4 text-white hover:text-white/70"
                    arrow
                  >
                    Falar no WhatsApp
                  </LinkButton>
                )}
              </div>
              <p className="mt-5 text-[13.5px] text-white/50">{site.ctaNote}</p>
            </motion.div>
          </Container>
        </motion.div>
      </div>

      <Container>
        <footer className="mt-14 flex flex-col gap-8 text-[14px] sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-[18rem]">
            <a href="#top" className="inline-block transition-opacity hover:opacity-70">
              <Logo />
            </a>
            <p className="mt-3 text-ink-2">Automações à medida para pequenas e médias empresas.</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-col gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="-mx-2 rounded-full px-2 py-1 text-ink-2 transition-colors hover:bg-white/60 hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-1">
            <a
              href={`mailto:${site.email}`}
              className="-mx-2 rounded-full px-2 py-1 text-ink-2 transition-colors hover:bg-white/60 hover:text-ink"
            >
              {site.email}
            </a>
            <span className="py-1 text-ink-2">Portugal</span>
            <span className="py-1 text-mute">© 2026 {site.name}</span>
          </div>
        </footer>
      </Container>
      <Wordmark />
    </section>
  );
}

/** The name, huge and faint, each letter rising into place as the page ends. */
function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const letters = [...site.name];
  return (
    <div ref={ref} aria-hidden className="mt-10 overflow-hidden px-3 select-none sm:px-4">
      <div className="flex justify-center pb-[1.5vw] text-[29vw] leading-[0.86] font-semibold tracking-[-0.07em] text-ink/[0.07]">
        {letters.map((l, i) => (
          <Letter
            // biome-ignore lint/suspicious/noArrayIndexKey: letters can repeat; order is fixed.
            key={i}
            letter={l}
            progress={scrollYProgress}
            range={[i * 0.08, 0.6 + i * 0.08]}
            enabled={enabled}
          />
        ))}
      </div>
    </div>
  );
}

function Letter({
  letter,
  progress,
  range,
  enabled,
}: {
  letter: string;
  progress: MotionValue<number>;
  range: [number, number];
  enabled: boolean;
}) {
  const y = useTransform(progress, range, ["70%", "0%"]);
  return (
    <motion.span className="inline-block" style={enabled ? { y } : undefined}>
      {letter}
    </motion.span>
  );
}
