"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { nav, proposalHref, site } from "@/lib/site";

/**
 * Dynamic header. Full width and transparent over the hero; once scrolled it narrows into a
 * compact glass bar (sentinel + IntersectionObserver), hides while reading down and returns
 * on scroll up. An ink
 * tile slides under the current section (scrollspy), and a hairline along the bottom shows
 * reading progress (CSS scroll-driven animation, absent where unsupported).
 */
export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null);
  const [hidden, setHidden] = useState(false);

  // Direction-aware: the bar slides away while reading down and returns on the way up.
  // One passive listener, throttled to animation frames.
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (y > last + 8 && y > 480) setHidden(true);
        else if (y < last - 8 || y <= 480) setHidden(false);
        last = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

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

  // Slide the ink tile under the active link (transform + width, measured per change).
  useLayoutEffect(() => {
    const i = nav.findIndex((n) => n.href === active);
    const el = links.current[i];
    if (!el) {
      setThumb(null);
      return;
    }
    const measure = () => setThumb({ x: el.offsetLeft, w: el.offsetWidth });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

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
        onFocusCapture={() => setHidden(false)}
        className={cn(
          "sticky top-0 z-50 px-3 pt-3 transition-transform duration-300 ease-out-soft sm:px-4",
          hidden && !open && "-translate-y-[120%] focus-within:translate-y-0",
        )}
      >
        <div
          className={cn(
            "header-bar relative mx-auto transition-[max-width,background-color,box-shadow,backdrop-filter] duration-700 ease-out-soft",
            solid ? "max-w-[1100px]" : "max-w-[1376px]",
            (solid || open) && "glass is-solid",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-6 px-4 transition-[height] duration-500 ease-out-soft sm:px-5",
              solid ? "h-14" : "h-16",
            )}
          >
            <a
              href="#top"
              aria-label={`${site.name}, início`}
              className="mr-auto shrink-0 transition-opacity duration-200 hover:opacity-70"
            >
              <OrchestrLogo
                tone="on-light"
                className={cn(
                  "w-auto transition-[height] duration-500 ease-out-soft",
                  solid ? "h-[25px]" : "h-[28px]",
                )}
                id="orx-header"
              />
            </a>

            <nav aria-label="Principal" className="relative hidden items-center lg:flex">
              <span
                aria-hidden
                className={cn(
                  "absolute top-0 left-0 h-9 transition-[transform,width,opacity,background-color] duration-500 ease-out-soft",
                  "bg-fg",
                )}
                style={{
                  width: thumb?.w ?? 0,
                  transform: `translateX(${thumb?.x ?? 0}px)`,
                  opacity: thumb ? 1 : 0,
                }}
              />
              {nav.map((n, i) => (
                <a
                  key={n.href}
                  ref={(el) => {
                    links.current[i] = el;
                  }}
                  href={n.href}
                  aria-current={active === n.href ? "location" : undefined}
                  className={cn(
                    "label relative grid h-9 place-items-center px-3.5 text-[11px] transition-colors duration-300",
                    active === n.href ? "text-white" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {n.label}
                </a>
              ))}
            </nav>

            <LinkButton
              href={proposalHref}
              size="sm"
              variant="ink"
              className="hidden sm:inline-flex"
            >
              Pedir proposta
            </LinkButton>
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "label flex h-11 items-center gap-2 px-4 text-[11px] transition-colors hover:bg-fg hover:text-white sm:h-9 sm:px-3 lg:hidden",
                "bg-chip text-fg",
              )}
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
          </div>

          <div id="menu" hidden={!open} className="lg:hidden">
            <nav aria-label="Menu" className="flex flex-col gap-[2px] px-4 pb-4 sm:px-5">
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
              <LinkButton href={proposalHref} size="lg" className="mt-3 w-full">
                {site.cta}
              </LinkButton>
            </nav>
          </div>

          <span
            aria-hidden
            className="header-progress absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
          />
        </div>
      </header>
    </>
  );
}
