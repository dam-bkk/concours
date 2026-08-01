"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  TimerReset,
  BarChart3,
  LibraryBig,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { AdmisioLogo } from "@/components/logo";

const LINKS = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/#concours", label: "Concours", icon: LibraryBig },
  { href: "/entrainement", label: "Entraînement", icon: Dumbbell },
  { href: "/controle", label: "Examen blanc", icon: TimerReset },
  { href: "/progres", label: "Statistiques", icon: BarChart3 },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-6 px-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <AdmisioLogo size={26} />
          <span className="font-display text-lg font-semibold tracking-tight">Admisio</span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden flex-1 items-center gap-1 md:flex">
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-1.5 text-sm transition-colors ${
                isActive(href)
                  ? "font-semibold text-ink"
                  : "font-medium text-muted hover:text-ink"
              }`}
            >
              {label}
              {isActive(href) && (
                <span
                  className="mt-1 block h-0.5 w-full"
                  style={{ background: "var(--color-zest)" }}
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Link
            href="/reglages"
            className="p-2 text-muted transition-colors hover:text-ink"
            aria-label="Réglages"
          >
            <Settings size={17} strokeWidth={2} />
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-muted md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation mobile */}
      {open && (
        <nav className="border-t border-line bg-card md:hidden">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 border-b border-line/60 px-5 py-3.5 text-sm last:border-0 ${
                isActive(href) ? "font-semibold text-ink" : "font-medium text-muted"
              }`}
            >
              <Icon size={17} strokeWidth={2} />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
