import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rkcdojo.id";

export const metadata: Metadata = {
  title: "Formulir Pendaftaran Murid Baru | RKC Kyokushin Club",
  description:
    "Formulir pendaftaran resmi calon karateka baru RKC Kyokushin Club Makassar. Pilih kelas Anak (Kids), Remaja (Teens), atau Dewasa (Adults). Daftar online cepat & mudah.",
  alternates: {
    canonical: `${siteUrl}/pendaftaran`,
  },
  openGraph: {
    title: "Pendaftaran Murid Baru | RKC Kyokushin Club Makassar",
    description:
      "Daftar sekarang di RKC Kyokushin Club Makassar! Raih sabuk karate berlisensi internasional, latih fisik & mental bersama Sensei/Sempai berpengalaman. Karate for a better tomorrow.",
    url: `${siteUrl}/pendaftaran`,
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
    title: "Pendaftaran Murid Baru | RKC Kyokushin Club Makassar",
    description:
      "Daftar sekarang di RKC Kyokushin Club Makassar! Formulir online kelas bela diri anak-anak, remaja, dan dewasa.",
    images: ["/images/bannerrkc.png"],
  },
};

export default function PendaftaranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
