"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; z: number };
const TAU = Math.PI * 2;

/** A small, local canvas sculpture. No model download, WebGL context or animation library. */
export function OrbitalSculpture({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d", { alpha: true });
    if (!el || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let frame = 0;
    let last = 0;
    let time = elapsed.current;
    let width = 0;
    let height = 0;
    const rotate = (p: Point, a: number): Point => {
      const y = p.y * Math.cos(0.63) - p.z * Math.sin(0.63);
      const z = p.y * Math.sin(0.63) + p.z * Math.cos(0.63);
      return { x: p.x * Math.cos(a) + z * Math.sin(a), y, z: -p.x * Math.sin(a) + z * Math.cos(a) };
    };
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scale = Math.min(width, height) * 0.29;
      const angle = time * 0.065 + 0.34;
      const project = (p: Point) => {
        const perspective = 5 / (5 - p.z);
        return {
          x: width / 2 + p.x * scale * perspective,
          y: height / 2 + p.y * scale * perspective,
        };
      };
      const faces: { points: Point[]; z: number; shade: number; blue: boolean }[] = [];
      for (let band = 0; band < 3; band++) {
        const ring = (u: number, v: number) => {
          const r = 1.04 + Math.cos(v) * 0.105;
          const p = { x: r * Math.cos(u), y: r * Math.sin(u), z: Math.sin(v) * 0.105 };
          const tilt = band * (Math.PI / 3) + 0.3;
          const y = p.y * Math.cos(tilt) - p.z * Math.sin(tilt);
          const z = p.y * Math.sin(tilt) + p.z * Math.cos(tilt);
          return rotate({ x: p.x, y, z }, angle + band * 0.4);
        };
        for (let i = 0; i < 128; i++) {
          for (let j = 0; j < 10; j++) {
            const u = (i / 128) * TAU;
            const v = (j / 10) * TAU;
            const points = [
              ring(u, v),
              ring(u + TAU / 128, v),
              ring(u + TAU / 128, v + TAU / 10),
              ring(u, v + TAU / 10),
            ];
            const a = points[0];
            const b = points[1];
            const c = points[3];
            if (!a || !b || !c) continue;
            const nx = (b.y - a.y) * (c.z - a.z) - (b.z - a.z) * (c.y - a.y);
            const ny = (b.z - a.z) * (c.x - a.x) - (b.x - a.x) * (c.z - a.z);
            const nz = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
            const length = Math.hypot(nx, ny, nz) || 1;
            const light = Math.max(0, (nx * -0.35 + ny * -0.6 + nz * 0.72) / length);
            const shine = Math.max(0, (nx * 0.2 + ny * -0.55 + nz * 0.81) / length) ** 22;
            faces.push({
              points,
              z: points.reduce((sum, p) => sum + p.z, 0) / 4,
              shade: 21 + light * 145 + shine * 90,
              blue: band === 1 && i > 93 && i < 108,
            });
          }
        }
      }
      faces.sort((a, b) => a.z - b.z);
      for (const face of faces) {
        const s = Math.min(255, Math.round(face.shade));
        ctx.fillStyle = face.blue
          ? `rgb(${Math.round(s * 0.3)},${Math.round(s * 0.55)},${Math.min(255, s + 70)})`
          : `rgb(${s},${Math.min(255, s + 3)},${Math.min(255, s + 8)})`;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 0.65;
        ctx.beginPath();
        face.points.forEach((p, i) => {
          const q = project(p);
          if (i === 0) ctx.moveTo(q.x, q.y);
          else ctx.lineTo(q.x, q.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || paused || reduce.matches) return;
      if (now - last > 40) {
        time += Math.min((now - last) / 1000, 0.05);
        last = now;
        draw();
      }
      frame = requestAnimationFrame(tick);
    };
    const wake = () => {
      cancelAnimationFrame(frame);
      last = performance.now();
      draw();
      if (visible && !document.hidden && !paused && !reduce.matches)
        frame = requestAnimationFrame(tick);
    };
    const resize = new ResizeObserver(([entry]) => {
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = width * dpr;
      el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      wake();
    });
    resize.observe(el);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      wake();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", wake);
    reduce.addEventListener("change", wake);
    return () => {
      elapsed.current = time;
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", wake);
      reduce.removeEventListener("change", wake);
    };
  }, [paused]);

  return <canvas ref={canvas} className="orbital-canvas" />;
}
