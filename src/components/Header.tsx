"use client";

import { useEffect, useRef, useState } from "react";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { contactHref, nav, site } from "@/lib/site";

/**
 * Sticky header. Transparent over the hero; after the first scroll it becomes a glass bar
 * (detected with a sentinel + IntersectionObserver, no scroll handler). The current
 * section is marked by a scrollspy.
 */
export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(`#${e.target.id}`, e.isIntersecting);
        setActive(nav.find((n) => seen.get(n.href))?.href ?? null);
      },
      { rootMargin: "-45% 0px -55% 0px" },
    );
    for (const n of nav) {
      const el = document.querySelector(n.href);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onChange);
    };
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-6 w-full" />
      <header className="sticky top-0 z-50 px-3 pt-3">
        <div
          className={cn(
            "mx-auto max-w-[1180px] rounded-[20px] transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out-soft",
            solid || open
              ? "bg-[rgb(12_15_18/0.62)] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08),inset_0_1px_0_rgb(255_255_255/0.08),0_20px_40px_-24px_rgb(0_0_0/0.8)] backdrop-blur-xl backdrop-saturate-150"
              : "bg-transparent",
          )}
        >
          <Container className="flex h-[60px] items-center gap-6 px-4 sm:px-5">
            <a
              href="#top"
              aria-label={`${site.name}, início`}
              className="mr-auto shrink-0 transition-opacity duration-200 hover:opacity-80"
            >
              <OrchestrLogo className="h-[26px]" id="orx-header" />
            </a>
            <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  aria-current={active === n.href ? "location" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-[14px] transition-colors duration-200",
                    active === n.href ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {active === n.href && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-white/[0.07] shadow-[inset_0_0_0_1px_rgb(255_255_255/0.08)]"
                    />
                  )}
                  <span className="relative">{n.label}</span>
                </a>
              ))}
            </nav>
            <LinkButton href={contactHref()} size="sm" className="hidden sm:inline-flex" arrow>
              Marcar diagnóstico
            </LinkButton>
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full text-fg shadow-[inset_0_0_0_1px_var(--color-hair-2)] transition-colors hover:bg-white/5 lg:hidden"
            >
              <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                <path
                  d={open ? "M3.5 3.5l9 9M12.5 3.5l-9 9" : "M2.5 5.5h11M2.5 10.5h11"}
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </Container>

          <div id="menu" hidden={!open} className="border-t border-hair lg:hidden">
            <nav aria-label="Menu" className="flex flex-col gap-1 p-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[17px] text-fg transition-colors hover:bg-white/5"
                >
                  {n.label}
                </a>
              ))}
              <LinkButton href={contactHref()} className="mt-2" arrow>
                {site.cta}
              </LinkButton>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
