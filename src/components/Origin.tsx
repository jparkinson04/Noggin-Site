import shared from "./shared.module.css";
import styles from "./Origin.module.css";

export default function Origin() {
  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={styles.copy}>
        <p className={shared.eyebrow}>Where it came from</p>
        <h2 className={shared.h2}>Built on a method that already works</h2>
        <p className={styles.lede}>
          Noggin is the Expert Voice one-to-one method, turned into software. The same questions,
          the same way of finding what you should be known for, at a fraction of the price of
          working with a consultant.
        </p>
      </div>
      <figure className={styles.quote}>
        <blockquote className={styles.quoteText}>[CLIENT QUOTE, used with permission]</blockquote>
        <figcaption className={styles.quoteBy}>[Client name, role, company]</figcaption>
      </figure>
    </section>
  );
}
