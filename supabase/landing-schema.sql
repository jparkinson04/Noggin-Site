-- Noggin landing site tables.
-- Run this once in the Supabase dashboard: SQL Editor > New query > paste > Run.
-- It goes in the SAME Supabase project as the Noggin app.
--
-- Row Level Security is switched on with NO public policies, so nobody can read
-- or write these tables from the browser. The site's server routes use the
-- service role key instead.

-- 1. Waitlist ---------------------------------------------------------------
create table if not exists public.waitlist (
  id                uuid primary key default gen_random_uuid(),
  email             text not null,
  marketing_consent boolean not null default false,
  engine            text,          -- quiz result, if they came via the quiz
  source            text,          -- 'hero', 'footer', 'quiz', 'teams'
  created_at        timestamptz not null default now()
);
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));
alter table public.waitlist enable row level security;

-- 2. Polls ------------------------------------------------------------------
create table if not exists public.polls (
  id         uuid primary key default gen_random_uuid(),
  slug       text not null unique,
  question   text not null,
  options    jsonb not null,   -- [{ "id": "say", "label": "I never know what to say", "reply": "..." }]
  is_active  boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.polls enable row level security;

create table if not exists public.poll_votes (
  id         uuid primary key default gen_random_uuid(),
  poll_id    uuid not null references public.polls(id) on delete cascade,
  option_id  text not null,
  voter_hash text not null,      -- salted hash of a random browser id; never an IP or email
  created_at timestamptz not null default now(),
  unique (poll_id, voter_hash)   -- one vote per browser per poll
);
alter table public.poll_votes enable row level security;

-- Vote totals for one poll, used after someone votes.
create or replace function public.poll_results(p_poll_id uuid)
returns table (option_id text, votes bigint)
language sql stable security definer set search_path = public as $$
  select option_id, count(*) as votes
  from public.poll_votes
  where poll_id = p_poll_id
  group by option_id;
$$;
revoke all on function public.poll_results(uuid) from public, anon, authenticated;

-- 3. Quiz results (anonymous, for knowing the audience mix) ------------------
create table if not exists public.quiz_results (
  id         uuid primary key default gen_random_uuid(),
  engine     text not null,      -- storyteller | teacher | commentator | documenter
  blend      jsonb not null,     -- { "storyteller": 46, "teacher": 28, ... }
  stage      text,               -- business situation answer, for the funnel mix
  created_at timestamptz not null default now()
);
alter table public.quiz_results enable row level security;

-- 4. First poll ---------------------------------------------------------------
insert into public.polls (slug, question, options, is_active)
values (
  'what-stops-you-posting',
  'What stops you posting on LinkedIn?',
  '[
    {"id":"say","label":"I never know what to say","reply":"That''s what the deep dive is for. Twelve good questions tend to turn up far more than you think you have."},
    {"id":"brag","label":"It feels like showing off","reply":"Specific stories and real receipts read as useful rather than boastful. Noggin keeps you specific."},
    {"id":"time","label":"I don''t have time","reply":"Studio tells you what''s worth posting this week and drafts it from your own words, so you never start from a blank page."},
    {"id":"flat","label":"My posts get nothing back","reply":"Honest, specific posts tend to travel further than polished generic ones. Noggin is built around that kind of post."},
    {"id":"fake","label":"I worry it''ll sound fake","reply":"Every draft is built from things you''ve actually said, in your phrases. If a line doesn''t sound like you, it goes."}
  ]'::jsonb,
  true
)
on conflict (slug) do nothing;
