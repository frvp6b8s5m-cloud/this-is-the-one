import { validateSoundMatchInput, type PackagePlan, type SoundMatchInput } from "@/lib/soundmatch";

export type SavedSoundMatchDesign = {
  id: string;
  name: string;
  form: SoundMatchInput;
  selected: PackagePlan["name"];
  roles: Record<string, PackagePlan["roles"]>;
};

const tiers: PackagePlan["name"][] = ["Essential", "Recommended", "Professional"];
const MAX_DESIGNS = 50;
const MAX_ROLES_PER_TIER = 50;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseRoles(value: unknown): Record<string, PackagePlan["roles"]> | null {
  if (!isRecord(value)) return null;
  const entries = Object.entries(value);
  if (entries.some(([tier]) => !tiers.includes(tier as PackagePlan["name"]))) return null;

  const roles: Record<string, PackagePlan["roles"]> = {};
  for (const [tier, list] of entries) {
    if (!Array.isArray(list) || list.length > MAX_ROLES_PER_TIER) return null;
    const parsed: PackagePlan["roles"] = [];
    for (const role of list) {
      if (!isRecord(role)) return null;
      if (
        typeof role.role !== "string" || role.role.trim().length === 0 || role.role.length > 120 ||
        typeof role.quantity !== "string" || role.quantity.length > 120 ||
        typeof role.reason !== "string" || role.reason.length > 1000
      ) return null;
      parsed.push({ role: role.role.trim(), quantity: role.quantity, reason: role.reason });
    }
    roles[tier] = parsed;
  }
  return roles;
}

export function parseSavedSoundMatchDesigns(value: unknown): SavedSoundMatchDesign[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_DESIGNS).flatMap((item) => {
    if (!isRecord(item) || !isRecord(item.form)) return [];
    if (
      typeof item.id !== "string" || item.id.length === 0 || item.id.length > 100 ||
      typeof item.name !== "string" || item.name.trim().length === 0 || item.name.length > 120 ||
      !tiers.includes(item.selected as PackagePlan["name"])
    ) return [];

    const form = item.form as unknown as SoundMatchInput;
    if (validateSoundMatchInput(form).length > 0) return [];
    const roles = parseRoles(item.roles);
    if (!roles) return [];

    return [{
      id: item.id,
      name: item.name.trim(),
      form,
      selected: item.selected as PackagePlan["name"],
      roles,
    }];
  });
}
