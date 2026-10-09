import BrainMap from "./BrainMap";
import styles from "./FeatureMocks.module.css";

// Illustrations of each How it works step. Sample content only; replace with
// product screenshots when they exist.

const WAVE = [6, 10, 16, 22, 14, 9, 18, 26, 20, 12, 8, 15, 24, 28, 19, 11, 7, 13, 21, 17, 10, 6, 12, 18, 14, 9, 5, 8];

export function VoiceNoteMock() {
  return (
    <div className={styles.stack}>
      <span className={styles.meta}>Deep dive · Question 4 of 12</span>
      <div className={`${styles.card} ${styles.question}`}>
        What do you find yourself explaining to clients again and again?
      </div>
      <div className={styles.voice}>
        <span className={styles.play}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7.5-4.5z" fill="#fff" /></svg>
        </span>
        <span className={styles.wave}>
          {WAVE.map((h, i) => (
            <span key={i} className={`${styles.bar} ${i > 17 ? styles.barFaint : ""}`} style={{ height: h }} />
          ))}
        </span>
        <span className={styles.time}>1:42</span>
      </div>
      <p className={styles.transcript}>“Honestly, it’s always the same thing. They think the problem is the website…”</p>
      <div className={styles.recordRow}>
        <span className={styles.mic}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <rect x="5.5" y="1.5" width="5" height="8.5" rx="2.5" />
            <path d="M3 7.5a5 5 0 0 0 10 0M8 12.5v2" />
          </svg>
        </span>
        <span className={styles.meta}>Hold to record, or type your answer</span>
      </div>
    </div>
  );
}

export function BrainMock() {
  return (
    <div className={styles.stack}>
      <div className={styles.brainWrap}>
        <BrainMap highlight="stories" />
      </div>
      <div className={`${styles.card} ${styles.saved}`}>
        <span className={styles.regionDot} style={{ background: "var(--region-stories)" }} />
        <div>
          <div className={styles.savedTitle}>The client who fired us, then hired us back</div>
          <div className={styles.savedMeta}>Saved to Stories · from your voice note</div>
        </div>
      </div>
    </div>
  );
}

export function StudioMock() {
  return (
    <div className={styles.stack}>
      <div className={styles.card}>
        <div className={styles.stack} style={{ gap: 10 }}>
          <span className={styles.eyebrow}>Worth posting this week</span>
          <div className={styles.question}>The client who came back</div>
          <p className={styles.why} style={{ margin: 0 }}>
            You haven’t told a story in a while, and this one has a lesson people in your field will recognise.
          </p>
          <div className={styles.chips}>
            <span className={styles.chip}>
              <span className={styles.chipDot} style={{ background: "var(--region-stories)" }} />Stories
            </span>
            <span className={styles.chip}>
              <span className={styles.chipDot} style={{ background: "var(--region-receipts)" }} />Receipts
            </span>
          </div>
          <div className={styles.actions}>
            <span className={styles.btn}>Draft it with Studio</span>
            <span className={styles.btnGhost}>Write it myself</span>
          </div>
        </div>
      </div>
      <p className={styles.draft} style={{ margin: 0 }}>
        They fired us in March. <span className={styles.yours}>Fair enough, we’d earned it.</span> Six months
        later they rang back, and what changed in between is the bit worth sharing…
      </p>
      <div className={styles.search}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="6" cy="6" r="4.5" />
          <path d="M9.5 9.5L13 13" />
        </svg>
        Dig into your noggin: stories, opinions, receipts…
      </div>
    </div>
  );
}

const DAYS = [
  { d: "Mon", n: 13, post: false },
  { d: "Tue", n: 14, post: true, today: true },
  { d: "Wed", n: 15, post: false },
  { d: "Thu", n: 16, post: true },
  { d: "Fri", n: 17, post: false },
  { d: "Sat", n: 18, post: false },
  { d: "Sun", n: 19, post: false },
];

export function CalendarMock() {
  return (
    <div className={styles.stack} style={{ gap: 18 }}>
      <span className={styles.meta}>This week</span>
      <div className={styles.week}>
        {DAYS.map((x) => (
          <div key={x.d} className={styles.day}>
            <span className={styles.dayName}>{x.d}</span>
            <span className={`${styles.date} ${x.today ? styles.today : ""}`}>{x.n}</span>
            <span className={`${styles.pip} ${x.post ? "" : styles.pipEmpty}`} />
          </div>
        ))}
      </div>
      <div className={`${styles.card} ${styles.slot}`}>
        <span className={styles.slotTime}>Tue<br />08:30</span>
        <div>
          <div className={styles.slotTitle}>The client who came back</div>
          <span className={styles.status}><span className={styles.statusDot} />Approved by you</span>
        </div>
      </div>
      <div className={`${styles.card} ${styles.slot}`}>
        <span className={styles.slotTime}>Thu<br />12:00</span>
        <div>
          <div className={styles.slotTitle}>Why I stopped writing proposals</div>
          <span className={styles.status}><span className={`${styles.statusDot} ${styles.statusDraft}`} />Draft, waiting for you</span>
        </div>
      </div>
      <span className={styles.soon}>Scheduling straight to LinkedIn: on the way</span>
    </div>
  );
}
