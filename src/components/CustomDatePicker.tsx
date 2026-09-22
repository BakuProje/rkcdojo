"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Check,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";

interface CustomDatePickerProps {
  value?: string; // YYYY-MM-DD
  onChange: (dateISO: string, calculatedAge?: number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  minYear?: number;
  maxYear?: number;
  disabled?: boolean;
}

const MONTH_NAMES_ID = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const MONTH_SHORT_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const DAY_NAMES_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

export default function CustomDatePicker({
  value = "",
  onChange,
  placeholder = "Pilih tanggal lahir",
  label,
  error,
  minYear = 1950,
  maxYear = new Date().getFullYear(),
  disabled = false,
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");
  const containerRef = useRef<HTMLDivElement>(null);
  const yearsContainerRef = useRef<HTMLDivElement>(null);

  // Parse initial selected date
  const parsedValue = useMemo(() => {
    if (!value) return null;
    const parts = value.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    return null;
  }, [value]);

  // Current view state (Year & Month shown in calendar)
  const [currentYear, setCurrentYear] = useState(() => {
    return parsedValue ? parsedValue.getFullYear() : 2008; // default to a teen birth year for Karate
  });
  const [currentMonth, setCurrentMonth] = useState(() => {
    return parsedValue ? parsedValue.getMonth() : 0;
  });

  // Keep view state in sync when value changes externally
  useEffect(() => {
    if (parsedValue) {
      setCurrentYear(parsedValue.getFullYear());
      setCurrentMonth(parsedValue.getMonth());
    }
  }, [parsedValue]);

  // Close on outside click
  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handlePointerDown);
      document.addEventListener("touchstart", handlePointerDown);
    }
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [isOpen]);

  // Auto scroll to current year in year selection mode
  useEffect(() => {
    if (viewMode === "years" && yearsContainerRef.current) {
      const activeYearBtn = yearsContainerRef.current.querySelector(
        `[data-year="${currentYear}"]`
      ) as HTMLElement;
      if (activeYearBtn) {
        activeYearBtn.scrollIntoView({ block: "center", behavior: "smooth" });
      }
    }
  }, [viewMode, currentYear]);

  // Calculate age helper
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : 0;
  };

  // Select day handler
  const handleSelectDay = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    const yyyy = selectedDate.getFullYear();
    const mm = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const dd = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const age = calculateAge(selectedDate);

    onChange(dateStr, age);
    setIsOpen(false);
    setViewMode("days");
  };

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      if (currentYear > minYear) {
        setCurrentYear((prev) => prev - 1);
        setCurrentMonth(11);
      }
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      if (currentYear < maxYear) {
        setCurrentYear((prev) => prev + 1);
        setCurrentMonth(0);
      }
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // Quick category shortcuts
  const handleCategoryPreset = (category: "kids" | "teens" | "adults") => {
    const today = new Date();
    let targetYear = today.getFullYear() - 15; // default 15 th (Remaja)
    if (category === "kids") targetYear = today.getFullYear() - 9; // 9 th (Anak)
    if (category === "adults") targetYear = today.getFullYear() - 20; // 20 th (Dewasa)

    setCurrentYear(targetYear);
    setCurrentMonth(today.getMonth());
    setViewMode("days");
  };

  // Calendar days grid generation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Minggu
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  // Formatted display text (DD-MM-YYYY format, e.g. 13-09-2006)
  const displayFormattedDate = useMemo(() => {
    if (!parsedValue) return "";
    const day = String(parsedValue.getDate()).padStart(2, "0");
    const month = String(parsedValue.getMonth() + 1).padStart(2, "0");
    const year = parsedValue.getFullYear();
    return `${day}-${month}-${year}`;
  }, [parsedValue]);

  // List of all selectable years (Newest to Oldest)
  const yearsList = useMemo(() => {
    const list: number[] = [];
    for (let y = maxYear; y >= minYear; y--) {
      list.push(y);
    }
    return list;
  }, [minYear, maxYear]);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <label className="block text-[11px] sm:text-xs font-medium text-gray-200 mb-1 truncate">
          {label}
        </label>
      )}

      {/* TRIGGER BUTTON (Sleek Dark Input with Red Calendar Icon) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen((prev) => !prev);
            setViewMode("days");
          }
        }}
        className={`w-full bg-[#121216]/95 text-xs sm:text-sm rounded-xl py-2 sm:py-2.5 pl-8 sm:pl-9 pr-7 sm:pr-8 border text-left transition-all cursor-pointer relative shadow-inner flex items-center justify-between group ${
          error
            ? "border-red-500 ring-1 ring-red-500/50"
            : isOpen
            ? "border-red-500 ring-2 ring-red-500/30 bg-[#16161c]"
            : "border-white/10 hover:border-white/20 hover:bg-[#16161c]"
        }`}
      >
        {/* Left Calendar Icon */}
        <div className="absolute inset-y-0 left-0 pl-2.5 sm:pl-3 flex items-center pointer-events-none text-red-500">
          <CalendarIcon className="w-3.5 h-3.5 fill-red-500/20" />
        </div>

        {/* Text */}
        <span className={`truncate font-medium ${parsedValue ? "text-white font-mono" : "text-gray-500"}`}>
          {displayFormattedDate || placeholder}
        </span>

        {/* Right Chevron / Clear */}
        <div className="absolute inset-y-0 right-0 pr-2 sm:pr-2.5 flex items-center gap-1">
          {value && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onChange("", undefined);
              }}
              className="p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              title="Reset Tanggal"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <ChevronDown
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-red-400" : "group-hover:text-gray-300"
            }`}
          />
        </div>
      </button>

      {/* POPUP CALENDAR MODAL / POPOVER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 6 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 z-50 mt-1.5 w-full min-w-[280px] sm:min-w-[320px] max-w-[340px] bg-[#121216] border border-red-500/30 rounded-2xl p-3 sm:p-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl space-y-2.5"
            style={{
              boxShadow: "0 10px 30px -5px rgba(220, 38, 38, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)",
            }}
          >
            {/* 1. Quick Presets Bar (2-Baris Rapi: Nama Kategori & Rentang Usia) */}
            <div className="grid grid-cols-3 gap-1.5 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => handleCategoryPreset("kids")}
                className="py-1.5 px-1 rounded-xl text-center bg-white/5 hover:bg-red-600/25 hover:text-red-300 border border-white/5 hover:border-red-500/30 text-gray-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 group"
              >
                <span className="text-[11px] font-bold tracking-wide group-hover:text-white">Anak</span>
                <span className="text-[9.5px] font-medium text-gray-400 group-hover:text-red-300/90">(6-12)</span>
              </button>
              <button
                type="button"
                onClick={() => handleCategoryPreset("teens")}
                className="py-1.5 px-1 rounded-xl text-center bg-white/5 hover:bg-red-600/25 hover:text-red-300 border border-white/5 hover:border-red-500/30 text-gray-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 group"
              >
                <span className="text-[11px] font-bold tracking-wide group-hover:text-white">Remaja</span>
                <span className="text-[9.5px] font-medium text-gray-400 group-hover:text-red-300/90">(13-17)</span>
              </button>
              <button
                type="button"
                onClick={() => handleCategoryPreset("adults")}
                className="py-1.5 px-1 rounded-xl text-center bg-white/5 hover:bg-red-600/25 hover:text-red-300 border border-white/5 hover:border-red-500/30 text-gray-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 group"
              >
                <span className="text-[11px] font-bold tracking-wide group-hover:text-white">Dewasa</span>
                <span className="text-[9.5px] font-medium text-gray-400 group-hover:text-red-300/90">(18+)</span>
              </button>
            </div>

            {/* 2. Header: Month & Year Selector + Arrows */}
            <div className="flex items-center justify-between gap-1">
              <button
                type="button"
                onClick={prevMonth}
                disabled={viewMode !== "days" || (currentYear === minYear && currentMonth === 0)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer"
                title="Bulan Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {/* Month Button */}
                <button
                  type="button"
                  onClick={() => setViewMode((prev) => (prev === "months" ? "days" : "months"))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === "months"
                      ? "bg-red-600 text-white shadow"
                      : "bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <span>{MONTH_NAMES_ID[currentMonth]}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>

                {/* Year Button */}
                <button
                  type="button"
                  onClick={() => setViewMode((prev) => (prev === "years" ? "days" : "years"))}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    viewMode === "years"
                      ? "bg-red-600 text-white shadow"
                      : "bg-white/5 text-gray-200 hover:bg-white/10"
                  }`}
                >
                  <span>{currentYear}</span>
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </div>

              <button
                type="button"
                onClick={nextMonth}
                disabled={viewMode !== "days" || (currentYear === maxYear && currentMonth === 11)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors disabled:opacity-30 cursor-pointer"
                title="Bulan Berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3A. VIEW MODE: MONTHS GRID */}
            {viewMode === "months" && (
              <div className="grid grid-cols-3 gap-1.5 py-2 animate-fadeIn">
                {MONTH_NAMES_ID.map((name, idx) => {
                  const isCurrent = currentMonth === idx;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        setCurrentMonth(idx);
                        setViewMode("days");
                      }}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-md shadow-red-950/50"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {name}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3B. VIEW MODE: YEARS GRID (Fast Scrollable) */}
            {viewMode === "years" && (
              <div
                ref={yearsContainerRef}
                className="grid grid-cols-4 gap-1.5 max-h-[190px] overflow-y-auto p-1 py-2 pr-1.5 [scrollbar-width:thin] [scrollbar-color:#ef4444_transparent]"
              >
                {yearsList.map((y) => {
                  const isCurrent = currentYear === y;
                  return (
                    <button
                      key={y}
                      data-year={y}
                      type="button"
                      onClick={() => {
                        setCurrentYear(y);
                        setViewMode("days");
                      }}
                      className={`py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center justify-center ${
                        isCurrent
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold shadow-md shadow-red-950/50"
                          : "bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {y}
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3C. VIEW MODE: DAYS MATRIX GRID */}
            {viewMode === "days" && (
              <div className="space-y-1">
                {/* Day Names Header */}
                <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 py-1">
                  {DAY_NAMES_ID.map((d, i) => (
                    <span key={d} className={i === 0 ? "text-red-400 font-extrabold" : ""}>
                      {d}
                    </span>
                  ))}
                </div>

                {/* Day Cells Matrix */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Previous month empty padded days */}
                  {Array.from({ length: firstDayIndex }).map((_, i) => {
                    const dayNumber = prevMonthDays - firstDayIndex + i + 1;
                    return (
                      <div
                        key={`prev-${i}`}
                        className="w-full aspect-square flex items-center justify-center text-[11px] font-mono text-gray-600/40 select-none rounded-lg"
                      >
                        {dayNumber}
                      </div>
                    );
                  })}

                  {/* Current Month Active Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isSelected =
                      parsedValue &&
                      parsedValue.getFullYear() === currentYear &&
                      parsedValue.getMonth() === currentMonth &&
                      parsedValue.getDate() === day;

                    const today = new Date();
                    const isToday =
                      today.getFullYear() === currentYear &&
                      today.getMonth() === currentMonth &&
                      today.getDate() === day;

                    return (
                      <button
                        key={`day-${day}`}
                        type="button"
                        onClick={() => handleSelectDay(day)}
                        className={`w-full aspect-square rounded-xl text-xs font-mono font-medium flex items-center justify-center transition-all cursor-pointer relative group ${
                          isSelected
                            ? "bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white font-black shadow-[0_0_12px_rgba(220,38,38,0.7)] scale-105"
                            : isToday
                            ? "border border-red-500/50 text-red-300 font-bold bg-red-950/20 hover:bg-white/10"
                            : "text-gray-200 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span>{day}</span>
                        {isSelected && (
                          <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-white animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Footer info bar */}
            {parsedValue && (
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-gray-400">
                <span className="text-gray-300 font-mono font-bold tracking-wider">
                  {displayFormattedDate}
                </span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[10px]">
                  <Check className="w-3 h-3" /> Tanggal Terpilih
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
