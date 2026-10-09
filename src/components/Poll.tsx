import shared from "./shared.module.css";
import styles from "./Poll.module.css";

// Static for now. Step 3 loads the question and options from GET /api/poll
// and shows the results state after a vote.
const options = [
  { id: "say", label: "I never know what to say" },
  { id: "brag", label: "It feels like showing off" },
  { id: "time", label: "I don’t have time" },
  { id: "flat", label: "My posts get nothing back" },
  { id: "fake", label: "I worry it’ll sound fake" },
];

export default function Poll() {
  return (
    <div id="poll" className={styles.panel}>
      <div className={styles.copy}>
        <p className={`${shared.eyebrow} ${styles.live}`}>
          <span className={styles.liveDot} />
          Live poll, this week
        </p>
        <h2 className={styles.question}>What stops you posting on LinkedIn?</h2>
        <p className={styles.lede}>One tap, completely anonymous. Vote to see what everyone else said.</p>
      </div>

      <div className={styles.options}>
        {options.map((o) => (
          <button key={o.id} type="button" className={styles.option}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
