-- ================================================================
-- RACING KYOKUSHIN CLUB (RKC) - SUPABASE DATABASE SCHEMA
-- Jalankan script SQL ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ================================================================

-- 1. TABEL PENDAFTARAN (Registrations)
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reg_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    gender TEXT,
    birth_date TEXT,
    age TEXT,
    address TEXT,
    whatsapp TEXT,
    status TEXT,
    institution TEXT,
    motivation TEXT,
    registration_status TEXT DEFAULT 'Baru',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. TABEL MASTER ANGGOTA (Members)
CREATE TABLE IF NOT EXISTS public.members (
    id TEXT PRIMARY KEY,
    member_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    belt_level TEXT DEFAULT 'Sabuk Putih (Kyu 10)',
    phone TEXT,
    dojo_branch TEXT DEFAULT 'Racing Kyokushin Club',
    gender TEXT,
    age TEXT,
    is_active BOOLEAN DEFAULT true,
    joined_date TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. TABEL REKAP ABSENSI (Attendances)
CREATE TABLE IF NOT EXISTS public.attendances (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    member_id TEXT NOT NULL,
    member_name TEXT NOT NULL,
    date_str TEXT NOT NULL,
    checkin_time TEXT NOT NULL,
    status TEXT DEFAULT 'Hadir',
    location TEXT DEFAULT 'Dojo Utama',
    lat DOUBLE PRECISION,
    lng DOUBLE PRECISION,
    distance_m DOUBLE PRECISION,
    device_info TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. TABEL PENGATURAN RADIUS & JADWAL (Attendance Settings)
CREATE TABLE IF NOT EXISTS public.attendance_settings (
    id TEXT PRIMARY KEY DEFAULT 'default',
    dojo_lat DOUBLE PRECISION DEFAULT -5.147665,
    dojo_lng DOUBLE PRECISION DEFAULT 119.432732,
    dojo_radius_meters INTEGER DEFAULT 50,
    is_strict_radius BOOLEAN DEFAULT true,
    schedule_start TEXT DEFAULT '15:00',
    schedule_end TEXT DEFAULT '18:00',
    is_attendance_open BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Masukkan pengaturan default jika belum ada
INSERT INTO public.attendance_settings (id, dojo_lat, dojo_lng, dojo_radius_meters, is_strict_radius, schedule_start, schedule_end, is_attendance_open)
VALUES ('default', -5.147665, 119.432732, 50, true, '15:00', '18:00', true)
ON CONFLICT (id) DO NOTHING;

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Memberikan akses baca & tulis untuk anon / service_role
-- ================================================================

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_settings ENABLE ROW LEVEL SECURITY;

-- Registrations Policies
CREATE POLICY "Allow public all access on registrations" 
ON public.registrations FOR ALL USING (true) WITH CHECK (true);

-- Members Policies
CREATE POLICY "Allow public all access on members" 
ON public.members FOR ALL USING (true) WITH CHECK (true);

-- Attendances Policies
CREATE POLICY "Allow public all access on attendances" 
ON public.attendances FOR ALL USING (true) WITH CHECK (true);

-- Attendance Settings Policies
CREATE POLICY "Allow public all access on attendance_settings" 
ON public.attendance_settings FOR ALL USING (true) WITH CHECK (true);
