"use client";

import { useState } from "react";
import BrainMap, { LABEL_POS } from "./BrainMap";
import { regions, type RegionId } from "@/lib/regions";
import shared from "./shared.module.css";
import styles from "./Regions.module.css";

export default function Regions() {
  const [active, setActive] = useState<RegionId | null>(null);
  const current = regions.find((r) => r.id === active);

  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={styles.head}>
        <p className={shared.eyebrow}>Your brain map</p>
        <h2 className={shared.h2}>Five regions, one of you</h2>
        <p className={styles.lede}>
          The map is how Noggin keeps track of what you’ve got to say, and spots where you’ve gone
          quiet. Bright dots are fresh. Faded ones are waiting for another outing.
        </p>
      </div>

      <div className={`theme-dark ${styles.brainPanel}`}>
        <div className={styles.brainBox}>
          <BrainMap highlight={active} />
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
          return (
            <li key={r.id}>
              <button
                type="button"
                className={`${styles.row} ${on ? styles.rowOn : ""}`}
                aria-pressed={on}
                onClick={() => setActive(on ? null : r.id)}
              >
                <span className={styles.dot} style={{ background: r.colour }} aria-hidden="true" />
                <span className={styles.text}>
                  <span className={styles.name}>{r.name}</span>
                  <span className={styles.line}>{r.line}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
