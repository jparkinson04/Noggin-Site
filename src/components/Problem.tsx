import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>
        The polished posts get a polite trickle. The honest one gets the comments.
      </h2>
      <p className={styles.body}>
        You’ve probably seen it. The post you smoothed out with AI gets a few likes from
        people you already know. The one you wrote quickly, about something that actually
        happened, gets people replying with their own version. Noggin is built around that
        second kind of post.
      </p>
    </section>
  );
}
