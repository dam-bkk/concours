#!/usr/bin/env node
/**
 * Vérifie que la palette du catalogue de concours reste AAA (≥ 7:1).
 *
 *   node scripts/check-contrast.mjs
 *
 * Couples testés pour chaque concours de lib/subjects.ts :
 *   blanc  / from   → titre et badges posés sur l'accent
 *   blanc  / to     → fin du dégradé (barre de progression, bandeaux)
 *   blanc  / deep   → puces « x/y réussis » et badges sombres
 *   deep   / tint   → icône sur sa pastille très claire
 *   ink    / tint   → texte principal sur pastille
 * Sortie code 1 si un couple échoue (utilisable en CI).
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AAA = 7;

const WHITE = "#FFFFFF";
const INK = "#0F172A"; // --color-ink
const CARD = "#FFFFFF"; // --color-card

function parse(hex) {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? [...h].map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
}

function luminance(hex) {
  const [r, g, b] = parse(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Extraction sans TS : on lit les littéraux de lib/subjects.ts. */
function readSubjects() {
  const src = readFileSync(join(ROOT, "lib/subjects.ts"), "utf8");
  const body = src.slice(src.indexOf("export const SUBJECTS"));
  const out = [];
  const re =
    /id:\s*"([^"]+)"[\s\S]*?from:\s*"(#[0-9A-Fa-f]{3,8})"[\s\S]*?to:\s*"(#[0-9A-Fa-f]{3,8})"[\s\S]*?deep:\s*"(#[0-9A-Fa-f]{3,8})"[\s\S]*?tint:\s*"(#[0-9A-Fa-f]{3,8})"/g;
  let m;
  while ((m = re.exec(body))) {
    out.push({ id: m[1], from: m[2], to: m[3], deep: m[4], tint: m[5] });
  }
  return out;
}

const subjects = readSubjects();
if (subjects.length === 0) {
  console.error("Aucun concours trouvé dans lib/subjects.ts — le format a changé ?");
  process.exit(1);
}

const failures = [];
let checks = 0;

for (const s of subjects) {
  const pairs = [
    ["blanc / from", WHITE, s.from],
    ["blanc / to", WHITE, s.to],
    ["blanc / deep", WHITE, s.deep],
    ["deep / tint", s.deep, s.tint],
    ["ink / tint", INK, s.tint],
    ["ink / card", INK, CARD],
  ];
  const line = [];
  for (const [label, fg, bg] of pairs) {
    const r = ratio(fg, bg);
    checks += 1;
    line.push(`${label} ${r.toFixed(2)}`);
    if (r < AAA) failures.push(`${s.id} — ${label} = ${r.toFixed(2)}:1 (fg ${fg} / bg ${bg})`);
  }
  console.log(`${s.id.padEnd(30)} ${line.join("  ")}`);
}

console.log(`\n${subjects.length} concours, ${checks} couples testés (seuil AAA ${AAA}:1).`);

if (failures.length > 0) {
  console.error(`\n${failures.length} échec(s) :`);
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
console.log("Tous les couples passent AAA.");
