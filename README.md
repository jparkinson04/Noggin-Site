# noggin-site

The Noggin landing page: hero with the dot brain, a live poll, the content engine
quiz and the waitlist.

## First-time setup

1. **Open the folder.** In VS Code, choose File > Open Folder and pick `noggin-site`.
2. **Open a terminal.** Terminal > New Terminal.
3. **Install packages:**
   ```
   npm install
   ```
4. **Run it:**
   ```
   npm run dev
   ```
   Then open http://localhost:3000. You should see a placeholder saying the folder works.
5. **Start Claude Code** in the same terminal (`claude`) and paste in the prompt
   from `FIRST_PROMPT.md`.

## Hooking up Supabase (needed for the poll and waitlist)

Use the same Supabase project as the Noggin app.

1. In the Supabase dashboard, open **SQL Editor > New query**, paste in the whole of
   `supabase/landing-schema.sql`, and click **Run**.
2. Copy `.env.example` to a new file called `.env.local` in this folder.
3. In Supabase, go to **Project Settings > API** and copy:
   - the Project URL into `NEXT_PUBLIC_SUPABASE_URL`
   - the `service_role` key into `SUPABASE_SERVICE_ROLE_KEY` (keep this secret)
4. Put any long random string in `POLL_SALT`.
5. Stop and restart `npm run dev`.

## What's where

| Path | What it is |
|---|---|
| `CLAUDE.md` | Rules Claude Code follows in this repo |
| `FIRST_PROMPT.md` | The build prompt to paste into Claude Code |
| `design/mockups/` | The approved mockups (reference only) |
| `src/app/globals.css` | Colours, fonts and spacing tokens |
| `supabase/landing-schema.sql` | Waitlist, poll and quiz tables |

## Deploying

Push to GitHub, import the repo in Vercel, and add the three values from
`.env.local` under Settings > Environment Variables.
