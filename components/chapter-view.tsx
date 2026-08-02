"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Dumbbell,
  Lightbulb,
  Target,
  Check,
  PartyPopper,
  FileDown,
  Clapperboard,
} from "lucide-react";
import type { Chapter, Domain, Exercise } from "@/lib/types";
import { DOMAIN_LABELS } from "@/lib/types";
import { recordExercise, useProgress } from "@/lib/progress";
import { ChapterIcon } from "@/components/chapter-icon";
import { Figure } from "@/components/figures";
import { Player, ReplayButton, type PlayerItem } from "@/components/player";
import { chaptersFor } from "@/lib/chapters";
import { getSubjectMeta } from "@/lib/subjects";
import { LessonView } from "@/components/lesson-view";

const DOMAIN_STYLE: Record<Domain, { tint: string; strong: string }> = {
  nombres: { tint: "bg-nombres-tint", strong: "text-nombres-strong" },
  geometrie: { tint: "bg-geometrie-tint", strong: "text-geometrie-strong" },
  grandeurs: { tint: "bg-grandeurs-tint", strong: "text-grandeurs-strong" },
  donnees: { tint: "bg-donnees-tint", strong: "text-donnees-strong" },
};

const LEVEL_LABELS: Record<number, string> = {
  0: "Tout enchaîner",
  1: "Je démarre",
  2: "Je m'entraîne",
  3: "Je me dépasse",
};

const XP_BY_LEVEL: Record<number, number> = { 1: 10, 2: 15, 3: 20 };

function toItems(exercises: Exercise[]): PlayerItem[] {
  return exercises.map((e) => ({
    id: e.id,
    type: e.type,
    question: e.question,
    choices: e.choices,
    answer: e.answer,
    accept: e.accept,
    explanation: e.explanation,
    hint: e.hint,
    xp: XP_BY_LEVEL[e.level],
    tag: `Niveau ${e.level}`,
  }));
}

export function ChapterView({ chapter }: { chapter: Chapter }) {
  const [tab, setTab] = useState<"lecon" | "exos">("lecon");
  const [level, setLevel] = useState<number | null>(null);
  const progress = useProgress();
  const style = DOMAIN_STYLE[chapter.domain];

  const doneCount = chapter.exercises.filter((e) => progress.exercises[e.id]?.correct).length;
  const meta = getSubjectMeta(chapter.subject ?? "gardien-paix");
  const siblings = chaptersFor(chapter.subject ?? "gardien-paix", chapter.grade ?? "concours");
  const next = siblings.find((c) => c.num === chapter.num + 1);

  const items = useMemo(() => {
    if (level === null) return [];
    const pool = level === 0 ? chapter.exercises : chapter.exercises.filter((e) => e.level === level);
    return toItems(pool);
  }, [level, chapter.exercises]);

  return (
    <div className="rise">
      {/* En-tête */}
      <Link
        href={`/matiere/${chapter.subject ?? "gardien-paix"}`}
        className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        {meta.label} — tous les chapitres
      </Link>

      <div className="card-pop flex items-center gap-3 p-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.tint} ${style.strong}`}>
          <ChapterIcon name={chapter.icon} size={24} strokeWidth={2.25} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-[11px] font-extrabold uppercase tracking-wide ${style.strong}`}>
            {meta.label} {chapter.grade ?? "concours"} · Chap. {chapter.num} ·{" "}
            {chapter.domainLabel ?? DOMAIN_LABELS[chapter.domain]}
          </p>
          <h1 className="truncate font-display text-xl font-extrabold leading-tight md:text-2xl">
            {chapter.title}
          </h1>
        </div>
        <div className="shrink-0 rounded-xl bg-cream px-3 py-1.5 text-center">
          <p className="font-display text-lg font-extrabold leading-none">
            {doneCount}
            <span className="text-sm text-muted">/{chapter.exercises.length}</span>
          </p>
          <p className="text-[10px] font-extrabold uppercase tracking-wide text-muted">réussis</p>
        </div>
      </div>

      {/* Onglets */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setTab("lecon")}
          className={`btn-pop flex items-center gap-2 px-5 py-2.5 font-extrabold ${
            tab === "lecon" ? "bg-ink text-white" : "bg-card"
          }`}
        >
          <BookOpen size={18} />
          La leçon
        </button>
        <button
          onClick={() => {
            setTab("exos");
            setLevel(null);
          }}
          className={`btn-pop flex items-center gap-2 px-5 py-2.5 font-extrabold ${
            tab === "exos" ? "bg-ink text-white" : "bg-card"
          }`}
        >
          <Dumbbell size={18} />
          Les exercices
        </button>
        <Link
          href={`/fiche/${chapter.slug}`}
          className="btn-pop ml-auto flex items-center gap-2 bg-sun-tint px-5 py-2.5 font-extrabold text-sun-strong"
        >
          <FileDown size={18} />
          Fiche mémo
        </Link>
      </div>

      {tab === "lecon" && (
        <LessonView
          chapter={chapter}
          onFinish={() => {
            setTab("exos");
            setLevel(null);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}

      {tab === "exos" && level === null && (
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((lv) => {
            const pool = chapter.exercises.filter((e) => e.level === lv);
            const okCount = pool.filter((e) => progress.exercises[e.id]?.correct).length;
            return (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className="card-pop p-5 text-left transition-transform hover:-translate-y-0.5"
              >
                <p className="font-display text-4xl font-extrabold text-line" aria-hidden="true">
                  {"★".repeat(lv)}
                </p>
                <p className="mt-2 font-display text-xl font-bold">{LEVEL_LABELS[lv]}</p>
                <p className="mt-0.5 text-sm font-bold text-muted">
                  {pool.length} questions · {okCount} réussie{okCount > 1 ? "s" : ""} · +{XP_BY_LEVEL[lv]} XP chacune
                </p>
              </button>
            );
          })}
          <button
            onClick={() => setLevel(0)}
            className="card-pop bg-donnees-tint p-5 text-left transition-transform hover:-translate-y-0.5 sm:col-span-3"
          >
            <p className="font-display text-xl font-bold text-donnees-strong">{LEVEL_LABELS[0]}</p>
            <p className="mt-0.5 text-sm font-bold text-donnees-strong/80">
              Les {chapter.exercises.length} questions du chapitre, du plus simple au plus costaud.
            </p>
          </button>
        </div>
      )}

      {tab === "exos" && level !== null && (
        <div className="mt-5">
          <button
            onClick={() => setLevel(null)}
            className="mb-4 flex items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={2.5} />
            Choisir un autre niveau
          </button>
          <Player
            key={level}
            items={items}
            onItemResult={(item, correct) => recordExercise(item.id, correct, item.xp)}
            renderEnd={(score, total, replay) => (
              <div className="card-pop rise p-7 text-center">
                <PartyPopper size={44} className="mx-auto text-zest" />
                <p className="mt-3 font-display text-3xl font-extrabold">
                  {score}/{total}
                </p>
                <p className="mt-1 font-bold text-muted">
                  {score === total
                    ? "Sans faute, bravo ! Tu maîtrises."
                    : score >= total / 2
                      ? "Beau travail ! Relis les corrigés des questions ratées et retente."
                      : "Courage ! Relis la leçon puis retente, tu vas y arriver."}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <ReplayButton onClick={replay} label="Rejouer" />
                  {next && (
                    <Link href={`/chapitre/${next.slug}`} className="btn-pop bg-ink px-6 py-3 font-extrabold text-white">
                      Chapitre suivant : {next.title}
                    </Link>
                  )}
                </div>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}
