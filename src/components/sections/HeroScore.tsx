"use client";

import {
  BellRing,
  CheckCheck,
  FileText,
  type LucideIcon,
  MessageCircle,
  PackageCheck,
  ReceiptEuro,
} from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { PauseButton } from "@/components/ui/PauseButton";
import { gsap, ScrollTrigger } from "@/lib/motion";
import "./hero-score.css";

/*
 * The hero is a score. A request arrives by WhatsApp and passes through the company one step at a
 * time: each step is a note on the staff. A playhead ("agora") crosses the staff. One number, --p
 * (the playhead's position in percent), drives everything that follows it: the ties are revealed
 * up to exactly that position, so a curve is never drawn after the playhead has passed.
 *
 * Reaching a step does four plain things, in this order: the note fills (with its number on
 * phones), the step card appears, a stem links the card to its note (wide screens), and the
 * previous card steps back so the current one reads as "now". Nothing is drawn before it is
 * reached. Wide screens show the cards in a row above the staff; narrower screens show the same
 * cards as a list under it. Then the score fades and plays again. Illustrative data.
 *
 * x is the position along the staff in percent; line is the staff line (0 top to 4 bottom).
 */
const STEPS: readonly {
  x: number;
  line: number;
  t: string;
  s: string;
  icon: LucideIcon;
}[] = [
  { x: 12.5, line: 3, t: "Pedido recebido", s: "WhatsApp · Frio Total", icon: MessageCircle },
  { x: 27.5, line: 1, t: "Orçamento enviado", s: "PDF · 585,00 €", icon: FileText },
  { x: 42.5, line: 2, t: "Encomenda em produção", s: "Prazo 18 mar", icon: PackageCheck },
  { x: 57.5, line: 0, t: "Fatura emitida", s: "FT 2026/118 · 312,40 €", icon: ReceiptEuro },
  { x: 72.5, line: 3, t: "Lembrete enviado", s: "SMS · véspera, 10:00", icon: BellRing },
  { x: 87.5, line: 1, t: "Pagamento conferido", s: "Moloni · automático", icon: CheckCheck },
];
const BARS = [3, 20, 50, 80, 97] as const;

const VB_GAP = 34; // staff line spacing in the ties' own drawing units
const vy = (line: number) => line * VB_GAP;
/* Each tie leaves the centre of one note and lands on the centre of the next. */
const SLURS = STEPS.slice(0, -1).map((a, i) => {
  const b = STEPS[i + 1];
  if (!b) return "";
  const x1 = a.x * 10;
  const x2 = b.x * 10;
  const y1 = vy(a.line);
  const y2 = vy(b.line);
  const top = Math.min(y1, y2) - 34;
  const dx = (x2 - x1) * 0.38;
  return `M${x1} ${y1} C ${x1 + dx} ${top}, ${x2 - dx} ${top}, ${x2} ${y2}`;
});

const START = 4; // playhead start and end, percent
const END = 98;
const TRAVEL = 14; // seconds to cross the staff

export function HeroScore() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(el);
      const fills = q(".sc-fill");
      const nums = q(".sc-n");
      const stems = q(".sc-stem");
      const chips = q(".sc-chip");
      const slurs = q(".sc-slurs");
      const play = q(".sc-play");
      const tl = gsap.timeline({ repeat: -1 });
      timeline.current = tl;

      // Start of every pass: everything is hidden by now, so nothing pops.
      tl.set(el, { "--p": START }, 0);
      tl.set(fills, { scale: 0, opacity: 1 }, 0);
      tl.set(nums, { opacity: 0 }, 0);
      tl.set(stems, { scaleY: 0, opacity: 1 }, 0);
      tl.set(chips, { opacity: 0, y: 10 }, 0);
      tl.set(slurs, { opacity: 1 }, 0);
      tl.set(play, { opacity: 0 }, 0);

      tl.to(play, { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.1);
      // The playhead and the revealed ties share this one value.
      tl.to(el, { "--p": END, duration: TRAVEL, ease: "none" }, 0.6);

      const at = (x: number) => 0.6 + ((x - START) / (END - START)) * TRAVEL;
      STEPS.forEach((s, i) => {
        const t = at(s.x);
        const fill = fills[i];
        const stem = stems[i];
        const chip = chips[i];
        if (!fill || !stem || !chip) return;
        tl.to(fill, { scale: 1, duration: 0.4, ease: "power3.out" }, t);
        if (nums[i]) tl.to(nums[i], { opacity: 1, duration: 0.4, ease: "power2.out" }, t);
        tl.to(chip, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, t + 0.05);
        tl.to(stem, { scaleY: 1, duration: 0.5, ease: "power2.out" }, t + 0.1);
        const prev = chips[i - 1];
        if (prev) tl.to(prev, { opacity: 0.5, duration: 0.5, ease: "power2.out" }, t);
      });

      const end = at(END) + 1.8; // hold the finished phrase, then let it go
      tl.to(
        [fills, nums, stems, chips, slurs, play],
        { opacity: 0, duration: 0.6, ease: "power2.inOut" },
        end,
      );
      tl.to({}, { duration: 0.5 }, end + 0.6);

      // Only play while the hero is on screen.
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (!self.isActive) tl.pause();
          else if (!el.dataset.paused) tl.play();
        },
      });
      return () => {
        st.kill();
        tl.kill();
        timeline.current = null;
      };
    });
    return () => mm.revert();
  }, []);

  const toggle = () => {
    const el = root.current;
    const tl = timeline.current;
    if (!el || !tl) return;
    if (paused) {
      delete el.dataset.paused;
      tl.play();
    } else {
      el.dataset.paused = "1";
      tl.pause();
    }
    setPaused(!paused);
  };

  return (
    <div ref={root} className="sc">
      {/* The step cards: a row above the staff on wide screens, a list under it on narrow ones. */}
      <ol className="sc-chips">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <li key={s.t} className="sc-chip" style={{ "--x": `${s.x}%` } as CSSProperties}>
              <span className="sc-chip-top">
                <span className="sc-no">{String(i + 1).padStart(2, "0")}</span>
                <Icon aria-hidden className="size-[15px]" strokeWidth={1.7} />
              </span>
              <b>{s.t}</b>
              <small>{s.s}</small>
            </li>
          );
        })}
      </ol>

      <div className="sc-staff" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} className="sc-line" style={{ "--i": i } as CSSProperties} />
        ))}
        {BARS.map((x) => (
          <i key={x} className="sc-bar" style={{ left: `${x}%` }} />
        ))}
        <span className="sc-clef">
          <OrchestrMark tone="on-light" className="size-12 dark:hidden" id="orx-sc-l" />
          <OrchestrMark tone="on-dark" className="hidden size-12 dark:block" id="orx-sc-d" />
        </span>
        <div className="sc-slurs">
          <svg aria-hidden="true" viewBox="0 0 1000 136" preserveAspectRatio="none">
            {SLURS.map((d) => (
              <path key={d} d={d} />
            ))}
          </svg>
        </div>
        {STEPS.map((s, i) => (
          <span
            key={s.t}
            className="sc-note"
            style={{ "--x": `${s.x}%`, "--line": s.line } as CSSProperties}
          >
            <i className="sc-stem" />
            <i className="sc-fill" />
            <i className="sc-n">{i + 1}</i>
          </span>
        ))}
        <div className="sc-play">
          <span className="sc-now">agora</span>
        </div>
      </div>

      <div className="sc-foot">
        <p className="sc-ill">
          Exemplo ilustrativo: um pedido por WhatsApp percorre a empresa, passo a passo.
        </p>
        <PauseButton paused={paused} onToggle={toggle} tone="light" />
      </div>
    </div>
  );
}
