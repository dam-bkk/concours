import type { Grade, Subject } from "@/lib/types";

/**
 * Grandes familles du catalogue. L'ordre du tableau FAMILIES est celui de
 * l'affichage sur la page d'accueil.
 */
export type Family =
  | "securite"
  | "etat"
  | "territoriale"
  | "hospitaliere"
  | "education"
  | "tests";

export const FAMILIES: Family[] = [
  "securite",
  "etat",
  "territoriale",
  "hospitaliere",
  "education",
  "tests",
];

export const FAMILY_LABELS: Record<Family, string> = {
  securite: "Sécurité et justice",
  etat: "Administration d'État",
  territoriale: "Fonction publique territoriale",
  hospitaliere: "Fonction publique hospitalière",
  education: "Éducation nationale",
  tests: "Tests de recrutement",
};

export const FAMILY_TAGLINES: Record<Family, string> = {
  securite: "Police, gendarmerie, pénitentiaire, justice, douanes, secours",
  etat: "Ministères, préfectures, finances publiques — catégories C, B et A",
  territoriale: "Communes, départements, régions et intercommunalités",
  hospitaliere: "Hôpitaux publics et EHPAD — soins et administration",
  education: "Enseignement du premier et du second degré, vie scolaire",
  tests: "Grandes entreprises et tests psychotechniques d'entrée",
};

/**
 * Métadonnées d'affichage des concours.
 * Contraste vérifié par `node scripts/check-contrast.mjs` (AAA, ≥ 7:1) :
 *  - blanc sur `from`, `to` et `deep` ;
 *  - `deep` et `ink` sur `tint`.
 * Toute couleur ajoutée ici doit repasser le script.
 */
export interface SubjectMeta {
  id: Subject;
  label: string;
  tagline: string;
  /** Icône lucide-react (nom PascalCase existant dans la lib) */
  icon: string;
  /** Famille de concours (regroupement de la page d'accueil) */
  family: Family;
  /** Dégradé d'accent (from → to), texte blanc AAA */
  from: string;
  to: string;
  /** Variante la plus sombre : puces à petit texte blanc (AAA) */
  deep: string;
  /** Fond très clair : pastilles d'icône, anneaux, pages internes */
  tint: string;
  /** Parcours où le concours existe (absent = tous) */
  grades?: Grade[];
  /** Concours pas encore ouvert dans l'app (grisé + badge « bientôt ») */
  optional?: boolean;
}

export const SUBJECTS: SubjectMeta[] = [
  /* ------------------------------ Sécurité / Justice ----------------------------- */
  {
    id: "gardien-paix",
    label: "Gardien de la paix",
    tagline: "Police nationale, cat. B — QCM, culture générale, tests psy",
    icon: "Shield",
    family: "securite",
    from: "#2A4FB4",
    to: "#234195",
    deep: "#18337E",
    tint: "#EDF1FA",
  },
  {
    id: "officier-police",
    label: "Officier de police",
    tagline: "Police nationale, cat. A — droit pénal, note de synthèse",
    icon: "ShieldCheck",
    family: "securite",
    from: "#3846C6",
    to: "#2F3AA5",
    deep: "#212C8F",
    tint: "#EDEEFA",
    optional: true,
  },
  {
    id: "gendarmerie",
    label: "Sous-officier de gendarmerie",
    tagline: "Gendarmerie nationale — QCM connaissances, tests, entretien",
    icon: "Siren",
    family: "securite",
    from: "#22569A",
    to: "#1C4780",
    deep: "#13396A",
    tint: "#EDF3FA",
    optional: true,
  },
  {
    id: "surveillant-penitentiaire",
    label: "Surveillant pénitentiaire",
    tagline: "Administration pénitentiaire, cat. C — QCM, français, sport",
    icon: "KeyRound",
    family: "securite",
    from: "#355A76",
    to: "#2C4A62",
    deep: "#1F3B51",
    tint: "#EFF4F8",
    optional: true,
  },
  {
    id: "cpip",
    label: "CPIP",
    tagline: "Conseiller pénitentiaire d'insertion et de probation, cat. A",
    icon: "Handshake",
    family: "securite",
    from: "#5049AA",
    to: "#423C8D",
    deep: "#332E7C",
    tint: "#F0EFF8",
    optional: true,
  },
  {
    id: "greffier",
    label: "Greffier",
    tagline: "Ministère de la Justice, cat. B — procédure civile et pénale",
    icon: "Gavel",
    family: "securite",
    from: "#5941B8",
    to: "#4A3699",
    deep: "#3A2885",
    tint: "#F0EEF9",
    optional: true,
  },
  {
    id: "agent-douanes",
    label: "Agent des douanes",
    tagline: "Douane, cat. C — branches surveillance et opérations commerciales",
    icon: "PackageSearch",
    family: "securite",
    from: "#235C75",
    to: "#1D4D61",
    deep: "#143E50",
    tint: "#EDF6FA",
    optional: true,
  },
  {
    id: "controleur-douanes",
    label: "Contrôleur des douanes",
    tagline: "Douane, cat. B — QCM, cas pratiques, épreuve d'option",
    icon: "Container",
    family: "securite",
    from: "#205B82",
    to: "#1B4B6B",
    deep: "#123C58",
    tint: "#EDF5FA",
    optional: true,
  },
  {
    id: "sapeur-pompier",
    label: "Sapeur-pompier professionnel",
    tagline: "SDIS, cat. C — français, mathématiques, épreuves physiques",
    icon: "Flame",
    family: "securite",
    from: "#9C3125",
    to: "#82281F",
    deep: "#6B1D14",
    tint: "#FAEEED",
    optional: true,
  },

  /* ---------------------------- Administration d'État ---------------------------- */
  {
    id: "adjoint-admin",
    label: "Adjoint administratif",
    tagline: "État, cat. C — français, tableaux numériques, cas pratiques",
    icon: "ClipboardList",
    family: "etat",
    from: "#663FAA",
    to: "#55348D",
    deep: "#45277A",
    tint: "#F2EEF9",
  },
  {
    id: "secretaire-admin",
    label: "Secrétaire administratif",
    tagline: "État, cat. B — cas pratique et questions à réponse courte",
    icon: "FileText",
    family: "etat",
    from: "#6F3EA0",
    to: "#5C3384",
    deep: "#4C2672",
    tint: "#F4EEF9",
    optional: true,
  },
  {
    id: "attache-ira",
    label: "Attaché d'administration (IRA)",
    tagline: "État, cat. A — note de synthèse, QRC, grand oral",
    icon: "Landmark",
    family: "etat",
    from: "#773A9C",
    to: "#633082",
    deep: "#51236E",
    tint: "#F5EEF9",
    optional: true,
  },
  {
    id: "agent-finances",
    label: "Agent des finances publiques",
    tagline: "DGFiP, cat. C — français, calcul, culture administrative",
    icon: "Coins",
    family: "etat",
    from: "#7C3993",
    to: "#672F7A",
    deep: "#552266",
    tint: "#F6EEF9",
    optional: true,
  },
  {
    id: "controleur-finances",
    label: "Contrôleur des finances publiques",
    tagline: "DGFiP, cat. B — QCM, résolution de cas, option comptabilité",
    icon: "Calculator",
    family: "etat",
    from: "#80398B",
    to: "#6A2F73",
    deep: "#582260",
    tint: "#F7EFF8",
    optional: true,
  },
  {
    id: "inspecteur-finances",
    label: "Inspecteur des finances publiques",
    tagline: "DGFiP, cat. A — composition, droit, économie, gestion",
    icon: "Banknote",
    family: "etat",
    from: "#863486",
    to: "#702C70",
    deep: "#5D1F5D",
    tint: "#F9EEF9",
    optional: true,
  },

  /* ------------------------- Fonction publique territoriale ---------------------- */
  {
    id: "adjoint-admin-territorial",
    label: "Adjoint administratif territorial",
    tagline: "Territoriale, cat. C — français, bureautique, cas pratiques",
    icon: "Building2",
    family: "territoriale",
    from: "#24623B",
    to: "#1E5131",
    deep: "#154125",
    tint: "#EEF9F2",
    optional: true,
  },
  {
    id: "redacteur-territorial",
    label: "Rédacteur territorial",
    tagline: "Territoriale, cat. B — note administrative, culture territoriale",
    icon: "NotebookPen",
    family: "territoriale",
    from: "#256045",
    to: "#1F5039",
    deep: "#15402C",
    tint: "#EEF9F4",
    optional: true,
  },
  {
    id: "attache-territorial",
    label: "Attaché territorial",
    tagline: "Territoriale, cat. A — note de synthèse, spécialité, oral",
    icon: "Briefcase",
    family: "territoriale",
    from: "#266132",
    to: "#1F5129",
    deep: "#16411E",
    tint: "#EEF9F0",
    optional: true,
  },
  {
    id: "atsem",
    label: "ATSEM",
    tagline: "Territoriale, cat. C — QCM métier, petite enfance, hygiène",
    icon: "School",
    family: "territoriale",
    from: "#2C612A",
    to: "#245022",
    deep: "#194118",
    tint: "#EFF8EF",
  },
  {
    id: "agent-maitrise",
    label: "Agent de maîtrise",
    tagline: "Territoriale, cat. C+ — encadrement d'équipe et spécialité technique",
    icon: "HardHat",
    family: "territoriale",
    from: "#3B5F29",
    to: "#314F22",
    deep: "#253F17",
    tint: "#F2F8EF",
    optional: true,
  },
  {
    id: "technicien-territorial",
    label: "Technicien territorial",
    tagline: "Territoriale, cat. B — spécialité technique, rapport avec solutions",
    icon: "Wrench",
    family: "territoriale",
    from: "#405F25",
    to: "#354E1E",
    deep: "#293F15",
    tint: "#F3F9EE",
    optional: true,
  },

  /* ------------------------- Fonction publique hospitalière ---------------------- */
  {
    id: "aide-soignant",
    label: "Aide-soignant",
    tagline: "Entrée en IFAS — dossier, oral de motivation, gestes de soin",
    icon: "HeartPulse",
    family: "hospitaliere",
    from: "#20605B",
    to: "#1A4F4C",
    deep: "#12403D",
    tint: "#EEF9F8",
    optional: true,
  },
  {
    id: "infirmier",
    label: "Infirmier (IFSI)",
    tagline: "Entrée en IFSI — culture sanitaire et sociale, dossier, oral",
    icon: "Stethoscope",
    family: "hospitaliere",
    from: "#205E65",
    to: "#1B4F54",
    deep: "#123F43",
    tint: "#EEF8F9",
    optional: true,
  },
  {
    id: "adjoint-admin-hospitalier",
    label: "Adjoint administratif hospitalier",
    tagline: "Hospitalière, cat. C — français, accueil, gestion de dossiers",
    icon: "ClipboardCheck",
    family: "hospitaliere",
    from: "#255F54",
    to: "#1F4F45",
    deep: "#154038",
    tint: "#EEF9F7",
    optional: true,
  },

  /* ---------------------------------- Éducation ---------------------------------- */
  {
    id: "crpe",
    label: "CRPE",
    tagline: "Professeur des écoles — français, maths, leçon et entretien",
    icon: "GraduationCap",
    family: "education",
    from: "#7B4A1F",
    to: "#673E1A",
    deep: "#543011",
    tint: "#FAF3ED",
    optional: true,
  },
  {
    id: "capes",
    label: "CAPES",
    tagline: "Professeur du second degré — écrits disciplinaires et oraux",
    icon: "BookOpen",
    family: "education",
    from: "#70501A",
    to: "#5D4316",
    deep: "#4B350E",
    tint: "#FAF5ED",
    optional: true,
  },
  {
    id: "cpe",
    label: "CPE",
    tagline: "Conseiller principal d'éducation — vie scolaire, étude de cas",
    icon: "Users",
    family: "education",
    from: "#864424",
    to: "#6F391D",
    deep: "#5B2C14",
    tint: "#FAF1ED",
    optional: true,
  },

  /* ---------------------------- Tests de recrutement ----------------------------- */
  {
    id: "tests-logique",
    label: "Tests de logique et psychotechniques",
    tagline: "Séries, dominos, cartes, attention — socle de tous les concours",
    icon: "Puzzle",
    family: "tests",
    from: "#8B3671",
    to: "#742D5E",
    deep: "#61204D",
    tint: "#F9EEF6",
    optional: true,
  },
  {
    id: "la-poste",
    label: "La Poste",
    tagline: "Facteur et guichet — logique, calcul, mise en situation",
    icon: "Mail",
    family: "tests",
    from: "#8F3565",
    to: "#772C54",
    deep: "#642044",
    tint: "#F9EEF4",
    optional: true,
  },
  {
    id: "sncf",
    label: "SNCF",
    tagline: "Tests d'embauche — logique, attention, sécurité ferroviaire",
    icon: "TrainFront",
    family: "tests",
    from: "#933457",
    to: "#7B2B48",
    deep: "#661E39",
    tint: "#F9EEF2",
    optional: true,
  },
  {
    id: "ratp",
    label: "RATP",
    tagline: "Tests d'embauche — psychotechniques, français, entretien",
    icon: "TramFront",
    family: "tests",
    from: "#87377C",
    to: "#702E67",
    deep: "#5D2155",
    tint: "#F8EFF7",
    optional: true,
  },
];

export function getSubjectMeta(id: Subject): SubjectMeta {
  return SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
}

/** Concours d'une famille, dans l'ordre de déclaration. */
export function subjectsOf(family: Family, list: SubjectMeta[] = SUBJECTS): SubjectMeta[] {
  return list.filter((s) => s.family === family);
}

/** Familles non vides + leurs concours, prêt à mapper dans une page. */
export function groupByFamily(
  list: SubjectMeta[] = SUBJECTS
): { family: Family; subjects: SubjectMeta[] }[] {
  return FAMILIES.map((family) => ({ family, subjects: subjectsOf(family, list) })).filter(
    (g) => g.subjects.length > 0
  );
}

export const GRADES: Grade[] = ["concours"];

export const GRADE_LABELS: Record<Grade, string> = {
  concours: "Concours",
};

/** Niveaux dont le contenu est déjà publié */
export const GRADES_READY: Grade[] = ["concours"];
