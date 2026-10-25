"use client";

import { useState } from "react";
import BrainMap, { LABEL_POS } from "./BrainMap";
import { regions, type RegionId } from "@/lib/regions";
import shared from "./shared.module.css";
import styles from "./Regions.module.css";

// Sample cards, one per region. Invented examples, labelled as such in the caption.
const examples: Record<RegionId, { quote: React.ReactNode; caption: string }> = {
  whys: {
    quote: "I started on my own because every agency I’d worked at treated the client like an interruption.",
    caption: "Example · saved to Whys · from a voice note, 2:10",
  },
  stories: {
    quote: "They fired us in March. Fair enough, we’d earned it. Six months later they rang back.",
    caption: "Example · saved to Stories · the client who fired us, then hired us back",
  },
  opinions: {
    quote: "Most proposals are a way of avoiding the awkward conversation about money.",
    caption: "Example · saved to Opinions · typed, question 9 of 12",
  },
  personality: {
    quote: "“Fair enough.” “The bit worth sharing.” Never “leverage”. Never “excited to announce”.",
    caption: "Example · saved to Personality · phrases picked up across 8 answers",
  },
  receipts: {
    quote: "The first call back was forty minutes and they didn’t mention the website once.",
    caption: "Example · saved to Receipts · from a voice note, 1:42",
  },
};

export default function Regions() {
  const [active, setActive] = useState<RegionId | null>(null);
  const [hovered, setHovered] = useState<RegionId | null>(null);
  const current = regions.find((r) => r.id === (hovered ?? active));

  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={styles.head}>
        <p className={shared.eyebrow}>Your brain map</p>
        <h2 className={shared.h2}>Five regions, one of you</h2>
        <p className={styles.lede}>
          Every answer you give is sorted into one of five regions, and it keeps growing as you add
          more. The map is how Noggin keeps track of what you’ve got to say, and spots where you’ve
          gone quiet. Nothing you’ve said gets lost.
        </p>
      </div>

      <div className={`theme-dark ${styles.brainPanel}`}>
        <div className={styles.brainBox}>
          <BrainMap highlight={hovered ?? active} />
          {current && (
            <span
              className={styles.label}
              style={{ left: `${LABEL_POS[current.id].x}%`, top: `${LABEL_POS[current.id].y}%` }}
              aria-hidden="true"
            >
              <span className={styles.labelDot} style={{ background: current.colour }} />
              {current.name}
            </span>
          )}
        </div>
        <p className={styles.hint} aria-live="polite">
          {current ? `${current.name} light up` : "Pick a region to see where it lives"}
        </p>
      </div>

      <ul className={styles.list}>
        {regions.map((r) => {
          const on = active === r.id;
          const ex = examples[r.id];
          return (
            <li key={r.id} className={styles.row}>
              <button
                type="button"
                className={`${styles.region} ${on ? styles.regionOn : ""}`}
                aria-pressed={on}
                onClick={() => setActive(on ? null : r.id)}
                onMouseEnter={() => setHovered(r.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(r.id)}
                onBlur={() => setHovered(null)}
              >
                <span className={styles.dot} style={{ background: r.colour }} aria-hidden="true" />
                <span className={styles.text}>
                  <h3 className={styles.name}>{r.name}</h3>
                  <span className={styles.line}>{r.line}</span>
                </span>
              </button>
              <figure className={styles.example}>
                <span className={styles.bar} style={{ background: r.colour }} aria-hidden="true" />
                <div className={styles.exampleText}>
                  <blockquote className={styles.quote}>{ex.quote}</blockquote>
                  <figcaption className={styles.caption}>{ex.caption}</figcaption>
                </div>
              </figure>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
