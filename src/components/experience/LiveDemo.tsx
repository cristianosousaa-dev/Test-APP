"use client";

import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  FileText,
  Mail,
  MoreHorizontal,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { demoStages } from "@/lib/demo-stages";
import { gsap } from "@/lib/motion";

const STEP_DURATION = 6;
const heroExplanations = [
  "Ana pede 24 cadeiras para dia 20. O pedido entra no processo.",
  "É criada a ENC-0250 com cliente, quantidade e prazo, visível à equipa.",
  "A produção recebe a tarefa. O painel passa de 12 para 13 pedidos.",
  "Ana recebe a confirmação com a referência e a data de entrega.",
];

const examples = [
  {
    id: "encomendas",
    label: "Encomendas",
    title: "O pedido entra. A encomenda avança.",
    intro: "Do email do cliente à produção, com a informação certa em cada etapa.",
    before: ["Ler o email", "Copiar para o Excel", "Ligar à produção", "Responder ao cliente"],
    after: ["Pedido recebido", "Encomenda criada", "Produção notificada", "Cliente informado"],
    sender: "Ana · Atelier Norte",
    subject: "Nova encomenda · 24 unidades",
    message:
      "Bom dia! Precisamos de 24 cadeiras para dia 20. Podem confirmar a encomenda? Obrigada, Ana.",
    result: "Confirmação enviada a Ana",
    caption: "Um pedido, um registo e um histórico partilhado.",
  },
  {
    id: "faturacao",
    label: "Faturação",
    title: "A venda fecha. A faturação acompanha.",
    intro:
      "Os dados seguem para a fatura e o vencimento fica acompanhado, sem voltar a escrever tudo.",
    before: [
      "Confirmar a venda",
      "Reescrever os dados",
      "Preparar a fatura",
      "Anotar o vencimento",
    ],
    after: ["Venda confirmada", "Dados preenchidos", "Fatura preparada", "Lembrete agendado"],
    sender: "Comercial · Estúdio Forma",
    subject: "Venda confirmada · proposta 0182",
    message:
      "O cliente aprovou a proposta de 1 230,00 €. Podem preparar a fatura com os dados da ficha de cliente?",
    result: "Lembrete de vencimento agendado",
    caption: "Da venda à cobrança, sem duplicar informação.",
  },
  {
    id: "marcacoes",
    label: "Marcações",
    title: "Uma marcação. Toda a agenda alinhada.",
    intro:
      "A hora fica reservada e o cliente recebe a confirmação e o lembrete, sem troca de mensagens.",
    before: ["Ler a mensagem", "Consultar a agenda", "Reservar a hora", "Lembrar o cliente"],
    after: ["Marcação recebida", "Hora reservada", "Confirmação enviada", "Lembrete agendado"],
    sender: "Ana Martins",
    subject: "Pedido de marcação",
    message:
      "Olá! Têm disponibilidade na quinta-feira, dia 12, às 14:30? Gostaria de marcar uma consulta.",
    result: "Confirmação e lembrete preparados",
    caption: "Uma agenda atualizada. Menos chamadas e esquecimentos.",
  },
] as const;

type Example = (typeof examples)[number];

function useSequence(paused: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef(0);
  const manuallySelected = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [revision, setRevision] = useState(0);
  const [phase, updatePhase] = useState(0);
  const [playing, setPlaying] = useState(true);
  const setPhase = (value: number) => {
    manuallySelected.current = true;
    phaseRef.current = value;
    updatePhase(value);
    timelineRef.current?.pause().seek(value * STEP_DURATION + 0.01, true);
    if (playing && !paused && !window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      timelineRef.current?.play();
  };
  const restart = () => {
    manuallySelected.current = false;
    phaseRef.current = 0;
    updatePhase(0);
    setPlaying(true);
    setRevision((value) => value + 1);
  };
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const timeline = gsap.timeline({ paused: true, repeat: -1, data: revision });
    timelineRef.current = timeline;
    for (let index = 0; index < 4; index++)
      timeline.call(
        () => {
          phaseRef.current = index;
          updatePhase(index);
        },
        [],
        index * STEP_DURATION,
      );
    if (progress.current)
      timeline.fromTo(
        progress.current,
        { scaleX: 0 },
        { scaleX: 1, duration: STEP_DURATION * 4, ease: "none" },
        0,
      );
    else timeline.to({ value: 0 }, { value: 1, duration: STEP_DURATION * 4 }, 0);
    timeline.seek(phaseRef.current * STEP_DURATION + 0.01, false);
    const sync = () => {
      if (reduced.matches) {
        timeline.pause();
        element.dataset.running = "false";
        if (!manuallySelected.current) {
          phaseRef.current = 3;
          updatePhase(3);
        }
        if (progress.current) gsap.set(progress.current, { scaleX: 1 });
        return;
      }
      const running = visible && !document.hidden && playing && !paused;
      element.dataset.running = String(running);
      if (running) timeline.play();
      else timeline.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      timeline.kill();
      timelineRef.current = null;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [paused, playing, revision]);
  useEffect(() => {
    if (!root.current || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-arrival]",
        { opacity: 0, y: 9 },
        {
          opacity: 1,
          y: 0,
          duration: phase === 0 ? 0.55 : 0.45,
          stagger: 0.07,
          ease: "power2.out",
          clearProps: "all",
        },
      );
    }, root);
    return () => context.revert();
  }, [phase, paused]);
  return { root, progress, phase, setPhase, playing, setPlaying, restart };
}

function StageDetail({ index, phase }: { index: number; phase: number }) {
  const stage = demoStages[index]?.[phase];
  if (!stage) return null;
  return (
    <div className="operation-stage-detail" key={`${index}-${phase}`} data-arrival>
      <div className="stage-route">
        <span>{stage.from}</span>
        <ArrowRight size={12} />
        <strong>{stage.to}</strong>
      </div>
      <div className="stage-detail-heading">
        <span>{String(phase + 1).padStart(2, "0")} / 04</span>
        <h5>{stage.title}</h5>
      </div>
      <dl>
        {stage.facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
      {stage.message && (
        <div className="stage-message">
          <Mail size={15} />
          <p>{stage.message}</p>
        </div>
      )}
    </div>
  );
}
function StageNarrative({
  index,
  phase,
  hero = false,
}: {
  index: number;
  phase: number;
  hero?: boolean;
}) {
  const stage = demoStages[index]?.[phase];
  if (!stage) return null;
  return (
    <div className={`stage-narrative ${hero ? "hero-stage-narrative" : ""}`}>
      <span className="stage-narrative-number">
        {String(phase + 1).padStart(2, "0")}
        <small>/ 04</small>
      </span>
      <div key={`${index}-${phase}`} data-arrival>
        <strong>{stage.title}</strong>
        <p>{hero ? heroExplanations[phase] : stage.explanation}</p>
      </div>
    </div>
  );
}

function IncomingMessage({
  example,
  phase,
  compact = false,
}: {
  example: Example;
  phase: number;
  compact?: boolean;
}) {
  return (
    <div
      className={`incoming-message ${compact ? "compact-message" : ""}`}
      data-active={phase === 0}
    >
      <span className="incoming-icon">
        <Mail size={17} />
      </span>
      <div>
        <span>{example.sender}</span>
        <strong>{example.subject}</strong>
        {!compact && <p>{example.message}</p>}
      </div>
      <span className="message-time">agora</span>
    </div>
  );
}

function BeforeScene({
  example,
  index,
  phase,
}: {
  example: Example;
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

function OrdersApp({ phase }: { phase: number }) {
  return (
    <>
      <div className="operation-heading">
        <div>
          <p>VISÃO DA OPERAÇÃO</p>
          <h4>Encomendas</h4>
        </div>
        <span className="operation-filter">
          Este mês
          <ChevronDown size={11} />
        </span>
      </div>
      <div className="operation-stats">
        <div>
          <span>Em produção</span>
          <strong>{phase >= 2 ? "13" : "12"}</strong>
        </div>
        <div>
          <span>Para entregar hoje</span>
          <strong>04</strong>
        </div>
        <div>
          <span>Pedidos por tratar</span>
          <strong>{phase >= 1 ? "00" : "01"}</strong>
        </div>
      </div>
      <div className="operation-table-wrap">
        <table className="operation-table">
          <thead>
            <tr>
              <th>Cliente / encomenda</th>
              <th>Estado</th>
              <th>Entrega</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className="new-order"
              data-current={phase >= 1}
              data-arrival={phase === 1 ? "true" : undefined}
            >
              <td>
                <span className="client-initial">AN</span>
                <span>
                  <strong>{phase >= 1 ? "Atelier Norte" : "Novo pedido a chegar"}</strong>
                  <small>
                    {phase >= 1 ? "ENC-0250 · 24 cadeiras" : "Caixa de entrada · 1 mensagem"}
                  </small>
                </span>
              </td>
              <td>
                <span className={`operation-badge ${phase >= 2 ? "badge-blue" : "badge-amber"}`}>
                  {phase >= 2 ? "Em produção" : phase >= 1 ? "Registada" : "A receber"}
                </span>
              </td>
              <td>20 nov.</td>
            </tr>
            <tr>
              <td>
                <span className="client-initial muted-initial">EF</span>
                <span>
                  <strong>Estúdio Forma</strong>
                  <small>ENC-0249 · 12 mesas</small>
                </span>
              </td>
              <td>
                <span className="operation-badge badge-green">Pronta</span>
              </td>
              <td>12 nov.</td>
            </tr>
            <tr>
              <td>
                <span className="client-initial muted-initial">CA</span>
                <span>
                  <strong>Casa Alameda</strong>
                  <small>ENC-0248 · 8 cadeiras</small>
                </span>
              </td>
              <td>
                <span className="operation-badge badge-neutral">Entregue</span>
              </td>
              <td>11 nov.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function InvoiceApp({ phase }: { phase: number }) {
  return (
    <>
      <div className="operation-heading">
        <div>
          <p>VENDAS E FATURAÇÃO</p>
          <h4>Uma venda, todos os dados.</h4>
        </div>
        <FileText size={21} />
      </div>
      <div className="invoice-document">
        <div className="invoice-document-top">
          <span>
            FATURA <strong>FT 2026 / 0148</strong>
          </span>
          <span className={`operation-badge ${phase >= 2 ? "badge-green" : "badge-amber"}`}>
            {phase >= 2 ? "Preparada" : "Em preparação"}
          </span>
        </div>
        <div className="invoice-client">
          <strong>{phase >= 1 ? "Estúdio Forma, Lda." : "A aguardar os dados da venda…"}</strong>
          <span>
            {phase >= 1 ? "Cliente 0032 · NIF de demonstração" : "Proposta aprovada · 0182"}
          </span>
        </div>
        <div className="invoice-line">
          <span>Serviços de instalação</span>
          <strong>1 000,00 €</strong>
        </div>
        <div className="invoice-line">
          <span>IVA · 23%</span>
          <span>230,00 €</span>
        </div>
        <div className="invoice-total">
          <span>Total</span>
          <strong>1 230,00 €</strong>
        </div>
        <div className="invoice-due">
          <CalendarDays size={13} />
          <span>Vencimento a 30 dias</span>
          <Check size={13} />
        </div>
      </div>
    </>
  );
}

function AppointmentsApp({ phase }: { phase: number }) {
  return (
    <>
      <div className="operation-heading">
        <div>
          <p>QUINTA-FEIRA, 12 NOVEMBRO</p>
          <h4>A sua agenda.</h4>
        </div>
        <span className="operation-filter">
          Semana
          <ChevronDown size={11} />
        </span>
      </div>
      <div className="schedule-days">
        {["SEG 09", "TER 10", "QUA 11", "QUI 12", "SEX 13"].map((day, i) => (
          <span key={day} className={i === 3 ? "selected-day" : ""}>
            {day}
          </span>
        ))}
      </div>
      <div className="schedule-body">
        <div className="schedule-times">
          <time>14:00</time>
          <time>14:30</time>
          <time>15:00</time>
        </div>
        <div className="schedule-lines">
          <span className="calendar-existing">14:00 · Joana Ribeiro</span>
          <div className="scheduled-appointment" data-booked={phase >= 1}>
            <span>14:30 — 15:15</span>
            <strong>{phase >= 1 ? "Ana Martins" : "Horário disponível"}</strong>
            <small>
              {phase >= 2 ? (
                <>
                  <CheckCheck size={12} />
                  Confirmada
                </>
              ) : phase >= 1 ? (
                "Hora reservada"
              ) : (
                "Nova marcação a chegar"
              )}
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

function AfterScene({
  example,
  index,
  phase,
  hero = false,
}: {
  example: Example;
  index: number;
  phase: number;
  hero?: boolean;
}) {
  return (
    <div className={`operation-app ${hero ? "hero-operation-app" : ""}`} data-phase={phase}>
      <div className="operation-toolbar">
        <span className="operation-company">
          <OrchestrMark
            tone="on-light"
            id={hero ? "hero-operation-mark" : `operation-mark-${index}`}
          />
          <strong>A sua empresa</strong>
          <ChevronDown size={11} />
        </span>
        <span className="operation-user">CS</span>
      </div>
      <div className="operation-content" aria-hidden={!hero} inert={!hero}>
        {index === 0 ? (
          <OrdersApp phase={phase} />
        ) : index === 1 ? (
          <InvoiceApp phase={phase} />
        ) : (
          <AppointmentsApp phase={phase} />
        )}
      </div>
      {!hero && <StageDetail index={index} phase={phase} />}
      <div className="operation-activity" key={`${index}-${phase}`} data-arrival>
        <span className={`activity-check ${phase === 3 ? "activity-complete" : ""}`}>
          {phase === 3 ? <CheckCheck size={16} /> : <Check size={15} />}
        </span>
        <div>
          <strong>{example.after[phase] ?? example.after[0]}</strong>
          <span>
            {phase === 3
              ? example.result
              : phase === 0
                ? example.subject
                : phase === 1
                  ? "Informação disponível para toda a equipa"
                  : "O processo avança sem voltar a escrever os dados"}
          </span>
        </div>
        <span className="activity-time">{`${phase + 1} / 4`}</span>
      </div>
    </div>
  );
}

export function HeroPreview({ paused }: { paused: boolean }) {
  const { root, progress, phase, setPhase } = useSequence(paused);
  const example = examples[0];
  return (
    <div ref={root} className="hero-preview process-preview" data-phase={phase}>
      <div className="hero-preview-caption">
        <span>
          <span className="signal-dot" />
          DO PEDIDO À PRODUÇÃO
        </span>
        <span>EXEMPLO ANIMADO</span>
      </div>
      <div className="hero-app-stage">
        <AfterScene example={example} index={0} phase={phase} hero />
        <div className="hero-incoming" data-visible={phase === 0}>
          <IncomingMessage example={example} phase={phase} compact />
        </div>
      </div>
      <StageNarrative index={0} phase={phase} hero />
      <div className="hero-sequence">
        {example.after.map((label, i) => (
          <button
            type="button"
            key={label}
            data-active={phase === i}
            data-complete={phase > i}
            aria-label={`Ver etapa: ${label}`}
            aria-pressed={phase === i}
            onClick={() => {
              setPhase(i);
            }}
          >
            <span>{phase > i ? <Check size={9} /> : i + 1}</span>
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="sequence-progress">
        <span ref={progress} />
      </div>
      <a href="#demonstracao" className="hero-preview-footer">
        <span>Veja o antes e o depois dos seus processos</span>
        <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

function DemoComparison({ index, motionPaused }: { index: number; motionPaused: boolean }) {
  const { root, progress, phase, setPhase, playing, setPlaying, restart } =
    useSequence(motionPaused);
  const example = examples[index] ?? examples[0];
  return (
    <div ref={root} className="demo-comparison process-preview" data-phase={phase}>
      <div className="demo-comparison-heading">
        <div>
          <h3>{example.title}</h3>
          <p>{example.intro}</p>
        </div>
        <div className="sequence-controls">
          <button
            type="button"
            aria-label={playing ? "Pausar demonstração" : "Reproduzir demonstração"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button type="button" aria-label="Recomeçar demonstração" onClick={restart}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <StageNarrative index={index} phase={phase} />
      <div className="comparison-grid">
        <div className="comparison-panel before-panel">
          <div className="comparison-label">
            <span>ANTES</span>
            <strong>O processo depende de si.</strong>
            <span className="comparison-label-note">Informação dispersa</span>
          </div>
          <BeforeScene example={example} index={index} phase={phase} />
        </div>
        <div className="comparison-panel after-panel">
          <div className="comparison-label">
            <span>DEPOIS</span>
            <strong>O processo tem um caminho.</strong>
            <span className="comparison-label-note">Informação ligada</span>
          </div>
          <AfterScene example={example} index={index} phase={phase} />
        </div>
      </div>
      <div className="comparison-bottom">
        <div className="comparison-steps">
          {example.after.map((label, i) => (
            <button
              key={label}
              type="button"
              data-active={phase === i}
              data-complete={phase > i}
              aria-pressed={phase === i}
              onClick={() => {
                setPhase(i);
                setPlaying(false);
              }}
            >
              <span>{phase > i ? <Check size={12} /> : String(i + 1).padStart(2, "0")}</span>
              {label}
              {i < 3 && <ArrowRight size={13} />}
            </button>
          ))}
        </div>
        <div className="sequence-progress">
          <span ref={progress} />
        </div>
      </div>
      <div className="comparison-note">
        <p>{example.caption}</p>
        <span>Demonstração animada · Dados ilustrativos</span>
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
      if (Number.isInteger(value) && value >= 0 && value < examples.length) setIndex(value);
    };
    window.addEventListener("orchestr:demo", select);
    return () => window.removeEventListener("orchestr:demo", select);
  }, []);
  return (
    <div className="live-demo new-live-demo">
      <div className="demo-selector" role="tablist" aria-label="Escolher demonstração">
        {examples.map((example, i) => (
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
              if (event.key === "ArrowRight") next = (i + 1) % examples.length;
              else if (event.key === "ArrowLeft")
                next = (i + examples.length - 1) % examples.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = examples.length - 1;
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
        id={`panel-${examples[index]?.id}`}
        aria-labelledby={`tab-${examples[index]?.id}`}
      >
        <DemoComparison key={index} index={index} motionPaused={motionPaused} />
      </div>
    </div>
  );
}
