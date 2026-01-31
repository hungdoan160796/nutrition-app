// lib/recommendationResolver.ts
import { getDB } from "@/lib/db";
import { RECOMMENDATION_SETS, type RecommendationSetId } from "@/data/recommendations";

export function getResolvedRecommendations() {
  const db = getDB();

  const profile = db.userProfile as {
    standard: RecommendationSetId;
    sex: "male" | "female";
    age: number;
  };

  const overrides = db.nutrientOverrides ?? {};
  const set = RECOMMENDATION_SETS[profile.standard]; // ✅ now safe

  const rows: Record<string, any> = {};

  for (const r of set.recommendations) {
    if (
      (r.sex === "any" || r.sex === profile.sex) &&
      profile.age >= r.age_min &&
      profile.age <= r.age_max
    ) {
      rows[r.nutrient_id] = {
        id: r.nutrient_id,
        unit: r.unit,
        recommended: r.daily_value,
        value: overrides[r.nutrient_id] ?? r.daily_value,
        overridden: r.nutrient_id in overrides,
      };
    }
  }

  return Object.values(rows);
}
