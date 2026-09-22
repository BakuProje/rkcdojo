import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

// Dynamic import with SSR disabled to eliminate hydration errors across different browsers
const AttendancePortal = dynamic(() => import("@/components/AttendancePortal"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-4xl mx-auto py-16 flex flex-col items-center justify-center text-center space-y-4">
      <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-400 text-xs font-mono tracking-wider">Memuat Presensi RKC...</p>
    </div>
  ),
});

export default function AbsensiPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#08080a] flex flex-col justify-start overflow-x-hidden overflow-y-auto no-scrollbar selection:bg-red-600 selection:text-white">
      {/* 1. Desktop Background */}
      <div className="hidden md:block fixed inset-0 z-0">
        <Image
          src="/images/bgabsensidekstop.png"
          alt="RKC Kyokushin Club Absensi Desktop Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full opacity-100"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* 2. Android / Mobile Background */}
      <div className="block md:hidden fixed inset-0 z-0">
        <Image
          src="/images/bgabsensimobile.png"
          alt="RKC Kyokushin Club Absensi Mobile Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center w-full h-full opacity-100"
        />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-start p-3 sm:p-5 md:p-8 lg:p-10">
        <div className="w-full max-w-4xl mx-auto py-2 sm:py-6">
          <AttendancePortal />
        </div>
      </div>
    </main>
  );
}
