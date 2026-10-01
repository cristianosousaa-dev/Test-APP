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

/** Tools we connect to, scrolling slowly. Logos colour in on hover; pauses off-screen. */
export function Tools() {
  const items = [
    ...BRANDS.map((b) => ({ key: b, brand: b as Brand | null, label: brandLabel(b) })),
    ...LOCAL.map((l) => ({ key: l, brand: null as Brand | null, label: l })),
  ];
  return (
    <section data-loop aria-labelledby="tools-title" className="border-y border-line bg-white py-8">
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
        <p id="tools-title" className="shrink-0 text-[14px] font-medium text-ink-2">
          Ligamos às ferramentas
          <br className="hidden md:block" /> que já usa
        </p>
        <div className="group relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:gap-y-3">
            {[0, 1].map((copy) =>
              items.map((it) => (
                <li
                  key={`${copy}-${it.key}`}
                  aria-hidden={copy === 1 || undefined}
                  className="mr-8 flex shrink-0 items-center gap-2.5 text-[16px] font-semibold tracking-[-0.02em] text-ink/75 grayscale-[60%] transition-[filter,color,transform] duration-300 hover:-translate-y-0.5 hover:text-ink hover:grayscale-0 motion-reduce:[&[aria-hidden]]:hidden"
                >
                  {it.brand ? (
                    <BrandIcon brand={it.brand} className="size-6" />
                  ) : (
                    <span className="grid size-6 place-items-center rounded-md bg-brand-soft text-[10px] font-bold text-brand-ink">
                      {it.label.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  {it.label}
                </li>
              )),
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}
