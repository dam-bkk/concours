# Admisio — Concours de la fonction publique

Webapp d'accompagnement scolaire pour la 6e (maths d'abord) : leçons, exercices
corrigés, défi du jour et suivi de progression. 100 % locale, aucune donnée ne
sort du navigateur (progression en localStorage).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000

## Contenu

- 15 chapitres couvrant le programme officiel de maths 6e (cycle 3, programme 2025
  — probabilités et somme des angles du triangle inclus)
- ~180 exercices sur 3 niveaux (QCM, saisie, vrai/faux) avec corrigés détaillés
- Défi du jour : 6 questions de calcul mental, déterministe par date
- XP, série de jours (streak), badges

## Qualité et releases

- `npm test` — tests unitaires (logique de correction, générateur du défi,
  intégrité des 129+ chapitres : ids uniques, index QCM valides, figures
  existantes, pas d'emoji). **`npm run build` échoue si un test échoue.**
- Chaque push qui change l'app ajoute une entrée versionnée (semver) dans
  `data/changelog.ts` — major = rupture, minor = fonctionnalité/contenu,
  patch = correction. Visible dans l'app : Réglages → Versions.
- Journal d'activité local (qui/quoi/quand/IP/catégorie) : Réglages → Journal.

## Structure

- `data/chapters/*.ts` — le contenu pédagogique (type `Chapter` dans `lib/types.ts`)
- `components/figures.tsx` — catalogue de figures SVG pour les leçons
- `lib/progress.ts` — progression localStorage
- `lib/daily.ts` — générateur du défi du jour
