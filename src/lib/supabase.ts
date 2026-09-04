import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LokasiSupabase {
  id: string;
  nama: string;
  kategori: string;
  lat: number;
  lng: number;
  foto_url?: string;
  deskripsi?: string;
  created_at?: string;
}
