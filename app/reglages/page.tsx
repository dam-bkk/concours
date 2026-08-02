"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Volume2,
  VolumeX,
  ScrollText,
  History,
  Trash2,
} from "lucide-react";
import { readLog, clearLog, type ActivityEntry, type ActivityCategory } from "@/lib/activity-log";
import { CHANGELOG, APP_VERSION } from "@/data/changelog";
import { setSoundEnabled, soundEnabled } from "@/lib/fx";

const CATEGORY_STYLE: Record<ActivityCategory, string> = {
  exercice: "bg-grandeurs-tint text-grandeurs-strong",
  defi: "bg-sun-tint text-sun-strong",
  controle: "bg-nombres-tint text-nombres-strong",
  revision: "bg-geometrie-tint text-geometrie-strong",
  profil: "bg-donnees-tint text-donnees-strong",
  systeme: "bg-line text-muted",
};

const KIND_STYLE: Record<string, string> = {
  major: "bg-nombres-tint text-nombres-strong",
  minor: "bg-grandeurs-tint text-grandeurs-strong",
  patch: "bg-line text-muted",
};

function fmtTs(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" }) +
    " " +
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function ReglagesPage() {
  const [log, setLog] = useState<ActivityEntry[]>([]);
  const [sound, setSound] = useState(true);
  const [tab, setTab] = useState<"journal" | "versions">("journal");

  useEffect(() => {
    const refresh = () => {
      setLog(readLog());
      setSound(soundEnabled());
    };
    refresh();
    window.addEventListener("laureat-log", refresh);
    window.addEventListener("laureat-sound", refresh);
    return () => {
      window.removeEventListener("laureat-log", refresh);
      window.removeEventListener("laureat-sound", refresh);
    };
  }, []);

  return (
    <div className="rise">
      <Link href="/" className="mb-4 flex w-fit items-center gap-1.5 text-sm font-extrabold text-muted hover:text-ink">
        <ArrowLeft size={16} strokeWidth={2.5} />
        Accueil
      </Link>

      <div className="flex items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 font-display text-2xl font-extrabold md:text-3xl">
          <Settings size={26} strokeWidth={2.5} className="text-muted" />
          Réglages
        </h1>
        <span className="rounded-xl bg-donnees-tint px-3 py-1.5 text-sm font-extrabold text-donnees-strong">
          Admisio v{APP_VERSION}
        </span>
      </div>

      {/* Préférences */}
      <div className="card-pop mt-4 flex items-center justify-between p-4">
        <div>
          <p className="font-display text-lg font-extrabold">Sons et vibrations</p>
          <p className="text-sm font-bold text-muted">Effets de réussite, d&apos;erreur et fanfares</p>
        </div>
        <button
          onClick={() => setSoundEnabled(!sound)}
          className={`btn-pop flex items-center gap-2 px-5 py-2.5 font-extrabold ${
            sound ? "bg-ink text-white" : "bg-card text-muted"
          }`}
        >
          {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          {sound ? "Activés" : "Coupés"}
        </button>
      </div>

      {/* Onglets */}
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setTab("journal")}
          className={`btn-pop flex items-center gap-2 px-5 py-2.5 font-extrabold ${
            tab === "journal" ? "bg-ink text-white" : "bg-card"
          }`}
        >
          <ScrollText size={18} />
          Journal d&apos;activité
        </button>
        <button
          onClick={() => setTab("versions")}
          className={`btn-pop flex items-center gap-2 px-5 py-2.5 font-extrabold ${
            tab === "versions" ? "bg-ink text-white" : "bg-card"
          }`}
        >
          <History size={18} />
          Versions
        </button>
      </div>

      {tab === "journal" && (
        <div className="card-pop mt-4 p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-muted">
              {log.length} entrée{log.length > 1 ? "s" : ""} (500 max, stockées uniquement sur cet appareil)
            </p>
            {log.length > 0 && (
              <button
                onClick={() => {
                  clearLog();
                  setLog([]);
                }}
                className="flex items-center gap-1.5 text-sm font-extrabold text-ko-strong hover:underline"
              >
                <Trash2 size={15} />
                Vider le journal
              </button>
            )}
          </div>
          {log.length === 0 ? (
            <p className="mt-4 text-center font-bold text-muted">
              Aucune activité enregistrée pour l&apos;instant.
            </p>
          ) : (
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-line text-xs font-extrabold uppercase tracking-wide text-muted">
                    <th className="py-2 pr-3">Horodatage</th>
                    <th className="py-2 pr-3">Qui</th>
                    <th className="py-2 pr-3">Action</th>
                    <th className="py-2 pr-3">Catégorie</th>
                    <th className="py-2">IP</th>
                  </tr>
                </thead>
                <tbody>
                  {log.map((e, i) => (
                    <tr key={i} className="border-b border-line/60 font-semibold">
                      <td className="whitespace-nowrap py-2 pr-3 font-mono text-xs">{fmtTs(e.ts)}</td>
                      <td className="py-2 pr-3 font-bold">{e.who}</td>
                      <td className="py-2 pr-3">{e.what}</td>
                      <td className="py-2 pr-3">
                        <span className={`rounded-xl px-2.5 py-0.5 text-xs font-extrabold ${CATEGORY_STYLE[e.category]}`}>
                          {e.category}
                        </span>
                      </td>
                      <td className="whitespace-nowrap py-2 font-mono text-xs text-muted">{e.ip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "versions" && (
        <div className="mt-4 space-y-3">
          {CHANGELOG.map((entry) => (
            <div key={entry.version} className="card-pop p-4">
              <div className="flex items-center gap-2.5">
                <p className="font-display text-xl font-extrabold">v{entry.version}</p>
                <span className={`rounded-xl px-2.5 py-0.5 text-xs font-extrabold ${KIND_STYLE[entry.kind]}`}>
                  {entry.kind}
                </span>
                <p className="ml-auto text-sm font-bold text-muted">
                  {new Date(entry.date + "T12:00:00").toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <ul className="mt-2 space-y-1">
                {entry.changes.map((c) => (
                  <li key={c} className="flex gap-2 text-[15px] font-semibold">
                    <span className="text-muted">•</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
