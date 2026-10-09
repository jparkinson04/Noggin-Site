# First prompt for Claude Code

Paste everything below the line into Claude Code, in this folder.

---

Read CLAUDE.md and both files in design/mockups/ before you start.

Build the Noggin landing page as a Next.js 14 App Router site, matching
design/mockups/landing-page.mockup.html as closely as you can. Work in this order,
and stop after each step so I can check it in the browser:

1. **Static page.** Turn the mockup into React components in src/components/
   (Nav, Hero, Poll, Problem, HowItWorks, Regions, QuizTeaser, Studio, Origin,
   Privacy, Pricing, Faq, Waitlist, Footer) and assemble them in
   src/app/page.tsx. Use the CSS variables in globals.css and CSS modules for
   styling. Keep all the copy exactly as it is in the mockup, including the
   [PLACEHOLDERS].

2. **The brain.** Build the dot brain in the hero as a client component: about
   300 dots in five coloured regions (whys, stories, opinions, personality,
   receipts) with labels on the map, and dots drifting toward the cursor on
   hover, like the mockup. Use requestAnimationFrame, keep it smooth on a
   laptop, show a still version for prefers-reduced-motion, and give it a
   sensible static layout on touch screens.

3. **Live poll.** Create:
   - GET /api/poll, which returns the active poll's question and options (no counts)
   - POST /api/poll/vote, which takes { optionId, voterId }, hashes voterId
     with POLL_SALT, stores the vote, and returns the percentages and the reply
     line for the chosen option
   Results only appear after voting. Remember the vote in localStorage so a
   returning visitor sees the results. Hide the vote count until there are
   at least 200 votes.

4. **Waitlist.** POST /api/waitlist with { email, marketingConsent, source,
   engine? }. Validate the email, handle duplicates politely ("You're already
   on the list"), and show the confirmation state from the mockup.

5. **Quiz.** Build /quiz from design/mockups/quiz-flow.mockup.html (intro,
   12 questions with a progress bar, result, email capture, done). For now use
   placeholder questions in src/lib/quiz.ts. I'll give you the real questions
   and scoring next. Save each completed result to quiz_results through
   POST /api/quiz, and pass the engine to the waitlist when they sign up from
   the result page.

Don't add analytics, cookie banners, auth or anything not listed here.
