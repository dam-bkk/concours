import type { Grade, Subject } from "@/lib/types";

/**
 * Métadonnées d'affichage des concours : grandes cartes saturées en dégradé,
 * titres blancs (grands = ≥3:1 vérifié), petits textes blancs UNIQUEMENT sur
 * la variante deep (AA 4,5:1 vérifié par script — voir scripts/contrast).
 */
export interface SubjectMeta {
  id: Subject;
  label: string;
  tagline: string;
  /** Icône lucide-react */
  icon: string;
  /** Dégradé de la carte (from → to) */
  from: string;
  to: string;
  /** Variante sombre : fond des chips à petit texte blanc (AA) */
  deep: string;
  /** Fond très clair (pages internes, anneaux) */
  tint: string;
  /** Parcours où le concours existe (absent = tous) */
  grades?: Grade[];
  /** Concours en préparation (badge) */
  optional?: boolean;
  /** Concours pas encore ouvert dans l'app (badge « Bientôt ») */
  soon?: boolean;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: "gardien-paix",
    label: "Gardien de la paix",
    tagline: "Police nationale — cat. B : QCM, culture générale, tests",
    icon: "Shield",
    from: "#2B4CA8",
    to: "#1E3A8A",
    deep: "#172D6B",
    tint: "#E7ECFB",
  },
  {
    id: "adjoint-admin",
    label: "Adjoint administratif",
    tagline: "Fonction publique d'État — cat. C : français, tableaux, cas pratiques",
    icon: "ClipboardList",
    from: "#1F7D42",
    to: "#166534",
    deep: "#114F29",
    tint: "#E2F4E8",
  },
  {
    id: "atsem",
    label: "ATSEM",
    tagline: "Territorial — cat. C : QCM métier, petite enfance, hygiène",
    icon: "School",
    from: "#7C3AED",
    to: "#6D28D9",
    deep: "#5B21B6",
    tint: "#F0E8FD",
  },
  {
    id: "crpe",
    label: "CRPE",
    tagline: "Professeur des écoles : français, maths, épreuves d'admission",
    icon: "GraduationCap",
    from: "#CC2B2B",
    to: "#B91C1C",
    deep: "#8F1616",
    tint: "#FBE7E7",
    soon: true,
  },
  {
    id: "toeic",
    label: "TOEIC",
    tagline: "Anglais professionnel : listening & reading, score 990",
    icon: "Languages",
    from: "#D9541B",
    to: "#C2410C",
    deep: "#8F3009",
    tint: "#FBEADF",
    soon: true,
  },
];

export function getSubjectMeta(id: Subject): SubjectMeta {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}

export const GRADES: Grade[] = ["concours"];

export const GRADE_LABELS: Record<Grade, string> = {
  concours: "Concours",
};

/** Niveaux dont le contenu est déjà publié */
export const GRADES_READY: Grade[] = ["concours"];
