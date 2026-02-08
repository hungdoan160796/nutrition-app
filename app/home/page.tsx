"use client";

import { useEffect, useState } from "react";
import NutrientCard from "@/components/NutrientCard";
import ProgressRing from "@/components/ProgressRing";
import { getWeeklyProgress, type WeeklyProgress } from "@/lib/nutritionEngine";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/app/providers/AuthProviders";
import { useRouter } from "next/navigation";
// app/home/page.tsx

type Theme = string;

const THEME_REGEX = /data[-–]theme\s*=\s*"([^"]+)"/g;

const MACROS = ["protein", "fat", "carbohydrate"];
const MICROS = [
  "vitamin_a",
  "vitamin_k",
  "vitamin_e",
  "calcium",
  "potassium",
  "zinc",
  "vitamin_c",
  "folate",
  "vitamin_b12",
  "fiber",
  "iron",
  "magnesium",
  "sodium",
  "vitamin_d",
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

  if (loading) return null;

  // load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
      setTheme(saved);
    }
  }, []);

  // apply theme
  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // read themes from themes.md
  useEffect(() => {
    (async () => {
      const res = await fetch("/themes.md");
      const text = await res.text();

      const found = new Set<string>();
      let match: RegExpExecArray | null;

      while ((match = THEME_REGEX.exec(text))) {
        found.add(match[1]);
      }

      setThemes(Array.from(found).sort());
    })();
  }, []);

  // nutrition data
  useEffect(() => {
    (async () => {
      const data = await getWeeklyProgress();
      setProgress(data);
    })();
  }, []);

  if (!progress) return <div className="p-4">Loading…</div>;

  const calories = progress.all.find((n) => n.id === "calories");
  const macros = progress.all.filter((n) => MACROS.includes(n.id));
  const micros = progress.all.filter((n) => MICROS.includes(n.id));

  const microAvg =
    micros.length === 0
      ? 0
      : Math.round(
          (micros.reduce((sum, n) => sum + n.progress, 0) /
            micros.length) *
            100
        ) / 100;

  return (
    <div className="p-4 pb-24 space-y-6">
      {/* Theme selector */}
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
        <h2 className="text-sm uppercase text-neutral-400">Calories</h2>
        {calories && <NutrientCard {...calories} />}
      </section>

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

      <BottomNav />
    </div>
  );
}
