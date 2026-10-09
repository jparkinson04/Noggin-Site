# Noggin marketing site

The public landing page for Noggin, a LinkedIn personal-brand app. This repo is
ONLY the marketing site. The app itself lives in a separate repo; do not import
from it or add app features here.

## The page's job, in order
1. Get a one-tap vote in the live poll.
2. Get people into the free content engine quiz.
3. Collect a waitlist email (after the quiz result, or from the waitlist section).

## Source of truth for the design
- `design/mockups/landing-page.mockup.html` and `design/mockups/quiz-flow.mockup.html`
  are the approved mockups. Match their layout, copy, spacing and colours.
- They are written in a mockup format (`<x-dc>`, `<sc-for>`, `<sc-if>`, `{{ holes }}`,
  a `class Component extends DCLogic` script). Treat that as a reference only:
  rebuild it as normal React components. Never copy the mockup runtime.
- Design tokens live in `src/app/globals.css`. Use the CSS variables; do not
  hard-code new colours.

## Design rules
- Dark ground, one blue accent (`--accent`) for every action. Region colours are
  ONLY for the brain and the region key, never for buttons or text.
- Fonts: Bricolage Grotesque for headings, Figtree for everything else, loaded
  through `next/font` in `layout.tsx`. No other fonts.
- Sentence case everywhere. No all-caps headings (small eyebrow labels are the
  only uppercase text).
- No emoji, no gradient washes, no left-border accent cards, no stock photos.
- This is the one place playful motion is allowed (the brain), but respect
  `prefers-reduced-motion`.
- Mobile first: every section must work at 375px wide with no sideways scroll.
- Touch targets at least 44px. Real `<button>`, `<a>`, `<label>` + `<input>`.
- British English in all copy.

## Copy rules
- Never invent stats, testimonials, client names or results. Use a clearly
  marked placeholder like `[CLIENT QUOTE]` instead.
- Don't claim LinkedIn scheduling is live. It is "on the way".
- Don't claim the product never writes posts. Studio drafts posts from the
  user's own material, in their own phrases.

## Data and privacy
- Supabase (same project as the app). Tables are in `supabase/landing-schema.sql`.
- All database access goes through server route handlers in `src/app/api/`,
  using `src/lib/supabase-admin.ts`. Never use the service role key in a
  client component, and never prefix it with `NEXT_PUBLIC_`.
- Poll votes are anonymous: a random id in localStorage, salted and hashed on
  the server with `POLL_SALT`. Never store IP addresses or emails with votes.
- Waitlist forms need a clear consent checkbox (unticked by default) and a link
  to the privacy notice. UK GDPR applies.
- Rate-limit the vote and waitlist endpoints.

## Stack
Next.js 14 (App Router), TypeScript, plain CSS / CSS modules (no Tailwind),
Supabase, deployed on Vercel.
