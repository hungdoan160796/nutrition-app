"use client";

import { getNutrientById } from "@/lib/nutrientRegistry";

type Props = {
  nutrients: Record<string, number>;
  grams?: number;
};

export default function FoodNutrients({ nutrients, grams }: Props) {
  const entries = Object.entries(nutrients ?? {});

  if (!entries.length) {
    return (
      <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">
        No nutrient information available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {entries.map(([key, amount]) => {
        const def = getNutrientById(key);
        const label = def?.label ?? key;
        const unit = def?.unit ?? "";

        // amount is per 100g in many data shapes; treat as per-100g unless grams omitted
        const displayAmount = grams ? (amount * grams) / 100 : amount;

        return (
          <div
            key={key}
            className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-3 text-sm"
          >
            <div className="flex justify-between items-baseline">
              <div className="font-medium text-[var(--foreground)] text-xs">
                {label}
              </div>
              <div className="text-[var(--foreground)] text-xs">
                {Number.isFinite(displayAmount) ? (
                  <>{Math.round(displayAmount * 100) / 100} {unit}</>
                ) : (
                  "-"
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
