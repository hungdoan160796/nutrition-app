import type { RecommendationSetId } from "@/data/recommendations";

export type UserProfile = {
  recommendationSet: RecommendationSetId;
  sex: "male" | "female";
  age: number;
};

let userProfile: UserProfile = {
  recommendationSet: "fda_dv_2024",
  sex: "female",
  age: 30,
};

export function getUserProfile(): UserProfile {
  return userProfile;
}

export function updateUserProfile(update: Partial<UserProfile>) {
  userProfile = { ...userProfile, ...update };
}
