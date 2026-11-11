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
  coverage: "wide" | "long" | "distributed" | "unknown";
  zones: number;
  subwoofers: "none" | "one-pair" | "multiple" | "unsure";
  monitoring: "none" | "wedges" | "in-ear" | "both" | "unsure";
  micChannels: number;
  mixer: "digital" | "analog" | "no-preference" | "already-own";
  sources: string[];
  connectivity: string[];
  mounting: "floor" | "wall" | "flown" | "mixed" | "unknown";
  power: "standard" | "dedicated" | "unknown";
  expansion: "fixed" | "some" | "major";
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
  const roles: PackagePlan["roles"] = [
    {
      role: "Main loudspeakers",
      quantity: input.coverage === "distributed" || input.zones > 1 ? `Coverage plan across ${input.zones} zones` : large ? "To be sized after coverage review" : "Quantity to be confirmed",
      reason: `${outdoor ? "Outdoor/weather exposure needs site-specific review. " : ""}${input.coverage === "long" ? "Long-throw coverage is a stated requirement. " : input.coverage === "wide" ? "Wide audience coverage is a stated requirement. " : "Coverage geometry needs to be confirmed. "}Final loudspeaker type, placement, aiming, and output must be modeled or measured.`,
    },
    {
      role: "Mixer / system control",
      quantity: `${input.micChannels} requested mic/line inputs · ${input.zones} zones`,
      reason: `Planning around a ${input.mixer === "already-own" ? "current mixer" : input.mixer === "digital" ? "digital mixer preference" : input.mixer === "analog" ? "analog mixer preference" : "flexible mixer choice"} and the requested source/zone workflow. Actual I/O and routing must be verified.`,
    },
  ];

  if (input.sources.length) {
    roles.push({
      role: "Source connectivity & stage I/O",
      quantity: input.sources.join(", "),
      reason: "The requested sources need a verified connection, channel, and adapter plan.",
    });
  }

  if (dj || input.priority === "bass" || input.subwoofers !== "none" || tier !== "Essential") {
    roles.push({
      role: "Subwoofer / low-frequency system",
      quantity: input.subwoofers === "none" ? "Optional; confirm content and room need" : input.subwoofers === "one-pair" ? "One pair requested; verify design" : input.subwoofers === "multiple" ? "Multiple units requested; array review required" : "Quantity and deployment to be determined",
      reason: "Low-frequency deployment depends on room dimensions, boundary effects, polarity, crossover, headroom, and audience coverage. Array behavior must be reviewed.",
    });
  }

  if (live || input.monitoring !== "none" || tier !== "Essential") {
    roles.push({
      role: "Stage monitoring / foldback",
      quantity: input.monitoring === "none" ? "Not requested" : input.monitoring === "unsure" ? "To be determined with performers" : input.monitoring,
      reason: "Monitor count, mixes, I/O, stage layout, feedback risk, and in-ear RF coordination need to be checked against the performance workflow.",
    });
  }

  if (input.zones > 1 || input.venue === "commercial" || input.expansion !== "fixed") {
    roles.push({
      role: "Zone routing & distribution",
      quantity: `${input.zones} requested zones`,
      reason: "Independent level, routing, delay, and control requirements must be defined for each listening area.",
    });
  }

  roles.push({
    role: "Cabling, mounting & power accessories",
    quantity: `${input.mounting} mounting · ${input.power} power plan`,
    reason: "Cable types/lengths, rigging hardware, structural capacity, electrical circuits, and environmental ratings require site confirmation.",
  });

  if (tier !== "Essential" || input.expansion !== "fixed") {
    roles.push({
      role: "System processing & network",
      quantity: input.connectivity.length ? input.connectivity.join(", ") : "Requirements to be confirmed",
      reason: "Processing, control networking, and interconnection should be selected only after signal flow, device compatibility, and network requirements are documented.",
    });
  }

  if (input.installation) {
    roles.push({
      role: "Installation & setup coordination",
      quantity: "Scope confirmed after site review",
      reason: "Installation help was requested; mounting, cabling, access, power, and responsibilities must be confirmed for the actual site.",
    });
  }

  if (tier === "Professional") {
    roles.push({
      role: "System design, measurement & commissioning",
      quantity: "As required by final design",
      reason: "Provides a path for documented coverage review, alignment, verification, and handover by qualified personnel.",
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
      tradeoff: "Includes a clearer path for processing, measurement, and commissioning, with more design work required.",
    },
  ];
  return plans.map((plan) => ({
    ...plan,
    summary: `${plan.summary} Planned for ${venue}, with ${priorities[input.priority]} in mind.`,
  }));
}

export function validateSoundMatchInput(input: SoundMatchInput): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(input.audience) || input.audience < 1 || input.audience > 100000) errors.push("Audience size must be between 1 and 100,000.");
  if (input.budget !== null && (!Number.isFinite(input.budget) || input.budget < 0 || input.budget > 10000000)) errors.push("Budget must be between $0 and $10,000,000.");
  if (!Number.isInteger(input.zones) || input.zones < 1 || input.zones > 32) errors.push("Zones must be between 1 and 32.");
  if (!Number.isInteger(input.micChannels) || input.micChannels < 0 || input.micChannels > 256) errors.push("Input channels must be between 0 and 256.");
  if (input.dimensions.length > 120) errors.push("Room dimensions must be 120 characters or fewer.");
  if (input.existing.length > 500) errors.push("Existing equipment notes must be 500 characters or fewer.");
  if (input.sources.length > 12 || input.connectivity.length > 12) errors.push("Too many selected connection types.");
  return errors;
}
