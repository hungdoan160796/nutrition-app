import { getNutrientByUsdaName } from "@/lib/nutrientRegistry";
import { useEffect, useState } from "react";

export type FoodSummary = {
  id: string;
  name: string;
};

export type FoodNutrientMap = {
  [nutrientId: string]: {
    amount: number;
    unit: string;
  };
};

export type FoodDetail = {
  id: string;
  name: string;
  nutrients: FoodNutrientMap;
  defaultPortionGrams?: number;
};

function normalizeFoods(): FoodDetail[] {

  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then(setFoods);
  }, []);
  return foods.map((food: any) => {
    const nutrients: FoodNutrientMap = {};

    for (const fn of food.foodNutrients ?? []) {
      if (!fn.nutrient || fn.amount == null) continue;

      const key = fn.nutrient.name;
      const nutrientDef = getNutrientByUsdaName(fn.nutrient.name);
        if (!nutrientDef) continue;

        nutrients[nutrientDef.id] = {
        amount: fn.amount,
        unit: nutrientDef.unit,
        };

    }

    return {
      id: String(food.fdcId),
      name: food.description,
      nutrients,
      defaultPortionGrams: food.foodPortions?.[0]?.gramWeight,
    };
  });
}

const FOODS = normalizeFoods();

/* ---------- Public API ---------- */

export function getFoodList(): FoodSummary[] {
  return FOODS.map(f => ({
    id: f.id,
    name: f.name,
  }));
}

export function getFoodById(id: string): FoodDetail | undefined {
  return FOODS.find(f => f.id === id);
}
