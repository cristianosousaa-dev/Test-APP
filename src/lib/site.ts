/**
 * Single source of truth for brand, contact and offer copy.
 * Placeholders to replace before launch are marked with TODO.
 */
export const site = {
  // Brand name (see docs/brand/BRAND.md). Run a trademark search (INPI/EUIPO) before launch.
  name: "Orchestr",
  tagline: "Software à medida. Negócios em sintonia.",
  // ≈140 characters: search engines truncate descriptions past ~155.
  description:
    "Software, automação e sites à medida para PME. Ligamos pessoas, processos e programas. Veja uma demonstração gratuita antes de decidir.",
  // Production domain comes from NEXT_PUBLIC_SITE_URL (e.g. https://orchestr.pt).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  // TODO: real contact email (example.com is a reserved placeholder domain).
  email: "ola@example.com",
  // TODO: WhatsApp number in international format without "+", e.g. "351912345678". Null hides the button.
  whatsapp: null as string | null,
  cta: "Pedir demonstração gratuita",
  ctaNote: "Resposta com uma proposta escrita, sem compromisso",
} as const;

/* The person who answers and builds. Photo: public/cristiano-linkedin.jpg (4:5; a new file name busts the image cache). */
export const founder = {
  name: "Cristiano Sousa",
  role: "Full-stack e engenharia assistida por IA",
  linkedin: "https://www.linkedin.com/in/cristiano-sousa-a18b4a176",
  studio: { name: "Strict.Dev", url: "https://strict-dev.com" },
  booklin: { name: "BOOKLIN", url: "https://booklin.pt" },
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
    summary: "Uma tarefa repetitiva deixa de ser feita à mão.",
    setup: 490,
    monthly: 49,
    lead: "Prazo típico: 1 a 2 semanas",
    includes: [
      "Um processo ligado aos programas que já usa",
      "Fica registado tudo o que foi feito",
      "Correções incluídas na mensalidade",
      "A equipa mantém a forma de trabalhar",
    ],
    confirmed: false,
  },
  {
    id: "aplicacao",
    name: "Aplicação",
    summary: "Um processo da empresa, numa aplicação própria.",
    setup: 3400,
    monthly: 99,
    lead: "Prazo típico: 2 a 4 semanas",
    includes: [
      "Aplicação web, no computador, tablet e telemóvel",
      "Até 10 utilizadores, cada um com o acesso certo",
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
    name: "Plataforma",
    summary: "Vários processos ligados numa só plataforma.",
    setup: 8900,
    monthly: 199,
    lead: "Prazo típico: 6 a 12 semanas",
    includes: [
      "Vários módulos ligados entre si",
      "Utilizadores e permissões por função",
      "Ligação ao PHC, Primavera, Moloni ou InvoiceXpress",
      "Área para clientes ou fornecedores",
      "Formação da equipa e acompanhamento no arranque",
      "6 horas por mês para evolução",
    ],
    confirmed: false,
  },
] as const;

/* Until a real domain is configured, the site asks search engines not to index it. */
export const isLive = process.env.VERCEL_ENV !== "preview" && !site.url.includes("example.com");

/* pt-PT does not group four-digit numbers by default; prices read better as "2 400 €". */
export const euros = (n: number) => `${n.toLocaleString("pt-PT", { useGrouping: "always" })} €`;

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#precos", label: "Preços" },
  { href: "#quem", label: "Sobre" },
  { href: "#faq", label: "FAQ" },
] as const;

/* Where every "ask for a proposal" button lands: the form in the closing section. */
export const proposalHref = "#contacto";

export function contactHref(subject = "Pedido de demonstração", body?: string): string {
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
