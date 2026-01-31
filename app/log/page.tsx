"use client";

import { useState } from "react";
import foods from "@/data/foods_selected.json";
import { logFood } from "@/lib/nutritionEngine";
import { useRouter } from "next/navigation";

type FoodGroup =
  | "starch"
  | "meat"
  | "fish"
  | "seafood"
  | "vegetables"
  | "legumes"
  | "fruits"
  | "condiments"
  | "seasonings";

type Food = {
  id: string;
  term: string;
  group: FoodGroup;
};

const FOOD_GROUPS: FoodGroup[] = [
  "starch",
  "meat",
  "fish",
  "seafood",
  "vegetables",
  "legumes",
  "fruits",
  "condiments",
  "seasonings",
];

export default function LogFoodPage() {
  const router = useRouter();

  const [activeGroup, setActiveGroup] = useState<FoodGroup | null>(null);
  const [foodId, setFoodId] = useState("");
  const [grams, setGrams] = useState("");

  const allFoods = foods as unknown as Food[];
  const groupFoods = activeGroup
    ? allFoods.filter(f => f.group === activeGroup)
    : [];

  async function handleAdd() {
    await logFood(foodId, Number(grams));
    router.push("/");
    router.refresh();
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Log Food</h1>

      {!activeGroup && (
        <div className="grid grid-cols-3 gap-3">
          {FOOD_GROUPS.map(g => (
            <button
              key={g}
              onClick={() => setActiveGroup(g)}
              className="aspect-square rounded-xl bg-neutral-900 flex items-center justify-center font-semibold capitalize"
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {activeGroup && (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveGroup(null);
                setFoodId("");
              }}
              className="text-sm text-neutral-400"
            >
              ← Back
            </button>
            <h2 className="text-lg font-semibold capitalize">{activeGroup}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {groupFoods.map(f => (
              <button
                key={f.id}
                onClick={() => setFoodId(f.id)}
                className={`p-3 rounded-lg text-left ${
                  foodId === f.id
                    ? "bg-emerald-600 text-black"
                    : "bg-neutral-900"
                }`}
              >
                {f.term}
              </button>
            ))}
          </div>
        </>
      )}

      <input
        type="number"
        placeholder="Grams eaten"
        className="w-full p-3 rounded bg-neutral-900"
        value={grams}
        onChange={e => setGrams(e.target.value)}
      />

      <button
        className="w-full p-3 rounded bg-emerald-600 text-black font-semibold disabled:opacity-50"
        disabled={!foodId || !grams}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
