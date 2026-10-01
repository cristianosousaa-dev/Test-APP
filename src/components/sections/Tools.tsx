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
  "Google Sheets",
  "Calendly",
];

/** Endless, slow row of the tools we connect to. Hover pauses it. */
export function Tools() {
  return (
    <section aria-labelledby="tools-title" className="pb-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-10">
        <p id="tools-title" className="shrink-0 text-[13.5px] text-ink-2">
          Liga-se ao que já usa
          <span className="block text-mute">e a outras, por API</span>
        </p>
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
            {[0, 1].map((copy) =>
              TOOLS.map((t) => (
                <li
                  key={`${copy}-${t}`}
                  aria-hidden={copy === 1 || undefined}
                  className="mr-3 shrink-0 motion-reduce:[&[aria-hidden]]:hidden"
                >
                  <span className="inline-flex h-11 items-center rounded-full bg-white/55 px-5 text-[15px] font-medium text-ink-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_1px_2px_rgb(15_16_18/0.05)] ring-1 ring-white/70 transition-colors duration-200 hover:bg-white/85 hover:text-ink">
                    {t}
                  </span>
                </li>
              )),
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}
