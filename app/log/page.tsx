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
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    // Fetch foods filtered by group with pagination whenever activeGroup or page changes
    if (!activeGroup) return;
    if (!user) return;

    let aborted = false;

    (async () => {
      setLoadingFoods(true);
      setFetchError(null);
      try {
        const token = await user.getIdToken();
        const res = await fetch(
          `/api/foods?group=${encodeURIComponent(activeGroup)}&page=${page}&limit=${limit}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (!aborted) setFetchError(body?.error ?? `HTTP ${res.status}`);
          return;
        }

        const data = await res.json();
        if (aborted) return;
        setFoods(data?.foods ?? []);
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

        {/* Foods + Nutrients layout */}
        {activeGroup && (
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 space-y-2">
              {loadingFoods ? (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">Loading foods…</div>
              ) : fetchError ? (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-red-500">{fetchError}</div>
              ) : groupFoods.length > 0 ? (
                groupFoods.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full text-left px-3 py-2 rounded-lg border bg-[var(--background)] border-[var(--border)] ${
                      selectedFood?.id === food.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="font-medium text-[var(--foreground)]">
                      {food.name}
                    </div>
                  </button>
                ))
              ) : (
                <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">No foods in this group.</div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1 || loadingFoods}
                  className="px-3 py-1 rounded border bg-[var(--background)]"
                >
                  Prev
                </button>
                <div className="text-sm text-neutral-500">{page}</div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={loadingFoods}
                  className="px-3 py-1 rounded border bg-[var(--background)]"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="col-span-3">
              {selectedFood ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between flex-row">
                    <div>
                      <input
                        type="number"
                        placeholder="Grams eaten"
                        value={grams}
                        onChange={(e) => setGrams(e.target.value)}
                        className="w-[100%] rounded-lg border px-3 py-2 bg-transparent"
                      />
                    </div>
                    <button
                      onClick={handleAdd}
                      className="w-[60%] rounded-lg bg-primary py-2 px-4 text-white font-medium"
                    >
                      Log food
                    </button>
                  </div>

                  <div>
                    <h3 className="text-sm text-neutral-400 uppercase mb-2">Nutrients</h3>
                    <FoodNutrients nutrients={selectedFood.nutrients} grams={Number(grams) || undefined} />
                  </div>
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