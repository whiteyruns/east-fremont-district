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

-- Deny-by-default: only the service_role key (used by our /api routes) can
-- read or write. anon/public get nothing. Matches the EFD RLS lockdown posture
-- (new tables must enable RLS; server routes use service_role which bypasses it).
alter table thriller_registrations enable row level security;
