"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Swords, Flame, CheckCircle2, ArrowLeft } from "lucide-react";
import { dailyChallenge } from "@/lib/daily";
import { recordDaily, todayKey, useProgress } from "@/lib/progress";
import { Player, ReplayButton, type PlayerItem } from "@/components/player";

export default function DefiPage() {
  const progress = useProgress();
  const today = todayKey();
  const already = progress.dailies[today];
  const [playing, setPlaying] = useState(false);

  const items: PlayerItem[] = useMemo(
    () =>
      dailyChallenge(today).map((q, i) => ({
        id: `daily-${today}-${i}`,
        type: "input" as const,
        question: q.question,
        answer: q.answer,
        accept: q.accept,
        explanation: q.explanation,
        xp: 5,
        tag: `Question ${i + 1}`,
      })),
    [today]
  );

  // Écran d'accueil du défi
  if (!playing) {
    return (
      <div className="rise mx-auto max-w-xl">
        <Link href="/" className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Accueil
        </Link>
        <div className="card-pop p-7 text-center md:p-9">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sun-tint text-sun-strong">
            <Swords size={32} strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Le défi du jour</h1>
          <p className="mt-2 font-semibold text-muted">
            {items.length} questions de calcul rapide, un nouveau défi chaque jour.
            Chaque bonne réponse rapporte 5 XP la première fois !
          </p>

          {already && (
            <p className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-ok-tint px-4 py-3 font-extrabold text-ok-strong">
              <CheckCircle2 size={20} />
              Déjà fait aujourd&apos;hui : {already.score}/{already.total}. Tu peux rejouer pour t&apos;entraîner !
            </p>
          )}

          <p className="mt-4 flex items-center justify-center gap-2 font-extrabold text-sun-strong">
            <Flame size={20} strokeWidth={2.5} />
            Série actuelle : {progress.streak.current} jour{progress.streak.current > 1 ? "s" : ""}
          </p>

          <button
            onClick={() => setPlaying(true)}
            className="btn-pop mt-6 bg-ink px-8 py-3.5 font-display text-lg font-bold text-white"
          >
            {already ? "Rejouer le défi" : "C'est parti !"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rise mx-auto max-w-xl">
      <h1 className="mb-4 flex items-center gap-2 font-display text-2xl font-extrabold">
        <Swords size={24} strokeWidth={2.5} className="text-sun-strong" />
        Défi du {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}
      </h1>
      <Player
        items={items}
        onFinish={(score, total) => recordDaily(score, total)}
        renderEnd={(score, total, replay) => {
          return (
            <div className="card-pop rise p-7 text-center">
              <p className="font-display text-4xl font-extrabold">
                {score}/{total}
              </p>
              <p className="mt-2 font-bold text-muted">
                {score === total
                  ? "Défi parfait ! Ta série continue, reviens demain."
                  : score >= total / 2
                    ? "Bien joué, ta série continue ! Reviens demain pour un nouveau défi."
                    : "Ta série continue quand même ! Un petit tour dans les leçons et demain tu cartonnes."}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <ReplayButton onClick={replay} label="Rejouer (entraînement)" />
                <Link href="/" className="btn-pop bg-ink px-6 py-3 font-extrabold text-white">
                  Retour à l&apos;accueil
                </Link>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
