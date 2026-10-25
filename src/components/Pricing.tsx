import shared from "./shared.module.css";
import styles from "./Pricing.module.css";

const soloFeatures = [
  "The deep dive interview",
  "Your brain map, growing as you add to it",
  "Studio suggestions and drafts in your voice",
  "Insights in plain English",
];

const teamFeatures = [
  "Everything in Solo, for every seat",
  "One shared story, each person keeps their own brain map and voice",
  "A coverage view: who’s saying what, and what’s gone quiet",
];

export default function Pricing() {
  return (
    <section id="pricing" className={`${shared.section} ${styles.section}`}>
      <div className={shared.intro}>
        <p className={shared.eyebrow}>Pricing</p>
        <h2 className={shared.h2}>Simple pricing</h2>
      </div>
      <div className={styles.grid}>
        <div className={`${styles.plan} ${styles.solo}`}>
          <div className={styles.head}>
            <h3 className={styles.name}>Solo</h3>
            <p className={styles.price}>
              <span className={styles.amount}>£29</span>
              <span className={styles.per}>a month</span>
            </p>
            <p className={styles.alt}>or £24 a month, billed annually</p>
            <p className={styles.founding}>
              Founding rate: £19 a month, locked for life, for the waitlist and former Expert Voice
              clients.
            </p>
          </div>
          <ul className={styles.features}>
            {soloFeatures.map((f) => (
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
            <h3 className={styles.name}>Team</h3>
            <p className={styles.price}>
              <span className={styles.amount}>£19</span>
              <span className={styles.per}>a seat, a month</span>
            </p>
            <p className={styles.alt}>or £16 a seat, billed annually</p>
            <p className={styles.minimum}>Three seats minimum, so from £57 a month.</p>
          </div>
          <ul className={styles.features}>
            {teamFeatures.map((f) => (
              <li key={f} className={styles.feature}>
                <span className={styles.tick} aria-hidden="true">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <a href="#waitlist" className={`${shared.btnGhost} ${shared.btnSmall} ${styles.cta}`}>
            Join the waitlist
          </a>
        </div>
      </div>
    </section>
  );
}
