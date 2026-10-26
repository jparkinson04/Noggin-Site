"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import shared from "@/components/shared.module.css";
import styles from "../Admin.module.css";

export default function AdminSignIn() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/sign-in", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ password }) });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    setBusy(false);
    if (!res.ok) return setError(data.error ?? "Couldn’t sign in.");
    router.push("/admin");
    router.refresh();
  }

  return (
    <form className={styles.signIn} onSubmit={submit}>
      <h1 className={styles.h1}>Noggin admin</h1>
      <label htmlFor="pw" className={styles.label}>Password</label>
      <input id="pw" name="password" type="password" required autoComplete="current-password" className={styles.input} autoFocus />
      {error && <p className={styles.error} role="alert">{error}</p>}
      <button type="submit" className={`${shared.btnPrimary} ${shared.btnSmall}`} disabled={busy} style={{ alignSelf: "flex-start" }}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
