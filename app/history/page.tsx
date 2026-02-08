// app/history/page.tsx
"use client";

import { getDailyTargets } from "@/lib/recommendationEngine";
import { useEffect, useState } from "react";
import { getDB, initDB } from "@/lib/db";
import { updateDB } from "@/lib/db";
import FoodRow from "@/components/FoodRow";
import WeekChart from "@/components/WeekChart";
import BottomNav from "@/components/BottomNav";
await initDB();
const db = getDB();
const profile = db.userProfile;

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
      "vitamin_d"]
const WEEK_START = 2; // 1 = Sunday, 2 = Monday

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

function buildWeeks(db: any): WeekLog[] {
  const dates = Object.keys(db.foodLog || {}).sort();
  if (!dates.length) return [];

  const map = new Map<string, Map<string, DayLog>>();
  const targets = getDailyTargets(profile);

  console.log("Daily targets:", targets);

  for (const dateStr of dates) {
    const foods = db.foodLog[dateStr] ?? [];
    const date = new Date(dateStr);
    const weekStart = iso(startOfWeek(date));

    // 1️⃣ accumulate total intake per tracked micronutrient for the day
    const dailyTotals: Record<string, number> = {};

    for (const food of foods) {
      const nutrients = food.nutrients ?? {};
      for (const id of MICROS) {
        const amount = nutrients[id];
        if (typeof amount !== "number") continue;
        dailyTotals[id] = (dailyTotals[id] ?? 0) + amount;
      }
    }

    // 2️⃣ compute per-nutrient daily progress (%)
    const perNutrientProgress: number[] = [];

    for (const id of MICROS) {
      const target = targets[id];
      const intake = dailyTotals[id];

      if (typeof target !== "number" || typeof intake !== "number") {
        continue; // nutrient not tracked or not present that day
      }

      const progress = Math.min((intake / target) * 100, 100);
      perNutrientProgress.push(progress);

      console.log(
        `[${dateStr}] nutrient ${id}: intake=${intake}, target=${target}, progress=${progress.toFixed(
          2
        )}%`
      );
    }

    if (!perNutrientProgress.length) continue;

    // 3️⃣ average of nutrients for the day
    const dayAvg =
      Math.round(
        (perNutrientProgress.reduce((s, v) => s + v, 0) /
          perNutrientProgress.length) *
          100
      ) / 100;

    console.log(
      `[${dateStr}] day avg (${perNutrientProgress.length} nutrients): ${dayAvg}%`
    );

    if (!map.has(weekStart)) {
      map.set(weekStart, new Map());
    }

    map.get(weekStart)!.set(dateStr, {
      date: dateStr,
      foods,
      microAvg: dayAvg,
    });
  }
  // 4️⃣ simple weekly average (include missing days as 0%)
  const weeks: WeekLog[] = Array.from(map.entries())
    .map(([start, dayMap]) => {
      const base = new Date(start);

      const days: (DayLog | null)[] = Array.from({ length: 7 }, (_, i) => {
        const key = iso(addDays(base, i));
        const day = dayMap.get(key) ?? null;
        return day;
      });

      return { start, days };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
/*
  // 4️⃣ cumulative weekly average (skip missing days)
  const weeks: WeekLog[] = Array.from(map.entries())
    .map(([start, dayMap]) => {
      const base = new Date(start);
      let runningSum = 0;
      let runningCount = 0;

      const days: (DayLog | null)[] = Array.from({ length: 7 }, (_, i) => {
        const key = iso(addDays(base, i));
        const day = dayMap.get(key) ?? null;

        if (!day) return null;

        runningSum += day.microAvg;
        runningCount += 1;

        const cumulative =
          Math.round((runningSum / runningCount) * 100) / 100;

        console.log(
          `[week ${start}] day ${key}: cumulative avg=${cumulative}%`
        );

        return {
          ...day,
          microAvg: cumulative, // value shown on chart
        };
      });

      return { start, days };
    })
    .sort((a, b) => b.start.localeCompare(a.start));
*/
  return weeks;
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

export default function HistoryPage() {
  const [weeks, setWeeks] = useState<WeekLog[]>([]);

  const refresh = async () => {
    await initDB();
    setWeeks(buildWeeks(getDB()));
  };

  useEffect(() => {
    refresh();
  }, []);

  const deleteFood = async (date: string, index: number) => {
    const ok = window.confirm("Delete this food entry?");
    if (!ok) return;

    await updateDB((db) => {
      db.foodLog[date].splice(index, 1);
      if (db.foodLog[date].length === 0) {
        delete db.foodLog[date];
      }
    });
    refresh();
  };

  const deleteDay = async (date: string) => {
    const ok = window.confirm(
      "Delete this entire day and all its foods?"
    );
    if (!ok) return;

    await updateDB((db) => {
      delete db.foodLog[date];
    });
    refresh();
  };
  useEffect(() => {
    (async () => {
      await initDB();
      const db = getDB();
      setWeeks(buildWeeks(db));
    })();
  }, []);

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-xl font-semibold">History</h1>

      {weeks.map((week) => {
        const visibleDays = week.days.filter(
          (d) => d !== null
        ) as DayLog[];
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
                    {missingCount} day
                    {missingCount > 1 ? "s" : ""} with no data
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
                      <div>
                        <h3 className="text-xs font-medium items-center text-[var(--foreground)]">
                          {day.date}
                        </h3> 
                      </div>
                      <div className="text-xs text-muted-foreground items-center">
                          Quantity
                      </div>
                    </div>
                    <button
                      className="text-xs text-red-500 items-center"
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
                        <FoodRow food={food} />
                        <button
                          className="text-xs text-red-500"
                          onClick={() =>
                            deleteFood(day.date, i)
                          }
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