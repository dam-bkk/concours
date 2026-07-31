// Génère lib/chapters.ts à partir des fichiers présents dans data/chapters/**
// Usage : node scripts/gen-registry.mjs
import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA = join(ROOT, "data/chapters");

function collect(dir) {
  const out = [];
  for (const entry of readdirSync(dir).sort()) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...collect(p));
    else if (entry.endsWith(".ts")) out.push(p);
  }
  return out;
}

const files = collect(DATA);
const imports = [];
const names = [];
files.forEach((f, i) => {
  const name = `c${String(i).padStart(3, "0")}`;
  const spec = "@/data/chapters/" + relative(DATA, f).replace(/\.ts$/, "");
  imports.push(`import { chapter as ${name} } from "${spec}";`);
  names.push(name);
});

const src = `// GÉNÉRÉ par scripts/gen-registry.mjs — ne pas éditer à la main.
import type { Chapter, Grade, Subject } from "@/lib/types";
${imports.join("\n")}

const RAW: Chapter[] = [${names.length ? "\n  " + names.join(", ") + ",\n" : ""}];

/** Tous les chapitres, matière/niveau normalisés (défaut maths 6e). */
export const CHAPTERS: Chapter[] = RAW.map((c) => ({
  subject: "gardien-paix" as Subject,
  grade: "concours" as Grade,
  ...c,
})).sort((a, b) => a.num - b.num);

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug);
}

export function chaptersFor(subject: Subject, grade: Grade): Chapter[] {
  return CHAPTERS.filter((c) => c.subject === subject && c.grade === grade);
}
`;

writeFileSync(join(ROOT, "lib/chapters.ts"), src);
console.log(`${files.length} chapitres → lib/chapters.ts`);
