import type { BugKey } from "./BugFlags";

const STORAGE_KEY = "bug-flags";

export type BugFlags = Record<BugKey, boolean>;

const defaultFlags: BugFlags = {
  BROKEN_CATEGORY_SLUG: false,
  EMPTY_CATEGORY_ITEMS: false,
  BROKEN_IMAGES: false,
  RANDOM_API_ERROR: false,
  SLOW_LOADING: false,
  STRIPE_PAYMENT_FAILURE:false,
  WRONG_CART_TOTAL:false,
};

export function loadBugFlags(): BugFlags {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultFlags;
    const parsed = JSON.parse(raw) as Partial<BugFlags>;
    return { ...defaultFlags, ...parsed };
  } catch {
    return defaultFlags;
  }
}

export function saveBugFlags(flags: BugFlags) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
}

export function isBugOn(key: BugKey): boolean {
  return loadBugFlags()[key] ?? false;
}

export function setBugOn(key: BugKey, value: boolean) {
  const flags = loadBugFlags();
  flags[key] = value;
  saveBugFlags(flags);
}