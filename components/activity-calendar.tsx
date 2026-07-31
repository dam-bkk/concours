"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays, Swords, Star, CheckCircle2, MoonStar } from "lucide-react";
import { todayKey, type DayActivity, type Progress } from "@/lib/progress";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];

/** Intensité façon GitHub : 0 = rien, puis paliers selon le volume d'activité */
function intensity(a: DayActivity | undefined): 0 | 1 | 2 | 3 | 4 {
  if (!a || (a.ex === 0 && !a.daily)) return 0;
  const score = a.ex + (a.daily ? 3 : 0);
  if (score >= 15) return 4;
  if (score >= 8) return 3;
  if (score >= 4) return 2;
  return 1;
}

/* Échelle de verts (les cases sont graphiques, le détail est en texte encre) */
const CELL_COLORS = ["#F0E6D2", "#BFE8CD", "#7ED09B", "#3FAE6A", "#166B38"];

function fmtKey(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function ActivityCalendar({ progress }: { progress: Progress }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selected, setSelected] = useState<string>(todayKey());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Lundi = colonne 0
  const firstCol = (new Date(year, month, 1).getDay() + 6) % 7;
  const today = todayKey();
  const isCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  function nav(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  const monthTotal = Array.from({ length: daysInMonth }, (_, i) =>
    progress.activity[fmtKey(year, month, i + 1)]
  ).reduce(
    (acc, a) => ({
      ex: acc.ex + (a?.ex ?? 0),
      ok: acc.ok + (a?.ok ?? 0),
      dailies: acc.dailies + (a?.daily ? 1 : 0),
      xp: acc.xp + (a?.xp ?? 0),
      activeDays: acc.activeDays + (intensity(a) > 0 ? 1 : 0),
    }),
    { ex: 0, ok: 0, dailies: 0, xp: 0, activeDays: 0 }
  );

  const sel = progress.activity[selected];
  const selDate = new Date(selected + "T12:00:00");
  const selLabel = selDate.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="card-pop p-5 md:p-6">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 font-display text-xl font-extrabold">
          <CalendarDays size={22} strokeWidth={2.5} className="text-grandeurs-strong" />
          Calendrier d&apos;activité
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => nav(-1)}
            className="btn-pop bg-card p-2"
            aria-label="Mois précédent"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>
          <span className="min-w-36 text-center font-display text-lg font-bold">
            {MONTHS[month]} {year}
          </span>
          <button
            onClick={() => nav(1)}
            disabled={isCurrentMonth}
            className="btn-pop bg-card p-2 disabled:opacity-40"
            aria-label="Mois suivant"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <p className="mt-1 text-sm font-semibold text-muted">
        Pour les parents : chaque case verte = un jour travaillé. Case beige = rien ce jour-là.
      </p>

      {/* Grille */}
      <div className="mt-4 grid grid-cols-7 gap-1.5 sm:gap-2">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-center text-xs font-extrabold text-muted">
            {w}
          </div>
        ))}
        {Array.from({ length: firstCol }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const key = fmtKey(year, month, i + 1);
          const level = intensity(progress.activity[key]);
          const isFuture = key > today;
          const isSelected = key === selected;
          return (
            <button
              key={key}
              onClick={() => !isFuture && setSelected(key)}
              disabled={isFuture}
              aria-label={`${i + 1} ${MONTHS[month]}`}
              className={`relative aspect-square rounded-lg text-xs font-bold transition-transform ${
                isFuture ? "opacity-30" : "hover:scale-105"
              } ${isSelected ? "ring-2 ring-ink ring-offset-2 ring-offset-card" : ""}`}
              style={{ background: CELL_COLORS[isFuture ? 0 : level] }}
            >
              <span className={level >= 3 ? "text-white" : "text-ink"}>{i + 1}</span>
              {key === today && (
                <span className="absolute inset-x-0 -bottom-1 mx-auto h-1 w-4 rounded-full bg-ink" />
              )}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs font-bold text-muted">
        Moins
        {CELL_COLORS.map((c) => (
          <span key={c} className="h-3.5 w-3.5 rounded" style={{ background: c }} />
        ))}
        Plus
      </div>

      {/* Détail du jour sélectionné */}
      <div className="mt-4 rounded-2xl bg-cream px-4 py-3">
        <p className="text-xs font-extrabold uppercase tracking-wide text-muted">{selLabel}</p>
        {sel && (sel.ex > 0 || sel.daily) ? (
          <div className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1.5 font-bold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={17} className="text-grandeurs-strong" />
              {sel.ok}/{sel.ex} exercice{sel.ex > 1 ? "s" : ""} réussi{sel.ok > 1 ? "s" : ""}
            </span>
            <span className="flex items-center gap-1.5">
              <Swords size={17} className={sel.daily ? "text-sun-strong" : "text-muted"} />
              {sel.daily ? "Défi du jour fait" : "Pas de défi ce jour-là"}
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={17} className="text-donnees-strong" />
              +{sel.xp} XP
            </span>
          </div>
        ) : (
          <p className="mt-1.5 flex items-center gap-1.5 font-bold text-muted">
            <MoonStar size={17} />
            Aucune activité ce jour-là.
          </p>
        )}
      </div>

      {/* Bilan du mois en une ligne */}
      <p className="mt-3 text-center text-sm font-bold text-muted">
        Ce mois-ci : {monthTotal.activeDays} jour{monthTotal.activeDays > 1 ? "s" : ""} actif{monthTotal.activeDays > 1 ? "s" : ""} ·{" "}
        {monthTotal.ok}/{monthTotal.ex} exercices réussis · {monthTotal.dailies} défi{monthTotal.dailies > 1 ? "s" : ""} · +{monthTotal.xp} XP
      </p>
    </div>
  );
}
