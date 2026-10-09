import shared from "./shared.module.css";
import styles from "./HowItWorks.module.css";

const steps = [
  {
    num: "01",
    title: "Talk it through",
    body: "A deep dive interview, twelve questions over three short sittings. Type, or send voice notes if that’s easier.",
  },
  {
    num: "02",
    title: "Your noggin fills up",
    body: "Every answer is sorted into your whys, stories, opinions, personality and receipts, and it keeps growing as you add more.",
  },
  {
    num: "03",
    title: "Studio picks what’s worth saying",
    body: "Each week it suggests what to post and why, then drafts it from your own words and phrases.",
  },
  {
    num: "04",
    title: "You post it",
    body: "Edit, approve, publish. Nothing goes out without you. Scheduling straight to LinkedIn is on the way.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={`${shared.section} ${styles.section}`}>
      <div className={`${shared.intro} ${styles.intro}`}>
        <p className={shared.eyebrow}>How it works</p>
        <h2 className={shared.h2}>From a chat to a post you’d be proud of</h2>
      </div>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={shared.card}>
            <span className={styles.num}>{s.num}</span>
            <h3 className={shared.h3}>{s.title}</h3>
            <p className={shared.muted}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
