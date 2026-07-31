"use client";

import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  Target,
  Check,
  Clapperboard,
  Dumbbell,
} from "lucide-react";
import type { Chapter, Domain } from "@/lib/types";
import { Figure } from "@/components/figures";
import { ChapterIcon } from "@/components/chapter-icon";

const DOMAIN_STYLE: Record<Domain, { tint: string; strong: string; hex: string }> = {
  nombres: { tint: "bg-nombres-tint", strong: "text-nombres-strong", hex: "#b32b44" },
  geometrie: { tint: "bg-geometrie-tint", strong: "text-geometrie-strong", hex: "#1d5fa8" },
  grandeurs: { tint: "bg-grandeurs-tint", strong: "text-grandeurs-strong", hex: "#0f6b52" },
  donnees: { tint: "bg-donnees-tint", strong: "text-donnees-strong", hex: "#5a3ec8" },
};

/**
 * Met en couleur les passages entre « … » et les mini-calculs (chiffres + × ÷ = − +)
 * pour casser visuellement les blocs de texte.
 */
function emphasize(text: string, colorClass: string): React.ReactNode[] {
  const parts = text.split(/(«[^»]*»)/g);
  return parts.map((part, i) =>
    part.startsWith("«") ? (
      <strong key={i} className={`font-extrabold ${colorClass}`}>
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

/** Une phrase par ligne : on découpe aux fins de phrases pour aérer la lecture. */
function sentences(p: string): string[] {
  const out = p.match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g);
  return out ? out.map((s) => s.trim()).filter(Boolean) : [p];
}

export function LessonView({
  chapter,
  onFinish,
}: {
  chapter: Chapter;
  onFinish: () => void;
}) {
  const style = DOMAIN_STYLE[chapter.domain];
  // étapes : 0 = objectifs, 1..n = sections, éventuellement +1 = vidéos
  const hasVideos = !!chapter.videos?.length;
  const totalSteps = 1 + chapter.lesson.length + (hasVideos ? 1 : 0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const isObjectives = step === 0;
  const sectionIdx = step - 1;
  const isVideos = hasVideos && step === totalSteps - 1;
  const section = !isObjectives && !isVideos ? chapter.lesson[sectionIdx] : null;

  // Visuel du panneau de droite : la figure de l'étape, sinon la figure du
  // chapitre la plus proche (déjà vue de préférence), sinon panneau décoratif.
  const sideFigure =
    section?.figure ??
    (section
      ? [...chapter.lesson.slice(0, sectionIdx + 1)].reverse().find((s) => s.figure)?.figure ??
        chapter.lesson.find((s) => s.figure)?.figure
      : chapter.lesson.find((s) => s.figure)?.figure);

  return (
    <div className="mx-auto mt-5 max-w-5xl">
      {/* Fil d'avancement : un point par étape */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            aria-label={`Étape ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: i === step ? 26 : 10,
              height: 10,
              background: i === step ? style.hex : i < step ? `${style.hex}66` : "var(--color-line)",
            }}
          />
        ))}
      </div>

      <div className={isVideos ? "" : "lg:grid lg:grid-cols-[1fr_360px] lg:items-start lg:gap-4"}>
      <div key={step} className="card-pop rise overflow-hidden">
        {isObjectives && (
          <div className="p-6 md:p-8">
            <p className={`flex items-center gap-2 font-display text-lg font-extrabold ${style.strong}`}>
              <Target size={20} strokeWidth={2.5} />
              Ta mission dans ce chapitre
            </p>
            <ul className="mt-4 space-y-3">
              {chapter.objectives.map((o) => (
                <li key={o} className="flex items-start gap-3 text-lg font-bold leading-snug">
                  <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.tint} ${style.strong}`}>
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-bold text-muted">
              {chapter.lesson.length}&nbsp;étapes courtes, puis les exercices. C&apos;est parti !
            </p>
          </div>
        )}

        {section && (
          <div className="p-6 md:p-8">
            <p className={`text-xs font-extrabold uppercase tracking-wide ${style.strong}`}>
              Étape {step} sur {chapter.lesson.length}
            </p>
            <h2 className="mt-1 font-display text-2xl font-extrabold leading-tight md:text-3xl">
              {section.title}
            </h2>

            {/* Une phrase par ligne, gros interligne : fini le pavé */}
            <div className="mt-5 space-y-4">
              {section.paragraphs.map((p, j) => (
                <div key={j} className="space-y-1.5">
                  {sentences(p).map((s, k) => (
                    <p key={k} className="text-[17px] font-semibold leading-relaxed">
                      {emphasize(s, style.strong)}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {section.figure && <span className="lg:hidden"><Figure id={section.figure} /></span>}

            {section.example && (
              <div className={`mt-5 rounded-2xl ${style.tint} px-5 py-4`}>
                <p className={`text-xs font-extrabold uppercase tracking-wide ${style.strong}`}>
                  Exemple
                </p>
                <div className="mt-1.5 space-y-1">
                  {section.example.map((line, j) => (
                    <p key={j} className="font-bold leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}

            {section.tip && (
              <p className="mt-4 flex items-start gap-2.5 rounded-2xl bg-sun-tint px-5 py-4 font-bold leading-relaxed text-sun-strong">
                <Lightbulb size={22} className="mt-0.5 shrink-0" />
                {section.tip}
              </p>
            )}
          </div>
        )}

        {isVideos && chapter.videos && (
          <div className="p-6 md:p-8">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold">
              <Clapperboard size={24} className={style.strong} />
              En vidéo, pour bien ancrer
            </h2>
            <div className={`mt-4 grid gap-4 ${chapter.videos.length > 1 ? "md:grid-cols-2" : ""}`}>
              {chapter.videos.map((v) => (
                <figure key={v.youtubeId}>
                  <div className="overflow-hidden rounded-2xl border-2 border-line">
                    <iframe
                      className="aspect-video w-full"
                      src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}`}
                      title={v.title}
                      allow="accelerometer; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="mt-1.5 text-sm font-bold text-muted">
                    {v.title}
                    {v.channel ? ` — ${v.channel}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Panneau visuel (desktop) : figure de l'étape ou décor de la matière */}
      {!isVideos && (
        <aside className="rise sticky top-20 hidden lg:block">
          {sideFigure ? (
            <Figure id={sideFigure} />
          ) : (
            <div className={`card-pop flex flex-col items-center gap-3 p-8 text-center ${style.tint}`}>
              <span className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-white/60 ${style.strong}`}>
                <ChapterIcon name={chapter.icon} size={52} strokeWidth={2} />
              </span>
              <p className={`font-display text-lg font-bold ${style.strong}`}>{chapter.title}</p>
              <p className="text-sm font-bold text-muted">{chapter.teaser}</p>
            </div>
          )}
        </aside>
      )}
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="btn-pop flex items-center gap-2 bg-card px-5 py-2.5 font-extrabold disabled:opacity-40"
        >
          <ArrowLeft size={18} />
          Retour
        </button>
        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="btn-pop flex items-center gap-2 bg-ink px-6 py-2.5 font-extrabold text-white"
          >
            Continuer
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={onFinish}
            className="btn-pop flex items-center gap-2 bg-ink px-6 py-2.5 font-display text-lg font-bold text-white"
          >
            <Dumbbell size={20} />
            Aux exercices !
          </button>
        )}
      </div>
    </div>
  );
}
