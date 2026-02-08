import { useEffect, useState } from "react";

export type FoodLite = {
  id: string;
  name: string;
};

type Index = {
  foods: FoodLite[];
  tokenMap: Map<string, number[]>; // token → food indexes
};

let index: Index | null = null;

function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, "");
}

export function buildFoodIndex() {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then(setFoods);
  }, []);
  if (index) return index;

  const foodsLite: FoodLite[] = foods.map(f => ({
    id: f.id,
    name: f.name,
  }));

  const tokenMap = new Map<string, number[]>();

  foodsLite.forEach((food, i) => {
    const tokens = normalize(food.name).split(" ");

    for (const token of tokens) {
      if (token.length < 2) continue;

      if (!tokenMap.has(token)) {
        tokenMap.set(token, []);
      }
      tokenMap.get(token)!.push(i);
    }
  });

  index = { foods: foodsLite, tokenMap };
  return index;
}
