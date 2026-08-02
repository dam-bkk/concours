/**
 * Catalogue de figures pour les cours (schémas SVG dessinés main).
 * Référencées dans les données par LessonSection.figure.
 */

export const FIGURES: Record<string, { title: string; svg: React.ReactNode }> = {};

/** Catalogue complet — utilisé par les tests d'intégrité */
export function getAllFigures(): Record<string, { title: string; svg: React.ReactNode }> {
  return { ...FIGURES };
}

export function Figure({ id }: { id: string }) {
  const fig = FIGURES[id];
  if (!fig) return null;
  return (
    <figure className="my-4 rounded-xl border-2 border-line bg-card p-4">
      {fig.svg}
      <figcaption className="mt-2 text-center text-sm font-bold text-muted">
        {fig.title}
      </figcaption>
    </figure>
  );
}
