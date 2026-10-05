/**
 * Single source of truth for brand, contact and offer copy.
 * Placeholders to replace before launch are marked with TODO.
 */
export const site = {
  // Brand name (see docs/brand/BRAND.md). Run a trademark search (INPI/EUIPO) before launch.
  name: "Orchestr",
  tagline: "Automação de processos para PME.",
  // ≈140 characters: search engines truncate descriptions past ~155.
  description:
    "Automatizamos atendimento, marcações, orçamentos, faturação e cobranças nos sistemas que já utiliza. Preço fixo, escrito antes de começar.",
  // Production domain comes from NEXT_PUBLIC_SITE_URL (e.g. https://orchestr.pt).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  // TODO: real contact email (example.com is a reserved placeholder domain).
  email: "ola@example.com",
  // TODO: WhatsApp number in international format without "+", e.g. "351912345678". Null hides the button.
  whatsapp: null as string | null,
  cta: "Pedir proposta gratuita",
  ctaNote: "Resposta com proposta de preço fixo, sem compromisso",
} as const;

/* The person who answers and builds. Photo: drop a square image at public/cristiano.jpg. */
export const founder = {
  name: "Cristiano Sousa",
  role: "Full-stack e engenharia assistida por IA",
  linkedin: "https://www.linkedin.com/in/cristiano-sousa-a18b4a176",
  studio: { name: "Strict.Dev", url: "https://strict-dev.com" },
  photo: "/cristiano.jpg",
} as const;

/*
 * Entry prices shown as "desde", before VAT. Set on 2026-10-04 from public PT/PT-language
 * market data: Portuguese automation agencies publish no prices (quote only); a productised
 * WhatsApp bot in PT costs 100 € setup + 25 €/month (VAT incl.); custom automation projects
 * start around 800 € in PT-language markets. A bespoke, maintained automation sits between.
 */
export const pricing = {
  single: { setup: 390, monthly: 39 },
  bundle: { setup: 990, monthly: 79 },
  // Prices are published in the JSON-LD Offer markup only when this is true.
  confirmed: true,
} as const;

/* Until a real domain is configured, the site asks search engines not to index it. */
export const isLive = !site.url.includes("example.com");

export const euros = (n: number) => `${n.toLocaleString("pt-PT")} €`;

export const nav = [
  { href: "#exemplos", label: "Automações" },
  { href: "#servicos", label: "Serviços" },
  { href: "#precos", label: "Preços" },
  { href: "#quem", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
] as const;

/* Where every "ask for a proposal" button lands: the task form in the closing section. */
export const proposalHref = "#contacto";

export function contactHref(subject = "Pedido de automação", body?: string): string {
  // Capped: mail clients silently drop very long mailto URLs (~2000 chars on Windows).
  const q = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body.slice(0, 1500))}` : ""}`;
  return `mailto:${site.email}?${q}`;
}

export function whatsappHref(
  text = "Olá. Gostaria de automatizar uma tarefa na minha empresa.",
): string | null {
  return site.whatsapp && /^d{8,15}$/.test(site.whatsapp)
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text.slice(0, 1500))}`
    : null;
}
