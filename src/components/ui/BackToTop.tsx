"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * "Voltar ao topo" for wide screens (phones get the same arrow inside the bottom bar). Shows once
 * the first screen has scrolled away. An in-page link, so Lenis glides to #top.
 */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href="#top"
      aria-label="Voltar ao topo"
      tabIndex={show ? 0 : -1}
      className={`glass fixed right-6 bottom-6 z-40 hidden size-11 place-items-center text-strong transition-[opacity,transform] duration-300 ease-out-soft hover:-translate-y-0.5 md:grid ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp aria-hidden className="size-[18px]" strokeWidth={1.6} />
    </a>
  );
}
