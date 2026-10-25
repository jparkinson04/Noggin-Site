"use client";

import { useEffect, useState } from "react";
import BrainMap from "./BrainMap";
import { useInView } from "@/lib/useInView";
import styles from "./FeatureMocks.module.css";

// Illustrations of each How it works step. Sample content only; replace with
// product screenshots when they exist.
//
// Each one plays once as it scrolls into view: the parts arrive in the order
// they would in the product, so the picture explains the step. Server markup
// is the finished state, and prefers-reduced-motion turns every transition off.

/** Wraps an illustration; `in` once it has been seen, `armed` once JS is running. */
function useStage(threshold = 0.4) {
  const [ref, inView, armed] = useInView<HTMLDivElement>(threshold);
  const cls = `${styles.stack} ${armed ? styles.armed : ""} ${inView ? styles.in : ""}`;
  return { ref, cls, inView };
}

/** A part of the picture that arrives after `at` ms. */
function Step({ at, className = "", children }: { at: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`${styles.reveal} ${className}`} style={{ transitionDelay: `${at}ms` }}>
      {children}
    </div>
  );
}


export function VoiceNoteMock() {
  const { ref, cls } = useStage();
  return (
    <div ref={ref} className={cls}>
      <span className={styles.meta}>Deep dive · Question 4 of 12</span>
      <div className={`${styles.card} ${styles.question} ${styles.questionLg}`}>
        What do you find yourself explaining to clients again and again?
      </div>
      <Step at={300} className={styles.voiceRow}>
        <span className={`${styles.voice} ${styles.voicePill}`}>
          <span className={styles.play}>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7.5-4.5z" fill="#fff" /></svg>
          </span>
          <span className={styles.voiceText}>Voice note · 1:42</span>
        </span>
        <span className={styles.meta}>transcribed as you spoke</span>
      </Step>
      <Step at={800}>
        <p className={styles.answer}>
          “Honestly, it’s always the same thing. They think the problem is the website. The website’s
          fine. The problem is nobody in the building can say what they’re for in one sentence, so the
          website can’t either. I end up doing that sentence for them before we touch a pixel.”
        </p>
      </Step>
      <Step at={1500} className={styles.savedTo}>
        <span className={styles.meta}>Saved to</span>
        <span className={styles.chip}>
          <span className={styles.chipDot} style={{ background: "var(--region-opinions)" }} />Opinions
        </span>
        <span className={styles.chip}>
          <span className={styles.chipDot} style={{ background: "var(--region-receipts)" }} />Receipts
        </span>
      </Step>
      <Step at={2100} className={styles.followUp}>
        <span className={styles.followLabel}>Follow-up</span>
        <span className={styles.followText}>Who was the last client that happened with?</span>
      </Step>
    </div>
  );
}

export function BrainMock() {
  const { ref, cls, inView } = useStage();
  // The story lands first, then the stories region lights up to take it.
  const [lit, setLit] = useState(true);
  useEffect(() => {
    if (!inView) return;
    setLit(false);
    const t = setTimeout(() => setLit(true), 900);
    return () => clearTimeout(t);
  }, [inView]);
  return (
    <div ref={ref} className={cls}>
      <div className={styles.brainWrap}>
        <BrainMap highlight={lit ? "stories" : null} />
      </div>
      <Step at={200}>
        <div className={`${styles.card} ${styles.saved}`}>
          <span className={styles.regionDot} style={{ background: "var(--region-stories)" }} />
          <div>
            <div className={styles.savedTitle}>The client who fired us, then hired us back</div>
            <div className={styles.savedMeta}>Saved to Stories · from your voice note</div>
          </div>
        </div>
      </Step>
    </div>
  );
}

type Region = "whys" | "stories" | "opinions" | "receipts";

// A phrase in the draft that traces back to a region of the brain. The underline draws in
// after `at` ms; hovering the key fades every phrase but that region's.
function From({ region, at, focus, children }: { region: Region; at: number; focus: Region | null; children: React.ReactNode }) {
  const dim = focus !== null && focus !== region;
  return (
    <span
      className={`${styles.from} ${dim ? styles.fromDim : ""}`}
      style={{ ["--u" as string]: `var(--region-${region})`, transitionDelay: dim || focus ? "0ms" : `${at}ms` }}
    >
      {children}
    </span>
  );
}

const KEY: { region: Region; label: string }[] = [
  { region: "whys", label: "From your whys" },
  { region: "stories", label: "From a story" },
  { region: "opinions", label: "From an opinion" },
  { region: "receipts", label: "From a receipt" },
];

export function StudioMock() {
  const { ref, cls } = useStage();
  const [focus, setFocus] = useState<Region | null>(null);
  return (
    <div ref={ref} className={cls}>
      <div className={styles.draftHead}>
        <span className={styles.eyebrow}>Worth posting this week</span>
        <span className={styles.meta}>Draft, waiting for you</span>
      </div>
      <div className={`theme-light ${styles.draftCard}`}>
        <p className={styles.draftPara}>
          They fired us in March. <From region="stories" at={400} focus={focus}>Fair enough, we’d earned it.</From> Six months
          later they rang back, and what changed in between is the bit worth sharing.
        </p>
        <p className={styles.draftPara}>
          We’d been treating them like a ticket queue.{" "}
          <From region="opinions" at={900} focus={focus}>
            The website was fine. Nobody in the building could say what they were for in one sentence,
            so the website couldn’t either.
          </From>{" "}
          We built pages. They needed the sentence.
        </p>
        <p className={styles.draftPara}>
          <From region="receipts" at={1400} focus={focus}>
            The first call back was forty minutes and they didn’t mention the website once.
          </From>{" "}
          That’s the job now.{" "}
          <From region="whys" at={1900} focus={focus}>I started on my own so clients would stop being treated as an interruption,</From>{" "}
          and it took losing one to remember it.
        </p>
        <div className={styles.keyRow} onMouseLeave={() => setFocus(null)}>
          {KEY.map((k, i) => (
            <Step key={k.region} at={600 + i * 450}>
              <span
                className={`${styles.keyItem} ${focus === k.region ? styles.keyItemOn : ""}`}
                onMouseEnter={() => setFocus(k.region)}
                onFocus={() => setFocus(k.region)}
                onBlur={() => setFocus(null)}
                tabIndex={-1}
              >
                <span className={styles.keyBar} style={{ background: `var(--region-${k.region})` }} />
                {k.label}
              </span>
            </Step>
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
  const { ref, cls, inView } = useStage();
  // The Tuesday post gets approved a beat after the week appears.
  const [approved, setApproved] = useState(true);
  useEffect(() => {
    if (!inView) return;
    setApproved(false);
    const t = setTimeout(() => setApproved(true), 1600);
    return () => clearTimeout(t);
  }, [inView]);
  return (
    <div ref={ref} className={cls} style={{ gap: 18 }}>
      <span className={styles.meta}>This week</span>
      <div className={styles.week}>
        {DAYS.map((x, i) => (
          <div key={x.d} className={styles.day}>
            <span className={styles.dayName}>{x.d}</span>
            <span className={`${styles.date} ${x.today ? styles.today : ""}`}>{x.n}</span>
            <span className={`${styles.pip} ${x.post ? "" : styles.pipEmpty} ${styles.reveal}`} style={{ transitionDelay: `${300 + i * 60}ms` }} />
          </div>
        ))}
      </div>
      <Step at={500}>
        <div className={`${styles.card} ${styles.slot}`}>
          <span className={styles.slotTime}>Tue<br />08:30</span>
          <div>
            <div className={styles.slotTitle}>The client who came back</div>
            <span className={styles.status}>
              <span className={`${styles.statusDot} ${approved ? "" : styles.statusDraft}`} />
              {approved ? "Approved by you" : "Draft, waiting for you"}
            </span>
          </div>
        </div>
      </Step>
      <Step at={800}>
        <div className={`${styles.card} ${styles.slot}`}>
          <span className={styles.slotTime}>Thu<br />12:00</span>
          <div>
            <div className={styles.slotTitle}>Why I stopped writing proposals</div>
            <span className={styles.status}><span className={`${styles.statusDot} ${styles.statusDraft}`} />Draft, waiting for you</span>
          </div>
        </div>
      </Step>
      <Step at={1100}>
        <span className={styles.soon}>Scheduling straight to LinkedIn: on the way</span>
      </Step>
    </div>
  );
}
