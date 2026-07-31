/**
 * Journal des versions (semantic versioning).
 * RÈGLE DE RELEASE : chaque push qui modifie l'app ajoute une entrée ici —
 * major = rupture, minor = fonctionnalité ou contenu, patch = correction.
 */

export interface ChangelogEntry {
  version: string;
  /** YYYY-MM-DD */
  date: string;
  kind: "major" | "minor" | "patch";
  changes: string[];
}

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: "0.1.0",
    date: "2026-07-31",
    kind: "minor",
    changes: [
      "Première version : moteur de révision (cours en étapes, QCM, corrigés détaillés)",
      "Tronc commun catégorie C : institutions, orthographe, calculs",
      "Épreuve blanche chronométrée, révision espacée, entraînement quotidien",
      "Journal d'activité et journal des versions dans les réglages",
    ],
  },
];

export const APP_VERSION = CHANGELOG[0].version;
