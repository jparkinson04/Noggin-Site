import ProductFrame from "./ProductFrame";
import { BrainMock, CalendarMock, StudioMock, VoiceNoteMock } from "./FeatureMocks";
import shared from "./shared.module.css";
import styles from "./HowItWorks.module.css";

const steps: {
  num: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  label: string;
  points?: { title: string; body: string }[];
}[] = [
  {
    num: "01",
    title: "Talk it through",
    body: "A deep dive interview, twelve questions over three short sittings. Type, or send voice notes if that’s easier. It’s the stuff you’d tell a friend over coffee, and it’s worth more than you think.",
    visual: <VoiceNoteMock />,
    label: "Illustration: a deep dive question answered with a voice note",
  },
  {
    num: "02",
    title: "Your noggin fills up",
    body: "Every answer is sorted into your whys, stories, opinions, personality and receipts, and it keeps growing as you add more. Nothing you’ve said gets lost.",
    visual: <BrainMock />,
    label: "Illustration: a new story lighting up the stories region of the brain map",
  },
  {
    num: "03",
    title: "Studio picks what’s worth saying",
    body: "Each week it suggests what to post and why, from what you’ve already told it. Let Studio draft it from your own words and phrases, or dig into your noggin and write it yourself.",
    visual: <StudioMock />,
    label: "Illustration: a draft with each line traced back to the region of the brain it came from",
    points: [
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
    ],
  },
  {
    num: "04",
    title: "You post it",
    body: "Edit, approve, publish. Nothing goes out without you. Scheduling straight to LinkedIn is on the way.",
    visual: <CalendarMock />,
    label: "Illustration: a week of planned posts, one approved and one in draft",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={`${shared.section} ${styles.section}`}>
      <div className={styles.intro}>
        <p className={shared.eyebrow}>How it works</p>
        <h2 className={styles.headline}>You’re sitting on more than you think</h2>
        <p className={styles.lede}>
          Most of what makes you worth following never gets posted, because it doesn’t feel like
          content. Noggin gets it out of your head and shows you what it’s worth.
        </p>
      </div>
      <ol className={styles.steps}>
        {steps.map((s) => (
          <li key={s.num} className={styles.step}>
            <div className={styles.text}>
              <span className={styles.num}>{s.num}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
              {s.points && (
                <ul className={styles.points}>
                  {s.points.map((p) => (
                    <li key={p.title} className={styles.point}>
                      <span className={styles.pointTitle}>{p.title}</span>
                      <span className={styles.pointBody}>{p.body}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={styles.visual}>
              <ProductFrame label={s.label}>{s.visual}</ProductFrame>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
