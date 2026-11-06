"use client";

import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleCheck,
  FileText,
  LayoutDashboard,
  Mail,
  MoreHorizontal,
  Package,
  Pause,
  Play,
  RotateCcw,
  Search,
  Settings2,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";

const scenarios = [
  {
    id: "encomendas",
    label: "Encomendas",
    title: "Do pedido à entrega. Tudo ligado.",
    intro: "O pedido entra. A equipa sabe o que fazer. O cliente sabe em que ponto está.",
    steps: ["Pedido recebido", "Equipa notificada", "Estado atualizado", "Cliente informado"],
    event: "Nova encomenda",
    detail: "Atelier Norte · 24 unidades",
    result: "Cliente informado por email",
    module: "Encomendas",
  },
  {
    id: "faturacao",
    label: "Faturação",
    title: "A venda fecha. O resto acompanha.",
    intro:
      "Os dados seguem para a faturação e o vencimento fica acompanhado, sem voltar a escrever tudo.",
    steps: ["Venda confirmada", "Dados verificados", "Fatura preparada", "Lembrete agendado"],
    event: "Venda confirmada",
    detail: "Estúdio Forma · 850,00 €",
    result: "Lembrete de vencimento agendado",
    module: "Faturação",
  },
  {
    id: "marcacoes",
    label: "Marcações",
    title: "Uma marcação. Zero desencontros.",
    intro:
      "O cliente escolhe a hora. A agenda atualiza. A confirmação e o lembrete seguem a tempo.",
    steps: ["Marcação recebida", "Agenda atualizada", "Confirmação enviada", "Lembrete agendado"],
    event: "Nova marcação",
    detail: "Ana Martins · Quinta, 14:30",
    result: "Confirmação enviada ao cliente",
    module: "Agenda",
  },
] as const;

export function LiveDemo({ motionPaused }: { motionPaused: boolean }) {
  const [selected, setSelected] = useState(0);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [view, setView] = useState<"app" | "antes">("app");
  const [query, setQuery] = useState("");
  const [inspected, setInspected] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const scenario = scenarios[selected] ?? scenarios[0];
  const rows = [
    {
      client: "Atelier Norte",
      ref: "ENC-0248",
      item: "24 unidades",
      status: "Em produção",
      value: "1 240,00 €",
    },
    {
      client: "Estúdio Forma",
      ref: "ENC-0247",
      item: "12 unidades",
      status: "Pronta",
      value: "850,00 €",
    },
    {
      client: "Casa Alameda",
      ref: "ENC-0246",
      item: "8 unidades",
      status: "Entregue",
      value: "460,00 €",
    },
  ].filter((row) => row.client.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    const sync = () => {
      clearInterval(timer);
      if (reduced.matches) {
        setStep(3);
        return;
      }
      if (visible && playing && !motionPaused && !document.hidden && view === "app")
        timer = setInterval(() => setStep((s) => (s + 1) % 4), 2200);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, [playing, motionPaused, view]);

  const select = (index: number) => {
    setSelected(index);
    setStep(0);
    setInspected(false);
    setQuery("");
  };

  return (
    <div ref={root} className="live-demo">
      <div className="demo-selector" role="tablist" aria-label="Escolher demonstração">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${s.id}`}
            aria-selected={i === selected}
            aria-controls="demo-panel"
            tabIndex={i === selected ? 0 : -1}
            className={i === selected ? "selected" : ""}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              let next = i;
              if (e.key === "ArrowRight") next = (i + 1) % scenarios.length;
              else if (e.key === "ArrowLeft") next = (i + scenarios.length - 1) % scenarios.length;
              else if (e.key === "Home") next = 0;
              else if (e.key === "End") next = scenarios.length - 1;
              else return;
              e.preventDefault();
              select(next);
              tabs.current[next]?.focus();
            }}
          >
            <span className="mono">0{i + 1}</span>
            {s.label}
            <ArrowRight size={16} />
          </button>
        ))}
      </div>

      <div
        id="demo-panel"
        role="tabpanel"
        aria-labelledby={`tab-${scenario.id}`}
        className="demo-panel"
      >
        <div className="demo-story">
          <div>
            <h3>{scenario.title}</h3>
            <p>{scenario.intro}</p>
          </div>
          <fieldset className="view-switch" aria-label="Comparar formas de trabalhar">
            <button type="button" onClick={() => setView("antes")} aria-pressed={view === "antes"}>
              Hoje, à mão
            </button>
            <button type="button" onClick={() => setView("app")} aria-pressed={view === "app"}>
              Com a Orchestr <Sparkles size={12} />
            </button>
          </fieldset>
        </div>

        <div className="demo-stage" data-before={view === "antes"}>
          {view === "antes" ? (
            <div className="before-scene">
              <div className="sheet-window">
                <div className="sheet-title">
                  <FileText size={16} />
                  {scenario.id}_final_v3.xlsx <span>Só de leitura</span>
                </div>
                <div className="sheet-grid">
                  {[
                    "",
                    "A",
                    "B",
                    "C",
                    "1",
                    "Cliente",
                    "Estado",
                    "Notas",
                    "2",
                    "Atelier Norte",
                    "Por confirmar",
                    "Ligar?",
                    "3",
                    "Estúdio Forma",
                    "???",
                    "Ver email",
                    "4",
                    "Casa Alameda",
                    "Pendente",
                    "Quem tratou?",
                    "5",
                    "...",
                    "...",
                    "...",
                  ].map((cell, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: immutable decorative spreadsheet cells.
                    <span key={`${i}-${cell}`} className={i < 4 || i % 4 === 0 ? "sheet-axis" : ""}>
                      {cell}
                    </span>
                  ))}
                </div>
              </div>
              <div className="floating-note note-one">
                <Mail size={17} />
                <div>
                  <strong>Re: Re: Estado do pedido</strong>
                  <span>Alguém já respondeu ao cliente?</span>
                </div>
              </div>
              <div className="floating-note note-two">
                <Bell size={17} />
                <div>
                  <strong>Uma tarefa por fechar.</strong>
                  <span>Mais uma coisa para não esquecer.</span>
                </div>
              </div>
              <p className="before-caption">A informação existe. Está espalhada.</p>
            </div>
          ) : (
            <div className="app-window">
              <aside className="app-sidebar" aria-hidden="true">
                <div className="app-brand">
                  <OrchestrMark id="demo-mark" tone="on-light" />
                  <span>A sua empresa</span>
                </div>
                <div className="workspace-name">
                  Espaço de trabalho
                  <ChevronDown size={12} />
                </div>
                {[
                  [LayoutDashboard, "Visão geral"],
                  [Package, "Encomendas"],
                  [FileText, "Faturação"],
                  [CalendarDays, "Agenda"],
                  [Users, "Clientes"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Package;
                  return (
                    <div
                      key={label as string}
                      className={`app-nav-item ${label === scenario.module ? "active" : ""}`}
                    >
                      <I size={15} />
                      {label as string}
                    </div>
                  );
                })}
                <div className="sidebar-bottom">
                  <span className="avatar">CS</span>
                  <div>
                    Cristiano Sousa<small>Administrador</small>
                  </div>
                  <Settings2 size={14} />
                </div>
              </aside>
              <div className="app-main">
                <div className="app-topbar">
                  <span>
                    Espaço de trabalho <span>/</span> {scenario.module}
                  </span>
                  <span className="app-sandbox">
                    <span />
                    Demonstração
                  </span>
                </div>
                <div className="app-heading">
                  <div>
                    <span className="app-date">QUINTA-FEIRA, 12 DE NOVEMBRO</span>
                    <h4>
                      {scenario.module === "Agenda"
                        ? "A sua agenda, organizada."
                        : scenario.module === "Faturação"
                          ? "Tudo certo com as contas."
                          : "Cada pedido, no sítio certo."}
                    </h4>
                    <p>O essencial do seu negócio, num só lugar.</p>
                  </div>
                  <div className="demo-avatar">CS</div>
                </div>
                <div className="app-metrics">
                  {(selected === 0
                    ? [
                        ["Em produção", "12", "4 para hoje"],
                        ["Prontas a entregar", "04", "Tudo a tempo"],
                        ["Volume de encomendas", "8 450 €", "Este mês"],
                      ]
                    : selected === 1
                      ? [
                          ["Por receber", "3 240 €", "6 faturas"],
                          ["Recebido este mês", "12 850 €", "18 pagamentos"],
                          ["Lembretes", "04", "Agendados"],
                        ]
                      : [
                          ["Marcações hoje", "08", "Agenda atualizada"],
                          ["Confirmadas", "06", "Clientes informados"],
                          ["Vagas disponíveis", "02", "Esta semana"],
                        ]
                  ).map(([label, value, detail]) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{value}</strong>
                      <small>{detail}</small>
                    </div>
                  ))}
                </div>
                {selected === 0 ? (
                  <div className="orders-board">
                    <div className="board-heading">
                      <strong>Últimas encomendas</strong>
                      <label className="demo-search">
                        <Search size={13} />
                        <span className="sr-only">Pesquisar cliente na demonstração</span>
                        <input
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          placeholder="Pesquisar cliente..."
                        />
                      </label>
                    </div>
                    <div className="order-row table-head">
                      <span>Cliente / Referência</span>
                      <span>Estado</span>
                      <span>Valor</span>
                      <span />
                    </div>
                    {rows.map((row, i) => (
                      <button
                        type="button"
                        key={row.ref}
                        className="order-row"
                        onClick={() => setInspected((v) => !v)}
                        aria-label={`Ver detalhes de ${row.ref}`}
                      >
                        <span>
                          <b>{row.client}</b>
                          <small>
                            {row.ref} · {row.item}
                          </small>
                        </span>
                        <span className={`order-state state-${i}`}>{row.status}</span>
                        <span>{row.value}</span>
                        <MoreHorizontal size={16} />
                      </button>
                    ))}
                    {rows.length === 0 && (
                      <p className="empty-search">Nenhum cliente encontrado.</p>
                    )}
                    {inspected && (
                      <div className="order-detail" role="status">
                        <CircleCheck size={16} />
                        <span>
                          Histórico atualizado. Responsável: Cristiano · Prazo: 14 de novembro.
                        </span>
                        <button
                          type="button"
                          aria-label="Fechar detalhes"
                          onClick={() => setInspected(false)}
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </div>
                ) : selected === 1 ? (
                  <div className="invoice-preview">
                    <div className="invoice-icon">
                      <FileText size={27} />
                    </div>
                    <div>
                      <span className="mono">FT 2026 / 0148</span>
                      <h5>Estúdio Forma</h5>
                      <p>Consultoria e serviços · Vencimento em 30 dias</p>
                    </div>
                    <strong>850,00 €</strong>
                    <span className="invoice-status">
                      <Check size={12} />
                      {step >= 2 ? "Preparada" : "A verificar"}
                    </span>
                  </div>
                ) : (
                  <div className="calendar-preview">
                    <div className="calendar-week">
                      {["SEG 09", "TER 10", "QUA 11", "QUI 12", "SEX 13"].map((day, i) => (
                        <span key={day} className={i === 3 ? "current" : ""}>
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      <span className="calendar-time">
                        14:00
                        <br />
                        <br />
                        15:00
                      </span>
                      <div className="appointment">
                        <span>14:30 — 15:15</span>
                        <strong>Ana Martins</strong>
                        <small>
                          <CheckCheck size={12} />
                          {step >= 2 ? "Confirmada" : "A confirmar"}
                        </small>
                      </div>
                    </div>
                  </div>
                )}
                <div className="automation-feed">
                  <div className="feed-symbol">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <strong>{step >= 3 ? scenario.result : scenario.event}</strong>
                    <span>
                      {step >= 3 ? "Processo concluído · Sem intervenção manual" : scenario.detail}
                    </span>
                  </div>
                  <span className={`feed-state ${step >= 3 ? "done" : ""}`}>
                    {step >= 3 ? <CheckCheck size={16} /> : <span className="processing-dot" />}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="demo-timeline">
          <fieldset className="demo-steps" aria-label="Etapas da demonstração">
            {scenario.steps.map((label, i) => (
              <button
                key={label}
                type="button"
                className={view === "app" && step >= i ? "complete" : ""}
                onClick={() => {
                  setView("app");
                  setStep(i);
                  setPlaying(false);
                }}
                aria-pressed={view === "app" && step === i}
              >
                <span>{step > i && view === "app" ? <Check size={11} /> : `0${i + 1}`}</span>
                {label}
                <ArrowRight size={12} />
              </button>
            ))}
          </fieldset>
          <button
            type="button"
            className="demo-play"
            aria-label={playing ? "Pausar demonstração" : "Reproduzir demonstração"}
            onClick={() => setPlaying(!playing)}
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
          </button>
          <button
            type="button"
            className="demo-play"
            aria-label="Recomeçar demonstração"
            onClick={() => {
              setStep(0);
              setPlaying(true);
              setView("app");
            }}
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>
      <div className="demo-footnote">
        <span>
          <span className="tiny-cross">+</span> Explore os separadores, pesquise um cliente ou
          escolha uma etapa.
        </span>
        <span>Simulação interativa · Dados ilustrativos</span>
      </div>
    </div>
  );
}
