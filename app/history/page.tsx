// app/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getDB, initDB } from "@/lib/db";
import FoodRow from "@/components/FoodRow";
import WeekChart from "@/components/WeekChart";

const MACROS = ["protein", "fat", "carbohydrate"];
const WEEK_START = 1; // 0 = Sunday, 1 = Monday

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
  console.log("[startOfWeek]", { input: date, output: d });
  return d;
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

const addDays = (d: Date, n: number) => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

function buildWeeks(db: any): WeekLog[] {
  console.log("[buildWeeks] raw db", db);

  const dates = Object.keys(db.foodLog || {}).sort();
  console.log("[buildWeeks] dates", dates);

  if (!dates.length) return [];

  const map = new Map<string, Map<string, DayLog>>();

  for (const dateStr of dates) {
    const foods = db.foodLog[dateStr] ?? [];
    console.log("[buildWeeks] day foods", dateStr, foods);

    const date = new Date(dateStr);
    const weekStart = iso(startOfWeek(date));

    const micros = foods.flatMap((f: any) =>
      (f.progress?.focus ?? []).filter(
        (n: any) => !MACROS.includes(n.id)
      )
    );

    console.log("[buildWeeks] micros", dateStr, micros);

    const microAvg =
      micros.length === 0
        ? 0
        : Math.round(
            (micros.reduce((s: number, n: any) => s + n.progress, 0) /
              micros.length) *
              100
          ) / 100;

    console.log("[buildWeeks] microAvg", dateStr, microAvg);

    if (!map.has(weekStart)) {
      console.log("[buildWeeks] new week", weekStart);
      map.set(weekStart, new Map());
    }

    map.get(weekStart)!.set(dateStr, {
      date: dateStr,
      foods,
      microAvg,
    });
  }

  const weeks = Array.from(map.entries())
    .map(([start, dayMap]) => {
      const base = new Date(start);
      const days = Array.from({ length: 7 }, (_, i) => {
        const key = iso(addDays(base, i));
        const day = dayMap.get(key) ?? null;
        console.log("[buildWeeks] week day", start, key, day);
        return day;
      });
      return { start, days };
    })
    .sort((a, b) => b.start.localeCompare(a.start));

  console.log("[buildWeeks] final weeks", weeks);
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

  useEffect(() => {
    (async () => {
      console.log("[HistoryPage] init");
      await initDB();
      const db = getDB();
      console.log("[HistoryPage] db loaded", db);
      setWeeks(buildWeeks(db));
    })();
  }, []);

  console.log("[HistoryPage] render weeks", weeks);

  return (
    <div className="p-4 space-y-10">
      <h1 className="text-xl font-semibold">History</h1>

      {weeks.map((week) => {
        const visibleDays = week.days.filter((d) => d !== null) as DayLog[];
        const missingCount = week.days.length - visibleDays.length;

        console.log("[HistoryPage] week", week.start, {
          visibleDays,
          missingCount,
        });

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

            <div className="space-y-4 ">
                {[...visibleDays].reverse().map((day) => (
                <div key={day.date} className="space-y-2">
                  <h3 className="text-xs font-medium text-muted-foreground">
                  {day.date}
                  </h3>
                  <div className="space-y-1">
                  {day.foods.map((food, i) => {
                    console.log("[HistoryPage] food row", day.date, food);
                    return <FoodRow key={i} food={food} />;
                  })}
                  </div>
                </div>
                ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
