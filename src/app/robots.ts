import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rkcdojo.id";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pendaftaran", "/absen", "/absensi", "/images/*", "/google78dc4184ddd2497f.html"],
        disallow: ["/kuzuadmin", "/kuzuadmin/*", "/api/*"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
