"use client";

import { useEffect, useState } from "react";
import { logFood } from "@/lib/nutritionEngine";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProviders";
import BottomNav from "@/components/BottomNav";
import FoodNutrients from "@/components/FoodNutrients";

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

type Nutrients = {
  vitamin_a: number;
  fat: number;
  carbohydrate: number;
  calories: number;
  calcium: number;
  potassium: number;
  zinc: number;
  protein: number;
  iron: number;
  magnesium: number;
  sodium: number;
  vitamin_c: number;
  folate: number;
  vitamin_b12: number;
  vitamin_d: number;
};

type Food = {
  id: string; // Firestore doc id (fdcId as string)
  fdcId: number;
  description: string;
  brandName: string;
  group: FoodGroup;
  nutrients: any; // normalized, per 100g
  servingSize: number; // grams per serving
  servingSizeUnit: string; // usually "g"
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

  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState<"g" | "serving">("g");

  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!activeGroup || !user) return;

    let aborted = false;

    (async () => {
      setLoadingFoods(true);
      setFetchError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `/api/foods?group=${encodeURIComponent(
            activeGroup
          )}&page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (!aborted)
            setFetchError(body?.error ?? `HTTP ${res.status}`);
          return;
        }

        const data = await res.json();
        if (!aborted) setFoods(data?.foods ?? []);
      } catch (e: any) {
        if (!aborted) setFetchError(String(e?.message ?? e));
      } finally {
        if (!aborted) setLoadingFoods(false);
      }
    })();

    return () => {
      aborted = true;
    };
  }, [activeGroup, page, limit, user]);

  const groupFoods = activeGroup
    ? foods.filter((f) => f.group === activeGroup)
    : [];

  const computedAmount = (() => {
    if (!selectedFood) return 0;
    const value = Number(amount);
    if (!value || value <= 0) return 0;

    if (unit === "g") return value;

    const servingSize = Number(selectedFood.servingSize) || 0;
    return servingSize > 0 ? value * servingSize / 100 : 0;
  })();

  async function handleAdd() {
    if (!selectedFood || !computedAmount) return;

    await logFood(
      {
        term: selectedFood.description,
        name: selectedFood.brandName,
        nutrients: selectedFood.nutrients,
        measurement: selectedFood.servingSizeUnit,
        amount: computedAmount,
        standardAmount: selectedFood.servingSize,
      },
    );

    router.push("/home");
    router.refresh();
  }

  return (
    <div className="pb-24">
      <div className="p-4 space-y-4">
        <div className="flex gap-2 flex-wrap justify-center">
          {FOOD_GROUPS.map((group) => (
            <button
              key={group}
              onClick={() => {
                setActiveGroup(group);
                setSelectedFood(null);
                setPage(1);
              }}
              className={`px-3 py-1 rounded-full text-sm border bg-[var(--background)] border-[var(--border)] ${
                activeGroup === group ? "bg-primary text-white" : ""
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        {activeGroup && (
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 space-y-2">
              {loadingFoods ? (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">
                  Loading foods…
                </div>
              ) : fetchError ? (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-red-500">
                  {fetchError}
                </div>
              ) : groupFoods.length > 0 ? (
                groupFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => {
                      setSelectedFood(food);
                      setAmount("");
                      setUnit("g");
                      console.log(food);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg border bg-[var(--background)] border-[var(--border)] ${
                      selectedFood?.id === food.id
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                  >
                    <div className="font-medium text-[var(--foreground)]">
                      {food.description ?? food.brandName}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">
                  No foods in this group.
                </div>
              )}

              <div className="flex items-center justify-center gap-2 mt-2">
                <button
                  onClick={() =>
                    setPage((p) => Math.max(1, p - 1))
                  }
                  disabled={page <= 1 || loadingFoods}
                  className="px-3 py-1 rounded border bg-[var(--background)]"
                >
                  Prev
                </button>
                <div className="text-sm text-neutral-500">
                  {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingFoods}
                  className="px-3 py-1 rounded border bg-[var(--background)]"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="col-span-2">
              {selectedFood ? (
                <div className="w-[100%] space-y-3">
                  <div className="w-[100%] flex items-center gap-2">
                    <input
                      placeholder={
                        unit === "g"
                          ? "Grams"
                          : "Servings"
                      }
                      value={amount}
                      onChange={(e) =>
                        setAmount(e.target.value)
                      }
                      className="w-[50%] rounded-lg border px-3 py-2 bg-transparent"
                    />

                    <select
                      value={unit}
                      onChange={(e) =>
                        setUnit(
                          e.target.value as "g" | "serving"
                        )
                      }
                      className="w-[50%] rounded-lg border px-3 py-2 bg-transparent"
                    >
                      <option value="g">g</option>
                    </select>

                    <button
                      onClick={handleAdd}
                      disabled={!computedAmount}
                      className="rounded-lg bg-primary py-2 px-4 font-medium"
                    >
                      Add
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <h3 className="text-sm text-neutral-400 uppercase mb-2">
                      Nutrients{" "}
                      {computedAmount
                        ? `for ${computedAmount} ${selectedFood.servingSizeUnit}`
                        : "per 100g"}
                    </h3>
                  </div>

                  <FoodNutrients
                    nutrients={selectedFood.nutrients}
                    servingSize={selectedFood.servingSize}
                    amount={computedAmount ?? selectedFood.servingSize}
                  />
                </div>
              ) : (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">
                  Select a food to see its nutrients
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
