import fda from "@/data/recommended_intake_fda.json";
import usda from "@/data/recommended_intake_generated.json";

export const RECOMMENDATION_SETS = {
  fda_dv_2024: fda,
  usda_dri: usda,
} as const;

export type RecommendationSetId = keyof typeof RECOMMENDATION_SETS;
