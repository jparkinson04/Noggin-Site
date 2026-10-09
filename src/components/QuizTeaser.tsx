import shared from "./shared.module.css";
import styles from "./QuizTeaser.module.css";

const engines = [
  { name: "Storyteller", line: "Makes a point through what happened." },
  { name: "Teacher", line: "Makes a point by explaining how." },
  { name: "Commentator", line: "Makes a point by reacting to what’s going on." },
  { name: "Documenter", line: "Makes a point by showing the work as it happens." },
];

export default function QuizTeaser() {
  return (
    <section className={shared.section}>
      <div className={styles.panel}>
        <div className={styles.top}>
          <div className={styles.copy}>
            <p className={`${shared.eyebrow} ${styles.eyebrow}`}>Free quiz</p>
            <h2 className={styles.h2}>What kind of poster are you?</h2>
            <p className={styles.lede}>
              Everyone who posts well runs on one of four engines. Twelve questions, about three
              minutes, and you’ll know which is yours. No email needed.
            </p>
          </div>
          <a href="/quiz" className={`${shared.btnPrimary} ${styles.cta}`}>Find my engine</a>
        </div>
        <div className={styles.grid}>
          {engines.map((e) => (
            <div key={e.name} className={styles.engine}>
              <h3 className={styles.engineName}>{e.name}</h3>
              <p className={styles.engineLine}>{e.line}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
