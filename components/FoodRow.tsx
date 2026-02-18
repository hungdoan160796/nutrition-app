// components/FoodRow.tsx
"use client";

import { useEffect, useMemo } from "react";

type FoodCatalogItem = {
  term: string;
  name: string;
};

type FoodFromDB = {
  term: string;
  name: string;
  grams?: number;
  measurement?: number;
  servingSize?: number;
  servingSizeUnit?: string;
};

type SelectedFood = {
  name: string;
  term: string;
  quantity?: number;
  unit?: string;
};

type FoodRowProps = {
  food: FoodFromDB;
  selected?: SelectedFood;
  onChange?: (entry: SelectedFood) => void;
  catalog?: FoodCatalogItem[];
};

const normalize = (s?: string) => (s ?? "").trim().toLowerCase();

export default function FoodRow({
  food,
  selected,
  onChange,
  catalog,
}: FoodRowProps) {
  const normalizedName = normalize(food.name);

  const foodsSelected = (catalog ?? []) as FoodCatalogItem[];

  const catalogFood = useMemo(() => {
    return foodsSelected.find((f) => normalize(f.name) === normalizedName);
  }, [normalizedName, foodsSelected]);

  const term = catalogFood?.term ?? normalizedName;
  const name = catalogFood?.name ?? food.name;

  const quantity =
    typeof food.grams === "number"
      ? food.grams
      : typeof food.measurement === "number"
      ? food.measurement
      : typeof food.servingSize === "number"
      ? food.servingSize
      : undefined;

  const unit =
    food.servingSizeUnit ??
    (typeof food.grams === "number" ? "g" : undefined);

  useEffect(() => {
    if (!onChange) return;

    if (
      selected?.term !== term ||
      selected?.name !== name ||
      selected?.quantity !== quantity ||
      selected?.unit !== unit
    ) {
      onChange({ term, name, quantity, unit });
    }
  }, [term, name, quantity, unit, selected, onChange]);

  return (
    <div className="w-[70%] flex justify-between text-sm text-[var(--accent)]">
      <div className="w-[80%]">{term}</div>
      <div className="text-[var(--accent)]">
        {quantity != null ? `${quantity}${unit ? ` ${unit}` : ""}` : ""}
      </div>
    </div>
  );
}
