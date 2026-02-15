// app/history/HistoryClient.tsx
"use client";

import { getDailyTargets } from "@/lib/recommendationEngine";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProviders";
import { getDB, initDB, updateDB } from "@/lib/db";
import FoodRow from "@/components/FoodRow";
import WeekChart from "@/components/WeekChart";
import BottomNav from "@/components/BottomNav";

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

const WEEK_START = 2;

type DayLog = {
  date: string;
  foods: any[];
  microAvg: number;
};

type WeekLog = {
  start: string;
  days: (DayLog | null)[];
};

function startOfWeek(date: Date) {
  const d = new Date(date);
  const diff = (d.getDay() - WEEK_START + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

async function buildWeeks(db: any): Promise<WeekLog[]> {
  const dates = Object.keys(db.foodLog || {}).sort();
  if (!dates.length) return [];

  const profile = db.userProfile;
  const targets = await getDailyTargets(profile);
  const map = new Map<string, Map<string, DayLog>>();

  for (const dateStr of dates) {
    const foods = db.foodLog[dateStr] ?? [];
    const date = new Date(dateStr);
    const weekStart = iso(startOfWeek(date));

    const dailyTotals: Record<string, number> = {};

    for (const food of foods) {
      // foods may store either a per-entry `nutrients` map (already scaled)
      // or `nutrientsPer100g` + `grams`. Support both shapes.
      const perEntry = food.nutrients ?? {};
      const per100g = food.nutrientsPer100g ?? {};
      for (const id of MICROS) {
        let amount: number | undefined = undefined;

        if (typeof perEntry[id] === "number") {
          amount = perEntry[id] as number;
        } else if (
          typeof per100g[id] === "number" &&
          typeof food.grams === "number"
        ) {
          amount = (per100g[id] as number) * (food.grams as number) / 100;
        }

        if (typeof amount !== "number") continue;
        dailyTotals[id] = (dailyTotals[id] ?? 0) + amount;
      }
    }

    const perNutrientProgress: number[] = [];

    for (const id of MICROS) {
      const target = targets[id];
      const intake = dailyTotals[id];
      if (typeof target !== "number" || typeof intake !== "number") continue;
      const progress = Math.min((intake / target) * 100, 100);
      perNutrientProgress.push(progress);
    }

    const dayAvg = perNutrientProgress.length
      ? Math.round(
          (perNutrientProgress.reduce((s, v) => s + v, 0) /
            perNutrientProgress.length) *
            100
        ) / 100
      : 0;

    if (!map.has(weekStart)) {
      map.set(weekStart, new Map());
    }

    map.get(weekStart)!.set(dateStr, {
      date: dateStr,
      foods,
      microAvg: dayAvg,
    });
  }

  return Array.from(map.entries())
    .map(([start, dayMap]) => {
      const base = new Date(start);

      const days: (DayLog | null)[] = Array.from({ length: 7 }, (_, i) => {
        const key = iso(addDays(base, i));
        return dayMap.get(key) ?? null;
      });

      return { start, days };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
}

function formatWeekRange(start: string) {
  const s = new Date(start);
  const e = addDays(s, 6);
  return `${s.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })} – ${e.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  })}`;
}

export default function HistoryClient() {
  const [weeks, setWeeks] = useState<WeekLog[]>([]);
  const { user, loading: authLoading } = useAuth();
  const [catalog, setCatalog] = useState<any[]>([]);

  const refresh = async () => {
    await initDB();
    const db = await getDB();
    // debug: log a small sample of the stored foodLog to the browser console
    try {
      // show up to 3 date entries and one sample food per date
      const sample = Object.entries(db.foodLog || {}).slice(0, 3).map(([d, foods]) => ({ date: d, count: (foods || []).length, sample: (foods || [])[0] }));
      // eslint-disable-next-line no-console
      console.log("DB foodLog sample:", sample);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("Failed to inspect db.foodLog", e);
    }

    // fetch catalog once (requires auth token)
    try {
      if (user) {
        const token = await user.getIdToken();
        const res = await fetch(`/api/foods?page=1&limit=200`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const body = await res.json();
          setCatalog(body?.foods ?? []);
        }
      }
    } catch (e) {
      // ignore catalog fetch errors; history still works from db.foodLog
    }

    setWeeks(await buildWeeks(db));
  };

  useEffect(() => {
    // wait until auth is resolved before attempting DB access to avoid
    // transient "User not authenticated" errors when the page first mounts
    if (!authLoading) {
      refresh();
    }
  }, [authLoading, user?.uid]);

  if (authLoading) {
    return (
      <div className="p-4">
        <h1 className="text-xl font-semibold">History</h1>
        <div className="mt-4 text-sm text-neutral-500">Loading history…</div>
        <BottomNav />
      </div>
    );
  }

  const deleteFood = async (date: string, index: number) => {
    if (!window.confirm("Delete this food entry?")) return;

    await updateDB((db) => {
      db.foodLog[date].splice(index, 1);
      if (db.foodLog[date].length === 0) {
        delete db.foodLog[date];
      }
    });

    refresh();
  };

  const deleteDay = async (date: string) => {
    if (!window.confirm("Delete this entire day and all its foods?")) return;

    await updateDB((db) => {
      delete db.foodLog[date];
    });

    refresh();
  };

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-xl font-semibold">History</h1>

      {weeks.map((week) => {
        const visibleDays = week.days.filter(Boolean) as DayLog[];
        const missingCount = week.days.length - visibleDays.length;

        return (
          <section
            key={week.start}
            className="rounded-xl border border-muted/40 p-4 space-y-4"
          >
            <header className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-medium">
                  {formatWeekRange(week.start)}
                </h2>
                {missingCount > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {missingCount} day{missingCount > 1 ? "s" : ""} with no data
                  </p>
                )}
              </div>
              <WeekChart days={week.days} />
            </header>

            <div className="space-y-4">
              {[...visibleDays].reverse().map((day) => (
                <div key={day.date} className="space-y-2">
                  <div className="flex flex-row items-center justify-between border-b pb-1 border-[var(--muted)]">
                    <div className="w-[70%] flex flex-row items-center justify-between">
                      <h3 className="text-xs font-medium text-[var(--foreground)]">
                        {day.date}
                      </h3>
                      <div className="text-xs text-muted-foreground">
                        Quantity
                      </div>
                    </div>
                    <button
                      className="text-xs text-red-500"
                      onClick={() => deleteDay(day.date)}
                    >
                      Delete day
                    </button>
                  </div>

                            <div className="space-y-1">
                              {day.foods.map((food, i) => (
                                <div
                                  key={i}
                                  className="flex flex-row items-center justify-between gap-2"
                                >
                                  <FoodRow food={food} catalog={catalog} />
                                  <button
                                    className="text-xs text-red-500"
                                    onClick={() => deleteFood(day.date, i)}
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <BottomNav />
    </div>
  );
}
