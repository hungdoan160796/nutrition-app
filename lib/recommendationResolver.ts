import { getDB } from "@/lib/db";
import {
  RECOMMENDATION_SETS,
  type RecommendationSetId,
} from "@/data/recommendations";

type Profile = {
  standard: RecommendationSetId;
  sex: "male" | "female";
  age: number;
};

const DEFAULT_PROFILE: Profile = {
  standard: "fda_dv_2024",
  sex: "female",
  age: 30,
};

export function getResolvedRecommendations() {
  const db = getDB();

  const profile: Profile = {
    ...DEFAULT_PROFILE,
    ...(db.userProfile ?? {}),
  };

  const overrides: Record<string, number> =
    db.nutrientOverrides ?? {};

  const set = RECOMMENDATION_SETS[profile.standard];
  if (!set) return [];

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
