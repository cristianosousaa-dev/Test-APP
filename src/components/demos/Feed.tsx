"use client";

import { Bot } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import type { Demo, FeedItem, Tone } from "./data";

const toneClass: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent",
  ok: "bg-ok-soft text-ok",
  warn: "bg-warn-soft text-warn",
  neutral: "bg-page text-ink-2 ring-1 ring-line",
};

interface FeedProps {
  demo: Demo;
  step: number;
  animate: boolean;
  running: boolean;
}

export function Feed({ demo, step, animate, running }: FeedProps) {
  const items = demo.steps
    .slice(0, step + 1)
    .flatMap((stepItems, s) => stepItems.map((item, i) => ({ item, key: `${s}-${i}`, order: i })));
  const ChannelIcon = demo.channel.icon;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex h-12 shrink-0 items-center gap-2.5 border-b border-line px-4">
        <span className="grid size-7 place-items-center rounded-lg bg-page ring-1 ring-line">
          <ChannelIcon className="size-3.5 text-ink-2" aria-hidden />
        </span>
        <span className="text-[13px] font-medium text-ink">{demo.channel.label}</span>
        <span className="ml-auto flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="relative flex size-1.5">
            {running && (
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />
            )}
            <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
          </span>
          Ao vivo
        </span>
      </div>

      <div className="relative flex min-h-[340px] flex-1 flex-col justify-end gap-2.5 overflow-hidden bg-[#f7f7f9] px-4 py-4">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <AnimatePresence initial={false} mode="popLayout">
          {items.map(({ item, key, order }) => (
            <motion.div
              key={key}
              layout={animate ? "position" : false}
              initial={animate ? { opacity: 0, y: 12, scale: 0.98 } : false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={animate ? { opacity: 0, transition: { duration: duration.quick } } : undefined}
              transition={{ duration: duration.base, ease, delay: animate ? order * 0.45 : 0 }}
              className="relative"
            >
              <FeedRow item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <motion.p
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.base, delay: animate ? 0.3 : 0 }}
            className="relative self-center pb-24 text-[12.5px] text-faint"
          >
            À espera do próximo evento…
          </motion.p>
        )}
      </div>
    </div>
  );
}

function FeedRow({ item }: { item: FeedItem }) {
  if (item.kind === "in") {
    return (
      <div className="flex justify-start">
        <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-surface px-3.5 py-2 shadow-[0_1px_2px_rgb(10_10_11/0.04)]">
          <p className="text-[11px] font-medium text-accent">{item.who}</p>
          <p className="text-[13.5px] leading-snug text-ink">{item.text}</p>
          <p className="mt-0.5 text-right text-[10.5px] text-faint tabular-nums">{item.time}</p>
        </div>
      </div>
    );
  }
  if (item.kind === "out") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-white shadow-[0_6px_16px_-8px_rgb(91_91_240/0.8)]">
          <p className="flex items-center gap-1 text-[10.5px] font-medium text-white/90">
            <Bot className="size-3" aria-hidden />
            Automático
          </p>
          <p className="text-[13.5px] leading-snug">{item.text}</p>
          <p className="mt-0.5 text-right text-[10.5px] text-white/85 tabular-nums">{item.time}</p>
        </div>
      </div>
    );
  }
  const Icon = item.icon;
  return (
    <div className="flex items-start gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 shadow-[0_1px_2px_rgb(10_10_11/0.04)]">
      <span
        className={cn("grid size-8 shrink-0 place-items-center rounded-lg", toneClass[item.tone])}
      >
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] leading-tight font-medium text-ink">{item.title}</span>
        <span className="block text-[12px] leading-snug text-muted">{item.detail}</span>
      </span>
      <span className="text-[10.5px] text-faint">agora</span>
    </div>
  );
}
