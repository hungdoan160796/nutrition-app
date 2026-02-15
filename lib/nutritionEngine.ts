// lib/nutritionEngine.ts — Firebase-compatible, no React hooks

import { getNutrientById } from "@/lib/nutrientRegistry";
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
  // optional precomputed per-entry nutrient amounts (amount contributed by this logged food)
  nutrients?: Record<string, number>;
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
    // store both the original per-100g values and a precomputed per-entry
    // nutrients map (scaled by grams) so older entries and other UI
    // components can read either shape.
    const scaled: Record<string, number> = {};
    for (const [k, v] of Object.entries(food.nutrients ?? {})) {
      if (typeof v === "number") scaled[k] = (v * grams) / 100;
    }

    db.foodLog[date].push({
      term: food.term,
      name: food.name,
      grams,
      nutrientsPer100g: food.nutrients,
      // per-entry nutrient amounts (e.g., amount contributed by this logged food)
      nutrients: scaled,
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

  // debug: log keys / a small sample to help diagnose why totals are zero
  try {
    // eslint-disable-next-line no-console
    console.log("getWeeklyProgress: foodLog keys:", Object.keys(db.foodLog || {}).slice(0, 10));
    const firstKey = Object.keys(db.foodLog || {})[0];
    if (firstKey) {
      // eslint-disable-next-line no-console
      console.log("getWeeklyProgress: sample entry:", db.foodLog[firstKey] && db.foodLog[firstKey][0]);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log("getWeeklyProgress: failed to log sample", e);
  }

  const { start, end } = getWeekRange(baseDate);
  // Prefer the profile stored in the app DB (keeps behaviour consistent with ProfileProvider)
  // Fall back to the exported userProfile defaults if DB doesn't have values.
  const dbProfile = db.userProfile ?? {};
  const profile = {
    recommendationSet: dbProfile.recommendationSet ?? "fda_dv_2024",
    sex: (dbProfile.sex as "male" | "female") ?? "female",
    age: typeof dbProfile.age === "number" ? dbProfile.age : 30,
  };

  const dailyTargets = await getDailyTargets(profile as any);

  const weeklyTargets: Record<string, number> = {};
  for (const [id, daily] of Object.entries(dailyTargets)) {
    weeklyTargets[id] = daily * 7;
  }

  const totals: Record<string, number> = {};

  for (const [date, foods] of Object.entries(db.foodLog)) {
    if (!isWithinWeek(date, start, end)) continue;

    for (const entry of foods as LoggedFood[]) {
      // Support both shapes:
      // - legacy/other entries may have `nutrients` (already scaled for the
      //   logged grams),
      // - new entries have `nutrientsPer100g` + `grams`.
      if (entry.nutrients && Object.keys(entry.nutrients).length) {
        for (const [nutrientId, amount] of Object.entries(entry.nutrients)) {
          if (typeof amount !== "number") continue;
          totals[nutrientId] = (totals[nutrientId] ?? 0) + amount;
        }
        continue;
      }

      if (!entry.nutrientsPer100g) continue;

      const factor = entry.grams / 100;

      for (const [nutrientId, per100g] of Object.entries(entry.nutrientsPer100g)) {
        if (typeof per100g !== "number") continue;
        totals[nutrientId] = (totals[nutrientId] ?? 0) + per100g * factor;
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
  // Use DB-backed profile (same defaults as elsewhere)
  const dbProfile = db.userProfile ?? {};
  const profile = {
    recommendationSet: dbProfile.recommendationSet ?? "fda_dv_2024",
    sex: (dbProfile.sex as "male" | "female") ?? "female",
    age: typeof dbProfile.age === "number" ? dbProfile.age : 30,
  };

  const dailyTargets = await getDailyTargets(profile as any);

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
      // Accept per-entry nutrients if present
      if (entry.nutrients && typeof entry.nutrients[nutrientId] === "number") {
        const amount = entry.nutrients[nutrientId] as number;
        total += amount;
        grouped[entry.name] = (grouped[entry.name] ?? 0) + amount;
        continue;
      }

      if (!entry.nutrientsPer100g) continue;

      const per100g = entry.nutrientsPer100g[nutrientId];
      if (!per100g) continue;

      const amount = (entry.grams / 100) * per100g;
      total += amount;

      grouped[entry.name] = (grouped[entry.name] ?? 0) + amount;
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
