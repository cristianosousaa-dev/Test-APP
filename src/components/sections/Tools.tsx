import { Container } from "@/components/ui/Container";

const TOOLS = [
  "WhatsApp",
  "Gmail",
  "Outlook",
  "Google Calendar",
  "Excel",
  "Moloni",
  "InvoiceXpress",
  "PHC",
  "Primavera",
  "Stripe",
  "HubSpot",
  "Shopify",
];

export function Tools() {
  return (
    <Container>
      <div className="flex flex-col gap-3 border-t border-hair pt-6 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="shrink-0 text-[13.5px] text-mute">Liga-se ao que já usa</p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-[14px] text-ink-2">
          {TOOLS.map((t) => (
            <li key={t}>{t}</li>
          ))}
          <li className="text-mute">e outras, através de API</li>
        </ul>
      </div>
    </Container>
  );
}
