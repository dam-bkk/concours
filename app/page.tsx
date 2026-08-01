"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Swords,
  ChevronRight,
  CheckCircle2,
  Settings2,
  Flame,
  BrainCircuit,
  TimerReset,
  Check,
} from "lucide-react";
import { chaptersFor } from "@/lib/chapters";
import type { Grade } from "@/lib/types";
import { useProgress, todayKey, dueReviews } from "@/lib/progress";
import { usePrefs, setStudentName, setGrade, setOptions } from "@/lib/prefs";
import { SUBJECTS, GRADES, GRADE_LABELS, GRADES_READY } from "@/lib/subjects";
import { ChapterIcon } from "@/components/chapter-icon";
import { LaureatLogo } from "@/components/logo";
import { DAILY_SIZE } from "@/lib/daily";

/** Création / modification du profil : prénom → classe → options */
function ProfileSetup({ onDone }: { onDone: () => void }) {
  const { name, grade, options } = usePrefs();
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState(name ?? "");
  const [pickedGrade, setPickedGrade] = useState<Grade>(grade);
  const [picked, setPicked] = useState<Set<string>>(
    new Set(options ?? SUBJECTS.filter((s) => s.optional).map((s) => s.id))
  );

  const optional = SUBJECTS.filter(
    (s) => s.optional && (!s.grades || s.grades.includes(pickedGrade))
  );

  return (
    <div className="card-pop p-6 md:p-8">
      {step === 0 && (
        <>
          <h1 className="font-display text-2xl font-extrabold md:text-3xl">
            Bienvenue sur Lauréat
          </h1>
          <p className="mt-1 font-semibold text-muted">Quel est votre prénom ?</p>
          <form
            className="mt-3 flex max-w-sm gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (typed.trim()) {
                setStudentName(typed);
                setGrade("concours");
                setOptions([]);
                onDone();
              }
            }}
          >
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              autoFocus
              placeholder="Votre prénom…"
              className="btn-pop flex-1 bg-card px-4 py-2.5 font-bold outline-none placeholder:text-muted"
            />
            <button type="submit" className="btn-pop whitespace-nowrap bg-ink px-5 py-2.5 font-extrabold text-white">
              C&apos;est moi !
            </button>
          </form>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="font-display text-2xl font-extrabold">En quelle classe es-tu ?</h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {GRADES.map((g) => {
              const ready = GRADES_READY.includes(g);
              return (
                <button
                  key={g}
                  onClick={() => ready && setPickedGrade(g)}
                  disabled={!ready}
                  className={`btn-pop relative px-5 py-2.5 font-extrabold ${
                    pickedGrade === g ? "bg-ink text-white" : ready ? "bg-card" : "bg-card opacity-45"
                  }`}
                >
                  {GRADE_LABELS[g]}
                  {!ready && (
                    <span className="absolute -top-2 -right-2 rounded-[3px] bg-sun px-1.5 py-0.5 text-[9px] font-extrabold text-ink">
                      bientôt
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-sm font-bold text-muted">
            4e, 3e et lycée arrivent — la 6e et la 5e sont complètes.
          </p>
          <button
            onClick={() => {
              setGrade(pickedGrade);
              setStep(2);
            }}
            className="btn-pop mt-4 bg-ink px-6 py-2.5 font-extrabold text-white"
          >
            Continuer
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="font-display text-2xl font-extrabold">Tes options en {GRADE_LABELS[pickedGrade]}</h1>
          <p className="mt-1 font-semibold text-muted">
            Le tronc commun est déjà prêt. Coche les options que tu suis au collège —
            tu pourras changer à tout moment.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {optional.map((s) => {
              const on = picked.has(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    const next = new Set(picked);
                    if (on) next.delete(s.id);
                    else next.add(s.id);
                    setPicked(next);
                  }}
                  className={`btn-pop flex items-center gap-3 px-4 py-3 text-left font-extrabold ${
                    on ? "text-white" : "bg-card"
                  }`}
                  style={on ? { background: `linear-gradient(135deg, ${s.from}, ${s.to})` } : undefined}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[3px] ${
                      on ? "bg-white/25" : "bg-line"
                    }`}
                  >
                    {on && <Check size={14} strokeWidth={3.5} />}
                  </span>
                  {s.label}
                </button>
              );
            })}
            {optional.length === 0 && (
              <p className="font-bold text-muted">Pas d&apos;option à choisir pour cette classe.</p>
            )}
          </div>
          <button
            onClick={() => {
              setOptions([...picked]);
              onDone();
            }}
            className="btn-pop mt-5 bg-ink px-7 py-3 font-display text-lg font-bold text-white"
          >
            C&apos;est parti !
          </button>
        </>
      )}
    </div>
  );
}

export default function Home() {
  const progress = useProgress();
  const { name, grade, options, hydrated } = usePrefs();
  // Le setup reste affiché pendant TOUT le parcours (le prénom est enregistré dès l'étape 1)
  const [showSetup, setShowSetup] = useState(false);
  const [autoOpened, setAutoOpened] = useState(false);
  const daily = progress.dailies[todayKey()];
  const due = dueReviews(progress).length;

  if (hydrated && !name && !autoOpened) {
    setShowSetup(true);
    setAutoOpened(true);
  }

  if (!hydrated) return <div className="card-pop h-40 animate-pulse" />;

  if (showSetup) {
    return (
      <div className="rise mx-auto max-w-2xl">
        <ProfileSetup onDone={() => setShowSetup(false)} />
      </div>
    );
  }

  if (!name) {
    // sécurité (stockage indisponible) : on repropose le setup
    return (
      <div className="rise mx-auto max-w-2xl">
        <ProfileSetup onDone={() => setShowSetup(false)} />
      </div>
    );
  }

  const visibleSubjects = SUBJECTS.filter(
    (s) =>
      (!s.grades || s.grades.includes(grade)) &&
      (!s.optional || options === null || options.includes(s.id))
  );

  return (
    <div className="rise space-y-4">
      {/* Rangée haute : bienvenue + défi du jour */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="card-pop flex items-center gap-4 p-5 md:p-6">
          <div className="hidden sm:block">
            <LaureatLogo size={64} />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
              Bonjour {name}
              <button
                onClick={() => setShowSetup(true)}
                className="ml-2 inline-flex align-middle text-muted hover:text-ink"
                aria-label="Modifier mon profil"
              >
                <Settings2 size={18} />
              </button>
            </h1>
            <p className="mt-1 font-semibold text-muted">
              Prêt pour votre entraînement du jour ? Choisissez une épreuve.
            </p>
          </div>
          <div className="hidden shrink-0 items-center gap-2 rounded-[3px] bg-sun-tint px-4 py-3 md:flex">
            <Flame size={22} strokeWidth={2.5} className="text-sun-strong" />
            <div>
              <p className="font-display text-xl font-extrabold leading-none text-sun-strong">
                {progress.streak.current} jour{progress.streak.current > 1 ? "s" : ""}
              </p>
              <p className="text-xs font-bold text-sun-strong/80">de série, continue !</p>
            </div>
          </div>
        </div>

        <Link
          href="/defi"
          className={`hero-card group flex items-center justify-between gap-3 bg-gradient-to-br from-[#FFD166] to-[#F5B93E] p-5 ${
            daily ? "" : "daily-glow"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[3px] bg-sun-strong text-white">
              <Swords size={24} strokeWidth={2.5} />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-sun-strong">Défi du jour</p>
              <p className="text-sm font-bold leading-tight text-sun-strong">
                {daily
                  ? `Fait ! ${daily.score}/${daily.total} — reviens demain.`
                  : `${DAILY_SIZE} questions rapides pour ta série !`}
              </p>
            </div>
          </div>
          {daily ? (
            <CheckCircle2 size={30} className="shrink-0 text-sun-strong" />
          ) : (
            <ChevronRight size={28} className="shrink-0 text-sun-strong transition-transform group-hover:translate-x-1" />
          )}
        </Link>
      </div>

      {/* Révision espacée + mode contrôle */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <Link href="/revision" className="card-pop group flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-grandeurs-tint text-grandeurs-strong">
            <BrainCircuit size={26} strokeWidth={2.25} />
          </span>
          <div className="flex-1">
            <p className="font-display text-lg font-extrabold">Ma révision du jour</p>
            <p className="text-sm font-bold text-muted">
              {due > 0
                ? `${due} exercice${due > 1 ? "s" : ""} à revoir pour bien mémoriser`
                : "Rien à revoir — ta mémoire est à jour !"}
            </p>
          </div>
          {due > 0 && (
            <span className="flex h-8 w-8 items-center justify-center rounded-[3px] bg-ko-tint font-display text-sm font-extrabold text-ko-strong">
              {due}
            </span>
          )}
        </Link>
        <Link href="/controle" className="card-pop group flex items-center gap-4 p-4 transition-transform hover:-translate-y-0.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[3px] bg-nombres-tint text-nombres-strong">
            <TimerReset size={26} strokeWidth={2.25} />
          </span>
          <div>
            <p className="font-display text-lg font-extrabold">Épreuve blanche</p>
            <p className="text-sm font-bold text-muted">10 questions chrono, note sur 20, comme en classe</p>
          </div>
        </Link>
      </div>

      {/* Matières */}
      <section className="stagger grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {visibleSubjects.map((s) => {
          const chapters = chaptersFor(s.id, grade);
          const total = chapters.reduce((n, c) => n + c.exercises.length, 0);
          const done = chapters.reduce(
            (n, c) => n + c.exercises.filter((e) => progress.exercises[e.id]?.correct).length,
            0
          );
          const available = chapters.length > 0;
          const inner = (
            <>
              <div className="flex items-start justify-between">
                <span className="card-icon flex h-11 w-11 items-center justify-center rounded-[3px] bg-white/20 text-white">
                  <ChapterIcon name={s.icon} size={24} strokeWidth={2.25} />
                </span>
                {available ? (
                  <span className="flex items-center gap-1.5">
                    {s.optional && (
                      <span className="rounded-[3px] bg-white/25 px-2.5 py-1.5 text-xs font-extrabold text-white">
                        Option
                      </span>
                    )}
                    <span
                      className="rounded-[3px] px-3 py-1.5 text-xs font-extrabold text-white"
                      style={{ background: s.deep }}
                    >
                      {done}/{total} réussis
                    </span>
                  </span>
                ) : (
                  <span className="rounded-[3px] bg-white/25 px-3 py-1.5 text-xs font-extrabold text-white">
                    Bientôt !
                  </span>
                )}
              </div>
              <p className="mt-2.5 font-display text-xl font-extrabold text-white md:text-2xl">{s.label}</p>
              <p
                className="mt-1 w-fit rounded-[3px] px-2 py-0.5 text-xs font-bold text-white"
                style={{ background: "rgba(0,0,0,0.22)" }}
              >
                {s.tagline}
              </p>
              {available && (
                <div className="mt-3 h-2 overflow-hidden rounded-[3px] bg-black/25">
                  <div
                    className="h-full rounded-[3px] bg-white transition-all duration-500"
                    style={{ width: `${total ? Math.max(2, (done / total) * 100) : 0}%` }}
                  />
                </div>
              )}
            </>
          );
          const style = { background: `linear-gradient(135deg, ${s.from} 0%, ${s.to} 100%)` };
          const cls = "hero-card block p-5";
          return available ? (
            <Link key={s.id} href={`/matiere/${s.id}`} className={cls} style={style}>
              {inner}
            </Link>
          ) : (
            <div key={s.id} className={`${cls} opacity-80`} style={style}>
              {inner}
            </div>
          );
        })}
      </section>
    </div>
  );
}
