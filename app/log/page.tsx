"use client";

import { useState } from "react";
import { searchFoods } from "@/lib/foodSearch";
import { logFood } from "@/lib/nutritionEngine";
import { useRouter } from "next/navigation";
import { updateDB } from "@/lib/db";

export default function LogFoodPage() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [foodId, setFoodId] = useState("");
  const [grams, setGrams] = useState("");

  function handleSearch(q: string) {
    setQuery(q);
    setResults(searchFoods(q, 40)); // CHUNK SIZE
  }
  async function handleAdd() {
    await logFood(foodId, Number(grams));
    router.push("/");
    router.refresh();
  }


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Log Food</h1>

      <input
        className="w-full p-3 rounded bg-neutral-900"
        placeholder="Search food…"
        value={query}
        onChange={e => handleSearch(e.target.value)}
      />

      <div className="max-h-64 overflow-y-auto space-y-2">
        {results.map(f => (
          <button
            key={f.id}
            onClick={() => {
              setFoodId(f.id);
              setQuery(f.name);
              setResults([]);
            }}
            className="block w-full text-left p-2 rounded bg-neutral-900"
          >
            {f.name}
          </button>
        ))}
      </div>

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
