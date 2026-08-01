import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const display = Space_Grotesk({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Inter({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lauréat — Concours de la fonction publique",
  description: "Cours, QCM et épreuves blanches pour réussir votre concours",
};

export const viewport: Viewport = {
  themeColor: "#f6f8fb",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} min-h-dvh`}>
        <Nav />
        {/* pb pour la tab-bar mobile */}
        <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-6 md:px-8 md:pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
