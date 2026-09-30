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
    default: "RKC Kyokushin Club Makassar - Dojo Karate & Pendaftaran Murid Baru",
    template: "%s | RKC Kyokushin Club Makassar",
  },
  description:
    "Dojo Karate Kyokushin Resmi di Makassar (RKC Dojo). Pendaftaran murid baru kelas Anak, Remaja, dan Dewasa. Latihan fisik, disiplin mental & teknik beladiri full contact.",
  applicationName: "RKC Kyokushin Club",
  keywords: [
    "rkc dojo",
    "rkcdojo",
    "rkcdojo.id",
    "www.rkcdojo.id",
    "RKC Kyokushin Club",
    "Racing Kyokushin Club",
    "RKC Makassar",
    "Karate Makassar",
    "Kyokushin Makassar",
    "Dojo Karate Makassar",
    "Dojo RKC Makassar",
    "Tempat Latihan Karate di Makassar",
    "Pendaftaran Karate Makassar",
    "Kursus Karate Anak Makassar",
    "Latihan Bela Diri Makassar",
    "Full Contact Karate Indonesia",
    "Dojo Kyokushin Sulawesi Selatan",
    "Les Karate Makassar",
    "Bela Diri Anak Makassar",
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
  verification: {
    google: "google78dc4184ddd2497f",
  },
  other: {
    "geo.region": "ID-SN",
    "geo.placename": "Makassar",
    "geo.position": "-5.140223;119.442611",
    ICBM: "-5.140223, 119.442611",
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
    title: "RKC Kyokushin Club Makassar - Dojo Karate & Pendaftaran Murid Baru",
    description:
      "Dojo Karate Kyokushin Resmi di Makassar (RKC Dojo). Buka pendaftaran murid baru kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
    url: siteUrl,
    siteName: "RKC Kyokushin Club Makassar (rkcdojo.id)",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/bannerrkc.png",
        width: 1200,
        height: 630,
        alt: "Banner RKC Kyokushin Club Makassar - Dojo Karate",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RKC Kyokushin Club Makassar - Dojo Karate & Pendaftaran Murid Baru",
    description:
      "Dojo Karate Kyokushin Resmi di Makassar (RKC Dojo). Pendaftaran murid baru kelas Anak, Remaja, dan Dewasa. Karate For A Better Tomorrow.",
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
      "@type": ["SportsClub", "ExerciseGym", "SportsActivityLocation"],
      "@id": `${siteUrl}/#organization`,
      name: "RKC Kyokushin Club Makassar",
      alternateName: [
        "RKC Dojo",
        "rkcdojo",
        "rkcdojo.id",
        "RKC Dojo Makassar",
        "Racing Kyokushin Club",
        "RKC Karate Makassar",
        "Dojo RKC Tamamaung",
      ],
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      image: `${siteUrl}/images/bannerrkc.png`,
      description:
        "Dojo Karate Kyokushin resmi di Makassar (RKC Dojo). Melayani pendaftaran kelas bela diri anak-anak, remaja, dan dewasa dengan instruktur sabuk hitam bersertifikasi internasional.",
      telephone: "+6281527641306",
      priceRange: "$$",
      currenciesAccepted: "IDR",
      paymentAccepted: "Cash, QRIS, Bank Transfer",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Program Latihan Karate RKC",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kelas Karate Anak (Kids Class)",
              description: "Latihan pembentukan disiplin, fokus, motorik, dan teknik dasar karate untuk usia 6 - 12 tahun.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kelas Karate Remaja (Teens Class)",
              description: "Pengembangan stamina, fisik tangguh, mental juara, dan teknik kumite karate untuk usia 13 - 17 tahun.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Kelas Karate Dewasa (Adults Class)",
              description: "Latihan bela diri praktis, kebugaran intensif, dan tradisi karate Kyokushin untuk usia 18 tahun ke atas.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "RKC Kyokushin Club Makassar",
      alternateName: ["RKC Dojo", "rkcdojo.id"],
      description: "Pendaftaran Murid Baru & Portal Presensi Dojo RKC Kyokushin Makassar",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "id-ID",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beranda",
          item: `${siteUrl}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Pendaftaran Murid Baru",
          item: `${siteUrl}/pendaftaran`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Portal Presensi",
          item: `${siteUrl}/absen`,
        },
      ],
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
