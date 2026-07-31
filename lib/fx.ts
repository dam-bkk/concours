"use client";

/**
 * Petits effets sensoriels : sons synthétisés (WebAudio, aucun asset)
 * et vibration quand le matériel le permet. Coupables via laureat.sound.
 */

const SOUND_KEY = "laureat.sound";

export function soundEnabled(): boolean {
  try {
    return window.localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setSoundEnabled(on: boolean) {
  try {
    window.localStorage.setItem(SOUND_KEY, on ? "on" : "off");
    window.dispatchEvent(new CustomEvent("laureat-sound"));
  } catch {
    // stockage indisponible
  }
}

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(
  ac: AudioContext,
  freq: number,
  start: number,
  duration: number,
  type: OscillatorType,
  gainPeak: number
) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, ac.currentTime + start);
  gain.gain.linearRampToValueAtTime(gainPeak, ac.currentTime + start + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(ac.currentTime + start);
  osc.stop(ac.currentTime + start + duration + 0.05);
}

/** Petit arpège joyeux */
export function playSuccess() {
  if (!soundEnabled()) return;
  const ac = audio();
  if (!ac) return;
  tone(ac, 660, 0, 0.12, "triangle", 0.18);
  tone(ac, 880, 0.09, 0.16, "triangle", 0.18);
  tone(ac, 1320, 0.18, 0.22, "triangle", 0.14);
  vibrate([30]);
}

/** Toc grave, sans être punitif */
export function playError() {
  if (!soundEnabled()) return;
  const ac = audio();
  if (!ac) return;
  tone(ac, 220, 0, 0.12, "sine", 0.2);
  tone(ac, 165, 0.1, 0.18, "sine", 0.16);
  vibrate([60, 40, 60]);
}

/** Fanfare de fin de série */
export function playFanfare() {
  if (!soundEnabled()) return;
  const ac = audio();
  if (!ac) return;
  [523, 659, 784, 1047].forEach((f, i) => tone(ac, f, i * 0.11, 0.25, "triangle", 0.16));
  vibrate([40, 30, 40, 30, 80]);
}

function vibrate(pattern: number[]) {
  try {
    navigator.vibrate?.(pattern);
  } catch {
    // non supporté (iOS Safari) : l'app native prendra le relais
  }
}
