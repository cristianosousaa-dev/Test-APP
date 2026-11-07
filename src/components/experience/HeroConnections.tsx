"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion";

const routes = [
  "M-80 160H200Q240 160 240 200V380Q240 420 280 420H700Q740 420 740 380V140Q740 100 780 100H1500",
  "M-80 650H330Q370 650 370 610V510Q370 470 410 470H1050Q1090 470 1090 430V300Q1090 260 1130 260H1500",
  "M-80 300H70Q110 300 110 340V570Q110 610 150 610H600Q640 610 640 650V900",
];
export function HeroConnections({ paused }: { paused: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element || paused) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const packets = element.querySelectorAll<SVGPathElement>(".connection-packet");
      const context = gsap.context(() => {
        packets.forEach((path, i) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: `6 ${length}`, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 17 + i * 5,
            repeat: -1,
            ease: "none",
            delay: i * 2,
          });
        });
        gsap.to(".connection-node-halo", {
          opacity: 0.08,
          scale: 1.7,
          transformOrigin: "center",
          duration: 3.8,
          stagger: 0.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }, element);
      let visible = true;
      const sync = () =>
        context.getTweens().forEach((tween: gsap.core.Tween) => {
          if (visible && !document.hidden) tween.resume();
          else tween.pause();
        });
      const observer = new IntersectionObserver(([entry]) => {
        visible = !!entry?.isIntersecting;
        sync();
      });
      observer.observe(element);
      document.addEventListener("visibilitychange", sync);
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", sync);
        context.revert();
      };
    });
    return () => media.revert();
  }, [paused]);
  return (
    <div ref={root} className="hero-connections" aria-hidden="true">
      <svg aria-hidden="true" viewBox="0 0 1440 850" preserveAspectRatio="xMidYMid slice">
        {routes.map((path) => (
          <g key={path}>
            <path d={path} className="connection-track" />
            <path d={path} className="connection-packet" />
          </g>
        ))}
        {[
          [240, 220],
          [370, 530],
          [640, 610],
          [740, 160],
          [1090, 340],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle className="connection-node-halo" cx={x} cy={y} r="12" />
            <circle className="connection-node" cx={x} cy={y} r="3" />
          </g>
        ))}
      </svg>
    </div>
  );
}
