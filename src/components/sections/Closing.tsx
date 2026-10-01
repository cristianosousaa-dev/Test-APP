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
          <Container className="grid items-center gap-12 py-24 sm:py-32 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
            <motion.div className="max-w-[48rem]" style={enabled ? { y: textY } : undefined}>
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
            <Takeaways enabled={enabled} />
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

const TAKEAWAYS = [
  "As tarefas que mais tempo lhe tiram, por ordem",
  "Que ferramentas ligamos e como fica o fluxo",
  "Uma proposta com preço fechado e prazo",
];

/** What the free call gives you, ticked off one by one as the card comes into view. */
function Takeaways({ enabled }: { enabled: boolean }) {
  return (
    <motion.div
      className="glass-dark rounded-[28px] p-6 sm:p-7"
      initial={enabled ? { opacity: 0, y: 30, rotateX: 8 } : false}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "0px 0px -20% 0px" }}
      transition={enabled ? { type: "spring", duration: 0.9, bounce: 0 } : { duration: 0 }}
      style={{ transformPerspective: 900 }}
    >
      <p className="flex items-center gap-2 text-[13px] text-white/60">
        <span className="relative flex size-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#46c08a]/60 motion-reduce:hidden" />
          <span className="relative size-2 rounded-full bg-[#46c08a]" />
        </span>
        Diagnóstico gratuito · 30 minutos
      </p>
      <p className="mt-3 text-[20px] font-medium tracking-[-0.02em]">O que leva desta conversa</p>
      <motion.ul
        className="mt-5 flex flex-col gap-3"
        initial="off"
        whileInView="on"
        viewport={{ once: true, margin: "0px 0px -20% 0px" }}
        transition={{ staggerChildren: enabled ? 0.35 : 0, delayChildren: enabled ? 0.4 : 0 }}
      >
        {TAKEAWAYS.map((t) => (
          <motion.li key={t} className="flex items-start gap-3 text-[15px] text-white/85">
            <motion.span
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-white text-ink"
              variants={{
                off: enabled ? { scale: 0, rotate: -60 } : {},
                on: { scale: 1, rotate: 0 },
              }}
              transition={
                enabled ? { type: "spring", duration: 0.5, bounce: 0.45 } : { duration: 0 }
              }
            >
              <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
                <path
                  d="M3.5 8.5l3 3 6-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
            <motion.span
              variants={{ off: enabled ? { opacity: 0.35 } : {}, on: { opacity: 1 } }}
              transition={{ duration: 0.4 }}
            >
              {t}
            </motion.span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
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
