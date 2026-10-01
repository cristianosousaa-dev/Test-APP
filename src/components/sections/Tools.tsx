import { Container } from "@/components/ui/Container";

const TOOLS = [
  "WhatsApp",
  "Gmail",
  "Outlook",
  "Google Calendar",
  "Excel",
  "Google Sheets",
  "Moloni",
  "InvoiceXpress",
  "PHC",
  "Primavera",
  "Stripe",
  "HubSpot",
  "Shopify",
  "Calendly",
];

/** The tools we connect to, scrolling slowly. CSS transform only; pauses off-screen and on hover. */
export function Tools() {
  return (
    <section data-loop aria-labelledby="tools-title" className="border-y border-line bg-white py-7">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:gap-10">
        <p id="tools-title" className="shrink-0 text-[14px] font-medium text-ink-2">
          Ligamos às ferramentas
          <br className="hidden md:block" /> que já usa:
        </p>
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
            {[0, 1].map((copy) =>
              TOOLS.map((t) => (
                <li
                  key={`${copy}-${t}`}
                  aria-hidden={copy === 1 || undefined}
                  className="mr-10 shrink-0 text-[19px] font-semibold tracking-[-0.02em] text-ink/70 motion-reduce:[&[aria-hidden]]:hidden"
                >
                  {t}
                </li>
              )),
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}
