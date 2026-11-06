/** Real operator details belong here. A preview must never invent legal identity or registration. */
export const legalOperator = {
  name: null as string | null,
  taxId: null as string | null,
  address: null as string | null,
  registry: null as string | null,
  email: null as string | null,
  complaintsUrl: null as string | null,
  adrName: null as string | null,
  adrUrl: null as string | null,
};
export const legalUpdated = "6 de novembro de 2026";
export const legalReady = Boolean(
  legalOperator.name && legalOperator.taxId && legalOperator.address && legalOperator.email,
);
export const legalLinks = [
  { slug: "privacidade", label: "Privacidade" },
  { slug: "termos", label: "Termos de utilização" },
  { slug: "cookies", label: "Cookies e preferências" },
  { slug: "aviso-legal", label: "Aviso legal" },
  { slug: "acessibilidade", label: "Acessibilidade" },
] as const;
export type LegalSlug = (typeof legalLinks)[number]["slug"];
