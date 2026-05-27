import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Prefer service_role for server-side routes; fall back to anon if service
// key isn't configured. All EFD Supabase access is server-side (API routes
// + Server Components — never imported in a 'use client' file), so it's
// safe for these requests to use the elevated key. Once RLS is enabled on
// all public tables, anon will see/write nothing anyway, so service_role
// is the practical choice for everything here.
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY;

export function getSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY (or SUPABASE_ANON_KEY) must be set",
    );
  }
  return createClient(supabaseUrl, supabaseKey);
}
