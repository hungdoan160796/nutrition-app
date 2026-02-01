"use client";

import { useEffect, useState } from "react";
import { getNutrientDetail } from "@/lib/nutritionEngine";
import { useParams } from "next/navigation";

export default function NutrientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const nutrientId = id; // MUST stay string (protein, fat, etc.)

  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    getNutrientDetail(nutrientId).then((res) => {
      if (cancelled) return;

      if (!res) {
        setData(null);
        setLoading(false);
        return;
      }

      // nutritionEngine returns contributors keyed by foodId
      const contributions = Object.values(
        res.contributions ?? {}
      ).filter((c: any) => c.amount > 0);

      setData({
        ...res,
        contributions,
      });

      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [nutrientId]);

  if (loading) {
    return <div className="p-4">Loading…</div>;
  }

  if (!data) {
    return (
      <div className="p-4 text-red-400">
        No data for this nutrient.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">{data.name}</h1>

      <div className="bg-[var(--muted)] text-[var(--foreground)] rounded-xl p-4 space-y-2">
        <div className="flex justify-between">
          <span>Progress</span>
          <span>{data.progress}%</span>
        </div>

        <div className="h-2 bg-[var(--muted)] rounded">
          <div
            className="h-2 bg-emerald-600 rounded"
            style={{ width: `${data.progress}%` }}
          />
        </div>

        <div className="text-sm text-neutral-400">
          {data.intake} / {data.target} {data.unit} this week
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm uppercase text-neutral-400">
          Top Contributors
        </h2>

        {data.contributions.length === 0 && (
          <p className="text-neutral-500 text-sm">
            No foods logged yet.
          </p>
        )}

        {data.contributions.map((c: any) => (
          <div
            key={c.foodId}
            className="flex justify-between bg-[var(--muted)] text-[var(--foreground)] p-3 rounded"
          >
            <span className="truncate">{c.foodName}</span>
            <span className="text-neutral-400">
              {c.amount.toFixed(2)} {data.unit}
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}
