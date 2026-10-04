"use client";

import { useId, useRef, useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { contactHref, site, whatsappHref } from "@/lib/site";

/* Starting points for people who know the pain but not the words for it. */
const EXAMPLES = [
  {
    label: "Marcações",
    text: "Respondemos à mão, todos os dias, aos mesmos pedidos de marcação por WhatsApp e passamos tudo para a agenda.",
  },
  {
    label: "Cobranças",
    text: "Acompanhamos as faturas vencidas por telefone e confirmamos os pagamentos no extrato, um a um.",
  },
  {
    label: "Faturas de fornecedores",
    text: "Recebemos faturas de fornecedores por email e temos de as lançar manualmente no programa de faturação.",
  },
  {
    label: "Orçamentos",
    text: "Os pedidos de orçamento chegam pelo site e por email e demoram horas, às vezes dias, a ter resposta.",
  },
];

const MIN = 12;

/**
 * The page's one conversion: describe the task in your own words. No backend: it opens the
 * visitor's email (or WhatsApp, when a number is configured) with the description filled in.
 */
export function TaskForm({
  tone = "light",
  className,
}: {
  tone?: "light" | "dark";
  className?: string;
}) {
  const id = useId();
  const field = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const dark = tone === "dark";
  const whatsapp = whatsappHref(text.trim() || undefined);

  const valid = () => {
    if (text.trim().length >= MIN) return true;
    setError(true);
    field.current?.focus();
    return false;
  };

  return (
    <form
      noValidate
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        if (!valid()) return;
        window.location.href = contactHref(
          "Pedido de proposta",
          `${text.trim()}\n\nEmpresa:\nTelefone:`,
        );
        setSent(true);
        setCopied(false);
      }}
    >
      <label
        htmlFor={`${id}-task`}
        className={cn("label block text-[11px]", dark ? "text-white/70" : "text-fg-2")}
      >
        Que tarefa gostaria de automatizar?
      </label>
      <textarea
        ref={field}
        id={`${id}-task`}
        name="tarefa"
        rows={2}
        maxLength={1000}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          if (error && e.target.value.trim().length >= MIN) setError(false);
        }}
        aria-invalid={error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        placeholder="Use as suas palavras. Por exemplo: todos os dias copiamos os pedidos que chegam por email para uma folha de Excel."
        className={cn(
          "task-field mt-3 block min-h-[7.5rem] w-full resize-none px-4 py-3.5 text-[15.5px] leading-[1.55] sm:min-h-0",
          dark ? "task-field-dark" : "task-field-light",
        )}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className={cn("mt-2 text-[13.5px]", dark ? "text-[#ffb4a8]" : "text-rose-ink")}
        >
          Escreva pelo menos uma frase sobre a tarefa, para a podermos avaliar.
        </p>
      )}

      <fieldset className="mt-3 flex flex-wrap gap-[2px]">
        <legend className="sr-only">Exemplos de tarefas</legend>
        {EXAMPLES.map((ex) => (
          <button
            key={ex.label}
            type="button"
            onClick={() => {
              setText(ex.text);
              setError(false);
              field.current?.focus();
            }}
            className={cn(
              "task-chip h-10 px-3 text-[12.5px] sm:h-8 sm:px-2.5 sm:text-[12px]",
              dark
                ? "bg-white/10 text-white/80 hover:bg-white/20"
                : "bg-chip text-fg-2 hover:bg-fg hover:text-white",
            )}
          >
            {ex.label}
          </button>
        ))}
      </fieldset>

      <div className="mt-5 flex flex-col gap-[2px] sm:flex-row">
        <button
          type="submit"
          className={cn("btn label h-13 text-[12px] sm:flex-1", dark ? "btn-light" : "btn-ink")}
        >
          <span className="btn-label flex-1">{site.cta}</span>
          <span className="btn-arrow w-13">
            <Arrow />
            <Arrow />
          </span>
        </button>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (!valid()) e.preventDefault();
            }}
            className={cn("btn label h-13 text-[12px]", dark ? "btn-glass" : "btn-mist")}
          >
            <span className="btn-label flex-1">Enviar por WhatsApp</span>
          </a>
        )}
      </div>
      <p className={cn("kicker mt-3 text-[10.5px]", dark ? "text-white/55" : "text-fg-2")}>
        Abre o seu email com o pedido preenchido · Sem compromisso
      </p>
      {sent && (
        <div
          role="status"
          className={cn(
            "mt-4 p-4 text-[14px] leading-[1.55]",
            dark
              ? "bg-white/10 text-white/90"
              : "bg-white/80 text-fg-2 shadow-[inset_0_0_0_1px_var(--color-hair-2)]",
          )}
        >
          O seu programa de email deve ter aberto com o pedido preenchido. Se não abriu, copie o
          texto e envie-o para{" "}
          <a
            href={`mailto:${site.email}`}
            className={cn("underline underline-offset-4", dark ? "text-white" : "text-fg")}
          >
            {site.email}
          </a>
          .
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(text.trim());
                setCopied(true);
              } catch {
                // Clipboard can be blocked (permissions, insecure context); the text stays in the field.
                setCopied(false);
              }
            }}
            className={cn(
              "label mt-3 flex h-10 items-center px-4 text-[11px] transition-colors",
              dark ? "bg-white text-navy hover:bg-white/90" : "bg-fg text-white hover:bg-accent",
            )}
          >
            {copied ? "Texto copiado" : "Copiar o texto do pedido"}
          </button>
        </div>
      )}
    </form>
  );
}
