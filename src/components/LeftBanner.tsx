"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function LeftBanner() {
  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-full bg-[#0a0a0c] flex flex-col justify-between overflow-hidden select-none group">
      {/* Background Poster Artwork from public/images/bgkiri.png */}
      <div className="relative w-full h-full min-h-[640px] lg:min-h-[920px]">
        <Image
          src="/images/bgkiri.png"
          alt="RKC Kyokushin Club - Karate For A Better Tomorrow"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
        />

        {/* Subtle Ambient Red Glow Highlights on corners */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
