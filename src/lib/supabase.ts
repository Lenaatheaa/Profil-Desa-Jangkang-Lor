import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function ensureStorageBucket(bucketName: string) {
  const { data, error } = await supabase.storage.getBucket(bucketName);

  if (error || !data) {
    throw new Error(
      `Bucket storage "${bucketName}" belum dibuat di Supabase atau project yang dipakai salah.\n\nSilakan buat bucket tersebut di Dashboard Supabase > Storage, lalu pastikan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY mengarah ke project yang sama.`
    );
  }

  return data;
}

export async function uploadToBucket(bucketName: string, filePath: string, file: File) {
  await ensureStorageBucket(bucketName);

  const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, file);
  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}

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
