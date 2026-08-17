import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const hasSupabaseConfig = Boolean(supabaseUrl && supabasePublishableKey);
export const missingSupabaseEnv = [
  !supabaseUrl ? "VITE_SUPABASE_URL" : null,
  !supabasePublishableKey ? "VITE_SUPABASE_PUBLISHABLE_KEY" : null,
].filter(Boolean);

export const supabase = hasSupabaseConfig
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;

export function authConfigMessage() {
  return `Supabase is not configured. Add ${missingSupabaseEnv.join(
    " and "
  )} to your environment.`;
}
