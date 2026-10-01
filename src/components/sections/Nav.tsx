"use client";

import {
  AnimatePresence,
  type MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Arrow, LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { useIslandDetail } from "@/lib/island";
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

/* Sections the island can name: the nav links plus the closing contact. */
const SPY = [...nav, { href: "#contacto", label: "Contacto" }];
const LABELS: Record<string, string> = Object.fromEntries(SPY.map((n) => [n.href, n.label]));

/** Liquid spring: a touch of overshoot so the glass feels like it is settling. */
const morph = { type: "spring", duration: 0.7, bounce: 0.22 } as const;

/**
 * Header as a "dynamic island": a full glass bar at the top of the page that melts into a
 * small capsule while you read, showing where you are, what the examples are doing and how
 * far you have scrolled. Hover, focus or tap brings the full bar back.
 */
export function Nav() {
  const { reduced } = useMotionPreference();
  const detail = useIslandDetail();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 160));

  // Scrollspy: the section crossing a line at 40% of the viewport is the current one.
  useEffect(() => {
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(`#${e.target.id}`, e.isIntersecting);
        setActive(SPY.find((item) => seen.get(item.href))?.href ?? null);
      },
      { rootMargin: "-40% 0px -60% 0px" },
    );
    for (const item of SPY) {
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

  const island = scrolled && !engaged && !open;
  const pill = hovered ?? active;
  const t = reduced ? instant : morph;
  const where = active ? (LABELS[active] ?? "") : "Início";

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex flex-col items-center px-3 sm:top-4">
      <motion.div
        layout
        transition={t}
        style={{ borderRadius: 999 }}
        onPointerEnter={(e) => e.pointerType === "mouse" && setEngaged(true)}
        onPointerLeave={() => setEngaged(false)}
        onFocusCapture={() => setEngaged(true)}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEngaged(false);
        }}
        className={cn(
          "glass flex items-center overflow-hidden",
          island ? "h-12 gap-1 pr-1.5 pl-2" : "h-14 w-full max-w-[900px] gap-2 pr-2 pl-5",
          onDark && "is-dark",
        )}
      >
        {/* Darkens the glass while it floats over the dark closing card. */}
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 -z-[1] rounded-[inherit] bg-[#141518]/75 transition-opacity duration-500",
            onDark ? "opacity-100" : "opacity-0",
          )}
        />
        {/*
          Controls stay mounted in both states so keyboard focus never disappears: in the
          island they are visually hidden (still focusable), and focusing one expands the bar.
        */}
        <motion.a
          layout="position"
          transition={t}
          href="#top"
          aria-label={`${site.name}, início`}
          className={cn(
            "shrink-0 transition-opacity duration-200 hover:opacity-70",
            !island && "mr-auto md:mr-4",
          )}
        >
          <Logo markOnly={island} />
        </motion.a>

        <AnimatePresence initial={false} mode="popLayout">
          {island && (
            <motion.span
              key="readout"
              aria-hidden
              layout="position"
              className="flex items-center gap-2.5"
              initial={reduced ? false : { opacity: 0, filter: "blur(6px)", scale: 0.9 }}
              animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, filter: "blur(6px)", scale: 0.9 }}
              transition={t}
            >
              <span className="flex min-w-0 flex-col pr-1 pl-0.5 leading-tight">
                <Roll
                  text={where}
                  className="text-[13.5px] font-medium text-ink"
                  reduced={reduced}
                />
                <AnimatePresence initial={false}>
                  {detail && active === "#exemplos" && (
                    <motion.span
                      key="detail"
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 16 }}
                      exit={reduced ? undefined : { opacity: 0, height: 0 }}
                      transition={t}
                      className="block overflow-hidden"
                    >
                      <Roll text={detail} className="text-[12px] text-ink-2" reduced={reduced} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <ProgressRing progress={scrollYProgress} />
            </motion.span>
          )}
        </AnimatePresence>

        <motion.nav
          layout="position"
          transition={t}
          aria-label="Principal"
          onPointerLeave={() => setHovered(null)}
          className={island ? "sr-only" : "hidden flex-1 items-center gap-0.5 md:flex"}
          animate={{ opacity: island ? 0 : 1 }}
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
              {!island && pill === item.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav-pill absolute inset-0 rounded-full bg-white/80 shadow-[0_1px_2px_rgb(15_16_18/0.06)]"
                  transition={reduced ? instant : spring}
                />
              )}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </motion.nav>

        <span className={island ? "sr-only" : "contents"}>
          <MotionToggle />
        </span>

        <motion.a
          layout="position"
          transition={t}
          href={contactHref()}
          className={cn(
            "group/btn btn-shine shrink-0 items-center justify-center rounded-full bg-ink text-white shadow-[0_6px_16px_-8px_rgb(15_16_18/0.5)] transition-[background-color,transform] duration-200 hover:bg-[#1d1f23] active:scale-95",
            island
              ? "inline-flex size-9"
              : "hidden h-9 gap-2 px-4 text-[14px] font-medium tracking-[-0.01em] md:inline-flex",
          )}
        >
          <span className={island ? "sr-only" : "whitespace-nowrap"}>Falar connosco</span>
          <Arrow />
        </motion.a>

        <motion.button
          layout="position"
          transition={t}
          ref={toggleRef}
          type="button"
          className="grid size-10 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-white/70 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </motion.button>
        {/* Reading progress along the bottom edge of the full bar. */}
        {!island && (
          <motion.span
            aria-hidden
            className="nav-progress pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left bg-ink/40"
            style={{ scaleX: scrollYProgress }}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            className="glass glass-thick mt-2 w-full max-w-[900px] rounded-[28px] p-2 md:hidden"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={reduced ? instant : morph}
            style={{ transformOrigin: "top center" }}
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                initial={reduced ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={reduced ? instant : { ...spring, delay: 0.04 * i }}
                className="block rounded-[20px] px-4 py-3 text-[16px] text-ink transition-colors hover:bg-white/70 active:bg-white"
              >
                {item.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-2 pt-1">
              <LinkButton href={contactHref()} className="flex-1">
                {site.cta}
              </LinkButton>
              <MotionToggle />
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Text that rolls vertically to its new value. */
function Roll({
  text,
  className,
  reduced,
}: {
  text: string;
  className?: string;
  reduced: boolean;
}) {
  return (
    <span className={cn("relative block h-[1.25em] overflow-hidden whitespace-nowrap", className)}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={text}
          className="block"
          initial={reduced ? false : { y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
          transition={reduced ? instant : spring}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function ProgressRing({ progress }: { progress: MotionValue<number> }) {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 -rotate-90" aria-hidden>
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-ink/12"
      />
      <motion.circle
        cx="12"
        cy="12"
        r="9"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="nav-ring text-ink"
        style={{ pathLength: progress }}
      />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
      <path
        d={open ? "M3.5 3.5l9 9M12.5 3.5l-9 9" : "M2.5 5.5h11M2.5 10.5h11"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
