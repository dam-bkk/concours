import { notFound } from "next/navigation";
import { SUBJECTS } from "@/lib/subjects";
import type { Subject } from "@/lib/types";
import { SubjectView } from "@/components/subject-view";

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.id }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!SUBJECTS.some((s) => s.id === subject)) notFound();
  return <SubjectView subject={subject as Subject} />;
}
