"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { useMotionPreference } from "@/lib/motion-preference";

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

const chip =
  "rounded-full border border-line bg-page px-4 py-2 text-[14px] font-medium whitespace-nowrap text-ink-2";

export function Integrations() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const { enabled } = useMotionPreference();

  return (
    <section
      ref={ref}
      aria-labelledby="integrations-title"
      className="border-y border-line bg-surface py-10"
    >
      <p
        id="integrations-title"
        className="px-5 text-center text-[13px] font-medium tracking-wide text-muted"
      >
        Trabalhamos com as ferramentas que já usa, e com centenas de outras através de API
      </p>
      {enabled ? (
        <div className="relative mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <ul
            className="animate-marquee flex w-max gap-3"
            style={{ animationPlayState: inView ? "running" : "paused" }}
          >
            {(["a", "b"] as const).flatMap((copy) =>
              tools.map((tool) => (
                <li key={`${copy}-${tool}`} aria-hidden={copy === "b"} className={chip}>
                  {tool}
                </li>
              )),
            )}
          </ul>
        </div>
      ) : (
        <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3 px-5">
          {tools.map((tool) => (
            <li key={tool} className={chip}>
              {tool}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
