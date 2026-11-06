"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useId, useRef, useState } from "react";
import { contactHref, site } from "@/lib/site";

export function ContactForm() {
  const id = useId();
  const [service, setService] = useState("Aplicação à medida");
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const description = useRef<HTMLTextAreaElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const isExample = site.email.endsWith("@example.com");

  return (
    <form
      className="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const fields = new FormData(e.currentTarget);
        const text = String(fields.get("processo") ?? "").trim();
        if (text.length < 12) {
          setError("Descreva o processo numa frase, para percebermos o que precisa.");
          description.current?.focus();
          return;
        }
        setError("");
        setCopied(false);
        const body = `Olá, Orchestr.\n\nNome / Empresa: ${fields.get("nome")}\nEmail: ${fields.get("email")}\nInteresse: ${service}\n\n${text}`;
        setPrepared(body);
        if (!isExample) window.location.href = contactHref("Vamos pôr o negócio em sintonia", body);
        requestAnimationFrame(() => preview.current?.focus());
      }}
    >
      <fieldset>
        <legend>O que gostaria de melhorar?</legend>
        <div className="contact-options">
          {["Aplicação à medida", "Automação", "Site ou loja", "Ainda não sei"].map((option) => (
            <label key={option} className={service === option ? "chosen" : ""}>
              <input
                type="radio"
                name="servico"
                value={option}
                checked={service === option}
                onChange={() => {
                  setService(option);
                  setPrepared("");
                }}
              />
              {option}
              {service === option && <Check size={12} />}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="form-row">
        <label htmlFor={`${id}-nome`}>
          Nome e empresa
          <input
            id={`${id}-nome`}
            name="nome"
            autoComplete="organization"
            placeholder="Como se chama a sua empresa?"
            required
            maxLength={120}
            onChange={() => setPrepared("")}
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
            required
            maxLength={160}
            onChange={() => setPrepared("")}
          />
        </label>
      </div>
      <label htmlFor={`${id}-processo`}>
        Conte-nos o que hoje lhe ocupa demasiado tempo.
        <textarea
          ref={description}
          id={`${id}-processo`}
          name="processo"
          rows={3}
          maxLength={1000}
          placeholder="Por exemplo: registamos encomendas no Excel e confirmamos cada estado por telefone…"
          required
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-erro` : undefined}
          onChange={() => {
            setError("");
            setPrepared("");
          }}
        />
      </label>
      {error && (
        <p className="form-error" id={`${id}-erro`} role="alert">
          {error}
        </p>
      )}
      <div className="form-submit">
        <button className="action action-dark" type="submit">
          {isExample ? "Preparar pedido de demonstração" : "Pedir demonstração gratuita"}
          <ArrowUpRight size={18} />
        </button>
        <p>
          Sem compromisso.
          <br />O primeiro passo é perceber o seu processo.
        </p>
      </div>
      <p className="form-privacy">
        {isExample
          ? "Formulário de demonstração. Nenhum pedido é enviado."
          : "Abre o seu email com o pedido preenchido."}{" "}
        <a href="/privacidade">Privacidade</a>
      </p>
      {prepared && (
        <div ref={preview} tabIndex={-1} className="prepared-request" role="status">
          <strong>
            {isExample ? "Pré-visualização do seu pedido" : "O seu pedido está preparado"}
          </strong>
          <p>
            {isExample
              ? "Pode copiar o texto. Este preview não envia emails."
              : "Confirme o envio no seu programa de email."}
          </p>
          <pre>{prepared}</pre>
          <button
            type="button"
            className="text-link"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(prepared);
                setCopied(true);
              } catch {
                setError(
                  "Não foi possível copiar automaticamente. Pode selecionar o texto do pedido acima.",
                );
              }
            }}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Pedido copiado" : "Copiar pedido"}
          </button>
        </div>
      )}
    </form>
  );
}
