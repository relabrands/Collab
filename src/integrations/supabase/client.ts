import { createBrowserClient } from '@supabase/ssr';
import type { Database } from './types';

export const supabase = createBrowserClient<Database>(
  'https://cezzxazlbochikdbncml.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlenp4YXpsYm9jaGlrZGJuY21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMjg2MTAsImV4cCI6MjA2NTcwNDYxMH0.MTgifk92sjK-earumQS0qkqN1_pKXFmrwVaNDVjKjr8',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  }
);
