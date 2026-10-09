import styles from "./Band.module.css";

// A light section of the page. Everything inside picks up the light tokens
// from .theme-light in globals.css.
export default function Band({ children }: { children: React.ReactNode }) {
  return <div className={`theme-light ${styles.light}`}>{children}</div>;
}

// Breathing room on the dark ground between bands.
export function BandGap() {
  return <div className={styles.gap} aria-hidden="true" />;
}
