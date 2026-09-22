"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Calendar,
  User,
  Flame,
  RefreshCw,
  LogOut,
  Users,
  Check,
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  UserCheck,
  Filter,
  ShieldCheck,
  ChevronDown,
  CalendarCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  supabase,
  MemberRecord,
  AttendanceRecord,
  AttendanceSettings,
  KYOKUSHIN_BELT_OPTIONS,
  calculateDistanceMeters,
} from "@/lib/supabase";

// Default settings if database table is not yet configured (Dojo Racing Makassar: Jl. Sukamaju 2, Tamamaung)
const DEFAULT_SETTINGS: AttendanceSettings = {
  open_time: "15:00",
  close_time: "21:00",
  dojo_lat: -5.140223, // Koordinat Resmi Dojo Racing Makassar
  dojo_lng: 119.442611,
  max_radius_meters: 50,
  is_gps_enabled: true,
  is_time_restriction_enabled: true,
  timezone_label: "WITA",
};

const INITIAL_MEMBERS: MemberRecord[] = [];

// Blacklist tracking helpers for permanent deletions across sessions & re-renders
const getDeletedMembers = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rkc_deleted_members") || "[]");
  } catch {
    return [];
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

const getDeletedRegistrations = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("rkc_deleted_registrations") || "[]");
  } catch {
    return [];
  }
};

// Belt badge visual styler
export function getBeltStyle(belt: string) {
  const b = belt.toLowerCase();
  if (b.includes("hitam") || b.includes("dan")) {
    return "bg-black text-amber-300 border-amber-500/60 shadow-black";
  }
  if (b.includes("coklat")) {
    return "bg-amber-950 text-amber-200 border-amber-800 shadow-amber-950";
  }
  if (b.includes("hijau")) {
    return "bg-emerald-950 text-emerald-300 border-emerald-600/60 shadow-emerald-950";
  }
  if (b.includes("kuning")) {
    return "bg-yellow-950 text-yellow-300 border-yellow-500/60 shadow-yellow-950";
  }
  if (b.includes("biru")) {
    return "bg-blue-950 text-blue-300 border-blue-500/60 shadow-blue-950";
  }
  if (b.includes("oranye") || b.includes("orange")) {
    return "bg-orange-950 text-orange-300 border-orange-500/60 shadow-orange-950";
  }
  return "bg-gray-800 text-gray-100 border-white/30 shadow-gray-900"; // Putih
}

export default function AttendancePortal() {
  // Navigation Tabs: Only "absen" | "profil"
  const [activeTab, setActiveTab] = useState<"absen" | "profil">("absen");

  // System settings
  const [isMounted, setIsMounted] = useState(false);
  const [settings, setSettings] = useState<AttendanceSettings>(DEFAULT_SETTINGS);

  // Members list & Search
  const [members, setMembers] = useState<MemberRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState<MemberRecord | null>(null);

  // Form selections
  const [status, setStatus] = useState<"Hadir" | "Izin" | "Sakit">("Hadir");
  const [sessionName, setSessionName] = useState("Reguler");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Today's Attendances list
  const [todayAttendances, setTodayAttendances] = useState<AttendanceRecord[]>([]);

  // Member Login / Profile State
  const [loginInput, setLoginInput] = useState("");
  const [loggedInMember, setLoggedInMember] = useState<MemberRecord | null>(null);
  const [memberHistory, setMemberHistory] = useState<AttendanceRecord[]>([]);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedMonthFilter, setSelectedMonthFilter] = useState("all");

  // GPS Geolocation State
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    accuracy: number;
  } | null>(null);
  const [distanceMeters, setDistanceMeters] = useState<number | null>(null);
  const [isCheckingGPS, setIsCheckingGPS] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  // Live WITA Clock
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [currentDateStr, setCurrentDateStr] = useState("");
  const [isWithinTime, setIsWithinTime] = useState(true);

  // Success Modal
  const [successModalData, setSuccessModalData] = useState<AttendanceRecord | null>(null);

  // Floating toast notification
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "info" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // 1. Initialize Realtime Clock & Load Cached Data
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formatted in Indonesian / WITA (UTC+8)
      const timeFormatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Makassar",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const dateFormatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Makassar",
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const time = timeFormatter.format(now).replace(/:/g, ".");
      const date = dateFormatter.format(now);
      setCurrentTimeStr(time);
      setCurrentDateStr(date);

      // Check if current time falls within open_time and close_time
      if (settings.open_time && settings.close_time) {
        const [openH, openM] = settings.open_time.split(":").map(Number);
        const [closeH, closeM] = settings.close_time.split(":").map(Number);
        const currentTotalMin = now.getHours() * 60 + now.getMinutes();
        const openTotalMin = openH * 60 + (openM || 0);
        const closeTotalMin = closeH * 60 + (closeM || 0);

        if (settings.is_time_restriction_enabled) {
          setIsWithinTime(currentTotalMin >= openTotalMin && currentTotalMin <= closeTotalMin);
        } else {
          setIsWithinTime(true);
        }
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [settings]);

  // 2. Load Settings, Members, and Today Attendances from Supabase & LocalStorage (Realtime & Synced)
  const loadInitialData = useCallback(async () => {
    // 1. Settings
    try {
      const savedSettings = localStorage.getItem("rkc_attendance_settings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      try {
        const { data: dbSettings } = await supabase
          .from("attendance_settings")
          .select("*")
          .single();
        if (dbSettings) {
          setSettings(dbSettings);
          localStorage.setItem("rkc_attendance_settings", JSON.stringify(dbSettings));
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
          const parsedConfig = JSON.parse(configRow.address);
          if (parsedConfig && parsedConfig.dojo_lat) {
            setSettings((prev) => ({ ...prev, ...parsedConfig }));
            localStorage.setItem("rkc_attendance_settings", JSON.stringify({ ...parsedConfig }));
          }
        }
      } catch { }
    } catch (e) {
      // use default
    }

    // 2. Members List (Merge from Supabase & LocalStorage - ONLY ACC / Diterima & NOT DELETED)
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

      const isMemberDeleted = (m: MemberRecord | { member_id?: string; id?: string; full_name?: string; phone?: string; whatsapp?: string }) => {
        const id = (m.id || "").toLowerCase().trim();
        const memId = (m.member_id || "").toLowerCase().trim();
        const name = (m.full_name || "").toLowerCase().trim();
        const rawPhone = ("phone" in m && m.phone ? m.phone : "whatsapp" in m && m.whatsapp ? m.whatsapp : "") as string;
        const phone = rawPhone.replace(/\D/g, "");
        return (
          (memId !== "" && deletedMems.includes(memId)) ||
          (id !== "" && deletedMems.includes(id)) ||
          (name !== "" && deletedMems.includes(name)) ||
          (phone !== "" && phone.length >= 8 && deletedMems.includes(phone))
        );
      };

      const savedMembers = localStorage.getItem("rkc_members_list");
      let localList: MemberRecord[] = savedMembers
        ? JSON.parse(savedMembers).filter((m: MemberRecord) => !isMemberDeleted(m))
        : [];

      // Fetch from Supabase members table (in isolated try block)
      try {
        const { data: dbMembers, error: memErr } = await supabase.from("members").select("*");
        if (!memErr && dbMembers && dbMembers.length > 0) {
          dbMembers
            .filter((dbM: MemberRecord) => !isMemberDeleted(dbM))
            .forEach((dbM: MemberRecord) => {
              const idx = localList.findIndex(
                (m) =>
                  (m.member_id && dbM.member_id && m.member_id.toLowerCase() === dbM.member_id.toLowerCase()) ||
                  (m.id && dbM.id && m.id === dbM.id) ||
                  (m.full_name && dbM.full_name && m.full_name.toLowerCase().trim() === dbM.full_name.toLowerCase().trim())
              );
              if (idx >= 0) {
                localList[idx] = { ...localList[idx], ...dbM };
              } else {
                localList.push(dbM);
              }
            });
        }
      } catch (err) {
        console.warn("Supabase members error:", err);
      }

      // Also fetch from approved registrations (Diterima)
      try {
        const { data: regMembers, error: regErr } = await supabase
          .from("registrations")
          .select("reg_id, full_name, whatsapp, gender, status, registration_status, motivation, address, created_at")
          .eq("registration_status", "Diterima");

        if (!regErr && regMembers && regMembers.length > 0) {
          regMembers
            .filter(
              (r) =>
                r.reg_id !== "SETTINGS-CONFIG" &&
                r.reg_id !== "DELETED_MEMBERS_CONFIG" &&
                r.status !== "ATTENDANCE_RECORD" &&
                r.status !== "SYSTEM_TOMBSTONE" &&
                !deletedRegs.includes(r.reg_id) &&
                !isMemberDeleted({ member_id: r.reg_id, full_name: r.full_name, phone: r.whatsapp })
            )
            .forEach((r) => {
              const exists = localList.some(
                (m) =>
                  m.full_name.toLowerCase() === r.full_name.toLowerCase() ||
                  (r.whatsapp && m.phone === r.whatsapp) ||
                  (r.reg_id && m.member_id === r.reg_id)
              );
              if (!exists) {
                localList.push({
                  id: `mem-${r.reg_id}`,
                  member_id: r.reg_id || `RKC-${Math.floor(100 + Math.random() * 900)}`,
                  full_name: r.full_name,
                  belt_level: r.motivation && r.motivation.includes("Sabuk") ? r.motivation : "Sabuk Putih (Kyu 10)",
                  phone: r.whatsapp,
                  dojo_branch: r.address || "Racing Kyokushin Club",
                  gender: r.gender,
                  is_active: true,
                  joined_date: r.created_at ? r.created_at.split("T")[0] : undefined,
                });
              }
            });
        }
      } catch (err) {
        console.warn("Supabase registrations error:", err);
      }

      // Also check offline registrations
      try {
        const savedOffline = localStorage.getItem("rkc_offline_registrations");
        const statusMap: Record<string, string> = JSON.parse(localStorage.getItem("rkc_registration_status_map") || "{}");
        if (savedOffline) {
          const offlineList: any[] = JSON.parse(savedOffline);
          offlineList
            .filter((r) => {
              const status = statusMap[r.reg_id] || (r.id ? statusMap[r.id] : undefined) || r.registration_status;
              return (
                status === "Diterima" &&
                r.reg_id !== "SETTINGS-CONFIG" &&
                r.reg_id !== "DELETED_MEMBERS_CONFIG" &&
                r.status !== "ATTENDANCE_RECORD" &&
                !deletedRegs.includes(r.reg_id) &&
                !isMemberDeleted({ member_id: r.reg_id, full_name: r.full_name, phone: r.whatsapp })
              );
            })
            .forEach((r) => {
              const exists = localList.some(
                (m) =>
                  m.full_name.toLowerCase() === r.full_name.toLowerCase() ||
                  (r.whatsapp && m.phone === r.whatsapp) ||
                  (r.reg_id && m.member_id === r.reg_id)
              );
              if (!exists) {
                localList.push({
                  id: `mem-${r.reg_id}`,
                  member_id: r.reg_id,
                  full_name: r.full_name,
                  belt_level: r.motivation && r.motivation.includes("Sabuk") ? r.motivation : "Sabuk Putih (Kyu 10)",
                  phone: r.whatsapp,
                  dojo_branch: r.address || "Racing Kyokushin Club",
                  gender: r.gender,
                  is_active: true,
                  joined_date: r.created_at ? r.created_at.split("T")[0] : undefined,
                });
              }
            });
        }
      } catch { }

      const finalList = localList.filter((m) => !isMemberDeleted(m));
      setMembers(finalList);
      localStorage.setItem("rkc_members_list", JSON.stringify(finalList));

      // Clear selected member if deleted
      setSelectedMember((prev) => (prev && isMemberDeleted(prev) ? null : prev));

      // Sync any active non-deleted local members to Supabase so all other browsers/devices receive them immediately
      for (const m of finalList) {
        if (m.member_id && m.full_name && !isMemberDeleted(m)) {
          try {
            await supabase.from("registrations").upsert(
              {
                reg_id: m.member_id,
                full_name: m.full_name,
                gender: m.gender || "Laki-laki",
                whatsapp: m.phone || "-",
                status: "Fix",
                registration_status: "Diterima",
                motivation: m.belt_level || "Sabuk Putih (Kyu 10)",
                birth_date: "2000-01-01",
                age: "20",
                address: m.dojo_branch || "Racing Kyokushin Club",
              },
              { onConflict: "reg_id" }
            );
          } catch { }
        }
      }
    } catch (e) {
      console.warn("Error loading members:", e);
    }

    // 3. Today's Attendances
    const now = new Date();
    const witaFormatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const todayISO = witaFormatter.format(now); // YYYY-MM-DD
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

      const savedToday = localStorage.getItem(`rkc_attendances_${todayISO}`);
      let todayList: AttendanceRecord[] = savedToday
        ? JSON.parse(savedToday).filter((a: AttendanceRecord) => !isAttDeleted(a))
        : [];

      // Fetch from Supabase attendances table
      try {
        const { data: dbAttendances } = await supabase
          .from("attendances")
          .select("*")
          .eq("date_str", todayISO)
          .order("created_at", { ascending: false });

        if (dbAttendances && dbAttendances.length > 0) {
          dbAttendances
            .filter((dbAtt: AttendanceRecord) => !isAttDeleted(dbAtt))
            .forEach((dbAtt: AttendanceRecord) => {
              if (
                !todayList.some(
                  (a) =>
                    a.id === dbAtt.id ||
                    (a.member_name.toLowerCase() === dbAtt.member_name.toLowerCase() &&
                      a.date_str === dbAtt.date_str)
                )
              ) {
                todayList.unshift(dbAtt);
              }
            });
        }
      } catch { }

      // Fetch from Supabase registrations fallback table
      try {
        const { data: cloudAtts } = await supabase
          .from("registrations")
          .select("address")
          .eq("status", "ATTENDANCE_RECORD")
          .eq("whatsapp", todayISO);

        if (cloudAtts && cloudAtts.length > 0) {
          cloudAtts.forEach((row) => {
            try {
              if (row.address) {
                const parsed: AttendanceRecord = JSON.parse(row.address);
                if (parsed && !isAttDeleted(parsed)) {
                  if (
                    !todayList.some(
                      (a) =>
                        a.id === parsed.id ||
                        (a.member_name.toLowerCase() === parsed.member_name.toLowerCase() &&
                          a.date_str === parsed.date_str)
                    )
                  ) {
                    todayList.unshift(parsed);
                  }
                }
              }
            } catch { }
          });
        }
      } catch { }

      const finalToday = todayList.filter((a) => !isAttDeleted(a));
      setTodayAttendances(finalToday);
      localStorage.setItem(`rkc_attendances_${todayISO}`, JSON.stringify(finalToday));

      // Push any local attendances to cloud so Admin can immediately read them
      for (const att of finalToday) {
        try {
          await supabase.from("registrations").upsert(
            {
              reg_id: `ATT-${att.id}`,
              full_name: att.member_name,
              gender: "Laki-laki",
              birth_date: "2000-01-01",
              age: "20",
              address: JSON.stringify(att),
              whatsapp: att.date_str,
              status: "ATTENDANCE_RECORD",
              registration_status: "Diterima",
              motivation: att.session_name || "Reguler",
            },
            { onConflict: "reg_id" }
          );
        } catch { }
      }
    } catch (e) {
      // local
    }

    // Check saved member login session
    try {
      const savedAuthMember = localStorage.getItem("rkc_logged_in_karateka");
      if (savedAuthMember) {
        const parsed = JSON.parse(savedAuthMember);
        const deletedMems = getDeletedMembers();
        const isDeleted =
          deletedMems.includes((parsed.member_id || "").toLowerCase()) ||
          deletedMems.includes((parsed.id || "").toLowerCase()) ||
          deletedMems.includes((parsed.full_name || "").toLowerCase().trim());
        if (isDeleted) {
          localStorage.removeItem("rkc_logged_in_karateka");
          setLoggedInMember(null);
        } else {
          setLoggedInMember(parsed);
          loadMemberHistory(parsed);
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
    loadInitialData();

    // Re-fetch when user switches tabs or window gets focus
    window.addEventListener("focus", loadInitialData);
    const handleStorageChange = (e: StorageEvent) => {
      if (
        e.key === "rkc_members_list" ||
        e.key === "rkc_attendance_settings" ||
        e.key?.startsWith("rkc_attendances_")
      ) {
        loadInitialData();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("focus", loadInitialData);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [loadInitialData]);

  // Manual / Instant GPS Calibration Refresh
  const refreshGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError("GPS tidak didukung pada browser Anda.");
      return;
    }
    setIsCheckingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);
        setUserLocation({
          lat: userLat,
          lng: userLng,
          accuracy,
        });

        const dist = calculateDistanceMeters(
          userLat,
          userLng,
          settings.dojo_lat,
          settings.dojo_lng
        );
        setDistanceMeters(dist);
        setIsCheckingGPS(false);
        setGpsError(null);
      },
      (err) => {
        setIsCheckingGPS(false);
        setGpsError(err.message || "Gagal mendapatkan izin lokasi GPS.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );
  }, [settings.dojo_lat, settings.dojo_lng]);

  // 3. Geolocation GPS Checker (High accuracy live satellite tracking)
  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsError("GPS tidak didukung pada browser Anda.");
      return;
    }

    setIsCheckingGPS(true);

    // Initial high-accuracy fetch
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);
        setUserLocation({
          lat: userLat,
          lng: userLng,
          accuracy,
        });

        const dist = calculateDistanceMeters(
          userLat,
          userLng,
          settings.dojo_lat,
          settings.dojo_lng
        );
        setDistanceMeters(dist);
        setIsCheckingGPS(false);
        setGpsError(null);
      },
      (err) => {
        setIsCheckingGPS(false);
        setGpsError(err.message || "Gagal mendapatkan izin lokasi GPS.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );

    // Continuous watch position to refine satellite fix accuracy
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;
        const accuracy = Math.round(pos.coords.accuracy);
        setUserLocation({
          lat: userLat,
          lng: userLng,
          accuracy,
        });

        const dist = calculateDistanceMeters(
          userLat,
          userLng,
          settings.dojo_lat,
          settings.dojo_lng
        );
        setDistanceMeters(dist);
        setIsCheckingGPS(false);
        setGpsError(null);
      },
      () => { },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 3000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [settings.dojo_lat, settings.dojo_lng]);

  // 4. Lock body scroll when Pop-up Modal is open
  useEffect(() => {
    if (selectedMember) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedMember]);

  // Filtered members for instant search and browsing below search bar
  const displayMembers = useMemo(() => {
    const deletedMems = getDeletedMembers();
    const isMemberDeleted = (m: MemberRecord) => {
      const id = (m.id || "").toLowerCase().trim();
      const memId = (m.member_id || "").toLowerCase().trim();
      const name = (m.full_name || "").toLowerCase().trim();
      const phone = (m.phone || "").replace(/\D/g, "");
      return (
        (memId !== "" && deletedMems.includes(memId)) ||
        (id !== "" && deletedMems.includes(id)) ||
        (name !== "" && deletedMems.includes(name)) ||
        (phone !== "" && phone.length >= 8 && deletedMems.includes(phone))
      );
    };

    const validMembers = members.filter((m) => !isMemberDeleted(m));
    if (!searchQuery.trim()) return validMembers;
    const q = searchQuery.toLowerCase().trim();
    return validMembers.filter((m) => {
      return (
        (m.full_name || "").toLowerCase().includes(q) ||
        (m.belt_level || "").toLowerCase().includes(q)
      );
    });
  }, [members, searchQuery]);

  // Load member history across all dates
  const loadMemberHistory = async (member: MemberRecord) => {
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

      const allHistory: AttendanceRecord[] = [];

      // 1. Check Supabase attendances table
      try {
        const { data } = await supabase
          .from("attendances")
          .select("*")
          .or(`member_name.ilike.%${member.full_name}%,member_id.eq.${member.member_id || ""}`)
          .order("date_str", { ascending: false });

        if (data && data.length > 0) {
          data
            .filter((a: AttendanceRecord) => !isAttDeleted(a))
            .forEach((a) => {
              if (!allHistory.some((h) => h.id === a.id || (h.member_name.toLowerCase() === a.member_name.toLowerCase() && h.date_str === a.date_str))) {
                allHistory.push(a);
              }
            });
        }
      } catch { }

      // 2. Check Supabase registrations fallback table
      try {
        const { data: cloudHist } = await supabase
          .from("registrations")
          .select("address")
          .eq("status", "ATTENDANCE_RECORD")
          .ilike("full_name", `%${member.full_name}%`);

        if (cloudHist && cloudHist.length > 0) {
          cloudHist.forEach((row) => {
            try {
              if (row.address) {
                const parsed: AttendanceRecord = JSON.parse(row.address);
                if (
                  parsed &&
                  !isAttDeleted(parsed) &&
                  (parsed.member_name.toLowerCase().trim() === member.full_name.toLowerCase().trim() ||
                    (member.member_id && parsed.member_id === member.member_id))
                ) {
                  if (!allHistory.some((h) => h.id === parsed.id || (h.member_name.toLowerCase() === parsed.member_name.toLowerCase() && h.date_str === parsed.date_str))) {
                    allHistory.push(parsed);
                  }
                }
              }
            } catch { }
          });
        }
      } catch { }

      // 3. Fallback scan localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith("rkc_attendances_")) {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const list: AttendanceRecord[] = JSON.parse(itemStr);
            list.forEach((att) => {
              if (
                !isAttDeleted(att) &&
                (att.member_name.toLowerCase().trim() === member.full_name.toLowerCase().trim() ||
                  (member.member_id && att.member_id === member.member_id))
              ) {
                if (!allHistory.some((h) => h.id === att.id || (h.member_name.toLowerCase() === att.member_name.toLowerCase() && h.date_str === att.date_str))) {
                  allHistory.push(att);
                }
              }
            });
          }
        }
      }

      allHistory.sort((a, b) => b.date_str.localeCompare(a.date_str));
      setMemberHistory(allHistory);
    } catch (e) {
      console.warn("Error loading member history:", e);
    }
  };

  // Handle Member Login for Profile (Menggunakan ID Anggota / No. WhatsApp / Nama)
  const handleMemberLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginInput.trim()) {
      setLoginError("Masukkan ID Anggota Anda.");
      return;
    }

    setIsLoggingIn(true);
    const cleanId = loginInput.trim().toLowerCase();
    const cleanIdNoHyphen = cleanId.replace(/[^a-z0-9]/g, "");

    // Match by ID Anggota (e.g. RKC-2026-8602, 8602, RKC20268602), reg_id, phone digits, or full name
    const found = members.find((m) => {
      const memId = (m.member_id || "").trim().toLowerCase();
      const memIdNoHyphen = memId.replace(/[^a-z0-9]/g, "");
      const id = (m.id || "").trim().toLowerCase();
      const phoneDigits = (m.phone || "").replace(/\D/g, "");
      const inputDigits = cleanId.replace(/\D/g, "");
      const fullName = (m.full_name || "").trim().toLowerCase();

      return (
        (memId && memId === cleanId) ||
        (memIdNoHyphen && cleanIdNoHyphen.length >= 3 && memIdNoHyphen === cleanIdNoHyphen) ||
        (memId && cleanId.length >= 3 && (memId.includes(cleanId) || cleanId.includes(memId))) ||
        (id && id === cleanId) ||
        (id && id === `mem-${cleanId}`) ||
        (inputDigits.length >= 4 && (memId.includes(inputDigits) || (inputDigits.length >= 8 && phoneDigits.includes(inputDigits)))) ||
        (fullName && fullName === cleanId) ||
        (fullName && cleanId.length >= 3 && fullName.includes(cleanId))
      );
    });

    if (found) {
      setLoggedInMember(found);
      localStorage.setItem("rkc_logged_in_karateka", JSON.stringify(found));
      loadMemberHistory(found);
      showToast(`Selamat datang, ${found.full_name}!`, "success");
      setLoginInput("");
    } else {
      setLoginError("ID Anggota tidak ditemukan. Pastikan ID Anggota sudah sesuai.");
    }
    setIsLoggingIn(false);
  };

  const handleMemberLogout = () => {
    setLoggedInMember(null);
    setMemberHistory([]);
    localStorage.removeItem("rkc_logged_in_karateka");
    showToast("Anda telah keluar dari profil.", "info");
  };

  // Generate distinct month list from history for dropdown
  const monthOptions = useMemo(() => {
    const setOfMonths = new Set<string>();
    memberHistory.forEach((h) => {
      if (h.date_str) {
        // e.g. "2026-09"
        const ym = h.date_str.slice(0, 7);
        setOfMonths.add(ym);
      }
    });

    // Ensure current month is included
    const currentYM = new Date().toISOString().slice(0, 7);
    setOfMonths.add(currentYM);

    const sorted = Array.from(setOfMonths).sort((a, b) => b.localeCompare(a));
    return sorted.map((ym) => {
      const [year, month] = ym.split("-");
      const d = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
      const label = d.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
      return { value: ym, label };
    });
  }, [memberHistory]);

  // Filtered history by selected month
  const filteredMemberHistory = useMemo(() => {
    if (selectedMonthFilter === "all") return memberHistory;
    return memberHistory.filter((h) => h.date_str && h.date_str.startsWith(selectedMonthFilter));
  }, [memberHistory, selectedMonthFilter]);

  // Profile Monthly stats
  const profileMonthlyStats = useMemo(() => {
    const list = filteredMemberHistory;
    const total = list.length;
    const hadirCount = list.filter((a) => a.status === "Hadir").length;
    const alpaCount = list.filter((a) => a.status !== "Hadir").length;
    const hadirPct = total > 0 ? Math.round((hadirCount / total) * 100) : 0;

    return {
      total,
      hadirCount,
      alpaCount,
      hadirPct,
    };
  }, [filteredMemberHistory]);

  // Handle Submit Check-in (Approve Kehadiran)
  const handleCheckIn = async () => {
    if (!selectedMember) {
      showToast("Pilih nama anggota terlebih dahulu!", "error");
      return;
    }

    // Time restriction check
    if (settings.is_time_restriction_enabled && !isWithinTime) {
      showToast(
        `Presensi saat ini ditutup. Jam latihan: ${settings.open_time} - ${settings.close_time} WITA.`,
        "error"
      );
      return;
    }

    // GPS restriction check (Only within Dojo radius)
    if (settings.is_gps_enabled) {
      if (distanceMeters !== null && distanceMeters > settings.max_radius_meters) {
        showToast(
          `Jarak Anda (${distanceMeters}m) berada di luar radius Dojo (Maksimal ${settings.max_radius_meters}m).`,
          "error"
        );
        return;
      }
    }

    const now = new Date();
    const witaFormatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Makassar",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const todayISO = witaFormatter.format(now); // YYYY-MM-DD in WITA

    // Prevent double check-in on the same day for the same member
    const alreadyAttended = todayAttendances.some(
      (a) =>
        (a.member_id && selectedMember.member_id && a.member_id.toLowerCase() === selectedMember.member_id.toLowerCase()) ||
        (a.member_name && selectedMember.full_name && a.member_name.toLowerCase().trim() === selectedMember.full_name.toLowerCase().trim())
    );

    if (alreadyAttended) {
      showToast(`${selectedMember.full_name} sudah melakukan presensi hari ini!`, "info");
      setSelectedMember(null);
      return;
    }

    setIsSubmitting(true);
    const timeFormatted = now.toLocaleTimeString("id-ID", {
      timeZone: "Asia/Makassar",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      member_id: selectedMember.member_id || `RKC-${Math.floor(100 + Math.random() * 900)}`,
      member_name: selectedMember.full_name,
      belt_level: selectedMember.belt_level,
      dojo_branch: selectedMember.dojo_branch,
      session_name: sessionName,
      checkin_time: timeFormatted,
      date_str: todayISO,
      status: "Hadir",
      distance_meters: distanceMeters,
      latitude: userLocation?.lat || null,
      longitude: userLocation?.lng || null,
      created_at: now.toISOString(),
    };

    // 1. Update Today's list in state & local storage
    const updatedToday = [newRecord, ...todayAttendances.filter((a) => a.member_name !== selectedMember.full_name)];
    setTodayAttendances(updatedToday);
    localStorage.setItem(`rkc_attendances_${todayISO}`, JSON.stringify(updatedToday));

    // 2. Save to Supabase attendances table (if table exists)
    try {
      await supabase.from("attendances").insert([newRecord]);
    } catch (err) {
      console.warn("Supabase attendance insert:", err);
    }

    // 3. Save to Supabase registrations table as a universal cross-browser record
    try {
      await supabase.from("registrations").upsert(
        {
          reg_id: `ATT-${newRecord.id}`,
          full_name: newRecord.member_name,
          gender: "Laki-laki",
          birth_date: "2000-01-01",
          age: "20",
          address: JSON.stringify(newRecord),
          whatsapp: newRecord.date_str,
          status: "ATTENDANCE_RECORD",
          registration_status: "Diterima",
          motivation: newRecord.session_name || "Reguler",
        },
        { onConflict: "reg_id" }
      );
    } catch (e) {
      console.warn("Cloud attendance sync notice:", e);
    }

    // 3. Trigger Confetti & Popup
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#dc2626", "#ffffff", "#f59e0b"],
    });

    setSuccessModalData(newRecord);
    setIsSubmitting(false);
    setSelectedMember(null);
    setSearchQuery("");

    // If logged in as this member, refresh history
    if (loggedInMember && loggedInMember.full_name === selectedMember.full_name) {
      loadMemberHistory(loggedInMember);
    }
  };

  return (
    <div className="w-full space-y-5 selection:bg-red-600 selection:text-white">
      {/* ======================================================== */}
      {/* BRAND HEADER BANNER                                      */}
      {/* ======================================================== */}
      <div className="flex items-center justify-between bg-[#121216]/80 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-black/60 border border-red-500/40 p-1 flex items-center justify-center shadow-lg shadow-red-950/40 flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="RKC Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-500 font-display">
                PRESENSI LATIHAN DOJO
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-black text-white uppercase italic tracking-wide font-display leading-tight">
              ABSENSI KARATEKA
            </h1>
            <p className="text-gray-400 text-[11px] sm:text-xs">
              Racing Kyokushin Club
            </p>
          </div>
        </div>

        {/* Small badge */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/30">
            Dojo Racing
          </span>
          <span className="text-[10px] text-gray-500 mt-0.5">WITA (UTC+8)</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TIME, SESSION STATUS & GPS CARDS (Separated & Neat)      */}
      {/* ======================================================== */}
      <div className="space-y-3">
        {/* Row 1: Grid 2 Cards (Status Sesi Latihan DI ATAS & WITA Realtime Clock) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card 1: Status Sesi Latihan (Di Atas) */}
          <div className={`border rounded-2xl p-4 shadow-xl flex items-center justify-between gap-3 backdrop-blur-xl ${isWithinTime
            ? "bg-[#121216]/80 border-emerald-500/30"
            : "bg-[#121216]/80 border-amber-500/30"
            }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isWithinTime
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                }`}>
                {isWithinTime ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
              </div>
              <div>
                <span className={`text-xs sm:text-sm font-extrabold uppercase tracking-wide block ${isWithinTime ? "text-emerald-400" : "text-amber-400"
                  }`}>
                  {isWithinTime ? "Sesi Latihan Buka" : "Sesi Latihan Tutup"}
                </span>
                <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                  Jadwal: {settings.open_time} - {settings.close_time} WITA
                </p>
              </div>
            </div>

            <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isWithinTime ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`} />
          </div>

          {/* Card 2: Waktu & Tanggal Realtime WITA */}
          <div className="bg-[#121216]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 shadow-xl flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 flex-shrink-0">
              <Clock className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 font-display font-black text-lg sm:text-xl text-white tracking-wider leading-tight" suppressHydrationWarning>
                <span suppressHydrationWarning>{currentTimeStr || "--.--.--"}</span>
                <span className="text-xs font-semibold text-red-400">WITA</span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-400 font-medium capitalize mt-0.5" suppressHydrationWarning>
                {currentDateStr || "Memuat tanggal..."}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Location & Geolocation Radius 50m Status */}
        <div className="bg-[#121216]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 sm:p-4 shadow-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${distanceMeters !== null && distanceMeters <= settings.max_radius_meters
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                }`}
            >
              <MapPin className="w-4 h-4" />
            </div>

            <div>
              <div className="font-bold flex items-center gap-1.5 text-xs sm:text-sm">
                {isCheckingGPS ? (
                  <span className="text-gray-300">Mendeteksi lokasi GPS...</span>
                ) : distanceMeters !== null ? (
                  distanceMeters <= settings.max_radius_meters ? (
                    <span className="text-emerald-400">
                      Dalam Area Dojo ({distanceMeters}m / Max {settings.max_radius_meters}m)
                    </span>
                  ) : (
                    <span className="text-rose-400">
                      Di Luar Area Dojo ({distanceMeters}m / Max {settings.max_radius_meters}m)
                    </span>
                  )
                ) : (
                  <span className="text-gray-400">Validasi Radius 50m Dojo</span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Dojo Racing Makassar &bull; {userLocation?.accuracy ? `Akurasi ±${userLocation.accuracy}m` : "GPS Aktif"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={refreshGPS}
              disabled={isCheckingGPS}
              className="p-1.5 sm:p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center gap-1 text-[11px]"
              title="Perbarui / Akuratkan Titik GPS"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isCheckingGPS ? "animate-spin text-red-500" : "text-gray-300"}`} />
              <span className="hidden md:inline">Perbarui GPS</span>
            </button>

            <span className="text-[10px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10 hidden sm:inline-block">
              Radius: {settings.max_radius_meters}m
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2 MAIN TABS: ABSEN | PROFIL                              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-2 gap-2 bg-[#121216]/80 backdrop-blur-xl p-1.5 rounded-2xl border border-white/15 shadow-lg">
        {/* Tab 1: Absen */}
        <button
          onClick={() => setActiveTab("absen")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "absen"
            ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-lg shadow-red-950/60"
            : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Absen</span>
        </button>

        {/* Tab 2: Profil */}
        <button
          onClick={() => setActiveTab("profil")}
          className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === "profil"
            ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white shadow-lg shadow-red-950/60"
            : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
        >
          <User className="w-4 h-4" />
          <span>Profil</span>
          {loggedInMember && (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB CONTENT 1: FORM ABSENSI CEPAT                        */}
      {/* ======================================================== */}
      {activeTab === "absen" && (
        <div className="space-y-4">
          {/* 1. Search Bar */}
          <div className="bg-[#121216]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <label className="block text-xs font-bold text-gray-200 uppercase tracking-wider">
              Cari Nama Karateka
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-red-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ketik nama murid/karateka (contoh: Faiz)..."
                className="w-full bg-[#18181e]/80 text-white text-xs sm:text-sm rounded-xl py-3 pl-10 pr-10 border border-white/15 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500 font-medium"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 2. List of Karateka directly below search bar (No hover effects) */}
          <div className="bg-[#121216]/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                  {searchQuery ? "Hasil Pencarian Karateka" : "Daftar Nama Karateka (Pilih untuk Absen)"}
                </span>
              </div>
              <span
                className="text-[11px] font-mono text-gray-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/10"
                suppressHydrationWarning
              >
                {isMounted ? displayMembers.length : 0} Karateka
              </span>
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1 [scrollbar-width:thin]">
              {displayMembers.length === 0 ? (
                <div className="py-8 text-center text-gray-400 space-y-1">
                  <p className="text-xs">
                    {searchQuery
                      ? `Karateka dengan kata kunci "${searchQuery}" tidak ditemukan.`
                      : "Belum ada anggota yang terdaftar."}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    Pendaftar baru akan otomatis muncul setelah disetujui (ACC) oleh Admin.
                  </p>
                </div>
              ) : (
                displayMembers.map((m) => {
                  const hasCheckedInToday = todayAttendances.some(
                    (a) =>
                      (a.member_id && m.member_id && a.member_id.toLowerCase() === m.member_id.toLowerCase()) ||
                      (a.member_name && m.full_name && a.member_name.toLowerCase().trim() === m.full_name.toLowerCase().trim())
                  );

                  return (
                    <div
                      key={m.id || m.member_id || m.full_name}
                      onClick={() => {
                        if (hasCheckedInToday) {
                          showToast(`${m.full_name} sudah melakukan presensi hari ini!`, "info");
                          return;
                        }
                        setSelectedMember(m);
                      }}
                      className={`p-3 sm:p-3.5 bg-[#18181e]/80 border rounded-xl flex items-center justify-between transition-all shadow-sm ${hasCheckedInToday
                          ? "border-emerald-500/30 opacity-80 cursor-default"
                          : "border-white/5 cursor-pointer hover:border-red-500/40"
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm flex-shrink-0 shadow-md ${hasCheckedInToday
                              ? "bg-emerald-600 text-white"
                              : "bg-gradient-to-br from-red-600 to-rose-700 text-white"
                            }`}
                        >
                          {hasCheckedInToday ? <Check className="w-5 h-5 text-white" /> : m.full_name.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-bold text-white">
                              {m.full_name}
                            </p>
                            {hasCheckedInToday && (
                              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.2 rounded-full flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Sudah Absen
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-gray-400 font-mono mt-0.5">
                            <span className="text-gray-400">{m.dojo_branch || "Racing Kyokushin Club"}</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-sm flex-shrink-0 ${getBeltStyle(
                          m.belt_level
                        )}`}
                      >
                        {m.belt_level}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ======================================================== */}
          {/* POP-UP MODAL: KONFIRMASI PRESENSI ("Saya Hadir Latihan") */}
          {/* ======================================================== */}
          <AnimatePresence>
            {selectedMember && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-hidden touch-none select-none">
                {/* Backdrop Overlay Click to Close */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setSelectedMember(null)}
                />

                {/* Modal Container with Custom Background Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-full max-w-md bg-black/85 border border-white/20 rounded-3xl p-5 sm:p-6 shadow-[0_0_60px_rgba(0,0,0,0.95)] space-y-5 overflow-hidden"
                >
                  {/* Background Image of Pop-up Modal */}
                  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
                    <Image
                      src="/images/popupabsensi.png"
                      alt="Pop up Absensi Background"
                      fill
                      priority
                      className="object-cover object-center opacity-95"
                    />
                    <div className="absolute inset-0 bg-black/30 pointer-events-none" />
                  </div>

                  {/* Header Title & Close Button */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
                    <span className="text-xs sm:text-sm font-black text-white uppercase tracking-wider font-display">
                      Konfirmasi Absensi
                    </span>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white flex items-center justify-center transition-colors cursor-pointer backdrop-blur-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Member Details Card */}
                  <div className="relative z-10 bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center font-extrabold text-lg shadow-lg flex-shrink-0">
                          {selectedMember.full_name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm sm:text-base font-bold text-white truncate">
                            {selectedMember.full_name}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono mt-0.5">
                            {selectedMember.dojo_branch || "Racing Kyokushin Club"}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-md flex-shrink-0 ${getBeltStyle(
                          selectedMember.belt_level
                        )}`}
                      >
                        {selectedMember.belt_level}
                      </span>
                    </div>

                    {/* Branch and Session info */}
                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-300">
                      <span>{selectedMember.dojo_branch}</span>
                      <span className="font-mono text-emerald-400 font-semibold tracking-wider">
                        {currentTimeStr ? `${currentTimeStr.slice(0, 5)} WITA` : "WITA"}
                      </span>
                    </div>
                  </div>

                  {/* Action Button: Saya Hadir Latihan */}
                  <div className="relative z-10">
                    <button
                      type="button"
                      onClick={handleCheckIn}
                      disabled={isSubmitting}
                      className="w-full btn-shimmer bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:via-rose-500 hover:to-red-500 text-white font-black py-3.5 px-5 rounded-2xl shadow-[0_0_25px_rgba(220,38,38,0.55)] transition-all flex items-center justify-center gap-2.5 text-sm sm:text-base cursor-pointer disabled:opacity-50 tracking-wide uppercase italic font-display"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Mencatat Kehadiran...</span>
                        </>
                      ) : (
                        <>
                          <span>Saya Hadir Latihan</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB CONTENT 2: PROFIL KARATEKA & REKAP BULANAN           */}
      {/* ======================================================== */}
      {activeTab === "profil" && (
        <div className="space-y-5">
          {/* If NOT LOGGED IN -> Show Login Form */}
          {!loggedInMember ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#121216] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 text-center max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-red-950/50">
                <User className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase italic font-display">
                  LOGIN PROFIL KARATEKA
                </h3>
                <p className="text-xs text-gray-400">
                  Masuk dengan ID Anggota untuk melihat riwayat kehadiran & profil latihan Anda.
                </p>
              </div>

              <form onSubmit={handleMemberLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-gray-300">
                    ID Anggota <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={loginInput}
                    onChange={(e) => {
                      setLoginInput(e.target.value);
                      if (loginError) setLoginError("");
                    }}
                    placeholder="Contoh: RKC-2026-8500"
                    className="w-full bg-[#18181e] text-white text-xs sm:text-sm rounded-xl py-3 px-3.5 border border-white/15 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium uppercase placeholder:normal-case"
                    autoFocus
                  />
                </div>

                {loginError && (
                  <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full btn-shimmer bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg transition-all cursor-pointer"
                >
                  {isLoggingIn ? "Memeriksa Data..." : "Masuk ke Profil"}
                </button>
              </form>

              <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 leading-relaxed text-left">
                <strong className="text-gray-300">Info Akun:</strong> Akun dan ID Anggota karateka dibuat otomatis oleh sistem saat pendaftaran formulir Anda telah diverifikasi oleh admin Dojo. Gunakan ID Anggota tersebut untuk login di profil.
              </div>
            </motion.div>
          ) : (
            /* If LOGGED IN -> Show Karateka Profile & Monthly History */
            <div className="space-y-5">
              {/* Member Profile Card */}
              <div className="bg-[#121216] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-red-950/50 flex-shrink-0">
                      {loggedInMember.full_name.charAt(0)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base sm:text-lg font-extrabold text-white">
                          {loggedInMember.full_name}
                        </h2>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-sm ${getBeltStyle(
                            loggedInMember.belt_level
                          )}`}
                        >
                          {loggedInMember.belt_level}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono">
                        ID: <strong className="text-red-400">{loggedInMember.member_id || "-"}</strong> &bull; WA: {loggedInMember.phone}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {loggedInMember.dojo_branch} &bull; Status: <span className="text-emerald-400 font-semibold">Aktif</span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleMemberLogout}
                    className="self-start sm:self-auto px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Keluar Akun</span>
                  </button>
                </div>
              </div>

              {/* Month Filter & Monthly Stats */}
              <div className="bg-[#121216] border border-white/10 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <CalendarCheck className="w-4 h-4 text-red-500" />
                      Rekapitulasi Kehadiran Bulanan
                    </h3>
                    <p className="text-xs text-gray-400">
                      Pilih bulan untuk melihat statistik dan rincian tanggal kehadiran Anda.
                    </p>
                  </div>

                  {/* Dropdown Filter Bulan */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-medium">Bulan:</span>
                    <select
                      value={selectedMonthFilter}
                      onChange={(e) => setSelectedMonthFilter(e.target.value)}
                      className="bg-[#18181e] text-white text-xs font-bold py-2 px-3 rounded-xl border border-white/15 focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      <option value="all">Semua Riwayat</option>
                      {monthOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* KPI Monthly Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#18181e] p-3.5 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-semibold text-gray-400 block">Total Sesi</span>
                    <span className="text-xl sm:text-2xl font-black text-white font-display mt-0.5">
                      {profileMonthlyStats.total}
                    </span>
                  </div>

                  <div className="bg-[#18181e] p-3.5 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-semibold text-emerald-400 block">Hadir</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-300 font-display mt-0.5">
                      {profileMonthlyStats.hadirCount}
                    </span>
                  </div>

                  <div className="bg-[#18181e] p-3.5 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-semibold text-rose-400 block">Alpa (Tidak Hadir)</span>
                    <span className="text-xl sm:text-2xl font-black text-rose-300 font-display mt-0.5">
                      {profileMonthlyStats.alpaCount}
                    </span>
                  </div>

                  <div className="bg-[#18181e] p-3.5 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                    <span className="text-[11px] font-semibold text-blue-400 block">Persentase</span>
                    <span className="text-xl sm:text-2xl font-black text-blue-300 font-display mt-0.5">
                      {profileMonthlyStats.hadirPct}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Attendance Dates List */}
              <div className="bg-[#121216] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-[#18181e] border-b border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Daftar Tanggal Kehadiran ({filteredMemberHistory.length} Catatan)
                  </span>
                </div>

                {filteredMemberHistory.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 space-y-2">
                    <Calendar className="w-8 h-8 text-gray-600 mx-auto" />
                    <p className="text-xs font-semibold text-gray-300">Belum ada catatan presensi pada periode ini</p>
                    <p className="text-[11px] text-gray-500">
                      Lakukan absensi di tab &ldquo;Absen&rdquo; saat sesi latihan dibuka di dojo.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/5 text-xs">
                    {filteredMemberHistory.map((rec, i) => (
                      <div
                        key={rec.id || i}
                        className="p-3.5 sm:p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-xs sm:text-sm">
                              {new Date(rec.date_str).toLocaleDateString("id-ID", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                            <span className="text-[10px] text-gray-400 font-mono">
                              ({rec.checkin_time} WITA)
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400">
                            {rec.session_name} &bull; {rec.dojo_branch}
                          </p>
                          {rec.notes && (
                            <p className="text-[11px] text-gray-300 italic bg-white/5 px-2 py-0.5 rounded inline-block">
                              Catatan: {rec.notes}
                            </p>
                          )}
                        </div>

                        <div>
                          <span
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${rec.status === "Hadir"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                              }`}
                          >
                            {rec.status === "Hadir" ? "Hadir" : "Alpa (Tidak Hadir)"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP MODAL SUKSES PRESENSI (bgpopupberhasil.png)         */}
      {/* ======================================================== */}
      <AnimatePresence>
        {successModalData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#121216] border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Modal Header */}
              <div
                className="w-full p-5 text-white flex items-center justify-between border-b border-white/10"
                style={{
                  backgroundImage: "url('/images/bgpopupberhasil.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/logo.png"
                    alt="RKC"
                    width={36}
                    height={36}
                    className="object-contain drop-shadow"
                  />
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                      Presensi Berhasil!
                    </h3>
                    <p className="text-[11px] text-white/90">
                      Racing Kyokushin Club
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-3.5 text-xs sm:text-sm">
                <div className="text-center py-2 space-y-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    {successModalData.member_name}
                  </h4>
                  <span
                    className={`inline-block text-[11px] font-bold px-3 py-0.5 rounded-full border ${getBeltStyle(
                      successModalData.belt_level
                    )}`}
                  >
                    {successModalData.belt_level}
                  </span>
                </div>

                <div className="bg-[#18181e] p-3.5 rounded-xl border border-white/5 space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Status Kehadiran</span>
                    <span className="font-bold text-emerald-400">{successModalData.status}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Waktu Presensi</span>
                    <span className="font-mono font-bold text-white">
                      {successModalData.checkin_time} WITA
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-gray-400">Tanggal</span>
                    <span className="text-gray-200">
                      {new Date(successModalData.date_str).toLocaleDateString("id-ID", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Sesi Latihan</span>
                    <span className="text-gray-200">{successModalData.session_name}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSuccessModalData(null)}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification (Pemberitahuan Tengah Atas) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -25, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -25, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className={`fixed top-5 sm:top-6 left-1/2 z-[100] w-[90%] max-w-md p-3.5 sm:p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 backdrop-blur-xl border ${toast.type === "error"
              ? "bg-rose-950/95 text-rose-200 border-rose-500/60 shadow-rose-950/60"
              : toast.type === "success"
                ? "bg-emerald-950/95 text-emerald-200 border-emerald-500/60 shadow-emerald-950/60"
                : "bg-gray-900/95 text-gray-200 border-white/25 shadow-black/90"
              }`}
          >
            {toast.type === "error" ? (
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span className="text-center">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
