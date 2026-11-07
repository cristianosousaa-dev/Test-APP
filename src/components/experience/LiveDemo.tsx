"use client";

import { ArrowUpRight, Check, MoreHorizontal, Pause, Play, RotateCcw } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { selectBriefContext } from "@/lib/brief-context";
import { demoStages } from "@/lib/demo-stages";
import { gsap } from "@/lib/motion";
import { type ProcessExample, processExamples } from "@/lib/process-examples";
import { StudioPreview } from "./StudioPreview";

const STEP_DURATION = 9;

function useSequence(paused: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const clock = useRef<gsap.core.Timeline | null>(null);
  const sync = useRef<() => void>(() => {});
  const phaseRef = useRef(0);
  const manualRef = useRef(false);
  const options = useRef({ paused, playing: true });
  const [phase, updatePhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [manual, setManual] = useState(false);
  const [revision, setRevision] = useState(0);
  const select = (value: number) => {
    manualRef.current = true;
    setManual(true);
    phaseRef.current = value;
    updatePhase(value);
    setPlaying(false);
    clock.current?.pause().seek((value + 1) * STEP_DURATION - 0.01, true);
  };
  const toggle = () => {
    if (!playing && manualRef.current) {
      manualRef.current = false;
      setManual(false);
      clock.current?.seek(phaseRef.current * STEP_DURATION + 0.01, true);
    }
    setPlaying(!playing);
  };
  const restart = () => {
    manualRef.current = false;
    setManual(false);
    phaseRef.current = 0;
    updatePhase(0);
    setPlaying(true);
    setRevision((value) => value + 1);
  };
  useEffect(() => {
    options.current = { paused, playing };
    sync.current();
  }, [paused, playing]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sequence = gsap.timeline({ paused: true, repeat: -1, data: revision });
    clock.current = sequence;
    for (let i = 0; i < 4; i++)
      sequence.call(
        () => {
          phaseRef.current = i;
          updatePhase(i);
        },
        [],
        i * STEP_DURATION,
      );
    if (progress.current)
      sequence.fromTo(
        progress.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 4 * STEP_DURATION, ease: "none" },
        0,
      );
    sequence.seek(phaseRef.current * STEP_DURATION + 0.01, true);
    const synchronize = () => {
      setReduced(media.matches);
      if (media.matches && !manualRef.current) {
        phaseRef.current = 3;
        updatePhase(3);
      }
      const active =
        visible &&
        !document.hidden &&
        !media.matches &&
        !options.current.paused &&
        options.current.playing;
      setRunning(active);
      element.dataset.running = String(active);
      if (active) sequence.play();
      else sequence.pause();
      if (media.matches && progress.current)
        gsap.set(progress.current, { scaleX: (phaseRef.current + 1) / 4 });
    };
    sync.current = synchronize;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        synchronize();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    media.addEventListener("change", synchronize);
    document.addEventListener("visibilitychange", synchronize);
    synchronize();
    return () => {
      sequence.kill();
      clock.current = null;
      sync.current = () => {};
      observer.disconnect();
      media.removeEventListener("change", synchronize);
      document.removeEventListener("visibilitychange", synchronize);
    };
  }, [revision]);
  return {
    root,
    progress,
    phase,
    playing,
    running,
    reduced,
    revision,
    still: manual || reduced,
    toggle,
    select,
    restart,
  };
}

function BeforeScene({
  example,
  index,
  phase,
}: {
  example: ProcessExample;
  index: number;
  phase: number;
}) {
  return (
    <div className="manual-operation">
      <div className="manual-message" data-current={phase === 0}>
        <div className="manual-window-title">
          <BrandIcon brand={index === 2 ? "whatsapp" : "outlook"} />
          <span>{index === 2 ? "Mensagem recebida" : "Caixa de entrada"}</span>
          <MoreHorizontal size={15} />
        </div>
        <div className="manual-message-body">
          <span>{example.sender}</span>
          <strong>{example.subject}</strong>
          <p>{example.message}</p>
          <div className="manual-message-status">
            {phase === 0
              ? "A aguardar leitura"
              : phase === 3
                ? "Ainda falta responder…"
                : "Responder mais tarde"}
            <span>↩</span>
          </div>
        </div>
      </div>
      {index === 2 ? (
        <div className="paper-agenda" data-current={phase === 1 || phase === 2}>
          <span className="paper-heading">QUINTA-FEIRA, 12 NOVEMBRO</span>
          <div>
            <time>14:00</time>
            <span>Joana Ribeiro</span>
          </div>
          <div className={phase >= 2 ? "agenda-conflict" : ""}>
            <time>14:30</time>
            <span>{phase >= 2 ? "Ana Martins?" : "Consultar disponibilidade…"}</span>
          </div>
          <div>
            <time>15:00</time>
            <span>Confirmar por mensagem</span>
          </div>
        </div>
      ) : (
        <div className="manual-spreadsheet" data-current={phase === 1 || phase === 2}>
          <div className="spreadsheet-title">
            <BrandIcon brand="excel" />
            <span>{index === 0 ? "encomendas_final_v3.xlsx" : "vendas_e_faturas.xlsx"}</span>
            <span>×</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Cliente</th>
                <th>{index === 0 ? "Pedido" : "Valor"}</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Casa Alameda</td>
                <td>{index === 0 ? "8 unidades" : "460,00 €"}</td>
                <td>Por confirmar</td>
              </tr>
              <tr className={phase >= 1 ? "manual-edit" : ""}>
                <td>{phase >= 1 ? (index === 0 ? "Atelier Norte" : "Estúdio Forma") : "…"}</td>
                <td>
                  {phase >= 2 ? (index === 0 ? "24 unidades" : "1 230,00 €") : "Copiar dados…"}
                </td>
                <td>{phase >= 3 ? "Quem tratou?" : "Pendente"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="manual-task" key={phase} data-arrival>
        <span className="manual-task-dot" />
        <span>{example.before[phase] ?? example.before[0]}</span>
        <span>À mão</span>
      </div>
    </div>
  );
}

function PlaybackControls({
  playing,
  paused,
  onToggle,
  onRestart,
  hero = false,
}: {
  playing: boolean;
  paused: boolean;
  onToggle: () => void;
  onRestart: () => void;
  hero?: boolean;
}) {
  return (
    <div className="flow-controls">
      <button
        type="button"
        onClick={onToggle}
        disabled={paused}
        aria-label={
          playing
            ? hero
              ? "Pausar demo do hero"
              : "Pausar demonstração"
            : hero
              ? "Reproduzir demo do hero"
              : "Reproduzir demonstração"
        }
        title={paused ? "Retome o movimento no controlo geral" : undefined}
      >
        {playing ? <Pause size={14} /> : <Play size={14} />}
      </button>
      {!hero && (
        <button type="button" onClick={onRestart} aria-label="Recomeçar demonstração">
          <RotateCcw size={14} />
        </button>
      )}
    </div>
  );
}

function Steps({
  index,
  phase,
  onSelect,
  hero = false,
}: {
  index: number;
  phase: number;
  onSelect: (value: number) => void;
  hero?: boolean;
}) {
  return (
    <div className={`flow-steps ${hero ? "flow-steps-hero" : ""}`}>
      {processExamples[index]?.after.map((label, i) => (
        <button
          type="button"
          key={label}
          data-active={phase === i}
          data-done={phase > i}
          aria-pressed={phase === i}
          aria-label={`Ver etapa: ${label}`}
          onClick={() => onSelect(i)}
        >
          <span>{phase > i ? <Check size={10} /> : i + 1}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

export function HeroPreview({ paused }: { paused: boolean }) {
  const sequence = useSequence(paused);
  return (
    <div className="hero-preview flow-hero" ref={sequence.root} data-phase={sequence.phase}>
      <div className="hero-preview-caption">
        <span>
          <span className="signal-dot" />
          DO PEDIDO À PRODUÇÃO
        </span>
        <span>DEMONSTRAÇÃO ANIMADA</span>
      </div>
      <StudioPreview
        index={0}
        phase={sequence.phase}
        hero
        still={sequence.still}
        running={sequence.running}
        onComplete={() => sequence.select(sequence.phase)}
        key={`${sequence.phase}-${sequence.revision}`}
      />
      <div className="flow-hero-narration">
        <span>
          {String(sequence.phase + 1).padStart(2, "0")}
          <small>/ 04</small>
        </span>
        <div>
          <strong>{processExamples[0].after[sequence.phase]}</strong>
          <p>{processExamples[0].hero[sequence.phase]}</p>
        </div>
        <PlaybackControls
          hero
          paused={paused || sequence.reduced}
          playing={sequence.playing}
          onToggle={sequence.toggle}
          onRestart={sequence.restart}
        />
      </div>
      <Steps index={0} phase={sequence.phase} onSelect={sequence.select} hero />
      <div className="sequence-progress flow-progress">
        <span ref={sequence.progress} />
      </div>
    </div>
  );
}

function DemoComparison({ index, motionPaused }: { index: number; motionPaused: boolean }) {
  const sequence = useSequence(motionPaused);
  const example = processExamples[index] ?? processExamples[0];
  const stage = demoStages[index]?.[sequence.phase];
  return (
    <div
      className="flow-comparison"
      data-demo-design="studio"
      ref={sequence.root}
      data-phase={sequence.phase}
    >
      <div className="flow-demo-heading">
        <div>
          <h3>{example.title}</h3>
          <p>{example.intro}</p>
        </div>
      </div>
      <div className="flow-story">
        <span>
          {String(sequence.phase + 1).padStart(2, "0")}
          <small>/ 04</small>
        </span>
        <div>
          <strong>{stage?.title}</strong>
          <p>{stage?.explanation}</p>
        </div>
        <PlaybackControls
          playing={sequence.playing}
          paused={motionPaused || sequence.reduced}
          onToggle={sequence.toggle}
          onRestart={sequence.restart}
        />
      </div>
      <div className="flow-compare-grid">
        <div className="flow-before">
          <div className="flow-panel-label">
            <span>ANTES</span>
            <strong>Informação dispersa.</strong>
            <span>Intervenção manual</span>
          </div>
          <BeforeScene example={example} index={index} phase={sequence.phase} />
        </div>
        <div className="flow-after">
          <div className="flow-panel-label">
            <span>DEPOIS</span>
            <strong>Um processo ligado.</strong>
            <span>Ação demonstrada</span>
          </div>
          <StudioPreview
            index={index}
            phase={sequence.phase}
            still={sequence.still}
            running={sequence.running}
            onComplete={() => sequence.select(sequence.phase)}
            key={`${sequence.phase}-${sequence.revision}`}
          />
        </div>
      </div>
      <Steps index={index} phase={sequence.phase} onSelect={sequence.select} />
      <div className="sequence-progress flow-progress">
        <span ref={sequence.progress} />
      </div>
      <div className="flow-demo-footnote">
        <span>{example.caption}</span>
        <span>Exemplo ilustrativo · Sem dados reais</span>
        {/* biome-ignore lint/a11y/useValidAnchor: This link navigates to contact and carries the demo service. */}
        <a
          href="#contacto"
          onClick={() => selectBriefContext({ service: "Automação e integrações" })}
        >
          Ver o meu processo
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

export function LiveDemo({
  motionPaused,
  children,
}: {
  motionPaused: boolean;
  children?: ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const select = (event: Event) => {
      const value = (event as CustomEvent<number>).detail;
      if (Number.isInteger(value) && value >= 0 && value < processExamples.length) setIndex(value);
    };
    window.addEventListener("orchestr:demo", select);
    return () => window.removeEventListener("orchestr:demo", select);
  }, []);
  return (
    <div className="live-demo new-live-demo flow-demo">
      <div className="flow-demo-toolbar">
        <div className="flow-demo-section-title">{children}</div>
        <div className="demo-selector" role="tablist" aria-label="Escolher demonstração">
          {processExamples.map((example, i) => (
            <button
              ref={(el) => {
                tabs.current[i] = el;
              }}
              key={example.id}
              type="button"
              role="tab"
              id={`tab-${example.id}`}
              aria-selected={index === i}
              aria-controls={`panel-${example.id}`}
              tabIndex={index === i ? 0 : -1}
              className={index === i ? "selected" : ""}
              onClick={() => setIndex(i)}
              onKeyDown={(event) => {
                let next = i;
                if (event.key === "ArrowRight") next = (i + 1) % processExamples.length;
                else if (event.key === "ArrowLeft")
                  next = (i + processExamples.length - 1) % processExamples.length;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = processExamples.length - 1;
                else return;
                event.preventDefault();
                setIndex(next);
                tabs.current[next]?.focus();
              }}
            >
              <span className="mono">0{i + 1}</span>
              {example.label}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </div>
      <div
        role="tabpanel"
        id={`panel-${processExamples[index]?.id}`}
        aria-labelledby={`tab-${processExamples[index]?.id}`}
      >
        <DemoComparison key={index} index={index} motionPaused={motionPaused} />
      </div>
    </div>
  );
}
