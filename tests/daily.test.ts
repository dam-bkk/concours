import { describe, expect, it } from "vitest";
import { DAILY_SIZE, dailyChallenge } from "@/lib/daily";

describe("dailyChallenge", () => {
  it("est déterministe pour une même date", () => {
    const a = dailyChallenge("2026-07-31");
    const b = dailyChallenge("2026-07-31");
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it("produit 6 questions valides pour 365 dates", () => {
    for (let i = 0; i < 365; i++) {
      const d = new Date(2026, 0, 1 + i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
        d.getDate()
      ).padStart(2, "0")}`;
      const qs = dailyChallenge(key);
      expect(qs).toHaveLength(DAILY_SIZE);
      for (const q of qs) {
        expect(q.question.length).toBeGreaterThan(0);
        expect(q.answer.length).toBeGreaterThan(0);
        expect(q.explanation.length).toBeGreaterThan(0);
        expect(`${q.question}${q.answer}${q.explanation}`).not.toMatch(/undefined|NaN/);
      }
    }
  });
});
