"use client";

import { useEffect, useState } from "react";
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
  measurement: string; // 👈 comes from Blob (e.g. "grams", "ml", "tbsp")
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
  const [loading, setLoading] = useState(true);

  const [activeGroup, setActiveGroup] = useState<FoodGroup | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/foods/list");
      const data = await res.json();
      setFoods(data);
      setLoading(false);
    })();
  }, []);

  const groupFoods = activeGroup
    ? foods.filter(f => f.group === activeGroup)
    : [];

  async function handleAdd() {
    if (!selectedFood || !amount) return;

    await logFood(selectedFood.term, Number(amount));
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <div className="p-4">Loading foods…</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Log Food</h1>

      {/* GROUP SELECT */}
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

      {/* FOOD SELECT */}
      {activeGroup && (
        <>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveGroup(null);
                setSelectedFood(null);
                setAmount("");
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
                onClick={() => setSelectedFood(f)}
                className={`p-3 rounded-lg text-left ${
                  selectedFood?.id === f.id
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

      {/* AMOUNT INPUT */}
      {selectedFood && (
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            step="any"
            placeholder="Amount"
            className="flex-1 p-3 rounded bg-[var(--muted)] text-[var(--foreground)]"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <span className="text-sm text-[var(--muted-foreground)]">
            {selectedFood.measurement}
          </span>
        </div>
      )}

      <button
        className="w-full p-3 rounded bg-[var(--accent)] text-black font-semibold disabled:opacity-50"
        disabled={!selectedFood || !amount}
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
}
