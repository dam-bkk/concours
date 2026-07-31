"use client";

import { useCallback, useEffect, useState } from "react";
import type { Grade } from "@/lib/types";
import { logActivity } from "@/lib/activity-log";

const NAME_KEY = "laureat.name";
const GRADE_KEY = "laureat.grade";
const OPTIONS_KEY = "laureat.options";

function emit() {
  window.dispatchEvent(new CustomEvent("laureat-prefs"));
}

export function setStudentName(name: string) {
  try {
    window.localStorage.setItem(NAME_KEY, name.trim());
    emit();
    logActivity("profil", `Prénom défini : ${name.trim()}`);
  } catch {
    // stockage indisponible
  }
}

/** Concours suivis (ids de Subject). */
export function setOptions(ids: string[]) {
  try {
    window.localStorage.setItem(OPTIONS_KEY, JSON.stringify(ids));
    emit();
    logActivity("profil", `Concours suivis : ${ids.length ? ids.join(", ") : "aucun"}`);
  } catch {
    // stockage indisponible
  }
}

export function setGrade(grade: Grade) {
  try {
    window.localStorage.setItem(GRADE_KEY, grade);
    emit();
    logActivity("profil", `Parcours changé : ${grade}`);
  } catch {
    // stockage indisponible
  }
}

/** Prénom + parcours choisis, réactifs (null tant que non hydraté ou non défini). */
export function usePrefs(): {
  name: string | null;
  grade: Grade;
  options: string[] | null;
  hydrated: boolean;
} {
  const [name, setName] = useState<string | null>(null);
  const [grade, setGradeState] = useState<Grade>("concours");
  const [options, setOptionsState] = useState<string[] | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    try {
      setName(window.localStorage.getItem(NAME_KEY));
      setGradeState((window.localStorage.getItem(GRADE_KEY) as Grade) || "concours");
      const raw = window.localStorage.getItem(OPTIONS_KEY);
      setOptionsState(raw ? (JSON.parse(raw) as string[]) : null);
    } catch {
      // valeurs par défaut
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("laureat-prefs", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("laureat-prefs", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return { name, grade, options, hydrated };
}
