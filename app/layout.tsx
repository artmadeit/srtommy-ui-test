import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sr Tommy",
  description: "Nuestra app te ayuda a marcar asistencias a tu iglesia :)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
      {/*TODO: daniel <GoogleTagManager gtmId="GTM-XYZ" /> */}
    </html>
  );
}
