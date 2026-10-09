import Poll from "./Poll";
import Problem from "./Problem";
import shared from "./shared.module.css";
import styles from "./PollRow.module.css";

// The live poll on the left, the "why Noggin" argument on the right.
export default function PollRow() {
  return (
    <section className={`${shared.section} ${styles.row}`}>
      <div className={styles.poll}>
        <Poll />
      </div>
      <div className={styles.why}>
        <Problem />
      </div>
    </section>
  );
}
