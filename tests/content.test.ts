import { describe, expect, it } from "vitest";
import { CHAPTERS } from "@/lib/chapters";
import { getAllFigures } from "@/components/figures";
import { SUBJECTS, GRADES_READY } from "@/lib/subjects";

const FIGURES = getAllFigures();

describe("intégrité du contenu", () => {
  it("chaque chapitre a au moins 12 exercices et 3 sections de leçon", () => {
    for (const ch of CHAPTERS) {
      expect(ch.exercises.length, ch.slug).toBeGreaterThanOrEqual(12);
      expect(ch.lesson.length, ch.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("les slugs et les ids d'exercices sont uniques globalement", () => {
    const slugs = new Set<string>();
    const ids = new Set<string>();
    for (const ch of CHAPTERS) {
      expect(slugs.has(ch.slug), `slug dupliqué : ${ch.slug}`).toBe(false);
      slugs.add(ch.slug);
      for (const e of ch.exercises) {
        expect(ids.has(e.id), `id dupliqué : ${e.id} (${ch.slug})`).toBe(false);
        ids.add(e.id);
      }
    }
  });

  it("chaque exercice est bien formé selon son type", () => {
    for (const ch of CHAPTERS) {
      for (const e of ch.exercises) {
        const where = `${ch.slug}/${e.id}`;
        expect(e.question.length, where).toBeGreaterThan(0);
        expect(e.explanation.length, where).toBeGreaterThan(0);
        expect([1, 2, 3], where).toContain(e.level);
        if (e.type === "qcm") {
          expect(Array.isArray(e.choices), where).toBe(true);
          expect(e.choices!.length, where).toBeGreaterThanOrEqual(2);
          expect(typeof e.answer, where).toBe("number");
          expect(e.answer as number, where).toBeGreaterThanOrEqual(0);
          expect(e.answer as number, where).toBeLessThan(e.choices!.length);
        } else if (e.type === "truefalse") {
          expect(typeof e.answer, where).toBe("boolean");
        } else {
          expect(typeof e.answer, where).toBe("string");
          expect((e.answer as string).length, where).toBeGreaterThan(0);
        }
      }
    }
  });

  it("chaque figure référencée existe dans le catalogue", () => {
    for (const ch of CHAPTERS) {
      for (const s of ch.lesson) {
        if (s.figure) {
          expect(FIGURES[s.figure], `figure inconnue : ${s.figure} (${ch.slug})`).toBeDefined();
        }
      }
    }
  });

  // TODO : réactiver quand les schémas seront dessinés (institutions, calculs…)
  it.skip("chaque chapitre d'un niveau ACTIVÉ a au moins une illustration", () => {
    // Les niveaux en préparation (hors GRADES_READY) peuvent ne pas être illustrés,
    // mais un niveau ne peut pas être activé sans illustrations complètes.
    for (const ch of CHAPTERS.filter((c) => GRADES_READY.includes(c.grade ?? "concours"))) {
      expect(
        ch.lesson.some((s) => s.figure),
        `aucune figure dans ${ch.slug}`
      ).toBe(true);
    }
  });

  it("les vidéos ont des ids YouTube plausibles", () => {
    for (const ch of CHAPTERS) {
      for (const v of ch.videos ?? []) {
        expect(v.youtubeId, `${ch.slug}: ${v.title}`).toMatch(/^[A-Za-z0-9_-]{11}$/);
        expect(v.title.length).toBeGreaterThan(0);
      }
    }
  });

  it("chaque matière/niveau visible a un sujet déclaré", () => {
    const known = new Set(SUBJECTS.map((s) => s.id));
    for (const ch of CHAPTERS) {
      expect(known.has(ch.subject ?? "gardien-paix"), `subject inconnu : ${ch.subject} (${ch.slug})`).toBe(true);
    }
  });

  it("aucun emoji dans le contenu pédagogique", () => {
    const emoji = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
    for (const ch of CHAPTERS) {
      for (const s of ch.lesson) {
        expect(emoji.test(s.paragraphs.join(" ")), `emoji dans ${ch.slug}`).toBe(false);
      }
    }
  });
});
