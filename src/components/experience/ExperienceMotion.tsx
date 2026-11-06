"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import "lenis/dist/lenis.css";

/** One clock for smooth scroll, section reveals and the navigation progress indicator. */
export function ExperienceMotion({ paused }: { paused: boolean }) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (paused) return;
      const lenis = new Lenis({
        lerp: 0.085,
        autoRaf: false,
        anchors: { offset: -100 },
        stopInertiaOnNavigate: true,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      lenis.on("scroll", ScrollTrigger.update);
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          const alreadyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.94;
          if (alreadyVisible) return;
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 34 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: element, start: "top 91%", once: true },
            },
          );
        });
        gsap.fromTo(
          ".header-progress",
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: document.documentElement,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.2,
            },
          },
        );
        gsap.fromTo(
          ".hero-preview",
          { opacity: 0, y: 25, rotate: 1.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.1,
            delay: 0.15,
            ease: "power3.out",
            clearProps: "all",
          },
        );
      });
      const refresh = () => ScrollTrigger.refresh();
      document.fonts.ready.then(refresh);
      return () => {
        context.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, [paused]);
  return null;
}
