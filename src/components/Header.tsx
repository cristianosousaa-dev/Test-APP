"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { OrchestrLogo } from "@/components/brand/OrchestrLogo";
import { SERVICES } from "@/components/sections/Services";
import { LinkButton } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { gsap } from "@/lib/motion";
import { nav, proposalHref, site } from "@/lib/site";

/**
 * A plain, solid bar with two things that earn their place: the section being read is marked under
 * its link, and "Serviços" opens a menu with every area we build, each one going straight to its
 * example. A thin line along the bottom shows how far down the page you are (GSAP ScrollTrigger on
 * the Lenis clock). On phones the links fold into a menu.
 */
export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  const total = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<number>(0);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSolid(!e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The section in the middle of the screen is the current one.
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
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (total.current)
        gsap.fromTo(
          total.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
    });
    return () => mm.revert();
  }, []);

  // Escape closes either menu; a click outside closes the services menu; the phone menu closes on
  // reaching desktop width.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mega) setMega(false);
      if (open) {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onDown = (e: MouseEvent) => {
      if (mega && root.current && !root.current.contains(e.target as Node)) setMega(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    desktop.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      desktop.removeEventListener("change", onChange);
    };
  }, [open, mega]);

  const hoverOpen = () => {
    window.clearTimeout(closeTimer.current);
    setMega(true);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMega(false), 140);
  };
  const pick = (id: string) => {
    setMega(false);
    setOpen(false);
    window.dispatchEvent(new CustomEvent("orchestr:area", { detail: id }));
  };

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-6 w-full" />
      {/* biome-ignore lint/a11y/noStaticElementInteractions: hover only opens a menu that is also reachable by keyboard (button) */}
      <header
        ref={root}
        className="hd"
        data-solid={solid || undefined}
        onMouseLeave={hoverClose}
        onMouseEnter={() => window.clearTimeout(closeTimer.current)}
      >
        <div className="hd-row">
          <a href="#top" aria-label={`${site.name}, início`} className="hd-logo">
            <OrchestrLogo
              tone="on-light"
              className="h-[26px] w-auto dark:hidden"
              id="orx-header-l"
            />
            <OrchestrLogo
              tone="on-dark"
              className="hidden h-[26px] w-auto dark:block"
              id="orx-header-d"
            />
          </a>

          <nav aria-label="Principal" className="hd-nav">
            {nav.map((n) =>
              n.href === "#servicos" ? (
                <button
                  key={n.href}
                  type="button"
                  className="hd-link"
                  data-on={active === n.href || mega || undefined}
                  aria-expanded={mega}
                  aria-controls="hd-mega"
                  onClick={() => setMega((v) => !v)}
                  onMouseEnter={hoverOpen}
                >
                  {n.label}
                  <ChevronDown aria-hidden className="hd-chev size-3.5" strokeWidth={1.8} />
                </button>
              ) : (
                <a
                  key={n.href}
                  href={n.href}
                  className="hd-link"
                  data-on={active === n.href || undefined}
                  aria-current={active === n.href ? "location" : undefined}
                  onMouseEnter={hoverClose}
                >
                  {n.label}
                </a>
              ),
            )}
          </nav>

          <div className="hd-end">
            <ThemeToggle />
            <LinkButton
              href={proposalHref}
              size="sm"
              variant="ink"
              className="hidden sm:inline-flex"
            >
              Pedir demonstração
            </LinkButton>
            <button
              ref={toggle}
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              onClick={() => setOpen((v) => !v)}
              className="label hd-menu-btn"
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
        </div>

        {/* Services menu: every area, each straight to its example. */}
        <div id="hd-mega" className="hd-mega" data-open={mega || undefined} inert={!mega}>
          <div className="hd-mega-in">
            <div className="hd-mega-intro">
              <p className="hd-idx">O que a {site.name} desenvolve</p>
              <p className="hd-mega-title">Cada solução nasce do seu processo.</p>
              <p className="hd-mega-text">
                Escolha uma área para ver um exemplo. Se o seu caso não está na lista, descreva-o.
              </p>
              {/* biome-ignore lint/a11y/useValidAnchor: in-page link that also closes the menu */}
              <a href="#servicos" className="hd-mega-all" onClick={() => setMega(false)}>
                Ver todos os serviços{" "}
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.6} />
              </a>
            </div>
            <ul className="hd-areas">
              {SERVICES.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.id}>
                    {/* biome-ignore lint/a11y/useValidAnchor: in-page link that also picks the area */}
                    <a href="#servicos" className="hd-area" onClick={() => pick(s.id)}>
                      <span className="hd-area-ic">
                        <Icon aria-hidden className="size-[18px]" strokeWidth={1.6} />
                      </span>
                      <span>
                        <b>{s.title}</b>
                        <small>Substitui {s.replaces}</small>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <span aria-hidden className="hd-total">
          <span ref={total} className="hd-fill" />
        </span>

        <div id="menu" hidden={!open} className="hd-menu">
          <nav aria-label="Menu">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={active === n.href ? "location" : undefined}
              >
                <span className="flex-1">{n.label}</span>
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.6} />
              </a>
            ))}
            <LinkButton href={proposalHref} variant="ink" size="lg" className="mt-4 w-full">
              {site.cta}
            </LinkButton>
          </nav>
        </div>
      </header>
    </>
  );
}
