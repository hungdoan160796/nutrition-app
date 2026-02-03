// app/add/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { searchUsdaFoods } from '@/lib/usdaSearch';
import { addUsdaFood } from '@/lib/addUsdaFood'

type Nutrients = {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type UsdaFood = {
  fdcId: number;
  description: string;
  brandName?: string;
  foodNutrients?: any[];
};

export default function AddIngredientPage() {
  const [mode, setMode] = useState<'usda' | 'manual'>('usda');

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Add Ingredient</h1>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('usda')}
          className={`px-4 py-2 rounded ${
            mode === 'usda' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)]'
          }`}
        >
          Search USDA
        </button>
        <button
          onClick={() => setMode('manual')}
          className={`px-4 py-2 rounded ${
            mode === 'manual' ? 'bg-[var(--foreground)] text-[var(--background)]' : 'bg-[var(--background)] text-[var(--foreground)]'
          }`}
        >
          Manual Entry
        </button>
      </div>

      {mode === 'usda' ? <UsdaSearch /> : <ManualForm />}
    </div>
  );
}

function UsdaSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UsdaFood[]>([]);
  const [loading, setLoading] = useState(false);

  const runSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const foods = await searchUsdaFoods(query);
    setResults(foods);
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1 text-[var(--foreground)] bg-[var(--background)]"
          placeholder="Search food (e.g. grilled chicken breast)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && runSearch()}
        />
        <button
          onClick={runSearch}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-sm text-gray-500">Searching…</p>}

      <ul className="space-y-2">
        {results.map((food) => (
          <li
            key={food.fdcId}
            className="border rounded p-3 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{food.description}</p>
              <p className="text-sm text-gray-500">
                {food.brandName ?? 'USDA'}
              </p>
            </div>
            <button
              onClick={() =>
                addUsdaFood({
                  food,
                  measurement: 'grams',
                  term: query,
                })
              }
              className="text-sm underline"
            >
              Add
            </button>

          </li>
        ))}
      </ul>
    </div>
  );
}

function ManualForm() {
  const [name, setName] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [nutrients, setNutrients] = useState<Nutrients>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  const submit = () => {
    console.log({
      name,
      measurement,
      nutrients,
    });
  };

  return (
    <div className="space-y-4">
      <input
        className="border rounded px-3 py-2 w-full text-[var(--foreground)] bg-[var(--background)]"
        placeholder="Ingredient name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border rounded px-3 py-2 w-full text-[var(--foreground)] bg-[var(--background)]"
        placeholder="Measurement (e.g. 100 g)"
        value={measurement}
        onChange={(e) => setMeasurement(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3 text-[var(--foreground)] bg-[var(--background)]">
        <NumberInput
          label="Calories"
          value={nutrients.calories}
          onChange={(v) => setNutrients({ ...nutrients, calories: v })}
        />
        <NumberInput
          label="Protein (g)"
          value={nutrients.protein}
          onChange={(v) => setNutrients({ ...nutrients, protein: v })}
        />
        <NumberInput
          label="Carbs (g)"
          value={nutrients.carbs}
          onChange={(v) => setNutrients({ ...nutrients, carbs: v })}
        />
        <NumberInput
          label="Fat (g)"
          value={nutrients.fat}
          onChange={(v) => setNutrients({ ...nutrients, fat: v })}
        /> 
      </div>

      <button
        onClick={submit}
        className="bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded"
      >
        Add Ingredient
      </button>
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="text-sm space-y-1">
      <span>{label}</span>
      <input
        type="number"
        className="border rounded px-3 py-2 w-full"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
