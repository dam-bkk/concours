import { describe, expect, it } from "vitest";
import { checkAnswer, norm } from "@/lib/answers";

describe("norm", () => {
  it("ignore la casse et les espaces", () => {
    expect(norm("  12 705 ")).toBe(norm("12705"));
    expect(norm("Paris")).toBe(norm("paris"));
  });
  it("convertit le point décimal en virgule entre chiffres seulement", () => {
    expect(norm("3.5")).toBe(norm("3,5"));
    expect(norm("M. Dupont")).not.toBe(norm("M, Dupont"));
  });
  it("ignore la ponctuation finale des phrases", () => {
    expect(norm("Laura chante.")).toBe(norm("laura chante"));
    expect(norm("hello!")).toBe(norm("hello"));
  });
  it("unifie les apostrophes typographiques et droites", () => {
    expect(norm("l’avion")).toBe(norm("l'avion"));
  });
  it("ne dépouille PAS les accents (les variantes vont dans accept)", () => {
    expect(norm("está")).not.toBe(norm("esta"));
  });
});

describe("checkAnswer", () => {
  it("valide la réponse exacte et les variantes accept", () => {
    expect(checkAnswer("12705", ["12 705"], "12 705")).toBe(true);
    expect(checkAnswer("i'm", ["i am"], "I AM")).toBe(true);
    expect(checkAnswer("está", ["esta"], "esta")).toBe(true);
  });
  it("rejette une réponse fausse", () => {
    expect(checkAnswer("3,5", undefined, "3,6")).toBe(false);
  });
});
