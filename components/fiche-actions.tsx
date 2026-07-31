"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";

export function FicheActions({ backHref }: { backHref: string }) {
  return (
    <div className="mb-4 flex items-center justify-between print:hidden">
      <Link
        href={backHref}
        className="flex items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink"
      >
        <ArrowLeft size={16} strokeWidth={2.5} />
        Retour au chapitre
      </Link>
      <button
        onClick={() => window.print()}
        className="btn-pop flex items-center gap-2 bg-ink px-5 py-2.5 font-extrabold text-white"
      >
        <Printer size={18} />
        Télécharger en PDF
      </button>
    </div>
  );
}
