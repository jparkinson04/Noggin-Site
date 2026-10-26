"use client";

import { useState } from "react";
import shared from "./shared.module.css";
import styles from "./Waitlist.module.css";

// Posts to /api/waitlist and shows the confirmation state in place of the form.
export default function Waitlist() {
  const [state, setState] = useState<"idle" | "sending" | "done" | "already">("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          marketingConsent: form.get("marketingConsent") === "on",
          source: "waitlist",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; alreadyOn?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Something went wrong. Try again in a moment.");
      setState(data.alreadyOn ? "already" : "done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again in a moment.");
      setState("idle");
    }
  }

  return (
    <section id="waitlist" className={styles.section}>
      <div className={styles.panel}>
        <div className={styles.copy}>
          <h2 className={styles.h2}>Get your noggin in early.</h2>
          <p className={styles.lede}>
            Join the waitlist for first access and the founding rate: £19 a month, locked for life,
            instead of £29.
          </p>
        </div>
        <div className={styles.formWrap}>
          {state === "done" || state === "already" ? (
            <div className={styles.done} role="status">
              <p className={styles.doneTitle}>{state === "already" ? "You’re already on the list." : "You’re on the list."}</p>
              <p className={styles.doneBody}>
                We’ll email you when Noggin opens, with the £19 founding rate held for you.
              </p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit}>
              <label htmlFor="wl-email" className={styles.label}>Email address</label>
              <div className={styles.row}>
                <input
                  id="wl-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  className={styles.input}
                  disabled={state === "sending"}
                />
                <button type="submit" className={`${shared.btnPrimary} ${styles.submit}`} disabled={state === "sending"}>
                  {state === "sending" ? "Joining…" : "Join the waitlist"}
                </button>
              </div>
              <label className={styles.consent}>
                <input type="checkbox" name="marketingConsent" className={styles.checkbox} />
                Send me launch news and the odd tip. Unsubscribe whenever you like.
              </label>
              {error && <p className={styles.fine} role="alert">{error}</p>}
              <p className={styles.fine}>
                We only use your email for Noggin. <a href="#privacy">Privacy notice</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
