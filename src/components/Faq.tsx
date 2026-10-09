import shared from "./shared.module.css";
import styles from "./Faq.module.css";

const faqs = [
  {
    q: "Will it actually sound like me?",
    a: "It drafts from what you’ve told it, in the phrases you use. You’ll still want to edit, and the more you add, the closer it gets.",
  },
  {
    q: "Does it post for me?",
    a: "Not on its own. You approve every post. Scheduling straight to LinkedIn is coming, and even then nothing goes out without your say.",
  },
  {
    q: "Is it safe for my LinkedIn account?",
    a: "Noggin will only ever connect through LinkedIn’s official API. No cookies, no browser extensions.",
  },
  {
    q: "How is this different from other AI writing tools?",
    a: "Most start from a prompt. Noggin starts from an interview and a memory of everything you’ve said, so every draft has something real to work with.",
  },
  {
    q: "Can I take my stuff with me?",
    a: "[Confirm export plans before launch]",
  },
];

export default function Faq() {
  return (
    <section className={styles.section}>
      <h2 className={shared.h2}>Questions people ask</h2>
      <div className={styles.list}>
        {faqs.map((f) => (
          <details key={f.q} className={styles.item}>
            <summary className={styles.summary}>
              {f.q}
              <span className={styles.plus} aria-hidden="true">+</span>
            </summary>
            <p className={styles.answer}>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
