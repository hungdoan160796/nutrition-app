// lib/nutritionEngine.ts — Firebase-compatible, no React hooks

import { getNutrientById } from "@/lib/nutrientRegistry";
import { getUserProfile } from "@/lib/userProfile";
import { getDailyTargets } from "@/lib/recommendationEngine";
import { getDB, initDB, updateDB } from "@/lib/db";


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
  progress: number;
};

export type WeeklyProgress = {
  overall: number;
  all: NutrientProgress[];
  focus: NutrientProgress[];
};

export type FoodNutrientsPer100g = Record<string, number>;

export type LoggedFood = {
  term: string;
  name: string;
  grams: number;
  nutrientsPer100g: FoodNutrientsPer100g;
  loggedAt: number;
};

// ---------- Week Helpers ----------
function getWeekRange(baseDate: Date = new Date()) {
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

function isWithinWeek(dateIso: string, startIso: string, endIso: string) {
  return dateIso >= startIso && dateIso < endIso;
}

// ---------- Core Logic ----------
export async function logFood(
  food: {
    term: string;
    name: string;
    nutrients: Record<string, number>;
  },
  grams: number
) {
  const date = new Date().toISOString().slice(0, 10);

  await updateDB((db) => {
    if (!db.foodLog[date]) db.foodLog[date] = [];
    db.foodLog[date].push({
      term: food.term,
      name: food.name,
      grams,
      nutrientsPer100g: food.nutrients,
      loggedAt: Date.now(),
    });
  });
}

// ---------- Weekly Progress ----------
export async function getWeeklyProgress(
  baseDate: Date = new Date()
): Promise<WeeklyProgress> {
  await initDB();
  const db = await getDB();

  const { start, end } = getWeekRange(baseDate);
  const profile = getUserProfile();
  const dailyTargets = await getDailyTargets(profile);

  const weeklyTargets: Record<string, number> = {};
  for (const [id, daily] of Object.entries(dailyTargets)) {
    weeklyTargets[id] = daily * 7;
  }

  const totals: Record<string, number> = {};

  for (const [date, foods] of Object.entries(db.foodLog)) {
    if (!isWithinWeek(date, start, end)) continue;

    for (const entry of foods as LoggedFood[]) {
      if (!entry.nutrientsPer100g) continue;

      const factor = entry.grams / 100;

      for (const [nutrientId, per100g] of Object.entries(
        entry.nutrientsPer100g
      )) {
        totals[nutrientId] =
          (totals[nutrientId] ?? 0) + per100g * factor;
      }
    }
  }


  const all: NutrientProgress[] = [];

  for (const [nutrientId, target] of Object.entries(weeklyTargets)) {
    const intake = totals[nutrientId];
    if (!intake || !target) continue;

    const def = getNutrientById(nutrientId);
    if (!def) continue;

    all.push({
      id: nutrientId,
      name: def.label,
      progress: Math.min(
        100,
        Math.round((intake / target) * 100)
      ),
    });
  }

  const overall =
    all.length === 0
      ? 0
      : all.reduce((s, n) => s + n.progress, 0) / all.length;

  return {
    overall: Math.round(overall),
    all,
    focus: all
      .filter((n) => n.progress < 100)
      .sort((a, b) => a.progress - b.progress),
  };
}

// ---------- Nutrient Detail ----------
export async function getNutrientDetail(
  nutrientId: string,
  baseDate: Date = new Date()
): Promise<NutrientDetail | null> {
  await initDB();
  const db = await getDB();

  const { start, end } = getWeekRange(baseDate);
  const profile = getUserProfile();
  const dailyTargets = await getDailyTargets(profile);

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

    for (const entry of foods as LoggedFood[]) {
      if (!entry.nutrientsPer100g) continue;

      const per100g = entry.nutrientsPer100g[nutrientId];
      if (!per100g) continue;

      const amount = (entry.grams / 100) * per100g;
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
