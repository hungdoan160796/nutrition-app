"use client";

import { getNutrientById } from "@/lib/nutrientRegistry";

type NutrientMap = Record<string, number>;

type Props = {
  nutrients?: NutrientMap | null;
  servingSize: number;
  amount: number;
};

export default function nutrients({
  nutrients,
  servingSize,
  amount,
}: Props) {
  const safe: NutrientMap = nutrients ?? {};

  const entries = (Object.entries(safe) as [keyof NutrientMap, number][])
    .filter(([, v]) => Number.isFinite(v));

  if (!entries.length || !Number.isFinite(servingSize) || servingSize <= 0) {
    return (
      <div className="rounded-xl p-4 border bg-[var(--background)] text-sm text-neutral-400">
        No nutrient information available
      </div>
    );
  }

  const ratio =
    Number.isFinite(amount) && amount > 0
      ? amount / servingSize
      : 1;

  return (
    <div className="grid grid-cols-1 gap-3">
      {entries.map(([key, baseAmount]: [keyof NutrientMap, number]) => {
        const def = getNutrientById(String(key));
        const label = def?.label ?? String(key);
        const unit = def?.unit ?? "";

        const displayAmount = baseAmount * ratio;

        return (
          <div
            key={String(key)}
            className="rounded-xl bg-[var(--background)] border border-[var(--border)] p-3 text-sm"
          >
            <div className="flex justify-between items-baseline">
              <div className="font-medium text-[var(--foreground)] text-xs">
                {label}
              </div>
              <div className="text-[var(--foreground)] text-xs">
                {Number.isFinite(displayAmount)
                  ? `${Math.round(displayAmount * 100) / 100} ${unit}`
                  : "-"}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
