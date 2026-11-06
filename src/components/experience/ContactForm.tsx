"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Copy,
  Download,
  Globe2,
  Layers3,
  PlugZap,
} from "lucide-react";
import { useId, useRef, useState } from "react";
import { contactHref, site } from "@/lib/site";

const services = [
  { name: "Aplicação à medida", detail: "Organizar a operação", icon: Layers3 },
  { name: "Automação", detail: "Ligar os seus processos", icon: PlugZap },
  { name: "Site ou loja", detail: "Criar uma presença digital", icon: Globe2 },
];
const prompts = [
  {
    label: "Encomendas",
    text: "Registamos encomendas em Excel e confirmamos os estados por telefone. Queremos uma visão partilhada de pedidos, prazos e responsáveis.",
  },
  {
    label: "Marcações",
    text: "As marcações chegam por mensagem e são registadas numa agenda. Queremos organizar a disponibilidade e enviar confirmações e lembretes.",
  },
  {
    label: "Orçamentos",
    text: "Preparamos cada orçamento manualmente e é difícil acompanhar as respostas. Precisamos de reunir propostas, preços e decisões num só lugar.",
  },
];

export function ContactForm() {
  const id = useId();
  const [step, setStep] = useState(1);
  const [service, setService] = useState("Aplicação à medida");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("Sem data definida");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const field = useRef<HTMLTextAreaElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const result = useRef<HTMLDivElement>(null);
  const isExample = site.email.endsWith("@example.com");
  const go = (next: number) => {
    setStep(next);
    setError("");
    requestAnimationFrame(() => heading.current?.focus());
  };
  const save = () => {
    const url = URL.createObjectURL(new Blob([prepared], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pedido-orchestr.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="project-brief">
      <div className="brief-top">
        <div className="brief-steps">
          <span data-current={step === 1} data-done={step > 1}>
            <i>{step > 1 ? <Check size={12} /> : "01"}</i>O seu projeto
          </span>
          <span className="brief-step-line" />
          <span data-current={step === 2}>
            <i>02</i>O seu contacto
          </span>
        </div>
        <span className="brief-duration">2 MINUTOS</span>
      </div>
      {prepared ? (
        <div ref={result} tabIndex={-1} className="brief-result" role="status">
          <span className="brief-success-icon">
            <CheckCheck size={28} />
          </span>
          <h3>O primeiro passo está preparado.</h3>
          <p>
            {isExample
              ? "Este é um formulário de exemplo. Reveja e guarde o pedido; nenhum email foi enviado."
              : "Confirme o envio no seu programa de email. Pode também guardar uma cópia."}
          </p>
          <pre>{prepared}</pre>
          <div className="brief-result-actions">
            <button
              type="button"
              className="action action-dark"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(prepared);
                  setCopied(true);
                } catch {
                  setError("Selecione o texto acima para o copiar.");
                }
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
              {copied ? "Pedido copiado" : "Copiar pedido"}
            </button>
            <button type="button" className="brief-save" onClick={save}>
              <Download size={17} />
              Guardar .txt
            </button>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button
            className="brief-back"
            type="button"
            onClick={() => {
              setPrepared("");
              go(2);
            }}
          >
            <ArrowLeft size={15} />
            Editar pedido
          </button>
        </div>
      ) : (
        <form
          className="advanced-contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            setError("");
            if (step === 1) {
              if (description.trim().length < 12) {
                setError("Conte-nos um pouco mais sobre o processo, numa frase.");
                field.current?.focus();
                return;
              }
              go(2);
              return;
            }
            const body = `Olá, Orchestr.\n\nInteresse: ${service}\nProcesso: ${description.trim()}\nPrazo desejado: ${deadline}\n\nNome: ${name.trim()}\nEmpresa: ${company.trim()}\nEmail: ${email.trim()}`;
            setPrepared(body);
            setCopied(false);
            if (!isExample) window.location.href = contactHref("Pedido de demonstração", body);
            requestAnimationFrame(() => result.current?.focus());
          }}
        >
          <div className="brief-form-heading">
            <span className="eyebrow">
              {step === 1 ? "COMEÇAMOS PELO QUE IMPORTA" : "COM QUEM VAMOS CONVERSAR?"}
            </span>
            <h3 ref={heading} tabIndex={-1}>
              {step === 1 ? "O que gostaria de fazer melhor?" : "Dê um rosto à sua ideia."}
            </h3>
            <p>
              {step === 1
                ? "Uma ideia é suficiente para começarmos. Os detalhes afinamos em conjunto."
                : "Ficamos com o contexto certo para uma primeira conversa útil."}
            </p>
          </div>
          {step === 1 ? (
            <div className="brief-form-fields" key="project">
              <fieldset className="brief-service-fieldset">
                <legend>Qual é o ponto de partida?</legend>
                <div className="brief-service-options">
                  {services.map((item) => (
                    <label key={item.name} data-selected={service === item.name}>
                      <input
                        type="radio"
                        name="servico"
                        value={item.name}
                        checked={service === item.name}
                        onChange={() => setService(item.name)}
                      />
                      <item.icon size={21} strokeWidth={1.4} />
                      <strong>{item.name}</strong>
                      <span>{item.detail}</span>
                      <i>{service === item.name && <Check size={10} />}</i>
                    </label>
                  ))}
                </div>
              </fieldset>
              <label className="brief-field" htmlFor={`${id}-process`}>
                O que acontece hoje e o que gostaria de mudar?
                <textarea
                  ref={field}
                  id={`${id}-process`}
                  name="processo"
                  rows={3}
                  maxLength={1000}
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setError("");
                  }}
                  placeholder="Por exemplo: a informação está espalhada entre Excel, emails e mensagens…"
                  aria-invalid={!!error}
                  aria-describedby={error ? `${id}-error` : undefined}
                  required
                />
              </label>
              <div className="brief-examples">
                <span>Precisa de um ponto de partida?</span>
                {prompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt.label}
                    onClick={() => {
                      setDescription(prompt.text);
                      setError("");
                      field.current?.focus();
                    }}
                  >
                    {prompt.label}
                    <ArrowUpRight size={11} />
                  </button>
                ))}
              </div>
              <label className="brief-field brief-select" htmlFor={`${id}-deadline`}>
                Quando gostaria de começar?
                <select
                  id={`${id}-deadline`}
                  value={deadline}
                  onChange={(event) => setDeadline(event.target.value)}
                >
                  <option>Sem data definida</option>
                  <option>Assim que possível</option>
                  <option>No próximo mês</option>
                  <option>Nos próximos 3 meses</option>
                  <option>Estou a explorar possibilidades</option>
                </select>
              </label>
            </div>
          ) : (
            <div className="brief-form-fields" key="contact">
              <div className="brief-project-summary">
                <span className="summary-check">
                  <Check size={15} />
                </span>
                <div>
                  <strong>{service}</strong>
                  <span>{deadline}</span>
                </div>
                <button type="button" onClick={() => go(1)}>
                  Editar
                </button>
              </div>
              <div className="brief-contact-grid">
                <label className="brief-field" htmlFor={`${id}-name`}>
                  O seu nome
                  <input
                    autoComplete="name"
                    id={`${id}-name`}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Nome e apelido"
                    maxLength={120}
                    required
                  />
                </label>
                <label className="brief-field" htmlFor={`${id}-company`}>
                  Empresa
                  <input
                    autoComplete="organization"
                    id={`${id}-company`}
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    placeholder="Nome da empresa"
                    maxLength={120}
                    required
                  />
                </label>
              </div>
              <label className="brief-field" htmlFor={`${id}-email`}>
                Email profissional
                <input
                  autoComplete="email"
                  type="email"
                  id={`${id}-email`}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nome@empresa.pt"
                  maxLength={160}
                  required
                />
              </label>
              <div className="brief-contact-note">
                <span className="signal-dot" />
                <p>
                  A primeira conversa é gratuita. Falamos sobre o seu processo e exploramos uma
                  solução antes de qualquer compromisso.
                </p>
              </div>
            </div>
          )}
          {error && (
            <p className="form-error" role="alert" id={`${id}-error`}>
              {error}
            </p>
          )}
          <div className="brief-form-bottom">
            {step === 2 ? (
              <button className="brief-back" type="button" onClick={() => go(1)}>
                <ArrowLeft size={15} />
                Voltar
              </button>
            ) : (
              <span>
                Sem compromisso.
                <br />
                <strong>À medida desde o primeiro contacto.</strong>
              </span>
            )}
            <button className="action action-dark" type="submit">
              {step === 1 ? "Continuar" : isExample ? "Preparar pedido" : "Pedir demonstração"}
              <ArrowRight size={17} />
            </button>
          </div>
          <p className="brief-privacy">
            {isExample
              ? "Preview demonstrativo. Nenhum pedido é enviado."
              : "Abre o seu email com o pedido preenchido."}
            <a href="/privacidade">
              Como tratamos os seus dados
              <ArrowUpRight size={11} />
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
