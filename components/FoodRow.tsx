"use client";

import { useEffect, useMemo, useState } from "react";

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

const normalize = (s: string) => s.trim().toLowerCase();

export default function FoodRow({
  food,
  selected,
  onChange,
}: FoodRowProps) {
  const [foodsSelected, setFoodsSelected] = useState<FoodCatalogItem[]>([]);

  useEffect(() => {
    fetch("/api/foods/list")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load foods");
        return res.json();
      })
      .then(setFoodsSelected)
      .catch(() => setFoodsSelected([]));
  }, []);

  const normalizedName = normalize(food.name);

  const catalogFood = useMemo(() => {
    return foodsSelected.find(
      (f) => normalize(f.name) === normalizedName
    );
  }, [foodsSelected, normalizedName]);

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
      <div>{quantity ?? ""}</div>
    </div>
  );
}
