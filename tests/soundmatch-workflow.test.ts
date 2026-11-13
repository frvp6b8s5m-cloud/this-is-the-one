import { describe, expect, it } from "vitest";
import {
  canNavigateToSoundMatchStep,
  createInitialSoundMatchWizardState,
} from "../lib/soundmatch-workflow";

describe("canNavigateToSoundMatchStep", () => {
  it("prevents jumping ahead of the current step", () => {
    expect(canNavigateToSoundMatchStep(0, 1)).toBe(false);
    expect(canNavigateToSoundMatchStep(2, 5)).toBe(false);
  });

  it("allows staying on the current step and revisiting completed steps", () => {
    expect(canNavigateToSoundMatchStep(2, 2)).toBe(true);
    expect(canNavigateToSoundMatchStep(5, 0)).toBe(true);
  });

  it("allows returning from the results screen to any questionnaire step", () => {
    expect(canNavigateToSoundMatchStep(6, 0)).toBe(true);
    expect(canNavigateToSoundMatchStep(6, 5)).toBe(true);
  });

  it("rejects invalid step indexes", () => {
    expect(canNavigateToSoundMatchStep(-1, 0)).toBe(false);
    expect(canNavigateToSoundMatchStep(0, -1)).toBe(false);
    expect(canNavigateToSoundMatchStep(6, 7)).toBe(false);
    expect(canNavigateToSoundMatchStep(1.5, 1)).toBe(false);
  });
});

describe("createInitialSoundMatchWizardState", () => {
  it("returns a clean default state for a new project or reset", () => {
    expect(createInitialSoundMatchWizardState()).toMatchObject({
      step: 0,
      selected: "Recommended",
      copied: false,
      editablePlans: {},
      customRole: "",
      customQuantity: "1",
      comparePlans: false,
      saveName: "",
      form: {
        venue: "church",
        audience: 150,
        sources: ["Microphones", "Playback"],
        connectivity: ["Analog XLR"],
      },
    });
  });

  it("creates independent source and connectivity arrays", () => {
    const first = createInitialSoundMatchWizardState();
    const second = createInitialSoundMatchWizardState();
    first.form.sources.push("DJ controller");
    first.form.connectivity.push("USB audio");
    expect(second.form.sources).toEqual(["Microphones", "Playback"]);
    expect(second.form.connectivity).toEqual(["Analog XLR"]);
  });
});
