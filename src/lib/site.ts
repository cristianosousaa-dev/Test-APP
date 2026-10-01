/**
 * Single source of truth for brand, contact and offer copy.
 * Placeholders to replace before launch are marked with TODO.
 */
export const site = {
  // Brand name (see docs/brand/BRAND.md). Run a trademark search (INPI/EUIPO) before launch.
  name: "Orchestr",
  tagline: "O seu negócio, em piloto automático.",
  description:
    "Automações à medida para negócios: atendimento no WhatsApp, marcações, orçamentos, faturação, cobranças e documentos — ligadas às ferramentas que já usa.",
  url: "https://example.com", // TODO: production domain.
  // TODO: real contact email (example.com is a reserved placeholder domain).
  email: "ola@example.com",
  // TODO: WhatsApp number in international format without "+", e.g. "351912345678". Null hides the button.
  whatsapp: null as string | null,
  cta: "Marcar diagnóstico gratuito",
  ctaNote: "Diagnóstico de 30 minutos · Sem compromisso",
} as const;

export const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#exemplos", label: "Exemplos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#faq", label: "Perguntas" },
] as const;

export function contactHref(subject = "Diagnóstico de automação"): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(
  text = "Olá! Gostava de automatizar uma parte do meu negócio.",
): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
}
