"use client";

import { ArrowUpRight } from "lucide-react";
import { type ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type SapphireLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  paused: boolean;
  iconSize?: number;
};

/** Optical light moves within the material; the link itself stays still. */
export function SapphireLink({
  children,
  className,
  paused,
  iconSize = 17,
  ...props
}: SapphireLinkProps) {
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = link.current;
    if (!element) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let hovered = false;
    let focused = false;
    let frame = 0;
    let previousTime = 0;
    let x = 0.5;
    let y = 0.12;
    let targetX = x;
    let targetY = y;
    let presence = 0;

    const paint = () => {
      element.style.setProperty("--sapphire-x", `${x * 100}%`);
      element.style.setProperty("--sapphire-y", `${y * 100}%`);
      element.style.setProperty("--sapphire-presence", String(presence));
    };
    const cancel = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
    };
    const animate = (time: number) => {
      frame = 0;
      const elapsed = previousTime ? Math.min((time - previousTime) / 16.67, 3) : 1;
      previousTime = time;
      const active = hovered || focused;
      const ease = 1 - 0.87 ** elapsed;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      presence += ((active ? 1 : 0) - presence) * (1 - (active ? 0.9 : 0.925) ** elapsed);
      paint();
      if (
        Math.abs(x - targetX) > 0.001 ||
        Math.abs(y - targetY) > 0.001 ||
        Math.abs((active ? 1 : 0) - presence) > 0.002
      ) {
        frame = requestAnimationFrame(animate);
      } else {
        previousTime = 0;
      }
    };
    const wake = () => {
      if (!visible || document.hidden) return;
      if (paused || reduce.matches) {
        cancel();
        x = 0.5;
        y = 0.12;
        presence = hovered || focused ? 1 : 0;
        paint();
      } else if (!frame) {
        frame = requestAnimationFrame(animate);
      }
    };
    const sync = () => {
      element.dataset.dormant = String(!visible || document.hidden);
      if (!visible || document.hidden) {
        cancel();
        hovered = false;
        presence = 0;
        paint();
      } else {
        wake();
      }
    };
    const enter = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      hovered = true;
      wake();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      targetX = Math.max(0.04, Math.min(0.96, (event.clientX - bounds.left) / bounds.width));
      targetY = Math.max(-0.1, Math.min(0.5, ((event.clientY - bounds.top) / bounds.height) * 0.5));
      wake();
    };
    const leave = () => {
      hovered = false;
      targetX = 0.5;
      targetY = 0.12;
      wake();
    };
    const focus = () => {
      focused = true;
      wake();
    };
    const blur = () => {
      focused = false;
      wake();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      sync();
    });
    observer.observe(element);
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", leave);
    element.addEventListener("focus", focus);
    element.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);
    return () => {
      cancel();
      observer.disconnect();
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", leave);
      element.removeEventListener("focus", focus);
      element.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [paused]);

  return (
    <a
      {...props}
      ref={link}
      className={cn("sapphire-button", className)}
      data-motion-paused={paused}
      data-dormant="true"
    >
      <span className="sapphire-label">{children}</span>
      <ArrowUpRight size={iconSize} className="sapphire-arrow" aria-hidden="true" />
      <span className="sapphire-ambient" aria-hidden="true" />
      <span className="sapphire-light" aria-hidden="true" />
      <span className="sapphire-rim" aria-hidden="true" />
    </a>
  );
}
