import {
  bugLabels,
  createDefaultBugFlags,
  type BugFlagKey,
  type BugFlags,
} from "./BugFlags";

const STORAGE_KEY = "brightswagshop.debug-bug-flags";

const bugKeys = Object.keys(bugLabels) as BugFlagKey[];

export function loadBugFlags(): BugFlags {
  const rawValue = localStorage.getItem(STORAGE_KEY);

  if (!rawValue) {
    return createDefaultBugFlags();
  }

  try {
    const parsed = JSON.parse(rawValue) as Partial<BugFlags>;

    return bugKeys.reduce<BugFlags>((flags, key) => {
      flags[key] = Boolean(parsed[key]);
      return flags;
    }, createDefaultBugFlags());
  } catch {
    return createDefaultBugFlags();
  }
}

export function saveBugFlags(flags: BugFlags) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

export function isBugOn(flag: BugFlagKey) {
  return loadBugFlags()[flag];
}

export function setBugOn(flag: BugFlagKey, enabled: boolean) {
  const flags = loadBugFlags();
  flags[flag] = enabled;
  saveBugFlags(flags);
}