"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search,
  Loader2,
  Maximize2,
  Minimize2,
  AlertCircle,
  MapPin,
} from "lucide-react";

interface DojoMapPickerProps {
  lat: number;
  lng: number;
  radius: number;
  onLocationChange: (lat: number, lng: number) => void;
  onRadiusChange?: (radius: number) => void;
}

interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type?: string;
}

export default function DojoMapPicker({
  lat,
  lng,
  radius,
  onLocationChange,
  onRadiusChange,
}: DojoMapPickerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const circleRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResultsDropdown, setShowResultsDropdown] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Map settings - Default to free Google Maps / OSM tiles (No API Key watermark)
  const [mapTheme, setMapTheme] = useState<"street" | "osm" | "satellite">("street");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<string>("");
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  // Debounce search timer
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 100% Free Tile Providers (No API Key Required, No Watermark)
  const TILE_URLS = {
    street: {
      url: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      attribution: "&copy; Google Maps",
      maxZoom: 20,
    },
    osm: {
      url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    },
    satellite: {
      url: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
      attribution: "&copy; Google Satellite",
      maxZoom: 20,
    },
  };

  // Reverse geocoding to get readable address
  const fetchAddress = useCallback(async (latitude: number, longitude: number) => {
    setIsLoadingAddress(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            "Accept-Language": "id,en",
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (data && data.display_name) {
          setCurrentAddress(data.display_name);
        } else {
          setCurrentAddress("Titik Koordinat Kustom");
        }
      }
    } catch {
      setCurrentAddress("Koordinat Terpilih");
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  // Initialize Map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === "undefined" || !mapContainerRef.current) return;

      // Dynamically import Leaflet
      const L = (await import("leaflet")).default;
      if (!isMounted || !mapContainerRef.current) return;

      // If map is already initialized, don't recreate
      if (mapInstanceRef.current) return;

      const initialLat = typeof lat === "number" && !isNaN(lat) && lat !== 0 ? lat : -5.147665;
      const initialLng = typeof lng === "number" && !isNaN(lng) && lng !== 0 ? lng : 119.432732;

      // Custom Clean Circular Dot Marker (Bulat rapi tanpa ikon peta murah)
      const dojoDotIcon = L.divIcon({
        className: "custom-dojo-dot-marker",
        html: `
          <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-auto">
            <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-60 pointer-events-none"></div>
            <div class="relative w-5 h-5 bg-red-600 rounded-full border-2 border-white shadow-[0_0_12px_rgba(220,38,38,0.8)] flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-125 transition-transform">
              <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      // Initialize map instance
      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: 17,
        zoomControl: false,
      });

      // Add zoom control top-right
      L.control.zoom({ position: "topright" }).addTo(map);

      // Add Tile Layer
      const currentTile = TILE_URLS[mapTheme];
      const tileLayer = L.tileLayer(currentTile.url, {
        maxZoom: currentTile.maxZoom,
        attribution: currentTile.attribution,
      }).addTo(map);
      tileLayerRef.current = tileLayer;

      // Add Circle Radius
      const circle = L.circle([initialLat, initialLng], {
        radius: radius || 50,
        color: "#ef4444",
        fillColor: "#ef4444",
        fillOpacity: 0.22,
        weight: 2,
        dashArray: "4, 6",
      }).addTo(map);
      circleRef.current = circle;

      // Add Draggable Dot Marker
      const marker = L.marker([initialLat, initialLng], {
        icon: dojoDotIcon,
        draggable: true,
      }).addTo(map);
      markerRef.current = marker;

      // Marker drag event
      marker.on("drag", (e: any) => {
        const pos = e.target.getLatLng();
        if (circleRef.current) {
          circleRef.current.setLatLng(pos);
        }
      });

      marker.on("dragend", (e: any) => {
        const pos = e.target.getLatLng();
        const newLat = parseFloat(pos.lat.toFixed(6));
        const newLng = parseFloat(pos.lng.toFixed(6));
        onLocationChange(newLat, newLng);
        fetchAddress(newLat, newLng);
      });

      // Map Click event (jump dot to clicked point)
      map.on("click", (e: any) => {
        const clickLat = parseFloat(e.latlng.lat.toFixed(6));
        const clickLng = parseFloat(e.latlng.lng.toFixed(6));
        marker.setLatLng([clickLat, clickLng]);
        if (circleRef.current) {
          circleRef.current.setLatLng([clickLat, clickLng]);
        }
        onLocationChange(clickLat, clickLng);
        fetchAddress(clickLat, clickLng);
      });

      mapInstanceRef.current = map;

      // Initial address fetch
      fetchAddress(initialLat, initialLng);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when map theme changes
  useEffect(() => {
    let isMounted = true;
    async function updateTile() {
      if (!mapInstanceRef.current || !tileLayerRef.current) return;
      const L = (await import("leaflet")).default;
      if (!isMounted || !mapInstanceRef.current) return;

      mapInstanceRef.current.removeLayer(tileLayerRef.current);
      const newTile = TILE_URLS[mapTheme];
      const newLayer = L.tileLayer(newTile.url, {
        maxZoom: newTile.maxZoom,
        attribution: newTile.attribution,
      }).addTo(mapInstanceRef.current);
      tileLayerRef.current = newLayer;
    }
    updateTile();
    return () => {
      isMounted = false;
    };
  }, [mapTheme]);

  // Update map and marker when lat/lng props change from outside
  useEffect(() => {
    if (!mapInstanceRef.current || !markerRef.current || !circleRef.current) return;
    if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng)) return;

    const currentPos = markerRef.current.getLatLng();
    if (
      Math.abs(currentPos.lat - lat) > 0.000001 ||
      Math.abs(currentPos.lng - lng) > 0.000001
    ) {
      markerRef.current.setLatLng([lat, lng]);
      circleRef.current.setLatLng([lat, lng]);
      mapInstanceRef.current.panTo([lat, lng], { animate: true, duration: 0.8 });
      fetchAddress(lat, lng);
    }
  }, [lat, lng, fetchAddress]);

  // Update circle radius when radius prop changes
  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radius || 50);
    }
  }, [radius]);

  // Invalidate map size on fullscreen toggle or resize
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isFullscreen]);

  // Handle Search input change with debouncing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchError("");

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim() || query.length < 3) {
      setSearchResults([]);
      setShowResultsDropdown(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            query
          )}&limit=6&addressdetails=1`,
          {
            headers: {
              "Accept-Language": "id,en",
            },
          }
        );
        if (res.ok) {
          const data: SearchResult[] = await res.json();
          setSearchResults(data);
          setShowResultsDropdown(data.length > 0);
          if (data.length === 0) {
            setSearchError("Lokasi tidak ditemukan. Coba gunakan nama jalan / daerah yang lebih spesifik.");
          }
        } else {
          setSearchError("Gagal menghubungi server pencarian.");
        }
      } catch {
        setSearchError("Terjadi kesalahan saat mencari lokasi.");
      } finally {
        setIsSearching(false);
      }
    }, 450);
  };

  // Select Search Result
  const handleSelectSearchResult = (result: SearchResult) => {
    const targetLat = parseFloat(parseFloat(result.lat).toFixed(6));
    const targetLng = parseFloat(parseFloat(result.lon).toFixed(6));

    if (mapInstanceRef.current && markerRef.current && circleRef.current) {
      markerRef.current.setLatLng([targetLat, targetLng]);
      circleRef.current.setLatLng([targetLat, targetLng]);
      mapInstanceRef.current.flyTo([targetLat, targetLng], 18, {
        animate: true,
        duration: 1.2,
      });
    }

    onLocationChange(targetLat, targetLng);
    setCurrentAddress(result.display_name);
    setShowResultsDropdown(false);
    setSearchQuery("");
  };

  return (
    <div
      className={`relative flex flex-col bg-[#16161c] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-4 z-50 shadow-2xl border-red-500/50"
          : "w-full shadow-lg"
      }`}
    >
      {/* Top Controls Bar: Search & Theme / Fullscreen */}
      <div className="p-3 sm:p-4 bg-[#1a1a24] border-b border-white/10 space-y-2.5 z-20">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchResults.length > 0) setShowResultsDropdown(true);
                }}
                placeholder="Cari lokasi dojo, nama gedung, jalan, atau kota..."
                className="w-full bg-[#121216] text-white text-xs sm:text-sm pl-9 pr-9 py-2.5 rounded-xl border border-white/15 focus:outline-none focus:border-red-500 transition-colors placeholder:text-gray-500"
              />
              {isSearching && (
                <Loader2 className="absolute right-3 w-4 h-4 text-red-400 animate-spin" />
              )}
            </div>

            {/* Search Dropdown Results */}
            {showResultsDropdown && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#1a1a24] border border-white/15 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto z-50 divide-y divide-white/5">
                {searchResults.map((item) => (
                  <button
                    key={item.place_id}
                    type="button"
                    onClick={() => handleSelectSearchResult(item)}
                    className="w-full text-left px-3.5 py-2.5 hover:bg-red-600/15 transition-colors flex items-start gap-2.5 group cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-red-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-gray-200 font-medium line-clamp-1 group-hover:text-white">
                        {item.display_name.split(",")[0]}
                      </p>
                      <p className="text-[11px] text-gray-400 line-clamp-1">
                        {item.display_name}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchError && (
              <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {searchError}
              </p>
            )}
          </div>

          {/* Quick Buttons: Theme & Fullscreen */}
          <div className="flex items-center gap-2">
            {/* Map Theme Toggle */}
            <div className="flex items-center bg-[#121216] border border-white/10 rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setMapTheme("street")}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  mapTheme === "street"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Peta Jalan Terang (Google Maps)"
              >
                Peta
              </button>
              <button
                type="button"
                onClick={() => setMapTheme("osm")}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  mapTheme === "osm"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Peta OpenStreetMap"
              >
                OSM
              </button>
              <button
                type="button"
                onClick={() => setMapTheme("satellite")}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                  mapTheme === "satellite"
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
                title="Peta Citra Satelit"
              >
                Satelit
              </button>
            </div>

            {/* Fullscreen Expand Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2.5 rounded-xl bg-[#121216] hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
              title={isFullscreen ? "Kecilkan Peta" : "Perbesar Peta Penuh"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Tip & Address preview */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1 text-gray-400">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span className="text-gray-300 truncate">
              {isLoadingAddress ? (
                "Memuat nama jalan/alamat..."
              ) : (
                currentAddress || "Geser atau klik peta untuk menentukan titik Dojo"
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] shrink-0 text-gray-300">
            <span>Lat: <strong className="text-red-400">{lat.toFixed(6)}</strong></span>
            <span>Lng: <strong className="text-red-400">{lng.toFixed(6)}</strong></span>
          </div>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full overflow-hidden" style={{ height: isFullscreen ? "calc(100vh - 160px)" : "360px" }}>
        <div ref={mapContainerRef} className="w-full h-full bg-[#121216] z-0" />

        {/* Radius indicator overlay badge */}
        <div className="absolute top-3 left-3 pointer-events-none z-10">
          <div className="bg-[#121216]/90 backdrop-blur-md border border-red-500/40 rounded-xl px-3 py-1.5 shadow-xl flex items-center gap-2 text-white">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <span className="text-xs font-mono font-bold text-red-400">
              Radius Absen: {radius || 50} Meter
            </span>
          </div>
        </div>
      </div>

      {/* Leaflet CSS inline import to ensure zero styling breakages */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
    </div>
  );
}
