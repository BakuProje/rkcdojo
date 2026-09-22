"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  BarChart3,
  ShieldCheck,
  Clock,
  Phone,
  Menu,
  X,
  Dumbbell,
  ShieldPlus,
  Award,
  MapPin,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";

// Custom Karate Belt Knot Icon
function KarateBeltIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4 7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4v-6H4zm16 0h-4v6h4a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-6.5 0h-3a1.5 1.5 0 0 0-1.5 1.5v3A1.5 1.5 0 0 0 10.5 13h3a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 13.5 7zm-3 8l-2 5a1 1 0 0 0 1.9.7l1.6-4.2 1.6 4.2a1 1 0 0 0 1.9-.7l-2-5h-3z" />
    </svg>
  );
}

// Custom TikTok Icon
function TikTokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.89-2.88 2.89 2.89 0 0 1 2.89-2.88c.32 0 .62.06.9.15v-3.5a6.37 6.37 0 0 0-.9-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.41a8.38 8.38 0 0 0 5.15 1.78v-3.5a4.9 4.9 0 0 1-1.39-.01z" />
    </svg>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Monitor scroll position for active section & smart navbar hide on scroll down / show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled styling (bg dark)
      setScrolled(currentScrollY > 20);

      // Smart navbar: hide on scroll down, show on scroll up
      if (currentScrollY <= 50) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling DOWN -> HIDE navbar
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling UP -> SHOW navbar
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);

      const sections = [
        "beranda",
        "tentang",
        "program",
        "mengapa",
        "pelatih",
        "jadwal",
      ];
      const scrollPosition = currentScrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Navbar Links
  const navLinks = [
    { name: "Beranda", href: "#beranda", id: "beranda" },
    { name: "Tentang Kami", href: "#tentang", id: "tentang" },
    { name: "Program", href: "#program", id: "program" },
    { name: "Mengapa", href: "#mengapa", id: "mengapa" },
    { name: "Pelatihan", href: "#pelatih", id: "pelatih" },
    { name: "Jadwal", href: "#jadwal", id: "jadwal" },
  ];

  return (
    <div className="bg-[#08080a] text-white min-h-screen font-sans selection:bg-red-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (Smart Auto-Hide on Scroll Down, Show on Scroll Up)         */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${showNavbar || mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          } ${scrolled
            ? "bg-black/95 backdrop-blur-md py-3 shadow-2xl"
            : "bg-transparent py-4 sm:py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand (Left) */}
          <Link href="#beranda" className="flex items-center gap-3 group">
            <div className="flex flex-col">
              <span className="font-black italic text-2xl sm:text-3xl tracking-tighter text-[#E50914] font-display leading-none group-hover:text-red-400 transition-colors">
                RKC
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-white uppercase mt-0.5 font-display">
                RACING KYOKUSHIN CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Center) */}
          <nav className="hidden xl:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm font-semibold transition-all relative py-1 ${isActive ? "text-[#E50914]" : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#E50914] rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTA Button (Only visible on Desktop xl+, hidden on iPad and mobile) */}
          <div className="hidden xl:flex items-center gap-3">
            <Link
              href="/pendaftaran"
              className="bg-[#E50914] hover:bg-[#c40811] text-white text-xs sm:text-sm font-extrabold py-2.5 sm:py-3 px-6 sm:px-7 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-red-glow hover:shadow-red-glow-lg tracking-wide uppercase cursor-pointer"
            >
              DAFTAR SEKARANG
            </Link>
          </div>

          {/* Mobile & Tablet (iPad) Menu Toggle (Garis 3) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="xl:hidden p-2.5 rounded-xl text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Fullscreen Mobile Navigation Drawer (Garis 3 - Sesuai Gambar 3) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="xl:hidden fixed inset-0 z-[100] w-full h-[100dvh] flex flex-col justify-between overflow-y-auto"
            >
              {/* Fullscreen Background: bggaris3.png (Jelas Tanpa Lapisan Gelap) */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <Image
                  src="/images/bggaris3.png"
                  alt="Menu Background"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center w-full h-full"
                />
              </div>

              {/* Top Header Bar inside Drawer */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                {/* Brand Logo */}
                <Link
                  href="#beranda"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex flex-col">
                    <span className="font-black italic text-2xl tracking-tighter text-[#E50914] font-display leading-none">
                      RKC
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-white uppercase mt-0.5 font-display">
                      RACING KYOKUSHIN CLUB
                    </span>
                  </div>
                </Link>

                {/* Close Button 'X' */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all border border-white/20 cursor-pointer shadow-lg backdrop-blur-sm"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Center Navigation Links (Matching Image 3 style) */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-3.5 px-6 my-auto w-full max-w-sm mx-auto">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`w-full text-center py-3.5 px-6 rounded-2xl transition-all font-display uppercase tracking-wider text-base sm:text-lg ${isActive
                        ? "bg-black/60 border border-white/30 text-white font-black shadow-2xl backdrop-blur-sm"
                        : "text-gray-200 hover:text-white hover:bg-black/30 font-bold"
                        }`}
                    >
                      {link.name}
                    </a>
                  );
                })}
              </div>

              {/* Bottom Action Area (Hanya DAFTAR SEKARANG) */}
              <div className="relative z-10 p-6 pb-10 flex flex-col w-full max-w-sm mx-auto">
                <Link
                  href="/pendaftaran"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full bg-[#E50914] hover:bg-[#c40811] text-white font-extrabold py-4 px-6 rounded-full text-center shadow-red-glow uppercase tracking-wider text-sm transition-all"
                >
                  DAFTAR SEKARANG
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ========================================================================= */}
      {/* 2. HERO / BERANDA (100dvh Fullscreen di Layar Mobile, Pas di Tengah)     */}
      {/* ========================================================================= */}
      <section
        id="beranda"
        className="relative w-full h-[100dvh] min-h-[100dvh] flex flex-col justify-center overflow-hidden py-0"
      >
        {/* Background Image: Mobile vs Desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Mobile Background: 100% Full Cover */}
          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/images/bgberandamobile.png"
              alt="RKC Kyokushin Club Background Mobile"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center w-full h-full"
            />
          </div>

          {/* Desktop Background */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src="/images/bgberanda.png"
              alt="RKC Kyokushin Club Background"
              fill
              priority
              sizes="100vw"
              className="object-cover lg:object-fill w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none lg:w-3/5" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-4 sm:space-y-5">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[#E50914] font-black text-xs sm:text-sm tracking-[0.25em] uppercase block font-display">
                KARATE KYOKUSHIN
              </span>
            </motion.div>

            {/* Main Hero Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-0.5 sm:space-y-1"
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black italic tracking-tight uppercase leading-[0.95] font-display">
                <span className="text-white block drop-shadow-md whitespace-nowrap">
                  RACING KYOKUSHIN
                </span>
                <span className="text-[#E50914] block mt-1 drop-shadow-md whitespace-nowrap">
                  CLUB MAKASSAR
                </span>
              </h1>
            </motion.div>

            {/* Sub-slogan & Description (Exact Match Image 1) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 sm:space-y-2.5 pt-0.5"
            >
              <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-bold text-gray-300 tracking-[0.22em] uppercase font-display">
                DISCIPLINE BUILDS A BETTER TOMORROW
              </p>
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg font-normal">
                Bangun disiplin, kekuatan, dan karakter <br className="hidden sm:inline" />
                melalui Karate Kyokushin bersama kami.
              </p>
            </motion.div>

            {/* CTA Action Buttons (Berdampingan Kiri - Kanan) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2.5 sm:gap-4 pt-1"
            >
              <Link
                href="/pendaftaran"
                className="bg-[#E50914] hover:bg-[#c40811] text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-red-glow hover:shadow-red-glow-lg tracking-wider uppercase text-center whitespace-nowrap cursor-pointer"
              >
                DAFTAR SEKARANG
              </Link>

              <a
                href="#program"
                className="bg-transparent hover:bg-white/10 border border-white/40 hover:border-white text-white font-bold text-xs sm:text-sm py-3 sm:py-3.5 px-4 sm:px-7 rounded-xl sm:rounded-2xl transition-all duration-300 tracking-wider uppercase text-center whitespace-nowrap cursor-pointer"
              >
                LIHAT PROGRAM
              </a>
            </motion.div>

            {/* 4 Pillars / Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="pt-3 sm:pt-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 sm:divide-x divide-white/20 max-w-xl lg:max-w-2xl">
                {/* Pillar 1 */}
                <div className="sm:pr-4">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                    Disiplin
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Dalam Latihan
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="sm:px-4">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                    Kuat
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Dalam Karakter
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="sm:px-4">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                    Bersatu
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Dalam Dojo
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="sm:pl-4">
                  <h4 className="font-extrabold text-white text-xs sm:text-sm tracking-wide">
                    Lebih Baik
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Untuk Masa Depan
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side Vertical Badge: OSU NEVER GIVE UP */}
        <div className="hidden lg:flex absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col items-center gap-2 pointer-events-none text-right z-10">
          <div className="w-[1.5px] h-10 bg-red-600/70" />
          <div className="text-[10px] font-black tracking-[0.25em] text-gray-300 uppercase [writing-mode:vertical-lr] flex items-center gap-2">
            <span>OSU</span>
            <span>&bull;</span>
            <span>NEVER</span>
            <span>GIVE</span>
            <span>UP</span>
          </div>
          <div className="w-[1.5px] h-10 bg-red-600/70" />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TENTANG KAMI SECTION                                                   */}
      {/* ========================================================================= */}
      <section
        id="tentang"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Exact 100% Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/bgtentangkami.png"
            alt="Tentang Kami Background"
            fill
            sizes="100vw"
            className="object-cover lg:object-fill w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Dogi & Black Belt Photo Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] aspect-[4/3] sm:aspect-[1/1] max-w-sm sm:max-w-md mx-auto lg:max-w-none group">
                <Image
                  src="/images/tentangkamifoto.png"
                  alt="Racing Kyokushin Club Karate Dogi & Belt"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right Column: About Description & Stat Counters */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-4 sm:space-y-5"
            >
              <div className="space-y-1 sm:space-y-1.5">
                <span className="text-[#E50914] font-black text-xs sm:text-sm tracking-[0.25em] uppercase block font-display">
                  TENTANG KAMI
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tight uppercase font-display">
                  <span className="text-white">RACING </span>
                  <span className="text-[#E50914]">KYOKUSHIN CLUB</span>
                </h2>
              </div>

              <p className="text-gray-300 text-xs sm:text-sm lg:text-base leading-relaxed text-justify sm:text-left max-w-2xl">
                Racing Kyokushin Club adalah dojo yang berfokus pada pembinaan karakter, disiplin, dan kemampuan fisik melalui karate Kyokushin. Kami percaya bahwa latihan tidak hanya membentuk tubuh yang kuat, tetapi juga mental yang tangguh dan pribadi yang lebih baik untuk masa depan.
              </p>

              <div>
                <a
                  href="#program"
                  className="inline-block text-xs sm:text-sm font-extrabold text-[#E50914] hover:text-red-400 transition-colors group cursor-pointer"
                >
                  Pelajari Lebih Lanjut
                </a>
              </div>

              {/* 4 Stats Grid dengan Vertical Divider (Center Alignment di Semua Ukuran Layar) */}
              <div className="pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-white/15">
                {/* Stat 1: Murid Aktif */}
                <div className="space-y-2 sm:px-4 flex flex-col items-center text-center">
                  <div className="h-11 sm:h-12 flex items-center justify-center">
                    <Image
                      src="/images/badgemuridaktif.png"
                      alt="Murid Aktif"
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-display block">
                      4
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 block mt-0.5">
                      Murid Aktif
                    </span>
                  </div>
                </div>

                {/* Stat 2: Pelatih */}
                <div className="space-y-2 sm:px-4 flex flex-col items-center text-center">
                  <div className="h-11 sm:h-12 flex items-center justify-center">
                    <Image
                      src="/images/badgepelatih.png"
                      alt="Pelatih"
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-display block">
                      1
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 block mt-0.5">
                      Pelatih
                    </span>
                  </div>
                </div>

                {/* Stat 3: Tahun Berdiri */}
                <div className="space-y-2 sm:px-4 flex flex-col items-center text-center">
                  <div className="h-11 sm:h-12 flex items-center justify-center">
                    <Image
                      src="/images/badgetahunberdiri.png"
                      alt="Tahun Berdiri"
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-display block">
                      2026
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 block mt-0.5">
                      Tahun Berdiri
                    </span>
                  </div>
                </div>

                {/* Stat 4: Program Latihan */}
                <div className="space-y-2 sm:px-4 flex flex-col items-center text-center">
                  <div className="h-11 sm:h-12 flex items-center justify-center">
                    <Image
                      src="/images/badgeprogramlatihan.png"
                      alt="Program Latihan"
                      width={56}
                      height={56}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-white font-display block">
                      1
                    </span>
                    <span className="text-[11px] sm:text-xs text-gray-400 block mt-0.5">
                      Program Latihan
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PROGRAM LATIHAN SECTION (Anak, Remaja, Dewasa)                         */}
      {/* ========================================================================= */}
      <section
        id="program"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Exact 100% Background Image from bgprogramlatihan.png */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/bgprogramlatihan.png"
            alt="Program Latihan Background"
            fill
            sizes="100vw"
            className="object-cover lg:object-fill w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section (Sesuai Gambar 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12"
          >
            <div className="space-y-2 max-w-xl">
              <span className="text-[#E50914] font-black text-xs sm:text-sm tracking-[0.25em] uppercase block font-display">
                PROGRAM LATIHAN
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black italic tracking-tight uppercase font-display text-white">
                TEMUKAN KELAS <br className="hidden sm:inline" />
                <span className="text-white">YANG TEPAT UNTUKMU</span>
              </h2>
            </div>

            <div className="max-w-lg space-y-2 text-left">
              <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed text-left font-normal">
                Kami menyediakan program latihan untuk berbagai usia dan <br className="hidden sm:inline" />
                tingkat kemampuan, dengan metode Kyokushin yang terstruktur <br className="hidden sm:inline" />
                dan disiplin.
              </p>
            </div>
          </motion.div>

          {/* 3 Program Cards (Anak, Remaja, Dewasa) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Anak */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#121216]/90 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/programlatihankelasanak.png"
                  alt="Anak Karate Kyokushin"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase italic font-display">
                      ANAK
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Dasar karate, disiplin, koordinasi, dan kepercayaan diri.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/pendaftaran"
                    className="w-full py-2.5 px-4 rounded-xl border border-red-600/50 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center shadow-sm group-hover:border-red-500"
                  >
                    LIHAT DETAIL
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Remaja */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6 }}
              className="bg-[#121216]/90 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/programlatihankelasremaja.png"
                  alt="Remaja Karate Kyokushin"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase italic font-display">
                      REMAJA
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Pengembangan teknik, fisik, mental, dan karakter.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/pendaftaran"
                    className="w-full py-2.5 px-4 rounded-xl border border-red-600/50 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center shadow-sm group-hover:border-red-500"
                  >
                    LIHAT DETAIL
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Dewasa */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -6 }}
              className="bg-[#121216]/90 border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/programlatihankelasdewasa.png"
                  alt="Dewasa Karate Kyokushin"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-black text-white uppercase italic font-display">
                      DEWASA
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    Teknik Kyokushin, kebugaran, conditioning, dan pengembangan kemampuan.
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    href="/pendaftaran"
                    className="w-full py-2.5 px-4 rounded-xl border border-red-600/50 hover:bg-red-600 text-white font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center shadow-sm group-hover:border-red-500"
                  >
                    LIHAT DETAIL
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MENGAPA BERGABUNG DENGAN RKC? (Mobile 2x2 & bergabungdirckmobile.png) */}
      {/* ========================================================================= */}
      <section
        id="mengapa"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden text-slate-900 selection:bg-red-600 selection:text-white"
      >
        {/* Background Image: Mobile vs Desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Mobile Background */}
          <div className="block lg:hidden absolute inset-0">
            <Image
              src="/images/bergabungdirckmobile.png"
              alt="Mengapa Bergabung Background Mobile"
              fill
              sizes="100vw"
              className="object-cover object-top w-full h-full"
              priority
            />
          </div>
          {/* Desktop Background */}
          <div className="hidden lg:block absolute inset-0">
            <Image
              src="/images/bergabungdirck.png"
              alt="Mengapa Bergabung Background"
              fill
              sizes="100vw"
              className="object-cover lg:object-fill w-full h-full"
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Title on Left, Quote on Right */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-10 sm:mb-12"
          >
            {/* Left Title */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-tight uppercase font-display leading-[1.05]">
                <span className="text-[#E50914] block">MENGAPA BERGABUNG</span>
                <span className="text-slate-900 block mt-1">DENGAN RKC?</span>
              </h2>
              <div className="w-10 h-[3px] bg-[#E50914] rounded-full mt-2" />
            </div>

            {/* Right Quote */}
            <div className="max-w-md lg:text-right space-y-1.5">
              <p className="italic text-slate-800 font-semibold text-xs sm:text-base leading-snug">
                &ldquo;Bukan hanya tentang teknik, <br className="hidden sm:inline" />
                tapi tentang membentuk karakter <br className="hidden sm:inline" />
                yang lebih kuat.&rdquo;
              </p>
              <div className="w-12 h-[2.5px] bg-[#E50914] rounded-full lg:ml-auto mt-2" />
            </div>
          </motion.div>

          {/* 4 Feature Columns: 2x2 on Mobile/Tablet, 4-Col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 sm:gap-6 lg:gap-0 lg:divide-x divide-slate-300/80 pt-2 pb-6">
            {/* Feature 01: Disiplin */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2.5 sm:space-y-3 lg:px-6 first:lg:pl-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/badgedisplin.png"
                    alt="Disiplin Badge"
                    width={56}
                    height={56}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="text-xl sm:text-3xl font-black font-display text-slate-400">01</span>
              </div>
              <h4 className="text-sm sm:text-lg font-black text-slate-900 font-display leading-tight">Disiplin</h4>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                Melatih kedisiplinan dalam setiap aspek kehidupan, baik di dojo maupun di luar dojo.
              </p>
            </motion.div>

            {/* Feature 02: Fisik & Mental */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2.5 sm:space-y-3 lg:px-6"
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/badgefisik.png"
                    alt="Fisik & Mental Badge"
                    width={56}
                    height={56}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="text-xl sm:text-3xl font-black font-display text-slate-400">02</span>
              </div>
              <h4 className="text-sm sm:text-lg font-black text-slate-900 font-display leading-tight">Fisik & Mental</h4>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                Membangun kekuatan fisik, ketahanan mental, dan kepercayaan diri.
              </p>
            </motion.div>

            {/* Feature 03: Lingkungan Positif */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2.5 sm:space-y-3 lg:px-6"
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/badgelingkungan.png"
                    alt="Lingkungan Positif Badge"
                    width={56}
                    height={56}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="text-xl sm:text-3xl font-black font-display text-slate-400">03</span>
              </div>
              <h4 className="text-sm sm:text-lg font-black text-slate-900 font-display leading-tight">Lingkungan Positif</h4>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                Bergabung dengan komunitas yang suportif, saling memotivasi, dan berjiwa sportiv.
              </p>
            </motion.div>

            {/* Feature 04: Nilai & Kehidupan */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2.5 sm:space-y-3 lg:px-6 last:lg:pr-0"
            >
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0">
                  <Image
                    src="/images/badgenila.png"
                    alt="Nilai & Kehidupan Badge"
                    width={56}
                    height={56}
                    className="w-10 h-10 sm:w-14 sm:h-14 object-contain"
                  />
                </div>
                <span className="text-xl sm:text-3xl font-black font-display text-slate-400">04</span>
              </div>
              <h4 className="text-sm sm:text-lg font-black text-slate-900 font-display leading-tight">Nilai & Kehidupan</h4>
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                Mengajarkan nilai hormat, kerendahan hati, dan semangat pantang menyerah.
              </p>
            </motion.div>
          </div>

          {/* Bottom Left Dojo Mark */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="pt-6 flex items-center gap-2 text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] font-display"
          >
            <span>RACING KYOKUSHIN CLUB</span>
            <div className="w-6 h-[2px] bg-[#E50914]" />
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PELATIHAN KAMI (1 Baris: INSTRUKTUR KYOKUSHIN)                     */}
      {/* ========================================================================= */}
      <section
        id="pelatih"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Exact 100% Background Image from pelatihankamia.png */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/pelatihankamia.png"
            alt="Pelatihan Kami Background"
            fill
            sizes="100vw"
            className="object-cover lg:object-fill w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none lg:w-3/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8 space-y-4"
            >
              <span className="text-[#E50914] font-black text-xs sm:text-sm tracking-[0.25em] uppercase block font-display">
                PELATIHAN KAMI
              </span>
              <h2 className="text-[19px] xs:text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-tight uppercase font-display text-white leading-tight">
                DIBIMBING OLEH <br />
                <span className="text-white whitespace-nowrap">INSTRUKTUR KYOKUSHIN</span>
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Latih dengan pelatih yang berdedikasi, berpengalaman, dan memegang teguh nilai-nilai Kyokushin.
              </p>
              <div className="pt-2">
                <Link
                  href="/pendaftaran"
                  className="inline-block px-7 py-3.5 bg-[#E50914] hover:bg-[#c40811] text-white font-extrabold text-xs sm:text-sm rounded-xl uppercase tracking-wider shadow-red-glow transition-all"
                >
                  LIHAT PROFIL LENGKAP
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. JADWAL LATIHAN & GALERI RKC (Jadwal: 1 Row Saja)                        */}
      {/* ========================================================================= */}
      <section
        id="jadwal"
        className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden"
      >
        {/* Exact 100% Background Image from pelatihankamijadwal.png */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="/images/pelatihankamijadwal.png"
            alt="Jadwal Latihan & Galeri Background"
            fill
            sizes="100vw"
            className="object-cover lg:object-fill w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Jadwal Latihan (1 Baris Reguler Saja) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black italic text-[#E50914] uppercase font-display">
                  JADWAL LATIHAN
                </h3>
                <p className="text-xs sm:text-sm text-gray-300">
                  Pilih waktu latihan yang sesuai dengan aktivitasmu.
                </p>
              </div>

              <div className="bg-[#121216]/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5 text-gray-400 font-bold">
                      <th className="py-3.5 px-4 sm:px-5">Kelas</th>
                      <th className="py-3.5 px-4 sm:px-5">Hari</th>
                      <th className="py-3.5 px-4 sm:px-5">Jam</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4 sm:px-5 font-bold text-white">Reguler</td>
                      <td className="py-4 px-4 sm:px-5 text-gray-300">Selasa</td>
                      <td className="py-4 px-4 sm:px-5 font-mono text-gray-200">16.00 – 17.30</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Right Column: Galeri RKC (6 Thumbnails Grid) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              id="galeri"
              className="lg:col-span-7 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black italic text-[#E50914] uppercase font-display">
                    GALERI RKC
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300">
                    Momen latihan, ujian, dan kegiatan kami.
                  </p>
                </div>

                <a
                  href="#galeri"
                  className="text-xs sm:text-sm font-bold text-[#E50914] hover:text-red-400 transition-colors"
                >
                  Lihat Semua
                </a>
              </div>

              {/* 6 Thumbnail Grid */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                {[
                  {
                    src: "/images/bgberanda.png",
                    alt: "Latihan Dojo Kyokushin",
                  },
                  {
                    src: "/images/pelatihankamia.png",
                    alt: "Instruktur Karate Kyokushin",
                  },
                  {
                    src: "/images/programlatihankelasanak.png",
                    alt: "Kelas Anak Karate",
                  },
                  {
                    src: "/images/tentangkamifoto.png",
                    alt: "Sabuk Hitam Kyokushin",
                  },
                  {
                    src: "/images/programlatihankelasremaja.png",
                    alt: "Latihan Fisik Remaja",
                  },
                  {
                    src: "/images/programlatihankelasdewasa.png",
                    alt: "Kumite & Sparring",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: 0.08 * idx }}
                    whileHover={{ scale: 1.03 }}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-[#15151a]/80 group cursor-pointer shadow-md backdrop-blur-sm"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 33vw, 20vw"
                      className="object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CTA BANNER (Mobile: bgbergbaungdengankamimobile.png, Desktop: bgbergbaungdengankami.png) */}
      {/* ========================================================================= */}
      <section
        id="kontak"
        className="relative w-full aspect-[941/1200] sm:aspect-[2022/778] min-h-[380px] sm:min-h-[350px] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[540px] flex items-center overflow-hidden py-12 sm:py-0"
      >
        {/* Background Image: Mobile vs Desktop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Mobile Background */}
          <div className="block sm:hidden absolute inset-0">
            <Image
              src="/images/bgbergbaungdengankamimobile.png"
              alt="Siap Memulai Perjalanan Kyokushin Background Mobile"
              fill
              sizes="100vw"
              className="object-cover object-center w-full h-full"
              priority
            />
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          </div>

          {/* Desktop Background */}
          <div className="hidden sm:block absolute inset-0">
            <Image
              src="/images/bgbergbaungdengankami.png"
              alt="Siap Memulai Perjalanan Kyokushin Background"
              fill
              sizes="100vw"
              className="object-fill w-full h-full"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="max-w-md sm:max-w-lg lg:max-w-xl space-y-3 sm:space-y-4"
          >
            {/* Heading (1 Baris PERJALANAN KYOKUSHIN? Sesuai Gambar 1) */}
            <div className="space-y-0.5 sm:space-y-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tight uppercase font-display leading-[1.05]">
                <span className="text-white block whitespace-nowrap">SIAP MEMULAI</span>
                <span className="text-[#E50914] block mt-0.5 sm:mt-1 whitespace-nowrap">
                  PERJALANAN KYOKUSHIN?
                </span>
              </h2>
            </div>

            {/* Description (Sesuai Gambar 1) */}
            <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed font-normal max-w-xs sm:max-w-md">
              Bergabung bersama Racing Kyokushin Club dan mulai <br className="hidden sm:inline" />
              perjalananmu hari ini.
            </p>

            {/* CTA Button */}
            <div className="pt-1.5 sm:pt-2">
              <Link
                href="/pendaftaran"
                className="inline-block bg-[#E50914] hover:bg-[#c40811] text-white font-extrabold text-xs sm:text-sm py-3 sm:py-3.5 px-7 sm:px-9 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-red-glow hover:shadow-red-glow-lg uppercase tracking-wider cursor-pointer"
              >
                DAFTAR SEKARANG
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FOOTER (Menu Cepat & Copyright Bar Dihapus Sesuai Permintaan)           */}
      {/* ========================================================================= */}
      <footer className="bg-[#050507] border-t border-white/10 py-12 text-xs text-gray-400">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Column 1: Brand & Contact Info (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Logo */}
              <Link href="#beranda" className="inline-block">
                <div className="flex flex-col">
                  <span className="font-black italic text-2xl sm:text-3xl tracking-tighter text-[#E50914] font-display leading-none">
                    RKC
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-white uppercase mt-0.5 font-display">
                    RACING KYOKUSHIN CLUB
                  </span>
                </div>
              </Link>

              {/* Address */}
              <div className="flex items-start gap-2.5 text-xs text-gray-300 leading-relaxed pt-1">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Jl. Sukamaju 1 No. 28 RT 005/RW 006</p>
                  <p>Kel. Tamamaung, Kec. Panakkukang</p>
                  <p>Kota Makassar, Sulawesi Selatan</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <a
                  href="https://wa.me/62815527641306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white font-medium transition-colors"
                >
                  +62 815 5276 41306
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all border border-white/10"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all border border-white/10"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all border border-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-400 flex items-center justify-center transition-all border border-white/10"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Lokasi Dojo (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-3">
              <h5 className="font-extrabold text-white text-xs uppercase tracking-wider font-display">
                Lokasi Dojo
              </h5>

              {/* Styled Maps Visual Card */}
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-white/15 bg-[#181822] shadow-inner group">
                <iframe
                  title="Lokasi Racing Kyokushin Club Makassar"
                  src="https://maps.google.com/maps?q=Jl.+Sukamaju+1+No.+28+Tamamaung+Panakkukang+Makassar&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter invert contrast-125 opacity-70 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl" />
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Jl.+Sukamaju+1+No.+28+Tamamaung+Panakkukang+Makassar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all hover:border-white/20"
                >
                  Buka di Google Maps
                </a>
              </div>
            </div>

            {/* Column 3: Dojo Motto & Quote (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-3 lg:pl-2">
              <p className="italic text-gray-300 text-xs sm:text-sm leading-relaxed">
                &ldquo;Karate bukan tentang siapa yang lebih kuat, tetapi siapa yang tidak pernah menyerah.&rdquo;
              </p>

              {/* Red line */}
              <div className="w-8 h-[2px] bg-[#E50914]" />

              <div className="text-[11px] font-bold tracking-[0.2em] text-gray-400 space-y-0.5 uppercase">
                <div>OSU</div>
                <div>NEVER</div>
                <div>GIVE UP</div>
              </div>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
