"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Send,
  ScrollText,
  CheckSquare,
} from "lucide-react";

interface RulesModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  isSubmitting: boolean;
}

export default function RulesModal({
  isOpen,
  onConfirm,
  isSubmitting,
}: RulesModalProps) {
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);

  const allAgreed = agreed1 && agreed2 && agreed3;
  const agreedCount = (agreed1 ? 1 : 0) + (agreed2 ? 1 : 0) + (agreed3 ? 1 : 0);

  // Lock background body scroll when modal is open so the popup navbar never shifts
  React.useEffect(() => {
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/90 backdrop-blur-md overflow-hidden h-[100dvh] w-full">
        {/* Backdrop (Non-clickable so popup cannot be dismissed by clicking outside) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none"
        />

        {/* Modal Dialog Card (Unified smooth scroll container so header never covers content) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full h-[100dvh] sm:h-auto sm:max-h-[88vh] max-w-2xl bg-[#121216] border-0 sm:border border-white/10 rounded-none sm:rounded-3xl shadow-[0_20px_70px_rgba(0,0,0,0.95)] z-10 flex flex-col overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                  PERATURAN RKC
                </h3>
                <p className="text-[11px] text-white/90 drop-shadow">
                  Racing Kyokushin Club
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-4 sm:p-6 space-y-5 text-xs sm:text-sm">
            {/* Bagian 1: 6 Butir Peraturan RKC */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                  <ScrollText className="w-4 h-4 text-red-500" />
                  6 Butir Peraturan RKC
                </h4>
                <span className="text-[10px] text-gray-400 font-mono">
                  Wajib Dipatuhi
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {/* Rule 1 */}
                <div className="bg-[#18181e] border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 hover:border-white/15 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-white block mb-0.5 text-left">Salam & Rasa Hormat</strong>
                    Saat datang atau pergi dari tempat latihan, lebih utama mengucapkan salam dan hormat pada pelatih dan sesama karateka.
                  </div>
                </div>

                {/* Rule 2 */}
                <div className="bg-[#18181e] border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 hover:border-white/15 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-white block mb-0.5 text-left">Kebersihan Dojo (WAJIB)</strong>
                    Dojo adalah jiwa dan cermin diri kita, menjaga kebersihan dojo adalah kewajiban mutlak seluruh karateka.
                  </div>
                </div>

                {/* Rule 3 */}
                <div className="bg-[#18181e] border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 hover:border-white/15 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-white block mb-0.5 text-left">Kerapian, Tertib & Disiplin</strong>
                    Pada saat latihan dilarang berbicara seenaknya, bergurau, dan bergosip demi menjaga konsentrasi serta keselamatan bersama.
                  </div>
                </div>

                {/* Rule 4 */}
                <div className="bg-[#18181e] border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 hover:border-white/15 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    4
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-white block mb-0.5 text-left">Larangan Aksesoris & Perhiasan</strong>
                    Tidak dibenarkan memakai kalung, cincin, gelang, jam tangan, dan perhiasan lainnya selama latihan.
                  </div>
                </div>

                {/* Rule 5 */}
                <div className="bg-[#18181e] border border-red-500/20 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 bg-red-950/10 hover:border-red-500/40 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    5
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-red-400 block mb-0.5 text-left">Larangan Bullying & Berkelahi</strong>
                    Dilarang saling mengejek, body shaming serta membuly teman seperguruuan. <span className="font-bold text-red-300">BERKELAHI DI LUAR DOJO AKAN MENDAPATKAN SANKSI BERAT DARI PELATIH.</span>
                  </div>
                </div>

                {/* Rule 6 */}
                <div className="bg-[#18181e] border border-white/5 rounded-xl p-3 sm:p-3.5 flex items-start gap-3 hover:border-white/15 transition-colors">
                  <span className="w-6 h-6 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    6
                  </span>
                  <div className="text-xs text-gray-300 leading-relaxed text-justify">
                    <strong className="text-white block mb-0.5 text-left">Jiwa Bushido Karateka</strong>
                    Dojo melambangkan jiwa Bushido yaitu Integritas, Keberanian, Kemurahan Hati, Menghormati, Kejujuran, dan Tulus Ikhlas serta Loyal pada satu Pimpinan dan Guru.
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian 2: Lembar Persetujuan Wajib (Checkboxes Tanpa Button Centang Semua) */}
            <div className="space-y-3 pt-2">
              <div className="border-b border-white/10 pb-2">
                <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Persetujuan Calon Murid
                </h4>
                <p className="text-[11px] text-gray-400">
                  Centang seluruh kotak pernyataan di bawah ini ({agreedCount}/3)
                </p>
              </div>

              {/* Checkbox Card 1 */}
              <div
                onClick={() => setAgreed1(!agreed1)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${agreed1
                  ? "bg-red-950/20 border-red-500/60 shadow-sm"
                  : "bg-[#18181e] border-white/10 hover:border-white/20"
                  }`}
              >
                <p className="text-xs text-gray-300 leading-relaxed text-justify">
                  Saya mengetahui bahwa Kyokushin adalah beladiri keras dalam hal pelatihan mental dan fisik.
                </p>

                <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${agreed1
                      ? "bg-red-600 text-white shadow-sm shadow-red-900"
                      : "border border-white/30 bg-black/40"
                      }`}
                  >
                    {agreed1 && <CheckSquare className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-xs font-semibold ${agreed1 ? "text-white" : "text-gray-400"
                      }`}
                  >
                    Saya menyetujui secara sadar dan atas kemauan sendiri.
                  </span>
                </div>
              </div>

              {/* Checkbox Card 2 */}
              <div
                onClick={() => setAgreed2(!agreed2)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${agreed2
                  ? "bg-red-950/20 border-red-500/60 shadow-sm"
                  : "bg-[#18181e] border-white/10 hover:border-white/20"
                  }`}
              >
                <p className="text-xs text-gray-300 leading-relaxed text-justify">
                  Saya akan mematuhi etika yang ditetapkan oleh pelatih termasuk perilaku yang baik dan rasa hormat terhadap pelatih dan sesama peserta.
                </p>

                <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${agreed2
                      ? "bg-red-600 text-white shadow-sm shadow-red-900"
                      : "border border-white/30 bg-black/40"
                      }`}
                  >
                    {agreed2 && <CheckSquare className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-xs font-semibold ${agreed2 ? "text-white" : "text-gray-400"
                      }`}
                  >
                    Saya menyetujui
                  </span>
                </div>
              </div>

              {/* Checkbox Card 3 */}
              <div
                onClick={() => setAgreed3(!agreed3)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none space-y-2.5 ${agreed3
                  ? "bg-red-950/20 border-red-500/60 shadow-sm"
                  : "bg-[#18181e] border-white/10 hover:border-white/20"
                  }`}
              >
                <p className="text-xs text-gray-300 leading-relaxed text-justify">
                  Dengan menyepakati formulir ini, saya secara sukarela setuju pada semua persyaratan yang disebutkan diatas dan apabila pada suatu saat saya melanggar maka pihak Dojo berhak untuk memberhentikan pelatihan peserta yang bersangkutan dan saya tidak akan memberikan tuntutan apapun kepada pihak Dojo serta segala sesuatu yang menyangkut kesehatan saya/peserta adalah mutlak tanggung jawab saya.
                </p>

                <div className="flex items-center gap-2.5 pt-1 border-t border-white/5">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all flex-shrink-0 ${agreed3
                      ? "bg-red-600 text-white shadow-sm shadow-red-900"
                      : "border border-white/30 bg-black/40"
                      }`}
                  >
                    {agreed3 && <CheckSquare className="w-4 h-4" />}
                  </div>
                  <span
                    className={`text-xs font-semibold ${agreed3 ? "text-white" : "text-gray-400"
                      }`}
                  >
                    Saya menyetujui secara sadar dan atas kemauan sendiri.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="w-full p-4 sm:p-5 bg-[#18181e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0 shadow-2xl mt-auto">
            <div className="text-[11px] text-gray-400 text-center sm:text-left">
              {allAgreed ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1 justify-center sm:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Seluruh persyaratan telah disetujui (3/3)
                </span>
              ) : (
                <span className="text-amber-400">
                  Harap centang seluruh poin persetujuan di atas ({agreedCount}/3)
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={onConfirm}
              disabled={!allAgreed || isSubmitting}
              className={`w-full sm:w-auto px-6 py-3 sm:py-2.5 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${allAgreed && !isSubmitting
                ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-red-glow"
                : "bg-gray-800 text-gray-500 border border-white/5 cursor-not-allowed"
                }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <span>Kirim Pendaftaran</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
