import { type Brand, BrandIcon, brandLabel } from "@/components/brand/BrandIcon";
import { Container } from "@/components/ui/Container";

const BRANDS: Brand[] = [
  "whatsapp",
  "gmail",
  "outlook",
  "googleCalendar",
  "excel",
  "googleSheets",
  "stripe",
  "hubspot",
  "shopify",
  "slack",
  "teams",
  "notion",
  "calendly",
  "googleDrive",
];
/* Portuguese tools without an open-licence logo: shown by name. */
const LOCAL = ["Moloni", "InvoiceXpress", "PHC", "Primavera", "MB WAY"];

/** Visual proof of fit: the tools Orchestr connects to. Pauses off-screen and on hover. */
export function Tools() {
  const items = [
    ...BRANDS.map((b) => ({ key: b, brand: b as Brand | null, label: brandLabel(b) })),
    ...LOCAL.map((l) => ({ key: l, brand: null as Brand | null, label: l })),
  ];
  return (
    <section data-loop aria-labelledby="tools-title" className="relative overflow-x-clip pb-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
          <p id="tools-title" data-reveal="left" className="label max-w-[18rem] text-fg-2">
            Integra-se com os sistemas que a sua empresa já utiliza
          </p>
          <div className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div aria-hidden className="rule-x absolute inset-x-0 top-0" />
            <div aria-hidden className="rule-x absolute inset-x-0 bottom-0" />
            <ul className="flex w-max animate-marquee items-stretch group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap">
              {[0, 1].map((copy) =>
                items.map((it) => (
                  <li
                    key={`${copy}-${it.key}`}
                    aria-hidden={copy === 1 || undefined}
                    className="relative flex h-16 shrink-0 items-center gap-3 px-6 text-[14.5px] text-fg-2 grayscale transition-[filter,color,background-color] duration-300 hover:bg-tile-2 hover:text-fg hover:grayscale-0 motion-reduce:[&[aria-hidden]]:hidden"
                  >
                    <span aria-hidden className="rule-y absolute top-3 right-0 bottom-3" />
                    {it.brand ? (
                      <span className="grid size-8 place-items-center bg-white">
                        <BrandIcon brand={it.brand} className="size-[18px]" />
                      </span>
                    ) : (
                      <span className="grid size-8 place-items-center bg-fg font-mono text-[9.5px] text-white">
                        {it.label.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                    {it.label}
                  </li>
                )),
              )}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
