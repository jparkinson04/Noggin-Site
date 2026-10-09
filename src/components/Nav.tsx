import Logo from "./Logo";
import shared from "./shared.module.css";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <header className={styles.header}>
      <Logo />
      <nav aria-label="Main" className={styles.nav}>
        <a href="#how" className={styles.link}>How it works</a>
        <a href="/quiz" className={styles.link}>The quiz</a>
        <a href="#pricing" className={styles.link}>Pricing</a>
        <a href="#waitlist" className={`${shared.btnPrimary} ${styles.cta}`}>Join the waitlist</a>
      </nav>
    </header>
  );
}
