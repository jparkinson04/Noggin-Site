import styles from "./ProductFrame.module.css";

// Swap `children` for a <Image> of the real screenshot when the product is ready.
export default function ProductFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={`theme-dark ${styles.frame}`} role="img" aria-label={label}>
      <span className={styles.tag} aria-hidden="true">Illustration</span>
      <div className={styles.inner} aria-hidden="true">
        {children}
      </div>
    </div>
  );
}
