"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { contactHref, nav, site } from "@/lib/site";

function MotionToggle() {
  const { paused, reduced, togglePaused } = useMotionPreference();
  if (reduced) return null;
  // Fixed name; aria-pressed carries the state. The tooltip names the next action.
  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={paused}
      aria-label="Pausar animações"
      title={paused ? "Retomar animações" : "Pausar animações"}
      className="grid size-10 place-items-center rounded-full text-ink-2 transition-[background-color,color,transform] duration-200 hover:bg-white/70 hover:text-ink active:scale-90"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
        {paused ? (
          <path d="M5 3.5v9l7-4.5z" fill="currentColor" />
        ) : (
          <>
            <rect x="4" y="3.5" width="2.4" height="9" rx="0.8" fill="currentColor" />
            <rect x="9.6" y="3.5" width="2.4" height="9" rx="0.8" fill="currentColor" />
          </>
        )}
      </svg>
    </button>
  );
}

export function Nav() {
  const { reduced } = useMotionPreference();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  // Scrollspy: the section crossing 40% of the viewport is the current one.
  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 24));

  // Scrollspy: the section crossing a line at 40% of the viewport is the current one.
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(`#${e.target.id}`, e.isIntersecting);
        setActive(nav.find((item) => seen.get(item.href))?.href ?? null);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const item of nav) {
      const el = document.querySelector(item.href);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  // Darker glass while the bar floats over the dark closing card.
  useEffect(() => {
    const el = document.querySelector("[data-nav-dark]");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnDark(!!e?.isIntersecting), {
      rootMargin: "-44px 0px -94% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const pill = hovered ?? active;

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div
        className={cn(
          "glass mx-auto flex items-center gap-2 overflow-hidden rounded-full pr-2 pl-5 transition-[max-width,height,box-shadow] duration-500 ease-out-soft",
          compact ? "h-[52px] max-w-[860px]" : "h-14 max-w-[900px]",
          onDark && "is-dark",
        )}
      >
        {/* Darkens the glass while it floats over the dark closing card. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-[1] rounded-full bg-[#141518]/75 transition-opacity duration-500",
            onDark ? "opacity-100" : "opacity-0",
          )}
        />
        <a
          href="#top"
          aria-label={`${site.name}, início`}
          className="mr-auto transition-opacity duration-200 hover:opacity-70 md:mr-4"
        >
          <Logo />
        </a>
        <nav
          className="hidden flex-1 items-center gap-0.5 md:flex"
          aria-label="Principal"
          onPointerLeave={() => setHovered(null)}
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              onPointerEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-[14px] whitespace-nowrap transition-colors duration-200",
                active === item.href ? "text-ink" : "text-ink-2 hover:text-ink",
              )}
            >
              {pill === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill absolute inset-0 rounded-full bg-white/80 shadow-[0_1px_2px_rgb(15_16_18/0.06)]"
                  transition={reduced ? instant : spring}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>
        <MotionToggle />
        <span className="hidden md:block">
          <LinkButton href={contactHref()} size="sm" arrow>
            Falar connosco
          </LinkButton>
        </span>
        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-white/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
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
        {/* Reading progress along the bottom edge of the bar. */}
        <motion.span
          aria-hidden
          className="nav-progress pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left bg-ink/40"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            className="glass glass-thick mx-auto mt-2 max-w-[880px] rounded-[28px] p-2 md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={reduced ? instant : spring}
            style={{ transformOrigin: "top center" }}
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-[20px] px-4 py-3 text-[16px] text-ink transition-colors hover:bg-white/70 active:bg-white"
              >
                {item.label}
              </a>
            ))}
            <LinkButton href={contactHref()} className="mt-1 w-full">
              {site.cta}
            </LinkButton>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
