import { describe, expect, it } from "vitest";
import { parseSavedSoundMatchDesigns, type SavedSoundMatchDesign } from "../lib/soundmatch-storage";
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
