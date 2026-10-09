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
        {/*
          SAMPLE: an invented quote, shown with a visible "Sample quote" label.
          "Alfie Z, AFZ Labs" is a made-up name, not a client. Keep the label
          until this is swapped for a real, permissioned client quote.
        */}
        <figure className={styles.quote}>
          <blockquote className={styles.bubble}>
            <span className={styles.sample}>Sample quote</span>
            <p>
              “I had years of client stories and never posted one, because none of it felt like
              content. Noggin got them out of my head in three short sittings, and the first draft
              sounded more like me than anything I’d written myself.”
            </p>
          </blockquote>
          <figcaption className={styles.by}>
            <span className={styles.avatar} aria-hidden="true">AZ</span>
            <span>
              <span className={styles.name}>Alfie Z</span>
              <span className={styles.company}>AFZ Labs</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
