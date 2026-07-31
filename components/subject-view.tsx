"use client";

import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { chaptersFor } from "@/lib/chapters";
import { DOMAIN_LABELS, type Domain, type Subject } from "@/lib/types";
import { useProgress } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { getSubjectMeta } from "@/lib/subjects";
import { ChapterIcon } from "@/components/chapter-icon";
import { ProgressRing } from "@/components/progress-ring";

const DOMAIN_STYLE: Record<Domain, { tint: string; strong: string }> = {
  nombres: { tint: "bg-nombres-tint", strong: "text-nombres-strong" },
  geometrie: { tint: "bg-geometrie-tint", strong: "text-geometrie-strong" },
  grandeurs: { tint: "bg-grandeurs-tint", strong: "text-grandeurs-strong" },
  donnees: { tint: "bg-donnees-tint", strong: "text-donnees-strong" },
};

const RING_COLOR: Record<Domain, string> = {
  nombres: "var(--color-nombres-strong)",
  geometrie: "var(--color-geometrie-strong)",
  grandeurs: "var(--color-grandeurs-strong)",
  donnees: "var(--color-donnees-strong)",
};

export function SubjectView({ subject }: { subject: Subject }) {
  const progress = useProgress();
  const { grade } = usePrefs();
  const meta = getSubjectMeta(subject);
  const chapters = chaptersFor(subject, grade);

  return (
    <div className="rise">
      <Link href="/" className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink">
        <ArrowLeft size={16} strokeWidth={2.5} />
        Toutes les matières
      </Link>

      {/* Bandeau matière */}
      <div
        className="hero-card flex items-center gap-5 p-6 md:p-8"
        style={{ background: `linear-gradient(135deg, ${meta.from} 0%, ${meta.to} 100%)` }}
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-white">
          <ChapterIcon name={meta.icon} size={34} strokeWidth={2.25} />
        </span>
        <div>
          <h1 className="font-display text-3xl font-extrabold text-white md:text-4xl">
            {meta.label}
            <span
              className="ml-3 align-middle rounded-full px-3 py-1 font-body text-sm font-extrabold text-white"
              style={{ background: meta.deep }}
            >
              {grade}
            </span>
          </h1>
          <p
            className="mt-1.5 w-fit rounded-lg px-2 py-0.5 font-bold text-white"
            style={{ background: "rgba(0,0,0,0.22)" }}
          >
            {meta.tagline}
          </p>
        </div>
      </div>

      {chapters.length === 0 ? (
        <div className="card-pop mt-5 p-8 text-center">
          <p className="font-display text-xl font-bold">Le contenu {grade} arrive bientôt !</p>
          <p className="mt-1 font-semibold text-muted">
            En attendant, tu peux réviser le programme de l&apos;autre niveau depuis l&apos;accueil.
          </p>
        </div>
      ) : (
        <div className="stagger mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((ch) => {
            const total = ch.exercises.length;
            const doneCount = ch.exercises.filter((e) => progress.exercises[e.id]?.correct).length;
            const style = DOMAIN_STYLE[ch.domain];
            return (
              <Link
                key={ch.slug}
                href={`/chapitre/${ch.slug}`}
                className="card-pop group flex flex-col p-5 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${style.tint} ${style.strong}`}>
                    <ChapterIcon name={ch.icon} size={26} strokeWidth={2.25} />
                  </span>
                  <ProgressRing
                    value={total ? doneCount / total : 0}
                    color={RING_COLOR[ch.domain]}
                    label={doneCount === total && total > 0 ? "✓" : `${doneCount}/${total}`}
                  />
                </div>
                <p className={`mt-3 text-xs font-extrabold uppercase tracking-wide ${style.strong}`}>
                  Chapitre {ch.num} · {ch.domainLabel ?? DOMAIN_LABELS[ch.domain]}
                </p>
                <h3 className="mt-0.5 font-display text-xl font-bold leading-snug">{ch.title}</h3>
                <p className="mt-1 text-sm font-semibold text-muted">{ch.teaser}</p>
              </Link>
            );
          })}
        </div>
      )}
      {chapters.length > 0 && (
        <p className="mt-4 flex items-center gap-1.5 text-sm font-bold text-muted">
          <Check size={16} strokeWidth={3} />
          {chapters.length} chapitres · {chapters.reduce((n, c) => n + c.exercises.length, 0)} exercices corrigés
        </p>
      )}
    </div>
  );
}
