"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion";
import "lenis/dist/lenis.css";

/** A shared clock, with restrained scroll sequences around the existing layout. */
export function ExperienceMotion({ paused }: { paused: boolean }) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 960px) and (pointer: fine)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      ({ conditions }) => {
        if (paused || !conditions?.motion) return;
        // Touch scrolling stays native; content never relies on a reveal to become visible.
        const desktop = !!conditions.desktop;
        const lenis = desktop
          ? new Lenis({
              lerp: 0.085,
              autoRaf: false,
              anchors: false,
              stopInertiaOnNavigate: true,
            })
          : null;
        const tick = (time: number) => lenis?.raf(time * 1000);
        if (lenis) {
          gsap.ticker.add(tick);
          lenis.on("scroll", ScrollTrigger.update);
        }
        // Own hash navigation: native jumps and Lenis must not scroll the same click twice.
        // scroll-padding-top already supplies the header clearance.
        const navigate = (event: MouseEvent) => {
          if (!lenis) return;
          if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const anchor = event
            .composedPath()
            .find((node): node is HTMLAnchorElement => node instanceof HTMLAnchorElement);
          if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
          const url = new URL(anchor.href);
          if (
            url.origin !== location.origin ||
            url.pathname !== location.pathname ||
            url.search !== location.search ||
            !url.hash
          )
            return;
          let target: HTMLElement | null = null;
          try {
            target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
          } catch {
            return;
          }
          if (!target) return;
          event.preventDefault();
          const destination = target;
          // Synchronise after native scrolling (browser restore, focus or scrollIntoView).
          lenis.scrollTo(window.scrollY, { immediate: true, force: true });
          const clearance =
            Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
          const margin = Number.parseFloat(getComputedStyle(destination).scrollMarginTop) || 0;
          const top = destination.getBoundingClientRect().top + window.scrollY - clearance - margin;
          if (location.hash !== url.hash) history.pushState(null, "", url.hash);
          lenis.scrollTo(top, {
            duration: 1.05,
            easing: (t: number) => 1 - (1 - t) ** 3,
            onComplete: () => {
              if (!destination.hasAttribute("tabindex")) {
                destination.setAttribute("tabindex", "-1");
                destination.addEventListener(
                  "blur",
                  () => destination.removeAttribute("tabindex"),
                  {
                    once: true,
                  },
                );
              }
              destination.focus({ preventScroll: true });
            },
          });
        };
        if (lenis) document.addEventListener("click", navigate);
        const context = gsap.context(() => {
          if (desktop)
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
              if (element.getBoundingClientRect().top < innerHeight * 0.94) return;
              gsap.fromTo(
                element,
                { opacity: 0.9, y: 12 },
                {
                  opacity: 1,
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
          if (desktop)
            gsap.fromTo(
              ".hero-preview",
              { opacity: 0.9, y: 12 },
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
                scrollTrigger: {
                  trigger: element,
                  start: "top 85%",
                  end: "bottom 45%",
                  scrub: 0.7,
                },
              },
            );
          });
          if (desktop)
            gsap.utils.toArray<HTMLElement>(".service-art").forEach((element) => {
              const art = element.querySelector(
                ".art-browser, .art-app:not(.art-app-back), .node-b",
              );
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
        let refreshTimer: ReturnType<typeof setTimeout>;
        const size = new ResizeObserver(() => {
          clearTimeout(refreshTimer);
          refreshTimer = setTimeout(() => {
            if (alive) ScrollTrigger.refresh();
          }, 150);
        });
        size.observe(document.body);
        document.fonts.ready.then(() => {
          if (alive) ScrollTrigger.refresh();
        });
        return () => {
          alive = false;
          clearTimeout(refreshTimer);
          size.disconnect();
          context.revert();
          gsap.ticker.remove(tick);
          document.removeEventListener("click", navigate);
          lenis?.destroy();
        };
      },
    );
    return () => media.revert();
  }, [paused]);
  return null;
}
