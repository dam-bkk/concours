import { notFound } from "next/navigation";
import { CHAPTERS, getChapter } from "@/lib/chapters";
import { ChapterView } from "@/components/chapter-view";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  return <ChapterView chapter={chapter} />;
}
