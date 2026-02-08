import { getDB } from "@/lib/db";
import {
  RECOMMENDATION_SETS,
  type RecommendationSetId,
} from "@/data/recommendations";

type Sex = "male" | "female";

export type Profile = {
  recommendationSet: RecommendationSetId;
  sex: Sex;
  age: number;
};

export async function getDailyTargets(
  profile: Profile
): Promise<Record<string, number>> {
  const db = await getDB();
  const overrides = db.nutrientOverrides ?? {};

  const set = RECOMMENDATION_SETS[profile.recommendationSet];
  const targets: Record<string, number> = {};

  for (const r of set.recommendations) {
    if (
      (r.sex === "any" || r.sex === profile.sex) &&
      profile.age >= r.age_min &&
      profile.age <= r.age_max
    ) {
      targets[r.nutrient_id] = r.daily_value;
    }
  }

  // overrides always win
  for (const [id, value] of Object.entries(overrides)) {
    targets[id] = value as number;
  }

  return targets;
}
