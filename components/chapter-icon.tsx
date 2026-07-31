"use client";

import { icons, Sparkles, type LucideProps } from "lucide-react";

/** Anciens noms lucide → noms actuels (renommages de la lib) */
const ALIASES: Record<string, string> = {
  PieChart: "ChartPie",
  BarChart3: "ChartColumn",
  MessageCircleQuestion: "MessageCircleQuestionMark",
  PlayCircle: "CirclePlay",
  History: "ClockArrowRight",
  Wand2: "WandSparkles",
  Waves: "WavesHorizontal",
  Globe2: "Earth",
};

/** Résout une icône lucide par son nom PascalCase, avec alias et repli sûr. */
export function ChapterIcon({ name, ...props }: { name: string } & LucideProps) {
  const resolved = ALIASES[name] ?? name;
  const Icon = (icons as Record<string, React.ComponentType<LucideProps>>)[resolved] ?? Sparkles;
  return <Icon {...props} />;
}
