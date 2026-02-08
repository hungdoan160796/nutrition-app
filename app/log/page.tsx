"use client";

import { useEffect, useState } from "react";
import { logFood } from "@/lib/nutritionEngine";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/BottomNav";

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
  name: string;
  group: FoodGroup;
  nutrients: Record<string, number>; // per 100g
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

  const [foods, setFoods] = useState<Food[]>([]);
  const [activeGroup, setActiveGroup] = useState<FoodGroup | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState("");

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then(setFoods);
  }, []);

  const groupFoods = activeGroup
    ? foods.filter((f) => f.group === activeGroup)
    : [];

  async function handleAdd() {
    if (!selectedFood || !grams) return;

    await logFood(
      {
        term: selectedFood.term,
        name: selectedFood.name,
        nutrients: selectedFood.nutrients, // per 100g
      },
      Number(grams)
    );

    router.push("/home");
    router.refresh();
  }



  return (
    <div className="pb-24">
      <div className="p-4 space-y-4">
        {/* Food Groups */}
        <div className="flex gap-2 flex-wrap">
          {FOOD_GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => {
                setActiveGroup(group);
                setSelectedFood(null);
              }}
              className={`px-3 py-1 rounded-full text-sm border ${
                activeGroup === group ? "bg-primary text-white" : ""
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Food List */}
        {groupFoods.length > 0 && (
          <div className="space-y-2">
            {groupFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => setSelectedFood(food)}
                className={`w-full text-left px-3 py-2 rounded-lg border ${
                  selectedFood?.id === food.id
                    ? "border-primary"
                    : ""
                }`}
              >
                {food.name}
              </button>
            ))}
          </div>
        )}

        {/* Grams Input */}
        {selectedFood && (
          <div className="space-y-3">
            <div className="font-medium">{selectedFood.name}</div>

            <input
              type="number"
              placeholder="Grams eaten"
              value={grams}
              onChange={(e) => setGrams(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />

            <button
              onClick={handleAdd}
              className="w-full rounded-lg bg-primary py-2 text-white font-medium"
            >
              Log food
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}