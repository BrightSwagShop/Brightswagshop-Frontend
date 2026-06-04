export type BugFlagKey =
  | "BROKEN_CATEGORY_SLUG"
  | "EMPTY_CATEGORY_ITEMS"
  | "BROKEN_IMAGES"
  | "RANDOM_API_ERROR"
  | "SLOW_LOADING";

export const bugLabels: Record<BugFlagKey, string> = {
  BROKEN_CATEGORY_SLUG: "Route slug mismatch (category lookup faalt)",
  EMPTY_CATEGORY_ITEMS: "Lege categorie-items",
  BROKEN_IMAGES: "Broken images",
  RANDOM_API_ERROR: "Random API error",
  SLOW_LOADING: "Slow loading",
};

export type BugFlags = Record<BugFlagKey, boolean>;

export const createDefaultBugFlags = (): BugFlags => ({
  BROKEN_CATEGORY_SLUG: false,
  EMPTY_CATEGORY_ITEMS: false,
  BROKEN_IMAGES: false,
  RANDOM_API_ERROR: false,
  SLOW_LOADING: false,
});