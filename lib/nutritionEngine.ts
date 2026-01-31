// /lib/nutritionEngine.ts

import { getFoodById } from "@/lib/foodData";
import { addIntake, getAllIntake } from "@/lib/db";
import { getNutrientById } from "@/lib/nutrientRegistry";
import { getUserProfile } from "@/lib/userProfile";
import { getDailyTargets } from "@/lib/recommendationEngine";


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

export type IntakeEntry = {
  foodId: string;
  grams: number;
  date: string; // ISO
};

export type NutrientProgress = {
  id: string;
  name: string;
  progress: number; // 0–100
};

export type WeeklyProgress = {
  overall: number;
  focus: NutrientProgress[];
};

// ---------- TEMP: Weekly Targets ----------
// These will later come from recommendation tables
const weeklyTargets: Record<string, number> = {
  protein: 350,
  iron: 126,
  vitamin_c: 525,
};



// ---------- Helpers ----------

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sun
  const diff = d.getDate() - day;
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

function isSameWeek(dateIso: string, weekStartIso: string) {
  return dateIso >= weekStartIso;
}


// ---------- Core Logic ----------
// lib/nutritionEngine.ts
import { updateDB } from "./db";
import foods from "@/data/foods_clean.json";

export async function logFood(foodId: string, grams: number) {
  const food = foods.find(f => f.id === foodId);
  if (!food) return;

  const date = new Date().toISOString().slice(0, 10);

  await updateDB((db) => {
    if (!db.foodLog[date]) db.foodLog[date] = [];
    db.foodLog[date].push({
      id: food.id,
      name: food.name,
      grams,
      nutrients: food.nutrients,
      loggedAt: Date.now(),
    });
  });

  // nutrient aggregation logic stays here
}

import { getDB, initDB } from "@/lib/db";

export async function getWeeklyProgress(): Promise<WeeklyProgress> {
  await initDB();
  const db = getDB();

  const weekStart = getWeekStart();
  const profile = getUserProfile();
  const dailyTargets = getDailyTargets(profile);

  const weeklyTargets: Record<string, number> = {};
  for (const [nutrientId, daily] of Object.entries(dailyTargets)) {
    weeklyTargets[nutrientId] = daily * 7;
  }

  let totals: Record<string, number> = {};

  for (const [date, foods] of Object.entries(db.foodLog)) {
    if (!isSameWeek(date, weekStart)) continue;

    for (const entry of foods) {
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
  if (!target || target <= 0) continue;
  if (!(nutrientId in totals)) continue;
    const intake = totals[nutrientId] ?? 0;
    const def = getNutrientById(nutrientId);
    if (!def) continue;

    nutrientProgress.push({
      id: nutrientId,
      name: def.label,
      progress: Math.min(100, Math.round((intake / target) * 100)),
    });
  }

  const overall =
    nutrientProgress.length === 0
      ? 0
      : nutrientProgress.reduce((s, n) => s + n.progress, 0) /
        nutrientProgress.length;

  console.log("totals", totals);
  console.log("daily targets", dailyTargets);


  return {
    overall: Math.round(overall),
    focus: nutrientProgress
      .filter(n => n.progress < 100)
      .sort((a, b) => a.progress - b.progress),
  };
  
}
export async function getNutrientDetail(
  nutrientId: string
): Promise<NutrientDetail | null> {
  await initDB();
  const db = getDB();

  const weekStart = getWeekStart();
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
    if (!isSameWeek(date, weekStart)) continue;

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
    progress: Math.min(100, Math.round((total / target) * 100)),
    contributions,
  };
}
