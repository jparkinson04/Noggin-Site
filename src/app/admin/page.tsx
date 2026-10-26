import { supabaseAdmin } from "@/lib/supabase-admin";
import shared from "@/components/shared.module.css";
import styles from "./Admin.module.css";

export const dynamic = "force-dynamic";

type Row = { id: string; email: string; marketing_consent: boolean; source: string | null; engine: string | null; created_at: string };

const when = (iso: string) => new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

/** The waitlist, newest first, with a CSV download. The middleware keeps everyone else out. */
export default async function AdminHome() {
  let rows: Row[] = [];
  let problem: string | null = null;
  try {
    const { data, error } = await supabaseAdmin()
      .from("waitlist")
      .select("id, email, marketing_consent, source, engine, created_at")
      .order("created_at", { ascending: false });
    if (error) problem = error.message;
    rows = (data ?? []) as Row[];
  } catch (e) {
    problem = e instanceof Error ? e.message : "Couldn’t reach the database.";
  }
  const consented = rows.filter((r) => r.marketing_consent).length;

  return (
    <div className={styles.wrap}>
      <div className={styles.top}>
        <div>
          <h1 className={styles.h1}>Waitlist</h1>
          <p className={styles.count}>
            {rows.length} {rows.length === 1 ? "person" : "people"} · {consented} said yes to launch news
          </p>
        </div>
        <div className={styles.actions}>
          <a href="/api/admin/waitlist.csv" className={`${shared.btnGhost} ${shared.btnSmall}`}>Download CSV</a>
          <form action="/api/admin/sign-out" method="post">
            <button type="submit" className={`${shared.btnGhost} ${shared.btnSmall}`}>Sign out</button>
          </form>
        </div>
      </div>

      {problem ? (
        <p className={styles.empty}>Couldn’t load the list: {problem}</p>
      ) : rows.length === 0 ? (
        <p className={styles.empty}>Nobody yet. The form on the landing page writes straight here.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Launch news</th>
              <th>Came from</th>
              <th>Quiz result</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>{r.email}</td>
                <td className={r.marketing_consent ? "" : styles.muted}>{r.marketing_consent ? "Yes" : "No"}</td>
                <td className={styles.muted}>{r.source ?? "—"}</td>
                <td className={styles.muted}>{r.engine ?? "—"}</td>
                <td className={styles.muted}>{when(r.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
