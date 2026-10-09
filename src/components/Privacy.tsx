import shared from "./shared.module.css";
import styles from "./Privacy.module.css";

const cards = [
  {
    title: "You decide what goes out",
    body: "Anything you tell Noggin stays in your noggin until you choose to post it.",
  },
  {
    title: "Other people stay out by default",
    body: "Stories involving someone else get flagged, and you choose whether they’re in.",
  },
  {
    title: "Official LinkedIn access only",
    body: "When posting arrives, it’ll use LinkedIn’s own API. No browser tricks that put your account at risk.",
  },
];

export default function Privacy() {
  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={shared.intro}>
        <p className={shared.eyebrow}>Privacy</p>
        <h2 className={shared.h2}>Your hardest stories stay yours</h2>
      </div>
      <div className={styles.grid}>
        {cards.map((c) => (
          <div key={c.title} className={`${shared.card} ${styles.card}`}>
            <h3 className={styles.h3}>{c.title}</h3>
            <p className={shared.muted}>{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
