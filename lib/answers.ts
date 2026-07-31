/**
 * Normalisation et vérification des réponses saisies.
 * Extraits dans lib/ pour être testables unitairement.
 */

/** Normalisation tolérante : espaces, casse, apostrophes, ponctuation finale, point décimal */
export function norm(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replaceAll(" ", "")
    .replaceAll(" ", "")
    .replaceAll("’", "'")
    // ponctuation finale ignorée (réponses-phrases : « Laura chante. »)
    .replace(/[.!?]+$/, "")
    // point décimal → virgule française, uniquement entre deux chiffres
    .replace(/(\d)\.(\d)/g, "$1,$2");
}

/** Une saisie est-elle correcte pour la réponse attendue + variantes acceptées ? */
export function checkAnswer(
  answer: string | number | boolean,
  accept: string[] | undefined,
  raw: string
): boolean {
  const candidates = [String(answer), ...(accept ?? [])];
  return candidates.some((c) => norm(c) === norm(raw));
}
