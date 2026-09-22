import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard & Presensi | RKC Kyokushin Club",
  description: "Sistem Manajemen Data Pendaftar & Presensi Anggota RKC Kyokushin Club Makassar.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function KuzuAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
