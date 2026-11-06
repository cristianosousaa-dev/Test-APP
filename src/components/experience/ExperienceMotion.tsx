"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import "lenis/dist/lenis.css";

/** A shared clock, with restrained scroll sequences around the existing layout. */
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
          if (element.getBoundingClientRect().top < innerHeight * 0.94) return;
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              clearProps: "opacity,visibility,transform",
              scrollTrigger: { trigger: element, start: "top 93%", once: true },
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
              scrub: 0.25,
            },
          },
        );
        gsap.fromTo(
          ".hero-preview",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            delay: 0.12,
            ease: "power3.out",
            clearProps: "opacity,transform",
          },
        );
        gsap.to(".hero-connections", {
          y: 35,
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.fromTo(
          ".process-travel > span",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-steps",
              start: "top 63%",
              end: "bottom 63%",
              scrub: 0.65,
            },
          },
        );
        gsap.utils.toArray<HTMLElement>(".process-step").forEach((element) => {
          ScrollTrigger.create({
            trigger: element,
            start: "top 65%",
            end: "bottom 45%",
            toggleClass: { targets: element, className: "is-current" },
          });
        });
        gsap.utils.toArray<HTMLElement>(".benefit-row").forEach((element) => {
          gsap.fromTo(
            element,
            { "--benefit-progress": 0 },
            {
              "--benefit-progress": 1,
              ease: "none",
              scrollTrigger: { trigger: element, start: "top 85%", end: "bottom 45%", scrub: 0.7 },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>(".service-art").forEach((element) => {
          const art = element.querySelector(".art-browser, .art-app:not(.art-app-back), .node-b");
          if (art)
            gsap.fromTo(
              art,
              { y: 9 },
              {
                y: -5,
                ease: "none",
                scrollTrigger: {
                  trigger: element,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
        });
      });
      let alive = true;
      document.fonts.ready.then(() => {
        if (alive) ScrollTrigger.refresh();
      });
      return () => {
        alive = false;
        context.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => media.revert();
  }, [paused]);
  return null;
}
