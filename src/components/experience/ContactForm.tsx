"use client";

import { ArrowLeft, ArrowUpRight, Check, Copy, Download, MessageSquare, Plus } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { type BriefContext, briefServices } from "@/lib/brief-context";
import { contactHref, site } from "@/lib/site";
import { ServiceSelect } from "./ServiceSelect";

export function ContactForm() {
  const id = useId();
  const [context, setContext] = useState<BriefContext>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const isExample = site.email.endsWith("@example.com");

  useEffect(() => {
    const select = (event: Event) => {
      const detail = (event as CustomEvent<BriefContext>).detail;
      if (!detail) return;
      setContext({
        service: briefServices.some((service) => service === detail.service)
          ? detail.service
          : undefined,
        plan: typeof detail.plan === "string" ? detail.plan : undefined,
      });
      setPrepared("");
      setError("");
    };
    window.addEventListener("orchestr:brief", select);
    return () => window.removeEventListener("orchestr:brief", select);
  }, []);

  const save = () => {
    const url = URL.createObjectURL(new Blob([prepared], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "conversa-orchestr.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <div className="conversation-card">
      {prepared ? (
        <div className="conversation-result" ref={result} tabIndex={-1} role="status">
          <span className="conversation-result-icon">
            <Check size={22} />
          </span>
          <h3>O seu pedido está preparado.</h3>
          <p>
            {isExample
              ? "Esta é uma demonstração. Pode guardar o resumo; nenhum email foi enviado."
              : "Confirme o envio no seu programa de email para iniciarmos a conversa."}
          </p>
          <details className="conversation-summary">
            <summary>Ver resumo do pedido</summary>
            <pre>{prepared}</pre>
          </details>
          <div className="conversation-result-actions">
            <button
              className="action action-dark"
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(prepared);
                  setCopied(true);
                } catch {
                  setError("Abra o resumo para selecionar e copiar o texto.");
                }
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Copiado" : "Copiar pedido"}
            </button>
            <button className="conversation-download" type="button" onClick={save}>
              <Download size={16} />
              Guardar .txt
            </button>
          </div>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <button
            type="button"
            className="conversation-edit"
            onClick={() => {
              setPrepared("");
              setError("");
            }}
          >
            <ArrowLeft size={14} />
            Editar contacto
          </button>
        </div>
      ) : (
        <form
          className="conversation-form"
          onSubmit={(event) => {
            event.preventDefault();
            const body = `Olá, Orchestr.\n\nGostaria de marcar uma primeira conversa.\nInteresse: ${context.service || "Explorar uma solução"}${context.plan ? `\nPlano: ${context.plan}` : ""}\n\nNome: ${name.trim()}\nEmail: ${email.trim()}${message.trim() ? `\n\nMensagem: ${message.trim()}` : ""}`;
            setPrepared(body);
            setCopied(false);
            setError("");
            if (!isExample) window.location.href = contactHref("Primeira conversa", body);
            requestAnimationFrame(() => result.current?.focus());
          }}
        >
          <div className="conversation-heading">
            <span className="conversation-heading-icon">
              <MessageSquare size={19} strokeWidth={1.5} />
            </span>
            <div>
              <h3>O seu contacto.</h3>
              <p>Uma primeira conversa, sem compromisso.</p>
            </div>
          </div>
          <div className="conversation-context">
            <span className="conversation-context-label" id={`${id}-service-label`}>
              Sobre
            </span>
            <ServiceSelect
              id={`${id}-service`}
              labelledBy={`${id}-service-label`}
              value={context.service || ""}
              onChange={(value) => setContext({ service: value || undefined })}
            />
            {context.plan && <span className="conversation-plan">{context.plan}</span>}
          </div>
          <div className="conversation-fields">
            <label htmlFor={`${id}-name`}>
              Nome
              <input
                id={`${id}-name`}
                name="nome"
                autoComplete="name"
                placeholder="O seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={120}
                required
              />
            </label>
            <label htmlFor={`${id}-email`}>
              Email
              <input
                id={`${id}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="nome@empresa.pt"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={160}
                required
              />
            </label>
            <div className="conversation-note">
              <button
                type="button"
                className="conversation-add-note"
                aria-expanded={messageOpen}
                aria-controls={`${id}-note-panel`}
                onClick={() => setMessageOpen(!messageOpen)}
              >
                <Plus size={13} />
                {message ? "Mensagem adicionada" : "Adicionar uma mensagem"}
                <span>Opcional</span>
              </button>
              <div
                className="conversation-note-panel"
                id={`${id}-note-panel`}
                data-open={messageOpen}
                inert={!messageOpen}
              >
                <div>
                  <label className="sr-only" htmlFor={`${id}-message`}>
                    Em que podemos ajudar?
                  </label>
                  <textarea
                    id={`${id}-message`}
                    name="mensagem"
                    rows={2}
                    placeholder="Uma frase sobre o que gostaria de melhorar."
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    maxLength={600}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="conversation-submit">
            <span>
              <span className="signal-dot" />
              Conversa inicial gratuita
            </span>
            <button className="action action-dark" type="submit">
              Pedir uma conversa
              <ArrowUpRight size={17} />
            </button>
          </div>
          <p className="conversation-privacy">
            {isExample
              ? "Formulário de exemplo. Nenhum pedido será enviado."
              : "Abre o seu email com o pedido preparado."}
            <a href="/privacidade">
              Privacidade
              <ArrowUpRight size={11} />
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
