import BrainMap from "./BrainMap";
import styles from "./FeatureMocks.module.css";

// Illustrations of each How it works step. Sample content only; replace with
// product screenshots when they exist.


export function VoiceNoteMock() {
  return (
    <div className={styles.stack}>
      <span className={styles.meta}>Deep dive · Question 4 of 12</span>
      <div className={`${styles.card} ${styles.question} ${styles.questionLg}`}>
        What do you find yourself explaining to clients again and again?
      </div>
      <div className={styles.voiceRow}>
        <span className={`${styles.voice} ${styles.voicePill}`}>
          <span className={styles.play}>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7.5-4.5z" fill="#fff" /></svg>
          </span>
          <span className={styles.voiceText}>Voice note · 1:42</span>
        </span>
        <span className={styles.meta}>transcribed as you spoke</span>
      </div>
      <p className={styles.answer}>
        “Honestly, it’s always the same thing. They think the problem is the website. The website’s
        fine. The problem is nobody in the building can say what they’re for in one sentence, so the
        website can’t either. I end up doing that sentence for them before we touch a pixel.”
      </p>
      <div className={styles.savedTo}>
        <span className={styles.meta}>Saved to</span>
        <span className={styles.chip}>
          <span className={styles.chipDot} style={{ background: "var(--region-opinions)" }} />Opinions
        </span>
        <span className={styles.chip}>
          <span className={styles.chipDot} style={{ background: "var(--region-receipts)" }} />Receipts
        </span>
      </div>
      <div className={styles.followUp}>
        <span className={styles.followLabel}>Follow-up</span>
        <span className={styles.followText}>Who was the last client that happened with?</span>
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

// A phrase in the draft that traces back to a region of the brain.
function From({ region, children }: { region: "whys" | "stories" | "opinions" | "receipts"; children: React.ReactNode }) {
  return (
    <span className={styles.from} style={{ textDecorationColor: `var(--region-${region})` }}>
      {children}
    </span>
  );
}

const KEY = [
  { region: "whys", label: "From your whys" },
  { region: "stories", label: "From a story" },
  { region: "opinions", label: "From an opinion" },
  { region: "receipts", label: "From a receipt" },
];

export function StudioMock() {
  return (
    <div className={styles.stack}>
      <div className={styles.draftHead}>
        <span className={styles.eyebrow}>Worth posting this week</span>
        <span className={styles.meta}>Draft, waiting for you</span>
      </div>
      <div className={`theme-light ${styles.draftCard}`}>
        <p className={styles.draftPara}>
          They fired us in March. <From region="stories">Fair enough, we’d earned it.</From> Six months
          later they rang back, and what changed in between is the bit worth sharing.
        </p>
        <p className={styles.draftPara}>
          We’d been treating them like a ticket queue.{" "}
          <From region="opinions">
            The website was fine. Nobody in the building could say what they were for in one sentence,
            so the website couldn’t either.
          </From>{" "}
          We built pages. They needed the sentence.
        </p>
        <p className={styles.draftPara}>
          <From region="receipts">
            The first call back was forty minutes and they didn’t mention the website once.
          </From>{" "}
          That’s the job now.{" "}
          <From region="whys">I started on my own so clients would stop being treated as an interruption,</From>{" "}
          and it took losing one to remember it.
        </p>
        <div className={styles.keyRow}>
          {KEY.map((k) => (
            <span key={k.region} className={styles.keyItem}>
              <span className={styles.keyBar} style={{ background: `var(--region-${k.region})` }} />
              {k.label}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.draftFoot}>
        <div className={styles.actions}>
          <span className={styles.btn}>Draft it with Studio</span>
          <span className={styles.btnGhost}>Write it myself</span>
        </div>
        <span className={styles.meta}>Every line traces back to something you said.</span>
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
