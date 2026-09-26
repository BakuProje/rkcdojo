"use client";

import React from "react";
import Image from "next/image";
import RegistrationForm from "@/components/RegistrationForm";

export default function PendaftaranPage() {
  return (
    <main className="relative w-full min-h-screen lg:h-screen lg:max-h-screen bg-[#08080a] flex flex-col justify-between overflow-x-hidden overflow-y-auto lg:overflow-hidden no-scrollbar selection:bg-red-600 selection:text-white">
      {/* 1. Desktop Background (100% Exact Fit: public/images/background.png) */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <Image
          src="/images/background.png"
          alt="RKC Kyokushin Club Desktop Background"
          fill
          priority
          sizes="100vw"
          className="object-fill w-full h-full"
        />
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* 2. Mobile Background (public/images/mobilebg.png) */}
      <div className="block lg:hidden fixed inset-0 z-0">
        <Image
          src="/images/mobilebg.png"
          alt="RKC Kyokushin Club Mobile Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      {/* 50% - 50% Desktop Two-Column Split Layout / Mobile View */}
      <div className="relative z-10 w-full h-full min-h-screen lg:min-h-0 flex-1 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column (50% on Desktop): Displays the left poster half */}
        <div className="hidden lg:flex w-full lg:min-h-full items-end p-6 sm:p-10 pointer-events-none">
          {/* Sisi kiri terbuka 100% pada desktop */}
        </div>

        {/* Right Column (50% on Desktop / Full on Mobile): Form Container */}
        <div data-lenis-prevent className="w-full h-full relative flex items-center justify-center p-3 sm:p-5 md:p-8 lg:p-8 xl:p-10 overflow-y-auto no-scrollbar">
          <div className="w-full max-w-[580px] my-auto py-2 sm:py-6">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </main>
  );
}
