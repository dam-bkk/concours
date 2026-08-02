import { notFound } from "next/navigation";
import { CHAPTERS, getChapter } from "@/lib/chapters";
import { DOMAIN_LABELS } from "@/lib/types";
import { getSubjectMeta } from "@/lib/subjects";
import { FicheActions } from "@/components/fiche-actions";
import { AdmisioLogo } from "@/components/logo";

export function generateStaticParams() {
  return CHAPTERS.map((c) => ({ slug: c.slug }));
}

export default async function FichePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  if (!chapter) notFound();
  const meta = getSubjectMeta(chapter.subject ?? "gardien-paix");

  const tips = chapter.lesson.filter((s) => s.tip);

  return (
    <div className="rise mx-auto max-w-3xl">
      <FicheActions backHref={`/chapitre/${chapter.slug}`} />

      {/* La fiche elle-même : une page A4 à l'impression */}
      <div id="fiche" className="card-pop overflow-hidden print:rounded-none print:shadow-none">
        <div
          className="flex items-center justify-between gap-3 px-6 py-4 text-white"
          style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})` }}
        >
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wide opacity-90">
              Fiche mémo · {meta.label} {chapter.grade ?? "concours"} ·{" "}
              {chapter.domainLabel ?? DOMAIN_LABELS[chapter.domain]}
            </p>
            <h1 className="font-display text-2xl font-extrabold leading-tight">{chapter.title}</h1>
          </div>
          <AdmisioLogo size={44} />
        </div>

        <div className="space-y-5 p-6">
          <section>
            <h2 className="font-display text-lg font-extrabold">Ce qu&apos;il faut savoir faire</h2>
            <ul className="mt-2 space-y-1">
              {chapter.objectives.map((o) => (
                <li key={o} className="flex gap-2 text-[15px] font-semibold">
                  <span className="font-extrabold" style={{ color: meta.to }}>✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-extrabold">L&apos;essentiel, point par point</h2>
            <div className="mt-2 space-y-3">
              {chapter.lesson.map((s, i) => (
                <div key={i} className="rounded-xl border-2 border-line px-4 py-2.5 print:break-inside-avoid">
                  <p className="font-extrabold">{i + 1}. {s.title}</p>
                  <p className="mt-0.5 text-[14px] font-semibold text-muted">{s.paragraphs[0]}</p>
                  {s.example && (
                    <p className="mt-1 text-[14px] font-semibold">
                      <span className="font-extrabold" style={{ color: meta.to }}>Exemple : </span>
                      {s.example[0]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {tips.length > 0 && (
            <section className="rounded-xl bg-sun-tint px-4 py-3 print:break-inside-avoid">
              <h2 className="font-display text-lg font-extrabold text-sun-strong">Les astuces à retenir</h2>
              <ul className="mt-1.5 space-y-1.5">
                {tips.map((s, i) => (
                  <li key={i} className="text-[14px] font-bold text-sun-strong">
                    • {s.tip}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-center text-xs font-bold text-muted print:mt-4">
            Admisio · 6e.damien.asia · À relire la veille de l&apos;épreuve.
          </p>
        </div>
      </div>
    </div>
  );
}
