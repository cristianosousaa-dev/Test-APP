"use client";
import { type Brand, BrandIcon } from "@/components/brand/BrandIcon";
import LogoLoop from "@/components/react-bits/LogoLoop";

const tools: { brand: Brand; name: string }[] = [
  { brand: "excel", name: "Excel" },
  { brand: "outlook", name: "Outlook" },
  { brand: "whatsapp", name: "WhatsApp" },
  { brand: "shopify", name: "Shopify" },
  { brand: "gmail", name: "Gmail" },
  { brand: "googleCalendar", name: "Google Calendar" },
  { brand: "slack", name: "Slack" },
  { brand: "stripe", name: "Stripe" },
  { brand: "woocommerce", name: "WooCommerce" },
];
const logos = tools.map((tool) => ({
  node: (
    <span className="marquee-brand">
      <BrandIcon brand={tool.brand} />
      <span>{tool.name}</span>
    </span>
  ),
  title: tool.name,
  ariaLabel: tool.name,
}));
export function IntegrationMarquee({ paused }: { paused: boolean }) {
  return (
    <div className="brand-marquee">
      <div className="frame marquee-inner">
        <p className="eyebrow">
          O QUE JÁ UTILIZA.
          <br />
          <span>AGORA, EM CONJUNTO.</span>
        </p>
        <div className="marquee-window">
          <LogoLoop
            logos={logos}
            speed={paused ? 0 : 44}
            gap={48}
            logoHeight={24}
            pauseOnHover
            fadeOut
            fadeOutColor="var(--marquee-surface)"
            intro={false}
            muted={0}
            ariaLabel="Ferramentas que podemos integrar"
          />
        </div>
      </div>
    </div>
  );
}
