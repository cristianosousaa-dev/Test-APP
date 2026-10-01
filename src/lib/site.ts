/**
 * Single source of truth for brand, contact and offer copy.
 * Placeholders to replace before launch are marked with TODO.
 */
export const site = {
  // Brand name (see docs/brand/BRAND.md). Run a trademark search (INPI/EUIPO) before launch.
  name: "Orchestr",
  tagline: "Automação de processos para PME.",
  description:
    "Automação de processos à medida para PME: atendimento, marcações, orçamentos, faturação e cobranças, integrada nos sistemas que a sua empresa já utiliza.",
  url: "https://example.com", // TODO: production domain.
  // TODO: real contact email (example.com is a reserved placeholder domain).
  email: "ola@example.com",
  // TODO: WhatsApp number in international format without "+", e.g. "351912345678". Null hides the button.
  whatsapp: null as string | null,
  cta: "Agendar diagnóstico gratuito",
  ctaNote: "Diagnóstico de 30 minutos, sem compromisso",
} as const;

export const nav = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#exemplos", label: "Casos de uso" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Metodologia" },
  { href: "#faq", label: "FAQ" },
] as const;

export function contactHref(subject = "Diagnóstico de automação"): string {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
}

export function whatsappHref(
  text = "Olá. Gostaria de agendar um diagnóstico de automação.",
): string | null {
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
}
