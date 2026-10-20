import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jrzsohorajkmdlrckqyj.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyenNvaG9yYWprbWRscmNrcXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyODU4NDQsImV4cCI6MjEwMTg2MTg0NH0.cKvhLguKVo107NK4giQHnrAXAaaWFTvX7BMSu6_z1p0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
