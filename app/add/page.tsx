// app/add-food/page.tsx
"use client";

import BottomNav from "@/components/BottomNav";
import { useEffect, useState } from "react";

type FoodGroup =
  | "protein"
  | "vegetable"
  | "fruit"
  | "grain"
  | "dairy"
  | "fat"
  | "seasonings"
  | "starch";

const FOOD_GROUPS: FoodGroup[] = [
  "protein",
  "vegetable",
  "fruit",
  "grain",
  "dairy",
  "fat",
  "seasonings",
  "starch",
];

type USDARawFood = {
  fdcId: number;
  description: string;
  additionalDescriptions?: string;
  foodNutrients?: any[];
};

type StructuredFood = {
  id: string;
  group: FoodGroup;
  term?: string;
  name: string;
  nutrients: Record<string, number>;
};


export default function AddFoodPage() {
  const [usdaKey, setUsdaKey] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<USDARawFood[]>([]);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUsdaKey(localStorage.getItem("USDA_API_KEY") || "");
    setOpenaiKey(localStorage.getItem("OPENAI_API_KEY") || "");
  }, []);

  function saveKeys() {
    localStorage.setItem("USDA_API_KEY", usdaKey);
    localStorage.setItem("OPENAI_API_KEY", openaiKey);
  }

  async function searchFoods() {
    if (!query || !usdaKey) {
      setError("Missing USDA API key or query");
      return;
    }

    setError(null);

    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
          query
        )}&api_key=${usdaKey}`
      );
      const data = await res.json();
      setResults(data.foods || []);
    } catch {
      setError("Failed to search USDA");
    }
  }

    async function addFood(food: USDARawFood) {
        setAddingId(String(food.fdcId));
        setError(null);

        try {
            const res = await fetch("/api/foods/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                food,
                openaiKey, // send key to server
            }),
            });

            const text = await res.text();

            if (!res.ok) {
            console.error("Server error:", text);
            throw new Error(text);
            }

            console.log("Added successfully:", text);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to add food");
        } finally {
            setAddingId(null);
        }
    }


  return (
    <div style={{ padding: 16 }}>
      <h1>Add Food</h1>

      <div style={{ display: "grid", gap: 8, marginBottom: 16 }}>
        <input
          placeholder="USDA API Key"
          value={usdaKey}
          onChange={(e) => setUsdaKey(e.target.value)}
        />
        <input
          placeholder="OpenAI API Key"
          value={openaiKey}
          onChange={(e) => setOpenaiKey(e.target.value)}
        />
        <button onClick={saveKeys}>Save API Keys (local)</button>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search food"
          style={{ flex: 1 }}
        />
        <button onClick={searchFoods}>Search</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ marginTop: 16 }}>
        {results.map((food) => (
          <li
            key={food.fdcId}
            style={{
              borderBottom: "1px solid #ddd",
              padding: "8px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>{food.description}</div>

            <button
              onClick={() => addFood(food)}
              disabled={addingId === String(food.fdcId)}
            >
              {addingId === String(food.fdcId) ? "Adding…" : "Add"}
            </button>
          </li>
        ))}
      </ul>
    <BottomNav />
    </div>
  );
}
