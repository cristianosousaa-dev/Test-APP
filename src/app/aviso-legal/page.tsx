import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("aviso-legal");

export default function Page() {
  return <LegalDocument slug="aviso-legal" />;
}
