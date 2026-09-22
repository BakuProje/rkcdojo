"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  AlertCircle,
  CheckSquare,
} from "lucide-react";

export interface ReasonFormData {
  hobby: "YA" | "TIDAK" | "BARU BELAJAR" | "";
  reason: string;
  reasonAgreed: boolean;
  healthInfo: string;
}

interface ReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ReasonFormData) => void;
  initialData: ReasonFormData;
}

export default function ReasonModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ReasonModalProps) {
  const [hobby, setHobby] = useState<"YA" | "TIDAK" | "BARU BELAJAR" | "">(
    initialData.hobby || ""
  );
  const [reason, setReason] = useState(initialData.reason || "");
  const [reasonAgreed, setReasonAgreed] = useState(
    initialData.reasonAgreed || false
  );
  const [healthInfo, setHealthInfo] = useState(initialData.healthInfo || "");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setHobby(initialData.hobby || "");
      setReason(initialData.reason || "");
      setReasonAgreed(initialData.reasonAgreed || false);
      setHealthInfo(initialData.healthInfo || "");
      setErrorMsg("");

      const prevOverflow = document.body.style.overflow;
      const prevTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = prevOverflow;
        document.body.style.touchAction = prevTouchAction;
      };
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!hobby) {
      setErrorMsg("Harap pilih status: Apakah anda Hobby olahraga beladiri.");
      return;
    }
    if (!reason.trim()) {
      setErrorMsg("Harap isi Alasan bergabung Anda.");
      return;
    }
    if (!reasonAgreed) {
      setErrorMsg("Harap centang persetujuan pelatihan mental dan fisik.");
      return;
    }
    if (!healthInfo.trim()) {
      setErrorMsg("Harap isi informasi kesehatan (tulis 'Tidak ada' jika tidak ada).");
      return;
    }

    onSave({
      hobby,
      reason: reason.trim(),
      reasonAgreed,
      healthInfo: healthInfo.trim(),
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden h-[100dvh] w-full">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0"
        />

        {/* Modal Dialog Card (Unified smooth scroll container so header never covers content) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] max-w-xl bg-[#121216] border-0 sm:border border-white/10 rounded-none sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Header Banner (Navbar Pop-up) */}
          <div
            className="w-full p-4 sm:p-5 text-white flex items-center justify-between relative overflow-hidden flex-shrink-0 bg-cover bg-center border-b border-white/10 shadow-md"
            style={{
              backgroundImage: "url('/images/bgpopup.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden p-1 border border-white/30 bg-black/40 shadow-md flex-shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="RKC"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-black font-display text-base sm:text-lg tracking-tight uppercase leading-tight drop-shadow-md">
                  ALASAN BERGABUNG
                </h3>
                <p className="text-[11px] text-white/90 drop-shadow">
                  Racing Kyokushin Club
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer relative z-10"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body with 4 Separated Cards */}
          <div className="p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
            {/* Notification error message inside popup */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-950/60 border border-red-500/60 rounded-xl p-3 text-red-300 text-xs flex items-center gap-2 shadow-md"
              >
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <span className="font-medium">{errorMsg}</span>
              </motion.div>
            )}

            {/* Bagian 1: Apakah anda Hobby olahraga beladiri */}
            <div className="space-y-2.5 bg-[#18181e] border border-white/5 rounded-2xl p-4">
              <label className="block text-xs sm:text-sm font-bold text-white">
                Apakah anda Hobby olahraga beladiri
              </label>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {(["YA", "TIDAK", "BARU BELAJAR"] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setHobby(opt);
                      if (errorMsg) setErrorMsg("");
                    }}
                    className={`py-2.5 px-2 rounded-xl font-bold text-xs sm:text-sm border transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      hobby === opt
                        ? "bg-red-600 border-red-500 text-white shadow-md shadow-red-950/50"
                        : "bg-[#121216] border-white/10 text-gray-400 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {hobby === opt && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bagian 2: Alasan Bergabung (Terpisah Sendiri) */}
            <div className="space-y-2 bg-[#18181e] border border-white/5 rounded-2xl p-4">
              <label className="block text-xs sm:text-sm font-bold text-white">
                Alasan bergabung
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Tuliskan alasan Anda ingin bergabung dengan RKC Kyokushin..."
                className="w-full bg-[#121216] text-white text-xs sm:text-sm rounded-xl p-3 border border-white/10 hover:border-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500 resize-none"
              />
            </div>

            {/* Bagian 3: Pernyataan Beladiri Keras (Terpisah Sendiri) */}
            <div className="space-y-2.5 bg-[#18181e] border border-white/5 rounded-2xl p-4">
              <p className="text-xs text-gray-300 leading-relaxed font-medium text-justify">
                Saya mengetahui bahwa Kyokushin adalah beladiri keras dalam hal pelatihan mental dan fisik.
              </p>

              {/* Checkbox Persetujuan */}
              <div
                onClick={() => {
                  setReasonAgreed(!reasonAgreed);
                  if (errorMsg) setErrorMsg("");
                }}
                className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-center gap-2.5 ${
                  reasonAgreed
                    ? "bg-red-950/30 border-red-500/50 text-white"
                    : "bg-[#121216] border-white/10 hover:border-white/20 text-gray-400"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${
                    reasonAgreed
                      ? "bg-red-600 text-white shadow-sm shadow-red-900"
                      : "border border-white/30 bg-black/40"
                  }`}
                >
                  {reasonAgreed && <CheckSquare className="w-4 h-4" />}
                </div>
                <span className="text-xs font-semibold">
                  Saya menyetujui secara sadar dan atas kemauan sendiri.
                </span>
              </div>
            </div>

            {/* Bagian 4: Riwayat Kesehatan / Cedera (Terpisah Sendiri) */}
            <div className="space-y-2 bg-[#18181e] border border-white/5 rounded-2xl p-4">
              <label className="block text-xs sm:text-sm font-bold text-white leading-relaxed text-justify">
                Saya bertanggung jawab untuk memberikan informasi kesehatan dan riwayat cedera. (jika tidak ada kosongkan dengan jawaban tidak ada)
              </label>

              <textarea
                rows={2}
                value={healthInfo}
                onChange={(e) => {
                  setHealthInfo(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder="Jawaban anda (contoh: Tidak ada / riwayat cedera engkel)"
                className="w-full bg-[#121216] text-white text-xs sm:text-sm rounded-xl p-3 border border-white/10 hover:border-white/20 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500 resize-none"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="w-full p-4 sm:p-5 bg-[#18181e] border-t border-white/10 flex items-center justify-end flex-shrink-0 shadow-2xl mt-auto">
            <button
              type="button"
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-red-glow transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Simpan Alasan</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
