"use client";

import { useEffect, useRef, useState } from "react";
import { regions, type RegionId } from "@/lib/regions";
import styles from "./DotField.module.css";

/*
 * The hero background: the brain's dots spread across the whole hero.
 * Dots sit in five loose colour regions and drift toward the cursor, swelling
 * as they go, then spring back home when it leaves.
 *
 * - Drawn on one <canvas> with requestAnimationFrame. The loop stops itself
 *   once every dot has settled, so an idle page costs nothing.
 * - Purely decorative, so it's hidden from screen readers.
 * - Dots behind anything marked [data-dotfield-avoid] are dimmed so the copy
 *   stays readable.
 * - prefers-reduced-motion, or a touch screen with no hover: a still field.
 */

// Tuning
const CELL = 34; // average spacing between dots, px
const PULL_RADIUS = 140; // how far the cursor reaches, px
const PULL_STRENGTH = 0.5; // 0..1, how far dots travel toward the cursor
const SPRING = 0.075;
const DAMPING = 0.8;
const AVOID_ALPHA = 0.2; // opacity multiplier behind the copy
const AVOID_FADE = 90; // px over which the dimming eases off
const EDGE_FADE = 56; // px fade at the hero's top and bottom edges

// Region centres as fractions of the hero box, spread around the edges so
// every region shows beside the centred copy.
const SEEDS: Record<RegionId, [number, number]> = {
  whys: [0.12, 0.28],
  opinions: [0.45, 0.06],
  stories: [0.88, 0.25],
  personality: [0.18, 0.85],
  receipts: [0.82, 0.82],
};

type Dot = {
  hx: number; // home
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number; // radius
  sc: number; // current scale
  a: number; // base opacity
  c: number; // colour index
};

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildDots(w: number, h: number): Dot[] {
  const rnd = rng(11);
  const centres = regions.map((r) => [SEEDS[r.id][0] * w, SEEDS[r.id][1] * h]);
  const dots: Dot[] = [];
  const cols = Math.ceil(w / CELL);
  const rows = Math.ceil(h / CELL);
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x = (gx + 0.5 + (rnd() - 0.5) * 0.85) * CELL;
      const y = (gy + 0.5 + (rnd() - 0.5) * 0.85) * CELL;
      // Warp before picking the nearest centre so borders look organic.
      const wx = x + 40 * Math.sin(y / 55 + 1.3);
      const wy = y + 40 * Math.sin(x / 70 + 0.4);
      let best = 0;
      let bestD = Infinity;
      centres.forEach(([cx, cy], i) => {
        const d = (wx - cx) ** 2 + (wy - cy) ** 2;
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      const size = 3 + Math.round(rnd() * 4);
      dots.push({ hx: x, hy: y, x, y, vx: 0, vy: 0, r: size / 2, sc: 1, a: 0.32 + rnd() * 0.68, c: best });
    }
  }
  // Group by colour so the canvas changes fillStyle five times per frame.
  return dots.sort((p, q) => p.c - q.c);
}

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [interactive, setInteractive] = useState(false);

  // Decide once (and on change) whether the field moves.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setInteractive(!reduce.matches && hover.matches);
    update();
    reduce.addEventListener("change", update);
    hover.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      hover.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement; // the hero <section>
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const css = getComputedStyle(host);
    const colours = regions.map((r) => css.getPropertyValue(`--region-${r.id}`).trim());

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let avoid: DOMRect[] = [];
    let mx = 0;
    let my = 0;
    let active = false;
    let raf = 0;

    const measure = () => {
      const box = host.getBoundingClientRect();
      w = box.width;
      h = box.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      avoid = Array.from(host.querySelectorAll<HTMLElement>("[data-dotfield-avoid]")).map((el) => {
        const r = el.getBoundingClientRect();
        return new DOMRect(r.left - box.left, r.top - box.top, r.width, r.height);
      });
      dots = buildDots(w, h);
    };

    const alphaAt = (x: number, y: number) => {
      let f = Math.min(1, Math.max(0, y / EDGE_FADE), Math.max(0, (h - y) / EDGE_FADE));
      for (const r of avoid) {
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        const d = Math.hypot(dx, dy);
        f *= AVOID_ALPHA + (1 - AVOID_ALPHA) * Math.min(1, d / AVOID_FADE);
      }
      return f;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      let current = -1;
      for (const d of dots) {
        if (d.c !== current) {
          current = d.c;
          ctx.fillStyle = colours[current];
        }
        const a = d.a * alphaAt(d.x, d.y);
        if (a < 0.02) continue;
        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * d.sc, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      raf = 0;
      let energy = 0;
      const r2 = PULL_RADIUS * PULL_RADIUS;
      for (const d of dots) {
        let tx = d.hx;
        let ty = d.hy;
        let ts = 1;
        if (active) {
          const dx = mx - d.hx;
          const dy = my - d.hy;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2 * 9) {
            const pull = PULL_STRENGTH * Math.exp(-dist2 / r2);
            tx += dx * pull;
            ty += dy * pull;
            ts = 1 + pull * 1.5;
          }
        }
        d.vx = (d.vx + (tx - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (ty - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;
        d.sc += (ts - d.sc) * 0.15;
        energy += Math.abs(d.vx) + Math.abs(d.vy) + Math.abs(ts - d.sc) * 10;
      }
      draw();
      if (energy > 0.05) raf = requestAnimationFrame(step);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const box = host.getBoundingClientRect();
      mx = e.clientX - box.left;
      my = e.clientY - box.top;
      active = true;
      kick();
    };
    const onLeave = () => {
      active = false;
      kick();
    };

    measure();
    draw();
    setReady(true);

    const ro = new ResizeObserver(() => {
      measure();
      draw();
    });
    ro.observe(host);
    host.querySelectorAll("[data-dotfield-avoid]").forEach((el) => ro.observe(el));

    if (interactive) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [interactive]);

  return (
    <div className={styles.field} aria-hidden="true">
      <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.ready : ""}`} />
    </div>
  );
}
