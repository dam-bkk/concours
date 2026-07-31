"use client";

/**
 * Journal d'activité détaillé (exigence infra : horodatage, qui, quoi,
 * adresse IP, catégorie). Stocké en localStorage, plafonné à 500 entrées,
 * consultable dans Réglages. L'IP est résolue une fois par session via
 * /api/whoami (l'app n'a pas d'autre backend).
 */

export type ActivityCategory =
  | "exercice"
  | "defi"
  | "controle"
  | "revision"
  | "profil"
  | "systeme";

export interface ActivityEntry {
  /** ISO 8601 */
  ts: string;
  /** Prénom de l'élève au moment de l'action (ou "—") */
  who: string;
  /** Description de l'action */
  what: string;
  category: ActivityCategory;
  ip: string;
}

const KEY = "laureat.activity-log.v1";
const MAX_ENTRIES = 500;

let cachedIp: string | null = null;

async function resolveIp(): Promise<string> {
  if (cachedIp) return cachedIp;
  try {
    const s = window.sessionStorage.getItem("laureat.ip");
    if (s) return (cachedIp = s);
    const r = await fetch("/api/whoami", { cache: "no-store" });
    const { ip } = (await r.json()) as { ip: string };
    cachedIp = ip || "—";
    window.sessionStorage.setItem("laureat.ip", cachedIp);
    return cachedIp;
  } catch {
    return "—";
  }
}

export function readLog(): ActivityEntry[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ActivityEntry[]) : [];
  } catch {
    return [];
  }
}

export function clearLog() {
  try {
    window.localStorage.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("laureat-log"));
  } catch {
    // stockage indisponible
  }
}

export function logActivity(category: ActivityCategory, what: string) {
  if (typeof window === "undefined") return;
  void (async () => {
    try {
      const who = window.localStorage.getItem("laureat.name") ?? "—";
      const entry: ActivityEntry = {
        ts: new Date().toISOString(),
        who,
        what,
        category,
        ip: await resolveIp(),
      };
      const log = readLog();
      log.unshift(entry);
      window.localStorage.setItem(KEY, JSON.stringify(log.slice(0, MAX_ENTRIES)));
      window.dispatchEvent(new CustomEvent("laureat-log"));
    } catch {
      // le journal ne doit jamais faire échouer l'action principale
    }
  })();
}
