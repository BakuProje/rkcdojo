import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rkckarate.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pendaftaran", "/absen", "/absensi", "/images/*"],
        disallow: ["/kuzuadmin", "/kuzuadmin/*", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
