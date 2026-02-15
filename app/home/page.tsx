"use client";

import { useEffect, useState } from "react";
import NutrientCard from "@/components/NutrientCard";
import { getNutrientById } from "@/lib/nutrientRegistry";
import ProgressRing from "@/components/ProgressRing";
import { getWeeklyProgress, type WeeklyProgress } from "@/lib/nutritionEngine";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/app/providers/AuthProviders";
import { useRouter } from "next/navigation";
import FoodNutrients from "@/components/FoodNutrients";
import { logFood } from "@/lib/nutritionEngine";

type Theme = string;


// use nutrient IDs (match `data/nutrients.json` and recommendation IDs)
const MACROS = ["protein", "fat", "carbohydrate"];
const MICROS = [
  "vitamin_a",
  "vitamin_k",
  "vitamin_e",
  "calcium",
  "potassium",
  "zinc",
  "vitamin_c",
  "vitamin_b6",
  "vitamin_b12",
  "fiber",
  "iron",
  "magnesium",
  "sodium",
  "vitamin_d",
];

export default function HomePage() {
  const [progress, setProgress] = useState<WeeklyProgress | null>(null);

  // --- food log UI state (merged from /app/log/page.tsx) ---
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

  const [foods, setFoods] = useState<Food[]>([]);
  const [activeGroup, setActiveGroup] = useState<FoodGroup | null>(null);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [grams, setGrams] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(50);
  const [loadingFoods, setLoadingFoods] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getWeeklyProgress();
        setProgress(data);
      } catch {
        setProgress(null);
      }
    };

    loadProgress();
  }, []);

  // Fetch foods when activeGroup or page changes
  useEffect(() => {
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

  const groupFoods = activeGroup ? foods.filter((f) => f.group === activeGroup) : [];

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

    // refresh progress after logging
    try {
      const data = await getWeeklyProgress();
      setProgress(data);
    } catch {
      // ignore
    }

    // clear selection
    setSelectedFood(null);
    setGrams("");
    setActiveGroup(null);
    setFoods([]);
  }

  if (loading) return null;

  const nutrients = progress?.all ?? [];

  const getNutrient = (id: string) =>
    nutrients.find((n) => n.id === id) ?? {
      id,
      name: getNutrientById(id)?.label ?? id,
      value: 0,
      goal: 0,
      unit: "",
      progress: 0,
    };

  const calories = getNutrient("calories");

  const macros = MACROS.map(getNutrient);
  const micros = MICROS.map(getNutrient);

  const microAvg =
    micros.length === 0
      ? 0
      : Math.round(
          (micros.reduce((sum, n) => sum + (n.progress ?? 0), 0) /
            micros.length) *
            100
        ) / 100;

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex items-center gap-2">
      </div>
      <h1 className="text-xl font-semibold">This Week</h1>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Macros</h2>
        <div className="grid grid-cols-3 gap-3">
          {macros.map((n) => (
            <NutrientCard key={n.id} {...n} />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Micros</h2>
        <div className="grid grid-cols-3 gap-2">
          {micros.map((n) => (
            <NutrientCard key={n.id} {...n} compact />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Calories</h2>
          <div className="grid gap-3">
            <NutrientCard {...calories} />
          </div>
      </section>

      <BottomNav />
    </div>
  );
}
