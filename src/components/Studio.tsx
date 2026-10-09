import shared from "./shared.module.css";
import styles from "./Studio.module.css";

// Studio, the method it's built on, and the client quote, in one section.
// (Privacy points now live in the FAQ; LinkedIn safety was already there.)
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
    body: "No hook, line break, line break, lesson. Posts read like a person wrote them, because one did the thinking.",
  },
];

export default function Studio() {
  return (
    <section className={`${shared.section} ${styles.section}`}>
      <div className={styles.intro}>
        <p className={shared.eyebrow}>Studio</p>
        <h2 className={shared.h2}>Drafts made out of you</h2>
        <p className={styles.lede}>
          Noggin is the Expert Voice one-to-one method, turned into software. The same questions,
          the same way of finding what you should be known for, at a fraction of the price of
          working with a consultant.
        </p>
      </div>
      <div className={styles.body}>
        <ul className={styles.points}>
          {points.map((p) => (
            <li key={p.title} className={styles.point}>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.text}>{p.body}</p>
            </li>
          ))}
        </ul>
        <figure className={styles.quote}>
          <blockquote className={styles.quoteText}>[CLIENT QUOTE, used with permission]</blockquote>
          <figcaption className={styles.quoteBy}>[Client name, role, company]</figcaption>
        </figure>
      </div>
    </section>
  );
}
