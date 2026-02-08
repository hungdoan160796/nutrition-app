// /lib/nutritionEngine.ts

import { getNutrientById } from "@/lib/nutrientRegistry";
import { getUserProfile } from "@/lib/userProfile";
import { getDailyTargets } from "@/lib/recommendationEngine";
import { getDB, initDB, updateDB } from "@/lib/db";
import { useEffect, useState } from "react";

/**
 * CONFIG
 * 1 = Sunday, 2 = Monday
 * MUST match History page
 */
export const WEEK_START = 2;

// ---------- Types ----------
export type NutrientContribution = {
  foodName: string;
  amount: number;
};

export type NutrientDetail = {
  name: string;
  unit: string;
  intake: number;
  target: number;
  progress: number;
  contributions: NutrientContribution[];
};

export type NutrientProgress = {
  id: string;
  name: string;
  progress: number; // 0–100
};

export type WeeklyProgress = {
  overall: number;
  all: NutrientProgress[];     // ← NEW
  focus: NutrientProgress[];
};


// ---------- Week Helpers ----------

function getWeekRange(
  baseDate: Date = new Date()
): { start: string; end: string } {
  const d = new Date(baseDate);
  const diff = (d.getDay() - WEEK_START + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);

  const start = new Date(d);
  const end = new Date(d);
  end.setDate(end.getDate() + 7);

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

function isWithinWeek(
  dateIso: string,
  startIso: string,
  endIso: string
) {
  return dateIso >= startIso && dateIso < endIso;
}

// ---------- Core Logic ----------

export async function logFood(foodTerm: string, grams: number) {
  const [foods, setFoods] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/foods")
      .then((res) => res.json())
      .then(setFoods);
  }, []);

  const food = foods.find((f) => f.term === foodTerm);
  if (!food) return;

  const date = new Date().toISOString().slice(0, 10);

  await updateDB((db) => {
    if (!db.foodLog[date]) db.foodLog[date] = [];
    db.foodLog[date].push({
      term: food.term,
      name: food.name,
      grams,
      nutrients: food.nutrients,
      loggedAt: Date.now(),
    });
    
  });
}

// ---------- Weekly Progress (Main Dashboard) ----------

export async function getWeeklyProgress(
  baseDate: Date = new Date()
): Promise<WeeklyProgress> {
  await initDB();
  const db = getDB();

  const { start, end } = getWeekRange(baseDate);
  const profile = getUserProfile();
  const dailyTargets = getDailyTargets(profile);

  const weeklyTargets: Record<string, number> = {};
  for (const [nutrientId, daily] of Object.entries(dailyTargets)) {
    weeklyTargets[nutrientId] = daily * 7;
  }

  const totals: Record<string, number> = {};

  for (const [date, foods] of Object.entries(db.foodLog)) {
    if (!isWithinWeek(date, start, end)) continue;

    for (const entry of foods as any[]) {
      const factor = entry.grams / 100;

      for (const [nutrientId, amountPer100g] of Object.entries(
        entry.nutrients as Record<string, number>
      )) {
        totals[nutrientId] =
          (totals[nutrientId] ?? 0) + amountPer100g * factor;
      }
    }
  }

  const nutrientProgress: NutrientProgress[] = [];

  for (const [nutrientId, target] of Object.entries(weeklyTargets)) {
    if (!target || !(nutrientId in totals)) continue;

    const def = getNutrientById(nutrientId);
    if (!def) continue;

    const intake = totals[nutrientId];

    nutrientProgress.push({
      id: nutrientId,
      name: def.label,
      progress: Math.min(
        100,
        Math.round((intake / target) * 100)
      ),
    });
  }

  const overall =
    nutrientProgress.length === 0
      ? 0
      : nutrientProgress.reduce((s, n) => s + n.progress, 0) /
        nutrientProgress.length;

  return {
    overall: Math.round(overall),
    all: nutrientProgress,
    focus: nutrientProgress
      .filter(n => n.progress < 100)
      .sort((a, b) => a.progress - b.progress),
  };
}

// ---------- Nutrient Detail (Weekly) ----------

export async function getNutrientDetail(
  nutrientId: string,
  baseDate: Date = new Date()
): Promise<NutrientDetail | null> {
  await initDB();
  const db = getDB();

  const { start, end } = getWeekRange(baseDate);
  const profile = getUserProfile();
  const dailyTargets = getDailyTargets(profile);

  const target = dailyTargets[nutrientId]
    ? dailyTargets[nutrientId] * 7
    : null;
  if (!target) return null;

  const def = getNutrientById(nutrientId);
  if (!def) return null;

  let total = 0;
  const grouped: Record<string, number> = {};

  for (const [date, foods] of Object.entries(db.foodLog)) {
    if (!isWithinWeek(date, start, end)) continue;

    for (const entry of foods as any[]) {
      const factor = entry.grams / 100;
      const amountPer100g = entry.nutrients?.[nutrientId];
      if (!amountPer100g) continue;

      const amount = amountPer100g * factor;
      total += amount;

      grouped[entry.name] =
        (grouped[entry.name] ?? 0) + amount;
    }
  }

  const contributions = Object.entries(grouped)
    .map(([foodName, amount]) => ({
      foodName,
      amount: Number(amount.toFixed(2)),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return {
    name: def.label,
    unit: def.unit,
    intake: Number(total.toFixed(2)),
    target,
    progress: Math.min(
      100,
      Math.round((total / target) * 100)
    ),
    contributions,
  };
}
