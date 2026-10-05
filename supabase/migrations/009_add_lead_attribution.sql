-- First-touch campaign attribution on leads (LVCVA commission tracking).
-- Written by /api/inquire and /api/deck-download from the efd_attr cookie
-- that AttributionCapture sets on landing. Until this runs, those routes
-- fall back to inserting without these columns (see src/lib/leads.ts).
alter table efd_leads add column if not exists utm_source text;
alter table efd_leads add column if not exists utm_medium text;
alter table efd_leads add column if not exists utm_campaign text;
alter table efd_leads add column if not exists utm_content text;
alter table efd_leads add column if not exists landing_path text;
alter table efd_leads add column if not exists first_touch_at timestamptz;

create index if not exists idx_efd_leads_utm_source on efd_leads(utm_source);
