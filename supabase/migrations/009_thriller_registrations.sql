-- ============================================================================
-- Thriller GWR Event — Public Dancer Registrations
-- Free mass-participation signups from /event/thriller.
-- Deliberately SEPARATE from efd_leads (that's the sponsorship/sales pipeline).
-- This table is the honest dancer headcount for the Guinness record attempt,
-- so email is UNIQUE — one person, one spot on the grid.
-- ============================================================================
create table if not exists thriller_registrations (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text not null,
  email text not null unique,
  confirmation_code text not null unique,
  source text not null default 'thriller-page',
  status text not null default 'registered'
    check (status in ('registered', 'checked-in', 'cancelled')),
  created_at timestamptz default now()
);

create index if not exists thriller_registrations_created_at_idx
  on thriller_registrations (created_at desc);

-- RLS on (matches the EFD lockdown posture — new tables must enable RLS).
-- service_role (used by our /api routes) bypasses RLS entirely for reads/writes.
alter table thriller_registrations enable row level security;

-- Public signups arrive through our server-side /api/thriller-register route.
-- Allow INSERT only, so the table works whether the route authenticates with
-- service_role (bypasses RLS) or falls back to the anon key. Deliberately NO
-- select/update/delete policy — reads stay locked to service_role, so
-- registrant PII is never exposed to anon.
create policy "thriller_registrations public insert"
  on thriller_registrations
  for insert to anon, authenticated
  with check (true);
