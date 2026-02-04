// components/FoodRow.tsx
"use client";

import { useEffect, useMemo } from "react";
import { GET } from "@/app/api/foods/list/route";

const foodsSelectedRaw: FoodCatalogItem[] = await GET().then((res) => res.json());

type FoodCatalogItem = {
  term: string;
  name: string;
};

type FoodFromDB = {
  term: string;
  name: string;
  grams?: number;
};

type SelectedFood = {
  name: string;
  term: string;
  quantity?: number;
};

type FoodRowProps = {
  food: FoodFromDB;
  selected?: SelectedFood;
  onChange?: (entry: SelectedFood) => void;
};

const foodsSelected = foodsSelectedRaw as FoodCatalogItem[];

const normalize = (s: string) => s.trim().toLowerCase();

export default function FoodRow({
  food,
  selected,
  onChange,
}: FoodRowProps) {
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
    if (!onChange) return;

    if (
      selected?.term !== term ||
      selected?.name !== name ||
      selected?.quantity !== quantity
    ) {
      onChange({ term, name, quantity });
    }
  }, [term, name, quantity, selected, onChange]);

  return (
    <div className="w-[70%] flex justify-between text-sm text-[var(--accent)]">
      <div>{term}</div>
      <div className="text-[var(--accent)]">
        {quantity ?? ""}
      </div>
    </div>
  );
}
