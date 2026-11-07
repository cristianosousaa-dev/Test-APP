import { LegalDocument, legalMetadata } from "@/components/legal/LegalDocument";

export const metadata = legalMetadata("cookies");

export default function Page() {
  return <LegalDocument slug="cookies" />;
}
