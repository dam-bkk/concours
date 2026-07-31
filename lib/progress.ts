"use client";

import { useCallback, useEffect, useState } from "react";
import { logActivity } from "@/lib/activity-log";

export interface ExerciseRecord {
  correct: boolean;
  attempts: number;
  /** ISO date du dernier essai */
  date: string;
}

export interface DailyRecord {
  score: number;
  total: number;
}

/** Journal d'activité d'une journée (pour le calendrier parental) */
export interface DayActivity {
  /** exercices tentés */
  ex: number;
  /** exercices réussis */
  ok: number;
  /** défi du jour joué */
  daily: boolean;
  /** XP gagnée ce jour-là */
  xp: number;
}

/** Répétition espacée : un exercice raté revient à J+1, puis J+3, puis J+7 */
export interface ReviewItem {
  /** date (YYYY-MM-DD) à partir de laquelle l'exercice est « à revoir » */
  due: string;
  /** 0 → J+1, 1 → J+3, 2 → J+7 ; réussi au palier 2 → sorti de la file */
  step: number;
}

export interface Progress {
  xp: number;
  exercises: Record<string, ExerciseRecord>;
  /** clé = YYYY-MM-DD */
  dailies: Record<string, DailyRecord>;
  /** clé = YYYY-MM-DD — journal par jour */
  activity: Record<string, DayActivity>;
  /** file de révision espacée, clé = id d'exercice */
  review: Record<string, ReviewItem>;
  streak: { current: number; best: number; lastDate: string | null };
  badges: string[];
}

const KEY = "laureat.progress.v1";

const EMPTY: Progress = {
  xp: 0,
  exercises: {},
  dailies: {},
  activity: {},
  review: {},
  streak: { current: 0, best: 0, lastDate: null },
  badges: [],
};

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function load(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Progress;
    return {
      ...EMPTY,
      ...p,
      activity: p.activity ?? {},
      review: p.review ?? {},
      streak: { ...EMPTY.streak, ...p.streak },
    };
  } catch {
    return EMPTY;
  }
}

function save(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
    window.dispatchEvent(new CustomEvent("laureat-progress"));
  } catch {
    // stockage indisponible : on continue sans persister
  }
}

/** Toute activité du jour entretient la série (streak). */
function touchStreak(p: Progress): Progress {
  const today = todayKey();
  if (p.streak.lastDate === today) return p;
  const yesterday = todayKey(new Date(Date.now() - 86_400_000));
  const current = p.streak.lastDate === yesterday ? p.streak.current + 1 : 1;
  return {
    ...p,
    streak: { current, best: Math.max(p.streak.best, current), lastDate: today },
  };
}

function bumpActivity(
  p: Progress,
  delta: Partial<DayActivity>
): Progress {
  const today = todayKey();
  const cur = p.activity[today] ?? { ex: 0, ok: 0, daily: false, xp: 0 };
  return {
    ...p,
    activity: {
      ...p.activity,
      [today]: {
        ex: cur.ex + (delta.ex ?? 0),
        ok: cur.ok + (delta.ok ?? 0),
        daily: cur.daily || (delta.daily ?? false),
        xp: cur.xp + (delta.xp ?? 0),
      },
    },
  };
}

/** Intervalles de la répétition espacée, en jours */
const REVIEW_STEPS = [1, 3, 7];

function addDays(base: string, days: number): string {
  const d = new Date(base + "T12:00:00");
  d.setDate(d.getDate() + days);
  return todayKey(d);
}

/** Met à jour la file de révision selon le résultat du jour. */
function updateReview(p: Progress, exId: string, correct: boolean): Progress {
  const today = todayKey();
  const item = p.review[exId];
  const review = { ...p.review };
  if (!correct) {
    // raté (nouveau ou en révision) : retour au premier palier, à revoir demain
    review[exId] = { due: addDays(today, REVIEW_STEPS[0]), step: 0 };
  } else if (item) {
    if (item.due > today) return p; // réussi en avance : on ne change rien
    const nextStep = item.step + 1;
    if (nextStep >= REVIEW_STEPS.length) delete review[exId];
    else review[exId] = { due: addDays(today, REVIEW_STEPS[nextStep]), step: nextStep };
  } else {
    return p; // réussi du premier coup : pas de révision nécessaire
  }
  return { ...p, review };
}

/** Ids des exercices « à revoir » aujourd'hui */
export function dueReviews(p: Progress): string[] {
  const today = todayKey();
  return Object.entries(p.review)
    .filter(([, r]) => r.due <= today)
    .map(([id]) => id);
}

export function recordExercise(exId: string, correct: boolean, xpGain: number): Progress {
  let p = load();
  const prev = p.exercises[exId];
  const alreadyCorrect = prev?.correct === true;
  const gained = correct && !alreadyCorrect ? xpGain : 0;
  p = {
    ...p,
    exercises: {
      ...p.exercises,
      [exId]: {
        correct: alreadyCorrect || correct,
        attempts: (prev?.attempts ?? 0) + 1,
        date: new Date().toISOString(),
      },
    },
    // pas de re-farm : un exercice déjà réussi ne redonne pas d'XP
    xp: p.xp + gained,
  };
  p = updateReview(p, exId, correct);
  p = bumpActivity(p, { ex: 1, ok: correct ? 1 : 0, xp: gained });
  p = touchStreak(p);
  save(p);
  logActivity(
    "exercice",
    `Exercice ${exId} : ${correct ? "réussi" : "raté"}${gained ? ` (+${gained} XP)` : ""}`
  );
  return p;
}

export function recordDaily(score: number, total: number): Progress {
  let p = load();
  const today = todayKey();
  const prev = p.dailies[today];
  const best = prev ? Math.max(prev.score, score) : score;
  const firstTime = !prev;
  p = {
    ...p,
    dailies: { ...p.dailies, [today]: { score: best, total } },
    xp: p.xp + (firstTime ? score * 5 : 0),
  };
  p = bumpActivity(p, { daily: true, xp: firstTime ? score * 5 : 0 });
  p = touchStreak(p);
  save(p);
  logActivity("defi", `Défi du jour terminé : ${score}/${total}`);
  return p;
}

export function grantBadges(p: Progress, ids: string[]): Progress {
  const missing = ids.filter((id) => !p.badges.includes(id));
  if (missing.length === 0) return p;
  const next = { ...p, badges: [...p.badges, ...missing] };
  save(next);
  return next;
}

/** Hook réactif : se met à jour à chaque mutation (même depuis un autre composant). */
export function useProgress(): Progress {
  const [p, setP] = useState<Progress>(EMPTY);
  const refresh = useCallback(() => setP(load()), []);
  useEffect(() => {
    refresh();
    window.addEventListener("laureat-progress", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("laureat-progress", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);
  return p;
}
