const tools = [
  "WhatsApp",
  "Gmail",
  "Outlook",
  "Google Calendar",
  "Google Sheets",
  "Excel",
  "Stripe",
  "Moloni",
  "InvoiceXpress",
  "PHC",
  "Primavera",
  "HubSpot",
  "Pipedrive",
  "Shopify",
  "WooCommerce",
  "Notion",
  "Slack",
  "Microsoft Teams",
  "Calendly",
  "Typeform",
];

export function Integrations() {
  return (
    <section aria-labelledby="integrations-title" className="border-y border-line bg-surface py-10">
      <p
        id="integrations-title"
        className="text-center text-[13px] font-medium tracking-wide text-muted"
      >
        Trabalhamos com as ferramentas que já usa, e com centenas de outras através de API
      </p>
      <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="animate-marquee flex w-max gap-3">
          {(["a", "b"] as const).flatMap((copy) =>
            tools.map((tool) => (
              <li
                key={`${copy}-${tool}`}
                aria-hidden={copy === "b"}
                className="rounded-full border border-line bg-page px-4 py-2 text-[14px] font-medium whitespace-nowrap text-ink-2"
              >
                {tool}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
