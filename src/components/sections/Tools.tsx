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
    <section data-loop aria-labelledby="tools-title" className="relative py-14">
      <Container>
        <p id="tools-title" data-reveal className="kicker text-center !text-fg-3">
          Liga-se às ferramentas que o seu negócio já usa
        </p>
        <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-4">
            {[0, 1].map((copy) =>
              items.map((it) => (
                <li
                  key={`${copy}-${it.key}`}
                  aria-hidden={copy === 1 || undefined}
                  className="mr-10 flex shrink-0 items-center gap-3 text-[16px] font-medium tracking-[-0.01em] text-fg-2 opacity-70 grayscale transition-[filter,opacity,color] duration-300 hover:text-fg hover:opacity-100 hover:grayscale-0 motion-reduce:[&[aria-hidden]]:hidden"
                >
                  {it.brand ? (
                    <span className="grid size-8 place-items-center rounded-[9px] bg-white">
                      <BrandIcon brand={it.brand} className="size-[18px]" />
                    </span>
                  ) : (
                    <span className="grid size-8 place-items-center rounded-[9px] bg-white/[0.06] font-mono text-[10px] text-fg-2 shadow-[inset_0_0_0_1px_var(--color-hair-2)]">
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
