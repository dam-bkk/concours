"use client";

import Link from "next/link";
import { Flame, Star, CheckCircle2, Swords, Lock } from "lucide-react";
import { chaptersFor } from "@/lib/chapters";
import { BADGES } from "@/lib/badges";
import { useProgress } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { SUBJECTS } from "@/lib/subjects";
import { ChapterIcon } from "@/components/chapter-icon";
import { ActivityCalendar } from "@/components/activity-calendar";
import { LaureatLogo } from "@/components/logo";

export default function ProgresPage() {
  const progress = useProgress();
  const { grade, name } = usePrefs();

  const visibleSubjects = SUBJECTS.filter((s) => !s.grades || s.grades.includes(grade)).map(
    (s) => ({ meta: s, chapters: chaptersFor(s.id, grade) })
  ).filter((s) => s.chapters.length > 0);

  const totalEx = visibleSubjects.reduce((n, s) => n + s.chapters.reduce((m, c) => m + c.exercises.length, 0), 0);
  const doneEx = visibleSubjects.reduce(
    (n, s) => n + s.chapters.reduce((m, c) => m + c.exercises.filter((e) => progress.exercises[e.id]?.correct).length, 0),
    0
  );
  const dailiesCount = Object.keys(progress.dailies).length;
  const earnedBadges = BADGES.filter((b) => b.earned(progress));

  const stats = [
    { icon: Star, label: "XP", value: String(progress.xp), tint: "bg-donnees-tint", strong: "text-donnees-strong" },
    { icon: Flame, label: "Série", value: `${progress.streak.current} j`, tint: "bg-sun-tint", strong: "text-sun-strong" },
    { icon: CheckCircle2, label: `Exos (${grade})`, value: `${doneEx}/${totalEx}`, tint: "bg-grandeurs-tint", strong: "text-grandeurs-strong" },
    { icon: Swords, label: "Défis", value: String(dailiesCount), tint: "bg-nombres-tint", strong: "text-nombres-strong" },
  ];

  return (
    <div className="rise">
      <div className="flex items-baseline justify-between gap-2">
        <h1 className="font-display text-2xl font-extrabold md:text-3xl">
          {name ? `Les progrès de ${name}` : "Mes progrès"}
        </h1>
        <p className="text-sm font-bold text-muted">
          Record : {progress.streak.best} j d&apos;affilée
        </p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Colonne gauche : stats + matières + badges */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-3">
            {stats.map(({ icon: Icon, label, value, tint, strong }) => (
              <div key={label} className="card-pop flex flex-col items-center gap-1 p-3 text-center">
                <span className={`flex h-9 w-9 items-center justify-center rounded-[3px] ${tint} ${strong}`}>
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                <p className="font-display text-lg font-extrabold leading-none">{value}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-wide text-muted">{label}</p>
              </div>
            ))}
          </div>

          {/* Une barre par matière — le détail par chapitre est sur chaque page matière */}
          <div className="card-pop flex-1 p-4">
            <p className="font-display text-lg font-extrabold">Par matière ({grade})</p>
            <div className="mt-3 space-y-2.5">
              {visibleSubjects.map(({ meta, chapters }) => {
                const total = chapters.reduce((n, c) => n + c.exercises.length, 0);
                const ok = chapters.reduce(
                  (n, c) => n + c.exercises.filter((e) => progress.exercises[e.id]?.correct).length,
                  0
                );
                return (
                  <Link key={meta.id} href={`/matiere/${meta.id}`} className="group flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] text-white"
                      style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}
                    >
                      <ChapterIcon name={meta.icon} size={16} strokeWidth={2.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className="truncate text-sm font-extrabold group-hover:underline">{meta.label}</p>
                        <p className="shrink-0 text-xs font-extrabold text-muted">{ok}/{total}</p>
                      </div>
                      <div className="mt-1 h-2 overflow-hidden rounded-[3px] bg-line">
                        <div
                          className="h-full rounded-[3px] transition-all duration-500"
                          style={{ width: `${total ? (ok / total) * 100 : 0}%`, background: meta.to }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Badges en rangée compacte */}
          <div className="card-pop p-4">
            <p className="font-display text-lg font-extrabold">
              Badges
              <span className="ml-2 align-middle rounded-[3px] bg-sun-tint px-2 py-0.5 text-xs font-extrabold text-sun-strong">
                {earnedBadges.length}/{BADGES.length}
              </span>
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {BADGES.map((b) => {
                const earned = b.earned(progress);
                return (
                  <span
                    key={b.id}
                    title={`${b.label} — ${b.description}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-[3px] ${
                      earned ? "bg-sun-tint text-sun-strong" : "bg-line text-muted opacity-60"
                    }`}
                  >
                    {earned ? <ChapterIcon name={b.icon} size={19} strokeWidth={2.25} /> : <Lock size={16} />}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Colonne droite : calendrier parental */}
        <ActivityCalendar progress={progress} />
      </div>
    </div>
  );
}
