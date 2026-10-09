import { regions, type RegionId } from "@/lib/regions";
import styles from "./BrainMap.module.css";

/*
 * The brain as a scatter of dots in five regions, ported from the approved
 * landing mockup (same shape, same seed, same region split). Pure maths at
 * module load, so server and client render identical markup.
 *
 * `highlight` lights one region up and dims the rest.
 */

type BrainDot = { x: number; y: number; r: number; o: number; region: RegionId };

const W = 125;
const H = 100;

function makeDots(): BrainDot[] {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const inE = (u: number, v: number, cx: number, cy: number, rx: number, ry: number) => {
    const a = (u - cx) / rx;
    const b = (v - cy) / ry;
    return a * a + b * b <= 1;
  };
  const inside = (u: number, v: number) =>
    (inE(u, v, 0.48, 0.42, 0.44, 0.35) && v < 0.7) ||
    inE(u, v, 0.4, 0.6, 0.27, 0.15) ||
    inE(u, v, 0.74, 0.7, 0.15, 0.1) ||
    (u > 0.6 && u < 0.68 && v > 0.66 && v < 0.9);
  const region = (u: number, v: number): RegionId => {
    if (u < 0.36 && v < 0.56) return "whys";
    if (u >= 0.62 && v >= 0.58) return "receipts";
    if (u >= 0.6) return "stories";
    if (v < 0.42) return "opinions";
    return "personality";
  };

  const pts: { u: number; v: number; s: number; o: number; region: RegionId }[] = [];
  let tries = 0;
  while (pts.length < 300 && tries < 30000) {
    tries++;
    const u = rnd();
    const v = rnd();
    if (!inside(u, v)) continue;
    let close = false;
    for (const p of pts) {
      const du = p.u - u;
      const dv = (p.v - v) * 0.8;
      if (du * du + dv * dv < 0.00042) {
        close = true;
        break;
      }
    }
    if (close) continue;
    pts.push({ u, v, region: region(u, v), s: 3 + Math.round(rnd() * 4), o: 0.32 + rnd() * 0.68 });
  }
  // Mockup sizes were px at 600px wide; convert to viewBox units.
  return pts.map((p) => ({
    x: +(p.u * W).toFixed(2),
    y: +(p.v * H).toFixed(2),
    r: +((p.s / 600) * W * 0.5).toFixed(3),
    o: +p.o.toFixed(2),
    region: p.region,
  }));
}

const DOTS = makeDots();

// Where each region's name sits on the map, as % of the box (from the mockup).
export const LABEL_POS: Record<RegionId, { x: number; y: number }> = {
  whys: { x: 16, y: 24 },
  opinions: { x: 47, y: 8 },
  stories: { x: 82, y: 22 },
  personality: { x: 24, y: 80 },
  receipts: { x: 84, y: 90 },
};

const COLOUR = Object.fromEntries(regions.map((r) => [r.id, r.colour])) as Record<RegionId, string>;

export default function BrainMap({
  highlight = null,
  className,
}: {
  highlight?: RegionId | null;
  className?: string;
}) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`${styles.brain} ${className ?? ""}`} aria-hidden="true">
      {DOTS.map((d, i) => {
        const lit = highlight === d.region;
        const opacity = highlight ? (lit ? 1 : 0.2) : d.o;
        return (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={d.r}
            fill={COLOUR[d.region]}
            className={`${styles.dot} ${lit ? styles.lit : ""}`}
            style={{ opacity }}
          />
        );
      })}
    </svg>
  );
}
