import DotField from "./DotField";
import BrainMark from "./BrainMark";
import shared from "./shared.module.css";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section id="top" className={styles.hero}>
      <DotField />
      <div className={styles.inner}>
        <div className={styles.copy} data-dotfield-avoid>
          <BrainMark className={styles.mark} />
          <h1 className={styles.h1}>Your best posts are already in your head.</h1>
          <p className={styles.lede}>
            Noggin interviews you, remembers what you say, and turns your real stories and
            opinions into posts that sound like you on a good day.
          </p>
          <a href="#waitlist" className={`${shared.btnPrimary} ${styles.cta}`}>Join the waitlist</a>
        </div>
      </div>
    </section>
  );
}
