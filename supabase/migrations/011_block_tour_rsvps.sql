-- ============================================================================
-- Hosted block tours — planner RSVPs
-- First run: IMEX America week, Oct 13–15 2026 (event = 'imex-2026'), hosted
-- by Mauricio from Pink Monkey at 9:30 AM. Kept SEPARATE from efd_leads: an
-- RSVP is an opt-in to a walk, not an inquiry. The team alert carries every
-- row to booktheblock@ so Mauricio has each person's contact before the day.
-- The event column lets Connect / EMS week (Apr 2027) reuse the table.
-- ============================================================================
create table if not exists block_tour_rsvps (
  id uuid primary key default uuid_generate_v4(),
  event text not null default 'imex-2026',
  tour_date date not null,
  name text not null,
  company text not null,
  title text,
  email text not null,
  phone text,
  party_size int not null default 1 check (party_size between 1 and 6),
  -- Consent to be contacted by Corner Bar about private programs on the
  -- block (the opt-in Mauricio asked for). Stored separately from the RSVP
  -- itself so a "no" still gets a tour.
  opt_in boolean not null default false,
  notes text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  status text not null default 'rsvp'
    check (status in ('rsvp', 'confirmed', 'attended', 'no-show', 'cancelled')),
  created_at timestamptz default now(),
  unique (event, tour_date, email)
);

create index if not exists block_tour_rsvps_event_date_idx
  on block_tour_rsvps (event, tour_date);

-- RLS on, insert-only for anon (same posture as thriller_registrations).
-- Reads stay with service_role so attendee PII never reaches the anon key.
alter table block_tour_rsvps enable row level security;

create policy "block_tour_rsvps public insert"
  on block_tour_rsvps
  for insert to anon, authenticated
  with check (true);
