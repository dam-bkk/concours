"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Home, Swords, Trophy, Flame, Star, Volume2, VolumeX, Settings } from "lucide-react";
import { LaureatLogo } from "@/components/logo";
import { useProgress } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { setSoundEnabled, soundEnabled } from "@/lib/fx";

const LINKS = [
  { href: "/", label: "Accueil", icon: Home },
  { href: "/defi", label: "Série du jour", icon: Swords },
  { href: "/progres", label: "Statistiques", icon: Trophy },
];

export function Nav() {
  const pathname = usePathname();
  const progress = useProgress();
  const { grade } = usePrefs();
  const [sound, setSound] = useState(true);
  useEffect(() => {
    setSound(soundEnabled());
    const refresh = () => setSound(soundEnabled());
    window.addEventListener("laureat-sound", refresh);
    return () => window.removeEventListener("laureat-sound", refresh);
  }, []);

  // Pop du compteur XP à chaque gain
  const [xpPop, setXpPop] = useState(false);
  const prevXp = useRef(progress.xp);
  useEffect(() => {
    const increased = progress.xp > prevXp.current;
    prevXp.current = progress.xp;
    if (increased) {
      setXpPop(true);
      const t = setTimeout(() => setXpPop(false), 400);
      return () => clearTimeout(t);
    }
  }, [progress.xp]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Barre haute (toutes tailles) : logo + compteurs */}
      <header className="sticky top-0 z-40 bg-cream/95 shadow-[0_2px_12px_rgba(45,45,63,0.08)] backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2.5">
            <LaureatLogo size={36} />
            <span className="font-display text-2xl font-bold tracking-tight">
              Lauréat
            </span>
            <span className="mt-1 rounded-[3px] bg-donnees-tint px-2 py-0.5 text-xs font-bold text-donnees-strong">
              {grade}
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 rounded-[3px] bg-sun-tint px-3 py-1.5 text-sm font-extrabold text-sun-strong"
              title="Série de jours d'affilée"
            >
              <Flame
                size={16}
                strokeWidth={2.5}
                className={progress.streak.current > 0 ? "flame-active" : undefined}
              />
              {progress.streak.current}
            </span>
            <span
              className={`flex items-center gap-1.5 rounded-[3px] bg-donnees-tint px-3 py-1.5 text-sm font-extrabold text-donnees-strong ${
                xpPop ? "pop-once" : ""
              }`}
              title="Points d'expérience"
            >
              <Star size={16} strokeWidth={2.5} />
              {progress.xp} pts
            </span>
            <button
              onClick={() => setSoundEnabled(!sound)}
              className="rounded-[3px] p-2 text-muted hover:bg-zest-soft hover:text-ink"
              aria-label={sound ? "Couper le son" : "Activer le son"}
              title={sound ? "Couper le son" : "Activer le son"}
            >
              {sound ? <Volume2 size={18} strokeWidth={2.5} /> : <VolumeX size={18} strokeWidth={2.5} />}
            </button>
            <Link
              href="/reglages"
              className="rounded-[3px] p-2 text-muted hover:bg-zest-soft hover:text-ink"
              aria-label="Réglages"
              title="Réglages"
            >
              <Settings size={18} strokeWidth={2.5} />
            </Link>

            {/* Liens desktop */}
            <nav className="ml-4 hidden items-center gap-1 md:flex">
              {LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-[3px] px-4 py-2 text-sm font-bold transition-colors ${
                    isActive(href)
                      ? "bg-ink text-white"
                      : "text-ink hover:bg-zest-soft"
                  }`}
                >
                  <Icon size={16} strokeWidth={2.5} />
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Tab-bar mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-40 bg-card pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(45,45,63,0.1)] md:hidden">
        <div className="flex">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-bold ${
                isActive(href) ? "text-ink" : "text-muted"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive(href) ? 2.75 : 2}
                className={isActive(href) ? "text-zest" : undefined}
              />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
