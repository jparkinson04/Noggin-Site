import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Logo label="Back to the top" />
      <nav aria-label="Footer" className={styles.nav}>
        <a id="privacy" href="#privacy" className={styles.link}>Privacy</a>
        <a href="#terms" className={styles.link}>Terms</a>
        <span>© 2026 [COMPANY NAME]</span>
      </nav>
    </footer>
  );
}
