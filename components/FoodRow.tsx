// components/FoodRow.tsx
"use client";

import { useEffect } from "react";
import { loadLocalDB, saveLocalDB } from "@/lib/localStore.web";

type SelectedFood = {
  name: string;
  term: string;
  quantity?: number;
};

type LocalDB = {
  foods_selected: SelectedFood[];
};

type FoodRowProps = {
  food: SelectedFood;
};

export default function FoodRow({ food }: FoodRowProps) {
  console.log("[FoodRow] render", food);

  useEffect(() => {
    console.log("[FoodRow] useEffect fired", food);

    if (!food.term) {
      console.warn("[FoodRow] missing term", food);
      return;
    }

    (async () => {
      const db =
        (await loadLocalDB<LocalDB>()) ?? { foods_selected: [] };

      console.log("[FoodRow] loaded local DB", db);

      const idx = db.foods_selected.findIndex(
        (f: SelectedFood) => f.term === food.term
      );

      console.log("[FoodRow] existing index", idx);

      if (idx === -1) {
        console.log("[FoodRow] pushing new food", food);
        db.foods_selected.push(food);
      } else {
        console.log("[FoodRow] updating food", food);
        db.foods_selected[idx] = food;
      }

      await saveLocalDB<LocalDB>(db);
      console.log("[FoodRow] saved local DB", db);
    })();
  }, [food.term, food.quantity, food.name]);

  return (
    <div className="flex justify-between text-sm">
      <span>{food.term}</span>
      <span className="text-muted-foreground">
        {food.quantity ?? ""}
      </span>
    </div>
  );
}
