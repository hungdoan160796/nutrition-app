// lib/foods.ts
import { Food } from "@/lib/types/food";
import { getJSON } from "./blob";

const foods = (await getFoods()) as Food[];


export async function getFoods(): Promise<Food[]> {
  return getJSON<Food[]>("foods/foods_selected.json");
}
