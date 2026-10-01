"use client";

import { CalendarCheck, type LucideIcon, MessageCircle, Receipt, Wallet, Zap } from "lucide-react";
import { type MotionValue, motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container";
import { useBackdropOnView } from "@/lib/backdrop";
import { cn } from "@/lib/cn";
import { useMotionPreference } from "@/lib/motion-preference";

type Tone = "sky" | "lilac" | "sand" | "rose" | "sage";
type Segment = { text: string; tone?: Tone; icon?: LucideIcon };

const SEGMENTS: Segment[] = [
  { text: "Todos os dias, o seu negócio repete as mesmas tarefas:" },
  { text: "responder mensagens,", tone: "sky", icon: MessageCircle },
  { text: "marcar clientes,", tone: "lilac", icon: CalendarCheck },
  { text: "enviar faturas", tone: "sand", icon: Receipt },
  { text: "e" },
  { text: "cobrar atrasos.", tone: "rose", icon: Wallet },
  { text: "Nós ligamos as ferramentas que já usa para que tudo isso" },
  { text: "aconteça sozinho.", tone: "sage", icon: Zap },
];

const TONE: Record<Tone, string> = {
  sky: "bg-sky text-sky-ink",
  lilac: "bg-lilac text-lilac-ink",
  sand: "bg-sand text-sand-ink",
  rose: "bg-rose text-rose-ink",
  sage: "bg-sage text-sage-ink",
};

/* Flatten into words, keeping highlighted phrases whole so they light up as one pill. */
type Unit = { key: string; text: string; tone?: Tone; icon?: LucideIcon };
const UNITS: Unit[] = SEGMENTS.flatMap((s, si) =>
  s.tone
    ? [{ key: `${si}`, text: s.text, tone: s.tone, icon: s.icon }]
    : s.text.split(" ").map((w, wi) => ({ key: `${si}-${wi}`, text: w })),
);

/**
 * The problem, said once and slowly: the section pins and each word lights up with the
 * scroll; the everyday tasks turn into coloured chips as they are named.
 */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const { enabled } = useMotionPreference();
  useBackdropOnView(ref, "hero");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const hintOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

  return (
    <section ref={ref} aria-label="O que fazemos" className="relative h-[220svh]">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <Container>
          <p className="max-w-[60rem] text-[30px] leading-[1.22] font-medium tracking-[-0.03em] sm:text-[44px] lg:text-[54px]">
            {UNITS.map((u, i) => (
              <Word
                key={u.key}
                unit={u}
                progress={scrollYProgress}
                range={[(i / UNITS.length) * 0.8, ((i + 1) / UNITS.length) * 0.8]}
                enabled={enabled}
              />
            ))}
          </p>
          <motion.p
            className="mt-10 flex items-center gap-2 text-[15px] text-ink-2"
            style={enabled ? { opacity: hintOpacity } : undefined}
          >
            Veja como, em quatro exemplos
            <motion.span
              aria-hidden
              animate={enabled ? { y: [0, 4, 0] } : undefined}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </motion.p>
        </Container>
      </div>
    </section>
  );
}

function Word({
  unit,
  progress,
  range,
  enabled,
}: {
  unit: Unit;
  progress: MotionValue<number>;
  range: [number, number];
  enabled: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  const lit = useTransform(progress, range, [0, 1]);
  const rotate = useTransform(lit, [0, 1], [-30, 0]);
  const Icon = unit.icon;

  if (!unit.tone) {
    return (
      <>
        <motion.span style={enabled ? { opacity } : undefined}>{unit.text}</motion.span>{" "}
      </>
    );
  }
  return (
    <>
      <motion.span
        className="relative isolate inline-flex items-center gap-[0.25em] px-[0.28em] align-baseline"
        style={enabled ? { opacity } : undefined}
      >
        <motion.span
          aria-hidden
          className={cn(
            "absolute inset-x-0 inset-y-[0.06em] -z-[1] rounded-[0.3em]",
            TONE[unit.tone],
          )}
          style={enabled ? { scaleX: lit, originX: 0 } : undefined}
        />
        {Icon && (
          <motion.span
            aria-hidden
            className={cn("inline-grid", TONE[unit.tone], "bg-transparent")}
            style={enabled ? { scale: lit, rotate } : undefined}
          >
            <Icon className="size-[0.72em]" strokeWidth={2.2} />
          </motion.span>
        )}
        <span className={cn(TONE[unit.tone], "bg-transparent")}>{unit.text}</span>
      </motion.span>{" "}
    </>
  );
}
