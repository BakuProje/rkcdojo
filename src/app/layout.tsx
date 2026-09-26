import type { Metadata, Viewport } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rkcdojo.id";

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RKC Kyokushin Club Makassar - Dojo Karate Makassar",
    template: "%s | RKC Kyokushin Club Makassar",
  },
  description:
    "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar. Kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
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
    title: "RKC Kyokushin Club Makassar - Dojo Karate Makassar",
    description:
      "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar. Kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
    url: siteUrl,
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
    title: "RKC Kyokushin Club Makassar - Dojo Karate Makassar",
    description:
      "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar. Kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
    images: ["/images/bannerrkc.png"],
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
      image: `${siteUrl}/images/bannerrkc.png`,
      description:
        "Dojo Karate Kyokushin resmi di Makassar. Melayani pendaftaran kelas bela diri anak-anak, remaja, dan dewasa dengan instruktur bersertifikasi internasional.",
      telephone: "+6281527641306",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Sukamaju 1 No 2B RT 005/RW 006, Kel Tamamaung, Kec Panakkukang",
        addressLocality: "Makassar",
        addressRegion: "Sulawesi Selatan",
        postalCode: "90231",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -5.140223,
        longitude: 119.442611,
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
        <meta property="og:image" content="/images/bannerrkc.png" />
        <meta property="og:image:secure_url" content="/images/bannerrkc.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Banner RKC Kyokushin Club Makassar" />
        <meta name="twitter:image" content="/images/bannerrkc.png" />
        <link rel="image_src" href="/images/bannerrkc.png" />
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
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
