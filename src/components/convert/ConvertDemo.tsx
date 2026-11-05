"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { proposalHref } from "@/lib/site";
import { OrdersApp } from "./OrdersApp";
import { OrdersSheet } from "./OrdersSheet";

const STEPS = [
  {
    title: "Lemos o seu Excel",
    text: "Importamos os ficheiros que usa hoje e percebemos como o trabalho é feito, linha a linha.",
  },
  {
    title: "Desenhamos o processo",
    text: "O que acontece em cada fase, quem vê o quê e quando é avisado fica definido antes de começarmos o desenvolvimento.",
  },
  {
    title: "Entregamos a aplicação",
    text: "Os mesmos dados, agora numa aplicação onde toda a equipa trabalha ao mesmo tempo.",
  },
] as const;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const stepOf = (p: number) => (p < 0.34 ? 0 : p < 0.67 ? 1 : 2);

/**
 * The page's signature moment: the spreadsheet a company works in today, turned into its
 * application by a scan line. One value, --p (0 to 1), drives the clip, the line, the step
 * list and the window's scale, so they always agree.
 *
 * - Large screens: the stage pins and --p follows the scroll (one passive listener, one rAF).
 * - Phones, tablets and reduced motion: no pinning. The line sweeps once when the window is
 *   first seen (reduced motion: it rests at the midpoint) and a slider lets people drive it.
 */
export function ConvertDemo() {
  const root = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLInputElement>(null);
  const manual = useRef(false);
  const [step, setStep] = useState(0);
  const [pinned, setPinned] = useState(false);

  const setP = useCallback((p: number) => {
    root.current?.style.setProperty("--p", p.toFixed(4));
    const s = slider.current;
    if (s) {
      s.value = String(Math.round(p * 100));
      s.setAttribute(
        "aria-valuetext",
        p < 0.5 ? "Mais perto da folha de cálculo" : "Mais perto da aplicação",
      );
    }
    setStep(stepOf(p));
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const large = window.matchMedia(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    );
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let stop = () => {};

    const setup = () => {
      stop();
      // A cancelled frame leaves its id behind; a stale id would block the next scroll handler.
      raf = 0;
      manual.current = false;
      if (large.matches) {
        setPinned(true);
        const onScroll = () => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const span = r.height - window.innerHeight;
            if (span <= 0) return;
            // A short hold at both ends, so the first and last states are read, not rushed.
            setP(clamp((clamp(-r.top / span) - 0.05) / 0.9));
          });
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        stop = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
          cancelAnimationFrame(raf);
        };
        return;
      }
      setPinned(false);
      if (reduced.matches) {
        setP(0.5);
        return;
      }
      setP(0);
      const io = new IntersectionObserver(
        ([e]) => {
          if (!e?.isIntersecting) return;
          io.disconnect();
          const t0 = performance.now();
          const tick = (t: number) => {
            if (manual.current) return;
            const k = clamp((t - t0) / 3200);
            setP(easeInOut(k));
            if (k < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        },
        { threshold: 0.5 },
      );
      io.observe(el);
      stop = () => {
        io.disconnect();
        cancelAnimationFrame(raf);
      };
    };

    setup();
    large.addEventListener("change", setup);
    return () => {
      stop();
      large.removeEventListener("change", setup);
    };
  }, [setP]);

  return (
    <section id="conversao" aria-labelledby="conversao-title" className="night relative">
      {/* --p defaults to the midpoint, so without JavaScript the window shows both layers. */}
      <div ref={root} className="cv-pin" style={{ "--p": 0.5 } as CSSProperties}>
        <div className="cv-sticky">
          <Container className="w-full py-20 sm:py-28 lg:py-0">
            <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <div>
                <p className="kicker-n">Um exemplo: do Excel à aplicação</p>
                <h2
                  id="conversao-title"
                  data-reveal="mask"
                  className="h2 mt-6 text-[clamp(36px,4.4vw,64px)]"
                >
                  O seu Excel, convertido <span className="text-accent-hi">numa aplicação.</span>
                </h2>
                <p className="mt-6 max-w-[30rem] text-[17px] leading-[1.6] text-nmute">
                  Seja uma folha de Excel, papel ou um programa antigo, o princípio é o mesmo:
                  partimos do trabalho que a sua equipa já faz e convertemos esse trabalho numa
                  aplicação desenvolvida para si.
                </p>

                <ol className="relative mt-10 flex flex-col gap-1 pl-7">
                  <span aria-hidden className="absolute top-2 bottom-2 left-0 w-px bg-nline-2" />
                  <span
                    aria-hidden
                    className="cv-bar absolute top-2 bottom-2 left-0 w-px bg-accent-hi"
                  />
                  {STEPS.map((s, i) => (
                    <li
                      key={s.title}
                      className="cv-step relative py-3"
                      data-on={step === i || undefined}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute top-[22px] -left-[31px] size-[9px] rounded-full transition-colors duration-500",
                          step >= i ? "bg-accent-hi" : "bg-nfill ring-1 ring-nline-2",
                        )}
                      />
                      <p className="font-display text-[20px] tracking-[-0.02em] text-strong">
                        {s.title}
                      </p>
                      <p className="mt-1 max-w-[26rem] text-[14.5px] leading-[1.55] text-nmute">
                        {s.text}
                      </p>
                    </li>
                  ))}
                </ol>

                <LinkButton href={proposalHref} variant="light" size="lg" className="mt-10">
                  Ver o meu processo assim
                </LinkButton>
              </div>

              <div className="cv min-w-0">
                <div className="kicker-n mb-3 flex items-center justify-between gap-4 text-[10.5px]">
                  <span style={{ opacity: "calc(1 - var(--p) * 0.65)" }}>Hoje · Excel</span>
                  <span style={{ opacity: "calc(0.35 + var(--p) * 0.65)" }}>
                    Depois · aplicação
                  </span>
                </div>
                <div className="cv-lift">
                  <div className="cv-window" aria-hidden>
                    <OrdersSheet />
                    <div className="cv-app">
                      <OrdersApp />
                    </div>
                    <span className="cv-scan" />
                  </div>
                </div>
                <p className="sr-only">
                  Ilustração: uma folha de Excel de encomendas, com datas e valores em formatos
                  diferentes e células com erros, transformada numa aplicação com estados, valores e
                  indicadores. Exemplo ilustrativo.
                </p>

                {!pinned && (
                  <div className="mt-5">
                    <label
                      htmlFor="cv-slider"
                      className="kicker-n flex items-center justify-between text-[10.5px]"
                    >
                      <span>Arraste para comparar</span>
                    </label>
                    <input
                      ref={slider}
                      id="cv-slider"
                      type="range"
                      min={0}
                      max={100}
                      defaultValue={50}
                      onChange={(e) => {
                        manual.current = true;
                        setP(Number(e.target.value) / 100);
                      }}
                      className="range range-night mt-1"
                      style={{ ["--fill" as string]: "100%" }}
                    />
                  </div>
                )}
                <p className="kicker-n mt-4 text-[10.5px]">
                  Exemplo ilustrativo, com dados inventados
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
