import shared from "./shared.module.css";
import styles from "./Waitlist.module.css";

// Static for now. Step 4 posts to /api/waitlist and shows the confirmation state.
export default function Waitlist() {
  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.copy}>
          <h2 className={styles.h2}>Get your noggin in early.</h2>
          <p className={styles.lede}>Join the waitlist for first access and the founding member rate.</p>
        </div>
        <div className={styles.formWrap}>
          <form className={styles.form}>
            <label htmlFor="wl-email" className={styles.label}>Email address</label>
            <div className={styles.row}>
              <input
                id="wl-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={styles.input}
              />
              <button type="button" className={`${shared.btnPrimary} ${styles.submit}`}>
                Join the waitlist
              </button>
            </div>
            <label className={styles.consent}>
              <input type="checkbox" name="marketingConsent" className={styles.checkbox} />
              Send me launch news and the odd tip. Unsubscribe whenever you like.
            </label>
            <p className={styles.fine}>
              We only use your email for Noggin. <a href="#privacy">Privacy notice</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
