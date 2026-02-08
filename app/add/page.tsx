"use client";

import { useEffect, useState } from "react";
import BottomNav from "@/components/BottomNav";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";


type FoodGroup =
  | "protein"
  | "vegetable"
  | "fruit"
  | "grain"
  | "dairy"
  | "fat"
  | "seasonings"
  | "starch";

type USDARawFood = {
  fdcId: number;
  description: string;
};

export default function AddFoodPage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<USDARawFood[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function searchFoods() {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/foods/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.foods || []);
    } catch {
      setError("Failed to search foods");
    } finally {
      setLoading(false);
    }
  }

  async function addFood(food: USDARawFood) {
    setAddingId(food.fdcId);
    setError(null);

    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/foods/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fdcId: food.fdcId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      router.push("/log");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to add food");
    } finally {
      setAddingId(null);
    }
  }


  return (
    <div className="p-4 pb-24 space-y-4">
      <h1 className="text-xl font-semibold">Add Food</h1>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search foods"
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={searchFoods}
          disabled={loading}
          className="px-4 rounded bg-primary text-white"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="divide-y">
        {results.map((food) => (
          <li
            key={food.fdcId}
            className="py-3 flex justify-between items-center"
          >
            <span>{food.description}</span>
            <button
              onClick={() => addFood(food)}
              disabled={addingId === food.fdcId}
              className="text-sm border rounded px-3 py-1"
            >
              {addingId === food.fdcId ? "Adding…" : "Add"}
            </button>
          </li>
        ))}
      </ul>

      <BottomNav />
    </div>
  );
}
