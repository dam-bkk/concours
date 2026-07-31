import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lauréat — Concours de la fonction publique",
  description: "Cours, QCM et épreuves blanches pour réussir votre concours",
};

export const viewport: Viewport = {
  themeColor: "#fff9f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${baloo.variable} ${nunito.variable} min-h-dvh`}>
        <Nav />
        {/* pb pour la tab-bar mobile */}
        <main className="mx-auto w-full max-w-[1250px] px-4 pb-28 pt-6 md:px-8 md:pb-12">
          {children}
        </main>
      </body>
    </html>
  );
}
