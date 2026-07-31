import type { Progress } from "@/lib/progress";
import { CHAPTERS } from "@/lib/chapters";

export interface BadgeDef {
  id: string;
  label: string;
  description: string;
  /** Nom d'icône lucide-react */
  icon: string;
  earned: (p: Progress) => boolean;
}

function correctCount(p: Progress): number {
  return Object.values(p.exercises).filter((e) => e.correct).length;
}

export const BADGES: BadgeDef[] = [
  {
    id: "premier-pas",
    label: "Premier pas",
    description: "Réussir ton tout premier exercice",
    icon: "Footprints",
    earned: (p) => correctCount(p) >= 1,
  },
  {
    id: "dix-sur-dix",
    label: "Machine à exos",
    description: "Réussir 10 exercices",
    icon: "Zap",
    earned: (p) => correctCount(p) >= 10,
  },
  {
    id: "cinquante",
    label: "Inarrêtable",
    description: "Réussir 50 exercices",
    icon: "Rocket",
    earned: (p) => correctCount(p) >= 50,
  },
  {
    id: "centurion",
    label: "Centurion",
    description: "Réussir 100 exercices",
    icon: "Crown",
    earned: (p) => correctCount(p) >= 100,
  },
  {
    id: "premier-defi",
    label: "Défi relevé",
    description: "Terminer ton premier défi du jour",
    icon: "Swords",
    earned: (p) => Object.keys(p.dailies).length >= 1,
  },
  {
    id: "sans-faute",
    label: "Sans faute",
    description: "Faire un défi du jour parfait",
    icon: "Medal",
    earned: (p) => Object.values(p.dailies).some((d) => d.score === d.total),
  },
  {
    id: "serie-3",
    label: "Bien lancée",
    description: "3 jours d'affilée",
    icon: "Flame",
    earned: (p) => p.streak.best >= 3,
  },
  {
    id: "serie-7",
    label: "Une semaine !",
    description: "7 jours d'affilée",
    icon: "CalendarCheck",
    earned: (p) => p.streak.best >= 7,
  },
  {
    id: "serie-30",
    label: "Légende",
    description: "30 jours d'affilée",
    icon: "Trophy",
    earned: (p) => p.streak.best >= 30,
  },
  {
    id: "xp-100",
    label: "100 XP",
    description: "Atteindre 100 points d'expérience",
    icon: "Star",
    earned: (p) => p.xp >= 100,
  },
  {
    id: "xp-500",
    label: "500 XP",
    description: "Atteindre 500 points d'expérience",
    icon: "Sparkles",
    earned: (p) => p.xp >= 500,
  },
  {
    id: "chapitre-fini",
    label: "Chapitre bouclé",
    description: "Réussir tous les exercices d'un chapitre",
    icon: "BookCheck",
    earned: (p) =>
      CHAPTERS.some((c) => c.exercises.every((e) => p.exercises[e.id]?.correct)),
  },
  {
    id: "explorer",
    label: "Exploratrice",
    description: "Réussir un exercice dans chacun des 4 domaines",
    icon: "Map",
    earned: (p) => {
      const domains = new Set(
        CHAPTERS.flatMap((c) =>
          c.exercises.some((e) => p.exercises[e.id]?.correct) ? [c.domain] : []
        )
      );
      return domains.size === 4;
    },
  },
  {
    id: "annee-complete",
    label: "Reine des maths",
    description: "Réussir tous les exercices de l'année",
    icon: "GraduationCap",
    earned: (p) =>
      CHAPTERS.every((c) => c.exercises.every((e) => p.exercises[e.id]?.correct)),
  },
];
