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
  return (
    <Link
      href={`/nutrients/${id}`}
      className={`rounded-xl bg-neutral-900 ${
        compact ? "p-2" : "p-4"
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`font-medium ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {name}
        </span>
        <span className="text-xs text-neutral-400">
          {progress}%
        </span>
      </div>

      <div
        className={`mt-2 bg-neutral-800 rounded ${
          compact ? "h-1.5" : "h-2"
        }`}
      >
        <div
          className="bg-emerald-500 rounded h-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  );
}
