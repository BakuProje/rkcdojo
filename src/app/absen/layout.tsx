import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rkcdojo.id";

export const metadata: Metadata = {
  title: "Portal Presensi & Absensi Anggota | RKC Kyokushin Club",
  description:
    "Portal presensi mandiri karateka RKC Kyokushin Club Makassar dengan validasi lokasi GPS Geolocation 50 meter dan rekapitulasi kehadiran bulanan.",
  alternates: {
    canonical: `${siteUrl}/absen`,
  },
  openGraph: {
    title: "Portal Presensi & Absensi Dojo | RKC Kyokushin Club Makassar",
    description:
      "Portal absensi dan rekap kehadiran karateka RKC Kyokushin Club Makassar. Cek jadwal latihan, rekapitulasi bulanan, dan status tingkatan sabuk.",
    url: `${siteUrl}/absen`,
    siteName: "RKC Kyokushin Club Makassar",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/bannerrkc.png",
        width: 1200,
        height: 630,
        alt: "Banner RKC Kyokushin Club Makassar",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portal Presensi & Absensi Anggota | RKC Kyokushin Club",
    description:
      "Portal presensi mandiri dan rekapitulasi kehadiran karateka RKC Kyokushin Club Makassar.",
    images: ["/images/bannerrkc.png"],
  },
};

export default function AbsenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
