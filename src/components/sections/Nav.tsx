"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { LinkButton } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { instant, spring } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { contactHref, nav, site } from "@/lib/site";

function MotionToggle() {
  const { paused, reduced, togglePaused } = useMotionPreference();
  if (reduced) return null;
  const label = paused ? "Retomar animações" : "Pausar animações";
  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-full text-ink-2 transition-colors duration-200 hover:bg-white/70 hover:text-ink"
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
  const toggleRef = useRef<HTMLButtonElement>(null);

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

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4">
      <div className="glass mx-auto flex h-14 max-w-[880px] items-center gap-2 rounded-full pr-2 pl-5">
        <a href="#top" aria-label={`${site.name}, início`} className="mr-auto md:mr-4">
          <Logo />
        </a>
        <nav className="hidden flex-1 items-center gap-0.5 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-[14px] text-ink-2 transition-colors duration-200 hover:bg-white/70 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <MotionToggle />
        <span className="hidden md:block">
          <LinkButton href={contactHref()} size="sm">
            Falar connosco
          </LinkButton>
        </span>
        <button
          ref={toggleRef}
          type="button"
          className="grid size-10 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
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
                className="block rounded-[20px] px-4 py-3 text-[16px] text-ink hover:bg-white/60"
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
