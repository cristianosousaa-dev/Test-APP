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
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-500 ease-out-soft",
          (solid || open) && "glass",
        )}
      >
        <Container className="flex h-16 items-center gap-6">
          <a
            href="#top"
            aria-label={`${site.name}, início`}
            className="mr-auto shrink-0 transition-opacity duration-200 hover:opacity-70"
          >
            <OrchestrLogo tone="on-light" className="h-[24px]" id="orx-header" />
          </a>
          <nav aria-label="Principal" className="hidden items-stretch gap-[2px] lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                className={cn(
                  "label grid h-9 place-items-center px-4 text-[11px] transition-colors duration-300",
                  active === n.href
                    ? "bg-fg text-white"
                    : "bg-chip text-fg hover:bg-[rgb(120_142_170/0.5)]",
                )}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <LinkButton href={contactHref()} size="sm" className="hidden sm:inline-flex">
            Agendar diagnóstico
          </LinkButton>
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls="menu"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="label flex h-9 items-center gap-2 bg-chip px-3 text-[11px] text-fg transition-colors hover:bg-fg hover:text-white lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
              <path
                d={open ? "M3.5 3.5l9 9M12.5 3.5l-9 9" : "M2 5.5h12M2 10.5h12"}
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            {open ? "Fechar" : "Menu"}
          </button>
        </Container>
        <div
          aria-hidden
          className={cn(
            "rule-x transition-opacity duration-500",
            solid ? "opacity-100" : "opacity-0",
          )}
        />

        <div id="menu" hidden={!open} className="lg:hidden">
          <Container>
            <nav aria-label="Menu" className="flex flex-col gap-[2px] py-4">
              {nav.map((n, i) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between bg-tile px-4 py-4 text-[17px] text-fg transition-colors hover:bg-fg hover:text-white"
                >
                  {n.label}
                  <span className="font-mono text-[11px] text-fg-3">0{i + 1}</span>
                </a>
              ))}
              <LinkButton href={contactHref()} size="lg" className="mt-3 w-full">
                {site.cta}
              </LinkButton>
            </nav>
          </Container>
        </div>
      </header>
    </>
  );
}
