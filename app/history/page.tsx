// app/history/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getDB, initDB } from "@/lib/db";
import FoodRow from "@/components/FoodRow";

type DayLog = {
  date: string;
  foods: any[];
};

function getLast7Days(): string[] {
  const days: string[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }

  return days;
}

export default function HistoryPage() {
  const [week, setWeek] = useState<DayLog[]>([]);

  useEffect(() => {
    (async () => {
      await initDB();
      const db = getDB();
      const days = getLast7Days();

      const data = days.map((date) => ({
        date,
        foods: db.foodLog[date] ?? [],
      }));

      setWeek(data);
    })();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">This Week</h1>

      {week.map((day) => (
        <div key={day.date} className="space-y-2">
          <h2 className="text-sm font-medium text-muted-foreground">
            {day.date}
          </h2>

          {day.foods.length === 0 ? (
            <p className="text-sm text-muted-foreground">No foods logged</p>
          ) : (
            <div className="space-y-1">
              {day.foods.map((food, i) => (
                <FoodRow key={i} food={food} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
