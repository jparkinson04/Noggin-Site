import { supabaseAdmin } from "@/lib/supabase-admin";

const cell = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** The whole waitlist as a CSV download. Behind the admin cookie (middleware). */
export async function GET() {
  const { data, error } = await supabaseAdmin()
    .from("waitlist")
    .select("email, marketing_consent, source, engine, created_at")
    .order("created_at", { ascending: false });
  if (error) return new Response("Couldn’t read the waitlist.", { status: 500 });
  const lines = [
    "email,marketing_consent,source,engine,joined_at",
    ...(data ?? []).map((r) => [r.email, r.marketing_consent ? "yes" : "no", r.source, r.engine, r.created_at].map(cell).join(",")),
  ];
  return new Response(lines.join("\n") + "\n", {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="noggin-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}
