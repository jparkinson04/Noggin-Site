import { regions } from "@/lib/regions";
import shared from "./shared.module.css";
import styles from "./Regions.module.css";

export default function Regions() {
  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={styles.copy}>
        <p className={shared.eyebrow}>Your brain map</p>
        <h2 className={shared.h2}>Five regions, one of you</h2>
        <p className={styles.lede}>
          The map is how Noggin keeps track of what you’ve got to say, and spots where
          you’ve gone quiet. Bright dots are fresh. Faded ones are waiting for another outing.
        </p>
      </div>
      <ul className={styles.list}>
        {regions.map((r) => (
          <li key={r.id} className={styles.row}>
            <span className={styles.dot} style={{ background: r.colour }} aria-hidden="true" />
            <div className={styles.text}>
              <h3 className={styles.name}>{r.name}</h3>
              <p className={styles.line}>{r.line}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
