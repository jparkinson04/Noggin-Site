import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <div className={styles.why}>
      <h2 className={styles.h2}>If AI could have written it, why would anyone read it?</h2>
      <p className={styles.body}>
        Everyone has the same tools now, so everyone’s starting to sound the same. The one thing
        nobody can generate is what’s actually happened to you.{" "}
        <span className={styles.close}>Noggin starts there.</span>
      </p>
    </div>
  );
}
