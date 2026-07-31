"use client";

import { useMemo, useRef, useState } from "react";
import { Check, X, Lightbulb, ArrowRight, RotateCcw } from "lucide-react";
import { playSuccess, playError } from "@/lib/fx";
import { checkAnswer } from "@/lib/answers";

export interface PlayerItem {
  id: string;
  type: "qcm" | "input" | "truefalse";
  question: string;
  choices?: string[];
  answer: number | string | boolean;
  accept?: string[];
  explanation: string;
  hint?: string;
  /** XP gagnée si bonne réponse du premier coup */
  xp: number;
  /** Petit label affiché en haut à droite (ex: "Niveau 2") */
  tag?: string;
}

function checkInput(item: PlayerItem, raw: string): boolean {
  return checkAnswer(item.answer, item.accept, raw);
}

const CONFETTI_COLORS = ["#e8492f", "#ffd166", "#0f6b52", "#1d5fa8", "#5a3ec8"];

function Confetti() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="confetti absolute h-2.5 w-2.5 rounded-sm"
          style={{
            left: `${8 + i * 6.5}%`,
            background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
            animationDelay: `${(i % 5) * 0.06}s`,
          }}
        />
      ))}
    </div>
  );
}

type Status = "idle" | "correct" | "wrong";

export function Player({
  items,
  onItemResult,
  onFinish,
  renderEnd,
  exam = false,
}: {
  items: PlayerItem[];
  /** Appelé à CHAQUE validation (une seule par question) */
  onItemResult?: (item: PlayerItem, correct: boolean) => void;
  /** Appelé UNE fois quand la série est terminée (avant l'écran de fin) */
  onFinish?: (score: number, total: number) => void;
  /** Écran de fin, reçoit le score */
  renderEnd: (score: number, total: number, replay: () => void) => React.ReactNode;
  /**
   * Mode contrôle : pas d'indice, pas de corrigé ni de son entre les questions,
   * enchaînement automatique — les corrections se découvrent à la fin.
   */
  exam?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [picked, setPicked] = useState<number | boolean | null>(null);
  const [typed, setTyped] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const item = items[idx];
  const progress = useMemo(() => (done ? 1 : idx / items.length), [idx, items.length, done]);

  function validate(correct: boolean) {
    onItemResult?.(item, correct);
    if (correct) setScore((s) => s + 1);
    if (exam) {
      // enchaîne sans feedback : l'élève est en conditions de contrôle
      const newScore = score + (correct ? 1 : 0);
      if (idx + 1 >= items.length) {
        onFinish?.(newScore, items.length);
        setDone(true);
      } else {
        setIdx(idx + 1);
        setPicked(null);
        setTyped("");
      }
      return;
    }
    setStatus(correct ? "correct" : "wrong");
    if (correct) playSuccess();
    else playError();
  }

  function next() {
    if (idx + 1 >= items.length) {
      onFinish?.(score, items.length);
      setDone(true);
      return;
    }
    setIdx(idx + 1);
    setStatus("idle");
    setPicked(null);
    setTyped("");
    setShowHint(false);
  }

  function replay() {
    setIdx(0);
    setStatus("idle");
    setPicked(null);
    setTyped("");
    setShowHint(false);
    setScore(0);
    setDone(false);
  }

  if (done) return <>{renderEnd(score, items.length, replay)}</>;

  const answered = status !== "idle";

  return (
    <div>
      {/* barre de progression */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-3 flex-1 overflow-hidden rounded-full border-2 border-ink bg-card">
          <div
            className="h-full rounded-full bg-sun transition-all duration-300"
            style={{ width: `${Math.max(4, progress * 100)}%` }}
          />
        </div>
        <span className="text-sm font-extrabold text-muted">
          {idx + 1}/{items.length}
        </span>
      </div>

      <div ref={cardRef} className={`card-pop relative overflow-hidden p-5 md:p-7 ${status === "wrong" ? "shake" : ""}`}>
        {status === "correct" && <Confetti />}

        <div className="mb-3 flex items-start justify-between gap-3">
          <p className="text-lg font-bold leading-snug md:text-xl">{item.question}</p>
          {item.tag && (
            <span className="shrink-0 rounded-full bg-donnees-tint px-2.5 py-1 text-xs font-extrabold text-donnees-strong">
              {item.tag}
            </span>
          )}
        </div>

        {/* Réponses */}
        {item.type === "qcm" && item.choices && (
          <div className="grid gap-2.5 md:grid-cols-2">
            {item.choices.map((choice, i) => {
              const isAnswer = i === item.answer;
              const isPicked = picked === i;
              let cls = "bg-card hover:bg-zest-soft";
              if (answered && isAnswer) cls = "bg-ok-tint text-ok-strong";
              else if (answered && isPicked) cls = "bg-ko-tint text-ko-strong";
              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => {
                    setPicked(i);
                    validate(i === item.answer);
                  }}
                  className={`btn-pop px-4 py-3 text-left font-bold disabled:cursor-default ${cls}`}
                >
                  {choice}
                </button>
              );
            })}
          </div>
        )}

        {item.type === "truefalse" && (
          <div className="grid grid-cols-2 gap-2.5">
            {[true, false].map((v) => {
              const isAnswer = v === item.answer;
              const isPicked = picked === v;
              let cls = "bg-card hover:bg-zest-soft";
              if (answered && isAnswer) cls = "bg-ok-tint text-ok-strong";
              else if (answered && isPicked) cls = "bg-ko-tint text-ko-strong";
              return (
                <button
                  key={String(v)}
                  disabled={answered}
                  onClick={() => {
                    setPicked(v);
                    validate(v === item.answer);
                  }}
                  className={`btn-pop px-4 py-3 text-center font-extrabold disabled:cursor-default ${cls}`}
                >
                  {v ? "Vrai" : "Faux"}
                </button>
              );
            })}
          </div>
        )}

        {item.type === "input" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!answered && typed.trim() !== "") validate(checkInput(item, typed));
            }}
            className="flex flex-col gap-2.5 sm:flex-row"
          >
            <input
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              disabled={answered}
              autoFocus
              inputMode="text"
              placeholder="Ta réponse…"
              className={`btn-pop flex-1 px-4 py-3 font-bold outline-none placeholder:font-semibold placeholder:text-muted ${
                answered
                  ? status === "correct"
                    ? "bg-ok-tint text-ok-strong"
                    : "bg-ko-tint text-ko-strong"
                  : "bg-card"
              }`}
            />
            {!answered && (
              <button type="submit" className="btn-pop bg-ink px-6 py-3 font-extrabold text-white">
                Valider
              </button>
            )}
          </form>
        )}

        {/* Indice */}
        {!answered && !exam && item.hint && (
          <div className="mt-4">
            {showHint ? (
              <p className="flex items-start gap-2 rounded-2xl bg-sun-tint px-4 py-3 text-sm font-bold text-sun-strong rise">
                <Lightbulb size={18} className="mt-0.5 shrink-0" />
                {item.hint}
              </p>
            ) : (
              <button
                onClick={() => setShowHint(true)}
                className="flex items-center gap-1.5 text-sm font-extrabold text-muted underline decoration-2 underline-offset-4 hover:text-ink"
              >
                <Lightbulb size={16} />
                Un indice ?
              </button>
            )}
          </div>
        )}

        {/* Feedback + corrigé */}
        {answered && (
          <div className="mt-5 rise">
            <p
              className={`flex items-center gap-2 font-display text-xl font-bold ${
                status === "correct" ? "text-ok-strong" : "text-ko-strong"
              }`}
            >
              {status === "correct" ? (
                <>
                  <Check size={22} strokeWidth={3} /> Bien joué !
                </>
              ) : (
                <>
                  <X size={22} strokeWidth={3} /> Pas tout à fait…
                </>
              )}
            </p>
            {item.type === "input" && status === "wrong" && (
              <p className="mt-1 font-bold">
                La bonne réponse était : <span className="text-ok-strong">{String(item.answer)}</span>
              </p>
            )}
            <div className="mt-3 rounded-2xl border-2 border-line bg-cream px-4 py-3">
              <p className="text-xs font-extrabold uppercase tracking-wide text-muted">Le corrigé</p>
              <p className="mt-1 text-[15px] font-semibold leading-relaxed">{item.explanation}</p>
            </div>
            <button
              onClick={next}
              className="btn-pop mt-4 flex items-center gap-2 bg-ink px-6 py-3 font-extrabold text-white"
            >
              {idx + 1 >= items.length ? "Voir mon score" : "Question suivante"}
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ReplayButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button onClick={onClick} className="btn-pop flex items-center gap-2 bg-card px-6 py-3 font-extrabold">
      <RotateCcw size={18} />
      {label}
    </button>
  );
}
