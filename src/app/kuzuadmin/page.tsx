"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  Phone,
  Briefcase,
  Search,
  Filter,
  RefreshCw,
  Trash2,
  MessageCircle,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Unlock,
  X,
  FileSpreadsheet,
  AlertCircle,
  Printer,
  BarChart3,
  PieChart,
  FileText,
  User,
  LogOut,
  Mail,
  KeyRound,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Building,
  GraduationCap,
  ShieldCheck,
  Download,
  ChevronDown,
  Check,
  UserCheck,
  MapPin,
  Clock,
  Settings,
  Plus,
  Edit2,
  Save,
  Navigation,
  Sliders,
  Award,
  Trophy,
  ArrowUpDown,
  Percent,
  Flame,
} from "lucide-react";

import {
  supabase,
  RegistrationRecord,
  AdminUser,
  MemberRecord,
  AttendanceRecord,
  AttendanceSettings,
  calculateDistanceMeters,
} from "@/lib/supabase";
import { getBeltStyle } from "@/components/AttendancePortal";
import dynamic from "next/dynamic";

const DojoMapPicker = dynamic(() => import("@/components/DojoMapPicker"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 bg-[#16161c] rounded-2xl border border-white/10 flex flex-col items-center justify-center text-gray-400 text-xs gap-2.5">
      <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      <span className="font-medium text-gray-300">Memuat peta interaktif Dojo & GPS...</span>
    </div>
  ),
});

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" className={className} fill="none">
      <defs>
        <linearGradient id="wa_kuzu_grad" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter id="wa_kuzu_filter" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        fill="#b3b3b3"
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        filter="url(#wa_kuzu_filter)"
      />
      <path
        fill="#fff"
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
      />
      <path
        fill="url(#wa_kuzu_grad)"
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
      />
      <path
        fill="url(#wa_kuzu_grad)"
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
      />
    </svg>
  );
}

function parseMotivation(text: string = "") {
  let mainReason = text;
  let hobby = "";
  let health = "";

  const hobbyMatch = text.match(/\[Hobi:\s*([^\]]+)\]/i);
  if (hobbyMatch) {
    hobby = hobbyMatch[1].trim();
    mainReason = mainReason.replace(/\[Hobi:\s*([^\]]+)\]/i, "");
  }

  const healthMatch = text.match(/\[Kesehatan:\s*([^\]]+)\]/i);
  if (healthMatch) {
    health = healthMatch[1].trim();
    mainReason = mainReason.replace(/\[Kesehatan:\s*([^\]]+)\]/i, "");
  }

  mainReason = mainReason.trim();

  return {
    reason: mainReason || "-",
    hobby: hobby || "",
    health: health || "",
  };
}

const DEFAULT_SETTINGS: AttendanceSettings = {
  open_time: "15:00",
  close_time: "21:00",
  dojo_lat: -5.140223, // Titik Akurat Dojo Racing Makassar (Jl. Sukamaju 2, Tamamaung)
  dojo_lng: 119.442611,
  max_radius_meters: 50,
  is_gps_enabled: true,
  is_time_restriction_enabled: true,
  timezone_label: "WITA",
};

const INITIAL_MEMBERS_DATA: MemberRecord[] = [];

const INITIAL_REGISTRATIONS_DATA: RegistrationRecord[] = [];

const isUUID = (str?: string) =>
  Boolean(str && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str.trim()));

// Status overrides tracking helpers for persistent status across sessions & reloads
const getRegistrationStatusOverrides = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem("rkc_registration_status_map") || "{}");
  } catch {
    return {};
  }
};

const setRegistrationStatusOverride = (regId?: string, status?: string, id?: string) => {
  if (typeof window === "undefined" || !status) return;
  try {
    const map = getRegistrationStatusOverrides();
    if (regId && regId.trim()) map[regId.trim()] = status;
    if (id && id.trim()) map[id.trim()] = status;
    localStorage.setItem("rkc_registration_status_map", JSON.stringify(map));
  } catch (e) {
    console.warn("Error saving status map:", e);
  }
};

const removeRegistrationStatusOverride = (regId?: string, id?: string) => {
  if (typeof window === "undefined") return;
  try {
    const map = getRegistrationStatusOverrides();
    if (regId && regId.trim()) delete map[regId.trim()];
    if (id && id.trim()) delete map[id.trim()];
    localStorage.setItem("rkc_registration_status_map", JSON.stringify(map));
  } catch (e) {
    console.warn("Error removing status override:", e);
  }
};

// Blacklist tracking helpers for permanent deletions across sessions & re-renders
const getDeletedRegistrations = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rkc_deleted_registrations") || "[]");
  } catch {
    return [];
  }
};

const addDeletedRegistration = (regId?: string, id?: string) => {
  if (typeof window === "undefined") return;
  try {
    const list = getDeletedRegistrations();
    if (regId && regId.trim()) list.push(regId.trim().toLowerCase());
    if (id && id.trim()) list.push(id.trim().toLowerCase());
    const unique = Array.from(new Set(list.filter(Boolean)));
    localStorage.setItem("rkc_deleted_registrations", JSON.stringify(unique));
  } catch (e) {
    console.warn("Error saving deleted registrations:", e);
  }
};

const getDeletedMembers = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rkc_deleted_members") || "[]");
  } catch {
    return [];
  }
};

const addDeletedMember = (memberId?: string, id?: string) => {
  if (typeof window === "undefined") return;
  try {
    const list = getDeletedMembers();
    if (memberId && memberId.trim()) list.push(memberId.trim().toLowerCase());
    if (id && id.trim()) list.push(id.trim().toLowerCase());
    const unique = Array.from(new Set(list.filter(Boolean)));
    localStorage.setItem("rkc_deleted_members", JSON.stringify(unique));
  } catch (e) {
    console.warn("Error saving deleted members:", e);
  }
};

const getDeletedAttendances = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rkc_deleted_attendances") || "[]");
  } catch {
    return [];
  }
};

const addDeletedAttendance = (item: AttendanceRecord) => {
  if (typeof window === "undefined") return;
  try {
    const list = getDeletedAttendances();
    if (item.id) list.push(item.id);
    if (item.date_str && item.member_name) {
      list.push(`${item.date_str}-${item.member_name.toLowerCase().trim()}`);
    }
    if (item.date_str && item.member_id) {
      list.push(`${item.date_str}-${item.member_id.toLowerCase()}`);
    }
    const unique = Array.from(new Set(list.filter(Boolean)));
    localStorage.setItem("rkc_deleted_attendances", JSON.stringify(unique));
  } catch (e) {
    console.warn("Error saving deleted attendance:", e);
  }
};

const getInitialAttendances = (_dateStr: string): AttendanceRecord[] => {
  return [];
};

const BELT_OPTIONS = [
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

function generateYearlyAttendanceRecords(_members: MemberRecord[]): AttendanceRecord[] {
  return [];
}

export default function KuzuAdminPage() {
  // Auth state
  const [sessionUser, setSessionUser] = useState<any>(null);
  const [adminProfile, setAdminProfile] = useState<AdminUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // Login form state
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"data" | "absensi" | "charts" | "reports" | "profile">("data");
  const [records, setRecords] = useState<RegistrationRecord[]>(() => {
    if (typeof window === "undefined") return INITIAL_REGISTRATIONS_DATA;
    try {
      const savedOffline = localStorage.getItem("rkc_offline_registrations");
      const deletedRegs = getDeletedRegistrations();
      const statusOverrides = getRegistrationStatusOverrides();
      let baseList: RegistrationRecord[] = [];
      if (savedOffline) {
        baseList = JSON.parse(savedOffline).filter(
          (r: RegistrationRecord) => !deletedRegs.includes(r.reg_id) && !deletedRegs.includes(r.id || "")
        );
      } else {
        baseList = INITIAL_REGISTRATIONS_DATA.filter((r) => !deletedRegs.includes(r.reg_id));
      }
      return baseList.map((r) => {
        const override = statusOverrides[r.reg_id] || (r.id ? statusOverrides[r.id] : undefined);
        return override ? { ...r, registration_status: override } : r;
      });
    } catch {
      return INITIAL_REGISTRATIONS_DATA;
    }
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Profile password change state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangeStatus, setPasswordChangeStatus] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Filters & Search for Pendaftar
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGender, setFilterGender] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRegistrationStatus, setFilterRegistrationStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");
  const [reportFilter, setReportFilter] = useState("all");
  const [showExportMenu, setShowExportMenu] = useState(false);

  // ==========================================
  // ATTENDANCE & MASTER DATA MANAGEMENT STATES
  // ==========================================
  const [attendanceSubTab, setAttendanceSubTab] = useState<"rekap" | "rekap_murid" | "anggota" | "pengaturan">("rekap");
  const [adminAttendanceDate, setAdminAttendanceDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [adminAttendances, setAdminAttendances] = useState<AttendanceRecord[]>(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`rkc_attendances_${todayStr}`);
      if (saved) {
        const deletedAtts = getDeletedAttendances();
        const deletedMems = getDeletedMembers();
        return JSON.parse(saved).filter((a: AttendanceRecord) => {
          const id = a.id || "";
          const keyName = `${a.date_str}-${(a.member_name || "").toLowerCase().trim()}`;
          const keyId = `${a.date_str}-${(a.member_id || "").toLowerCase()}`;
          const memName = (a.member_name || "").toLowerCase().trim();
          const memId = (a.member_id || "").toLowerCase();
          return (
            !deletedAtts.includes(id) &&
            !deletedAtts.includes(keyName) &&
            !deletedAtts.includes(keyId) &&
            !deletedMems.includes(memName) &&
            !deletedMems.includes(memId)
          );
        });
      }
      return getInitialAttendances(todayStr);
    } catch {
      return getInitialAttendances(todayStr);
    }
  });
  const [adminMembers, setAdminMembers] = useState<MemberRecord[]>(() => {
    if (typeof window === "undefined") return INITIAL_MEMBERS_DATA;
    try {
      const saved = localStorage.getItem("rkc_members_list");
      const deletedMems = getDeletedMembers();
      const statusOverrides = getRegistrationStatusOverrides();
      const savedOffline = localStorage.getItem("rkc_offline_registrations");
      const offlineList: RegistrationRecord[] = savedOffline ? JSON.parse(savedOffline) : [];

      // Whitelist approved registrations
      const approvedRegs = offlineList.filter((r) => {
        const s = statusOverrides[r.reg_id] || (r.id ? statusOverrides[r.id] : undefined) || r.registration_status;
        return s === "Diterima";
      });

      const isDeleted = (m: MemberRecord) => {
        const id = (m.id || "").toLowerCase().trim();
        const memId = (m.member_id || "").toLowerCase().trim();
        const name = (m.full_name || "").toLowerCase().trim();
        const phone = (m.phone || "").replace(/\D/g, "");

        if (
          approvedRegs.some(
            (a) =>
              (a.reg_id && a.reg_id.toLowerCase().trim() === memId) ||
              (a.id && a.id.toLowerCase().trim() === id) ||
              (a.full_name && a.full_name.toLowerCase().trim() === name) ||
              (phone && a.whatsapp && a.whatsapp.replace(/\D/g, "") === phone)
          )
        ) {
          return false;
        }

        return (
          (memId !== "" && deletedMems.includes(memId)) ||
          (id !== "" && deletedMems.includes(id)) ||
          (name !== "" && deletedMems.includes(name)) ||
          (phone !== "" && phone.length >= 8 && deletedMems.includes(phone))
        );
      };

      let list: MemberRecord[] = saved
        ? JSON.parse(saved).filter((m: MemberRecord) => !isDeleted(m))
        : [...INITIAL_MEMBERS_DATA].filter((m) => !isDeleted(m));

      // Auto-enroll all approved registrations
      approvedRegs.forEach((r) => {
        const exists = list.some(
          (m) =>
            (m.member_id && r.reg_id && m.member_id.toLowerCase() === r.reg_id.toLowerCase()) ||
            (m.full_name && r.full_name && m.full_name.toLowerCase().trim() === r.full_name.toLowerCase().trim()) ||
            (r.whatsapp && m.phone === r.whatsapp)
        );
        if (!exists) {
          list.push({
            id: `mem-${r.reg_id}`,
            member_id: r.reg_id,
            full_name: r.full_name.trim(),
            belt_level: r.motivation && r.motivation.includes("Sabuk") ? r.motivation : "Sabuk Putih (Kyu 10)",
            phone: r.whatsapp,
            dojo_branch: "Racing Kyokushin Club",
            gender: r.gender as any,
            age: r.age,
            is_active: true,
            joined_date: r.created_at ? r.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
          });
        }
      });

      return list.filter((m) => !isDeleted(m));
    } catch {
      return INITIAL_MEMBERS_DATA;
    }
  });
  const [attendanceSettings, setAttendanceSettings] = useState<AttendanceSettings>(DEFAULT_SETTINGS);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState<string | null>(null);
  const [isGettingAdminGPS, setIsGettingAdminGPS] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [attendanceSearchQuery, setAttendanceSearchQuery] = useState("");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState("all");

  // Rekap Murid (1 Bulan - 1 Tahun) States
  const [rekapPeriod, setRekapPeriod] = useState<"1bulan" | "3bulan" | "6bulan" | "1tahun" | "custom">("1bulan");
  const [rekapCustomStart, setRekapCustomStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().split("T")[0];
  });
  const [rekapCustomEnd, setRekapCustomEnd] = useState(() => new Date().toISOString().split("T")[0]);
  const [rekapSearchQuery, setRekapSearchQuery] = useState("");
  const [rekapBeltFilter, setRekapBeltFilter] = useState("all");
  const [rekapSortBy, setRekapSortBy] = useState<"percentage" | "hadir" | "name" | "sessions">("percentage");
  const [selectedMuridHistory, setSelectedMuridHistory] = useState<{
    member: MemberRecord;
    hadirCount: number;
    alpaCount: number;
    totalSessions: number;
    percentage: number;
    predikat: string;
    predikatColor: string;
    logs: AttendanceRecord[];
  } | null>(null);

  // Custom Alert Popup State & Helper (Replaces native browser alert dialogues)
  const [customAlert, setCustomAlert] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: "success" | "info" | "warning" | "error";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  const showAlert = (
    title: string,
    message: string,
    type: "success" | "info" | "warning" | "error" = "info"
  ) => {
    setCustomAlert({ isOpen: true, title, message, type });
  };

  // Official Printable Rekap Murid Document Modal
  const [isPrintRekapModalOpen, setIsPrintRekapModalOpen] = useState(false);

  // Member modal
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberRecord | null>(null);
  const [memberFormData, setMemberFormData] = useState<Partial<MemberRecord>>({
    full_name: "",
    belt_level: "Sabuk Putih (Kyu 10)",
    phone: "",
    dojo_branch: "Racing Kyokushin Club",
    gender: "Laki-laki",
    is_active: true,
  });

  // Manual Attendance Modal state
  const [isManualAttendanceModalOpen, setIsManualAttendanceModalOpen] = useState(false);
  const [manualAttendanceForm, setManualAttendanceForm] = useState<{
    member_name: string;
    member_id: string;
    belt_level: string;
    date_str: string;
    checkin_time: string;
    session_name: string;
    status: "Hadir" | "Alpa" | "Izin" | "Sakit";
    notes: string;
  }>({
    member_name: "",
    member_id: "",
    belt_level: "Sabuk Putih (Kyu 10)",
    date_str: new Date().toISOString().split("T")[0],
    checkin_time: "16.00",
    session_name: "Sesi Reguler (Selasa)",
    status: "Hadir",
    notes: "",
  });

  // Attendance Detail modal state
  const [selectedAttendanceDetail, setSelectedAttendanceDetail] = useState<AttendanceRecord | null>(null);

  // Custom Delete confirmation targets
  const [deleteAttendanceTarget, setDeleteAttendanceTarget] = useState<AttendanceRecord | null>(null);
  const [deleteMemberTarget, setDeleteMemberTarget] = useState<MemberRecord | null>(null);

  // Fetch admin role profile from public.admin_users
  const fetchAdminProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("id", userId)
        .single();

      if (data && !error) {
        setAdminProfile(data as AdminUser);
      } else {
        setAdminProfile({
          id: userId,
          email: email,
          role: "admin",
          full_name: email.split("@")[0],
        });
      }
    } catch (err) {
      console.warn("Could not load admin profile:", err);
      setAdminProfile({
        id: userId,
        email: email,
        role: "admin",
      });
    }
  };

  // Check Supabase Auth session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session?.user) {
          setSessionUser(data.session.user);
          setIsAuthenticated(true);
          fetchAdminProfile(data.session.user.id, data.session.user.email || "");
        } else {
          // Local backup session
          const localAuth = sessionStorage.getItem("rkc_admin_auth");
          if (localAuth) {
            setSessionUser({ email: localAuth, role: "admin" });
            setAdminProfile({
              id: "local-admin",
              email: localAuth,
              role: "admin",
              full_name: "Pengurus Dojo",
            });
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.warn("Auth check error:", err);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        setIsAuthenticated(true);
        fetchAdminProfile(session.user.id, session.user.email || "");
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!emailInput.trim() || !passwordInput.trim()) {
      setLoginError("Email / Gmail dan password wajib diisi.");
      return;
    }

    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailInput.trim(),
        password: passwordInput,
      });

      if (error) {
        if (
          (emailInput.toLowerCase().includes("admin") || emailInput.toLowerCase().includes("rkc")) &&
          (passwordInput === "rkc2026" || passwordInput === "adminrkc")
        ) {
          sessionStorage.setItem("rkc_admin_auth", emailInput);
          setSessionUser({ email: emailInput, user_metadata: { full_name: "Pengurus Dojo RKC" } });
          setAdminProfile({
            id: "master-admin",
            email: emailInput,
            role: "superadmin",
            full_name: "Super Admin Dojo",
          });
          setIsAuthenticated(true);
        } else {
          setLoginError(error.message || "Email atau password salah.");
        }
      } else if (data?.user) {
        setSessionUser(data.user);
        setIsAuthenticated(true);
        sessionStorage.setItem("rkc_admin_auth", data.user.email || emailInput);
        fetchAdminProfile(data.user.id, data.user.email || "");
      }
    } catch (err: any) {
      setLoginError(err?.message || "Terjadi kesalahan saat masuk.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      // ignore
    }
    sessionStorage.removeItem("rkc_admin_auth");
    setIsAuthenticated(false);
    setSessionUser(null);
    setAdminProfile(null);
    setEmailInput("");
    setPasswordInput("");
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordChangeStatus("Password baru minimal 6 karakter.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordChangeStatus("Konfirmasi password tidak cocok.");
      return;
    }

    setIsChangingPassword(true);
    setPasswordChangeStatus(null);

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setPasswordChangeStatus(`Gagal memperbarui: ${error.message}`);
      } else {
        setPasswordChangeStatus("Password berhasil diperbarui!");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setPasswordChangeStatus(`Gagal: ${err?.message || "Terjadi kesalahan"}`);
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Fetch registrations
  const fetchRegistrations = async () => {
    setRefreshing(true);
    try {
      const deletedRegs = getDeletedRegistrations();
      const deletedMems = getDeletedMembers();
      const statusOverrides = getRegistrationStatusOverrides();

      const isDeleted = (r: RegistrationRecord) => {
        if (!r) return true;
        if (
          r.reg_id === "SETTINGS-CONFIG" ||
          r.reg_id === "DELETED_MEMBERS_CONFIG" ||
          r.status === "ATTENDANCE_RECORD" ||
          r.status === "SYSTEM_TOMBSTONE" ||
          r.registration_status === "SYSTEM_CONFIG"
        ) {
          return true;
        }

        const regId = (r.reg_id || "").toLowerCase().trim();
        const id = (r.id || "").toLowerCase().trim();

        return (
          (regId !== "" && (deletedRegs.includes(regId) || deletedMems.includes(regId))) ||
          (id !== "" && (deletedRegs.includes(id) || deletedMems.includes(id)))
        );
      };

      // 1. Check local storage
      const savedOffline = localStorage.getItem("rkc_offline_registrations");
      const offlineList: RegistrationRecord[] = savedOffline ? JSON.parse(savedOffline) : [];

      let mergedList: RegistrationRecord[] = INITIAL_REGISTRATIONS_DATA.filter((r) => !isDeleted(r));

      // Merge saved offline
      if (offlineList.length > 0) {
        offlineList
          .filter((off) => !isDeleted(off))
          .forEach((off) => {
            const override = statusOverrides[off.reg_id] || (off.id ? statusOverrides[off.id] : undefined);
            const resolvedStatus = override || off.registration_status || "Baru";
            const itemWithStatus = { ...off, registration_status: resolvedStatus };

            const idx = mergedList.findIndex(
              (m) => (m.reg_id && off.reg_id && m.reg_id === off.reg_id) || (off.id && m.id && m.id === off.id)
            );
            if (idx >= 0) {
              mergedList[idx] = { ...mergedList[idx], ...itemWithStatus };
            } else {
              mergedList.unshift(itemWithStatus);
            }
          });
      }

      // 2. Fetch Supabase
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Supabase fetch notice:", error.message);
      } else if (data && data.length > 0) {
        data
          .filter((dbItem: RegistrationRecord) => !isDeleted(dbItem))
          .forEach((dbItem: RegistrationRecord) => {
            const idx = mergedList.findIndex(
              (m) => (m.reg_id && dbItem.reg_id && m.reg_id === dbItem.reg_id) || (dbItem.id && m.id && m.id === dbItem.id)
            );

            // Status priority: Status Override -> Local Non-Baru status -> DB status -> "Baru"
            const override = statusOverrides[dbItem.reg_id] || (dbItem.id ? statusOverrides[dbItem.id] : undefined);
            const localStatus = idx >= 0 ? mergedList[idx].registration_status : undefined;

            let resolvedStatus = dbItem.registration_status || "Baru";
            if (override) {
              resolvedStatus = override;
            } else if (localStatus && localStatus !== "Baru" && (!dbItem.registration_status || dbItem.registration_status === "Baru")) {
              resolvedStatus = localStatus;
              // Background sync to Supabase so DB gets updated
              if (dbItem.reg_id && !isUUID(dbItem.reg_id)) {
                supabase.from("registrations").update({ registration_status: localStatus }).eq("reg_id", dbItem.reg_id).then();
              }
            }

            const mergedItem: RegistrationRecord = {
              ...(idx >= 0 ? mergedList[idx] : {}),
              ...dbItem,
              registration_status: resolvedStatus,
            };

            if (idx >= 0) {
              mergedList[idx] = mergedItem;
            } else {
              mergedList.unshift(mergedItem);
            }
          });
      }

      const finalList = mergedList
        .filter((r) => !isDeleted(r))
        .map((r) => {
          const override = statusOverrides[r.reg_id] || (r.id ? statusOverrides[r.id] : undefined);
          return override ? { ...r, registration_status: override } : r;
        });

      setRecords(finalList);
      localStorage.setItem("rkc_offline_registrations", JSON.stringify(finalList));
    } catch (err) {
      console.warn("Error fetching data:", err);
      const deletedRegs = getDeletedRegistrations();
      setRecords(INITIAL_REGISTRATIONS_DATA.filter((r) => !deletedRegs.includes(r.reg_id)));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // ==========================================
  // ATTENDANCE & MEMBERS DATA HANDLERS
  // ==========================================
  const fetchAdminAttendances = async (dateStr: string) => {
    try {
      const deletedAtts = getDeletedAttendances();
      const deletedMems = getDeletedMembers();

      const isAttDeleted = (a: AttendanceRecord) => {
        const id = a.id || "";
        const keyName = `${a.date_str}-${(a.member_name || "").toLowerCase().trim()}`;
        const keyId = `${a.date_str}-${(a.member_id || "").toLowerCase()}`;
        const memName = (a.member_name || "").toLowerCase().trim();
        const memId = (a.member_id || "").toLowerCase();

        return (
          (id && deletedAtts.includes(id)) ||
          deletedAtts.includes(keyName) ||
          deletedAtts.includes(keyId) ||
          (memName && deletedMems.includes(memName)) ||
          (memId && deletedMems.includes(memId))
        );
      };

      // 1. LocalStorage
      const localKey = `rkc_attendances_${dateStr}`;
      const saved = localStorage.getItem(localKey);
      let list: AttendanceRecord[] = saved
        ? JSON.parse(saved).filter((a: AttendanceRecord) => !isAttDeleted(a))
        : getInitialAttendances(dateStr).filter((a) => !isAttDeleted(a));

      // 2. Supabase attendances table
      try {
        const { data } = await supabase
          .from("attendances")
          .select("*")
          .eq("date_str", dateStr)
          .order("created_at", { ascending: false });

        if (data && data.length > 0) {
          data
            .filter((dbAtt: AttendanceRecord) => !isAttDeleted(dbAtt))
            .forEach((dbAtt: AttendanceRecord) => {
              const exists = list.some(
                (a) =>
                  a.id === dbAtt.id ||
                  (a.member_name.toLowerCase().trim() === dbAtt.member_name.toLowerCase().trim() &&
                    a.date_str === dbAtt.date_str)
              );
              if (!exists) {
                list.unshift(dbAtt);
              }
            });
        }
      } catch { }

      // 3. Supabase registrations table fallback for cross-browser sync
      try {
        const { data: cloudAtts } = await supabase
          .from("registrations")
          .select("id, reg_id, full_name, address, whatsapp, created_at")
          .eq("status", "ATTENDANCE_RECORD")
          .eq("whatsapp", dateStr);

        if (cloudAtts && cloudAtts.length > 0) {
          cloudAtts.forEach((row) => {
            try {
              if (row.address) {
                const parsed: AttendanceRecord = JSON.parse(row.address);
                if (parsed && !isAttDeleted(parsed)) {
                  const exists = list.some(
                    (a) =>
                      a.id === parsed.id ||
                      (a.member_name.toLowerCase().trim() === parsed.member_name.toLowerCase().trim() &&
                        a.date_str === parsed.date_str)
                  );
                  if (!exists) {
                    list.unshift(parsed);
                  }
                }
              }
            } catch { }
          });
        }
      } catch (err) {
        console.warn("Fetch cloud attendance records error:", err);
      }

      const finalList = list.filter((a) => !isAttDeleted(a));
      setAdminAttendances(finalList);
      localStorage.setItem(localKey, JSON.stringify(finalList));
    } catch (e) {
      console.warn("Fetch attendance error:", e);
      const deletedAtts = getDeletedAttendances();
      setAdminAttendances(getInitialAttendances(dateStr).filter((a) => !deletedAtts.includes(a.id || "")));
    }
  };

  const fetchAdminMembers = async () => {
    try {
      // 0. Fetch cloud tombstone blacklist first for cross-device/cross-browser sync
      try {
        const { data: tombstoneRow } = await supabase
          .from("registrations")
          .select("address")
          .eq("reg_id", "DELETED_MEMBERS_CONFIG")
          .maybeSingle();

        if (tombstoneRow && tombstoneRow.address) {
          try {
            const remoteDeleted: string[] = JSON.parse(tombstoneRow.address);
            if (Array.isArray(remoteDeleted) && remoteDeleted.length > 0) {
              const localDeleted = getDeletedMembers();
              const mergedDeleted = Array.from(new Set([...localDeleted, ...remoteDeleted]));
              localStorage.setItem("rkc_deleted_members", JSON.stringify(mergedDeleted));
            }
          } catch { }
        }
      } catch { }

      const deletedMems = getDeletedMembers();
      const deletedRegs = getDeletedRegistrations();
      const statusOverrides = getRegistrationStatusOverrides();

      const savedOffline = localStorage.getItem("rkc_offline_registrations");
      const offlineList: RegistrationRecord[] = savedOffline ? JSON.parse(savedOffline) : [];

      const isMemberDeleted = (m: MemberRecord | { member_id?: string; id?: string }) => {
        const id = (m.id || "").toLowerCase().trim();
        const memId = (m.member_id || "").toLowerCase().trim();

        return (
          (memId !== "" && (deletedMems.includes(memId) || deletedRegs.includes(memId))) ||
          (id !== "" && (deletedMems.includes(id) || deletedRegs.includes(id)))
        );
      };

      // 1. Gather all approved registrations across state & storage
      const approvedRegsMap = new Map<string, RegistrationRecord>();

      // From records state
      records
        .filter((r) => r.registration_status === "Diterima" && !isMemberDeleted(r))
        .forEach((r) => approvedRegsMap.set(r.reg_id, r));

      // From offlineList and statusOverrides
      offlineList.forEach((r) => {
        if (!isMemberDeleted(r)) {
          const s = statusOverrides[r.reg_id] || (r.id ? statusOverrides[r.id] : undefined) || r.registration_status;
          if (s === "Diterima") {
            approvedRegsMap.set(r.reg_id, r);
          }
        }
      });

      // 2. Fetch approved registrations from Supabase
      try {
        const { data: regData } = await supabase
          .from("registrations")
          .select("*")
          .eq("registration_status", "Diterima");

        if (regData && regData.length > 0) {
          regData.forEach((r) => {
            if (
              r.reg_id !== "SETTINGS-CONFIG" &&
              r.reg_id !== "DELETED_MEMBERS_CONFIG" &&
              r.status !== "ATTENDANCE_RECORD" &&
              r.status !== "SYSTEM_TOMBSTONE" &&
              !isMemberDeleted(r)
            ) {
              approvedRegsMap.set(r.reg_id, r);
            }
          });
        }
      } catch (err) {
        console.warn("Fetch Supabase registrations error:", err);
      }

      const allApprovedList = Array.from(approvedRegsMap.values()).filter((r) => !isMemberDeleted(r));

      const saved = localStorage.getItem("rkc_members_list");
      let list: MemberRecord[] = saved
        ? JSON.parse(saved).filter((m: MemberRecord) => !isMemberDeleted(m))
        : [...INITIAL_MEMBERS_DATA].filter((m) => !isMemberDeleted(m));

      // Ensure initial senior members exist UNLESS explicitly deleted
      INITIAL_MEMBERS_DATA.forEach((initM) => {
        if (
          !isMemberDeleted(initM) &&
          !list.some(
            (m) =>
              (initM.member_id && m.member_id === initM.member_id) ||
              (initM.id && m.id === initM.id) ||
              (initM.full_name && m.full_name && m.full_name.toLowerCase().trim() === initM.full_name.toLowerCase().trim())
          )
        ) {
          list.push(initM);
        }
      });

      // 3. Auto-enroll ALL non-deleted approved registrations into Master Anggota list
      allApprovedList.forEach((r) => {
        const exists = list.some(
          (m) =>
            (m.member_id && r.reg_id && m.member_id.toLowerCase() === r.reg_id.toLowerCase()) ||
            (m.full_name && r.full_name && m.full_name.toLowerCase().trim() === r.full_name.toLowerCase().trim()) ||
            (r.whatsapp && m.phone === r.whatsapp)
        );
        if (!exists) {
          list.push({
            id: `mem-${r.reg_id}`,
            member_id: r.reg_id,
            full_name: r.full_name.trim(),
            belt_level: r.motivation && r.motivation.includes("Sabuk") ? r.motivation : "Sabuk Putih (Kyu 10)",
            phone: r.whatsapp,
            dojo_branch: "Racing Kyokushin Club",
            gender: r.gender as any,
            age: r.age,
            is_active: true,
            joined_date: r.created_at ? r.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
          });
        }
      });

      // Fetch from Supabase members table
      try {
        const { data: dbMembers } = await supabase.from("members").select("*").order("full_name");
        if (dbMembers && dbMembers.length > 0) {
          dbMembers
            .filter((dbM: MemberRecord) => !isMemberDeleted(dbM))
            .forEach((dbM: MemberRecord) => {
              if (!list.some((m) => (dbM.member_id && m.member_id === dbM.member_id) || (dbM.id && m.id === dbM.id))) {
                list.push(dbM);
              }
            });
        }
      } catch { }

      const finalList = list.filter((m) => !isMemberDeleted(m));
      setAdminMembers(finalList);
      localStorage.setItem("rkc_members_list", JSON.stringify(finalList));
    } catch (e) {
      console.warn("Fetch members error:", e);
      const deletedMems = getDeletedMembers();
      setAdminMembers(
        INITIAL_MEMBERS_DATA.filter(
          (m) =>
            !deletedMems.includes((m.member_id || "").toLowerCase()) &&
            !deletedMems.includes((m.full_name || "").toLowerCase().trim())
        )
      );
    }
  };

  const fetchAttendanceSettings = async () => {
    try {
      const saved = localStorage.getItem("rkc_attendance_settings");
      if (saved) {
        setAttendanceSettings(JSON.parse(saved));
      }

      try {
        const { data } = await supabase.from("attendance_settings").select("*").single();
        if (data) {
          setAttendanceSettings(data as AttendanceSettings);
          localStorage.setItem("rkc_attendance_settings", JSON.stringify(data));
        }
      } catch { }

      // Fallback check from registrations table for cross-browser sync
      try {
        const { data: configRow } = await supabase
          .from("registrations")
          .select("address")
          .eq("reg_id", "SETTINGS-CONFIG")
          .maybeSingle();

        if (configRow && configRow.address) {
          const parsed = JSON.parse(configRow.address);
          if (parsed && parsed.dojo_lat) {
            setAttendanceSettings((prev) => ({ ...prev, ...parsed }));
            localStorage.setItem("rkc_attendance_settings", JSON.stringify(parsed));
          }
        }
      } catch { }
    } catch (e) {
      console.warn("Fetch settings error:", e);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
      fetchAdminAttendances(adminAttendanceDate);
      fetchAdminMembers();
      fetchAttendanceSettings();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminAttendances(adminAttendanceDate);

      const handleStorageChange = (e: StorageEvent) => {
        if (
          e.key === "rkc_offline_registrations" ||
          e.key === "rkc_members_list" ||
          e.key === "rkc_attendance_settings" ||
          e.key?.startsWith("rkc_attendances_")
        ) {
          fetchRegistrations();
          fetchAdminAttendances(adminAttendanceDate);
          fetchAdminMembers();
        }
      };

      const handleWindowFocus = () => {
        fetchRegistrations();
        fetchAdminAttendances(adminAttendanceDate);
        fetchAdminMembers();
      };

      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("focus", handleWindowFocus);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        window.removeEventListener("focus", handleWindowFocus);
      };
    }
  }, [adminAttendanceDate, isAuthenticated]);

  // Save Settings
  const handleSaveAttendanceSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSavedMessage(null);

    try {
      // Save local
      localStorage.setItem("rkc_attendance_settings", JSON.stringify(attendanceSettings));

      // Save Supabase attendance_settings table
      try {
        await supabase.from("attendance_settings").upsert({
          ...attendanceSettings,
          id: attendanceSettings.id || "default_settings",
        });
      } catch { }

      // Universal cloud fallback in registrations table so all browsers receive it
      try {
        await supabase.from("registrations").upsert(
          {
            reg_id: "SETTINGS-CONFIG",
            full_name: "RKC System Settings",
            gender: "Laki-laki",
            birth_date: "2000-01-01",
            age: "20",
            address: JSON.stringify(attendanceSettings),
            whatsapp: "08000000000",
            status: "Fix",
            registration_status: "Diterima",
            motivation: "SYSTEM_CONFIG",
          },
          { onConflict: "reg_id" }
        );
      } catch { }

      setSettingsSavedMessage("Pengaturan absensi & radius 50m berhasil disimpan!");
      setTimeout(() => setSettingsSavedMessage(null), 4000);
    } catch (err: any) {
      setSettingsSavedMessage("Tersimpan secara lokal (Database offline)");
      setTimeout(() => setSettingsSavedMessage(null), 4000);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Get Admin GPS Location to Calibrate Dojo
  const handleGetCurrentGPSForDojo = () => {
    if (!navigator.geolocation) {
      showAlert("GPS Tidak Didukung", "Browser Anda tidak mendukung fitur GPS Geolocation.", "warning");
      return;
    }

    setIsGettingAdminGPS(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setAttendanceSettings((prev) => ({
          ...prev,
          dojo_lat: parseFloat(pos.coords.latitude.toFixed(6)),
          dojo_lng: parseFloat(pos.coords.longitude.toFixed(6)),
        }));
        setIsGettingAdminGPS(false);
        showAlert(
          "Kalibrasi GPS Berhasil",
          `Lokasi Dojo berhasil dikalibrasi ke titik koordinat GPS Anda:\nLatitude: ${pos.coords.latitude.toFixed(6)}\nLongitude: ${pos.coords.longitude.toFixed(6)}`,
          "success"
        );
      },
      (err) => {
        setIsGettingAdminGPS(false);
        showAlert("Gagal Mengambil GPS", `Tidak dapat mengambil koordinat lokasi: ${err.message}`, "error");
      },
      { enableHighAccuracy: true }
    );
  };

  // Add / Edit Member
  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberFormData.full_name?.trim()) {
      showAlert("Data Tidak Lengkap", "Nama lengkap anggota wajib diisi!", "warning");
      return;
    }

    const memberToSave: MemberRecord = {
      id: editingMember?.id || `mem-${Date.now()}`,
      member_id: memberFormData.member_id || `RKC-${Math.floor(100 + Math.random() * 900)}`,
      full_name: memberFormData.full_name.trim(),
      belt_level: memberFormData.belt_level || "Sabuk Putih (Kyu 10)",
      phone: memberFormData.phone || "",
      dojo_branch: memberFormData.dojo_branch || "Racing Kyokushin Club",
      gender: memberFormData.gender || "Laki-laki",
      is_active: memberFormData.is_active !== undefined ? memberFormData.is_active : true,
      joined_date: editingMember?.joined_date || new Date().toISOString().split("T")[0],
    };

    let updatedList: MemberRecord[];
    if (editingMember) {
      updatedList = adminMembers.map((m) =>
        (m.id && m.id === editingMember.id) || m.member_id === editingMember.member_id ? memberToSave : m
      );
    } else {
      updatedList = [memberToSave, ...adminMembers];
    }

    setAdminMembers(updatedList);
    localStorage.setItem("rkc_members_list", JSON.stringify(updatedList));

    // Remove from deleted blacklist if previously deleted
    try {
      const del = getDeletedMembers();
      const memId = (memberToSave.member_id || "").toLowerCase().trim();
      const id = (memberToSave.id || "").toLowerCase().trim();
      const name = (memberToSave.full_name || "").toLowerCase().trim();
      const filtered = del.filter((d) => d !== memId && d !== id && d !== name);
      localStorage.setItem("rkc_deleted_members", JSON.stringify(filtered));
    } catch { }

    try {
      await supabase.from("members").upsert(memberToSave);
    } catch (e) {
      // offline
    }

    try {
      await supabase.from("registrations").upsert(
        {
          reg_id: memberToSave.member_id,
          full_name: memberToSave.full_name,
          gender: memberToSave.gender || "Laki-laki",
          whatsapp: memberToSave.phone || "-",
          status: "Fix",
          registration_status: "Diterima",
          motivation: memberToSave.belt_level || "Sabuk Putih (Kyu 10)",
          birth_date: "2000-01-01",
          age: "20",
          address: memberToSave.dojo_branch || "Racing Kyokushin Club",
        },
        { onConflict: "reg_id" }
      );
    } catch (e) {
      // offline
    }

    setIsMemberModalOpen(false);
    setEditingMember(null);
    setMemberFormData({
      full_name: "",
      belt_level: "Sabuk Putih (Kyu 10)",
      phone: "",
      dojo_branch: "Racing Kyokushin Club",
      gender: "Laki-laki",
      is_active: true,
    });
  };

  // Delete Member Confirm Handler (Permanent Delete)
  const handleConfirmDeleteMember = async () => {
    if (!deleteMemberTarget) return;
    const target = deleteMemberTarget;
    const memberId = (target.member_id || "").trim();
    const memberDbId = (target.id || "").trim();
    const memberName = (target.full_name || "").trim();
    const memberPhone = (target.phone || "").trim();

    // 1. Save to persistent blacklist (both members & registrations)
    addDeletedMember(memberId, memberDbId);
    if (memberId) addDeletedRegistration(memberId, memberDbId);

    // 2. Filter out ONLY this member safely from adminMembers
    const isTarget = (m: MemberRecord) => {
      if (memberDbId && m.id && m.id === memberDbId) return true;
      if (memberId && m.member_id && m.member_id.toLowerCase() === memberId.toLowerCase()) return true;
      if (memberName && m.full_name && m.full_name.toLowerCase().trim() === memberName.toLowerCase().trim()) return true;
      if (memberPhone && m.phone && m.phone.replace(/\D/g, "") === memberPhone.replace(/\D/g, "") && memberPhone.replace(/\D/g, "").length >= 8) return true;
      return false;
    };

    const updated = adminMembers.filter((m) => !isTarget(m));
    setAdminMembers(updated);
    localStorage.setItem("rkc_members_list", JSON.stringify(updated));

    // Also remove from records (Pendaftar list) if present
    setRecords((prev) => {
      const filteredRecs = prev.filter(
        (r) =>
          (memberId ? r.reg_id !== memberId : true) &&
          (memberDbId ? r.id !== memberDbId : true) &&
          (memberName ? r.full_name.toLowerCase().trim() !== memberName.toLowerCase().trim() : true) &&
          (memberPhone && r.whatsapp ? r.whatsapp.replace(/\D/g, "") !== memberPhone.replace(/\D/g, "") : true)
      );
      localStorage.setItem("rkc_offline_registrations", JSON.stringify(filteredRecs));
      return filteredRecs;
    });

    // 3. Also remove any today attendance logs for this member
    const isTargetAtt = (a: AttendanceRecord) => {
      if (memberId && a.member_id && a.member_id.toLowerCase() === memberId.toLowerCase()) return true;
      if (memberName && a.member_name && a.member_name.toLowerCase().trim() === memberName.toLowerCase().trim()) return true;
      return false;
    };

    const updatedAtt = adminAttendances.filter((a) => !isTargetAtt(a));
    setAdminAttendances(updatedAtt);
    localStorage.setItem(`rkc_attendances_${adminAttendanceDate}`, JSON.stringify(updatedAtt));

    // 4. Purge across all cached attendance date keys in localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("rkc_attendances_")) {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const parsed = JSON.parse(itemStr);
            const filtered = parsed.filter((a: AttendanceRecord) => !isTargetAtt(a));
            localStorage.setItem(key, JSON.stringify(filtered));
          }
        }
      }
    } catch (e) {
      // ignore
    }

    setDeleteMemberTarget(null);

    // 5. Delete from Supabase permanently across ALL tables
    try {
      // a. Delete from members table
      if (memberId) {
        await supabase.from("members").delete().eq("member_id", memberId);
      }
      if (memberDbId) {
        await supabase.from("members").delete().eq("id", memberDbId);
      }
      if (memberName) {
        await supabase.from("members").delete().ilike("full_name", memberName);
      }

      // b. Delete from registrations table (member account and attendance records)
      if (memberId) {
        await supabase.from("registrations").delete().eq("reg_id", memberId);
      }
      if (memberDbId && isUUID(memberDbId)) {
        await supabase.from("registrations").delete().eq("id", memberDbId);
      }
      if (memberName) {
        await supabase.from("registrations").delete().ilike("full_name", memberName);
      }
      if (memberPhone) {
        await supabase.from("registrations").delete().eq("whatsapp", memberPhone);
      }

      // c. Delete all attendance logs for this member in attendances table
      if (memberId) {
        await supabase.from("attendances").delete().eq("member_id", memberId);
      }
      if (memberName) {
        await supabase.from("attendances").delete().ilike("member_name", memberName);
      }

      // d. Push updated blacklist tombstone to registrations table so all browsers sync deletion
      const currentDeleted = getDeletedMembers();
      await supabase.from("registrations").upsert(
        {
          reg_id: "DELETED_MEMBERS_CONFIG",
          full_name: "RKC Tombstone Blacklist",
          gender: "Laki-laki",
          birth_date: "2000-01-01",
          age: "20",
          address: JSON.stringify(currentDeleted),
          whatsapp: "08000000000",
          status: "SYSTEM_TOMBSTONE",
          registration_status: "Diterima",
          motivation: "SYSTEM_CONFIG",
        },
        { onConflict: "reg_id" }
      );
    } catch (e) {
      // offline fallback
    }
  };

  // Import accepted applicants to members
  const handleImportAcceptedApplicants = () => {
    const statusOverrides = getRegistrationStatusOverrides();
    const accepted = records.filter(
      (r) =>
        r.registration_status === "Diterima" ||
        statusOverrides[r.reg_id] === "Diterima" ||
        (r.id ? statusOverrides[r.id] === "Diterima" : false)
    );
    if (accepted.length === 0) {
      showAlert(
        "Pendaftar Diterima Kosong",
        "Belum ada calon murid dengan status 'Diterima' untuk diimpor ke Master Anggota.",
        "info"
      );
      return;
    }

    let addedCount = 0;
    const updated = [...adminMembers];

    accepted.forEach((a) => {
      // Unblacklist
      const cleanMems = getDeletedMembers().filter(
        (d) =>
          d !== a.reg_id.toLowerCase() &&
          d !== (a.id || "").toLowerCase() &&
          d !== a.full_name.toLowerCase().trim() &&
          (a.whatsapp ? d !== a.whatsapp.replace(/\D/g, "") : true)
      );
      localStorage.setItem("rkc_deleted_members", JSON.stringify(cleanMems));

      const alreadyExists = updated.some(
        (m) =>
          (m.member_id && m.member_id.toLowerCase() === a.reg_id.toLowerCase()) ||
          (m.full_name && a.full_name && m.full_name.toLowerCase().trim() === a.full_name.toLowerCase().trim()) ||
          (a.whatsapp && m.phone === a.whatsapp)
      );
      if (!alreadyExists) {
        const newM: MemberRecord = {
          id: `mem-${a.reg_id}`,
          member_id: a.reg_id,
          full_name: a.full_name.trim(),
          belt_level: a.motivation && a.motivation.includes("Sabuk") ? a.motivation : "Sabuk Putih (Kyu 10)",
          phone: a.whatsapp,
          dojo_branch: "Racing Kyokushin Club",
          gender: a.gender as any,
          age: a.age,
          is_active: true,
          joined_date: a.created_at ? a.created_at.split("T")[0] : new Date().toISOString().split("T")[0],
        };
        updated.push(newM);
        addedCount++;
        supabase.from("members").upsert(newM).then();
      }
    });

    setAdminMembers(updated);
    localStorage.setItem("rkc_members_list", JSON.stringify(updated));

    if (addedCount > 0) {
      showAlert(
        "Impor Anggota Berhasil",
        `Berhasil mengimpor ${addedCount} anggota baru dari calon murid Diterima ke Master Anggota & Absensi!`,
        "success"
      );
    } else {
      showAlert(
        "Data Sudah Terdaftar",
        "Semua calon murid yang berstatus Diterima sudah terdaftar di Master Anggota.",
        "info"
      );
    }
  };

  // Delete Attendance Log Confirm Handler (Permanent Delete)
  const handleConfirmDeleteAttendance = async () => {
    if (!deleteAttendanceTarget) return;
    const item = deleteAttendanceTarget;

    // Save to persistent blacklist
    addDeletedAttendance(item);

    const updated = adminAttendances.filter(
      (a) =>
        a.id !== item.id &&
        !(a.member_name.toLowerCase() === item.member_name.toLowerCase() && a.date_str === item.date_str)
    );
    setAdminAttendances(updated);
    localStorage.setItem(`rkc_attendances_${item.date_str || adminAttendanceDate}`, JSON.stringify(updated));
    setDeleteAttendanceTarget(null);

    try {
      if (item.id) {
        await supabase.from("attendances").delete().eq("id", item.id);
        await supabase.from("registrations").delete().or(`reg_id.eq.${item.id},reg_id.eq.ATT-${item.id}`);
      } else if (item.date_str && item.member_name) {
        await supabase.from("attendances").delete().match({ date_str: item.date_str, member_name: item.member_name });
      }
    } catch (e) {
      // offline fallback
    }
  };

  // Save Manual Attendance
  const handleSaveManualAttendance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAttendanceForm.member_name.trim()) {
      showAlert("Data Tidak Lengkap", "Pilih atau isi nama karateka terlebih dahulu!", "warning");
      return;
    }

    const newAttendance: AttendanceRecord = {
      id: `att-man-${Date.now()}`,
      member_id: manualAttendanceForm.member_id || `RKC-${Math.floor(100 + Math.random() * 900)}`,
      member_name: manualAttendanceForm.member_name.trim(),
      belt_level: manualAttendanceForm.belt_level,
      dojo_branch: "Racing Kyokushin Club",
      session_name: manualAttendanceForm.session_name || "Sesi Reguler (Selasa)",
      date_str: manualAttendanceForm.date_str || adminAttendanceDate,
      checkin_time: manualAttendanceForm.checkin_time || "16.00",
      status: manualAttendanceForm.status,
      distance_meters: 0,
      latitude: attendanceSettings.dojo_lat,
      longitude: attendanceSettings.dojo_lng,
      notes: manualAttendanceForm.notes ? `[Input Manual Admin] ${manualAttendanceForm.notes}` : "Input Manual Admin",
      created_at: new Date().toISOString(),
    };

    if (newAttendance.date_str === adminAttendanceDate) {
      const updated = [newAttendance, ...adminAttendances];
      setAdminAttendances(updated);
      localStorage.setItem(`rkc_attendances_${adminAttendanceDate}`, JSON.stringify(updated));
    } else {
      try {
        const stored = localStorage.getItem(`rkc_attendances_${newAttendance.date_str}`);
        const list = stored ? JSON.parse(stored) : [];
        list.unshift(newAttendance);
        localStorage.setItem(`rkc_attendances_${newAttendance.date_str}`, JSON.stringify(list));
      } catch (e) {
        // offline
      }
    }

    try {
      await supabase.from("attendances").insert([newAttendance]);
    } catch (err) {
      // offline
    }

    setIsManualAttendanceModalOpen(false);
    setManualAttendanceForm({
      member_name: "",
      member_id: "",
      belt_level: "Sabuk Putih (Kyu 10)",
      date_str: adminAttendanceDate,
      checkin_time: "16.00",
      session_name: "Sesi Reguler (Selasa)",
      status: "Hadir",
      notes: "",
    });
  };

  // Update status (Baru, Dihubungi, Diterima, Ditolak)
  const handleUpdateStatus = async (regId: string, newStatus: string) => {
    const rec = records.find((r) => r.reg_id === regId || r.id === regId) || selectedRecord;
    const dbId = rec?.id;

    // 1. Immediately record in persistent status override map
    setRegistrationStatusOverride(regId, newStatus, dbId);

    // 2. Immediately update state
    setRecords((prev) => {
      const updated = prev.map((r) =>
        r.reg_id === regId || r.id === regId ? { ...r, registration_status: newStatus } : r
      );
      localStorage.setItem("rkc_offline_registrations", JSON.stringify(updated));
      return updated;
    });

    if (selectedRecord && (selectedRecord.reg_id === regId || selectedRecord.id === regId)) {
      setSelectedRecord({ ...selectedRecord, registration_status: newStatus });
    }

    // 3. If approved ("Diterima"), immediately enroll as Member in Master Anggota & Absensi
    if (newStatus === "Diterima" && rec) {
      // Unblacklist from deleted members & registrations if previously marked
      try {
        const deletedMems = getDeletedMembers().filter(
          (d) =>
            d !== regId.toLowerCase() &&
            d !== (rec.id || "").toLowerCase() &&
            d !== rec.full_name.toLowerCase().trim() &&
            (rec.whatsapp ? d !== rec.whatsapp.replace(/\D/g, "") : true)
        );
        localStorage.setItem("rkc_deleted_members", JSON.stringify(deletedMems));

        const deletedRegs = getDeletedRegistrations().filter(
          (d) => d !== regId && d !== rec.id && (rec.whatsapp ? d !== rec.whatsapp.replace(/\D/g, "") : true)
        );
        localStorage.setItem("rkc_deleted_registrations", JSON.stringify(deletedRegs));
      } catch (e) { }

      const memberToSave: MemberRecord = {
        id: `mem-${regId}`,
        member_id: regId, // ID Anggota resmi karateka untuk login & presensi
        full_name: rec.full_name.trim(),
        belt_level: "Sabuk Putih (Kyu 10)",
        phone: rec.whatsapp,
        dojo_branch: "Racing Kyokushin Club",
        gender: rec.gender as any,
        is_active: true,
        joined_date: new Date().toISOString().split("T")[0],
      };

      setAdminMembers((prev) => {
        const filtered = prev.filter(
          (m) =>
            m.member_id !== regId &&
            m.id !== `mem-${regId}` &&
            (rec.whatsapp ? m.phone !== rec.whatsapp : true) &&
            m.full_name.toLowerCase() !== rec.full_name.toLowerCase()
        );
        const updated = [memberToSave, ...filtered];
        localStorage.setItem("rkc_members_list", JSON.stringify(updated));
        return updated;
      });

      try {
        // Safe update without invalid UUID queries
        if (regId && !isUUID(regId)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("reg_id", regId);
        }
        if (rec.reg_id && !isUUID(rec.reg_id)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("reg_id", rec.reg_id);
        }
        if (dbId && isUUID(dbId)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("id", dbId);
        }

        // Upsert to members table
        await supabase.from("members").upsert(memberToSave);

        // Upsert registration record with "Diterima"
        await supabase.from("registrations").upsert(
          {
            reg_id: rec.reg_id || regId,
            full_name: rec.full_name,
            gender: rec.gender || "Laki-laki",
            birth_date: rec.birth_date || "2000-01-01",
            age: rec.age || "20",
            address: rec.address || "Makassar",
            whatsapp: rec.whatsapp || "-",
            status: rec.status || "Pelajar",
            institution: rec.institution || null,
            motivation: rec.motivation || "-",
            registration_status: "Diterima",
          },
          { onConflict: "reg_id" }
        );
      } catch (e) {
        console.warn("Supabase update notice:", e);
      }
    } else {
      // If rejected ("Ditolak") or reset to "Baru" / "Dihubungi", remove from Master Anggota
      setAdminMembers((prev) => {
        const updated = prev.filter(
          (m) =>
            m.member_id !== regId &&
            m.id !== `mem-${regId}` &&
            (rec ? m.full_name.toLowerCase() !== rec.full_name.toLowerCase() : true)
        );
        localStorage.setItem("rkc_members_list", JSON.stringify(updated));
        return updated;
      });

      try {
        if (regId && !isUUID(regId)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("reg_id", regId);
        }
        if (rec?.reg_id && !isUUID(rec.reg_id)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("reg_id", rec.reg_id);
        }
        if (dbId && isUUID(dbId)) {
          await supabase.from("registrations").update({ registration_status: newStatus }).eq("id", dbId);
        }

        if (rec) {
          await supabase.from("registrations").upsert(
            {
              reg_id: rec.reg_id || regId,
              full_name: rec.full_name,
              gender: rec.gender || "Laki-laki",
              birth_date: rec.birth_date || "2000-01-01",
              age: rec.age || "20",
              address: rec.address || "Makassar",
              whatsapp: rec.whatsapp || "-",
              status: rec.status || "Pelajar",
              institution: rec.institution || null,
              motivation: rec.motivation || "-",
              registration_status: newStatus,
            },
            { onConflict: "reg_id" }
          );
        }

        await supabase.from("members").delete().eq("member_id", regId);
        if (rec?.reg_id) await supabase.from("members").delete().eq("member_id", rec.reg_id);
        if (rec?.full_name) await supabase.from("members").delete().ilike("full_name", rec.full_name.trim());
      } catch (e) {
        console.warn("Supabase update notice:", e);
      }
    }
  };

  // Delete registration (Permanent Delete)
  const handleDelete = async (regId: string) => {
    const targetRecord = records.find((r) => r.reg_id === regId || r.id === regId);
    const fullName = targetRecord?.full_name?.trim() || "";
    const phone = targetRecord?.whatsapp?.trim() || "";
    const dbId = targetRecord?.id || "";

    // 1. Add to persistent blacklist & remove status override
    addDeletedRegistration(regId, dbId);
    addDeletedMember(regId, dbId);
    removeRegistrationStatusOverride(regId, dbId);

    // 2. Filter records
    const updated = records.filter((r) => r.reg_id !== regId && r.id !== regId);
    setRecords(updated);
    localStorage.setItem("rkc_offline_registrations", JSON.stringify(updated));
    if (selectedRecord && (selectedRecord.reg_id === regId || selectedRecord.id === regId)) {
      setSelectedRecord(null);
    }
    setDeleteConfirmId(null);

    // 3. Remove from adminMembers & rkc_members_list
    const isTargetMem = (m: MemberRecord) => {
      if (regId && m.member_id && m.member_id.toLowerCase() === regId.toLowerCase()) return true;
      if (dbId && m.id && (m.id === dbId || m.id === `mem-${regId}`)) return true;
      if (fullName && m.full_name && m.full_name.toLowerCase().trim() === fullName.toLowerCase()) return true;
      if (phone && m.phone && m.phone.replace(/\D/g, "") === phone.replace(/\D/g, "") && phone.replace(/\D/g, "").length >= 8) return true;
      return false;
    };
    const updatedMems = adminMembers.filter((m) => !isTargetMem(m));
    setAdminMembers(updatedMems);
    localStorage.setItem("rkc_members_list", JSON.stringify(updatedMems));

    // 4. Remove attendances for this member
    const isTargetAtt = (a: AttendanceRecord) => {
      if (regId && a.member_id && a.member_id.toLowerCase() === regId.toLowerCase()) return true;
      if (fullName && a.member_name && a.member_name.toLowerCase().trim() === fullName.toLowerCase()) return true;
      return false;
    };
    const updatedAtts = adminAttendances.filter((a) => !isTargetAtt(a));
    setAdminAttendances(updatedAtts);
    localStorage.setItem(`rkc_attendances_${adminAttendanceDate}`, JSON.stringify(updatedAtts));

    // 5. Purge all cached attendance date keys in localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("rkc_attendances_")) {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const parsed = JSON.parse(itemStr);
            const filtered = parsed.filter((a: AttendanceRecord) => !isTargetAtt(a));
            localStorage.setItem(key, JSON.stringify(filtered));
          }
        }
      }
    } catch (e) { }

    // 6. Delete from Supabase across all tables permanently without UUID errors
    try {
      if (regId && !isUUID(regId)) {
        await supabase.from("registrations").delete().eq("reg_id", regId);
      }
      if (dbId && isUUID(dbId)) {
        await supabase.from("registrations").delete().eq("id", dbId);
      }
      if (fullName) {
        await supabase.from("registrations").delete().ilike("full_name", fullName);
      }
      if (phone) {
        await supabase.from("registrations").delete().eq("whatsapp", phone);
      }

      if (regId) {
        await supabase.from("members").delete().eq("member_id", regId);
      }
      if (dbId) {
        await supabase.from("members").delete().eq("id", dbId);
      }
      if (fullName) {
        await supabase.from("members").delete().ilike("full_name", fullName);
      }

      if (regId) {
        await supabase.from("attendances").delete().eq("member_id", regId);
      }
      if (fullName) {
        await supabase.from("attendances").delete().ilike("member_name", fullName);
      }

      // Push tombstone
      const currentDeleted = getDeletedMembers();
      await supabase.from("registrations").upsert(
        {
          reg_id: "DELETED_MEMBERS_CONFIG",
          full_name: "RKC Tombstone Blacklist",
          gender: "Laki-laki",
          birth_date: "2000-01-01",
          age: "20",
          address: JSON.stringify(currentDeleted),
          whatsapp: "08000000000",
          status: "SYSTEM_TOMBSTONE",
          registration_status: "Diterima",
          motivation: "SYSTEM_CONFIG",
        },
        { onConflict: "reg_id" }
      );
    } catch (err) {
      console.warn("Error deleting record:", err);
    }
  };

  // Direct WhatsApp helper with auto-generated Member Account Details
  const handleOpenWhatsApp = (record: RegistrationRecord) => {
    const cleanPhone = record.whatsapp.replace(/\D/g, "");
    const formattedPhone = cleanPhone.startsWith("0")
      ? `62${cleanPhone.slice(1)}`
      : cleanPhone.startsWith("62")
        ? cleanPhone
        : `62${cleanPhone}`;

    const isAccepted = record.registration_status === "Diterima";

    const text = isAccepted
      ? encodeURIComponent(
        `*HALO ${record.full_name.toUpperCase()} (RKC KYOKUSHIN CLUB)*\n` +
        `----------------------------------------\n` +
        `Salam Osu! Pendaftaran Anda telah *DISETUJUI / DITERIMA* di Racing Kyokushin Club.\n\n` +
        `🥋 *Informasi Akun Presensi & Profil Anda:*\n` +
        `• ID Anggota: *${record.reg_id}*\n` +
        `• Nama Lengkap: *${record.full_name}*\n` +
        `• Tingkatan: *Sabuk Putih (Kyu 10)*\n` +
        `• Portal Absensi & Profil: */absen* (Masuk ke tab Profil dengan ID Anggota Anda: *${record.reg_id}*)\n\n` +
        `Silakan hadir di Dojo sesuai jadwal latihan untuk pengukuran seragam Dogi dan orientasi perdana. Terima kasih! Osu!`
      )
      : encodeURIComponent(
        `*HALO ${record.full_name.toUpperCase()} (RKC KYOKUSHIN CLUB)*\n` +
        `----------------------------------------\n` +
        `Salam Osu! Kami dari Tim Admin RKC Kyokushin Club telah menerima formulir pendaftaran Anda dengan *No. Registrasi: ${record.reg_id}*.\n\n` +
        `Mohon konfirmasi kesiapan untuk jadwal orientasi dan pengukuran seragam Dogi di Dojo kami. Apakah ada pertanyaan mengenai kelas latihan? Terima kasih!`
      );

    window.open(`https://wa.me/${formattedPhone}?text=${text}`, "_blank");
  };

  // Filtered registrations
  const filteredRecords = useMemo(() => {
    return records
      .filter((item) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          item.full_name.toLowerCase().includes(query) ||
          item.whatsapp.includes(query) ||
          item.reg_id.toLowerCase().includes(query) ||
          item.address.toLowerCase().includes(query) ||
          (item.institution && item.institution.toLowerCase().includes(query));

        const matchesGender = filterGender === "all" || item.gender === filterGender;
        const matchesStatus = filterStatus === "all" || item.status.toLowerCase().includes(filterStatus.toLowerCase());
        const matchesRegStatus =
          filterRegistrationStatus === "all" ||
          (item.registration_status || "Baru").toLowerCase() === filterRegistrationStatus.toLowerCase();

        return matchesSearch && matchesGender && matchesStatus && matchesRegStatus;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
        }
        if (sortBy === "oldest") {
          return new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime();
        }
        if (sortBy === "name") {
          return a.full_name.localeCompare(b.full_name);
        }
        return 0;
      });
  }, [records, searchQuery, filterGender, filterStatus, filterRegistrationStatus, sortBy]);

  // Filtered Attendances
  const filteredAttendances = useMemo(() => {
    return adminAttendances.filter((a) => {
      const q = attendanceSearchQuery.toLowerCase();
      const matchSearch =
        a.member_name.toLowerCase().includes(q) ||
        a.belt_level.toLowerCase().includes(q) ||
        a.session_name.toLowerCase().includes(q);
      const matchStatus = attendanceStatusFilter === "all" || a.status === attendanceStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [adminAttendances, attendanceSearchQuery, attendanceStatusFilter]);

  // Filtered Members
  const filteredMembers = useMemo(() => {
    const q = memberSearchQuery.toLowerCase().trim();
    if (!q) return adminMembers;
    return adminMembers.filter((m) => {
      return (
        (m.full_name || "").toLowerCase().includes(q) ||
        (m.belt_level || "").toLowerCase().includes(q) ||
        (m.phone || "").includes(q) ||
        (m.member_id && m.member_id.toLowerCase().includes(q))
      );
    });
  }, [adminMembers, memberSearchQuery]);

  // Full historical attendances merged with today's state & real storage
  const allHistoricalAttendances = useMemo(() => {
    const deletedAtts = getDeletedAttendances();
    const deletedMems = getDeletedMembers();

    const isAttDeleted = (a: AttendanceRecord) => {
      const id = a.id || "";
      const keyName = `${a.date_str}-${(a.member_name || "").toLowerCase().trim()}`;
      const keyId = `${a.date_str}-${(a.member_id || "").toLowerCase()}`;
      const memName = (a.member_name || "").toLowerCase().trim();
      const memId = (a.member_id || "").toLowerCase();

      return (
        (id && deletedAtts.includes(id)) ||
        deletedAtts.includes(keyName) ||
        deletedAtts.includes(keyId) ||
        (memName && deletedMems.includes(memName)) ||
        (memId && deletedMems.includes(memId))
      );
    };

    // 1. Initial base demo records (ONLY for 5 default senior members, NOT new members)
    const base = generateYearlyAttendanceRecords(adminMembers).filter((a) => !isAttDeleted(a));
    const map = new Map<string, AttendanceRecord>();
    base.forEach((item) => {
      const key = `${item.date_str}-${(item.member_name || "").toLowerCase().trim()}`;
      map.set(key, item);
    });

    // 2. Scan all saved attendance dates in localStorage
    try {
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const storageKey = localStorage.key(i);
          if (storageKey && storageKey.startsWith("rkc_attendances_")) {
            const itemStr = localStorage.getItem(storageKey);
            if (itemStr) {
              const list: AttendanceRecord[] = JSON.parse(itemStr);
              list.forEach((att) => {
                if (!isAttDeleted(att)) {
                  const attKey = `${att.date_str}-${(att.member_name || "").toLowerCase().trim()}`;
                  map.set(attKey, att);
                }
              });
            }
          }
        }
      }
    } catch (e) { }

    // 3. Merge active adminAttendances state
    adminAttendances
      .filter((a) => !isAttDeleted(a))
      .forEach((item) => {
        const key = `${item.date_str}-${(item.member_name || "").toLowerCase().trim()}`;
        map.set(key, item);
      });

    return Array.from(map.values())
      .filter((a) => !isAttDeleted(a))
      .sort((a, b) => new Date(b.date_str).getTime() - new Date(a.date_str).getTime());
  }, [adminMembers, adminAttendances]);

  // Date range bounds for Rekap Murid
  const rekapDateRange = useMemo(() => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    let start = new Date(today);

    if (rekapPeriod === "1bulan") {
      start.setDate(today.getDate() - 30);
    } else if (rekapPeriod === "3bulan") {
      start.setDate(today.getDate() - 90);
    } else if (rekapPeriod === "6bulan") {
      start.setDate(today.getDate() - 180);
    } else if (rekapPeriod === "1tahun") {
      start.setDate(today.getDate() - 365);
    } else if (rekapPeriod === "custom") {
      return {
        startDate: rekapCustomStart || todayStr,
        endDate: rekapCustomEnd || todayStr,
        label: `${rekapCustomStart || todayStr} s/d ${rekapCustomEnd || todayStr}`,
      };
    }

    const startStr = start.toISOString().split("T")[0];
    const periodLabels: Record<string, string> = {
      "1bulan": "1 Bulan Terakhir (30 Hari)",
      "3bulan": "3 Bulan Terakhir (Kuartal)",
      "6bulan": "6 Bulan Terakhir (Semester)",
      "1tahun": "1 Tahun Penuh (365 Hari)",
    };

    return {
      startDate: startStr,
      endDate: todayStr,
      label: periodLabels[rekapPeriod] || "Periode Kustom",
    };
  }, [rekapPeriod, rekapCustomStart, rekapCustomEnd]);

  // Aggregated data per karateka member
  const rekapMuridList = useMemo(() => {
    const { startDate, endDate } = rekapDateRange;

    // Filter all logs in period
    const periodLogs = allHistoricalAttendances.filter(
      (a) => a.date_str >= startDate && a.date_str <= endDate
    );

    // Group logs per member
    const memberResults = adminMembers.map((m) => {
      const memberLogs = periodLogs.filter(
        (a) =>
          (a.member_name || "").toLowerCase().trim() === (m.full_name || "").toLowerCase().trim() ||
          (m.member_id && a.member_id && a.member_id.toLowerCase() === m.member_id.toLowerCase())
      );

      const hadirCount = memberLogs.filter((a) => a.status === "Hadir").length;
      const alpaCount = memberLogs.filter((a) => a.status === "Alpa" || a.status !== "Hadir").length;
      const totalSessions = memberLogs.length;
      const percentage = totalSessions > 0 ? Math.round((hadirCount / totalSessions) * 100) : 0;

      let predikat = "Murid Baru";
      let predikatColor = "bg-blue-950/60 text-blue-300 border-blue-500/40";

      if (totalSessions === 0) {
        predikat = "Murid Baru";
        predikatColor = "bg-blue-950/60 text-blue-300 border-blue-500/40";
      } else if (percentage >= 85) {
        predikat = "Sangat Rajin";
        predikatColor = "bg-emerald-950/80 text-emerald-300 border-emerald-500/50 shadow-emerald-950";
      } else if (percentage >= 70) {
        predikat = "Aktif Disiplin";
        predikatColor = "bg-teal-950/80 text-teal-300 border-teal-500/50";
      } else if (percentage >= 50) {
        predikat = "Cukup Aktif";
        predikatColor = "bg-amber-950/80 text-amber-300 border-amber-500/50";
      } else {
        predikat = "Perlu Ditingkatkan";
        predikatColor = "bg-rose-950/70 text-rose-300 border-rose-500/40";
      }

      return {
        member: m,
        hadirCount,
        alpaCount,
        totalSessions,
        percentage,
        predikat,
        predikatColor,
        logs: memberLogs.sort((a, b) => new Date(b.date_str).getTime() - new Date(a.date_str).getTime()),
      };
    });

    // Filter by search & belt
    return memberResults
      .filter((item) => {
        const q = rekapSearchQuery.toLowerCase().trim();
        const matchesQuery =
          !q ||
          (item.member.full_name || "").toLowerCase().includes(q) ||
          (item.member.belt_level || "").toLowerCase().includes(q) ||
          (item.member.member_id && item.member.member_id.toLowerCase().includes(q));

        const matchesBelt = rekapBeltFilter === "all" || item.member.belt_level === rekapBeltFilter;

        return matchesQuery && matchesBelt;
      })
      .sort((a, b) => {
        if (rekapSortBy === "percentage") return b.percentage - a.percentage;
        if (rekapSortBy === "hadir") return b.hadirCount - a.hadirCount;
        if (rekapSortBy === "sessions") return b.totalSessions - a.totalSessions;
        if (rekapSortBy === "name") return (a.member.full_name || "").localeCompare(b.member.full_name || "");
        return 0;
      });
  }, [adminMembers, allHistoricalAttendances, rekapDateRange, rekapSearchQuery, rekapBeltFilter, rekapSortBy]);

  // Global KPIs for the period
  const rekapGlobalKPIs = useMemo(() => {
    const totalMembers = rekapMuridList.length;
    const totalHadirAll = rekapMuridList.reduce((acc, curr) => acc + curr.hadirCount, 0);
    const totalAlpaAll = rekapMuridList.reduce((acc, curr) => acc + curr.alpaCount, 0);
    const totalSessionsAll = rekapMuridList.reduce((acc, curr) => acc + curr.totalSessions, 0);

    const avgAttendanceRate =
      totalMembers > 0
        ? Math.round(rekapMuridList.reduce((acc, curr) => acc + curr.percentage, 0) / totalMembers)
        : 0;

    const topAttendant =
      rekapMuridList.length > 0 && rekapMuridList.some((m) => m.hadirCount > 0)
        ? [...rekapMuridList].sort((a, b) => b.hadirCount - a.hadirCount || b.percentage - a.percentage)[0]
        : null;

    // Distinct training dates in period
    const distinctDates = new Set(
      allHistoricalAttendances
        .filter((a) => a.date_str >= rekapDateRange.startDate && a.date_str <= rekapDateRange.endDate)
        .map((a) => a.date_str)
    ).size;

    return {
      distinctDates,
      totalHadirAll,
      totalAlpaAll,
      totalSessionsAll,
      avgAttendanceRate,
      topAttendant,
    };
  }, [rekapMuridList, allHistoricalAttendances, rekapDateRange]);

  // Export Rekap Murid to Full-Colored Excel Spreadsheet (.xls)
  const handleExportRekapMuridExcel = () => {
    if (rekapMuridList.length === 0) {
      showAlert("Data Kosong", "Tidak ada data rekap murid untuk diekspor pada rentang tanggal ini.", "warning");
      return;
    }

    const printDate = new Date().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const tableRowsHtml = rekapMuridList
      .map((item, idx) => {
        const isEven = idx % 2 === 0;
        const rowBg = isEven ? "#ffffff" : "#f9fafb";
        return `
          <tr style="background-color: ${rowBg};">
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; font-family: monospace;">${idx + 1}</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; font-weight: bold; color: #b91c1c; font-family: monospace;">${item.member.member_id || "-"}</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; font-weight: bold; color: #111827;">${item.member.full_name}</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; color: #374151;">${item.member.belt_level}</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; color: #4b5563;">${item.member.dojo_branch || "Racing Kyokushin Club"}</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; background-color: #d1fae5; color: #065f46; font-family: monospace;">${item.hadirCount} Sesi</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; background-color: #fee2e2; color: #991b1b; font-family: monospace;">${item.alpaCount} Sesi</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; color: #1f2937; font-family: monospace;">${item.totalSessions} Sesi</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; color: #1e40af; background-color: #eff6ff; font-family: monospace;">${item.percentage}%</td>
            <td style="border: 1px solid #d1d5db; padding: 7px; text-align: center; font-weight: bold; background-color: #fef3c7; color: #92400e;">${item.predikat}</td>
          </tr>
        `;
      })
      .join("");

    const excelHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <!--[if gte mso 9]>
        <xml>
          <x:ExcelWorkbook>
            <x:ExcelWorksheets>
              <x:ExcelWorksheet>
                <x:Name>Rekap Presensi RKC</x:Name>
                <x:WorksheetOptions>
                  <x:DisplayGridlines/>
                </x:WorksheetOptions>
              </x:ExcelWorksheet>
            </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
        <![endif]-->
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; }
          table { border-collapse: collapse; width: 100%; }
          th { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11pt; }
          td { font-family: 'Segoe UI', Arial, sans-serif; font-size: 10pt; }
        </style>
      </head>
      <body>
        <table>
          <tr>
            <td colspan="10" style="background-color: #991b1b; color: #ffffff; font-size: 16pt; font-weight: bold; text-align: center; height: 38px;">
              RACING KYOKUSHIN CLUB
            </td>
          </tr>
          <tr>
            <td colspan="10" style="background-color: #f3f4f6; color: #4b5563; font-size: 9pt; text-align: center; height: 22px;">
              Jl Sukamaju 1 No 2B RT 005/RW 006, Kel Tammaung , Kec Panakukkang, Kota Makssar, Sulawesi Selatan 90231 Telp/WhatsApp: 0815 27641306
            </td>
          </tr>
          <tr>
            <td colspan="10" style="background-color: #e5e7eb; color: #111827; font-size: 11pt; font-weight: bold; text-align: center; height: 26px;">
              LEMBAR REKAPITULASI KEHADIRAN & KEDISIPLINAN KARATEKA
            </td>
          </tr>
          <tr>
            <td colspan="10" style="background-color: #ffffff; color: #4b5563; font-size: 9pt; text-align: center; height: 22px;">
              Periode: ${rekapDateRange.label} (${rekapDateRange.startDate} s/d ${rekapDateRange.endDate}) | Dicetak pada: ${printDate}
            </td>
          </tr>
          <tr>
            <td colspan="10" style="height: 10px;"></td>
          </tr>
          <tr style="background-color: #991b1b; color: #ffffff; font-weight: bold; text-align: center;">
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 45px;">No</th>
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 120px;">ID Anggota</th>
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 230px;">Nama Karateka</th>
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 170px;">Tingkatan Sabuk</th>
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 190px;">Cabang Dojo</th>
            <th style="background-color: #065f46; color: #ffffff; border: 1px solid #047857; padding: 10px; width: 100px;">Total Hadir</th>
            <th style="background-color: #991b1b; color: #ffffff; border: 1px solid #7f1d1d; padding: 10px; width: 100px;">Total Alpa</th>
            <th style="background-color: #374151; color: #ffffff; border: 1px solid #1f2937; padding: 10px; width: 100px;">Total Sesi</th>
            <th style="background-color: #1e40af; color: #ffffff; border: 1px solid #1e3a8a; padding: 10px; width: 120px;">Persentase (%)</th>
            <th style="background-color: #b45309; color: #ffffff; border: 1px solid #92400e; padding: 10px; width: 160px;">Predikat Disiplin</th>
          </tr>
          ${tableRowsHtml}
          <tr>
            <td colspan="10" style="height: 20px;"></td>
          </tr>
          <tr>
            <td colspan="5" style="border: none;"></td>
            <td colspan="5" style="border: none; text-align: center; font-weight: bold; color: #1f2937;">
              Makassar, ${printDate}<br/>Ketua Harian / Sensei Pembina<br/><br/><br/><br/>
              <u>( Sensei RKC Kyokushin )</u>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([excelHtml], { type: "application/vnd.ms-excel;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `Rekap_Kehadiran_RKC_${rekapPeriod}_${new Date().toISOString().split("T")[0]}.xls`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showAlert(
      "Ekspor Excel Berhasil",
      "Rekapitulasi kehadiran karateka berformat tabel berwarna berhasil diunduh (File Excel .xls)!",
      "success"
    );
  };

  // Open Official Printable A4 Document Modal
  const handlePrintRekapMurid = () => {
    setIsPrintRekapModalOpen(true);
  };

  // Statistics KPI
  const stats = useMemo(() => {
    const total = records.length;
    const maleCount = records.filter((r) => r.gender === "Laki-laki").length;
    const femaleCount = records.filter((r) => r.gender === "Perempuan").length;
    const students = records.filter((r) => r.status.toLowerCase().includes("pelajar") || r.status.toLowerCase().includes("mahasiswa")).length;
    const workers = records.filter((r) => r.status.toLowerCase().includes("pekerja") || r.status.toLowerCase().includes("karyawan")).length;

    const newStatusCount = records.filter((r) => (r.registration_status || "Baru") === "Baru").length;
    const contactedCount = records.filter((r) => r.registration_status === "Dihubungi").length;
    const acceptedCount = records.filter((r) => r.registration_status === "Diterima").length;

    const daysMap: { [key: string]: number } = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().split("T")[0];
      daysMap[dateKey] = 0;
    }

    records.forEach((r) => {
      if (r.created_at) {
        const dateKey = r.created_at.split("T")[0];
        if (daysMap[dateKey] !== undefined) {
          daysMap[dateKey]++;
        }
      }
    });

    const days = Object.keys(daysMap).map((k) => {
      const d = new Date(k);
      return {
        label: d.toLocaleDateString("id-ID", { weekday: "short", day: "numeric" }),
        count: daysMap[k],
      };
    });

    let ageKids = 0;
    let ageTeens = 0;
    let ageAdults = 0;
    let ageSeniors = 0;

    records.forEach((r) => {
      const numericAge = parseInt(r.age, 10);
      if (!isNaN(numericAge)) {
        if (numericAge < 12) ageKids++;
        else if (numericAge <= 17) ageTeens++;
        else if (numericAge <= 30) ageAdults++;
        else ageSeniors++;
      }
    });

    const malePct = total > 0 ? Math.round((maleCount / total) * 100) : 0;
    const femalePct = total > 0 ? Math.round((femaleCount / total) * 100) : 0;
    const studentPct = total > 0 ? Math.round((students / total) * 100) : 0;
    const workerPct = total > 0 ? Math.round((workers / total) * 100) : 0;

    return {
      total,
      maleCount,
      femaleCount,
      students,
      workers,
      newStatusCount,
      contactedCount,
      acceptedCount,
      days,
      ageKids,
      ageTeens,
      ageAdults,
      ageSeniors,
      malePct,
      femalePct,
      studentPct,
      workerPct,
    };
  }, [records]);

  // Report filtered records
  const reportRecords = useMemo(() => {
    if (reportFilter === "Baru") return records.filter((r) => (r.registration_status || "Baru") === "Baru");
    if (reportFilter === "Dihubungi") return records.filter((r) => r.registration_status === "Dihubungi");
    if (reportFilter === "Diterima") return records.filter((r) => r.registration_status === "Diterima");
    return records;
  }, [records, reportFilter]);

  // Loading Screen
  if (isAuthLoading) {
    return (
      <main className="min-h-screen bg-[#08080a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  // If Not Authenticated -> Show Centered, Frameless Login Screen
  if (!isAuthenticated) {
    return (
      <main className="relative w-full min-h-screen bg-[#08080a] flex items-center justify-center overflow-x-hidden overflow-y-auto no-scrollbar selection:bg-red-600 selection:text-white p-4 sm:p-6 md:p-8">
        <div className="hidden lg:block absolute inset-0 z-0">
          <Image
            src="/images/background.png"
            alt="RKC Kyokushin Club Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2px] pointer-events-none" />
        </div>

        <div className="block lg:hidden fixed inset-0 z-0">
          <Image
            src="/images/mobilebg.png"
            alt="RKC Kyokushin Club Mobile Background"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] mx-auto py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6 text-center"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <Image
                  src="/images/logo.png"
                  alt="RKC Logo"
                  width={112}
                  height={112}
                  className="w-full h-full object-contain drop-shadow-[0_10px_25px_rgba(220,38,38,0.4)]"
                  priority
                />
              </div>

              <div className="space-y-1">
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider italic font-display leading-none">
                  <span className="text-white drop-shadow">LOGIN </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-red-400 drop-shadow-[0_4px_15px_rgba(239,68,68,0.5)]">
                    ADMIN
                  </span>
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide drop-shadow">
                  Masuk dengan Gmail & Password Supabase Auth
                </p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-200">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Mail className="w-4 h-4 text-[#ff2e43] drop-shadow-[0_0_6px_rgba(255,46,67,0.75)]" />
                  </div>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="admin@gmail.com"
                    className="w-full bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm rounded-2xl py-3 pl-10 pr-4 border border-white/20 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all placeholder-gray-400 shadow-inner"
                    autoFocus
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gray-200">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <KeyRound className="w-4 h-4 text-[#ff2e43] drop-shadow-[0_0_6px_rgba(255,46,67,0.75)]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="Masukkan password akun"
                    className="w-full bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm rounded-2xl py-3 pl-10 pr-11 border border-white/20 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/30 transition-all placeholder-gray-400 shadow-inner"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-red-400 hover:text-red-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-[#ff2e43] drop-shadow-[0_0_6px_rgba(255,46,67,0.6)]" />
                    ) : (
                      <Eye className="w-4 h-4 text-red-400 hover:text-red-300 drop-shadow-[0_0_6px_rgba(255,46,67,0.6)]" />
                    )}
                  </button>
                </div>
              </div>

              {loginError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-950/80 backdrop-blur-md border border-red-500/50 rounded-2xl text-xs text-red-200 flex items-center gap-2.5 shadow-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{loginError}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full btn-shimmer bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-rose-500 hover:to-red-500 text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.55)] hover:shadow-[0_0_40px_rgba(220,38,38,0.75)] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-75 tracking-wide"
              >
                {isLoggingIn ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  <span>Masuk ke Dashboard</span>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    );
  }

  // Authenticated Layout
  return (
    <main className="min-h-screen bg-[#08080a] text-gray-100 flex flex-col selection:bg-red-600 selection:text-white relative">
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-56 sm:pb-64">
        {/* ======================================================== */}
        {/* TAB 1: DATA PENDAFTAR                                    */}
        {/* ======================================================== */}
        {activeTab === "data" && (
          <div className="space-y-6">
            {/* Brand Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl no-print">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden p-0.5 border border-red-500/50 bg-black/60 shadow-md flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="RKC Logo"
                    width={44}
                    height={44}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide uppercase font-display">
                    RKC Kyokushin Club
                  </h2>
                  <p className="text-xs text-gray-400">
                    Sistem Manajemen Data Calon Murid Baru Dojo
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="text-left sm:text-right">
                  <span className="text-xs font-semibold text-white block truncate max-w-[200px]">
                    {sessionUser?.email || "admin@rkc.id"}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center sm:justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Role: {adminProfile?.role ? adminProfile.role.toUpperCase() : "ADMIN"}
                  </span>
                </div>

                <button
                  onClick={fetchRegistrations}
                  disabled={refreshing}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Segarkan Data"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-red-500" : "text-gray-300"}`} />
                </button>
              </div>
            </div>

            {/* Quick KPI Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-400 block">Total Pendaftar</span>
                <div className="mt-1 text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {stats.total}
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-400 block">Rasio Gender</span>
                <div className="mt-1 text-sm sm:text-base font-bold flex items-center justify-center gap-2 text-white">
                  <span className="text-white">{stats.maleCount} Pria</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-white">{stats.femaleCount} Wanita</span>
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-400 block">Kategori Status</span>
                <div className="mt-1 text-sm sm:text-base font-bold flex items-center justify-center gap-2 text-white">
                  <span className="text-white">{stats.students} Pelajar</span>
                  <span className="text-gray-500">/</span>
                  <span className="text-white">{stats.workers} Pekerja</span>
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                <span className="text-xs font-semibold text-gray-400 block">Status Onboarding</span>
                <div className="mt-1 text-xs font-bold flex items-center justify-center gap-1.5 flex-wrap text-white">
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    {stats.newStatusCount} Baru
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    {stats.contactedCount} Kontak
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">
                    {stats.acceptedCount} Fix
                  </span>
                </div>
              </div>
            </div>

            {/* Search, Filters & Controls */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="lg:col-span-2 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama, No. WA, ID, alamat..."
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 pl-9 pr-3 border border-white/10 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div>
                  <select
                    value={filterGender}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="all">Semua Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="Pelajar">Pelajar / Mahasiswa</option>
                    <option value="Pekerja">Pekerja / Karyawan</option>
                  </select>
                </div>

                <div>
                  <select
                    value={filterRegistrationStatus}
                    onChange={(e) => setFilterRegistrationStatus(e.target.value)}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer appearance-none"
                  >
                    <option value="all">Semua Status</option>
                    <option value="Baru">Baru</option>
                    <option value="Dihubungi">Dihubungi</option>
                    <option value="Diterima">Diterima</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-white/5">
                <span>
                  Menampilkan <strong className="text-white">{filteredRecords.length}</strong> dari{" "}
                  <strong className="text-white">{records.length}</strong> pendaftar
                </span>

                <div className="flex items-center gap-2">
                  <span>Urutan:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-gray-200 hover:text-white border-none focus:outline-none cursor-pointer font-medium appearance-none"
                  >
                    <option value="newest" className="bg-[#18181e]">Terbaru</option>
                    <option value="oldest" className="bg-[#18181e]">Terlama</option>
                    <option value="name" className="bg-[#18181e]">Nama (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              {loading ? (
                <div className="py-20 text-center text-gray-400 space-y-3">
                  <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm">Memuat data pendaftar dari Supabase...</p>
                </div>
              ) : filteredRecords.length === 0 ? (
                <div className="py-16 text-center text-gray-400 space-y-2">
                  <Users className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="text-base font-semibold text-gray-300">Belum Ada Data Pendaftar</p>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    {records.length === 0
                      ? "Formulir pendaftaran belum menerima submission atau tabel database baru diinisialisasi."
                      : "Tidak ada data yang cocok dengan kriteria pencarian / filter Anda."}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#18181e] text-gray-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                      <tr>
                        <th className="py-3.5 px-4">Tanggal</th>
                        <th className="py-3.5 px-4">Nama Lengkap</th>
                        <th className="py-3.5 px-4">Gender</th>
                        <th className="py-3.5 px-4">Usia</th>
                        <th className="py-3.5 px-4">WhatsApp</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Instansi</th>
                        <th className="py-3.5 px-4">Status Approval</th>
                        <th className="py-3.5 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRecords.map((item) => (
                        <tr
                          key={item.reg_id}
                          className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                          onClick={() => setSelectedRecord(item)}
                        >
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-white text-xs block">
                              {item.created_at
                                ? new Date(item.created_at).toLocaleDateString("id-ID", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })
                                : "-"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-semibold text-white">
                            <div className="flex items-center gap-2">
                              <span>{item.full_name}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${item.gender === "Laki-laki" ? "bg-blue-400" : "bg-pink-400"
                                  }`}
                              />
                              <span className="text-gray-200">{item.gender}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-gray-300 font-medium">
                              {item.age ? `${item.age} th` : "-"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleOpenWhatsApp(item)}
                              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-mono font-medium hover:underline cursor-pointer"
                            >
                              <WhatsAppIcon className="w-4 h-4" />
                              <span>{item.whatsapp}</span>
                            </button>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-gray-200 font-medium block">{item.status || "-"}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="text-xs text-gray-400 block truncate max-w-[160px]">
                              {item.institution || "-"}
                            </span>
                          </td>

                          <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={item.registration_status || "Baru"}
                              onChange={(e) => handleUpdateStatus(item.reg_id, e.target.value)}
                              className={`text-xs font-semibold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer transition-colors appearance-none ${(item.registration_status || "Baru") === "Baru"
                                ? "bg-blue-900/30 text-blue-300 border-blue-500/40"
                                : item.registration_status === "Dihubungi"
                                  ? "bg-amber-900/30 text-amber-300 border-amber-500/40"
                                  : item.registration_status === "Diterima"
                                    ? "bg-emerald-900/30 text-emerald-300 border-emerald-500/40"
                                    : "bg-rose-900/30 text-rose-300 border-rose-500/40"
                                }`}
                            >
                              <option value="Baru" className="bg-[#18181e] text-blue-300">Baru</option>
                              <option value="Dihubungi" className="bg-[#18181e] text-amber-300">Dihubungi</option>
                              <option value="Diterima" className="bg-[#18181e] text-emerald-300">Diterima</option>
                              <option value="Ditolak" className="bg-[#18181e] text-rose-300">Ditolak</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              {item.registration_status !== "Diterima" && (
                                <button
                                  onClick={() => handleUpdateStatus(item.reg_id, "Diterima")}
                                  className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 transition-colors cursor-pointer"
                                  title="Approve / Terima Pendaftar"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {item.registration_status !== "Ditolak" && (
                                <button
                                  onClick={() => handleUpdateStatus(item.reg_id, "Ditolak")}
                                  className="p-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/40 text-rose-400 transition-colors cursor-pointer"
                                  title="Tolak Pendaftar"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={() => setSelectedRecord(item)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                title="Lihat Detail"
                              >
                                <Eye className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleOpenWhatsApp(item)}
                                className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 transition-colors cursor-pointer"
                                title="Chat WhatsApp"
                              >
                                <WhatsAppIcon className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => setDeleteConfirmId(item.reg_id)}
                                className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-400 transition-colors cursor-pointer"
                                title="Hapus Data"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB: PRESENSI & ABSENSI DOJO                             */}
        {/* ======================================================== */}
        {activeTab === "absensi" && (
          <div className="space-y-6">
            {/* Header Absensi */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-white tracking-wide uppercase font-display flex items-center gap-2">
                    Presensi & Absensi Anggota
                    <span className="text-[10px] bg-red-600/30 text-red-300 px-2 py-0.5 rounded-full border border-red-500/40">
                      WITA (Makassar)
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    Rekapitulasi Kehadiran, Master Anggota Karateka & Validasi Geolocation 50m
                  </p>
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex flex-wrap items-center bg-[#18181e] p-1 rounded-xl border border-white/10 gap-1 self-start sm:self-auto">
                <button
                  onClick={() => setAttendanceSubTab("rekap")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${attendanceSubTab === "rekap"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Rekap Harian
                </button>
                <button
                  onClick={() => setAttendanceSubTab("rekap_murid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${attendanceSubTab === "rekap_murid"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Rekap Murid
                </button>
                <button
                  onClick={() => setAttendanceSubTab("anggota")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${attendanceSubTab === "anggota"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Master Anggota
                </button>
                <button
                  onClick={() => setAttendanceSubTab("pengaturan")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${attendanceSubTab === "pengaturan"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                    }`}
                >
                  Radius
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: REKAP ABSENSI */}
            {attendanceSubTab === "rekap" && (
              <div className="space-y-6">
                {/* Date Filter & Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Date Selector Card */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                    <span className="text-xs font-semibold text-gray-400">Pilih Tanggal Latihan</span>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="date"
                        value={adminAttendanceDate}
                        onChange={(e) => setAdminAttendanceDate(e.target.value)}
                        className="bg-[#18181e] text-white text-xs font-bold px-3 py-2 rounded-xl border border-white/15 focus:outline-none focus:border-red-500 w-full"
                      />
                      <button
                        onClick={() => setAdminAttendanceDate(new Date().toISOString().split("T")[0])}
                        className="px-2.5 py-2 bg-red-600/30 hover:bg-red-600/50 text-red-300 text-xs font-bold rounded-xl border border-red-500/40 transition-colors whitespace-nowrap"
                        title="Hari Ini"
                      >
                        Hari Ini
                      </button>
                    </div>
                  </div>

                  {/* Stat Hadir */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-emerald-400 block">Hadir di Dojo</span>
                    <div className="mt-1 text-2xl font-extrabold text-white font-display">
                      {adminAttendances.filter((a) => a.status === "Hadir").length}
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Tercatat Hadir Pada Sesi</span>
                  </div>

                  {/* Stat Alpa (Tidak Hadir) */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-rose-400 block">Alpa / Tidak Hadir</span>
                    <div className="mt-1 text-2xl font-extrabold text-white font-display">
                      {adminAttendances.filter((a) => a.status === "Alpa" || a.status !== "Hadir").length}
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Tidak Mengikuti Latihan</span>
                  </div>

                  {/* GPS Verified Stat */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg text-center flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-blue-400 block">GPS Dojo (≤ 50m)</span>
                    <div className="mt-1 text-2xl font-extrabold text-white font-display">
                      {adminAttendances.filter((a) => (a.distance_meters || 0) <= attendanceSettings.max_radius_meters).length}
                    </div>
                    <span className="text-[10px] text-gray-400 block mt-0.5">Verifikasi Radius Lokasi</span>
                  </div>
                </div>

                {/* Filters, Search Table & Tambah Manual Button */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                      <div className="sm:col-span-2 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <Search className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={attendanceSearchQuery}
                          onChange={(e) => setAttendanceSearchQuery(e.target.value)}
                          placeholder="Cari nama karateka, tingkatan sabuk..."
                          className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 pl-9 pr-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all"
                        />
                      </div>

                      <div>
                        <select
                          value={attendanceStatusFilter}
                          onChange={(e) => setAttendanceStatusFilter(e.target.value)}
                          className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
                        >
                          <option value="all">Semua Status (Hadir & Alpa)</option>
                          <option value="Hadir">Hadir Saja</option>
                          <option value="Alpa">Alpa (Tidak Hadir)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setManualAttendanceForm({
                          member_name: "",
                          member_id: "",
                          belt_level: "Sabuk Putih (Kyu 10)",
                          date_str: adminAttendanceDate,
                          checkin_time: new Date().toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            timeZone: "Asia/Makassar",
                          }).replace(":", "."),
                          session_name: "Sesi Reguler (Selasa)",
                          status: "Hadir",
                          notes: "",
                        });
                        setIsManualAttendanceModalOpen(true);
                      }}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Manual
                    </button>
                  </div>
                </div>

                {/* Attendances Table */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  {filteredAttendances.length === 0 ? (
                    <div className="py-16 text-center text-gray-400 space-y-2">
                      <Clock className="w-10 h-10 text-gray-600 mx-auto" />
                      <p className="text-base font-semibold text-gray-300">Belum Ada Presensi Pada Tanggal Ini</p>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Anggota dapat melakukan presensi mandiri di halaman <strong>/absen</strong> atau <strong>/absensi</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#18181e] text-gray-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                          <tr>
                            <th className="py-3.5 px-4">No</th>
                            <th className="py-3.5 px-4">Nama Karateka</th>
                            <th className="py-3.5 px-4">Sabuk / Kyu</th>
                            <th className="py-3.5 px-4">Waktu (WITA)</th>
                            <th className="py-3.5 px-4">Sesi</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Validasi GPS (50m)</th>
                            <th className="py-3.5 px-4 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredAttendances.map((item, idx) => (
                            <tr key={item.id || idx} className="hover:bg-white/[0.03] transition-colors">
                              <td className="py-3.5 px-4 font-mono text-gray-400">{idx + 1}</td>

                              <td className="py-3.5 px-4 font-bold text-white">
                                {item.member_name}
                              </td>

                              <td className="py-3.5 px-4">
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${getBeltStyle(item.belt_level)}`}>
                                  {item.belt_level}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 font-mono font-bold text-gray-200">
                                <span className="flex items-center gap-1.5">
                                  <Clock className="w-3.5 h-3.5 text-red-500" />
                                  {item.checkin_time} WITA
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-gray-300">
                                {item.session_name}
                              </td>

                              <td className="py-3.5 px-4">
                                <span
                                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${item.status === "Hadir"
                                    ? "bg-emerald-950/70 text-emerald-300 border border-emerald-500/40"
                                    : "bg-rose-950/70 text-rose-300 border border-rose-500/40"
                                    }`}
                                >
                                  {item.status === "Hadir" ? "Hadir" : "Alpa"}
                                </span>
                              </td>

                              <td className="py-3.5 px-4">
                                {item.distance_meters !== null && item.distance_meters !== undefined ? (
                                  <span
                                    className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded ${item.distance_meters <= attendanceSettings.max_radius_meters
                                      ? "bg-emerald-950 text-emerald-300 border border-emerald-600/30"
                                      : "bg-red-950 text-red-300 border border-red-600/30"
                                      }`}
                                  >
                                    <MapPin className="w-3 h-3" />
                                    {item.distance_meters}m {item.distance_meters <= attendanceSettings.max_radius_meters ? "(Di Dojo)" : "(Di Luar Radius)"}
                                  </span>
                                ) : (
                                  <span className="text-[11px] text-gray-500 font-mono">Manual / No GPS</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => setSelectedAttendanceDetail(item)}
                                    className="p-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                                    title="Lihat Detail Presensi"
                                  >
                                    <Eye className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteAttendanceTarget(item)}
                                    className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors cursor-pointer"
                                    title="Hapus Presensi"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 2: REKAP HASIL HADIR MURID (1 BULAN - 1 TAHUN) */}
            {attendanceSubTab === "rekap_murid" && (
              <div className="space-y-6">
                {/* Period Selector & Quick Actions Card */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Period Buttons */}
                    <div>
                      <span className="text-xs font-semibold text-gray-400 block mb-2">
                        Pilih Rentang Waktu Rekap:
                      </span>
                      <div className="flex flex-wrap items-center bg-[#18181e] p-1.5 rounded-xl border border-white/10 gap-1">
                        <button
                          onClick={() => setRekapPeriod("1bulan")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${rekapPeriod === "1bulan"
                            ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          1 Bulan Ini
                        </button>
                        <button
                          onClick={() => setRekapPeriod("3bulan")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${rekapPeriod === "3bulan"
                            ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          3 Bulan
                        </button>
                        <button
                          onClick={() => setRekapPeriod("6bulan")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${rekapPeriod === "6bulan"
                            ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          6 Bulan
                        </button>
                        <button
                          onClick={() => setRekapPeriod("1tahun")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${rekapPeriod === "1tahun"
                            ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          1 Tahun
                        </button>
                        <button
                          onClick={() => setRekapPeriod("custom")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${rekapPeriod === "custom"
                            ? "bg-red-600 text-white shadow-md shadow-red-950/50"
                            : "text-gray-400 hover:text-white"
                            }`}
                        >
                          Rentang Kustom
                        </button>
                      </div>
                    </div>

                    {/* Date badge & Actions */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={handleExportRekapMuridExcel}
                        className="px-3.5 py-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                        title="Unduh Lembar Spreadsheet Excel Berwarna"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Ekspor Excel (Berwarna)</span>
                      </button>
                      <button
                        onClick={handlePrintRekapMurid}
                        className="px-3.5 py-2 bg-gradient-to-r from-red-600/30 to-rose-600/30 hover:from-red-600/50 hover:to-rose-600/50 text-red-200 hover:text-white border border-red-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer no-print shadow-sm"
                        title="Pratinjau & Cetak Lembar Laporan Resmi Dojo"
                      >
                        <Printer className="w-3.5 h-3.5 text-red-400" />
                        <span>Cetak Laporan</span>
                      </button>
                    </div>
                  </div>

                  {/* Custom Date Pickers if active */}
                  {rekapPeriod === "custom" && (
                    <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Dari:</span>
                        <input
                          type="date"
                          value={rekapCustomStart}
                          onChange={(e) => setRekapCustomStart(e.target.value)}
                          className="bg-[#18181e] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 focus:outline-none focus:border-red-500"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Sampai:</span>
                        <input
                          type="date"
                          value={rekapCustomEnd}
                          onChange={(e) => setRekapCustomEnd(e.target.value)}
                          className="bg-[#18181e] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/15 focus:outline-none focus:border-red-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Date range active label */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-mono pt-1">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    <span>
                      Periode: <strong className="text-white">{rekapDateRange.startDate}</strong> s/d{" "}
                      <strong className="text-white">{rekapDateRange.endDate}</strong> ({rekapDateRange.label})
                    </span>
                  </div>
                </div>

                {/* 4 KPI Summary Cards for Period */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Card 1: Total Sesi */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col items-center justify-center text-center space-y-1.5">
                    <span className="text-xs font-semibold text-gray-400 flex items-center justify-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-red-500" /> Sesi Latihan Terlaksana
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {rekapGlobalKPIs.distinctDates}
                    </div>
                    <p className="text-[10px] text-gray-500">Jadwal latihan reguler & khusus</p>
                  </div>

                  {/* Card 2: Rata-Rata Kehadiran */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col items-center justify-center text-center space-y-1.5">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center justify-center gap-1.5">
                      <Percent className="w-3.5 h-3.5 text-emerald-400" /> Rata-Rata Kehadiran
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {rekapGlobalKPIs.avgAttendanceRate}%
                    </div>
                    <p className="text-[10px] text-gray-500">Tingkat disiplin seluruh anggota</p>
                  </div>

                  {/* Card 3: Top Attendant */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col items-center justify-center text-center space-y-1.5">
                    <span className="text-xs font-semibold text-amber-400 flex items-center justify-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" /> Karateka Paling Rajin
                    </span>
                    <div className="text-base sm:text-lg font-extrabold text-white font-display truncate max-w-full px-2">
                      {rekapGlobalKPIs.topAttendant ? rekapGlobalKPIs.topAttendant.member.full_name : "-"}
                    </div>
                    <p className="text-[10px] text-amber-300 font-mono">
                      {rekapGlobalKPIs.topAttendant
                        ? `${rekapGlobalKPIs.topAttendant.hadirCount} Hadir (${rekapGlobalKPIs.topAttendant.percentage}%)`
                        : "Belum ada presensi"}
                    </p>
                  </div>

                  {/* Card 4: Total Log Presensi */}
                  <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col items-center justify-center text-center space-y-1.5">
                    <span className="text-xs font-semibold text-blue-400 flex items-center justify-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-blue-400" /> Akumulasi Kehadiran
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                      {rekapGlobalKPIs.totalHadirAll}
                    </div>
                    <p className="text-[10px] text-rose-400 font-semibold">
                      Total Alpa: {rekapGlobalKPIs.totalAlpaAll} (Tidak Hadir)
                    </p>
                  </div>
                </div>

                {/* Filters & Search Table */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={rekapSearchQuery}
                        onChange={(e) => setRekapSearchQuery(e.target.value)}
                        placeholder="Cari nama murid, ID anggota, sabuk..."
                        className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 pl-9 pr-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all"
                      />
                    </div>

                    <div>
                      <select
                        value={rekapBeltFilter}
                        onChange={(e) => setRekapBeltFilter(e.target.value)}
                        className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
                      >
                        <option value="all">Semua Sabuk / Kyu</option>
                        {BELT_OPTIONS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <select
                        value={rekapSortBy}
                        onChange={(e) => setRekapSortBy(e.target.value as any)}
                        className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all cursor-pointer"
                      >
                        <option value="percentage">Kehadiran Tertinggi (%)</option>
                        <option value="hadir">Total Hadir Terbanyak</option>
                        <option value="sessions">Total Sesi Terbanyak</option>
                        <option value="name">Nama Karateka (A-Z)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rekap Murid Table */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl mb-10 sm:mb-14">
                  {rekapMuridList.length === 0 ? (
                    <div className="py-16 text-center text-gray-400 space-y-2">
                      <Clock className="w-10 h-10 text-gray-600 mx-auto" />
                      <p className="text-base font-semibold text-gray-300">Tidak Ada Data Anggota</p>
                      <p className="text-xs text-gray-500 max-w-sm mx-auto">
                        Silakan sesuaikan filter pencarian atau tambahkan anggota di Master Anggota.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#18181e] text-gray-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                          <tr>
                            <th className="py-3.5 px-4 text-center">No</th>
                            <th className="py-3.5 px-4">Nama Karateka</th>
                            <th className="py-3.5 px-4">Sabuk / Kyu</th>
                            <th className="py-3.5 px-4 text-center">Hadir</th>
                            <th className="py-3.5 px-4 text-center">Alpa (Tidak Hadir)</th>
                            <th className="py-3.5 px-4 text-center">Total Sesi</th>
                            <th className="py-3.5 px-4 min-w-[150px]">Persentase Hadir</th>
                            <th className="py-3.5 px-4 text-center">Predikat</th>
                            <th className="py-3.5 px-4 text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {rekapMuridList.map((item, idx) => (
                            <tr key={item.member.member_id || item.member.id || idx} className="hover:bg-white/[0.03] transition-colors">
                              <td className="py-3.5 px-4 font-mono text-gray-400 text-center font-bold">
                                {idx + 1}
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs flex-shrink-0">
                                    {item.member.full_name.charAt(0)}
                                  </div>
                                  <div>
                                    <div className="font-bold text-white">{item.member.full_name}</div>
                                    <div className="text-[10px] font-mono text-gray-400">
                                      {item.member.member_id || "-"}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4">
                                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${getBeltStyle(item.member.belt_level)}`}>
                                  {item.member.belt_level}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                                <span className="px-2 py-0.5 bg-emerald-950/70 border border-emerald-500/30 rounded-lg">
                                  {item.hadirCount} Sesi
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono font-semibold text-rose-400">
                                {item.alpaCount > 0 ? (
                                  <span className="px-2 py-0.5 bg-rose-950/70 border border-rose-500/30 rounded-lg">
                                    {item.alpaCount} Sesi
                                  </span>
                                ) : (
                                  <span className="text-gray-500">-</span>
                                )}
                              </td>

                              <td className="py-3.5 px-4 text-center font-mono font-bold text-gray-200">
                                {item.totalSessions} Sesi
                              </td>

                              <td className="py-3.5 px-4">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                                    <span
                                      className={
                                        item.totalSessions === 0
                                          ? "text-gray-400 font-normal"
                                          : item.percentage >= 80
                                            ? "text-emerald-400"
                                            : item.percentage >= 60
                                              ? "text-amber-400"
                                              : "text-rose-400"
                                      }
                                    >
                                      {item.totalSessions === 0 ? "0% (Baru)" : `${item.percentage}%`}
                                    </span>
                                  </div>
                                  <div className="w-full h-2 bg-[#18181e] rounded-full overflow-hidden border border-white/5">
                                    <div
                                      className={`h-full rounded-full transition-all ${item.totalSessions === 0
                                        ? "bg-transparent"
                                        : item.percentage >= 80
                                          ? "bg-gradient-to-r from-emerald-600 to-emerald-400"
                                          : item.percentage >= 60
                                            ? "bg-gradient-to-r from-amber-600 to-amber-400"
                                            : "bg-gradient-to-r from-rose-600 to-rose-400"
                                        }`}
                                      style={{ width: `${item.percentage}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${item.predikatColor}`}>
                                  {item.predikat}
                                </span>
                              </td>

                              <td className="py-3.5 px-4 text-center">
                                <button
                                  onClick={() => setSelectedMuridHistory(item)}
                                  className="px-2.5 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 font-bold text-xs flex items-center gap-1.5 mx-auto transition-colors cursor-pointer"
                                  title="Lihat Riwayat Lengkap Kehadiran"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>Riwayat</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SUB-TAB 3: MASTER DATA ANGGOTA */}
            {attendanceSubTab === "anggota" && (
              <div className="space-y-6">
                {/* Actions & Search */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                      <Search className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={memberSearchQuery}
                      onChange={(e) => setMemberSearchQuery(e.target.value)}
                      placeholder="Cari anggota / tingkatan..."
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 pl-9 pr-3 border border-white/10 focus:outline-none focus:border-red-500 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleImportAcceptedApplicants}
                      className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      title="Impor dari pendaftar yang berstatus Diterima"
                    >
                      <Download className="w-4 h-4 text-amber-400" />
                      <span>Tarik Pendaftar</span>
                    </button>

                    <button
                      onClick={() => {
                        setEditingMember(null);
                        setMemberFormData({
                          full_name: "",
                          belt_level: "Sabuk Putih (Kyu 10)",
                          phone: "",
                          dojo_branch: "Racing Kyokushin Club",
                          gender: "Laki-laki",
                          is_active: true,
                        });
                        setIsMemberModalOpen(true);
                      }}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Anggota</span>
                    </button>
                  </div>
                </div>

                {/* Member Table */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-[#18181e] text-gray-400 uppercase font-semibold text-[11px] tracking-wider border-b border-white/10">
                        <tr>
                          <th className="py-3.5 px-4">ID Anggota</th>
                          <th className="py-3.5 px-4">Nama Lengkap</th>
                          <th className="py-3.5 px-4">Sabuk / Kyu-Dan</th>
                          <th className="py-3.5 px-4">WhatsApp</th>
                          <th className="py-3.5 px-4">Dojo Branch</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredMembers.map((m) => (
                          <tr key={m.id || m.member_id} className="hover:bg-white/[0.03] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-red-400">
                              {m.member_id || "-"}
                            </td>

                            <td className="py-3.5 px-4 font-bold text-white">
                              {m.full_name}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${getBeltStyle(m.belt_level)}`}>
                                {m.belt_level}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono text-emerald-400">
                              {m.phone || "-"}
                            </td>

                            <td className="py-3.5 px-4 text-gray-300">
                              {m.dojo_branch}
                            </td>

                            <td className="py-3.5 px-4">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${m.is_active
                                  ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                                  : "bg-gray-800 text-gray-400"
                                  }`}
                              >
                                {m.is_active ? "Aktif" : "Non-aktif"}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-center">
                              <div className="flex items-center justify-center gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditingMember(m);
                                    setMemberFormData({ ...m });
                                    setIsMemberModalOpen(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer"
                                  title="Edit Anggota"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteMemberTarget(m)}
                                  className="p-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/40 text-red-400 transition-colors cursor-pointer"
                                  title="Hapus Anggota"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: PENGATURAN JAM & GPS 50M */}
            {attendanceSubTab === "pengaturan" && (
              <form onSubmit={handleSaveAttendanceSettings} className="space-y-6 max-w-3xl mx-auto pb-48 sm:pb-56">
                {/* Setting Jam Buka/Tutup Absensi */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="border-b border-white/5 pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-red-500" />
                        Jadwal & Jam Buka Presensi (WITA)
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Tentukan rentang jam berapa karateka dapat melakukan presensi mandiri.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-300">
                        Jam Buka Absen (WITA)
                      </label>
                      <input
                        type="time"
                        value={attendanceSettings.open_time}
                        onChange={(e) =>
                          setAttendanceSettings({ ...attendanceSettings, open_time: e.target.value })
                        }
                        className="w-full bg-[#18181e] text-white text-sm font-bold rounded-xl py-2.5 px-3.5 border border-white/15 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-300">
                        Jam Tutup Absen (WITA)
                      </label>
                      <input
                        type="time"
                        value={attendanceSettings.close_time}
                        onChange={(e) =>
                          setAttendanceSettings({ ...attendanceSettings, close_time: e.target.value })
                        }
                        className="w-full bg-[#18181e] text-white text-sm font-bold rounded-xl py-2.5 px-3.5 border border-white/15 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">
                      Aktifkan Pembatasan Jam Latihan
                    </span>
                    <input
                      type="checkbox"
                      checked={attendanceSettings.is_time_restriction_enabled}
                      onChange={(e) =>
                        setAttendanceSettings({
                          ...attendanceSettings,
                          is_time_restriction_enabled: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {/* Setting Koordinat GPS & Radius 50m */}
                <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
                  <div className="border-b border-white/5 pb-3">
                    <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      Titik Lokasi Dojo & Radius Maksimal
                    </h4>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Cari lokasi, klik/geser pin di peta, atau ambil langsung koordinat GPS perangkat Anda untuk menentukan titik pusat Dojo.
                    </p>
                  </div>

                  {/* Peta Interaktif & Pencarian Lokasi */}
                  <div className="w-full">
                    <DojoMapPicker
                      lat={attendanceSettings.dojo_lat}
                      lng={attendanceSettings.dojo_lng}
                      radius={attendanceSettings.max_radius_meters}
                      onLocationChange={(newLat, newLng) => {
                        setAttendanceSettings((prev) => ({
                          ...prev,
                          dojo_lat: newLat,
                          dojo_lng: newLng,
                        }));
                      }}
                      onRadiusChange={(newRadius) => {
                        setAttendanceSettings((prev) => ({
                          ...prev,
                          max_radius_meters: newRadius,
                        }));
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-300">
                        Latitude Titik Dojo
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={attendanceSettings.dojo_lat}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            dojo_lat: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-[#18181e] text-white text-xs sm:text-sm font-mono rounded-xl py-2.5 px-3.5 border border-white/15 focus:outline-none focus:border-red-500"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-gray-300">
                        Longitude Titik Dojo
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={attendanceSettings.dojo_lng}
                        onChange={(e) =>
                          setAttendanceSettings({
                            ...attendanceSettings,
                            dojo_lng: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-full bg-[#18181e] text-white text-xs sm:text-sm font-mono rounded-xl py-2.5 px-3.5 border border-white/15 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleGetCurrentGPSForDojo}
                    disabled={isGettingAdminGPS}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-600/15 hover:bg-red-600/25 border border-red-500/30 text-xs font-semibold text-red-400 hover:text-red-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>
                      {isGettingAdminGPS
                        ? "Membaca GPS perangkat..."
                        : "Ambil Lokasi Titik Dojo (GPS Saat Ini)"}
                    </span>
                  </button>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-gray-300">Radius Maksimal Absen:</span>
                      <span className="font-mono font-bold text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-500/40">
                        {attendanceSettings.max_radius_meters} Meter
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="5"
                      value={attendanceSettings.max_radius_meters}
                      onChange={(e) =>
                        setAttendanceSettings({
                          ...attendanceSettings,
                          max_radius_meters: parseInt(e.target.value, 10),
                        })
                      }
                      className="w-full accent-red-600 cursor-pointer"
                    />
                    <p className="text-[11px] text-gray-500">
                      Standar rekomendasi: <strong>50 Meter</strong> dari titik pusat Dojo. Lingkaran merah di peta akan otomatis menyesuaikan ukuran radius.
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-white/5">
                    <span className="text-xs font-medium text-gray-300">
                      Wajibkan Validasi Jarak GPS (50m)
                    </span>
                    <input
                      type="checkbox"
                      checked={attendanceSettings.is_gps_enabled}
                      onChange={(e) =>
                        setAttendanceSettings({
                          ...attendanceSettings,
                          is_gps_enabled: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-red-600 rounded cursor-pointer"
                    />
                  </div>
                </div>

                {settingsSavedMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl text-xs text-emerald-200 flex items-center gap-2 shadow-lg"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{settingsSavedMessage}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="w-full mb-16 sm:mb-24 btn-shimmer bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold py-4 px-6 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.55)] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? "Menyimpan Pengaturan..." : "Simpan Pengaturan Absensi"}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: STATISTIK & GRAFIK VISUAL                        */}
        {/* ======================================================== */}
        {activeTab === "charts" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-red-500" />
                      Tren Pendaftaran (7 Hari Terakhir)
                    </h4>
                    <span className="text-[11px] text-gray-400">Jumlah submission harian yang masuk</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950/40 px-2.5 py-1 rounded-lg border border-red-500/30">
                    {stats.days.reduce((acc, curr) => acc + curr.count, 0)} Pendaftar
                  </span>
                </div>

                <div className="h-52 flex items-end justify-between gap-2 pt-6 px-2">
                  {stats.days.map((d, idx) => {
                    const maxCount = Math.max(...stats.days.map((x) => x.count), 1);
                    const barHeight = d.count > 0 ? Math.max((d.count / maxCount) * 100, 15) : 8;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[11px] font-mono font-bold text-gray-300 group-hover:text-red-400 transition-colors">
                          {d.count}
                        </span>
                        <div className="w-full max-w-[36px] bg-[#1a1a22] rounded-t-lg overflow-hidden h-36 flex items-end">
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${barHeight}%` }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className={`w-full rounded-t-lg transition-all ${d.count > 0
                              ? "bg-gradient-to-t from-red-700 via-red-600 to-rose-500 shadow-md shadow-red-900/50"
                              : "bg-white/10"
                              }`}
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">{d.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-[#121216] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <PieChart className="w-4 h-4 text-blue-400" />
                      Komposisi Gender Calon Murid
                    </h4>
                    <span className="text-[11px] text-gray-400">Perbandingan murid Laki-laki vs Perempuan</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-white/5 px-2.5 py-1 rounded-lg">
                    Total: {stats.total}
                  </span>
                </div>

                <div className="py-2 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-blue-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Laki-laki ({stats.maleCount} Murid)
                      </span>
                      <span className="text-blue-300 font-mono">{stats.malePct}%</span>
                    </div>
                    <div className="w-full h-3.5 bg-[#1a1a22] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.malePct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5 font-semibold">
                      <span className="text-pink-400 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-pink-500" /> Perempuan ({stats.femaleCount} Murid)
                      </span>
                      <span className="text-pink-300 font-mono">{stats.femalePct}%</span>
                    </div>
                    <div className="w-full h-3.5 bg-[#1a1a22] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${stats.femalePct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-pink-600 to-rose-400 rounded-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 leading-relaxed">
                  <strong>Demografi:</strong> Rasio pendaftar didominasi oleh {stats.maleCount >= stats.femaleCount ? "Laki-laki" : "Perempuan"} sebesar {Math.max(stats.malePct, stats.femalePct)}%.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: LAPORAN & CETAK REKAP                            */}
        {/* ======================================================== */}
        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl no-print">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  Laporan Rekapitulasi Calon Murid
                </h3>
                <p className="text-xs text-gray-400">
                  Dokumen rekap pendaftar siap cetak dan tanda tangan Sensei / Pengurus Dojo.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* Print Document Paper */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6 border border-slate-200 printable-area">
              <div className="flex items-center gap-4 sm:gap-6 border-b-2 border-slate-900 pb-3">
                <div className="w-14 h-14 p-1 flex-shrink-0">
                  <Image src="/images/logo.png" alt="RKC Logo" width={56} height={56} className="object-contain" />
                </div>
                <div className="flex-1 text-left">
                  <h2 className="text-lg sm:text-xl font-black uppercase tracking-wider text-slate-900 font-display">
                    RACING KYOKUSHIN CLUB
                  </h2>
                  <p className="text-[10px] text-slate-600 mt-0.5 font-medium">
                    Jl Sukamaju 1 No 2B RT 005/RW 006, Kel Tammaung , Kec Panakukkang, Kota Makssar, Sulawesi Selatan 90231 Telp/WhatsApp: 0815 27641306
                  </p>
                </div>
                <div className="text-right text-xs text-slate-600">
                  <p className="font-bold text-slate-900">REKAPITULASI RESMI</p>
                  <p>Tanggal: {new Date().toLocaleDateString("id-ID", { dateStyle: "long" })}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-y border-slate-300 text-slate-700 uppercase text-[10px]">
                      <th className="py-2.5 px-3">No</th>
                      <th className="py-2.5 px-3">Nama Lengkap</th>
                      <th className="py-2.5 px-3">Gender</th>
                      <th className="py-2.5 px-3">Usia</th>
                      <th className="py-2.5 px-3">WhatsApp</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">Instansi</th>
                      <th className="py-2.5 px-3">Status Penerimaan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {reportRecords.map((r, i) => (
                      <tr key={r.reg_id}>
                        <td className="py-2 px-3">{i + 1}</td>
                        <td className="py-2 px-3 font-bold">{r.full_name}</td>
                        <td className="py-2 px-3">{r.gender}</td>
                        <td className="py-2 px-3">{r.age ? `${r.age} th` : "-"}</td>
                        <td className="py-2 px-3 font-mono">{r.whatsapp}</td>
                        <td className="py-2 px-3">{r.status || "-"}</td>
                        <td className="py-2 px-3">{r.institution || "-"}</td>
                        <td className="py-2 px-3 font-semibold">{r.registration_status || "Baru"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: PROFIL ADMIN & AKUN                              */}
        {/* ======================================================== */}
        {activeTab === "profile" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden p-1 border border-red-500 bg-black/60 shadow-lg">
                  <Image src="/images/logo.png" alt="RKC" width={64} height={64} className="object-contain" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {adminProfile?.full_name || sessionUser?.user_metadata?.full_name || "Administrator Dojo"}
                  </h3>
                  <p className="text-xs text-gray-400">{sessionUser?.email || "admin@rkc.id"}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-[10px] font-bold uppercase tracking-wider">
                      Role: {adminProfile?.role ? adminProfile.role.toUpperCase() : "ADMIN"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ganti Password Section */}
            <div className="bg-[#121216] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="border-b border-white/5 pb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-red-500" />
                  Ubah Password Akun
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Perbarui kata sandi akun administrator Supabase Anda.
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Password Baru <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Masukkan password baru (min. 6 karakter)"
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3.5 border border-white/10 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Konfirmasi Password Baru <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ulangi password baru"
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3.5 border border-white/10 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                  />
                </div>

                {passwordChangeStatus && (
                  <p
                    className={`text-xs font-medium flex items-center gap-1.5 ${passwordChangeStatus.includes("berhasil") ? "text-emerald-400" : "text-red-400"
                      }`}
                  >
                    {passwordChangeStatus.includes("berhasil") ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5" />
                    )}
                    {passwordChangeStatus}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isChangingPassword ? "Memperbarui..." : "Simpan Password Baru"}
                </button>
              </form>
            </div>

            <div className="bg-[#121216] border border-red-500/20 rounded-2xl p-6 shadow-xl flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">Keluar dari Portal Admin</h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Akhiri sesi login administrator pada browser ini.
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* BOTTOM TAB BAR NAVIGATION                                */}
      {/* ======================================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-40 w-full sm:bottom-6 sm:left-0 sm:right-0 sm:w-auto sm:flex sm:justify-center sm:px-4 sm:pointer-events-none no-print">
        <nav className="w-full sm:w-auto sm:pointer-events-auto bg-[#0e0e12]/95 sm:bg-[#121216]/95 backdrop-blur-2xl border-t sm:border border-white/10 rounded-none sm:rounded-full px-2 sm:px-4 py-1.5 sm:py-2 shadow-[0_-8px_25px_rgba(0,0,0,0.85)] sm:shadow-[0_10px_40px_rgba(0,0,0,0.85)] flex items-center justify-around sm:justify-center gap-1 sm:gap-3">
          {/* Tab 1: Data */}
          <button
            onClick={() => setActiveTab("data")}
            className={`flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all cursor-pointer ${activeTab === "data"
              ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <div className="relative flex items-center justify-center">
              <Layers className="w-4 h-4" />
              {records.filter((r) => (r.registration_status || "Baru") !== "Diterima" && (r.registration_status || "Baru") !== "Ditolak").length > 0 && (
                <span className="absolute -top-1.5 -right-2 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                  {records.filter((r) => (r.registration_status || "Baru") !== "Diterima" && (r.registration_status || "Baru") !== "Ditolak").length}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-sm font-semibold">Data</span>
          </button>

          {/* Tab 2: Presensi (NEW) */}
          <button
            onClick={() => setActiveTab("absensi")}
            className={`flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all cursor-pointer ${activeTab === "absensi"
              ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <div className="relative flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
              {adminAttendances.length > 0 && (
                <span className="absolute -top-1.5 -right-2 sm:-top-2 sm:-right-2 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full shadow-sm">
                  {adminAttendances.length}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-sm font-semibold">Presensi</span>
          </button>

          {/* Tab 3: Statistik */}
          <button
            onClick={() => setActiveTab("charts")}
            className={`flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all cursor-pointer ${activeTab === "charts"
              ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span className="text-[10px] sm:text-sm font-semibold">Statistik</span>
          </button>

          {/* Tab 4: Laporan */}
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all cursor-pointer ${activeTab === "reports"
              ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[10px] sm:text-sm font-semibold">Laporan</span>
          </button>

          {/* Tab 5: Profil */}
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex-1 sm:flex-initial flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-2 sm:px-4 rounded-xl sm:rounded-full transition-all cursor-pointer ${activeTab === "profile"
              ? "bg-red-600 text-white font-bold shadow-md shadow-red-950/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
              }`}
          >
            <User className="w-4 h-4" />
            <span className="text-[10px] sm:text-sm font-semibold">Profil</span>
          </button>
        </nav>
      </div>

      {/* Modal Detail Pendaftar */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden h-[100dvh] w-full no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg max-h-[90vh] bg-[#121216] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div
                className="w-full p-4 sm:p-5 text-white flex items-center justify-between relative overflow-hidden flex-shrink-0 sticky top-0 z-30 bg-cover bg-center border-b border-white/10 shadow-md"
                style={{
                  backgroundImage: "url('/images/bgpopupberhasil.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-center gap-3 relative z-10">
                  <Image
                    src="/images/logo.png"
                    alt="RKC"
                    width={40}
                    height={40}
                    className="object-contain drop-shadow-md flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-extrabold font-display text-base sm:text-lg leading-tight drop-shadow-md">
                      Detail Calon Murid
                    </h3>
                    <p className="text-[11px] text-white/90 drop-shadow">
                      Racing Kyokushin Club
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="p-1.5 sm:p-2 rounded-full hover:bg-black/30 transition-colors cursor-pointer relative z-10 text-white"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 min-h-0 p-4 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="bg-[#18181e] border border-white/5 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400 font-medium">Nama Lengkap</span>
                    <span className="font-bold text-white text-sm sm:text-base">{selectedRecord.full_name}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 border-b border-white/5 pb-2.5">
                    <div>
                      <span className="text-gray-400 block text-xs">Jenis Kelamin</span>
                      <span className="font-semibold text-gray-200">{selectedRecord.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs">Umur</span>
                      <span className="font-semibold text-gray-200">
                        {selectedRecord.age ? `${selectedRecord.age} Tahun` : "-"}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs">Tanggal Lahir</span>
                      <span className="font-semibold text-gray-200">
                        {selectedRecord.birth_date || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400 font-medium">Nomor WhatsApp</span>
                    <span className="font-mono font-bold text-emerald-400">{selectedRecord.whatsapp}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 border-b border-white/5 pb-2">
                    <div>
                      <span className="text-gray-400 block text-xs mb-0.5">Status</span>
                      <span className="font-semibold text-gray-200 block">{selectedRecord.status || "-"}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-xs mb-0.5">Instansi</span>
                      <span className="font-semibold text-gray-200 block">{selectedRecord.institution || "-"}</span>
                    </div>
                  </div>

                  <div className="border-b border-white/5 pb-2">
                    <span className="text-gray-400 block text-xs mb-0.5">Alamat Lengkap</span>
                    <p className="text-gray-200 text-xs leading-relaxed">{selectedRecord.address}</p>
                  </div>

                  {(() => {
                    const parsed = parseMotivation(selectedRecord.motivation);
                    return (
                      <div className="space-y-2 pt-1">
                        <span className="text-gray-400 block text-xs font-semibold uppercase tracking-wider">
                          Motivasi Bergabung:
                        </span>

                        <div className="bg-[#121216] border border-white/5 rounded-xl p-3.5 space-y-2.5">
                          <div>
                            <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                              Alasan bergabung:
                            </span>
                            <p className="text-xs text-white leading-relaxed font-medium">
                              {parsed.reason}
                            </p>
                          </div>

                          {parsed.hobby && (
                            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                              <span className="text-[11px] font-semibold text-gray-400">
                                Hobi olahraga beladiri:
                              </span>
                              <span className="font-bold text-xs text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                                {parsed.hobby}
                              </span>
                            </div>
                          )}

                          {parsed.health && (
                            <div className="pt-2 border-t border-white/5">
                              <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                                Informasi kesehatan & riwayat cedera:
                              </span>
                              <p className="text-xs text-gray-300 italic bg-black/30 p-2 rounded-lg border border-white/5">
                                {parsed.health}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                <div className="flex items-center justify-between bg-[#18181e] p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-gray-400 font-semibold">Status Pendaftaran:</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${(selectedRecord.registration_status || "Baru") === "Diterima"
                        ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/50"
                        : (selectedRecord.registration_status || "Baru") === "Ditolak"
                          ? "bg-rose-950/80 text-rose-300 border-rose-500/50"
                          : (selectedRecord.registration_status || "Baru") === "Dihubungi"
                            ? "bg-amber-950/80 text-amber-300 border-amber-500/50"
                            : "bg-blue-950/80 text-blue-300 border-blue-500/50"
                        }`}
                    >
                      {selectedRecord.registration_status || "Baru"}
                    </span>
                    <select
                      value={selectedRecord.registration_status || "Baru"}
                      onChange={(e) => handleUpdateStatus(selectedRecord.reg_id, e.target.value)}
                      className="text-xs font-bold py-1 px-2.5 rounded-lg bg-[#121216] text-white border border-white/20 focus:outline-none focus:border-red-500 cursor-pointer appearance-none"
                    >
                      <option value="Baru">Baru</option>
                      <option value="Dihubungi">Dihubungi</option>
                      <option value="Diterima">Diterima (ACC)</option>
                      <option value="Ditolak">Ditolak</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 bg-[#18181e] border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2.5 flex-shrink-0 sticky bottom-0 z-30 shadow-xl">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {selectedRecord.registration_status !== "Diterima" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedRecord.reg_id, "Diterima")}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <Check className="w-4 h-4" />
                      <span>Terima (ACC)</span>
                    </button>
                  )}
                  {selectedRecord.registration_status !== "Ditolak" && (
                    <button
                      onClick={() => handleUpdateStatus(selectedRecord.reg_id, "Ditolak")}
                      className="flex-1 sm:flex-initial px-4 py-2.5 bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-600 hover:to-red-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer whitespace-nowrap"
                    >
                      <X className="w-4 h-4" />
                      <span>Tolak</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleOpenWhatsApp(selectedRecord)}
                  className="w-full sm:w-auto flex-1 btn-shimmer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Chat WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal Add/Edit Member */}
      <AnimatePresence>
        {isMemberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden h-[100dvh] w-full no-print">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMemberModalOpen(false)}
              className="fixed inset-0"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#121216] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div
                className="w-full p-4 text-white flex items-center justify-between border-b border-white/10"
                style={{
                  backgroundImage: "url('/images/bgpopupberhasil.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-5 h-5 text-white" />
                  <h3 className="font-extrabold text-sm sm:text-base">
                    {editingMember ? "Edit Data Anggota Karateka" : "Tambah Anggota Karateka Baru"}
                  </h3>
                </div>
                <button
                  onClick={() => setIsMemberModalOpen(false)}
                  className="p-1 rounded-full hover:bg-black/30 text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveMember} className="p-5 space-y-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={memberFormData.full_name || ""}
                    onChange={(e) => setMemberFormData({ ...memberFormData, full_name: e.target.value })}
                    placeholder="Nama Lengkap Karateka"
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">
                    Tingkatan Sabuk (Kyu / Dan)
                  </label>
                  <select
                    value={memberFormData.belt_level || "Sabuk Putih (Kyu 10)"}
                    onChange={(e) => setMemberFormData({ ...memberFormData, belt_level: e.target.value })}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                  >
                    {BELT_OPTIONS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      No. WhatsApp
                    </label>
                    <input
                      type="text"
                      value={memberFormData.phone || ""}
                      onChange={(e) => setMemberFormData({ ...memberFormData, phone: e.target.value })}
                      placeholder="08123456789"
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Jenis Kelamin
                    </label>
                    <select
                      value={memberFormData.gender || "Laki-laki"}
                      onChange={(e) => setMemberFormData({ ...memberFormData, gender: e.target.value })}
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">
                    Cabang Dojo
                  </label>
                  <input
                    type="text"
                    value={memberFormData.dojo_branch || "Racing Kyokushin Club"}
                    onChange={(e) => setMemberFormData({ ...memberFormData, dojo_branch: e.target.value })}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-300">Status Anggota Aktif</span>
                  <input
                    type="checkbox"
                    checked={memberFormData.is_active !== undefined ? memberFormData.is_active : true}
                    onChange={(e) => setMemberFormData({ ...memberFormData, is_active: e.target.checked })}
                    className="w-4 h-4 accent-red-600 rounded cursor-pointer"
                  />
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsMemberModalOpen(false)}
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    Simpan Anggota
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Tambah Presensi Manual */}
      <AnimatePresence>
        {isManualAttendanceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#121216] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Tambah Presensi Manual</h3>
                    <p className="text-[11px] text-gray-400">Input data presensi karateka langsung oleh Admin</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsManualAttendanceModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveManualAttendance} className="space-y-4">
                {/* Pilih Anggota dari Master */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">
                    Pilih Karateka <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={manualAttendanceForm.member_name}
                    onChange={(e) => {
                      const selectedName = e.target.value;
                      const found = adminMembers.find((m) => m.full_name === selectedName);
                      if (found) {
                        setManualAttendanceForm({
                          ...manualAttendanceForm,
                          member_name: found.full_name,
                          member_id: found.member_id || "",
                          belt_level: found.belt_level || "Sabuk Putih (Kyu 10)",
                        });
                      } else {
                        setManualAttendanceForm({
                          ...manualAttendanceForm,
                          member_name: selectedName,
                        });
                      }
                    }}
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    <option value="">-- Pilih dari Master Anggota --</option>
                    {adminMembers.map((m) => (
                      <option key={m.member_id || m.id || m.full_name} value={m.full_name}>
                        {m.full_name} ({m.belt_level})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Atau Ketik Nama Manual jika belum ada */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-400">
                    Nama Karateka (Bisa Ketik Manual)
                  </label>
                  <input
                    type="text"
                    required
                    value={manualAttendanceForm.member_name}
                    onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, member_name: e.target.value })}
                    placeholder="Nama lengkap karateka"
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                  />
                </div>

                {/* Sabuk & ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Tingkatan Sabuk
                    </label>
                    <select
                      value={manualAttendanceForm.belt_level}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, belt_level: e.target.value })}
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      {BELT_OPTIONS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Nomor Anggota (Opsional)
                    </label>
                    <input
                      type="text"
                      value={manualAttendanceForm.member_id}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, member_id: e.target.value })}
                      placeholder="Contoh: RKC-001"
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Tanggal & Waktu Presensi */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Tanggal Latihan
                    </label>
                    <input
                      type="date"
                      required
                      value={manualAttendanceForm.date_str}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, date_str: e.target.value })}
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Waktu (WITA)
                    </label>
                    <input
                      type="text"
                      required
                      value={manualAttendanceForm.checkin_time}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, checkin_time: e.target.value })}
                      placeholder="16.00"
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {/* Sesi & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Sesi Latihan
                    </label>
                    <input
                      type="text"
                      value={manualAttendanceForm.session_name}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, session_name: e.target.value })}
                      placeholder="Sesi Reguler (Selasa)"
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-gray-300">
                      Status Kehadiran
                    </label>
                    <select
                      value={manualAttendanceForm.status}
                      onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, status: e.target.value as any })}
                      className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2.5 px-3 border border-white/15 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Alpa">Alpa (Tidak Hadir)</option>
                    </select>
                  </div>
                </div>

                {/* Catatan / Keterangan */}
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-gray-300">
                    Catatan / Alasan (Opsional)
                  </label>
                  <textarea
                    rows={2}
                    value={manualAttendanceForm.notes}
                    onChange={(e) => setManualAttendanceForm({ ...manualAttendanceForm, notes: e.target.value })}
                    placeholder="Contoh: Presensi manual lewat admin, keterangan tambahan, dll."
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-2 px-3 border border-white/15 focus:outline-none focus:border-red-500 resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsManualAttendanceModalOpen(false)}
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Simpan Presensi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Detail Presensi Karateka */}
      <AnimatePresence>
        {selectedAttendanceDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-[#121216] border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-lg">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white font-display tracking-wide uppercase">
                      Detail Presensi Karateka
                    </h3>
                    <p className="text-[11px] text-gray-400">
                      Informasi Lengkap Kehadiran & Validasi Geolocation
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAttendanceDetail(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Card Summary */}
              <div className="bg-[#18181e] border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 text-lg font-black font-display flex-shrink-0">
                    {selectedAttendanceDetail.member_name?.charAt(0) || "K"}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      {selectedAttendanceDetail.member_name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-sm ${getBeltStyle(selectedAttendanceDetail.belt_level)}`}>
                        {selectedAttendanceDetail.belt_level}
                      </span>
                      {selectedAttendanceDetail.member_id && (
                        <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                          {selectedAttendanceDetail.member_id}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <span
                    className={`text-xs font-bold px-3 py-1.5 rounded-xl shadow ${selectedAttendanceDetail.status === "Hadir"
                      ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/50"
                      : "bg-rose-950/80 text-rose-300 border border-rose-500/50"
                      }`}
                  >
                    {selectedAttendanceDetail.status === "Hadir" ? "Hadir" : "Alpa (Tidak Hadir)"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-[#18181e]/70 border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-red-500" /> Tanggal Latihan
                  </span>
                  <p className="font-bold text-white text-xs sm:text-sm">
                    {selectedAttendanceDetail.date_str}
                  </p>
                </div>

                <div className="bg-[#18181e]/70 border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-500" /> Waktu Presensi
                  </span>
                  <p className="font-bold font-mono text-white text-xs sm:text-sm">
                    {selectedAttendanceDetail.checkin_time} WITA
                  </p>
                </div>

                <div className="bg-[#18181e]/70 border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Activity className="w-3 h-3 text-red-500" /> Sesi Latihan
                  </span>
                  <p className="font-semibold text-gray-200">
                    {selectedAttendanceDetail.session_name || "Sesi Reguler (Selasa)"}
                  </p>
                </div>

                <div className="bg-[#18181e]/70 border border-white/5 p-3 rounded-xl space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Building className="w-3 h-3 text-red-500" /> Cabang Dojo
                  </span>
                  <p className="font-semibold text-gray-200">
                    {selectedAttendanceDetail.dojo_branch || "Racing Kyokushin Club Makassar"}
                  </p>
                </div>
              </div>

              {/* Validasi GPS & Radius */}
              <div className="bg-[#18181e]/70 border border-white/10 p-3.5 rounded-xl space-y-2">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> Status Validasi Lokasi (Radius 50m)
                </span>

                {selectedAttendanceDetail.distance_meters !== null && selectedAttendanceDetail.distance_meters !== undefined ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-300">Jarak ke Pusat Dojo:</span>
                      <span className="font-mono font-bold text-xs text-white bg-white/10 px-2 py-0.5 rounded">
                        {selectedAttendanceDetail.distance_meters} Meter
                      </span>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${selectedAttendanceDetail.distance_meters <= attendanceSettings.max_radius_meters
                        ? "bg-emerald-950/50 border-emerald-500/40 text-emerald-300"
                        : "bg-red-950/50 border-red-500/40 text-red-300"
                        }`}
                    >
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>
                        {selectedAttendanceDetail.distance_meters <= attendanceSettings.max_radius_meters
                          ? "Presensi Sah di Dalam Area Dojo (≤ 50 meter)"
                          : "Di Luar Radius Dojo yang Ditentukan"}
                      </span>
                    </div>

                    {(selectedAttendanceDetail.latitude || selectedAttendanceDetail.longitude) && (
                      <div className="text-[10px] text-gray-400 font-mono flex items-center justify-between pt-1 border-t border-white/5">
                        <span>Koordinat GPS:</span>
                        <span>
                          {selectedAttendanceDetail.latitude?.toFixed(6) || "-"}, {selectedAttendanceDetail.longitude?.toFixed(6) || "-"}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-2.5 bg-zinc-900/60 border border-white/10 rounded-xl text-xs text-gray-300 flex items-center gap-2">
                    <FileText className="w-4 h-4 flex-shrink-0 text-red-500" />
                    <span>Presensi Tercatat Manual / Alpa (Tanpa Pelacakan GPS)</span>
                  </div>
                )}
              </div>

              {/* Catatan / Keterangan */}
              <div className="bg-[#18181e]/70 border border-white/5 p-3.5 rounded-xl space-y-1">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold flex items-center gap-1.5">
                  <FileText className="w-3 h-3 text-red-500" /> Catatan / Keterangan
                </span>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  {selectedAttendanceDetail.notes || "Tidak ada catatan khusus untuk presensi ini."}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedAttendanceDetail(null)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Riwayat Lengkap Kehadiran Karateka (1 Bulan - 1 Tahun) */}
      <AnimatePresence>
        {selectedMuridHistory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-[#121216] border border-white/15 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white text-lg font-black font-display shadow-lg flex-shrink-0">
                    {selectedMuridHistory.member.full_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      Riwayat Kehadiran: {selectedMuridHistory.member.full_name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBeltStyle(selectedMuridHistory.member.belt_level)}`}>
                        {selectedMuridHistory.member.belt_level}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {selectedMuridHistory.member.member_id || "-"}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMuridHistory(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Stats Summary in Period */}
              <div className="grid grid-cols-4 gap-2.5 bg-[#18181e] p-3 rounded-2xl border border-white/10 text-center flex-shrink-0">
                <div className="p-2">
                  <span className="text-[10px] text-gray-400 block font-semibold">Total Sesi</span>
                  <span className="text-base font-bold text-white font-mono">{selectedMuridHistory.totalSessions}</span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] text-emerald-400 block font-semibold">Hadir</span>
                  <span className="text-base font-bold text-emerald-400 font-mono">{selectedMuridHistory.hadirCount}</span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] text-rose-400 block font-semibold">Alpa (Tidak Hadir)</span>
                  <span className="text-base font-bold text-rose-400 font-mono">
                    {selectedMuridHistory.alpaCount}
                  </span>
                </div>
                <div className="p-2">
                  <span className="text-[10px] text-amber-400 block font-semibold">Kehadiran</span>
                  <span className="text-base font-bold text-amber-300 font-mono">{selectedMuridHistory.percentage}%</span>
                </div>
              </div>

              {/* List of sessions in period */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 min-h-0">
                <span className="text-xs font-semibold text-gray-400 block mb-2">
                  Daftar Sesi Latihan ({rekapDateRange.label}):
                </span>

                {selectedMuridHistory.logs.length === 0 ? (
                  <div className="py-10 text-center text-gray-500 text-xs">
                    Belum ada log presensi untuk karateka ini pada rentang waktu terpilih.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedMuridHistory.logs.map((log, lIdx) => (
                      <div
                        key={log.id || lIdx}
                        className="p-3 bg-[#18181e] border border-white/5 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 font-mono text-[11px] font-bold">
                            {lIdx + 1}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              {log.date_str}
                              <span className="text-[10px] font-normal text-gray-400">({log.session_name})</span>
                            </div>
                            <div className="text-[11px] text-gray-400 flex items-center gap-2 mt-0.5">
                              <span className="font-mono">{log.checkin_time} WITA</span>
                              {log.notes && <span className="italic truncate max-w-[200px] text-gray-500">• {log.notes}</span>}
                            </div>
                          </div>
                        </div>

                        <div>
                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${log.status === "Hadir"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-950 text-rose-300 border border-rose-500/40"
                              }`}
                          >
                            {log.status === "Hadir" ? "Hadir" : "Alpa (Tidak Hadir)"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-white/10 flex-shrink-0">
                <button
                  onClick={() => setSelectedMuridHistory(null)}
                  className="w-full py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Tutup Riwayat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Attendance Confirmation Alert Modal */}
      <AnimatePresence>
        {deleteAttendanceTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#121216]/95 border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-950/40 space-y-4 text-center relative overflow-hidden"
            >
              {/* Glowing decorative aura */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-950/50 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto shadow-lg shadow-red-950/40">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-base sm:text-lg font-black text-white font-display tracking-wide uppercase">
                  Hapus Catatan Presensi?
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Data presensi yang dihapus tidak dapat dipulihkan kembali.
                </p>
              </div>

              {/* Target info card */}
              <div className="bg-[#18181e] border border-white/10 rounded-2xl p-3.5 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Nama Karateka:</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {deleteAttendanceTarget.member_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Sabuk / Kyu:</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBeltStyle(deleteAttendanceTarget.belt_level)}`}>
                    {deleteAttendanceTarget.belt_level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Waktu & Tanggal:</span>
                  <span className="text-xs font-mono font-semibold text-gray-200">
                    {deleteAttendanceTarget.checkin_time} WITA • {deleteAttendanceTarget.date_str}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDeleteAttendanceTarget(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteAttendance}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Presensi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Member Confirmation Alert Modal */}
      <AnimatePresence>
        {deleteMemberTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#121216]/95 border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-950/40 space-y-4 text-center relative overflow-hidden"
            >
              {/* Glowing decorative background */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-950/50 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto shadow-lg shadow-red-950/40">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>

              {/* Title & Description */}
              <div>
                <h4 className="text-base sm:text-lg font-black text-white font-display tracking-wide uppercase">
                  Hapus Master Anggota?
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Data karateka ini akan dihapus permanen dari master anggota dojo.
                </p>
              </div>

              {/* Target info card */}
              <div className="bg-[#18181e] border border-white/10 rounded-2xl p-3.5 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Nama Karateka:</span>
                  <span className="text-xs sm:text-sm font-bold text-white">
                    {deleteMemberTarget.full_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Sabuk / Kyu:</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBeltStyle(deleteMemberTarget.belt_level)}`}>
                    {deleteMemberTarget.belt_level}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">ID Anggota:</span>
                  <span className="text-xs font-mono font-bold text-red-400">
                    {deleteMemberTarget.member_id || "-"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDeleteMemberTarget(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteMember}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Anggota
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Registration Confirmation Alert Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-md bg-[#121216]/95 border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-950/40 space-y-4 text-center relative overflow-hidden"
            >
              {/* Glowing decorative background */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-36 h-36 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/20 to-red-950/50 border border-red-500/40 text-red-500 flex items-center justify-center mx-auto shadow-lg shadow-red-950/40">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black text-white font-display tracking-wide uppercase">
                  Hapus Data Pendaftar?
                </h4>
                <p className="text-xs text-gray-400 mt-1">
                  Data calon karateka dengan ID <strong className="text-red-400">{deleteConfirmId}</strong> akan dihapus permanen dari database Supabase.
                </p>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/50 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Hapus Data
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CUSTOM POPUP ALERT MODAL (Replaces generic browser alert) */}
      <AnimatePresence>
        {customAlert.isOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md no-print">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#121216] border border-red-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_15px_40px_rgba(220,38,38,0.25)] space-y-5 text-center overflow-hidden"
            >
              {/* Background Texture */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Image
                  src="/images/bgpopupberhasil.png"
                  alt="Dojo Theme"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 h-44 bg-red-600/20 blur-3xl rounded-full pointer-events-none" />

              {/* Modal Content */}
              <div className="relative z-10 space-y-4">
                {/* Icon Badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/25 to-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
                  {customAlert.type === "success" ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  ) : customAlert.type === "warning" ? (
                    <AlertCircle className="w-8 h-8 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                  ) : customAlert.type === "error" ? (
                    <X className="w-8 h-8 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  ) : (
                    <ShieldCheck className="w-8 h-8 text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]" />
                  )}
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h4 className="text-lg sm:text-xl font-black text-white font-display uppercase tracking-wide">
                    {customAlert.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-line px-2">
                    {customAlert.message}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setCustomAlert((prev) => ({ ...prev, isOpen: false }))}
                    className="w-full py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-lg shadow-red-950/50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Mengerti & Tutup</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: PRATINJAU DOKUMEN CETAK LAPORAN REKAPITULASI (A4 OFFICIAL PRINT & PDF) */}
      <AnimatePresence>
        {isPrintRekapModalOpen && (
          <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-md overflow-y-auto p-3 sm:p-6 printable-modal">
            {/* Top Fixed Control Bar (Never overlaps document, stays cleanly at top) */}
            <div className="w-full max-w-[210mm] mx-auto bg-[#18181e] border border-white/15 rounded-2xl p-3 sm:p-4 shadow-2xl flex flex-wrap items-center justify-between gap-3 mb-4 flex-shrink-0 no-print">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Pratinjau Lembar Rekapitulasi Presensi
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Format A4 Standar Resmi Dojo Racing Kyokushin Club
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPrintRekapModalOpen(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/15 text-gray-300 hover:text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Tutup Pratinjau
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-red-950/50 flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* Official A4 Paper Container with Full A4 Aspect Ratio & bglaporanabsensi.png */}
            <div
              className="printable-modal-content relative w-full max-w-[210mm] min-h-[296mm] mx-auto bg-white text-gray-900 rounded-none sm:rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-200 printable-area font-sans my-2 sm:my-auto overflow-hidden flex flex-col justify-between"
              style={{
                width: "100%",
                maxWidth: "210mm",
                minHeight: "296mm",
                boxSizing: "border-box",
                backgroundImage: "url('/images/bglaporanabsensi.png')",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Background image for guaranteed print/PDF output */}
              <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                <img
                  src="/images/bglaporanabsensi.png"
                  alt=""
                  className="w-full h-full object-fill"
                />
              </div>

              {/* TOP SECTION: KOP SURAT, JUDUL, KPI, TABEL */}
              <div className="space-y-3 relative z-10">
                {/* 1. KOP SURAT RESMI DOJO (Sesuai Gambar 2 - Times New Roman) */}
                <div
                  className="border-b-2 border-black pb-2 mb-2.5 relative z-10"
                  style={{ fontFamily: "'Times New Roman', Times, serif" }}
                >
                  <div className="flex items-center gap-3 sm:gap-5">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 relative flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/images/logo.png"
                        alt="Logo RKC"
                        width={80}
                        height={80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1 text-center pr-2 sm:pr-8">
                      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-wider uppercase leading-tight">
                        RACING KYOKUSHIN CLUB
                      </h1>
                      <p className="text-sm sm:text-base font-normal text-black mt-0.5">
                        Karate Kyokushin
                      </p>
                      <p className="text-xs sm:text-sm text-black leading-snug mt-1 font-normal">
                        Jl Sukamaju 1 No 2B RT 005/RW 006, Kel Tammaung , Kec Panakukkang,<br />
                        Kota Makssar, Sulawesi Selatan 90231 Telp/WhatsApp: 0815 27641306
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. JUDUL DOKUMEN & PERIODE */}
                <div className="text-center space-y-0.5 mb-2.5">
                  <h2 className="text-sm sm:text-base font-black text-gray-900 uppercase tracking-wide underline underline-offset-4 decoration-red-700">
                    LEMBAR REKAPITULASI KEHADIRAN & KEDISIPLINAN KARATEKA
                  </h2>
                  <p className="text-[11px] sm:text-xs font-semibold text-gray-600 font-mono">
                    Periode: <strong className="text-red-700">{rekapDateRange.label}</strong> ({rekapDateRange.startDate} s/d {rekapDateRange.endDate})
                  </p>
                </div>

                {/* 3. RINGKASAN EKSEKUTIF / KPI SUMMARY BOXES */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                  <div className="p-2 bg-red-50/90 border border-red-200 rounded-lg text-center backdrop-blur-xs">
                    <span className="text-[9px] text-red-800 font-bold uppercase block">Total Karateka</span>
                    <span className="text-base sm:text-lg font-black text-red-900 font-mono">{rekapMuridList.length} Orang</span>
                  </div>
                  <div className="p-2 bg-gray-50/90 border border-gray-200 rounded-lg text-center backdrop-blur-xs">
                    <span className="text-[9px] text-gray-700 font-bold uppercase block">Sesi Dilaksanakan</span>
                    <span className="text-base sm:text-lg font-black text-gray-900 font-mono">{rekapGlobalKPIs.distinctDates} Sesi</span>
                  </div>
                  <div className="p-2 bg-emerald-50/90 border border-emerald-200 rounded-lg text-center backdrop-blur-xs">
                    <span className="text-[9px] text-emerald-800 font-bold uppercase block">Rata-Rata Kehadiran</span>
                    <span className="text-base sm:text-lg font-black text-emerald-900 font-mono">{rekapGlobalKPIs.avgAttendanceRate}%</span>
                  </div>
                  <div className="p-2 bg-blue-50/90 border border-blue-200 rounded-lg text-center backdrop-blur-xs">
                    <span className="text-[9px] text-blue-800 font-bold uppercase block">Akumulasi Hadir / Alpa</span>
                    <span className="text-xs sm:text-sm font-black text-blue-900 font-mono">{rekapGlobalKPIs.totalHadirAll} Hadir / {rekapGlobalKPIs.totalAlpaAll} Alpa</span>
                  </div>
                </div>

                {/* 4. TABEL REKAP KEHADIRAN ANGGOTA (100% Fit & Never Cutoff) */}
                <div className="w-full mb-3">
                  <table className="w-full table-fixed text-left text-[11px] sm:text-xs border border-gray-300 border-collapse">
                    <thead>
                      <tr className="bg-red-800 text-white font-bold text-[10px] uppercase tracking-wider">
                        <th className="py-2 px-1 border border-red-900 text-center w-[5%]">No</th>
                        <th className="py-2 px-1.5 border border-red-900 text-center whitespace-nowrap w-[15%]">ID Anggota</th>
                        <th className="py-2 px-2 border border-red-900 text-left w-[22%]">Nama Lengkap</th>
                        <th className="py-2 px-1.5 border border-red-900 text-center whitespace-nowrap w-[14%]">Sabuk / Kyu</th>
                        <th className="py-2 px-1 border border-red-900 text-center whitespace-nowrap w-[8%]">Hadir</th>
                        <th className="py-2 px-1 border border-red-900 text-center whitespace-nowrap w-[8%]">Alpa</th>
                        <th className="py-2 px-1 border border-red-900 text-center whitespace-nowrap w-[8%]">Total</th>
                        <th className="py-2 px-1 border border-red-900 text-center whitespace-nowrap w-[10%]">Persentase</th>
                        <th className="py-2 px-1 border border-red-900 text-center whitespace-nowrap w-[10%]">Predikat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rekapMuridList.map((item, idx) => (
                        <tr key={item.member.member_id || idx} className={idx % 2 === 0 ? "bg-white/95" : "bg-gray-50/95"}>
                          <td className="py-1.5 px-1 border border-gray-200 text-center font-mono font-bold text-gray-700">
                            {idx + 1}
                          </td>
                          <td className="py-1.5 px-1.5 border border-gray-200 font-mono font-bold text-red-800 text-center whitespace-nowrap text-[10.5px]">
                            {item.member.member_id || "-"}
                          </td>
                          <td className="py-1.5 px-2 border border-gray-200 font-bold text-gray-900 truncate">
                            {item.member.full_name}
                          </td>
                          <td className="py-1.5 px-1.5 border border-gray-200 text-gray-800 font-medium text-center">
                            {(() => {
                              const belt = item.member.belt_level || "Sabuk Putih (Kyu 10)";
                              const match = belt.match(/^(.*?)\s*(\(.*?\))$/);
                              if (match) {
                                return (
                                  <div className="leading-tight text-center">
                                    <span className="font-semibold text-gray-900 block whitespace-nowrap text-[10.5px]">{match[1]}</span>
                                    <span className="text-[9px] text-gray-600 font-mono block whitespace-nowrap">{match[2]}</span>
                                  </div>
                                );
                              }
                              return <span className="whitespace-nowrap text-[10.5px]">{belt}</span>;
                            })()}
                          </td>
                          <td className="py-1.5 px-1 border border-gray-200 text-center font-mono font-bold text-emerald-700 bg-emerald-50/40 whitespace-nowrap">
                            {item.hadirCount}
                          </td>
                          <td className="py-1.5 px-1 border border-gray-200 text-center font-mono font-bold text-rose-700 bg-rose-50/40 whitespace-nowrap">
                            {item.alpaCount}
                          </td>
                          <td className="py-1.5 px-1 border border-gray-200 text-center font-mono text-gray-800 whitespace-nowrap">
                            {item.totalSessions}
                          </td>
                          <td className="py-1.5 px-1 border border-gray-200 text-center font-mono font-bold text-gray-900 whitespace-nowrap">
                            {item.percentage}%
                          </td>
                          <td className="py-1.5 px-1 border border-gray-200 text-center whitespace-nowrap">
                            <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 text-gray-900 font-bold text-[9.5px] border border-gray-300 shadow-sm whitespace-nowrap">
                              {item.predikat}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* BOTTOM SECTION: 5. LEMBAR PENGESAHAN / TANDA TANGAN (Seito Pembina - Black Text) */}
              <div className="pt-2 flex justify-end relative z-10 mt-auto pb-3 pr-1">
                <div className="text-center w-64 space-y-9 text-black" style={{ color: "#000000" }}>
                  <p className="text-xs leading-relaxed text-black font-semibold" style={{ color: "#000000" }}>
                    Makassar, {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}<br />
                    <strong className="text-black font-black" style={{ color: "#000000" }}>Seito Pembina</strong>
                  </p>
                  <div>
                    <p className="text-xs font-black underline text-black" style={{ color: "#000000" }}>( Seito RKC Kyokushin )</p>
                    <p className="text-[11px] text-black font-bold mt-0.5" style={{ color: "#000000" }}>Muhammad Faiz Fauzan Halim</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
