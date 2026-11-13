import { describe, expect, it } from "vitest";
import {
  parseSavedSoundMatchDesigns,
  validateSavedSoundMatchDesignDraft,
  type SavedSoundMatchDesign,
} from "../lib/soundmatch-storage";
import type { SoundMatchInput } from "../lib/soundmatch";

const form: SoundMatchInput = {
  venue: "church", indoor: "indoor", audience: 150, budget: null, priority: "speech",
  existing: "", dimensions: "", installation: false, coverage: "unknown", zones: 1,
  subwoofers: "unsure", monitoring: "unsure", micChannels: 16, mixer: "no-preference",
  sources: ["Microphones", "Playback"], connectivity: ["Analog XLR"], mounting: "unknown",
  power: "unknown", expansion: "some",
};

const valid: SavedSoundMatchDesign = {
  id: "design-1",
  name: "Main room",
  form,
  selected: "Recommended",
  roles: {},
};

describe("parseSavedSoundMatchDesigns", () => {
  it("accepts valid saved designs", () => {
    expect(parseSavedSoundMatchDesigns([valid])).toEqual([valid]);
  });

  it("returns an empty list for non-array or malformed JSON shapes", () => {
    expect(parseSavedSoundMatchDesigns(null)).toEqual([]);
    expect(parseSavedSoundMatchDesigns({ id: "not-a-list" })).toEqual([]);
    expect(parseSavedSoundMatchDesigns(["bad"])).toEqual([]);
  });

  it("rejects designs containing invalid SoundMatch input", () => {
    expect(parseSavedSoundMatchDesigns([{
      ...valid,
      form: { ...form, venue: "not-a-venue" },
    }])).toEqual([]);
  });

  it("rejects malformed selected tiers and custom role payloads", () => {
    expect(parseSavedSoundMatchDesigns([{ ...valid, selected: "Ultra" }])).toEqual([]);
    expect(parseSavedSoundMatchDesigns([{
      ...valid,
      roles: { Recommended: [{ role: "Mains", quantity: 3, reason: "bad quantity type" }] },
    }])).toEqual([]);
  });

  it("caps the number of loaded designs and validates text lengths", () => {
    const many = Array.from({ length: 55 }, (_, index) => ({ ...valid, id: String(index) }));
    expect(parseSavedSoundMatchDesigns(many)).toHaveLength(50);
    expect(parseSavedSoundMatchDesigns([{ ...valid, name: "x".repeat(121) }])).toEqual([]);
  });
});

describe("validateSavedSoundMatchDesignDraft", () => {
  it("accepts a valid design while below the saved-design limit", () => {
    expect(validateSavedSoundMatchDesignDraft(valid, 49)).toBeNull();
  });

  it("prevents saving more than 50 designs", () => {
    expect(validateSavedSoundMatchDesignDraft(valid, 50)).toMatch(/50 designs/);
  });

  it("rejects overlong names and custom role fields before persistence", () => {
    expect(validateSavedSoundMatchDesignDraft({ ...valid, name: "x".repeat(121) }, 0)).not.toBeNull();
    expect(validateSavedSoundMatchDesignDraft({
      ...valid,
      roles: { Recommended: [{ role: "x".repeat(121), quantity: "1", reason: "ok" }] },
    }, 0)).not.toBeNull();
    expect(validateSavedSoundMatchDesignDraft({
      ...valid,
      roles: { Recommended: [{ role: "Mains", quantity: "x".repeat(121), reason: "ok" }] },
    }, 0)).not.toBeNull();
  });

  it("rejects more than 50 custom roles in a tier", () => {
    const roles = Array.from({ length: 51 }, (_, index) => ({
      role: `Role ${index}`, quantity: "1", reason: "Custom role",
    }));
    expect(validateSavedSoundMatchDesignDraft({
      ...valid,
      roles: { Recommended: roles },
    }, 0)).not.toBeNull();
  });
});
