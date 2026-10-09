import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Noggin · Your best posts are already in your head",
  description:
    "Noggin interviews you, remembers what you say, and turns your real stories and opinions into LinkedIn posts that sound like you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
