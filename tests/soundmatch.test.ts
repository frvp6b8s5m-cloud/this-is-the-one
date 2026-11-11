import { describe, expect, it } from "vitest";
import { evaluateSoundMatch, validateSoundMatchInput, type SoundMatchInput } from "../lib/soundmatch";

const validInput: SoundMatchInput = {
  venue: "church", indoor: "indoor", audience: 150, budget: null, priority: "speech",
  existing: "", dimensions: "", installation: false, coverage: "unknown", zones: 1,
  subwoofers: "unsure", monitoring: "unsure", micChannels: 16, mixer: "no-preference",
  sources: ["Microphones", "Playback"], connectivity: ["Analog XLR"], mounting: "unknown",
  power: "unknown", expansion: "some",
};

describe("evaluateSoundMatch", () => {
  it("returns the three named planning paths", () => {
    expect(evaluateSoundMatch(validInput).map((plan) => plan.name)).toEqual(["Essential", "Recommended", "Professional"]);
  });
  it("never claims compatibility without verified product specifications", () => {
    expect(evaluateSoundMatch(validInput).every((plan) => plan.status === "NEEDS_REVIEW")).toBe(true);
  });
  it("includes low-frequency planning when bass is the top priority", () => {
    expect(evaluateSoundMatch({ ...validInput, venue: "dj", priority: "bass" })[0].roles.some((role) => role.role === "Subwoofer / low-frequency system")).toBe(true);
  });
  it("adds processing and commissioning to the professional path", () => {
    expect(evaluateSoundMatch(validInput).find((plan) => plan.name === "Professional")?.roles.some((role) => role.role === "System design, measurement & commissioning")).toBe(true);
  });
  it("includes installation coordination only when requested", () => {
    expect(evaluateSoundMatch(validInput)[0].roles.some((role) => role.role === "Installation & setup coordination")).toBe(false);
    expect(evaluateSoundMatch({ ...validInput, installation: true })[0].roles.some((role) => role.role === "Installation & setup coordination")).toBe(true);
  });
  it("adds separate zone planning when multiple zones are selected", () => {
    expect(evaluateSoundMatch({ ...validInput, zones: 3 })[0].roles.some((role) => role.role === "Zone routing & distribution")).toBe(true);
  });
  it("reflects source and I/O needs in the plan", () => {
    const roles = evaluateSoundMatch({ ...validInput, micChannels: 32, sources: ["Microphones", "DJ controller"] })[0].roles;
    expect(roles.some((role) => role.role === "Source connectivity & stage I/O")).toBe(true);
    expect(roles.some((role) => role.quantity.includes("32 requested"))).toBe(true);
  });
});

describe("validateSoundMatchInput", () => {
  it("rejects audience sizes outside the supported range", () => {
    expect(validateSoundMatchInput({ ...validInput, audience: 0 })).toContain("Audience size must be between 1 and 100,000.");
  });
  it("accepts unknown budget and optional dimensions", () => {
    expect(validateSoundMatchInput(validInput)).toEqual([]);
  });
  it("rejects negative and out-of-range budgets", () => {
    expect(validateSoundMatchInput({ ...validInput, budget: -1 })).toContain("Budget must be between $0 and $10,000,000.");
    expect(validateSoundMatchInput({ ...validInput, budget: 10000001 })).toContain("Budget must be between $0 and $10,000,000.");
  });
  it("accepts audiences above 1,000 up to the supported limit", () => {
    expect(validateSoundMatchInput({ ...validInput, audience: 25000 })).toEqual([]);
  });
  it("validates channel and zone counts", () => {
    expect(validateSoundMatchInput({ ...validInput, zones: 0 })).toContain("Zones must be between 1 and 32.");
    expect(validateSoundMatchInput({ ...validInput, micChannels: 257 })).toContain("Input channels must be between 0 and 256.");
  });
});
