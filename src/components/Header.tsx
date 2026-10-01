"use client";

import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { contactHref, nav, site } from "@/lib/site";

/**
 * Sticky header. Transparent over the hero, then a solid bar once you scroll (detected with a
 * sentinel + IntersectionObserver, not a scroll handler). The current section is underlined.
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
      <div ref={sentinel} aria-hidden className="absolute top-0 h-4 w-full" />
      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,box-shadow] duration-300",
          solid || open
            ? "bg-paper/90 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <Container className="flex h-[72px] items-center gap-6">
          <a href="#top" aria-label={`${site.name}, início`} className="mr-auto shrink-0">
            <Logo />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-[14.5px] transition-colors hover:bg-ink/5",
                  active === n.href ? "text-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {n.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3.5 -bottom-0.5 h-[3px] origin-left rounded-full bg-brand transition-transform duration-300 ease-out-soft",
                    active === n.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                  )}
                />
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
            className="grid size-10 place-items-center rounded-full ring-1 ring-line-2 transition-colors hover:bg-white lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <path
                d={open ? "M3.5 3.5l9 9M12.5 3.5l-9 9" : "M2.5 5h11M2.5 11h11"}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </Container>

        <div id="menu" hidden={!open} className="border-t border-line lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-3 py-3 text-[17px] transition-colors hover:bg-white"
              >
                {n.label}
              </a>
            ))}
            <LinkButton href={contactHref()} className="mt-2" arrow>
              {site.cta}
            </LinkButton>
          </Container>
        </div>
      </header>
    </>
  );
}
