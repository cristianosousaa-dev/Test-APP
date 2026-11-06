import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("termos");

export default function Page() {
  return <LegalDocument slug="termos" />;
}
