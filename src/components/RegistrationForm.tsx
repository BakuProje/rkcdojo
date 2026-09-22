"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Calendar,
  Phone,
  MapPin,
  Landmark,
  Briefcase,
  MessageSquare,
  Send,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import SuccessModal, { RegistrationData } from "./SuccessModal";
import RulesModal from "./RulesModal";
import ReasonModal, { ReasonFormData } from "./ReasonModal";
import CustomDatePicker from "./CustomDatePicker";
import { supabase } from "@/lib/supabase";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    birthDate: "",
    age: "",
    address: "",
    whatsapp: "",
    status: "",
    institution: "",
    motivation: "",
  });

  const [reasonData, setReasonData] = useState<ReasonFormData>({
    hobby: "",
    reason: "",
    reasonAgreed: false,
    healthInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isReasonOpen, setIsReasonOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [registeredData, setRegisteredData] = useState<RegistrationData | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Wajib diisi";
    }

    if (!formData.gender) {
      newErrors.gender = "Pilih gender";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Wajib diisi";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Wajib diisi";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Alamat lengkap wajib diisi";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "Wajib diisi";
    } else if (!/^[0-9+-\s]{9,16}$/.test(formData.whatsapp.replace(/\s/g, ""))) {
      newErrors.whatsapp = "Nomor tidak valid";
    }

    if (!formData.status) {
      newErrors.status = "Pilih status";
    }

    if (!formData.motivation.trim() || !reasonData.hobby || !reasonData.reasonAgreed) {
      newErrors.motivation = "Wajib diisi & disetujui";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveReason = (data: ReasonFormData) => {
    setReasonData(data);
    setFormData({
      ...formData,
      motivation: data.reason,
    });
    if (errors.motivation) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.motivation;
        return copy;
      });
    }
    showToast("Alasan bergabung & kuesioner berhasil disimpan!");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      showToast("Harap lengkapi semua kolom pendaftaran yang belum terisi!", "error");
      return;
    }

    // Open RKC Rules Modal before final submit
    setIsRulesOpen(true);
  };

  const handleConfirmRegistration = async () => {
    setIsSubmitting(true);

    const fullMotivationText = reasonData.reason
      ? `${reasonData.reason}${reasonData.hobby ? ` [Hobi: ${reasonData.hobby}]` : ""}${reasonData.healthInfo ? ` [Kesehatan: ${reasonData.healthInfo}]` : ""}`
      : formData.motivation.trim();

    const generatedId = `RKC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const resultData: RegistrationData = {
      fullName: formData.fullName.trim(),
      birthDate: formData.birthDate,
      gender: formData.gender as "Laki-laki" | "Perempuan",
      whatsapp: formData.whatsapp.trim(),
      address: formData.address.trim(),
      age: formData.age.trim(),
      occupation: formData.institution.trim()
        ? `${formData.status} (${formData.institution.trim()})`
        : formData.status,
      program: "Reguler Dojo",
      motivation: fullMotivationText,
      regId: generatedId,
      submittedAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    try {
      // 0. Ensure newly submitted phone and reg_id are not in local deleted blacklists
      try {
        const cleanPhone = formData.whatsapp.replace(/\D/g, "");
        const rawDelRegs = localStorage.getItem("rkc_deleted_registrations");
        if (rawDelRegs) {
          const delRegs: string[] = JSON.parse(rawDelRegs);
          const filteredRegs = delRegs.filter((d: string) => d !== generatedId.toLowerCase() && (cleanPhone ? d !== cleanPhone : true));
          localStorage.setItem("rkc_deleted_registrations", JSON.stringify(filteredRegs));
        }

        const rawDelMems = localStorage.getItem("rkc_deleted_members");
        if (rawDelMems) {
          const delMems: string[] = JSON.parse(rawDelMems);
          const filteredMems = delMems.filter((d: string) => d !== generatedId.toLowerCase() && (cleanPhone ? d !== cleanPhone : true));
          localStorage.setItem("rkc_deleted_members", JSON.stringify(filteredMems));
        }
      } catch {}

      // 1. Save directly to Supabase registrations table with status "Baru"
      const { error } = await supabase.from("registrations").insert([
        {
          reg_id: generatedId,
          full_name: formData.fullName.trim(),
          gender: formData.gender,
          birth_date: formData.birthDate,
          age: formData.age.trim(),
          address: formData.address.trim(),
          whatsapp: formData.whatsapp.trim(),
          status: formData.status,
          institution: formData.institution.trim() || null,
          motivation: fullMotivationText,
          registration_status: "Baru",
        },
      ]);

      if (error) {
        console.warn("Notice: Supabase insert returned:", error.message);
      }

      // 2. Save to offline registrations cache with status "Baru"
      try {
        const newRegRecord = {
          reg_id: generatedId,
          full_name: formData.fullName.trim(),
          gender: formData.gender,
          birth_date: formData.birthDate,
          age: formData.age.trim(),
          address: formData.address.trim(),
          whatsapp: formData.whatsapp.trim(),
          status: formData.status,
          institution: formData.institution.trim() || null,
          motivation: fullMotivationText,
          registration_status: "Baru",
          created_at: new Date().toISOString(),
        };
        const savedOfflineStr = localStorage.getItem("rkc_offline_registrations");
        const existingOffline = savedOfflineStr ? JSON.parse(savedOfflineStr) : [];
        existingOffline.unshift(newRegRecord);
        localStorage.setItem("rkc_offline_registrations", JSON.stringify(existingOffline));
      } catch (offErr) {
        // ignore
      }
    } catch (err) {
      console.warn("Notice: Supabase connection exception:", err);
    }

    setRegisteredData(resultData);
    setIsSubmitting(false);
    setIsRulesOpen(false);
    setIsSuccessOpen(true);

    // Reset all form inputs to empty
    setFormData({
      fullName: "",
      gender: "",
      birthDate: "",
      age: "",
      address: "",
      whatsapp: "",
      status: "",
      institution: "",
      motivation: "",
    });
    setReasonData({
      hobby: "",
      reason: "",
      reasonAgreed: false,
      healthInfo: "",
    });
    setErrors({});
  };

  return (
    <div className="w-full max-w-xl mx-auto py-1">
      {/* Header Section with Logo on the Right */}
      <div className="flex items-start justify-between gap-3 mb-4 sm:mb-5">
        <div className="flex-1">
          <p className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-red-500 mb-0.5 sm:mb-1">
            RKC KYOKUSHIN CLUB
          </p>

          <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-black uppercase tracking-tight italic font-display leading-tight">
            <span className="text-white">FORM </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-rose-500">
              PENDAFTARAN
            </span>
          </h2>

          <p className="text-gray-300 text-[11px] sm:text-xs mt-1 leading-snug max-w-md">
            Bergabunglah bersama kami dan mulailah perjalanan baru untuk menjadi pribadi yang lebih disiplin, kuat, dan percaya diri.
          </p>
        </div>

        {/* Circular Dojo Logo */}
        <div className="flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden drop-shadow-[0_0_15px_rgba(229,9,20,0.5)] border border-red-500/40 p-0.5 bg-black/50"
          >
            <Image
              src="/images/logo.png"
              alt="RKC Racing Kyokushin Club Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Main Dark Form - 2 Columns Grid on Mobile & Desktop */}
      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3" noValidate>
        {/* Row 1: Nama Lengkap & Jenis Kelamin (2 Kolom) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Nama Lengkap */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <User className="w-3.5 h-3.5 fill-red-500/80" />
              </div>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                placeholder="Masukkan nama"
                className={`w-full bg-[#121216]/90 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-2 border ${errors.fullName ? "border-red-500" : "border-white/10 hover:border-white/20"
                  } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner`}
              />
            </div>
            {errors.fullName && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Jenis Kelamin Dropdown */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Jenis Kelamin <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <User className="w-3.5 h-3.5 fill-red-500/80" />
              </div>
              <select
                value={formData.gender}
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                  if (errors.gender) setErrors({ ...errors, gender: "" });
                }}
                className={`w-full bg-[#121216]/95 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-6 sm:pr-7 border ${formData.gender ? "text-white" : "text-gray-500"
                  } ${errors.gender ? "border-red-500" : "border-white/10 hover:border-white/20"
                  } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer shadow-inner`}
              >
                <option value="" disabled className="bg-[#18181e] text-gray-400">
                  Pilih jenis kelamin
                </option>
                <option value="Laki-laki" className="bg-[#18181e] text-white">
                  Laki-laki
                </option>
                <option value="Perempuan" className="bg-[#18181e] text-white">
                  Perempuan
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 flex items-center pointer-events-none text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
            {errors.gender && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.gender}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Tanggal Lahir & Umur (2 Kolom) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Tanggal Lahir */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Tanggal Lahir <span className="text-red-500">*</span>
            </label>
            <CustomDatePicker
              value={formData.birthDate}
              onChange={(dateISO, calculatedAge) => {
                const newAge = calculatedAge !== undefined ? calculatedAge.toString() : formData.age;
                setFormData((prev) => ({
                  ...prev,
                  birthDate: dateISO,
                  age: newAge || prev.age,
                }));
                if (errors.birthDate) setErrors((err) => ({ ...err, birthDate: "" }));
                if (errors.age && newAge) setErrors((err) => ({ ...err, age: "" }));
              }}
              error={errors.birthDate}
              placeholder="Pilih tgl lahir"
            />
            {errors.birthDate && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.birthDate}
              </p>
            )}
          </div>

          {/* Umur */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Umur <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <User className="w-3.5 h-3.5 fill-red-500/80" />
              </div>
              <input
                type="number"
                min="4"
                max="80"
                value={formData.age}
                onChange={(e) => {
                  setFormData({ ...formData, age: e.target.value });
                  if (errors.age) setErrors({ ...errors, age: "" });
                }}
                placeholder="Umur"
                className={`w-full bg-[#121216]/90 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-2 border ${errors.age ? "border-red-500" : "border-white/10 hover:border-white/20"
                  } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner`}
              />
            </div>
            {errors.age && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.age}
              </p>
            )}
          </div>
        </div>

        {/* Row 3: Alamat Lengkap (1 Kolom Penuh) */}
        <div>
          <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1">
            Alamat Lengkap <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
              <MapPin className="w-3.5 h-3.5 fill-red-500/80" />
            </div>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: "" });
              }}
              placeholder="Masukkan alamat lengkap"
              className={`w-full bg-[#121216]/90 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-2 border ${errors.address ? "border-red-500" : "border-white/10 hover:border-white/20"
                } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner`}
            />
          </div>
          {errors.address && (
            <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
              <AlertCircle className="w-2.5 h-2.5" /> {errors.address}
            </p>
          )}
        </div>

        {/* Row 4: Nomor WhatsApp & Status Pelajar/Pekerja (2 Kolom) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <Phone className="w-3.5 h-3.5 fill-red-500/20" />
              </div>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => {
                  setFormData({ ...formData, whatsapp: e.target.value });
                  if (errors.whatsapp) setErrors({ ...errors, whatsapp: "" });
                }}
                placeholder="08xxxxxxxxxx"
                className={`w-full bg-[#121216]/90 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-2 border ${errors.whatsapp ? "border-red-500" : "border-white/10 hover:border-white/20"
                  } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner`}
              />
            </div>
            {errors.whatsapp && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.whatsapp}
              </p>
            )}
          </div>

          {/* Status (Pelajar / Pekerja) Dropdown */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <select
                value={formData.status}
                onChange={(e) => {
                  setFormData({ ...formData, status: e.target.value });
                  if (errors.status) setErrors({ ...errors, status: "" });
                }}
                className={`w-full bg-[#121216]/95 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-6 sm:pr-7 border ${formData.status ? "text-white" : "text-gray-500"
                  } ${errors.status ? "border-red-500" : "border-white/10 hover:border-white/20"
                  } focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all appearance-none cursor-pointer shadow-inner`}
              >
                <option value="" disabled className="bg-[#18181e] text-gray-400">
                  Pilih: Pelajar / Pekerja
                </option>
                <option value="Pelajar / Mahasiswa" className="bg-[#18181e] text-white">
                  Pelajar / Mahasiswa
                </option>
                <option value="Pekerja / Karyawan" className="bg-[#18181e] text-white">
                  Pekerja / Karyawan
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 flex items-center pointer-events-none text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
            {errors.status && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.status}
              </p>
            )}
          </div>
        </div>

        {/* Row 5: Asal Sekolah/Instansi & Motivasi Bergabung (2 Kolom) */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {/* Asal Sekolah/Instansi */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Asal Sekolah / Instansi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
                <Landmark className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="Sekolah / kantor"
                className="w-full bg-[#121216]/90 text-white placeholder-gray-500 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-2 border border-white/10 hover:border-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Alasan Bergabung (Popup Trigger) */}
          <div>
            <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
              Alasan Bergabung
            </label>
            <div
              onClick={() => setIsReasonOpen(true)}
              className={`w-full bg-[#121216]/90 rounded-xl py-2 sm:py-2.5 px-2.5 sm:px-3 border transition-all shadow-inner cursor-pointer flex items-center justify-between gap-2 ${errors.motivation
                  ? "border-red-500 hover:border-red-400"
                  : formData.motivation
                    ? "border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/10"
                    : "border-white/10 hover:border-white/20"
                }`}
            >
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                <MessageSquare
                  className={`w-3.5 h-3.5 flex-shrink-0 ${formData.motivation ? "text-emerald-400" : "text-red-500"
                    }`}
                />
                <span
                  className={`text-xs sm:text-sm truncate ${formData.motivation ? "text-white font-medium" : "text-gray-500"
                    }`}
                >
                  {formData.motivation ? formData.motivation : "Klik untuk mengisi..."}
                </span>
              </div>
              {formData.motivation && (
                <span className="text-[10px] bg-emerald-600/20 text-emerald-400 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30 flex-shrink-0">
                  Terisi
                </span>
              )}
            </div>
            {errors.motivation && (
              <p className="text-[10px] text-red-400 mt-0.5 flex items-center gap-0.5 font-medium">
                <AlertCircle className="w-2.5 h-2.5" /> {errors.motivation}
              </p>
            )}
          </div>
        </div>

        {/* Row 6: Tombol Kirim Pendaftaran */}
        <motion.div whileHover={{ scale: 1.008 }} whileTap={{ scale: 0.992 }} className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-shimmer bg-gradient-to-r from-red-600 via-red-600 to-rose-600 hover:from-red-500 hover:via-red-600 hover:to-rose-500 text-white font-bold py-3 sm:py-3.5 px-6 rounded-xl shadow-red-glow hover:shadow-red-glow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Memproses & Menyimpan...</span>
              </>
            ) : (
              <>
                <span>Kirim Pendaftaran</span>
              </>
            )}
          </button>
        </motion.div>
      </form>

      {/* Alasan Bergabung Questionnaire Modal */}
      <ReasonModal
        isOpen={isReasonOpen}
        onClose={() => setIsReasonOpen(false)}
        onSave={handleSaveReason}
        initialData={reasonData}
      />

      {/* RKC Rules & Mandatory Agreements Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onConfirm={handleConfirmRegistration}
        isSubmitting={isSubmitting}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        data={registeredData}
      />

      {/* Top-Centered Floating Notification Toast (Tengah Atas) */}
      <AnimatePresence>
        {toast && (
          <div className="fixed top-0 left-0 right-0 z-[100] flex items-start justify-center p-4 pt-5 sm:pt-7 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -25 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`pointer-events-auto max-w-md w-auto backdrop-blur-2xl text-white text-xs sm:text-sm font-bold p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex items-center gap-3 border ${
                toast.type === "error"
                  ? "bg-[#14141a]/98 border-red-500/80 shadow-red-950/60"
                  : "bg-[#14141a]/98 border-emerald-500/80 shadow-emerald-950/60"
              }`}
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 border ${
                  toast.type === "error"
                    ? "bg-red-600/20 border-red-500/40 text-red-400"
                    : "bg-emerald-600/20 border-emerald-500/40 text-emerald-400"
                }`}
              >
                {toast.type === "error" ? (
                  <AlertCircle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 pr-1">
                <p className="text-white text-xs sm:text-sm font-bold leading-snug">
                  {toast.msg}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
