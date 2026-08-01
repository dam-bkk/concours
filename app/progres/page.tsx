"use client";

import Link from "next/link";
import { ArrowLeft, TrendingUp, Layers, CalendarRange, CircleAlert } from "lucide-react";
import { chaptersFor } from "@/lib/chapters";
import { useProgress, todayKey } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { SUBJECTS } from "@/lib/subjects";
import { ChapterIcon } from "@/components/chapter-icon";

function Bar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-line">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.max(2, value * 100)}%`, background: color }}
      />
    </div>
  );
}

export default function StatistiquesPage() {
  const progress = useProgress();
  const { grade, name } = usePrefs();

  const subjects = SUBJECTS.map((s) => ({ meta: s, chapters: chaptersFor(s.id, grade) })).filter(
    (s) => s.chapters.length > 0
  );

  const all = subjects.flatMap((s) => s.chapters.flatMap((c) => c.exercises));
  const answered = all.filter((e) => progress.exercises[e.id]);
  const correct = all.filter((e) => progress.exercises[e.id]?.correct);
  const rate = answered.length ? Math.round((correct.length / answered.length) * 100) : 0;
  const attempts = Object.values(progress.exercises).reduce((n, r) => n + r.attempts, 0);

  const weeks = Array.from({ length: 8 }, (_, w) => {
    let total = 0;
    for (let d = 0; d < 7; d++) {
      const day = new Date();
      day.setDate(day.getDate() - ((7 - w) * 7 - d));
      total += progress.activity[todayKey(day)]?.ex ?? 0;
    }
    return total;
  });
  const peak = Math.max(1, ...weeks);
  const activeDays = Object.values(progress.activity).filter((a) => a.ex > 0).length;

  const rows = subjects.flatMap(({ meta, chapters }) =>
    chapters.map((c) => {
      const tried = c.exercises.filter((e) => progress.exercises[e.id]).length;
      const ok = c.exercises.filter((e) => progress.exercises[e.id]?.correct).length;
      return {
        meta,
        chapter: c,
        tried,
        total: c.exercises.length,
        mastery: c.exercises.length ? ok / c.exercises.length : 0,
        accuracy: tried ? ok / tried : -1,
      };
    })
  );

  const weakest = rows
    .filter((r) => r.tried >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  return (
    <div className="rise">
      <Link
        href="/"
        className="mb-5 flex w-fit items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>

      <h1 className="font-display text-3xl font-bold tracking-tight">Statistiques</h1>
      {name && <p className="mt-1 text-muted">Compte de {name}</p>}

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: TrendingUp,
            label: "Taux de réussite",
            value: answered.length ? `${rate} %` : "—",
            sub: `${correct.length} bonnes sur ${answered.length}`,
          },
          {
            icon: Layers,
            label: "Couverture",
            value: `${all.length ? Math.round((correct.length / all.length) * 100) : 0} %`,
            sub: `${correct.length} / ${all.length} acquises`,
          },
          {
            icon: CalendarRange,
            label: "Jours d'activité",
            value: String(activeDays),
            sub: `${attempts} réponses au total`,
          },
          {
            icon: CircleAlert,
            label: "Matières fragiles",
            value: String(weakest.filter((w) => w.accuracy < 0.75).length),
            sub: "Sous 75 % de réussite",
          },
        ].map((m) => (
          <div key={m.label} className="card-pop p-5">
            <div className="flex items-center gap-2 text-muted">
              <m.icon size={15} strokeWidth={2} />
              <span className="text-xs font-semibold uppercase tracking-wider">{m.label}</span>
            </div>
            <p className="tabular mt-2.5 font-display text-3xl font-bold leading-none">{m.value}</p>
            <p className="mt-2 text-sm text-muted">{m.sub}</p>
          </div>
        ))}
      </div>

      <div className="card-pop mt-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Volume d&apos;entraînement</h2>
          <span className="text-xs text-muted">8 dernières semaines</span>
        </div>
        <div className="mt-5 flex h-28 items-end gap-2">
          {weeks.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <span className="tabular text-[10px] font-semibold text-muted">{v || ""}</span>
              <div
                className="w-full rounded-t-md transition-all duration-700"
                style={{
                  height: `${Math.max(3, (v / peak) * 90)}%`,
                  background: v ? "var(--color-zest)" : "var(--color-line)",
                }}
              />
              <span className="text-[10px] text-muted">S-{7 - i}</span>
            </div>
          ))}
        </div>
      </div>

      {weakest.length > 0 && (
        <section className="mt-8">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Priorités de révision
          </h2>
          <div className="card-pop mt-3 divide-y divide-line overflow-hidden">
            {weakest.map((r) => (
              <Link
                key={r.chapter.slug}
                href={`/chapitre/${r.chapter.slug}`}
                className="flex items-center gap-4 p-4 transition-colors hover:bg-raised"
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: r.meta.tint, color: r.meta.from }}
                >
                  <ChapterIcon name={r.chapter.icon} size={18} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{r.chapter.title}</p>
                  <p className="text-sm text-muted">{r.meta.label}</p>
                </div>
                <div className="w-28 shrink-0">
                  <p
                    className="tabular text-right text-sm font-semibold"
                    style={{
                      color:
                        r.accuracy >= 0.75 ? "var(--color-ok-strong)" : "var(--color-ko-strong)",
                    }}
                  >
                    {Math.round(r.accuracy * 100)} %
                  </p>
                  <div className="mt-1.5">
                    <Bar
                      value={r.accuracy}
                      color={
                        r.accuracy >= 0.75 ? "var(--color-ok-strong)" : "var(--color-ko-strong)"
                      }
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold tracking-tight">Détail par matière</h2>
        <div className="card-pop mt-3 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-semibold uppercase tracking-wider text-muted">
                  <th className="px-5 py-3.5">Matière</th>
                  <th className="px-5 py-3.5">Traitées</th>
                  <th className="px-5 py-3.5">Réussite</th>
                  <th className="w-44 px-5 py-3.5">Acquis</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.chapter.slug} className="border-b border-line/60 last:border-0">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/chapitre/${r.chapter.slug}`}
                        className="font-medium hover:underline"
                      >
                        {r.chapter.title}
                      </Link>
                      <span className="ml-2 text-xs text-muted">{r.meta.label}</span>
                    </td>
                    <td className="tabular px-5 py-3.5 text-muted">
                      {r.tried}/{r.total}
                    </td>
                    <td className="tabular px-5 py-3.5">
                      {r.accuracy < 0 ? "—" : `${Math.round(r.accuracy * 100)} %`}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex-1">
                          <Bar value={r.mastery} color={r.meta.from} />
                        </div>
                        <span className="tabular w-9 text-right text-xs text-muted">
                          {Math.round(r.mastery * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
