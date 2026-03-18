import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export function getSupabase() {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY must be set");
  }
  return createClient(supabaseUrl, supabaseKey);
}
