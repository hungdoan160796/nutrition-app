"use client";

import { useEffect, useMemo, useState } from "react";
import NutrientCard from "@/components/NutrientCard";
import ProgressRing from "@/components/ProgressRing";
import { getWeeklyProgress, type WeeklyProgress } from "@/lib/nutritionEngine";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/app/providers/AuthProviders";
import { useRouter } from "next/navigation";

type Theme = string;

const THEME_REGEX = /data[-–]theme\s*=\s*"([^"]+)"/g;

const MACROS = ["Protein", "Fat", "Carbs"];
const MICROS = [
  "Vitamin A",
  "Vitamin K",
  "Vitamin E",
  "Calcium",
  "Potassium",
  "Zinc",
  "Vitamin C",
  "Vitamin B6",
  "Vitamin B12",
  "Fiber",
  "Iron",
  "Magnesium",
  "Sodium",
  "Vitamin D",
];

export default function HomePage() {
  const [progress, setProgress] = useState<WeeklyProgress | null>(null);
  const [theme, setTheme] = useState<Theme>("");
  const [themes, setThemes] = useState<Theme[]>([]);

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!theme) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.removeItem("theme");
      return;
    }

    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const res = await fetch("/themes.md");
        if (!res.ok) return;

        const text = await res.text();
        const found = new Set<string>();
        let match: RegExpExecArray | null;

        while ((match = THEME_REGEX.exec(text))) {
          found.add(match[1]);
        }

        setThemes(Array.from(found).sort());
      } catch {}
    };

    loadThemes();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const data = await getWeeklyProgress();
        setProgress(data);
      } catch {
        setProgress(null);
      }
    };

    loadProgress();
  }, []);

  if (loading) return null;

  const nutrients = progress?.all ?? [];

  const getNutrient = (id: string) =>
    nutrients.find((n) => n.id === id) ?? {
      id,
      name: id,
      value: 0,
      goal: 0,
      unit: "",
      progress: 0,
    };

  const calories = getNutrient("Calories");

  const macros = MACROS.map(getNutrient);
  const micros = MICROS.map(getNutrient);

  const microAvg =
    micros.length === 0
      ? 0
      : Math.round(
          (micros.reduce((sum, n) => sum + (n.progress ?? 0), 0) /
            micros.length) *
            100
        ) / 100;

  return (
    <div className="p-4 pb-24 space-y-6">
      <div className="flex items-center gap-2">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="border rounded px-2 py-1 bg-transparent"
        >
          <option value="">System</option>
          {themes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <h1 className="text-xl font-semibold">This Week</h1>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Macros</h2>
        <div className="grid grid-cols-3 gap-3">
          {macros.map((n) => (
            <NutrientCard key={n.id} {...n} />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Micros</h2>
        <div className="flex justify-center">
          <ProgressRing value={microAvg} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {micros.map((n) => (
            <NutrientCard key={n.id} {...n} compact />
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm uppercase text-neutral-400">Calories</h2>
          <div className="grid gap-3">
            <NutrientCard {...calories} />
          </div>
      </section>

      <BottomNav />
    </div>
  );
}
