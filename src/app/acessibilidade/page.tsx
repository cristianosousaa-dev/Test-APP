import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("acessibilidade");

export default function Page() {
  return <LegalDocument slug="acessibilidade" />;
}
