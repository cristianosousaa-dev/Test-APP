"use client";

import {
  ArrowUpRight,
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  FileText,
  Mail,
  MoreHorizontal,
  MousePointer2,
  Pause,
  Play,
  RotateCcw,
  Send,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { demoStages } from "@/lib/demo-stages";
import { gsap } from "@/lib/motion";
import { type ProcessExample, processExamples } from "@/lib/process-examples";

const STEP_DURATION = 7.5;

function useSequence(paused: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef(0);
  const manual = useRef(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [phase, updatePhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [running, setRunning] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [revision, setRevision] = useState(0);
  const select = (value: number) => {
    manual.current = true;
    phaseRef.current = value;
    updatePhase(value);
    setPlaying(false);
    timeline.current?.pause().seek(value * STEP_DURATION + 0.01, true);
  };
  const restart = () => {
    manual.current = false;
    phaseRef.current = 0;
    updatePhase(0);
    setPlaying(true);
    setRevision((value) => value + 1);
  };
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const clock = gsap.timeline({ paused: true, repeat: -1, data: revision });
    timeline.current = clock;
    for (let i = 0; i < 4; i++)
      clock.call(
        () => {
          phaseRef.current = i;
          updatePhase(i);
        },
        [],
        i * STEP_DURATION,
      );
    if (progress.current)
      clock.fromTo(
        progress.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 4 * STEP_DURATION, ease: "none" },
        0,
      );
    clock.seek(phaseRef.current * STEP_DURATION + 0.01, true);
    const sync = () => {
      setReduced(media.matches);
      if (media.matches && !manual.current) {
        phaseRef.current = 3;
        updatePhase(3);
      }
      const active = visible && !document.hidden && !media.matches && !paused && playing;
      setRunning(active);
      element.dataset.running = String(active);
      if (active) clock.play();
      else clock.pause();
      if (media.matches && progress.current)
        gsap.set(progress.current, { scaleX: (phaseRef.current + 1) / 4 });
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    media.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      clock.kill();
      timeline.current = null;
      observer.disconnect();
      media.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [paused, playing, revision]);
  return {
    root,
    progress,
    phase,
    playing,
    setPlaying,
    running,
    reduced,
    revision,
    select,
    restart,
  };
}

function Workspace({
  index,
  phase,
  hero = false,
  still,
  running,
}: {
  index: number;
  phase: number;
  hero?: boolean;
  still: boolean;
  running: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const actionTimeline = useRef<gsap.core.Timeline | null>(null);
  const example = processExamples[index] ?? processExamples[0];
  const stage = demoStages[index]?.[phase];
  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    if (still) {
      element.dataset.complete = "true";
      return;
    }
    const context = gsap.context(() => {
      element.dataset.complete = "false";
      const pointer = element.querySelector(".flow-pointer");
      const target = element.querySelector("[data-action-target]");
      const ring = element.querySelector(".flow-click-ring");
      const track = element.querySelector<HTMLElement>(".flow-track");
      if (!pointer || !target || !ring || !track) return;
      const rect = element.getBoundingClientRect();
      const aim = target.getBoundingClientRect();
      const x = aim.x - rect.x + aim.width * 0.6;
      const y = aim.y - rect.y + aim.height * 0.5;
      const fillingRecord = phase === 1 && index !== 2;
      const clickAt = fillingRecord ? 2.45 : 1.3;
      const transferAt = fillingRecord ? 3 : 2.5;
      const completeAt = fillingRecord ? 4.25 : 3.75;
      const tl = gsap.timeline({ paused: true });
      actionTimeline.current = tl;
      tl.set(pointer, { x: rect.width * 0.28, y: rect.height * 0.32, opacity: 0 });
      tl.set(ring, { x, y, scale: 0.2, opacity: 0 });
      tl.set(".flow-packet", { x: 0, opacity: 0 });
      tl.set(".flow-toast", { opacity: 0, y: 5 });
      tl.fromTo(
        "[data-fill]",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.65, stagger: 0.24, ease: "power2.out" },
        fillingRecord ? 0.35 : 1.5,
      );
      if (element.querySelector(".flow-field > svg"))
        tl.fromTo(
          ".flow-field > svg",
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.3, stagger: 0.24 },
          fillingRecord ? 0.95 : 2.1,
        );
      tl.to(pointer, { opacity: 1, duration: 0.25 }, 0.35);
      tl.to(pointer, { x, y, duration: 0.85, ease: "power2.inOut" }, clickAt - 0.85);
      tl.to(ring, { opacity: 0.8, scale: 1, duration: 0.18 }, clickAt);
      tl.to(ring, { opacity: 0, scale: 2.1, duration: 0.65 }, clickAt + 0.18);
      tl.to(pointer, { opacity: 0, duration: 0.35 }, clickAt + 0.6);
      tl.to(".flow-packet", { opacity: 1, duration: 0.15 }, transferAt - 0.05);
      tl.to(
        ".flow-packet",
        { x: () => track.clientWidth - 8, duration: 1.15, ease: "power1.inOut" },
        transferAt,
      );
      tl.to(".flow-packet", { opacity: 0, duration: 0.2 }, transferAt + 1.15);
      if (element.querySelector(".flow-moving-card"))
        tl.fromTo(
          ".flow-moving-card",
          { x: -100, opacity: 0.4 },
          { x: 0, opacity: 1, duration: 1.05, ease: "power3.inOut" },
          1.7,
        );
      if (element.querySelector(".flow-reservation"))
        tl.fromTo(
          ".flow-reservation",
          { scaleY: 0.12, opacity: 0.25, transformOrigin: "top" },
          { scaleY: 1, opacity: 1, duration: 0.85, ease: "power3.out" },
          1.75,
        );
      tl.set(element, { attr: { "data-complete": "true" } }, completeAt);
      tl.to(".flow-toast", { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, completeAt);
    }, element);
    return () => {
      context.revert();
      actionTimeline.current = null;
    };
  }, [still, phase, index]);
  useEffect(() => {
    if (running && !still) actionTimeline.current?.play();
    else actionTimeline.current?.pause();
  }, [running, still]);

  if (!stage) return null;

  const action = (
    <span className="flow-action" data-action-target>
      <span className="flow-action-ready">{example.commands[phase]}</span>
      <span className="flow-action-done">
        <Check size={12} />
        {phase === 3 && index !== 0 ? "Agendado" : "Concluído"}
      </span>
      <ChevronRight size={13} />
    </span>
  );
  return (
    <div
      ref={root}
      className={`flow-workspace ${hero ? "flow-workspace-hero" : ""}`}
      data-phase={phase}
      data-complete={still}
      data-running={running && !still}
    >
      <div className="flow-app-bar">
        <span>
          <OrchestrMark id={`workspace-${hero ? "hero" : index}`} />
          <strong>A sua empresa</strong>
        </span>
        <span className="flow-app-mode">
          <span />
          EXEMPLO
        </span>
      </div>
      <div className="flow-app-tabs" aria-hidden="true">
        {example.tabs.map((tab, i) => (
          <span key={tab} data-active={phase === i}>
            {i < phase ? <Check size={10} /> : <span className="flow-tab-dot" />}
            {tab}
          </span>
        ))}
      </div>
      <div className="flow-scene" key={`${index}-${phase}`}>
        <div className="flow-scene-title">
          <span>{String(phase + 1).padStart(2, "0")} / 04</span>
          <strong>{example.after[phase]}</strong>
          <span className="flow-state">
            <i />
            <span className="flow-state-before">
              {phase === 0 ? "Recebido" : phase === 3 ? "Envio" : "Em curso"}
            </span>
            <span className="flow-state-after">
              {phase === 0 ? "Lido" : phase === 3 && index !== 0 ? "Agendado" : "Concluído"}
            </span>
          </span>
        </div>
        {phase === 0 ? (
          <div className="flow-email">
            <div className="flow-email-sender">
              <span className="flow-avatar">{index === 1 ? "EF" : "AN"}</span>
              <div>
                <strong>{example.sender}</strong>
                <span>{index === 2 ? "Novo pedido de marcação" : "Caixa de entrada · Agora"}</span>
              </div>
              <Mail size={16} />
            </div>
            <h5>{example.subject}</h5>
            <p data-fill>{example.message}</p>
            <div className="flow-email-footer">
              <span className="flow-pending-note">
                <Clock3 size={12} />
                {index === 1 ? "Venda aprovada" : "Novo pedido"}
              </span>
              {action}
            </div>
          </div>
        ) : phase === 1 && index !== 2 ? (
          <div className="flow-record">
            <div className="flow-record-source">
              <FileText size={14} />
              <span>
                {index === 0 ? "Dados do email da Ana" : "Dados da proposta 0182 e da ficha 0032"}
              </span>
              <span>Ligado</span>
            </div>
            <div className="flow-fields">
              {stage.facts.map(([label, value]) => (
                <div className="flow-field" key={label}>
                  <span>{label}</span>
                  <strong data-fill>{value}</strong>
                  <Check size={12} />
                </div>
              ))}
            </div>
            <div className="flow-record-footer">
              <span>
                {index === 0 ? "Um registo para toda a equipa" : "Os mesmos dados, sem reescrever"}
              </span>
              {action}
            </div>
          </div>
        ) : phase === 2 && index === 0 ? (
          <div className="flow-production">
            <div className="flow-board">
              <div className="flow-board-column">
                <span>
                  <i />
                  Por iniciar{" "}
                  <b>
                    <span className="flow-count-before">01</span>
                    <span className="flow-count-after">00</span>
                  </b>
                </span>
                <div className="flow-task-placeholder">
                  <span className="flow-count-before">ENC-0250</span>
                  <span className="flow-count-after">Sem pendentes</span>
                </div>
              </div>
              <div className="flow-board-column">
                <span>
                  <i />
                  Em produção{" "}
                  <b>
                    <span className="flow-count-before">12</span>
                    <span className="flow-count-after">13</span>
                  </b>
                </span>
                <div className="flow-moving-card">
                  <span>ENC-0250</span>
                  <strong>24 cadeiras</strong>
                  <span>Atelier Norte · 20 nov.</span>
                  <div>
                    <span>PR</span>Equipa de produção
                  </div>
                </div>
              </div>
            </div>
            <div className="flow-record-footer">
              <span>
                <span className="flow-count" data-fill>
                  12 → 13
                </span>{" "}
                pedidos ativos
              </span>
              {action}
            </div>
          </div>
        ) : phase === 2 && index === 1 ? (
          <div className="flow-invoice">
            <div className="flow-invoice-top">
              <FileText size={22} />
              <div>
                <span>DOCUMENTO PARA VALIDAÇÃO</span>
                <strong>FT 2026 / 0148</strong>
              </div>
              <span className="flow-pending-note">A validar</span>
            </div>
            <div className="flow-invoice-client">
              Estúdio Forma, Lda. <span>Cliente 0032</span>
            </div>
            <div className="flow-invoice-line">
              <span>Serviços de instalação</span>
              <strong data-fill>1 000,00 €</strong>
            </div>
            <div className="flow-invoice-line">
              <span>IVA · 23%</span>
              <span data-fill>230,00 €</span>
            </div>
            <div className="flow-invoice-total">
              <span>Total</span>
              <strong data-fill>1 230,00 €</strong>
            </div>
            <div className="flow-record-footer">
              <span>Conferência pela equipa financeira</span>
              {action}
            </div>
          </div>
        ) : phase === 1 && index === 2 ? (
          <div className="flow-calendar">
            <div className="flow-calendar-days">
              {["SEG 09", "TER 10", "QUA 11", "QUI 12", "SEX 13"].map((day, i) => (
                <span key={day} data-selected={i === 3}>
                  {day}
                </span>
              ))}
            </div>
            <div className="flow-calendar-slot">
              <time>14:00</time>
              <span>
                Joana Ribeiro <small>Consulta de acompanhamento</small>
              </span>
            </div>
            <div className="flow-calendar-slot flow-reservation">
              <time>14:30</time>
              <span>
                <strong data-fill>Ana Martins</strong>
                <small>Consulta inicial · 45 min. · até às 15:15</small>
              </span>
              <Check size={15} />
            </div>
            <div className="flow-record-footer">
              <span>Agenda da equipa atualizada</span>
              {action}
            </div>
          </div>
        ) : (
          <div className="flow-outbox">
            <div className="flow-outbox-recipient">
              {phase === 3 && index !== 0 ? <Bell size={17} /> : <Send size={17} />}
              <div>
                <span>
                  {phase === 3 && index !== 0 ? "LEMBRETE POR EMAIL" : "CONFIRMAÇÃO POR EMAIL"}
                </span>
                <strong>
                  {index === 1
                    ? "Estúdio Forma"
                    : `Ana · ${index === 0 ? "Atelier Norte" : "Consulta inicial"}`}
                </strong>
              </div>
              <span className="flow-status-done">
                <CheckCheck size={13} />
                {phase === 3 && index !== 0 ? "Agendado" : "Enviado"}
              </span>
            </div>
            <p data-fill>
              {stage.message ||
                (index === 1
                  ? "O lembrete da fatura FT 2026 / 0148 fica agendado para dois dias antes do vencimento. Valor: 1 230,00 €. Prazo: 30 dias."
                  : "Olá, Ana. Recordamos a sua consulta de quinta-feira, dia 12, às 14:30. O lembrete será enviado 24 horas antes da marcação.")}
            </p>
            <div className="flow-record-footer">
              <span>
                {phase === 3 && index !== 0 ? (
                  <>
                    <Clock3 size={12} />
                    {index === 1 ? "2 dias antes do vencimento" : "24 horas antes"}
                  </>
                ) : (
                  "Mensagem ligada ao registo"
                )}
              </span>
              {action}
            </div>
          </div>
        )}
      </div>
      <div className="flow-transfer">
        <span>{stage.from}</span>
        <div className="flow-track" aria-hidden="true">
          <i />
          <span className="flow-packet" />
          <ChevronRight size={12} />
        </div>
        <strong>{stage.to}</strong>
      </div>
      <div className="flow-feedback">
        <div className="flow-feedback-pending">
          <span className="flow-wait-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>{running ? "A executar esta etapa…" : "Demonstração em pausa"}</span>
        </div>
        <div className="flow-toast">
          <span>
            <Check size={13} />
          </span>
          <strong>{example.confirmations[phase]}</strong>
          <span className="flow-toast-end">Registado</span>
        </div>
      </div>
      <div className="flow-pointer" aria-hidden="true">
        <MousePointer2 size={23} fill="currentColor" />
        <span>Orchestr</span>
      </div>
      <span className="flow-click-ring" aria-hidden="true" />
    </div>
  );
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
      <Workspace
        index={0}
        phase={sequence.phase}
        hero
        still={paused || !sequence.playing || sequence.reduced}
        running={sequence.running}
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
          onToggle={() => sequence.setPlaying(!sequence.playing)}
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
    <div className="flow-comparison" ref={sequence.root} data-phase={sequence.phase}>
      <div className="flow-demo-heading">
        <div>
          <h3>{example.title}</h3>
          <p>{example.intro}</p>
        </div>
        <PlaybackControls
          playing={sequence.playing}
          paused={motionPaused || sequence.reduced}
          onToggle={() => sequence.setPlaying(!sequence.playing)}
          onRestart={sequence.restart}
        />
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
          <Workspace
            index={index}
            phase={sequence.phase}
            still={motionPaused || !sequence.playing || sequence.reduced}
            running={sequence.running}
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
      </div>
    </div>
  );
}

export function LiveDemo({ motionPaused }: { motionPaused: boolean }) {
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
