import { createClient as supabaseCreateClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseCreateClient(supabaseUrl, supabaseAnonKey);

// Export a function to create a new client when needed (useful for API routes)
export function createClient() {
  return supabaseCreateClient(supabaseUrl, supabaseAnonKey);
}
