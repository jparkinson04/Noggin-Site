import shared from "./shared.module.css";
import styles from "./Studio.module.css";

const points = [
  {
    title: "Your material only",
    body: "Every draft is built from stories, opinions and proof you’ve actually given it. Nothing invented.",
  },
  {
    title: "Your phrases",
    body: "It picks up the way you talk: the words you reach for, and the ones you’d never use.",
  },
  {
    title: "Away from the template",
    body: "No hook, line break, line break, lesson. Posts are shaped to read like a person wrote them, because one did the thinking.",
  },
];

export default function Studio() {
  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={shared.intro}>
        <p className={shared.eyebrow}>Studio</p>
        <h2 className={shared.h2}>Drafts made out of you</h2>
      </div>
      <div className={styles.grid}>
        {points.map((p) => (
          <div key={p.title} className={styles.item}>
            <h3 className={shared.h3}>{p.title}</h3>
            <p className={shared.muted}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
