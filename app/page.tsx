// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import NutrientCard from "@/components/NutrientCard";
import ProgressRing from "@/components/ProgressRing";
import { getWeeklyProgress } from "@/lib/nutritionEngine";


const MACROS = ["protein", "fat", "carbohydrate"];

export default function HomePage() {
  const [progress, setProgress] = useState<any>(null);

  useEffect(() => {
    getWeeklyProgress().then(setProgress);
  }, []);

  if (!progress) {
    return <div className="p-4">Loading…</div>;
  }
  const calories = progress.focus.find((n: any) => n.id === "calories");
  const macros = progress.focus.filter((n: any) =>
    MACROS.includes(n.id)
  );
  const micros = progress.focus.filter(
    (n: any) => !MACROS.includes(n.id)
  );

  if (!progress) {
    return <div className="p-4">Loading…</div>;
  }

  const microAvg =
    micros.length === 0
      ? 0
      : micros.reduce((sum: number, n: any) => sum + n.progress, 0) / micros.length;
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">This Week</h1>

      {/*calories*/}
      {macros.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm uppercase text-neutral-400">Calorie</h2>
          <div className="grid  gap-3">
            {calories && <NutrientCard key={calories.id} {...calories} />}
          </div>
        </section>
      )}
      {/* Macros */}
      {macros.length > 0 && (
        <section className="space-y-2">
          <h2 className="text-sm uppercase text-neutral-400">Macros</h2>
          <div className="grid grid-cols-3 gap-3">
            {macros.map((n: any) => (
              <NutrientCard key={n.id} {...n} />
            ))}
          </div>
        </section>
      )}
      {/* Micros */}
      <h2 className="text-sm uppercase text-neutral-400">Micros</h2>
      <div className="flex justify-center">
        <ProgressRing value={microAvg} />
      </div>
      {micros.length > 0 && (
        <section className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            {micros.map((n: any) => (
              <NutrientCard key={n.id} {...n} compact />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
