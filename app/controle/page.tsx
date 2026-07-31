"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, TimerReset, GraduationCap, Check, X } from "lucide-react";
import { chaptersFor } from "@/lib/chapters";
import { recordExercise, useProgress } from "@/lib/progress";
import { usePrefs } from "@/lib/prefs";
import { SUBJECTS, getSubjectMeta } from "@/lib/subjects";
import type { Subject } from "@/lib/types";
import { playFanfare } from "@/lib/fx";
import { Player, type PlayerItem } from "@/components/player";
import { ChapterIcon } from "@/components/chapter-icon";

const NB_QUESTIONS = 10;
const DURATION_S = 10 * 60;

interface Answered {
  item: PlayerItem;
  correct: boolean;
}

function fmt(s: number): string {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Appréciation façon bulletin */
function verdict(note: number): string {
  if (note >= 18) return "Excellent ! Un contrôle en classe ne te fait plus peur.";
  if (note >= 14) return "Très bien ! Encore un ou deux points à consolider.";
  if (note >= 10) return "C'est acquis dans l'ensemble — regarde bien les corrections.";
  return "Courage ! Relis les corrections puis retente : c'est comme ça qu'on progresse.";
}

export default function ControlePage() {
  const progress = useProgress();
  const { grade } = usePrefs();
  const [subject, setSubject] = useState<Subject | "tout" | null>(null);
  const [items, setItems] = useState<PlayerItem[]>([]);
  const [answers, setAnswers] = useState<Answered[]>([]);
  const [phase, setPhase] = useState<"pick" | "run" | "end">("pick");
  const [left, setLeft] = useState(DURATION_S);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableSubjects = useMemo(
    () =>
      SUBJECTS.filter(
        (s) => (!s.grades || s.grades.includes(grade)) && chaptersFor(s.id, grade).length > 0
      ),
    [grade]
  );

  function start(pick: Subject | "tout") {
    const pool =
      pick === "tout"
        ? availableSubjects.flatMap((s) => chaptersFor(s.id, grade))
        : chaptersFor(pick, grade);
    const all: PlayerItem[] = pool.flatMap((ch) =>
      ch.exercises.map((e) => ({
        id: e.id,
        type: e.type,
        question: e.question,
        choices: e.choices,
        answer: e.answer,
        accept: e.accept,
        explanation: e.explanation,
        xp: 5,
        tag: ch.title,
      }))
    );
    // tirage aléatoire sans remise
    const picked: PlayerItem[] = [];
    const used = new Set<number>();
    while (picked.length < Math.min(NB_QUESTIONS, all.length)) {
      const i = Math.floor(Math.random() * all.length);
      if (!used.has(i)) {
        used.add(i);
        picked.push(all[i]);
      }
    }
    setSubject(pick);
    setItems(picked);
    setAnswers([]);
    setLeft(DURATION_S);
    setPhase("run");
  }

  // Chrono
  useEffect(() => {
    if (phase !== "run") return;
    timerRef.current = setInterval(() => setLeft((s) => s - 1), 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  useEffect(() => {
    if (left <= 0 && phase === "run") setPhase("end");
  }, [left, phase]);

  if (phase === "pick") {
    return (
      <div className="rise mx-auto max-w-2xl">
        <Link href="/" className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink">
          <ArrowLeft size={16} strokeWidth={2.5} />
          Accueil
        </Link>
        <div className="card-pop p-7 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-nombres-tint text-nombres-strong">
            <TimerReset size={32} strokeWidth={2.25} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold">Épreuve blanche</h1>
          <p className="mt-2 font-semibold text-muted">
            {NB_QUESTIONS} questions · {DURATION_S / 60} minutes · sans indice ni corrigé
            pendant l&apos;épreuve. Note sur 20 et corrections à la fin, comme en classe.
          </p>
        </div>
        <div className="stagger mt-4 grid grid-cols-2 gap-3">
          <button
            onClick={() => start("tout")}
            className="hero-card bg-gradient-to-br from-[#3B3B55] to-[#2D2D3F] p-5 text-left"
          >
            <p className="font-display text-xl font-extrabold text-white">Toutes matières</p>
            <p className="mt-0.5 text-sm font-bold text-white/80">Le grand mélange, comme un brevet blanc</p>
          </button>
          {availableSubjects
            .map((s) => (
              <button
                key={s.id}
                onClick={() => start(s.id)}
                className="hero-card p-5 text-left"
                style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})` }}
              >
                <p className="flex items-center gap-2 font-display text-xl font-extrabold text-white">
                  <ChapterIcon name={s.icon} size={20} strokeWidth={2.5} />
                  {s.label}
                </p>
                <p className="mt-0.5 text-sm font-bold text-white/80">{grade} · {chaptersFor(s.id, grade).length} chapitres au menu</p>
              </button>
            ))}
        </div>
      </div>
    );
  }

  if (phase === "end") {
    const note = Math.round((answers.filter((a) => a.correct).length / NB_QUESTIONS) * 20);
    const wrong = answers.filter((a) => !a.correct);
    const unanswered = items.length - answers.length;
    return (
      <div className="rise mx-auto max-w-2xl">
        <div className="card-pop p-7 text-center">
          <GraduationCap size={44} className="mx-auto text-nombres-strong" />
          <p className="mt-2 font-display text-5xl font-extrabold">
            {note}<span className="text-2xl text-muted">/20</span>
          </p>
          <p className="mt-1 font-bold text-muted">{verdict(note)}</p>
          {unanswered > 0 && (
            <p className="mt-1 text-sm font-bold text-ko-strong">
              Temps écoulé : {unanswered} question{unanswered > 1 ? "s" : ""} non répondue{unanswered > 1 ? "s" : ""} (comptée{unanswered > 1 ? "s" : ""} fausse{unanswered > 1 ? "s" : ""}).
            </p>
          )}
        </div>

        {wrong.length > 0 && (
          <div className="mt-4 space-y-3">
            <h2 className="font-display text-xl font-extrabold">Les corrections</h2>
            {wrong.map(({ item }) => (
              <div key={item.id} className="card-pop p-4">
                <p className="flex items-start gap-2 font-bold">
                  <X size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-ko-strong" />
                  {item.question}
                </p>
                <p className="mt-2 rounded-xl bg-cream px-3 py-2 text-[15px] font-semibold leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>
        )}
        {wrong.length === 0 && answers.length === items.length && (
          <p className="mt-4 flex items-center justify-center gap-2 font-display text-xl font-bold text-ok-strong">
            <Check size={22} strokeWidth={3} />
            Sans faute — rien à corriger !
          </p>
        )}

        <div className="mt-5 flex justify-center gap-3">
          <button onClick={() => setPhase("pick")} className="btn-pop bg-card px-6 py-3 font-extrabold">
            Nouveau contrôle
          </button>
          <Link href="/" className="btn-pop bg-ink px-6 py-3 font-extrabold text-white">
            Accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rise mx-auto max-w-xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-extrabold">
          Contrôle {subject === "tout" ? "toutes matières" : getSubjectMeta(subject as Subject).label}
        </h1>
        <span
          className={`rounded-full px-4 py-1.5 font-display text-lg font-extrabold ${
            left <= 60 ? "bg-ko-tint text-ko-strong" : "bg-card text-ink"
          }`}
        >
          {fmt(Math.max(0, left))}
        </span>
      </div>
      <Player
        exam
        items={items}
        onItemResult={(item, correct) => {
          setAnswers((a) => [...a, { item, correct }]);
          recordExercise(item.id, correct, item.xp);
        }}
        onFinish={() => {
          playFanfare();
          setPhase("end");
        }}
        renderEnd={() => null}
      />
    </div>
  );
}
