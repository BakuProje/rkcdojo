-- ==============================================================================
-- RACING KYOKUSHIN CLUB (RKC) - SUPABASE DATABASE SCHEMA
-- Jalankan query SQL ini di Supabase SQL Editor untuk membuat semua tabel lengkap
-- ==============================================================================

-- 1. TABEL REGISTRASI (PENDAFTARAN BARU)
CREATE TABLE IF NOT EXISTS public.registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reg_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    birth_date VARCHAR(50) NOT NULL,
    age VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    whatsapp VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    institution VARCHAR(255),
    motivation TEXT NOT NULL,
    registration_status VARCHAR(50) DEFAULT 'Baru',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABEL MASTER ANGGOTA (MEMBERS)
CREATE TABLE IF NOT EXISTS public.members (
    id VARCHAR(100) PRIMARY KEY,
    member_id VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    belt_level VARCHAR(100) DEFAULT 'Sabuk Putih (Kyu 10)',
    phone VARCHAR(50),
    dojo_branch VARCHAR(100) DEFAULT 'Racing Kyokushin Club',
    gender VARCHAR(20) DEFAULT 'Laki-laki',
    is_active BOOLEAN DEFAULT TRUE,
    joined_date VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABEL PRESENSI HARIAN (ATTENDANCES)
CREATE TABLE IF NOT EXISTS public.attendances (
    id VARCHAR(100) PRIMARY KEY,
    member_id VARCHAR(50),
    member_name VARCHAR(255) NOT NULL,
    belt_level VARCHAR(100) DEFAULT 'Sabuk Putih (Kyu 10)',
    dojo_branch VARCHAR(100) DEFAULT 'Racing Kyokushin Club',
    session_name VARCHAR(100) DEFAULT 'Sesi Latihan Reguler',
    checkin_time VARCHAR(20) NOT NULL,
    date_str VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'Hadir',
    distance_meters NUMERIC,
    latitude NUMERIC,
    longitude NUMERIC,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABEL PENGATURAN ABSENSI (ATTENDANCE SETTINGS)
CREATE TABLE IF NOT EXISTS public.attendance_settings (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'default',
    open_time VARCHAR(10) DEFAULT '15:00',
    close_time VARCHAR(10) DEFAULT '21:00',
    dojo_lat NUMERIC DEFAULT -5.147665,
    dojo_lng NUMERIC DEFAULT 119.432732,
    max_radius_meters INTEGER DEFAULT 50,
    is_gps_enabled BOOLEAN DEFAULT TRUE,
    is_time_restriction_enabled BOOLEAN DEFAULT TRUE,
    timezone_label VARCHAR(20) DEFAULT 'WITA',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inisialisasi data default settings jika belum ada
INSERT INTO public.attendance_settings (id, open_time, close_time, dojo_lat, dojo_lng, max_radius_meters, is_gps_enabled, is_time_restriction_enabled, timezone_label)
VALUES ('default', '15:00', '21:00', -5.147665, 119.432732, 50, TRUE, TRUE, 'WITA')
ON CONFLICT (id) DO NOTHING;

-- 5. AKTIFKAN ROW LEVEL SECURITY (RLS) & POLICY PUBLIK (BISA DIBACA & DITULIS DENGAN ANON KEY)
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_settings ENABLE ROW LEVEL SECURITY;

-- Buat Policy Akses Penuh (SELECT, INSERT, UPDATE, DELETE) untuk Anon/Public Key
DROP POLICY IF EXISTS "Public Full Access Registrations" ON public.registrations;
CREATE POLICY "Public Full Access Registrations" ON public.registrations FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Full Access Members" ON public.members;
CREATE POLICY "Public Full Access Members" ON public.members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Full Access Attendances" ON public.attendances;
CREATE POLICY "Public Full Access Attendances" ON public.attendances FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public Full Access Settings" ON public.attendance_settings;
CREATE POLICY "Public Full Access Settings" ON public.attendance_settings FOR ALL USING (true) WITH CHECK (true);
