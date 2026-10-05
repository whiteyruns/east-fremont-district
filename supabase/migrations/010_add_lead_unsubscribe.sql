-- Drip opt-out. Set by /api/unsubscribe (link in every Book the Block drip);
-- /api/cron/follow-ups skips any lead with this set.
alter table efd_leads add column if not exists unsubscribed_at timestamptz;
