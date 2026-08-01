"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, PartyPopper } from "lucide-react";
import { CHAPTERS } from "@/lib/chapters";
import { dueReviews, recordExercise, useProgress } from "@/lib/progress";
import { playFanfare } from "@/lib/fx";
import { Player, type PlayerItem } from "@/components/player";
import { getSubjectMeta } from "@/lib/subjects";

const XP_REVIEW = 10;

export default function RevisionPage() {
  const progress = useProgress();
  const [playing, setPlaying] = useState(false);

  // File figée au moment où on lance la session (sinon elle bouge à chaque réponse)
  const [items, setItems] = useState<PlayerItem[]>([]);
  const dueIds = useMemo(() => new Set(dueReviews(progress)), [progress]);

  function start() {
    const list: PlayerItem[] = [];
    for (const ch of CHAPTERS) {
      for (const e of ch.exercises) {
        if (dueIds.has(e.id)) {
          list.push({
            id: e.id,
            type: e.type,
            question: e.question,
            choices: e.choices,
            answer: e.answer,
            accept: e.accept,
            explanation: e.explanation,
            hint: e.hint,
            xp: XP_REVIEW,
            tag: `${getSubjectMeta(ch.subject ?? "gardien-paix").label} · ${ch.title}`,
          });
        }
      }
    }
    setItems(list.slice(0, 15)); // séance courte : 15 max
    setPlaying(true);
  }

  if (!playing) {
    return (
      <div className="rise mx-auto max-w-xl">
        <Link href="/" className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Accueil
        </Link>
        <div className="card-pop p-7 text-center md:p-9">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[3px] bg-grandeurs-tint text-grandeurs-strong">
            <BrainCircuit size={32} strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Ma révision du jour</h1>
          {dueIds.size === 0 ? (
            <>
              <p className="mt-2 font-semibold text-muted">
                Rien à revoir aujourd&apos;hui, ta mémoire est à jour ! Les exercices
                ratés reviennent ici automatiquement le lendemain, puis 3 jours et
                7 jours plus tard : c&apos;est comme ça qu&apos;on retient pour de bon.
              </p>
              <Link href="/" className="btn-pop mt-6 inline-block bg-ink px-8 py-3.5 font-display text-lg font-bold text-white">
                Retour à l&apos;accueil
              </Link>
            </>
          ) : (
            <>
              <p className="mt-2 font-semibold text-muted">
                {dueIds.size} exercice{dueIds.size > 1 ? "s" : ""} à revoir pour ancrer
                ce qui t&apos;a piégée. Réussis-les 3 fois espacées et ils sortent de la
                liste pour toujours — +{XP_REVIEW} XP par bonne réponse.
              </p>
              <button onClick={start} className="btn-pop mt-6 bg-ink px-8 py-3.5 font-display text-lg font-bold text-white">
                C&apos;est parti !
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rise mx-auto max-w-xl">
      <h1 className="mb-4 flex items-center gap-2 font-display text-2xl font-extrabold">
        <BrainCircuit size={24} strokeWidth={2.5} className="text-grandeurs-strong" />
        Révision espacée
      </h1>
      <Player
        items={items}
        onItemResult={(item, correct) => recordExercise(item.id, correct, item.xp)}
        renderEnd={(score, total) => {
          playFanfare();
          return (
            <div className="card-pop rise p-7 text-center">
              <PartyPopper size={44} className="mx-auto text-zest" />
              <p className="mt-3 font-display text-3xl font-extrabold">
                {score}/{total}
              </p>
              <p className="mt-1 font-bold text-muted">
                {score === total
                  ? "Tout est ancré ! Les exercices réussis reviendront une dernière fois plus tard, pour vérifier."
                  : "Les exercices encore ratés reviendront demain. C'est en espaçant qu'on mémorise !"}
              </p>
              <Link href="/" className="btn-pop mt-5 inline-block bg-ink px-6 py-3 font-extrabold text-white">
                Retour à l&apos;accueil
              </Link>
            </div>
          );
        }}
      />
    </div>
  );
}
