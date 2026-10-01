"use client";

import { Check, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { HeroFlow } from "@/components/demos/HeroFlow";
import { Button } from "@/components/ui/Button";
import { duration, ease, entrance } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { contactHref, site } from "@/lib/site";

export function Hero() {
  const { reduced } = useMotionPreference();
  // Secondary elements fade in; the headline and lead stay visible in the HTML (LCP).
  const item = (delay: number) => ({
    className: "reveal",
    initial: "hidden" as const,
    animate: "visible" as const,
    variants: entrance,
    transition: reduced ? { duration: 0 } : { duration: duration.slow, ease, delay },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(91_91_240/0.12),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <motion.span {...item(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-2 shadow-card">
            <Sparkles className="size-3.5 text-accent" aria-hidden />
            Automações à medida para pequenas e médias empresas
          </span>
        </motion.span>

        <h1 className="animate-rise mt-7 max-w-4xl text-[42px] leading-[1.02] font-semibold tracking-[-0.045em] text-ink sm:text-[64px] lg:text-[76px]">
          Automações que trabalham pelo seu negócio,{" "}
          <span className="bg-gradient-to-r from-accent via-accent-2 to-[#0891b2] bg-clip-text text-transparent">
            24 horas por dia.
          </span>
        </h1>

        <p className="animate-rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted [animation-delay:60ms] sm:text-[19px]">
          Respondemos a clientes, marcamos reuniões, emitimos faturas e cobramos pagamentos de forma
          automática, ligados às ferramentas que já usa. Sem mudar de software.
        </p>

        <motion.div {...item(0.15)}>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <Button href={contactHref()} arrow>
              {site.cta}
            </Button>
            <Button href="#exemplos" variant="secondary">
              Ver exemplos animados
            </Button>
          </div>
        </motion.div>

        <motion.ul
          {...item(0.25)}
          className="reveal mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-muted"
        >
          {["Feito à medida", "Integra com o que já usa", "Preço fechado antes de começar"].map(
            (t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-ok" aria-hidden />
                {t}
              </li>
            ),
          )}
        </motion.ul>

        <motion.div
          className="reveal mt-16 w-full max-w-5xl sm:mt-20"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduced ? { duration: 0 } : { duration: 1, ease, delay: 0.35 }}
        >
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
}
