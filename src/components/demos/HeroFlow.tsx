"use client";

import {
  CalendarCheck,
  CircleCheck,
  Database,
  Globe,
  type LucideIcon,
  Mail,
  MessageCircle,
  Receipt,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";
import { duration, ease } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { site } from "@/lib/site";

const W = 160;
const H = 100;
const ROWS = [16, 38, 62, 84];

interface Port {
  label: string;
  icon: LucideIcon;
}

const sources: Port[] = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "Email", icon: Mail },
  { label: "Site", icon: Globe },
  { label: "Loja online", icon: ShoppingBag },
];

const destinations: Port[] = [
  { label: "Agenda", icon: CalendarCheck },
  { label: "CRM", icon: Database },
  { label: "Faturação", icon: Receipt },
  { label: "Equipa", icon: Users },
];

const toasts = [
  { icon: CalendarCheck, title: "Marcação confirmada", detail: "Sexta, 15:30 · via WhatsApp" },
  { icon: Receipt, title: "Fatura FT 2026/1187 emitida", detail: "Enviada ao cliente por email" },
  { icon: Users, title: "Lead respondido em 38 s", detail: "T2 em Alvalade · registado no CRM" },
  { icon: CircleCheck, title: "Pagamento recebido", detail: "Lembrete automático funcionou" },
  { icon: Sparkles, title: "Fatura de fornecedor lida por IA", detail: "Lançada na contabilidade" },
];

const pct = (x: number, total: number) => `${(x / total) * 100}%`;
const inPath = (y: number) => `M 20 ${y} C 52 ${y}, 50 50, 80 50`;
const outPath = (y: number) => `M 80 50 C 110 50, 108 ${y}, 140 ${y}`;

export function HeroFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { enabled } = useMotionPreference();
  const inView = useInView(ref, { amount: 0.2 });
  const gradientId = useId();
  const animate = enabled;
  /** Ambient loops only run while the canvas is visible. */
  const running = enabled && inView;
  const [toastIndex, setToastIndex] = useState(0);

  useEffect(() => {
    if (!animate || !inView) return;
    const id = window.setInterval(() => setToastIndex((i) => (i + 1) % toasts.length), 2600);
    return () => window.clearInterval(id);
  }, [animate, inView]);

  const visible = [toasts[(toastIndex + toasts.length - 1) % toasts.length], toasts[toastIndex]];

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Ilustração: mensagens de WhatsApp, email, site e loja online passam pelas suas automações e chegam à agenda, ao CRM, à faturação e à equipa."
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] border border-line bg-surface shadow-float"
    >
      <div className="bg-dots absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_50%,rgb(91_91_240/0.10),transparent_70%)]"
        aria-hidden
      />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="absolute inset-0 size-full"
        aria-hidden
        role="presentation"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-flow)" />
          </linearGradient>
        </defs>
        {ROWS.map((y, i) => (
          <Edge
            key={`in-${y}`}
            d={inPath(y)}
            begin={i * 0.7}
            animate={running}
            gradient={gradientId}
          />
        ))}
        {ROWS.map((y, i) => (
          <Edge
            key={`out-${y}`}
            d={outPath(y)}
            begin={1.4 + i * 0.7}
            animate={running}
            gradient={gradientId}
          />
        ))}
      </svg>

      {sources.map((p, i) => (
        <PortNode key={p.label} port={p} x={20} y={ROWS[i] ?? 0} />
      ))}
      {destinations.map((p, i) => (
        <PortNode key={p.label} port={p} x={140} y={ROWS[i] ?? 0} />
      ))}

      {/* Hub */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: "50%", top: "50%" }}
      >
        <div className="relative">
          {running && (
            <span
              className="animate-breathe absolute -inset-4 rounded-[26px] bg-accent/12"
              aria-hidden
            />
          )}
          <div className="relative flex w-[132px] flex-col items-center gap-2 rounded-2xl border border-accent/25 bg-surface px-3 py-3 shadow-float ring-4 ring-accent/8 sm:w-[210px] sm:gap-2.5 sm:px-4 sm:py-4">
            <LogoMark className="size-8 sm:size-10" />
            <div className="text-center">
              <p className="text-[12.5px] font-semibold text-ink sm:text-[14px]">{site.name}</p>
              <p className="hidden text-[11.5px] text-muted sm:block">As suas automações</p>
            </div>
            <div className="hidden gap-1.5 sm:flex">
              {["Regras", "IA", "Aprovações"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-page px-2 py-0.5 text-[10.5px] font-medium text-ink-2 ring-1 ring-line"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity toasts */}
      <div className="absolute bottom-3 left-1/2 hidden w-[300px] -translate-x-1/2 flex-col gap-2 md:flex">
        <AnimatePresence initial={false} mode="popLayout">
          {visible.map(
            (t) =>
              t && (
                <motion.div
                  key={t.title}
                  layout={animate ? "position" : false}
                  initial={animate ? { opacity: 0, y: 14, scale: 0.97 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={
                    animate
                      ? { opacity: 0, y: -8, transition: { duration: duration.quick } }
                      : undefined
                  }
                  transition={{ duration: duration.base, ease }}
                  className="flex items-center gap-3 rounded-xl border border-line bg-surface/95 px-3 py-2 text-left shadow-card"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-ok-soft text-ok">
                    <t.icon className="size-3.5" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-ink">
                      {t.title}
                    </span>
                    <span className="block truncate text-[11px] text-muted">{t.detail}</span>
                  </span>
                  <span className="text-[10.5px] text-faint">agora</span>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Edge({
  d,
  begin,
  animate,
  gradient,
}: {
  d: string;
  begin: number;
  animate: boolean;
  gradient: string;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke="#e4e4e7" strokeWidth={0.4} />
      <path
        d={d}
        fill="none"
        stroke={`url(#${gradient})`}
        strokeWidth={0.45}
        strokeDasharray="2 1.5"
        strokeLinecap="round"
        opacity={0.55}
        className={animate ? "animate-dash" : undefined}
      />
      {animate && (
        <circle r={1.25} fill="var(--color-accent)">
          <animateMotion
            dur="2.8s"
            begin={`${begin}s`}
            repeatCount="indefinite"
            path={d}
            calcMode="linear"
            keyPoints="0;1;1"
            keyTimes="0;0.4;1"
          />
          <animate
            attributeName="opacity"
            dur="2.8s"
            begin={`${begin}s`}
            repeatCount="indefinite"
            values="0;1;1;0;0"
            keyTimes="0;0.06;0.36;0.42;1"
          />
        </circle>
      )}
    </g>
  );
}

function PortNode({ port, x, y }: { port: Port; x: number; y: number }) {
  const Icon = port.icon;
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: pct(x, W), top: pct(y, H) }}
    >
      <div className="flex items-center gap-2 rounded-full border border-line bg-surface p-1 shadow-card md:pr-3.5">
        <span className="grid size-7 place-items-center rounded-full bg-page text-ink-2 ring-1 ring-line sm:size-8">
          <Icon className="size-3.5 sm:size-4" aria-hidden />
        </span>
        <span className="hidden text-[12.5px] font-medium whitespace-nowrap text-ink md:inline">
          {port.label}
        </span>
      </div>
    </div>
  );
}
