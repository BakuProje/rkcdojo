import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkckarate.id";

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RKC Kyokushin Club - Dojo Karate Makassar | Pendaftaran & Presensi",
    template: "%s | RKC Kyokushin Club",
  },
  description:
    "Dojo Karate Kyokushin resmi di Makassar. Pendaftaran murid baru kelas anak-anak, remaja, dan dewasa. Pelatih berlisensi internasional, latihan disiplin fisik & mental, serta portal absensi modern. Karate For A Better Tomorrow.",
  applicationName: "RKC Kyokushin Club",
  keywords: [
    "Karate Makassar",
    "Kyokushin Makassar",
    "RKC Kyokushin Club",
    "Racing Kyokushin Club",
    "Dojo Karate Makassar",
    "Pendaftaran Karate Baru",
    "Bela Diri Makassar",
    "Martial Arts Makassar",
    "Kursus Karate Anak Makassar",
    "Latihan Karate Dewasa",
    "Full Contact Karate Indonesia",
    "Dojo Kyokushin Sulawesi Selatan",
    "Absensi Karate RKC",
  ],
  authors: [{ name: "RKC Kyokushin Club Makassar", url: siteUrl }],
  creator: "RKC Kyokushin Club",
  publisher: "RKC Kyokushin Club",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/images/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/images/logo.png",
      },
    ],
  },
  openGraph: {
    title: "RKC Kyokushin Club - Dojo Karate Makassar | Pendaftaran & Presensi",
    description:
      "Bergabunglah bersama Dojo Karate Kyokushin Makassar! Kelas Anak-anak, Remaja & Dewasa dengan pelatih bersertifikasi. Daftar online sekarang & raih disiplin sejati. Karate For A Better Tomorrow. Osu!",
    url: siteUrl,
    siteName: "RKC Kyokushin Club Makassar",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/background.png",
        width: 1200,
        height: 630,
        alt: "RKC Kyokushin Club Makassar - Dojo Bela Diri Karate",
        type: "image/png",
      },
      {
        url: "/images/bgberanda.png",
        width: 1200,
        height: 630,
        alt: "Latihan Karate Kyokushin Dojo RKC Makassar",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RKC Kyokushin Club - Dojo Karate Makassar",
    description:
      "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar. Kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
    images: [`${siteUrl}/images/background.png`],
    creator: "@rkckarate",
    site: "@rkckarate",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "sports",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SportsClub",
      "@id": `${siteUrl}/#organization`,
      name: "RKC Kyokushin Club Makassar",
      alternateName: ["Racing Kyokushin Club", "RKC Karate Makassar", "Dojo RKC"],
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      image: `${siteUrl}/images/background.png`,
      description:
        "Dojo Karate Kyokushin resmi di Makassar. Melayani pendaftaran kelas bela diri anak-anak, remaja, dan dewasa dengan instruktur bersertifikasi internasional.",
      telephone: "+6285299887766",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Racing Centre / Panakkukang",
        addressLocality: "Makassar",
        addressRegion: "Sulawesi Selatan",
        postalCode: "90231",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -5.147665,
        longitude: 119.432731,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Tuesday", "Thursday"],
          opens: "16:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday"],
          opens: "07:30",
          closes: "10:00",
        },
      ],
      priceRange: "$$",
      sameAs: [
        "https://www.instagram.com/rkckarate",
        "https://www.youtube.com/@rkckarate",
        "https://www.facebook.com/rkckarate",
        "https://www.tiktok.com/@rkckarate",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "RKC Kyokushin Club Makassar",
      description: "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "id-ID",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0d0e12] antialiased selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
