"use client";

import { Menu, Pause, Play, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { duration, ease } from "@/lib/motion";
import { useMotionPreference } from "@/lib/motion-preference";
import { contactHref, nav, site } from "@/lib/site";

function MotionToggle({ className }: { className?: string }) {
  const { paused, reduced, togglePaused } = useMotionPreference();
  if (reduced) return null; // OS setting already stops motion.
  const label = paused ? "Retomar animações" : "Pausar animações";
  return (
    <button
      type="button"
      onClick={togglePaused}
      aria-pressed={paused}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-10 place-items-center rounded-full text-ink-2 transition-colors duration-200 hover:bg-line hover:text-ink",
        className,
      )}
    >
      {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
    </button>
  );
}

export function Nav() {
  const { scrollY } = useScroll();
  const { reduced } = useMotionPreference();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  // Escape closes the menu and returns focus; growing to desktop closes it too.
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
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-premium",
        scrolled || open
          ? "border-b border-line bg-page/80 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-8 px-5 sm:px-8">
        <a href="#top" aria-label={`${site.name} — início`}>
          <Logo />
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-[14px] text-ink-2 transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          <MotionToggle />
          <Button href={contactHref()} className="h-9 px-4 text-[13.5px]">
            Falar connosco
          </Button>
        </div>
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <MotionToggle />
          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduced ? { duration: 0 } : { duration: duration.base, ease }}
            className="overflow-hidden md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 pt-2 pb-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-[16px] text-ink"
                >
                  {item.label}
                </a>
              ))}
              <Button href={contactHref()} arrow className="mt-3">
                {site.cta}
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
