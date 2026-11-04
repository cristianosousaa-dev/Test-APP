/**
 * Single source of truth for brand, contact and offer copy.
 * Placeholders to replace before launch are marked with TODO.
 */
export const site = {
  // Brand name (see docs/brand/BRAND.md). Run a trademark search (INPI/EUIPO) before launch.
  name: "Orchestr",
  tagline: "Software à medida para PME.",
  // ≈140 characters: search engines truncate descriptions past ~155.
  description:
    "Transformamos o Excel e o papel da sua empresa numa aplicação à medida. Prazo e preço fixos, escritos antes de começar. Manutenção incluída.",
  // Production domain comes from NEXT_PUBLIC_SITE_URL (e.g. https://orchestr.pt).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  // TODO: real contact email (example.com is a reserved placeholder domain).
  email: "ola@example.com",
  // TODO: WhatsApp number in international format without "+", e.g. "351912345678". Null hides the button.
  whatsapp: null as string | null,
  cta: "Pedir diagnóstico gratuito",
  ctaNote: "Resposta com proposta de preço fixo, sem compromisso",
} as const;

/* The person who answers and builds. Photo: public/cristiano-linkedin.jpg (4:5; a new file name busts the image cache). */
export const founder = {
  name: "Cristiano Sousa",
  role: "Full-stack e engenharia assistida por IA",
  linkedin: "https://www.linkedin.com/in/cristiano-sousa-a18b4a176",
  studio: { name: "Strict.Dev", url: "https://strict-dev.com" },
  photo: "/cristiano-linkedin.jpg",
} as const;

/*
 * Entry prices shown as "desde", before VAT.
 * - Automação: first set at 390 € + 39 €/mês on 2026-10-04 from PT market data; raised to
 *   490 € + 49 €/mês on 2026-11-04 at the owner's request.
 * - Aplicação and Plataforma: working hypotheses, raised on 2026-11-04 at the owner's request
 *   ("a little higher"). Anchored on public rates
 *   (PT freelancers about 30 to 32 €/h on Zaask/Fixando; PT software houses about 50 to 99 $/h on
 *   Clutch), a 2 to 4 week build for one process and a reusable base. Validate with real clients
 *   before relying on them. Only `confirmed` plans are published in the JSON-LD Offer markup, so
 *   none is until the owner confirms the figures.
 */
export type Plan = {
  id: "automacao" | "aplicacao" | "plataforma";
  name: string;
  summary: string;
  setup: number;
  monthly: number;
  lead: string;
  includes: readonly string[];
  featured?: boolean;
  confirmed: boolean;
};

export const plans: readonly Plan[] = [
  {
    id: "automacao",
    name: "Automação",
    summary: "Um processo repetitivo passa a correr sozinho.",
    setup: 490,
    monthly: 49,
    lead: "Prazo típico: 1 a 2 semanas",
    includes: [
      "Um fluxo ligado aos sistemas que já utiliza",
      "Registo de cada execução",
      "Correções incluídas na mensalidade",
      "A equipa mantém a forma de trabalhar",
    ],
    confirmed: false,
  },
  {
    id: "aplicacao",
    name: "Aplicação à medida",
    summary: "Substitui o Excel ou o papel de um processo.",
    setup: 3400,
    monthly: 99,
    lead: "Prazo típico: 2 a 4 semanas",
    includes: [
      "Aplicação web, no computador, tablet e telemóvel",
      "Até 10 utilizadores, com perfis de acesso",
      "Importação dos seus ficheiros atuais",
      "Painel com os números do processo",
      "Alojamento, cópias de segurança e suporte",
      "2 horas por mês para alterações",
    ],
    featured: true,
    confirmed: false,
  },
  {
    id: "plataforma",
    name: "Plataforma de gestão",
    summary: "Vários processos ligados, com utilizadores e integrações.",
    setup: 8900,
    monthly: 199,
    lead: "Prazo típico: 6 a 12 semanas",
    includes: [
      "Vários módulos ligados entre si",
      "Utilizadores e permissões por função",
      "Integração com PHC, Primavera, Moloni ou InvoiceXpress",
      "Portal para clientes ou fornecedores",
      "Formação da equipa e acompanhamento no arranque",
      "6 horas por mês para evolução",
    ],
    confirmed: false,
  },
] as const;

/* Included in every plan, stated once. */
export const allPlans = [
  "Preço e prazo fixos, por escrito",
  "Alojamento na União Europeia",
  "Conformidade com o RGPD",
  "Dados seus, exportáveis a qualquer momento",
] as const;

/* Until a real domain is configured, the site asks search engines not to index it. */
export const isLive = !site.url.includes("example.com");

/* pt-PT does not group four-digit numbers by default; prices read better as "2 400 €". */
export const euros = (n: number) => `${n.toLocaleString("pt-PT", { useGrouping: "always" })} €`;

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como trabalhamos" },
  { href: "#precos", label: "Preços" },
  { href: "#quem", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
] as const;

/* Where every "ask for a proposal" button lands: the form in the closing section. */
export const proposalHref = "#contacto";

export function contactHref(subject = "Pedido de diagnóstico", body?: string): string {
  // Capped: mail clients silently drop very long mailto URLs (~2000 chars on Windows).
  const q = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body.slice(0, 1500))}` : ""}`;
  return `mailto:${site.email}?${q}`;
}

export function whatsappHref(
  text = "Olá. Gostaria de falar sobre uma aplicação para a minha empresa.",
): string | null {
  return site.whatsapp && /^\d{8,15}$/.test(site.whatsapp)
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text.slice(0, 1500))}`
    : null;
}
