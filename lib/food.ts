// lib/foods.ts
import { Food } from "@/lib/types/food";

export async function getFoods(): Promise<Food[]> {
  const res = await fetch("/api/foods/list", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch foods");
  }

  return res.json();
}
