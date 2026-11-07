"use client";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  Link2,
  Mail,
  MousePointer2,
  Package,
  Send,
  Settings2,
  Users,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { OrchestrMark } from "@/components/brand/OrchestrLogo";
import { demoStages } from "@/lib/demo-stages";
import { gsap } from "@/lib/motion";
import { processExamples } from "@/lib/process-examples";
import styles from "./StudioPreview.module.css";

function Field({ label, value, fill = false }: { label: string; value: string; fill?: boolean }) {
  return (
    <div className={styles.field}>
      <span>{label}</span>
      <div>
        <strong data-studio-fill={fill ? value : undefined}>{value}</strong>
        {fill && <Check size={12} className={styles.fieldCheck} aria-hidden />}
      </div>
    </div>
  );
}

const statuses = [
  ["Novo pedido", "Rascunho", "Produção", "Confirmação"],
  ["Aprovada", "Rascunho", "A validar", "Lembrete"],
  ["Novo pedido", "Disponível", "Confirmação", "Lembrete"],
];
const doneLabels = [
  ["Pedido aberto", "Encomenda criada", "Produção atribuída", "Confirmação enviada"],
  ["Proposta aberta", "Dados preenchidos", "Pronto para validar", "Lembrete agendado"],
  ["Horário disponível", "Horário reservado", "Confirmação enviada", "Lembrete agendado"],
];

/** Studio: the approved application composition, shared by the hero and all three examples. */
export function StudioPreview({
  index,
  phase,
  hero = false,
  still,
  running,
  onComplete,
}: {
  index: number;
  phase: number;
  hero?: boolean;
  still: boolean;
  running: boolean;
  onComplete: () => void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const example = processExamples[index] ?? processExamples[0];
  const stage = demoStages[index]?.[phase];
  const done = doneLabels[index]?.[phase] ?? "Concluído";
  const scheduling = phase === 3 && index !== 0;
  const sender = index === 1 ? "EF" : "AN";

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;
    const values = [...element.querySelectorAll<HTMLElement>("[data-studio-fill]")];
    if (still) {
      element.dataset.complete = "true";
      values.forEach((field) => {
        field.textContent = field.dataset.studioFill ?? "";
      });
      return;
    }
    const context = gsap.context(() => {
      element.dataset.complete = "false";
      element.dataset.clicked = "false";
      const pointer = element.querySelector("[data-studio-pointer]");
      const target = element.querySelector("[data-studio-action]");
      const ring = element.querySelector("[data-studio-ring]");
      if (!pointer || !target || !ring) return;
      const aim = () => {
        const base = element.getBoundingClientRect();
        const button = target.getBoundingClientRect();
        return {
          x: button.x - base.x + button.width * 0.68,
          y: button.y - base.y + button.height * 0.55,
        };
      };
      const tl = gsap.timeline({ paused: true });
      animation.current = tl;
      tl.fromTo(
        "[data-studio-enter]",
        { opacity: 0, y: 5 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        0,
      );
      values.forEach((field, i) => {
        const value = field.dataset.studioFill ?? "";
        const text = { length: 0 };
        field.textContent = "";
        tl.set(field, { attr: { "data-typing": "true" } }, 0.55 + i * 0.18);
        tl.to(
          text,
          {
            length: value.length,
            duration: Math.min(1, 0.35 + value.length * 0.011),
            ease: "none",
            onUpdate: () => {
              field.textContent = value.slice(0, Math.floor(text.length));
            },
            onComplete: () => {
              field.dataset.typing = "false";
            },
          },
          0.55 + i * 0.18,
        );
      });
      if (element.querySelector(`.${styles.fieldCheck}`))
        tl.fromTo(
          `.${styles.fieldCheck}`,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.18 },
          1.3,
        );
      tl.set(pointer, { x: () => aim().x - 65, y: () => aim().y - 42, opacity: 0 });
      tl.to(
        pointer,
        {
          x: () => aim().x - 4,
          y: () => aim().y - 4,
          opacity: 1,
          duration: 1.1,
          ease: "power2.inOut",
        },
        2.4,
      );
      tl.to(pointer, { scale: 0.86, duration: 0.14, repeat: 1, yoyo: true }, 3.65);
      tl.set(element, { attr: { "data-clicked": "true" } }, 3.65);
      tl.fromTo(
        ring,
        { x: () => aim().x - 10, y: () => aim().y - 10, scale: 0.3, opacity: 0.75 },
        { scale: 2.4, opacity: 0, duration: 0.75, ease: "power2.out" },
        3.65,
      );
      if (element.querySelector(`.${styles.reservation}`))
        tl.fromTo(`.${styles.reservation}`, { opacity: 0.35 }, { opacity: 1, duration: 0.7 }, 3.85);
      if (element.querySelector(`.${styles.productionProgress}`))
        tl.fromTo(
          `.${styles.productionProgress} i`,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.55, stagger: 0.15, ease: "power2.out" },
          3.85,
        );
      tl.set(element, { attr: { "data-complete": "true", "data-clicked": "false" } }, 4.5);
      tl.to(pointer, { opacity: 0, duration: 0.4 }, 4.5);
    }, element);
    return () => {
      context.revert();
      animation.current = null;
      values.forEach((field) => {
        field.textContent = field.dataset.studioFill ?? "";
        field.dataset.typing = "false";
      });
    };
  }, [still]);

  // Pause the current action at its actual position; resuming never jumps to its outcome.
  useEffect(() => {
    if (running && !still) animation.current?.play();
    else animation.current?.pause();
  }, [running, still]);

  if (!stage) return null;

  const action = (
    <button
      className={styles.action}
      type="button"
      data-studio-action
      onClick={onComplete}
      aria-label={example.commands[phase]}
    >
      <span className={styles.actionReady}>
        {example.commands[phase]}
        <ArrowRight size={13} />
      </span>
      <span className={styles.actionDone} aria-hidden>
        {done}
        <Check size={13} />
      </span>
    </button>
  );
  const footer = (text: string) => (
    <div className={styles.cardFooter}>
      <span>
        <Link2 size={12} />
        {text}
      </span>
      {action}
    </div>
  );

  return (
    <div
      ref={root}
      className={styles.window}
      data-studio-window
      data-example={example.id}
      data-phase={phase}
      data-complete={still}
      data-hero={hero}
    >
      <div className={styles.titlebar}>
        <span className={styles.traffic} aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.appName}>
          <OrchestrMark id={`studio-${hero ? "hero" : example.id}`} />A sua empresa
        </span>
        <span className={styles.windowMode}>
          <i />
          Demonstração<span className={styles.profile}>JN</span>
        </span>
      </div>
      <div className={styles.layout}>
        <div className={styles.sidebar} aria-hidden>
          {[Mail, FileText, index === 2 ? CalendarDays : Package, Users].map((Icon, i) => (
            <span
              key={i === 2 ? "operation" : ["inbox", "record", "", "messages"][i]}
              className={styles.sidebarItem}
              data-active={phase === i}
            >
              <Icon size={15} />
            </span>
          ))}
          <span className={`${styles.sidebarItem} ${styles.settings}`}>
            <Settings2 size={15} />
          </span>
        </div>
        <div className={styles.main}>
          <div className={styles.breadcrumb}>
            <span>
              Operação
              <ChevronRight size={10} />
              <strong>{example.tabs[phase]}</strong>
            </span>
            <span className={styles.status} data-waiting={phase === 0}>
              {statuses[index]?.[phase]}
            </span>
          </div>
          <div className={styles.scene}>
            {phase === 0 ? (
              <div className={styles.card} data-studio-enter>
                <div className={styles.sender}>
                  <span className={styles.avatar} data-warm>
                    {sender}
                  </span>
                  <div>
                    <strong>{example.sender}</strong>
                    <small>
                      {index === 2 ? "Pedido de marcação · Agora" : "Caixa de entrada · Agora"}
                    </small>
                  </div>
                  <BrandIcon brand={index === 2 ? "whatsapp" : "outlook"} />
                </div>
                <h4 className={styles.mailSubject}>{example.subject}</h4>
                <p className={styles.mailMessage}>{example.message}</p>
                <div className={styles.cardFooter}>
                  <span>
                    <Clock3 size={12} />
                    {index === 1 ? "Venda aprovada" : "Novo pedido"}
                  </span>
                  {action}
                </div>
              </div>
            ) : phase === 1 && index !== 2 ? (
              <div data-studio-enter>
                <div className={styles.sceneHeading}>
                  <div>
                    <h4>{index === 0 ? "Nova encomenda" : "Preparar o documento"}</h4>
                    <p>
                      {index === 0
                        ? "Dados obtidos a partir do email da Ana"
                        : "Proposta 0182 · Ficha de cliente 0032"}
                    </p>
                  </div>
                  <span className={styles.subtleBadge}>6 campos ligados</span>
                </div>
                <div className={styles.card}>
                  <div className={styles.fields}>
                    {(index === 0
                      ? [
                          ["Cliente", "Atelier Norte"],
                          ["Referência", "ENC-0250"],
                          ["Artigo", "Cadeira Norte"],
                          ["Quantidade", "24 unidades"],
                          ["Entrega prevista", "20 novembro"],
                          ["Origem", "Email da Ana"],
                        ]
                      : [
                          ["Cliente", "Estúdio Forma, Lda."],
                          ["Referência", "FT 2026 / 0148"],
                          ["Serviços", "Instalação"],
                          ["Valor sem IVA", "1 000,00 €"],
                          ["IVA · 23%", "230,00 €"],
                          ["Total", "1 230,00 €"],
                        ]
                    ).map(([label, value]) => (
                      <Field key={label} label={label ?? ""} value={value ?? ""} fill />
                    ))}
                  </div>
                  {footer("Sem voltar a escrever")}
                </div>
              </div>
            ) : phase === 2 && index === 0 ? (
              <div data-studio-enter>
                <div className={styles.sceneHeading}>
                  <div>
                    <h4>Preparar a produção</h4>
                    <p>ENC-0250 · Atelier Norte</p>
                  </div>
                  <span className={styles.subtleBadge}>24 unidades</span>
                </div>
                <div className={styles.card}>
                  <div className={styles.fields}>
                    <Field label="Artigo" value="Cadeira Norte" />
                    <Field label="Entrega prevista" value="20 novembro" />
                  </div>
                  <div className={styles.assignee}>
                    <span className={styles.avatar}>JS</span>
                    <div>
                      <strong>João Silva</strong>
                      <small>Equipa de produção · Disponível</small>
                    </div>
                    <span className={styles.selected}>Selecionado</span>
                  </div>
                  <div className={styles.productionProgress} aria-hidden>
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  {footer("Prazo partilhado com a equipa")}
                </div>
              </div>
            ) : phase === 2 && index === 1 ? (
              <div data-studio-enter>
                <div className={styles.sceneHeading}>
                  <div>
                    <h4>Conferir antes de emitir</h4>
                    <p>Documento preparado para a equipa financeira</p>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.invoice}`}>
                  <div className={styles.invoiceTitle}>
                    <span>
                      <FileText size={18} />
                      <strong>FT 2026 / 0148</strong>
                    </span>
                    <span>Rascunho</span>
                  </div>
                  <p>
                    Estúdio Forma, Lda.<small>Cliente 0032 · Proposta 0182</small>
                  </p>
                  <div className={styles.invoiceLine}>
                    <span>Serviços de instalação</span>
                    <strong>1 000,00 €</strong>
                  </div>
                  <div className={styles.invoiceLine}>
                    <span>IVA · 23%</span>
                    <span>230,00 €</span>
                  </div>
                  <div className={`${styles.invoiceLine} ${styles.total}`}>
                    <span>Total</span>
                    <strong>1 230,00 €</strong>
                  </div>
                  {footer("A equipa confere os valores")}
                </div>
              </div>
            ) : phase === 1 && index === 2 ? (
              <div data-studio-enter>
                <div className={styles.sceneHeading}>
                  <div>
                    <h4>Uma hora, uma marcação.</h4>
                    <p>Agenda partilhada · Quinta-feira, 12 novembro</p>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.calendar}`}>
                  <div className={styles.calendarDays}>
                    {["SEG 09", "TER 10", "QUA 11", "QUI 12", "SEX 13"].map((day, i) => (
                      <span key={day} data-selected={i === 3}>
                        {day}
                      </span>
                    ))}
                  </div>
                  <div className={styles.calendarSlot}>
                    <time>14:00</time>
                    <div>
                      <strong>Joana Ribeiro</strong>
                      <small>Consulta de acompanhamento</small>
                    </div>
                  </div>
                  <div className={`${styles.calendarSlot} ${styles.reservation}`}>
                    <time>14:30</time>
                    <div>
                      <strong data-studio-fill="Ana Martins">Ana Martins</strong>
                      <small>Consulta inicial · 45 min. · Até às 15:15</small>
                    </div>
                    <Check size={14} />
                  </div>
                  {footer("Disponibilidade verificada")}
                </div>
              </div>
            ) : (
              <div data-studio-enter>
                <div className={styles.sceneHeading}>
                  <div>
                    <h4>{scheduling ? "Agendar o lembrete" : "Confirmar ao cliente"}</h4>
                    <p>
                      {index === 0
                        ? "ENC-0250 · Produção atribuída"
                        : index === 1
                          ? "FT 2026 / 0148 · Prazo de 30 dias"
                          : "12 novembro · 14:30–15:15"}
                    </p>
                  </div>
                  <span className={styles.subtleBadge}>
                    {scheduling ? <Clock3 size={12} /> : <Send size={12} />}
                    {scheduling ? "Programado" : "Pronto a enviar"}
                  </span>
                </div>
                <div className={styles.card}>
                  <div className={styles.sender}>
                    <span className={styles.avatar} data-warm>
                      {sender}
                    </span>
                    <div>
                      <strong>Para: {index === 1 ? "Estúdio Forma" : "Ana Martins"}</strong>
                      <small>
                        {scheduling
                          ? "Lembrete associado ao registo"
                          : "Resposta ao pedido original"}
                      </small>
                    </div>
                    <BrandIcon brand="outlook" />
                  </div>
                  <div className={styles.messageBody}>
                    <strong>
                      {index === 0
                        ? "Encomenda ENC-0250 confirmada."
                        : index === 1
                          ? "Vencimento da fatura FT 2026 / 0148."
                          : scheduling
                            ? "Recordatório da sua consulta."
                            : "A sua consulta está confirmada."}
                    </strong>
                    <p
                      data-studio-fill={
                        stage.message ??
                        (index === 1
                          ? "O lembrete será enviado 2 dias antes do vencimento. Valor a pagamento: 1 230,00 €."
                          : "Olá, Ana. Recordamos a sua consulta de quinta-feira, dia 12, às 14:30. O lembrete será enviado 24 horas antes.")
                      }
                    >
                      {stage.message ??
                        (index === 1
                          ? "O lembrete será enviado 2 dias antes do vencimento. Valor a pagamento: 1 230,00 €."
                          : "Olá, Ana. Recordamos a sua consulta de quinta-feira, dia 12, às 14:30. O lembrete será enviado 24 horas antes.")}
                    </p>
                  </div>
                  {footer(
                    scheduling
                      ? index === 1
                        ? "2 dias antes do vencimento"
                        : "24 horas antes da consulta"
                      : "Dados do registo incluídos",
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={styles.feedback} role="status" aria-live="off">
            <div className={styles.feedbackPending}>
              <span className={styles.connectionDot} />
              <span>
                {stage.from}
                <ArrowRight size={11} />
                {stage.to}
              </span>
            </div>
            <div className={styles.feedbackDone}>
              <Check size={15} />
              <div>
                <strong>{example.confirmations[phase]}</strong>
                <small>
                  {phase === 2 && index === 0
                    ? "Responsável, quantidade e prazo no mesmo lugar."
                    : scheduling
                      ? "A próxima ação fica ligada ao registo."
                      : "Informação partilhada, sem duplicação."}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span className={styles.pointer} data-studio-pointer aria-hidden>
        <MousePointer2 size={25} fill="currentColor" strokeWidth={1.6} />
      </span>
      <span className={styles.ring} data-studio-ring aria-hidden />
    </div>
  );
}
