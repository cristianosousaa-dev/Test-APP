"use client";

import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { contactHref, site } from "@/lib/site";

/**
 * Mobile only: a compact glass bar with the main action, shown once the hero has scrolled
 * away, and hidden again from the contact section onwards (it has the CTA; the footer stays clear).
 */
export function MobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const contact = document.getElementById("contacto");
    if (!hero || !contact) return;
    const state = { heroVisible: true, contactReached: false };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) state.heroVisible = e.isIntersecting;
        if (e.target === contact)
          state.contactReached = e.isIntersecting || e.boundingClientRect.top < 0;
      }
      setShow(!state.heroVisible && !state.contactReached);
    });
    io.observe(hero);
    io.observe(contact);
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-3 bottom-3 z-40 transition-[transform,opacity] duration-500 ease-out-soft md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"
      }`}
    >
      <div className="glass flex items-center justify-between gap-3 py-2 pr-2 pl-4 shadow-[0_20px_40px_-16px_rgb(10_22_40/0.45)]">
        <p className="min-w-0 text-[13px] leading-tight text-fg-2">
          <span className="block font-medium text-fg">Diagnóstico gratuito</span>
          30 min · sem compromisso
        </p>
        <LinkButton
          href={contactHref()}
          variant="ink"
          size="sm"
          arrow
          ariaLabel={site.cta}
          className="shrink-0"
        >
          Agendar
        </LinkButton>
      </div>
    </div>
  );
}
