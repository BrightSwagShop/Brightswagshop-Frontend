export type BugKey =
  | "BROKEN_CATEGORY_SLUG"
  | "EMPTY_CATEGORY_ITEMS"
  | "BROKEN_IMAGES"
  | "RANDOM_API_ERROR"
  | "SLOW_LOADING"
  | "STRIPE_PAYMENT_FAILURE";

export const bugLabels: Record<BugKey, string> = {
  BROKEN_CATEGORY_SLUG: "Route slug mismatch (category lookup faalt)",
  EMPTY_CATEGORY_ITEMS: "Categorie toont 0 items",
  BROKEN_IMAGES: "Afbeeldingen kapot (src invalid)",
  RANDOM_API_ERROR: "Random API error (1/3 requests faalt)",
  SLOW_LOADING: "Trage loading (2s delay)",
  STRIPE_PAYMENT_FAILURE: "Stripe payment failure",
};