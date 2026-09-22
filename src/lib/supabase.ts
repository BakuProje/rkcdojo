import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ohnzorgvtzoheuosnfhd.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_QJNGjeGbmyzY42UUV4PvrA_7UDj3kkR";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RegistrationRecord {
  id?: string;
  reg_id: string;
  full_name: string;
  gender: string;
  birth_date: string;
  age: string;
  address: string;
  whatsapp: string;
  status: string;
  institution?: string | null;
  motivation: string;
  registration_status?: string;
  created_at?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: "admin" | "superadmin" | "pelatih";
  created_at?: string;
}

export interface MemberRecord {
  id?: string;
  member_id?: string;
  full_name: string;
  belt_level: string; // e.g. "Sabuk Putih (Kyu 10)", "Sabuk Oranye (Kyu 9)", "Sabuk Biru (Kyu 7)", "Sabuk Biru Strip (Kyu 6)", "Sabuk Kuning (Kyu 5)", "Sabuk Kuning Strip (Kyu 4)", "Sabuk Hijau (Kyu 3)", "Sabuk Hijau Strip (Kyu 2)", "Sabuk Coklat (Kyu 2)", "Sabuk Coklat Strip (Kyu 1)", "Sabuk Hitam (Dan 1)"
  phone: string;
  dojo_branch: string;
  gender?: "Laki-laki" | "Perempuan" | string;
  age?: string;
  is_active: boolean;
  joined_date?: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id?: string;
  member_id?: string;
  member_name: string;
  belt_level: string;
  dojo_branch: string;
  session_name: string;
  checkin_time: string; // e.g. "16:15:30"
  date_str: string; // e.g. "2026-09-19"
  status: "Hadir" | "Alpa" | "Izin" | "Sakit";
  distance_meters?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  notes?: string;
  created_at?: string;
}

export interface AttendanceSettings {
  id?: string;
  open_time: string; // e.g. "15:00"
  close_time: string; // e.g. "21:00"
  dojo_lat: number; // e.g. -5.147665 (Dojo Racing / Makassar / WITA default)
  dojo_lng: number; // e.g. 119.432731
  max_radius_meters: number; // default: 50
  is_gps_enabled: boolean;
  is_time_restriction_enabled: boolean;
  timezone_label: string; // "WITA"
}

// Standard Kyokushin Belt Hierarchy as requested
export const KYOKUSHIN_BELT_OPTIONS = [
  "Sabuk Putih (Kyu 10)",
  "Sabuk Oranye (Kyu 9)",
  "Sabuk Biru (Kyu 8)",
  "Sabuk Biru Strip (Kyu 7)",
  "Sabuk Kuning (Kyu 6)",
  "Sabuk Kuning Strip (Kyu 5)",
  "Sabuk Hijau (Kyu 4)",
  "Sabuk Hijau Strip (Kyu 3)",
  "Sabuk Coklat (Kyu 2)",
  "Sabuk Coklat Strip (Kyu 1)",
  "Sabuk Hitam (Dan 1)",
];

// Haversine formula to compute distance between 2 GPS coordinates in meters
export function calculateDistanceMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}
