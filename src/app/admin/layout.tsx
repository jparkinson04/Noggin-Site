import type { Metadata } from "next";

// Admin pages are never indexed.
export const metadata: Metadata = { title: "Noggin admin", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <main className="admin">{children}</main>;
}
