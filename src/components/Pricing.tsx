import shared from "./shared.module.css";
import styles from "./Pricing.module.css";

const features = [
  "The deep dive interview",
  "Your brain map, growing as you add to it",
  "Studio suggestions and drafts in your voice",
  "Insights in plain English",
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${shared.section} ${styles.section}`}>
      <div className={shared.intro}>
        <p className={shared.eyebrow}>Pricing</p>
        <h2 className={shared.h2}>One plan to start</h2>
      </div>
      <div className={styles.grid}>
        <div className={`${styles.plan} ${styles.solo}`}>
          <div className={styles.head}>
            <h3 className={styles.name}>Solo</h3>
            <p className={styles.price}>
              <span className={styles.amount}>£19</span>
              <span className={styles.per}>a month</span>
            </p>
            <p className={styles.founding}>Founding members: [FOUNDING RATE]</p>
          </div>
          <ul className={styles.features}>
            {features.map((f) => (
              <li key={f} className={styles.feature}>
                <span className={styles.tick} aria-hidden="true">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a href="#waitlist" className={`${shared.btnPrimary} ${shared.btnSmall} ${styles.cta}`}>
            Join the waitlist
          </a>
        </div>

        <div className={`${styles.plan} ${styles.teams}`}>
          <div className={styles.head}>
            <h3 className={styles.name}>Teams</h3>
            <p className={styles.later}>Coming later</p>
          </div>
          <p className={shared.muted}>
            For founders and leadership teams telling one shared story, where everyone keeps their
            own brain map and their own voice.
          </p>
          <a href="#waitlist" className={`${shared.btnGhost} ${shared.btnSmall} ${styles.cta}`}>
            Tell me when it’s ready
          </a>
        </div>
      </div>
    </section>
  );
}
