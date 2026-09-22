import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkckarate.id";

export const metadata: Metadata = {
  title: "Presensi & Absensi Anggota Dojo | RKC Kyokushin Club",
  description:
    "Portal presensi mandiri karateka RKC Kyokushin Club Makassar dengan validasi lokasi GPS Geolocation 50 meter.",
  alternates: {
    canonical: `${siteUrl}/absensi`,
  },
  openGraph: {
    title: "Presensi Anggota Dojo | RKC Kyokushin Club Makassar",
    description:
      "Portal absensi mandiri dan riwayat kehadiran karateka RKC Kyokushin Club Makassar.",
    url: `${siteUrl}/absensi`,
    siteName: "RKC Kyokushin Club Makassar",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/bgabsensidekstop.png",
        width: 1200,
        height: 630,
        alt: "Presensi Anggota Dojo RKC Kyokushin Club",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Presensi Anggota Dojo | RKC Kyokushin Club",
    description:
      "Portal presensi mandiri karateka RKC Kyokushin Club Makassar.",
    images: [`${siteUrl}/images/bgabsensidekstop.png`],
  },
};

export default function AbsensiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
