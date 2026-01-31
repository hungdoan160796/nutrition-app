// components/FoodRow.tsx
"use client";

import { useEffect, useMemo } from "react";
import { loadLocalDB, saveLocalDB } from "@/lib/localStore.web";
import foodsSelectedRaw from "@/data/foods_selected.json";

type FoodCatalogItem = {
  term: string;
  name: string;
};

type FoodFromDB = {
  id: string;
  name: string;
  grams?: number;
};

type SelectedFood = {
  name: string;
  term: string;
  quantity?: number;
};

type LocalDB = {
  foods_selected: SelectedFood[];
};

type FoodRowProps = {
  food: FoodFromDB;
};

const foodsSelected = foodsSelectedRaw as FoodCatalogItem[];

const normalize = (s: string) =>
  s.trim().toLowerCase();

export default function FoodRow({ food }: FoodRowProps) {
  const normalizedName = normalize(food.name);

  const catalogFood = useMemo(() => {
    return foodsSelected.find(
      (f) => normalize(f.name) === normalizedName
    );
  }, [normalizedName]);

  const term = catalogFood?.term ?? normalizedName;
  const name = catalogFood?.name ?? food.name;
  const quantity = food.grams;

  useEffect(() => {
    (async () => {
      const db =
        (await loadLocalDB<LocalDB>()) ?? { foods_selected: [] };

      const entry: SelectedFood = {
        term,
        name,
        quantity,
      };

      const idx = db.foods_selected.findIndex(
        (f: SelectedFood) => f.term === term
      );

      if (idx === -1) {
        db.foods_selected.push(entry);
      } else {
        db.foods_selected[idx] = entry;
      }

      await saveLocalDB<LocalDB>(db);
    })();
  }, [term, name, quantity]);

  return (
    <div className="flex justify-between text-sm">
      <span>{term}</span>
      <span className="text-muted-foreground">
        {quantity ?? ""}
      </span>
    </div>
  );
}
