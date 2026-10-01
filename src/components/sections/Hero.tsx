"use client";

import { Check, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { HeroFlow } from "@/components/demos/HeroFlow";
import { Button } from "@/components/ui/Button";
import { duration, ease, entrance } from "@/lib/motion";
import { contactHref, site } from "@/lib/site";

export function Hero() {
  const reduced = useReducedMotion();
  const item = (delay: number) => ({
    initial: reduced ? false : ("hidden" as const),
    animate: "visible" as const,
    variants: entrance,
    transition: { duration: duration.slow, ease, delay },
  });

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(91_91_240/0.12),transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-8">
        <motion.span
          {...item(0)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[13px] font-medium text-ink-2 shadow-card"
        >
          <Sparkles className="size-3.5 text-accent" aria-hidden />
          Automações à medida para pequenas e médias empresas
        </motion.span>

        <motion.h1
          {...item(0.08)}
          className="mt-7 max-w-4xl text-[42px] leading-[1.02] font-semibold tracking-[-0.045em] text-ink sm:text-[64px] lg:text-[76px]"
        >
          Automações que trabalham pelo seu negócio,{" "}
          <span className="bg-gradient-to-r from-accent via-accent-2 to-flow bg-clip-text text-transparent">
            24 horas por dia.
          </span>
        </motion.h1>

        <motion.p
          {...item(0.16)}
          className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]"
        >
          Respondemos a clientes, marcamos reuniões, emitimos faturas e cobramos pagamentos de forma
          automática, ligados às ferramentas que já usa. Sem mudar de software.
        </motion.p>

        <motion.div {...item(0.24)} className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
          <Button href={contactHref()} arrow>
            {site.cta}
          </Button>
          <Button href="#exemplos" variant="secondary">
            Ver exemplos animados
          </Button>
        </motion.div>

        <motion.ul
          {...item(0.32)}
          className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-muted"
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
          initial={reduced ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl sm:mt-20"
        >
          <HeroFlow />
        </motion.div>
      </div>
    </section>
  );
}
