export type VenueType = "church" | "live" | "dj" | "school" | "commercial" | "other";
export type Priority = "speech" | "music" | "bass" | "portable" | "expandable";
export type SoundMatchInput = {
  venue: VenueType;
  indoor: "indoor" | "outdoor" | "both";
  audience: number;
  budget: number | null;
  priority: Priority;
  existing: string;
  dimensions: string;
  installation: boolean;
};

export type RuleStatus = "PASS" | "FAIL" | "NEEDS_REVIEW";
export type PackagePlan = {
  name: "Essential" | "Recommended" | "Professional";
  summary: string;
  roles: { role: string; quantity: string; reason: string }[];
  status: RuleStatus;
  tradeoff: string;
};

const venueLabels: Record<VenueType, string> = {
  church: "church or worship space",
  live: "live music venue",
  dj: "DJ setup",
  school: "school or auditorium",
  commercial: "commercial space",
  other: "your space",
};

function rolesFor(input: SoundMatchInput, tier: PackagePlan["name"]) {
  const outdoor = input.indoor === "outdoor" || input.indoor === "both";
  const large = input.audience > 250;
  const live = input.venue === "live" || input.venue === "church" || input.venue === "school";
  const dj = input.venue === "dj";
  const count = large ? "To be sized after coverage review" : "Quantity to be confirmed";

  const roles = [
    {
      role: "Main loudspeakers",
      quantity: count,
      reason: outdoor
        ? "The system needs a weather-appropriate deployment plan; outdoor coverage must be designed for the site."
        : "Provides the primary audience coverage for the room.",
    },
    {
      role: "Mixer or signal controller",
      quantity: "Sized to source and zone count",
      reason: live
        ? "Allows microphones, playback, and live sources to be managed clearly."
        : "Routes and controls the audio sources for the intended use.",
    },
  ];

  if (dj || input.priority === "bass" || tier !== "Essential") {
    roles.push({
      role: "Low-frequency system",
      quantity: "Optional / verify need",
      reason: dj || input.priority === "bass"
        ? "Low-frequency support is a stated priority, but room and system matching must be reviewed."
        : "Adds an expansion path when music content and venue needs justify it.",
    });
  }

  if (live || tier !== "Essential") {
    roles.push({
      role: "Stage monitoring / zone outputs",
      quantity: "Based on performers or listening zones",
      reason: "Keeps stage or secondary-zone needs in the plan instead of treating the mains as the whole system.",
    });
  }

  roles.push({
    role: "Cabling, mounting & power accessories",
    quantity: "Project-specific",
    reason: "Completes the signal path and installation plan; cable type, lengths, mounting, and power require site confirmation.",
  });

  if (tier === "Professional") {
    roles.push({
      role: "System processing & commissioning",
      quantity: "As required by final design",
      reason: "Provides a place for verified system processing, alignment, and documented commissioning.",
    });
  }

  return roles;
}

export function evaluateSoundMatch(input: SoundMatchInput): PackagePlan[] {
  const venue = venueLabels[input.venue];
  const priorities: Record<Priority, string> = {
    speech: "speech intelligibility",
    music: "balanced music playback",
    bass: "low-frequency performance",
    portable: "easy transport and setup",
    expandable: "future expansion",
  };

  const plans: PackagePlan[] = [
    {
      name: "Essential",
      summary: "A focused starting point built around the core system roles.",
      roles: rolesFor(input, "Essential"),
      status: "NEEDS_REVIEW",
      tradeoff: "Keeps the design lean. Some expansion options may be left for a later phase.",
    },
    {
      name: "Recommended",
      summary: "A balanced plan with room for the priorities you selected.",
      roles: rolesFor(input, "Recommended"),
      status: "NEEDS_REVIEW",
      tradeoff: "Adds flexibility and a more complete signal / monitoring plan.",
    },
    {
      name: "Professional",
      summary: "A more expandable plan intended for a detailed technical review.",
      roles: rolesFor(input, "Professional"),
      status: "NEEDS_REVIEW",
      tradeoff: "Includes a clearer path for processing and commissioning, with more design work required.",
    },
  ];

  return plans.map((plan) => ({
    ...plan,
    summary: `${plan.summary} Planned for ${venue}, with ${priorities[input.priority]} in mind.`,
  }));
}

export function validateSoundMatchInput(input: SoundMatchInput): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(input.audience) || input.audience < 1 || input.audience > 100000) {
    errors.push("Audience size must be between 1 and 100,000.");
  }
  if (input.budget !== null && (!Number.isFinite(input.budget) || input.budget < 0)) {
    errors.push("Budget must be a non-negative number.");
  }
  if (input.dimensions.length > 120) errors.push("Room dimensions must be 120 characters or fewer.");
  if (input.existing.length > 500) errors.push("Existing equipment notes must be 500 characters or fewer.");
  return errors;
}