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
  const [foodTerm, setFoodTerm] = useState("");
  const [grams, setGrams] = useState("");

  const allFoods = foods as unknown as Food[];
  const groupFoods = activeGroup
    ? allFoods.filter(f => f.group === activeGroup)
    : [];

  async function handleAdd() {
    if (!foodTerm || !grams) return;

    await logFood(foodTerm, Number(grams));
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
              className="aspect-square rounded-xl bg-[var(--muted)] flex items-center justify-center font-semibold capitalize"
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
                setFoodTerm("");
              }}
              className="text-sm text-[var(--accent)]"
            >
              ← Back
            </button>
            <h2 className="text-lg font-semibold capitalize">{activeGroup}</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            {groupFoods.map(f => (
              <button
                key={f.id}
                onClick={() => setFoodTerm(f.term)}
                className={`p-3 rounded-lg text-left ${
                  foodTerm === f.term
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--muted)]"
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
        className="w-full p-3 rounded bg-[var(--muted)] text-[var(--foreground)]"
        value={grams}
        onChange={e => setGrams(e.target.value)}
      />

      <button
        className="w-full p-3 rounded bg-[var(--accent)] text-black font-semibold disabled:opacity-50"
        disabled={!foodTerm || !grams}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
