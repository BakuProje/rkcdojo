"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  X,
  Calendar,
  User,
  Phone,
  MapPin,
  Briefcase,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface RegistrationData {
  fullName: string;
  birthDate: string;
  gender: "Laki-laki" | "Perempuan";
  whatsapp: string;
  address: string;
  age: string;
  status?: string;
  institution?: string;
  occupation: string;
  program: string;
  motivation: string;
  regId: string;
  submittedAt: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: RegistrationData | null;
}

export function parseMotivation(text: string = "") {
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

  return {
    reason: mainReason.trim(),
    hobby,
    health,
  };
}

export default function SuccessModal({ isOpen, onClose, data }: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E50914", "#ff4d4d", "#ffffff", "#000000"],
        });
      } catch (e) {
        console.error("Confetti error", e);
      }
    }
  }, [isOpen]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  const parsed = parseMotivation(data.motivation);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Card (Full screen on mobile, floating card on desktop) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-[#121216] border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Top Banner Header using public/images/bgpopupberhasil.png */}
          <div
            className="w-full p-5 sm:p-7 text-white text-center relative overflow-hidden flex-shrink-0 bg-cover bg-center border-b border-white/10 shadow-md"
            style={{
              backgroundImage: "url('/images/bgpopupberhasil.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Close Button Top Right */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20"
              aria-label="Tutup modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Success Icon */}
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 bg-white text-red-600 rounded-2xl flex items-center justify-center shadow-2xl mb-2.5 transform -rotate-3 hover:rotate-0 transition-transform relative z-10">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight font-display drop-shadow-md relative z-10">
              Pendaftaran Berhasil!
            </h3>
            <p className="text-[11px] sm:text-xs text-white/95 mt-1 max-w-sm mx-auto leading-relaxed relative z-10 drop-shadow">
              Selamat bergabung dengan keluarga besar <strong className="text-white font-bold">RKC Kyokushin Club</strong>. Semangat Osu!
            </p>
          </div>

          {/* Body Content - Rapi & Terstruktur (Scrollable Body) */}
          <div className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="bg-[#18181e] border border-white/5 rounded-2xl p-4 sm:p-5 space-y-3.5">
              {/* Nama Lengkap */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-gray-400 flex items-center gap-2 font-medium">
                  <User className="w-4 h-4 text-red-500" /> Nama Lengkap
                </span>
                <span className="font-bold text-white text-sm sm:text-base">{data.fullName}</span>
              </div>

              {/* Status & Asal Sekolah / Instansi (TERPISAH) */}
              <div className="grid grid-cols-2 gap-3 border-b border-white/5 pb-3">
                <div>
                  <span className="text-gray-400 text-xs flex items-center gap-1.5 font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-red-500" /> Status
                  </span>
                  <span className="font-semibold text-red-400 bg-red-950/40 px-2.5 py-0.5 rounded-lg border border-red-500/30 text-xs inline-block mt-1">
                    {data.status || (data.occupation ? data.occupation.split("(")[0].trim() : "Pelajar / Mahasiswa")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 text-xs font-medium block">
                    Asal Sekolah / Instansi
                  </span>
                  <p className="font-semibold text-white mt-1 text-xs sm:text-sm truncate">
                    {data.institution && data.institution !== "-"
                      ? data.institution
                      : data.occupation && data.occupation.includes("(")
                      ? data.occupation.substring(data.occupation.indexOf("(") + 1, data.occupation.lastIndexOf(")")).trim()
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Tanggal Lahir, Usia & Jenis Kelamin (TERPISAH) */}
              <div className="grid grid-cols-3 gap-2 border-b border-white/5 pb-3">
                <div>
                  <span className="text-gray-400 text-[11px] sm:text-xs flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-red-500" /> Tanggal Lahir
                  </span>
                  <p className="font-semibold text-white mt-1 text-xs sm:text-sm font-mono">
                    {data.birthDate || "-"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] sm:text-xs font-medium block">Usia</span>
                  <p className="font-semibold text-white mt-1 text-xs sm:text-sm">
                    {data.age ? `${data.age} th` : "-"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-[11px] sm:text-xs font-medium block">Jenis Kelamin</span>
                  <p className="font-semibold text-white mt-1 text-xs sm:text-sm">{data.gender || "-"}</p>
                </div>
              </div>

              {/* No. WhatsApp */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-gray-400 flex items-center gap-2 font-medium">
                  <Phone className="w-4 h-4 text-emerald-400" /> No. WhatsApp
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{data.whatsapp}</span>
              </div>

              {/* Alamat (Rata Kanan seperti No. WhatsApp) */}
              <div className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-gray-400 flex items-center gap-2 font-medium flex-shrink-0">
                  <MapPin className="w-4 h-4 text-red-500" /> Alamat
                </span>
                <p className="font-medium text-gray-200 text-xs sm:text-sm leading-relaxed text-right max-w-[65%]">
                  {data.address}
                </p>
              </div>

              {/* Motivasi Bergabung (Rapi & Terpisah) */}
              <div className="space-y-2.5 pt-1">
                <span className="text-gray-300 font-bold block text-xs uppercase tracking-wider">
                  Motivasi Bergabung:
                </span>

                <div className="bg-[#121216] border border-white/5 rounded-xl p-3.5 space-y-2.5">
                  {/* Alasan Bergabung */}
                  <div>
                    <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                      Alasan Bergabung:
                    </span>
                    <p className="text-xs text-gray-200 font-medium leading-relaxed">
                      {parsed.reason}
                    </p>
                  </div>

                  {/* Hobi Beladiri (Jika Ada - Tanpa Icon Api) */}
                  {parsed.hobby && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-gray-400">
                        Hobi Olahraga Beladiri:
                      </span>
                      <span className="font-bold text-xs text-amber-300 bg-amber-950/40 px-2.5 py-0.5 rounded border border-amber-500/30">
                        {parsed.hobby}
                      </span>
                    </div>
                  )}

                  {/* Informasi Kesehatan (Jika Ada - Tanpa Icon HeartPulse) */}
                  {parsed.health && (
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-[11px] font-semibold text-gray-400 block mb-0.5">
                        Informasi Kesehatan / Riwayat Cedera:
                      </span>
                      <p className="text-xs text-gray-300 italic bg-black/30 p-2 rounded-lg border border-white/5">
                        {parsed.health}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions - Tombol Selesai */}
          <div className="w-full p-4 sm:p-5 bg-[#18181e] border-t border-white/10 flex items-center justify-center flex-shrink-0 z-30 shadow-2xl">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-red-glow transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Selesai</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
