// app/components/NutrientCard.tsx
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  progress: number;
  compact?: boolean;
};

export default function NutrientCard({
  id,
  name,
  progress,
  compact = false,
}: Props) {
  // components/NutrientCard.tsx
  return (
    <Link
      href={`/nutrients/${id}`}
      className={`rounded-xl bg-[var(--background)] border border-[var(--border)] ${
        compact ? "p-2" : "p-4"
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`font-medium text-[var(--foreground)] ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {name}
        </span>

        <span className="text-xs text-[var(--foreground)]">
          {progress}%
        </span>
      </div>

      <div
        className={`mt-2 bg-[var(--border)] rounded ${
          compact ? "h-1.5" : "h-2"
        }`}
      >
        <div
          className="bg-[var(--accent)] rounded h-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  );

}
