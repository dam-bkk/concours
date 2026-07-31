/**
 * Défi du jour : 6 questions de calcul mental et d'automatismes,
 * générées de façon déterministe à partir de la date (même défi toute la journée).
 */

export interface DailyQuestion {
  question: string;
  answer: string;
  accept?: string[];
  explanation: string;
}

/** PRNG déterministe (mulberry32) */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function int(r: () => number, min: number, max: number): number {
  return min + Math.floor(r() * (max - min + 1));
}

function pick<T>(r: () => number, arr: T[]): T {
  return arr[Math.floor(r() * arr.length)];
}

/** "3,5" pour 3.5 — écriture française */
function fr(n: number): string {
  return String(Math.round(n * 1000) / 1000).replace(".", ",");
}

type Generator = (r: () => number) => DailyQuestion;

const generators: Generator[] = [
  // Tables de multiplication
  (r) => {
    const a = int(r, 3, 9);
    const b = int(r, 4, 9);
    return {
      question: `${a} × ${b} = ?`,
      answer: String(a * b),
      explanation: `${a} × ${b} = ${a * b}. Les tables, c'est du réflexe : celle-ci il faut la connaître par cœur !`,
    };
  },
  // Complément à 100
  (r) => {
    const a = int(r, 11, 89);
    return {
      question: `Combien faut-il ajouter à ${a} pour obtenir 100 ?`,
      answer: String(100 - a),
      explanation: `${a} + ${100 - a} = 100. Astuce : complète d'abord à la dizaine supérieure, puis jusqu'à 100.`,
    };
  },
  // Addition de décimaux simples
  (r) => {
    const a = int(r, 1, 9) + int(r, 1, 9) / 10;
    const b = int(r, 1, 9) + int(r, 1, 9) / 10;
    return {
      question: `${fr(a)} + ${fr(b)} = ?`,
      answer: fr(Math.round((a + b) * 10) / 10),
      explanation: `On additionne les entiers ensemble et les dixièmes ensemble : ${fr(a)} + ${fr(b)} = ${fr(Math.round((a + b) * 10) / 10)}.`,
    };
  },
  // Multiplier par 10, 100, 1000
  (r) => {
    const a = int(r, 1, 99) + int(r, 1, 9) / 10;
    const m = pick(r, [10, 100, 1000]);
    return {
      question: `${fr(a)} × ${m} = ?`,
      answer: fr(a * m),
      explanation: `Multiplier par ${m}, c'est décaler la virgule de ${String(m).length - 1} rang${m > 10 ? "s" : ""} vers la droite : ${fr(a)} × ${m} = ${fr(a * m)}.`,
    };
  },
  // Moitié / double
  (r) => {
    const half = r() < 0.5;
    const a = half ? int(r, 6, 60) * 2 : int(r, 13, 60);
    return half
      ? {
          question: `Quelle est la moitié de ${a} ?`,
          answer: String(a / 2),
          explanation: `La moitié de ${a}, c'est ${a} ÷ 2 = ${a / 2}.`,
        }
      : {
          question: `Quel est le double de ${a} ?`,
          answer: String(a * 2),
          explanation: `Le double de ${a}, c'est ${a} × 2 = ${a * 2}.`,
        };
  },
  // Conversion de longueurs
  (r) => {
    const a = int(r, 2, 95);
    const kind = pick(r, ["m-cm", "km-m", "cm-mm"] as const);
    const table = { "m-cm": ["m", "cm", 100], "km-m": ["km", "m", 1000], "cm-mm": ["cm", "mm", 10] } as const;
    const [from, to, k] = table[kind];
    return {
      question: `${a} ${from} = ? ${to}`,
      answer: String(a * k),
      explanation: `1 ${from} = ${k} ${to}, donc ${a} ${from} = ${a} × ${k} = ${a * k} ${to}.`,
    };
  },
  // Fraction simple d'un nombre
  (r) => {
    const d = pick(r, [2, 3, 4, 5]);
    const a = int(r, 2, 12) * d;
    const labels: Record<number, string> = { 2: "la moitié", 3: "le tiers", 4: "le quart", 5: "le cinquième" };
    return {
      question: `Quel est ${labels[d]} de ${a} ?`,
      answer: String(a / d),
      explanation: `${labels[d][0].toUpperCase() + labels[d].slice(1)} de ${a}, c'est ${a} ÷ ${d} = ${a / d}.`,
    };
  },
  // Division exacte simple
  (r) => {
    const b = int(r, 3, 9);
    const q = int(r, 4, 12);
    return {
      question: `${b * q} ÷ ${b} = ?`,
      answer: String(q),
      explanation: `On cherche « ${b} × ? = ${b * q} ». Comme ${b} × ${q} = ${b * q}, alors ${b * q} ÷ ${b} = ${q}.`,
    };
  },
  // Comparaison de décimaux
  (r) => {
    const entier = int(r, 1, 9);
    const a = entier + int(r, 1, 8) / 10;
    const b = entier + int(r, 11, 89) / 100;
    const bigger = a > b ? fr(a) : fr(b);
    return {
      question: `Quel est le plus grand nombre : ${fr(a)} ou ${fr(b)} ?`,
      answer: bigger,
      explanation: `Même partie entière (${entier}), on compare donc les chiffres après la virgule rang par rang : ${fr(a > b ? a : b)} est le plus grand. Attention : ce n'est pas le nombre qui a le plus de chiffres qui gagne !`,
    };
  },
];

export const DAILY_SIZE = 6;

/** Le défi du jour pour une clé "YYYY-MM-DD" */
export function dailyChallenge(dateKey: string): DailyQuestion[] {
  const seed = Number(dateKey.replaceAll("-", ""));
  const r = rng(seed);
  // On mélange l'ordre des générateurs puis on en prend 6 (pas deux fois le même type)
  const order = generators
    .map((g, i) => ({ g, k: r(), i }))
    .sort((x, y) => x.k - y.k)
    .slice(0, DAILY_SIZE);
  return order.map(({ g }) => g(r));
}
