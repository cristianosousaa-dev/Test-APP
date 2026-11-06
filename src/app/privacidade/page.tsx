import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("privacidade");

export default function Page() {
  return <LegalDocument slug="privacidade" />;
}
