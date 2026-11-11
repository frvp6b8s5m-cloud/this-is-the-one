import type { PackagePlan, SoundMatchInput } from "./soundmatch";

export type SoundMatchWizardInitialState = {
  form: SoundMatchInput;
  step: number;
  selected: PackagePlan["name"];
  copied: boolean;
  editablePlans: Record<string, PackagePlan["roles"]>;
  customRole: string;
  customQuantity: string;
  comparePlans: boolean;
  saveName: string;
};

export function canNavigateToSoundMatchStep(currentStep: number, targetStep: number): boolean {
  const isValidCurrentStep = Number.isInteger(currentStep) && currentStep >= 0 && currentStep <= 6;
  const isQuestionnaireStep = Number.isInteger(targetStep) && targetStep >= 0 && targetStep <= 5;
  return isValidCurrentStep && isQuestionnaireStep && targetStep <= currentStep;
}

export function createInitialSoundMatchWizardState(): SoundMatchWizardInitialState {
  return {
    form: {
      venue: "church",
      indoor: "indoor",
      audience: 150,
      budget: null,
      priority: "speech",
      existing: "",
      dimensions: "",
      installation: false,
      coverage: "unknown",
      zones: 1,
      subwoofers: "unsure",
      monitoring: "unsure",
      micChannels: 16,
      mixer: "no-preference",
      sources: ["Microphones", "Playback"],
      connectivity: ["Analog XLR"],
      mounting: "unknown",
      power: "unknown",
      expansion: "some",
    },
    step: 0,
    selected: "Recommended",
    copied: false,
    editablePlans: {},
    customRole: "",
    customQuantity: "1",
    comparePlans: false,
    saveName: "",
  };
}
