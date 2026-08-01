"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, X, Target } from "lucide-react";
import { CHAPTERS, chaptersFor } from "@/lib/chapters";
import { SUBJECTS, getSubjectMeta } from "@/lib/subjects";
import { dueReviews, recordExercise, useProgress } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { Player, type PlayerItem } from "@/components/player";
import { ChapterIcon } from "@/components/chapter-icon";
import type { Subject } from "@/lib/types";

const LENGTHS = [10, 20, 40] as const;

type Mode = "recommande" | "theme" | "erreurs";

/**
 * Session d'entraînement : l'utilisateur choisit une longueur et une portée.
 * Le mode « recommandé » compose la série à partir de ses lacunes réelles —
 * c'est ce qui remplace la logique de défi quotidien.
 */
export default function EntrainementPage() {
  const progress = useProgress();
  const { grade } = usePrefs();
  const [length, setLength] = useState<number>(20);
  const [mode, setMode] = useState<Mode>("recommande");
  const [subject, setSubject] = useState<Subject | null>(null);
  const [items, setItems] = useState<PlayerItem[] | null>(null);

  const available = useMemo(
    () => SUBJECTS.filter((s) => chaptersFor(s.id, grade).length > 0),
    [grade]
  );

  const dueIds = useMemo(() => new Set(dueReviews(progress)), [progress]);

  function build() {
    const pool = CHAPTERS.filter(
      (c) => (c.grade ?? "concours") === grade && (mode !== "theme" || c.subject === subject)
    );
    let questions = pool.flatMap((c) =>
      c.exercises.map((e) => ({ e, chapter: c }))
    );

    if (mode === "erreurs") {
      questions = questions.filter(({ e }) => {
        const rec = progress.exercises[e.id];
        return dueIds.has(e.id) || (rec && !rec.correct);
      });
    } else if (mode === "recommande") {
      // Priorité : jamais vues, puis ratées, puis à revoir. Les acquises passent en dernier.
      const weight = ({ e }: { e: { id: string } }) => {
        const rec = progress.exercises[e.id];
        if (dueIds.has(e.id)) return 0;
        if (rec && !rec.correct) return 1;
        if (!rec) return 2;
        return 3;
      };
      questions = [...questions].sort((a, b) => weight(a) - weight(b));
    }

    if (mode !== "recommande") {
      questions = [...questions].sort(() => Math.random() - 0.5);
    }

    setItems(
      questions.slice(0, length).map(({ e, chapter }) => ({
        id: e.id,
        type: e.type,
        question: e.question,
        choices: e.choices,
        answer: e.answer,
        accept: e.accept,
        explanation: e.explanation,
        hint: e.hint,
        figure: e.figure,
        xp: 10,
        tag: chapter.title,
      }))
    );
  }

  if (items) {
    return (
      <div className="rise mx-auto max-w-3xl">
        <button
          onClick={() => setItems(null)}
          className="mb-4 flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft size={16} />
          Quitter la session
        </button>
        <Player
          items={items}
          onItemResult={(item, correct) => recordExercise(item.id, correct, item.xp)}
          renderEnd={(score, total, replay) => {
            const pct = Math.round((score / total) * 100);
            return (
              <div className="card-pop rise p-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Session terminée
                </p>
                <p className="tabular mt-2 font-display text-5xl font-bold">
                  {score}
                  <span className="text-2xl text-muted">/{total}</span>
                </p>
                <p className="tabular mt-1 text-lg font-semibold" style={{ color: pct >= 75 ? "var(--color-ok-strong)" : pct >= 50 ? "var(--color-sun-strong)" : "var(--color-ko-strong)" }}>
                  {pct} % de réussite
                </p>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
                  {pct >= 90
                    ? "Niveau examen. Enchaînez sur une épreuve blanche pour confirmer en conditions réelles."
                    : pct >= 75
                      ? "Bon niveau. Les questions manquées reviendront automatiquement dans vos révisions."
                      : "À consolider. Reprenez le cours des thèmes concernés avant de refaire une session."}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <button onClick={replay} className="btn-pop px-5 py-2.5 font-semibold">
                    Refaire cette série
                  </button>
                  <button
                    onClick={() => setItems(null)}
                    className="btn-pop px-5 py-2.5 font-semibold"
                  >
                    Nouvelle session
                  </button>
                  <Link href="/controle" className="btn-pop bg-ink px-5 py-2.5 font-semibold">
                    Épreuve blanche
                  </Link>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
  }

  const errorCount = CHAPTERS.filter((c) => (c.grade ?? "concours") === grade)
    .flatMap((c) => c.exercises)
    .filter((e) => dueIds.has(e.id) || (progress.exercises[e.id] && !progress.exercises[e.id].correct))
    .length;

  return (
    <div className="rise mx-auto max-w-4xl">
      <Link
        href="/"
        className="mb-4 flex w-fit items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <ArrowLeft size={16} />
        Tableau de bord
      </Link>

      <h1 className="font-display text-3xl font-bold">Session d&apos;entraînement</h1>
      <p className="mt-1.5 text-muted">
        Composez votre série : le mode recommandé cible en priorité vos lacunes.
      </p>

      {/* Portée */}
      <section className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Portée</p>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            {
              id: "recommande" as Mode,
              label: "Recommandé",
              desc: "Priorité à ce que vous maîtrisez le moins",
              icon: Target,
            },
            {
              id: "erreurs" as Mode,
              label: "Mes erreurs",
              desc: errorCount ? `${errorCount} question${errorCount > 1 ? "s" : ""} en attente` : "Aucune erreur en attente",
              icon: X,
            },
            {
              id: "theme" as Mode,
              label: "Par thème",
              desc: "Vous choisissez la matière",
              icon: Check,
            },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              disabled={m.id === "erreurs" && errorCount === 0}
              className={`hero-card p-4 text-left disabled:opacity-45 ${
                mode === m.id ? "border-zest" : ""
              }`}
              style={mode === m.id ? { borderColor: "var(--color-zest)" } : undefined}
            >
              <m.icon size={18} className={mode === m.id ? "text-zest" : "text-muted"} />
              <p className="mt-2 font-semibold">{m.label}</p>
              <p className="mt-0.5 text-sm text-muted">{m.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Thème */}
      {mode === "theme" && (
        <section className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">Thème</p>
          <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {available.map((s) => (
              <button
                key={s.id}
                onClick={() => setSubject(s.id)}
                className="hero-card flex items-center gap-2.5 p-3 text-left"
                style={subject === s.id ? { borderColor: "var(--color-zest)" } : undefined}
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center"
                  style={{ background: s.tint, color: s.from }}
                >
                  <ChapterIcon name={s.icon} size={16} strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold leading-tight">{s.label}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Longueur */}
      <section className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">Nombre de questions</p>
        <div className="mt-2 flex gap-2">
          {LENGTHS.map((n) => (
            <button
              key={n}
              onClick={() => setLength(n)}
              className={`btn-pop tabular px-6 py-2.5 font-semibold ${
                length === n ? "bg-ink" : ""
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={build}
        disabled={mode === "theme" && !subject}
        className="btn-pop mt-7 flex items-center gap-2 bg-ink px-7 py-3.5 font-semibold disabled:opacity-45"
      >
        Démarrer la session
        <ArrowRight size={18} />
      </button>
      {mode === "theme" && !subject && (
        <p className="mt-2 text-sm text-muted">Sélectionnez d&apos;abord un thème.</p>
      )}
    </div>
  );
}
