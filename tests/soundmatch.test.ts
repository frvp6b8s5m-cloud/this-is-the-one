import { describe, expect, it } from "vitest";
import { evaluateSoundMatch, validateSoundMatchInput, type SoundMatchInput } from "../lib/soundmatch";

const validInput: SoundMatchInput = {
  venue: "church",
  indoor: "indoor",
  audience: 150,
  budget: null,
  priority: "speech",
  existing: "",
  dimensions: "",
  installation: false,
};

describe("evaluateSoundMatch", () => {
  it("returns the three named planning paths", () => {
    expect(evaluateSoundMatch(validInput).map((plan) => plan.name)).toEqual([
      "Essential",
      "Recommended",
      "Professional",
    ]);
  });

  it("never claims compatibility without verified product specifications", () => {
    expect(evaluateSoundMatch(validInput).every((plan) => plan.status === "NEEDS_REVIEW")).toBe(true);
  });

  it("includes low-frequency planning when bass is the top priority", () => {
    const plans = evaluateSoundMatch({ ...validInput, venue: "dj", priority: "bass" });
    expect(plans[0].roles.some((role) => role.role === "Low-frequency system")).toBe(true);
  });

  it("adds processing and commissioning to the professional path", () => {
    const professional = evaluateSoundMatch(validInput).find((plan) => plan.name === "Professional");
    expect(professional?.roles.some((role) => role.role === "System processing & commissioning")).toBe(true);
  });

  it("includes installation coordination only when requested", () => {
    const withoutInstallation = evaluateSoundMatch(validInput)[0];
    const withInstallation = evaluateSoundMatch({ ...validInput, installation: true })[0];
    expect(withoutInstallation.roles.some((role) => role.role === "Installation & setup coordination")).toBe(false);
    expect(withInstallation.roles.some((role) => role.role === "Installation & setup coordination")).toBe(true);
  });
});

describe("validateSoundMatchInput", () => {
  it("rejects an audience size outside the supported range", () => {
    expect(validateSoundMatchInput({ ...validInput, audience: 0 })).toContain(
      "Audience size must be between 1 and 100,000.",
    );
  });

  it("accepts an unknown budget and optional dimensions", () => {
    expect(validateSoundMatchInput(validInput)).toEqual([]);
  });

  it("rejects negative and out-of-range budgets", () => {
    expect(validateSoundMatchInput({ ...validInput, budget: -1 })).toContain(
      "Budget must be between $0 and $10,000,000.",
    );
    expect(validateSoundMatchInput({ ...validInput, budget: 10000001 })).toContain(
      "Budget must be between $0 and $10,000,000.",
    );
  });

  it("accepts audiences above 1,000 up to the supported limit", () => {
    expect(validateSoundMatchInput({ ...validInput, audience: 25000 })).toEqual([]);
  });
});